<template>
    <v-container style="background:white;">

        <v-layout row wrap>
            <div style="background:#ff6600;width:5px;height:30px;"></div>
            <span style="font-size:22px;margin-right:10px;color:gary;font-weight: 700;"> العروض المضافة مؤخرا </span>
        </v-layout>
        <br>


        <v-layout row wrap>
            <v-flex xs12 md10 sm10 class="up_event_text">
                <span>{{upcomingEvent}}
                    <br>
                    {{upcomingEvent}}
                </span>
            </v-flex>

            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-flex xs12 md2 sm2>
                <v-btn class="up_event_btn" to="/offers"> عرض كل العروض </v-btn>
            </v-flex>
        </v-layout>

        <br><br>
        <v-layout row wrap>


            <v-flex xs12 md4 sm4 xl3 v-for="item in items" :key="item.id" pa-3>
                <router-link :to="{ name: 'item', params: { id: item.id } }">

                    <v-card class="up_event_card" v-bind:style="{ 'background-image':'url(http://127.0.0.1:9999/images/'+item.images[0].image_url}">

                        <v-layout column wrap style="height:100%">
                            <v-row>
                                <div class="up_event_card_date">
                                    <span>خصم {{item.offer[0].discount_percentage}} ٪ </span><br>
                                    <span>متبقي</span> <br>
                                    <span class="year">{{getOfferDay(item.offer[0].offer_to_date)}}</span> <br>
                                    <span>يوم</span>
                                </div>
                            </v-row>
                            <v-spacer></v-spacer>
                            <v-container fluid class="up_event_card_bottom_layout">

                                <div style="d-flex space-between">

                                    <div class="d-inline">
                                        <span class="up_event_card_text1"> {{item.item_name}}</span>
                                    </div>

                                    <div class="d-inline float-left">


                                        <v-btn class="booking-btn" :to="'/item/'+item.id">
                                            <v-icon right="">fas fa-bookmark</v-icon>
                                            طلب الحجز
                                        </v-btn>

                                    </div>

                                    <div class="d-block">

                                        <!-- <v-rating color="#f29c2b" size="20" background-color="#fff" v-if="item.item_evaluation!=null"
                          v-model="item.item_evaluation" class="mb_resposiv_hidden" dense="">
                          </v-rating> -->
                                        <span class="up_event_card_text2"> <i class="fas fa-map-marker-alt"></i>
                                            {{item.Address.province.province_name}} </span>
                                    </div>

                                    <!-- <br>  

                                    <span class="up_event_card_text2">  <i class="fas fa-map-marker-alt"></i>  {{item.address.province.province_name}} -  {{item.address.discraption|SubItemDisc}} </span> -->

                                    <!-- <span class="up_event_card_text2">  {{item.disc|SubItemDisc}} </span> -->


                                </div>


                            </v-container>

                        </v-layout>

                    </v-card>

                </router-link>
            </v-flex>
        </v-layout>




    </v-container>

</template>
<script>
    export default {
        data() {
            return {

                page: 1,
                items: [],
                upcomingEvent: '',
            }
        },
        mounted() {
            this.getlast();
        },

        filters: {
            SubItemDisc: function (string) {
                if (string != null) {
                    return string.substring(0, 30) + ' ... ';
                }

            },
        },
        methods: {
            getlast() {
        
                this.$http.get("/v2/items/search?filter[Getoffers]=1&sort=-id").then(response => {
                    this.items = response.data.data;

                })
            },

            getOfferDay(second) {

                var second2 = this.formatDate(second);
                var first = new Date();
                first = this.formatDate(first);
                return this.datediff(this.parseDate(first), this.parseDate(second2));



            },
            getYear(date) {
                var year = date.split("-")[0]

                return year;
            },
            getMonth(date) {
                var month = date.split("-")[1]
                var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
                    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
                ];
                return months[month - 1];
            },
            getDay(date) {

                var day = date.split("-")[2].split(" ")[0]

                return day;
            },

            formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [month, day, year].join('/');
            },

            parseDate(str) {
                var mdy = str.split('/');
                return new Date(mdy[2], mdy[0] - 1, mdy[1]);
            },

            datediff(first, second) {
                // Take the difference between the dates and divide by milliseconds per day.
                // Round to nearest whole number to deal with DST.
                return Math.round((second - first) / (1000 * 60 * 60 * 24));


            },

        }

    }
</script>