import { Routes } from "@angular/router";
import { EcommerceComponent } from "./pages/dashboard/ecommerce/ecommerce.component";

import { NotFoundComponent } from "./pages/other-page/not-found/not-found.component";
import { AppLayoutComponent } from "./shared/layout/app-layout/app-layout.component";
import { SignInComponent } from "./pages/auth-pages/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/auth-pages/sign-up/sign-up.component";
import { authChildGuard, authGuard } from "./core/guards/auth.guard";
import { noAuthChildGuard, noAuthGuard } from "./core/guards/noauth.guard";


const noAuthGuards = {
  canActivate: [noAuthGuard],
  canActivateChild: [noAuthChildGuard],
};

export const routes: Routes = [
  {
    path: "",
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    component: AppLayoutComponent,
    children: [
      {
        path: "",
        component: EcommerceComponent,
        pathMatch: "full",
        title: "Stock Management",
      },

      {
        path: "users",
        loadComponent: () => import('../app/pages/users/list/list.users.component').then(m => m.ListUsersComponent),
        title: "Users",
      },

    ],
  },

  {
    ...noAuthGuards,
    path: "signin",
    component: SignInComponent,
    title:
      "Angular Sign In Dashboard | TailAdmin - Angular Admin Dashboard Template",
  },
  {
    ...noAuthGuards,
    path: "signup",
    component: SignUpComponent,
    title:
      "Angular Sign Up Dashboard | TailAdmin - Angular Admin Dashboard Template",
  },
  // error pages
  {
    ...noAuthGuards,
    path: "**",
    component: NotFoundComponent,
    title:
      "Angular NotFound Dashboard | TailAdmin - Angular Admin Dashboard Template",
  },
];
