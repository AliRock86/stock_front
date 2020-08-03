<template>
  <v-card class="elevation-16 mx-auto" width="400">
    <v-card-title class="headline" primary-title>
      <span style="font-family:'Cairo_Semi'" class="mb-3">الدفع عن طريق الفاتوره</span>
    </v-card-title>
    <v-layout justify-center="" class="mb-2">
      <v-rating v-model="rating" color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull"
        half-increments hover></v-rating>
    </v-layout>
    <v-card-text>
      اعط رأيك لمساعدتنا بتقديم خدمة افضل




      <v-container>
        <v-text-field box placeholder="اكتب رأيك" v-model="disc" outlined=""></v-text-field>
      </v-container>





    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <v-btn color="primary" text @click="rating_reservation">
        تقييم الان
      </v-btn>
      <v-btn text @click="dispose">لا شكرا</v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {

      'token': String,
      'item_id': String
    },
    data: () => ({
      rating: 0,
      urL: 'http://109.224.53.155',
      disc: " "
    }),
    methods: {


      rating_reservation() {
        var discription = this.disc;
        if (this.disc.length <= 1) {
          discription = "لا يوجد";
        }

        var post_data = {
          item_id: this.item_id,
          digree: this.rating,
          disc: discription
        }
        axios({
            method: 'post',
            url: this.urL + "/SetItemEvaluation",
            data: post_data,
            headers: {
              token: this.token
            }
          })
          .then(response => {



            if (response.data.success == true) {

              this.$swal('', "    تم  التقييم بنجاح", 'success')
              this.$emit("hiddenDailog", "false");

              //bookink item succesful 
            }
          })

          .catch(error => {
            //booking item error
            this.$swal('', " فشل التقييم", 'error')
          }).finally(d => {
            this.loading = false;
          });
      },
      dispose() {

        this.$emit("hiddenDailog", "false");
      }


    },



  }
</script>