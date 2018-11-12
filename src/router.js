import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from './views/layout/Layout'
import Blank from './views/layout/Blank'

Vue.use(Router)

export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: false,
        meta: { title: '概览', icon: 'icon-shezhitianchong' },
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '概览', icon: 'icon-shouyetianchong' },
        }]
    },

    {
        path: '/resource',
        component: Layout,
        redirect: '/resource/index',
        name: 'resource_home',
        meta: { title: '资源管理', icon: 'icon-fenleiorguangchangorqitatianchong' },
        children: [
            // {
            //     path: 'index',
            //     name: 'resource_index',
            //     component: () => import('@/views/resource/index'),
            //     meta: { title: '概览', icon: 'icon-fenleiorguangchangorqitatianchong' }
            // },
            {
                path: 'store',
                name: 'resource_store',
                component: () => import('@/views/resource/store'),
                meta: { title: '存储', icon: 'icon-fenleiorguangchangorqitatianchong' }
            },
            {
                path: 'quota',
                name: 'resource_quota',
                component: () => import('@/views/resource/quota'),
                meta: { title: '配额规格', icon: 'icon-fenleiorguangchangorqitatianchong' }
            },
            {
                path: 'mirror',
                name: 'resource_mirror',
                component: () => import('@/views/resource/mirror'),
                meta: { title: '镜像', icon: 'icon-fenleiorguangchangorqitatianchong' }
            },
            {
                path: 'node',
                name: 'resource_node',
                component: () => import('@/views/resource/node'),
                meta: { title: '节点管理', icon: 'icon-fenleiorguangchangorqitatianchong' }
            }
            
        ]
    },
    {
        path: '/project',
        component: Layout,
        redirect: '/project/index',
        name: 'project_home',
        meta: { title: '项目中心', icon: 'icon-yibantishi' },
        children: [
            {
                path: 'index',
                name: 'project_index',
                component: () => import('@/views/project/index'),
                meta: { title: '项目空间', icon: 'icon-yibantishi' }
            }
        ]
    },
    // {
    //     path: '/AI',
    //     component: Layout,
    //     redirect: '/AI/index',
    //     name: 'AI_home',
    //     meta: { title: 'AI实验室', icon: 'icon-yibantishi' },
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'AI_index',
    //             component: () => import('@/views/AI/index'),
    //             meta: { title: 'AI实验室', icon: 'icon-yibantishi' }
    //         },
    //         {
    //             path: 'info',
    //             name: 'AI_info',
    //             hidden: true,
    //             component: () => import('@/views/AI/info'),
    //             meta: { title: '实验室信息', icon: 'icon-xinfengtianchong' },
    //         }
    //     ]
    // },
    {
        path: '/practice',
        component: Layout,
        redirect: '/practice/index',
        meta: { title: '训练中心', icon: 'icon-fasongxinxitianchong' },
        children: [
            {
                path: 'index',
                name: 'practice_index',
                component: () => import('@/views/practice/index'),
                meta: { title: '训练', icon: 'icon-chahuafeitianchong' }
            },
            {
                path: 'template',
                name: 'practice_template',
                component: () => import('@/views/practice/template'),
                meta: { title: '训练模版', icon: 'icon-chahuafeitianchong' }
            },
            {
                path: '/practice/create',
                name: 'practice_create',
                hidden: true, 
                component: () => import('@/views/practice/create'),
                meta: { title: '创建训练', icon: 'icon-fasongxinxitianchong' }
            }
        ]
    },

    {
        path: '/user',
        component: Layout,
        redirect: '/user/index',
        name: 'user_home',
        meta: { title: '用户管理', icon: 'icon-yonghutianchong' },
        children: [
            {
                path: 'index',
                name: 'user_index',
                component: () => import('@/views/user/index'),
                meta: { title: '用户信息', icon: 'icon-yonghutianchong' }
            },
            // {
            //     path: 'log',
            //     name: 'user_log',
            //     component: () => import('@/views/user/log'),
            //     meta: { title: '用户日志', icon: 'icon-yonghutianchong' }
            // },
            {
                path: 'editUser',
                name: 'account_user',
                hidden: true,
                component: () => import('@/views/user/edit_account'),
                meta: { title: '修改账户', icon: 'icon-xinfengtianchong' }
            },
            {
                path: 'editPsd',
                name: 'account_psd',
                hidden: true,
                component: () => import('@/views/user/edit_psd'),
                meta: { title: '修改密码', icon: 'icon-xinfengtianchong' }
            }
        ]
    },

    {
        path: '/alert',
        component: Layout,
        redirect: '/alert/index',
        name: 'alert_home',
        meta: { title: '告警管理', icon: 'icon-yonghutianchong' },
        children: [
            {
                path: 'index',
                name: 'alert_index',
                component: () => import('@/views/alert/index'),
                meta: { title: '告警', icon: 'icon-yonghutianchong' }
            }
        ]
    },

    {
        path: '/log',
        component: Layout,
        redirect: '/log/index',
        name: 'user_log',
        meta: { title: '日志管理', icon: 'icon-yonghutianchong' },
        children: [
            {
                path: 'index',
                name: 'log_index',
                component: () => import('@/views/user/log'),
                meta: { title: '日志', icon: 'icon-yonghutianchong' }
            }
        ]
    },

    // {
    //     path: '/platform',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'platform_index',
    //             component: () => import('@/views/platform/index'),
    //             meta: { title: '平台信息', icon: 'icon-bangzhu' }
    //         }
    //     ]
    // },

    // 数据科学家首次登录页
    {
        path: '/init/user',
        component: Blank,
        hidden: true,
        children: [
            {
                path: 'editPsd',
                name: 'init_user_editPsd',
                component: () => import('@/views/user/edit_psd'),
                meta: { title: '修改初始密码', icon: 'icon-xinfengtianchong' }
            },
            {
                path: 'welcome',
                name: 'init_user_welcome',
                component: () => import('@/views/user/init/welcome'),
                meta: { title: '欢迎页', icon: 'icon-xinfengtianchong' }
            },
            {
                path: 'quota',
                name: 'init_user_quota',
                component: () => import('@/views/user/init/quota'),
                meta: { title: '配额说明页', icon: 'icon-xinfengtianchong' }
            },
            {
                path: 'laboratory',
                name: 'init_user_laboratory',
                component: () => import('@/views/AI/index'),
                meta: { title: '初始化实验室', icon: 'icon-xinfengtianchong' }
            },
            {
                path: 'laboratory/info',
                name: 'init_user_laboratory_info',
                component: () => import('@/views/AI/info'),
                meta: { title: '实验室信息', icon: 'icon-xinfengtianchong' },
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
];
export default new Router({
    // mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
