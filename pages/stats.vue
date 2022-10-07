<template>
  <div class="flex items-center gap-3">
    <div class="spinner"></div>

    <p class="text-xl">
      Je suis toujours en train de travailler sur cette page, elle ne devrait
      pas trop tarder à sortir ! 😉
    </p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<style>
.spinner {
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  padding: 4.8px;
  background: conic-gradient(from 135deg at top, #f69b5f 90deg, #0000 0) 0
      calc(50% - 3.2px) / 13.6px 6.8px,
    radial-gradient(
        farthest-side at bottom left,
        #0000 calc(100% - 4.8px),
        #f69b5f calc(100% - 4px) 99%,
        #0000
      )
      top right/50% 50% content-box content-box,
    radial-gradient(
        farthest-side at top,
        #0000 calc(100% - 4.8px),
        #f69b5f calc(100% - 4px) 99%,
        #0000
      )
      bottom / 100% 50% content-box content-box;
  background-repeat: no-repeat;
  animation: spinner-v8og74 1.4s infinite linear;
}

@keyframes spinner-v8og74 {
  100% {
    transform: rotate(1turn);
  }
}
</style>