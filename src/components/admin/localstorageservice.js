// localstorageservice.js
const localstorageservice = (function(){
 var _service;

 function _getServiceOwner() {
     if(!_service) {
       _service = this;
       return _service
   }
   return _service
 }

 function _getServiceAdmin() {
     if(!_service) {
       _service = this;
       return _service
   }
   return _service
 }


 function _getServiceDelivery() {
     if(!_service) {
       _service = this;
       return _service
   }
   return _service
 }







 function _setTokenOwner(tokenObj) {
   localStorage.setItem('access_token_owner', tokenObj);
   localStorage.setItem('refresh_token_owner', tokenObj);
 }


 function _setTokenAdmin(tokenObj) {
   localStorage.setItem('access_token_admin', tokenObj);
   localStorage.setItem('refresh_token_admin', tokenObj);
 }


 function _setTokenDelivery(tokenObj) {
   localStorage.setItem('access_token_delivery', tokenObj);
   localStorage.setItem('refresh_token_delivery', tokenObj);
 }









 function _getAccessTokenOwner() {
   return localStorage.getItem('access_token_owner');
 }


 function _getAccessTokenAdmin() {
   return localStorage.getItem('access_token_admin');
 }

 function _getAccessTokenDelivery() {
   return localStorage.getItem('access_token_delivery');
 }





 function _getRefreshTokenOwner() {
   return localStorage.getItem('refresh_token_owner');
 }


 function _getRefreshTokenAdmin() {
   return localStorage.getItem('refresh_token_admin');
 }

 function _getRefreshTokenDelivery() {
   return localStorage.getItem('refresh_token_delivery');
 }








 function _clearTokenOwner() {
   localStorage.removeItem('access_token_owner');
   localStorage.removeItem('refresh_token_owner');
 }


 function _clearTokenAdmin() {
   localStorage.removeItem('access_token_admin');
   localStorage.removeItem('refresh_token_admin');
 }



 function _clearTokenDelivery() {
   localStorage.removeItem('access_token_delivery');
   localStorage.removeItem('refresh_token_delivery');
 }




 var x=window.location.pathname;
 if(x=='/')
 {

   return {
      getService : _getServiceOwner,
      setToken : _setTokenOwner,
      getAccessToken : _getAccessTokenOwner,
      getRefreshToken : _getRefreshTokenOwner,
      clearToken : _clearTokenOwner
    }

 }

 else if(x=="/admin"){

   return {
      getService : _getServiceAdmin,
      setToken : _setTokenAdmin,
      getAccessToken : _getAccessTokenAdmin,
      getRefreshToken : _getRefreshTokenAdmin,
      clearToken : _clearTokenAdmin
    }

 }

 else if(x=="/delivery_company"){

   return {
      getService : _getServiceDelivery,
      setToken : _setTokenDelivery,
      getAccessToken : _getAccessTokenDelivery,
      getRefreshToken : _getRefreshTokenDelivery,
      clearToken : _clearTokenDelivery
    }

 }


})();
export default localstorageservice;
