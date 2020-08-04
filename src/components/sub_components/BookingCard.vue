<template>
    <div>
        
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
                      <v-text-field outlined dense readonly style="background-color:#fff" placeholder="تاريخ الحجز"
                        append-icon="fas fa-calendar-day" required :rules="nameRules" v-model="date"
                        @click="date_dialog=true"></v-text-field>
                      </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex pa-3>
                      <v-text-field outlined dense readonly placeholder="الساعة" style="background-color:#fff"
                        append-icon="fas fa-clock" required :rules="nameRules" v-model="time" @click="time_dialog=true">
                      </v-text-field>
                    </v-flex>

                  </v-layout>
                </v-container>
              </v-form>
            </v-card>




            <v-btn color="primary" @click="e1 = 2">
              التالي
            </v-btn>

            <v-btn text>خروج</v-btn>
          </v-stepper-content>






          <v-stepper-content step="2">
            <v-card class="mb-12" color="fff" height="300px">
              <v-form ref="form_fa" v-model="valid_day">

                <v-radio-group v-model="radioGroup">
                  <v-radio label="انشاء فاتوره تسديد" :value="true"></v-radio>

                  <v-radio label="الدفع نقدا" :value="false"></v-radio>
                </v-radio-group>

                <div v-show="radioGroup">
                  <v-divider></v-divider>
                  <v-card-title style="font-size:font-size: 18px;">
                    ويه تسديد صار تكدر تدفع فاتورتك وانت بالبيت من خلال رقم الفاتورة الي يوصلك برسالة .. والتسديد من
                    خلال ادخال رقم بطاقة الدفع الكي كارد أوالماستر كارد
                  </v-card-title>
                  <!-- <v-divider></v-divider> -->


                  <v-layout row wrap>
                    <v-flex pa-3>

                      <v-text-field outlined dense placeholder="ادخل رقم هاتفك لانشاء فاتوره" append-icon="fas fa-phone"
                        type="number" :rules="numRules" v-model="post_data.phone"></v-text-field>
                    </v-flex>

                  </v-layout>
                  <v-col>

                  </v-col>
                </div>
                <!-- <div v-else></div> -->



              </v-form>



            </v-card>

            <v-btn color="primary" @click="e1 = 1">
              السابق
            </v-btn>

            <v-btn color="success" mr-4 ml-4 pl-4 pr-4>حجز</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

            <v-btn color="primary" style="position: relative;right: 3%;width: 103px;" @click="e1 = 1">


              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>






    <!--end item booking dailog  -->
    <!--create fatwra -->
    <v-dialog v-model="fatwra_dialog" width="500">
      <v-card>
        <v-form ref="form_fa" v-model="valid_day">
          <v-card-title>
            <span v-if="!info.item_price.book_without_credit_card">يجب انشاء فاتورة الرجاء ادخال رقم الهاتف</span>
            <span v-else>ادخل رقم الهاتف لانشاء فاتورة تسديد</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-container>
            <v-layout row wrap>
              <v-flex pa-3>

                <v-text-field outlined dense placeholder="  رقم الهاتف" append-icon="fas fa-phone" type="number"
                  :rules="numRules" v-model="post_data.phone"></v-text-field>
              </v-flex>

            </v-layout>
            <v-col>
              <v-row justify="start">


                <v-btn color="success" @click="validate_fawater" height="30" width="120" style="font-weight:bold">
                  <v-progress-circular indeterminate color="white" v-show="loading"></v-progress-circular>
                  <span v-show="!loading">


                    انشاء فاتورة
                  </span>

                </v-btn>



                <v-btn color="#ff0000" dark="" @click="fatwra_dialog = false;post_data.phone=''"
                  style="margin-right:10px" height="30" width="120">
                  الغاء
                </v-btn>

              </v-row>
            </v-col>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- alert fawater num -->

    <v-dialog v-model="fawater_res_Dailog" max-width="450px">
      <v-card>

        <v-container>
          <v-row justify="center">
            <span class="mb-4"> رقم الفاتورة : </span>

            <span class="mb-6" style="padding-right:10px">{{fatwra_num}}</span>
          </v-row>


          <v-row justify="center" class="mt-6">
            <v-flex xs4>
              <v-btn color="red" dark @click="fawater_res_Dailog=false" style=";color:#red;width:100%">
                الغاء
              </v-btn>


            </v-flex>

          </v-row>
        </v-container>


      </v-card>
      
    </div>
</template>