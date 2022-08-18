<template>
  <div class=" relative">
    <img src="/wave.svg" class=" absolute -top-2">
    <img
      :src="random !== null ? random : 'https://res.cloudinary.com/corentin7301/image/upload/f_auto/q_auto/c_scale/fl_lossy/corentinperroux.fr/animaliere/Dent-de-Crolles_02.05.21_s-22_ps5kd9.jpg'"
      class=" h-full object-cover">
  </div>
</template>

<script setup>
  import allImages from '@/datas/images.json';

    const random = ref(null)
    
    random.value = randomImage();
    
  function randomImage () {
    return allImages[Math.floor(Math.random() * allImages.length)]
  }

</script>
