<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title> {{title}}</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">

        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" @click="addsubCat" v-on="on"> اضافه تقسيم فرعي</v-btn>
        </template>
        <v-form ref="form" v-model="validate">
          <v-card style="padding:34px">
            <v-card-title>

            </v-card-title>

            <v-row class="mb-6" justify="center">
              <h4 style="color:#000">اضافة تقسيم </h4>
            </v-row>
            <v-row class="mb-6">

            </v-row>

            <v-layout row wrap>
              <v-flex pa-3>
                <v-text-field solo label="اسم التصنيف" v-model="name" :rules="nameRules" required></v-text-field>
              </v-flex>

            </v-layout>

            <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
            <span style="color:#fff">
              {{img_name}} </span>
            <v-row justify="center" class="mb-6">
              <v-card height="200" width="200" class="card_img">
                <v-img :src="images[0]" height="200" width="200" class="card_img" v-if="images[0]!='ab'">
                  <v-btn icon=""
                                                        style="padding-right: 24px;position:relative;left: 46px;"
                                                         @click="cancelImg">
                                                        <v-icon color="#fff">fas fa-window-close</v-icon>
                                                    </v-btn>

                </v-img>

                <v-btn icon v-else @click='pickFile()'>
                  <v-icon style="margin:0px" size="40">fas fa-plus-square</v-icon>
                </v-btn>

                 <v-container fluid=""     style="width:100%;height:100%" @>

           </v-container>

              </v-card>

            </v-row>


            <v-card-actions>
              <v-btn color="success" v-if="loading" style="margin-left:10px">
                <v-progress-circular indeterminate color="white"></v-progress-circular>
              </v-btn>
              <v-btn v-else color="success" @click="submit" style="margin-left:10px">حفظ</v-btn>

              <v-btn color="red" dark="" @click="close">الغاء</v-btn>


              <v-spacer></v-spacer>

            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="headers" :items="category" sort-by="calories" class="elevation-1">
 <template v-slot:item.created_at="{ item }">

       {{item.created_at.split("T")[0]}}

      </template>
      <template v-slot:item.edit="{ item }">

        <v-btn icon="" @click="editsubCat(item)">
          <v-icon>fas fa-edit</v-icon>
        </v-btn>

      </template>
       <template v-slot:item.delete="{ item }">

          <v-btn icon="" @click="deleteItem(item)">
            <v-icon>fas fa-trash</v-icon>
          </v-btn>

        </template>
      <template v-slot:no-data>
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>


<script>
 const axios = require('axios');
  export default {
    props: ['itemm'],
    data: () => ({
      dialog: false,
      loading: false,
      api: '"/v2/info/SubCategories"',
      urL:"http://109.224.27.9:81",
     icon:"",
      requestType:"post",
      headers: [{
          text: 'الرقم',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        {
          text: 'اسم القسم الفرعي',
          value: "sub_category_name",
          align: 'center',
        },
        {
          text: 'وقت الانشاء',
          value: "created_at",
          align: 'center',
        },
        {
          text: ' ',
          value: 'edit',
          align: 'center',
        },
         {
          text: ' ',
          value: 'delete',
          align: 'center',
        },
        {
          text: ' ',
          value: 'action',
          align: 'center',
        },

      ],
      validate: true,

      category: [],
      info: {},
      title: '',
      id: '',


      valid: false,



      nameRules: [
        v => !!v || 'هذا الحقل مطلوب  ',

      ],
      numberRul: [
        v => !!v || 'هذا الحقل مطلوب  ',

        v => !isNaN(v) || 'يجب ادخال رقم ',
      ],
      descriptRules: [
        v => !!v || 'هذا الحقل مطلوب  ',
      ],


      name: '',
      img_name: '',
      images: ["ab"]

    }),



    watch: {
      dialog(val) {
        val || this.close()
      },
    },


    methods: {


 cancelImg() {
        this.images[0] = 'ab';
        this.img_name = 'ghjk'

      },

      addsubCat() {
        this.loading = false;
        this.name = '';

        this.api =  "/v2/info/SubCategories" ;
        this.images = [];

         this.images[0]="ab";
        this.requestType="post";
      },
      editsubCat(item) {
        this.loading = false;

        this.dialog = true;
        this.name = item.sub_category_name;
        this.icon= item.icon;
   this.requestType="put";
        this.images = [];
        this.api = "/v2/info/SubCategories/" + item.id;
         item.images != null && item.images != "null" ? this.images[0]=this.urL + "/images/" + item.images.image_url : this
          .images[0]="ab";





      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },


      submit() {
        if (this.images[0].includes("http://")) {
          this.images = null
        }
        if (this.$refs.form.validate()) {
          if (this.images[0] != "ab") {
            this.loading = true;
            var data = {
              sub_category_name: this.name,
              category_id: this.id,

              images:this.images


            };
            // this.description=JSON.stringify(data);
            this.$http({
                method: this.requestType,
                url: this.api,
                data: data,
               headers: {

                }
              })
              .then(response => {
                this.dialog = false;
                if (response.data.success == true) {
                  this.$refs.form.reset();
                  this.dialog = false;
                  this.$swal('', "    تم اضافة القسم الفرعي", 'success')
                }
                //
                this.getSubCategory();




              })
              .catch(error => {
                error,
                this.$swal('خطاء', "     لم يتم اضافة القسم الفرعي", 'error')
                // if (response.data.success == true) {
                //   this.$refs.form.reset()
                //   this.dialog = false;
                // }

              }).finally(d => {
                d,
                this.loading = false;

              });
          } else {
            this.$swal('', "  يجب اضافة صورة للقسم الفرعي", 'warning');
          }
        } else {
          this.$swal('', "  يجب اضافة صورefge الفرعي", 'warning')
        }




      },



      deleteItem(item){

                const Swal = require('sweetalert2');



                Swal.fire({
                    title: "هل انت متاكد من الحذف ؟",

                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'

                }).then((result) => {
                    if (result.value) {


                        var url = "/v2/info/SubCategories/" + item.id;
                        axios({
                            method: 'delete',
                            url: url,
                            headers: {

                            }

                        }).then(response => {

                            response,


                            Swal.fire(
                                'تم الحذف بنجاح',
                                '',
                                'success'
                            );
                            this.getSubCategory();


                        }).catch(error => {
                            error,
                            this.$swal('خطاء', "خطاء بالاتصال", 'error')
                        });



                    }
                })




            },

      getSubCategory() {

        var url ="/v2/Categories/" + this.id;
        this.$http.get(url).then(response => {
          this.category = response.data.data[0].sub_category;



        })
      },






      pickFile() {


        this.$refs.image.click()
      },

      onFilePicked(e) {

        const files = e.target.files
        if (files[0] !== undefined) {
          this.imageName = files[0].name
          if (this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = files[0]

            this.images[0] = fr.result;
            this.img_name = files[0].name;
            0

          })

        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
      },



    },
    mounted() {

      this.id = this.$route.params.id;
      this.title = this.$route.params.name;
      this.getSubCategory();

    },
  }
</script>
