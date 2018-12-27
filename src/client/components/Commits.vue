<template>
  <div class="container">
    <slot name="pagination" :page="page" :total="total">
      <el-pagination
        v-model="page"
        :total="total"
        @current-change="getTableData"
        layout="prev, pager, next"
      ></el-pagination>
    </slot>
    <el-table
      v-loading="loading"
      :data="tableData"
      :default-sort="{prop: 'committerDate', order: 'descending'}"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>Id:
            <router-link
              :to="'/commits/' + $route.params.id + '/' + props.row._id"
            >{{ props.row._id }}</router-link>
          </p>
          <p>Hash: {{ props.row.hash }}</p>
          <p>Author: {{ props.row.authorEmail }}</p>
        </template>
      </el-table-column>

      <el-table-column prop="subject" label="Subject" width="400" sortable>
        <template slot-scope="scope">{{ scope.row.subject }}</template>
      </el-table-column>

      <el-table-column prop="committerDate" label="Date" width="250" sortable>
        <template slot-scope="scope">{{ scope.row.committerDate }}</template>
      </el-table-column>

      <el-table-column prop="files" label="Files" width="180" sortable>
        <template slot-scope="scope">{{ scope.row.files }}</template>
      </el-table-column>

      <el-table-column prop="status" label="Status" width="180" sortable>
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/** @format */

import axios from 'axios'

export default {
  name: 'Commits',
  props: ['auth', 'authenticated'],
  data() {
    return {
      page: 1,
      loading: false,
      total: 10000,
      tableData: [{}]
    }
  },
  methods: {
    async getTableData(page) {
      this.loading = true
      let reqPage = page || this.page
      try {
        console.log(page)
        let response = await axios.get('/api/v1/repo/' + this.$route.params.id, {
          params: {
            page: reqPage
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${this.auth.getUserAccessToken()}`
          }
        })
        this.tableData = response.data
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.getTableData()
  }
}
</script>

<style>
/** @format */
</style>
