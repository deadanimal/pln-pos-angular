import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { CustomerLayoutComponent } from "./layouts/customer-layout/customer-layout.component";
import { CustomerSeatComponent } from "./layouts/customer-layout/customer-seat/customer-seat.component";
import { ShowsBookComponent } from "src/app/core/shows-book/shows-book.component";


const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "app",
        loadChildren: "./core/core.module#CoreModule",
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "auth",
        loadChildren: "./auth/auth.module#AuthModule",
      },
    ],
  },

  // path to customer-display layout
  {
    path: "customer-display",
    component: CustomerLayoutComponent,
  },
  {
    path: "seat/:id",
    component: CustomerSeatComponent,
  },


  {
    path: "**",
    redirectTo: "landing",
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
