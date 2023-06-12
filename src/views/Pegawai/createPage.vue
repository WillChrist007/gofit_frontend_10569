<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH PEGAWAI</h4>
                        <hr />
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama</label>
                                <input type="text" class="form-control" v-model="pegawai.nama"
                                    placeholder="Masukkan nama" />
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" v-model="pegawai.email"
                                    placeholder="Masukkan email" />
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Telepon</label>
                                <input type="number" class="form-control" v-model="pegawai.telepon"
                                    placeholder="Masukkan telepon" />
                                <!-- validation -->
                                <div v-if="validation.telepon" class="mt-2 alert alert-danger">
                                    {{ validation.telepon[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="pegawai.tanggal_lahir"
                                    placeholder="Masukkan tanggal lahir" />
                                <!-- validation -->
                                <div v-if="validation.tanggal_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tanggal_lahir[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Alamat</label>
                                <input type="text" class="form-control" v-model="pegawai.alamat"
                                    placeholder="Masukkan email" />
                                <!-- validation -->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Role</label>
                                <select class="form-control" v-model="pegawai.role">
                                    <option value="" selected hidden disabled>Pilih Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="MO">MO</option>
                                    <option value="Kasir">Kasir</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.role" class="mt-2 alert alert-danger">
                                    {{ validation.role[0] }}
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
    import { reactive, ref } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    import { useToast } from "vue-toastification";
    export default {
        setup() {
            //state pegawai
            const pegawai = reactive({
                nama: "",
                email: "",
                tanggal_lahir: "",
                telepon: "",
                alamat: "",
                role: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();
            //method store
            function store() {
                let nama = pegawai.nama;
                let email = pegawai.email;
                let tanggal_lahir = pegawai.tanggal_lahir;
                let telepon = pegawai.telepon;
                let alamat = pegawai.alamat;
                let role = pegawai.role;
                let toast = useToast();

                const token = localStorage.getItem('token')
                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios
                    .post("https://200710569.gofit.backend.given.website/api/pegawai", {
                        nama: nama,
                        email: email,
                        tanggal_lahir: tanggal_lahir,
                        telepon: telepon,
                        alamat: alamat,
                        role: role,
                    })
                    .then(() => {
                        toast.success("Berhasil Tambah Data !",{
                            timeout: 2000
                        })
                        //redirect ke post index
                        router.push({
                            name: "admin.pegawai.index",
                        });
                    })
                    .catch((error) => {
                        //assign state validation with error
                        validation.value = error.response.data
                    });
            }
            //return
            return {
                pegawai,
                validation,
                router,
                store,
            };
        },
    };

</script>
<style>

</style>
