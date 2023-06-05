import App from './App'
import userMixin from '@/common/rulesMixin.js'
import checkMixin from "@/common/checkMixin.js"
import module from '@/ajax/api/index.js'
import store from './store/index.js'
import Md5 from 'js-md5'


Vue.config.productionTip = false;
Vue.use(userMixin);
Vue.use(checkMixin);
Vue.prototype.$http = module;
Vue.prototype.$md5 = Md5;
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
