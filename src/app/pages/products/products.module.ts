import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductsService } from './services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { ProductsComponent } from './products.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [ProductEditorComponent, ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NzTableModule,
    NzButtonModule,
    ReactiveFormsModule,

    TranslateModule.forChild(),

    IconsProviderModule,
    NzNotificationModule,
    NzModalModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzPopconfirmModule
  ],
  providers:[ProductsService, NzMessageService]
})
export class ProductsModule { }
