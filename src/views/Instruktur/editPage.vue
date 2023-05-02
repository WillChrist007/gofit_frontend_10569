<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT INSTRUKTUR</h4>
                        <hr />
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama</label>
                                <input type="text" class="form-control" v-model="user.nama"
                                    placeholder="Masukkan nama" />
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" v-model="user.email"
                                    placeholder="Masukkan email" />
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Telepon</label>
                                <input type="number" class="form-control" v-model="user.telepon"
                                    placeholder="Masukkan telepon" />
                                <!-- validation -->
                                <div v-if="validation.telepon" class="mt-2 alert alert-danger">
                                    {{ validation.telepon[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="user.tanggal_lahir"
                                    placeholder="Masukkan tanggal lahir" />
                                <!-- validation -->
                                <div v-if="validation.tanggal_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tanggal_lahir[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">alamat</label>
                                <input type="text" class="form-control" v-model="user.alamat"
                                    placeholder="Masukkan email" />
                                <!-- validation -->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
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
            //state user
            const user = reactive({
                nama: "",
                email: "",
                telepon: "",
                tanggal_lahir: "",
                alamat: "",
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
                .get("http://127.0.0.1:8000/api/user/" + id,)
                .then(response => {
                    //assign state posts with response data
                    user.nama = response.data.data.nama
                    user.email = response.data.data.email
                    user.telepon = response.data.data.telepon
                    user.tanggal_lahir = response.data.data.tanggal_lahir
                    user.alamat = response.data.data.alamat
                }).catch(error => {
                    console.log(error.response.data)
                })
            })

            //method update
            function update() {
                let nama = user.nama;
                let email = user.email;
                let telepon = user.telepon;
                let tanggal_lahir = user.tanggal_lahir;
                let alamat = user.alamat;

                let toast = useToast();
                axios
                    .put("http://127.0.0.1:8000/api/userInstruktur/" + id, {
                        nama: nama,
                        email: email,
                        telepon: telepon,
                        tanggal_lahir: tanggal_lahir,
                        alamat: alamat,
                    })
                    .then(() => {
                        toast.success("Berhasil Edit Data !",{
                            timeout: 2000
                        })
                        //redirect ke post index
                        router.push({
                            name: "admin.instruktur.index",
                        });
                    })
                    .catch((error) => {
                        //assign state validation with error
                        validation.value = error.response.data;
                    });
            }
            //return
            return {
                user,
                validation,
                router,
                update,
            };
        },
    };
</script>
<style>

</style>
