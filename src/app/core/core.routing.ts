import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ExhibitComponent } from "./exhibit/exhibit.component";
import { ExhibitDetailsComponent } from "./exhibit-details/exhibit-details.component";
import { FacilityComponent } from "./facility/facility.component";
import { FacilityDetailsComponent } from "./facility-details/facility-details.component";
import { PaymentComponent } from "./payment/payment.component";
import { ProgramComponent } from "./program/program.component";
import { PublicationComponent } from "./publication/publication.component";
import { ShowsComponent } from "./shows/shows.component";
import { SurveyComponent } from "./survey/survey.component";
import { VisitComponent } from "./visit/visit.component";
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
import { OperatingHourComponent } from "./operating-hour/operating-hour.component";
import { DirectoryComponent } from "./directory/directory.component";
import { ProgramFormsComponent } from "./program-forms/program-forms.component";
import { FacilityDetailZonesComponent } from "./facility-detail-zones/facility-detail-zones.component";
import { NocComponent } from "./noc/noc.component";
import { CharterComponent } from "./charter/charter.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { CopyrightNoticeComponent } from "./copyright-notice/copyright-notice.component";
import { DisclaimerComponent } from "./disclaimer/disclaimer.component";
import { CioComponent } from "./cio/cio.component";
import { CustomerDisplayComponent } from "./customer-display/customer-display.component";
import { ProfileComponent } from "./profile/profile.component";
import { PublicationListsComponent } from "./publication-lists/publication-lists.component";
import { VirtualLibraryTentangKamiComponent } from "./virtual-library-tentang-kami/virtual-library-tentang-kami.component";
import { VirtualLibraryArtikelTerkiniComponent } from "./virtual-library-artikel-terkini/virtual-library-artikel-terkini.component";
import { VirtualLibraryKoleksiComponent } from "./virtual-library-koleksi/virtual-library-koleksi.component";
import { VirtualLibraryPerkhidmatanComponent } from "./virtual-library-perkhidmatan/virtual-library-perkhidmatan.component";
import { VirtualLibraryArkibKutubkhanahComponent } from "./virtual-library-arkib-kutubkhanah/virtual-library-arkib-kutubkhanah.component";
import { VirtualLibraryEsumberComponent } from "./virtual-library-esumber/virtual-library-esumber.component";
import { VirtualLibraryBukuComponent } from "./virtual-library-buku/virtual-library-buku.component";
import { VirtualLibraryTerbitanBersiriComponent } from "./virtual-library-terbitan-bersiri/virtual-library-terbitan-bersiri.component";
import { EmployeeDirectoryComponent } from "./employee-directory/employee-directory.component";
import { QuickLinkComponent } from "./quick-link/quick-link.component";
import { SignupComponent } from "./signup/signup.component";
import { ReceiptComponent } from "./receipt/receipt.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ScheduleComponent } from "./schedule/schedule.component"; 
import { BookingsComponent } from "./bookings/bookings.component"; 
import { ApplicationComponent } from "./application/application.component"; 
import { CashPaymentComponent } from "./cash-payment/cash-payment.component"; 
import { ThermalPrinterComponent } from "./thermal-printer/thermal-printer.component"; 
import { ReportingComponent } from "./reporting/reporting.component"; 
import { SettingsComponent } from './settings/settings.component';
import { ReportingPrintComponent } from './reporting-print/reporting-print.component';
import { QrPayComponent } from "./qr-pay/qr-pay.component";
import { TransactionsListComponent } from "./transactions-list/transactions-list.component";

import { environment } from "src/environments/environment";
import { AuthGuard } from "../shared/guard/auth.guard";
import { CloseBookingGuard } from "../shared/guard/close-booking.guard";

export const CoreRoutes: Routes = [
  {
    path: "landing",
    component: LandingComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "password-reset/confirm/:uid/:token",
    component: PasswordResetComponent,

  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "exhibit",
    children: [
      {
        path: "",
        component: ExhibitComponent,
        data: {
          title: "Pameran",
          description:
            "Pameran yang bertemakan astronomi dan penerokaan angkasa disediakan supaya pengunjung dapat merasai pengalaman pembelajaran yang unik melalui konsep hands-on dan minds-on. Ruangan pameran yang dilengkapi dengan bahan pameran yang interaktif akan mewujudkan simulasi sebenar persekitaran ruangan angkasa.",
          url: environment.portalUrl + "exhibit",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description:
            "Pameran yang bertemakan astronomi dan penerokaan angkasa disediakan supaya pengunjung dapat merasai pengalaman pembelajaran yang unik melalui konsep hands-on dan minds-on. Ruangan pameran yang dilengkapi dengan bahan pameran yang interaktif akan mewujudkan simulasi sebenar persekitaran ruangan angkasa.", twitter_title: "Pameran",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "exhibit",
        },
      },
      {
        path: "lists/:zone",
        component: ExhibitListsComponent,
        data: {
          title: "Pameran",
          description:
            "Pameran yang bertemakan astronomi dan penerokaan angkasa disediakan supaya pengunjung dapat merasai pengalaman pembelajaran yang unik melalui konsep hands-on dan minds-on. Ruangan pameran yang dilengkapi dengan bahan pameran yang interaktif akan mewujudkan simulasi sebenar persekitaran ruangan angkasa.",
          url: environment.portalUrl + "exhibit",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description:
            "Pameran yang bertemakan astronomi dan penerokaan angkasa disediakan supaya pengunjung dapat merasai pengalaman pembelajaran yang unik melalui konsep hands-on dan minds-on. Ruangan pameran yang dilengkapi dengan bahan pameran yang interaktif akan mewujudkan simulasi sebenar persekitaran ruangan angkasa.",
          twitter_title: "Pameran",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "exhibit",
        },
      },
      {
        path: "lists/:zone/:detail",
        component: ExhibitDetailsComponent,
        data: {
          title: "Pameran",
          description:
            "Pameran yang bertemakan astronomi dan penerokaan angkasa disediakan supaya pengunjung dapat merasai pengalaman pembelajaran yang unik melalui konsep hands-on dan minds-on. Ruangan pameran yang dilengkapi dengan bahan pameran yang interaktif akan mewujudkan simulasi sebenar persekitaran ruangan angkasa.",
          url: environment.portalUrl + "exhibit",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description:
            "Pameran yang bertemakan astronomi dan penerokaan angkasa disediakan supaya pengunjung dapat merasai pengalaman pembelajaran yang unik melalui konsep hands-on dan minds-on. Ruangan pameran yang dilengkapi dengan bahan pameran yang interaktif akan mewujudkan simulasi sebenar persekitaran ruangan angkasa.",
          twitter_title: "Pameran",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "exhibit",
        },
      },
    ],
  },
  {
    path: "facility",
    children: [
      {
        path: "",
        component: FacilityComponent,
        data: {
          title: "Fasiliti",
          description: "",
          url: environment.portalUrl + "facility",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description: "",
          twitter_title: "Fasiliti",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "facility",
        },
      },
      {
        path: "details/:id",
        component: FacilityDetailsComponent,
        data: {
          title: "Fasiliti",
          description: "",
          url: environment.portalUrl + "facility",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description: "",
          twitter_title: "Fasiliti",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "facility",
        },
      },
      {
        path: "details/:id/:zone",
        component: FacilityDetailZonesComponent,
        data: {
          title: "Fasiliti",
          description: "",
          url: environment.portalUrl + "facility",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description: "",
          twitter_title: "Fasiliti",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "facility",
        },
      },
    ],
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "payment",
    component: PaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "receipt",
    component: ReceiptComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "program",
    children: [
      {
        path: "",
        component: ProgramComponent,
        data: {
          title: "Program Pendidikan",
          description:
            "Modul Pendidikan dibangunkan untuk mempromosikan pengajaran dan pembelajaran astronomi secara hands-on dalam menarik minat dan meningkatkan kesedaran terhadap kepentingan sains angkasa dan astronomi kepada masyarakat umum terutamanya guru dan murid sekolah. Pelbagai modul interaktif dibangunkan dalam menyokong kurikulum standard sekolah rendah dan menengah melalui pendekatan secara “informal”. Melalui pendekatan ini secara tidak langsung memberikan pendedahan terutamanya di kalangan murid dari aspek pemahaman teori sains, hukum-hukum sains, pengiraan matematik malahan juga gabungan aspek komunikasi sains, kreativiti dan kemahiran berfikir aras tinggi. Pembangunan modul pendidikan yang berbentuk Minds-On, Hearts-On, Hands-On Learning Engagement memperkukuhkan dan memperkembangkan pendidikan sains angkasa dan astronomi dan menambah nilai (add value) kepada silibus pendidikan sedia ada.",
          url: environment.portalUrl + "program",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description: "",
          twitter_title: "Program Pendidikan",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "program",
        },
      },
      {
        path: "forms/:id",
        component: ProgramFormsComponent,
        data: {
          title: "Program Pendidikan",
          description:
            "Modul Pendidikan dibangunkan untuk mempromosikan pengajaran dan pembelajaran astronomi secara hands-on dalam menarik minat dan meningkatkan kesedaran terhadap kepentingan sains angkasa dan astronomi kepada masyarakat umum terutamanya guru dan murid sekolah. Pelbagai modul interaktif dibangunkan dalam menyokong kurikulum standard sekolah rendah dan menengah melalui pendekatan secara “informal”. Melalui pendekatan ini secara tidak langsung memberikan pendedahan terutamanya di kalangan murid dari aspek pemahaman teori sains, hukum-hukum sains, pengiraan matematik malahan juga gabungan aspek komunikasi sains, kreativiti dan kemahiran berfikir aras tinggi. Pembangunan modul pendidikan yang berbentuk Minds-On, Hearts-On, Hands-On Learning Engagement memperkukuhkan dan memperkembangkan pendidikan sains angkasa dan astronomi dan menambah nilai (add value) kepada silibus pendidikan sedia ada.",
          url: environment.portalUrl + "program",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description: "",
          twitter_title: "Program Pendidikan",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "program",
        },
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "publication",
    children: [
      {
        path: "",
        component: PublicationComponent,
        data: {
          title: "Penerbitan",
          description: "",
          url: environment.portalUrl + "publication",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description: "",
          twitter_title: "Penerbitan",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "publication",
        },
      },
      {
        path: "lists/:id",
        component: PublicationListsComponent,
        data: {
          title: "Penerbitan",
          description: "",
          url: environment.portalUrl + "publication",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description: "",
          twitter_title: "Penerbitan",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "publication",
        },
      },
    ],
  },
  {
    path: "shows",
    children: [
      {
        path: "",
        component: ShowsComponent,
        data: {
          title: "Tayangan",
          description:
            "Teater Angkasa menyerupai sebuah panggung wayang yang menjadi penanda aras sesebuah Planetarium. Ia boleh dilihat dari segi skala saiz yang mampu memuatkan sehingga 200 orang penonton dalam satu masa dan infrastruktur teknologi bagi membantu mensimulasikan pergerakan dan keunikan objek yang berbeza dalam galaksi. Ia mempunyai kubah aluminium hemisfera yang dilengkapi system bunyi sekelliling digital 6-saluran. Dua projektor full dome immersive system memberikan tayangan astronomi dan simulasi langit malam menyerupai sebuah balai cerap.",
          url: environment.portalUrl + "shows",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description:
            "Teater Angkasa menyerupai sebuah panggung wayang yang menjadi penanda aras sesebuah Planetarium. Ia boleh dilihat dari segi skala saiz yang mampu memuatkan sehingga 200 orang penonton dalam satu masa dan infrastruktur teknologi bagi membantu mensimulasikan pergerakan dan keunikan objek yang berbeza dalam galaksi. Ia mempunyai kubah aluminium hemisfera yang dilengkapi system bunyi sekelliling digital 6-saluran. Dua projektor full dome immersive system memberikan tayangan astronomi dan simulasi langit malam menyerupai sebuah balai cerap.",
          twitter_title: "Tayangan",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "shows",
        },
      },
      {
        path: "shows-book/:id",
        component: ShowsBookComponent,
        data: {
          title: "Tayangan",
          description:
            "Teater Angkasa menyerupai sebuah panggung wayang yang menjadi penanda aras sesebuah Planetarium. Ia boleh dilihat dari segi skala saiz yang mampu memuatkan sehingga 200 orang penonton dalam satu masa dan infrastruktur teknologi bagi membantu mensimulasikan pergerakan dan keunikan objek yang berbeza dalam galaksi. Ia mempunyai kubah aluminium hemisfera yang dilengkapi system bunyi sekelliling digital 6-saluran. Dua projektor full dome immersive system memberikan tayangan astronomi dan simulasi langit malam menyerupai sebuah balai cerap.",
          url: environment.portalUrl + "shows",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description:
            "Teater Angkasa menyerupai sebuah panggung wayang yang menjadi penanda aras sesebuah Planetarium. Ia boleh dilihat dari segi skala saiz yang mampu memuatkan sehingga 200 orang penonton dalam satu masa dan infrastruktur teknologi bagi membantu mensimulasikan pergerakan dan keunikan objek yang berbeza dalam galaksi. Ia mempunyai kubah aluminium hemisfera yang dilengkapi system bunyi sekelliling digital 6-saluran. Dua projektor full dome immersive system memberikan tayangan astronomi dan simulasi langit malam menyerupai sebuah balai cerap.",
          twitter_title: "Tayangan",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "shows",
        },
        canActivate: [AuthGuard, CloseBookingGuard],
      },
    ],
  },
  {
    path: "survey",
    component: SurveyComponent,
    data: {
      title: "Maklum Balas / Soal Selidik",
      description: "",
      url: environment.portalUrl + "survey",
      site_name: "Planetarium Negara",
      image: environment.assetUrl + "logo/planetarium-logo.png",
      twitter_card: "summary",
      twitter_description: "",
      twitter_title: "Maklum Balas / Soal Selidik",
      twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
      twitter_url: environment.portalUrl + "survey",
    },
  },
  {
    path: "visit",
    component: VisitComponent,
    data: {
      title: "Lawatan",
      description:
        "Sebagai pusat pendidikan astronomi negara pengunjung dapat mempelajari dan memahami astronomi melalui medium penyampaian yang interaktif dan menarik. Planetarium Negara menyediakan info dan maklumat melalui bahan pameran, tayangan angkasa, kembara simulasi dan kemudahan fasiliti yang mampu menjadikan lawatan ke Planetarium Negara sesuatu yang bermakna kepada pengunjung.",
      url: environment.portalUrl + "visit",
      site_name: "Planetarium Negara",
      image: environment.assetUrl + "logo/planetarium-logo.png",
      twitter_card: "summary",
      twitter_description:
        "Sebagai pusat pendidikan astronomi negara pengunjung dapat mempelajari dan memahami astronomi melalui medium penyampaian yang interaktif dan menarik. Planetarium Negara menyediakan info dan maklumat melalui bahan pameran, tayangan angkasa, kembara simulasi dan kemudahan fasiliti yang mampu menjadikan lawatan ke Planetarium Negara sesuatu yang bermakna kepada pengunjung.",
      twitter_title: "Lawatan",
      twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
      twitter_url: environment.portalUrl + "visit",
    },
  },
  {
    path: "simulator-ride",
    children: [
      {
        path: "",
        component: SimulatorRideComponent,
        data: {
          title: "Kembara Simulasi",
          description:
            "Kembara Simulasi merupakan sebuah simulator kokpit dua tempat duduk yang memberikan pengalaman penerokaan dan penerbangan ke angkasa lepas. Pengunjung akan merasai pengalaman pergerakan tiga paksi dengan kebebasan pergerakan 360 darjah.",
          url: environment.portalUrl + "simulator-ride",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description:
            "Kembara Simulasi merupakan sebuah simulator kokpit dua tempat duduk yang memberikan pengalaman penerokaan dan penerbangan ke angkasa lepas. Pengunjung akan merasai pengalaman pergerakan tiga paksi dengan kebebasan pergerakan 360 darjah.",
          twitter_title: "Kembara Simulasi",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "simulator-ride",
        },
      },
      {
        path: "simulator-ride-book",
        component: SimulatorRideBookComponent,
        canActivate: [AuthGuard, CloseBookingGuard],
      },
    ],
  },
  {
    path: "virtual-library",
    children: [
      {
        path: "",
        component: VirtualLibraryComponent,
        data: {
          title: "Kutubkhanah Mini",
          description: "",
          url: environment.portalUrl + "virtual-library",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description: "",
          twitter_title: "Kutubkhanah Mini",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "virtual-library",
        },
      },
      {
        path: "tentang-kami/:category_id",
        component: VirtualLibraryTentangKamiComponent,
        data: {
          title: "Kutubkhanah Mini",
          description: "",
          url: environment.portalUrl + "virtual-library",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description: "",
          twitter_title: "Kutubkhanah Mini",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "virtual-library",
        },
      },
      {
        path: "artikel-terkini/:category_id",
        component: VirtualLibraryArtikelTerkiniComponent,
        data: {
          title: "Kutubkhanah Mini",
          description: "",
          url: environment.portalUrl + "virtual-library",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description: "",
          twitter_title: "Kutubkhanah Mini",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "virtual-library",
        },
      },
      {
        path: "koleksi/:category_id",
        children: [
          {
            path: "",
            component: VirtualLibraryKoleksiComponent,
            data: {
              title: "Kutubkhanah Mini",
              description: "",
              url: environment.portalUrl + "virtual-library",
              site_name: "Planetarium Negara",
              image: environment.assetUrl + "logo/planetarium-logo.png",
              twitter_card: "summary",
              twitter_description: "",
              twitter_title: "Kutubkhanah Mini",
              twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
              twitter_url: environment.portalUrl + "virtual-library",
            },
          },
          {
            path: "arkib-kutubkhanah/:collection_id",
            component: VirtualLibraryArkibKutubkhanahComponent,
            data: {
              title: "Kutubkhanah Mini",
              description: "",
              url: environment.portalUrl + "virtual-library",
              site_name: "Planetarium Negara",
              image: environment.assetUrl + "logo/planetarium-logo.png",
              twitter_card: "summary",
              twitter_description: "",
              twitter_title: "Kutubkhanah Mini",
              twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
              twitter_url: environment.portalUrl + "virtual-library",
            },
          },
          {
            path: "e-sumber/:collection_id",
            component: VirtualLibraryEsumberComponent,
            data: {
              title: "Kutubkhanah Mini",
              description: "",
              url: environment.portalUrl + "virtual-library",
              site_name: "Planetarium Negara",
              image: environment.assetUrl + "logo/planetarium-logo.png",
              twitter_card: "summary",
              twitter_description: "",
              twitter_title: "Kutubkhanah Mini",
              twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
              twitter_url: environment.portalUrl + "virtual-library",
            },
          },
          {
            path: "buku/:collection_id",
            component: VirtualLibraryBukuComponent,
            data: {
              title: "Kutubkhanah Mini",
              description: "",
              url: environment.portalUrl + "virtual-library",
              site_name: "Planetarium Negara",
              image: environment.assetUrl + "logo/planetarium-logo.png",
              twitter_card: "summary",
              twitter_description: "",
              twitter_title: "Kutubkhanah Mini",
              twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
              twitter_url: environment.portalUrl + "virtual-library",
            },
          },
          {
            path: "terbitan-bersiri/:collection_id",
            component: VirtualLibraryTerbitanBersiriComponent,
            data: {
              title: "Kutubkhanah Mini",
              description: "",
              url: environment.portalUrl + "virtual-library",
              site_name: "Planetarium Negara",
              image: environment.assetUrl + "logo/planetarium-logo.png",
              twitter_card: "summary",
              twitter_description: "",
              twitter_title: "Kutubkhanah Mini",
              twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
              twitter_url: environment.portalUrl + "virtual-library",
            },
          },
        ],
      },
      {
        path: "perkhidmatan/:category_id",
        component: VirtualLibraryPerkhidmatanComponent,
        data: {
          title: "Kutubkhanah Mini",
          description: "",
          url: environment.portalUrl + "virtual-library",
          site_name: "Planetarium Negara",
          image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_card: "summary",
          twitter_description: "",
          twitter_title: "Kutubkhanah Mini",
          twitter_image: environment.assetUrl + "logo/planetarium-logo.png",
          twitter_url: environment.portalUrl + "virtual-library",
        },
      },
    ],
  },
  {
    path: "about-us",
    component: AboutUsComponent,
  },
  {
    path: "organization-chart",
    component: OrganizationChartComponent,
  },
  {
    path: "mission-vision",
    component: MissionVisionComponent,
  },
  {
    path: "operating-hour",
    component: OperatingHourComponent,
  },
  {
    path: "directory",
    component: DirectoryComponent,
  },
  {
    path: "pdpa",
    component: PdpaComponent,
  },
  {
    path: "faq",
    component: FaqComponent,
  },
  {
    path: "noc",
    component: NocComponent,
  },
  {
    path: "charter",
    component: CharterComponent,
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
  },
  {
    path: "copyright-notice",
    component: CopyrightNoticeComponent,
  },
  {
    path: "disclaimer",
    component: DisclaimerComponent,
  },
  {
    path: "cio",
    component: CioComponent,
  },
  {
    path: "employee-directory",
    component: EmployeeDirectoryComponent,
  },
  {
    path: "quick-link",
    component: QuickLinkComponent,
  },
  {
    path: "schedule",
    component: ScheduleComponent,
  },
  {
    path: "cash-payment",
    component: CashPaymentComponent,
  },
  {
    path: "bookings",
    component: BookingsComponent,
  },
  {
    path: "application",
    component: ApplicationComponent,
  },
  {
    path: "customer-display",
    component: CustomerDisplayComponent,
  },
  {
    path: "print-test",
    component: ThermalPrinterComponent,
  },
  {
    path: "reporting",
    component: ReportingComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "reporting-print",
    component: ReportingPrintComponent,
  },
  {
    path: "qr-payment",
    component: QrPayComponent,
  },
  {
    path: "transactions-list",
    component: TransactionsListComponent,
  }










];
