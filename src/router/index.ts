import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			meta: { title: '登录' },
			component: Login
		},
		{
			path: '',
			component: Layout,
			children: [
				{
					path: '/',
					name: 'home',
					meta: { title: '首页' },
					component: () => import('../views/Home/index.vue')
				}, 
				{
					path: '/member',
					name: 'member',
					meta: { title: '会员' },
					component: () => import('../views/Member/index.vue')
				},
				{
					path: '/viewMember',
					name: 'viewMember',
					meta: { title: '查看会员' },
					component: () => import('../views/Member/ViewMember.vue')
				},
				{
					path: '/addMember',
					name: 'addMember',
					meta: { title: '添加会员' },
					component: () => import('../views/Member/AddMember.vue')
				},
				{
					path: '/editMember',
					name: 'editMember',
					meta: { title: '编辑会员' },
					component: () => import('../views/Member/EditMember.vue')
				},
				{
					path: '/thing',
					name: 'thing',
					meta: { title: '事物' },
					component: () => import('../views/Thing/index.vue')
				}, 
				{
					path: '/addThing',
					name: 'addThing',
					meta: { title: '添加事物' },
					component: () => import('../views/Thing/AddThing.vue')
				},
				{
					path: '/editThing',
					name: 'editThing',
					meta: { title: '编辑事物' },
					component: () => import('../views/Thing/EditThing.vue')
				},
				{
					path: '/viewThing',
					name: 'viewThing',
					meta: { title: '查看事物' },
					component: () => import('../views/Thing/ViewThing.vue')
				},
				{
					path: '/sysUser',
					name: 'sysUser',
					meta: { title: '系统用户' },
					component: () => import('../views/SysUser/index.vue')
				},
				{
					path: '/addSysUser',
					name: 'addSysUser',
					meta: { title: '添加系统用户' },
					component: () => import('../views/SysUser/AddSysUser.vue')
				},
				{
					path: '/editSysUser',
					name: 'editSysUser',
					meta: { title: '编辑系统用户' },
					component: () => import('../views/SysUser/EditSysUser.vue')
				},
				{
					path: '/viewSysUser',
					name: 'viewSysUser',
					meta: { title: '查看系统用户' },
					component: () => import('../views/SysUser/ViewSysUser.vue')
				},
			]
		}
	]
})

export default router
