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

                        <button class="btn btn-md btn-success mb-4" @click="generate">
                            GENERATE JADWAL UMUM
                        </button> &nbsp;
                        <router-link :to="{ name: 'manager.jadwalumum.create'}" class="btn btn-md btn-primary mb-4">
                            TAMBAH MANUAL
                        </router-link> 

                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Cari data..." v-model="searchTerm" />
                        </div>
                        <table class="table table-striped table-bordered mt-4 table-responsive">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">HARI</th>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">INSTRUKTUR</th>
                                    <th scope="col">JAM</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(jadwal_umum, id) in filteredJadwalUmums" :key="id">

                                    <td>{{ jadwal_umum.hari }}</td>

                                    <template v-for="(kelas, id) in kelass" :key="id">
                                        <td v-if="kelas.id === jadwal_umum.id_kelas">{{ kelas.nama_kelas }}</td>
                                    </template>

                                    <template v-for="(user, id) in users" :key="id">
                                        <td v-if="user.id_instruktur === jadwal_umum.id_instruktur">{{ user.nama }}</td>
                                    </template>

                                    <td>{{ jadwal_umum.jam_kelas }}</td>

                                    <td class="text-center">
                                        <router-link
                                            :to="{ name: 'manager.jadwalumum.edit', params: { id: jadwal_umum.id } }"
                                            class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link> &nbsp;
                                        <button class="btn btn-sm btn-danger ml-1" @click="remove(jadwal_umum.id)">
                                            DELETE
                                        </button>
                                    </td>
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
    import {
        useToast
    } from "vue-toastification";

    export default {
        setup() {
            let jadwal_umums = ref([]);
            let kelass = ref([]);
            let instrukturs = ref([]);
            let users = ref([]);
            let searchTerm = ref("");

            const token = localStorage.getItem('token')

            let toast = useToast();

            onMounted(() => {
                axios.defaults.headers.common = {
                    'Authorization': `Bearer ${token}`
                }

                axios.get('https://200710569.gofit.backend.given.website/api/jadwalUmum')
                    .then(response => {
                        jadwal_umums.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('https://200710569.gofit.backend.given.website/api/kelas')
                    .then(response => {
                        kelass.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('https://200710569.gofit.backend.given.website/api/instruktur')
                    .then(response => {
                        instrukturs.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('https://200710569.gofit.backend.given.website/api/userInstruktur')
                    .then(response => {
                        users.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

            })
            //method generate
            function generate() {
                axios.get(`https://200710569.gofit.backend.given.website/api/jadwalUmum/generate-jadwal`)
                    .then(() => {
                        toast.error("Berhasil Generate Jadwal !", {
                            timeout: 2000
                        })
                        window.location.reload();
                    }).catch(error => {
                        console.log(error.response.data)
                    })
            }

            //method delete
            function remove(id) {
                axios.delete(`https://200710569.gofit.backend.given.website/api/jadwalUmum/${id}`)
                    .then(() => {
                        toast.error("Berhasil Hapus Data !", {
                            timeout: 2000
                        })
                        window.location.reload();
                    }).catch(error => {
                        console.log(error.response.data)
                    })
            }

            return {
                jadwal_umums,
                kelass,
                instrukturs,
                users,
                searchTerm,
                generate,
                remove,
            };
        },

        computed: {
            filteredJadwalUmums() {
                return this.jadwal_umums.filter((jadwal_umum) => {
                    const searchTermLower = this.searchTerm.toLowerCase();
                    const kelas = this.kelass.find((kelas) => kelas.id === jadwal_umum.id_kelas);
                    return (
                        jadwal_umum.hari.toLowerCase().includes(searchTermLower) ||
                        jadwal_umum.jam_kelas.toLowerCase().includes(searchTermLower) ||
                        (kelas && kelas.nama_kelas.toLowerCase().includes(searchTermLower))
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