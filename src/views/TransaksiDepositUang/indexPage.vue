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

                        <router-link :to="{ name: 'kasir.transaksideposituang.create' }" class="btn btn-md btn-success mb-4">
                            TAMBAH TRANSAKSI
                        </router-link>

                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Cari data..." v-model="searchTerm" />
                        </div>
                        <table class="table table-striped table-bordered mt-4 table-responsive">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NOMOR STRUK</th>
                                    <th scope="col">MEMBER</th>
                                    <th scope="col">PEGAWAI</th>
                                    <th scope="col">JUMLAH DEPOSIT</th>
                                    <th scope="col">BONUS DEPOSIT</th>
                                    <th scope="col">SISA DEPOSIT</th>
                                    <th scope="col">TOTAL DEPOSIT</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(transaksi_deposit_uang, id) in filteredTransaksiAktivasis" :key="id">

                                    <td>{{ transaksi_deposit_uang.nomor_struk }}</td>

                                    <template v-for="(user, id) in users" :key="id">
                                        <td v-if="user.id_member === transaksi_deposit_uang.id_member">{{ user.nama }}</td>
                                    </template>

                                    <template v-for="(user, id) in users" :key="id">
                                        <td v-if="user.id_pegawai === transaksi_deposit_uang.id_pegawai">{{ user.nama }}</td>
                                    </template>

                                    <td>{{ transaksi_deposit_uang.jumlah_deposit }}</td>
                                    <td>{{ transaksi_deposit_uang.bonus_deposit }}</td>
                                    <td>{{ transaksi_deposit_uang.sisa_deposit }}</td>
                                    <td>{{ transaksi_deposit_uang.total_deposit }}</td>

                                    <td class="text-center">
                                        <router-link
                                            :to="{ name: 'kasir.transaksideposituang.cetak', params: { id: transaksi_deposit_uang.id } }"
                                            class="btn btn-sm btn-primary mr-1">
                                            CETAK
                                        </router-link>
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
    

    export default {
        setup() {
            let transaksi_deposit_uangs = ref([]);
            let members = ref([]);
            let pegawais = ref([]);
            let users = ref([]);
            let searchTerm = ref("");

            const token = localStorage.getItem('token')
            const validation = ref([]);

            //let toast = useToast();

            onMounted(() => {
                axios.defaults.headers.common = {
                    'Authorization': `Bearer ${token}`
                }

                axios.get('http://127.0.0.1:8000/api/transaksiDepositUang')
                    .then(response => {
                        transaksi_deposit_uangs.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('http://127.0.0.1:8000/api/member')
                    .then(response => {
                        members.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('http://127.0.0.1:8000/api/pegawai')
                    .then(response => {
                        pegawais.value = response.data.data
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

            return {
                transaksi_deposit_uangs,
                members,
                pegawais,
                users,
                searchTerm,
                validation,
            };
        },

        computed: {
            filteredTransaksiAktivasis() {
                return this.transaksi_deposit_uangs.filter((transaksi_deposit_uang) => {
                    const searchTermLower = this.searchTerm.toLowerCase();
                    const member = this.users.find((member) => member.id_member === transaksi_deposit_uang.id_member);
                    const pegawai = this.users.find((pegawai) => pegawai.id_pegawai === transaksi_deposit_uang.id_pegawai);

                    return (
                        transaksi_deposit_uang.nomor_struk.toLowerCase().includes(searchTermLower) ||
                        transaksi_deposit_uang.jumlah_deposit.toString().toLowerCase().includes(searchTermLower) ||
                        transaksi_deposit_uang.bonus_deposit.toString().toLowerCase().includes(searchTermLower) ||
                        transaksi_deposit_uang.sisa_deposit.toString().toLowerCase().includes(searchTermLower) ||
                        transaksi_deposit_uang.total_deposit.toString().toLowerCase().includes(searchTermLower) ||
                        (member && member.nama.toLowerCase().includes(searchTermLower)) ||
                        (pegawai && pegawai.nama.toLowerCase().includes(searchTermLower))
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