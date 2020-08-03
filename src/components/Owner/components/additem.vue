<template>
  <v-layout row wrap>


    <v-data-table :headers="headers" :items="items" :server-items-length="15" sort-by="calories" class="elevation-1 request_table"
      hide-default-footer style="width:96%" :loading="loading" loading-text="جاري تحميل البيانات" color="red">

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>المنتجات</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="dialog=true;itemId=0">
            <span style="margin-left:5px;font-family:'cairo_Semi'">اضافه منتج</span>
            <v-icon size="15">fas fa-plus</v-icon>

          </v-btn>


          <!-- dailog of add item -->

        </v-toolbar>
      </template>
      <template v-slot:item.status="{ item }">

          <!-- reservation not confirm  -->

          <v-row wrap justify="center">
            <!-- <v-icon size="20" style="margin-right:5px" color="primary">fas fa-clock</v-icon> -->

            <v-chip class="res_pinding_chip" dark="" :color="item.status.status_color">
              <span style="color:#fff" v-if="item.status.id==5">
                تم التوجيه لشركه التوصيل
                <v-icon left size="12"> {{item.status.status_icon}}</v-icon>
              </span>

              <span v-else style="color:#fff">
                {{item.status.status_name_ar}}
                <v-icon left size="12"> {{item.status.status_icon}}</v-icon>
              </span>



            </v-chip>
          </v-row>
        </template>


      <template v-slot:item.action="{ item }">
        <v-row wrap justify="center">


          <v-btn class="mx-2" small icon="" dark>
            <!-- <v-icon color="warning" style="margin-left:5px">fas fa-pen-square</v-icon> -->

            <!-- <div v-if="item.offers!=''" style="width: 32px;height:32px">

              <div v-if="item.offer.status_id!==0">

                <v-img style="width:100%;height:100%" src="https://image.flaticon.com/icons/png/512/411/411705.png">
                </v-img>

              </div>

              <div v-else>

                <v-img style="width:100%;height:100%" src="https://image.flaticon.com/icons/png/512/411/411756.png">
                </v-img>

              </div>





            </div>


            <div v-else style="width: 32px;height:32px">






            </div> -->

          </v-btn>


          <v-btn class="mx-2" small icon="" dark @click="showEditdailog(item.id)">

            <v-icon color="warning" style="margin-left:5px">fas fa-pen-square</v-icon>

          </v-btn>





          <v-btn class="mx-2" small icon="" @click="delete_item(item.id)" dark>
            <v-icon color="red">fas fa-trash</v-icon>
          </v-btn>






        </v-row>




      </template>

      <template v-slot:item.offers="{ item }">
        <v-row wrap justify="center">

          <div v-if="item.offer!=''">

            <v-btn class="mx-2" v-for="offer in item.offer" :key="offer.id" icon="" dark
              @click="edite_offer(offer.id,item.id,item.item_price)">
              <v-icon color="dark" style="margin-left:5px;color:#000;font-size:14px;">fas fa-edit</v-icon>
            </v-btn>


          </div>



          <v-btn v-else class="mx-2" small icon="" dark @click="add_offer(item.id,item.price)">
            <v-icon color="dark" style="color:#000;font-size:14px;">fas fa-plus</v-icon>
          </v-btn>











        </v-row>


      </template>


      <!-- <template v-slot:activator="{ on }">

          </template> -->

    </v-data-table>
    <v-row justify="center" style="width:100%">
      <v-pagination v-model="page" prev-icon="mdi-menu-right" next-icon="mdi-menu-left" circle="" :length="pageCount">
      </v-pagination>

    </v-row>
    <v-row>


      <v-dialog v-model="offer_dialog" max-width="970" persistent>
        <v-form ref="form" v-model="valid">
          <v-card pa-4>

            <v-card-title class="headline grey lighten-2" primary-title
              style="	font-family: 'droid_bold' !important;    background-color: #435c6f!important;color:#fff">
              اضافه عرض
            </v-card-title>


            <v-container>
              <v-flex pa-3 xs12>
                <v-text-field background-color="#eeeeee" height="40" style="" label="اسم العرض"
                  v-model="offer_info.offer_name" :rules="nameRules" required></v-text-field>
              </v-flex>

              <v-layout row wrap>

                <v-flex xs4 pa-3>
                  <v-text-field label="نسبه الخصم" background-color="#eeeeee" height="40" @input="price_percentage"
                    @change="price_percentage" v-model="offer_info.discount_percentage" append-icon="fas fa-percent"
                    filled>
                  </v-text-field>
                </v-flex>



                <v-flex pa-3 xs4>

                  <v-text-field background-color="#eeeeee" height="40" label="السعر السابق"
                    v-model="offer_info.old_price" filled disabled append-icon="fas fa-dollar-sign" :rules="nameRules"
                    required>
                  </v-text-field>
                </v-flex>





                <v-flex pa-3 xs4>

                  <v-text-field background-color="#eeeeee" height="40" value label="السعر الجديد"
                    v-model="offer_info.offer_price" filled disabled append-icon="fas fa-dollar-sign">
                  </v-text-field>
                </v-flex>



              </v-layout>

              <v-layout row wrap>


                <v-flex xs6 pr-3 pl-4>
                  <v-menu v-model="menu_date_from" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="offer_info.offer_from_date" label="تاريخ بدا العرض" append-icon="event"
                        background-color="#eeeeee" height="40" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="offer_info.offer_from_date" @input="menu_date_from = false"></v-date-picker>
                  </v-menu>

                </v-flex>


                <v-flex xs6 pr-3 pl-4>
                  <v-menu v-model="menu_date_to" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="offer_info.offer_to_date" label="تاريخ انتهاء العرض" append-icon="event"
                        background-color="#eeeeee" height="40" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="offer_info.offer_to_date" @input="menu_date_to = false"></v-date-picker>
                  </v-menu>

                </v-flex>
              </v-layout>

              <br>
              <br>

              <v-layout>
                <v-flex xs12>
                  <v-textarea filled name="input-7-4" v-model="offer_info.offer_description" label="وصف العرض" height="200">
                  </v-textarea>

                </v-flex>
              </v-layout>


              <v-container fluid>


                <p>
                  حاله العرض :
                  <span v-if="offer_info.status_id==9">
                    مفعل
                  </span>

                  <span v-else>
                    ملغي
                  </span>

                </p>

                <v-radio-group v-model="offer_info.status_id" :mandatory="false">
                  <v-radio label="تفعيل" value="9"></v-radio>
                  <v-radio label="ايقاف" value="8"></v-radio>
                </v-radio-group>


              </v-container>

              <br>
              <br>


              <v-layout row wrap pr-5>
                <v-btn @click="submit_offer(item_id_offer)" color="success" style="margin-left:10px" width="150px">
                  <span v-show="!loading">حفظ</span>
                  <v-progress-circular indeterminate color="white" v-show="loading"></v-progress-circular>
                </v-btn>
                <v-btn @click="close_offer()" color="red" dark="" width="150px"> خروج</v-btn>
              </v-layout>



            </v-container>


          </v-card>
        </v-form>
      </v-dialog>

      <v-dialog v-model="dialog" max-width="1150" height="700" v-if="dialog" persistent>
        <itemDialog @changeStatus="dialog=false,getitems()" :item_ID="itemId">
        </itemDialog>

      </v-dialog>

    </v-row>
  </v-layout>
</template>


<script>
  const axios = require('axios');
  import {
    EventBus
  } from './event-bus.js';
  //import GoogleMap from '../components/map'
  // import itemFormx from '../components/item_form'
  import itemDialog from './item_dialog.vue'
  import {
    //USER_ROLE_GUEST,
    //USER_ROLE_REGISTERED,
    //ADMIN_ROLE,
    //USER_ROLE,
    //OWNER_ROLE,

  } from "../../constants.js";
  export default {
    data: () => ({
      dialog: false,
      switch1: true,
      switch2: false,
      item_id_offer: '',
      radios: 'radio-1',
      submit_name: '',
      item_new_price: '',
      menu_date_from: false,
      menu_date_to: false,
      editdailog: false,
      user_info: {},
      itemId: '',

      map_dialog: false,
      modal2: false,
      offer_info: {


      },
      error: '',
      msg_error_txt: 'هذا اليوم مكرر ',


      headers: [{
          text: '#',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        {
          text: 'اسم المنتج',
          align: 'center',
          sortable: false,
          value: 'item_name',
        },


        // { text: 'الوصف', value: 'disc' },
        {
          text: 'سعر المنتج',
          value: 'price.price_value',
          align: 'center',
        },

        // {
        //   text: 'بطاقة دفع',
        //   value: 'payment',
        //   sortable: false,
        //   align: 'center',
        // },
        {
          text: 'القسم',
          value: 'sub_category.category.category_name',
          sortable: false,
          align: 'center',
        },


        {
          text: 'تاديخ الاضافة',
          value: 'created_at',
          sortable: false,
          align: 'center',
        },

        {
          text: 'الحاله',
          value: 'status',
          sortable: false,
          align: 'center',
        },


        {
          text: 'العروض',
          value: 'offers',
          sortable: false,
          align: 'center',
        },


        {
          text: ' ',
          value: 'action',
          align: 'center',
        },

      ],
      page: 1,
      pageCount: 0,
      items: [],
      editedIndex: -1,


      valid: false,
      deduction: '',


      img_cliced: -1,
      day_to_open: [],

      nameRules: [
        v => !!v || 'هذا الحقل مطلوب  ',

      ],
      numberRul: [
        v => !!v || 'هذا الحقل مطلوب  ',

        v => !isNaN(v) || 'يجب ادخال رقم ',
      ],
      numberRul1: [

        v => !isNaN(v) || 'يجب ادخال رقم ',
      ],
      descriptRules: [
        v => !!v || 'هذا الحقل مطلوب  ',
        v => v.length >= 20 || 'يجب ان يكون الوصف اكثر من ٢٠ حرف ',
      ],
      loading: false,

      request: 0,
      current_page: 1,
      last_page: 0,
      offer_dialog: false,
      prov_id: '',
      //msg_error:false,
      reserv_type_id: -1,
      offer_url: '',
      reservation_duration: '',
      reservation_duration_foroneday: '',


    }),



    methods: {




      edit_item(item_id) {

        EventBus.$emit('edit_item', item_id);
        this.dialog = true;



      },

      getOfferById(id, old_price) {

old_price
        var url ="/v2/Offers/show/" + id;
        this.$http({
          method: 'get',
          url: url,
        }).then(response => {
          this.offer_info = response.data.data;
          this.offer_info.old_price = this.offer_info.item.price.price_value;
          //alert(this.offer_info.item.price.price_value)

        }).catch(error => {
          error
          this.$swal('خطاء', "خطاء بالاتصال", 'error')
        }).finally(d => {
          d


        });


      },

      close_offer() {
        this.offer_dialog = false;
        this.offer_info.offer_price = '';
        this.offer_info.old_price = '';
        this.offer_info.discount_percentage = '';


      },

      submit_offer(item_id) {



        if (this.$refs.form.validate()) {



          var data = {

            item_id: item_id,
            offer_name: this.offer_info.offer_name,
            discount_percentage: this.offer_info.discount_percentage,
            offer_description: this.offer_info.offer_description,
            offer_from_date: this.offer_info.offer_from_date,
            offer_to_date: this.offer_info.offer_to_date,
            old_price: this.offer_info.old_price,
            status_id: this.offer_info.status_id,

          };


          if (this.submit_name == 'edite') {
            this.offer_url ='/v2/Offers/update/'+this.offer_info.id;


          } else if (this.submit_name == 'add') {
            this.offer_url ='/v2/Offers/store';

          }




          this.loading = true;
          axios({
              method: 'post',
              url: this.offer_url,
              data: data,
              headers: {

              }

            })
            .then(response => {
              this.$swal('تم', "    تم اضافة العرض", 'success')
              this.offer_dialog = false;
              this.offer_info.offer_price = '';
              this.offer_info.old_price = '';
              this.offer_info.discount_percentage = '';


              this.getitems();
              this.$refs.form.reset();

              if (response.data.success == true) {
                this.$refs.form.reset()
                this.dialog = false;


              }
              //



            })
            .catch(error => {
              error,
              this.err_show = true;
              this.$swal('خطاء', "     لم يتم اضافة الحجز", 'error')

            }).finally(d => {
              d,
              this.offer_dialog = false;
              this.loading = false;
            });
        } else {

          this.err_show = true;




        }

      },


      delete_item(id) {



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
            var url = "v2/items/delete/" + id;
            axios({
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


      price_percentage(v) {

        this.offer_info.offer_price = this.offer_info.old_price;
        this.offer_info.offer_price = this.offer_info.old_price - (this.offer_info.old_price * (v / 100));
        this.offer_info.discount_percentage = v;



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


      edite_offer(id, item_id, old_price) {
        this.submit_name = 'edite';


        this.item_id_offer = item_id;

        this.offer_dialog = true;
        this.getOfferById(id, old_price);



      },

      add_offer(item_id, item_price) {
        this.offer_info = {};

        this.submit_name = 'add';


        this.item_id_offer = item_id;
        this.offer_dialog = true;
        this.offer_info.old_price = item_price.price_value;



      },

      getitems() {


        this.loading = true
        this.$http({
          method: 'get',
          url: "/v2/items/owner?page="+this.current_page,
          headers: {

          }

        }).then(response => {
          this.items = response.data.data;
          this.last_page = response.data.meta.last_page;
          this.pageCount = response.data.meta.last_page;


        }).catch(error => {
          if (error.response.status == 402) {
            this.$swal(" انتهت الجلسة", "يجب تسجيل الدخول", 'error')
           // this.logout();

          } else {
            this.$swal('خطاء', "خطاء بالاتصال", 'error')
          }

        }).finally(d => {
          d,
          this.loading = false;
        });

      },




      getMoreitems() {

        if (this.current_page <= this.last_page) {
          this.current_page = this.page;
          this.getitems();
        }

      },



      showEditdailog(id) {

        this.dialog = true;
        this.itemId = id;

      },




      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },

    },

     created() {

            //    Listen for the i-got-clicked event and its payload.

            EventBus.$on('changeStatus', (from) => {
          from,
          this.dialog=false;
         this.getitems();

        });


        },

    watch: {
      selected: 'search by sub_cat_id',
    },

    computed: {
      selected: function () {
        return this.getMoreitems();
      }
    },
    mounted() {

      this.getitems();


    },
    components: {

      itemDialog

    }
  }
</script>
