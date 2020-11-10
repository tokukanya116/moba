<template>
 <view  class="accdetailview">

  <view  class="stickynavbox">
	   <button  :class="{active:markselstatus[1]}"  @click="selectType(2)">可用红包</button>
	   <button :class="{active:markselstatus[0]}"  @click="selectType(1)">待派发红包</button>
	   <button :class="{active:markselstatus[2]}"  @click="selectType(3)">已用完红包</button>
	   <button  :class="{active:markselstatus[3]}"  @click="selectType(4)">过期红包</button>
  </view>
   <!-- 投注列表 -->
   
   <view  class="touzhucontent">
	 <mescroll-body ref="mescrollRef" @init="mescrollInit"  @down="downCallback" @up="upCallback"  :down="downOption" 		要修改参数时选填
 	 :up="upOption"	>  
      <view  class="hongbaolist" >
      
          <navigator url="none"  v-for="item  in  hongbaoListArr">
             <view class="leftitem">
				 <view class="">{{item.hbtitle}}</view>
				 <view class="">{{item.hbdesc}}</view>
				 <view class="">有效期:{{item.validate}}</view>
			 </view>
			 <view class="rightitem">
				 <view class="">￥{{item.ibalance}}</view>
				  <view class="">剩余</view>
			 </view>
          </navigator>

      </view>
	</mescroll-body> 
	  
   </view> 


   </view> 
</template>

<script>
 import {$toast, $routerJump }  from '@/utils/globalFun.js'
 import {$interface }  from '@/utils/globalData.js'
 import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
 const ucardType = {
				0:"全场",
				888:"数字彩",
				666:"V赢会员",
				800:"足彩",
				850:"北单",
				900:"竞彩足球",
				940:"竞彩篮球",
				980:"竞彩冠亚军",
				999:"竞彩(足球、篮球、冠亚军)",
				200:"刮刮乐"
		}
		
		
export default {
	 mixins: [MescrollMixin],
	 data(){
		return {
			mescroll:null,
			upOption:{
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 10 // 每页数据的数量
				},
				auto:true,//是否在初始化完毕之后自动执行上拉回调callback; 默认true
				empty:{
					tip: '~ 无更多数据 ~' // 提示
					// btnText: '去看看'
				},
				textNoMore:"~没有更多数据了~"
			},
			downOption:{
				auto:true,//是否在初始化完毕之后自动执行下拉回调callback; 默认true
			},
		    hongbaoListArr:[],//存储
			hbType:'u_user_card_2',
			markselstatus:[false,true,false,false]//用于展示选择红包类型后的状态 分别对应的是待派发 可用 已用完 过期
	
				
			
	    }
	 },
	 onLoad(){

	
	 },
	 
	 methods: {
		 //查询红包列表
		 getAccountList(page){
			  let _this = this;
			  var pageNo = page.num;
			  console.log(pageNo)
			  let postParam = this.hbType+"&ps=15&pn="+pageNo;
		
			  this.$request.post($interface.iUsercard+postParam
			  ).then(function( msg ){
				  console.log(msg)
				    _this.mescroll.endSuccess();
				    let feedback = msg.data.Resp;
				    let code = feedback.code;
				    let desc = feedback.desc;
					if( pageNo ==1 )
					{
						 _this.hongbaoListArr = [];
					}
					
				if( code==0 )
				{
						 
				   // 页码 总数据条数
				   let totalPage = feedback.count.tp;
				    // 投注列表
				    let rowList = feedback.row;
					console.log(rowList)
					if( rowList )
					{
						  if(!Array.isArray(rowList) )
						   {
							  rowList = new Array(rowList);
						   }
						   
						   let curPageLen = rowList.length; 
						  
						  var yearDiff = function(t1, t2){
							  console.log(t1,t2)
							  let date1 = new Date(t1.replace(/-/g,'/'));
							  let date2 = new Date(t2.replace(/-/g,'/'));
							  return date2.getFullYear() - date1.getFullYear();
						  } 
						 
						  rowList.forEach(function( item ){
							   let cgameid = item.cgameid;//红包类型id
							   let itype = item.itype;//0直用券 1满减
							   //红包状态 -1 待派发  0可用 1已用 2过期
							   let hbStatus = item.istate;
							   let imax = item.imax;//需要达到满减的额度
							   let imoney = item.imoney;//红包金额
							   let ibalance = item.ibalance;//余额
							   let istartdate = item.istartdate;//红包可有效的开始时间
							   let ienddate = item.ienddate;//红包失效时间
							   let info = {};
							   if( itype==0 )
							   {
								    info.hbtitle = imoney+"元直用券";
									info.hbdesc = ucardType[cgameid]+"直用券";
								   
							   }
							   else
							   {
								    info.hbtitle = "满"+imax
									+"元减";
									info.hbdesc = ucardType[cgameid]+"抵用券";
							   }
							   // 有效期
							   let timeDiff = yearDiff(istartdate,ienddate);
							   info.validate = timeDiff>=10?"永久有效":ienddate.substr(0, 10);
							   info.ibalance = ibalance;
							   // info.jumplink = "/pages/YOTabBar/YOGameHall/YOGameHall";
							   _this.hongbaoListArr.push(info);
							   // console.log(_this.hongbaoListArr)
					
							   
							   
							  
						  });
						   
						 
					
			

						_this.mescroll.endByPage(curPageLen, totalPage); 
						
						
						
					}
					else
					{
						_this.mescroll.endByPage(0, 1); 
						
					}
					
				 }
				 else
				 {
					 $toast.showToast(desc,function(){
						 if( code== 6789 )
						 {
							 $routerJump.redirectTo("/pages/YOLogin/YOLogin");
							 
						 }
					 });
					  
				 }
					 
			  })
		 },
		 mescrollInit(mescroll) {
		 	 this.mescroll = mescroll;
		 },
		 // 下拉刷新回调
		 downCallback(page){
			 this.mescroll.resetUpScroll();
		 },
		 upCallback(page){
			  this.getAccountList(page);
		 },

		 // 筛选
		 selectType( type ){
			 this.hbType = 'u_user_card_'+type;
			 this.markselstatus = [false,false,false,false];
			 this.markselstatus[type-1] = true;
			 this.mescroll.resetUpScroll();
		 }
		 
		 

	}
 }	
</script>

<style>
@import url('@/utils/globalcss/global.css');
.stickynavbox{
	width:100%;
	height:80rpx;
	position:sticky;
	position:-webkit-sticky;
	background-color:#fff;
	left:0;
	top:88rpx;
	z-index:10;
	margin-bottom:10rpx;
}
.stickynavbox  button{
	float:left;
	width:25%;
	height:80rpx;
	line-height:76rpx;
	box-sizing:border-box;
	font-size:28rpx;
	
	
}
.stickynavbox  .active{
	color:#ef8820;
	border-bottom:4rpx  solid #ef8820;
}
.hongbaolist navigator{
	height:160rpx;
	background-color:#fff;
	display:flex;
	align-items:center;
	padding:0 30rpx;
	margin-bottom:10rpx;
}
.leftitem{
	flex-grow:1;
}
.leftitem  view:nth-child(1){
	color:#F75E60;
}
.leftitem  view:nth-child(2){
	color:#fff;
	display:inline-block;
	background-color:#ff9a4b;
	font-size:20rpx;
	padding:2rpx  10rpx;
	border-radius:6rpx;
	
}
.leftitem  view:nth-child(3){
	font-size:20rpx;
	color:#999;
	margin-top:6rpx;
}
.rightitem{
	width:160rpx;
	color:#F75E60;
}
.rightitem view:nth-child(1){
	font-weight:700;
	font-size:32rpx;
}

</style>
