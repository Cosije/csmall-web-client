<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/sys-admin' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" align="center" width="40"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center" width="120"></el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center" width="100"></el-table-column>
      <el-table-column prop="phone" label="手机号码" align="center" width="110"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" header-align="center" width="180"></el-table-column>
      <el-table-column prop="description" label="简介" header-align="center"></el-table-column>
      <el-table-column label="是否启用" align="center" width="80">
        <template slot-scope="scope">
          <el-switch
              @change="changeEnable(scope.row)"
              v-model="scope.row.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" circle
                     @click="handleEdit(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" circle
                     @click="openDeleteConfirm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    changeEnable(admin) {
      let enableText = ['禁用', '启用'];
      let url = 'http://localhost:9081/admins/' + admin.id;
      if (admin.enable == 1) {
        url += '/enable';
      } else {
        url += '/disable';
      }
      console.log('url = ' + url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url).then((response) => {
        let responseBody = response.data;
        console.log(responseBody);
        if (responseBody.state == 20000) {
          this.$message({
            message: '将【' + admin.username + '】的启用状态设置为【' + enableText[admin.enable] + '】成功',
            type: 'success'
          });
        } else {
          // this.$message.error(responseBody.message);
          let title = '操作失败';
          this.$alert(responseBody.message, title, {
            confirmButtonText: '确定',
            callback: action => {
              this.loadAdminList();
            }
          });
        }
      });
    },
    handleEdit(admin) {

    },
    openDeleteConfirm(admin) {
      let title = '提示';
      let message = '此操作将永久删除【' + admin.username + '】管理员，是否继续？';
      this.$confirm(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(admin);
      }).catch(() => {
      });
    },
    handleDelete(admin) {
      console.log('handleDelete ... id=' + admin.id);
      let url = 'http://localhost:9081/admins/' + admin.id + '/delete';
      console.log('url = ' + url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url).then((response) => {
        let responseBody = response.data;
        console.log(responseBody);
        if (responseBody.state != 20000) {
          this.$message.error(responseBody.message);
        }
        this.loadAdminList();
      });
    },
    loadAdminList() {
      console.log('loadAdminList ...');
      let url = 'http://localhost:9081/admins';
      console.log('url = ' + url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(url).then((response) => {
        let responseBody = response.data;
        console.log(responseBody);
        this.tableData = responseBody.data;
      });
    }
  },
  mounted() {
    this.loadAdminList();
  }
}
</script>

<style scoped>

</style>