import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Menu from "../views/Menu";
import Game from "../views/Game";
import Tutorial from "../views/Tutorial";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Start",
    component: Home
  },
  {
    path: "/Menu",
    name: "Menu",
    component: Menu
  },
  {
    path: "/Game1",
    name: "Game1",
    component: Game
  },
  {
    path: "/Tutorial1",
    name: "Tutorial1",
    component: Tutorial
  }
];

// eslint-disable-next-line no-new
const router = new VueRouter({
  routes
});

export default router;
