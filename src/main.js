import Vue from 'vue'
import axios from 'axios';
import router from "./router";
import localstorageservice from "./localstorageservice";
import func from "./fun"
import Vuetify from 'vuetify'
import toast from 'vue-toasted';
 import vuetify from './plugins/vuetify';
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'
import VueFontAwesomePicker from "vfa-picker";
import VueIconPicker from 'vue-icon-picker';
import 'vue-material-design-icons/styles.css';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';
//import * as VueThreejs from 'vue-threejs'
import VueSwal from 'vue-swal'
import '@mdi/font/css/materialdesignicons.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueRouterUserRoles from "vue-router-user-roles";
import AppAdmin from './components/admin/App.vue';
import AppOwner from "./components/Owner/AppOwner.vue"
import AppDelivery from "./components/DeliverCompanies/App.vue"
import * as VueThreejs from 'vue-threejs'
import {  USER_ROLE_GUEST,} from "./constants.js";




Vue.use(VueThreejs)

Vue.use(VueSweetalert2);
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('1d')


// Add a request interceptor
axios.interceptors.request.use(
   config => {
       const token = localstorageservice.getAccessToken();
       if (token) {
           config.headers['Authorization'] = 'Bearer ' + token;
       }
       return config;
   },
   error => {
       Promise.reject(error)
   });

//Add a response interceptor
axios.interceptors.response.use((response) => {
   return response
}, function (error) {
   const originalRequest = error.config;

   if (error.response.status === 401 && originalRequest.url ==='http://127.0.0.1:9999/api/auth/v2/refresh') {
       router.push('/login');
       return Promise.reject(error);
   }

   if (error.response.status === 401 && !originalRequest._retry) {

       originalRequest._retry = true;
       const refreshToken = localstorageservice.getRefreshToken();
       return axios.get('/auth/v2/refresh',
           {
               "refresh_token": refreshToken
           })
           .then(res => {
               if (res.status === 200) {

                   localstorageservice.setToken(res.data.data);
                   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localstorageservice.getAccessToken();
                   return axios(originalRequest);
               }
           })
   }
   return Promise.reject(error);
});















Vue.use(func)
Vue.use(VueSwal)
//Vue.use(VueThreejs)
Vue.use(Vuetify)
Vue.use(VueFontAwesomePicker);
Vue.use(VueIconPicker);
Vue.use(Autocomplete)
//Google Map//
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBPFDMtjV0nyVdedEBT169klxYqGCvy3tI',
    libraries: 'places',
  },
})
//import createAuthRefreshInterceptor from 'axios-auth-refresh';
Vue.use(require('vue-moment'));






export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.green, // #E539
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
})



Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://127.0.0.1:9999/api/';

Vue.use(Vuetify, {
  rtl: true
})


Vue.use (router);
Vue.use(toast);




//Auth Role
Vue.config.productionTip = false;
Vue.use(VueRouterUserRoles, { router });
var x=window.location.pathname;

var auth = '';
if(x=="/")
{

  if (Vue.$cookies.get('owner_info') == 'no cookies' || Vue.$cookies.get('owner_info') == null) {
  var  owner_info = {  id: '',name: '',session: '',email: '',role: null,  photo: ''};
     Vue.$cookies.set('owner_info',owner_info);
     owner_info.role = USER_ROLE_GUEST;
     auth = Promise.resolve(Vue.$cookies.set('owner_info', owner_info));
  } else {
    auth = Promise.resolve(Vue.$cookies.get('owner_info'.role));
  }

//End Refresh Token
let authenticate = auth;
authenticate.then(user => {
  Vue.prototype.$user.set(user);
  new Vue({
    render: h => h(AppOwner),
    vuetify,
    router
  }).$mount("#app");
});



}





else if(x=="/admin")
{

  if (Vue.$cookies.get('admin_info_bala') == 'no cookies' || Vue.$cookies.get('admin_info_bala') == null) {
  var  admin_info_bala = {  id: '',name: '',session: '',email: '',role: null,  photo: ''};
     Vue.$cookies.set('admin_info_bala',admin_info_bala);
     admin_info_bala.role = USER_ROLE_GUEST;
     auth = Promise.resolve(Vue.$cookies.set('admin_info_bala', admin_info_bala));
  } else {
    auth = Promise.resolve(Vue.$cookies.get('admin_info_bala'.role));
  }

//End Refresh Token
let authenticate = auth;
authenticate.then(user => {
  Vue.prototype.$user.set(user);
  new Vue({
    render: h => h(AppAdmin),
    vuetify,
    router
  }).$mount("#app");
});




}


 else if (x=="/delivery_company"){


  if (Vue.$cookies.get('delivery_info_bala') == 'no cookies' || Vue.$cookies.get('delivery_info_bala') == null) {
  var  delivery_info_bala = {  id: '',name: '',session: '',email: '',role: null,  photo: ''};
     Vue.$cookies.set('delivery_info_bala',delivery_info_bala);
     delivery_info_bala.role = USER_ROLE_GUEST;
     auth = Promise.resolve(Vue.$cookies.set('delivery_info_bala', delivery_info_bala));
  } else {
    auth = Promise.resolve(Vue.$cookies.get('delivery_info_bala'.role));
  }

//End Refresh Token
let authenticate = auth;
authenticate.then(user => {
  Vue.prototype.$user.set(user);
  new Vue({
    render: h => h(AppDelivery),
    vuetify,
    router
  }).$mount("#app");
});




}
