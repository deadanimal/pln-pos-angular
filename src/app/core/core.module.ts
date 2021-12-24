import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { NgxSpinnerModule } from "ngx-spinner";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { PopoverModule } from "ngx-bootstrap/popover";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TagInputModule } from "ngx-chips";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { RatingModule } from "ngx-bootstrap/rating";
import { NgxNumberSpinnerModule } from "ngx-number-spinner";
import { NguCarouselModule } from "@ngu/carousel";
import { NgxGalleryModule } from "ngx-gallery-9";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { BarRatingModule } from "ngx-bar-rating";
import { TmNgOdometerModule } from "tm-ng-odometer";
import { NgMarqueeModule } from "ng-marquee";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { GalleryModule } from "@ngx-gallery/core";
import { LightboxModule } from "@ngx-gallery/lightbox";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import { ShareButtonsConfig } from "ngx-sharebuttons";
import { ShareButtonModule } from "ngx-sharebuttons/button";
import { ShareIconsModule } from "ngx-sharebuttons/icons";
import { NgxOrgChartModule } from "ngx-org-chart";
// import { ToastrModule } from 'ngx-toastr';
import { CountdownModule } from "ngx-countdown";
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ThermalPrintModule } from 'ng-thermal-print';

import { RouterModule } from "@angular/router";
import { CoreRoutes } from "./core.routing";
import { HomeComponent } from "./home/home.component";
import { ShowsComponent } from "./shows/shows.component";
import { FacilityComponent } from "./facility/facility.component";
import { SurveyComponent } from "./survey/survey.component";
import { ProgramComponent } from "./program/program.component";
import { VisitComponent } from "./visit/visit.component";
import { ExhibitComponent } from "./exhibit/exhibit.component";
import { PublicationComponent } from "./publication/publication.component";
import { PaymentComponent } from "./payment/payment.component";
import { FacilityDetailsComponent } from "./facility-details/facility-details.component";
import { ExhibitDetailsComponent } from "./exhibit-details/exhibit-details.component";
import { SimulatorRideComponent } from "./simulator-ride/simulator-ride.component";
import { VirtualLibraryComponent } from "./virtual-library/virtual-library.component";
import { LandingComponent } from "./landing/landing.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { OrganizationChartComponent } from "./organization-chart/organization-chart.component";
import { MissionVisionComponent } from "./mission-vision/mission-vision.component";
import { PdpaComponent } from "./pdpa/pdpa.component";
import { FaqComponent } from "./faq/faq.component";
import { SimulatorRideBookComponent } from "./simulator-ride-book/simulator-ride-book.component";
import { ShowsBookComponent } from "./shows-book/shows-book.component";
import { ExhibitListsComponent } from "./exhibit-lists/exhibit-lists.component";
import { DirectoryComponent } from "./directory/directory.component";
import { OperatingHourComponent } from "./operating-hour/operating-hour.component";
import { ProgramFilterPipe } from "../shared/pipes/program/program-filter.pipe";
import { ProgramImageFilterPipe } from "../shared/pipes/program/program-image-filter.pipe";
import { ProgramFormsComponent } from "./program-forms/program-forms.component";
import { FacilityImageFilterPipe } from "../shared/pipes/facility/facility-image-filter.pipe";
import { FacilityDetailZonesComponent } from "./facility-detail-zones/facility-detail-zones.component";
import { SurveyQuestionFilterPipe } from "../shared/pipes/survey/survey-question-filter.pipe";
import { NocComponent } from "./noc/noc.component";
import { CharterComponent } from "./charter/charter.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { CopyrightNoticeComponent } from "./copyright-notice/copyright-notice.component";
import { DisclaimerComponent } from "./disclaimer/disclaimer.component";
import { CioComponent } from "./cio/cio.component";
import { FacilityPriceFilterPipe } from "../shared/pipes/facility/facility-price-filter.pipe";
import { ProfileComponent } from "./profile/profile.component";
import { PublicationListsComponent } from "./publication-lists/publication-lists.component";
import { VirtualLibraryTentangKamiComponent } from "./virtual-library-tentang-kami/virtual-library-tentang-kami.component";
import { VirtualLibraryArtikelTerkiniComponent } from "./virtual-library-artikel-terkini/virtual-library-artikel-terkini.component";
import { VirtualLibraryKoleksiComponent } from "./virtual-library-koleksi/virtual-library-koleksi.component";
import { VirtualLibraryPerkhidmatanComponent } from "./virtual-library-perkhidmatan/virtual-library-perkhidmatan.component";
import { VirtualLibraryArkibKutubkhanahComponent } from "./virtual-library-arkib-kutubkhanah/virtual-library-arkib-kutubkhanah.component";
import { VirtualLibraryEsumberComponent } from "./virtual-library-esumber/virtual-library-esumber.component";
import { ArkibKutubkhanahFilterPipe } from "../shared/pipes/virtual-library/arkib-kutubkhanah/arkib-kutubkhanah-filter.pipe";
import { EsumberFilterPipe } from "../shared/pipes/virtual-library/esumber/esumber-filter.pipe";
import { VirtualLibraryBukuComponent } from "./virtual-library-buku/virtual-library-buku.component";
import { VirtualLibraryTerbitanBersiriComponent } from "./virtual-library-terbitan-bersiri/virtual-library-terbitan-bersiri.component";
import { EmployeeDirectoryComponent } from "./employee-directory/employee-directory.component";
import { QuickLinkComponent } from "./quick-link/quick-link.component";
import { SafePipe } from "../shared/pipes/safe/safe.pipe";
import { SignupComponent } from "./signup/signup.component";
import { TruncatePipe } from "../shared/pipes/truncate/truncate.pipe";
import { ReceiptComponent } from "./receipt/receipt.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { FormatFPXTransactionDateTimePipe } from "../shared/pipes/format/format-fpxtransaction-datetime.pipe";
import { FormatBookingTimePipe } from "../shared/pipes/format/format-booking-time.pipe";
import { FormatFacilityAreaM2Pipe } from "../shared/pipes/format/format-facility-area-m2.pipe";
import { ScheduleComponent } from './schedule/schedule.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ApplicationComponent } from './application/application.component';
import { CashPaymentComponent } from './cash-payment/cash-payment.component';
import { CustomerDisplayComponent } from './customer-display/customer-display.component';
import { ThermalPrinterComponent } from './thermal-printer/thermal-printer.component';
import { ReportingComponent } from './reporting/reporting.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportingPrintComponent } from './reporting-print/reporting-print.component';
import { QrPayComponent } from './qr-pay/qr-pay.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

FullCalendarModule.registerPlugins([dayGridPlugin]);

const customConfig: ShareButtonsConfig = {
  include: ["facebook", "twitter", "whatsapp"],
  twitterAccount: "@PlanetariumKL",
  autoSetMeta: true,
};

@NgModule({
  declarations: [
    HomeComponent,
    ShowsComponent,
    FacilityComponent,
    SurveyComponent,
    ProgramComponent,
    VisitComponent,
    ExhibitComponent,
    PublicationComponent,
    PaymentComponent,
    FacilityDetailsComponent,
    ExhibitDetailsComponent,
    SimulatorRideComponent,
    VirtualLibraryComponent,
    LandingComponent,
    AboutUsComponent,
    OrganizationChartComponent,
    MissionVisionComponent,
    PdpaComponent,
    FaqComponent,
    SimulatorRideBookComponent,
    ShowsBookComponent,
    ExhibitListsComponent,
    DirectoryComponent,
    OperatingHourComponent,
    ProgramFilterPipe,
    ProgramImageFilterPipe,
    ProgramFormsComponent,
    FacilityImageFilterPipe,
    FacilityDetailZonesComponent,
    SurveyQuestionFilterPipe,
    NocComponent,
    CharterComponent,
    PasswordResetComponent,
    PrivacyPolicyComponent,
    CopyrightNoticeComponent,
    DisclaimerComponent,
    CioComponent,
    FacilityPriceFilterPipe,
    ProfileComponent,
    PublicationListsComponent,
    VirtualLibraryTentangKamiComponent,
    VirtualLibraryArtikelTerkiniComponent,
    VirtualLibraryKoleksiComponent,
    VirtualLibraryPerkhidmatanComponent,
    VirtualLibraryArkibKutubkhanahComponent,
    VirtualLibraryEsumberComponent,
    ArkibKutubkhanahFilterPipe,
    EsumberFilterPipe,
    VirtualLibraryBukuComponent,
    VirtualLibraryTerbitanBersiriComponent,
    EmployeeDirectoryComponent,
    QuickLinkComponent,
    SafePipe,
    SignupComponent,
    TruncatePipe,
    ReceiptComponent,
    CheckoutComponent,
    FormatFPXTransactionDateTimePipe,
    FormatBookingTimePipe,
    FormatFacilityAreaM2Pipe,
    ScheduleComponent,
    BookingsComponent,
    ApplicationComponent,
    CashPaymentComponent,
    CustomerDisplayComponent,
    ThermalPrinterComponent,
    ReportingComponent,
    SettingsComponent,
    ReportingPrintComponent,
    QrPayComponent,
    TransactionsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    RatingModule.forRoot(),
    GalleryModule,
    LightboxModule,
    FullCalendarModule,
    ShareButtonModule.withConfig(customConfig),
    ShareIconsModule,
    NgxOrgChartModule,
    // ToastrModule.forRoot(),
    CountdownModule,
    NgxCaptchaModule,
    NgxNumberSpinnerModule,
    NguCarouselModule,
    NgxGalleryModule,
    RouterModule.forChild(CoreRoutes),
    YouTubePlayerModule,
    BarRatingModule,
    TmNgOdometerModule,
    NgMarqueeModule,
    MatStepperModule,
    MatFormFieldModule,
    HttpClientModule,
    TranslateModule,
    NgxDatatableModule,
    ThermalPrintModule,
    NgxSpinnerModule,
    AccordionModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {}
