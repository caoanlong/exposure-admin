<template>
    <div class="login">
        <div class="login-block">
            <h1 class="login-block-title">曝光吧后台管理系统</h1>
            <el-form class="login-block-form" ref="ruleForm" :model="loginData" :rules="rules">
                <el-form-item prop="userName">
                    <el-input v-model="loginData.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginData.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width:100%" type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SysUserApi from '../api/SysUser'
import SysUser from '../api/SysUser';
@Component
export default class Login extends Vue {
    private loginData: any = {
        userName: '',
        password: ''
    }

    private rules: object = {
        userName: [ { required: true, message: '用户名不能为空' } ],
        password: [ { required: true, message: '密码不能为空' } ]
    }

    login() {
        (<any>this.$refs['ruleForm']).validate((valid: any) => {
            if (!valid) return
            SysUser.login(this.loginData).then((res: any) => {
                this.$store.commit('SET_AUTH', res.headers['authorization'])
                this.getInfo()
            })
        })
    }
    getInfo() {
        SysUser.findByToken().then((response: any) => {
            response.id = response.id.toString()
            this.$store.commit('SET_USERINFO', response)
            this.$router.push({name: 'home'})
        })
    }
}
</script>

<style lang="less" scoped>
.login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: #304156;
    display: flex;
    justify-content: center;
    align-items: center;
    &-block {
        position: relative;
        top: -100px;
        width: 40%;
        &-title {
            font-size: 40px;
            color: #ffffff;
            text-align: center;
            line-height: 2.5;
        }
    }
}
</style>
