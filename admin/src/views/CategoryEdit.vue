<template>
  <div>
    <h1>新建分类 {{ id }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style>
</style>
  


<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 如果id存在,替换值
        res = await this.$http.put(`categories/${this.id}`, this.model);
      } else {
        // 如果不存在,新建
        res = await this.$http.post("categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "successs",
        message: "保存成功",
      });
      console.log(res)
    },
    //获取选择编辑的id名称
    async fetch() {
      const res = await this.$HTTP.get(`categories/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
  // components:{},
};
</script>