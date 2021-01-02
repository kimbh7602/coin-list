import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import {setLoading} from '../store/type'
import CoinList from '../views/CoinList'
import BookmarkList from '../views/BookmarkList'
import CoinDetail from '../views/CoinDetail'
import Loading from '../components/Loading'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/loading',
    name: 'Loading',
    component: Loading,
  },
  {
    path: '/coinlist',
    name: 'CoinList',
    component: CoinList,
  },
  {
    path: '/bookmarklist',
    name: 'BookmarkList',
    component: BookmarkList,
  },
  {
    path: '/coindetail/:id',
    name: 'CoinDetail',
    component: CoinDetail,
    props: true,
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit(setLoading);
  if(to.path === '/') {
    next('/coinlist')
  }else {
    next();
  }
})

export default router
