<template>
  <nav
    class=" absolute bottom-0 left-0 min-h-[85px] w-full rounded-t-3xl bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 px-20 pt-9 pb-6">
    <div class="relative w-full h-full flex items-center justify-between">
      <NuxtLink to="/list">
          <svg class="w-9 h-9 icon-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16">
            </path>
          </svg>
      </NuxtLink>

      <NuxtLink to="/stats">
          <svg class="w-9 h-9 icon-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
            </path>
          </svg>
      </NuxtLink>

      <NuxtLink to="/" class="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <svg class="w-16 h-16 p-2 rounded-full bg-gradient-to-t from-ecstasy-500 to-tan-hide-500 plus-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
  .icon-shadow {
    filter: drop-shadow(0px 4px 6px rgb(0 0 0 / 0.4));
      /* filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4)); */
  }

  .plus-shadow {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 2px 5px -1px #FFFFFF;
  }

</style>
