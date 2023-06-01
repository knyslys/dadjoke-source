<template>
  <li
    tag="li"
    ref="el"
    class="pl-4 pr-2 uppercase rounded-xl font-bold flex gap-x-2 place-items-center text-xs mt-2"
    :style="{ backgroundColor: randomColor }"
  >
    <span>{{ props.prop }} </span>
    <Icon icon="typcn:delete" @click="delProps" />
  </li>
</template>

<script setup>
//  :initial="{ y: 20, opacity: 0 }"
//   :animate="{ y: 0, opacity: 1 }"
//   :exit="{ x: 20, opacity: 0, transition: { duration: 0.4 } }"
//   :transition="{
//     duration: 1,
//   }"
import { onMounted, ref, inject } from "vue";
import { Icon } from "@iconify/vue";
import { Motion, Presence } from "motion/vue";
import { animate } from "motion";
const el = ref(null);
const props = defineProps({
  prop: {
    type: String,
  },
});
const emit = defineEmits(["remove-props"]);
const availableColors = [
  "#FDE68A",
  "#A7F3D0",
  "#F9D5E5",
  "#C9C9C9",
  "#F7B801",
  "#FDE68C",
];
const randomColor = ref();
const removeProp = inject("deleteProps");
const delProps = () => {
  removeProp(props.prop);
};

onMounted(() => {
  randomColor.value =
    availableColors[Math.floor(Math.random() * availableColors.length)];
});
</script>

<style lang="scss" scoped></style>
