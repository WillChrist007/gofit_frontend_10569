<template>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-striped table-bordered mt-4 table-responsive">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NOMOR BOOKING</th>
                                    <th scope="col">NAMA MEMBER</th>
                                    <th scope="col">TANGGAL BOOKING</th>
                                    <th scope="col">TANGGAL KELAS</th>
                                    <th scope="col">WAKTU KELAS</th>
                                    <th scope="col">NAMA KELAS</th>
                                    <th scope="col">WAKTU PRESENSI</th>
                                    <th scope="col">METODE PEMBAYARAN</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(booking_kelas, id) in booking_kelass" :key="id">

                                    <td>{{ booking_kelas.nomor_booking }}</td>

                                    <template v-for="(member, id) in users" :key="id">
                                        <td v-if="member.id_member === booking_kelas.id_member">{{ member.nama }}</td>
                                    </template>

                                    <td>{{ booking_kelas.tanggal_booking }}</td>
                                    <td>{{ booking_kelas.tanggal_jadwal }}</td>
                                    <td>{{ booking_kelas.waktu_kelas }}</td>

                                    <template v-for="(kelas, id) in kelass" :key="id">
                                        <td v-if="kelas.id === booking_kelas.id_kelas">{{ kelas.nama_kelas }}</td>
                                    </template>
                                    
                                    <td>{{ booking_kelas.waktu_presensi }}</td>
                                    
                                    <td>{{ booking_kelas.metode_pembayaran }}</td>

                                    <template v-if="booking_kelas.waktu_presensi === '-'">                                    
                                        <td class="text-center">
                                            <router-link
                                                :to="{ name: 'kasir.presensikelas.cetak.reguler', params: { id: booking_kelas.id } }"
                                                class="btn btn-sm btn-warning mr-1 disabled">
                                                CETAK
                                            </router-link>
                                        </td>
                                    </template>
                                    <template v-else>  
                                        <template v-if="booking_kelas.metode_pembayaran === 'deposit uang'">                                    
                                            <td class="text-center">
                                                <router-link
                                                    :to="{ name: 'kasir.presensikelas.cetak.reguler', params: { id: booking_kelas.id } }"
                                                    class="btn btn-sm btn-warning mr-1">
                                                    CETAK REGULER
                                                </router-link>
                                            </td>
                                        </template>
                                        <template v-else>  
                                            <td class="text-center">
                                                <router-link
                                                    :to="{ name: 'kasir.presensikelas.cetak.paket', params: { id: booking_kelas.id } }"
                                                    class="btn btn-sm btn-warning mr-1">
                                                    CETAK PAKET
                                                </router-link>
                                            </td>
                                        </template>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {
        onMounted,
        ref
    } from "vue";
    import { useToast } from "vue-toastification";
    

    export default {
        setup() {
            let booking_kelass = ref([]);
            let users = ref([]);
            let kelass = ref([]);
            let searchTerm = ref("");
            let toast = useToast();

            const token = localStorage.getItem('token')
            const validation = ref([]);

            //let toast = useToast();

            onMounted(() => {
                axios.defaults.headers.common = {
                    'Authorization': `Bearer ${token}`
                }

                axios.get('https://200710569.gofit.backend.given.website/api/bookingKelasToday')
                    .then(response => {
                        booking_kelass.value = response.data.data
                        toast.success("Berhasil Menampilkan Data !", {
                            timeout: 2000
                        })
                    }).catch(error => {
                        toast.error("Tidak Ada Booking Kelas Hari Ini !", {
                            timeout: 2000
                        })
                        console.log(error.response.data)
                    })

                axios.get('https://200710569.gofit.backend.given.website/api/user')
                    .then(response => {
                        users.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('https://200710569.gofit.backend.given.website/api/kelas')
                    .then(response => {
                        kelass.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

            })
            
            function presensi(id) {
            axios.put(`https://200710569.gofit.backend.given.website/api/bookingGym/${id}`)
                .then(() => {
                toast.success("Berhasil Presensi Gym !", {
                    timeout: 2000
                })
                window.location.reload();
                }).catch(error => {
                console.log(error.response.data)
                })
            }

            return {
                booking_kelass,
                presensi,
                users,
                kelass,
                searchTerm,
                validation,
            };
        },
    };
</script>

<style scoped>
    .table-responsive {
        overflow-x: auto;
    }

    @media (max-width: 768px) {
        .table-responsive {
            display: block;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }

        .table {
            display: block;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            border-collapse: collapse;
            border-spacing: 0;
        }

        .table thead {
            display: none;
        }

        .table tbody {
            display: block;
            width: 100%;
        }

        .table tbody tr {
            display: block;
            width: 100%;
            margin-bottom: 10px;
            border-bottom: 1px solid #ccc;
        }

        .table tbody td {
            display: block;
            text-align: right;
            font-size: 13px;
            border-bottom: none;
            position: relative;
            padding-left: 50%;
            text-align: right;
        }

        .table tbody td:before {
            content: attr(data-label);
            position: absolute;
            left: 0;
            width: 50%;
            padding-left: 15px;
            font-weight: bold;
            text-align: left;
        }
    }
</style>