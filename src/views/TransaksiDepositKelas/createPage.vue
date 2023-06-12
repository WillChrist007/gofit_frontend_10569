<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH TRANSAKSI DEPOSIT KELAS</h4>
                        <hr />
                        <form @submit.prevent="store">

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Member</label>
                                <select class="form-control" v-model="transaksi_deposit_kelas.id_member">
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
                                <label for="content" class="form-label">Jumlah Kelas</label>
                                <select class="form-control" v-model="transaksi_deposit_kelas.jumlah_kelas">
                                    <option value="" selected hidden disabled>Jumlah Kelas Kelas</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.jumlah_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.jumlah_kelas[0] }}
                                </div>
                            </div>    

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Kelas</label>
                                <select class="form-control" v-model="transaksi_deposit_kelas.id_kelas">
                                    <option value="" selected hidden disabled>Pilih Kelas</option>
                                    <option v-for="item in kelass" :key="item.id" :value="item.id">
                                        {{ item.nama_kelas }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.id_kelas[0] }}
                                </div>
                            </div>    

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Promo</label>
                                <select class="form-control" v-model="transaksi_deposit_kelas.id_promo">
                                    <option value="" selected hidden disabled>Pilih Promo</option>
                                    <option v-for="item in promos" :key="item.id" :value="item.id">
                                        {{ item.nama_promo }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_promo" class="mt-2 alert alert-danger">
                                    {{ validation.id_promo[0] }}
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
            //state transaksi_deposit_kelas
            const transaksi_deposit_kelas = reactive({
                id_member: "",
                id_pegawai: "",
                jumlah_kelas: "",
                id_promo: "",
                id_kelas: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();

            let members = ref([]);
            let pegawais = ref([]);
            let users = ref([]);
            let promos = ref([]);
            let kelass = ref([]);

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

                axios.get('http://127.0.0.1:8000/api/promo')
                    .then(response => {
                        promos.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('http://127.0.0.1:8000/api/kelas')
                    .then(response => {
                        kelass.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })
                
            })

            //method store
            function store() {
                let id_member = transaksi_deposit_kelas.id_member;
                const id_pegawai = localStorage.getItem('id_pegawai')
                let jumlah_kelas = transaksi_deposit_kelas.jumlah_kelas;
                let id_promo = transaksi_deposit_kelas.id_promo;
                let id_kelas = transaksi_deposit_kelas.id_kelas;
                let toast = useToast();

                const token = localStorage.getItem('token')
                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios
                    .post("http://127.0.0.1:8000/api/transaksiDepositKelas", {
                        id_member: id_member,
                        id_pegawai: id_pegawai,
                        jumlah_kelas: jumlah_kelas,
                        id_promo: id_promo,
                        id_kelas: id_kelas,
                    })
                    .then(() => {
                        toast.success("Berhasil Tambah Data !",{
                            timeout: 2000
                        })
                        //redirect ke post index
                        router.push({
                            name: "kasir.transaksidepositkelas.index",
                        });
                    })
                    .catch((error) => {
                        toast.error("Member Sudah Mengambil Kelas Tersebut !",{
                            timeout: 2000
                        })
                        //assign state validation with error
                        validation.value = error.response.data
                    });
            }
            //return
            return {
                transaksi_deposit_kelas,
                members,
                pegawais,
                users,
                promos,
                kelass,
                validation,
                router,
                store,
            };
        },
    };

</script>
<style>

</style>
