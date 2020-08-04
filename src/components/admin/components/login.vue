<template>

  <div>

    <div class="login-dark">
      <v-form ref="form" v-model="valid">
        <v-row>
          <div style="width:75px;height:90px;position: relative; right: 35%;">
            <v-img src="/assets/logo.jpg" style="with:100%;height:100%"></v-img>
          </div>
        </v-row>

        <br>

        <v-row class="mb-6" justify="center">

          <h3 style="color:black">تسجيل الدخول </h3>

        </v-row>


        <div class="" style="color:red;font-size:10px">
              {{error_msg}}
            </div>


        <v-text-field v-model="user.phone" label="رقم الهاتف" data-vv-name="name" type="number" :rules="phoneRules"
          required></v-text-field>


        <v-text-field v-model="user.password" type="Password" label="كلمة المرور" :rules="passwordRules"
          data-vv-name="password" required></v-text-field>







        <v-row justify="center">
          <v-btn class="btn btn-primary btn-block" color="red" @click="submit" style=";color:#fff;width:100%">
            دخول</v-btn>

        </v-row>
        <v-row>
          <v-text-field color="primary" loading disabled v-show="loading"></v-text-field>
        </v-row>

        <p style="color:red;text-align:center">{{this.errors}}</p>
      </v-form>

    </div>
  </div>


</template>



<script>
import localstorageservice from "./localstorageservice";
  import {
    ADMIN_ROLE,
    OWNER_ROLE,
    Delivery_ROLE
  } from "../constants.js";

  const axios = require('axios');
  export default {
    $_veeValidate: {
      validator: 'new',
    },
    name: 'app',
    data() {
      return {
        valid: true,
        login_info: [],
        error_msg:'',
        owner_info:{id:'', name:'',session:'',email:'',role:'',photo:''},
        admin_info_bala:{id:'', name:'',session:'',email:'',role:'',photo:''},
        delivery_info_bala:{id:'', name:'',session:'',email:'',role:'',photo:''},
        loading: false,
        nameRules: [
          v => !!v || 'Name is requirsed',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        phoneRules: [
          (v) => !!v || 'يجب ادخال رقم الهاتف',
          (v) => v.length > 10 && v.length < 12 || 'يجب ادخال رقم هاتف صحيح',

        ],
        passwordRules: [
          v => !!v || 'كلمة السر مطلبة',
          v => (v && v.length <= 10) || 'Password must be less than 10 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

        errors: '',
        user: {
          phone: '',
          reg_dialog: false,
          password: '',
        },



        options: {
          isLoggingIn: true,
          shouldStayLoggedIn: true,
        },
      }
    },

    mounted() {
    },


    methods: {

      submit() {


        if (this.$refs.form.validate()) {
          this.loading = true;

          axios({
              method: 'post',
              url: "/auth/v2/login",
              data: {
                user_phone: "964" + parseInt(this.user.phone),
                password: this.user.password,
              }
            })
            .then(response => {

              this.login_info = response.data.data;


              if (this.login_info.user_role == "admin") {

            if( window.location.pathname !== '/admin')
                {
                  this.error_msg = 'رقم الهاتف او الباسورد غير صحيح';

                }



            this.$user.set({role:ADMIN_ROLE});

             this.admin_info_bala.role=this.$user.get().role;
             this.admin_info_bala.id=this.login_info.id;
             this.admin_info_bala.name=this.login_info.user_name;
             this.admin_info_bala.phone=this.login_info.user_phone;
             this.admin_info_bala.email=this.login_info.user_email;
             this.admin_info_bala.photo= this.login_info.user_image;

             localstorageservice.setToken(this.login_info.token);
             this.$cookies.set('admin_info_bala',this.admin_info_bala);

             this.$router.push({
                 name: "admin_dashbourd"
               });

          

              }


              else if (this.login_info.user_role == "owner") {

                if( window.location.pathname !== '/')
                {
                  this.error_msg = 'رقم الهاتف او الباسورد غير صحيح';

                }
            else {
              this.$user.set({role:OWNER_ROLE});
              this.owner_info.role=this.$user.get().role;
              this.owner_info.id=this.login_info.id;
              this.owner_info.name=this.login_info.user_name;
              this.owner_info.phone=this.login_info.user_phone;
              this.owner_info.email=this.login_info.user_email;
              this.owner_info.photo= this.login_info.user_image;
              localstorageservice.setToken(this.login_info.token);

              this.$cookies.set('owner_info',this.owner_info);

              this.$router.push({
                  name: "OwnerDashbourd"
                })
            }


              }




              //Delivery_ROLE
              else if (this.login_info.user_role == "delivery") {

                if( window.location.pathname !== '/delivery_company')
                {


                  this.error_msg = 'رقم الهاتف او الباسورد غير صحيح';

                }


                else {
                  this.$user.set({role:Delivery_ROLE});

                  this.delivery_info_bala.role=this.$user.get().role;
                  this.delivery_info_bala.name=this.login_info.user_name;
                  this.delivery_info_bala.phone=this.login_info.user_phone;
                  this.delivery_info_bala.email=this.login_info.user_email;
                  this.delivery_info_bala.photo= this.login_info.user_image;
                  localstorageservice.setToken(this.login_info.token);

                  this.$cookies.set('delivery_info_bala',this.delivery_info_bala);

                  this.$router.push({
                      name: "Delivery_dashbourd"
                    })
                }


              } else if (this.login_info.user_role == "client") {

              this.error_msg = 'رقم الهاتف او الباسورد غير صحيح';
              }





            })
            .catch(error => {
             this.error_msg = 'رقم الهاتف او الباسورد غير صحيح';
            //  this.phonetoverfie = this.phone;
              if (error.response.data.code ==401) {
                 this.error_msg = 'رقم الهاتف او الباسورد غير صحيح';
              }
              error
            }).finally(aa => {
              aa,
              this.loading = false;

            });



        }

      },


    },
    components: {

    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
