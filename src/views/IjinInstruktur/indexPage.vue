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

                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Cari data..." v-model="searchTerm" />
                        </div>
                        <table class="table table-striped table-bordered mt-4 table-responsive">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA INSTRUKTUR</th>
                                    <th scope="col">NAMA PENGGANTI</th>
                                    <th scope="col">KETERANGAN</th>
                                    <th scope="col">TANGGAL PENGAJUAN</th>
                                    <th scope="col">TANGGAL IJIN</th>
                                    <th scope="col">TANGGAL KONFIRMASI</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ijin_instruktur, id) in filteredIjinInstruktur" :key="id">

                                    <template v-for="(instruktur, id) in users" :key="id">
                                        <td v-if="instruktur.id === ijin_instruktur.id_instruktur">{{ instruktur.nama }}</td>
                                    </template>

                                    <template v-if="ijin_instruktur.id_pengganti === null">
                                        <td>-</td>
                                    </template>
                                    <template v-else>
                                        <template v-for="(pengganti, id) in users" :key="id">
                                            <td v-if="ijin_instruktur.id_pengganti === null"></td>
                                            <td v-else-if="pengganti.id === ijin_instruktur.id_pengganti">{{ pengganti.nama }}</td>
                                        </template>
                                    </template>

                                    <td>{{ ijin_instruktur.keterangan }}</td>

                                    <td>{{ ijin_instruktur.tanggal_pengajuan }}</td>
                                    <td>{{ ijin_instruktur.tanggal_ijin }}</td>
                                    <td>{{ ijin_instruktur.tanggal_konfirmasi }}</td>
                                    <td>{{ ijin_instruktur.status }}</td>

                                    <template v-if="ijin_instruktur.status === 'belum dikonfirmasi'">                                    
                                        <td class="text-center">
                                            <button @click.prevent="confirmIjin(ijin_instruktur.id)" class="btn btn-sm btn-success ml-1">CONFIRM</button>
                                            &nbsp;
                                            <button @click.prevent="rejectIjin(ijin_instruktur.id)" class="btn btn-sm btn-danger ml-1">REJECT</button>
                                        </td>
                                    </template>
                                    <template v-else>                                    
                                        <td class="text-center">
                                            <button disabled @click.prevent="confirmIjin(ijin_instruktur.id)" class="btn btn-sm btn-success ml-1">CONFIRM</button>
                                            &nbsp;
                                            <button disabled @click.prevent="rejectIjin(ijin_instruktur.id)" class="btn btn-sm btn-danger ml-1">REJECT</button>
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
            let ijin_instrukturs = ref([]);
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

                axios.get('http://127.0.0.1:8000/api/ijinInstruktur')
                    .then(response => {
                        ijin_instrukturs.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('http://127.0.0.1:8000/api/user')
                    .then(response => {
                        users.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

            })
            
            function confirmIjin(id) {
            axios.put(`http://127.0.0.1:8000/api/ijinInstruktur/confirm/${id}`)
                .then(() => {
                toast.success("Berhasil Mengkonfirmasi Ijin !", {
                    timeout: 2000
                })
                window.location.reload();
                }).catch(error => {
                console.log(error.response.data)
                })
            }
            
            function rejectIjin(id) {
            axios.put(`http://127.0.0.1:8000/api/ijinInstruktur/reject/${id}`)
                .then(() => {
                toast.error("Ijin Ditolak !", {
                    timeout: 2000
                })
                window.location.reload();
                }).catch(error => {
                console.log(error.response.data)
                })
            }

            return {
                ijin_instrukturs,
                confirmIjin,
                rejectIjin,
                users,
                searchTerm,
                validation,
            };
        },

        computed: {
            filteredIjinInstruktur() {
                return this.ijin_instrukturs.filter((ijin_instruktur) => {
                    const searchTermLower = this.searchTerm.toLowerCase();
                    const instruktur = this.users.find((instruktur) => instruktur.id_user === ijin_instruktur.id_instruktur);
                    const pengganti = this.users.find((pengganti) => pengganti.id_user === ijin_instruktur.id_pengganti);

                    return (
                        ijin_instruktur.keterangan.toLowerCase().includes(searchTermLower) ||
                        ijin_instruktur.tanggal_pengajuan.toLowerCase().includes(searchTermLower) ||
                        ijin_instruktur.tanggal_ijin.toLowerCase().includes(searchTermLower) ||
                        ijin_instruktur.tanggal_konfirmasi.toLowerCase().includes(searchTermLower) ||
                        ijin_instruktur.status.toLowerCase().includes(searchTermLower) ||
                        (instruktur && instruktur.nama.toLowerCase().includes(searchTermLower)) ||
                        (pengganti && pengganti.nama.toLowerCase().includes(searchTermLower))
                    );
                });
            },
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