<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT JADWAL HARIAN</h4>
                        <hr />
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Hari</label>
                                <input type="text" class="form-control" v-model="jadwal_harian.tanggal_jadwal" disabled
                                    placeholder="Masukkan tanggal_jadwal" />
                                <!-- validation -->
                                <div v-if="validation.tanggal_jadwal" class="mt-2 alert alert-danger">
                                    {{ validation.tanggal_jadwal[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jam</label>
                                <select disabled class="form-control" v-model="jadwal_harian.jam_kelas">
                                    <option value="" selected hidden disabled>Pilih Jam</option>
                                    <option value="7 am">7 am</option>
                                    <option value="9 am">9 am</option>
                                    <option value="11 am">11 am</option>
                                    <option value="1 pm">1 pm</option>
                                    <option value="3 pm">3 pm</option>
                                    <option value="5 pm">5 pm</option>
                                    <option value="7 pm">7 pm</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.jam_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.jam_kelas[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Kelas</label>
                                <select class="form-control" v-model="jadwal_harian.id_kelas">
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
                                <label for="content" class="form-label">Instruktur</label>
                                <select class="form-control" v-model="jadwal_harian.id_instruktur">
                                    <option value="" selected hidden disabled>Pilih Instruktur</option>
                                    <option v-for="item in users" :key="item.id" :value="item.id_instruktur">
                                        {{ item.nama }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_instruktur" class="mt-2 alert alert-danger">
                                    {{ validation.id_instruktur[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Status</label>
                                <input type="text" class="form-control" v-model="jadwal_harian.status"
                                    placeholder="Sesuai Dengan Jadwal" />
                                <!-- validation -->
                                <div v-if="validation.status" class="mt-2 alert alert-danger">
                                    {{ validation.status[0] }}
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
    import {
        reactive,
        ref,
        onMounted
    } from "vue";
    import {
        useRouter,
        useRoute
    } from "vue-router";
    import axios from "axios";
    import {
        useToast
    } from "vue-toastification";
    export default {
        setup() {
            //state jadwal_harian
            const jadwal_harian = reactive({
                id_kelas: "",
                id_instruktur: "",
                tanggal_jadwal: "",
                jam_kelas: "",
                status: "",
            });

            let kelass = ref([]);
            let instrukturs = ref([]);
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
                axios.get('http://127.0.0.1:8000/api/kelas')
                    .then(response => {
                        kelass.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })
                axios.get('http://127.0.0.1:8000/api/instruktur')
                    .then(response => {
                        instrukturs.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('http://127.0.0.1:8000/api/userInstruktur')
                    .then(response => {
                        users.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })
                axios
                    .get("http://127.0.0.1:8000/api/jadwalHarian/" + id, )
                    .then(response => {
                        //assign state posts with response data
                        jadwal_harian.id_kelas = response.data.data.id_kelas
                        jadwal_harian.id_instruktur = response.data.data.id_instruktur
                        jadwal_harian.tanggal_jadwal = response.data.data.tanggal_jadwal
                        jadwal_harian.jam_kelas = response.data.data.jam_kelas
                        jadwal_harian.status = response.data.data.status
                    }).catch(error => {
                        console.log(error.response.data)
                    })
            })

            //method update
            function update() {
                let id_kelas = jadwal_harian.id_kelas;
                let id_instruktur = jadwal_harian.id_instruktur;
                let tanggal_jadwal = jadwal_harian.tanggal_jadwal;
                let jam_kelas = jadwal_harian.jam_kelas;
                let status = jadwal_harian.status;

                let toast = useToast();
                axios
                    .put("http://127.0.0.1:8000/api/jadwalHarian/" + id, {
                        id_kelas: id_kelas,
                        id_instruktur: id_instruktur,
                        tanggal_jadwal: tanggal_jadwal,
                        jam_kelas: jam_kelas,
                        status: status,
                    })
                    .then(() => {
                        toast.success("Berhasil Edit Data !", {
                            timeout: 2000
                        })
                        //redirect ke post index
                        router.push({
                            name: "manager.jadwalharian.index",
                        });
                    })
                    .catch((error) => {
                        toast.error("Jadwal Bertabrakan !", {
                            timeout: 2000
                        })
                        //assign state validation with error
                        validation.value = error.response.data;
                    });
            }
            //return
            return {
                jadwal_harian,
                kelass,
                instrukturs,
                users,
                validation,
                router,
                update,
            };
        },
    };
</script>
<style>

</style>