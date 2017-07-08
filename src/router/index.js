import Vue from 'vue';
import Router from 'vue-router';
import Sell from '@/components/Sell';
import Buy from '@/components/Buy';
import Interest from '@/components/Interest';
import NavbarStore from '@/NavbarStore';

Vue.use(Router);

var router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Buy',
      component: Buy
    },
    {
      path: '/sell',
      name: 'Sell',
      component: Sell
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy
    },
    {
      path: '/interest',
      name: 'Interest',
      component: Interest
    }
  ]
});

router.beforeEach((to, from, next) => {
  // Make sure to close the navbar when in mobile mode
  NavbarStore.close();
  next();
});

export default router;
