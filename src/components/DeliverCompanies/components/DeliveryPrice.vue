<template>
    <v-layout column="">

        <v-dialog v-model="dialog" width="600" persistent>
            <v-card pa-4>
                <v-form ref="form">


                    <v-card-title class="headline grey lighten-2" primary-title
                        style="	font-family: 'droid_bold' !important;    background-color: #435c6f!important;color:#fff">
                        <span v-if="editedIndex>-1">
                            تعديل تسعيره
                        </span>

                        <span v-else>
                            اضافه تسعيره

                        </span>
                        
                    </v-card-title>

                    <v-container>
                
                        <v-flex pa-3 xs12>
                          <v-select background-color="#fff" height="50" item-value="id"
                                      item-text="province_name" :items="province" placeholder=" المحافظة"
                                      target="#dropdown-example" v-model="editedItem.province_id" required
                                      :rules="nameRules"></v-select>
                        </v-flex>



                        <v-flex pa-3 xs12>
                            <v-text-field background-color="#eeeeee" v-model="editedItem.delivery_price_weight_kilos" height="40" style=""
                                label="الوزن" required :rules="WeightRules"></v-text-field>
                        </v-flex>


                        <v-flex pa-3 xs12>
                            <v-text-field background-color="#eeeeee" v-model="editedItem.delivery_price_value" height="40" style=""
                                label="السعر" :rules="PriceRules" required ></v-text-field>
                        </v-flex>

                        <v-flex pa-3 xs12>
                        <v-textarea background-color="#fff" placeholder=" الوصف "
                            v-model="editedItem.delivery_prices_description"  required>
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

            <v-data-table :headers="headers" :items="DeliveryPrices" :page.sync="page" @page-count="pageCount = $event"
                sort-by="calories" class="elevation-1 request_table" style="width:96%" items-per-page="15"
                :search="search" hide-default-footer="" :loading="loading" loading-text="جاري تحميل البيانات">

                <template v-slot:top>
                    <v-toolbar flat color="white" pb-5>

                        <v-toolbar-title>اسعار التوصيل</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-row justify="end" style="margin-top:20px;">
                            <div style="width:auto">

                                <v-btn color="primary" dark class="mb-2" @click="dialog=true">
                                    <span style="margin-left:5px;font-family:'cairo_Semi'">اضافه تسعيره</span>
                                    <v-icon size="15">fas fa-plus</v-icon>

                                </v-btn>



                            </div>



                        </v-row>

                    </v-toolbar>
                </template>
                <template v-slot:bottom>
                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-btn text icon @click="editItem(item)">
                    <v-icon size="50">fas fa-edit</v-icon>
                  </v-btn>

                    <v-btn class="mx-2" small icon="" @click="deleteItem(item)" dark>
                        <v-icon color="red">fas fa-trash</v-icon>
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


          editedItem:
          {
            province_id:'',
            delivery_price_value:'',
            delivery_price_weight_kilos:'',
            delivery_prices_description:''

          },


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
            dialog: false,
            items: [],
            images: [],


            nameRules: [
                (v) => !!v || 'يجب ادخال الاسم',

            ],





            WeightRules: [
                (v) => !!v || 'يجب ادخال رقم الوزن',


            ],
            PriceRules: [
                (v) => !!v || 'يجب ادخال رقم السعر',


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
            DeliveryPrices: [],
            item_selected: {},
            loding_accept: false,
            loding_cancel: false,
            headers: [{
                    text: '#',
                    align: 'center',
                    sortable: false,
                    value: 'id',
                },
                {
                    text: 'المحافظه',
                    align: 'center',
                    sortable: false,
                    value: 'province.province_name',
                },

                {
                    text: 'الوزن',
                    align: 'center',
                    sortable: false,
                    value: 'delivery_price_weight_kilos',
                },


                {
                    text: 'السعر',
                    align: 'center',
                    sortable: false,
                    value: 'delivery_price_value',
                },

                // { text: 'الوصف', value: 'disc' },


                {
                    text: 'تاريخ الاضافة',
                    value: 'created_at',
                    sortable: false
                },


                {
                    text: ' ',
                    value: 'action',
                    align: 'center',
                },

            ],
            editedIndex: -1,

            defaultItem: {
                province_id:'',
            delivery_price_value:'',
            delivery_price_weight_kilos:'',
            delivery_prices_description:''
            },


            valid: false,
            page: 1,
            pageCount: 0,
            current_page: 0,
            last_page: 0,
            loading: false,
            province:[],


        }),

        updated() {


        },

        methods: {


        close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      editItem (item) {
           this.dialog = true
           this.editedItem = Object.assign({},item)
            this.editedIndex = this.DeliveryPrices.indexOf(item)
 
      
     
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


            submit() {

                if (this.$refs.form.validate() && !this.loading) {

                    var data = {
                      province_id:this.editedItem.province_id,
                      delivery_price_value:this.editedItem.delivery_price_value,
                      delivery_price_weight_kilos:this.editedItem.delivery_price_weight_kilos,
                      delivery_prices_description:this.editedItem.delivery_prices_description,
                      deliveryPrice_id:this.editedItem.id

                    };

                    if (this.editedIndex > -1) {


                      var posturl ="/reservation/delivery/updateDeliveryPrice" ;

                     } else {
                        posturl = "/reservation/delivery/addDeliveryPrice";
                     }

                    this.loading = true;
                    // this.description=JSON.stringify(data);
                    this.$http({
                            method:'post',
                            url:posturl,
                            data: data,
                            headers: {

                            }
                        })
                        .then(response => {
                            response,
                            this.dialog = false;
                            this.getitems();
                             if (this.editedIndex > -1) {


                      this.$swal('', "تم تعديل التسعيره", 'success')

                     } else {
                        this.$swal('', "تم اضافه تسعيره", 'success')
                     }

                            



                        })
                        .catch(error => {
                            if (error.response) {
                              

                            }


                        }).finally(() => {

                            this.loading = false;
                        });

                }


            },



           
          
            cat_selectFunc(item) {

                this.drivers.category_id = item.id;

            },
            deleteItem(item) {
                
                 const Swal = require('sweetalert2')


  
        Swal.fire({
          title: "هل انت متاكد من الحذف ؟",

          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'

        }).then((result) => {
          if (result.value) {
            var url = "/reservation/delivery/deleteDeliveryPrice/"+item.id;
           this.$http({
              method: 'post',
              url: url,
              headers: {

              }

            }).then(response => {
              response



            }).catch(error => {
              error,
              this.$swal('خطاء', "خطاء بالاتصال", 'error')
            }).finally(d => {
              d,
              Swal.fire(
                'تم الحذف بنجاح',
                '',
                'success'
              )
              this.getitems();
            });



          }
        })




            },



            getmore() {},
            getitems() {

                var url = "/reservation/delivery/getDeliveryPrices";
              //  this.loading = true;
                this.$http({
                    method: 'get',
                    url: url,
                    headers: {


                    }

                }).then(response => {
                //  this.loading = false;
                    this.DeliveryPrices = response.data.data;
                    console.log(this.DeliveryPrices);


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
            this.getProvince();
            this.getitems();
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
