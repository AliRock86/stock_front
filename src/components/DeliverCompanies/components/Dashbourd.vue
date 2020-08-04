<template>
  <v-container fluid="">

    <v-layout row wrap pr-3 pl-4 pt-4 pb-4 align-center>


      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2>

        <card name="عدد الطلبات" icon="fas fa-layer-group" text_color="blue" :count="getAllCounts()" icon_color="blue"
          :loading="laoding_card[0]"></card>

      </v-flex>






      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2>

        <card name="الشركات المشاركه" text_color="red"  icon_color="green" :count="company_count" icon="fas fa-building"
          :loading="laoding_card[1]"></card>

      </v-flex>

      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2>

        <card :name="counts[1]?counts[1].status_name:'عدد السائقين'" icon="fas fa-car-side" text_color="#F56D7E" icon_color="red"
          :count="driver_count" :loading="laoding_card[2]"></card>

      </v-flex>


      <v-flex xs12 md3 sm3 style="margin-bottom:1%; " pa-2>


        <card :name="counts[2]?counts[2].status_name:'المعلقه'" icon="fas fa-business-time" text_color="#f29c2b" icon_color="#f07821"
          :count="counts.OwnerConfirmed" :loading="laoding_card[3]"></card>


      </v-flex>





    </v-layout>


    <v-layout row wrap pr-3 pl-4>

      <v-flex md6 xs12 style="margin-bottom:1%" pa-1>
        <template>
          <v-card class="dash_rate_card" :elevation="233" style="width:100%;height:500px;border-radius:10px">
            <v-card width="200" outlined style="background-color:#035aa6;margin-bottom: 22px;margin-top:20px;">
              <h1 class="dash_part_rate_title" style="color:#fff;text-align:center">اخر الطلبات التوصيل</h1>
            </v-card>
            <v-divider class="mb-3"></v-divider>

            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr style="font-weight:bold">
                    <th style="font-weight:bold" class="text-right" >اسم المنتج</th>
                    <th style="font-weight:bold" class="text-right" >اسم الشركه</th>
                    <th style="font-weight:bold" class="text-right">تاريخ الطلب</th>
                    <th style="font-weight:bold" class="text-center">الحاله</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in requests.slice(0, 6)" :key="item.id">
                    <td >{{ item.item.item_name }} </td>
                   <td >{{ item.item.owner.owner_barnd_name }} </td>
                      <td >قبل<span style="font-weight:bold"> 33</span>  </td>
                    <td style="color:#fff" class="text-center">
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
                    </td> 
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </template>
      </v-flex>



      <v-flex md6 sm12 style="padding-left:0%" pa-1 pr-4>
        <template>
          <v-card class="dash_rate_card" :elevation="233" style="width:100%;height:500px;border-radius:10px">
            <v-card width="200" outlined style="background-color:#035aa6;margin-bottom: 22px;margin-top:20px;">
              <h1 class="dash_part_rate_title" style="color:#fff;text-align:center">السائقين</h1>
            </v-card>
            <v-divider class="mb-3"></v-divider>

            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr style="font-weight:bold">
                    <th style="font-weight:bold" class="text-right" >اسم السائق</th>
                    <th style="font-weight:bold" class="text-right" >رقم السياره</th>
                    <th style="font-weight:bold" class="text-right">المحافظه</th>
                    <th style="font-weight:bold" class="text-right">الموقع الحالي</th>


                    <th style="font-weight:bold" class="text-center">الحاله</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in drivers" :key="item.id">
                    <td >{{ item.car_owner_name }} </td>
                     <td >{{ item.car_number}} </td>
                      <td >{{item.user.address.province.province_name}}</td>

                      <td>


                        <v-btn class="mx-2" @click="map_dialog=true" fab dark small color="primary">
     <v-icon dark>fas fa-map-marker-alt</v-icon>
   </v-btn>


                    <v-dialog v-model="map_dialog" max-width="400px">

                        <GoogleMap @getmyLocation="getlocation" @cancel="map_dialog=false" />

                    </v-dialog>
                      </td>



                    <td style="color:#fff" class="text-center">
                      <v-chip class="ma-2" style="color:#fff;font-weight:bold" :color="item.status.status_color" >
                         <v-icon  style="padding-left: 7px;">{{item.status.status_icon}}</v-icon>

                        {{item.status.status_name_ar}}

                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </template>

      </v-flex>
    </v-layout>

    <!-- display booking details -->

    <!-- end display booking details -->





  </v-container>
</template>
<script>
  import card from './Card.vue';
 import GoogleMap from '../components/map';
  //import Donut from 'vue-css-donut-chart'
  // import VueApexCharts from 'vue-apexcharts'

  export default {


    data() {
      return {
              map_dialog: false,
        dialog: false,
        search: '',
        drivers:{
users:{
  address:{
    province:{
      province_name:''

    }

  },
}
        },
        page: 1,
        pageCount: 2,
        loading: false,
        id: -1,
        desserts: [{
            name: 'سبلت',
            time: '4 دقيقه',
            company:'الحافظ',
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
               company:'الحافظ',
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
               company:'الكوثر',
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
              company:'الكوثر',
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
             company:'الكوثر',
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
             company:'الكوثر',
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
             company:'الكوثر',
             status:
            {
              name:'تم التوجيه للسائق',
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
        driver_count:'',
        requests:[
          {
            item:{
            item_name:'',
            owner:{
              owner_barnd_name:''
            }
          }
          }
        ],
        company_count:'',
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

      getAllCounts(){

        return   this.counts.InDelivery+this.counts.OwnerConfirmed+this.counts.OwnerReject+this.counts.Taking+this.counts.UnderDelivery+this.counts.UserCanceled+this.counts.UserDelivered>-1?this.counts.InDelivery+this.counts.OwnerConfirmed+this.counts.OwnerReject+this.counts.Taking+this.counts.UnderDelivery+this.counts.UserCanceled+this.counts.UserDelivered:"";
        },
      getlocation(lat, lng) {

                this.editedItem.address.lat = lat;
                this.editedItem.address.long = lng
                this.map_dialog = false;


            },


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
              this.driver_count=response.data.data.meta.count



          }).catch(error => {
              error
              //this.$swal('خطاء', "خطاء بالاتصال", 'error')
          }).finally(s => {
              s,
              this.loading = false;
          });
      },


         getcompany() {

          var url = "/reservation/delivery/PartnershipCompanyByStatusId/17";
          this.loading = true;
          this.$http({
              method: 'get',
              url: url,
              headers: {


              }

          }).then(response => {
             
              this.company_count=response.data.data.meta.items_count



          }).catch(error => {
              error
              //this.$swal('خطاء', "خطاء بالاتصال", 'error')
          }).finally(s => {
              s,
              this.loading = false;
          });
      },


      getRequest()
      {


                var url ="/reservation/delivery/get/All?page=1"
                
                this.$http({
                  method: 'get',
                  url: url,
                  headers: {

                  }

                }).then(response => {

                  this.requests = response.data.data;
             
                 console.log(this.requests)


                }).catch(error => {
                  this.$swal('خطاء', "خطاء بالاتصال", error )
                }).finally(
                  this.loading = false

                );

     







    },


      getcounts() {

       const axios = require('axios');
        axios({
          method: 'get',
          url:'/reservation/delivery/dashboard',
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



      deleteItem(item) {
        //  const index = this.items.indexOf(item)
        this.cancelReservation(item);




      },


    },
    mounted() {
      this.getDrivers();
      this.getcompany();
      this.getRequest();

      this.getcounts();

    },

    components: {
GoogleMap,

      card
    //  apexchart: VueApexCharts,

    }

  }
</script>
