import { NhostClient } from '@nhost/vue'
export default defineNuxtPlugin(nuxtApp => {
    const nhost = new NhostClient({
        subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
        region: import.meta.env.VITE_NHOST_REGION
    })
    nuxtApp.vueApp.use(nhost)
})