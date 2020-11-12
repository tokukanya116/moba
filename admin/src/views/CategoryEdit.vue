<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <!-- 父子分类关联应该是唯一指定id关联 -->
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" 
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
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
  


<script >
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      parents: [], //父级分类的选项
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 如果id存在,替换值
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        // 如果不存在,新建
        res = await this.$http.post("rest/categories", this.model);
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
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    //获取父级选项
    async fetchParents() { 
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    },
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  },
  // components:{},
};
</script>