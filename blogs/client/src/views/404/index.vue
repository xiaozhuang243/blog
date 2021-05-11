<template>
<div class="notFound">
  <Nav></Nav>
  <img src="../../assets/img/404.gif" alt="">
</div>
</template>

<script>
 import Nav from '../../components/Nav';
  export default {
    name: "notFound",
    components:{Nav}
  }
</script>

<style scoped>
  .notFound{
    background-color: #fff;
  }
  img{
      margin:0 auto;
      display: block;
  }
</style>