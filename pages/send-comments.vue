<template>
  <div>
    <p class="text-2xl leading-6">Si tu as une question, une suggestion, une demande d'ajout d'une espèce ou quoi que ce
      soit, <span class=" text-ecstasy-500">tu
        es au bon endroit</span> !<br>Envoie moi un petit message, promis je te réponds
      par mail au plus vite !</p>
    <form name="comment-form" @submit.prevent="handleSubmit()">
      <Container class="mt-10 grid gap-4 ">
        <label for="user-firstname">
          <input type="text" name="user-firstname" id="user-firstname" placeholder="Ton prénom"
            class="input-style p-0 pt-1 text-2xl text-center max-w-[75%] mx-auto flex items-center justify-center"
            v-model="firstname" required>
        </label>
        <div
          class="w-full rounded-2xl mx-auto bg-gradient-to-b px-[1px] pt-[1px] from-ecstasy-500 via-tan-hide-500 to-transparent">
          <textarea name="message" id="message" placeholder="Tout ce que tu veux !"
            class=" bg-mine-shaft-500 py-4 px-5 rounded-2xl text-white text-2xl -4 min-h-[100px] w-full resize-none -mb-2 leading-6 border-none outline-none focus:border-none focus:outline-none"
            v-model="message" required></textarea>
        </div>
        <p class="hidden">
          <label>
            I see you... r.o.b.o.t <input name="bot-field" v-model="bot" />
          </label>
        </p>
        <input type="submit" name="submit" id="submit" class="mt-5 submit-button" value="Envoyer">
      </Container>
    </form>
    <ReturnButton targetPage="settings" />
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: 'auth'
  })

  const user = useNhostUser()
  const firstname = ref('')
  const message = ref('')
  const bot = ref('')

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const fields = computed(() => {
    return {
      'user-firstname': firstname.value,
      'user-email': user.value.email,
      'message': message.value,
      'bot-field': bot.value,
      'form-name': 'comment-form'
    }
  })

  const handleSubmit = async () => {
    const encodedForm = encode(fields.value);

    try {
      await fetch('/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: encodedForm
      })
      firstname.value = ''
      message.value = ''
      alert('Merci pour ton message !')
    } catch (error) {
      console.log(error)
    }
  }

</script>
