<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body" id="print-form">
                        <h4>STRUK TRANSAKSI DEPOSIT UANG</h4>
                        <hr />
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nomor Struk</label>
                                <input disabled type="text" class="form-control" v-model="transaksi_deposit_uang.nomor_struk"
                                    placeholder="Masukkan Jumlah Bayar" />
                                <!-- validation -->
                                <div v-if="validation.nomor_struk" class="mt-2 alert alert-danger">
                                    {{ validation.nomor_struk[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Member</label>
                                <select disabled class="form-control" v-model="transaksi_deposit_uang.id_member">
                                    <option value="" selected hidden disabled>Pilih Member</option>
                                    <option v-for="item in users" :key="item.id_member" :value="item.id_member">
                                        {{ item.nama }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.nomor_struk" class="mt-2 alert alert-danger">
                                    {{ validation.nomor_struk[0] }}
                                </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">ID Member</label>
                                <select disabled class="form-control" v-model="transaksi_deposit_uang.id_member">
                                    <option value="" selected hidden disabled>Pilih Member</option>
                                    <option v-for="item in members" :key="item.id" :value="item.id">
                                        {{ item.id_member }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.nomor_struk" class="mt-2 alert alert-danger">
                                    {{ validation.nomor_struk[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Kasir</label>
                                <select disabled class="form-control" v-model="transaksi_deposit_uang.id_pegawai">
                                    <option value="" selected hidden disabled>Pilih Pegawai</option>
                                    <option v-for="item in users" :key="item.id_pegawai" :value="item.id_pegawai">
                                        {{ item.nama }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.nomor_struk" class="mt-2 alert alert-danger">
                                    {{ validation.nomor_struk[0] }}
                                </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">ID Pegawai</label>
                                <select disabled class="form-control" v-model="transaksi_deposit_uang.id_pegawai">
                                    <option value="" selected hidden disabled>Pilih Pegawai</option>
                                    <option v-for="item in pegawais" :key="item.id" :value="item.id">
                                        {{ item.id_pegawai }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.nomor_struk" class="mt-2 alert alert-danger">
                                    {{ validation.nomor_struk[0] }}
                                </div>
                            </div>    

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jumlah Deposit</label>
                                <input disabled type="number" class="form-control" v-model="transaksi_deposit_uang.jumlah_deposit"
                                    placeholder="Masukkan Jumlah Bayar" />
                                <!-- validation -->
                                <div v-if="validation.jumlah_deposit" class="mt-2 alert alert-danger">
                                    {{ validation.jumlah_deposit[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Bonus Deposit</label>
                                <input disabled type="text" class="form-control" v-model="transaksi_deposit_uang.bonus_deposit"
                                    placeholder="Masukkan Jumlah Bayar" />
                                <!-- validation -->
                                <div v-if="validation.bonus_deposit" class="mt-2 alert alert-danger">
                                    {{ validation.bonus_deposit[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Sisa Deposit</label>
                                <input disabled type="text" class="form-control" v-model="transaksi_deposit_uang.sisa_deposit"
                                    placeholder="Masukkan Jumlah Bayar" />
                                <!-- validation -->
                                <div v-if="validation.sisa_deposit" class="mt-2 alert alert-danger">
                                    {{ validation.sisa_deposit[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Total Deposit</label>
                                <input disabled type="text" class="form-control" v-model="transaksi_deposit_uang.total_deposit"
                                    placeholder="Masukkan Jumlah Bayar" />
                                <!-- validation -->
                                <div v-if="validation.total_deposit" class="mt-2 alert alert-danger">
                                    {{ validation.total_deposit[0] }}
                                </div>
                            </div>
                        </form>
                    </div>                    
                    <button type="button" class="btn btn-primary mt-0 m-3" @click="printForm">
                        Cetak Struk
                    </button>
                    <router-link :to="{ name: 'kasir.transaksideposituang.index' }" class="btn btn-warning mt-0 m-3">
                        Kembali
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref, onMounted } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import axios from "axios";
    import html2pdf from 'html2pdf.js';
    
    export default {
        setup() {
            //state transaksi_deposit_uang
            const transaksi_deposit_uang = reactive({
                nomor_struk: "",
                id_member: "",
                id_pegawai: "",
                jumlah_deposit: "",
                bonus_deposit: "",
                sisa_deposit: "",
                total_deposit: "",
            });

            let members = ref([]);
            let pegawais = ref([]);
            let users = ref([]);

            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();
            //params id
            const route = useRoute();
            const id = route.params.id

            const token = localStorage.getItem('token')

            onMounted(() => {
                axios.defaults.headers.common = {
                    'Authorization': `Bearer ${token}`
                }
                //get API from Laravel Backend
                axios.get('https://200710569.gofit.backend.given.website/api/member')
                    .then(response => {
                        members.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })
                axios.get('https://200710569.gofit.backend.given.website/api/pegawai')
                    .then(response => {
                        pegawais.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('https://200710569.gofit.backend.given.website/api/user')
                    .then(response => {
                        users.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })
                axios
                    .get("https://200710569.gofit.backend.given.website/api/transaksiDepositUang/" + id, )
                    .then(response => {
                        //assign state posts with response data
                        transaksi_deposit_uang.nomor_struk = response.data.data.nomor_struk
                        transaksi_deposit_uang.id_member = response.data.data.id_member
                        transaksi_deposit_uang.id_pegawai = response.data.data.id_pegawai
                        transaksi_deposit_uang.jumlah_deposit = response.data.data.jumlah_deposit
                        transaksi_deposit_uang.bonus_deposit = response.data.data.bonus_deposit
                        transaksi_deposit_uang.sisa_deposit = response.data.data.sisa_deposit
                        transaksi_deposit_uang.total_deposit = response.data.data.total_deposit
                    }).catch(error => {
                        console.log(error.response.data)
                    })
            })

            function printForm() {
                const element = document.getElementById('print-form');
                const options = {
                margin: 10,
                filename: 'transaksi_deposit_uang.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

        html2pdf().set(options).from(element).save();
      }
            //return
            return {
                transaksi_deposit_uang,
                members,
                pegawais,
                users,
                validation,
                router,
                printForm,
            };
        },
    };
</script>
<style>

</style>