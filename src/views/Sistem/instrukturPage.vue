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
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">JUMLAH KETERLAMBATAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, id) in users" :key="id">
                                    <template v-for="(instruktur, id) in instrukturs" :key="id">
                                        <td v-if="instruktur.id === user.id_instruktur">{{ instruktur.id_instruktur }}</td>
                                    </template>
                                    <td>{{ user.nama }}</td>
                                    <td>{{ user.email }}</td>
                                    <template v-for="(instruktur, id) in instrukturs" :key="id">
                                        <td v-if="instruktur.id === user.id_instruktur">{{ instruktur.jumlah_keterlambatan }}</td>
                                    </template>
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
        let instrukturs = ref([])

        const token = localStorage.getItem('token')
        
        let toast = useToast();

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('https://200710569.gofit.backend.given.website/api/userInstruktur')
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
        //method reset keterlambatan
        function reset() {
            axios.put(`https://200710569.gofit.backend.given.website/api/instrukturTerlambat/reset-keterlambatan/`)
            .then(() => {
                        toast.error("Berhasil Reset Keterlambatan !",{
                            timeout: 2000
                        })
                window.location.reload();
            }).catch(error => {
                console.log(error.response.data)
                        toast.error("Reset Hanya Dilakukan Awal Bulan !",{
                            timeout: 2000
                        })
            })
        }
        
        return {
            users,
            instrukturs,
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