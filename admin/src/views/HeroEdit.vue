<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="英雄名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <!-- :before-upload="beforeAvatarUpload" -->
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.Categories">
              <el-option
                v-for="item of Categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.survice"
            ></el-rate>
          </el-form-item>
          <!-- 顺风出装 -->
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 逆风出装 -->
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 使用技巧 -->
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <!-- 对抗技巧 -->
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <!-- 团战思路 -->
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})"
            ><i class="el-icon-plus">添加技能</i></el-button
          >
          <el-row type="flex" style="flex-wrap: wrap;margin-top: 0.6rem;">
            <el-col
              :md="12"
              v-for="(item, i) in model.skills"
              :key="i"
              shadow="hover"
              style="margin:0 .6rem 1rem 0;width:49%;"
            >
              <el-card class="box-card">
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="(res) => $set(item, 'icon', res.url)"
                  >
                  <!-- 为了避免icon属性可能尚不存在,通过显式赋值覆盖 -->
                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    ></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input
                    v-model="item.description"
                    type="textarea"
                  ></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input v-model="item.tips" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="danger" 
                  @click="model.skills.splice(i,1)">删除</el-button>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
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
      Categories: [],
      items: [],
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survice: 0,
        },
        skills: [],
        usageTips: "",
        battleTips: "",
        teamTips: "",
      },
    };
  },
  methods: {
    //上传装备图标的方法
    afterUpload(res) {
      //把后端返回的图片地址拼接
      this.model.avatar = res.url;
      // console.log(res)
    },
    async save() {
      let res;
      if (this.id) {
        // 如果id存在,替换值
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        // 如果不存在,新建
        res = await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "successs",
        message: "保存成功",
      });
      // console.log(res);
    },
    //获取数据
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // 把服务端获取的数据赋值到{},如果有,会替换this.model(注:如果res.data没有某条字段,是不会覆盖this.model的,反之有的就会覆盖)
      this.model = Object.assign({}, this.model, res.data);
    },
    // 分类
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.Categories = res.data;
    },
    // 装备
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
  },
  created() {
    this.fetchCategories();
    this.fetchItems();
    this.id && this.fetch();
  },
  // components:{},
};
</script>

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
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>