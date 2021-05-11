<template>
  <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :page-count="5"
      @current-change="currentChange"
      :total="total">
      <!--total:总条目数
        page-size每页显示条目个数
        page-count总页数
      -->
  </el-pagination>
</template>

<script>
  export default {
    name: "Pagination",
    data(){
      return {
      }
    },
    props:["pageSize","total"],
    methods:{
      currentChange(pageIndex){
        this.$emit("currentChange",pageIndex,this.pageSize);
      }
    }
  }
</script>

<style scoped>

</style>
