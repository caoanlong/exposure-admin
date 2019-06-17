<template>
    <div class="menu-wrapper">
		<template v-for="item in routes.filter(i => i.isShow)">
			<el-menu-item 
				v-if="!item.children || item.children.length == 0" 
				:index="item.name" 
				:key="item.name" 
				:class="{'submenu-title-noDropdown':!isNest}">
				<svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
				<span slot="title">{{item.title}}</span>
			</el-menu-item>
			<el-submenu v-else :index="item.name" :key="item.name">
				<template slot="title">
					<svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
					<span slot="title">{{item.title}}</span>
				</template>
				<template v-for="child in item.children.filter(i => i.isShow)">
					<el-menu-item 
						:index="child.name" 
						:key="child.name"  
						v-if="!child.children || child.children.length == 0">
						<svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
						<span>{{child.title}}</span>
					</el-menu-item>
					<sidebar-item v-else :is-nest="true" class="nest-menu" :routes="[child]" :key="child.name"></sidebar-item>
				</template>
			</el-submenu>
		</template>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SidebarItem extends Vue {
    @Prop() routes!: Array<any>
    @Prop({ default: false }) isNest!: boolean
}
</script>

<style lang="less" scoped>

</style>
