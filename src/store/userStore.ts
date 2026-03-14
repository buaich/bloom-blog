import { defineStore } from "pinia";
import type { ResponseBody } from "@/definitions/types/responseBody";
import type { User } from "@/definitions/types/user";
import { AuthType } from "@/definitions/types/auth";
import type { LoginParam, RegisterParam } from "@/definitions/types/auth";
import { ref } from "vue";
import http from "@/utils/network/http";

export const useUserStore = defineStore("user", () => {
  // State
  let userData = ref<ResponseBody<User>>({});

  /**
   * @description 用户认证并获取用户信息
   * @param {string} authType - 认证方式
   * @param {RegisterParam | LoginParam} payload - 请求体
   * @returns {Promise<boolean>} 是否成功
   */
  async function authenticate(
    authType: string,
    payload: RegisterParam | LoginParam,
  ): Promise<boolean> {
    if (authType === AuthType.Login) {
      // 更新
      userData.value = await http.post(`/user/${AuthType.Login}`, {
        ...payload,
      });
      return true;
    } else if (authType === AuthType.Register) {
      userData.value = await http.post(`/user/${AuthType.Register}`, {
        ...payload,
      });
      return true;
    }

    return false;
  }

  return { userData, authenticate };
});
