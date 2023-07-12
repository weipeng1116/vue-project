import Vue from 'vue'
import App from './App.vue'
// import ElementUI, {Row,Button} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import ElementUI from 'element-ui';
import store from './store';
import './api/mock';
import Cookie from 'js-cookie'


Vue.config.productionTip = false


//全局引入
Vue.use(ElementUI)


// //按需引入
// Vue.use(Row)
// Vue.use(Button)

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {  
       //token存不存在
       const token =Cookie.get('token')
       //token不存在，说明当前用户是未登录应该跳转至登录页
       if(!token && to.name !== 'login') {
        next({name:'login'})
       } else if(token && to.name === 'login'){//token存在，说明用户登录，此时跳转首页
        next({name: 'home'})
      }else {
        next();
      }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
