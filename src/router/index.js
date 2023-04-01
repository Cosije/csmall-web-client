import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView,
    children: [
      {
        path: '/sys-admin/temp/admin/add-new',
        component: () => import('../views/sys-admin/temp/AdminAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/admin/list',
        component: () => import('../views/sys-admin/temp/AdminListView.vue')
      },
      {
        path: '/sys-admin/temp/album/add-new',
        component: () => import('../views/sys-admin/temp/AlbumAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/brand/add-new',
        component: () => import('../views/sys-admin/temp/BrandAddNewView.vue')
      },
      {
        path: '/sys-admin/temp/category/add-new',
        component: () => import('../views/sys-admin/temp/AddCategory.vue')
      },
      {
        path: '/sys-admin/temp/attributeTemplate/add-new',
        component: () => import('../views/sys-admin/temp/AttributeTemplate.vue')
      }
    ]
  },
  {
    path: '/about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
