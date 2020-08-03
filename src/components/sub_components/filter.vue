<template>
  <div>
    <v-card style="padding-top:30px;padding-bottom:20px">
      <p style="font-weight:bold;padding-right:10px">الاقسام</p>

      <v-divider class="mb-6"></v-divider>
      <v-treeview :items="categores" v-model="sub_cat" item-children="sub_category" selectable
        style="padding-right:20px" hoverable rounded>


      </v-treeview>
      <v-divider class="mb-3"></v-divider>
      <v-row style="margin-right:2%">
        <!-- <v-btn color="primary" @click="getlocation">  
          <v-icon right="">fas fa-location-arrow</v-icon>
          
          الحجوزات القريبة </v-btn> -->


        <v-radio-group v-model="orderby" @change="orderbyfun">
          <v-radio label=" العناصر الاقرب " value="nearest"></v-radio>
          <v-radio label=" العناصر  المضافة مؤخرا" value="last"></v-radio>
        </v-radio-group>

      </v-row>
    </v-card>

  </div>
</template>
<script>
  // const axios = require('axios');

  export default {
    props: {
      'categores': Array,
      'selected_sub_cat': Array,
      'orderby': String
    },
    data() {
      return {
        sub_cat: [],
        begin: false,
        lat: 0,
        lng: 0,

        row: null,

      }
    },
    methods: {
      orderbyfun() {
        this.geolocate();



      },
      geolocate: function () {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

        });


      },

      getlocation() {
        this.geolocate();
        this.$emit("getlocation", this.lat, this.lng);

      }
    },
    mounted() {

      this.geolocate();
      this.sub_cat = this.selected_sub_cat

    },
    created() {

      this.sub_cat = this.selected_sub_cat
      this.begin = true
    },



    computed: {

      selected: function () {

        this.geolocate();
        return this.$emit("inputData", this.sub_cat, this.orderby, this.lat, this.lng);
      },
    },



    watch: {
      selected: 'search by sub_cat_id',
    },


  }
</script>