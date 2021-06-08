import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CarService from "@/views/CarService";
import Car from "@/views/Car";
import Office from "@/views/Office";
import IndexMenuUser from "@/views/IndexMenuUser";
import IndexMenuAdmin from "@/views/IndexMenuAdmin";
import SearchCars from "@/views/SearchCars";
import AddCar from "@/views/AddCar";
import CarUpdate from "@/views/CarUpdate";
import AddOffice from "@/views/AddOffice";
import OfficeUpdate from "@/views/OfficeUpdate";
import Login from "@/views/Login";
import OfficeUser from "@/views/OfficeUser";
import SearchCars2 from "@/views/SearchCars2";
import SearchCars3 from "@/views/SearchCars3";
import AddCarToOffice from "@/views/AddCarToOffice";
import ReportService from "@/views/ReportService";

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        // redirect: "/login"
    },
    {
        path: '/user',
        name: 'Car Service',
        component: IndexMenuUser,
        // redirect: "/office",
        children: [
            {
                path: "/user/office",
                name: 'OfficeUser',
                component: OfficeUser,
                // children:[
                //   {
                //     path:"/user/office/car",
                //     name: 'SearchCars',
                //     component: SearchCars,
                //   }
                // ]
            },
            {
                path: "/user/car",
                name: 'Car',
                component: CarService
            }
        ]
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // },
    {
        path: '/user',
        name: 'Booking Service',
        component: IndexMenuUser,
        children: [
            {
                path: "/user/office",
                name: 'OfficeUser',
                component: OfficeUser
            },
            {
                path: "/user/car",
                name: 'Car',
                component: CarService
            }
        ]
    }, {
        path: '/user',
        name: 'Search Service',
        component: IndexMenuUser,
        children: [{
            path: "/user/office/cars",
            name: 'SearchCars',
            component: SearchCars
        },{
            path: "/user/office/cars2",
            name: 'SearchCars2',
            component: SearchCars2
        },{
            path: "/user/office/cars3",
            name: 'SearchCars3',
            component: SearchCars3
        }]
    },
    {
        path: '/admin',
        name: 'Report Service',
        component: IndexMenuAdmin,
        children: [
            {
                path: "/admin/office",
                name: 'Office',
                component: Office
            },
            {
                path: "/addOffice",
                name: 'AddOffice',
                component: AddOffice
            },
            {
                path: "/officeUpdate",
                name: 'OfficeUpdate',
                component: OfficeUpdate
            },
            {
                path: "/admin/car",
                name: 'Car',
                component: Car
            },
            {
                path: "/admin/addCar",
                name: 'AddCar',
                component: AddCar
            },
            {
                path: "/admin/carUpdate",
                name: 'CarUpdate',
                component: CarUpdate
            },
            {
                path: "/admin/addCarToOffice",
                name: 'AddCarToOffice',
                component: AddCarToOffice
            },
            {
                path: "/admin/office/cars",
                name: 'SearchCars',
                component: SearchCars
            },
            {
                path: "/admin/report",
                name: 'ReportService',
                component: ReportService
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
