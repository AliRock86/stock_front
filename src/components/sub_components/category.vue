<template>
  <v-container style="background:white;">
    <v-layout column wrap>
      <v-layout row wrap>
        <div style="background:#ff6600;width:5px;height:30px;"></div>
        <span style="font-size:22px;margin-right:10px;color:gary;font-weight: 700;"> اقسام الحجوزات </span>
      </v-layout>
      <br>
      <v-row justify="center">
        <v-flex xs12 md3 xl2 v-for="(item,i) in categores" :key="item.id" pa-3>
          <router-link :to="{ name: 'itemsByCatId', params: { id: item.id } }">
            <v-card :style="card_back[i]" dark="" height="200">
              <v-row class="mb-10" style="padding-top:10px">
                <v-icon style="width:100%" size="123"> {{item.icon}}</v-icon>
              </v-row>
              <v-spacer></v-spacer>
              <v-row justify="center" style="background:#00000033; margin:0px">
                <v-card-text primary-title style="text-align:center;font-size:20px;">
                  {{item.name}}
                </v-card-text>
              </v-row>
            </v-card>
          </router-link>
        </v-flex>
      </v-row>

    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        categores: [],
        card_back: ["background: linear-gradient(to right, #2193b0,#6dd5ed);",
          "background: linear-gradient(to right, #FF0099,#493240);",
          "background: linear-gradient(to right, #f12711,#f5af19);",
          "background: linear-gradient(to right, #FF416C,#FF4B2B);",
          "background: linear-gradient(to right, #DA4453,#89216B);",
          "background: linear-gradient(to right, #6D6027,#D3CBB8);",
          "background: linear-gradient(to right, #FF0099,#493240);",
          "background: linear-gradient(to right, #DA4453,#89216B);",
          "background: linear-gradient(to right, #6D6027,#D3CBB8);",
          "background: linear-gradient(to right, #FF416C,#FF4B2B);",
          "background: linear-gradient(to right, #f12711,#f5af19);",
          "background: linear-gradient(to right, #2193b0,#6dd5ed);",
          "background: linear-gradient(to right, #2193b0,#6dd5ed);",
          "background: linear-gradient(to right, #2193b0,#6dd5ed);",
          "background: linear-gradient(to right, #2193b0,#6dd5ed);",
          "background: linear-gradient(to right, #2193b0,#6dd5ed);",
          "background: linear-gradient(to right, #2193b0,#6dd5ed);",
          "background: linear-gradient(to right, #2193b0,#6dd5ed);",
          "background: linear-gradient(to right, #2193b0,#6dd5ed);",
        ],
      
      }
    },
    mounted() {
      this.getCategory();
    },

    methods: {
      getCategory() {


        this.$http.get("v2/Categories").then(response => {
          this.categores = response.data.data;



        })
      },


    },
  }
</script>