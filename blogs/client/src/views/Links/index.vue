<template>
  <div class="Links">
    <Nav></Nav>
    <div class="canvas" ref="can">
      <div class="txt">
        <h2>友情链接</h2>
        <p>我不是英雄,我只做我想做的事,保护我想要保护的人而已</p>
      </div>
      <Canvas></Canvas>
    </div>
    <div class="link-main">
      <div class="rule">
        <h3>链接申请说明</h3>
        <p>
          <i class="fa fa-close" style="color:#c00;margin-right:10px;">经常宕机</i>
          <i class="fa fa-close" style="color:#c00;margin-right:10px;">不合法规</i>
          <i class="fa fa-close" style="color:#c00;margin-right:10px;">插边球站</i>
          <i class="fa fa-close" style="color:#c00;margin-right:10px;">红标报毒</i>
          <i class="fa fa-check" style="color:#096;margin-right:10px;">原创优先</i>
          <i class="fa fa-check" style="color:#096;margin-right:10px;">技术优先</i>
        </p>
        <p>交换友链可在留言板留言.本站链接如下：<br>
          名称：小庄的博客<br>
          网址：https://www.yanshisan.cn<br>
          图标：https://www.yanshisan.cn/logo.png<br>
          描述：小庄 生如夏花</p>

        <p>申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,
          <a
            style="color:#599BFF;"
            target="_blank"
            href="http://wpa.qq.com/msgrd?v=3&uin=1666934239&site=qq&menu=yes"
        >QQ联系</a>。
        </p>
      </div>
      <div class="container">
        <ul>
          <li v-for="(item,index) in linksList" :key="index">
            <a :href="item.href" target="_blank">
              <img :src="item.icon">
              <h3>{{item.name}}</h3>
              <p>{{item.des}}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../../components/Nav";
import Canvas from "../../components/Canvas";
import request from '../../api';

const getLinks = request.getLinks;

export default {
  name: "Links",
  data(){
    return {
      linksList:[]
    }
  },
  components:{Nav,Canvas},
  created() {
    getLinks().then(res=>{
      this.linksList = res.data.data;
    })
  }
}
</script>

<style scoped lang="less">
.Links{
  width: 100%;
  padding-top: 60px;
  .canvas{
    position: relative;
    width: 100%;
    height: 260px;
    .txt{
      position: absolute;
      left: 50%;
      top: 50%;
      text-align: center;
      transform: translate(-50%,-50%);
      color: #fff;
      h2{
        font-size: 25px;
        font-weight: normal;
      }
    }
  }
  .link-main{
    box-sizing: border-box;
    width: 100%;
    max-width: 1360px;
    padding: 30px 50px;
    /*height: 500px;*/
    margin: 0 auto;
    .rule{
      box-sizing: border-box;
      padding: 20px;
      width: 100%;
      background-color: #fff;
      h3{
        margin-bottom: 1rem;
        padding-left: 1rem;
        border-left: .25rem solid #fa4b2a;
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 1.5rem;
      }
      p{
        margin: 1.5rem 0;
        padding-left: 18px;
        font-family: Raleway,Segoe UI,Lucida Grande,Helvetica,Arial,Microsoft YaHei;
        line-height: 1.75rem;
        color: #515250;

      }
    }
    .container{
      width: 100%;
      ul{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
          box-sizing: border-box;
          width: 23.5%;
          height: 150px;
          background-color: #fff;
          margin-top: 2%;
          transition: .5s;
          cursor: pointer;
          &:hover{
            transform: translateY(-2px);
            box-shadow: 0 0 5px #fff;
          }
          a{
            display: block;
            padding: 20px;
            background: #fff;
            color: #333;
            img{
              float: left;
              width: 40px;
              height: 40px;
              border-radius: 100%;
            }
            h3{
              overflow: hidden;
              padding: 10px 15px 9px;
              height: 21px;
              font-weight: normal;
            }
            p{
              clear: both;
              display: -webkit-box;
              overflow: hidden;
              margin-top: 1rem;
              height: 60px;
              text-overflow: ellipsis;
              font-size: 13px;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
            }
          }
        }
      }

    }
  }
}
</style>