<template>

  <v-app style="background:#f5f5f5">

  <div v-if="this.$cookies.get('owner_info') !==null ">
      <div  v-if="this.$cookies.get('owner_info').role =='owner' ">
      <v-navigation-drawer v-model="drawer" app width="300" clipped class="mx-auto" color="#035aa6" dark right>


        <!-- user info ui -->
        <v-list style="margin-top:27px" nav class="py-0">


          <div class="d-flex justify-center mb-6" style="font-size:22px;color:gary;font-weight: 700;">

            <v-avatar v-if="userImg" size="76">
              <i class="fas fa-user-tie" style="width:100%;height:100%"></i>
            </v-avatar>
          </div>

          <div class="d-flex justify-center mb-6" style="font-size:22px;color:gary;font-weight: 700;">
            <div>
              {{this.$cookies.get('owner_info').name }}
            </div>

            <div>
              {{getname(admin_info.user_email)}}
            </div>

          </div>







          <hr>
        </v-list>



        <!--Star Owner Sidbar-->
        <div>

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
                <v-list-item-title>المنتجات</v-list-item-title>
              </v-list-item-content>
            </v-list-item>



            <v-list-item link to="/request">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">fas fa-envelope</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title> الطلبات</v-list-item-title>
              </v-list-item-content>
            </v-list-item>




                        <v-list-item link to="/OwnerDeliverCompanies">
                          <v-list-item-icon>
                            <v-icon style="margin-left:10px">fas fa-truck</v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title> شركات التوصيل</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>



            <!-- <v-list-item link to="/OwnerItemRating">
              <v-list-item-icon>
                <v-icon style="margin-left:10px">fas fa-star</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>التقييم</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->


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


         <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
       </v-toolbar> </div>
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
     OWNER_ROLE
  } from "./constants";
    import localstorageservice from "./localstorageservice";

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
        user_role: '',
        admin_info: {
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
       if(this.$cookies.get('owner_info') !=='no cookies' || this.$cookies.get('owner_info')!==null )

   {
        if (this.$cookies.get('owner_info').role== OWNER_ROLE)

      {
        this.$user.set({
          role: 'owner'
        });
      } else {
        this.$user.set({
          role: USER_ROLE_GUEST
        });

        this.$cookies.set('owner_info'.role,USER_ROLE_GUEST)
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
        this.$cookies.remove("owner_info");
         this.$user.set({
          role: USER_ROLE_GUEST
        });
           this.$router.push({
          name: "login"
        });
      }
    }
  }
</script>
