<script setup>
import { RouterLink, RouterView } from "vue-router";
import { loadFull } from "tsparticles";

const particlesInit = async (engine) => {
  await loadFull(engine);
};

const particleOptions = {
  detectRetina: true,
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",

    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 1,
        size: 40,
        speed: 3,
      },
      connect: {
        distance: 80,
        lineLinked: {
          opacity: 0.5,
        },
        radius: 60,
      },
      grab: {
        distance: 400,
        lineLinked: {
          opacity: 1,
        },
      },
      push: {
        quantity: 1,
      },
      remove: {
        quantity: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    lineLinked: {
      blink: false,
      color: "#000",
      consent: false,
      distance: 150,
      enable: false,
      opacity: 0,
      width: 0,
    },
    rotate: {
      value: 0,
      random: true,
      direction: "clockwise",
      animation: {
        enable: true,
        speed: 5,
        sync: false,
      },
    },
    move: {
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
      bounce: false,
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 1000,
      },
      limit: 0,
      value: 5,
    },
    opacity: {
      animation: {
        enable: false,
        minimumValue: 0.1,
        speed: 1,
        sync: false,
      },
      random: false,
      value: 0.8,
    },
    shape: {
      character: {
        fill: false,
        font: "Verdana",
        style: "",
        value: "*",
        weight: "400",
      },
      image: [
        {
          src: "https://em-content.zobj.net/thumbs/160/apple/354/face-with-tears-of-joy_1f602.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://em-content.zobj.net/thumbs/160/apple/354/face-with-tears-of-joy_1f602.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://em-content.zobj.net/thumbs/120/apple/354/skull_1f480.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://em-content.zobj.net/thumbs/120/google/350/eyes_1f440.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://em-content.zobj.net/thumbs/160/google/350/loudly-crying-face_1f62d.png",
          width: 32,
          height: 32,
        },
        {
          src: "https://em-content.zobj.net/thumbs/160/apple/354/melting-face_1fae0.png",
          width: 32,
          height: 32,
        },
      ],
      polygon: {
        nb_sides: 5,
      },
      stroke: {
        color: "#000000",
        width: 0,
      },
      type: "image",
    },
    size: {
      animation: {
        enable: false,
        minimumValue: 0.1,
        speed: 40,
        sync: true,
      },
      random: false,
      value: 16,
    },
  },
  polygon: {
    draw: {
      enable: false,
      lineColor: "#ffffff",
      lineWidth: 0.5,
    },
    move: {
      radius: 10,
    },
    scale: 1,
    type: "none",
    url: "",
  },
};
</script>

<template>
  <Particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="particleOptions"
  />
  <RouterView />
</template>

<style scoped>
#tsparticles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>
