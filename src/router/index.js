import HomePage from '@/views/HomePage.vue'
import BoardListPage from '@/views/BoardListPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import BoadDetailPage from "@/views/BoardDetailPage.vue"
import ToastEditor from '@/components/editor/ToastEditor.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import MyPage from '@/views/MyPage.vue'
import PlaceSearch from '@/components/place/PlaceSearch.vue'
import PlaceSpecific from '@/components/place/PlaceSpecific.vue'
import { useMemberStore } from '@/stores/member'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },{
      path: '/board/list',
      name: 'board-list',
      component: BoardListPage
    },{
      path: '/board/write',
      name : 'board-write',
      component : ToastEditor
    },{
      path: '/board/:id',
      name : 'board-detail',
      component : BoadDetailPage
    },{
      path: '/member/login',
      name : 'login',
      component : LoginPage,
    },{
      path : '/member/regist',
      name : 'regist',
      component : SignUpPage
    },{
      path : '/member/profile',
      name : 'profile',
      component : MyPage
    },{
      path : '/place/search',
      name : 'place-search',
      component : PlaceSearch
    },{
      path : '/place/:id',
      name : 'place-specific',
      component : PlaceSpecific
    }
  ]
})
// 네비게이션 가드 설정
router.beforeEach((to, from, next) => {
  const memberStore = useMemberStore();
  const { isLogin } = memberStore;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogin) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }, // 로그인 후 돌아갈 페이지를 설정
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
