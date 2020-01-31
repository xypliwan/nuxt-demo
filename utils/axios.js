import axios from 'axios'
// ,clearLocalStorage
import { getLocalStorage } from "~/utils/localStorage";
import { Message } from 'element-ui' //element Toast的提示
// import router from '@/router'

// let baseURL 
// switch (process.env.NODE_ENV) {
//   case 'development': 
//     baseURL = 'http://app.account-online.eccang.com'
//     // baseURL = 'http://app.ec-account.com'
//     break;
//   case 'production':
//     // baseURL = 'http://app.account.eccang.com:8602/'
//     baseURL = 'http://app.account-online.eccang.com'
//     break;
//   default:
//     break;
// }

const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_URL, 
    baseURL: 'http://app.account-online.eccang.com', 
    // timeout: 20000 
});

//请求拦截器
service.interceptors.request.use(config => {
    return config;
}, error => {
    Message.error({
      message:JSON.stringify(error),
      type:"error"
    })
    return Promise.reject(error)
})
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    if(res.code == 200){
      if(res.error == 4022 || res.error == 4004){
          //账号密码错误
        Message.error({
          message:res.message,
          type:"error"
        })
        return Promise.reject(res.data)
      }else if(res.error == 0){
        return response.data.data;
      }else if(res.error == 1001){
        // clearLocalStorage()
        Message.error({
          message:"登陆过期，重新登录",
          type:"error"
        })
        // setTimeout(()=>{
        //   router.push('/login')
        // },2000)
        
      }
    }else{      //出错
      Message.error({
        message:`服务端错误：${JSON.stringify(res)}`,
        type:"error"
      })
    }
  },
  error => {
    // Message.error({
    //   message:`服务端错误：${JSON.stringify(error)}`,
    //   type:"error"
    // })
    return Promise.reject(error)
  }
)

export default service;
