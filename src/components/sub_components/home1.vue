<template>
  <v-layout column class="search_component" style="padding-bottom: 0px !important;">

    <div style="background-color: rgba(32, 45, 40, 0.15);height:100%">


      <v-row class="mb-6" justify="center" style="padding-top:7%">
        <h2>اجعل حلمك حقيقة</h2>
      </v-row>


      <v-layout align-content-center justify-center row>

        <h3 style="color:#fff;padding-right: 17px;padding-left: 5px;"> أحجز موعد طبيب  قاعه اعراس قاعه رياضه سينما و فنادق من بيتك</h3>
    


      </v-layout>
      <v-form ref="form" v-model="valid_search">
        <v-row class="mb-4"></v-row>
        <v-container fluid>


          <v-row justify="center" class="mb-4">
            <v-flex xs10 xl4 md4>

              <!-- <label for="" style="color:#000;">بحث من خلال اسم العياده او اسم المركز ....</label> -->
              <autocomplete :search="filter" :rules="nameRules"   placeholder="اكتب اسم العيادة او المركز ..." required @keypress="search_byenter"   hint="sa" 
                @submit="search_select"></autocomplete>

            </v-flex>
          </v-row>
          
        <br>

          <v-row justify="center" class="mb-6">
            <v-flex xs10 xl4 md4>
               <!-- <label for="" style="color:#000;">او قم بختيار القسم و المحافظه ....</label> -->
              <v-layout row wrap>
                

                  <v-flex md6 sm6 class="mb-2" pa-2>
                    
                  <treeselect :multiple="true" search-nested :options="options" :disable-branch-nodes="true"
                    v-model="search.sub_cat_id" placeholder=" اختار القسم" height="30px" required :rules="nameRules" />
                </v-flex>

                <v-flex md6 sm6 class="mb-2" pa-2>
                    
                  <treeselect
                  
                   :load-options="loadOptions" :options="options_provinces" :flat="true"
                    v-model="search.provinces_id" :auto-load-root-options="false" :multiple="true"
                    placeholder="اختر المحافظة" height="30px" required :rules="nameRules" />
                </v-flex>

              
              </v-layout>

            </v-flex>

          </v-row>
          <v-row justify="center">
            <v-flex xs4 xl1 md1>
              <v-btn @click="search_fun" color="#ff6600" width="140" dark="">
                <v-icon right="">fas fa-search</v-icon>
                بحث 
              </v-btn>
            </v-flex>
          </v-row>


        </v-container>
      </v-form>

  

    </div>




  </v-layout>


</template>

<script>
const axios = require('axios');

  import Treeselect from '@riophae/vue-treeselect'
  import {
    LOAD_ROOT_OPTIONS
  } from '@riophae/vue-treeselect'
  const sleep = d => new Promise(r => setTimeout(r, d))
  let called = true


  export default {
    name: 'App',

    data: () => ({
      show: true,
      valid_search:true,
      items_serch_titel: [],
      search: [],
      cat_id: [],
      province: [],
      xx: '',
      options: [],
      optionss: null,
      options_provinces: [],
      items_serch: [],
      urL: 'http://109.224.53.155',
      place: [],
      provinces_id:'',
      nameRules: [
        v => !!v || 'هذا الحقل مطلوب  ',
      ],

    }),
    methods: {


      async loadOptions({
        action /*, callback*/
      }) {
        if (action === LOAD_ROOT_OPTIONS) {
          if (!called) {
            // First try: simulate an exception.
            await sleep(2000) // Simulate an async operation.
            called = true
            throw new Error('Failed to load options: test.')
          } else {
            // Second try: simulate a successful loading.
            //  await sleep(2000)
            this.optionss = ['a', 'النجف', 'بابل', 'بغداد', 'كربلاء'].map(id => ({
              id,
              label: `${id}`,
            }))


            // this.options.push({
            //     id: ['1','2'],
            //     label: ['a', 'النجف', 'بابل', 'بغداد', 'كربلاء'],


            //     //    this.sub_cat


            //   })

          }
        }
      },

      Get_All_items_title() {

        var url = this.urL + "/getAllItemsTitle";
        axios.get(url).then(response => {
          this.items_serch = response.data.Data;

          var i = 0;

          for (i = 0; i < this.items_serch.length; i++) {

            this.items_serch_titel.push(this.items_serch[i].name);

          }


        }).catch(error => {
          error

        });


      },

      filter(input) {

        if (input.length < 1) {
          this.search.text_titel = null;
          return []
        }
        return this.items_serch_titel.filter(item => {

          this.search.text_titel = input;
          return item.toLowerCase()
            .startsWith(input.toLowerCase())
        })
      },

      getProvinces() {
        this.$http.get("/info/v2/Provinces").then(response => {
        this.provinces = response.data.data;
         var i = 0;
          for (i = 0; i <= this.provinces.length; i++) {

            this.options_provinces.push({
                id: this.provinces[i].id,
                label:this.provinces[i].province_name,
              }
            );

    
          }

        })

      },
      getCategory() {

         this.$http.get("/v2/Categories").then(response => {
          this.categores = response.data.data;
      

          for (var i = 0; i <= this.categores.length; i++) {
 
            this.sub_cat = this.categores[i].sub_category.map(item => {
              return {
                id: item.id,
                label: item.name	
              };
            });


            //Push Categories in TreeSelect
            this.options.push({
                id: 'x' + this.categores[i].id,
                label: this.categores[i].name,
                children: this.sub_cat

                //    this.sub_cat


              }

            );



          }


        });


      },

      booking() {
        this.$router.push({
          name: "items"
        });
      },
      search_byenter(e) {
        if (e.keyCode === 13) {
          this.search_fun()
        }


      },
      search_select(input_search) {



        this.$router.push({
          name: 'search',
          params: {
            cat_id: this.search.sub_cat_id + '',
            gov_id: "null",
            orderby:"last",
            tit: input_search
          }
        })








      },
      search_fun() {

        var catx_id = null;
       
        var provinces_id = null;
        
      
        this.xx = this.search.text_titel;

        if (!this.xx) {
          this.xx = null;

        } else {
          this.xx = this.search.text_titel;
        }




        if (this.search.sub_cat_id == undefined) {
          catx_id = null;
        } else if (this.search.sub_cat_id.length == 0) {
          catx_id = null
        } else {
          catx_id = this.search.sub_cat_id;
        }


    
    this.provinces_id = this.search.provinces_id;

    if(this.provinces_id==undefined){this.provinces_id=null;}


        if (catx_id == null && this.xx == null && provinces_id == null) {
         // alert("تحقق من البيانات المدخلة")
        } else {

           
          this.$router.push({
            name: 'search',
            params: {
              cat_id:catx_id+'',
              gov_id: this.provinces_id + '',
              orderby:"last",
              tit: this.xx + ''
            }
          })
        }



      },


    },

    created() {
      this.getProvinces();
      this.Get_All_items_title();
      this.getCategory()


    },
    components: {
   
      Treeselect,

    }

  };
</script>