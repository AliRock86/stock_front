<template>


    <v-form ref="form" v-model="valid">

        <v-card height="100%">

            <div style="display:block;height:40px">
                <v-card-title class=""   

                style="font-family: 'droid_bold' !important;background-color: #2e94b9 !important;color:#fff">
                <span v-if="item_ID==0">اضافة منتج</span>
                <span v-else>تعديل منتج</span>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="cancel()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            </div>


            <v-container >

                <v-stepper v-model="e1">
                    <!--Star Steper Header-->
                    <v-stepper-header>
                        <!--   <v-stepper-step :rules="[() =>this.er1]" :complete="e1 > 1" step="1" @click="step1()">المعلومات     edit-icon="fas fa-money-check-alt"-->
                        <v-stepper-step :rules="[() =>this.er1]" :complete="e1 > 1" step="1">المعلومات
                            الاساسيه
                            <small>{{this.errors_primery[0]}}</small>
                        </v-stepper-step>

                        <v-divider></v-divider>



                        <v-divider></v-divider>



                        <v-stepper-step :complete="e1 > 4" step="2" :editable="false" :rules="[() =>this.er_payment]">
                            معلومات الدفع
                            <small>{{this.errors_payment[0]}}</small>

                        </v-stepper-step>



                        <v-divider></v-divider>
                        <v-stepper-step step="3"> الصور</v-stepper-step>
                    </v-stepper-header>
                    <!--End Steper Header-->



                    <v-stepper-items>

                        <!--Primery Info-->
                        <v-stepper-content step="1">
                            <v-card class="mb-12" color="#cac0c057" height="470px" pl-5>

                                <v-layout row wrap pr-2 pl-2>

                                    <v-flex pa-3 xs6>
                                        <v-text-field background-color="#fff" height="45" style=""
                                            placeholder="اسم المنتج" v-model="editedItem.item_name" :rules="nameRules"
                                            required></v-text-field>
                                    </v-flex>








                                </v-layout>


                                <v-layout row wrap pr-2 pl-2>
                                    <v-flex pa-3 xs6>
                                        <v-select background-color="#ffffff" height="45" :rules="nameRules" class="my-2"
                                            :items="category" item-value="id" item-text="name"
                                            v-model="editedItem.sub_category.category_id"
                                            placeholder="  التصنيف الرئيسي" @change="getSubCategory()" required>
                                        </v-select>
                                    </v-flex>

                                    <v-flex pa-3 xs6>
                                        <v-select :rules="nameRules" segmented class="my-2" :items="subcategory"
                                            item-value="id" item-text="name" background-color="#ffffff" height="45"
                                            v-model="editedItem.sub_category.id" placeholder=" التصنيف الفرعي"
                                            @change="dis()" required></v-select>
                                    </v-flex>






                                </v-layout>

                                <v-layout row wrap pr-2 pl-2>

                                     <v-flex pa-3 xs4>
                                     <v-select :rules="nameRules" segmented class="my-2" :items="ItemStatus"
                                            item-value="id" item-text="status_name_ar" background-color="#ffffff" height="45"
                                            v-model="editedItem.status.id" placeholder=" الحاله"
                                            @change="dis()" required></v-select>

                                     </v-flex>
                                        <v-flex pa-3 xs4>


                                        <v-text-field background-color="#fff" height="45" style=""
                                            placeholder="العدد المتوفر" v-model="editedItem.number_of_items"
                                            :rules="ItemNumberRules" required></v-text-field>
                                    </v-flex>

                                     <v-flex pa-3 xs3>
                                     <v-select :rules="nameRules" segmented class="my-2" :items="deliverable"
                                            item-value="id" item-text="name" background-color="#ffffff" height="45"
                                            v-model="editedItem.deliverable_id" placeholder="طريقه التوصيل"
                                            required></v-select>

                                     </v-flex>


                                </v-layout>


                                <v-layout>
                                    <v-flex pa-3 xs12>
                                        <v-textarea background-color="#fff" placeholder=" الوصف "
                                       
                                            v-model="editedItem.item_description" :rules="descriptRules" required>
                                        </v-textarea>
                                    </v-flex>



                                </v-layout>

                            </v-card>


                            <v-btn color="primary" @click="step2()">
                                التالي

                            </v-btn>

                            <!-- <v-btn text>Cancel</v-btn> -->
                        </v-stepper-content>
                        <!--End Primery Info-->










                        <!--Date Price-->
                        <v-stepper-content step="2">
                            <v-card class="mb-12" color="#cac0c057" height="400px">

                                <v-form ref="valid_payment" v-model="valid_payment">
                                    <v-layout row wrap pl-2>
                                        <v-flex xs4 pa-3 pr-5>
                                            <v-text-field background-color="#fff" height="50" placeholder=" سعر المنتج"
                                                data-vv-name="name" v-model="editedItem.price.price_value"
                                                :rules="numberRul" required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>


                                    <v-layout row wrap pl-2 pr-4>

                                        <span>نوع الحجز :</span>

                                        <div v-if="item_id==1">
                                            <span v-if="editedItem.price.payment_when_receiving==0">الحجز عن طريق
                                                فاتوره</span>
                                            <span v-if="editedItem.price.payment_when_receiving==1">الحجز بدون بطاقة
                                                دفع</span>

                                        </div>

                                        <div v-else>
                                            <span v-if="editedItem.price.payment_when_receiving===0">الحجز عن طريق
                                                فاتوره</span>
                                            <span v-if="editedItem.price.payment_when_receiving===1">الحجز بدون بطاقة
                                                دفع</span>

                                        </div>





                                    </v-layout>
                                    <v-layout row wrap pl-2 pr-4>
                                        <v-radio-group @change="tr()" :rules="paymentRul" required
                                            v-model="editedItem.price.payment_when_receiving">
                                            <v-radio label="الحجز بدون بطاقة دفع" :value="1"></v-radio>
                                            <v-radio label="الحجز عن طريق فاتوره" :value="2"></v-radio>
                                        </v-radio-group>





                                    </v-layout>

                                    <v-layout row wrap pl-2 pr-4>
                                        <v-flex xs4 pa-1>
                                            <v-checkbox v-model="editedItem.price.free_cancellation"
                                                label="امكانية الغاء الحجز" required></v-checkbox>
                                        </v-flex>


                                        <v-flex xs3 pa-1 v-if="!editedItem.price.free_cancellation" pl-4>
                                            <v-text-field prepend-inner-icon="fas fa-percent" background-color="#fff"
                                                class="deucation_txfield" height="40" placeholder="  نسبة الاستقطاع"
                                                data-vv-name="name" :disabled="!editedItem.price.free_cancellation"
                                                :readonly="!editedItem.price.free_cancellation"
                                                v-model="editedItem.price.cancellation_deduction_ratio"
                                                :rules="numberRul1">
                                            </v-text-field>
                                        </v-flex>


                                    </v-layout>
                                </v-form>
                            </v-card>

                            <v-btn color="primary" @click="step3()">
                                التالي
                            </v-btn>

                            <v-btn @click="step1()" text>السابق</v-btn>
                        </v-stepper-content>
                        <!--Date Price-->




                        <v-stepper-content step="3">

                            <v-card class="mb-12" color="#cac0c057" height="400px">
                                <v-layout row wrap>
                                    <v-flex pa-5 xs3>
                                        <!-- <v-text-field label="اختر صورة " solo="" @click='pickFile' append-icon='fas fa-image'></v-text-field> -->
                                    </v-flex>

                                    <v-flex pa-5>
                                        <input type="file" style="display: none" ref="image" accept="image/*"
                                            @change="onFilePicked">
                                    </v-flex>
                                </v-layout>



                                <span>{{img_name}}</span>

                                <v-layout row wrap>
                                    <v-row justify="center">
                                        <v-flex xs2 v-for="(img ,index) in images" pa-2 :key="img">

                                            <v-card height="150" width="150" class="card_img">
                                                <v-img :src="img" height="150" width="150" class="card_img"
                                                    v-if="img!='a'">
                                                    <v-btn icon=""
                                                        style="padding-right: 24px;position:relative;left: 46px;"
                                                        @click="delete_img(editedItem.images[index].id,index)">
                                                        <v-icon color="#fff">fas fa-window-close</v-icon>
                                                    </v-btn>

                                                </v-img>

                                                <v-btn icon v-else @click='pickFile(index)'>
                                                    <v-icon style="margin:0px" size="40">fas fa-plus-square</v-icon>
                                                </v-btn>


                                            </v-card>
                                        </v-flex>
                                    </v-row>


                                </v-layout>
                            </v-card>

                            <v-btn @click="submit" color="success" style="margin-left:10px">
                                <span v-show="!loading">حفظ</span>
                                <v-progress-circular indeterminate color="white" v-show="loading"></v-progress-circular>
                            </v-btn>


                            <v-btn @click="step2()" text>السابق</v-btn>


                        </v-stepper-content>




                    </v-stepper-items>
                </v-stepper>
            </v-container>










        </v-card>

    </v-form>



</template>



<script>
    const axios = require('axios');

    // import GoogleMap from '../components/map'
    import {
        EventBus
    } from './event-bus.js';



    export default {

        props: {
            'item_ID': Number,
            'hidden': Boolean
        },

        data: () => ({
            dialog: false,

            img_url: 'http://109.224.27.9:81',
            item_id: '',
            start: null,
            time_dialog: false,
            xc: [],
            img_name: '',
            end: null,
            valid_day_open: false,


            errors_address: [],
            errors_payment: [],
            radioPayment: ["0", "1"],
            errors_date: [],
            day_status: [{
                id: 6,
                status_name_ar: 'مفتوح'
            }, {
                id: 7,
                status_name_ar: 'مغلق'
            }],

            deliverable:[
                {
                
                     id:1,
                     name: 'توصيل مجاني'

                },
                 {
                
                     id:2,
                     name: 'توصيل  بمبلغ'

                },
                {
                
                     id:3,
                     name: 'بدون توصيل'

                }

                
            ],
            ItemStatus:[
                {
                      id:1,
                     status_name_ar: 'متوفر'

                },
                 {
                      id:26,
                     status_name_ar: 'العدد منتهي'

                },
                 {
                      id:27,
                     status_name_ar: 'متوقف'

                }
            ],
            DayDialog: false,
            msg_error: [],
            ItemFeaturesDialog: false,
            er_address: true,
            valid_ItemFeatures: false,
            valid_payment: false,

            ItemFeatures: [{
                id: '',
                item_id: '',
                feature_name: '',
                feature_price: ''

            }],



            editeItemFeatures: {
                id: '',
                item_id: '',
                feature_name: '',
                feature_price: ''
            },



            er_payment: true,

            editeTimeOpen: {

                id: '',
                action_id: '',
                from_time: '',
                to_time: '',
                
                max_request: '',
                reservations_number: '',
                status: {
                    id: '',
                    status_name_ar: ''
                },
                reservation_type: {
                    id: '',
                    reservation_type_name: ''
                },

            },

            editeDayOpen: [{
                    id: '',
                    reservation_type: {
                        id: '',
                        reservation_type_name: ''
                    },
                    work_day: '',
                    status: {
                        id: '',
                        status_name_ar: ''
                    },
                    reservations_number: '',
                    time_to_open: [{
                            id: '',
                            action_id: '',
                            from_time: '',
                            to_time: '',
                            max_request: '',
                            reservations_number: '',
                            status: {
                                id: '',
                                status_name_ar: ''
                            },
                            reservation_type: {
                                id: '',
                                reservation_type_name: ''
                            },
                        },


                    ],
                }]



                ,
            er_date: true,
            er1: true,
            reservation_type: [{
                    id: 1,
                    reservation_type_name: 'غير محدد'
                },
                {
                    id: 2,
                    reservation_type_name: 'اختيار عدد'
                }
            ],
            //    ['غير محدد','اختيار عدد'],
            e1: 1,
            switch2: false,
            radios: 'radio-1',
            submit_name: '',
            errors_primery: [],
            item_new_price: '',
            menu_date_from: false,
            menu_date_to: false,
            editdailog: false,
            user_info: {},
            token: '',
            err_show: false,
            menu1: false,
            menu2: false,
            menu3: false,
            menu4: false,
            map_dialog: false,
            modal2: false,
            book_dur_status: false,
            book_num_status: false,
            offer_info: {


            }

            ,
            reve_type: [{
                id: 0,
                duration: 'غير محدود'
            }, {
                id: 1,
                duration: 'اختيار فترة'
            }, {
                id: 2,
                duration: 'اختيار عدد لليوم الواحد'
            }],
            reve_type1: [{
                id: 0,
                duration: 'غير محدود'
            }, {
                id: 1,
                duration: 'اختيار فترة'
            }, {
                id: 2,
                duration: 'اختيار عدد  '
            }],
            error: '',
            msg_error_txt: 'هذا اليوم مكرر ',


            page: 1,
            pageCount: 0,
            items: [],
            reservation_num: false,
            editedIndex: -1,
            editedIndexday: -1,
            editedIndextime: -1,
            number_of_items: '',
            editedIndexItemFeatures: -1,

            editedItem: {
                item_name: '',
                deliverable_id:'',
                item_description: '',
                sub_category: {
                    category_id: 0,
                    id: 0,
                    name: "",
                },
                
                Address: {
                    address_descraption: '',
                    province: {
                        id: '',
                        country_id: '',

                    },


                    long: '12',
                    lat: '33'

                },

                ItemFeatures: [


                ],
                images: [{
                        "image_url": ''
                    },
                    {
                        "image_url": ''
                    },
                    {
                        "image_url": ''
                    },
                    {
                        "image_url": ''
                    }
                ],
                status:
                {
                    id:'',
                    status_name_ar:''

                }
                ,

                price: {
                    id: '',
                    price_value: '',
                    payment: '',
                    deduction: 0,
                    payment_when_receiving: '',
                    free_cancellation: '',
                    payment_after_awhile: '',
                    installments: '',
                    cancellation_deduction_ratio: '0',

                },


                calories: 0,
                fat: 0,
                carbs: 0,
                disc: '',
                protein: 0,


            },
            valid: false,

            deduction: '',
            days: ["السبت", "الاحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "كل الايام"],
            times: ["1:00 م", "2:00 م", "3:00 م", "4:00 م ", "5:00 م", "6:00 م", "7:00 م ", "8:00 م", "9:00 م",
                "10:00 م",
                "11:00 م", "12:00 م",
                "1:00 ص", "2:00 ص", "3:00 ص", "4:00 ص ", "5:00 ص", "6:00 ص", "7:00 ص ", "8:00 ص", "9:00 ص",
                "10:00 ص",
                "11:00 ص", "12:00 ص"
            ],

            img_cliced: -1,
            day_to_open: [{

                every_day: 0,
                every_time: 0,
                from_day: "",
                from_time: "",
                to_day: "",
                to_time: "",
                max_requests: 0
            }],

            nameRules: [
                v => !!v || 'هذا الحقل مطلوب  ',

            ],
            numberRul: [
                v => !!v || 'هذا الحقل مطلوب  ',

                v => !isNaN(v) || 'يجب ادخال رقم ',
            ],
            ReservationTypeRules: [
                v => !!v || 'هذا الحقل مطلوب  ',
                v => !isNaN(v.id) || 'يجب ادخال رقم ',

            ],

            to_timeRules: [
                v => !!v || 'هذا الحقل مطلوب  ',
                v => !isNaN(v) || 'يجب ادخال رقم ',

            ],

            TimeStatusRules: [
                v => !!v || 'هذا الحقل مطلوب  ',
                v => !isNaN(v.id) || 'يجب ادخال رقم ',

            ],

            paymentRul: [
                v => !!v || 'هذا الحقل مطلوب  ',

                v => !isNaN(v) || 'يجب ادخال رقم ',

            ],
            DayStatusRules: [
                v => !!v || 'هذا الحقل مطلوب  ',

                v => !isNaN(v) || 'يجب ادخال رقم ',

            ],
            //"^[0-9]+$"


            ItemNumberRules: [
                (v) => (/^[0-9]+$/.test(v) || v.length < 1) ||
                'ارقام فقط',


            ],


            numberRul1: [

                v => !isNaN(v) || 'يجب ادخال رقم ',
            ],
            descriptRules: [
                v => !!v || 'هذا الحقل مطلوب  ',
                v => v.length >= 20 || 'يجب ان يكون الوصف اكثر من ٢٠ حرف ',
            ],
            loading: false,
            province: [],
            imageName: '',
            imageUrl: '',
            countries: [{
                name: 'العراق',
                id: 1
            }],
            imageFile: '',


            payment: false,
            images: ['a', 'a', 'a', 'a'],
            free_cancellation: false,
            deductionvalue: 0,
            everyday: false,
            everytime: false,
            fromday: '',
            today: '',
            fromtime: '',
            totime: '',
            current_page: 1,
            last_page: 0,
            offer_dialog: false,
            subcategory: [],
            sub_category_id: '',
            category: [],
            reserv_type_id1: -1,
            valid_day: true,
            // editedItem.Address.address_descraption: '',
            lat: 0,
            lng: 0,


        }),



        methods: {
            xx() {
                this.editedIndextime = -1;
                this.editeTimeOpen = {

                    id: '',
                    action_id: '',
                    from_time: '',
                    to_time: '',
                    max_request: '',
                    reservations_number: '',
                    status: {
                        id: '',
                        status_name_ar: ''
                    },
                    reservation_type: {
                        id: '',
                        reservation_type_name: ''
                    },

                }

            },
            cancel_day() {
                if (this.$refs.valid_day_open.validate()) {

                    if (this.editeDayOpen.status == 6 && this.editedItem.day_to_open[this.editedIndexday].time_to_open
                        .length == 0) {

                        alert('يرجئ اختيار وقت اذا كان المركز مفتوح في هاذا اليوم');


                    } else {
                        this.editedItem.day_to_open[this.editedIndexday].status['id'] = this.editeDayOpen.status.id;
                        this.DayDialog = false;
                        this.time_dialog = false;
                        this.editeTimeOpen = {

                            id: '',
                            action_id: '',
                            from_time: '',
                            to_time: '',
                            max_request: '',
                            reservations_number: '',
                            status: {
                                id: '',
                                status_name_ar: ''
                            },
                            reservation_type: {
                                id: '',
                                reservation_type_name: ''
                            },

                        }

                    }



                }





            },
            close_time_Dailog() {
                this.editedIndextime = -1;
                this.time_dialog = false;
            },


            editedTimeOpen(item) {
                this.editedIndextime = this.editeDayOpen.time_to_open.indexOf(item)
                this.editeTimeOpen = Object.assign({}, item);


            },
            SetDayStatus() {

            },

            save_time() {


                if (!this.editeTimeOpen.reservation_type.id == ' ' || !this.editeTimeOpen.reservation_type.id == null &&
                    !this.editeTimeOpen.to_time == ' ' || !this.editeTimeOpen.to_time == null)

                {
                    if (!this.editeTimeOpen.status.id == null || !this.editeTimeOpen.status.id == ' ' && !this
                        .editeTimeOpen.from_time == ' ' || !this.editeTimeOpen.from_time == null) {






                        // if (this.$refs.valid_day_open.validate()) {
                        if (this.editedIndextime > -1) {


                            Object.assign(this.editeDayOpen.time_to_open[this.editedIndextime], this.editeTimeOpen);
                            this.close_time_Dailog();


                        } else {


                            this.editeDayOpen.time_to_open.push(this.editeTimeOpen);

                            Object.assign(this.editedItem.day_to_open[this.editedIndexday].time_to_open, this
                                .editeTimeOpen)


                            // for(var i=0;i<=this.editedItem.day_to_open[this.editedIndexday].time_to_open.length;i++)
                            // {
                            //     if(this.editedItem.day_to_open[this.editedIndexday]['status']==6)
                            //     {
                            //         this.editedItem.day_to_open[this.editedIndexday]['status']=6;
                            //         break;


                            //     }
                            //     else
                            //     {
                            //          this.editedItem.day_to_open[this.editedIndexday]['status']=7;

                            //     }


                            // }

                            this.close_time_Dailog();




                        }
                        // this.close()







                        // }






                    } else {
                        alert('يرجئ ملئ جميع الحقول');
                    }
                } else {
                    alert('يرجئ ملئ جميع الحقول');
                }



            },


            tr() {
                if (this.editedItem.price.payment_when_receiving == 2) {
                    this.editedItem.price.payment_when_receiving = 0;

                }

            },

            editItemFeatures(item) {
                this.editedIndexItemFeatures = this.editedItem.ItemFeatures.indexOf(item)
                this.editeItemFeatures = Object.assign({}, item)
                this.ItemFeaturesDialog = true;

            },
            AddItemFeatures() {
                this.editeItemFeatures = {};
                this.ItemFeaturesDialog = true;
            },

            DeleteItemFeatures(item) {



                const Swal = require('sweetalert2')






                Swal.fire({
                    title: "هل انت متاكد من الحذف ؟",

                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'

                }).then(() => {

                    if (item.id == 'undefined') {
                        const index = this.editedItem.ItemFeatures.indexOf(item)
                        this.editedItem.ItemFeatures.splice(index, 1)

                    } else {
                        const index = this.editedItem.ItemFeatures.indexOf(item)
                        this.editedItem.ItemFeatures.splice(index, 1)
                        var url = "/ItemFeatures/owner/delete/" + item.id;
                        axios({
                            method: 'delete',
                            url: url,
                            headers: {

                            }
                        }).then(response => {



                            response,
                            this.editedItem.images[index].image_url = 'a';
                            this.img_name = index;
                            this.images[index] = 'a';

                            Swal.fire(
                                'تم الحذف بنجاح',
                                '',
                                'success'
                            )

                        }).catch(error => {
                            error
                        }).finally(d => {
                            d,

                            this.getitems();
                        });

                    }

                })

                // confirm('Are you sure you want to delete this item?') &&this.editedItem.ItemFeatures.splice(index, 1)

            },
            save_ItemFeatures() {

                if (this.$refs.valid_ItemFeatures) {


                    if (this.editedIndexItemFeatures > -1) {

                        Object.assign(this.editedItem.ItemFeatures[this.editedIndexItemFeatures], this
                            .editeItemFeatures)

                    } else {
                        console.log(this.editeItemFeatures);

                        this.editedItem.ItemFeatures.push(this.editeItemFeatures)

                    }
                    this.ItemFeaturesDialog = false
                }


            },
            // save_date() {

            //     if (this.editeday_to_open.status.id == 6) {
            //         if (this.editeday_to_open.time_to_open[0].from_time == null || this.editeday_to_open.time_to_open[0]
            //             .from_time == '') {
            //             alert('يجب اختيار فتره اذا كانت حاله المركز مفتوح في هاذا اليوم');
            //         } else if (this.$refs.valid_day_open.validate()) {
            //             Object.assign(this.day_to_open[this.editedIndexday], this.editeday_to_open)
            //             this.DayDialog = false

            //         }

            //     } else {
            //         if (this.$refs.valid_day_open.validate()) {
            //             Object.assign(this.day_to_open[this.editedIndexday], this.editeday_to_open)
            //             this.DayDialog = false
            //         }
            //     }

            // },

            save_date() {
                // alert(this.editedIndextime);

                if (this.editeDayOpen.status.id == 6) {
                    if (this.editeTimeOpen.from_time == null || this.editeTimeOpen.from_time == '') {
                        alert('يجب اختيار فتره اذا كانت حاله المركز مفتوح في هاذا اليوم');
                    } else if (this.$refs.valid_day_open.validate()) {
                        Object.assign(this.editedItem.day_to_open[this.editedIndextime], this.editedTimeOpen)
                        this.time_dialog = false

                    }

                } else {
                    if (this.$refs.valid_day_open.validate()) {
                        Object.assign(this.editedItem.day_to_open[this.editedIndextime], this.editedTimeOpen)
                        this.time_dialog = false
                    }
                }

            },

            editItem(item) {

                this.editedIndexday = this.editedItem.day_to_open.indexOf(item)
                /// alert(this.editedIndexday);
                //   alert(this.editedIndexday);
                this.editeDayOpen = Object.assign({}, item)
                this.DayDialog = true
                if (item.reservation_type.id == 2) {
                    this.reservation_num = true;
                } else {
                    this.reservation_num = false;

                }
            },



            getdays(index) {
                var days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];

                return days[index];
            },

            getstatus(index) {
                if (index == 7) {
                    return 'مغلق';
                } else if (index == 6) {
                    return 'مفتوح';

                }


            },
            getstatuss(index) {
                if (index == 1) {
                    return 'غير محدد';
                } else if (index == 2) {
                    return 'اختيار عدد';

                }


            },
            getItemDetails() {





                var url = "/v2/items/show/" + this.item_id;
                this.$http({
                        method: 'get',
                        url: url,
                        headers: {

                        }
                    })

                    .then(response => {
                        this.editedItem = response.data.data;
                        this.imgs = this.editedItem.images;
                        //  this.DayOpen = response.data.data.day_to_open;
                        if (this.editedItem.price.payment_when_receiving == 0) {
                            this.editedItem.price.payment_when_receiving = 2;
                        }


                        if (this.editedItem.images.length < 4) {
                            var completImgArrayLength = 4 - this.editedItem.images.length;

                            for (var i = 0; i < completImgArrayLength; i++) {

                                this.editedItem.images.push({
                                    image_path: 'a'
                                });
                            }

                        }

                        for (i = 0; i < 4; i++) {
                            if (this.editedItem.images[i].image_path != 'a') {
                                this.images[i] = "http://109.224.27.9:81/images/" + this.editedItem.images[i]
                                    .image_url;
                            }

                        }
                        this.getSubCategory();




                    })
            },


            delete_img(img_id, index) {


                this.user_info = this.$cookies.get('admin_info');


                const Swal = require('sweetalert2');



                Swal.fire({
                    title: "هل انت متاكد من الحذف ؟",

                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'

                }).then((result) => {
                    if (result.value) {
                        this.img_cliced = index;


                        this.editedItem.images[index].image_url = 'a';
                        this.img_name = index;
                        this.images[index] = 'a';

                        var url = "/v2/items/delete_image/" + img_id;
                        axios({
                            method: 'post',
                            url: url,
                            headers: {

                            }

                        }).then(response => {

                            response,
                            this.editedItem.images[index].image_url = 'a';
                            //not important
                            this.img_name = index;
                            this.images[index] = 'a';

                            Swal.fire(
                                'تم الحذف بنجاح',
                                '',
                                'success'
                            )

                        }).catch(error => {
                            error
                            //     this.$swal('خطاء', "خطاء بالاتصال", 'error')
                        }).finally(d => {
                            d,

                            this.getitems();
                        });



                    }
                })




            },


            cancel() {
                this.$refs.form.reset(),
                    this.$emit("changeStatus", false);
            },

            editt() {
                // alert(this.item_id);
                this.$emit("edite_item");

            },

            step1() {
                this.e1 = 1;
                this.Check_Primery();


            },

            step2() {

                this.e1 = 2;
                this.Check_Primery();
                // this.Check_payment();
                // this.Check_address();


            },


            step3() {
                this.e1 = 3;
                this.Check_Primery();
                this.Check_address();
                //  this.Check_date();
                // this.Check_payment();


            },












            Check_Primery() {




                this.errors_primery = [];

                if (!this.editedItem.item_name || !this.editedItem.sub_category.category_id || !this.editedItem
                    .sub_category
                    .id || !this.editedItem.item_description) {


                    this.errors_primery.push("يرجئ ملئ الحقول");
                }


                if (this.errors_primery.length) {
                    this.er1 = false;
                } else {
                    this.er1 = true;
                }


            },



            Check_address() {

                this.errors_address = [];
                if (!this.editedItem.Address.province.country_id || !this.editedItem.Address.province.id || !this
                    .editedItem.Address.address_descraption) {
                    this.errors_address.push("يرجئ ملئ الحقول");
                }
                if (this.errors_address.length) {
                    this.er_address = false;
                } else {
                    this.er_address = true;
                }
            },


            Check_payment() {

                this.errors_payment = [];


                if (!this.$refs.valid_payment.validate()) {
                    this.errors_payment.push("يرجئ ملئ الحقول");
                }

                //                 if (!this.editedItem.price.price_value ) {

                //   if (this.editedItem.price.payment_when_receiving !==1 || this.editedItem.price.payment_when_receiving !==0 ) {


                //                     this.errors_payment.push("يرجئ تحديد طريقه الدفع");
                //                 }

                //                     this.errors_payment.push("يرجئ ملئ الحقول");
                //                 }

                //                 if (this.errors_payment.length) {
                //                     this.er_payment = false;
                //                 } else {
                //                     this.er_payment = true;
                //                 }
            },





            getlocation(lat, lng) {

                this.editedItem.address.lat = lat;
                this.editedItem.address.long = lng
                this.map_dialog = false;


            },
            price_percentage(v) {

                this.offer_info.new_price = this.offer_info.old_price;
                this.offer_info.new_price = this.offer_info.old_price - (this.offer_info.old_price * (v / 100));
                this.offer_info.discount_percentage = v;



            },







            change_timeday() {
                this.day_to_open.length = 0;
            },
            select_reser_type1(id) {

                this.reserv_type_id1 = id;
            },
            select_reser_type(id) {

                this.reserv_type_id = id;
                if (id == 1) {
                    this.book_dur_status = true;
                    this.book_num_status = false;
                } else if (id == 2) {
                    this.book_dur_status = false;
                    this.book_num_status = true;
                } else {
                    this.book_dur_status = false;
                    this.book_num_status = false;
                }
            },

            allowedHours(v) {
                v

                return false;
            },

            comput_maxRequest(id, time_duration, from_tim, to_tim) {

                if (id == 0) {
                    return 0;
                } else if (id == 1) {
                    // this.reservation_duration

                    var from_hour = parseInt(from_tim.split(":")[0])
                    var from_min = parseInt(from_tim.split(":")[1])


                    var to_hour = parseInt(to_tim.split(":")[0])
                    var to_min = parseInt(to_tim.split(":")[1])

                    var from = from_hour * 60 + from_min;


                    var to = to_hour * 60 + to_min;

                    var result = to - from;

                    var houer = parseInt(time_duration.split(":")[0]);
                    var minit = parseInt(time_duration.split(":")[1]);

                    var dur = houer * 60 + minit;

                    result = result / dur

                    return result

                } else {
                    return 0
                }




            },
            submit() {




                var imag = [];
                for (var im = 0; im < this.images.length; im++) {


                    if (this.images[im] != 'a' && this.images[im] !== this.img_url + "/images/" + this.editedItem
                        .images[im]
                        .image_url) {

                        imag.push(this.images[im]);
                    }



                }



                if (!this.er1) {
                    this.step1();

                } else if (!this.er_payment) {
                    this.step4();
                }



                if (this.editedItem.price.free_cancellation) {
                    this.editedItem.price.free_cancellation = 1;
                } else {
                    this.editedItem.price.free_cancellation = 0;
                }





                if (this.DayOpen == 0) {
                    this.$swal('تحذير', "    يجب اختيار جدول الحجز", 'warning')
                }



                this.user_info = this.$cookies.get('admin_info');



                var data = {


                    item_name: this.editedItem.item_name,
                    item_description: this.editedItem.item_description,
                    sub_category_id: this.editedItem.sub_category.id,
                    category_id: this.editedItem.sub_category.category_id,
                    number_of_items: this.editedItem.number_of_items,
                    status_id:this.editedItem.status.id,
                    //Price Data
                    price: this.editedItem.price,


                    //Address Informations
                    Address: [],
                    images: imag,
                    deliverable_id:this.editedItem.deliverable_id,
                    work_times: [],
                    ItemFeatures: []







                    // images: imag
                };


                this.loading = true;
                var posturl = this.item_id != 0 ? "/v2/items/update/" + this.item_id : "/v2/items/store";



                data,
                this.$http({
                        method: 'post',
                        url: posturl,
                        data: data,
                        headers: {


                        }

                    })
                    .then(response => {

                        this.$swal('تم', this.item_id != 0 ? "تم تعديل الايتم" : "    تم اضافة الايتم", 'success')
                        this.dialog = false;
                        this.cancel();


                        if (response.data.success == true) {

                            this.dialog = false;


                        }




                    })
                    .catch((error) => {
                        error,
                        this.$swal('تم', this.item_id != 0 ? "تم تعديل الحجز" : "    تم اضافة الحجز", 'success')
                        this.dialog = false;
                        EventBus.$emit("changeStatus", false);

                        //  this.err_show = true;
                        //this.$swal('خطاء', this.item_id != 0 ? "     فشل  اضافة الحجز" : "فشل تعديل الحجز",
                        //   'error')

                    }).finally(d => {
                        d,
                        this.loading = false;
                        this.everyday = false;
                        this.everytime = false;
                    });
                // } else {

                //     this.err_show = true;




                //  }




            },



            getCategory() {


                this.$http({
                        method: 'get',
                        url: "/v2/info/Categories",
                    })

                    .then(response => {
                        this.category = response.data.data;



                    })
            },


            getCountry() {


                this.$http({
                        method: 'get',
                        url: "/v2/info/Countries",
                    })

                    .then(response => {
                        this.countries = response.data.data;



                    })
            },



            getSubCategory() {

                if (this.item_ID == 0) {
                    var cat_id = this.editedItem.sub_category.category_id


                } else {
                    cat_id = this.editedItem.sub_category.category.id;

                }

                var url = "v2/info/subCategoryCat_id/" + cat_id;
                this.$http({
                    method: 'get',
                    url: url,
                }).then(response => {
                    this.subcategory = response.data.data;



                })
            },
            getProvince() {


                this.$http({
                        method: 'get',
                        url: '/v2/info/Provinces',
                    })

                    .then(response => {
                        this.province = response.data.data;



                    })
            },









            pickFile(index) {

                this.img_cliced = index
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

                        this.images[this.img_cliced] = fr.result;
                        var a = this.img_cliced + 1;
                        this.img_name = "   صورة رقم " + a


                    })

                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
            },

            change_payment(status) {
                if (status == true) {
                    this.editedItem.price.free_cancellation = false;
                    this.editedItem.price.deduction = 0;
                }





            },
            change_reservation_type() {

                console.log(this.editeDayOpen.reservation_type);
                // alert(this.editeDayOpen.reservation_type.id);
                if (this.editeDayOpen.reservation_type.id == 2) {
                    this.reservation_num = true;
                } else {
                    this.reservation_num = false;

                }

            },






            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.editedItem.day_to_open[this.editedIndex], this.editedItem)
                } else {
                    this.editedItem.day_to_open.push(this.editedItem)
                }
                this.close()
            },


        },

        watch: {
            selected: 'dd',
            steps(val) {

                if (this.e1 > val) {
                    this.e1 = val
                }
            },



        },
        computed: {


        },




        created() {



        },


        mounted() {
            this.getCategory();
            this.getProvince();

            // this.token = localStorage.getItem('access_token');
            // this.user_info = JSON.parse(localStorage.getItem('user_info'));

            //   this.user_info = this.$cookies.get('admin_info');


            this.item_id = this.item_ID;


            this.item_id != 0 ? this.getItemDetails() : this.day_to_open.length = 0;
        },

        components: {



        }

    }
</script>