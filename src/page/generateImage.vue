<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="container">
            <div style="width: 100%;height: 85%;">
                <el-card class="box0-card">
                    <div style="margin-top: 15px;">
                        <span><el-tag type="info"  effect="dark">字体大小</el-tag></span>
                        <span><el-input-number v-model="fontSize" @change="changeFont" :precision="0" :step="1" :max="100" :min="10"  size="small"  style="margin-top: 5px;margin-left: 10px;">
                    </el-input-number></span>
                    </div>
                    <div style="padding-top: 10px;">
                        <span><el-tag type="info"  effect="dark">左边距</el-tag></span>
                        <span><el-input-number v-model="x"  :min="0" @change="changeX" size="small" style="width: 100px;"></el-input-number></span>
                    </div>
                    <div style="padding-top: 10px;">
                        <span><el-tag type="info"  effect="dark">上边距</el-tag></span>
                        <span><el-input-number v-model="y"  :min="0" @change="changeY" size="small" style="width: 100px;"></el-input-number></span>
                    </div>
                    <div style="padding-top: 10px;">
                        <span><el-tag type="info"  effect="dark">宽度</el-tag></span>
                        <span><el-input-number v-model="width"  :min="0" :step="5" @change="changeW" size="small" style="width: 100px;"></el-input-number></span>
                    </div>
                    <div style="padding-top: 10px;">
                        <span><el-tag type="info"  effect="dark">高度</el-tag></span>
                        <span><el-input-number v-model="height"  :min="0" :step="5" @change="changeH" size="small" style="width: 100px;"></el-input-number></span>
                    </div>

                    <div style="padding-top: 20px;">
                        <el-button type="primary" @click="saveimage()">保存图片</el-button>
                    </div>


                </el-card>
                <el-card class="box-card" style="overflow:auto;">

                        <div contenteditable="true" style="color:red;font-size: 20px;padding-left:10px;padding-top:10px;background-color: black;box-sizing: border-box ;width: 700px;height: 600px;"
                                  v-model="text"
                                  id="Image"
                                  :style="screenSize"
                                  placeholder="请输入"
                        > </div>
                </el-card>

            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop';
    import {Message, MessageBox} from 'element-ui';
    import {Cookie} from 'le5le-store';
    import html2canvas from 'html2canvas';
    export default {
        name: "generateImage",
        data(){
            return{
                text:"",
                screenSize:"",
                fontSize:20,
                x:10,
                y:10,
                width:700,
                height:600,

            }
        },
        created(){
            if(Cookie.get("user")==null||Cookie.get("user")==""){
                this.$router.push('/')
            }
        },


        components: {
            headTop,
        },
        methods:{
            changeFont(val){
                console.log(val)
                this.screenSize = this.screenSize + 'font-size:'+val+'px;'
            },
            changeX(val){
                this.screenSize = this.screenSize + 'padding-left:'+val+'px;'
            },
            changeY(val){
                this.screenSize = this.screenSize + 'padding-top:'+val+'px;'
            },
            changeW(val){
                this.screenSize = this.screenSize + 'width:'+val+'px;'
            },
            changeH(val){
                this.screenSize = this.screenSize + 'height:'+val+'px;'
            },
            saveimage(){
                html2canvas(document.querySelector('#Image'), { // 转换为图片
                    useCORS:true // 解决资源跨域问题
                }).then(canvas => {
                    let imgUrl = canvas.toDataURL('image/png');
                    if(imgUrl!=""){
                        var img = imgUrl;
                        var alink = document.createElement("a");
                        alink.href = img;
                        alink.download = "image.png";
                        alink.click();
                    }

                })
            },
            htmlToImage(){

            }
        }
    }
</script>

<style scoped>
    .box0-card{
        float: left;
        margin-top: 10px;
        margin-left: 20px;
        width: 20%;
        height: 800px;
    }
    .box-card {
        float: left;
        margin-top: 10px;
        margin-left: 5px;
        max-width: 75%;
        min-width: 750px;
        max-height: 810px;
    }

</style>
