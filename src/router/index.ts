import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/Home_Page/HomeView.vue";
import GroupCreateView from "../views/Group_Param_Page/Group_Create_View.vue";
import GroupEditView from "../views/Group_Param_Page/Group_Edit_View.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/create",
    name: "group_creation",
    component: GroupCreateView,
  },
  {
    path: "/group/:id/edit",
    name: "group_edit",
    component: GroupEditView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
