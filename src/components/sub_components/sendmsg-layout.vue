<template>
  <v-layout row wrap>
    <div style="width:100%;">

      <!-- <img  src="../assets/images/newsletter.jpg" class="sendmsg-img"> -->
      <div class="sendmsg-ovverly">




        <v-layout column="" class="msg-component">


          <v-row class="mb-6">
          </v-row>


          <v-row class="mb-6" justify="center">
            <h2>ارسال رسالة</h2>
          </v-row>




          <v-form ref="form" v-model="valid" lazy-validation style="background:none">
            <v-row justify="center">

              <v-flex xs8 md5 sm5>
                <v-text-field class="tx_field" placeholder="البريد الالكتروني" solo-inverted="" :rules="emailRules"   v-model="editedItem.email"
                required rounded height="40" dark></v-text-field>
              </v-flex>


            </v-row>
            <v-row justify="center" style="margin-top:30px">

              <v-flex xs8 md5 sm5>

                <v-textarea name="input-7-1" style="color:#000" placeholder="الرساله" class="tx_area" solo-inverted="" rounded dark 
                  :rules="messageRules"       v-model="editedItem.message"></v-textarea>
              </v-flex>


            </v-row>

            <v-row justify="center" style="margin-top:30px;">

              <v-flex xs7 md5 sm5>


                <div class="d-flex justify-center mb-6" style="width:100%">
                  <v-btn class="send-btn" style="width:75%"  @click="submit()">

                  <v-icon right="">fas fa-paper-plane</v-icon>
                  ارسال
                </v-btn>
                </div>


                
              </v-flex>


            </v-row>
          </v-form>




        </v-layout>



      </div>
    </div>


  </v-layout>
</template>
<script>
const axios = require('axios');

  export default {
    name: 'App',

    data: () => ({
      valid: true,
      name: '',

         urL: 'http://109.224.53.155',
      editedItem: {
            name: '',
         email:'',
         message:''
         }

     ,
      
            emailRules: [



                    (v) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/.test(v) || v.length < 1) ||
                    'ألايميل غير صحيح',


                ],


                  messageRules: [
                    (v) => !!v || 'يجب ادخال نص الرساله',

                ],


    }),


    methods: {


       submit() {
    

            if (this.$refs.form.validate()) {

        

               var data = {

                  name:'ds',
                  email: this.editedItem.email,
                  message: this.editedItem.message,

               };


               axios({
                        method: 'post',
                        url: this.urL + "/contactus",
                        data: data
                    })
                    .then(response => {
                      response;
                     const Swal = require('sweetalert2')

                       Swal.fire({
                     position: 'center',
                     icon: 'fas fa-paper-plane',
                     title: 'شكرا تم الارسال بنجاح',
                     showConfirmButton: false,
                     timer: 1500
                     })
                      
                       this.editedItem={
                         
                       };
                       


                    })
                  ;

            }


         },

      changestyle() {

      },

      validate() {
       
      }


    },


  };
</script>