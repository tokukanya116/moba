<template>
	<view class="xiaji">
		<view class="xiaji_header">
			<view style="margin-bottom: 30rpx;">
				<text @click="open">{{year}}年{{month}}月</text>
				<i></i>
			</view>
			<view class="xiaji_headerbox">
				<text>
					<text>注册</text>
					<text class="xiaji_size" style="color:#333 ;">{{rc}}</text>
				</text>
				<text>
					<text>实名</text>
					<text class="xiaji_size" style="color:#1e87ff ;">0</text>
				</text>
				<text>
					<text>激活</text>
					<text class="xiaji_size" style="color:#fe4638 ;">0</text>
				</text>
			</view>
		</view>
		<view class="xiaji_box" v-show=" rc == 0">
			<view>查无数据，建议调整日期后再试</view>
		</view>

		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 要修改参数时选填 :up="upOption">
			<view class="add_box" v-for="item in rowList1" v-show=" rc !== 0">


				<view class="add_box1">
					<view>
						<text style="color: #000;margin-right: 21rpx;">{{item.cnickid}}</text>
						<text :class="item.ty =='未实名'?p1:item.ty =='推广员'?p3:p2">{{item.ty}}</text>
					</view>
					<view style="font-size: 26rpx;">{{item.cadddate}}</view>
				</view>
				<view class="add_box2">
					<view>余额</view>
					<view>上级</view>
					<view style="color: #fd5245;">{{item.ibalance}}</view>
					<view style="color: #000 ; font-size: 26rpx;">{{item.sj}}</view>
				</view>
			</view>
		</mescroll-body>

		<navigator url="jqchaxun" class="xiaji_img">
			<image style="width: 60rpx; height: 60rpx;" src="../../../static/images/cooper/search.png" mode=""></image>
		</navigator>
		<uni-popup ref="popup" type="bottom">
			<view class="uni-padding-wrap">
				<view class="uni-title">
					<view @click="close" style="color: #999;">取消</view>
					<view>请选择</view>
					<view style="color: #04be02;" @click="close()">完成</view>
				</view>
				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item">年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item">月</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"

	export default {
		mixins: [MescrollMixin],
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()

			for (let i = 1980; i <= date.getFullYear(); i++) {
				years.push(i)
			}

			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			return {
				mescroll: null,
				upOption: {
					page: {
						num: 1, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					auto: true, //是否在初始化完毕之后自动执行上拉回调callback; 默认true
					empty: {
						tip: '' // 提示
						// btnText: '去看看'
					},
					textNoMore: ""
				},
				downOption: {
					auto: true, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
				},
				p1: 'p1',
				p2: 'p2',
				p3: 'p3',
				rc: '',
				rowList1: [],
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				value: [9999, month - 1, day - 1],

				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		mounted() {
			this.getAdd()
		},
		methods: {
			// mixins: [MescrollMixin],
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close();
				this.getAdd()
			},
			bindChange(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[2]];
			},
			getAdd(page) {
				let _this = this;
				let year = this.year;
				let month = this.month;
				// console.log(year,month);
				var date = new Date();
				var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
				var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				var y = year,
					m = month
				var firstDay = new Date(y, m - 1, 1);
				firstDay = firstDay.getFullYear() + '-' + (firstDay.getMonth() + 1) + '-' + firstDay.getDate();
				var lastDay = new Date(y, m, 0);
				lastDay = lastDay.getFullYear() + '-' + (lastDay.getMonth() + 1) + '-' + lastDay.getDate();
				this.a = {
					stime: firstDay,
					etime: lastDay,
					pn: this.upOption.page.num,
					ps: 10
				}
				let b = `stime=${firstDay}&etime=${lastDay}&owner=&newValue=&forward=&pn=${this.upOption.page.num}&ps=10`
				console.log(this.a)
				this.$request.post('/phpu/qp.phpx?fid=u_agent', {
					data: b
				}).then(function(msg) {
					console.log(msg)
					let res = msg.data.Resp;
					let totalPage = res.count.tp;
					_this.rc = res.count.rc;
					_this.rowList = msg.data.Resp.row;
					let rowList = _this.rowList;
					// 只有一个值得时候是对象,强行变成数组
					if (rowList) {
						if (!Array.isArray(_this.rowList)) {
							_this.rowList = new Array(_this.rowList);
						}
						if( _this.upOption.page.num ==1 )
						{
							 _this.rowList1 = [];
						}
						let curPageLen = rowList.length;
						// 循环数组 进行数据加工
						rowList.forEach(function(item) {
							console.log(rowList)
							let cnickid = item.cnickid;
							let cadddate = item.cadddate;
							let zjuser = item.zjuser;
							let fuser = item.fuser;
							let idaigou = parseInt(item.idaigou);
							let ihemai = parseInt(item.ihemai);
							let izhuihao = parseInt(item.izhuihao);
							let ijoin = parseInt(item.ijoin);
							// let ibalance = item.ibalance;
							let daili = item.daili;
							let cidcard = item.cidcard;
							let j, dd = 0
							// let iaward = item.iaward;


							var ty = "用户";
							var xl = parseInt(idaigou + ihemai + izhuihao + ijoin);
							var sj = cnickid;

							// 判断人物的状态
							if (cnickid != zjuser) { //普通用户
								ty = "用户";
							} else {
								if (daili != 0) {
									ty = "推广员";

								}
								if (cnickid == cnickid) {
									ty = "自己";
								}
							}


							if (xl) {
								dd++
							}
							if (cnickid != zjuser) { //普通用户
								// shezhi = "--";
								if (cnickid != zjuser) {
									sj = zjuser;
								}
								if (cidcard == "") {
									ty = "未实名";
									// shezhi = "";

								} else {
									j++;

								}
							} else {
								if (cidcard == "") {
									ty = "未实名";
									shezhi = "";
								} else {
									j++;

								}
								if (cnickid != fuser) {
									// shezhi = "--";
									// shezhi = "";
									sj = fuser;
								}
								if (cnickid == cnickid) {
									sj = cnickid;
								}
							}
							let info = {}; // 创建新对象
							info.cnickid = cnickid; // 昵称
							info.cadddate = cadddate.substr(5, 11); //日期,取后面月份时间
							info.ty = ty; // 人物状态
							info.sj = sj; //上级
							info.ibalance = item.ibalance; //余额
							_this.rowList1.push(info); //加工好的数据放入新数组,渲染
							console.log(_this.rowList1)
						})
						_this.mescroll.endByPage(curPageLen, totalPage);
					} else {
						_this.mescroll.endByPage(0, 1);


					}





				})

			}


		},
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		// 下拉刷新回调
		downCallback(page) {
			this.mescroll.resetUpScroll();
		},
		upCallback(page) {
			this.getAccountList(page);
		}
	}
</script>

<style>
	.p1 {
		padding: 0 10px 0 10px;
		border: 1px solid #999;
		font-size: 24rpx;
		color: #000;
	}

	.p2 {
		padding: 0 10px 0 10px;
		border: 1px solid #308fff;
		font-size: 24rpx;
		color: #308fff;
	}

	.p3 {
		padding: 0 10px 0 10px;
		border: 1px solid #fd5245;
		font-size: 24rpx;
		color: #fd5245;
	}

	i {
		width: 16rpx;
		height: 16rpx;
		font-weight: normal;
		color: #ddd;
		border: 2rpx solid;
		border-width: 0 4rpx 4rpx 0;
		transform: rotate(45deg);
		transition: all 100ms linear;
		display: inline-block;
		vertical-align: 6rpx;
		margin-left: 10rpx;
	}

	,
	.xiaji {}

	.xiaji_header {
		/* display: flex; */
		padding: 24rpx 40rpx;
		font-size: 34rpx;
		background-color: #fff;
	}

	.xiaji_size {
		margin-right: 21rpx;
	}

	.xiaji_headerbox {
		font-size: 30rpx;
	}

	.xiaji_headerbox>text {
		color: #999;
	}

	.xiaji_box {
		background: url(../../../static/images/cooper/nodata.png) no-repeat center;
		background-size: 50% auto;
		background-color: #f2f2f2;
		position: relative;
		height: 800rpx;
	}

	.xiaji_box>view {
		padding-top: 600rpx;
		text-align: center;
	}

	.xiaji_img {
		position: fixed;
		top: 50%;
		right: 20rpx;
		margin-top: -30rpx;

	}


	picker-view {
		width: 100%;
		height: 600rpx;
		background: rgba(239, 239, 244, 1);

	}

	.item {
		line-height: 100rpx;
		text-align: center;
	}

	.uni-title {
		font-size: 32rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		padding: 20rpx 50rpx 20rpx 50rpx;
	}

	.add_box {
		width: 100%;
		background-color: #fff;
		padding: 20rpx;
		margin: 10rpx 0;
		box-sizing: border-box;

	}

	.add_box>view {
		display: flex;
		flex-wrap: wrap;

		color: #999999;
	}

	.add_box1 {
		padding: 0 0 20rpx;
		justify-content: space-between;
		line-height: 60rpx;
	}

	.add_box2 {
		background-color: #f5f5f5;
		padding: 34rpx;
		font-size: 24rpx;
	}

	.add_box2>view {
		width: 40%;
	}
</style>
