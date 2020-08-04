<template>




  <div style="background:#EEEEEE ;padding:25px">



     <v-container>
       <v-layout row wrap>
         
         <v-flex xs12>
           

      
    <v-toolbar flat style="background:#EEEEEE"  class="tool_title">
      <v-toolbar-title>الموظفين </v-toolbar-title>
    
      <v-spacer></v-spacer>
   
    </v-toolbar>
    <v-layout row  style=" margin-bottom: 10px;">

       <v-btn class="btn_add" >إضافة موظف</v-btn>

  
      <v-spacer></v-spacer>
 
          


    <div class="case_serch_table row">
     <v-flex xs10>
        <input xs10 type="text"  v-model="search"  v-on:keyup.enter="case_track(case_number)"
            placeholder="بحث"  style="background:white;height:39px;width:99%">
     </v-flex>
           <v-flex xs2>
                <v-btn icon @click="case_track(case_number)">

            <v-icon color="#e32331">fas fa-search</v-icon>
            
          </v-btn> 
           </v-flex>
    </div>


      
         


 


    
  </v-layout>
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.usr_username}}</td>
        <td>{{ props.item.usr_firstname}}</td>




        <td class="text-xs-right">
          {{ props.item.usr_lastname}}

        </td>



        <td class="text-xs-right">
          {{ props.item.usr_status}}

        </td>




        <td class="justify-center layout px-0">
          <v-btn  text :to="'/user/'+props.item.usr_uid" dark color="#E32331 ">عرض</v-btn>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn dark color="#E32331 " @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
         </v-flex>
       </v-layout>
     </v-container>
     
  </div>
</template>
<script>
  export default {
    data() {
      return {
        urL: 'http://195.133.222.59',
        user_id: '',
        dep_id: '',
        headers: [{
            text: 'اسم المستخدم',
            align: 'right',

            sortable: false,
            value: 'name'
          },
          {
            text: 'الاسم الاول',
            value: 'calories',
            align: 'right',
          },
          {
            text: 'الاسم الثاني',
            value: 'calories',
            align: 'right',
          },
          {
            text: 'الحالة',
            value: 'calories',
            align: 'right',
          },


        ],
        users: [

        ],
       
      }
    },

    created() {
      this.initialize()
    },

    methods: {
      initialize() {
        this.token = localStorage.getItem('access_token');

        const axios = require('axios');
        axios.get(this.urL + '/api/1.0/workflow/users?filter=' + JSON.parse(localStorage.getItem('user_info')).usr_firstname +
          '&access_token=' + this.token).then(response => {

          this.user_id = response.data[0].usr_uid;
          this.dep_id = response.data[0].dep_uid;
this.getDepartment(response.data[0].dep_uid);
          
        });
      },
 getDepartment(dep_id) {
        const axios = require('axios');
        axios.get(this.urL + '/api/1.0/workflow/department?access_token=' + this
          .token).then(response => {
            // response.data["0"].dep_children["0"].dep_manager
          
var departments=[];

for(var i=0;i<response.data.length;i++){
    var department=response.data[i].dep_children;
    var lens = Object.keys(department).length;
  
 
  for(var j=0;j<lens;j++){
    if(department[j].dep_parent==dep_id){ 
     departments.push(department[j].dep_uid);
     
     }
  }
}
if(departments.length>0){ 
for(var i=0;i<departments.length;i++){
  this.getUsers(departments[i]);
}}else{
this.getUsers(dep_id);
}
 

        });
 },

      getUsers(dep_id) {
        const axios = require('axios');



        axios.get(this.urL + '/api/1.0/workflow/department/' +dep_id + '/assigned-user?access_token=' + this
          .token).then(response => {

for(var i=0;i<response.data.length;i++){ 
          this.users.push(response.data[i]);
          }

        });

      },
      filterOnlyCapsText(value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },

    }
  }
</script>