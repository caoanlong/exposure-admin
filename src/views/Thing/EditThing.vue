<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">{{$route.meta.title}}</div>
			<el-form label-width="120px" :model="thing" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="18" :offset="3">
                        <el-form-item label="头像">
							<ImageUpload
                                :fixed="true"
								:isUseCropper="true" 
								:files="[thing.avatar]" 
								@imgUrlBack="handleAvatar">
							</ImageUpload>
						</el-form-item>
                        <el-form-item label="标签" prop="labelIds">
                            <el-select 
                                style="width:100%"
                                v-model="thing.labelIds" 
                                multiple 
                                placeholder="请选择">
                                <el-option
                                    v-for="item in labels"
                                    :key="item.labelId"
                                    :label="item.name"
                                    :value="item.labelId">
                                </el-option>
                            </el-select>
                        </el-form-item>
						<el-form-item label="名称" prop="title">
							<el-input v-model="thing.title"></el-input>
						</el-form-item>
                        <el-form-item label="出生日期">
                            <el-date-picker
                                style="width:100%"
                                v-model="thing.birthDay"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
						</el-form-item>
                        <el-form-item label="性别">
                            <el-select style="width:100%" v-model="thing.sex" placeholder="请选择">
                                <el-option label="男" :value="1"></el-option>
                                <el-option label="女" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型" prop="type">
							<el-select style="width:100%" v-model="thing.type">
                                <el-option label="个人" :value="1"></el-option>
                                <el-option label="公司" :value="2"></el-option>
                            </el-select>
						</el-form-item>
                        <el-form-item label="地区">
                            <el-cascader
                                style="width:100%"
                                v-model="thing.area"
                                :options="distData"
                                :props="{checkStrictly: true}"
                                @change="handleAreaChange">
                            </el-cascader>
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
import distData from '../../assets/data/dist.json'
import { Component, Vue } from 'vue-property-decorator'
import ImageUpload from '../../components/ImageUpload/index.vue'
import ThingApi from '../../api/Thing'
import LabelApi from '../../api/Label'

@Component({
    components: {
        ImageUpload
    }
})
export default class EditThing extends Vue {
    private thing: any = {
        title: '',
        birthDay: '',
        sex: '',
        type: 1,
        info: '',
        area: [],
        images: [],
        avatar: '',
        labelIds: []
    }
    private labels: any = []
    private rules: object = {
        labelIds: [ { required: true, message: '标签不能为空' } ],
        title: [ { required: true, message: '名称不能为空' } ],
        info: [ { required: true, message: '详情不能为空' } ],
        images: [ { required: true, message: '图片不能为空' } ]
    }
    get distData() {
        return distData
    }

    created(): void {
        this.getLabels()
        this.getInfo()
    }

    handleAvatar(images: Array<string>) {
        this.thing.avatar = images[0]
    }

    handleImages(images: Array<string>) {
        this.thing.images = images
    }
    handleAreaChange(data: any) {
        this.thing.area = data
    }
    getInfo() {
        const id = this.$route.query.id
        ThingApi.findById({ id }).then((res: any) => {
            res.id = res.id.toString()
            res.images = res.images.split(',')
            res.labelIds = res.labels.map((i: any) => {
                return i.labelId
            })
            res.area = res.area ? res.area.split(',') : []
            console.log(res)
            this.thing = res
        })
    }
    getLabels() {
        LabelApi.findAll().then(res => {
            this.labels = res
        })
    }
    save() {
        (this.$refs['ruleForm'] as any).validate((valid: any) => {
            if (!valid) return
            const thing = Object.assign({}, this.thing)
            thing.area = thing.area.join(',')
            ThingApi.update(thing).then((res: any) => {
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
