
export default  {
    // functions and constants

   chekpermition(){

 return   navigator.permissions.query({name:'geolocation'});
      
   }
}