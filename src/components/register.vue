<template>
    <div>


        <div class="d-inline   accent-4 white--text">

            <div v-if="this.auths">

                <div class="d-inline   accent-4 white--text">
                    <v-menu offset-y left>
                        <template v-slot:activator="{ on }">
                            <v-btn small color="warning" fab dark v-on="on">
                                <v-avatar>
                                    <img :src="user_image">

                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-list>


                            <v-list-item>
                                <v-list-item-title> <i class="fas fa-user"></i> البروفايل</v-list-item-title>

                            </v-list-item>

                            <v-list-item :to="'/mybooking'">
                                <v-list-item-title> <i class="fas fa-shopping-cart"></i> حجوزاتي</v-list-item-title>

                            </v-list-item>




                            <v-list-item @click="logout">
                                <v-list-item-title> <i class="fas fa-power-off"></i> تسجيل خروج</v-list-item-title>

                            </v-list-item>






                        </v-list>
                    </v-menu>


                </div>



                <div class="hidden-md-and-down d-inline   white--text " style="font-size:18px;padding-right: 7%;">


                    <v-btn class="hidden-md-and-down " text depressed style="width: 36px;">
                        {{user_name}}
                    </v-btn>


                </div>
            </div>

            <div v-else style="padding: 0px;margin: 0px;">
                <v-btn small color="warning" fab dark @click="signin_fun()">
                    <v-icon>fas fa-sign-in-alt</v-icon>
                </v-btn>


            </div>

        </div>

        <!-- </v-toolbar-items> -->















        <v-dialog v-model="reg_dialog" max-width="460px" max-height="370px">


            <v-card pb-4>


                <v-layout pl-3>

                    <v-layout row wrap>
                        <v-flex xs6>
                            <v-btn style="width:100%;border-radius:0px" class="reg_btn" v-on:click="signin=true;e1=2"
                                v-bind:class="{btn_active:signin}" height="60">تسجيل الدخول </v-btn>

                        </v-flex>

                        <v-flex xs6>
                            <v-btn style="width:100%;border-radius:0px" class="reg_btn"
                                v-on:click="signin=false;error_msg='';e1=1" v-bind:class="{btn_active:!signin}"
                                height="60">
                                حساب جديد </v-btn>

                        </v-flex>
                    </v-layout>


                </v-layout>




                <br>





                <div style="color:red;padding-right:20px">{{error_msg}}</div>
                <v-stepper v-model="e1">
                    <!-- <v-stepper-header>
                            <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step step="3">Name of step 3</v-stepper-step>
                        </v-stepper-header> -->

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-form v-model="valid" ref="main_info">
                                <v-layout wrap justify-center="">

                                    <v-card-text style="padding:0px !important">
                                        <v-container grid-list-md fluid="">
                                            <v-col v-if="!signin">
                                                <v-row justify="center" class="mb-3">

                                                    <v-avatar height="100" width="100">
                                                        <img class="signup_img" :src="images[0]" :alt="imgname">
                                                    </v-avatar>

                                                </v-row>
                                                <v-row justify="center">
                                                    <v-btn class="btn_active" @click="pickFile">

                                                        <v-icon size="25" style="padding-left :7px">fas fa-camera
                                                        </v-icon>
                                                        صورة
                                                    </v-btn>
                                                </v-row>
                                            </v-col>

                                        </v-container>

                                    </v-card-text>

                                    <v-flex xs11>

                                        <v-text-field label="ألأســم" v-model="name" required v-if="!signin"
                                            :rules="nameRules" autocomplete="off">

                                        </v-text-field>

                                    </v-flex>


                                    <v-flex xs11>
                                        <v-text-field label="ألايمــيل" v-model="email" data-vv-name="email"
                                            v-if="!signin" :rules="emailRules" autocomplete="off"></v-text-field>
                                    </v-flex>



                                    <v-flex xs11>
                                        <v-select :items="cities" item-text="name" v-model="city" item-value="id"
                                            label="اسم المحافظه" required v-if="!signin"></v-select>

                                    </v-flex>



                                    <input type="file" style="display: none" ref="image" accept="image/*"
                                        @change="onFilePicked">







                                </v-layout>

                                <v-card-actions>

                                    <v-container>
                                        <v-row justify="center">
                                            <v-flex xs4>
                                                <v-btn color="#ff6600" @click="next()" style=";color:#fff;width:100%">
                                                    التالي
                                                </v-btn>


                                            </v-flex>

                                        </v-row>
                                    </v-container>
                                </v-card-actions>
                            </v-form>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-form v-model="valid" ref="auth_info">


                                <v-layout wrap justify-center="">



                                    <v-flex xs11>
                                        <v-text-field label="رقم الهاتف" autocomplete="off" :rules="phoneRules"
                                            v-model="phone" data-vv-name="phone" type="number">
                                        </v-text-field>
                                    </v-flex>

                                    <v-flex xs11>
                                        <v-text-field label="الباسورد" type="password" :rules="PasswordRules" required
                                            autocomplete="off" v-model="password">
                                        </v-text-field>
                                    </v-flex>

                                    <!-- <v-flex xs11>
                                        <v-text-field label="اعاده كتابه الباسورد" type="password" v-if="!signin"
                                            :rules="PasswordRules" required autocomplete="off" v-model="password">
                                        </v-text-field>
                                    </v-flex> -->

                                    <br>
                                    <br>
                                    <br>

                                </v-layout>



                                <v-card-actions>

                                    <v-container>
                                        <v-row justify="center">
                                            <v-flex xs4>
                                                <v-btn color="#ff6600" @click="login()" v-if="signin"
                                                    style=";color:#fff;width:100%">
                                                    دخول
                                                </v-btn>

                                                <v-btn color="#ff6600" @click="sginUp()" v-if="!signin"
                                                    style=";color:#fff;width:100%">
                                                    تسجيل
                                                </v-btn>




                                            </v-flex>

                                            <v-flex xs4>
                                                <v-btn text @click="e1 = 1" v-if="!signin">السابق</v-btn>


                                            </v-flex>

                                        </v-row>
                                    </v-container>
                                </v-card-actions>

                            </v-form>


                        </v-stepper-content>


                    </v-stepper-items>
                </v-stepper>





            </v-card>

        </v-dialog>
        <v-dialog v-model="verfy_Dailog" max-width="450px">
            <v-card>
                <v-form v-model="valid" ref="form_validate">
                    <v-container>
                        <span class="mb-4">يرجى تفعيل حسابك</span>
                        <v-text-field label="ادخل كود التفعيل" v-model="verfy_code" required counter-value=4
                            :rules="verfyRules" autocomplete="off" class="mb-6">
                        </v-text-field>

                        <v-row justify="center">
                            <v-flex xs4>
                                <v-btn color="#ff6600" @click="verfyAccount" style=";color:#fff;width:100%">
                                    تفعيل
                                </v-btn>


                            </v-flex>

                        </v-row>
                    </v-container>

                </v-form>
            </v-card>
        </v-dialog>
    </div>

</template>



<script>
    const axios = require('axios');
    const toast = require('vue-toasted');
    import {
        EventBus
    } from '../event-bus.js';






    export default {
        props: ['dialog'],


        data() {
            return {
                user_image: localStorage.getItem('user_image'),
                email_error: '',
                user_name: '',
                allerros: '',
                from: '',
                token:"",
                main_info: '',
                phonetoverfie: '',
                signin: true,
                from_post: false,
                valid: false,
                error_msg: '',
                e1: 1,
                name: '',
                email: '',
                phone: '',
                password: '',
                city: '',
                verfy_code: '',
                verfy_Dailog: false,
                images: [],
                urL: "http://109.224.53.155",
                cities: [{
                        id: '1',
                        name: 'Bagdad',


                    },
                    {
                        id: '2',
                        name: 'Karbala',


                    }
                ],
                seigin: true,
                from_booking: false,
                imagesUrl: '',
                auths: false,
                imgname: '',
                user_img: '',
                imageName: '',
                //name: '',


                nameRules: [
                    (v) => !!v || 'يجب ادخال الاسم',

                ],


                verfyRules: [
                    (v) => !!v || 'يجب ادخال كود التفعيل',
                    (v) => (v.length == 6) || ' يجب ان يكون كود التفعيل 6 ارقام',

                ],


                phoneRules: [
                    (v) => !!v || 'يجب ادخال رقم الهاتف',
                    (v) => v.length > 10 && v.length < 12 || 'يجب ادخال رقم هاتف صحيح',

                ],





                emailRules: [



                    (v) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/.test(v) || v.length < 1) ||
                    'ألايميل غير صحيح',


                ],



                PasswordRules: [
                    (v) => !!v || 'يجب ادخال الباسورد',
                    v => (v.length > 3) || ' يجب ان لا يقل عن 4',

                ],


                user_info: localStorage.getItem('user_info'),
                user_id: localStorage.getItem('user_id'),

                reg_dialog: false,


                data: '',
                desserts: [],
                editedIndex: -1,
                editedItem: {},
                post_dialog: false,
                defaultItem: {


                },

            }
        },

        computed: {

        },

        watch: {

        },
        // reg_dialogl(val) {
        //     val || this.close()
        // },


        created() {

            //    Listen for the i-got-clicked event and its payload.

            EventBus.$on('reg_dialog', (from) => {
                this.from = from;
                this.e1 = 2;
                this.signin_fun;
                this.reg_dialog = true;
                this.from_booking = true;

            });


        },
        updated() {

            // if (localStorage.getItem('authenticat') == "false" || localStorage.getItem('authenticat') == null) {

            //     this.auths = false;
            // } else {
            //     this.auths = true;
            //     //      this.Get_Member_Info();

            //     //   this.user_info = localStorage.getItem('user_info');


            // }


        },









        methods: {

            next() {
                if (this.$refs.main_info.validate()) {
                    this.e1 = 2;


                }

            },
            verfyAccount() {
                if (this.$refs.form_validate.validate()) {

                    // this.$http({
                    //         method: 'get',
                    //         url: '/auth/v2/accountActivate/44445/',
                    //         headers: {
                    //             Authorization: 'Bearer '+localStorage.getItem('access_token_user')
                    //         }

                    //     })

                    //     .then(response => {
                    //         if (response.data.success == true) {
                                this.$swal('', 'تم  تفعيل الحساب', 'success')
                                    this.verfy_Dailog = false;
                            //     this.verfy_Dailog = false;
                            //     this.signin = false
                            //     this.reg_dialog = false
                            //      this.auths = true,
                            //         this.phonetoverfie = this.phone;
                            //         this.user_name = response.data.data.user_name;
                            //         this.user_img = response.data.user_image;
                            //         this.reg_dialog = false;

                            //         if (this.user_img == null) {
                            //             this.user_image =
                            //                 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png';
                            //             localStorage.setItem('user_image', this.user_image);
                            //         } else {
                            //             this.user_image = 'http://109.224.53.155/' + this.user_img;
                            //             localStorage.setItem('user_image', this.user_image);

                            //         }

                            //         // localStorage.setItem('access_token_user', response.data.data.token);
                            //         this.$cookies.set('user_info',response.data.data);
                            //         this.authenticat = true;
                            //         localStorage.setItem('authenticat', true);
                            //         EventBus.$emit('authenticat', true);



                            //         if (response.data.success == true) {
                            //             this.$refs.form.reset()

                            //         } else if (response.data.success == false) {
                            //             if (response.data.error == "not verified") {
                            //                 this.user_id = response.data.user_id;
                            //                 this.verfy_Dailog = true;
                            //             }

                            //         }


                            //         switch (this.from) {
                            //             case "mybooking":
                            //                 this.$router.push({
                            //                     name: 'mybooking'
                            //                 })
                            //                 break;
                            //             case "fromItem":

                            //                 EventBus.$emit('booking_dialog', this.booking_dialog = true);
                            //                 break;

                            //                 // case 6:
                            //                 //     day = "Saturday";
                            //         }
                            // }
                            // }

                       // })

                        // .catch(error => {
                        //     if (error.response.data.success == false) {


                        //         this.$swal('', 'رمز التفعيل خطاء', 'error')
                        //     }

                        // });
                }
            },
            signin_fun() {

                this.signin = true
                this.e1 = 2;

                this.reg_dialog = true

            },


            signup() {
                this.e1 = 1;

                this.signin = false
                this.reg_dialog = true
                // state.index = state.array.indexOf('you')

            },

            logout() {
                localStorage.setItem('user_id', ' ');
                window.localStorage.clear();
                 this.$cookies.set('user_info',null);
                  
            
                this.$router.push({
                    name: 'home',
                });
   location.reload();
                localStorage.setItem('authenticat', false);
                // localStorage.setItem('access_token_user', response.data.token);
                this.authenticat = false;
                this.auths = false;


                // this.Get_Member_Info();



            },




            // pickFile() {
            //     this.$refs.image.click()
            // },



            sginUp() {

                //alert(this.city)

                var data = {

                    full_name: this.name,
                    user_email: this.email,
                    password: this.password,
                    user_phone: "964" + parseInt(this.phone),
                    from: '',
                    address_id: "2",
                    province_id: "1",
                    country_id: this.city,
                    category_id: "1",
                    long: "33",
                    lat: "32",
                    discraption: "d",
                    images: this.images,
                    type: "png"

                };
                // this.description=JSON.stringify(data);

                if (this.$refs.auth_info.validate()) {
                    axios({
                            method: 'post',
                            url: "auth/v2/signUpClient",
                            data: data
                        })
                        .then(response => {
                            response,
                           // this.phonetoverfie = this.phone;
                            this.reg_dialog = false;
                             // this.$swal('', 'تم  انشاء حساب جديد', 'success')
                           this.verfy_Dailog = true;
                              //localStorage.setItem('user_info', JSON.stringify(response.data.data));
                           
                    // this.$cookies.set('user_info',response.data.data);
                    //         //    localStorage.setItem('access_token_user', response.data.token);
                    //           this.verfyAccount();

                            //this.login();

                            // if (response.data.success == true) {
                            //     this.$refs.form.reset()
                            //     this.user_id = response.data.user_id;
                            //     this.verfy_Dailog = true;
                            // }
                            // // 
                            // switch (this.from) {
                            //     case "mybooking":
                            //         this.$router.push({
                            //             name: 'mybooking'
                            //         })
                            //         break;
                            //     case "fromItem":

                            //         EventBus.$emit('booking_dialog', this.booking_dialog = true);
                            //         break;

                            //         // case 6:
                            //         //     day = "Saturday";
                            // }





                        })
                        .catch(error => {
                            if (error.response.status == 422) {
                                this.$swal("  ", "  الرقم مستخدم", 'error')

                            } else {
                                this.$swal("  ", "  خطاء بالخادم", 'error')
                            }


                        });

                }
            }

            ,



            clear() {

                this.editedItem.email = ''

                this.$validator.reset()

            },







            cats_filter() {


                // Fire.$emit('cats_fliter');
            },







            login() {



                //Sign In      

                if (this.signin) {

                    if (this.$refs.auth_info.validate()) {
                        axios.post('/auth/v2/login', {

                                user_phone: "964" + parseInt(this.phone),
                                password: this.password,

                            }).then(response => {


                                if (response.data.data.user_role == 'client') {



                                   // localStorage.setItem('user_info', JSON.stringify(response.data.data));

                    this.$cookies.set('user_info',response.data.data);

                                    this.auths = true,
                                    this.phonetoverfie = this.phone;
                                    this.user_name = response.data.data.user_name;
                                    this.user_img = response.data.data.user_image;
                                    this.reg_dialog = false;
                                   

                                    if (this.user_img == null) {
                                        this.user_image =
                                            'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png';
                                        localStorage.setItem('user_image', this.user_image);
                                    } else {
                                        this.user_image = 'http://109.224.53.155/images/' + this.user_img;
                                        localStorage.setItem('user_image', this.user_image);

                                    }

                                   // localStorage.setItem('access_token_user', response.data.data.token);
                                    this.authenticat = true;
                                    localStorage.setItem('authenticat', true);
                                    EventBus.$emit('authenticat', true);
                                 



                                    if (response.data.success == true) {
                                        this.$refs.form.reset()

                                    } else if (response.data.success == false) {
                                        if (response.data.error == "not verified") {
                                            this.user_id = response.data.user_id;
                                            this.verfy_Dailog = true;
                                        }

                                    }

   EventBus.$emit('getUserReservationsCountx', response.data.data.token);
                                    switch (this.from) {
                                        case "mybooking":
                                            this.$router.push({
                                                name: 'mybooking'
                                            })
                                            break;
                                        case "fromItem":

                                            EventBus.$emit('booking_dialog', this.booking_dialog = true);
                                            break;

                                            // case 6:
                                            //     day = "Saturday";
                                    }

                                    toast({
                                        type: 'success',
                                        title: 'تم تسجيل الدخول بنجاح'
                                    })



                                } else {
                                    this.error_msg = 'يجب ان يكون حساب يوزر';
                                }









                            })
                            .catch(error => {

                                this.error_msg = 'رقم الهاتف او الباسورد غير صحيح';
                                this.phonetoverfie = this.phone;
                                if (error.response.data.error == "not verified") {
                                    this.user_id = error.response.data.user_id;
                                    this.verfy_Dailog = true;
                                }


                            }).finally((w) => {
                                w,

                                EventBus.$emit('getUserReservationsCount', true);
                            });






                        //Sign Up

                    } else {


                        this.error_msg = '';
                        this.sginUp();



                    }





                    //     }

                }

            },
            close() {

                this.imageName = ''
                this.imageFile = ''
                this.imageUrl = ''


                //this.emailRules.splice(2);
                this.allerros = ' ';
                this.error_msg = ' ',
                    this.editedItem = [],


                    this.$refs.form.reset()
                this.reg_dialog = false

            },



            pickFile() {

                this.$refs.image.click()
            },

            onFilePicked(e) {

                const files = e.target.files
                if (files[0] !== undefined) {
                    this.imageName = files[0].name
                    if (this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0]
                        this.images = [];
                        this.images.push(fr.result);
                        this.imgname = files[0].name;


                    })

                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
            },
        },


        mounted() {

            if (localStorage.getItem('authenticat') == "false") {
                this.auths = false;
            } else if (localStorage.getItem('authenticat') == "true") {


            //    var userinfo = JSON.parse(localStorage.getItem('user_info'));

          var userinfo = this.$cookies.get('user_info');
          this.token=userinfo.token;
                //   alert(this.user_name);
                this.user_name = userinfo.user_name;
                this.user_img = userinfo.user_image;

                this.auths = true;
            } else if (localStorage.getItem('authenticat') == null) {
                this.auths = false;
            }

            //localStorage.setItem('authenticat', false);



        }

    }
</script>
