<template>
    <v-layout column="">

        <v-dialog v-model="dialog" width="650">
            <v-card pa-4>
                <v-form ref="form">


                    <v-card-title class="headline grey lighten-2" primary-title
                        style="	font-family: 'droid_bold' !important;    background-color: #435c6f!important;color:#fff">
                        اضافه شركه توصيل
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
                            <v-text-field background-color="#eeeeee" v-model="owners.name" height="40" style=""
                                label="اسم صاحب الشركه" required :rules="nameRules"></v-text-field>
                        </v-flex>
                        <v-flex pa-3 xs12>
                            <v-text-field background-color="#eeeeee" v-model="owners.company_name" height="40" style=""
                                label="اسم الشركة" required :rules="nameRules"></v-text-field>
                        </v-flex>
                        <v-flex pa-3 xs12>
                            <v-text-field background-color="#eeeeee" v-model="owners.phone" height="40" style=""
                                label="رقم الهاتف" required :rules="phoneRules"></v-text-field>
                        </v-flex>
                        <v-flex pa-3 xs12>
                            <v-text-field background-color="#eeeeee" v-model="owners.email" height="40" style=""
                                label="الايميل" required :rules="emailRules"></v-text-field>
                        </v-flex>

                        <v-flex pa-3 xs12>
                            <v-text-field background-color="#eeeeee" type="password" v-model="owners.password"
                                height="40" style="" label="الباسورد" required :rules="PasswordRules"></v-text-field>
                        </v-flex>



                        <v-flex pa-3 xs12>
                            <v-combobox background-color="#eeeeee" :items="category" item-text="name" item-value="id"
                                @change="cat_selectFunc" height="40" style="" label=" التصنيف" required
                                :rules="nameRules"></v-combobox>
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

                        <v-toolbar-title>شركات التوصيل</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-row justify="end" style="margin-top:20px;">
                            <div style="width:auto">

                                <v-btn color="primary" dark class="mb-2" @click="dialog=true">
                                    <span style="margin-left:5px;font-family:'cairo_Semi'">اضافه شركه</span>
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
<!--
                    <v-btn v-if="item.user.status_id==1" color="#04355b" dark style="height:30px"
                        @click="changeStatus(item)">
                        ايقاف الشركه
                    </v-btn>
                    <v-btn v-else dark="" color="green" style="height:30px" @click="changeStatus(item)">
                        تفعيل التجار
                    </v-btn> -->

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
    const axios = require('axios');
    export default {
        data: () => ({

            today: '2019-01-08',
            selectedType: 'month',

            user_info: {},


            category: [{
                name: "",
                id: 0
            }],
            //   owner:{},

            owners: {
                name: "",
                email: "",
                password: "",
                phone: "",
                company_name: "",
                category_id: ""


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
                    text: 'اسم الشركه',
                    align: 'center',
                    sortable: false,
                    value: 'user.full_name',
                },
                // {
                //     text: 'اسم الشركة',
                //     align: 'center',
                //     sortable: false,
                //     value: 'owner_barnd_name',
                // },
                {
                    text: 'رقم الهاتف',
                    align: 'center',
                    sortable: false,
                    value: 'owner_phone',
                },

                // { text: 'الوصف', value: 'disc' },
                {
                    text: 'البريد الالكتروني',
                    align: 'center',
                    sortable: false,
                    value: 'owner_email',
                },


                {
                    text: 'تاريخ الاضافة',
                    value: 'created_at',
                    sortable: false
                },

                {
                    text: ' الحالة',
                    value: 'user.status_id',
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

                        full_name: this.owners.name,
                        user_email: this.owners.email,
                        password: this.owners.password,
                        user_phone: "964" + parseInt(this.owners.phone),
                        owner_brand_name: this.owners.company_name,
                        owner_phone: "964" + parseInt(this.owners.phone),
                        owner_type_id:2,
                        role_id:4,
                        province_id: "1",
                        category_id: this.owners.category_id,
                        long: "66",
                        lat: "32",
                        owner_image: this.images,
                        images: this.images


                    };
                    this.loading = true;
                    // this.description=JSON.stringify(data);
                    this.$http({
                            method: 'post',
                            url: "/auth/v2/signUpOthers",
                            data: data,

                        })
                        .then(response => {
                            response,





                            this.dialog = false;
                            this.getOWner();

                            this.$swal('', "   تم اضافة شركه التوصيل", 'success')



                        })
                        .catch(error => {
                            if (error.response) {
                                console.log(error.response.data);
                                if (error.response.data.data.user_phone ==
                                    "The user phone has already been taken.") {
                                    this.$swal('', " رقم الهاتف مسجل", 'error')
                                } else {
                                    this.$swal('', "  لم تم اضافة الشركه ", 'error')
                                }

                            }


                        }).finally(() => {

                            this.loading = false;
                        });

                }


            },


            getCategory() {

                var url = "/v2/Categories";
                axios.get(url).then(response => {
                    this.category = response.data.data;



                })
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


                            owner_id: item.id,
                            status_id: item.user.status_id == 1 ? 15 : 1


                        };
                        this.loading = true;
                        // this.description=JSON.stringify(data);
                        this.$http({
                                method: 'post',
                                url: "operation/OwnerChangeStatus",
                                data: data,
                                headers: {

                                }
                            })
                            .then(response => {
                                response,

                                item.user.status_id = item.user.status_id == 1 ? 15 : 1;

                                item.user.status_id == 1 ? this.$swal('', "   تم  تفعيل التاجر",
                                'success') : this.$swal('', "   تم ايقاف التاجر", 'success');



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

                this.owners.category_id = item.id;

            },
            deleteItem(item) {
                //  const index = this.items.indexOf(item)
                this.cancelReservation(item);




            },



            getmore() {},
            getOWner() {

                var url = "/operation/getAllOwnersDelivery";
                this.loading = true;
                this.$http({
                    method: 'get',
                    url: url,
                    headers: {

                    }

                }).then(response => {
                    this.ownres = response.data.data.data;


                    this.events.push({
                            title: 'Vacationxxxxxxx',
                            details: 'Going to the beach!',
                            date: '2019-01-22',
                            open: false
                        }

                    );









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
