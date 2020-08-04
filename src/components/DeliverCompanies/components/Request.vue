<template>
  <v-layout column="">

    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-container grid-list-xs>


          <v-col>

            <v-row class="mb-3 mr-4">
              <h2 style="color:#000">معلومات الحجز</h2>
            </v-row>
            <v-divider class="mb-3"></v-divider>
            <v-row class="mb-2" justify="center">
              <v-col cols="4" class="mb-2" justify="center">



                <v-row class="mb-5 mr-2">
                  <v-icon   style="padding-left:5px">fas fa-building</v-icon>
                  <label>اسم الشركه</label>
                </v-row>

                <v-row class="mb-5 mr-2">
                  <v-icon   style="padding-left:5px">fas fa-bookmark</v-icon>
                  <label>اسم المنتج</label>
                </v-row>



                <v-row class="mb-5 mr-2" >
                  <v-icon   style="padding-left:5px">fas fa-user</v-icon>
                  <label>اسم الزبون</label>
                </v-row>


                <v-row class="mb-5 mr-2" >
                  <v-icon  style="padding-left:5px">fas fa-map-marker</v-icon>
                  <label>العنوان</label>
                </v-row>



                <v-row class="mb-5 mr-2">
                  <v-icon  style="padding-left:5px">fas fa-calendar-day</v-icon>
                  <label>تاريخ الطلب</label>
                </v-row>

                <v-row class="mb-5 mr-2">
                  <v-icon  style="padding-left:5px">fas fa-clock</v-icon>
                  <label> الوقت</label>
                </v-row>

              </v-col>

              <v-col >
                <!-- <v-row class="mb-2"><label> {{item_selected.item.owner.owner_barnd_name}}</label></v-row> -->
                <v-row class="mb-5"><label>Haider</label></v-row>
                <v-row class="mb-5 "><label> {{item_selected.item.item_name}}</label></v-row>
                <v-row class="mb-5" ><label> {{item_selected.user.full_name}}</label></v-row>
                <v-row class="mb-5" ><label> {{item_selected.address.province.province_name}}_{{item_selected.address.address_descraption}}

                                      <v-btn height="30" color="info" @click="map_dialog=true">موقع الزبون
                                      </v-btn>


                                  <v-dialog v-model="map_dialog" max-width="400px">

                                      <GoogleMap @getmyLocation="getlocation" @cancel="map_dialog=false" />

                                  </v-dialog>
                </label></v-row>


                <v-row class="mb-5"><label> {{item_selected.reservation_end_date}}</label>  </v-row>





                <v-row class="mb-2"><label>{{item_selected.reservation_from_time+""}}

                  </label></v-row>

              </v-col>
            </v-row>


            <v-row class="mb-3 ">

                <h2 style="color:#000;    padding-right: 28px;">تحديد السائق</h2>


            </v-row>
              <v-divider class="mb-3"></v-divider>

            <v-row>

                                      <v-radio-group v-model="driver_id">
                                                      <v-simple-table style="width:100%">
                                                          <template v-slot:default>
                                                              <thead>
                                                                  <tr style="float: right;">
                                                                      <th class="text-right">#</th>
                                                                      <th class="text-right">اسم السائق</th>
                                                                      <th class="text-right">المحافظه</th>
                                                                      <th class="text-right">العنوان</th>
                                                                      <th class="text-right">الحاله</th>
                                                                      <th class="text-right">الموقع الحالي</th>
                                                                      <th class="text-right"></th>
                                                                  </tr>
                                                              </thead>

                                                              <tbody>


                                                                  <tr v-for="item in drivers" :key="item">
                                                                  <div v-if="item.status.id !==15">

                                                                      <!-- <v-radio-group v-model="radioGroup"> -->
                                                                    <td>
                                                                      <v-radio

                                                                    :key="item.id"

                                                                    :value="item.id"
                                                                  ></v-radio>



                                                                  </td>


                                                                     <td>{{item.user.full_name}}</td>

                                                                     <td>{{item.user.address.province.province_name}}</td>
                                                                     <td>{{item.user.address.address_descraption}}</td>
                                                                        <td>{{item.user.status.status_name_ar}}</td>
                                                                        <td>
                                                                          <v-btn height="30" color="info" @click="map_dialog=true">موقع السائق
                                                                          </v-btn>
                                                                          </td>

                                                                  </div>




                                                                  </tr>

                                                              </tbody>
                                                          </template>
                                                      </v-simple-table>
                                                        </v-radio-group>




            </v-row>







            <v-spacer></v-spacer>
            <v-container>
              <v-divider class="mb-3"></v-divider>
             <v-row justify="space-between">

                <span  v-if="item_selected.status.id==4">

                  <v-btn color="success" @click="change_reservation_status(item_selected.delivery[0].id,5)" width="120"
                    style="margin-left:10px">
                    <span v-show="!loding_accept">
                      <v-icon right>fas fa-check</v-icon>
                      قبول
                    </span>
                    <v-progress-circular indeterminate color="white" v-show="loding_accept"></v-progress-circular>
                  </v-btn>









                  <v-btn color="#f95252" width="120" dark="" @click="change_reservation_status(item_selected,3)">

                    <span v-show="!loding_cancel">
                      <v-icon right size="18">fas fa-trash-alt</v-icon>
                      رفض
                    </span>
                    <v-progress-circular indeterminate color="white" v-show="loding_cancel"></v-progress-circular>
                  </v-btn>


                </span>

                <span v-if="item_selected.status.id==5">

                  <v-btn color="success" @click="change_reservation_status(item_selected.id,item_selected.delivery[0].id,22)" style="margin-left:10px">
                    <span v-show="!loding_accept">
                      <v-icon right>fas fa-truck</v-icon>
                      ارسال الطلب للسائق
                    </span>
                    <v-progress-circular indeterminate color="white" v-show="loding_accept"></v-progress-circular>
                  </v-btn>

                </span>


                <span v-if="item_selected.status.id==23">

                  <v-btn color="success" @click="change_reservation_status(item_selected.id,item_selected.delivery[0].id,24)" style="margin-left:10px">
                    <span v-show="!loding_accept">
                      <v-icon right>fas fa-truck</v-icon>
                      ارسال الطلب للسائق
                    </span>
                    <v-progress-circular indeterminate color="white" v-show="loding_accept"></v-progress-circular>
                  </v-btn>

                </span>




                <v-btn color="red" style="color:#fff" @click="dialog=false">
                  الغاء
                </v-btn>
              </v-row>


            </v-container>

          </v-col>
        </v-container>
      </v-card>
    </v-dialog>

    <v-row>

      <v-data-table :headers="headers" :items="items" :page.sync="page" sort-by="calories"
        class="elevation-1 request_table" style="width:96%" :search="search" hide-default-footer=""
        :loading="loading" loading-text="جاري تحميل البيانات">

        <template v-slot:top>
          <v-toolbar flat color="white" pb-5>

            <v-toolbar-title>طلبات التوصيل</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-row justify="end" style="margin-top:20px;">
              <div style="width:auto">

                <v-dialog v-model="calander_dialog" width="1300">

                  <v-card width="1300" pa-4>
                    <v-layout>
                      <v-flex>
                        <v-sheet height="400" style="direction:ltr">
                          <v-calendar ref="calendar" :now="today" :value="today" :events="events" color="primary"
                            type="week"></v-calendar>
                        </v-sheet>
                      </v-flex>
                    </v-layout>

                  </v-card>
                  <!-- <template v-slot:activator="{ on }">
                    <v-btn color="red lighten-2" dark v-on="on" style="margin-left:10px">
                      عرض جدول الاسبوع
                    </v-btn>
                  </template> -->

                </v-dialog>
              </div>

              <v-row justify="end" >

                <v-spacer></v-spacer>


                <v-tabs background-color="#e0e0e0" style="margin-bottom: 22px;">
                <v-tab class="filter_com"  @click="getRequestByStatus('All')">الكل</v-tab>
                  <v-tab class="filter_com"  @click="getRequestByStatus('OwnerConfirmed')">المعلقه</v-tab>
                  <v-tab class="filter_com"  @click="getRequestByStatus('Taking')">الاستلام من التاجر</v-tab>
                  <v-tab class="filter_com"  @click="getRequestByStatus('InDelivery')">في شركه التوصيل</v-tab>
                    <v-tab class="filter_com"  @click="getRequestByStatus('UnderDelivery')">التوصيل للزبون</v-tab>
                    <v-tab class="filter_com"  @click="getRequestByStatus('userDelivered')">المكتمله</v-tab>
               </v-tabs>




              </v-row>


              <!-- <div style="width:auto;">
                <v-select dense="" :items="filter" item-value="id" item-text="name" outlined="" placeholder="فلترة"
                  v-model="res_filter" @change="dis()"></v-select>
              </div>

              <div style="width:auto;margin-right:10px">
                <v-select dense="" :items="reser_status" item-value="id" item-text="name" outlined=""
                  placeholder="فلترة" v-model="res_status" @change="reservsion_status()"></v-select>
              </div> -->




            </v-row>

          </v-toolbar>
        </template>




        <!-- <template v-slot:bottom>
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </template> -->
        <!-- edit reservation -->
        <template v-slot:item.status="{ item }">

          <!-- reservation not confirm  -->

          <v-row wrap justify="center">
            <!-- <v-icon size="20" style="margin-right:5px" color="primary">fas fa-clock</v-icon> -->

            <v-chip v-if="item.status.id==5" class="res_pinding_chip" dark="" color="#f07821">
              <span style="color:#fff;font-weight:bold" >
              معلقه
                <v-icon left size="21"> fas fa-clock</v-icon>
              </span>



            </v-chip>


            <v-chip  v-else class="res_pinding_chip" dark="" :color="item.status.status_color">


              <span  style="color:#fff;font-weight:bold">
                 {{item.status.status_name_ar}}
                <v-icon left size="21"> {{item.status.status_icon}}</v-icon>
              </span>

            </v-chip>
          </v-row>






        </template>

        <!-- edit reservation -->
        <template v-slot:item.action="{ item }">
          <v-btn text icon @click="selectrequest(item)">
            <v-icon size="50">fas fa-edit</v-icon>
          </v-btn>


        </template>
        <template v-slot:no-data>
          <h4>لاتوجد بيانات</h4>
        </template>



      </v-data-table>

    </v-row>
    <v-row>
      <v-pagination v-model="page" prev-icon="mdi-menu-right" next-icon="mdi-menu-left" circle="" :length="pageCount">
      </v-pagination>

    </v-row>
  </v-layout>

</template>


<script>
 const axios = require('axios');
 import GoogleMap from '../components/map';
 const swal = require('sweetalert2')
  export default {
    data: () => ({
      items_ByStatus: [],
      items_ByDate: [],
      map_dialog: false,
      res_status:'',
      today: '2020-01-28',
      events: [{
          name: 'Weekly Meeting',
          start: '2020-01-29 09:00',
          end: '2020-01-29 09:00',
        },
        {
          name: 'Thomas\' Birthday',
          start: '2019-01-10',
        },
        {
          name: 'Mash Potatoes',
          start: '2019-01-09 12:30',
          end: '2019-01-09 15:30',
        },
      ],
      user_info: {},
      res_filter: '',
      token: localStorage.getItem('access_token'),
      calander_dialog: false,
      err_show: false,
      error: '',
      search: '',
      urL: 'http://109.224.53.155',
      dialog: false,
      items: [],


      reser_status: [{
        id: 0,
        name: 'الكل'
      }, {
        id: 1,
        name: 'المقبوله'
      }, {
        id: 2,
        name: 'المرفوضه'
      }, {
        id: 3,
        name: 'المعلقه'
      }],





      filter: [{
        id: 0,
        name: 'الكل'
      }, {
        id: 1,
        name: 'حجوزات اليوم'
      }, {
        id: 2,
        name: 'حجوزات الاسبوع'
      }, {
        id: 3,
        name: 'حجوزات الشهر'
      }],
      item_selected: {

        address:{
          province:{
            province_name:''

          }

        },
        owner:{

        },
        user: {
          name: ''
        },
        item: {
          name: '',
          user:{
            address:{
              province:{
                province_name:""

              }
            }
          }
        },
        status:{
          id:''
        }
      },

      loding_accept: false,
      marvelHeroes: [],
      loding_cancel: false,
      headers: [{
          text: '#',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        {
          text: 'اسم الشركه',
          align: 'center',
          sortable: false,
          value: 'item.owner.owner_barnd_name',
        },

        {
          text: 'اسم الزبون',
          align: 'center',
          sortable: false,
          value: 'user.full_name',
        },
        {
          text: 'اسم المنتج',
          align: 'center',
          sortable: false,
          value: 'item.item_name',
        },




        {
          text: 'الكميه',
          align: 'center',
          sortable: false,
          value: 'reservation_number',
        },




        // { text: 'الوصف', value: 'disc' },
        // {
        //   text: 'سعر الحجز',


        //   align: 'center',
        //   value: 'item.item.price_vale'
        // },


        {
          text: 'تاريخ الطلب',
          value: 'reservation_start_date',
          align: 'center',
          sortable: false
        },
          {
          text: 'وقت الطلب',
          value: 'reservation_from_time',
          align: 'center',
          sortable: false
        },

        {
          text: ' الحاله',
          value: 'status',
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
      current_page: 1,
      driver_id:'',
      last_page: 0,
      loading: false,
      drivers:[]

    }),

    components: {

GoogleMap,

    },

    methods: {

      getDrivers() {

          var url = "/reservation/delivery/getDrivers";
          this.loading = true;
          this.$http({
              method: 'get',
              url: url,
              headers: {
              }

          }).then(response => {
              this.drivers = response.data.data.data;
          }).catch(error => {
              error
              //this.$swal('خطاء', "خطاء بالاتصال", 'error')
          }).finally(s => {
              s,
              this.loading = false;
          });
      },

      getlocation(lat, lng) {

                this.editedItem.address.lat = lat;
                this.editedItem.address.long = lng
                this.map_dialog = false;


            },
//       get_reser_status() {

//         var url = this.urL + "/GetReservationStatus";
//         this.loading = true;
//         axios({
//           method: 'get',
//           url: url,
//
//
//         }).then(response => {
//           this.reser_status = response.data;
//
//         }).catch(ff=>
//         {ff,
// this.$swal('خطاء', "خطاء بالاتصال", 'error')
//         }
//
//         ).finally(
//           this.loading = false
//
//         );
//
//
//       },

      selectrequest(item) {

        this.dialog = true;
        this.item_selected = item;
      },

      reservsion_status() {
        this.items_ByStatus = this.items_ByDate;

        var res_status = this.res_status;
        this.items = this.items_ByStatus.filter(function (hero) {

          return hero.reservation_statuses_id == res_status;


        });




      },

      get_calander() {
        //this.$refs.calendar.scrollToTime('08:00')
        this.calander_dialog = true;
      },


      getBetweenDate(first, last) {

        var url = this.urL + "/ReservationBetweenDate/" + first + "/" + last + "?page=" + this.current_page;
        this.loading = true;
        axios({
          method: 'get',
          url: url,
          headers: {
            token: this.token
          }

        }).then(response => {
          this.items_ByDate = response.data.Data.data;
          this.last_page = response.data.Data.last_page;
          this.pageCount = response.data.Data.last_page;
          this.items = this.items_ByDate;

        }).catch(rr=>
        {
          rr,
  this.$swal('خطاء', "خطاء بالاتصال", 'error')
        }

        ).finally(
          this.loading = false

        );


      },
      dis() {
        if (this.res_filter == 0) {

          this.res_status = 0;
          this.getRequestByStatus('All');

          // this.reservsion_status();



        } else if (this.res_filter == 1) {

          // this.reservsion_status();
          //  this.res_status=0;
          var today = new Date();
          var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       //   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          this.getBetweenDate(date, date);




        } else if (this.res_filter == 2) {

          var curr = new Date; // get current date
          var first = curr.getDate()-curr.getDay(); // First day is the day of the month - the day of the week
          var last = first+6; // last day is the first day + 6

          today = new Date();
            first = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + first;
           last = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + last;

          this.getBetweenDate(first,last);

        } else if (this.res_filter == 3) {

          date = new Date();

          var first_date = new Date(date);
          first_date.setUTCDate(1);

          var last_date = new Date(first_date); //Make a copy of the calculated first day
          last_date.setUTCMonth(last_date.getUTCMonth() + 1); //Add a month
          last_date.setUTCDate(0); //Set the date to 0, this goes to the last day of the previous month
          this.getBetweenDate(first_date.toJSON().substring(0, 10), last_date.toJSON().substring(0, 10));


        }


      },

      // open(event) {

      // },
      dateClick() {


      },


      change_reservation_status(res_id,delivery_id, item_status) {

         var data = {
           driver_id:this.driver_id,
           delivery_id:delivery_id,
           status_id:item_status
              };

              var data2 = {
                     reservation_id:res_id,
                     status_id:item_status
                   };


              axios({
                  method: 'post',
                  url:"/reservation/delivery/changeStatusRes",
                  data:data2,
                  headers: {

                  }
                })
                .then(

                )
                .catch(rr=>{
                  rr
                }

              );






                 const Swal = require('sweetalert2')


        Swal.fire({
          title: "هل انت متاكد ",

          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'نعم متاكد'

        }).then((result) => {
          if (result.value) {


          this.loding_accept = true;
              axios({
                  method:'post',
                  url:"/reservation/delivery/addDeliveryToDriver",
                  data: data,
                  headers: {

                  }
                })
                .then(
                  this.getRequestByStatus('All'),
                    this.dialog = false,
                       this.loding_accept = false,


                    swal("تمت الموافقة", {
                      icon: "success",
                    })



                )
                .catch(rr=>{
                  this.getRequestByStatus('All'),
                  rr
                   //Swal = require('sweetalert2')
               //   this.$swal('خطاء', "خxطاء بالاتصال", 'error')

                }

                ).finally(v=>
                {
                v,
                  this.getRequestByStatus('All'),
                  this.loding_accept = false

                }


                );



          }
        })






      },





      deleteItem(item) {
        this.items.indexOf(item)
        this.cancelReservation(item);




      },



      getMoreitems() {

        if (this.current_page <= this.last_page) {
          this.current_page = this.page;
          this.getRequestByStatus('All');
        }

      },

      getRequestByStatus(status_name)
      {


                var url ="/reservation/delivery/get/"+status_name+"?page="+this.current_page
                this.loading = true;
                axios({
                  method: 'get',
                  url: url,
                  headers: {

                  }

                }).then(response => {

                  this.items = response.data.data;
                  this.items_ByDate = this.items;
                  this.last_page = response.data.meta.last_page;
                  this.pageCount = response.data.meta.last_page;
                    //this.getRequestByStatus(status_name);










                }).catch(error => {
                  this.$swal('خطاء', "خطاء بالاتصال", error )
                }).finally(
                  this.loading = false

                );

      },







    },

    created() {
      this.getRequestByStatus('All');
        this.getDrivers();
    //  this.get_reser_status();
    },
    mounted() {
      var today = new Date();

      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //  var dateTime = date + ' ' + time;
      this.today = date;

      // this.$refs.calendar.scrollToTime('08:00')

      // this.token = localStorage.getItem('access_token');
      // alert(this.token);
      // this.token = localStorage.getItem('access_token');
      //  this.$refs.calendar.scrollToTime('08:00');
      //this.token = localStorage.getItem('access_token');
      this.user_info = JSON.parse(localStorage.getItem('user_info'));


    },
    computed: {

      eventsMap() {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
      },

      selected:function() {


         return this.getMoreitems();

        //}

        // if (this.items.length > 0) {
        //   if (this.page > 1) {

        //   }
        // }
      },
    },


    watch: {
      selected: 'search by sub_cat_id',
    },
  }
</script>
