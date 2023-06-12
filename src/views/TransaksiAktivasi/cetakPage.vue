<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body" id="print-form">
                        <h4>STRUK TRANSAKSI AKTIVASI</h4>
                        <hr />
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nomor Struk</label>
                                <input disabled type="text" class="form-control" v-model="transaksi_aktivasi.nomor_struk"
                                    />
                                <!-- validation -->
                                <div v-if="validation.nomor_struk" class="mt-2 alert alert-danger">
                                    {{ validation.nomor_struk[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Member</label>
                                <select disabled class="form-control" v-model="transaksi_aktivasi.id_member">
                                    <option value="" selected hidden disabled></option>
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
                                <select disabled class="form-control" v-model="transaksi_aktivasi.id_member">
                                    <option value="" selected hidden disabled></option>
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
                                <select disabled class="form-control" v-model="transaksi_aktivasi.id_pegawai">
                                    <option value="" selected hidden disabled></option>
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
                                <select disabled class="form-control" v-model="transaksi_aktivasi.id_pegawai">
                                    <option value="" selected hidden disabled></option>
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
                                <label for="content" class="form-label">Jumlah Bayar</label>
                                <input disabled type="number" class="form-control" v-model="transaksi_aktivasi.jumlah_bayar"
                                    />
                                <!-- validation -->
                                <div v-if="validation.jumlah_bayar" class="mt-2 alert alert-danger">
                                    {{ validation.jumlah_bayar[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Mulai</label>
                                <input disabled type="text" class="form-control" v-model="transaksi_aktivasi.tanggal_mulai"
                                    />
                                <!-- validation -->
                                <div v-if="validation.tanggal_mulai" class="mt-2 alert alert-danger">
                                    {{ validation.tanggal_mulai[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Berakhir</label>
                                <input disabled type="text" class="form-control" v-model="transaksi_aktivasi.tanggal_berakhir"
                                    />
                                <!-- validation -->
                                <div v-if="validation.tanggal_berakhir" class="mt-2 alert alert-danger">
                                    {{ validation.tanggal_berakhir[0] }}
                                </div>
                            </div>
                        </form>
                    </div>

                    <button type="button" class="btn btn-primary mt-0 m-3" @click="printForm">
                        Cetak Struk
                    </button>
                    <router-link :to="{ name: 'kasir.transaksiaktivasi.index' }" class="btn btn-warning mt-0 m-3">
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
            //state transaksi_aktivasi
            const transaksi_aktivasi = reactive({
                nomor_struk: "",
                id_member: "",
                id_pegawai: "",
                jumlah_bayar: "",
                id_kelas: "",
                bonus_kelas: "",
                jumlah_kelas: "",
                total_kelas: "",
                tanggal_mulai: "",
                tanggal_berakhir: "",
            });

            let members = ref([]);
            let pegawais = ref([]);
            let users = ref([]);
            let kelass = ref([]);

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

                axios.get('https://200710569.gofit.backend.given.website/api/kelas')
                    .then(response => {
                        kelass.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios
                    .get("https://200710569.gofit.backend.given.website/api/transaksiAktivasi/" + id, )
                    .then(response => {
                        //assign state posts with response data
                        transaksi_aktivasi.nomor_struk = response.data.data.nomor_struk
                        transaksi_aktivasi.id_member = response.data.data.id_member
                        transaksi_aktivasi.id_pegawai = response.data.data.id_pegawai
                        transaksi_aktivasi.jumlah_bayar = response.data.data.jumlah_bayar
                        transaksi_aktivasi.id_kelas = response.data.data.id_kelas
                        transaksi_aktivasi.bonus_kelas = response.data.data.bonus_kelas
                        transaksi_aktivasi.jumlah_kelas = response.data.data.jumlah_kelas
                        transaksi_aktivasi.total_kelas = response.data.data.total_kelas
                        transaksi_aktivasi.tanggal_mulai = response.data.data.tanggal_mulai
                        transaksi_aktivasi.tanggal_berakhir = response.data.data.tanggal_berakhir
                    }).catch(error => {
                        console.log(error.response.data)
                    })
            })

            function printForm() {
                const element = document.getElementById('print-form');
                const options = {
                margin: 10,
                filename: 'transaksi_aktivasi.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

        html2pdf().set(options).from(element).save();
      }
            //return
            return {
                transaksi_aktivasi,
                members,
                pegawais,
                users,
                kelass,
                validation,
                router,
                printForm,
            };
        },
    };
</script>
<style>

</style>