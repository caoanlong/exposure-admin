<template>
    <div class="main-content">
        <el-card class="box-card">
			<div slot="header" class="clearfix">{{$route.meta.title}}</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="名称">
						<el-input placeholder="请输入..." v-model="find.title"></el-input>
					</el-form-item>
                    <el-form-item label="类型">
                        <el-select placeholder="请选择" v-model="find.type">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="个人" :value="1"></el-option>
                            <el-option label="公司" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table-control">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="$router.push({name: 'addThing'})">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="table" 
                    v-loading="loading"
					:data="list" 
                    @selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" width="40"></el-table-column>
					<el-table-column label="名称" prop="title">
                        <template slot-scope="scope">
                            <div class="eclipsis">{{scope.row.title}}</div>
                        </template>
                    </el-table-column>
					<el-table-column label="详情" prop="info">
                        <template slot-scope="scope">
                            <div class="eclipsis">{{scope.row.info}}</div>
                        </template>
                    </el-table-column>
					<el-table-column label="类型" prop="type" width="80">
                        <template slot-scope="scope">
							<span v-if="scope.row.type === 1">个人</span>
							<span v-else-if="scope.row.type === 2">公司</span>
						</template>
                    </el-table-column>
					<el-table-column label="查看次数" prop="views" width="100"></el-table-column>
					<el-table-column label="创建时间" min-width="120" prop="createTime">
                        <template slot-scope="scope">
                            {{scope.row.createTime | transTime('YYYY-MM-DD HH:mm:ss')}}
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
import { Component, Vue } from 'vue-property-decorator'
import Page from '../../components/Page.vue'
import ThingApi from '../../api/Thing'

type find = {
    title: string,
    type: number | string
}
@Component({
    components: {
        Page
    }
})
export default class Thing extends Vue {
    private loading: boolean = false
    private pageIndex: number = 1
    private pageSize: number = 10
    private total: number = 0
    private list: Array<object> = []
    private selectedList: Array<object> = []
    private find: find = {
        title: '',
        type: ''
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
        this.find.title = ''
        this.find.type = ''
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
    handleCommand({ type, id }: { type: any, id: number }) {
        console.log(type, id)
        if (type === 'edit') {
            this.$router.push({ name: 'editThing' })
        } else if (type === 'view') {
            this.$router.push({ name: 'viewThing' })
        } else if (type === 'del') {
            this.del(id)
        }
    }
    getList() {
        this.loading = true
        ThingApi.find({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            title: this.find.title,
            type: this.find.type
        }).then((res: any) => {
            this.loading = false
            this.list = res.list
            this.total = res.total
        }).catch(err => {
            this.loading = false
        })
    }
    del(id: number) {

    }
}
</script>

<style lang="less" scoped>

</style>
