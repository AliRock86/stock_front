<template>
  <v-container fluid="">

    <v-layout row wrap pr-3 pl-4 pt-4 pb-4 align-center>


      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2 @click="getReservInfo(1)">

        <card name=" الكلي" icon="fas fa-layer-group" text_color="#53D3F8" :count="counts.all"
          :loading="laoding_card[0]"></card>

      </v-flex>

      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2 @click="getReservInfo(2)">

        <card name="  المقبولة" icon="fas fa-clipboard-check" text_color="#6CD6A1" :count="counts.confirmed"
          :loading="laoding_card[1]"></card>

      </v-flex>

      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2 @click="getReservInfo(3)">

        <card name=" المرفوضه" icon="fas fa-calendar-times" text_color="#F56D7E" :count="counts.reject"
          :loading="laoding_card[2]"></card>

      </v-flex>


      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2 @click="getReservInfo(4)">


        <card name="المعلقة" icon="fas fa-business-time" text_color="#f29c2b" :count="counts.bainding"
          :loading="laoding_card[3]"></card>


      </v-flex>

    </v-layout>


    <v-layout row wrap pr-3 pl-4>

      <v-flex md6 xs12 style="margin-bottom:1%" pa-1>
        <v-card class="dash_rate_card">
          <p class="dash_part_rate_title">احصائيه الاصناف </p>
          <v-divider class="mb-3"></v-divider>






          <div id="chart">
            <apexchart type=pie class="circle_chart" :options="chartOptions" :series="seriess" />
          </div>

        </v-card>
      </v-flex>



      <v-flex md6 sm12 style="padding-left:0%" pa-1 pr-4>
        <v-card style="width:100%;height:500px;border-radius:10px">
          <v-row>
            <p class="dash_part_rate_title">احصائيه سنويه للحجوزات</p>

            <!-- <v-menu
        ref="menu"
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date_select"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }" >
          
              <v-text-field
            style="width:10px !important;margin:30px;"
            v-model="date_select"
            placeholder="التاريخ"
            outlined=""
             dense=""
             required
            readonly
            v-on="on"
          ></v-text-field>
         
        </template>
        <v-date-picker
          v-if="menu1"
          v-model="date_select"
          full-width
          @click:minute="$refs.menu.save(date_select)"
        ></v-date-picker>
      </v-menu>
              -->

          </v-row>
          <v-divider class="mb-3"></v-divider>

          <div style="padding-right:10%;padding-left:5%">
            <apexchart type="bar" :options="options" :series="series"></apexchart>
          </div>
        </v-card>

      </v-flex>
    </v-layout>

    <!-- display booking details -->
    <v-dialog v-model="details_dailog" width="500">
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
                  <label>اسم الحجز</label>
                </v-row>

                <v-row class="mb-2 mr-2">
                  <v-icon size="20" style="padding-left:5px">fas fa-calendar-day</v-icon>
                  <label> التاريخ</label>
                </v-row>

                <v-row class="mb-2 mr-2">
                  <v-icon size="20" style="padding-left:5px">fas fa-clock</v-icon>
                  <label> الوقت</label>
                </v-row>

              </v-col>

              <v-col>
                <v-row class="mb-2"><label> {{item_selected.name}}</label></v-row>
                <v-row class="mb-2"><label> {{item_selected.item_name}}</label></v-row>
                <v-row class="mb-2"><label> {{item_selected.from_date}}
                    <v-chip style="margin-left:5px;margin-right:5px;">></v-chip>
                    {{item_selected.to_date}}</label></v-row>

                <v-row class="mb-2"><label>{{item_selected.from_time+":00   "}}
                    <v-chip style="margin-left:5px;margin-right:5px;">></v-chip>
                    {{item_selected.to_time+":00  "}}</label></v-row>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-container>
              <v-divider class="mb-3"></v-divider>
              <v-row justify="space-between">
                <span v-if="item_selected.confirm==0 && item_selected.active==1">

                  <v-btn color="success" @click="confirme_Item_booking(item_selected)" width="120"
                    style="margin-left:10px">
                    <span v-show="!loding_accept">
                      <v-icon right>fas fa-check</v-icon>
                      قبول
                    </span>
                    <v-progress-circular indeterminate color="white" v-show="loding_accept"></v-progress-circular>
                  </v-btn>

                  <v-btn color="#f95252" width="120" dark="" @click="deleteItem(item_selected)">

                    <span v-show="!loding_cancel">
                      <v-icon right size="18">fas fa-trash-alt</v-icon>
                      رفض
                    </span>
                    <v-progress-circular indeterminate color="white" v-show="loding_cancel"></v-progress-circular>
                  </v-btn>
                </span>




                <v-btn color="#bdc3c7" @click="details_dailog=false">
                  الغاء
                </v-btn>
              </v-row>
            </v-container>

          </v-col>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- end display booking details -->

    <v-dialog v-model="dialog" max-width="1200">
      <v-data-table :headers="headers" :items="items" :loading="loading" loading-text="جاري تحميل البيانات"
        class="elevation-1 request_table" :search="search" style="padding:10px">



        <template v-slot:top>
          <v-toolbar flat color="white" pb-5>

            <v-toolbar-title>الحجوزات</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-row justify="end" style="margin-top:20px;">
              <div style="width:auto">
                <v-text-field v-model="search" append-icon="mdi-search" outlined="" dense="" label="بحث" single-line
                  hide-details></v-text-field>
              </div>

            </v-row>

          </v-toolbar>
        </template>
        <!--  
    <template v-slot:item.status="{ item }">
     تيابن
    
    </template> -->

        <!-- edit reservation -->
        <template v-slot:item.status="{ item }">
          <span v-if="item.active==1">


            <!-- reservation not confirm  -->

            <v-row wrap v-if="item.confirm==0" justify="center">
              <!-- <v-icon size="20" style="margin-right:5px" color="primary">fas fa-clock</v-icon> -->
              <v-chip dark="" class="res_pinding_chip" color="#fff5e7">معلق

                <v-icon left size="12">fas fa-clock</v-icon>
              </v-chip>
            </v-row>

            <!-- Accepted reservation -->
            <v-row row wrap v-if="item.confirm==1" justify="center">
              <span>
                <!-- <v-icon size="20" style="margin-right:5px" color="success">fas fa-check-square </v-icon> -->
                <v-chip dark="" class="res_accept_chip" color="#e9f8e9">مقبول
                  <v-icon left size="12">fas fa-check-square</v-icon>
                </v-chip>
              </span>
            </v-row>
            <!-- reservation canceld by owner -->
            <v-row row wrap v-if="item.confirm==2" justify="center">
              <span>
                <!-- <v-icon size="20" style="margin-right:5px" color="error">fas fa-trash-alt</v-icon> -->
                <v-chip dark="" class="res_cancel_chip" color="#fee5e3">

                  ملغي
                  <v-icon left size="12">fas fa-trash-alt</v-icon>
                </v-chip>
              </span>


            </v-row>

          </span>
          <span v-else>
            <!-- reservation cancel by user -->
            <v-row row wrap justify="center">

              <span>
                <!-- <v-icon size="20" style="margin-right:5px" color="#f5af19">fas fa-exclamation</v-icon> -->
                <v-chip dark="" class="res_cancel_user_chip" color="#feebe5">


                  ملغي من المستخدم
                  <v-icon left size="12">fas fa-trash-alt</v-icon>
                </v-chip>
              </span>
            </v-row>
          </span>


        </template>


        <template v-slot:item.action="{ item }">
          <v-btn text icon @click="details_dailog=true;item_selected=item">
            <v-icon size="50">fas fa-edit</v-icon>
          </v-btn>


        </template>

      </v-data-table>
    </v-dialog>




  </v-container>
</template>
<script>
  import card from './Card.vue';

  import Donut from 'vue-css-donut-chart'
  import VueApexCharts from 'vue-apexcharts'

  export default {


    data() {
      return {
        dialog: false,
        search: '',
        page: 1,
        pageCount: 2,
        loading: false,
        id: -1,
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
            text: 'اسم الحجز',
            align: 'center',
            sortable: false,
            value: 'item_name',
          },
          {
            text: 'اسم المستخدم',
            align: 'center',
            sortable: false,
            value: 'name',
          },

          // { text: 'الوصف', value: 'disc' },
          {
            text: ' تاريخ الحجز',
            value: 'from_date'
          },


          {
            text: ' وقت الحجز',
            value: 'from_time',
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
        counts: [],
        details_dailog: false,
        items: [],
        token: '',
        urL: 'http://109.224.53.155',
        seriess: [],
        date_select: '',
        menu1: false,
        current_page: 0,
        last_page: 0,
        chartOptions: {
          labels: ['حجوزات طبية', 'قاعات', 'ساحات رياضية', 'قاعات جيم'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
        },
        seriess: [33, 10, 40, 55],

        options: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: ['حزيران', 'تموز', 'آب', 'أيلول']
          }
        },

        series: [{
          name: 'series-1',
          data: [153, 200, 100, 400]
        }],
        sections: [

        ],
        getmore: false,
        error_msg: false,
        laoding_card: [false, false, false, false]

      }
    },

    methods: {

      getcounts() {
        var url = this.urL + "/getOwnerReservCounts";
        // this.laoding_card[0]=true;
        // this.laoding_card[1]=true;
        // this.laoding_card[2]=true;
        // this.laoding_card[3]=true;

        this.laoding_card = this.laoding_card.map(x => true);
        axios({
          method: 'get',
          url: url,
          headers: {
            token: this.token
          }

        }).then(response => {
          this.counts = response.data.Data;


        }).catch(error => {
          this.$swal('خطاء', "خطاء بالاتصال", 'error')

        }).finally(d => {

          //               this.laoding_card[0]=false;
          // this.laoding_card[1]=false;
          // this.laoding_card[2]=false;
          // this.laoding_card[3]=false;
          this.laoding_card = this.laoding_card.map(x => false);
        });

      },
      getReservInfo(id) {




        this.loading = true;
        this.id = id;
        this.laoding_card[id - 1] = true;
        var url = this.urL + "/getOwnerReservationSub/" + id;
        this.items = [];
        //this.dialog=true;
        axios({
          method: 'get',
          url: url,
          headers: {
            token: this.token
          }

        }).then(response => {
          this.dialog = true;

          if (id == 1) {
            this.items = response.data.Data.all.data;

            this.current_page = response.data.Data.all.current_page;
            this.last_page = response.data.Data.all.last_page;

          } else if (id == 2) {
            this.items = response.data.Data.confirmed.data;
            this.current_page = response.data.Data.confirmed.current_page;
            this.last_page = response.data.Data.confirmed.last_page;

          } else if (id == 3) {
            this.items = response.data.Data.reject.data;
            this.current_page = response.data.Data.reject.current_page;
            this.last_page = response.data.Data.reject.last_page;

          } else if (id == 4) {
            this.items = response.data.Data.bainding.data;
            this.current_page = response.data.Data.bainding.current_page;
            this.last_page = response.data.Data.bainding.last_page;

          }
          if (this.items.length < 1) {
            this.$swal('خطاء', " لاتوجد بيانات", 'error')
            this.dialog = false
            this.laoding_card[id - 1] = false
          }


          if (this.current_page == this.last_page) {
            this.getmore = false;
          } else {
            this.getmore = true
          }
          if (this.items.length < 1) {
            this.error_msg = true
          }


        }).catch(error => {
          this.$swal('خطاء', "خطاء بالاتصال", 'error')
        }).finally(d => {
          this.laoding_card[id - 1] = false
          this.loading = false;
        });

      },
      confirme_Item_booking(item) {
        var conf = 0;
        swal({
            title: "هل انت متاكد",

            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              conf = 1;


              if (conf == 1) {

                var data = {
                  reservation_id: item.id
                };
                this.loding_accept = true;
                axios({
                    method: 'post',
                    url: this.urL + "/confirmReservation",
                    data: data
                  })
                  .then(response => {

                      this.details_dailog = false;
                      this.getReservInfo(this.id);
                      this.getcounts();
                      swal("تمت الموافقة", {
                        icon: "success",
                      });
                    }

                  )
                  .catch(error => {

                    this.$swal('خطاء', "خطاء بالاتصال", 'error')
                  }).finally(d => {

                    this.loding_accept = false
                  });

              }
            } else {

              // swal("Your imaginary file is safe!");
            }
          });
      },

      deleteItem(item) {
        const index = this.items.indexOf(item)
        this.cancelReservation(item);




      },
      cancelReservation(item) {
        var conf = 0;
        swal({
            title: "هل انت متاكد",

            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

              this.loding_cancel = true;
              axios({
                  method: 'get',
                  url: this.urL + "/ownerCancelReservation/" + item.id,
                  headers: {
                    token: this.token
                  }
                })
                .then(response => {
                  this.$swal("تم الالغاء", {
                    icon: "success",
                  })
                  this.details_dailog = false;
                  this.getReservInfo(this.id);
                  this.getcounts()
                  // this.items.splice(index, 1)
                })
                .catch(error => {
                  this.$swal('خطاء', "خطاء بالاتصال", 'error')
                }).finally(d => {
                  this.loding_cancel = false;
                });
            }
          });
      },

    },
    mounted() {
      this.token = localStorage.getItem('access_token');
      console.log(this.token)
      this.getcounts();

    },

    components: {

      Donut,
      card,
      apexchart: VueApexCharts,

    }

  }
</script>