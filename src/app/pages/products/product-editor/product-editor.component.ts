import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { IProduct } from 'src/app/@Models/product.model';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit {

  productForm: FormGroup;

  data:IProduct;

  listOfData: IProduct[] = [];
  constructor(private fb: FormBuilder,
    private modal: NzModalRef) { 
    }

  ngOnInit(): void {
    this.initForm();

    this.getData();
  }

  initForm() {
    const currentProductId = this.data?.id || (this.listOfData.length + 1) ;
    this.productForm = this.fb.group({
      id:[currentProductId, [Validators.required]],
      name: ['', Validators.required],
      quantity:['', [Validators.required, Validators.min(0)]],
      expire_date:['',[Validators.required]],
      description: ['']
    });
  }

  getData(){
    if(this.data) {
    Object.entries(this.productForm.controls).forEach(([key, control]) => {
      if (this.data[key] !== null && this.data[key] !== undefined) {
        control.setValue(this.data[key]);
      }
    })
  }
    //   for (const key in this.productForm.controls) {
    //     this.productForm.controls[key].setValue(this.data[key]);
    //   }
    // }
  }

  get isFormValid() {
    for (const key in this.productForm.controls) {
      this.productForm.controls[key].markAsDirty();
      this.productForm.controls[key].updateValueAndValidity();
    }
    return this.productForm.valid;
  }

  onSubmit() {
    if(this.isFormValid) {
      this.modal.close(this.productForm.value);
    }
  }

  onCancel() {
    this.productForm.reset();
    this.modal.close();
  }
}
