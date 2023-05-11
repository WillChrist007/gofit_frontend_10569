<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">LIST KELAS</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              
              <router-link :to="{ name: 'manager.kelas.create' }" class="btn btn-md btn-success mb-4">TAMBAH KELAS</router-link>

              <div class="row mb-3">
                <div class="col">
                  <input type="text" class="form-control" v-model="searchTerm" @input="updateSearchTerm" placeholder="Search ..">
                </div>
              </div>

              <table class="table table-striped table-bordered mt-4 table-responsive">
                <thead class="thead-dark">
                  <tr class="text-center">
                    <th scope="col">NAMA KELAS</th>
                    <th scope="col">HARGA</th>
                    <th scope="col">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(kelas, id) in filteredKelass" :key="id" class="text-center">
                    <td>{{ kelas.nama_kelas }}</td>
                    <td>Rp{{ kelas.harga_kelas }}</td>
                    <td class="text-center">
                      <router-link :to="{ name: 'manager.kelas.edit', params: { id: kelas.id } }" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                      &nbsp;
                      <button @click.prevent="kelasDelete(kelas.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
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
import { onMounted, ref, computed } from 'vue'
import { useToast } from "vue-toastification";

export default {
  setup() {
    let kelass = ref([])
    let searchTerm = ref('')
    const token = localStorage.getItem('token')
    let toast = useToast();

    onMounted(() => {
      axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

      axios.get('http://127.0.0.1:8000/api/kelas')
        .then(response => {
          kelass.value = response.data.data
        }).catch(error => {
          console.log(error.response.data)
        })
    })

    //method delete
    function kelasDelete(id) {
      axios.delete(`http://127.0.0.1:8000/api/kelas/${id}`)
        .then(() => {
          toast.error("Berhasil Hapus Data !", {
            timeout: 2000
          })
          const index = kelass.value.findIndex(kelas => kelas.id === id)
          if (index !== -1) {
            kelass.value.splice(index, 1)
          }
        }).catch(error => {
          console.log(error.response.data)
        })
    }

    const filteredKelass = computed(() => {
      if (!searchTerm.value) {
        return kelass.value;
      }

      const searchTermLower = searchTerm.value.toLowerCase();

      return kelass.value.filter(kelas => {
        const namaKelasLower = kelas.nama_kelas.toLowerCase();
        const hargaKelasLower = kelas.harga_kelas.toString().toLowerCase();

        return namaKelasLower.includes(searchTermLower) || hargaKelasLower.includes(searchTermLower);
      });
    });

    return {
      kelass,
      searchTerm,
      kelasDelete,
      filteredKelass
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