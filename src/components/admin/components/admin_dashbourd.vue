<template>
  <v-container fluid="">

    <v-layout row wrap pr-3 pl-4 pt-4 pb-4 align-center>


      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2 >

        <card name="عدد الاصناف" icon="fas fa-layer-group" text_color="#53D3F8" :count="counts.cat_count"
          :loading="laoding_card[0]"></card>

      </v-flex>




        <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2  >

        <card :name="'عدد التجار'"  text_color="#6CD6A1" :color="green" :count="counts.owner_all" icon="fas fa-users"
          ></card>

      </v-flex>

      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2 >

        <card :name="'عدد التجار المحضورين'" icon="fas fa-users" text_color="#F56D7E" :count="counts.owner_block"
        ></card>

      </v-flex>


      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2   >
           <card :name="' عدد التجار الفعالين'"  icon="fas fa-users" text_color="#f29c2b" :count="counts.owner_on"
          ></card>
      </v-flex>





    </v-layout>


    <!-- <v-layout row wrap pr-3 pl-4>

      <v-flex md6 xs12 style="margin-bottom:1%" pa-1>
        <v-card class="dash_rate_card">
          <p class="dash_part_rate_title">احصائيه حالات الحجز</p>
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

          </v-row>
          <v-divider class="mb-3"></v-divider>

          <div style="padding-right:10%;padding-left:5%">
            <apexchart type="bar" :options="options" :series="series"></apexchart>
          </div>
        </v-card>

      </v-flex>
    </v-layout> -->

    <!-- display booking details -->

 <v-row>

            <v-data-table :headers="headers" :items="shackawy" :page.sync="page" @page-count="pageCount = $event"
                sort-by="calories" class="elevation-1 request_table" style="width:96%" items-per-page="15"
                :search="search" hide-default-footer="" :loading="loading" loading-text="جاري تحميل البيانات">

                <template v-slot:top>
                    <v-toolbar flat color="white" pb-5>

                        <v-toolbar-title style="font-size:22px">الشكاوي</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-row justify="end" style="margin-top:20px;">
                            <div style="width:auto">




                            </div>



                        </v-row>

                    </v-toolbar>
                </template>
                <template v-slot:bottom>
                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
                </template>




            </v-data-table>

        </v-row>






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

  //import Donut from 'vue-css-donut-chart'
 // import VueApexCharts from 'vue-apexcharts'

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
        shackawy:[{"id":"1","name":"علي جاسم","phone":"٠٧٧٠٠٢٢٩٢٨٧","disc":"علايمن الحجز على  تصنيفات الرياضية","date":"2020-06-02"},
        {"id":"2","name":"علي محمد","phone":"٠٧٧٠٠٢٢٩٢٨٧","disc":"علايمن الحجز على  تصنيفات الرياضية","date":"2020-06-02"},
        {"id":"3","name":"محمد جاسم","phone":"٠٧٧٠٠٢٢٩٢٨٧","disc":"علايمن الحجز على  تصنيفات الرياضية","date":"2020-06-02"},
        {"id":"4","name":" سلام علي","phone":"٠٧٧٠٠٢٢٩٢٨٧","disc":"علايمن الحجز على  تصنيفات الرياضية","date":"2020-06-02"},
        {"id":"5","name":"فلاح حسن","phone":"٠٧٧٠٠٢٢٩٢٨٧","disc":"علايمن الحجز على  تصنيفات الرياضية","date":"2020-06-02"},
        {"id":"6","name":"علي فلاح","phone":"٠٧٧٠٠٢٢٩٢٨٧","disc":"علايمن الحجز على  تصنيفات الرياضية","date":"2020-06-02"},
        {"id":"7","name":"رضة غانم","phone":"٠٧٧٠٠٢٢٩٢٨٧","disc":"علايمن الحجز على  تصنيفات الرياضية","date":"2020-06-02"},
        {"id":"8","name":"وليد حيدر","phone":"٠٧٧٠٠٢٢٩٢٨٧","disc":"علايمن الحجز على  تصنيفات الرياضية","date":"2020-06-02"},
        {"id":"9","name":"سلام جاسم","phone":"٠٧٧٠٠٢٢٩٢٨٧","disc":"علايمن الحجز على  تصنيفات الرياضية","date":"2020-06-02"}],
        headers: [{
            text: 'رقم التعريف',
            align: 'center',
            sortable: false,
            value: 'id',
          },
          {
            text: 'اسم الزبون',
            align: 'center',
            sortable: false,
            value: 'name',
          },
          {
            text: ' رقم الهاتف',
            align: 'center',
            sortable: false,
            value: 'phone',
          },

          // { text: 'الوصف', value: 'disc' },
          {
            text: ' نص الشكوي',
            value: 'disc'
          },


          {
            text: '  تاريخ الشكوى',
            value: 'date',
            sortable: false
          },


        ],
        reservationCount:'',
        counts: {"cat_count":0,"owner_all":0,"owner_block":0,"owner_on":0

        },
        details_dailog: false,
        items: [],
        token: '',
        urL: 'http://109.224.53.155',
       // seriess: [],
        date_select: '',
        menu1: false,
        counts_all:'',
        current_page: 0,
        last_page: 0,
        chartOptions: {
          labels: ['تم الانجاز', 'مرفوضه', 'المقبوله', 'المعلقه'],
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
    //    const axios = require('axios');
    //     axios({
    //       method: 'get',
    //       url:'/owner/dashboard',
    //       headers: {
    //       Authorization:'Bearer '+this.token
    //       }

    //     }).then(response => {
    //       this.counts = response.data.data;
    //       this.counts_all=response.data.item_all;


    //     }).catch(error => {

    //       error,
    //       this.$swal('خطاء', "خطاء بالاتصال", 'error')

    //     }).finally(d => {
    //       d

    //       //               this.laoding_card[0]=false;
    //       // this.laoding_card[1]=false;
    //       // this.laoding_card[2]=false;
    //       // this.laoding_card[3]=false;
    //      // this.laoding_card = this.laoding_card.map(x => false);
    //     });

      },
        getOWner() {

                var url = "/operation/getAllOwners";
                this.loading = true;
                this.$http({
                    method: 'get',
                    url: url,
                    headers: {
                    }

                }).then(response => {
                    this.ownres = response.data.data.data;

this.counts.owner_all=response.data.data.total
var owner_block=0;
var owner_on=0;
for(var i=0;i<response.data.data.data.length;i++){
  if(response.data.data.data[i].user.status_id==15){
    owner_block++;
  }else if(response.data.data.data[i].user.status_id==1){
    owner_on++;
  }

}

this.counts.owner_block=owner_block;
this.counts.owner_on=owner_on;









                }).catch(error => {
                    error
                    //this.$swal('خطاء', "خطاء بالاتصال", 'error')
                }).finally(s => {
                    s,
                    this.loading = false;
                });
            },
       getCategory() {


                this.$http({
                        method: 'get',
                        url: "/v2/info/Categories",
                    })

                    .then(response => {
                      this.counts.cat_count=response.data.data.length



                    })
            },

      deleteItem(item) {
      //  const index = this.items.indexOf(item)
        this.cancelReservation(item);




      },


    },
    mounted() {
      

     this.admin_info=this.$cookies.get('admin_details');
      this.getCategory();
      this.getOWner();

    },

    components: {


      card,
      //apexchart: VueApexCharts,

    }

  }
</script>
