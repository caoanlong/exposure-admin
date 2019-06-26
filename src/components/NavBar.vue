<template>
    <el-menu class="navbar" mode="horizontal">
		<hamburger 
            class="hamburger-container" 
            :toggleClick="toggleSideBar" 
            :isActive="sidebar.opened">
        </hamburger>
		<breadcrumb class="breadcrumb-container"></breadcrumb>
		<div class="right-menu">
			<el-tooltip effect="dark" content="navbar.theme" placement="bottom"></el-tooltip>
			<el-dropdown class="avatar-container right-menu-item">
				<div class="avatar-wrapper">
					<img class="user-avatar" :src="userInfo.avatar ? $imgUrl + userInfo.avatar : require('../assets/imgs/avatar.gif')">
					<span class="user-text">你好！{{userInfo.userName}}</span>
					<i class="el-icon-caret-bottom"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<router-link to="/">
						<el-dropdown-item>个人资料</el-dropdown-item>
					</router-link>
					<el-dropdown-item divided>
						<div @click="logout">退出</div>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'

@Component({
    components: {
        Hamburger,
        Breadcrumb
    }
})
export default class NavBar extends Vue {
	@Getter sidebar: any
	@Getter userInfo: any
    
    toggleSideBar() {
        this.$store.commit('TOGGLE_SIDEBAR')
    }

    logout() {
		this.$store.commit('REMOVE_AUTH')
		this.$store.commit('REMOVE_USERINFO')
		this.$router.push({name: 'login'})
    }
}
</script>

<style lang="less" scoped>
.navbar {
	height: 50px;
	line-height: 50px;
	border-radius: 0px !important;
	.hamburger-container {
        float: left;
		height: 50px;
    }
	.breadcrumb-container {
		float: left;
		height: 50px;
		line-height: 50px;
    }
	.errLog-container {
		display: inline-block;
        vertical-align: top;
    }
	.right-menu {
		float: right;
		height: 100%;
		&:focus {
            outline: none;
        }
		.right-menu-item {
			display: inline-block;
            margin: 0 8px;
        }
		.screenfull {
            height: 20px;
        }
		.international {
            vertical-align: top;
        }
		.theme-switch {
            vertical-align: 15px;
        }
		.avatar-container {
			height: 50px;
			margin-right: 30px;
			.avatar-wrapper {
				cursor: pointer;
				margin-top: 5px;
				position: relative;
				.user-avatar {
					width: 40px;
					height: 40px;
                    border-radius: 20px;
                }
				.user-text {
					position: relative;
					top: -15px;
                    padding-left: 5px;
                }
				.el-icon-caret-bottom {
                    position: absolute;
                    top: 0;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>