import Vue from 'vue'
import Login from "./components/admin/components/login.vue"
import Router from 'vue-router'


//Admin Components
import admin_dashbourd from "./components/admin/components/admin_dashbourd.vue"
import Category from "./components/admin/components/category.vue"
import subCategory from "./components/admin/components/subCategory.vue"
import Owner from "./components/admin/components/owner.vue"
import messages from "./components/admin/components/messages.vue"
import DeliverCompanies from "./components/admin/components/DeliverCompanies.vue"




//Owner Components
import Additem from "./components/Owner/components/additem.vue"
import OwnerDashbourd from "./components/Owner/components/OwnerDashbourd.vue"
import OwnerItemRating from "./components/Owner/components/OwnerItemRating.vue"
import OwnerDeliverCompanies from "./components/Owner/components/DeliverCompanies.vue"
import request from "./components/Owner/components/request.vue"
import OwnerPartnershipCompany from "./components/Owner/components/PartnershipCompany.vue"


//DeliverCompanies
import Delivery_dashbourd from "./components/DeliverCompanies/components/Dashbourd.vue"
import Delivery_request from "./components/DeliverCompanies/components/Request.vue"
import drivers from "./components/DeliverCompanies/components/drivers.vue"
import PartnershipCompany from "./components/DeliverCompanies/components/PartnershipCompany.vue"
import requestDelivery from "./components/DeliverCompanies/components/Request.vue"
import DeliveryDashbourd from "./components/DeliverCompanies/components/Dashbourd.vue"
import DeliveryPrice from "./components/DeliverCompanies/components/DeliveryPrice.vue"



Vue.use(Router)





import {
  USER_ROLE_GUEST,
  //USER_ROLE_REGISTERED,
  OWNER_ROLE,
  USER_ROLE,
  ADMIN_ROLE,
  Delivery_ROLE

} from "./components/constants";




//Admin Route//

let router_admin = new Router({
  routes: [{
      path: '/',
      name: 'OwnerDashbourd',
      component: OwnerDashbourd,
      meta: {
        permissions: [{
            role:USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role:OWNER_ROLE,
            access: true,
            redirect: "request"
          },
          {
            role:USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          }
        ]
      }

    },



      {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
          permissions: [{
              role:OWNER_ROLE,
              access: false,
             redirect: "OwnerDashbourd"
            },

            {
                role:ADMIN_ROLE,
                access: false,
               redirect: "admin_dashbourd"
              },

            {
              role:USER_ROLE_GUEST,
              access: true,
              redirect: "login"
            }
          ]
        }

      },




    {
      path: "/additem",
      name: "additem",
      component: Additem,

      meta: {
        permissions: [{
            role:USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role:'owner',
            access: true,
            redirect:"request"
          },
          {
            role:USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          }
        ]
      }



    },

    {
      path:'/OwnerPartnershipCompany',
      name:'OwnerPartnershipCompany',
      component:OwnerPartnershipCompany,
      props: true,
      meta: {
        // permissions: [{
        //
        //     role: USER_ROLE_GUEST,
        //     access: false,
        //     redirect: "login"
        //   },
        //   {
        //     role: ADMIN_ROLE,
        //     access: false,
        //     redirect: "login"
        //   },
        //
        //   {
        //     role: OWNER_ROLE,
        //     access: true,
        //     redirect: "Drivers"
        //   },

        //]
      }

    },

    {
      path: '/request',
      name: 'request',
      component: request,
       meta: {
        permissions: [{
            role:USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role:OWNER_ROLE,
            access: true,
            redirect: "request"
          },
          {
            role:USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          }
        ]
      }

    },



    {
      path: '/ownerDeliverCompanies',
      name: 'OwnerDeliverCompanies',
      component: OwnerDeliverCompanies,
       meta: {
        permissions: [{
            role:USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role:OWNER_ROLE,
            access: true,
            redirect: "OwnerDeliverCompanies"
          },
          {
            role:ADMIN_ROLE,
            access: false,
            redirect: "login"
          }
        ]
      }

    },


    {
      path: '/DeliverCompanies',
      name: 'DeliverCompanies',
      component: DeliverCompanies,
      meta: {
        permissions: [{
            role:USER_ROLE_GUEST,
            access:false,
            redirect:"login"
          },
          {
            role:OWNER_ROLE,
            access:false,
            redirect:"DeliverCompanies"
          },
          {
            role: USER_ROLE,
            access:false,
            redirect:"login"
          },
          {
            role:ADMIN_ROLE,
            access:true,
            redirect:"DeliverCompanies"
          }
        ]
      }

    },


    {
      path: '/OwnerItemRating',
      name: 'OwnerItemRating',
      component: OwnerItemRating,
      meta: {
        permissions: [{
            role: USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role: OWNER_ROLE,
            access: true,
            redirect: "OwnerItemRating"
          },
          {
            role: USER_ROLE,
            access: false,
            redirect: "login"
          }
        ]
      }

    },











    ///////////////////-----------------------Admain Route---------------------///////////////////







    {

      path: '/admin_dashbourd',
      name: 'admin_dashbourd',
      component: admin_dashbourd,
      meta: {
        permissions: [{
            role: USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role: OWNER_ROLE,
            access: false,
            redirect: "login"
          },

          {
            role: ADMIN_ROLE,
            access: true,
            redirect: "admin_dashbourd"
          },

        ]
      }

    },






    {

      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        permissions: [{
            role: USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role: OWNER_ROLE,
            access: false,
            redirect: "login"
          },

          {
            role: ADMIN_ROLE,
            access: true,
            redirect: "merchants"
          },

        ]
      }

    },

    {
      path: '/subCategory/:id/:name',
      name: 'subCategory',
      component: subCategory,
      props: true,
      meta: {
        permissions: [{
            role: USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role: OWNER_ROLE,
            access: false,
            redirect: "login"
          },

          {
            role: ADMIN_ROLE,
            access: true,
            redirect: "merchants"
          },

        ]
      }

    },




    {
      path: '/messages',
      name: 'messages',
      component: messages,
      props: true,
      meta: {
        permissions: [{
            role: USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role: OWNER_ROLE,
            access: false,
            redirect: "login"
          },

          {
            role: ADMIN_ROLE,
            access: true,
            redirect: "messages"
          },

        ]
      }

    },











    {
      path: '/owner',
      name: 'owner',
      component: Owner,
      props: true,
      meta: {
        permissions: [{
            role: USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role: OWNER_ROLE,
            access: false,
            redirect: "login"
          },

          {
            role: ADMIN_ROLE,
            access: true,
            redirect: "merchants"
          },

        ]
      }

    },




    {
      path: '/owner',
      name: 'owner',
      component: Owner,
      props: true,
      meta: {
        permissions: [{
            role: USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role: OWNER_ROLE,
            access: false,
            redirect: "login"
          },

          {
            role: ADMIN_ROLE,
            access: true,
            redirect: "merchants"
          },

        ]
      }

    },













    ///////////////////-----------------------Company Delivery---------------------///////////////////
    {
      path: '/delivery_request',
      name: 'Delivery_request',
      component: Delivery_request,
    //  props: true,


    },


    {
      path: '/requestDelivery',
      name: 'requestDelivery',
      component: requestDelivery,
    //  props: true,


    },






{
  path: '/DeliveryPrice',
  name: 'DeliveryPrice',
  component:DeliveryPrice,
//  props: true,


},


    {
      path: '/DeliveryDashbourd',
      name: 'DeliveryDashbourd',
      component: DeliveryDashbourd,
    //  props: true,


    },








{
  path: '/PartnershipCompany',
  name: 'PartnershipCompany',
  component: PartnershipCompany,
  props: true,
  meta: {
    // permissions: [{
    //
    //     role: USER_ROLE_GUEST,
    //     access: false,
    //     redirect: "login"
    //   },
    //   {
    //     role: ADMIN_ROLE,
    //     access: false,
    //     redirect: "login"
    //   },
    //
    //   {
    //     role: OWNER_ROLE,
    //     access: true,
    //     redirect: "Drivers"
    //   },

    //]
  }

},


{
  path: '/drivers',
  name: 'drivers',
  component: drivers,
  props: true,
  meta: {
    // permissions: [{
    //
    //     role: USER_ROLE_GUEST,
    //     access: false,
    //     redirect: "login"
    //   },
    //   {
    //     role: ADMIN_ROLE,
    //     access: false,
    //     redirect: "login"
    //   },
    //
    //   {
    //     role: OWNER_ROLE,
    //     access: true,
    //     redirect: "Drivers"
    //   },

    //]
  }

},








    {
      path: '/delivery_dashbourd',
      name: 'Delivery_dashbourd',
      component: Delivery_dashbourd,
      props: true,
      meta: {
        permissions: [{

            role: USER_ROLE_GUEST,
            access: false,
            redirect: "login"
          },
          {
            role: ADMIN_ROLE,
            access: false,
            redirect: "login"
          },

          {
            role: Delivery_ROLE,
            access: true,
            redirect: "Delivery_dashbourd"
          },

        ]
      }

    },









  ]
});





var router;

var x = window.location.pathname;

if (x == "/") {
  router = router_admin;

} else if (x == "/admin") {

  router = router_admin;

}

else if (x == "/delivery_company") {

  router = router_admin;

}


export default router;
