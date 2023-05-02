<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>GANTI PASSWORD</h4>
                        <hr />
                        <form @submit.prevent="update">                            
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Password Baru</label>
                                <input type="password" class="form-control" v-model="user.password"
                                    placeholder="Masukkan password baru" />
                                <!-- validation -->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0] }}
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
            //state user
            const user = reactive({
                password: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();
            //params id
            const id = localStorage.getItem('id')

            onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://127.0.0.1:8000/api/user/" + id,)
                .then(response => {
                    //assign state posts with response data
                    user.password = response.data.data.password
                }).catch(error => {
                    console.log(error.response.data)
                })
            })

            //method update
            function update() {
                let password = user.password;

                let toast = useToast();
                axios
                    .put("http://127.0.0.1:8000/api/user/change-password/" + id, {
                        password: password,
                    })
                    .then(() => {
                        toast.success("Berhasil Ubah Password !",{
                            timeout: 2000
                        })
                        //redirect ke post index
                        router.push({
                            name: "changepassword",
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
