<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">{{$route.meta.title}}</div>
			<el-form label-width="120px" :model="sysUser" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
                        <el-form-item label="头像">
							<ImageUpload
								:files="[sysUser.avatar]" 
								@imgUrlBack="handleAvatar">
							</ImageUpload>
						</el-form-item>
						<el-form-item label="用户名" prop="userName">
							<el-input v-model="sysUser.userName"></el-input>
						</el-form-item>
                        <el-form-item label="角色" prop="roleIds">
                            <el-select 
                                style="width:100%"
                                v-model="sysUser.roleIds" 
                                value-key="id"
                                multiple 
                                placeholder="请选择">
                                <el-option
                                    v-for="item in roles"
                                    :key="item.id"
                                    :label="item.roleName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="手机号">
							<el-input v-model="sysUser.mobile"></el-input>
						</el-form-item>
                        <el-form-item label="邮箱">
							<el-input v-model="sysUser.email"></el-input>
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
import ImageUpload from '../../components/ImageUpload/index.vue'
import SysUserApi from '../../api/SysUser'
import SysRoleApi from '../../api/SysRole'

@Component({
    components: {
        ImageUpload
    }
})
export default class EditSysUser extends Vue {
    private sysUser: any = {
        userName: '',
        avatar: '',
        mobile: '',
        email: '',
        roleIds: []
    }

    private roles: any = []
    private rules: object = {
        userName: [ { required: true, message: '用户名不能为空' } ],
        roleIds: [ { required: true, message: '角色不能为空' } ]
    }

    created(): void {
        this.getRoles()
        this.getInfo()
    }
    getInfo() {
        const id = this.$route.query.id
        SysUserApi.findById({ id }).then((res: any) => {
            res.id = res.id.toString()
            const roleIds: any = res.roles.map((item: any) => item.id)
            this.sysUser = res
            this.$set(this.sysUser, 'roleIds', roleIds)
        })
    }

    handleAvatar(images: Array<string>) {
        this.sysUser.avatar = images[0]
    }
    getRoles() {
        SysRoleApi.findAll().then((res: any) => {
            this.roles = res
        })
    }

    save() {
        SysUserApi.update(this.sysUser).then((res: any) => {
            Message.success(res.data.msg)
            this.$router.push({name: 'sysUser'})
        })
    }
    back() {
        this.$router.go(-1)
    }
}
</script>

<style lang="less" scoped>

</style>
