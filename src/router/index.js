import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '工作台', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/operation',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '运营工具', icon: 'lock' },
    alwaysShow: true,
    children: [
      {
        path: 'vehicle',
        name: 'vehicle',
        component: () => import('@/views/operation/vehicle/index'),
        meta: { title: '车辆运维'}
      },
      {
        path: 'journal',
        name: 'journal',
        component: () => import('@/views/operation/journal/index'),
        meta: { title: '车辆日志' }
      },
      {
        path: 'regional',
        name: 'regional',
        component: () => import('@/views/operation/regional/index'),
        meta: { title: '区域配置' }
      },
      {
        path: 'charge',
        name: 'charge',
        component: () => import('@/views/operation/charge/index'),
        meta: { title: '收费设置' }
      },
      {
        path: 'qrcode',
        name: 'qrcode',
        component: () => import('@/views/operation/qrcode/index'),
        meta: { title: '二维码导出' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '用户管理', icon: 'lock' },
    alwaysShow: true,
    children: [
      {
        path: 'orderrecord',
        name: 'orderrecord',
        component: () => import('@/views/order/orderrecord/index'),
        meta: { title: '订单记录' }
      },
      {
        path: 'recharge',
        name: 'recharge',
        component: () => import('@/views/order/recharge/index'),
        meta: { title: '充值退款' }
      },
      // {
      //   path: 'cardrecharge',
      //   name: 'cardrecharge',
      //   component: () => import('@/views/order/cardrecharge/index'),
      //   meta: { title: '卡充值记录' }
      // },
      {
        path: 'administration',
        name: 'administration',
        component: () => import('@/views/order/administration/index'),
        meta: { title: '用户管理' }
      }
    ]
  },
  {
    path: '/car',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '车辆管理', icon: 'lock' },
    alwaysShow: true,
    children: [
      {
        path: 'carmanag',
        name: 'carmanag',
        component: () => import('@/views/car/carmanag/index'),
        meta: { title: '车辆管理'}
      },
      {
        path: 'battery',
        name: 'battery',
        component: () => import('@/views/car/battery/index'),
        meta: { title: '电池管理' }
      },
      // {
      //   path: 'vehicletype',
      //   name: 'vehicletype',
      //   component: () => import('@/views/car/vehicletype/index'),
      //   meta: { title: '车型设置' }
      // }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '活动管理', icon: 'lock' },
    alwaysShow: true,
    children: [
      {
        path: 'configuration',
        name: 'configuration',
        component: () => import('@/views/activity/configuration/index'),
        meta: { title: '活动配置'}
      },
      {
        path: 'ticket',
        name: 'ticket',
        component: () => import('@/views/activity/ticket/index'),
        meta: { title: '骑行券配置' }
      },
      {
        path: 'share',
        name: 'share',
        component: () => import('@/views/activity/share/index'),
        meta: { title: '分享配置' }
      }
    ]
  },
  {
    path: '/systemconfig',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '人员配置', icon: 'lock' },
    alwaysShow: true,
    children: [
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/systemconfig/role'),
        meta: { title: '系统角色' }
      },
      {
        path: 'role/add',
        name: 'RoleAdd',
        component: () => import('@/views/systemconfig/components/add'),
        hidden: true,
        meta: { title: '新增系统角色' }
      },
      {
        path: 'role/edit',
        name: 'RoleEdit',
        component: () => import('@/views/systemconfig/components/edit'),
        hidden: true,
        meta: { title: '修改系统角色' }
      },
      {
        path: 'largearea',
        name: 'largearea',
        component: () => import('@/views/systemconfig/largearea'),
        meta: { title: '大区管理'}
      },
      {
        path: 'franchisee',
        name: 'franchisee',
        component: () => import('@/views/systemconfig/franchisee'),
        meta: { title: '加盟商管理'}
      },
      {
        path: 'region',
        name: 'region',
        component: () => import('@/views/systemconfig/region'),
        meta: { title: '区域管理' }
      },
      {
        path: 'mochaitmo',
        name: 'mochaitmo',
        component: () => import('@/views/systemconfig/mochaitmo'),
        meta: { title: '运维管理' }
      },
      {
        path: 'staff',
        name: 'staff',
        component: () => import('@/views/systemconfig/staff'),
        meta: { title: '员工管理' }
      }
    ]
  },
  // {
  //   path: '/setup',
  //   name: 'setup',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: { title: '基础设置', icon: 'lock' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'operate',
  //       name: 'operate',
  //       component: () => import('@/views/setup/operate/index'),
  //       meta: { title: '运营人员管理'}
  //     },
  //     {
  //       path: 'operate/create',
  //       name: 'operateCreate',
  //       component: () => import('@/views/setup/operate/create'),
  //       meta: { title: "新增运营人员" },
  //       hidden: true
  //     },
  //     {
  //       path: 'operate/edit',
  //       name: 'operateEdit',
  //       component: () => import('@/views/setup/operate/edit'),
  //       meta: { title: "编辑运营人员" },
  //       hidden: true
  //     },
  //     {
  //       path: 'permission/index',
  //       name: 'permission',
  //       component: () => import('@/views/setup/permission/index'),
  //       meta: { title: '角色权限'}
  //     },
  //     {
  //       path: 'permission/create',
  //       name: 'permissionCreate',
  //       component: () => import('@/views/setup/permission/create'),
  //       meta: { title: "新增角色权限" },
  //       hidden: true
  //     },
  //     {
  //       path: 'permission/edit',
  //       name: 'permissionEdit',
  //       component: () => import('@/views/setup/permission/edit'),
  //       meta: { title: "编辑角色权限" },
  //       hidden: true
  //     }
  //   ]
  // },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   meta: { title: '角色权限', icon: 'lock'},
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'permission',
  //       component: () => import('@/views/permission/index'),
  //       meta: { title: '角色权限', icon: 'lock'}
  //     },
  //     {
  //       path: 'create',
  //       name: 'permissionCreate',
  //       component: () => import('@/views/permission/create'),
  //       meta: { title: "新增角色权限" },
  //       hidden: true
  //     },
  //     {
  //       path: 'edit',
  //       name: 'permissionEdit',
  //       component: () => import('@/views/permission/edit'),
  //       meta: { title: "编辑角色权限" },
  //       hidden: true
  //     }
  //   ]
  // },
  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'System',
  //   alwaysShow: true,
  //   meta: { title: '系统管理', icon: 'lock' },
  //   children: [
  //     {
  //       path: 'auth-manage',
  //       name: 'AuthManage',
  //       component: () => import('@/views/system/auth-manage'),
  //       alwaysShow: true,
  //       redirect: 'noRedirect',
  //       meta: { title: '权限管理' },
  //       children: [
  //         {
  //           path: 'auth',
  //           name: 'Auth',
  //           component: () => import('@/views/system/auth-manage/auth'),
  //           meta: { title: '权限列表' }
  //         },
  //         {
  //           path: 'role',
  //           name: 'Role',
  //           component: () => import('@/views/system/auth-manage/role'),
  //           meta: { title: '角色管理' }
  //         }
  //       ]
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    // path: '/system',
    // component: Layout,
    // redirect: 'noRedirect',
    // name: 'System',
    // alwaysShow: true,
    // meta: { title: '系统管理', icon: 'lock' },
    // children: [
    //   {
    //     path: 'auth-manage',
    //     name: 'AuthManage',
    //     component: () => import('@/views/system/auth-manage'),
    //     alwaysShow: true,
    //     redirect: 'noRedirect',
    //     meta: { title: '权限管理' },
    //     children: [
    //       {
    //         path: 'auth',
    //         name: 'Auth',
    //         component: () => import('@/views/system/auth-manage/auth'),
    //         meta: { title: '权限列表' }
    //       },
    //       {
    //         path: 'role',
    //         name: 'Role',
    //         component: () => import('@/views/system/auth-manage/role'),
    //         meta: { title: '角色管理' }
    //       }
    //     ]
    //   }
    // ]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const errorRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
