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
            //menu admin
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
            //menu manager
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
                path: "/jadwalharian",
                name: "manager.jadwalharian.index",
                component: () => import("@/views/JadwalHarian/indexPage.vue"),
            },
            {
                path: "/jadwalharian/edit",
                name: "manager.jadwalharian.edit",
                component: () => import("@/views/JadwalHarian/editPage.vue"),
            },
            {
                path: "/ijininstruktur",
                name: "manager.ijininstruktur.index",
                component: () => import("@/views/IjinInstruktur/indexPage.vue"),
            },
            {
                path: "/laporan",
                name: "manager.laporan",
                component: () => import("@/views/Laporan/menuPage.vue"),
            },
            {
                path: "/laporan/pendapatan",
                name: "manager.laporan.pendapatan",
                component: () => import("@/views/Laporan/pendapatanPage.vue"),
            },
            {
                path: "/laporan/kelas",
                name: "manager.laporan.kelas",
                component: () => import("@/views/Laporan/aktivitasKelasPage.vue"),
            },
            {
                path: "/laporan/gym",
                name: "manager.laporan.gym",
                component: () => import("@/views/Laporan/aktivitasGymPage.vue"),
            },
            {
                path: "/laporan/kinerja",
                name: "manager.laporan.kinerja",
                component: () => import("@/views/Laporan/kinerjaInstrukturPage.vue"),
            },
            //menu kasir
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
            {
                path: "/transaksiaktivasi",
                name: "kasir.transaksiaktivasi.index",
                component: () => import("@/views/TransaksiAktivasi/indexPage.vue"),
            },
            {
                path: "/transaksiaktivasi/create",
                name: "kasir.transaksiaktivasi.create",
                component: () => import("@/views/TransaksiAktivasi/createPage.vue"),
            },
            {
                path: "/transaksiaktivasi/cetak",
                name: "kasir.transaksiaktivasi.cetak",
                component: () => import("@/views/TransaksiAktivasi/cetakPage.vue"),
            },
            {
                path: "/transaksideposituang",
                name: "kasir.transaksideposituang.index",
                component: () => import("@/views/TransaksiDepositUang/indexPage.vue"),
            },
            {
                path: "/transaksideposituang/create",
                name: "kasir.transaksideposituang.create",
                component: () => import("@/views/TransaksiDepositUang/createPage.vue"),
            },
            {
                path: "/transaksideposituang/cetak",
                name: "kasir.transaksideposituang.cetak",
                component: () => import("@/views/TransaksiDepositUang/cetakPage.vue"),
            },
            {
                path: "/transaksidepositkelas",
                name: "kasir.transaksidepositkelas.index",
                component: () => import("@/views/TransaksiDepositKelas/indexPage.vue"),
            },
            {
                path: "/transaksidepositkelas/create",
                name: "kasir.transaksidepositkelas.create",
                component: () => import("@/views/TransaksiDepositKelas/createPage.vue"),
            },
            {
                path: "/transaksidepositkelas/cetak",
                name: "kasir.transaksidepositkelas.cetak",
                component: () => import("@/views/TransaksiDepositKelas/cetakPage.vue"),
            },
            {
                path: "/presensigym",
                name: "kasir.presensigym.index",
                component: () => import("@/views/PresensiGym/indexPage.vue"),
            },
            {
                path: "/presensigym",
                name: "kasir.presensigym.cetak",
                component: () => import("@/views/PresensiGym/cetakPage.vue"),
            },
            {
                path: "/presensikelas",
                name: "kasir.presensikelas.index",
                component: () => import("@/views/PresensiKelas/indexPage.vue"),
            },
            {
                path: "/presensikelas/cetakReguler",
                name: "kasir.presensikelas.cetak.reguler",
                component: () => import("@/views/PresensiKelas/cetakRegulerPage.vue"),
            },
            {
                path: "/presensikelas/cetakPaket",
                name: "kasir.presensikelas.cetak.paket",
                component: () => import("@/views/PresensiKelas/cetakPaketPage.vue"),
            },
            //sistem
            {
                path: "/sistem",
                name: "sistem",
                component: () => import("@/views/Sistem/menuPage.vue"),
            },
            {
                path: "/sistem/member",
                name: "sistem.member.index",
                component: () => import("@/views/Sistem/memberPage.vue"),
            },
            {
                path: "/sistem/deposit",
                name: "sistem.deposit.index",
                component: () => import("@/views/Sistem/depositPage.vue"),
            },
            {
                path: "/sistem/instruktur",
                name: "sistem.instruktur.index",
                component: () => import("@/views/Sistem/instrukturPage.vue"),
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