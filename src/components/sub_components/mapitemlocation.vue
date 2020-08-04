<template>
  <v-container fluid="" style="background:white">





    <gmap-map id="googleMap" :center="center" :zoom="12" style="width:100%;  height: 400px;" @click.native="setPlace"
      :clickable="true" :draggable="true">
      <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" @click="center=m.position">
      </gmap-marker>
    </gmap-map>


  </v-container>
</template>

<script>
  export default {
    props: {
      'latt': String,
      'long': String
    },
    name: "GoogleMap",
    data() {
      return {

        center: {
          lat: 45.508,
          lng: -73.587
        },
        markers: [],
        places: [],
        lat: 0,
        lng: 0,
        currentPlace: null
      };
    },

    mounted() {
      this.geolocate()



      const marker = {
        lat: parseFloat(this.latt),
        lng: parseFloat(this.long)
      };
      this.markers.push({
        position: marker
      });
      // this.places.push(position);
      this.center = marker;
      this.currentPlace = null;
      // this.lat = position.coords.latitude;
      // this.lng = position.coords.longitude;

      this.center = {
        lat: this.latt,
        lng: this.long
      };

    },

    methods: {
      // receives a place object via the autocomplete component





      geolocate: function () {
        navigator.geolocation.getCurrentPosition(position => {

          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

        });


        //this.$emit("getmyLocation",this.center.lat,this.center.lng);
      },

    }
  };
</script>