<template>
        <v-footer dark class="footer">

        <v-container>
          <v-card flat tile color="#ffffff00">
            <v-card-text>
              <v-layout row wrap>


                 <div class="d-inline" style="width:55px;height:55px"  >
                 <v-img src="/assets/logo_white.png" style="with:100%;height:100%"></v-img>
                 </div>


                <div class="d-inline" style="padding-right:14px;padding-top:10px">
                  <h2>احجزلي</h2>
                </div>


                <v-spacer></v-spacer>
                <span>© 2020 Enjaz.tech ALL RIGHTS RESEVED</span>
              </v-layout>
            </v-card-text>
            <v-card-text>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-text>
              <!-- <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                <v-icon size="24px">{{ icon }}</v-icon>
              </v-btn> -->
            </v-card-text>

            <v-card-text class="white--text pt-0">
              منصة حجوزات هي منصة تمكن الزبائن من الحجز في الخدمات المسجلة لديها و تشمل خدمات كثيرة منها الحجوزات الطبية
              و
              الهندسية و حجوزات قاعات الاعراس و المؤتمرات و الخفلات و الندوات العلمية
              منصة حجوزات هي منصة تمكن الزبائن من الحجز في الخدمات المسجلة لديها و تشمل خدمات كثيرة منها الحجوزات الطبية
              و
              الهندسية و حجوزات قاعات الاعراس و المؤتمرات و الخفلات و الندوات العلمية
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
              {{ new Date().getFullYear() }} — <strong>شركة انجاز للحلول التكنلوجية</strong>
            </v-card-text>
          </v-card>

        </v-container>
      </v-footer>
</template>