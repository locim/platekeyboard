<template>
	<div class="content">
		<div class="content-car-number">
			<div class="car-content-title">
				<span>车牌号</span>
				<label class="ze-checkbox"><input type="checkbox" v-model="checkbox" @change="carTypeChange">
		            <span class="ze-checkbox-icon" style="width: 20px;height: 20px;color: rgb(76, 216, 100);">
		                <i style="width: 6px;height: 12px;"></i>
		            </span>
		            <span class="ze-checkbox-text">新能源</span>
		        </label>
			</div>
			<div class="content-section">
				<div class="content-section-flex flex-card">
					<div class="content-section-flex flex-card-border">
						<button id="font" class="flex-btn" @click="btnClickYue" v-bind:class="{isClick: isYue }">{{areaName}}</button> 　　　　　　　　　 
						<span class="blank-border blank-border-first"></span>
						<button id='letter' class="flex-btn" @click="btnClickA" v-bind:class="{isClick: isA}">{{areaLetter}}</button>
						<div class="flex-mid"><span></span></div>
					
						<div class="flex-btns">
							<button id='numOne' @click="btnClickNum('one')" v-bind:class="{isNumClick: isNumOne }">{{numOne}}</button>
							<span class="blank-border"></span>
							<button id='numTwo' @click="btnClickNum('two')" v-bind:class="{isNumClick: isNumTwo }">{{numTwo}}</button>
							<span class="blank-border"></span>
							<button id='numThree' @click="btnClickNum('three')" v-bind:class="{isNumClick: isNumThree }">{{numThree}}</button>
							<span class="blank-border"></span>
							<button id='numFour' @click="btnClickNum('four')" v-bind:class="{isNumClick: isNumFour }">{{numFour}}</button>
							<span class="blank-border"></span>
							<button id='numFive' @click="btnClickNum('five')" v-bind:class="{isNumClick: isNumFive }">{{numFive}}</button>
							<span class="blank-border" v-if="checkbox"></span>
							<button v-if="checkbox" id='numSix' @click="btnClickNum('six')" v-bind:class="{isNumClick: isNumSix }">{{numSix}}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="keyboard" v-if="keyboardShow" :class='{animationDown:isDown,animationUp:isUp}'>
　　			<button class="btn-complete" @click="completeClick"><span>完成</span></button>
　　			<div v-if="keyboard == 'txt'">
	　　　　		<div class="keyboard-row" v-for="(item,rows) in carTxt">
	　　　　　			<button class="keyboard-row-item" v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}</button>
	　　　		</div>
　　　　			<div class="keyboard-row">
　　　　		<!-- <div class="keyboard-row-items"> -->
	　　　　　　		<button class="keyboard-row-item bottom" @click="btnBottomClick('新')">新</button>
	　　　　　　		<button class="keyboard-row-item bottom" @click="btnBottomClick('临')">临</button>
	　　　　　			<button v-for="j in noneBottomtxt" class="none-botton">{{j}}</button>
	　　　　　			<div class="keyboard-row-item clear" @click="clearClick">
	　　　　　　　			<img src="../assets/icon_input_delete.png" alt="删除">
	　　　　　			</div>
　　　		　<!-- </div> -->
　　				</div>
　			</div>
　			<div v-if="keyboard == 'num'">
　　　　			<div class="keyboard-row" v-for="(item,rows) in carNum">
	　　　　　　		<button :disabled="!isSelectl?isDisable && i<10 :isDisable&& rows!=0 " class="keyboard-row-item" v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}
	　　　　　　		</button>
　　　　			</div>
　　　			<div class="keyboard-row">
　　　　<!-- <div class="keyboard-row-bottom"> -->
　　　　　				<button :disabled="isSelectl" v-for="item in carNumBottom" class="keyboard-row-item bottom" @click="btnBottomNumClick(item)">{{item}}</button>
　　　　　　			<button v-for="j in noneBottom" class="none-botton">{{j}}</button>
			　　　　　<div class="keyboard-row-item clear" @click="clearClick">
			　　　　　　　<img src="../assets/icon_input_delete.png" alt="删除">
			　　　　　</div>
　　　　<!-- </div> -->
　　　			</div>
　　			</div>
		</div>
	</div>
</template>
<script>
	data () { //有一些别的数据,实在懒得一一挑出来了
　　		return {
　　　　toastTxt: '',
　　　　isToastShow: false,
　　　　isStr: '20px',
　　　　isEnd: '300px',
　　　　ispickerDateShow: '-400px',
　　　　dateTitle: '开始',
　　　　beginTimeVal: '',
　　　　overTimeVal: '',
　　　　isFeeHourClick: true,
　　　　checkbox: false,
　　　　isDown: false,
　　　　isUp: false,
　　　　selected: null,
　　　　isSelectx: false,
　　　　isSelectl: false,
　　　　key: '1',
　　　　areaName: '',
　　　　areaLetter: '',
　　　　numOne: '',
　　　　numTwo: '',
　　　　numThree: '',
　　　　numFour: '',
　　　　numFive: '',
　　　　numSix: '',
　　　　isYue: false,
　　　　keyboardShow: false,
　　　　keyboard: false,
　　　　isA: false,
　　　　isNumOne: false,
　　　　isNumTwo: false,
　　　　isNumThree: false,
　　　　isNumFour: false,
　　　　isNumFive: false,
　　　　isNumSix: false,
　　　　isDisable: false,
　　　　carTxt: [
　　　　　　{ name: ['粤', '京', '冀', '沪', '津', '晋', '蒙', '辽', '吉', '黑'] },
　　　　　　{ name: ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '桂'] },
　　　　　　{ name: ['琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁'] }
　　　　],
　　　　carNumBottom: ['W', 'X', 'Y', 'Z'],
　　　　noneBottom: ['', '', '', ''],
　　　　noneBottomtxt: ['', '', '', '', '', ''],
　　　　carNum: [
　　　　　　{ name: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] },
　　　　　　{ name: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'] },
　　　　　　{ name: ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'] }
　　　　],
　　　　addedCarNum: ''
　　}
},
watch: { 
　　checkbox: function (val, oldval) { //监听是否为新能源
　　　　this.isNumOne = false
　　　　this.isNumTwo = false
　　　　this.isNumThree = false
　　　　this.isNumFour = false
　　　　this.isNumFive = false
　　　　this.isNumSix = false
　　　　const vm = this
　　　　if (!val) {
　　　　// 切换到普通车牌
　　　　　　if (vm.numFour) {
　　　　　　　　vm.isNumFive = true
　　　　　　　　vm.key = 7
　　　　　　}
　　　　　　} else {
　　　　　　// 切换到新能源车牌
　　　　　　　　if (vm.numFive) {
　　　　　　　　vm.isNumSix = true
　　　　　　　　vm.key = 8
　　　　　　}
　　　　}
　　},
　　numFive: function (val) { //监听是否为普通车牌最后一位
　　　　if (!this.checkbox && val) {
　　　　　　this.isUp = false
　　　　　　this.isDown = true
　　　　　　this.keyboardShow = false
　　　　　　this.isNumFive = false
　　　　}
　　},
　　numSix: function (val) { //监听是否为新能源车牌最后一位
　　　　if (this.checkbox && val) {
　　　　　　this.isUp = false
　　　　　　this.isDown = true
　　　　　　this.keyboardShow = false
　　　　　　this.isNumSix = false
　　　　}
　　}
},
//methods
methods: {
　　// 车牌类型切换
　　carTypeChange (val) {
　　　　this.isNumOne = false
　　　　this.isNumTwo = false
　　　　this.isNumThree = false
　　　　this.isNumFour = false
　　　　this.isNumFive = false
　　　　this.isNumSix = false
　　　　if (!val) {
　　　　// 切换到普通车牌
　　　　　　if (this.numFour) {
　　　　　　　　this.isNumFive = true
　　　　　　　　this.key = 7
　　　　　　}
　　　　} else {
　　　　// 切换到新能源车牌
　　　　　　if (this.numFive) {
　　　　　　　　this.isNumSix = true
　　　　　　　　this.key = 8
　　　　　　}
　　　　}
　　},
　　// 车牌号第一位输入框选择
　　btnClickYue () {
　　　　this.isYue = true
　　　　this.isA = false
　　　　this.isUp = true
　　　　this.isNumOne = false
　　　　this.isNumTwo = false
　　　　this.isNumThree = false
　　　　this.isNumFour = false
　　　　this.isNumFive = false
　　　　this.isNumSix = false
　　　　this.keyboardShow = true
　　　　this.keyboard = 'txt'
　　　　this.key = 1
　　},
　　// 键盘选择显示
　　btnWordClick (rows, index, i) {
　　　　this.selected = i
　　　　if (this.key === 1) {
　　　　　　if (this.areaName === '临') {
　　　　　　　　this.areaLetter = ''
　　　　　　　　this.numOne = ''
　　　　　　　　this.numTwo = ''
　　　　　　　　this.numThree = ''
　　　　　　　　this.numFour = ''
　　　　　　　　this.numFive = ''
　　　　　　　　this.numSix = ''
　　　　　　}
　　　　　　this.areaName = i
　　　　　　this.isSelectl = false
　　　　　　document.getElementById('letter').click()
　　　　} else if (this.key === 2) {
　　　　　　this.areaLetter = i
　　　　　　document.getElementById('numOne').click()
　　　　} else if (this.key === 3) {
　　　　　　this.numOne = i
　　　　　　document.getElementById('numTwo').click()
　　　　} else if (this.key === 4) {
　　　　　　this.numTwo = i
　　　　　　document.getElementById('numThree').click()
　　　　} else if (this.key === 5) {
　　　　　　this.numThree = i
　　　　　　document.getElementById('numFour').click()
　　　　} else if (this.key === 6) {
　　　　　　this.numFour = i
　　　　　　document.getElementById('numFive').click()
　　　　} else if (this.key === 7) {
　　　　　　this.numFive = i
　　　　　　if (this.checkbox) {
　　　　　　　　document.getElementById('numSix').click()
　　　　　　}
　　　　} else if (this.key === 8) {
　　　　　　this.numSix = i
　　　　}
　　　　if (this.key === 7 || this.key === 8) {
　　　　　　this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '学']
　　　　　　this.noneBottom = ['']
　　　　} else if (this.key === 3 || this.key === 4 || this.key === 5 || this.key === 6) {
　　　　　　this.carNumBottom = ['W', 'X', 'Y', 'Z']
　　　　　　this.noneBottom = ['', '', '', '']
　　　　}
　　},
　　// 车牌第一位选择‘临’,’新‘后的键盘显示
　　btnBottomClick (val) {
　　　　if (val === '新') {
　　　　　　if (this.areaName === '临') {
　　　　　　　　this.areaLetter = ''
　　　　　　　　this.numOne = ''
　　　　　　　　this.numTwo = ''
　　　　　　　　this.numThree = ''
　　　　　　　　this.numFour = ''
　　　　　　　　this.numFive = ''
　　　　　　　　this.numSix = ''
　　　　　　}
　　　　　　this.areaName = '新'
　　　　　　this.isSelectx = true
　　　　　　this.isSelectl = false
　　　　　　document.getElementById('letter').click()
　　　　} else if (val === '临') {
　　　　　　this.areaName = '临'
　　　　　　this.isSelectl = true
　　　　　　this.isSelectx = false
　　　　　　this.isDisable = true
　　　　　　this.areaLetter = ''
　　　　　　this.numOne = ''
　　　　　　this.numTwo = ''
　　　　　　this.numThree = ''
　　　　　　this.numFour = ''
　　　　　　this.numFive = ''
　　　　　　this.numSix = ''
　　　　　　document.getElementById('letter').click('isLin')
　　　　}
　　},
　　// 键盘最后一行字母点击事件
　　btnBottomNumClick (i) {
　　　　this.selected = i
　　　　if (this.key === 2) {
　　　　　　this.areaLetter = i
　　　　　　document.getElementById('numOne').click()
　　　　} else if (this.key === 3) {
　　　　　　this.numOne = i
　　　　　　document.getElementById('numTwo').click()
　　　　} else if (this.key === 4) {
　　　　　　this.numTwo = i
　　　　　　document.getElementById('numThree').click()
　　　　} else if (this.key === 5) {
　　　　　　this.numThree = i
　　　　　　document.getElementById('numFour').click()
　　　　} else if (this.key === 6) {
　　　　　　this.numFour = i
　　　　　　document.getElementById('numFive').click()
　　　　} else if (this.key === 7) {
　　　　　　this.numFive = i
　　　　　　if (this.checkbox) {
　　　　　　　　document.getElementById('numSix').click()
　　　　　　}
　　　　} else if (this.key === 8) {
　　　　　　this.numSix = i
　　　　}
　　},
　　// 车牌号第二位输入框选择
　　btnClickA () {
　　　　this.isDisable = true
　　　　this.isA = true
　　　　this.isYue = false
　　　　this.isUp = true
　　　　this.isNumOne = false
　　　　this.isNumTwo = false
　　　　this.isNumThree = false
　　　　this.isNumFour = false
　　　　this.isNumFive = false
　　　　this.isNumSix = false
　　　　this.keyboardShow = true
　　　　this.keyboard = 'num'
　　　　this.key = 2
　　},
　　// 车牌号后五位或六位输入框选择
　　btnClickNum (name) {
　　　　if (this.isSelectl) {
　　　　　　this.isDisable = true
　　　　} else {
　　　　　　this.isDisable = false
　　　　}
　　　　this.keyboard = 'num'
　　　　this.keyboardShow = true
　　　　this.isYue = false
　　　　this.isA = false
　　　　this.isNumOne = false
　　　　this.isNumTwo = false
　　　　this.isNumThree = false
　　　　this.isNumFour = false
　　　　this.isNumFive = false
　　　　this.isNumSix = false
　　　　this.isUp = true
　　　　if (name === 'one') {
　　　　　　this.isNumOne = true
　　　　　　this.key = 3
　　　　} else if (name === 'two') {
　　　　　　this.isNumTwo = true
　　　　　　this.key = 4
　　　　} else if (name === 'three') {
　　　　　　this.isNumThree = true
　　　　　　this.key = 5
　　　　} else if (name === 'four') {
　　　　　　this.isNumFour = true
　　　　　　this.key = 6
　　　　} else if (name === 'five') {
　　　　　　this.isNumFive = true
　　　　　　this.key = 7
　　　　} else if (name === 'six') {
　　　　　　this.isNumSix = true
　　　　　　this.key = 8
　　　　}
　　　　if (name === 'five' || name === 'six') {
　　　　　　this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '学']
　　　　　　this.noneBottom = ['']
　　　　} else {
　　　　　　this.carNumBottom = ['W', 'X', 'Y', 'Z']
　　　　　　this.noneBottom = ['', '', '', '']
　　　　}
　　},
　　// 键盘点击‘完成’
　　completeClick () {
　　　　this.isYue = false
　　　　this.isA = false
　　　　this.isNumOne = false
　　　　this.isNumTwo = false
　　　　this.isNumThree = false
　　　　this.isNumFour = false
　　　　this.isNumFive = false
　　　　this.isNumSix = false
　　　　this.isUp = false
　　　　this.isDown = true
　　　　this.keyboardShow = false
　　},
　　// 键盘点击‘删除图标’
　　clearClick () {
　　　　if (this.key === 1) {
　　　　　　this.areaName = ''
　　　　} else if (this.key === 2) {
　　　　　　document.getElementById('font').click()
　　　　　　this.areaLetter = ''
　　　　} else if (this.key === 3) {
　　　　　　document.getElementById('letter').click()
　　　　　　this.numOne = ''
　　　　} else if (this.key === 4) {
　　　　　　document.getElementById('numOne').click()
　　　　　　this.numTwo = ''
　　　　} else if (this.key === 5) {
　　　　　　document.getElementById('numTwo').click()
　　　　　　this.numThree = ''
　　　　} else if (this.key === 6) {
　　　　　　document.getElementById('numThree').click()
　　　　　　this.numFour = ''
　　　　} else if (this.key === 7) {
　　　　　　document.getElementById('numFour').click()
　　　　　　this.numFive = ''
　　　　} else if (this.key === 8) {
　　　　　　document.getElementById('numFive').click()
　　　　　　this.numSix = ''
　　　　}
　　 },
　　addCar () {
　　　var myApp = new Framework7()
　　　　var num
　　　　var str = document.getElementById('picker-str-date').value
　　　　var end = document.getElementById('picker-end-date').value
　　　　var bt = new Date(str.replace(/\-/g, '\/'))
　　　　var et = new Date(end.replace(/\-/g, '\/'))
　　　　if (!this.checkbox) {
　　　　　　num = this.areaName + this.areaLetter + this.numOne + this.numTwo + this.numThree + this.numFour + this.numFive
　　　　} else if (this.checkbox) {
　　　　　　num = this.areaName + this.areaLetter + this.numOne + this.numTwo + this.numThree + this.numFour + this.numFive + this.numSix
　　　　}
　　　　if (num === '') {
　　　　　　this.toastMessage('请输入车牌', 1000)
　　　　} else if (!this.checkbox && (this.areaName === '' || this.areaLetter === '' || this.numOne === '' || this.numTwo === '' || this.numThree === '' || this.numFour === '' || this.numFive === '')) {
　　　　　　this.toastMessage('请输入完整车牌', 1000)
　　　　} else if (this.checkbox && (this.areaName === '' || this.areaLetter === '' || this.numOne === '' || this.numTwo === '' || this.numThree === '' || this.numFour === '' || this.numFive === '' || this.numSix === '')) {
　　　　　　this.toastMessage('请输入完整车牌', 1000)
　　　　} else if (str !== '' && end !== '' && bt >= et) {
　　　　　　this.toastMessage('开始时间必须早于结束时间', 1000)
　　　　} else {
　　　　　　// const data = {
　　　　　　// vehiclenum: num
　　　　　　// }
　　　　　　// this.$http.post(ADD_VEHICLE, data).then(res => {
　　　　　　// if (res.data.ret === 0) {
　　　　　　// this.addedCarNum = num
　　　　　　// this.$router.push({name: 'AddSuccess', params: {addedCarNum: this.addedCarNum}})
　　　　　　// } else {
　　　　　　// this.$dialog.toast({mes:res.data.message,timeout:1200})
　　　　　　// }
　　　　　　// })
　　　　}
    }
}　
</script>
<style>
//车牌输入框
.content-car-number {
　　padding: 64px 0 0;
　　.car-content-title {
　　　　display: flex;
　　　　justify-content: space-between;
　　　　padding: 0 32px;
　　　　margin-bottom: 16px;
　　　　span {
　　　　　　font-size: 34px;
　　　　}
　　　　.ze-checkbox {
　　　　　　display: flex;
　　　　　　align-items: center;
　　　　}
　　　　.ze-radio-text {
　　　　　　font-size: 28px;
　　　　}
　　　　.ze-checkbox-icon {
　　　　　　color: #FFEDB1 !important;
　　　　　　margin-right: 8px;
　　　　}
　　}
　　.content-section {
　　　　.content-section-flex {
　　　　　　display: flex;
　　　　　　justify-content: center;
　　　　　　align-items: center;
　　　　　　font-size: 40px;
　　　　　　margin-bottom: 35px;
　　　　　　.blank-border {
　　　　　　height: 44px;
　　　　　　width: 1px; /*no*/
　　　　　　border-right: 1px solid #ddd; /*no*/
　　　　　　margin-top: 27px;
　　　　　　float: left;
　　　　　　margin-left: -15px;
　　　　　　z-index: 1;
　　　　　　&.blank-border-first {
　　　　　　　　margin-top: 0px;
　　　　　　}
　　　　}
　　　　&.flex-card {
　　　　　　color: #000;
　　　　　　.flex-btn {
　　　　　　　　width: 98px;
　　　　　　　　height: 98px;
　　　　　　　　border: none;
　　　　　　　　text-align: center;
　　　　　　　　background: #fff;
　　　　　　　　font-size: 40px;
　　　　　　　　color: #000;
　　　　　　}
　　　　　　.flex-btns {
　　　　　　　　text-align: center;
　　　　　　　　background: #fff;
　　　　　　　　width: fit-content;
　　　　　　　　position: relative;
　　　　　　　　height: 98px;
　　　　　　　　button {
　　　　　　　　　　width: 98px;
　　　　　　　　　　height: 98px;
　　　　　　　　　　border: none;
　　　　　　　　　　font-size: 40px;
　　　　　　　　　　color: #000;
　　　　　　　　　　border-radius: 50%;
　　　　　　　　　　background: transparent;
　　　　　　　　　　float: left;
　　　　　　　　　　margin-left: -20px;
　　　　　　　　　　z-index: 2;
　　　　　　　　　　position: relative;
　　　　　　　　　　&:first-child {
　　　　　　　　　　　　margin-left: 0;
　　　　　　　　　　}
　　　　　　　　}
　　　　　　}
　　　　　　.flex-mid {
　　　　　　　　margin: 0 0.1rem;
　　　　　　　　span {
　　　　　　　　　　display: block;
　　　　　　　　　　width: 10px;
　　　　　　　　　　height: 10px;
　　　　　　　　　　border-radius: 50%;
　　　　　　　　　　background: #ddd;
　　　　　　　　}
　　　　　　}
　　　　　　.isClick {
　　　　　　　　  border: 1px solid #ffc200; /*no*/
　　　　　　　　  z-index: 50;
　　　　　　　　  border-radius: 8px;
　　　　　　　}
　　　　　　　.isNumClick {
　　　　　　　　　 border-radius: 8px !important;
　　　　　　　　　 border: 1px solid #ffc200 !important; /*no*/
　　　　　　　　　 z-index: 10;
　　　　　　　　　　background-color: #fff !important;
　　　　　　　}
　　　　　}
　　　　　.flex-card-border {
　　　　　　　　border: 1px solid #ddd; /*no*/
　　　　　　　　border-radius: 8px;
　　　　　}
　　　　}
　　}
}

//键盘
.keyboard {
　　width: 100%;
　　height: 502px;
　　position: fixed;
　　bottom: -502px;
　　background: #eeeeee;
　　z-index: 10;
　　&.animationDown {
　　　　animation: slide_dowms 0.3s ease-out;
　　　　animation-fill-mode: forwards;
　　}
　　&.animationUp {
　　　　animation: slide_ups 0.3s ease-out;
　　　　animation-fill-mode: forwards;
　　}
　　.btn-complete {
　　　　height: 72px;
　　　　text-align: right;
　　　　color: #ffc200;
　　　　font-size: 30px;
　　　　width: 100%;
　　　　background: #fff;
　　　　border: none;
　　　　border-top: 1px solid #eee;
　　　　margin-bottom: 30px;
　　　　span {
　　　　　　margin-right: 30px;
　　　　}
　　}
　　.keyboard-row {
　　　　margin-top: 20px;
　　　　display: flex;
　　　　justify-content: space-between;
　　　　padding: 0 8px;
　　　　color: #333;
　　　　&:first-child {
　　　　　　margin-top: 0;
　　　　}
　　　　.keyboard-row-items {
　　　　　　display: flex;
　　　　　　justify-content: left;
　　　　}
　　　　.keyboard-row-bottom {
　　　　　　display: flex;
　　　　　　justify-content: space-between;
　　　　}
　　　　.keyboard-row-item {
　　　　　　width: 66px;
　　　　　　height: 80px;
　　　　　　background: #fff;
　　　　　　font-size: 34px;
　　　　　　text-align: center;
　　　　　　border: 1px solid #ccc; /*no*/
　　　　　　border-radius: 10px;
　　　　　　color: #333;
　　　　　　&.bottom {
　　　　　　　　height: 80px;
　　　　　　　　width: 66px;
　　　　　　　　line-height: 80px;
　　　　　　　　background: #fff;
　　　　　　　　color: #333;
　　　　　　　　/*margin-right: 0.08rem;*/
　　　　　　}
　　　　　　&.clear {
　　　　　　　　width: 140px;
　　　　　　　　height: 80px;
　　　　　　　　display: flex;
　　　　　　　　align-items: center;
　　　　　　　　justify-content: center;
　　　　　　　　img {
　　　　　　　　　　width: 62px;
　　　　　　　　}
　　　　　　}
　　　　}
　　　　.none-botton {
　　　　　　border: none;
　　　　　　height: 80px;
　　　　　　width: 66px;
　　　　　　visibility: hidden;
　　　　}
　　}
　　button {
　　　　&:active {
　　　　　　background: #f4f4f4 !important;
　　　　　　color: #999 !important;
　　　　}
　　}
}
//键盘滑动
@keyframes slide_ups {
　　from {
　　　　bottom: -502px;
　　}
　　to {
　　　　bottom: 0px;
　　}
}
@keyframes slide_dowms {
　　from {
　　　　bottom: 0px;
　　}
　　to {
　　　　bottom: -502px;
　　}
}
</style>