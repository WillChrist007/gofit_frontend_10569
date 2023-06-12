<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH TRANSAKSI AKTIVASI</h4>
                        <hr />
                        <form @submit.prevent="store">

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Member</label>
                                <select class="form-control" v-model="transaksi_aktivasi.id_member">
                                    <option value="" selected hidden disabled>Pilih Member</option>
                                    <option v-for="item in members" :key="item.id" :value="item.id_member">
                                        {{ item.nama }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.id_kelas[0] }}
                                </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jumlah Bayar</label>
                                <input type="number" class="form-control" v-model="transaksi_aktivasi.jumlah_bayar"
                                    placeholder="Masukkan Jumlah Bayar" />
                                <!-- validation -->
                                <div v-if="validation.jumlah_bayar" class="mt-2 alert alert-danger">
                                    {{ validation.jumlah_bayar[0] }}
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    import { useToast } from "vue-toastification";
    export default {
        setup() {
            //state transaksi_aktivasi
            const transaksi_aktivasi = reactive({
                id_member: "",
                id_pegawai: "",
                jumlah_bayar: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();

            let members = ref([]);
            let pegawais = ref([]);
            let users = ref([]);

            onMounted(() => {
                //get API from Laravel Backend
                axios.get('http://127.0.0.1:8000/api/userMember')
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

            //method store
            function store() {
                let id_member = transaksi_aktivasi.id_member;
                const id_pegawai = localStorage.getItem('id_pegawai');
                let jumlah_bayar = transaksi_aktivasi.jumlah_bayar;
                let toast = useToast();

                const token = localStorage.getItem('token')
                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios
                    .post("http://127.0.0.1:8000/api/transaksiAktivasi", {
                        id_member: id_member,
                        id_pegawai: id_pegawai,
                        jumlah_bayar: jumlah_bayar,
                    })
                    .then(() => {
                        toast.success("Berhasil Tambah Data !",{
                            timeout: 2000
                        })
                        //redirect ke post index
                        router.push({
                            name: "kasir.transaksiaktivasi.index",
                        });
                    })
                    .catch((error) => {
                        toast.error("Minimal Transaksi Rp3.000.000 !",{
                            timeout: 2000
                        })
                        //assign state validation with error
                        validation.value = error.response.data
                    });
            }
            //return
            return {
                transaksi_aktivasi,
                members,
                pegawais,
                users,
                validation,
                router,
                store,
            };
        },
    };

</script>
<style>

</style>
