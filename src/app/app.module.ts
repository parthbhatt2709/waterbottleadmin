import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { MatTableModule, MatInputModule ,MatIconModule, MatFormFieldModule, MatFormFieldControl, MatSelectModule, MatNativeDateModule, MatDialogModule, MatPaginator, MatPaginatorModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { routingArr } from './app.routing';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from "@angular/material";
import { MatListModule } from '@angular/material/list';
import { AddUserComponent } from './user/add-user/add-user.component';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './customer/update-customer/update-customer.component';
import { EmpComponent } from './emp/emp.component';
import { AddEmpComponent } from './emp/add-emp/add-emp.component';
import { UpdateEmpComponent } from './emp/update-emp/update-emp.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UpdateproductComponent } from './product/updateproduct/updateproduct.component';
import { StockComponent } from './stock/stock.component';
import { AddStockComponent } from './stock/add-stock/add-stock.component';
import { UpdateStockComponent } from './stock/update-stock/update-stock.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OrderComponent } from './order/order.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BillComponent } from './bill/bill.component';
import { ViewmoreuserComponent } from './user/viewmoreuser/viewmoreuser.component';
import { GenerateBillComponent } from './generate-bill/generate-bill.component';
import { AddorderComponent } from './order/addorder/addorder.component';
import { OrderDeliveryComponent } from './order-delivery/order-delivery.component';
import { UpdateorderComponent } from './order/updateorder/updateorder.component';
import { ViewmoreorderComponent } from './viewmoreorder/viewmoreorder.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UpdateUserComponent,
    MainNavComponent,
    AddUserComponent,
    CustomerComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    EmpComponent,
    AddEmpComponent,
    UpdateEmpComponent,
    ProductComponent,
    AddProductComponent,
    UpdateproductComponent,
    StockComponent,
    AddStockComponent,
    UpdateStockComponent,
    LoginComponent,
    SignupComponent,
    OrderComponent,
    UpdateorderComponent,
    PagenotfoundComponent,
    BillComponent,
    OrderComponent,
    GenerateBillComponent,
    ViewmoreuserComponent,
    AddorderComponent,
    OrderDeliveryComponent,
    ViewmoreorderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routingArr,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatNativeDateModule,
    MatDialogModule,
    MatPaginatorModule
  ],
   entryComponents:[
     ViewmoreuserComponent,
    ViewmoreorderComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
