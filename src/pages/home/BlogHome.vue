<script setup lang="ts" name="BlogHome">
import { onMounted, useTemplateRef } from "vue";

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvas");

function draw() {
  const ctx = canvasRef.value?.getContext("2d");
  if (!ctx) return;

  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(110, 110);
  ctx.lineTo(120, 110);
  ctx.lineTo(110, 110);
  ctx.closePath();
  ctx.stroke();
}
</script>

<template>
  <div class="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  color: var(--font-clr-one);
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
