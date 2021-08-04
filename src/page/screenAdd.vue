<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="container">
            <div style="margin-top: 30px;">
                <el-input style="width:400px;" v-model="formData.name" placeholder="大屏名称"></el-input>
            </div>
            <div style="margin-top: 30px;">
                <el-input style="width:400px;" v-model="formData.ip" placeholder="大屏IP地址"></el-input>
            </div>
            <div style="margin-top: 30px;">
                <el-input
                    style="width: 400px"
                    type="textarea"
                    :rows="2"
                    placeholder="大屏介绍"
                    v-model="formData.description">
                </el-input>

            </div>
            <div style="margin-top: 30px;margin-left: 150px">
                <el-button type="primary" @click="addScreen()">添加大屏</el-button>
            </div>



        </div>
    </div>

</template>

<script>
    import headTop from '../components/headTop'
    import {addScreen} from '../api/getData'
    import {Message, MessageBox} from 'element-ui'
    import {Cookie} from 'le5le-store';
    export default {
        data(){
            return {
                formData:{
                    name:"",
                    ip:"",
                    description:"",
                }



            }
        },
    	components: {
    		headTop,
    	},
        mounted(){

        },
        created(){
            if(Cookie.get("user")==null||Cookie.get("user")==""){
                this.$router.push('/')
            }
        },
        methods: {
            async addScreen(){
                const res = await addScreen(this.formData);
                if(res.status=="success"){
                    Message({
                        message: "添加成功",
                        type: 'success',
                        duration: 2 * 1000
                    });
                    this.formData={
                            name:"",
                            ip:"",
                            description:"",
                    }
                }else{
                    Message({
                        message: "添加失败,"+res.data,
                        type: 'error',
                        duration: 4 * 1000
                    });
                }


            }

        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .container{
        margin-top: 10%;
        margin-left: 40%;
    }
</style>
