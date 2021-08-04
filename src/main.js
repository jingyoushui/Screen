import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import('element-ui/lib/theme-chalk/index.css')
Vue.config.productionTip = false;

Vue.use(ElementUI);
import Axios from "axios";
Vue.prototype.$axios=Axios

import ckeditor4 from "./page/ckeditor4";
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
	    App,
        "ckeditor4":ckeditor4,
	}
})
