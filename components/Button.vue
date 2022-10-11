<template>
  <button
    class="w-16 h-16 p-2 rounded-full button-shadow"
    :class="`bg-gradient-to-t ${defineButtonColor().first} ${
      defineButtonColor().second
    }`"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  color: {
    default: "base",
    type: String,
  },
});

const defineButtonColor = () => {
  switch (props.color) {
    case "base":
      return {
        first: "to-tan-hide-500",
        second: "from-ecstasy-500",
      };
    case "green":
      return {
        first: "to-green-300",
        second: "from-green-500",
      };
    case "red":
      return {
        first: "to-red-400",
        second: "from-red-500",
      };
  }
};
</script>

<style scoped>
.button-shadow {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 2px 5px -1px #ffffff;
}
</style>
