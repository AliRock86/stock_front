<template>

  <v-app>



    <div class="hidden-md-and-down ">
      <!--Star Main header sign in sinup Media-->
      <v-toolbar dark height="30" color="#161616" class="sin_sinup_header">
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-md-and-down">
          <v-btn text>ahjizli@enjaz.tech.com</v-btn>
          <v-divider class="mx-2" vertical></v-divider>
          <v-btn text> +62274 889767 </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <!--End Main header sign in sinup Media-->


    </div>







    <!--Star Navigation Bar To Phone-->
    <div style="background-color:#242424;color:#fff" class="hidden-lg-and-up">
      <v-container>
        <v-layout>
          <v-flex xs2>

            <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color:#fff !important"></v-app-bar-nav-icon>
          </v-flex>
          <v-flex xs2>

          </v-flex>


  <router-link to="/">
          <v-flex xs4>



            <v-layout row wrap>
              
              <v-flex xs6>
                 <div style="width:48px;height:48px"  >
                 <v-img src="/assets/logo_white.png" style="with:100%;height:100%"></v-img>
                 </div>

                

              </v-flex>

              <v-flex xs6 pr-3 pt-3>
                 
                 <span style="margin-top:auto;margin-bottom:auto;margin-right:15px;color:#fff;font-weight:bold;font-size:20px">احجزلي</span>

              </v-flex>

            </v-layout>
         


          </v-flex>

  </router-link>

           <v-flex xs2>

          </v-flex>

          <v-flex xs2>



            <register_phone>

            </register_phone>




          </v-flex>




          <v-navigation-drawer v-model="drawer" app width="280" class="mx-auto" right>
            <v-list-item>

              <v-list-item-content>

                <v-list-item-title style="    font-family: 'cairo';">
                 احجزلي
                </v-list-item-title>
                <!-- <v-list-item-subtitle>
                  subtext
                </v-list-item-subtitle> -->
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list>
              <v-list-item to="/" style="padding:0px">




                <v-list-item-icon style="padding-left:3%">
                  <v-icon>as fa-home</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>الرئيسية</v-list-item-title>
                </v-list-item-content>
              </v-list-item>


              <v-list-group prepend-icon="fas fa-border-all" append-icon="" style="padding:0px;    position: relative;
    left: 6%;">
                <template v-slot:activator style="padding:0px">
                  <v-list-item-title style="padding:0px">الاقسام</v-list-item-title>
                </template>


                <v-list-item :to="'/itemsByCatId/'+item.id" v-for="(item, index) in categies" :key="index">

                  <v-list-item-icon style="padding-left:3%">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>


              </v-list-group>



              <v-list-item style="padding:0px" to="/offers">


                <v-list-item-icon style="padding-left:3%">
                  <v-icon>fas fa-percent</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>العروض</v-list-item-title>
                </v-list-item-content>
              </v-list-item>



              <v-list-item style="padding:0px" to="/contactus">


                <v-list-item-icon style="padding-left:3%">
                  <v-icon>fas fa-phone</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>اتصل بنا</v-list-item-title>
                </v-list-item-content>
              </v-list-item>


              <v-list-item style="padding:0px" to="/about">


                <v-list-item-icon style="padding-left:3%" >
                  <v-icon>mdi-help-box</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>من نحن</v-list-item-title>
                </v-list-item-content>
              </v-list-item>



            </v-list>



          </v-navigation-drawer>
        </v-layout>


      </v-container>
    </div>
    <!--End Navigation Bar To Phone-->








    <v-toolbar class="hidden-md-and-down" dark :color="toolbarColor" height="80">


      <v-layout :class="toolbar_border" justify-center row wrap>
        <v-flex xs1 sm2 md2 xl1 pr-8>

          <register></register>

        </v-flex>

        <v-flex xs8 style="    position: relative;
    right: 1%;">



          <v-toolbar-items>


            <v-tabs :background-color="toolbarColor" active-class="tap_active" color="red">

              <v-tab class="tabitem" style="color:red" to="/"> <span pr-3>
                  <v-icon>fas fa-home</v-icon>
                </span>&nbsp; الرئيسية </v-tab>


              <v-menu offset-y left="">
                <template v-slot:activator="{ on }">
                  <v-tab class="tabitem" v-on="on">

                    <v-icon right>fas fa-border-all</v-icon> الاقسام


                  </v-tab>
                </template>
                <router-link to="">
                  <v-list>
                    <v-list-item :to="'/itemsByCatId/'+item.id" v-for="(item, index) in categies" :key="index"
                   >
                      <v-list-item-title>
                        <v-icon right="" style="padding-left:5px">{{item.icon}}</v-icon> {{ item.name }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </router-link>
              </v-menu>







              <v-tab class="tabitem" to="/offers"> <span pr-3>
                  <v-icon>fas fa-percent</v-icon>
                </span>&nbsp; اخر العروض </v-tab>

              <v-tab class="tabitem" to="/contactus"><span pr-3>
                  <v-icon>fas fa-phone</v-icon>
                </span>&nbsp; اتصل بنا </v-tab>
              <v-tab class="tabitem" to="/about"> <span pr-3>
                  <v-icon>mdi-help-box</v-icon>
                </span>&nbsp; من نحن</v-tab>

              <!-- <v-tab class="tabitem"  > <i class="fas fa-shopping-cart"></i> </v-tab> -->
              <v-tab class="tabitem" @click="xx()" style="padding-top:1%">


               <div v-if="auths">
                  <v-badge >

                  <template v-slot:badge v-if="auths">{{booking_count}}</template>

                  
                  <v-icon>fas fa-shopping-cart</v-icon>
                </v-badge>
               </div>

               






              </v-tab>
            </v-tabs>

          </v-toolbar-items>
        </v-flex>


        <v-flex xs2>
          <v-spacer></v-spacer>

          <router-link :to="{ name: 'home'}">

            <v-row>
              <div class="div_logo_big">
                <v-img src="/assets/logo_white.png">

                </v-img>
              </div>
              <span
                style="margin-top:auto;margin-bottom:auto;margin-right:15px;color:#fff;font-weight:bold;font-size:24px">احجزلي</span>
            </v-row>
          </router-link>

        </v-flex>




      </v-layout>



    </v-toolbar>




    <router-view>

    </router-view>

    <footerx></footerx>


  




  </v-app>

</template>

<script>
const axios = require('axios');
  import register from "./components/register.vue"
  import footerx from "./components/sub_components/footer.vue"
  import register_phone from "./components/register_phone.vue"
  import {
    EventBus
  } from './event-bus.js';



 

  export default {
    name: 'App',

    data: () => ({

     

      left: [{
        label: 'Home',
        icon: 'home',
        href: '#/home'
      }, {
        label: 'Animals',
        children: [{
            label: 'Elephant',
            href: '#/animals/elephant'
          }, {
            label: 'Lion',
            href: '#/animals/lion'
          }, {
            label: 'Bear',
            href: '#/animals/bear'
          }, {
            label: 'Eagle',
            href: '#/animals/eagle'
          }, {
            label: 'Wolf',
            href: '#/animals/wolf'
          }

        ]
      }],
      right: [{
          href: 'https://github.com/marcodpt/vue-tree-nav',
          icon: 'brands/github'
        }]

        ,




      open: ['public'],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-json',
        md: 'mdi-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
      tree: [],
      itemsx: [

        {
          name: 'الاقسام',
          file: 'fas fa-border-all',
          children: [


          ],
        },

      ],




      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram',
      ],
      urL: 'http://109.224.53.155',
      toolbar_style: 'home_toolbar',
      toolbarColor: "#242424",
      toolbar_border: '',
      drawer: false,
   
      categies: [],
      token: localStorage.getItem('access_token_user'),
      booking_count: localStorage.getItem('booking_count'),
      
      auths: localStorage.getItem('authenticat'),
      items: [{
          title: 'الرئيسية',
          to: '/',
          icon: 'fas fa-home'
        },
        {
          title: 'الاقسام',

          icon: 'fas fa-border-all',
          children: [{
            title: 'Contact us',
            to: '/contactus',
            icon: 'contact_support'
          }]
        },
        {
          title: 'العروض',
          to: '/',
          icon: 'fas fa-percent'
        },
        {
          title: 'اتصل بنا',
          to: '/',
          icon: 'fas fa-phone'
        },
        {
          title: 'من نحن',
          to: '/',
          icon: 'mdi-help-box'
        }
      ]


    }),
    methods: {


      logout() {
        localStorage.setItem('user_id', ' ');
        window.localStorage.clear();
        location.reload();
        this.$router.push({
          name: 'ألرئيسية',
        });

        localStorage.setItem('authenticat', false);
        localStorage.setItem('access_token_user','');
        this.authenticat = true;
        this.auths = false;


        // this.Get_Member_Info();



      },
      getCategory() {

       
        this.$http.get("v2/Categories").then(response => {
          this.categies = response.data.data;

          var i = 0;
          for (i = 0; i <= this.categies.length; i++) {




            this.itemsx[0].children.push(

              {
                name: this.categies[i].name,

                file: this.categies[i].icon,
              }

            );


          }




        })
      },





      xx() {

        if (this.auths == 'false') {



          EventBus.$emit('reg_dialog', 'mybooking');
        } else if (this.auths == 'null') {






          EventBus.$emit('reg_dialog', 'mybooking');

        } else if (!this.auths) {

          EventBus.$emit('reg_dialog', 'mybooking');
        } else {

          this.$router.push({
            name: 'mybooking'
          })
        }
      },

      booking_counts() {

        var url = this.urL + "/getCountByUserId";
        axios({
          method: 'get',
          url: url,
          headers: {
            token: this.token
          }

        }).then(response => {

          this.booking_count = response.data.Data;

          localStorage.setItem('booking_count', this.booking_count);


        });

      }

    },

    components: {
      register,
      footerx,
      register_phone
    },
    created() {
      this.getCategory();
      EventBus.$on('authenticat', authenticat => {
        authenticat,
        this.auths = true;
        var userinfo = JSON.parse(localStorage.getItem('user_info'));
        this.user_name = userinfo.user_name;
        this.user_img = userinfo.user_image;

      });



      EventBus.$on('getUserReservationsCount', xxx => {
        xxx;
        this.token = localStorage.getItem('access_token_user');

        this.booking_counts();


      });






    },


    mounted() {
        this.getCategory();
      this.token = localStorage.getItem('access_token_user');
      this.booking_counts();


      // this.getitems();

      this.user_info = JSON.parse(localStorage.getItem('user_info'));

      if (localStorage.getItem('authenticat') == "false") {
        this.auths = false;
      } else if (localStorage.getItem('authenticat') == "true") {


        var userinfo = JSON.parse(localStorage.getItem('user_info'));
        this.user_name = userinfo.user_name;
        this.user_img = userinfo.user_image;

       

        this.auths = true;
      } else if (localStorage.getItem('authenticat') == null) {
        this.auths = false;
      }

      //localStorage.setItem('authenticat', false);




    }
  };
</script>