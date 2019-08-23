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
                        <el-form-item label="排序" prop="sort">
							<el-input-number v-model="sysPermission.sort" :min="1" :max="100"></el-input-number>
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
export default class EditSysPermission extends Vue {
    private sysPermission: any = {
        perName: '',
        perType: 'menu',
        permission: '',
        url: '',
        sort: ''
    }
    private rules: object = {
        perName: [ { required: true, message: '权限名不能为空' } ]
    }

    private props: any = {
        lazy: true,
        label: 'perName',
        value: 'id',
        multiple: false,
        checkStrictly: true,
        lazyLoad (node: any, resolve: any) {
            const pid = node.root ? -1 : node.value
            SysPermissionApi.findByPid({ pid }).then(res => {
                resolve(res)
            })
        }
    }

    selectPid([pid]: any) {
        this.sysPermission.pid = pid
    }

    created() {
        this.getInfo()
    }

    getInfo() {
        const id = this.$route.query.id
        SysPermissionApi.findById({ id }).then(res => {
            this.sysPermission = res
        })
    }

    save() {
        (this.$refs['ruleForm'] as any).validate((valid: any) => {
            if (!valid) return
            SysPermissionApi.update(this.sysPermission).then((res: any) => {
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
