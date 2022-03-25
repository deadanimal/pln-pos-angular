import { BrowserModule } from "@angular/platform-browser";
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // this is needed!
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import "hammerjs";
import { QRCodeModule } from "angular2-qrcode";

import { StoreModule } from "@ngrx/store";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { NgxNumberSpinnerModule } from "ngx-number-spinner";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { JwtModule, JwtHelperService } from "@auth0/angular-jwt";
import { ToastrModule } from "ngx-toastr";
import { NouisliderModule } from "ng2-nouislider";
import { CookieService } from "ngx-cookie-service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PictureUploadComponent } from "./components/picture-upload/picture-upload.component";
import { ScrollTopComponent } from "./components/scroll-top/scroll-top.component";
import { W3cComponent } from "./components/w3c/w3c.component";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { CustomerLayoutComponent } from "./layouts/customer-layout/customer-layout.component";
import { CartComponent } from "./components/cart/cart.component";
import { AuxiliaryComponent } from "./components/auxiliary/auxiliary.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { EventEmitterService } from "./shared/services/event-emitter/event-emitter.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CustomerSeatComponent } from "./layouts/customer-layout/customer-seat/customer-seat.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { checkoutReducer, metaReducerLocalStorage } from 'src/app/checkout-state-store/reducer';
import { troliReducer, metaReducerLocalStorageTroli } from 'src/app/troli-state-store/reducer';

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function getToken(): string {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PictureUploadComponent,
    ScrollTopComponent,
    W3cComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CartComponent,
    SidebarComponent,
    AuxiliaryComponent,
    CustomerSeatComponent,
  ],
  imports: [
    StoreModule.forRoot({ checkoutEntries: checkoutReducer, troliEntries: troliReducer }, { metaReducers: [ metaReducerLocalStorage, metaReducerLocalStorageTroli ] }),
    QRCodeModule,
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    JwBootstrapSwitchNg2Module,
    AngularMultiSelectModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    NgxNumberSpinnerModule,
    NgxSpinnerModule,

    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NouisliderModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    NgbModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [JwtHelperService, CookieService, EventEmitterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
