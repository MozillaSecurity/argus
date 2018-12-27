<template>
  <div class="container">
    <div class="elem-form-container">
      <div class="elem-form-content">
        <el-row :gutter="6">
          <el-col :span="16">
            <div class="grid-content">
              <img :src="profile.picture" class="avatar" alt="avatar">
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="6">
          <el-col :span="2">
            <div class="grid-content">Name</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content">{{ profile.name }}</div>
          </el-col>
        </el-row>

        <el-row :gutter="6">
          <el-col :span="2">
            <div class="grid-content">Email</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content">{{ profile.email }}</div>
          </el-col>
        </el-row>

        <el-row :gutter="6">
          <el-col :span="16">
            <div class="grid-content">
              <pre class="full-profile">{{ profile }}</pre>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
/** @format */

export default {
  name: 'Profile',
  props: ['auth', 'authenticated'],
  data() {
    if (this.auth.getUserAccount()) {
      this.$nextTick(() => {
        this.profile = JSON.parse(this.auth.getUserAccount())
      })
    }
    return {
      profile: {}
    }
  }
}
</script>

<style scoped>
/** @format */

.elem-form-container {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.elem-form-content {
  width: 900px;
}

.avatar {
  display: inline-block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: no-repeat center center;
  background-size: cover;
}

.grid-content {
  padding: 5px;
}
</style>
