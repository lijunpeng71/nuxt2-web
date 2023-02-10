import axios from "axios";
import { MessageBox, Message } from "element-ui";
import cookie from "js-cookie";

//开启代理
axios.defaults.proxy = true;
// 默认地址
axios.defaults.baseURL = "http://localhost:8080";
//设置请求超时的时间
axios.defaults.timeout = 5000;

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // token 先不处理，后续使用时在完善
    if (cookie.get("token")) {
      config.headers["Authorization"] = "Bearer " + cookie.get("token");
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code === 208) {
      return;
    } else {
      if (response.data.code !== 200) {
        if (response.data.code === 401) {
          location.href = "/login";
        }
        Message({
          message: response.data.msg,
          type: "error",
          duration: 5 * 1000,
        });
        return Promise.reject(response.data);
      } else {
        return response.data;
      }
    }
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
