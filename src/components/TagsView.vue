<template>
    <div class="tags-view-container">
		<scroll-pane class='tags-view-wrapper' ref='scrollPane'>
			<router-link 
                ref='tag' 
                class="tags-view-item" 
                :class="isActive(tag)?'active':''" 
                v-for="tag in Array.from(getterVisitedViews)" 
                :to="{name: tag.name, query: tag.query}" 
                :key="tag.path" 
                @contextmenu.prevent.native="openMenu(tag,$event)">
				{{tag.title}}
				<span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
			</router-link>
		</scroll-pane>
		<ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
			<li @click="closeSelectedTag(selectedTag)">Close</li>
			<li @click="closeOthersTags">Close Others</li>
			<li @click="closeAllTags">Close All</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import ScrollPane from './ScrollPane.vue'

@Component({
    components: {
        ScrollPane
    }
})
export default class TagsView extends Vue {
    visible: boolean = false
    top: number = 0
    left: number = 0
    selectedTag: any = {}

    @Getter('visitedViews') getterVisitedViews: any

    @Watch('$route', {immediate: true})
    addViewTags() {
        const route = this.generateRoute()
        if (!route) {
            return false
        }
        this.$store.commit('ADD_VISITED_VIEWS', route)
    }

    @Watch('$route')
    moveToCurrentTag() {
        const tags: any = this.$refs.tag
        const scrollPane: any = this.$refs.scrollPane
        this.$nextTick(() => {
            for (const tag of tags) {
                if (tag.to === this.$route.path) {
                    scrollPane.moveToTarget(tag.$el)
                    break
                }
            }
        })
    }

    generateRoute() {
        if (this.$route.name) {
            return this.$route
        }
        return false
    }

    isActive(route: any) {
        return route.path === this.$route.path || route.name === this.$route.name
    }

    closeSelectedTag(view: any) {
        this.$store.commit('DEL_VISITED_VIEWS', view)
        if (this.isActive(view)) {
            const latestView = [...this.getterVisitedViews].slice(-1)[0]
            if (latestView) {
                this.$router.push({name: latestView.name, query: latestView.query})
            } else {
                this.$router.push('/')
            }
        }
    }

    closeOthersTags() {
        this.$router.push(this.selectedTag.path)
        this.$store.commit('DEL_OTHERS_VIEWS', this.selectedTag)
        this.moveToCurrentTag()
    }

    closeAllTags() {
        this.$store.commit('DEL_ALL_VIEWS')
        this.$router.push('/')
    }

    openMenu(tag: any, e: any) {
        this.visible = true
        this.selectedTag = tag
        this.left = e.clientX
        this.top = e.clientY
    }

    closeMenu() {
        this.visible = false
    }

}
</script>

<style lang="less" scoped>
.tags-view-container {
	.tags-view-wrapper {
		background: #fff;
		height: 34px;
		border-bottom: 1px solid #d8dce5;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
		.tags-view-item {
			display: inline-block;
			position: relative;
			height: 26px;
			line-height: 24px;
			border: 1px solid #d8dce5;
			color: #495060;
			background: #fff;
			padding: 0 8px;
			font-size: 12px;
			margin-left: 5px;
			margin-top: 4px;
			&:first-of-type {
                margin-left: 15px;
            }
			&.active {
				background-color: #42b983;
				color: #fff;
				border-color: #42b983;
				&::before {
					content: '';
					background: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					position: relative;
                    margin-right: 2px;
                }
            }
        }
    }
	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 2;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;
			&:hover {
                background: #eee;
            }
        }
    }
}
</style>

<style lang="less">
// reset element css of el-icon-close
.tags-view-wrapper {
	.tags-view-item {
        text-decoration: none;
		.el-icon-close {
            position: relative;
            top: 4px;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			text-align: center;
			transition: all .3s cubic-bezier(.645, .045, .355, 1);
			transform-origin: 100% 50%;
			&:before {
                position: relative;
                top: -3px;
				transform: scale(.6);
            }
			&:hover {
				background-color: #b4bccc;
                color: #fff;
            }
        }
    }
}
</style>
