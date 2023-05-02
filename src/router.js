//import vue router
import {
    createRouter,
    createWebHistory
} from 'vue-router'
//define a routes
const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/components/LoginPage.vue'),
    },
    {
        path: '/user',
        name: 'user.beranda',
        component: () => import('@/components/UserDashboard.vue'),
        children: [  
            {
                path: "/welcome",
                name: "welcome",
                component: () => import("@/views/WelcomePage.vue"),
            },
            {
                path: "/changepassword",
                name: "changepassword",
                component: () => import("@/views/ChangePasswordPage.vue"),
            },                
            {
                path: "/pegawai",
                name: "admin.pegawai.index",
                component: () => import("@/views/Pegawai/indexPage.vue"),
            },
            {
                path: "/pegawai/create",
                name: "admin.pegawai.create",
                component: () => import("@/views/Pegawai/createPage.vue"),
            },
            {
                path: "/pegawai/edit",
                name: "admin.pegawai.edit",
                component: () => import("@/views/Pegawai/editPage.vue"),
            },
            {
                path: "/instruktur",
                name: "admin.instruktur.index",
                component: () => import("@/views/Instruktur/indexPage.vue"),
            },
            {
                path: "/instruktur/create",
                name: "admin.instruktur.create",
                component: () => import("@/views/Instruktur/createPage.vue"),
            },
            {
                path: "/instruktur/edit",
                name: "admin.instruktur.edit",
                component: () => import("@/views/Instruktur/editPage.vue"),
            },
            {
                path: "/promo",
                name: "admin.promo.index",
                component: () => import("@/views/Promo/indexPage.vue"),
            },
            {
                path: "/promo/create",
                name: "admin.promo.create",
                component: () => import("@/views/Promo/createPage.vue"),
            },
            {
                path: "/promo/edit",
                name: "admin.promo.edit",
                component: () => import("@/views/Promo/editPage.vue"),
            },
            {
                path: "/kelas",
                name: "manager.kelas.index",
                component: () => import("@/views/Kelas/indexPage.vue"),
            },
            {
                path: "/kelas/create",
                name: "manager.kelas.create",
                component: () => import("@/views/Kelas/createPage.vue"),
            },
            {
                path: "/kelas/edit",
                name: "manager.kelas.edit",
                component: () => import("@/views/Kelas/editPage.vue"),
            },
            {
                path: "/jadwalumum",
                name: "manager.jadwalumum.index",
                component: () => import("@/views/JadwalUmum/indexPage.vue"),
            },
            {
                path: "/jadwalumum/create",
                name: "manager.jadwalumum.create",
                component: () => import("@/views/JadwalUmum/createPage.vue"),
            },
            {
                path: "/jadwalumum/edit",
                name: "manager.jadwalumum.edit",
                component: () => import("@/views/JadwalUmum/editPage.vue"),
            },
            {
                path: "/member",
                name: "kasir.member.index",
                component: () => import("@/views/Member/indexPage.vue"),
            },
            {
                path: "/member/create",
                name: "kasir.member.create",
                component: () => import("@/views/Member/createPage.vue"),
            },
            {
                path: "/member/edit",
                name: "kasir.member.edit",
                component: () => import("@/views/Member/editPage.vue"),
            },
        ],
    },
]
//create router
const router = createRouter({
    history: createWebHistory(),
    routes // config routes
})
export default router;