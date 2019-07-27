<template>
	<div class="home">
		<panel-group :total="total" style="margin-top:0"></panel-group>
		<div id="homeCharts" style="width: 100%;height:1000px;"></div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
import PanelGroup from '../../components/PanelGroup.vue'
import Common from '../../api/Common'

const lineChartData: any = {
	newVisitis: {
		expectedData: [100, 120, 161, 134, 105, 160, 165],
		actualData: [120, 82, 91, 154, 162, 140, 145]
	},
	messages: {
		expectedData: [200, 192, 120, 144, 160, 130, 140],
		actualData: [180, 160, 151, 106, 145, 150, 130]
	},
	purchases: {
		expectedData: [80, 100, 121, 104, 105, 90, 100],
		actualData: [120, 90, 100, 138, 142, 130, 130]
	},
	shoppings: {
		expectedData: [130, 140, 141, 142, 145, 150, 160],
		actualData: [120, 82, 91, 154, 162, 140, 130]
	}
}

@Component({
	components: {
		PanelGroup
	}
})
export default class Home extends Vue {
	private lineChartData: Array<any> = []
	private total: any = {}
	private myCharts: any = null
	private option: any = {
		title: {
			text: '地区事件统计'
		},
		color: ['#3398DB'],
		tooltip: {},
		legend: {
			data:['事件数']
		},
		xAxis: {
			type: 'value'
		},
		yAxis: {
			type: 'category',
			axisTick: {
                alignWithLabel: true
            },
			data: []
		},
		series: [
			{
				name: '事件数',
				type: 'bar',
				label: {
					normal: {
						show: true,
						position: 'insideRight'
					}
				},
				data: []
			}
		]
	}

	created() {
		this.getTotal()
	}

	mounted() {
		this.getStatistics()
	}

	getTotal() {
		Common.total().then(res => {
			this.total = res
		})
	}

	getStatistics() {
		const homeCharts: any = document.getElementById('homeCharts')
		this.myCharts = echarts.init(homeCharts)
		Common.statistics().then(res => {
			const yAxisData = []
			const seriesData = []
			if (res && Array.isArray(res) && res.length > 0) {
				for (let i = 0; i < res.length; i++) {
					yAxisData.push(res[i].areaName)
					seriesData.push(res[i].total)
				}
			}
			this.option.yAxis.data = yAxisData.reverse()
			this.option.series[0].data = seriesData.reverse()
			this.myCharts.setOption(this.option)
		})
	}
}
</script>

<style lang="less" scoped>
.home {
	padding: 20px;
}
</style>
