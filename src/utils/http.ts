import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// 创建一个AxiosInstance
const http: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10 * 1000,
});

const whiteList = ["/user/login", "/user/register"];

// 请求拦截器：token携带
http.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  // 登录、注册等白名单资源可以直接放行
  const url: string = config.url || "";
  const isWhite: boolean = whiteList.some((path) => url.includes(path));
  if (isWhite) return config;

  // 获取token
  const longToken: string = localStorage.getItem("long-token") || "";
  const shortToken: string = localStorage.getItem("short-token") || "";

  // token不能为null！
  if (longToken === "" || shortToken === "") {
    return Promise.reject(new Error("some token are null!"));
  }
  // 写入请求头中
  config.headers["long-token"] = longToken;
  config.headers["short-token"] = shortToken;
  return config;
});

// 响应拦截器：token本地化、解构出响应体
http.interceptors.response.use(
  (response) => {
    // 认证后，将双token保存在浏览器本地
    const url = response.config.url;
    // console.log("<http.ts>:interceptors.response execute", url);
    if (url == "/user/login" || url == "/user/register") {
      // console.log(response.headers);
      // 注意键为小写！
      const longToken = response.headers["long-token"];
      // console.log(longToken);
      const shortToken = response.headers["short-token"];

      if (longToken && shortToken) {
        localStorage.setItem("long-token", longToken);
        localStorage.setItem("short-token", shortToken);
      }
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 暴露出去！
export default http;
