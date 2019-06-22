<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">{{$route.meta.title}}</div>
			<el-form label-width="120px" :model="thing" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="14" :offset="4">
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
							<el-input type="textarea" v-model="thing.info"></el-input>
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
import { Component, Vue } from 'vue-property-decorator'
import ImageUpload from '../../components/ImageUpload/index.vue'
import ThingApi from '../../api/Thing'

@Component({
    components: {
        ImageUpload
    }
})
export default class AddThing extends Vue {
    private thing: object = {
        title: '',
        type: 1,
        info: '',
        images: []
    }
    private rules: object = {
        title: [ { required: true, message: '请输入交货单号' } ],
        info: [ { required: true, message: '请选择客户' } ],
        images: [ { required: true, message: '请输入产品重量' } ]
    }

    handleImages() {

    }

    save() {

    }
    back() {
        this.$router.go(-1)
    }
}
</script>

<style lang="less" scoped>

</style>
