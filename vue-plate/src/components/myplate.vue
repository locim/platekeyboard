<template>
  <section class="contain">
    <div class="header">车牌列表</div>
    <div class="platelist">
    	<div class="plate">浙A·13333</div>
    	<div class="addplate" @click="showkeyboard">添加车牌号</div>
    </div>
    <keyboard v-show="ifshowkeyboard" @transferclose="getfalse" @transferplate="getplate"></keyboard>
  </section>  
</template>
<script>
	import keyboard from './keyboard'
  export  default {
  	data(){
  		return{
  			plate:'',
  			ifshowkeyboard: false,
  		}
  	},
  	methods:{
  		showkeyboard : function(){
  			this.ifshowkeyboard = true;
  		},
  		getplate : function(msg){
  			this.plate = msg;
  			this.ifshowkeyboard = false;
  			alert(this.plate)
  		},
  		getfalse : function(msg){
  			this.ifshowkeyboard = msg;
  		}
  	},
  	components:{
  		'keyboard':keyboard
  	}
  };
</script>
<style>
body{
	margin: 0;
}
#app{
	display: flex;
  	justify-content: center;  
  		
}
.contain{
	font-size: 32px;
	width: 600px;
	margin-top: 300px;	
	
}
.header{
	text-align: center;
}
.platelist{
	margin-top: 50px;
}
.plate,.addplate{
	height: 100px;
	border: 1px solid #ccc;
	border-radius: 50px;
	text-align: center;
	line-height: 100px;
	background:url(../assets/closebtn.png) 90% 50% no-repeat;
	background-size:50px 50px ;
}
.addplate{
	text-indent: 60px;
	background:url(../assets/add-btn.png) 35% 50% no-repeat;
	background-size:40px 40px ;
}
.plate+.plate{
	margin-top: 50px;
}
.addplate{
	margin-top: 50px;
}
</style>