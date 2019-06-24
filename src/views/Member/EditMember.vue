<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">{{$route.meta.title}}</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="14" :offset="4">
                        <el-form-item label="头像">
							<ImageUpload
								:files="[member.avatar]" 
								@imgUrlBack="handleAvatar">
							</ImageUpload>
						</el-form-item>
						<el-form-item label="用户名">
							<p>{{member.userName}}</p>
						</el-form-item>
                        <el-form-item label="昵称">
							<el-input v-model="member.nickName"></el-input>
						</el-form-item>
                        <el-form-item label="真实姓名">
							<el-input v-model="member.realName"></el-input>
						</el-form-item>
                        <el-form-item label="手机号">
							<el-input v-model="member.mobile"></el-input>
						</el-form-item>
                        <el-form-item label="邮箱">
							<el-input v-model="member.email"></el-input>
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
import MemberApi from '../../api/Member'

@Component({
    components: {
        ImageUpload
    }
})
export default class EditMember extends Vue {
    private member: any = {
        userName: '',
        avatar: '',
        nickName: '',
        realName: '',
        mobile: '',
        email: ''
    }

    created(): void {
        this.getInfo()
    }
    getInfo() {
        const id = this.$route.query.id
        MemberApi.findById({ id }).then((res: any) => {
            res.id = res.id.toString()
            this.member = res
        })
    }

    handleAvatar(images: Array<string>) {
        this.member.avatar = images[0]
    }

    save() {
        MemberApi.update(this.member).then((res: any) => {
            Message.success(res.data.msg)
            this.$router.push({name: 'member'})
        })
    }
    back() {
        this.$router.go(-1)
    }
}
</script>

<style lang="less" scoped>

</style>
