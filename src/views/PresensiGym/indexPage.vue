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
                                    <th scope="col">TANGGAL GYM</th>
                                    <th scope="col">WAKTU GYM</th>
                                    <th scope="col">WAKTU PRESENSI</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(booking_gym, id) in booking_gyms" :key="id">

                                    <td>{{ booking_gym.nomor_booking }}</td>

                                    <template v-for="(member, id) in users" :key="id">
                                        <td v-if="member.id_member === booking_gym.id_member">{{ member.nama }}</td>
                                    </template>

                                    <td>{{ booking_gym.tanggal_booking }}</td>
                                    <td>{{ booking_gym.tanggal_gym }}</td>
                                    <td>{{ booking_gym.waktu_gym }}</td>
                                    <td>{{ booking_gym.waktu_presensi }}</td>

                                    <template v-if="booking_gym.waktu_presensi === '-'">                                    
                                        <td class="text-center">
                                            <button @click.prevent="presensi(booking_gym.id)" class="btn btn-sm btn-success ml-1">PRESENSI</button>
                                            &nbsp;
                                            <router-link
                                                :to="{ name: 'kasir.presensigym.cetak', params: { id: booking_gym.id } }"
                                                class="btn btn-sm btn-warning mr-1 disabled">
                                                CETAK
                                            </router-link>
                                        </td>
                                    </template>
                                    <template v-else>                                    
                                        <td class="text-center">
                                            <button disabled @click.prevent="presensi(booking_gym.id)" class="btn btn-sm btn-success ml-1">PRESENSI</button>
                                            &nbsp;
                                            <router-link
                                                :to="{ name: 'kasir.presensigym.cetak', params: { id: booking_gym.id } }"
                                                class="btn btn-sm btn-warning mr-1">
                                                CETAK
                                            </router-link>
                                        </td>
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
            let booking_gyms = ref([]);
            let users = ref([]);
            let searchTerm = ref("");
            let toast = useToast();

            const token = localStorage.getItem('token')
            const validation = ref([]);

            //let toast = useToast();

            onMounted(() => {
                axios.defaults.headers.common = {
                    'Authorization': `Bearer ${token}`
                }

                axios.get('http://127.0.0.1:8000/api/bookingGymToday')
                    .then(response => {
                        booking_gyms.value = response.data.data
                        toast.success("Berhasil Menampilkan Data !", {
                            timeout: 2000
                        })
                    }).catch(error => {
                        toast.error("Tidak Ada Booking Gym Hari Ini !", {
                            timeout: 2000
                        })
                        console.log(error.response.data)
                    })

                axios.get('http://127.0.0.1:8000/api/user')
                    .then(response => {
                        users.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

            })
            
            function presensi(id) {
            axios.put(`http://127.0.0.1:8000/api/bookingGym/${id}`)
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
                booking_gyms,
                presensi,
                users,
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