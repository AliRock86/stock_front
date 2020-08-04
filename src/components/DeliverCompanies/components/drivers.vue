<template>
    <v-layout column="">

        <v-dialog v-model="dialog" width="600">
            <v-card pa-4>
                <v-form ref="form">


                    <v-card-title class="headline grey lighten-2" primary-title
                        style="	font-family: 'droid_bold' !important;    background-color: #435c6f!important;color:#fff">
                        اضافه سائق
                    </v-card-title>

                    <v-container>
                        <v-col>
                            <v-row justify="center" class="mb-3">

                                <v-avatar height="100" width="100">
                                    <img class="signup_img" :src="images[0]" :alt="imgname">
                                </v-avatar>

                            </v-row>
                            <v-row justify="center">
                                <v-btn dark color="#435c6f" @click="pickFile">

                                    <v-icon size="25" style="padding-left :7px">fas fa-camera</v-icon>
                                    صورة
                                </v-btn>
                            </v-row>
                        </v-col>
                        <v-flex pa-3 xs12>
                            <v-text-field background-color="#eeeeee" v-model="drivers.car_owner_name" height="40" style=""
                                label="اسم السائق" required :rules="nameRules"></v-text-field>
                        </v-flex>



                        <v-flex pa-3 xs12>
                            <v-text-field background-color="#eeeeee" v-model="drivers.user_phone" height="40" style=""
                                label="رقم الهاتف" required :rules="phoneRules"></v-text-field>
                        </v-flex>


                        <v-flex pa-3 xs12>
                            <v-text-field background-color="#eeeeee" v-model="drivers.car_number" height="40" style=""
                                label="رقم السياره" required ></v-text-field>
                        </v-flex>

                        <v-flex pa-3 xs12>
                        <v-textarea background-color="#fff" placeholder=" الوصف "
                            v-model="drivers.driver_description" :rules="descriptRules" required>
                        </v-textarea>
                        </v-flex>






                        <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">


                        <v-layout row wrap pr-5>


                            <v-btn @click="submit()" color="success" style="margin-left:10px" width="150px">
                                <span v-show="!loading">حفظ</span>
                                <v-progress-circular indeterminate color="white" v-show="loading"></v-progress-circular>
                            </v-btn>
                            <v-btn @click="close()" color="red" dark="" width="150px"> خروج</v-btn>
                        </v-layout>




                    </v-container>


                </v-form>
            </v-card>
        </v-dialog>

        <v-row>

            <v-data-table :headers="headers" :items="ownres" :page.sync="page" @page-count="pageCount = $event"
                sort-by="calories" class="elevation-1 request_table" style="width:96%" items-per-page="15"
                :search="search" hide-default-footer="" :loading="loading" loading-text="جاري تحميل البيانات">

                <template v-slot:top>
                    <v-toolbar flat color="white" pb-5>

                        <v-toolbar-title>السائقين</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-row justify="end" style="margin-top:20px;">
                            <div style="width:auto">

                                <v-btn color="primary" dark class="mb-2" @click="dialog=true">
                                    <span style="margin-left:5px;font-family:'cairo_Semi'">اضافه سائق</span>
                                    <v-icon size="15">fas fa-plus</v-icon>

                                </v-btn>



                            </div>



                        </v-row>

                    </v-toolbar>
                </template>
                <template v-slot:bottom>
                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
                </template>
                <template v-slot:item.created_at="{ item }">

                    <span>{{getDateOnly(item.created_at)}}</span>

                </template>
                <template v-slot:item.user.status_id="{ item }">


                    <span v-if="item.user.status_id==1">مفعل</span>
                    <span v-else>متوقف</span>
                </template>




                <!-- edit reservation -->
                <template v-slot:item.action="{ item }">
                    <!-- <v-btn text icon @click="dialog=true;item_selected=item">
                        <v-icon size="50">fas fa-edit</v-icon>
                    </v-btn> -->


<v-btn v-if="item.status.id==15" dark="" color="green" style="height:30px" @click="changeStatus(item)">
    تفعيل السائق
</v-btn>
                    <v-btn v-else color="#04355b" dark style="height:30px"
                        @click="changeStatus(item)">
                        ايقاف السائق
                    </v-btn>


                </template>



            </v-data-table>

        </v-row>
        <v-row>
            <v-pagination v-model="page" @change="getmore" prev-icon="mdi-menu-right" next-icon="mdi-menu-left"
                circle="" :length="pageCount"></v-pagination>
        </v-row>
    </v-layout>

</template>


<script>

    export default {
        data: () => ({

            today: '2019-01-08',
            selectedType: 'month',

            user_info: {},
            driver_count:'',
            category: [{
                name: "",
                id: 0
            }],
            //   owner:{},


            drivers: {
                car_owner_name: "",
                driver_description:"",
                car_number: "",
                user_phone: "",
                company_name: "",
                category_id: "",
                status_id:"",
                owner_image:""


            },
            calander_dialog: false,
            err_show: false,
            error: '',
            search: '',
            urL: 'http://109.224.53.155',
            dialog: false,
            items: [],
            images: [],


            nameRules: [
                (v) => !!v || 'يجب ادخال الاسم',

            ],





            phoneRules: [
                (v) => !!v || 'يجب ادخال رقم الهاتف',
                (v) => v.length == 11 || 'يجب ادخال رقم هاتف صحيح',

            ],





            emailRules: [



                (v) => (v.length < 1 || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/.test(v)) ||
                'ألايميل غير صحيح',


            ],



            PasswordRules: [
                (v) => !!v || 'يجب ادخال الباسورد',
                v => v.length > 3 || ' يجب ان لا يقل عن 4',

            ],

            imgname: '',
            ownres: [],
            item_selected: {},
            loding_accept: false,
            loding_cancel: false,
            headers: [{
                    text: 'رقم التعريف',
                    align: 'center',
                    sortable: false,
                    value: 'id',
                },
                {
                    text: 'اسم السائق',
                    align: 'center',
                    sortable: false,
                    value: 'car_owner_name',
                },

                {
                    text: 'رقم الهاتف',
                    align: 'center',
                    sortable: false,
                    value: 'user.user_phone',
                },

                // { text: 'الوصف', value: 'disc' },
                {
                    text: 'رقم السياره',
                    align: 'center',
                    sortable: false,
                    value: 'car_number',
                },


                {
                    text: 'تاريخ الاضافة',
                    value: 'created_at',
                    sortable: false
                },

                {
                    text: ' الحالة',
                    value: 'status.status_name_ar',
                    align: 'center',
                },
                {
                    text: ' ',
                    value: 'action',
                    align: 'center',
                },

            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },


            valid: false,
            page: 1,
            pageCount: 0,
            current_page: 0,
            last_page: 0,
            loading: false


        }),

        updated() {


        },

        methods: {

            submit() {

                if (this.$refs.form.validate() && !this.loading) {

                    var data = {

                        car_owner_name: this.drivers.car_owner_name,
                        car_number:this.drivers.car_number,
                        driver_description:this.drivers.driver_description,
                        user_phone: "964" + parseInt(this.drivers.user_phone),
                        status_id:1,
                        province_id: "1",
                        long: "66",
                        lat: "32",
                        owner_image: this.images,
                        images: this.images


                    };
                    this.loading = true;
                    // this.description=JSON.stringify(data);
                    this.$http({
                            method: 'post',
                            url: "/reservation/delivery/setDrivers",
                            data: data,
                            headers: {

                            }
                        })
                        .then(response => {
                            response,





                            this.dialog = false;
                            this.getOWner();

                            this.$swal('', "   تم اضافة تاجر", 'success')



                        })
                        .catch(error => {
                            if (error.response) {
                                console.log(error.response.data);
                                if (error.response.data.data.user_phone ==
                                    "The user phone has already been taken.") {
                                    this.$swal('', " رقم الهاتف مسجل", 'error')
                                } else {
                                    this.$swal('', "  لم تم اضافة تاجر ", 'error')
                                }

                            }


                        }).finally(() => {

                            this.loading = false;
                        });

                }


            },



            close() {
                this.dialog = false;
            },

            changeStatus(item) {




                const Swal = require('sweetalert2');



                Swal.fire({
                    title: "هل انت متاكد من الامر ؟",

                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'

                }).then((result) => {
                    if (result.value) {


                        var data = {


                            driver_id: item.id,
                            status_id: item.status.id ==15?2:15


                        };
                        this.loading = true;
                        // this.description=JSON.stringify(data);
                        this.$http({
                                method: 'post',
                                url: "reservation/delivery/changeStatus",
                                data: data,
                                headers: {

                                }
                            })
                            .then(response => {
                                response,
                                this.getOWner();

                               item.status.id = item.status.id ==15?2:15;

                              item.status.id == 2 ? this.$swal('', "   تم  تفعيل السائق",
                                'success') : this.$swal('', "   تم ايقاف السائق", 'success');



                            })
                            .catch(() => {

                                this.$swal('', " حدث خطاء", 'error')
                            }).finally(() => {

                                this.loading = false;
                            });




                    }
                })



            },
            cat_selectFunc(item) {

                this.drivers.category_id = item.id;

            },
            deleteItem(item) {
                //  const index = this.items.indexOf(item)
                this.cancelReservation(item);




            },



            getmore() {},
            getOWner() {

                var url = "/reservation/delivery/getDrivers";
                this.loading = true;
                this.$http({
                    method: 'get',
                    url: url,
                    headers: {


                    }

                }).then(response => {
                    this.ownres = response.data.data.data;
                    this.driver_count=response.data.data.meta












                }).catch(error => {
                    error
                    //this.$swal('خطاء', "خطاء بالاتصال", 'error')
                }).finally(s => {
                    s,
                    this.loading = false;
                });
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

            getDateOnly(date) {
                if (date != null) {
                    return date.split("T")[0];
                } else {
                    return "--------"
                }

            },
            getInfo() {

                this.user_info = this.$cookies.get('admin_details');
            }

        },

        mounted() {
            this.getInfo();

            this.getOWner();
            this.getCategory();

        },
        computed: {



            // selected:function() {

            // },
        },


        watch: {
            selected: 'search by sub_cat_id',
        },
    }
</script>
