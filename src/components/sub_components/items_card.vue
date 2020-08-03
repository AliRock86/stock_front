<template>
  <v-layout row wrap style="width:100%;" pr-4>

    <v-flex xs12 sm12 md12 style="width:100%;padding-bottom:2%;overflow:hidden" v-for="item  in items" :key="item.id">
      <router-link :to="{ name: 'item', params: { id: item.id } }">
        <v-hover v-slot:default="{ hover }">
          <v-card width="100%" style="background-color:#fff" :elevation="hover ? 12 : 2" class="card_height">
            <div>
              <v-layout row wrap>

                <v-flex xs4 md3 sm3 lg3 xl3 style="padding:15px">

                  <div class="width:200px"  >
                     
                     <v-img v-if="item.images[0]!=''" :src="'http://127.0.0.1:9999/images/'+item.images[0].image_url" class="card_img" style="width:100%; border-radius:3px;"></v-img>

                    <v-img v-else src="https://izionist.org/eng/wp-content/themes/wp-zefir/img/no-image.png" class="card_img" style="width:100%; border-radius:3px;"></v-img>

                  </div>

                </v-flex>


                <!-- partition right of item card -->
                <v-flex xs8 md7 sm7 lg7 pr-4 pl-4 pt-4 pb-1>



                  <v-row>
                    <v-flex xs5 md12 sm12 lg12>
                      <v-list-item-title class="mb-2 cart_tit" style="font-weight:bold;">{{item.item_name}}
                      </v-list-item-title>
                      <v-row class="mb-2">
                        <span style="padding-left:10px;" class="card_subname mb_resposiv_hidden">
                          <v-icon style="margin-left:5px"> {{item.sub_category.icon}}</v-icon>
                          {{" "+item.sub_category.name}}
                        </span>




                        <v-divider vertical=""></v-divider>


                        <!-- <v-rating color="#f29c2b" size="20" background-color="gray" v-if="item.item_evaluation!=null"
                          v-model="item.item_evaluation" class="mb_resposiv_hidden" dense="">
                          </v-rating> -->


                        <v-row class="mb_resposiv_show" dense="">


                          <span xl6 md6 sm6 xs8 style="padding-right:10px;">

                            <div class="font_item mb_resposiv_hidden" style="color:#808080">
                              {{getDiscription(item.item_description,80)}}</div>
                            <div class="font_item mb_resposiv_show" style="color:#808080;height:70px">
                              {{getDiscription(item.item_description,40)}}

                            </div>

                          </span>
                          <v-row style="padding-right:20px;padding-bottom:10px ">

                            <div style="font-weight:bold;" class="font_item"> <i class="fas fa-map-marker-alt"></i>
                              الموقع
                              : {{item.Address.province.province_nam}}</div>


                          </v-row>



                        </v-row>
                      </v-row>

                    </v-flex>




                    <v-flex xs7 md0 sm0 lg0 class="mb_resposiv_show">
                      <v-container fluid="">






                        <div justify="center" class="d-block text-center">
                          السعر
                        </div>

                        <div v-if="item.offers!=''">
                          <div justify="center" class="mb_offers_pop d-block text-center"> عرض
                          </div>

                          <div justify="center" class="d-block text-center">
                            <strike> {{item.price.price_value}} د.ع</strike>
                          </div>

                          <div v-for="offer in  item.offers" justify="center" style="color:#E5A70F;font-size:18px"
                            :key="offer.id" class="d-block text-center">
                            {{offer.new_price}} د.ع
                          </div>


                        </div>

                        <div v-else justify="center" style="color:#E5A70F;font-size:22px" class="d-block text-center">
                          {{item.price.price_value}} د.ع
                        </div>







                      </v-container>
                    </v-flex>


                  </v-row>

                  <v-divider class="mb-4 mb_resposiv_hidden"></v-divider>



                  <v-layout row wrap class="mb_resposiv_hidden">

                    <v-flex xl3 md3 sm3 xs3 pb-2>
                      <div style="font-weight:bold;" class="font_item"> <i class="fas fa-map-marker-alt"></i> الموقع
                      </div>
                      <div class="font_item" style="color:#808080">{{item.Address.province.province_name}}</div>

                    </v-flex>

                    <v-flex xl3 md3 sm3 xs3 pb-2>
                      <div style="font-weight:bold;" class="font_item"><i class="fas fa-calendar-week"></i> الايام</div>
                      <div class="font_item" style="color:#808080">{{getdays(item.day_to_open)}}</div>

                    </v-flex>

                    <v-flex xl6 md6 sm6 xs6 pl-5 pb-2>
                      <div style="font-weight:bold;" class="font_item">الوصف</div>
                      <div class="font_item mb_resposiv_hidden" style="color:#808080">
                        {{getDiscription(item.item_description,80)}}
                      </div>
                      <div class="font_item mb_resposiv_show" style="color:#808080">
                        {{getDiscription(item.item_description,26)}}
                      </div>

                    </v-flex>



                  </v-layout>


                </v-flex>

                <!-- partition left of item card -->

                <v-flex xs12 md2 sm2>
                  <v-layout row wrap>

                    <v-container>
                      <v-divider class="divider_item mb_resposiv_hidden"></v-divider>
                    </v-container>


                    <v-flex xs5 md12 sm12 class="mb_resposiv_hidden">

                      <v-container>






                        <div justify="center" class="d-block text-center">
                          السعر
                        </div>

                        <div v-if="item.offers!=''">
                          <div justify="center" class="offers_pop d-block text-center"> عرض </div>

                          <div justify="center" class="d-block text-center">
                            <strike> {{item.price.price_value}} د.ع</strike>
                          </div>

                          <div v-for="offer in  item.offers" justify="center" style="color:#E5A70F;font-size:22px"
                            :key="offer.id" class="d-block text-center">
                            {{offer.new_price}} د.ع
                          </div>


                        </div>

                        <div v-else justify="center" style="color:#E5A70F;font-size:22px" class="d-block text-center">
                          {{item.price.price_value}} د.ع
                        </div>







                      </v-container>


                    </v-flex>





                    <v-flex xs3 md12 sm12>
                      <v-row justify="center" class="mb-6">
                        <v-btn color="#ff6600" width="109" height="50" style="color:#fff;font-weight:bold"
                          :to="'/item/'+item.id" class="font_item mb_resposiv_hidden">

                          <v-icon right="">fas fa-bookmark</v-icon>
                          حجز الان
                        </v-btn>


                      </v-row>
                    </v-flex>

                  </v-layout>


                </v-flex>
              </v-layout>


            </div>

          </v-card>
        </v-hover>
      </router-link>



    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    props: ['items'],
    data() {
      return {
        rating: 5,
        offers: [],
        urL: "http://109.224.53.155",
        image_error: './admin/assets/logo.png',
        images: []
      }
    },
    methods: {

      getdays(date) {


        var days = ["السبت", "الاحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة"];
        if (date[0].every_day == 0) {
          return days[date[0].from_day] + " - " + days[date[date.length - 1].to_day];
        } else {
          return "كل الايام";
        }
      },


      getlocation() {

        navigator.geolocation.getCurrentPosition(position => {


          position;
        });
      },
      getDiscription(disc, len) {
        var text = disc;

        text = text.substring(0, len)


        return text;
      },
      get_img_path(img_path) {

        return this.urL + "/" + img_path;

      },


    },
    mounted() {

      // this.setImages();

    },


  }
</script>