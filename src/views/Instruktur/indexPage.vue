<template>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'admin.instruktur.create' }" class="btn btn-md btn-success mb-4">TAMBAH
                            INSTRUKTUR</router-link>
                        <div class="input-group mb-3">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Cari data..."
                                v-model="searchTerm"
                            />
                        </div>
                        <table class="table table-striped table-bordered mt-4 table-responsive">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">TANGGAL LAHIR</th>
                                    <th scope="col">TELEPON</th>
                                    <th scope="col">ALAMAT</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, id) in filteredInstrukturs" :key="id">
                                    <template v-for="(instruktur, id) in instrukturs" :key="id">
                                        <td v-if="instruktur.id === user.id_instruktur">{{ instruktur.id_instruktur }}</td>
                                    </template>
                                    <td>{{ user.nama }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.tanggal_lahir }}</td>
                                    <td>{{ user.telepon }}</td>
                                    <td>{{ user.alamat }}</td>

                                    <td class="text-center">
                                        <router-link :to="{ name: 'admin.instruktur.edit', params: { id: user.id } }" class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link> &nbsp;
                                        <button class="btn btn-sm btn-danger ml-1" @click="remove(user.id_instruktur)">
                                            DELETE
                                        </button> &nbsp;
                                        <button class="btn btn-sm btn-warning ml-1" @click="reset(user.id)">
                                            RESET
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useToast } from "vue-toastification";
export default {
    setup() {
        let users = ref([]);
        let instrukturs = ref([]);
        let searchTerm = ref("");

        const token = localStorage.getItem('token')
        
        let toast = useToast();

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('https://200710569.gofit.backend.given.website/api/user')
            .then(response => {
                users.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get('https://200710569.gofit.backend.given.website/api/instruktur')
            .then(response => {
                instrukturs.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
            
        })
        //method delete
        function remove(id) {
            axios.delete(`https://200710569.gofit.backend.given.website/api/instruktur/${id}`)
            .then(() => {
                        toast.error("Berhasil Hapus Data !",{
                            timeout: 2000
                        })
                window.location.reload();
            }).catch(error => {
                console.log(error.response.data)
            })
        }
        //method reset password
        function reset(id) {
            axios.put(`https://200710569.gofit.backend.given.website/api/user/reset-password/${id}`)
            .then(() => {
                        toast.error("Berhasil Reset Password !",{
                            timeout: 2000
                        })
                window.location.reload();
            }).catch(error => {
                console.log(error.response.data)
            })
        }
        
        return {
            users,
            instrukturs,
            searchTerm,
            remove,
            reset
        }
    },
    computed: {
        filteredInstrukturs() {
            return this.users.filter((user) => {
                const searchTermLower = this.searchTerm.toLowerCase();
                const instruktur = this.instrukturs.find((instruktur) => instruktur.id === user.id_instruktur);
                return (
                    user.id_instruktur !== null && (
                        user.nama.toLowerCase().includes(searchTermLower) ||
                        user.email.toLowerCase().includes(searchTermLower) ||
                        user.tanggal_lahir.toLowerCase().includes(searchTermLower) ||
                        user.telepon.toLowerCase().includes(searchTermLower) ||
                        user.alamat.toLowerCase().includes(searchTermLower) ||
                        (instruktur && instruktur.id_instruktur.toLowerCase().includes(searchTermLower))
                    )
                );
            });
        },
    },
}
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
@media (max-width: 768px) {
  .table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .table {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .table thead {
    display: none;
  }
  .table tbody {
    display: block;
    width: 100%;
  }
  .table tbody tr {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .table tbody td {
    display: block;
    text-align: right;
    font-size: 13px;
    border-bottom: none;
    position: relative;
    padding-left: 50%;
    text-align: right;
  }
  .table tbody td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-weight: bold;
    text-align: left;
  }
}
</style>