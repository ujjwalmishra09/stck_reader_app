import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import BaseLayout from '../views/BaseLayout.vue'
import ViewMessagePage from '@/views/ViewMessagePage.vue';
import ChapterPage from '@/views/ChapterPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: () => import('../views/HomePage.vue'),
      },
      {
        path: 'library',
        component: () => import('../views/LibraryPage.vue'),
      },
      {
        path: 'search',
        component: () => import('../views/SearchPage.vue'),
      },
    ],
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: ViewMessagePage,
  },
  {
    path: '/chapter/:id',
    name: 'Chapter',
    component: ChapterPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
