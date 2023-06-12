<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT JADWAL UMUM</h4>
                        <hr />
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Kelas</label>
                                <select class="form-control" v-model="jadwal_umum.id_kelas">
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
                                <select class="form-control" v-model="jadwal_umum.id_instruktur">
                                    <option value="" selected hidden disabled>Pilih Instruktur</option>
                                    <option v-for="item in users" :key="item.id" :value="item.id_instruktur">
                                        {{ item.nama }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.id_kelas[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Hari</label>
                                <select class="form-control" v-model="jadwal_umum.hari">
                                    <option value="" selected hidden disabled>Pilih Hari</option>
                                    <option value="Senin">Senin</option>
                                    <option value="Selasa">Selasa</option>
                                    <option value="Rabu">Rabu</option>
                                    <option value="Kamis">Kamis</option>
                                    <option value="Jumat">Jumat</option>
                                    <option value="Sabtu">Sabtu</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.id_kelas[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jam</label>
                                <select class="form-control" v-model="jadwal_umum.jam_kelas">
                                    <option value="" selected hidden disabled>Pilih Jam</option>
                                    <option value="07:00:00">07:00:00</option>
                                    <option value="09:00:00">09:00:00</option>
                                    <option value="11:00:00">11:00:00</option>
                                    <option value="13:00:00">13:00:00</option>
                                    <option value="15:00:00">15:00:00</option>
                                    <option value="17:00:00">17:00:00</option>
                                    <option value="19:00:00">19:00:00</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.id_kelas[0] }}
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
    import { useRouter, useRoute } from "vue-router";
    import axios from "axios";
    import { useToast } from "vue-toastification";
    export default {
        setup() {
            //state jadwal_umum
            const jadwal_umum = reactive({
                id_kelas: "",
                id_instruktur: "",
                hari: "",
                jam_kelas: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();
            //params id
            const route = useRoute();
            const id = route.params.id

            const token = localStorage.getItem('token')

            let users = ref([]);
            let instrukturs = ref([]);
            let kelass = ref([]);

            onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            //get API from Laravel Backend
            axios
                .get("http://127.0.0.1:8000/api/jadwalUmum/" + id,)
                .then(response => {
                    //assign state posts with response data
                    jadwal_umum.id_kelas = response.data.data.id_kelas
                    jadwal_umum.id_instruktur = response.data.data.id_instruktur
                    jadwal_umum.hari = response.data.data.hari
                    jadwal_umum.jam_kelas = response.data.data.jam_kelas
                }).catch(error => {
                    console.log(error.response.data)
                })
            
                axios.get('http://127.0.0.1:8000/api/userInstruktur')
                    .then(response => {
                        users.value = response.data.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })

                axios.get('http://127.0.0.1:8000/api/instruktur')
                    .then(response => {
                        instrukturs.value = response.data.data
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

            //method update
            function update() {
                let id_kelas = jadwal_umum.id_kelas;
                let id_instruktur = jadwal_umum.id_instruktur;
                let hari = jadwal_umum.hari;
                let jam_kelas = jadwal_umum.jam_kelas;

                let toast = useToast();
                axios
                    .put("http://127.0.0.1:8000/api/jadwalUmum/" + id, {
                        id_kelas: id_kelas,
                        id_instruktur: id_instruktur,
                        hari: hari,
                        jam_kelas: jam_kelas,
                    })
                    .then(() => {
                        toast.success("Berhasil Edit Data !",{
                            timeout: 2000
                        })
                        //redirect ke post index
                        router.push({
                            name: "manager.jadwalumum.index",
                        });
                    })
                    .catch((error) => {
                        toast.error("Jadwal Bertabrakan !",{
                            timeout: 2000
                        })
                        //assign state validation with error
                        validation.value = error.response.data;
                    });
            }
            //return
            return {
                jadwal_umum,
                users,
                instrukturs,
                kelass,
                validation,
                router,
                update,
            };
        },
    };
</script>
<style>

</style>
