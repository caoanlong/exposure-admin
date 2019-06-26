import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from './filters/index'

import './assets/icons/index.js'

// register global utility filters.
Object.keys(filters).forEach((key: string) => {
	Vue.filter(key, (filters as any)[key])
})

Vue.prototype.$imgUrl = process.env.VUE_APP_IMG_URI

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')