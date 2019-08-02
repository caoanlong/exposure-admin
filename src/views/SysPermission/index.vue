<template>
    <div class="main-content">
        <el-card class="box-card">
			<div slot="header" class="clearfix">{{$route.meta.title}}</div>
			<div class="search">
				<el-form :inline="true"  class="demo-form-inline"  size="small">
					<el-form-item label="用户名">
						<el-input placeholder="请输入..." v-model="find.userName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table-control">
				<el-button 
                    type="default" 
                    size="mini" 
                    icon="el-icon-plus" 
                    @click="$router.push({name: 'addSysPermission'})">
                    添加
                </el-button>
			</div>
			<div class="table">
				<el-table 
					ref="table" 
                    v-loading="loading"
					:data="list" 
                    @selection-change="selectionChange"
					border style="width: 100%" size="mini" stripe>
					<el-table-column label="id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="权限名" prop="perName"></el-table-column>
					<el-table-column label="权限类型" prop="perType"></el-table-column>
					<el-table-column label="权限" prop="permission"></el-table-column>
					<el-table-column label="url" prop="url"></el-table-column>
					<el-table-column label="创建人" prop="createUserName"></el-table-column>
					<el-table-column label="修改人" prop="updateUserName"></el-table-column>
                    <el-table-column label="创建时间" min-width="120" prop="createTime">
                        <template slot-scope="scope">
                            {{scope.row.createTime | transTime('YYYY-MM-DD HH:mm:ss')}}
                        </template>
                    </el-table-column>
                    <el-table-column label="修改时间" min-width="120" prop="updateTime">
                        <template slot-scope="scope">
                            {{scope.row.updateTime | transTime('YYYY-MM-DD HH:mm:ss')}}
                        </template>
                    </el-table-column>
					<el-table-column width="120" align="center">
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
			</div>
		</el-card>
    </div>
</template>

<script lang="ts">
import { Message } from 'element-ui'
import { Component, Vue } from 'vue-property-decorator'
import SysPermissionApi from '../../api/SysPermission'

@Component
export default class SysPermission extends Vue {
    private loading: boolean = false
    private pageIndex: number = 1
    private pageSize: number = 10
    private total: number = 0
    private list: Array<object> = []
    private selectedList: Array<object> = []
    private find: any = {
        perName: ''
    }

    created(): void {
        this.getList()
    }

    search() {
        this.getList()
    }
    reset() {
        this.find.perName = ''
        this.getList()
    }
    selectionChange(data: any) {
        this.selectedList = data.map((item: any) => item.id)
    }
    handleCommand({ type, id }: any) {
        if (type === 'edit') {
            this.$router.push({ name: 'editSysPermission', query: { id } })
        } else if (type === 'view') {
            this.$router.push({ name: 'viewSysPermission', query: { id }  })
        } else if (type === 'del') {
            this.del(id)
        }
    }
    getList(pid=-1) {
        this.loading = true
        SysPermissionApi.findByPid({
            pid,
            perName: this.find.perName
        }).then((res: any) => {
            this.loading = false
            this.list = res
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
            SysPermissionApi.del({ id }).then((res: any) => {
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
