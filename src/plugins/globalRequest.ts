/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request'; // 需集成类
import {message} from "antd"; // 提示框
import {history} from "@@/core/history";
import {stringify} from "querystring";
import * as process from "process";

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  prefix:process.env.NODE_ENV==="production"? 'http://lhweb.asia' : undefined
  // prefix:process.env.NODE_ENV==="production"? undefined : undefined
  // requestType: 'form',
});

/**
 * 所有请求拦截器
 *  1. 在请求后端API前，统一做处理，比如 改变url参数，附带统一参数等
 */
request.interceptors.request.use((url, options) => {
  // 打印每次请求的API
  console.log(`do request url = ${url}`);

  return {
    url,
    options: {
      ...options,
      // headers: {},
    },
  };
});

/**
 * 所有响应拦截器
 *  1. 接收来自后端返回结果后，统一处理地方，比如异常处理提示
 */
request.interceptors.response.use(async response => {
    const res = await response.clone().json();
    if (res.code === 200) {
      // 成功，则取出 data内容 直接返回
      return res.data;
    }
    if (res.code === 40100) {       // 未登录错误码
      message.error('请先登录');
      // 跳转登录地址
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: location.pathname,
        }),
      });
    } else {
      message.error(res.description)
    }
    return res.data;
  }
);

export default request;
