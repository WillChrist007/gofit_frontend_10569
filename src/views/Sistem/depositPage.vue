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
                        <button class="btn btn-md btn-danger" @click="reset">
                            RESET ALL
                        </button>
                        <table class="table table-striped table-bordered mt-4 table-responsive">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">SISA DEPOSIT</th>
                                    <th scope="col">MASA BERLAKU</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(depositkelass, id) in depositkelass" :key="id">

                                    <template v-for="(member, id) in members" :key="id">
                                        <td v-if="member.id === depositkelass.id_member">{{ member.id_member }}</td>
                                    </template>

                                    <template v-for="(user, id) in users" :key="id">
                                        <td v-if="user.id_member === depositkelass.id_member">{{ user.nama }}</td>
                                    </template>

                                    <template v-for="(kelas, id) in kelass" :key="id">
                                        <td v-if="kelas.id === depositkelass.id_kelas">{{ kelas.nama_kelas }}</td>
                                    </template>

                                    <td>{{ depositkelass.sisa_kelas }}</td>

                                    <td>{{ depositkelass.masa_berlaku }}</td>
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
        let kelass = ref([])
        let depositkelass = ref([])

        const token = localStorage.getItem('token')
        
        let toast = useToast();

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('http://127.0.0.1:8000/api/depositKelasExpired')
            .then(response => {
                depositkelass.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get('http://127.0.0.1:8000/api/member')
            .then(response => {
                members.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            axios.get('http://127.0.0.1:8000/api/user')
            .then(response => {
                users.value = response.data.data
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
        //method reset
        function reset() {
            axios.put(`http://127.0.0.1:8000/api/kelasExpired/reset/`)
            .then(() => {
                        toast.error("Berhasil Reset Kelas !",{
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
            kelass,
            depositkelass,
            reset,
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