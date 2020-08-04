<template>
  <!-- <v-card class="bookingcard"  v-for="(item,index) in items" style="margin-bottom:30px"> -->
  <v-layout row wrap>
    <v-flex xs9>
      <v-card-text class="bookingcard-head ">
        {{item.name}}
      </v-card-text>
      <v-chip :color="status_color[index]" dark="" class="mb-4 mobstyle">{{status_tx[index]}}</v-chip>

      <v-flex xs8 class="mb_resposiv_show">


        <v-card-text class="bookingcard-text"> {{getDiscription(item.disc,40)}}</v-card-text>
      </v-flex>
      <v-divider></v-divider>





      <v-layout row wrap justify-start>


        <v-flex xs4 pa-3>
          <v-card-text class="bookingcard-title">تاريخ الحجز</v-card-text>
          <v-card-text class="bookingcard-text"> {{item.from_date}} </v-card-text>
        </v-flex>



        <v-flex xs4 pa-3>
          <v-card-text class="bookingcard-title">وقت الحجز</v-card-text>
          <v-card-text class="bookingcard-text"> {{item.from_time}} </v-card-text>
        </v-flex>
        <v-flex xs4 pa-3 class="mb_resposiv_hidden">
          <v-card-text class="bookingcard-title">
            تفاصيل
          </v-card-text>

          <v-card-text class="bookingcard-text"> {{getDiscription(item.disc,80)}}</v-card-text>
        </v-flex>
      </v-layout>

    </v-flex>
    <v-flex xs2 md3 sm3>
      <v-layout column wrap pa-5 justify-center="">

        <span class="bookingcard-price-text">السعر</span>

        <span class="bookingcard-price">{{item.price}}$</span>

        <v-row v-if="num_cancel==index" justify="center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>

        <span v-else>

          <v-row class="mb-2" justify="center" v-if="(item.confirm==0 || item.confirm==1) && item.active==1">
            <v-btn dark="" color="red" style="width:55%;" class="font_button" @click="cancel_reservation(item,index )">
              <v-icon right="">fas fa-times</v-icon>
              الغاء حجز
            </v-btn>
          </v-row>
          <v-row justify="center" v-if="item.confirm==1 && item.active==1">
            <v-btn dark="" color="primary" style="width:55%;" class="font_button">

              <v-icon right="">fas fa-car-side</v-icon>
              طلب توصيل
            </v-btn>
          </v-row>
          <span v-else></span>

        </span>



      </v-layout>
    </v-flex>
  </v-layout>


</template>
<script>
  const axios = require('axios');
  const Swal = require('sweetalert2');
  export default {
    props: ['item', 'index', 'token'],
    data() {
      return {

        urL: "http://109.224.53.155",
        status_tx_booking_accepted: [],
        status_tx_booking_refus: [],
        status_tx_booking_pinding: [],
        status_tx_booking_all: [],

        status_col_booking_accepted: [],
        status_col_booking_refus: [],
        status_col_booking_pinding: [],
        status_col_booking_all: [],
        status_tx: [],
        status_color: [],
        num_cancel: -1,

      }
    },
    methods: {
      cancel_reservation(item, index) {


        var url = this.urL + "/UserCancelReservation/" + item.id;







        Swal.fire({
          title: "هل انت متاكد من الغاء الحجز ؟",

          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'نعم  ',
          cancelButtonText: 'الغاء',
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          }


        }).then((result) => {


          if (result.value == true) {
            this.num_cancel = index;

            axios({
              method: 'get',
              url: url,
              headers: {
                token: this.token
              }

            }).then(response => {
              this.items[index].active = 0;
              item.active = 0;
              this.$swal('', "    تم الغاء الحجز", 'success')
              if (this.taps_chaked == 0) {
                this.booking_accepted.splice(index, 1);

                this.booking_refus.unshift(item);
                this.status_tx_booking_refus.unshift(" الحجز مرفوض من قبلك ");
                this.status_col_booking_refus.unshift("#f79d00");
                this.booking_all.unshift(item);
                this.status_tx_booking_all.unshift(" الحجز مرفوض من قبلك ");
                this.status_col_booking_all.unshift("#f79d00");


              } else if (this.taps_chaked == 1) {
                this.booking_pinding.splice(index, 1);
                this.booking_refus.unshift(item);
                this.status_tx_booking_refus.unshift(" الحجز مرفوض من قبلك ");
                this.status_col_booking_refus.unshift("#f79d00");
                this.booking_all.unshift(item);
                this.status_tx_booking_all.unshift(" الحجز مرفوض من قبلك ");
                this.status_col_booking_all.unshift("#f79d00");


              } else if (this.taps_chaked == 3) {
                this.booking_all.splice(index, 1);
                this.booking_refus.unshift(item);
                this.status_tx_booking_refus.unshift(" الحجز مرفوض من قبلك ");
                this.status_col_booking_refus.unshift("#f79d00");
                this.booking_all.unshift(item);
                this.status_tx_booking_all.unshift(" الحجز مرفوض من قبلك ");
                this.status_col_booking_all.unshift("#f79d00");


              }

            }).catch(error => {

              this.msg = "يجب تسجيل الدخول"
              this.alert_msg = true;
              if (error.response.status == 402) {
                this.logout();
                this.$router.reload()
              }

            }).finally(f => {


              this.num_cancel = -1;
              this.alert_msg = false;
              this.loading = false;

            });
          }
        }); // end of swal confirm msg

      },
      getDiscription(disc, len) {
        var text = disc;

        text = text.substring(0, len)


        return text;
      },



    },
    mounted() {


    },


  }
</script>