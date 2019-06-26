import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import app from './modules/app'
import sysUser from './modules/sysUser'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [
		// localStorage
		createPersistedState({
			storage: window.localStorage,
			reducer: val => {
				return {
					sysUser: val.sysUser
				}
			}
		}),
		// sessionStorage
		createPersistedState({
			storage: window.sessionStorage,
			reducer: val => {
				return {
					app: val.app
				}
			}
		})
	],
	modules: {
		app,
		sysUser
	},
	getters
})
