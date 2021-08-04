<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">欢迎使用河北区人民法院大屏控制系统</header>
		</section>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import {Cookie} from 'le5le-store';
    export default {
    	data(){
    		return {

    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    	    if(Cookie.get("user")==null){
                this.$router.push('/')
            }

    	},
        computed: {

        },
    	methods: {


    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
            margin-top: 20px;
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
	}
</style>
