import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule ,routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './ind/categories/categories.component';
import { DoctorsComponent } from './ind/doctors/doctors.component';
import { DiscountComponent } from './ind/discount/discount.component';
import { ChatComponent } from './ind/chat/chat.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { IndComponent } from './admin/ind/ind.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import {AuthModule} from './auth/auth.module';
import { ViewuserComponent } from './admin/viewuser/viewuser.component';
import { AaComponent } from './aa/aa.component';
import { AddmedicineComponent } from './admin/addmedicine/addmedicine.component';
import { FormsModule } from '@angular/forms';
import { ViewmedicineComponent } from './admin/viewmedicine/viewmedicine.component';
import { EditmedicineComponent } from './admin/editmedicine/editmedicine.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { GlowComponent } from './user/glow/glow.component';

// toster
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AdminGuard } from './admin/admin.guard';
import { CartComponent } from './user/cart/cart.component';
import { MyprofileComponent } from './user/myprofile/myprofile.component';
import { EditprofileComponent } from './user/editprofile/editprofile.component';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';
import { UserdiscountComponent } from './user/userdiscount/userdiscount.component';
import { UserfeedbackComponent } from './user/userfeedback/userfeedback.component';
import { ViewfeedbackComponent } from './admin/viewfeedback/viewfeedback.component';
import { EmptycartComponent } from './user/emptycart/emptycart.component';
import { ViewoneorderComponent } from './admin/viewoneorder/viewoneorder.component';
import { ViewoneuserComponent } from './admin/viewoneuser/viewoneuser.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CategoriesComponent,
    DoctorsComponent,
    DiscountComponent,
    ChatComponent,
    RegisterComponent,
    LoginComponent,
    IndComponent,
    AdminhomeComponent,
    ViewuserComponent,
    AaComponent,
    AddmedicineComponent,
    ViewmedicineComponent,
    EditmedicineComponent,
    NavbarComponent,
    GlowComponent,
    UserhomeComponent,
    CartComponent,
    MyprofileComponent,
    EditprofileComponent,
    ChangepasswordComponent,
    UserdiscountComponent,
    UserfeedbackComponent,
    ViewfeedbackComponent,
    EmptycartComponent,
    ViewoneorderComponent,
    ViewoneuserComponent,
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    BrowserAnimationsModule, // required animations  module
    ToastrModule.forRoot(),
  ],
  providers: [AuthGuard,AdminGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
