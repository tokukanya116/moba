<!--
 * @Author: your name
 * @Date: 2020-11-03 16:42:04
 * @LastEditTime: 2020-11-12 17:21:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blogc:\Users\Administrator.DESKTOP-19074G5\Desktop\testblog\moba\admin\src\views\CategoryList.vue
-->
<template>
  <div>
    <h1>广告位列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
            >编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    //获取数据的方法
    async fetch() {
      const res = await this.$http.get("rest/ads");
      this.items = res.data;
    },
    // 移除数据的方法
    async remove(row) {
      this.$confirm(`是否确定要删除 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        //点击确定以后,执行删除操作
        const res = await this.$http.delete(`rest/ads/${row._id}`);
        console.log(res);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        //删除后重新获取数据
        this.fetch();
      });
    },
  },
  // components:{},
  created() {
    this.fetch();
  },
};
</script>