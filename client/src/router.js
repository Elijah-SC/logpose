import { createRouter, createWebHashHistory } from "vue-router";
import { authGuard } from "@bcwdev/auth0provider-client";

function loadPage(page) {
  return () => import(`./pages/${page}.vue`);
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: loadPage("HomePage"),
  },
  {
    path: "/explore",
    name: "Explore",
    component: loadPage("ExplorePage"),
  },
  {
    path: "/about",
    name: "About",
    component: loadPage("AboutPage"),
  },
  {
    path: "/account",
    name: "Account",
    component: loadPage("AccountPage"),
    beforeEnter: authGuard,
  },
  {
    path: "/location/:locationId",
    name: "Location",
    component: loadPage("LocationPage"),
  }
];

export const router = createRouter({
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
  history: createWebHashHistory(),
  routes,
});
