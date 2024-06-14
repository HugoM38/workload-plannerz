import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/Home_Page/HomeView.vue";
import GroupCreateView from "../views/Group_Param_Page/Group_Create_View.vue";
import GroupEditView from "../views/Group_Param_Page/Group_Edit_View.vue";
import TaskCreateView from "../views/Task_Param_Page/Task_Create_View.vue";
import TaskEditView from "../views/Task_Param_Page/Task_Edit_View.vue";

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

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
  {
    path: "/group/:id/task/create",
    name: "task_create",
    component: TaskCreateView,
    props: true,
  },
  {
    path: "/group/:id/task/:id_task/edit",
    name: "task_edit",
    component: TaskEditView,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
