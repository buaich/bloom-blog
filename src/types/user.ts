// 定义用户信息相关接口
export interface UserData<T = any> {
  code: number;
  message: string;
  data: T;
}
