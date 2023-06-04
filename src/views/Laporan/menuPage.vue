<template>
  <div class="page">
    <div class="button-container sistem">
      <router-link :to="{ name: 'manager.laporan.pendapatan' }" class="btn btn-md btn-success btn-sistem">
        PENDAPATAN TAHUNAN
      </router-link>
      <router-link :to="{ name: 'manager.laporan.kelas' }" class="btn btn-md btn-success btn-sistem">
        AKTIVITAS KELAS BULANAN
      </router-link>
      <router-link :to="{ name: 'manager.laporan.gym' }" class="btn btn-md btn-success btn-sistem">
        AKTIVITAS GYM BULANAN
      </router-link>
      <router-link :to="{ name: 'manager.laporan.kinerja' }" class="btn btn-md btn-success btn-sistem">
        KINERJA INSTRUKTUR BULANAN
      </router-link>
    </div>
  </div>
</template>

  

<script>
import axios from 'axios'
import { onMounted } from 'vue'
export default {
    setup() {

        const token = localStorage.getItem('token')

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            
        })
    }
}
</script>

<style>
.page {
  background-image: url('https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: contain;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sistem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.btn-sistem {
  font-size: 2rem;
  padding: 1rem 2rem;
  width: 200%; /* Ubah lebar menjadi 100% */
  box-sizing: border-box; /* Agar lebar termasuk padding */
}
</style>
  