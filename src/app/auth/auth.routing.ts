import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";

export const AuthRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "logout",
        component: LogoutComponent,
      },
    ],
  },
];
