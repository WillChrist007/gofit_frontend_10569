<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3">
            GOFIT 
            <span v-if="role" class="text-muted">({{ role }})</span>
        </a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </header>
    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">                    
                    <ul v-if="role === 'Admin'" class="nav flex-column">
                        <li class="nav-item">
                            <router-link :to="{ name: 'admin.pegawai.index' }" class="nav-link">Pegawai</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'admin.instruktur.index' }" class="nav-link">Instruktur</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'admin.promo.index' }" class="nav-link">Promo</router-link>
                        </li>
                    </ul>
                    <ul v-if="role === 'MO'" class="nav flex-column">
                        <li class="nav-item">
                            <router-link :to="{ name: 'manager.kelas.index' }" class="nav-link">Kelas</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'manager.jadwalumum.index' }" class="nav-link">Jadwal Umum</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'manager.jadwalharian.index' }" class="nav-link">Jadwal Harian</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'manager.ijininstruktur.index' }" class="nav-link">Ijin Instruktur</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'manager.laporan' }" class="nav-link">Laporan</router-link>
                        </li>
                    </ul>                    
                    <ul v-if="role === 'Kasir'" class="nav flex-column">
                        <li class="nav-item">
                            <router-link :to="{ name: 'kasir.member.index' }" class="nav-link">Member</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'kasir.transaksiaktivasi.index' }" class="nav-link">Transaksi Aktivasi</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'kasir.transaksideposituang.index' }" class="nav-link">Transaksi Deposit Uang</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'kasir.transaksidepositkelas.index' }" class="nav-link">Transaksi Deposit Kelas</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'kasir.presensigym.index' }" class="nav-link">Presensi Gym</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'kasir.presensikelas.index' }" class="nav-link">Presensi Kelas</router-link>
                        </li>
                    </ul>
                </div>
                <div class="position-bottom pt-3">
                    <ul>
                        
                        <li class="nav-item">
                            <router-link :to="{ name: 'sistem' }" class="nav-link">Sistem</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'changepassword' }" class="nav-link">Ganti Password</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link @click.prevent="logout()" :to="{ name: 'login' }" class="nav-link">Log Out</router-link>
                        </li>                        
                    </ul>
                </div>
            </nav>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <!-- View Route -->
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script>
    import { useRouter } from "vue-router";
    import axios from "axios";
    import { useToast } from "vue-toastification";
    import { ref, watch } from "vue";
    export default {
    setup() {
        //inisialisasi vue router on Composition API
        const router = useRouter();
        const role = ref(localStorage.getItem("role"));

        watch(role, (newValue) => {
        role.value = newValue;
        });
        
        let toast = useToast();

        //method logout
        function logout() {
        //logout

        axios
            .post("https://200710569.gofit.backend.given.website/api//logout")
            .then((response) => {
            if (response) {
                toast.error("Berhasil Logout !",{
                            timeout: 2000
                        })
                //remove localStorage
                localStorage.removeItem("token");
                localStorage.removeItem("id");
                localStorage.removeItem("id_pegawai");
                localStorage.removeItem("role");

                //redirect ke halaman login
                router
                .push({
                    name: "login",
                })
            }
            })
            .catch((error) => {
            console.log(error.response.data);
            });
        }

        return {
        logout, // <-- method logout
        role
        };
    },
};
</script>

<style>
    body {
        font-size: 0.875rem;
    }

    .feather {
        width: 16px;
        height: 16px;
        vertical-align: text-bottom;
    }

    /*
* Sidebar
*/
    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        padding: 48px 0 0;
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
    }

    .sidebar-sticky {
        position: relative;
        top: 0;
        height: calc(100vh - 48px);
        padding-top: 0.5rem;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .sidebar .nav-link {
        font-weight: 500;
        color: #333;
    }

    .sidebar .nav-link .feather {
        margin-right: 4px;
        color: #727272;
    }

    .sidebar .nav-link.active {
        color: #2470dc;
    }

    .sidebar .nav-link:hover .feather,
    .sidebar .nav-link.active .feather {
        color: inherit;
    }

    .sidebar-heading {
        font-size: 0.75rem;
        text-transform: uppercase;
    }

    /*
* Navbar
*/
    .navbar-brand {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        font-size: 1rem;
        background-color: rgba(0, 0, 0, 0.25);
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
    }

    .navbar .navbar-toggler {
        top: 0.25rem;
        right: 1rem;
    }

    .navbar .form-control {
        padding: 0.75rem 1rem;
        border-width: 0;
        border-radius: 0;
    }

    .form-control-dark {
        color: #fff;
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.1);
    }

    .form-control-dark:focus {
        border-color: transparent;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
    }
</style>