<template>
  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
    :on-remove="handleRemove" :file-list="fileList" list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
import loginApi from '@/api/login.js';
export default {
  name: 'IndexPage',
  data() {
    return {

    }
  },
  created() {
    this.login();
  },
  methods: {
    login() {
      loginApi.login({}).then(response => {
        console.log(JSON.stringify(response));
      })
    }
  }
}
</script>
