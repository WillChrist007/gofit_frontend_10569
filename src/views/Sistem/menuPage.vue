<template>
  <div class="page">
    <div class="button-container sistem">
      <router-link :to="{ name: 'sistem.member.index' }" class="btn btn-md btn-success btn-sistem">
        NONAKTIF MEMBER
      </router-link>
      <router-link :to="{ name: 'sistem.deposit.index' }" class="btn btn-md btn-success btn-sistem">
        RESET DEPOSIT
      </router-link>
      <router-link :to="{ name: 'sistem.instruktur.index' }" class="btn btn-md btn-success btn-sistem">
        RESET INSTRUKTUR
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
  