<!--
 * @Author: YiY
 * @Date: 2023-12-14 10:38:02
 * @LastEditTime: 2023-12-26 10:36:52
-->
<template>
  <div class="wrap">
    <el-card>
      <template #header>
        <p>注册</p>
      </template>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="Please input password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="ml-100" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-link type="primary" @click="toLogin">已有账号?去登录</el-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import { register } from '@/services/register/index';

const router = useRouter()
interface RuleForm {
  name: string
  password: string
  phone: string
}


const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  password: "1111",
  phone: "1563467373"
})


const toLogin = () => {
  router.push("login")
}

const validatePhone = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error("Please input the password"))
  } else {
    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    let isPassword = reg.test(ruleForm.phone)
    return isPassword ? true : callback(new Error('请输入11位有效手机号码'))
  }
}

const validatePassword = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error("Please input the password"))
  } else {
    let isPassword = /^[a-zA-Z]\w{5,17}$/.test(ruleForm.password)
    if (!isPassword) {
      return callback(new Error('以字母开头,长度在6~18之间,只能包含字母、数字和下划线'))
    }
    return true
  }
}

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
  phone: [{ required: true, validator: validatePhone, trigger: 'blur' }]
})


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      register(ruleForm.name, ruleForm.password, ruleForm.phone)
        .then(res => {
          debugger
          ElMessage({
            message: res.message,
            type: 'success'
          })
        })
      router.push('/login')

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
}</style>
