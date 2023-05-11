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
                                <label class="form-label">Kelas</label>
                                <input type="number" class="form-control" v-model="jadwal_umum.id_kelas"
                                    placeholder="Masukkan id_kelas" />
                                <!-- validation -->
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.id_kelas[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Instruktur</label>
                                <input type="number" class="form-control" v-model="jadwal_umum.id_instruktur"
                                    placeholder="Masukkan id_instruktur" />
                                <!-- validation -->
                                <div v-if="validation.id_instruktur" class="mt-2 alert alert-danger">
                                    {{ validation.id_instruktur[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Hari</label>
                                <input type="text" class="form-control" v-model="jadwal_umum.hari"
                                    placeholder="Masukkan hari" />
                                <!-- validation -->
                                <div v-if="validation.hari" class="mt-2 alert alert-danger">
                                    {{ validation.hari[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Jam</label>
                                <input type="text" class="form-control" v-model="jadwal_umum.jam_kelas"
                                    placeholder="Masukkan id_instruktur" />
                                <!-- validation -->
                                <div v-if="validation.jam_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.jam_kelas[0] }}
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
                validation,
                router,
                update,
            };
        },
    };
</script>
<style>

</style>
