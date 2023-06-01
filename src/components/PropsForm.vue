<template>
  <form
    class="flex flex-col w-[90%] md:w-[40%] text-center relative z-10"
    @submit.prevent="submitProp"
  >
    <div class="relative w-full">
      <input
        type="text"
        :placeholder="placeHolder"
        @focus="placeHolder = 'Enter your prop. Example: car'"
        id="props"
        class="border-2 bg-amber-50 p-2 w-full shadow-sm rounded-md"
        v-model="propInput"
      />
      <button class="absolute right-0">
        Add <span :class="getPropClass">{{ countProps }}/5</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
const emit = defineEmits(["add-props"]);
const propInput = ref("");
const placeHolder = ref("Enter your prop. Example: car");
const props = defineProps({
  countProps: {
    type: Number,
  },
});

const getPropClass = computed(() => {
  return {
    "text-red-500": props.countProps === 5,
    "text-amber-400": props.countProps < 5,
  };
});

const submitProp = () => {
  if (
    propInput.value.trim() === "" ||
    propInput.value.trim().length < 2 ||
    propInput.value.trim().length > 12
  ) {
    placeHolder.value = `Prop has to be between 2 and 12 characters long.`;

    propInput.value = "";
    return;
  }
  if (props.countProps === 5) {
    placeHolder.value = `You can only add 5 props.`;

    propInput.value = "";
    return;
  }

  emit("add-props", propInput.value);
  propInput.value = "";
  placeHolder.value = "Enter your prop. Example: car";
};
</script>

<style scoped>
input {
  outline: none;
}

button {
  /* border: 2px solid black; */
  /* background-color: #fbbf24; */
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
</style>
