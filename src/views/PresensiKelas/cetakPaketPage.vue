<template>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body" id="print-form">
                        <template v-for="(booking_kelas, id) in booking_kelass" :key="id">
                            <h4>GoFit</h4>
                            <p>Jl. Centralpark No. 10 Yogyakarta</p>
                            <br>
                            <h4>STRUK PRESENSI GYM</h4>
                            <p>Nomor Struk : {{ booking_kelas.nomor_booking }}</p>
                            <p>Tanggal : {{ booking_kelas.waktu_presensi }}</p>
                            <p>Waktu Kelas : {{ booking_kelas.waktu_kelas }}</p>
                            <template v-for="(kelas, id) in kelass" :key="id">
                                <p v-if="kelas.id === booking_kelas.id_kelas">Kelas : {{ kelas.nama_kelas }}</p>
                            </template>
                            <template v-for="(user, id) in users" :key="id">
                                <p v-if="user.id_instruktur === booking_kelas.id_instruktur">instruktur : {{ user.nama }}</p>
                            </template>
                            <template v-for="(kelas, id) in kelass" :key="id">
                                <p v-if="kelas.id === booking_kelas.id_kelas">Tarif : Rp{{ kelas.harga_kelas }}</p>
                            </template>
                            <br>
                            <h4>Member</h4>
                            <template v-for="(user, id) in users" :key="id">
                                <p v-if="user.id_member === booking_kelas.id_member">Nama : {{ user.nama }}</p>
                            </template>
                            <template v-for="(member, id) in members" :key="id">
                                <p v-if="member.id === booking_kelas.id_member">Id Member : {{ member.id_member }}</p>
                            </template>
                            <template v-for="(deposit_kelas, id) in deposit_kelass" :key="id">
                                <template v-if="deposit_kelas.id_member === booking_kelas.id_member">
                                        <p v-if="deposit_kelas.id_kelas === booking_kelas.id_kelas">Sisa Kelas : {{ deposit_kelas.sisa_kelas }}</p>
                                </template>
                            </template>
                            <template v-for="(deposit_kelas, id) in deposit_kelass" :key="id">
                                <template v-if="deposit_kelas.id_member === booking_kelas.id_member">
                                        <p v-if="deposit_kelas.id_kelas === booking_kelas.id_kelas">Masa Berlaku : {{ deposit_kelas.masa_berlaku }}</p>
                                </template>
                            </template>
                        </template>
                    </div>
                    <button type="button" class="btn btn-primary m-2" @click="printForm">Cetak Struk</button>
                    <router-link :to="{ name: 'kasir.presensikelas.index' }" class="btn btn-warning m-2">
                        Kembali
                    </router-link>
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
    import { useRouter, useRoute } from "vue-router";
    import { useToast } from "vue-toastification";
    import html2pdf from 'html2pdf.js';    

    export default {
        setup() {
            let booking_kelass = ref([]);
            let users = ref([]);
            let members = ref([]);
            let kelass = ref([]);
            let deposit_kelass = ref([]);
            let searchTerm = ref("");
            let toast = useToast();
            //vue router
            const router = useRouter();
            //params id
            const route = useRoute();
            const id = route.params.id

            const token = localStorage.getItem('token')
            const validation = ref([]);

            //let toast = useToast();

            onMounted(() => {
                axios.defaults.headers.common = {
                    'Authorization': `Bearer ${token}`
                }

                axios.get('https://200710569.gofit.backend.given.website/api/bookingKelas/'+ id,)
                    .then(response => {
                        booking_kelass.value = response.data.data
                        toast.success("Berhasil Menampilkan Data !", {
                            timeout: 2000
                        })
                    }).catch(error => {
                        toast.error("Tidak Ada Booking Gym Hari Ini !", {
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

                axios.get('https://200710569.gofit.backend.given.website/api/member')
                    .then(response => {
                        members.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('https://200710569.gofit.backend.given.website/api/kelas')
                    .then(response => {
                        kelass.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })
                
                axios.get('https://200710569.gofit.backend.given.website/api/depositKelas')
                    .then(response => {
                        deposit_kelass.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })
            })

            function printForm() {
                const element = document.getElementById('print-form');
                const options = {
                margin: 10,
                filename: 'presensi_kelas_paket.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

                html2pdf().set(options).from(element).save();
            }

            return {
                router,
                booking_kelass,
                printForm,
                users,
                members,
                kelass,
                deposit_kelass,
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