<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH TRANSAKSI DEPOSIT UANG</h4>
                        <hr />
                        <form @submit.prevent="store">

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Member</label>
                                <select class="form-control" v-model="transaksi_deposit_uang.id_member">
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
                                <label for="content" class="form-label">Jumlah Deposit</label>
                                <input type="number" class="form-control" v-model="transaksi_deposit_uang.jumlah_deposit"
                                    placeholder="Masukkan Jumlah Bayar" />
                                <!-- validation -->
                                <div v-if="validation.jumlah_deposit" class="mt-2 alert alert-danger">
                                    {{ validation.jumlah_deposit[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Promo</label>
                                <select class="form-control" v-model="transaksi_deposit_uang.id_promo">
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
            //state transaksi_deposit_uang
            const transaksi_deposit_uang = reactive({
                id_member: "",
                id_pegawai: "",
                jumlah_deposit: "",
                id_promo: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();

            let members = ref([]);
            let pegawais = ref([]);
            let users = ref([]);
            let promos = ref([]);

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
                
            })

            //method store
            function store() {
                let id_member = transaksi_deposit_uang.id_member;
                const id_pegawai = localStorage.getItem('id_pegawai');
                let jumlah_deposit = transaksi_deposit_uang.jumlah_deposit;
                let id_promo = transaksi_deposit_uang.id_promo;
                let toast = useToast();

                const token = localStorage.getItem('token')
                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios
                    .post("http://127.0.0.1:8000/api/transaksiDepositUang", {
                        id_member: id_member,
                        id_pegawai: id_pegawai,
                        jumlah_deposit: jumlah_deposit,
                        id_promo: id_promo,
                    })
                    .then(() => {
                        toast.success("Berhasil Tambah Data !",{
                            timeout: 2000
                        })
                        //redirect ke post index
                        router.push({
                            name: "kasir.transaksideposituang.index",
                        });
                    })
                    .catch((error) => {
                        toast.error("Minimal transaksi adalah Rp500.000 !",{
                            timeout: 2000
                        })
                        //assign state validation with error
                        validation.value = error.response.data
                    });
            }
            //return
            return {
                transaksi_deposit_uang,
                members,
                pegawais,
                users,
                promos,
                validation,
                router,
                store,
            };
        },
    };

</script>
<style>

</style>
