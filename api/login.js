import { post, get } from "@/plugins/axios.js";
export default {
  login(data) {
    return post(`/login`, data);
  },
};
