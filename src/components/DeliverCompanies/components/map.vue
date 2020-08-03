<template>
  <v-container fluid=""  style="background:white">




      <!-- <v-row justify="center" class="mb-6"  >
        <label style="margin-top:10px;font-size:22px;font-weight:bold">موقع الزبون</label>
      </v-row> -->
      <!-- <v-row justify="center" class="mb-3">

   <v-card style="padding-top:5px;padding-right:10px; margin-left:10px" >
     <gmap-autocomplete
          @place_changed="setPlace"

          >
        </gmap-autocomplete>
   </v-card>


        <v-btn color="primary" dense @click="addMarker">اضافة
          <v-icon left="" size="15">fas fa-location-arrow</v-icon>
          </v-btn>
      </v-row> -->




    <gmap-map id="googleMap"
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
      @click.native="setPlace"
      :clickable="true"
      :draggable="true"

    >
       <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
    <v-divider></v-divider>
<v-container >
    <v-row style="width:650px">


<v-spacer></v-spacer>
  <v-btn color="success" @click="getlocation"> <label class="map_btn"> اضافة</label></v-btn>
<span style="width:10px"></span>
   <v-btn color="#ff0000" dark="" @click="cancelDailog"> <label class="map_btn">
     الغاء
     </label>
     </v-btn>

    </v-row>
    </v-container>

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
      position:'',
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 33.3160237, lng: 44.3497448 },
      markers: [],
      places: [],
      lat:0,
      lng:0,
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate()



        const marker = {
          lat:33.3160237,
       lng: 44.3497448
       };

            this.markers.push({ position: marker });
        this.places.push(this.position);
        this.center = marker;
        this.currentPlace = null;

        
        this.lat=this.getlocationposition.coords.latitude;
        this.lng=this.position.coords.longitude;



  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
    this.currentPlace = place;
    console.log(this.currentPlace)


    },
    addMarker() {
      // if (this.currentPlace) {
      //   const marker = {
      //     lat: this.currentPlace.geometry.location.lat(),
      //     lng: this.currentPlace.geometry.location.lng()
      //   };
      //   this.markers.push({ position: marker });
      //   this.places.push(this.currentPlace);
      //   this.center = marker;
      //   this.currentPlace = null;
      // }
       navigator.geolocation.getCurrentPosition(position => {


        this.lat= position.coords.latitude;
        this.lng=position.coords.longitude;
        const marker = {
        lat: this.lat,
       lng: this.lng
       };
            this.markers.push({ position: marker });
        this.places.push(position);
        this.center = marker;
        this.currentPlace = null;
        this.lat=position.coords.latitude;
        this.lng=position.coords.longitude;
      });




    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {position,

        this.center = {
          lat:33.3160237,
          lng:44.3497448
        };

      });


       //this.$emit("getmyLocation",this.center.lat,this.center.lng);
    },
    getlocation(){
      this.$emit("getmyLocation",this.lat,this.lng);
    },
     cancelDailog(){
      this.$emit("cancel");
    }
  }
};
</script>
