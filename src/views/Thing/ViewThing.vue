<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">{{$route.meta.title}}</div>
			<el-row>
				<el-col :span="18" :offset="3">
					<el-form label-width="120px"  size="small">
						<el-form-item label="头像">
							<ImageUpload
								:isPreview="true"
								:files="[thing.avatar]">
							</ImageUpload>
						</el-form-item>
						<el-form-item label="名称">
							<p>{{thing.title}}</p>
						</el-form-item>
						<el-form-item label="年龄" v-if="thing.birthDay">
							<p>{{thing.birthDay | transAge()}}</p>
						</el-form-item>
						<el-form-item label="出生年月" v-if="thing.birthDay">
							<p>{{thing.birthDay | transTime('YYYY-MM-DD')}}</p>
						</el-form-item>
						<el-form-item label="性别">
							<p>{{thing.sex == 1 ? '男' : '女'}}</p>
						</el-form-item>
						<el-form-item label="地区">
							<p>{{thing.area}}</p>
						</el-form-item>
                        <el-form-item label="详情">
							<p>{{thing.info}}</p>
						</el-form-item>
						<el-form-item label="类型">
							<p>{{thingType[thing.type]}}</p>
						</el-form-item>
						<el-form-item label="查看次数">
							<p>{{thing.views}}</p>
						</el-form-item>
						<el-form-item label="标签">
							<p>{{thing.labels ? thing.labels.map(i => i.name).join('，') : ''}}</p>
						</el-form-item>
						<el-form-item label="创建时间">
							<p>
								<template v-if="thing.createTime">
									{{thing.createTime | transTime('YYYY-MM-DD HH:mm:ss')}}
								</template>
							</p>
						</el-form-item>
						<el-form-item label="图片" prop="images">
							<ImageUpload
                                :isPreview="true"
								:limitNum="9" 
								:files="thing.images">
							</ImageUpload>
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
import ThingApi from '../../api/Thing'
import distData from '../../assets/data/dist.json'

@Component({
    components: {
        ImageUpload
    }
})
export default class ViewThing extends Vue {
    private thing: any = {
        title: '',
        age: '',
        sex: 1,
        area: [],
        type: 1,
        info: '',
        images: []
    }
    private thingType: any = {
        1: '个人',
        2: '公司'
    }
    created(): void {
        this.getInfo()
    }
    getInfo() {
        const id = this.$route.query.id
        ThingApi.findById({ id }).then((res: any) => {
            res.id = res.id.toString()
			res.images = res.images.split(',')
			if (res.area) {
				let str = ''
				const areas: any = res.area.split(',')
				const area1: any = distData.find(i => i.value == areas[0])
				str = area1.label
				if (areas[1]) {
					const area2: any = distData.find(i => i.value == areas[1])
					str += ' ' + area2.label
				}
				if (areas[2]) {
					const area3: any = distData.find(i => i.value == areas[2])
					str += ' ' + area3.label
				}
				res.area = str
			} else {
				res.area = ''
			}
            this.thing = res
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