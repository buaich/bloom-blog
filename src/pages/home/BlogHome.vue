<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, useTemplateRef } from "vue";

const planetPathData = `M509.504 174c124.227 0 232.599 67.853 290.039 168.5 74.007-2.473 118.628 10.752 142.715 38.877 4.602 5.373 8.222 11.026 11.182 17.082a97.867 97.867 0 0 1 3.1 7.06l0.36 0.92 1.55 4.147c0.5 1.36 0.902 2.755 1.2 4.174 10.354 49.217-39.577 110.87-125.104 168.42C800.252 730.91 667.741 841 509.504 841c-90.496 0-172.577-36.007-232.685-94.469-125.547-0.693-195.726-17.626-215.627-62.838-12.318-27.985-2.11-57.599 24.175-87.882 11.313-13.034 26.141-26.85 44.532-41.546l3.188-2.528 3.258-2.545c0.548-0.426 1.1-0.852 1.654-1.28l3.363-2.571c1.132-0.86 2.277-1.723 3.432-2.59l3.503-2.606c0.59-0.436 1.182-0.873 1.777-1.31l3.608-2.634c1.214-0.881 2.44-1.765 3.678-2.652l3.748-2.67 3.818-2.689 3.889-2.706 3.959-2.726 2.005-1.37 1.301-0.885a339.225 339.225 0 0 1-0.248-13.003c0-184.187 149.39-333.5 333.672-333.5zM754.17 630.563l-1.716 0.887c-113.877 58.925-247.706 99.169-383.021 111.28 40.98 24.434 88.885 38.47 140.07 38.47 106.955 0 199.589-61.285 244.667-150.637zM509.504 233.8c-151.239 0-273.842 122.54-273.842 273.7 0 68.475 25.16 131.077 66.742 179.076 150.84-3.066 304.436-45.572 430.401-112.347a834.13 834.13 0 0 0 12.143-6.565l4.768-2.651a761.557 761.557 0 0 0 30.824-18.216 275.324 275.324 0 0 0 2.805-39.297c0-151.16-122.603-273.7-273.841-273.7zM185.397 587.106l-2.466 1.82-3.004 2.243-2.937 2.223c-0.485 0.368-0.966 0.736-1.445 1.103l-2.839 2.19c-0.468 0.363-0.933 0.726-1.395 1.087l-2.74 2.158-1.346 1.071-2.641 2.126a431.241 431.241 0 0 0-5.085 4.187l-2.444 2.06a366.882 366.882 0 0 0-3.54 3.05l-2.279 2.005-2.211 1.983-2.146 1.961-2.079 1.938-2.013 1.916c-0.66 0.635-1.308 1.266-1.946 1.893l-1.88 1.87-1.813 1.848c-0.593 0.612-1.175 1.22-1.746 1.825l-1.68 1.801a170.51 170.51 0 0 0-1.614 1.778l-1.546 1.755c-7.45 8.583-11.973 15.762-13.808 21.083-0.5 1.453-0.719 2.521-0.759 3.242l-0.008 0.317-0.007 0.018 0.028 0.056c0.123 0.222 0.383 0.575 0.861 1.077l0.258 0.264c1.306 1.305 3.29 2.78 6.01 4.335 6.987 3.997 17.411 7.726 31.126 10.869 0.874 0.2 1.76 0.398 2.658 0.592l2.726 0.576 2.794 0.56 2.863 0.541 2.93 0.526 2.999 0.508 3.066 0.491 1.559 0.24 3.168 0.465 3.236 0.448 3.304 0.432c0.556 0.07 1.115 0.14 1.677 0.209l3.405 0.405c0.573 0.067 1.15 0.132 1.728 0.197l3.506 0.38 1.779 0.183 3.607 0.354 3.675 0.336 3.742 0.319c0.629 0.052 1.26 0.103 1.896 0.153l3.842 0.293 3.91 0.275 3.976 0.258 4.044 0.24 0.796 0.05c-18.862-29.86-33.112-62.921-41.752-98.183z m161.097-154.24c13.576 8.96 17.466 27.078 8.893 40.788l-0.41 0.64c-8.841 13.382-11.28 30.817-6.395 53.959l0.285 1.316c3.564 16.124-6.625 32.084-22.758 35.646-16.133 3.562-32.1-6.621-35.664-22.746-8.547-38.666-4.006-72.956 14.601-101.124 9.103-13.781 27.66-17.577 41.448-8.478z m479.688-30.732l1.6 4.941c10.001 31.693 15.394 65.43 15.394 100.425l-0.043-5.412c8.239-6.862 15.784-13.674 22.569-20.38 14.09-13.93 24.307-26.855 30.197-37.83 2.516-4.687 4.107-8.772 4.845-12.105 0.295-1.33 0.43-2.406 0.456-3.25v-0.205l-0.142-0.37a75.81 75.81 0 0 0-0.537-1.333l-0.499-1.163-0.474-1.02c-0.78-1.593-1.516-2.7-2.5-3.881l-0.242-0.286c-4.028-4.703-11.335-9.008-24.472-12.5-0.676-0.18-1.363-0.355-2.06-0.527l-2.122-0.503c-4.308-0.983-8.998-1.822-14.08-2.508l-2.575-0.33c-1.738-0.212-3.52-0.407-5.346-0.583l-2.772-0.253-2.839-0.225-2.906-0.2c-3.66-0.23-7.477-0.399-11.452-0.502zM531.984 264.881c16.452 1.52 28.556 16.083 27.034 32.526-1.52 16.443-16.09 28.54-32.542 27.02-61.86-5.716-104.309 14.613-132.552 62.546-8.384 14.229-26.721 18.97-40.958 10.591-14.236-8.38-18.98-26.708-10.597-40.937 40.326-68.44 105.266-99.54 189.615-91.746z`;

const starPathData = `M313.991837 914.285714c-20.37551 0-40.228571-6.269388-56.946939-18.808163-30.302041-21.942857-44.930612-58.514286-38.661225-95.085714l24.032654-141.061225c3.134694-18.285714-3.134694-36.571429-16.195919-49.110204L123.297959 509.910204c-26.644898-26.122449-36.04898-64.261224-24.555102-99.787755 11.493878-35.526531 41.795918-61.126531 78.889796-66.35102l141.583674-20.375511c18.285714-2.612245 33.959184-14.106122 41.795918-30.30204l63.216326-128.522449C440.946939 130.612245 474.383673 109.714286 512 109.714286s71.053061 20.897959 87.24898 54.334694L662.987755 292.571429c8.359184 16.195918 24.032653 27.689796 41.795918 30.30204l141.583674 20.375511c37.093878 5.22449 67.395918 30.82449 78.889796 66.35102 11.493878 35.526531 2.089796 73.665306-24.555102 99.787755l-102.4 99.787755c-13.061224 12.538776-19.330612 31.346939-16.195919 49.110204l24.032654 141.061225c6.269388 37.093878-8.359184 73.142857-38.661225 95.085714-30.302041 21.942857-69.485714 24.555102-102.4 7.314286L538.122449 836.440816c-16.195918-8.359184-35.526531-8.359184-51.722449 0l-126.955102 66.87347c-14.628571 7.314286-30.302041 10.971429-45.453061 10.971428z`;

/**
 * @description 解析SVG路径字符串中的所有坐标点，并计算出这些点的最小包围盒
 * @param {string} pathData SVG路径字符串
 * @return {Object} 包含最小包围盒信息的对象
 */
function getPathBounds(pathData: string) {
  // 匹配所有数字，包括负数、小数、整数
  const numRegex = /[-+]?\d*\.?\d+/g;
  const nums = pathData.match(numRegex)?.map(Number) || [];

  // 初始化最小包围盒的边界值
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  // 两个元素为一组，构成一个点的坐标，更新最小包围盒的边界值
  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i + 1];
    if (x !== undefined && y !== undefined) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  return {
    minX: isFinite(minX) ? minX : 0,
    minY: isFinite(minY) ? minY : 0,
    width: maxX - minX,
    height: maxY - minY,
  };
}

// 预计算路径边界信息
const planetBounds = getPathBounds(planetPathData);
const starBounds = getPathBounds(starPathData);

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
let resizeObserver: ResizeObserver | null = null;

let cw = 0, //画布宽度
  ch = 0; //画布高度

// 星星类型：包含星星的位置、缩放、旋转角度信息
type Star = { x: number; y: number; scale: number; angle: number };
// 星星数组：每个元素包含 { x, y, scale, angle }
let stars: Star[] = [];
// 星球类型：包含星球的位置、缩放、旋转角度信息
type Planet = { x: number; y: number; scale: number; angle: number };
// 星球数组：每个元素包含 { x, y, scale, angle }
let planets: Planet[] = [];

/**
 * @description 根据容器面积计算星星数量，线性变化
 * @param {number} area 容器面积
 * @return {number} 星星数量
 */
function calcStarCount(area: number): number {
  const minArea = 500 * 500;
  const maxArea = 800 * 800;

  const minStars = 500;
  const maxStars = 1000;
  if (area <= minArea) return minStars;
  if (area >= maxArea) return maxStars;

  return Math.round(
    minStars + ((maxStars - minStars) * (area - minArea)) / (maxArea - minArea),
  );
}
function calcPlanetCount(area: number): number {
  const minArea = 500 * 500;
  const maxArea = 800 * 800;
  const minPlanets = 1;
  const maxPlanets = 10;

  if (area <= minArea) return minPlanets;
  if (area >= maxArea) return maxPlanets;
  return Math.round(
    minPlanets +
      ((maxPlanets - minPlanets) * (area - minArea)) / (maxArea - minArea),
  );
}

/**
 * @description 生成随机星星信息
 * @param {number} count 星星数量
 * @param {number} width 容器宽度
 * @param {number} height 容器高度
 * @return {Star[]} 星星信息数组
 */
function generateStars(count: number, width: number, height: number) {
  const starsArr: Star[] = [];
  const scaleMin = 0.005;
  const scaleMax = 0.02;
  for (let i = 0; i < count; i++) {
    starsArr.push({
      x: Math.random() * width,
      y: Math.random() * height,
      scale: scaleMin + Math.random() * (scaleMax - scaleMin),
      angle: Math.random() * Math.PI * 2,
    });
  }
  return starsArr;
}
function generatePlanets(
  count: number,
  width: number,
  height: number,
  area: number,
) {
  const planetsArr: Planet[] = [];

  // 缩放范围随面积线性变化
  const minArea = 500 * 500;
  const maxArea = 800 * 800;
  const minScaleAtMinArea = 0.02;
  const maxScaleAtMinArea = 0.06;
  const minScaleAtMaxArea = 0.05;
  const maxScaleAtMaxArea = 0.12;

  // 计算当前面积下的缩放范围（线性插值）
  let scaleMin, scaleMax;
  if (area <= minArea) {
    scaleMin = minScaleAtMinArea;
    scaleMax = maxScaleAtMinArea;
  } else if (area >= maxArea) {
    scaleMin = minScaleAtMaxArea;
    scaleMax = maxScaleAtMaxArea;
  } else {
    const t = (area - minArea) / (maxArea - minArea);
    scaleMin = minScaleAtMinArea + (minScaleAtMaxArea - minScaleAtMinArea) * t;
    scaleMax = maxScaleAtMinArea + (maxScaleAtMaxArea - maxScaleAtMinArea) * t;
  }

  for (let i = 0; i < count; i++) {
    planetsArr.push({
      x: Math.random() * width,
      y: Math.random() * height,
      scale: scaleMin + Math.random() * (scaleMax - scaleMin),
      angle: Math.random() * Math.PI * 2,
    });
  }
  return planetsArr;
}

/**
 * @description 绘制星星
 */
function draw() {
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d");
  if (!ctx || cw === 0 || ch === 0) return;

  ctx.clearRect(0, 0, cw, ch);

  // ---------- 绘制所有星球 ----------
  if (planets.length) {
    const planetPath = new Path2D(planetPathData);
    for (const p of planets) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(p.scale, p.scale);
      ctx.translate(-planetBounds.minX, -planetBounds.minY);
      ctx.fillStyle = "#ff6b6b"; // 星球颜色，可修改
      ctx.fill(planetPath);
      ctx.restore();
    }
  }

  // ---------- 绘制所有星星（与原代码相同） ----------
  if (stars.length) {
    const starPath = new Path2D(starPathData);
    for (const s of stars) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.angle);
      ctx.scale(s.scale, s.scale);
      ctx.translate(-starBounds.minX, -starBounds.minY);
      ctx.fillStyle = "#ffd966";
      ctx.fill(starPath);
      ctx.restore();
    }
  }
}

/**
 * @description 更新画布尺寸并重绘
 */
function updateCanvasSize() {
  const container = containerRef.value;
  if (!container) return;
  const rect = container.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  const canvas = canvasRef.value;
  if (!canvas) return;
  canvas.width = rect.width;
  canvas.height = rect.height;
  cw = rect.width;
  ch = rect.height;

  const area = cw * ch;

  // 生成星球
  const planetCount = calcPlanetCount(area);
  planets = generatePlanets(planetCount, cw, ch, area);

  // 生成星星
  const starCount = calcStarCount(area); // 使用原来的星星数量函数
  stars = generateStars(starCount, cw, ch); // 原来的星星生成函数不变

  draw();
}

// 监听容器尺寸变化
function initResizeObserver() {
  const container = containerRef.value;
  if (!container) return;
  resizeObserver = new ResizeObserver(() => {
    updateCanvasSize();
  });
  resizeObserver.observe(container);
}

onMounted(() => {
  initResizeObserver();
  updateCanvasSize();
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
</script>

<template>
  <div class="container">
    <div ref="containerRef" class="home-logo">
      <canvas
        ref="canvasRef"
        style="display: block; width: 100%; height: 100%"
      ></canvas>
    </div>
    <div class="home-title">
      <span class="home-title__letter">B </span>
      <span class="home-title__letter">l </span>
      <span class="home-title__letter">o </span>
      <span class="home-title__letter">o </span>
      <span class="home-title__letter">m </span>
      <span class="home-title__letter">' </span>
      <span class="home-title__letter">s </span>
      <span class="home-title__letter">&nbsp; </span>
      <span class="home-title__word">world</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0 calc(var(--font-size) * 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--font-clr-one);
}

.home-logo {
  position: relative;
  width: 100%;
  height: 60%;
  background-color: var(--bg-clr);
}

.home-title__letter,
.home-title__word {
  font-size: 3em;
  font-weight: 700;
  display: inline-block;
  text-shadow: calc(var(--font-size) / 8) calc(var(--font-size) / 8)
    calc(var(--font-size) / 8) var(--font-clr-two);

  opacity: 0;
  animation: wordsDisplay 1s forwards;
  transition: all 1s ease-in;
}

.home-title__letter:nth-child(1) {
  animation-delay: 0.05s;
}
.home-title__letter:nth-child(2) {
  animation-delay: 0.1s;
}
.home-title__letter:nth-child(3) {
  animation-delay: 0.15s;
}
.home-title__letter:nth-child(4) {
  animation-delay: 0.2s;
}
.home-title__letter:nth-child(5) {
  animation-delay: 0.25s;
}
.home-title__letter:nth-child(6) {
  animation-delay: 1s;
}
.home-title__letter:nth-child(7) {
  animation-delay: 0.35s;
}
.home-title__letter:nth-child(8) {
  animation-delay: 0.4s;
}
.home-title__letter:nth-child(9) {
  animation-delay: 0.45s;
}

@keyframes wordsDisplay {
  0% {
    opacity: 0;
    margin-top: 0px;
  }
  25% {
    opacity: 0.25;
    margin-top: 20px;
  }
  50% {
    opacity: 0.5;
    margin-top: 20px;
  }
  75% {
    opacity: 0.75;
    margin-top: 20px;
  }
  100% {
    opacity: 1;
    margin-top: 0px;
  }
}

.home-title__letter:nth-of-type(1):hover {
  transform: translateY(var(--font-size));
}
.home-title__letter:nth-of-type(2):hover {
  transform: translateY(calc(var(--font-size) * -1));
}
.home-title__letter:nth-of-type(3):hover {
  transform: translateX(var(--font-size));
}
.home-title__letter:nth-of-type(4):hover {
  transform: translateX(calc(var(--font-size) * -1));
}
.home-title__letter:nth-of-type(5):hover {
  transform: rotate(360deg);
}
.home-title__letter:nth-of-type(6):hover {
  transform: scale(1.5);
}
.home-title__letter:nth-of-type(7):hover {
  transform: skewX(-30deg);
}
</style>
