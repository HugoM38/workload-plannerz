import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomePages/HomeView.vue";
import TeamCreateView from "@/views/TeamPages/TeamCreateView.vue";
import TeamEditView from "@/views/TeamPages/TeamEditView.vue";
import TaskCreateView from "@/views/TaskPages/TaskCreateView.vue";
import TaskMemberView from "@/views/TaskPages/TaskMemberView.vue";
import TaskEditView from "@/views/TaskPages/TaskEditView.vue";
import LoginView from "@/views/AuthPages/LoginView.vue";
import RegisterView from "@/views/AuthPages/RegisterView.vue";
import TeamDetailsView from "@/views/TeamPages/TeamDetailsView.vue";
import { isLoggedIn } from "@/models/UseUser";

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
    meta: { requiresAuth: true },
  },
  {
    path: "/create",
    name: "team_creation",
    component: TeamCreateView,
    meta: { requiresAuth: true },
  },
  {
    path: "/team/:teamData/edit",
    name: "team_edit",
    component: TeamEditView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/team/:teamId/:memberId/",
    name: "member_tasks",
    component: TaskMemberView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/team/:id/task/create",
    name: "task_create",
    component: TaskCreateView,
    props: (route) => ({
      teamId: route.params.id,
    }),
    meta: { requiresAuth: true },
  },
  {
    path: "/team/:teamId/task/update/:taskData",
    name: "task_update",
    component: TaskEditView,
    props: (route) => ({
      teamId: route.params.teamId,
      taskData: route.params.taskData,
    }),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { requiresGuest: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = isLoggedIn.value;

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next({ name: "login" });
  } else if (
    to.matched.some((record) => record.meta.requiresGuest) &&
    loggedIn
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
