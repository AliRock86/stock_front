<template>
  <v-layout column="">
    <v-dialog v-model="dialog" persistent max-width="900px">

      <!--<v-btn slot="activator" color="primary" dark class="dodo mb-2" >مقاله جديده</v-btn>-->

      <v-form v-model="valid" ref="form">
        <v-card>

          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>

                <v-flex xs12 sm6 md12>
                  <p class="dodo ad_con_title">
                    <span>اسم المرسل:</span>
                    {{editedItem.name}}
                  </p>
                </v-flex>




                <v-flex xs12 sm12 md12>
                  <p class="dodo ad_con_title">
                    <span> اسميل المرسل : </span>
                    {{editedItem.email}}
                  </p>
                </v-flex>


                <v-flex xs12 sm12 md12>
                  <p class="dodo ad_con_title">
                    <span>نص الرساله : </span>
                    {{editedItem.message}}
                  </p>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <p>
                    <a :href="'mailto:'+editedItem.email"> الرد على الرساله</a>
                  </p>
                </v-flex>


              </v-layout>


            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>

          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-row>


      <v-data-table :headers="headers" :items="messages" :page.sync="page" sort-by="calories"
        class="elevation-1 request_table" style="width:96%" items-per-page="15" hide-default-footer=""
        :loading="loading" loading-text="جاري تحميل البيانات">

        <template v-slot:top>
          <v-toolbar flat color="white" pb-5>

            <v-toolbar-title>الرسائل</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-row justify="end" style="margin-top:20px;">







            </v-row>

          </v-toolbar>
        </template>




        <template v-slot:bottom>
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </template>
        <!-- edit reservation -->


        <!-- edit reservation -->
        <template v-slot:item.action="{ item }">

          <v-icon small class="mr-2" @click="editItem(item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <h4>لاتوجد بيانات</h4>
        </template>



      </v-data-table>

    </v-row>
    <v-row>
      <v-pagination v-model="page" prev-icon="mdi-menu-right" next-icon="mdi-menu-left" circle="" :length="pageCount">
      </v-pagination>

    </v-row>
  </v-layout>

</template>


<script>
const axios = require('axios');
  export default {
    data: () => ({


      user_info: {},
      res_filter: '',
      token: localStorage.getItem('access_token'),

      urL: 'http://109.224.53.155',
      dialog: false,
      messages: [],
      editedIndex: -1,
      loding_accept: false,
      marvelHeroes: [],
      loding_cancel: false,
      headers: [{
          text: 'رقم التعريف',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        {
          text: 'الاسم',
          align: 'center',
          sortable: false,
          value: 'name',
        },
        {
          text: 'الايميل',
          align: 'center',
          sortable: false,
          value: 'email',
        },
        {
          text: 'الرساله',
          align: 'center',
          sortable: false,
          value: 'message',
        },

        {
          text: ' ',
          value: 'action',
          align: 'center',
        },
      ],

 
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },

      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },


      valid: false,
      page: 1,
      pageCount: 0,
      current_page: 1,
      last_page: 0,
      loading: false


    }),



    methods: {

      editItem(item) {




        this.editedIndex = this.messages.indexOf(item)
        this.editedItem = Object.assign({}, item)

        this.dialog = true


      },




      getitems() {

        var url = this.urL+"/contactus?page=" + this.current_page;
        // var url = this.urL + "http://127.0.0.1:5555/GetOwnerItemRating?page=" + this.current_page;
        this.loading = true;
        axios({
          method: 'get',
          url: url,
          headers: {
            token: this.token
          }

        }).then(response => {
          this.messages = response.data.Data.data;

          this.last_page = response.data.Data.last_page;
          this.pageCount = response.data.Data.last_page;







        }).catch(error => {
          error
          //  this.$swal('خطاء', "خطاء بالاتصال", 'error')
        }).finally(s => {
          s;
          this.loading = false;

        });
      },



      deleteItem(item) {









        const Swal = require('sweetalert2')


        Swal.fire({
          title: "هل انت متاكد من الحذف ؟",

          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'

        }).then((result) => {
          if (result.value) {
            var url = "http://127.0.0.1:5555/contactus_deleted/" + item.id;
            axios({
              method: 'post',
              url: url,
              headers: {
                token: this.token
              }

            }).then(response => {
response



            }).catch(error => {
              error,
              this.$swal('خطاء', "خطاء بالاتصال", 'error')
            }).finally(d => {
              d,
              Swal.fire(
                'تم الحذف بنجاح',
                '',
                'success'
              )
              this.getitems();
            });



          }
        })


      },

      close() {
        this.dialog = false
        this.imageUrl = '';
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },





    },



    created() {
      this.getitems();

    },
    mounted() {



    },
    computed: {


    },


    watch: {

    },
  }
</script>