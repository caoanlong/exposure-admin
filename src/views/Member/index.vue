<template>
    <div class="main-content">
        <el-card class="box-card">
			<div slot="header" class="clearfix">{{$route.meta.title}}</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="会员用户名">
						<el-input placeholder="请输入..." v-model="find.userName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table-control">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="$router.push({name: 'addMember'})">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="del">批量删除</el-button>
			</div>
			<div class="table">
				<el-table 
					ref="table" 
                    v-loading="loading"
					:data="list" 
                    @selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="客户名称" min-width="120" :show-overflow-tooltip="true" prop="companyName" align="left"></el-table-column>
					<el-table-column label="客户编号" prop="code" align="center"></el-table-column>
					<el-table-column label="所属片区" min-width="120" :show-overflow-tooltip="true" prop="zone" align="left"></el-table-column>
					<el-table-column label="监控类型" prop="fencingType" align="center">
                        <template slot-scope="scope">
							<span v-if="scope.row.fencingType=='Point'">地址监控</span>
							<span v-if="scope.row.fencingType=='Area'">区域监控</span>
							<span v-if="scope.row.fencingType=='Mix'">混合监控</span>
						</template>
                    </el-table-column>
					<el-table-column label="联系人" prop="contactName" align="center"></el-table-column>
					<el-table-column label="手机" min-width="100" :show-overflow-tooltip="true" prop="contactPhone" align="center"></el-table-column>
					<el-table-column label="监控区域" prop="monitorAreaCount" align="center">
                        <template slot-scope="scope">{{scope.row.monitorAreaCount}}</template>
                    </el-table-column>
					<el-table-column label="监控地址" prop="monitorAreaCount" align="center">
                        <template slot-scope="scope">{{scope.row.customerAddressNum}}</template>
                    </el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'address', data: scope.row}">地址</el-dropdown-item>
									<el-dropdown-item :command="{type: 'view', id:scope.row.customerID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.customerID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.customerID}">删除</el-dropdown-item>
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

type find = {
    userName: string
}
@Component({
    components: {
        Page
    }
})
export default class Member extends Vue {
    private loading: boolean = false
    private pageIndex: number = 1
    private pageSize: number = 10
    private total: number = 0
    private list: Array<object> = []
    private selectedList: Array<object> = []
    private find: find = {
        userName: ''
    }
    search() {
        this.pageIndex = 1
        this.pageSize = 10
        this.getList()
    }
    reset() {
        this.find.userName = ''
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
    getList() {
        this.loading = true
    }
    del() {

    }
}
</script>

<style lang="less" scoped>

</style>
