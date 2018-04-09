<template>
	<section class="pkey-contain">
		<section class="pkey-win">
			<header class="pkey-header">车牌号码</header>
			<div class="pkey-win-body">
				<div class="pkey-ipt pkey-foucs">{{plate}}</div>
				<div class="pkey-tips">{{tips}}</div>
			</div>
		</section>
		<section class="pkey-keyboard">
			<header class="pkey-header2">
				<label class="pkey-chacelbtn" @click="closewin">取消</label><label class="pkey-okbtn" @click="checkplate">完成</label>
			</header>
			<section class="pkey-keyscontain">
				<ul>
					<li v-show="txtboardshow" v-for="(item,index) in cartxt">
						<span v-show="index==cartxt.length-1" @click="txtboardshow=false,numboardshow=true">ABC</span>
						<label v-for="(items,indexi) in item" @click="txtclick(items,indexi,item.length)">{{items}}</label>
						<span v-show="index==cartxt.length-1" @click="plate=plate.substr(0, plate.length-1)">&nbsp;</span>
					</li>
					<li v-show="numboardshow" v-for="(item,index) in numtxt">
						<span v-show="index==cartxt.length-1" @click="txtboardshow=true,numboardshow=false">字</span>
						<label v-for="(items,indexi) in item" @click="numclick(items,indexi,item.length)">{{items}}</label>
						<span v-show="index==cartxt.length-1" @click="plate=plate.substr(0, plate.length-1)">&nbsp;</span>
					</li>
				</ul>
			</section>
			<transition name="fade">
				<section class="showkey" v-show="keyshow" :keyshow="keyshow" :style="{marginLeft:mleft+'px'}">{{keyb}}</section>
			</transition>
		</section>
	</section>
</template>
<script>
export default{
	data(){
		return{
			plate:'',
			keyb:'',
			txtboardshow:true,
			numboardshow:false,
			keyshow:false,
			mleft:0,
			tips:'',
			cartxt:[
				['京','津','渝','沪','冀','晋','辽','吉','黑','苏'],
				['浙','皖','闽','赣','鲁','豫','鄂','湘','粤','琼'],
				['川','贵','云','陕','甘','青','蒙','桂','宁','新'],
				['藏','使','领','警','学','港','澳']
			],
			numtxt:[
				['1','2','3','4','5','6','7','8','9','0'],
				['Q','W','E','R','T','Y','U','I','O','P'],
				['A','S','D','F','G','H','J','K','L'],
				['Z','X','C','V','B','N','M']
			],
		}
	},
	methods: {
		txtclick : function(txt,indexi,size){
			if(this.plate.length>10){
				return
			}
			this.txtboardshow = false;
			this.numboardshow = true;
			this.plate+=txt;
			this.keyb = txt;
			this.composition(indexi,size);			
		},
		numclick : function(num,indexi,size){
			if(this.plate.length>10){
				return
			}
			this.plate+=num;
			this.keyb = num;
			this.composition(indexi,size);
			
		},
		composition : function(indexi,length){
			//闪烁位置设置
			let winwidth = document.documentElement.clientWidth;
			let keyW = winwidth * 65 / 750;
			let kkongW = winwidth * 9 / 750;
			let showW = winwidth * 120 / 750;
			let size = length;
			let isEven = (size%2==0) ? true : false;
			if(indexi<size/2){ // 左边
				let mleft = 0;
				if(isEven){ // 偶数
					let n = size/2-(indexi+1) + 0.5;
					mleft = n*(keyW + kkongW) + showW/2;
				}
				else{ // 奇数
					let n = (size/2+0.5)-(indexi+1);
					mleft = n*(keyW + kkongW) + showW/2;
				}				
				mleft = (mleft > winwidth/2) ? winwidth/2 : mleft;
				this.mleft = -mleft;
			}else{ // 右边
				let mright = 0;
				if(isEven){
					let n = (indexi+1) - size/2 -0.5;
					mright = n*(keyW + kkongW) - showW/2;
				}else{
					let n = (indexi+1) - (size/2+0.5);
					mright = n*(keyW + kkongW) - showW/2;
				}				
				mright = (mright > (winwidth/2-showW)) ? (winwidth/2-showW) : mright;
				this.mleft = mright;
			}
			//闪烁
			this.keyshow = true;
			let self = this;
			setTimeout(function(){
				self.keyshow = false;
			},250);
			
		},
		checkplate : function(){
			if(this.plate==''){
				this.tips = '请输入车牌号码'
				return;
			}			
			if(!(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}[A-Z0-9]{0,1}[A-Z0-9]{0,1}$/.test(this.plate))){
				//不是车牌
				this.tips = '车牌号格式不正确'		
				return;
			}
			this.tips = '';			
			this.$emit('transferplate',this.plate);
			this.plate = '';
			this.txtboardshow = true;
			this.numboardshow = false;
		},
		closewin : function(){
			this.tips = '';	
			this.$emit('transferclose',false);
			this.plate='';
			this.txtboardshow = true;
			this.numboardshow = false;
		}
	}
}	
</script>
<style>
.pkey-contain {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  background: rgba(0, 0, 0, 0.7);
  font-family: arial, helvetica;
  display: flex;
  justify-content: space-between;
   flex-direction: column;
   align-items: center;
}
.pkey-contain ul {
  margin: 0;
  padding: 0;
}
.pkey-contain li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.pkey-win {
  width: 600px;
  height: 300px;
 margin-top: 150px;
  background: #fff;
  z-index: 40;
  border-radius: 10px;
}
.pkey-header {
  height: 80px;
  border: 1px #f9f9f9 solid;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 0px solid;
  background: #f9f9f9;
  font-size: 32px;
  color: #282828;
  line-height: 80px;
  text-align: center;
}
.pkey-win-body {
	height: 218px;
	border-radius: 0px 0px 10px 10px;
	display: flex;
	flex-direction:column;
	align-items:center;
}
.pkey-ipt {
	width:500px;
  	height: 100px;
 	background: #ececec;
 	border-radius: 10px;
 	font-size: 40px;
	letter-spacing: 0.09375rem;
	margin-top: 35px;
	margin-bottom: 15px;
	line-height: 100px;
	text-align: center;
}
.pkey-foucs {
 	border: 1px #6ec4f6 solid;
}
.pkey-tips {
  text-align: center;
  color: #fe5e3e;
}
.pkey-keyboard {
  	width: 100%;
  	height: 600px;
 	z-index: 35;
	background: #d1d5da;
}
.pkey-header2 {
  width: 100%;
  height: 100px;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  background: #f4f4f6;
  text-align: left;
  font-size: 32px;
  color: #629efd;
  display: flex;
  justify-content: space-between;
}
.pkey-chacelbtn {
	line-height: 100px;
}
.pkey-okbtn {
  line-height: 100px;
}
.pkey-keyscontain {
  background: #d1d5da;
  padding-top: 5px;
  padding-bottom: 5px;
}
.pkey-keyscontain li {
  padding-top: 6px;
  padding-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pkey-keyscontain li label {
  width: 65px;
  height: 110px;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  background: #ffffff;
  font-size: 32px;
  line-height: 110px;
  margin-left: 4.5px;
  margin-right: 4.5px;
}
.pkey-keyscontain li span {
  width: 90px;
  height: 110px;
  text-align: center;
  display: inline-block;
  line-height: 110px;
  border: 1px #b2b5ba solid;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #b2b5ba;
  color: #fff;
}
.pkey-keyscontain li span:last-child{
	background-size:45px 35px;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAdCAYAAADYSS5zAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIXSURBVHjazNgxSxxBFMDxp3eBIAYNAcU7DBoMQRQCgl0aQbGwTZvWKKQSzBcQhFSBhEBCAmLEysJC24OAIAiCIFgdCIJwIAQE4UA4+aeZhfExezszumseDAd7O29/t/N2ZvYEkMD2gXxj3b5eKG6ZYuJnDHCFYuNbCPCT6vwDqALdESXSrq2q63z26fRFdfp1zyjdNu2LZZ28loIr5Qgc8AVupuAe5XwHM4EdwJbCrXngeooAloDdFFy5TdKv5twjoKvNec+BM6BhrhMELAE1B66UUXODQNPqc5CCTHBJXKbkq7iAZWBP4X574JI2A1xbfffVHX8BnKv8f32Bj82vduE6A2pnTiH/GORLB+4MGPMF1lJwHREF/hZoWblqpt7sODGTvPgC7brYuQMuae/aLF97wJOM/reAnXI7EJEb8xkbGyLy0XF8W0SmROQqJJkGzorImNwtqiIy7zh+E5UNeK+G4RoYjRzecccDgXq6g4Y4OaiRTeBVIO6NmTr0A6Gnr7qZdoKAAiyoRFfAiCeuV03Wyary1LS6+q4BTIYCXchLYNgD+Fr1O1RDOWpy6VHqDwUKsKgSXQBDGcBpVWddKatNS+WuxgBdyIZZc6WAVvHdD2rkudlp/DdAF/IU6HvoDWsWsg48yxFovwO1JBJ5DEyYndB9wcqOnfxSSILFgt+Lv8f8szBfEK6W7EVjhiJvZN0unX8DAGg1Oi8MfHlfAAAAAElFTkSuQmCC);
}
.showkey{
	 width: 120px;
  height: 120px;
  position: fixed;
  left: 50%;
  bottom: 630px;
  z-index: 50;
  text-align: center;
  border-radius: 10px;
  background: #ffffff;
  font-size: 50px;
  line-height:120px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>