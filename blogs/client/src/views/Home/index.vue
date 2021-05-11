<template>
  <div class="bigBox">
    <div class="title">
      <p class="oneTitle">小庄的博客</p>
      <p class="twoTitle"><span>————</span> 感谢您的到来 <span>————</span></p>
    </div>
    <!--  背景图开始-->
    <div class="banner" :style="{height:bgHeight-125+'px'}">
      <div class="container">
        <p>锦瑟无端五十弦，一弦一柱思华年。
          庄生晓梦迷蝴蝶，望帝春心托杜鹃。
        </p>
        <a href=""><router-link to="/blog/0">进入博客</router-link></a>
      </div>
      <i class="bg-icon el-icon-arrow-down"></i>
    </div>
<!-- 背景图结束-->
<!-- 右上角菜单开始-->

    <el-col :span="12" class="icon-right">
      <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="el-icon-guide"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-home">首页</el-dropdown-item>
          <el-dropdown-item icon="el-icon-user-solid">博客</el-dropdown-item>
          <el-dropdown-item icon="el-icon-chat-dot-square">留言</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
<!-- 右上角菜单结束-->
<!--  热门文章开始-->
    <div class="hot">
      <div class="hotCenter">
<!--        <div class="text loading">-->
          <h2>热门文章</h2>
          <p>我不管这个世上的人怎么说我，我只想依照我的信念做事，<br>
            绝不后悔，不管现在将来都一样。
          </p>
<!--        </div>-->
        <ul>
          <li v-for="(item,index) in articleHotList.slice(0,3)">
            <div class="images">
              <div class="oneImages" :style="{backgroundImage: 'url(http://localhost:3002' + item.surface + ')'}"></div>
              <div class="in">
                <a href=""><i class="el-icon-link"></i></a>
              </div>
            </div>
              <div class="news">
                <div class="title"><a href="">{{item.title}}</a></div>
                <div class="time">{{item.date|year}}年{{item.date|month}}月{{item.date|date}}日</div>
                <div class="content">{{item.content}}</div>
                <a href="" class="link">阅读更多</a>
              </div>
          </li>
        </ul>
      </div>

    </div>
<!--  热门文章结束-->
<!--  关于友链开始-->
    <div class="about">
      <div class="wrap">
        <ul class="loading">
          <li><router-link to="/about">关于</router-link></li>
          <li><router-link to="/links">+友情链接</router-link></li>
        </ul>
      </div>
    </div>


<!--关于友链结束-->
<!-- 底部信息栏开始-->
<!-- 底部信息栏结束-->
  </div>
</template>

<script>
    import request from '../../api/index'

    const getArticleHot = request.getArticleHot;//引入接口
    import Nav from "../../components/Nav";
    //得到DOM距离页面顶部的距离
    function getTop(node){
      let top = 0;
      while(node !== document.body){
        top += node.offsetTop;
        node = node.offsetParent;
      }
      return top;
    }

    export default {
        name: "Home",
        components:{
            Nav
        },
      data(){
          return {
            articleHotList:[],
            bgHeight : 0,
          }
      },
      mounted() {
        getArticleHot(3).then(res=>{
          this.articleHotList = res.data.data;
        })
        //resize

        window.addEventListener("resize",this.getWindowHeight);

        //scroll
        this.handleScroll();
        window.addEventListener("scroll",this.handleScroll);
      },
      destroyed() {
        window.removeEventListener("resize",this.getWindowHeight);
      },
      methods:{
        //设置bg高度与window高度一致
        getWindowHeight(){
          this.bgHeight = window.innerHeight;
        },

        //滚轮滚动事件
        handleScroll(){
          let loadingDom = document.querySelectorAll(".loading");
          let scrollTop = document.documentElement.scrollTop + window.innerHeight;
          loadingDom.forEach(node=>{
            if (scrollTop > getTop(node) + 100){
              node.classList.remove("loading");
            }
          });
        },
      },
      filters : {
        date(value){
          return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3];
        },
        month(value){
          return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2];
        },
        year(value){
          return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1];
        }
      },
    }
</script>

<style scoped lang="less">
    .bigBox{
      position: relative;
    }
    .hot{
      overflow: hidden;
      width:100%;
      position: relative;
      padding: 100px 0;
      background-color: #fff;
      .hotCenter{
        max-width: 1170px;
        width: 100%;
        text-align: center;
        margin:0 auto;
        ul{
          display: flex;
          width: 100%;
          height: 503px;
          margin-top: 50px;
          li{
            position: relative;
            top: 0;
            flex: 1;
            height: 503px;
            padding: 0 10px;
            opacity: 1;
            .images{
              overflow: hidden;
              position: relative;
              width: 100%;
              height: 244px;
              .oneImages{
                width: 100%;
                height: 100%;
                background-position: center center;
                background-size: cover;
              }
              .in{
                position: absolute;
                top: -100%;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255,255,255,.3);
                opacity: 0;
                transition: .3s;
                a{
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  margin-top: -20px;
                  margin-left: -20px;
                  width: 40px;
                  height: 40px;
                  background: #333;
                  color: #fff;
                  line-height: 40px;
                  text-align: center;
                  i{
                    font-size: 16px;
                  }
                }

              }
              &:hover .in{
                top: 0;
                opacity: 1;
              }
            }
            .news{
              box-sizing: border-box;
              width: 100%;
              height: 209px;
              padding: 30px 15px;
              background: #faf9f9;
              text-align: left;
              .title{
                margin-bottom: 10px;
                height: 20px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                a{
                  color: #333;
                  &:hover{
                    color: #777;
                  }
                }
              }
              .time{
                color: #bbb;
                font-size: 12px;
                margin-bottom: 15px;
              }
              .content{
                overflow: hidden;
                line-height: 20px;
                height: 60px;
                color: #999;
              }
              .link{
                display: inline-block;
                margin-top: 15px;
                padding: 0;
                background: 0 0;
                border: none;
                color: #fa4b2a;
                transition: all .4s ease;
                &:hover{
                  color: #333;
                }
              }
            }

          }
          li:nth-child(1){
            transition: .6s 0s;
          }
          li:nth-child(2){
            transition: .6s .1s;
          }
          li:nth-child(3){
            transition: .6s .2s;
          }
          &.loading li{
            top: 100px;
            opacity: 0;
          }
        }
        >h2{
          position: relative;
          font-size: 32px;
          padding-bottom: 30px;
          font-weight: 500;
          &::before{
            position: absolute;
            width: 50px;
            height: 2px;
            content: "";
            left: 50%;
            margin-left: -25px;
            bottom: -1px;
            background: #fa4b2a;
          }
        }
        >p{
          margin-top: 20px;
          line-height: 22px;
          color: #888;
        }
      }
    }
    .title{
      height: 125px;
      width: 100%;
      .oneTitle{
        font-size: 50px;
        color:#303030;
        text-align: center;
        padding-top:30px;
      }
      .twoTitle{
        color:#fa4b2a;
        text-align: center;
        span{
          color:#303030
        }
      }
    }
    .banner{
      position: relative;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .bg-icon{
        position: absolute;
        z-index: 11;
        bottom: 30px;
        left: 50%;
        margin-left: -25px;
        width: 50px;
        height: 50px;
        color: #fff;
        font-weight: 700;
        font-size: 36px;
        border-radius: 50%;
        transition: background-color .7s;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        &:hover{
          background-color: #fa4b2a;
        }
      }
      width: 100%;
      height: 850px;
      // background-image: url(../../images/banner-1.jpg);
      .container{
        color: rgba(255, 255, 255, 0.46);
        text-align: center;
        box-sizing: border-box;
       margin:0 auto;
        font-size:20px;
        p{
          margin-bottom: 100px;
        }
        a{
          font-size: 16px;
          color:#fff;
          font-weight: 600;
          padding:0.8em 2em;
          background-color: #fa4b2a;

        }
      }
    }
    .icon-right{
      z-index:999;
      position: fixed;
      right:-47%;
      top:2%;
      .el-dropdown-link {
        cursor: pointer;
        color: #fa4b2a;
        .el-icon-guide{
          font-size: 40px;
          color:black;
          &：hover{
            color:#fa4b2a;
          }
        }
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
      .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
    .about{
      position: relative;
      z-index:9;
      width: 100%;
      height: 48px;
      padding: 111px 0;
      margin: 0 auto;
      background: url("../../assets/img/22.jpg") center center/cover fixed;
      &::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
      }
      ul {
        position: relative;
        z-index: 9;
        width: 425px;
        margin: 0 auto;
        opacity: 1;
        transition: .6s;
        &.loading {
          width: 1000px;
          opacity: 0;
        }
        li {
          position: relative;
          width: 198px;
          height: 46px;
          border: 1px solid #fff;
          &:nth-child(1){
            float: left;
            //margin-left:270px;
          }
          &:nth-child(2){
            float: right;
            //margin-right:270px;
          }
          &::after{
            position: absolute;
            left: 0;
            top: 0;
            content: "";
            width: 0;
            height: 46px;
            background-color: #fa4b2a;
            transition: width .5s;
          }
          &:hover::after{
            width: 100%;
          }
          a{
            position: relative;
            z-index: 1;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 46px;
            text-align: center;
            color: #fff;
          }
        }
      }
    }
</style>