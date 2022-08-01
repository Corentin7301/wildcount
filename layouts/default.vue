<template>
    <main class="relative font-Dongle font-light leading-4 text-white bg-mine-shaft-500 min-h-screen pt-10 pb-[120px]">
        <Container>
            <Header />
            <slot />
            <Navbar />
        </Container>
    </main>
</template>

<script setup>

useHead({
  title: 'My App',
  // or, instead:
  // titleTemplate: (title) => `My App - ${title}`,
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'My amazing site.' },
  ],
  bodyAttrs: {
    class: 'test'
  }
})
</script>