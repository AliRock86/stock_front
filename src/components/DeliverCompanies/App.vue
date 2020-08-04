<template>

  <v-app style="background:#f5f5f5">

  <div v-if="this.$cookies.get('delivery_info_bala') !==null ">
      <div  v-if="this.$cookies.get('delivery_info_bala').role =='deliveryـcompany' ">
      <!-- <v-navigation-drawer v-model="drawer" app width="300" clipped class="mx-auto" color="#035aa6" dark right> -->
      <v-navigation-drawer v-model="drawer" app width="300" clipped class="mx-auto" color="#1e3293" dark right>



        <!-- user info ui -->
        <v-list style="margin-top:27px" nav class="py-0">


          <div class="d-flex justify-center mb-6" style="font-size:22px;color:gary;font-weight: 700;">

            <v-avatar v-if="userImg" size="76">
              <i class="fas fa-user-tie" style="width:100%;height:100%"></i>
            </v-avatar>
          </div>

          <div class="d-flex justify-center mb-6" style="font-size:22px;color:gary;font-weight: 700;">
            <div>
              {{this.$cookies.get('delivery_info_bala').name }}
            </div>

            <div>
              {{getname(delivery_info_bala.user_email)}}
            </div>

          </div>







          <hr>
        </v-list>



        <!--Star Owner Sidbar-->
        <div>

          <v-list style=" font-family: 'cairo' " to="/DeliveryDashbourd">

            <v-list-item to="/DeliveryDashbourd">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">mdi-home</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>ألرئسية</v-list-item-title>
              </v-list-item-content>
            </v-list-item>




            <v-list-item link to="/requestDelivery">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">fas fa-truck</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title> طلبات التوصيل</v-list-item-title>
              </v-list-item-content>
            </v-list-item>



            <v-list-item link to="/drivers">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">fas fa-car</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>السائقين</v-list-item-title>
              </v-list-item-content>
            </v-list-item>





            <v-list-item link to="/PartnershipCompany">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">fas fa-building</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>شركات الشراكه</v-list-item-title>
              </v-list-item-content>
            </v-list-item>



            <v-list-item link to="/DeliveryPrice">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">fas fa-dollar-sign</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>اسعار التوصيل</v-list-item-title>
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



      <v-toolbar color="#424242" dark fixed>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title style="margin-left:2%">باله</v-toolbar-title>
        <v-avatar v-if="userImg" size="50">
            <v-img src="/assets/logo.jpg" style="width:100%;height:100%"></v-img>
        </v-avatar>

      </v-toolbar>


    </div>
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
    USER_ROLE_GUEST,
    Delivery_ROLE
  } from "./constants";

  import localstorageservice from "./localstorageservice";
  export default {
    name: 'App',
    data() {
      return {
        dialog: true,
        username: [],
        auths: false,
        drawer: true,
        session: '',
        cases: [],
        reg_dialog: false,
        case_number: '',
        //  user_img: '',
        token: '',
        user_role: '',
        delivery_info_bala: {
          user_name: '',
          user_email: '',
          user_image: ''
        },
        userImg: 'https://cdn.vuetifyjs.com/images/john.jpg'

      }
    },
    computed: {

    },
    created() {

    },


    watch: {


    },

    mounted() {
       if(this.$cookies.get('delivery_info_bala') !=='no cookies' || this.$cookies.get('delivery_info_bala')!==null )

   {
        if (this.$cookies.get('delivery_info_bala').role==Delivery_ROLE)

      {
        this.$user.set({
          role: 'admin'
        });
      } else {
        this.$user.set({
          role: USER_ROLE_GUEST
        });

        this.$cookies.set('delivery_info_bala'.role,USER_ROLE_GUEST)
        this.$router.push({
          name: "login"
        });
      }
   }



    },


    methods: {



      getname(name) {
        return name.split("@")[0];
      },

      initialize() {

      },


      logout() {

        localstorageservice.clearToken();
        this.$cookies.remove("delivery_info_bala");
         this.$user.set({
          role: USER_ROLE_GUEST
        });
           this.$router.push({
          name: "login"
        });
        location.reload();
      }
    }
  }
</script>
