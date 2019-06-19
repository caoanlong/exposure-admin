<template>
    <div class="app-wrapper clearfix" :class="{'hideSidebar': isCollapse}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<nav-bar></nav-bar>
			<tags-view></tags-view>
			<router-view/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Sidebar from '../components/SideBar/index.vue'
import NavBar from '../components/NavBar.vue'
import TagsView from '../components/TagsView.vue'

@Component({
    components: {
        Sidebar,
        NavBar,
        TagsView
    }
})
export default class Layout extends Vue {
    @Getter('sidebar') getterSidebar: any

    get isCollapse() {
		return !this.getterSidebar.opened
	}
}
</script>

<style lang="less">
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    .main-container {
        min-height: 100%;
        transition: margin-left 0.28s;
        margin-left: 180px;
    }
    .sidebar-container {
        transition: width 0.28s;
        width: 180px!important;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        a {
            display: inline-block;
            width: 100%;
        }
        .svg-icon {
            margin-right: 5px;
        }
        .el-menu { 
            border: none;
            width: 100%;
        }
    }
    &.hideSidebar {
        .sidebar-container {
            width: 36px!important;
            .el-menu {
				width: 36px!important;
            }
        }
        .main-container { 
            margin-left: 36px;
        }
        .submenu-title-noDropdown {
            padding-left: 10px!important;
			position: relative;
            span {
                height: 0;
                width: 0;
                overflow: hidden;
                visibility: hidden;
                transition: opacity 0.3s cubic-bezier(0.55,0,0.1,1);
                opacity: 0;
                display: inline-block;
            }
            &:hover {
                span {
                    display: block;
                    border-radius: 3px;
                    z-index: 1002;
                    width: 140px;
                    height: 56px;
                    visibility: visible;
                    position: absolute;
                    right: -145px;
                    text-align: left;
                    text-indent: 20px;
                    top: 0px;
                    background-color:#1f2d3d!important;
                    opacity: 1;
                }
            }
        }
        .el-submenu {
            & > .el-submenu__title {
                padding-left: 10px!important;
                & > span{
                    display: none;
                }
                .el-submenu__icon-arrow {
                    display: none;
                }
            }
            .nest-menu {
                .el-submenu__icon-arrow {
                    display: block!important;
                }
                span {
                    display: inline-block!important;
                }
            }
            .el-menu-item{
                min-width: 180px!important;
                background-color:#1f2d3d!important;
            }
        }
        .el-menu-item {
            padding-left: 10px!important;
            .el-tooltip{
                padding-left: 10px!important;
            }
        }
    }
    .nest-menu {
        .el-submenu {
            & > .el-submenu__title {
                min-width: 180px!important;
                background-color:#1f2d3d!important;
            }
            & > .el-submenu__title:hover{
                background-color:#001528!important;
            }
            .el-menu-item:hover{
                background-color:#001528!important;
            }
        }
    }
    .el-menu--collapse {
        .el-menu {
            .el-submenu{
                min-width: 180px!important;
            }
        }
    }
}
</style>
