<template>
  <div class="container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="1" :route="{name:'Dashboard'}">Argus</el-menu-item>
      <el-menu-item index="2" :route="{name:'List'}">Observation</el-menu-item>
      <el-menu-item index="3" :route="{name:'Add'}">Add</el-menu-item>
      <el-submenu index="4" style="float: right;">
        <template slot="title" v-if="authenticated">
          <img :src="profile.picture" class="avatar">
          <em>{{ profile.given_name }}</em>
        </template>

        <el-menu-item index="4-3" :route="{name: 'Profile'}" v-if="authenticated">
          <i class="fa fa-cog"></i> Settings
        </el-menu-item>

        <el-menu-item index="4-1" @click="signout()" v-if="authenticated">
          <i class="fa fa-sign-out"></i> Sign-out
        </el-menu-item>

        <el-menu-item index="4-2" @click="signin()" v-if="!authenticated">Sign-in</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
/** @format */

export default {
  name: 'AppNavigation',
  props: ['auth', 'authenticated'],
  data() {
    if (this.auth.getUserAccount()) {
      this.$nextTick(() => {
        this.profile = JSON.parse(this.auth.getUserAccount())
      })
    }

    return {
      brand: 'Argus',
      profile: {},
      activeIndex: '1'
    }
  },
  methods: {
    signout() {
      this.auth.logout()
    },
    signin() {
      this.auth.login()
    }
  }
}
</script>

<style>
/** @format */

.avatar {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: no-repeat center center;
  background-size: cover;
}
</style>
