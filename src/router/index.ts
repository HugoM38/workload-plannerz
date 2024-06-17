import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomePages/HomeView.vue";
import TeamCreateView from "@/views/TeamParamPages/TeamCreateView.vue";
import TeamEditView from "@/views/TeamParamPages/TeamEditView.vue";
import TaskCreateView from "@/views/TaskParamPages/TaskCreateView.vue";
import TaskEditView from "@/views/TaskParamPages/TaskEditView.vue";

import LoginView from "@/views/AuthPages/LoginView.vue";
import RegisterView from "@/views/AuthPages/RegisterView.vue";
import TeamDetailsView from "@/views/TeamParamPages/TeamDetailsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/team/:teamData",
    name: "team_view",
    component: TeamDetailsView,
  },
  {
    path: "/create",
    name: "team_creation",
    component: TeamCreateView,
  },
  {
    path: "/team/:teamData/edit",
    name: "team_edit",
    component: TeamEditView,
    props: true,
  },
  {
    path: "/team/:id/task/create",
    name: "task_create",
    component: TaskCreateView,
    props: true,
  },
  {
    path: "/team/:id/task/:id_task/edit",
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
