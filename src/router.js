import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import ContactCoach from "./pages/request/ContactCoach.vue";
import RequestsReceived from "./pages/request/RequestsReceived.vue";
import NotFound from "./pages/NotFound.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import store from "./store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [{ path: "contact", component: ContactCoach }],
    },
    {
      path: "/register",
      component: CoachRegistration,
      meta: { reqAuth: true },
    },
    { path: "/request", component: RequestsReceived, meta: { reqAuth: true } },
    { path: "/auth", component: UserAuth, meta: { reqUnAuth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});
router.beforeEach((to, _, next) => {
  if (to.meta.reqAuth && !store.getters.isAuth) {
    next("/auth");
  } else if (to.meta.reqUnAuth && store.getters.isAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
