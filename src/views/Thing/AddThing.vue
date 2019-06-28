<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">{{$route.meta.title}}</div>
			<el-form label-width="120px" :model="thing" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="18" :offset="3">
                        <el-form-item label="头像">
							<ImageUpload
								:isUseCropper="true" 
								:files="[thing.avatar]" 
								@imgUrlBack="handleAvatar">
							</ImageUpload>
						</el-form-item>
                        <el-form-item label="标签">
                            <el-select 
                                style="width:100%"
                                v-model="thing.labelIds" 
                                multiple 
                                placeholder="请选择">
                                <el-option
                                    v-for="item in labels"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
						<el-form-item label="名称" prop="title">
							<el-input v-model="thing.title"></el-input>
						</el-form-item>
                        <el-form-item label="类型" prop="type">
							<el-select style="width:100%" v-model="thing.type">
                                <el-option label="个人" :value="1"></el-option>
                                <el-option label="公司" :value="2"></el-option>
                            </el-select>
						</el-form-item>
						<el-form-item label="详情" prop="info">
							<el-input type="textarea" rows="5" v-model="thing.info"></el-input>
						</el-form-item>
                        <el-form-item label="图片" prop="images">
							<ImageUpload
								:limitNum="9" 
								:files="thing.images" 
								@imgUrlBack="handleImages">
							</ImageUpload>
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
import ThingApi from '../../api/Thing'
import LabelApi from '../../api/Label'

@Component({
    components: {
        ImageUpload
    }
})
export default class AddThing extends Vue {
    private thing: any = {
        title: '',
        type: 1,
        info: '',
        images: [],
        avatar: ''
    }
    private labels: any = []
    private rules: object = {
        title: [ { required: true, message: '名称不能为空' } ],
        info: [ { required: true, message: '详情不能为空' } ],
        images: [ { required: true, message: '图片不能为空' } ]
    }

    created(): void {
        this.getLabels()
    }

    handleAvatar(images: Array<string>) {
        this.thing.avatar = images[0]
    }

    handleImages(images: Array<string>) {
        this.thing.images = images
    }
    getLabels() {
        LabelApi.findAll().then(res => {
            this.labels = res
        })
    }
    save() {
        (this.$refs['ruleForm'] as any).validate((valid: any) => {
            if (!valid) return
            ThingApi.add(this.thing).then((res: any) => {
                Message.success(res.data.msg)
                this.$router.push({name: 'thing'})
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
