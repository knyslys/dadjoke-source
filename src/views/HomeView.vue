<template>
  <main
    class="flex flex-col min-h-screen place-content-center place-items-center"
  >
    <!-- top page-->
    <div
      class="absolute top-[5%] left-2/4 -translate-x-2/4 text-center z-10 w-screen"
    >
      <h1 class="text-4xl">OPEN DAD'AI</h1>
      <p class="mt-2">
        Generate epic dad joke based on your prompts! You can add up to 5
        prompts!
      </p>
      <span class="mt-2 inline-block text-sm"
        >Made with VUE.JS and ❤️ by Vakaris</span
      >
      <div
        class="flex place-items-center place-content-center gap-x-2 mt-2 text-sm"
      >
        <Icon icon="entypo-social:github" />
        <a href="#" class="hover:text-amber-950">Source</a>
      </div>
    </div>
    <!-- top page end-->

    <!-- error msg -->
    <span class="mb-2 text-red-500 font-bold" v-if="error !== ''">{{
      error
    }}</span>
    <!-- error msg -->

    <!-- form and list -->
    <props-form
      @add-props="addProps"
      :count-props="propsList.length"
    ></props-form>
    <props-list :list="propsList"></props-list>
    <!-- form and list -->

    <!-- button for fetching and loading -->
    <div
      class="font-bold mt-4 flex flex-col place-items-center relative z-10"
      v-auto-animate
    >
      <button
        @click="fetchJoke"
        class="bg-amber-500 text-xl pl-4 pr-4 pb-2 pt-2 rounded-md uppercase shadow-md"
        v-if="propsList.length > 0"
      >
        Generate!
      </button>
      <img
        src="/loading-joke.gif"
        alt="loading joke"
        class="w-20"
        v-if="loading"
      />
    </div>
    <!-- button for fetching and loading -->

    <!-- joke display -->
    <span
      v-if="joke !== ''"
      ref="jokeEl"
      :key="joke"
      class="mt-5 font-semibold relative z-10"
    >
      {{ joke }}</span
    >

    <!-- copy to clip -->
    <div
      class="copy-container flex flex-col place-items-center mt-5 relative z-10"
      v-if="joke !== ''"
    >
      <Icon
        icon="ph:copy-thin"
        class="cursor-pointer text-3xl hover:scale-110 duration-300"
        @click="copyToClip"
      />
      <span :class="{ 'text-green-600': copyText === 'Copied!' }">{{
        copyText
      }}</span>
    </div>
  </main>
</template>

<script setup>
import PropsForm from "../components/PropsForm.vue";
import PropsList from "../components/PropsList.vue";
import { ref, provide, watch, nextTick } from "vue";
import { animate, stagger } from "motion";
import { Icon } from "@iconify/vue";
import SplitType from "split-type";
const propsList = ref([]);
const jokeEl = ref(null);
const joke = ref("");
const loading = ref(false);
const coppied = ref(false);
const copyText = ref("Copy to clipboard!");
const error = ref("");
const addProps = (props) => {
  propsList.value.push(props);
};

const removeProps = (props) => {
  propsList.value.splice(propsList.value.indexOf(props), 1);
};

watch(joke, (newJoke) => {
  nextTick(() => {
    const letters = SplitType.create(jokeEl.value);
    animate(
      letters.words,
      {
        opacity: [0, 1],
        translateY: [100, 0],
      },
      {
        delay: stagger(0.2),
      }
    );
  });
});

const fetchJoke = async () => {
  loading.value = true;
  try {
    const req = await fetch("https://dad-service.onrender.com/fetchjokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propsList.value),
    });
    const res = await req.json();
    joke.value = res.text;
    error.value = "";
  } catch (error) {
    error.value = "Someting went wrong!";
  } finally {
    loading.value = false;
    copyText.value = "Copy to clipboard!";
  }
};
const copyToClip = () => {
  navigator.clipboard.writeText(joke.value);
  copyText.value = "Copied!";
};

provide("deleteProps", removeProps);
</script>
