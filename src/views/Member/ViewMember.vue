<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">{{$route.meta.title}}</div>
			<el-row>
				<el-col :span="18" :offset="3">
					<el-form label-width="120px"  size="small">
						<el-form-item label="头像" prop="images">
							<ImageUpload
                                :isPreview="true"
								:limitNum="1" 
								:files="[member.avatar]">
							</ImageUpload>
						</el-form-item>
						<el-form-item label="用户名">
							<p>{{member.userName}}</p>
						</el-form-item>
                        <el-form-item label="手机号">
							<p>{{member.mobile}}</p>
						</el-form-item>
						<el-form-item label="邮箱">
							<p>{{member.email}}</p>
						</el-form-item>
						<el-form-item label="真实姓名">
							<p>{{member.realName}}</p>
						</el-form-item>
						<el-form-item label="昵称">
							<p>{{member.nickName}}</p>
						</el-form-item>
						<el-form-item label="上次登录IP">
							<p>{{member.lastLoginIp}}</p>
						</el-form-item>
						<el-form-item label="上次登录时间">
							<p>
								<template v-if="member.lastLoginTime">
									{{member.lastLoginTime | transTime('YYYY-MM-DD HH:mm:ss')}}
								</template>
							</p>
						</el-form-item>
						<el-form-item label="创建时间">
							<p>
								<template v-if="member.createTime">
									{{member.createTime | transTime('YYYY-MM-DD HH:mm:ss')}}
								</template>
							</p>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ImageUpload from '../../components/ImageUpload/index.vue'
import MemberApi from '../../api/Member'

@Component({
    components: {
        ImageUpload
    }
})
export default class ViewMember extends Vue {
    private member: any = {
        title: '',
        type: 1,
        info: '',
        images: []
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
    back() {
        this.$router.go(-1)
    }
}
</script>
<style lang="less" scoped>
.el-form-item__content {
	p {
		margin: 0;
		border: 1px solid #fff;
		border-bottom-color: #dcdfe6;
		padding: 0 15px;
		min-height: 32px;
		font-family: 'sans-serif';
		line-height: 32px;
        color: #999;
    }
	.el-input__inner {
        vertical-align: top;
    }
}
</style>