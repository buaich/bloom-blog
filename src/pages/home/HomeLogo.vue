<script setup lang="ts" name="HomeLogo">
import { PathString } from "@/definitions/enums/home.enums";
import { onMounted, onBeforeUnmount, useTemplateRef, ref } from "vue";

// svg路径字符串
const planetStr = PathString.Planet;
const starStr = PathString.Star;
const rocketStr = PathString.Rocket;
// Path2D对象，存储一组绘制指令
const planetPath = new Path2D(planetStr);
const starPath = new Path2D(starStr);
const rocketPath = new Path2D(rocketStr);

/**
 * @description 从svg路径字符串中 提取路径边界框信息
 * @param {string} pathStr svg路径字符串
 * @return {Object} 路径边界框信息（路径的最小x坐标，路径的最小y坐标，路径的宽度，路径的高度）
 */
function getPathBoundsFromString(pathStr: string) {
  const numRegex = /[-+]?\d*\.?\d+/g;
  const nums = pathStr.match(numRegex)?.map(Number) || [];
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i],
      y = nums[i + 1];
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

// 提取路径边界框信息
const planetBounds = getPathBoundsFromString(planetStr);
const starBounds = getPathBoundsFromString(starStr);
const rocketBounds = getPathBoundsFromString(rocketStr);

// 计算路径中心坐标
const planetCenterX = planetBounds.minX + planetBounds.width / 2;
const planetCenterY = planetBounds.minY + planetBounds.height / 2;
const starCenterX = starBounds.minX + starBounds.width / 2;
const starCenterY = starBounds.minY + starBounds.height / 2;
const rocketCenterX = rocketBounds.minX + rocketBounds.width / 2;
const rocketCenterY = rocketBounds.minY + rocketBounds.height / 2;

// 画布元素引用
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
// 观察者
let resizeObserver: ResizeObserver | null = null;
let themeObserver: MutationObserver | null = null;
let animationId: number | null = null;
// 上一帧的时间戳
let lastTimestamp = 0;
// 画布宽度和高度
let cw = 0,
  ch = 0;
// 自定义光标是否显示
const showCustomCursor = ref(false);
// 自定义光标位置
const cursorPos = ref({ x: 0, y: 0 });
// 当前光标的旋转角度
const currentCursorAngle = ref(0);
// 目标光标的旋转角度
let targetCursorAngle = 0;
// 平滑系数∈[0,1]，越大越平滑，0.1表示每帧向目标靠近10%
const ANGLE_SMOOTHING = 0.1;
// 鼠标移动事件处理函数
let cursorMoveHandler: ((e: MouseEvent) => void) | null = null;
let cursorEnterHandler: ((e: MouseEvent) => void) | null = null;
let cursorLeaveHandler: ((e: MouseEvent) => void) | null = null;

type Star = {
  x: number;
  y: number;
  scale: number;
  angle: number;
  vx: number;
  vy: number;
  rotateSpeed: number;
};

type Planet = {
  x: number;
  y: number;
  scale: number;
  angle: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  selfRotateSpeed: number;
  centerX: number;
  centerY: number;
};

let stars: Star[] = [];
let planets: Planet[] = [];

/**
 * @description 计算星星数量
 * @param {number} area 区域面积
 * @return {number} 星星数量
 */
function calcStarCount(area: number): number {
  const minArea = 500 * 500,
    maxArea = 800 * 800;
  const minStars = 250,
    maxStars = 500;
  if (area <= minArea) return minStars;
  if (area >= maxArea) return maxStars;
  return Math.round(
    minStars + ((maxStars - minStars) * (area - minArea)) / (maxArea - minArea),
  );
}

/**
 * @description 生成星星
 * @param {number} count 星星数量
 * @return {Star[]} 星星数组
 */
function generateStars(count: number, width: number, height: number): Star[] {
  const starsArr: Star[] = [];
  const scaleMin = 0.005,
    scaleMax = 0.02;
  const speedRange = 1;
  const rotateSpeedMin = 0.1,
    rotateSpeedMax = 0.6;
  for (let i = 0; i < count; i++) {
    starsArr.push({
      x: Math.random() * width,
      y: Math.random() * height,
      scale: scaleMin + Math.random() * (scaleMax - scaleMin),
      angle: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * speedRange * 2,
      vy: (Math.random() - 0.5) * speedRange * 2,
      rotateSpeed:
        rotateSpeedMin + Math.random() * (rotateSpeedMax - rotateSpeedMin),
    });
  }
  return starsArr;
}
function generatePlanets(
  count: number,
  width: number,
  height: number,
  area: number,
): Planet[] {
  const planetsArr: Planet[] = [];
  const minArea = 500 * 500,
    maxArea = 800 * 800;
  const minScaleAtMinArea = 0.015,
    maxScaleAtMinArea = 0.04;
  const minScaleAtMaxArea = 0.03,
    maxScaleAtMaxArea = 0.1;
  let globalScaleMin: number, globalScaleMax: number;
  if (area <= minArea) {
    globalScaleMin = minScaleAtMinArea;
    globalScaleMax = maxScaleAtMinArea;
  } else if (area >= maxArea) {
    globalScaleMin = minScaleAtMaxArea;
    globalScaleMax = maxScaleAtMaxArea;
  } else {
    const t = (area - minArea) / (maxArea - minArea);
    globalScaleMin =
      minScaleAtMinArea + (minScaleAtMaxArea - minScaleAtMinArea) * t;
    globalScaleMax =
      maxScaleAtMinArea + (maxScaleAtMaxArea - maxScaleAtMinArea) * t;
  }
  const centerX = width / 2,
    centerY = height / 2;
  const minRadius = Math.min(width, height) * 0.12;
  const maxRadius = Math.min(width, height) * 0.85;
  const maxAngularSpeed = 0.08;
  const minAngularSpeed = 0.02;
  const selfRotateSpeedMin = 0.1,
    selfRotateSpeedMax = 0.4;
  const exponent = 1.6;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const orbitRadius =
      minRadius + (maxRadius - minRadius) * Math.pow(t, exponent);
    const speedT = (orbitRadius - minRadius) / (maxRadius - minRadius);
    const orbitSpeed =
      maxAngularSpeed - speedT * (maxAngularSpeed - minAngularSpeed);
    const radiusT = (orbitRadius - minRadius) / (maxRadius - minRadius);
    const scale = globalScaleMin + (globalScaleMax - globalScaleMin) * radiusT;
    const initialOrbitAngle = Math.random() * Math.PI * 2;
    planetsArr.push({
      x: centerX + orbitRadius * Math.cos(initialOrbitAngle),
      y: centerY + orbitRadius * Math.sin(initialOrbitAngle),
      scale,
      angle: Math.random() * Math.PI * 2,
      orbitRadius,
      orbitAngle: initialOrbitAngle,
      orbitSpeed,
      selfRotateSpeed:
        selfRotateSpeedMin +
        Math.random() * (selfRotateSpeedMax - selfRotateSpeedMin),
      centerX,
      centerY,
    });
  }
  return planetsArr;
}

/**
 * @description 获取CSS变量值
 * @param {string} varName CSS变量名
 * @return {string} CSS变量值
 */
function getCssVar(varName: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(varName);
}

/**
 * @description 绘制
 */
function draw() {
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext("2d");
  if (!ctx || cw === 0 || ch === 0) return;

  // 清除画布
  ctx.clearRect(0, 0, cw, ch);

  // 获取CSS颜色
  const planetClr = getCssVar("--planet-clr");
  const starClr = getCssVar("--star-clr");
  const orbitClr = getCssVar("--orbit-clr") || "rgba(255, 255, 255, 0.2)";

  // 绘制轨道
  const radii = planets.map((p) => p.orbitRadius).sort((a, b) => b - a);
  const maxRadius1 = radii[0];
  const maxRadius2 = radii[1];

  for (const p of planets) {
    if (p.orbitRadius === maxRadius1 || p.orbitRadius === maxRadius2) continue;
    ctx.beginPath();
    ctx.arc(p.centerX, p.centerY, p.orbitRadius, 0, Math.PI * 2);
    ctx.strokeStyle = orbitClr;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // 绘制行星
  for (const p of planets) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.scale(p.scale, p.scale);
    ctx.translate(-planetCenterX, -planetCenterY);
    ctx.fillStyle = planetClr;
    ctx.fill(planetPath);
    ctx.restore();
  }

  // 绘制星星
  for (const s of stars) {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.angle);
    ctx.scale(s.scale, s.scale);
    ctx.translate(-starCenterX, -starCenterY);
    ctx.fillStyle = starClr;
    ctx.fill(starPath);
    ctx.restore();
  }
}

/**
 * @description 绘制火箭光标
 * @param {CanvasRenderingContext2D} ctx Canvas上下文
 */
function drawRocketCursor(ctx: CanvasRenderingContext2D) {
  if (!showCustomCursor.value) return;

  const { x, y } = cursorPos.value;
  if (x < 0 || x > cw || y < 0 || y > ch) return;

  const rocketScale = 0.03;
  const rocketColor = getCssVar("--rocket-clr") || "#DD75A1";

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(currentCursorAngle.value); // 使用平滑后的角度
  ctx.scale(rocketScale, rocketScale);
  ctx.translate(-rocketCenterX, -rocketCenterY);
  ctx.fillStyle = rocketColor;
  ctx.fill(rocketPath);
  ctx.restore();
}

/**
 * @description 更新星星位置
 * @param {number} deltaSec 时间间隔
 */
function updateStars(deltaSec: number) {
  for (const s of stars) {
    s.x += s.vx * deltaSec;
    s.y += s.vy * deltaSec;
    if (s.x < 0) {
      s.x = -s.x;
      s.vx = -s.vx;
    } else if (s.x > cw) {
      s.x = 2 * cw - s.x;
      s.vx = -s.vx;
    }
    if (s.y < 0) {
      s.y = -s.y;
      s.vy = -s.vy;
    } else if (s.y > ch) {
      s.y = 2 * ch - s.y;
      s.vy = -s.vy;
    }
    s.angle += s.rotateSpeed * deltaSec;
    if (s.angle > Math.PI * 2) s.angle -= Math.PI * 2;
  }
}
function updatePlanets(deltaSec: number) {
  for (const p of planets) {
    p.orbitAngle += p.orbitSpeed * deltaSec;
    p.x = p.centerX + p.orbitRadius * Math.cos(p.orbitAngle);
    p.y = p.centerY + p.orbitRadius * Math.sin(p.orbitAngle);
    p.angle += p.selfRotateSpeed * deltaSec;
    if (p.angle > Math.PI * 2) p.angle -= Math.PI * 2;
  }
}
function updateCursorAngle(deltaSec: number) {
  if (!showCustomCursor.value) return;
  // 使用指数移动平均平滑角度
  let delta = targetCursorAngle - currentCursorAngle.value;
  // 处理角度循环（确保差值在 -PI 到 PI 之间）
  if (delta > Math.PI) delta -= Math.PI * 2;
  if (delta < -Math.PI) delta += Math.PI * 2;
  // 按平滑系数逐步逼近
  const step = delta * ANGLE_SMOOTHING;
  currentCursorAngle.value += step;
  // 归一化到 [-PI, PI]
  if (currentCursorAngle.value > Math.PI)
    currentCursorAngle.value -= Math.PI * 2;
  if (currentCursorAngle.value < -Math.PI)
    currentCursorAngle.value += Math.PI * 2;
}

/**
 * @description 动画循环
 * @param {number} timestamp 时间戳
 */
function animate(timestamp: number) {
  if (!canvasRef.value || cw === 0 || ch === 0) {
    animationId = requestAnimationFrame(animate);
    return;
  }
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
    animationId = requestAnimationFrame(animate);
    return;
  }
  let deltaSec = (timestamp - lastTimestamp) / 1000;
  if (deltaSec > 0.1) deltaSec = 0.1;
  if (deltaSec > 0) {
    updateStars(deltaSec);
    updatePlanets(deltaSec);
    updateCursorAngle(deltaSec); // 平滑更新角度
    draw();
    const ctx = canvasRef.value?.getContext("2d");
    if (ctx) drawRocketCursor(ctx);
  }
  lastTimestamp = timestamp;
  animationId = requestAnimationFrame(animate);
}

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
  const planetCount = 8;
  planets = generatePlanets(planetCount, cw, ch, area);
  const starCount = calcStarCount(area);
  stars = generateStars(starCount, cw, ch);

  draw();
}

function initObservers() {
  const container = containerRef.value;
  if (!container) return;
  resizeObserver = new ResizeObserver(() => updateCanvasSize());
  resizeObserver.observe(container);
  themeObserver = new MutationObserver(() => draw());
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

function initCursorEvents() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  cursorEnterHandler = () => {
    showCustomCursor.value = true;
    canvas.style.cursor = "none";
  };

  cursorMoveHandler = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursorPos.value = { x, y };
    if (e.movementX !== 0 || e.movementY !== 0) {
      targetCursorAngle = Math.atan2(e.movementY, e.movementX);
    }
  };

  cursorLeaveHandler = () => {
    showCustomCursor.value = false;
    canvas.style.cursor = "";
  };

  canvas.addEventListener("mouseenter", cursorEnterHandler);
  canvas.addEventListener("mousemove", cursorMoveHandler);
  canvas.addEventListener("mouseleave", cursorLeaveHandler);
}

function cleanupCursorEvents() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  if (cursorEnterHandler)
    canvas.removeEventListener("mouseenter", cursorEnterHandler);
  if (cursorMoveHandler)
    canvas.removeEventListener("mousemove", cursorMoveHandler);
  if (cursorLeaveHandler)
    canvas.removeEventListener("mouseleave", cursorLeaveHandler);
}

onMounted(() => {
  initObservers();
  updateCanvasSize();
  lastTimestamp = 0;
  animationId = requestAnimationFrame(animate);
  initCursorEvents();
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  if (themeObserver) {
    themeObserver.disconnect();
    themeObserver = null;
  }
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  cleanupCursorEvents();
});
</script>

<template>
  <div ref="containerRef" class="home-logo">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
.home-logo {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--bg-clr);
}
</style>
