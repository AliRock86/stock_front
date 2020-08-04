<template>
  <v-container fluid="">

    <v-layout row wrap pr-3 pl-4 pt-4 pb-4 align-center>


      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2>

        <card name="عدد الطلبات" :count="getAllCounts()" icon="fas fa-layer-group" text_color="blue"  icon_color="blue"
          :loading="laoding_card[0]"></card>

      </v-flex>






      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2>

        <card name="المقبوله" text_color="red"  icon_color="green"  :count="counts.OwnerConfirmed" icon="fas fa-check"
          :loading="laoding_card[1]"></card>

      </v-flex>

      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2>

        <card :name="counts[1]?counts[1].status_name:'المرفوضه'" icon="fas fa-calendar-times" text_color="#F56D7E" icon_color="red"
          :count="counts.OwnerReject" :loading="laoding_card[2]"></card>

      </v-flex>


      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2>


        <card :name="counts[2]?counts[2].status_name:'المعلقه'" icon="fas fa-business-time" text_color="#f29c2b" icon_color="#f07821"
          :count="counts.Binding" :loading="laoding_card[3]"></card>


      </v-flex>





    </v-layout>


    <v-layout row wrap pr-3 pl-4>

      <v-flex md6 xs12 style="margin-bottom:1%" pa-1>
        <template>
          <v-card class="dash_rate_card" :elevation="233" style="width:100%;height:500px;border-radius:10px">
            <v-card width="200" outlined style="background-color:#035aa6;margin-bottom: 22px;margin-top:20px;">
              <h1 class="dash_part_rate_title" style="color:#fff;text-align:center">اخر الطلبات</h1>
            </v-card>
            <v-divider class="mb-3"></v-divider>

            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr style="font-weight:bold">
                    <th style="font-weight:bold" class="text-right" >اسم المنتج</th>
                    <th style="font-weight:bold" class="text-right">تاريخ الطلب</th>
                    <th style="font-weight:bold" class="text-center">الحاله</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td >{{ item.name }} </td>
                    <td >قبل<span style="font-weight:bold"> {{ item.time }} </span>  </td>
                    <td style="color:#fff" class="text-center">
                      <v-chip class="ma-2" style="color:#fff;font-weight:bold" :color="item.status.color" >
                         <v-icon  style="padding-left: 7px;">{{item.status.icon}}</v-icon>

                        {{item.status.name}}

                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </template>
      </v-flex>



      <v-flex md6 sm12 style="padding-left:0%" pa-1 pr-4>
        <v-card style="width:100%;height:500px;border-radius:10px">


          <v-card width="300" outlined style="background-color:#035aa6;margin-bottom: 22px;margin-top:20px;">
            <h1 class="dash_part_rate_title" style="color:#fff;text-align:center">احصائيه سنويه للمشتريات</h1>
          </v-card>

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


          <v-divider class="mb-3"></v-divider>

          <div style="padding-right:10%;padding-left:5%">
            <apexchart type="bar" :options="options" :series="series"></apexchart>
          </div>
        </v-card>

      </v-flex>
    </v-layout>

    <!-- display booking details -->

    <!-- end display booking details -->





  </v-container>
</template>
<script>
  import card from './Card.vue';

  //import Donut from 'vue-css-donut-chart'
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
        desserts: [{
            name: 'سبلت',
             time: '4 دقيقه',
            status:
            {
              name:'مقبول',
              color:'primary',
              icon:'fas fa-check'
            },
          },
          {
            name: 'لابتوب',
             time: '5 ساعه',
            status:
            {
              name:'معلق',
              color:'#f07821',
              icon:'fas fa-clock'
            },
          },
          {
            name: 'Eclair',
             time: '4 دقيقه',
             status:
            {
              name:'مرفوض',
               time: '40 دقيقه',
              color:'red',
                icon:'fas fa-times-circle'
            },
          },
          {
            name: 'Cupcake',
             time: '14 دقيقه',
             status:
            {
              name:'معلق',
               time: '4 ساعه',
              color:'#f07821',
               icon:'fas fa-clock'
            },
          },
          {
            name: 'Gingerbread',
            time: '2 ساعه',
             status:
            {
              name:'معلق',
              color:'#f07821',
               icon:'fas fa-clock'
            },
          },
          {
            name: 'Jelly bean',
            time: '22 دقيقه',
             status:
            {
              name:'مقبول',
              color:'green',
               icon:'fas fa-check'
            },
          },
          {
            name: 'Gingerbread',
            time: '24 دقيقه',
             status:
            {
              name:'معلق',
              color:'#f07821',
               icon:'fas fa-clock'
            },
          },


        ],
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
        reservationCount: '',
        counts: [

        ],
        details_dailog: false,
        items: [],
        token: '',
        urL: 'http://109.224.53.155',
        // seriess: [],
        date_select: '',
        menu1: false,
        counts_all: '',
        current_page: 0,
        last_page: 0,
        chartOptions: {
          labels: ['فرن', 'ثلاجه', 'تلفاز', 'فرن'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 180
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

       const axios = require('axios');
        axios({
          method: 'get',
          url:'/reservation/owner/dashboard',
          headers: {

          }

        }).then(response => {
          this.counts = response.data.data;
          this.counts_all=response.data.item_all;


        }).catch(error => {

          error
         // this.$swal('خطاء', "خطاء بالاتصال", 'error')

        }).finally(d => {
          d

          //               this.laoding_card[0]=false;
          // this.laoding_card[1]=false;
          // this.laoding_card[2]=false;
          // this.laoding_card[3]=false;
         // this.laoding_card = this.laoding_card.map(x => false);
        });

      },

    getAllCounts(){

    return   this.counts.OwnerConfirmed+this.counts.OwnerReject+this.counts.Binding>-1?this.counts.OwnerConfirmed+this.counts.OwnerReject+this.counts.Binding:"";
    },




      deleteItem(item) {
        //  const index = this.items.indexOf(item)
        this.cancelReservation(item);




      },


    },
    mounted() {
     // this.token = localStorage.getItem('access_token');
      this.getcounts();

    },

    components: {


      card,
      apexchart: VueApexCharts,

    }

  }
</script>
