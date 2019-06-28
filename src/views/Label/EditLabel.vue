<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">{{$route.meta.title}}</div>
			<el-form label-width="120px" :model="label" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
						<el-form-item label="名称" prop="name">
							<el-input v-model="label.name"></el-input>
						</el-form-item>
						<el-form-item label="颜色">
							<el-color-picker v-model="label.color"></el-color-picker>
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
import LabelApi from '../../api/Label'

@Component
export default class EditLabel extends Vue {
    private label: any = {
        name: '',
        color: '#ff0000'
    }
    private rules: object = {
        name: [ { required: true, message: '名称不能为空' } ]
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
	
    save() {
        (this.$refs['ruleForm'] as any).validate((valid: any) => {
            if (!valid) return
            LabelApi.update(this.label).then((res: any) => {
                Message.success(res.data.msg)
                this.$router.push({name: 'label'})
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
