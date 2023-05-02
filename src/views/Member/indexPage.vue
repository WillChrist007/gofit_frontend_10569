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
                        <router-link :to="{ name: 'kasir.member.create' }" class="btn btn-md btn-success">TAMBAH
                            MEMBER</router-link>
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
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, id) in users" :key="id">
                                    <template v-for="(member, id) in members" :key="id">
                                        <td v-if="member.id === user.id_member">{{ member.id_member }}</td>
                                    </template>
                                    <td>{{ user.nama }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.tanggal_lahir }}</td>
                                    <td>{{ user.telepon }}</td>
                                    <td>{{ user.alamat }}</td>
                                    <template v-for="(member, id) in members" :key="id">
                                        <td v-if="member.id === user.id_member">{{ member.deposit_uang }}</td>
                                    </template>
                                    <template v-for="(member, id) in members" :key="id">
                                        <td v-if="member.id === user.id_member">{{ member.tanggal_expired }}</td>
                                    </template>
                                    <template v-for="(member, id) in members" :key="id">
                                        <td v-if="member.id === user.id_member">{{ member.status }}</td>
                                    </template>

                                    <td class="text-center">
                                        <router-link :to="{ name: 'kasir.member.edit', params: { id: user.id } }" class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link> &nbsp;
                                        <button class="btn btn-sm btn-danger ml-1" @click="remove(user.id_member)">
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
        let users = ref([])
        let members = ref([])

        const token = localStorage.getItem('token')
        
        let toast = useToast();

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('http://127.0.0.1:8000/api/userMember')
            .then(response => {
                users.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get('http://127.0.0.1:8000/api/member')
            .then(response => {
                members.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
            
        })
        //method delete
        function remove(id) {
            axios.put(`http://127.0.0.1:8000/api/member/${id}`)
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
            axios.put(`http://127.0.0.1:8000/api/user/reset-password/${id}`)
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
            remove,
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