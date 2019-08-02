<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">{{$route.meta.title}}</div>
			<el-form label-width="120px" :model="sysPermission" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="权限名" prop="perName">
							<el-input v-model="sysPermission.perName"></el-input>
						</el-form-item>
                        <el-form-item label="权限类型">
                            <el-select 
                                style="width:100%" 
                                v-model="sysPermission.perType" 
                                placeholder="请选择">
                                <el-option label="菜单" value="menu"></el-option>
                                <el-option label="按钮" value="button"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="权限值" prop="permission">
							<el-input v-model="sysPermission.permission"></el-input>
						</el-form-item>
                        <el-form-item label="url" prop="url">
							<el-input v-model="sysPermission.url"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>

<script lang="ts">
import { Message } from 'element-ui'
import { Component, Vue } from 'vue-property-decorator'
import SysPermissionApi from '../../api/SysPermission'

@Component
export default class AddSysPermission extends Vue {
    private sysPermission: any = {
        perName: '',
        perType: 'menu',
        permission: '',
        url: ''
    }
    private rules: object = {
        perName: [ { required: true, message: '权限名不能为空' } ]
    }

    save() {
        (this.$refs['ruleForm'] as any).validate((valid: any) => {
            if (!valid) return
            SysPermissionApi.add(this.sysPermission).then((res: any) => {
                Message.success(res.data.msg)
                this.$router.push({name: 'sysPermission'})
            })
        })
    }
    back() {
        this.$router.go(-1)
    }
}
</script>

<style lang="less" scoped>

</style>
