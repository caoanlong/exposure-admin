<template>
    <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
		<div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const padding: number = 15
@Component
export default class ScrollPane extends Vue {
    left: number = 0

    handleScroll(e: any) {
        const eventDelta: number = e.wheelDelta || -e.deltaY * 3
        const $container: any = this.$refs.scrollContainer
        const $containerWidth: number = $container.offsetWidth
        const $wrapper: any = this.$refs.scrollWrapper
        const $wrapperWidth: number = $wrapper.offsetWidth
        if (eventDelta > 0) {
            this.left = Math.min(0, this.left + eventDelta)
        } else {
            if ($containerWidth - padding < $wrapperWidth) {
                if (this.left < -($wrapperWidth - $containerWidth + padding)) {
                    this.left = this.left
                } else {
                    this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
                }
            } else {
                this.left = 0
            }
        }
    }

    moveToTarget($target: any) {
        const $container: any = this.$refs.scrollContainer
        const $containerWidth: number = $container.offsetWidth
        const $targetLeft: number = $target.offsetLeft
        const $targetWidth: number = $target.offsetWidth
        if ($targetLeft < -this.left) {
            // tag in the left
            this.left = -$targetLeft + padding
        } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
            // tag in the current view
        } else {
            // tag in the right
            this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
        }
    }
}
</script>

<style lang="less" scoped>
.scroll-container {
	white-space: nowrap;
	position: relative;
	overflow: hidden;
	width: 100%;
	.scroll-wrapper {
        position: absolute;
    }
}
</style>
