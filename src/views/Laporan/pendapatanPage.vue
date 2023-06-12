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
                        <h4>LAPORAN PENDAPATAN TAHUNAN</h4>
                        <p>Periode: {{ getTahun() }}</p>
                        <p>Tanggal Cetak: {{ getTanggalCetak() }}</p>
                        <table class="table table-striped table-bordered mt-4 table-responsive">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">BULAN</th>
                                    <th scope="col">AKTIVASI</th>
                                    <th scope="col">DEPOSIT</th>
                                    <th scope="col">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in dataByMonth" :key="data.tanggal_gym">
                                    <td>{{ data.bulan }}</td>
                                    <td>Rp{{ data.transaksiAktivasis }}</td>
                                    <td>Rp{{ data.transaksiDepositUangs }}</td>
                                    <td>Rp{{ data.total }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Total</th>
                                    <th>Rp{{ totalPendapatan.totalAktivasis }}</th>
                                    <th>Rp{{ totalPendapatan.totalDepositUangs }}</th>
                                    <th>Rp{{ totalPendapatan.totalKeseluruhan }}</th>
                                </tr>
                            </tfoot>
                        </table>
                        <div>
                            <canvas id="myChart"></canvas>
                        </div>
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
    import axios from 'axios';
    import html2pdf from 'html2pdf.js';
    import Chart from 'chart.js/auto';

    export default {
        data() {
            return {
                dataByMonth: [],
                totalPendapatan: {},
            };
        },
        mounted() {
            this.authorize();
            this.fetchDataByDate().then(() => {
                this.hitungTotalPendapatan();
                this.drawChart();
            });
        },
        methods: {
            authorize() {
                axios.defaults.headers.common = {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            },
            fetchDataByDate() {
                return axios
                    .get('https://200710569.gofit.backend.given.website/api/pendapatan')
                    .then(response => {
                        this.dataByMonth = response.data;
                        this.hitungTotalPendapatan();
                        this.drawChart();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            hitungTotalPendapatan() {
                axios
                    .get('https://200710569.gofit.backend.given.website/api/totalPendapatan')
                    .then(response => {
                        this.totalPendapatan = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            drawChart() {
                const ctx = document.getElementById('myChart').getContext('2d');

                const labels = this.dataByMonth.map(data => data.bulan);
                const values = this.dataByMonth.map(data => data.total);

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Total',
                            data: values,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }, ],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            },
            printForm() {
                const element = document.getElementById('print-form');
                const options = {
                    margin: 10,
                    filename: 'laporan_pendapatan_tahunan.pdf',
                    image: {
                        type: 'jpeg',
                        quality: 0.98
                    },
                    html2canvas: {
                        scale: 2
                    },
                    jsPDF: {
                        unit: 'mm',
                        format: 'a2',
                        orientation: 'portrait'
                    }
                };
                html2pdf().set(options).from(element).save();
            },
            getBulan() {
                const bulan = new Date().toLocaleString('default', {
                    month: 'long'
                }); // Menggunakan indeks bulan 0-11, jadi ditambah 1
                return bulan; // Mengubah menjadi string dan padStart untuk menambahkan '0' di depan jika bulan < 10
            },
            getTahun() {
                return new Date().getFullYear().toString();
            },
            getTanggalCetak() {
                const tanggal = new Date().getDate();
                const bulan = new Date().toLocaleString('default', {
                    month: 'long'
                }); // Menggunakan nama bulan dalam bahasa Inggris
                const tahun = new Date().getFullYear();
                return `${tanggal} ${bulan} ${tahun}`;
            }
        },
    };
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