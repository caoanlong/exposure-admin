<template>
    <div class="main-content">
        <el-card class="box-card">
			<div slot="header" class="clearfix">{{$route.meta.title}}</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="名称">
						<el-input placeholder="请输入..." v-model="find.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table-control">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="$router.push({name: 'addLabel'})">添加</el-button>
				<!-- <el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button> -->
			</div>
			<div class="table">
				<el-table 
					ref="table" 
                    v-loading="loading"
					:data="list" 
                    @selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" width="40"></el-table-column>
					<el-table-column label="名称" prop="name">
                        <template slot-scope="scope">
                            <div class="eclipsis">{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
					<el-table-column label="颜色" prop="color">
                        <template slot-scope="scope">
                            <div :style="{width: '60px', height: '20px', backgroundColor: scope.row.color}"></div>
                        </template>
                    </el-table-column>
					<el-table-column label="创建时间" min-width="120">
                        <template slot-scope="scope">
                            {{scope.row.createTime | transTime('YYYY-MM-DD HH:mm:ss')}}
                        </template>
                    </el-table-column>
                    <el-table-column label="修改时间" min-width="120">
                        <template slot-scope="scope" v-if="scope.row.updateTime">
                            {{scope.row.updateTime | transTime('YYYY-MM-DD HH:mm:ss')}}
                        </template>
                    </el-table-column>
					<el-table-column width="120" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand" trigger="click">
								<el-button type="primary" size="mini">
                                    <span>操作</span>
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id: scope.row.id}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.id}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'del', id: scope.row.id}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<Page 
                    :total="total" 
                    :pageIndex="pageIndex" 
                    :pageSize="pageSize" 
                    @pageChange="pageChange" 
                    @pageSizeChange="pageSizeChange">
				</Page>
			</div>
		</el-card>
    </div>
</template>

<script lang="ts">
import { Message } from 'element-ui'
import { Component, Vue } from 'vue-property-decorator'
import Page from '../../components/Page.vue'
import LabelApi from '../../api/Label'

@Component({
    components: {
        Page
    }
})
export default class Label extends Vue {
    private loading: boolean = false
    private pageIndex: number = 1
    private pageSize: number = 10
    private total: number = 0
    private list: Array<object> = []
    private selectedList: Array<object> = []
    private find: any = {
        name: ''
    }

    created(): void {
        this.getList()
    }

    search() {
        this.pageIndex = 1
        this.pageSize = 10
        this.getList()
    }
    reset() {
        this.find.name = ''
        this.pageIndex = 1
        this.pageSize = 10
        this.getList()
    }
    selectionChange(data: any) {
        this.selectedList = data.map((item: any) => item.id)
    }
    pageChange(index: number) {
        this.pageIndex = index
        this.getList()
    }
    pageSizeChange(size: number) {
        this.pageSize = size
        this.pageIndex = 1
        this.getList() 
    }
    handleCommand({ type, id }: any) {
        if (type === 'edit') {
            this.$router.push({ name: 'editLabel', query: { id } })
        } else if (type === 'view') {
            this.$router.push({ name: 'viewLabel', query: { id }  })
        } else if (type === 'del') {
            this.del(id)
        }
    }
    getList() {
        this.loading = true
        LabelApi.find({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            name: this.find.name
        }).then((res: any) => {
            this.loading = false
            res.list.forEach((i: any) => {
                i.id = i.id.toString()
            })
            this.list = res.list
            this.total = res.total
        }).catch(err => {
            this.loading = false
        })
    }
    del(id: number) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            LabelApi.del({ id }).then((res: any) => {
                Message.success(res.data.msg)
                this.getList()
            })
        }).catch(() => {
            Message.error('已取消删除')         
        })
    }
}
</script>

<style lang="less" scoped>

</style>
