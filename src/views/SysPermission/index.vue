<template>
    <div class="main-content">
        <el-card class="box-card">
			<div slot="header" class="clearfix">{{$route.meta.title}}</div>
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
					border 
                    style="width: 100%" 
                    size="mini" 
                    stripe 
                    row-key="id"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
					<el-table-column label="权限名" prop="perName"></el-table-column>
					<el-table-column label="权限类型" prop="perType" width="70">
                        <template slot-scope="scope">
                            <span v-if="scope.row.perType === 'menu'" style="color:#409EFF">菜单</span>
                            <span v-else style="color:#E6A23C">按钮</span>
                        </template>
                    </el-table-column>
					<el-table-column label="权限" prop="permission"></el-table-column>
					<el-table-column label="url" prop="url"></el-table-column>
					<el-table-column label="排序" prop="sort" width="50"></el-table-column>
					<el-table-column label="创建人" prop="createUserName" width="90"></el-table-column>
					<el-table-column label="修改人" prop="updateUserName" width="90"></el-table-column>
                    <el-table-column label="创建时间" width="150" prop="createTime">
                        <template slot-scope="scope">
                            {{scope.row.createTime | transTime('YYYY-MM-DD HH:mm:ss')}}
                        </template>
                    </el-table-column>
                    <el-table-column label="修改时间" width="150" prop="updateTime">
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

    created(): void {
        this.getList()
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
        SysPermissionApi.findByPid({ pid }).then((res: any) => {
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
