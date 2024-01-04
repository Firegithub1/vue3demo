<!--
 * @Author: YiY
 * @Date: 2023-12-14 10:38:02
 * @LastEditTime: 2024-01-04 16:48:13
-->
<template>
  <div class="wrap">
    <el-card>
      <template #header>
        <p>登录</p>
      </template>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon>
        <el-form-item label="用户名:" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="Please input password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="ml-100" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
          <el-link type="primary" @click="toRegister">还没有账号?去注册</el-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { FormInstance, FormRules } from 'element-plus'

const router = useRouter()

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  name: 'Hello',
  password: "a1112221",
})

const toRegister = () => {
  router.push('register')
}

const validatePassword = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error("Please input the password"))
  } else {
    let isPassword = /^[a-zA-Z]\w{5,17}$/.test(ruleForm.password)
    let errStr = '以字母开头,长度在6~18之间,只能包含字母、数字和下划线'
    return !isPassword ? callback(new Error(errStr)) : true
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        router.replace({ name: 'home' })
      // login(ruleForm.name, ruleForm.password)
      //   .then(_res => {
      //     ElMessage({
      //       message: '登录成功!',
      //       type: 'success'
      //     })
      //     router.push({ name: 'register' })
      //   })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped lang="less">
.wrap {
  /deep/.el-card__header {
    padding: 0;
    text-align: left;

    p {
      margin-left: 25px;
    }
  }

  /deep/.el-form {
    // padding: 30px;
    .el-form-item {
      margin-bottom: 30px;

      .el-form-item__label {
        width: 100px;
      }

      .el-form-item__content {
        width: 400px;
        justify-content: space-between;

        .el-form-item__error {
          text-align: left;
        }
      }

      .ml-100 {
        margin-left: 100px;
      }
    }
  }
}
</style>
