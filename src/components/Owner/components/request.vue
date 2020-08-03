<template>
  <v-layout column="">

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-container grid-list-xs>


          <v-col>

            <v-row class="mb-3">
              <h2 style="color:#000">معلومات الحجز</h2>
            </v-row>
            <v-divider class="mb-3"></v-divider>
            <v-row class="mb-2" justify="center">
              <v-col cols="4">

                <v-row class="mb-2 mr-2">
                  <v-icon size="20" style="padding-left:5px">fas fa-user</v-icon>
                  <label>اسم الزبون</label>
                </v-row>

                <v-row class="mb-2 mr-2">
                  <v-icon size="20" style="padding-left:5px">fas fa-bookmark</v-icon>
                  <label>اسم الماده</label>
                </v-row>

                <v-row class="mb-2 mr-2">
                  <!-- <v-icon size="20" style="padding-left:5px">fas fa-bookmark</v-icon> -->
                  <label>الكميه المطلوبه</label>
                </v-row>




                <v-row class="mb-2 mr-2">
                  <v-icon size="20" style="padding-left:5px">fas fa-calendar-day</v-icon>
                  <label> التاريخ</label>
                </v-row>

                <v-row class="mb-2 mr-2">
                  <v-icon size="20" style="padding-left:5px">fas fa-clock</v-icon>
                  <label> الوقت</label>
                </v-row>
                <hr>

                <v-row class="mb-3 mr-2">
                  <!-- <v-icon size="20" style="padding-left:5px">fas fa-clock</v-icon> -->
                  <label> الكميه المتوفره </label>
                </v-row>

              </v-col>

              <v-col>
                <v-row class="mb-2"><label> {{item_selected.user.full_name}}</label></v-row>
                <v-row class="mb-2"><label> {{item_selected.item.item_name}}</label></v-row>
                <v-row class="mb-2"><label> {{item_selected.reservation_number}}</label></v-row>
                <v-row class="mb-2"><label> {{item_selected.reservation_start_date}}
                    <!-- <v-chip style="margin-left:5px;margin-right:5px;">></v-chip>
                    {{item_selected.to_date}} -->
                    </label>

                    </v-row>
                   

                <v-row class="mb-2"><label>{{item_selected.reservation_from_time}}


                    </label>

                    </v-row>
<hr>
                     <v-row class="mb-2"><label> {{item_selected.item.number_of_items}}</label></v-row>

              </v-col>
            </v-row>


            <!-- <v-row class="mb-3">
              <h2 style="color:#000">معلومات الدفع</h2>
            </v-row>
            <v-divider class="mb-3"></v-divider>

            <v-row class="mb-2" justify="center">
              <v-col cols="4">


                <v-row class="mb-2 mr-2">
                  <v-icon size="20" style="padding-left:5px;font-size: 29px;">fas fa-dollar-sign</v-icon>
                  <label>طريقه الدفع</label>
                </v-row>

                 <v-row class="mb-2 mr-2" v-if="item_selected.bills">
               <v-icon size="20" style="padding-left:5px;font-size: 29px;">fas fa-dollar-sign</v-icon> -->
                  <!-- <label>رقم الفاتوره</label>
                </v-row>
                <v-row v-else>

                </v-row>

                  <v-row class="mb-2 mr-2" v-if="item_selected.bills"> -->
                  <!-- <v-icon size="20" style="padding-left:5px;font-size: 29px;">fas fa-dollar-sign</v-icon> -->
                  <!-- <label>حاله الفاتوره</label>
                </v-row >

                <v-row v-else>

                </v-row>


              </v-col>


                 <v-col>
                <v-row class="mb-2"><label v-if="item_selected.bills">فاتوره تسديد</label> <label v-else>الدفع نقدا</label></v-row>
                <v-row class="mb-2"><label v-if="item_selected.bills" >{{item_selected.bills.payId}}</label>  <label v-else></label> </v-row>
                <v-row ><label v-if="item_selected.bills">لم يتم التسديد</label>  <label v-else>
                  </label> </v-row>

              </v-col>
            </v-row> -->

            <v-spacer></v-spacer>
            <v-container>
              <v-divider class="mb-3"></v-divider>
             <v-row justify="space-between">

                <span  v-if="item_selected.status.id==4">

                  <v-btn color="success" @click="change_reservation_status(item_selected,5)" width="220"
                    style="margin-left:10px">
                    <span v-show="!loding_accept">
                      <v-icon right>fas fa-truck</v-icon>
                      توجيه لشركه التوصيل
                    </span>
                    <v-progress-circular indeterminate color="white" v-show="loding_accept"></v-progress-circular>
                  </v-btn>









                  <v-btn color="#f95252" width="120" dark="" @click="change_reservation_status(item_selected,12)">

                    <span v-show="!loding_cancel">
                      <v-icon right size="18">fas fa-trash-alt</v-icon>
                      رفض
                    </span>
                    <v-progress-circular indeterminate color="white" v-show="loding_cancel"></v-progress-circular>
                  </v-btn>


                </span>

                <span v-if="item_selected.status.id==5">

                  <v-btn color="success" @click="change_reservation_status(item_selected,13)" style="margin-left:10px">
                    <span v-show="!loding_accept">
                      <v-icon right>fas fa-check</v-icon>
                      تم اكمال الحجز
                    </span>
                    <v-progress-circular indeterminate color="white" v-show="loding_accept"></v-progress-circular>
                  </v-btn>

                </span>




                <v-btn color="red" @click="dialog=false">
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

            <v-toolbar-title>الطلبات</v-toolbar-title>
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

              <!-- <div style="width:auto;">
                <v-select dense="" :items="filter" item-value="id" item-text="name" outlined="" placeholder="فلترة"
                  v-model="res_filter" @change="dis()"></v-select>
              </div> -->

              <div style="width:auto;margin-right:10px">
                <v-select dense="" :items="reser_status" item-value="id" item-text="name" outlined=""
                  placeholder="فلترة" v-model="res_status" @change="reservsion_status()"></v-select>
              </div>




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

 const swal = require('sweetalert2')
  export default {
    data: () => ({
      items_ByStatus: [],
      items_ByDate: [],
      today:'',

      filters:{
        first_date:null,
        second_date:null,
        status_id:""
      },
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

      res_status:null,
      user_info: {},
      res_filter:null,

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
        id: 5,
        name: 'المقبوله'
      }, {
        id:12,
        name: 'المرفوضه'
      }, {
        id:4,
        name: 'المعلقه'
      },
       {
        id:13,
        name: 'المكتمله'
      }

      ],





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
        user: {
          name: ''
        },
        item: {
          name: ''
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
          text: 'اسم الماده',
          align: 'center',
          sortable: false,
          value: 'item.item_name',
        },
        {
          text: 'اسم الزبون',
          align: 'center',
          sortable: false,
          value: 'user.full_name',
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
          text: ' ',
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
      last_page: 0,
      loading: false


    }),



    methods: {

      selectrequest(item) {

        this.dialog = true;
        this.item_selected = item;
      },



      get_calander() {
        //this.$refs.calendar.scrollToTime('08:00')
        this.calander_dialog = true;
      },


      Search() {
        if(this.filters.first_date!=null)
        {
            var date=this.filters.first_date+'_'+this.filters.second_date;
        }
        else
        {
             date='';
        }



        var url='/reservation/owner/search?filter[BetweenDate]='+date+'&filter[status_id]='+this.filters.status_id+'&page='+this.current_page;
        this.loading = true;
        this.$http({
          method: 'get',
          url: url,
          headers: {

          }

        }).then(response => {
          this.items_ByDate = response.data.data;
          this.last_page = response.data.meta.last_page;
          this.pageCount = response.data.meta.last_page;

          this.items = this.items_ByDate;


        }).catch(rr=>
        {
          rr
          //this.$swal('خطاء', "خطاء بالاتصال", 'error')
        }

        ).finally(
          this.loading = false

        );


      },

      reservsion_status() {

        if(this.res_status==0)
        {
          this.getitems();
        }
        else
        {
        this.filters.status_id=this.res_status;
        this.Search();

        }

      },


      dis() {
        if (this.res_filter == 0) {
          this.res_status = 0;
          this.getitems();

        } else if (this.res_filter == 1) {

          var today = new Date();
          var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
           this.filters.first_date=date;
           this.filters.second_date=date;
           this.Search();

        } else if (this.res_filter == 2) {

          var curr = new Date; // get current date
          var first = curr.getDate()-curr.getDay(); // First day is the day of the month - the day of the week
          var last = first+6; // last day is the first day + 6

          today = new Date();
            this.filters.first_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + first;
           this.filters.second_date= today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + last;

          this.Search();

        } else if (this.res_filter == 3) {

          date = new Date();

          var first_date = new Date(date);
          first_date.setUTCDate(1);

          var last_date = new Date(first_date); //Make a copy of the calculated first day
          last_date.setUTCMonth(last_date.getUTCMonth() + 1); //Add a month
          last_date.setUTCDate(0); //Set the date to 0, this goes to the last day of the previous month

          this.filters.first_date =first_date.toJSON().substring(0, 10);
          this.filters.second_date= last_date.toJSON().substring(0, 10);
          this.Search();

        }


      },

      // open(event) {

      // },
      dateClick() {


      },


      change_reservation_status(item_id, item_status) {



         var data = {
                reservation_id:item_id.id,
                status_id:item_status
              };
                 const Swal = require('sweetalert2')


        Swal.fire({
          title: "هل انت متاكد ",

          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'

        }).then((result) => {
          if (result.value) {


          this.loding_accept = true;
              this.$http({
                  method: 'post',
                  url:"/reservation/owner/changeStatus",
                  data: data,
                  headers: {

                  }
                })
                .then(response=>{
                  console.log(response.data);
                  this.getitems(),

                   this.getitems(),
                   
                 
                    this.dialog = false,
                       this.loding_accept = false,



                    swal("تمت الموافقة", {
                      icon: "success",
                    })



                })
                .catch(error =>{
             
                 // this.getitems()
             
                 if(error.response.data.data=='QuantityFinished')
                 {
                   this.$swal('خطاء', 'الكميه المطلوبه غير متوقره', 'error')
                 }
                 else
                 {
                    this.$swal('خطاء','ه', 'error')

                 }
                 
                 
                  
                  

                }

                ).finally(v=>
                {
                v
                console.log(v);
               
              
                  // this.getitems(),
                  // this.getitems(),
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

        // if (this.current_page <= this.last_page) {
        //   this.current_page = this.page;
        //   this.getitems();
        // }



      },



      getitems() {

        var url ="/reservation/owner/get?page="+this.current_page
        this.loading = true;
        axios({
          method: 'get',
          url: url,

        }).then(response => {
          this.items = response.data.data;
          this.items_ByDate = this.items;
         this.last_page = response.data.meta.last_page;
          this.pageCount = response.data.meta.last_page;


          for (var i = 0; i < this.items.length; i++) {


            this.events.push({
                name: this.items[i].user.full_name,
                start: this.items[i].reservation_start_date + ' ' + this.items[i].reservation_from_time,
                end: this.items[i].reservation_end_date + ' ' + this.items[i].reservation_to_time,


              }

            );



          }








        }).catch(error => {
          this.$swal('خطاء', "خطاء بالاتصال", error )
        }).finally(()=>{

          this.loading = false


          }


        );
      },





    },

    created() {

      this.getitems();

    },
    mounted() {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      this.today = date;
         this.user_info=this.$cookies.get('admin_info');



    },
    computed: {

     selected: function () {
        return this.getMoreitems();
      }
    },


    watch: {
      selected: 'search by sub_cat_id',
    },
  }
</script>
