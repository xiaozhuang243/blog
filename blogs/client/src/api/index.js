import axios from "axios";//导入
import qs from 'qs'
axios.defaults.baseURL = 'http://localhost:3002';//默认访问地址
axios.defaults.withCredentials = true;//跨域允许携带

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";//设置post请求格式
export default {
  //获取文章信息
  //
  getArticleInfo () {
    return axios.post("/article/getInfo");
  },
  //获取热门文章
  getArticleHot (limit = 8) {
    return axios.post('/article/getHot',);//{skip:0,limit:0}从第几个开始到第几个结束
  },
  //获取文章列表
  getArticleShow: (function () {
    let skip = 0;
    let limit = 5;


    return function (index = 0, ifFresh = false) {
      if (ifFresh) {
        skip = 0;
        limit = 5;
      }

      let tag = ["", "HTML&Css", "JavaScript", "Node", "Vue&React", "算法"][index];

      let data = { skip, limit, tag };
      skip += limit;
      return axios.post('/article/getShow', qs.stringify(data));
    }
  })(),
  //获取单篇文章信息
  getArticle (_id) {
    return axios.post('/article', qs.stringify({ _id }));
  },
  //获取延伸阅读
  getArticleExtend (tag) {
    return axios.post("/article/extend", qs.stringify({ tag }));
  },
  //搜索文章
  getArticleSearch (keywords) {
    return axios.post("/article/search", qs.stringify({ keywords }));
  },
  //获取验证码图片

  getRegisterVCode () {
    return axios.post("/register/vcode");
  },
  //验证码的提交验证
  getRegisterCheckVcode (val) {
    return axios.post('/register/checkVcode', qs.stringify({ ...val }))
  },
  //注册提交
  postRegister (options) {
    return axios.post('/register', qs.stringify({ ...options }))
  },




  /*登录的接口*/
  postLogin (options) {
    return axios.post('/login', qs.stringify({ ...options }))
  },
  postIfLogin () {
    return axios.post("/login/ifLogin");
  },
  postLogout () {
    return axios.post("/login/logout");
  },






  /*留言的接口 options => {user:"id", content:""}*/
  commitMessage (options) {
    return axios.post("/message/commit", qs.stringify({ ...options }));
  },
  /*留言的留言接口 options => {parentId:"id",user:"id",content:"",$user:""}*/
  commitChildMessage (options) {
    return axios.post('/message/childCommit', qs.stringify({ ...options }))
  },

  /*获取留言列表 options => */
  getMessageList (skip = 0, limit = 5) {
    return axios.post('/message/getList', qs.stringify({ skip, limit }));
  }
  /*最近访问接口*/
  , getVisitor () {
    return axios.post("/visitor");
  }

  /*日记接口*/
  , getDiary () {
    return axios.get("/diary");
  }
  /*友链接口*/
  , getLinks () {
    return axios.get("/links");
  }
};