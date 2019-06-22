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
					path: '/sysUser',
					name: 'sysUser',
					meta: { title: '系统用户' },
					component: () => import('../views/SysUser/index.vue')
				}
			]
		}
	]
})

export default router
