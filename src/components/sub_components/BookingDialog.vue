<template>
    <div>


        <!--date picker dailog-->
        <v-dialog v-model="date_dialog" width="500">
            <v-date-picker color="#ff6600" v-model="date" class="mt-4" @change="select_date">
            </v-date-picker>
        </v-dialog>
        <!--end date picker dailog-->


        <!--time picker dailog-->
        <v-dialog v-model="time_dialog" width="500">
            <v-time-picker color="#ff6600" v-model="time" class="mt-4" @change="select_time"></v-time-picker>
        </v-dialog>
        <!--end time picker dailog-->




        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">تاريخ الحجز</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">طريقه الدفع</v-stepper-step>

                <v-divider></v-divider>

            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card class="mb-12" color="#fff" height="300px">



                        <v-form ref="form" v-model="valid_day">
                            <v-container>


                                <v-layout row wrap>
                                    <v-flex pa-3>
                                        <v-text-field outlined dense readonly style="background-color:#fff"
                                            placeholder="تاريخ الحجز" append-icon="fas fa-calendar-day" required
                                            :rules="nameRules" v-model="date" @click="date_dialog=true"></v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout row wrap>
                                    <v-flex pa-3>
                                        <v-text-field outlined dense readonly placeholder="الساعة"
                                            style="background-color:#fff" append-icon="fas fa-clock" required
                                            :rules="nameRules" v-model="time" @click="time_dialog=true">
                                        </v-text-field>
                                    </v-flex>

                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card>




                    <v-btn color="primary" @click="step1()">
                        التالي
                    </v-btn>

                    <v-btn text @click="close()">خروج</v-btn>
                </v-stepper-content>




                <v-stepper-content step="2">
                    <v-card class="mb-12" color="fff">
                        <v-form ref="form_fa" v-model="valid_pay">

                            <v-radio-group v-model="bill">
                                <v-radio label="انشاء فاتوره تسديد" :value="true"></v-radio>

                                <v-radio label="الدفع نقدا" :value="false"></v-radio>
                            </v-radio-group>

                            <div v-show="bill">
                                <v-divider></v-divider>
                                <v-card-title style="font-size:font-size: 18px;">
                                    ويه تسديد صار تكدر تدفع فاتورتك وانت بالبيت من خلال رقم الفاتورة الي يوصلك برسالة ..
                                    والتسديد من
                                    خلال ادخال رقم بطاقة الدفع الكي كارد أوالماستر كارد
                                </v-card-title>
                                <v-divider></v-divider>


                                <v-layout row wrap>
                                    <v-flex pa-3>

                                        <v-text-field outlined dense placeholder="ادخل رقم هاتفك لانشاء فاتوره"
                                            append-icon="fas fa-phone" type="number" :rules="numRules" required
                                            v-model="post_data.phone"></v-text-field>
                                    </v-flex>

                                </v-layout>
                                <v-col>

                                </v-col>
                            </div>

                            <!-- <div v-else></div>
 -->


                        </v-form>



                    </v-card>

                    <v-btn color="success" style=";width:130px" @click="booking_item()">حجز</v-btn>

                    <v-btn style="position:relative;right:3%" color="primary" @click="e1 = 1">
                        السابق
                    </v-btn>


                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                    <v-btn color="primary" style="position: relative;right: 3%;width: 103px;" @click="e1 = 1">


                        Continue
                    </v-btn>

                    <v-btn text @click="close()">خروج</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>


<script>

  const axios = require('axios');
  import {
    EventBus
  } from '../event-bus.js';
  export default {

       props: {
            'itemid': Number,

        },



    data: () => ({


       model: 0,
      e1: 1,
      rating: 4,
      fawater_res_Dailog: false,
      rating_dailog: false,
      valid_day: true,
      valid_pay: true,
      date: '',
      itemid:'',
      errors: [],
      miniDate: new Date().toISOString().substr(0, 10),
      time: '',
      dayselectid: 0,
      dayoffer: [],
      auths: localStorage.getItem('authenticat'),
      date_dialog: false,
      time_dialog: false,
      booking_dialog: false,
      address: '',
      aa: [],
      fatwra_dialog: false,
      phoneReq: false,
      loading: false,
      bill: true,
      color: 'color:green',
      urL: "http://109.224.53.155",

      iMages: [],
      numRules: [

        (v) => !!v || 'يجب ادخال رقم الهاتف',
        (v) => v.length > 10 && v.length < 12 || 'يجب ادخال رقم هاتف صحيح',
      ],
      nameRules: [
        v => !!v || 'هذا الحقل مطلوب  ',
      ],
      id: '',
      markers: [],
      token: '',
      info: null,
      offers: [],
      fatwra_num: '',
      booking_schedual: [],
      timeline_status: [false, false, false, false, false, false, false],
      reserv_date: [],
      post_data: {

        item_id: "",
        reservation_date: "",
        reservation_from_time: "",
        reservation_to_time: "",
        reservation_number: "1",
        phone: "",



      },




    }),
    mounted() {

    //  this.token = localStorage.getItem('access_token_user');

    },

    created() {




    },
    methods: {

      close() {
        this.booking_dialog = false;
        this.$refs.form_fa.reset()
        this.e1 = 1;



      },

      step1() {



        this.errors = [];
        if (!this.date || !this.time) {
          this.$refs.form.validate();

        } else {

          this.e1 = 2;
        }


      },







      validate_fawater() {
        if (this.$refs.form_fa.validate()) {
          this.fatwra_dialog = false;
        }
      },





      getDate_andTime(id) {

        var url = this.urL + "/getDaysTime/" + id;
        axios.get(url).then(response => {
          this.booking_schedual = response.data.Data;

          for (var day = 0; day < 7; day++) {

            var offer = '';
            for (var i = 0; i < this.dayoffer.length; i++) {

              if (this.dayoffer[i] == day) {

                offer = 1;

              }



            }

            this.sechdual_info.push({
              day_name: this.getdays(day + 1),
              time_duration: ['غير متوفر'],
              status: false,
              offer: offer



            });
            for (i = 0; i < this.booking_schedual.length; i++) {
              if (day >= this.booking_schedual[i].from_day && day <= this.booking_schedual[i].to_day) {

                var t = [];

                for (var time = 0; time < this.booking_schedual[i].time_to_open.length; time++) {


                  var from_time = this.booking_schedual[i].time_to_open[time].from_time.split(":");
                  var totime = this.booking_schedual[i].time_to_open[time].to_time.split(":");



                  t.push(from_time[0] + ":" + from_time[1] + " - " +
                    totime[0] + ":" + totime[1])

                }

                this.sechdual_info[day].time_duration = t
                this.sechdual_info[day].status = true



                this.timeline_status[day] = true;

              }
            }



          }



        })

      },
      allowedDates(val) {


        var mydate = new Date(val);
        var day = mydate.getDay();

        var result = false
        for (var i = 0; i < this.booking_schedual.length; i++) {

          if (day >= this.booking_schedual[i].from_day - 1 && day <= this.booking_schedual[i].to_day - 1) {

            result = true;
          }
          if (day == 6 && this.booking_schedual[i].from_day == 0) {

            result = true;
          }
        }


        if (this.booking_schedual[0].every_day == 1) {
          result = true;
        }

        var hourResv = this.chackDateCompletReservation();
        var hour_valid = 0;
        for (var a = 0; a < this.reserv_date.length; a++) {

          var hours = this.reserv_date[a].from_time.split(":");
          var hour = parseInt(hours[0]);

          for (var b = 0; b < hourResv.length; b++) {




            if (hourResv[b] == hour && val == this.reserv_date[a].from_date) {
              hour_valid++;

            }
          }

        }

        if (hourResv.length == hour_valid) {
          result = false;
        }
        //chack inisite date available
        var d1 = new Date();
        var d2 = new Date(val)
        if (result == true && d2 > d1) {
          // this.date =new Date().toISOString().substr(0, 10);

        }
        return result;

      },

      chackDateCompletReservation() {
        var houresReserv = [];
        for (var h = 0; h < 24; h++) {
          for (var i = 0; i < this.booking_schedual.length; i++) {
            for (var ii = 0; ii < this.booking_schedual[i].time_to_open.length; ii++) {

              var hours = this.booking_schedual[i].time_to_open[ii].from_time.split(":");
              var hour = parseInt(hours[0]);

              var hours1 = this.booking_schedual[i].time_to_open[ii].to_time.split(":");
              var hour1 = parseInt(hours1[0]);

              if (h >= hour && h <= hour1 || this.booking_schedual[i].every_day == 1) {

                houresReserv.push(h);
              }
            }

          }
        }
        return houresReserv;
      },


      allowedHours(v) {



        var result = false;
        for (var i = 0; i < this.booking_schedual.length; i++) {
          for (var ii = 0; ii < this.booking_schedual[i].time_to_open.length; ii++) {

            var hours = this.booking_schedual[i].time_to_open[ii].from_time.split(":");
            var hour = parseInt(hours[0]);

            var hours1 = this.booking_schedual[i].time_to_open[ii].to_time.split(":");
            var hour1 = parseInt(hours1[0]);



            if (v >= hour && v <= hour1 && (this.booking_schedual[i].from_day == this.dayselectid || this
                .booking_schedual[i].every_day == 1)) {

              result = true;
            }
          }

        }




        for (var a = 0; a < this.reserv_date.length; a++) {

          hours = this.reserv_date[a].from_time.split(":");
          hour = parseInt(hours[0]);


          if (v == hour && this.date == this.reserv_date[a].from_date) {

            result = false;
          }
        }



        return result;



      },

      allowedMinutes(v) {
        //var result = false;
        for (var i = 0; i < this.booking_schedual.length; i++) {
          for (var ii = 0; ii < this.booking_schedual[i].time_to_open.length; ii++) {

            var hours = this.booking_schedual[i].time_to_open[ii].from_time.split(":");
            var hour = parseInt(hours[1]);

            var hours1 = this.booking_schedual[i].time_to_open[ii].to_time.split(":");
            var hour1 = parseInt(hours1[1]);

            if (v >= hour && v <= hour1) {

              this.result = true;
            }
          }

        }

        return true;
      },

      select_date() {
        this.date_dialog = false;
        this.post_data.reservation_date = this.date
        var mydate = new Date(this.date);
        this.dayselectid = mydate.getDay() != 6 ? mydate.getDay() + 1 : 0;
      },



      select_time() {
        this.time_dialog = false;

        this.post_data.reservation_from_time = this.time
        this.post_data.reservation_to_time = this.time

      },



      getPath(img_path) {

        return this.urL + "/" + img_path;

      },



      booking_item() {


        if (this.$refs.form.validate()) {

          if (this.bill && !this.valid_pay && !this.$refs.form_fa.validate()) {

            this.bill


          } else {


            this.post_data.item_id = this.itemid;
            this.loading = true;
            this.$http({
                method: 'post',
                url: "/v2/reservation/store",
                data: this.post_data,
                headers: {

                }
              })
              .then(response => {


                EventBus.$emit('getUserReservationsCount', true);
                this.$emit("changeStatus", false);
                this.$refs.form.reset()
                this.e1 = 1;

                this.$swal('', "    تم  الحجز بنجاح", 'success')

                if ("payId" in response.data) {
                  this.fatwra_num = response.data.data.payId;
                  this.$refs.form_fa.reset()
                  this.fawater_res_Dailog = true;
                }
                // this.rating_dailog = true;
                this.booking_dialog = false;


                //bookink item succesful

              })

              .catch(error => {
                error;
                //booking item error

                this.$swal('', " فشل الحجز", 'error')
              }).finally(d => {
                d;
                this.loading = false;
              });


          }


          // if (this.info.item_price.book_without_credit_card == 0 && this.post_data.phone.length < 11) {
          //   //this.$swal('', "    تم  الحجز بنجاح", 'success')
          //   this.fatwra_dialog = true;
          //   return;
          // }

        }

      },















      getdays(index) {



        var days =["اﻷحد","اﻷثنين","الثلاثاء","اﻷربعاء","الخميس","الجمعة","السبت"];

        return days[index];
      }
    },
    components: {

    }



  }
</script>
