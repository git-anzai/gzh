import axios from 'axios';
import Qs from 'qs';
import Vue from 'vue'
/*
* axios封装
* */
var instance = axios.create({});
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const baseUrl = {
  host: 'https://www.zdzzk.com/',
}

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    //post传参序列化
    if (config.method === 'post') {
      config.data = Qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });


// http response 添加响应拦截器
axios.interceptors.response.use(
  response => {
/*  if(response.data.error == 110) {
    if(config.host){
      Vue.prototype.$Modal.confirm({
        title:'提示',
        content:response.data.message,
        okText:'去登录',
        onOk:function(){
          window.location.href="https://"+config.host+"/Cms/Index/index"
        }
      })
    }else{
      Vue.prototype.$Modal.confirm({
        title:'提示',
        content:response.data.message,
        okText:'去登录',
        onOk:function(){
          window.location.href="http://localhost:8080/#/login";
        }
      })
    }

  }*/
  return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:

      }
    }
    return Promise.reject(error)   // 返回接口返回的错误信息
  });

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(service,data = {}) {
  var _url = baseUrl.host;
  return new Promise((resolve, reject) => {
    axios.post(_url+service, data).then(response => {
      var res = response.data;
      if (res.code == "A00005") {
        // if(!res.success){
        //   Vue.prototype.$Modal.warning({
        //     title:'提示',
        //     content:res.message||res.msg
        //   })
        // }
      } else {
        Vue.prototype.$Message.warning({
          title:'提示',
          content:res.msg||res.message
        })
      }
      resolve(response.data);
    }, err => {
      reject(err);
    })
  })
}

export const Api = {
  'APP_GOODS_CLASSLIST':'App/Goods/classStoreList',
  'APP_GOODS_PUBLISHGOODS':'App/Goods/publishStoreGoods',
  'APP_GOODS_GOODSSTORELIST':'App/Goods/goodsStoreList',
  'APP_GOODS_DELGOODS':'App/Goods/delGoods',
  'APP_GOODS_GOODSSEARCH':'App/Goods/goodsSearch'

}
export default {
  post,baseUrl
}
