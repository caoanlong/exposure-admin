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
                            <el-autocomplete
                                style="width:100%"
                                value-key="title"
                                v-model="thing.title"
                                :fetch-suggestions="querySearchTitle"
                                placeholder="请输入内容" 
                                clearable>
                            </el-autocomplete>
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
                            <el-select 
                                style="width:100%" 
                                v-model="thing.sex" 
                                placeholder="请选择">
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
        <el-dialog title="相同的名字，确定添加吗？" :visible.sync="dialogVisible">
            <el-table :data="list">
                <el-table-column label="名称" prop="title">
                    <template slot-scope="scope">
                        <div class="eclipsis">{{scope.row.title}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="类型" prop="type" width="60">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type === 1">个人</span>
                        <span v-else-if="scope.row.type === 2">公司</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button 
                            size="mini" 
                            type="primary" 
                            @click="$router.push({name: 'viewThing', query: { id: scope.row.id } })">
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doSave">确 定</el-button>
            </div>
        </el-dialog>
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
export default class AddThing extends Vue {
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
    private list: any = []
    private dialogVisible: boolean = false
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
    }

    querySearchTitle(queryString: string, cb: Function) {
        if (!queryString) {
            cb([])
            return
        }
        ThingApi.findAll({
            title: queryString
        }).then((res: any) => {
            console.log(res)
            cb(res)
        })
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
    getLabels() {
        LabelApi.findAll().then(res => {
            this.labels = res
        })
    }
    getList() {
        ThingApi.findAll({
            title: this.thing.title
        }).then(res => {
            if (res && Array.isArray(res) && res.length > 0) {
                this.list = res
                this.dialogVisible = true
            } else {
                this.doSave()
            }
        })
    }
    save() {
        (this.$refs['ruleForm'] as any).validate((valid: any) => {
            if (!valid) return
            this.getList()
        })
    }
    doSave() {
        const thing = Object.assign({}, this.thing)
        thing.area = thing.area.join(',')
        ThingApi.add(thing).then((res: any) => {
            Message.success(res.data.msg)
            this.$router.push({name: 'thing'})
        })
    }
    back() {
        this.$router.go(-1)
    }
}
</script>

<style lang="less" scoped>

</style>
