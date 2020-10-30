import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue";
import detailPage from "../views/detailPage.vue";
import logIn from "../views/logIn.vue"
import register from "../views/register.vue"

// remember transition for router.

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: home,
    props: {name: 'home', title: ['الأخبار', 'جامعتي']}
  },
  {
    path: '/news',
    name: 'News',
    component: home,
    props: {name: 'news', title: ['الأخبار']}
  },
  {
    path: "/university",
    name: "University",
    component: home,
    props: {name: 'universities', title: ['جامعتي']}
  },
  {
    path: "/n",
    name: "n",
    component: detailPage,
  },
  {
    path: "/login",
    name: "logIn",
    component: logIn
  },
  {
    path: "/register",
    name: "Register",
    component: register,
    
  }, 

];


const router = new VueRouter({
  routes
});

export default router;
