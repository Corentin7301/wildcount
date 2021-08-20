<template>
    <div class="relative py-10">
        <img src="@/assets/img/logo.png" alt="wildcount" class=" mx-auto h-[10vh]">
        <button class=" absolute top-10 right-10 text-4xl" @click.prevent="askModal = !askModal"><p class=" opacity-70">?</p>

            <transition name="fadeFromTop">
            <div v-if="askModal === true" class=" absolute top-10 right-0 bg-lightGrey text-sm text-left rounded-lg w-[37vh] py-2 px-2 space-y-1">
                <p class=" text-lg">Quesque WildCount ?</p>
                <p >Il s'agit d'une application installable (voir <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>)<br/>Cette appli répond au problème de la notation des observations sur un carnet pour ensuite recalculer, à la fin de la saison ou pendant, le nombre d'observation par espèce.<br/>Le but de cette appli est de rendre ça plus simple et plus rapide.</p>
                <p class=" text-lg">Comment ça fonctionne ?</p>
                <p>Sur la page d'accueil il est possible de choisir une espèce et d'ajouter le nombre d'observation et/ou d'individus.<br/>Sur la page de listage tu pourras retrouver le nombre d'observations pour chaque espèces.</p>
            </div>
            </transition>
        </button>

    </div>
</template>

<script>
export default {
    data() {
        return {
            askModal: false,
        }
    },
}
</script>