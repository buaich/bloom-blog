<script setup lang="ts" name="Auth">
import { ref, nextTick, onUnmounted, watch } from "vue";
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { AuthType } from "@/types/auth";

let userName = ref(""); //用户名
let userPhone = ref(""); //手机号
let userPassword = ref(""); //密码
let message = ref(""); // 提示信息

const store = useUserStore();
const { userData } = storeToRefs(store);
const { authenticate }: { authenticate: Function } = store;

let timer: ReturnType<typeof setTimeout> | null = null; //计时管理器

const route = useRoute();
let authType = ref(route.params?.authType); //（客户端路由）路径参数
watch(
  () => route.params?.authType,
  (newAuthType) => {
    authType.value = newAuthType;
  },
);
/**
 * @description 用户登录
 */
async function auth(): Promise<void> {
  const payload =
    authType.value === AuthType.Login
      ? { userName: userName.value, userPassword: userPassword.value }
      : {
          userName: userName.value,
          userPhone: userPhone.value,
          userPassword: userPassword.value,
        };

  await authenticate(authType.value, payload);

  message.value = userData.value.message as string | "";

  if (timer) clearTimeout(timer);
  nextTick(() => {
    timer = setTimeout(() => {
      message.value = "";
    }, 2 * 1000);
  });
}

onUnmounted(() => {
  // 清空定时器
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div class="login-form-wrapper">
    <div class="login-form">
      <h2>{{ authType }}</h2>

      <!-- 用户名输入框 -->
      <div class="input-group">
        <input
          type="text"
          id="username"
          v-model="userName"
          placeholder=" "
          required
        />
        <label for="username">username</label>
      </div>

      <div class="input-group" v-show="authType === AuthType.Register">
        <input
          type="text"
          id="phone"
          v-model="userPhone"
          placeholder=" "
          required
        />
        <label for="phone">phone</label>
      </div>

      <!-- 密码输入框 -->
      <div class="input-group">
        <input
          type="password"
          id="password"
          v-model="userPassword"
          placeholder=" "
          required
        />
        <label for="password">password</label>
      </div>

      <div class="login-message-wrapper">
        <p v-show="message" class="login-message">{{ message }}</p>
      </div>
      <button class="login-button" @click="auth">{{ authType }}</button>
    </div>
  </div>
</template>

<style scoped>
.login-form-wrapper {
  display: flex;
  justify-content: center;
  background-color: rgb(254, 252, 252);
  width: 400px;
  height: 350px;
  border-radius: 15px;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

/* 输入框容器 */
.input-group {
  position: relative;
  width: 250px;
}

/* 输入框样式 */
.input-group input {
  width: 100%;
  padding: 6px 3px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background: transparent;
  outline: none;
  transition: border-color 0.3s ease;
}
.input-group input:focus {
  border-color: black;
}

/* 标签样式 - 默认在输入框内部 */
.input-group label {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #666;
  background-color: rgb(254, 252, 252);
  pointer-events: none;
  transition: all 0.3s ease;
}

/* 
  当输入框获得焦点或有内容时，标签浮动到右上角
  :focus 获得焦点时
  :not(:placeholder-shown) 有内容时（利用 placeholder=" " 判断）
*/
.input-group input:focus ~ label,
.input-group input:not(:placeholder-shown) ~ label {
  top: 0;
  left: 8px;
  transform: translateY(-50%);
  font-size: 12px;
  color: black;
}

/* 输入框有内容但未获得焦点时，标签颜色为灰色 */
.input-group input:not(:placeholder-shown):not(:focus) ~ label {
  color: #bbb;
}

.login-message-wrapper {
  height: 20px;
  width: 200px;
}

.login-message {
  margin: 0;
  border: 0;
  padding: 0;
  text-align: center;
  color: #e74c3c;
  font-size: 14px;
}

.login-button {
  font-size: 1em;
  border-radius: 15px;
  border-color: transparent;
  padding: 0.6em 1.2em;
  background-color: rgba(4, 4, 4, 0.6);
  color: whitesmoke;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.login-button:hover {
  outline: 2px auto black;
  opacity: 0.9;
}
</style>
