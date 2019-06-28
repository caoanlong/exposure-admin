<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">{{$route.meta.title}}</div>
			<el-row>
				<el-col :span="18" :offset="3">
					<el-form label-width="120px"  size="small">
						<el-form-item label="名称">
							<p>{{label.name}}</p>
						</el-form-item>
						<el-form-item label="颜色">
							<div class="label-color" :style="{backgroundColor: label.color}"></div>
						</el-form-item>
						<el-form-item label="创建时间">
							<p>
								<template v-if="label.createTime">
									{{label.createTime | transTime('YYYY-MM-DD HH:mm:ss')}}
								</template>
							</p>
						</el-form-item>
						<el-form-item label="修改时间">
							<p>
								<template v-if="label.updateTime">
									{{label.updateTime | transTime('YYYY-MM-DD HH:mm:ss')}}
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
import LabelApi from '../../api/Label'

@Component
export default class ViewLabel extends Vue {
    private label: any = {
        name: '',
        color: ''
    }
    created(): void {
        this.getInfo()
    }
    getInfo() {
        const id = this.$route.query.id
        LabelApi.findById({ id }).then((res: any) => {
            this.label = res
        })
    }
    back() {
        this.$router.go(-1)
    }
}
</script>
<style lang="less" scoped>
.label-color {
	width: 60px;
	height: 20px;
	position: relative;
	top: 5px;
}
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