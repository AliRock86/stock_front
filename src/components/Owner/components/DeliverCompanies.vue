<template>
    <v-layout column="">

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-container grid-list-xs>


              <v-col>

                <v-row class="mb-3">
                  <h4 style="color:#000">معلومات شركه التوصيل</h4>
                </v-row>
                <v-divider class="mb-3"></v-divider>
                <v-row class="mb-2" justify="center">
                  <v-col cols="5">

                    <v-row class="mb-2 mr-2">
                      <v-icon size="20" style="padding-left:5px">fas fa-building</v-icon>
                      <label>اسم الشركه</label>
                    </v-row>

                    <!-- <v-row class="mb-2 mr-2">
                      <v-icon size="20" style="padding-left:5px">fas fa-user</v-icon>
                      <label>اسم صاحب االشركه</label>
                    </v-row> -->

                    <v-row class="mb-2 mr-2">
                      <v-icon size="20" style="padding-left:5px">fas fa-phone</v-icon>
                      <label> الهاتف</label>
                    </v-row>

                    <v-row class="mb-2 mr-2">
                      <v-icon size="20" style="padding-left:5px">fas fa-envelope</v-icon>
                      <label> الايميل</label>
                    </v-row>

                    <v-row class="mb-2 mr-2">
                      <v-icon size="20" style="padding-left:5px">fas fa-map-marker-alt</v-icon>
                      <label> العنوان</label>
                    </v-row>

                  </v-col>

                  <v-col>

                    <v-row class="mb-2"><label> {{item.owner_barnd_name}}</label></v-row>
                    <!-- <v-row class="mb-2"><label> {{item.user.full_name}}</label></v-row> -->
                    <v-row class="mb-2"><label> {{item.owner_phone}}</label>  </v-row>
                    <v-row class="mb-2"><label> {{item.owner_email}}</label>  </v-row>
                    <v-row class="mb-2"><label> بغداد -الكراده-تقاطع المسبح</label>  </v-row>



                  </v-col>
                  </v-row>




              </v-col>


                        <v-row class=" mr-4">
  <v-col cols="3">
                          <v-btn color="success" @click="send_join(item)">
                            طلب انظمام
                          </v-btn>
                        </v-col>

                          <v-col cols="3" class=" mr-4" >
              <v-btn color="red" style="color:#fff" @click="dialog=false">
                الغاء
              </v-btn>
              </v-col>

            </v-row>



            </v-container>
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

  <v-spacer></v-spacer>
  <v-spacer></v-spacer>
  <v-spacer></v-spacer>

                          <v-tabs style="padding-bottom:20px;">
                            <v-tab class="filter_com" @click="all()">الكل</v-tab>
                           <v-tab to="/OwnerPartnershipCompany" class="filter_com"
                           @click="getAllPartnership()">شركات تم التعاقد معها</v-tab>

                         </v-tabs>




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
                  <v-btn color="primary" @click="join_request(item)">طلب انظمام</v-btn>
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
            item:{},
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
          all()
          {
              this.getOWner();
          },
          getAllPartnership()
          {

                            var url = "/reservation/owner/getAllPartnership";
                            this.loading = true;
                            this.$http({
                                method: 'get',
                                url: url,
                                headers: {


                                }

                            }).then(response => {
                            //    this.ownres = response.data.data;
                                this.owners=[],
                                this.loading = false;
                                this.owners.push(response.data.data.data[1].owner_delivery);
                                console.log(this.owners);
  this.owners=[]
                            }).catch(error => {
                                error
                                //this.$swal('خطاء', "خطاء بالاتصال", 'error')
                            }).finally(s => {
                                s,
                                this.loading = false;
                            });

          }
,
          send_join(item)
          {


            var data = {

                owner_delivery_id:item.id,
                status_id:18
            };
            this.loading = true;
            const Swal = require('sweetalert2')


   Swal.fire({
     title: "هل انت متاكد من ارسال الطلب",

     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'

   }).then((result) => {
       if (result.value) {

            this.$http({
                    method: 'post',
                    url: "/reservation/owner/addPartnership",
                    data: data,

                })
                .then(response => {
                    response,

                    this.dialog = false;
                    this.getOWner();
                    this.$swal('', "   تم ارسال الطلب", 'success')



                })
                .catch(error => {
                    if (error.response) {
                        console.log(error.response.data);
                        if (error.response.data.data.user_phone ==
                            "The user phone has already been taken.") {
                            this.$swal('', " رقم الهاتف مسجل", 'error')
                        } else {
                            this.$swal('', "  لم تم ارسال الطلب", 'error')
                        }

                    }


                }).finally(() => {

                    this.loading = false;
                });
}
              });

          },

          join_request(item)
          {
            this.dialog=true;
            this.item=item;

          },

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
                        role_id: "2",
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

                var url = "/reservation/owner/getCompaniesDelivery";
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
<style>
.filter_com
{
  padding-bottom:20px;
  font-family: inherit;
  font-weight: bold;
  font-size: 16px;
    color:red !important;
}
</style>
