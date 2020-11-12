<!--
 * @Author: your name
 * @Date: 2020-11-12 15:20:43
 * @LastEditTime: 2020-11-12 19:05:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blogc:\Users\Administrator.DESKTOP-19074G5\Desktop\testblog\moba\admin\src\views\AdEdit.vue
-->
<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="广告位名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-tabs type="border-card">
        <el-tab-pane label="新建广告内容">
          <el-button size="small" @click="model.items.push({})"
            ><i class="el-icon-plus">新增广告</i></el-button
          >
          <el-row type="flex" style="flex-wrap: wrap; margin-top: 0.6rem">
            <el-col
              :md="12"
              v-for="(item, i) in model.items"
              :key="i"
              shadow="hover"
              style="margin: 0 0.6rem 1rem 0; width: 48%"
            >
              <el-card class="box-card">
                <el-form-item  label="跳转链接(URL)">
                  <el-input v-model="item.url"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                  <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="(res) => $set(item, 'image', res.url)"
                  >
                    <!-- 为了避免icon属性可能尚不存在,通过显式赋值覆盖 -->
                    <img v-if="item.image" :src="item.image" class="avatar" />
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    ></i>
                  </el-upload>
                </el-form-item>
          
                <el-form-item>
                  <el-button
                    size="small"
                    type="danger"
                    @click="model.items.splice(i, 1)"
                    >删除</el-button
                  >
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button
          style="margin-top: 0.6rem"
          type="primary"
          native-type="submit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}
</style>
  


<script >
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        items: [],
      },
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 如果id存在,替换值
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        // 如果不存在,新建
        res = await this.$http.post("rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "successs",
        message: "保存成功",
      });
      // console.log(res)
    },
    //获取选择编辑的id名称
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
  },
  created() {
    this.id && this.fetch();
  },
  // components:{},
};
</script>