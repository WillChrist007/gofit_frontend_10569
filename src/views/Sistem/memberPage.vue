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
                        <button class="btn btn-md btn-danger" @click="deactivate">
                            DEACTIVE ALL
                        </button>
                        <table class="table table-striped table-bordered mt-4 table-responsive">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">TANGGAL LAHIR</th>
                                    <th scope="col">TELEPON</th>
                                    <th scope="col">ALAMAT</th>
                                    <th scope="col">DEPOSIT UANG</th>
                                    <th scope="col">TANGGAL EXPIRED</th>
                                    <th scope="col">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(member, id) in members" :key="id">
                                    
                                    <td>{{ member.id_member }}</td>

                                    <template v-for="(user, id) in users" :key="id">
                                        <td v-if="user.id_member === member.id">{{ user.nama }}</td>
                                    </template>

                                    <template v-for="(user, id) in users" :key="id">
                                        <td v-if="user.id_member === member.id">{{ user.email }}</td>
                                    </template>

                                    <template v-for="(user, id) in users" :key="id">
                                        <td v-if="user.id_member === member.id">{{ user.tanggal_lahir }}</td>
                                    </template>

                                    <template v-for="(user, id) in users" :key="id">
                                        <td v-if="user.id_member === member.id">{{ user.telepon }}</td>
                                    </template>

                                    <template v-for="(user, id) in users" :key="id">
                                        <td v-if="user.id_member === member.id">{{ user.alamat }}</td>
                                    </template>
                                    
                                    <td>{{ member.deposit_uang }}</td>
                                    
                                    <td>{{ member.tanggal_expired }}</td>
                                    
                                    <td>{{ member.status }}</td>
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
        let users = ref([])
        let members = ref([])

        const token = localStorage.getItem('token')
        
        let toast = useToast();

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('https://200710569.gofit.backend.given.website/api/userMemberExpired')
            .then(response => {
                members.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get('https://200710569.gofit.backend.given.website/api/user')
            .then(response => {
                users.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
            
        })
        //method deactivate
        function deactivate() {
            axios.put(`https://200710569.gofit.backend.given.website/api/memberExpired/deactivate/`)
            .then(() => {
                        toast.error("Berhasil Deactive Member !",{
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
                        toast.warning("Berhasil Reset Password !",{
                            timeout: 2000
                        })
                window.location.reload();
            }).catch(error => {
                console.log(error.response.data)
            })
        }
        
        return {
            users,
            members,
            deactivate,
            reset
        }
    }
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