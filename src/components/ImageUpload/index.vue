<template>
	<div class="imgUpload clearfix">
		<div class="imgLi" 
            :style="{'width': width+'px','height': height+'px'}" 
            v-for="(file,i) in fileUrl"
            :key="i">
			<img v-if="file" :src="resizeImg(file, '_150x150.')">
			<img v-else :src="defaultImg">
			<div class="controller">
				<div class="controllerBtn">
					<div class="perviewBtn" @click.stop="showImgModal(file)"></div>
					<div class="delBtn" v-show="!isPreview" @click.stop="delImg(i)"></div>
				</div>
			</div>
		</div>
		<div 
            class="addBtn" 
            :style="{'width':width+'px','height':height+'px'}" 
            v-show="isLimit && !isPreview">
			<div class="addIcon">
				<i style="font-size: 30px;" class="el-icon-plus avatar-uploader-icon"></i>
			</div>
			<input type="file" name="" @change.stop="addImg" ref="uploadFile"/>
		</div>
		<el-dialog title="裁剪图片" :visible.sync="isShowCropper" :modal="false">
			<vueCropper
				style="height: 600px;" 
				ref="cropper"
				:autoCrop="true"
				:autoCropWidth="200"
				:autoCropHeight="200" 
				:fixed="fixed" 
				:fixedNumber="fixedNumber" 
				:img="localImgUrl" 
				:outputSize="1"
				outputType="png">
			</vueCropper>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShowCropper = false">取 消</el-button>
				<el-button type="primary" @click="upload">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import { Message } from 'element-ui'
import Common from '../../api/Common'
import { formDataReq, resizeImg } from '../../utils/index'
import VueCropper from 'vue-cropper'
const defaultImg = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjE4cHgiIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDE4IDE4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxOCAxOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjRTZFNkU5IiBkPSJNMTcuOTY5LDAuMDMxSDAuMDMxVjE4bDE3LjkzOC0wLjAzMVYwLjAzMXoiLz4NCjxwYXRoIGZpbGw9IiNCNUI1QjYiIGQ9Ik01LjE2OSw2LjcwOWMwLjg0NiwwLDEuNTI3LTAuNjc5LDEuNTI3LTEuNTIyYzAtMC44NDMtMC42ODEtMS41MjItMS41MjctMS41MjINCgljLTAuODQ2LDAtMS41MjgsMC42NzktMS41MjgsMS41MjJDMy42MTksNi4wMDgsNC4zLDYuNzA5LDUuMTY5LDYuNzA5eiBNMTIuMDc5LDUuNzVsLTQuNTYsNi4zOTJsLTIuMzUtMy4yNTVsLTMuODU0LDUuNDc5aDE1LjM2OQ0KCUwxMi4wNzksNS43NXoiLz4NCjwvc3ZnPg0K'
export default {
	props: {
		width: {
			type: Number,
			default: 100
		},
		height: {
			type: Number,
			default: 100
		},
		limitNum: {
			type: Number,
			default: 1
		},
		files: {
			type: Array,
			default: () => []
		},
		isPreview: {
			type: Boolean,
			default: false
		},
		isUseCropper: {
			type: Boolean,
			default: false
		},
		fixed: {
			type: Boolean,
			default: false
		},
		fixedNumber: {
			type: Array,
			default: () => [1,1]
		}
	},
	data() {
		return {
			fileUrl: this.files[0] ? this.files : [],
			localImgUrl: '',
			isShowCropper: false,
			isUploaded: false
		}
	},
	computed: {
		isLimit() {
			if (this.fileUrl.length > this.limitNum - 1) {
				return false
			}else {
				return true
			}
		},
		defaultImg: () => defaultImg,
		resizeImg: () => resizeImg
	},
	watch: {
		files(newval) {
			this.fileUrl = []
			if (newval.length > 0 && newval[0]) {
				this.fileUrl = this.files
			}
		}
	},
	activated() {
		if(!this.$route.query.cache) {
			this.fileUrl = []
		}
	},
	methods: {
		addImg(e) {
			if (this.$refs.uploadFile.value != '') {
				const arr = this.$refs.uploadFile.files[0].name.split('.')
				const suffix = arr[arr.length-1].toLowerCase()
				const picSize = this.$refs.uploadFile.files[0].size
				if(picSize > 5120000){
					Message.error('图片大小不能大于5MB')
					return
				}
				if (suffix != 'jpg' && suffix != 'jpeg' && suffix != 'png' && suffix != 'gif') {
					Message.error('图片格式只支持jpg、png和gif！')
					return
                }
                console.log()
				if (this.isUseCropper) {
					this.localImgUrl = window.URL.createObjectURL(this.$refs.uploadFile.files[0])
					this.isShowCropper = true
				} else {
					this.uploadFile(this.$refs.uploadFile.files[0])
				}
				this.$refs.uploadFile.value = ''
			}
		},
		upload() {
			if (this.isUploaded) {
				Message.error('正在上传,请稍等！')
				return
			}
			if (this.fileUrl.length > this.limitNum) {
				return
			}
			this.isUploaded = true
			this.$refs.cropper.getCropBlob((data) => {
				this.uploadFile(data, () => {
					this.isShowCropper = false
				})
			})
		},
		uploadFile(data, cb) {
            const image = formDataReq({
                'image': data
            })
            Common.upload(image).then(res => {
                this.fileUrl.push(...res.data.data)
				this.$emit('imgUrlBack', this.fileUrl)
				setTimeout(() => {
					this.isUploaded = false
				}, 1500)
				cb && cb()
            }).catch(err => {
				setTimeout(() => {
					this.isUploaded = false
				}, 1500)
				console.log('服务器异常' + err)
			})
		},
		delImg(i) {
			this.fileUrl.splice(i, 1)
			this.$emit('imgUrlBack', this.fileUrl)
		},
		showImgModal(url) {
			this.$alert(`<img style="width: 100%" src=${this.$imgUrl + url} />`, '图片预览', {
				dangerouslyUseHTMLString: true,
				showConfirmButton: false,
				customClass: 'img-preview'
			}).catch(err => {})
		}
	},
	components: {
		VueCropper
	}
}
</script>
<style lang="less" scoped>
.imgUpload {
	z-index: 9999;
	.imgLi {
		float: left;
		border: 1px solid #f0f0f0;
		border-radius: 6px;
		text-align: center;
		position: relative;
		margin: 0 5px 5px 0;
		.controller {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 6px;
			background-color: rgba(0, 0, 0, .5);
			display: none;
			.controllerBtn {
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				width: 80px;
				height: 40px;
				cursor: pointer;
				display: flex;
				.perviewBtn {
					flex: 1;
					width: 40px;
					height: 40px;
					background-image: url('../../assets/imgs/perview.png');
					background-repeat: no-repeat;
					background-size: 26px;
                    background-position: center;
                }
				.delBtn {
					flex: 1;
					width: 40px;
					height: 40px;
					background-image: url('../../assets/imgs/trush.png');
					background-repeat: no-repeat;
					background-size: 26px;
                    background-position: center;
                }
            }
        }
		img {
			display: block;
			width: 100%;
			height: 100%;
            border-radius: 6px;
        }
		&:hover {
			.controller {
                display: block;
            }
        }
    }
	.addBtn {
		float: left;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		color: #8c939d;
		position: relative;
		text-align: center;
		margin: 0 5px 5px 0;
		&:hover {
            border-color: #409eff;
        }
		.addIcon {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 100%;
            height: 52px;
            line-height: 52px;
        }
		input {
			display: block;
			width: 100%;
			height: 100%;
            opacity: 0;
        }
    }
}
</style>
