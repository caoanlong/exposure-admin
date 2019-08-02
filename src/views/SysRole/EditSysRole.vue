<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">{{$route.meta.title}}</div>
			<el-form label-width="120px" :model="sysRole" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="角色名" prop="roleName">
							<el-input v-model="sysRole.roleName"></el-input>
						</el-form-item>
                        <el-form-item label="权限" prop="permission">
							<el-input v-model="sysRole.permission"></el-input>
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
import SysRoleApi from '../../api/SysRole'

@Component
export default class EditSysRole extends Vue {
    private sysRole: any = {
        roleName: '',
        permission: []
    }
    private rules: object = {
        roleName: [ { required: true, message: '角色名不能为空' } ]
    }

    created() {
        this.getInfo()
    }

    getInfo() {
        const id = this.$route.query.id
        SysRoleApi.findById({ id }).then((res: any) => {
            this.sysRole.id = res.id
            this.sysRole.roleName = res.roleName
        })
    }

    save() {
        (this.$refs['ruleForm'] as any).validate((valid: any) => {
            if (!valid) return
            SysRoleApi.update(this.sysRole).then((res: any) => {
                Message.success(res.data.msg)
                this.$router.push({name: 'sysRole'})
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
