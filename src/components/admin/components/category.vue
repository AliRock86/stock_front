<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>الاقسام</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" @click="addCat" v-on="on">اضافه قسم</v-btn>
        </template>

        <v-form ref="form" v-model="valid_search">
          <v-card style="padding:34px">
            <v-card-title>

            </v-card-title>

            <v-row class="mb-6" justify="center">
              <h4 style="color:#000">اضافة قسم </h4>
              <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
            </v-row>
            <v-row class="mb-2">

            </v-row>
            <v-layout column="" wrap>
              <v-flex pa-3>
                <v-text-field solo label="اسم القسم" v-model="name" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex pa-3>
                <v-text-field solo label="اسم الايقونة" v-model="icon" :rules="nameRules" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>



              <!-- <v-flex pa-3 xs2>
     <vfa-picker v-model="icon" >
    <template v-slot:activator="{ on }">

      <v-btn color="primary" @click="on">اختار ايقونة</v-btn>
    </template>
  </vfa-picker>

        </v-flex> -->


              <v-flex>

                <span style="color:#fff">
                  {{img_name}} </span>
              </v-flex>
            </v-layout>
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

                <!-- <v-container fluid=""     style="width:100%;height:100%" @>

           </v-container> -->

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
        <template v-slot:item.edit="{ item }">

          <v-btn icon="" @click="editCat(item)">
            <v-icon>fas fa-edit</v-icon>
          </v-btn>

        </template>


        <template v-slot:item.delete="{ item }">

          <v-btn icon="" @click="deleteItem(item)">
            <v-icon>fas fa-trash</v-icon>
          </v-btn>

        </template>
        <template v-slot:item.action="{ item }">

          <v-btn color="success" :to="'/subCategory/'+item.id+'/'
      +item.name">عرض الاقسام الفرعية</v-btn>

        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getCategory">Reset</v-btn>
        </template>
      </v-data-table>

  </div>
</template>


<script>
  const axios = require('axios');
  //import { fontAwesomePicker } from 'font-awesome-picker';

  export default {
    data: () => ({
      dialog: false,
      valid_search: true,
      api: '/setCategory',
      urL:"http://109.224.27.9:81",
      v: undefined,
      requestType:"post",
      headers: [{
          text: 'الرقم',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        {
          text: 'اسم التصنيف',
          value: 'name',
          align: 'center',
        },
        {
          text: 'عدد التصنيفات الفرعية',
          value: 'sub_category.length',
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
      token: '',
      category: [],
      valid: false,
      icon: '',


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

      img_name: '',
      name: '',
      images: ["ab"],
      loading: false

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



      addCat() {
        this.loading = false;
        this.name = '';
        this.icon = '';
        this.api = "/v2/Categories";
        this.images = [];
        this.images[0]="ab";
        this.requestType="post";

      },
      editCat(item) {
        this.loading = false;

        this.dialog = true;
        this.name = item.name;
        this.icon = item.icon;

    this.requestType="put";
        this.api = "/v2/Categories/" + item.id;
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


                        var url = "/v2/Categories/" + item.id;
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
                            this.getCategory();


                        }).catch(error => {
                            error,
                            this.$swal('خطاء', "خطاء بالاتصال", 'error')
                        });



                    }
                })




            },



      submit() {

        if (this.$refs.form.validate()) {
          if(this.images[0].includes("http://")){
            this.images[0]="data:image/jpeg;base64";


          }
          if (this.images[0] != "ab") {
            this.loading = true;


         var   bodyRequest = {

              category_name: this.name,
              icon: this.icon,


              images: this.images,

            };

            axios({
                method: this.requestType,
                url:this.api,
                data: bodyRequest

              })
              .then(response => {
                this.$swal('', "    تم تحديث القسم", 'success')
//var data=response.data;
                if (response.data.success == true) {
                  this.$refs.form.reset()
                }




                this.dialog = false;

                this.getCategory()
              })
              .catch(error => {
                error;



                this.$swal('خطاء', "     لم يتم تحديث قسم", 'error')
                this.loading = false;

              });
          } else {

            this.$swal('', "  يجب اضافة صورة للقسم", 'warning')
          }
        }




      },

  getimg(url) {


        axios.get(url).then(response => {

alert(response.data);


        })
      },
      getCategory() {

        var url ="/v2/Categories";
        axios.get(url).then(response => {
          this.category = response.data.data;



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


      this.getCategory();
      this.geticon
    },
    components: {
      //'font-awesome-picker': fontAwesomePicker,

    },
  }
</script>
