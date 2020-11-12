<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <!-- 父子分类关联应该是唯一指定id关联 -->
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <!-- useCustomImageHandler => 使用自定义的图片上传方法 @image-added="handleImageAdded" =>图片添加处理事件 -->
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
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
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  methods: {
    //图片文件上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //提交表单数据的方法(传文件)
      var formData = new FormData();
      //上传的内容(要跟后端统一资源上传的键名一致)
      formData.append("file", file);
      // 发起请求获取上传的图片
      const res = await this.$http.post('upload', formData);
      //编辑器对象的插入图片方法(当前光标的位置,插入一篇图片,图片路径)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      //重置上传器
      resetUploader();                    
    },

    async save() {
      let res;
      if (this.id) {
        // 如果id存在,替换值
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        // 如果不存在,新建
        res = await this.$http.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "successs",
        message: "保存成功",
      });
    },
    //获取选择编辑的id名称
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    //获取分类数据
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
  // components:{},
};
</script>