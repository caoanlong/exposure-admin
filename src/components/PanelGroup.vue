<template>
	<el-row class="panel-group" :gutter="20">
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
		<div class='card-panel'>
			<div class="card-panel-icon-wrapper icon-people">
				<svg-icon icon-class="peoples" class-name="card-panel-icon" />
			</div>
			<div class="card-panel-description">
				<div class="card-panel-text">会员注册总数</div>
				<count-to class="card-panel-num" :startVal="0" :endVal="total.memberTotal" :duration="1000"></count-to>
			</div>
		</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
		<div class="card-panel">
			<div class="card-panel-icon-wrapper icon-message">
				<svg-icon icon-class="member" class-name="card-panel-icon" />
			</div>
			<div class="card-panel-description">
				<div class="card-panel-text">会员激活人数</div>
				<count-to class="card-panel-num" :startVal="0" :endVal="total.memberActiveTotal" :duration="1200"></count-to>
			</div>
		</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
		<div class="card-panel">
			<div class="card-panel-icon-wrapper icon-money">
				<svg-icon icon-class="sys-user" class-name="card-panel-icon" />
			</div>
			<div class="card-panel-description">
				<div class="card-panel-text">会员在线人数</div>
				<count-to class="card-panel-num" :startVal="0" :endVal="total.memberOnlineTotal" :duration="1300"></count-to>
			</div>
		</div>
		</el-col>
		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
		<div class="card-panel">
			<div class="card-panel-icon-wrapper icon-shoppingCard">
				<svg-icon icon-class="thing" class-name="card-panel-icon" />
			</div>
			<div class="card-panel-description">
				<div class="card-panel-text">事件总数</div>
				<count-to class="card-panel-num" :startVal="0" :endVal="total.thingTotal" :duration="1400"></count-to>
			</div>
		</div>
		</el-col>
	</el-row>
</template>

<script>
import CountTo from "vue-count-to"
export default {
	components: {
		CountTo
	},
	props: {
		total: Object
	}
}
</script>

<style lang="less" scoped>
	.card-panel-col {
        margin-bottom: 20px;
    }
	.card-panel {
		height: 108px;
		cursor: pointer;
		font-size: 12px;
		position: relative;
		overflow: hidden;
		color: #666;
		background-color: #fff;
		box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
		border-color: rgba(0, 0, 0, 0.05);
		&:hover {
			.card-panel-icon-wrapper {
                color: #fff;
            }
			.icon-people {
                background-color: #40c9c6;
            }
			.icon-message {
                background-color: #36a3f7;
            }
			.icon-money {
                background-color: #f4516c;
            }
			.icon-shoppingCard {
                background-color: #34bfa3;
			}
		}
		.icon-people {
            color: #40c9c6;
        }
		.icon-message {
            color: #36a3f7;
        }
		.icon-money {
            color: #f4516c;
        }
		.icon-shoppingCard {
            color: #34bfa3;
        }
		.card-panel-icon-wrapper {
			float: left;
			margin: 14px 0 0 14px;
			padding: 16px;
			transition: all 0.38s ease-out;
            border-radius: 6px;
        }
		.card-panel-icon {
			float: left;
            font-size: 48px;
        }
		.card-panel-description {
			float: right;
			font-weight: bold;
			margin: 26px;
			margin-left: 0px;
			.card-panel-text {
				line-height: 18px;
				color: rgba(0, 0, 0, 0.45);
				font-size: 16px;
                margin-bottom: 12px;
            }
			.card-panel-num {
                font-size: 20px;
            }
        }
    }
</style>