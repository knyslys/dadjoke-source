<template>
  <ul class="flex gap-x-4 relative z-10" ref="parentElement">
    <prop-item v-for="prop in list" :key="prop" :prop="prop"></prop-item>
  </ul>
</template>

<script setup>
import PropItem from "./PropItem.vue";
import { ref, onMounted } from "vue";
import { Presence, Motion } from "@motionone/vue";
import autoAnimate, { getTransitionSizes } from "@formkit/auto-animate";
const parentElement = ref(null);
onMounted(() => {
  autoAnimate(parentElement.value, (el, action, oldCoords, newCoords) => {
    let keyframes;
    // supply a different set of keyframes for each action
    if (action === "add") {
      keyframes = [
        { transform: "translateY(60px)", opacity: 0.5 },
        { transform: "translateX(0)", opacity: 1 },
        { transform: "translateY(0)", opacity: 1 },
      ];
    }
    // keyframes can have as many "steps" as you prefer
    // and you can use the 'offset' key to tune the timing
    if (action === "remove") {
      keyframes = [
        { transform: "translateY(0)", opacity: 1 },
        { transform: "translateX(50px)", opacity: 1 },
        { transform: "translateY(60px)", opacity: 0 },
      ];
    }
    if (action === "remain") {
      // for items that remain, calculate the delta
      // from their old position to their new position
      const deltaX = oldCoords.left - newCoords.left;
      const deltaY = oldCoords.top - newCoords.top;
      // use the getTransitionSizes() helper function to
      // get the old and new widths of the elements
      const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(
        el,
        oldCoords,
        newCoords
      );
      // set up our steps with our positioning keyframes
      const start = { transform: `translate(${deltaX}px, ${deltaY}px)` };
      const mid = {
        transform: `translate(${deltaX * -0.15}px, ${deltaY * -0.15}px)`,
        offset: 0.75,
      };
      const end = { transform: `translate(0, 0)` };
      // if the dimensions changed, animate them too.
      if (widthFrom !== widthTo) {
        start.width = `${widthFrom}px`;
        mid.width = `${
          widthFrom >= widthTo ? widthTo / 1.05 : widthTo * 1.05
        }px`;
        end.width = `${widthTo}px`;
      }
      if (heightFrom !== heightTo) {
        start.height = `${heightFrom}px`;
        mid.height = `${
          heightFrom >= heightTo ? heightTo / 1.05 : heightTo * 1.05
        }px`;
        end.height = `${heightTo}px`;
      }
      keyframes = [start, mid, end];
    }
    // return our KeyframeEffect() and pass
    // it the chosen keyframes.
    return new KeyframeEffect(el, keyframes, {
      duration: 600,
      easing: "ease-out",
    });
  });
});
const props = defineProps({
  list: {
    type: Array,
  },
});
</script>

<style scoped></style>
