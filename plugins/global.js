import Vue from "vue";
import { post, get } from "./axios.js";

//定义全局变量
Vue.prototype.post = post;
Vue.prototype.get = get;
