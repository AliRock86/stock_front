<template >


 
       <v-layout row wrap class="counts" >
       <v-flex v-for="count in conts"  :key="count.categor">
<v-layout column=""  >
    <span class="counts_num">{{count.num}}</span><br>
<v-divider class="counts_divider"></v-divider>
<span class="counts_title">{{count.categor}}</span><br>
</v-layout>
   
</v-flex>
   </v-layout>
 




</template>
<script>
export default {
    data(){
        return{
           conts:[{num:'1,344',categor:'الحجوزات'},{num:'1,344',categor:'المستخدمين النشطين'},{num:'1,344',categor:'الاحداث الفعالة'}]
        }
    }
}
</script>