<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">{{$route.meta.title}}</div>
			<el-form label-width="120px" :model="sysRole" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="18" :offset="3">
						<el-form-item label="角色名" prop="roleName">
							<el-input v-model="sysRole.roleName"></el-input>
						</el-form-item>
                        <el-form-item label="权限" prop="permission">
                            <el-tree
                                :props="props"
                                :data="sysPermissions" 
                                node-key="id" 
                                ref="tree" 
                                highlight-current
                                show-checkbox
                                @check="selectPermission">
                            </el-tree>
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
import SysPermissionApi from '../../api/SysPermission'

@Component
export default class AddSysRole extends Vue {
    private sysRole: any = {
        roleName: '',
        permission: []
    }
    private rules: object = {
        roleName: [ { required: true, message: '角色名不能为空' } ],
        permission: [ { required: true, message: '权限不能为空' } ]
    }

    private props: any = {
        label: 'perName',
        value: 'id',
        multiple: true,
        checkStrictly: false
    }

    private sysPermissions: any = []

    created() {
        this.getPermissions()
    }

    selectPermission(cur: any, treeCur: any) {
        this.sysRole.permission = treeCur.checkedKeys
    }

    getPermissions(pid=-1) {
        SysPermissionApi.findByPid({ pid }).then((res: any) => {
            this.sysPermissions = res
        })
    }

    save() {
        (this.$refs['ruleForm'] as any).validate((valid: any) => {
            if (!valid) return
            SysRoleApi.add(this.sysRole).then((res: any) => {
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
