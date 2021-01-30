import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IProduct } from 'src/app/@Models/product.model';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: IProduct[] = [];
  listOfData: IProduct[] = [];
  setOfCheckedId = new Set<number>();
  today = new Date();
  loading = false;
  locale: string;

  constructor(private productService:ProductsService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private  notificationService:NzNotificationService,
    private translateService: TranslateService,
    ) { }

  ngOnInit(): void {
    this.locale = this.translateService.currentLang;

    this.getProductList();

    this.onLangChange();
  }

  private onLangChange() {
    this.translateService.onLangChange.subscribe(langObj => {
      this.locale = langObj.lang;
    });
  }

  getProductList() {
    this.listOfData = this.productService.Products.map((product) => ({
      ...product, expire_date:new Date(product.expire_date)
    }));
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
  }

  onCurrentPageDataChange(listOfCurrentPageData: IProduct[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }

  removeProducts() {
    this.loading = true;

    this.setOfCheckedId.forEach(id=> this.removeProduct(id));

    this.loading = false;
  }

  confirm(id: number){
    this.removeProduct(id)
  }

  removeProduct(id: number) {
  const index =  this.listOfData.findIndex(product => product.id === id);

  if(index > -1) {
    this.listOfData.splice(index, 1);
    this.listOfData = [...this.listOfData];
  }
  
  this.onCurrentPageDataChange(this.listOfData);

  this.notificationService.create(
    'success',
    'Deleted',
    `Deleted Successfully!`
  );
  }
  
  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  addProduct(): void{
    const modal = this.modal.create({
      nzTitle: 'Add Product',
      nzContent: ProductEditorComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        listOfData: this.listOfData
      },
    });
    // Return a result when closed
    modal.afterClose.subscribe(result =>{
      if(result) {
        this.listOfData = [...this.listOfData, result];
        this.onCurrentPageDataChange(this.listOfData);
        this.notificationService.create(
          'success',
          'Added',
          'Added Successfully!'
        );
      }
    });
  }

  editProduct(data: IProduct): void {
    const modal = this.modal.create({
      nzTitle: 'Edit Product',
      nzContent: ProductEditorComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        data,
        listOfData: this.listOfData
      }
    });
       // Return a result when closed
       modal.afterClose.subscribe(result =>{
        if(result) {
        const index  =  this.listOfData.findIndex((product => product.id === result.id));
        this.listOfData[index] = result;
        this.listOfData = [...this.listOfData];
        console.log(this.listOfData);
        this.onCurrentPageDataChange(this.listOfData);
        this.notificationService.create(
          'success',
          'Updated',
          'Updated Successfully!'
        );
        }
      });
  }
}
