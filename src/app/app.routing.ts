import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
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
import { AddorderComponent } from './order/addorder/addorder.component';
import { UpdateorderComponent } from "./order/updateorder/updateorder.component";
import { OrderDeliveryComponent } from "./order-delivery/order-delivery.component";
import { BillComponent } from './bill/bill.component';
import { GenerateBillComponent } from './generate-bill/generate-bill.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserauthguardService } from './userauthguard.service';






const arr: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'nav', canActivate: [UserauthguardService], component: MainNavComponent, children: [
      { path: '', component: UserComponent },
      { path: 'updateUser/:user_email', component: UpdateUserComponent },
      { path: 'adduser', component: AddUserComponent },
      { path: 'customer', component: CustomerComponent },
      {path:'addCustomer',component:AddCustomerComponent},
      {path:'updatecustomer/:customer_id',component:UpdateCustomerComponent},
      { path: 'emp', component: EmpComponent },
      { path: 'addemp', component: AddEmpComponent },
      { path: 'updateemp/:emp_id', component: UpdateEmpComponent },
      { path: 'product', component: ProductComponent },
      { path: 'addproduct', component: AddProductComponent },
      { path: 'updateproduct/:pro_id', component: UpdateproductComponent },
      { path: 'stock', component: StockComponent },
      { path: 'addstock', component: AddStockComponent },
      { path: 'updatestock/:stock_id', component: UpdateStockComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'order', component: OrderComponent },
      {path:'addorder',component:AddorderComponent},
      {path:'updateorder/:order_id',component:UpdateorderComponent},
      {path:'orderdelivery',component:OrderDeliveryComponent},
      { path: 'bill', component: BillComponent },
      {path:'generateBill/:fk_customer_id',component:GenerateBillComponent},
      { path: '**', component: PagenotfoundComponent }
    ]
  },

];
export const routingArr = RouterModule.forRoot(arr);
