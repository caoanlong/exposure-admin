<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">{{$route.meta.title}}</div>
			<el-form label-width="120px" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
                        <el-form-item label="头像">
							<ImageUpload
								:files="[sysUser.avatar]" 
								@imgUrlBack="handleAvatar">
							</ImageUpload>
						</el-form-item>
						<el-form-item label="用户名">
							<el-input v-model="sysUser.userName"></el-input>
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
        email: ''
    }

    created(): void {
        this.getInfo()
    }
    getInfo() {
        const id = this.$route.query.id
        SysUserApi.findById({ id }).then((res: any) => {
            res.id = res.id.toString()
            this.sysUser = res
        })
    }

    handleAvatar(images: Array<string>) {
        this.sysUser.avatar = images[0]
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
