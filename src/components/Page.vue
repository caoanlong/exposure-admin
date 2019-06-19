<template>
    <el-row type="flex">
        <el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
            <span>总共 {{total}} 条记录每页显示</span>
            <el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSizeX" @change="pageSizeChange">
                <el-option label="10" :value="10"></el-option>
                <el-option label="20" :value="20"></el-option>
                <el-option label="30" :value="30"></el-option>
                <el-option label="40" :value="40"></el-option>
                <el-option label="50" :value="50"></el-option>
                <el-option label="100" :value="100"></el-option>
            </el-select>
            <span>条记录</span>
        </el-col>
        <el-col :span="12" style="padding-top: 15px;">
            <div class="pagination">
                <el-pagination 
                    ref="page"
                    :page-size="pageSize" 
                    align="right" 
                    background layout="prev, pager, next" 
                    :total="total" 
                    :current-page.sync="pageIndexX" 
                    @current-change="pageChange">
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component
export default class Page extends Vue {
    @Prop(Number) total!: number
    @Prop({type: Number, default: 10}) pageSize!: number
    @Prop({type: Number, default: 1}) pageIndex!: number

    private pageIndexX: number = 2
    private pageSizeX: number = 10

    @Watch('pageIndex')
    changePageIndex(value: number) {
        this.pageIndexX = value
    }

    @Watch('pageSize')
    changePageSize(value: number) {
        this.pageSizeX = value
    }

    mounted(): void {
        this.pageIndexX = this.pageIndex
        this.pageSizeX = this.pageSize
        const pageRef: any = this.$refs['page']
        pageRef.internalCurrentPage = this.pageIndex
    }

    pageChange(index: number) {
        this.$emit('pageChange', index)
    }

    pageSizeChange(size: number) {
        this.$emit('pageSizeChange', size)
    }

}
</script>