<template>

  <v-app style="background:#f5f5f5">

    <div v-if="$user.get().role=='owner'">
      <v-navigation-drawer v-model="drawer" app width="300" clipped class="mx-auto" color="#2470a0" dark right>


        <!-- user info ui -->
        <v-list style="margin-top:20px" nav class="py-0">
          <v-row>
            <v-col>
              <v-avatar v-if="userImg">
                <img :src="userImg" alt="John" style="height:130%;width:130%">
              </v-avatar>


            </v-col>


            <v-col>
              <v-list-item-content class="mb-4" style="margin-right:10px">
                <v-list-item-title>{{admin_info.user_name}}</v-list-item-title>
                <v-list-item-subtitle>{{getname(admin_info.user_email)}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-col>
            <v-spacer></v-spacer>
            <v-col style="margin-top:6%">
              <v-btn icon @click="drawer=false">
                <v-icon>fas fa-arrow-right</v-icon>
              </v-btn>
            </v-col>



          </v-row>


          <v-divider></v-divider>
        </v-list>



        <!--Star Owner Sidbar-->
        <div v-if="$user.get().role=='owner'">

          <v-list style=" font-family: 'cairo' " to="/">

            <v-list-item to="/">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">mdi-home</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>ألرئسية</v-list-item-title>
              </v-list-item-content>
            </v-list-item>



            <v-list-item link to="/additem">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">fas fa-bookmark</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>المراكز </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link to="/request">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">fas fa-envelope</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title> الحجوزات</v-list-item-title>
              </v-list-item-content>
            </v-list-item>



            <v-list-item link to="/OwnerItemRating">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">fas fa-star</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>التقييم</v-list-item-title>
              </v-list-item-content>
            </v-list-item>


            <v-list-item @click="logout" to="/login">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">fas fa-sign-out-alt</v-icon>

              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>تسجيل الخروج</v-list-item-title>
              </v-list-item-content>
            </v-list-item>





          </v-list>


        </div>
        <!--End Owner Sidbar-->

































      </v-navigation-drawer>



      <v-toolbar color="#13334c" dark fixed>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title style="margin-left:2%">احجزلي</v-toolbar-title>
        <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->


      </v-toolbar>


    </div>
    <v-content background-color="#eeeeee" v-if="drawer">

      <span style="background:red">
        <router-view />
      </span>


    </v-content>
    <v-container background-color="#eeeeee" v-else>

      <span style="background:red">
        <router-view />
      </span>


    </v-container>

  </v-app>




</template>



<script>
  import {
    EventBus
  } from '../event-bus.js';
  import {
    USER_ROLE_GUEST,
    //USER_ROLE_REGISTERED,
    //ADMIN_ROLE,
    // USER_ROLE,
    //OWNER_ROLE,
    //  Delivery_ROLE,

  } from "../constants.js";


  export default {
    name: 'App',
    data() {
      return {
        dialog: true,
        urL: 'http://109.224.53.155',
        username: [],
        auths: false,
        drawer: true,
        session: '',
        cases: [],
        reg_dialog: false,
        case_number: '',
        //  user_img: '',
        token: '',
        admin_info: {
          user_name: '',
          user_email: '',
          user_image: ''
        },
        userImg: 'https://cdn.vuetifyjs.com/images/john.jpg'

      }
    },
    created() {




      if (localStorage.getItem('ROLE_REGISTERED') != USER_ROLE_GUEST && localStorage.getItem('ROLE_REGISTERED') !=
        null) {



        this.$user.set({
          role: localStorage.getItem('ROLE_REGISTERED')
        });



      } else {

        this.$user.set({
          role: USER_ROLE_GUEST
        });

        this.$router.push({
          name: "login"
        });




      }



      EventBus.$on('get_data', reg_dialog => {
        reg_dialog
        this.initialize();
      })




      // this.user_img = JSON.parse(localStorage.getItem('user_info')).user_image;
      // if (this.user_img == null) {

      //   this.user_img = JSON.parse(localStorage.getItem('user_info')).user_image;

      //var img = this.user_img.split('/');
      //this.user_img = this.urL + "/images/" + img[9];


      // }

    },

    watch: {

      '$route'(to, from) {
        to,
        from,
        this.admin_info = JSON.parse(localStorage.getItem('admin_info'));
      }
    },

    mounted() {
      this.token = localStorage.getItem('access_token');
      this.getitems();
      // alert(this.$user.get().role);
      // alert(localStorage.getItem('ROLE_REGISTERED') );

      this.admin_info = JSON.parse(localStorage.getItem('admin_info'));

      // if (this.admin_info.user_image != null && this.admin_info.user_image != "null") {


      //   this.userImg = this.urL + "/" + this.admin_info.user_image
      // }


      this.token = localStorage.getItem('access_token');


    },


    methods: {
      getitems() {

        const axios = require('axios');
        this.loading = true

        var url = this.urL + "/userinfo";
        axios({
          method: 'get',
          url: url,
          headers: {
            token: this.token
          }

        }).then(response => {
          response

        }).catch(error => {
          if (error.response.status == 401) {
            // this.$swal(" انتهت الجلسة", "يجب تسجيل الدخول", 'error')
            this.logout();

          } else {
            //this.$swal('خطاء', "خطاء بالاتصال", 'error')
          }

        }).finally(d => {
          d
          this.loading = false;
        });

      },
      getname(name) {
        return name.split("@")[0];
      },

      initialize() {
        //  Get Cases Notificatios


      },


      logout() {
        this.$user.set({
          role: USER_ROLE_GUEST
        });

        window.localStorage.clear();

      }
    }
  }
</script>