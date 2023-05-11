<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">LIST PROMO</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'admin.promo.create' }" class="btn btn-md btn-success mb-4">TAMBAH
                            PROMO</router-link>
                        <table class="table table-striped table-bordered mt4 table-responsive">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">NAMA PROMO</th>
                                    <th scope="col">KETERANGAN</th>
                                    <th scope="col">JENIS</th>
                                    <th scope="col">MINIMAL TRANSAKSI</th>
                                    <th scope="col">BONUS</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(promo, id) in promos" :key="id" class="text-center">
                                    <td>{{ promo.nama_promo }}</td>
                                    <td>{{ promo.keterangan }}</td>
                                    <td>{{ promo.jenis }}</td>
                                    <td>{{ promo.minimal_transaksi }}</td>
                                    <td>{{ promo.bonus }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'admin.promo.edit', params: { id: promo.id } }" 
                                        class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        &nbsp;
                                        <button @click.prevent="promoDelete(promo.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
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
        let promos = ref([])

        const token = localStorage.getItem('token')
        
        let toast = useToast();

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('http://127.0.0.1:8000/api/promo')
            .then(response => {
                promos.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            
        })
        //method delete
        function promoDelete(id) {
            axios.delete(`http://127.0.0.1:8000/api/promo/${id}`)
            .then(() => {
                        toast.error("Berhasil Hapus Data !",{
                            timeout: 2000
                        })
                promos.value.splice(promos.value.indexOf(id), 1);
            }).catch(error => {
                console.log(error.response.data)
            })
        }
        return {
            promos,
            promoDelete
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