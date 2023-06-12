<template>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body" id="print-form">
                        <h4>GoFit</h4>
                        <p>Jl. Centralpark No. 10 Yogyakarta</p>
                        <br>
                        <h4>LAPORAN AKTIVITAS KELAS BULANAN</h4>
                        <p>Bulan: {{ getBulan() }}</p>
                        <p>Tahun: {{ getTahun() }}</p>
                        <p>Tanggal Cetak: {{ getTanggalCetak() }}</p>
                        <table class="table table-striped table-bordered mt-4 table-responsive">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">JUMLAH PESERTA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(kelas, id) in kelass" :key="id">
                                    <td>{{ kelas.nama_kelas }}</td>
                                    <td>{{ kelas.jumlah_peserta }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" class="btn btn-primary m-2" @click="printForm">Cetak Struk</button>
                    <router-link :to="{ name: 'manager.laporan' }" class="btn btn-warning m-2 mb-5">
                        Kembali
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
//import { useToast } from "vue-toastification";
import html2pdf from 'html2pdf.js';
export default {
    setup() {
        let kelass = ref([])

        const token = localStorage.getItem('token')

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('https://200710569.gofit.backend.given.website/api/kelas')
            .then(response => {
                kelass.value = response.data.data
                kelass.value.forEach(kelas => {
                    //JUMLAH PESERTA
                    axios.get(`https://200710569.gofit.backend.given.website/api/bookingKelas/count/${kelas.id}`)
                    .then(response => {
                        kelas.jumlah_peserta = response.data // Update jumlah_peserta dengan response.data
                    }).catch(error => {
                        console.log(error.response.data)
                    })
                })
            }).catch(error => {
                console.log(error.response.data)
            })            
        })

        function printForm() {
            const element = document.getElementById('print-form');
            const options = {
            margin: 10,
            filename: 'laporan_aktivitas_kelas.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().set(options).from(element).save();
        }

        function getBulan() {
            const bulan = new Date().toLocaleString('default', { month: 'long' }); // Menggunakan indeks bulan 0-11, jadi ditambah 1
            return bulan; // Mengubah menjadi string dan padStart untuk menambahkan '0' di depan jika bulan < 10
        }

        function getTahun() {
            return new Date().getFullYear().toString();
        }

        function getTanggalCetak() {
            const tanggal = new Date().getDate();
            const bulan = new Date().toLocaleString('default', { month: 'long' }); // Menggunakan nama bulan dalam bahasa Inggris
            const tahun = new Date().getFullYear();
            return `${tanggal} ${bulan} ${tahun}`;
        }

        return {
            kelass,
            printForm,
            getBulan,
            getTahun,
            getTanggalCetak,
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