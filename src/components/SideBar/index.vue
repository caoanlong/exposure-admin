<template>
    <scroll-bar>
		<el-menu 
			mode="vertical" 
			:default-active="$route.name" 
			:collapse="isCollapse" 
			background-color="#304156" 
			text-color="#bfcbd9" 
			active-text-color="#409EFF"
			@select="selectIndex">
			<sidebar-item :routes="menus"></sidebar-item>
		</el-menu>
	</scroll-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import ScrollBar from '../ScrollBar.vue'
import SidebarItem from './SidebarItem.vue'

@Component({
    components: {
		ScrollBar,
		SidebarItem
	}
})
export default class SideBar extends Vue {
	@Getter('sidebar') getterSidebar: any

	get isCollapse() {
		return !this.getterSidebar.opened
	}

	get menus() {
		return require('../../assets/data/menus.json')
	}

	selectIndex(name: string) {
		this.$router.push({ name })
	}
}
</script>

<style lang="less">

</style>
