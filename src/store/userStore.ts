import { defineStore } from "pinia";
import type { ResponseBody } from "@/definitions/types/responseBody";
import type { User } from "@/definitions/types/user";
import { Auth } from "@/definitions/enums/auth.enums";
import type { LoginParam, RegisterParam } from "@/definitions/enums/auth.enums";
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
    if (authType === Auth.Login) {
      // 更新
      userData.value = await http.post(`/user/${Auth.Login}`, {
        ...payload,
      });
      return true;
    } else if (authType === Auth.Register) {
      userData.value = await http.post(`/user/${Auth.Register}`, {
        ...payload,
      });
      return true;
    }

    return false;
  }

  return { userData, authenticate };
});
