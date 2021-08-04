<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div style="width: 100%;height: 85%;" >

            <el-card class="box1-card">
                <div style="padding-left: 35%"><h4>节目页面</h4></div>
                <div style="width: 100%;height: 650px;overflow-y:auto;">
                    <div
                        v-for="i in pageContents.length"
                        :id="i"
                        :key="i"
                        @click="changeCard(i)"
                    >
                        <el-card
                            style="width: 80%;margin-left: 10%;margin-top: 5px; ;height: 60px;background-color: grey"
                            v-if="activeCard === i"
                        >
                            <div  style="width:20px;margin-top:-20px;margin-left:90%;height: 30px;">
                                <el-tooltip style="" effect="light" content="删除该页面" placement="right" >
                                    <el-button type="text" @click="delect_div(i)" style="font-size: 30px;"><i class="el-icon-remove"></i>
                                    </el-button>
                                </el-tooltip>
                            </div>

                        </el-card>
                        <el-card
                            style="width: 80%;margin-left: 10%;margin-top: 5px;height: 60px;background-color: rgba(1,1,1,0.81)"
                            v-if="activeCard!= i"
                        >
                            <div  style="margin-top: -20px;width:20px;margin-left: 90%;height: 30px;">
                                <el-tooltip style="" effect="light" content="删除该页面" placement="right" >
                                    <el-button type="text" @click="delect_div(i)" style="font-size: 30px;"><i class="el-icon-remove"></i>
                                    </el-button>
                                </el-tooltip>
                            </div>

                        </el-card>
                    </div>

                    <div style="text-align: right;width:80%;margin-left: 10%;margin-top: 10px;">
                        <el-tooltip style="margin-left: 80%;" effect="light" content="添加新页面" placement="right" >
                            <el-button type="text" @click="adddiv" style="font-size: 30px;"><i class="el-icon-circle-plus"></i>
                            </el-button>
                        </el-tooltip>
                    </div>
                </div>

            </el-card>

            <el-card class="box2-card" >
                <div style="margin-left: 45%"><h2>屏幕内容</h2></div>
                <div style="width: 100%;height:350px;"v-if="activeCard>0 &&activeCardType==='text' ">
                    <textarea style="color:red;font-size: 40px;padding-left:10px;background-color: black;margin-left:20%;box-sizing: border-box"
                              v-model="pageContents[activeCard-1].mediaContents[0].content"

                              :style="screenSize"
                              placeholder="请输入"
                    >

                    </textarea>

                </div>
                <div style="width: 100%;"v-if="activeCard>0 &&activeCardType==='image' ">
                    <div :style='"overflow: hidden;margin: 20px auto;background-color: black;width:"+screenStyle.width+"px;height:"+screenStyle.height+"px;"'>
                        <img
                            :src="'/Upload/'+pageContents[activeCard-1].mediaContents[0].filepath"
                            :style="screenSize"
                        />
                    </div>

                </div>
            </el-card>
            <el-card class="box3-card" v-if="activeCardType==='text' && activeCard>0" >
                <div style="text-align: center">
                    页面类型:文本
                </div>
                <div style="padding-top: 5px;"><el-tag type="info"  effect="dark">基本属性</el-tag></div>
                <div style="margin-top: 15px">
                    <span>X:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].x"  :min="0" @change="changeX"   size="mini" style="width: 100px;"></el-input-number></span>
                    <span style="margin-left: 10px;">
                        Y:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].y"  :min="0" @change="changeY"   size="mini" style="width: 100px;" ></el-input-number></span>
                </div>

                <div style="margin-top: 15px">
                    <span>宽:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].width"  :min="0"   size="mini" style="width: 100px;"></el-input-number></span>
                    <span style="margin-left: 10px;">高:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].height"  :min="0"   size="mini" style="width: 100px;" ></el-input-number></span>
                </div>

                <div style="margin-top: 15px;">
                    <div><el-tag type="info"  effect="dark">播放方式</el-tag></div>
                    <el-radio-group v-model="pageContents[activeCard-1].mediaContents[0].playAttr">
                        <el-radio label="STATIC">静止</el-radio>
                        <el-radio label="SCROLL">滚动</el-radio>
                        <el-radio label="PAGE_SWITCH">翻页</el-radio>
                    </el-radio-group>
                </div>
                <div style="margin-top: 15px;">
                    <span><el-tag type="info"  effect="dark">字体大小</el-tag></span>
                    <span><el-input-number v-model="pageContents[activeCard-1].mediaContents[0].font_size" @change="changeFont" :precision="0" :step="1" :max="100" :min="10"  size="small"  style="margin-top: 5px;margin-left: 10px;">
                    </el-input-number></span>
                </div>

                <div style="margin-top: 15px;">
                    <span><el-tag type="info"  effect="dark">播放速度</el-tag></span>
                    <span><el-input-number v-model="pageContents[activeCard-1].mediaContents[0].speed" :precision="0" :step="1" :max="10" :min="0"  size="small"  style="margin-top: 5px;margin-left: 10px;">
                    </el-input-number></span>
                </div>
                <div style="margin-top: 10px;">
                    <span><el-tag type="info"  effect="dark">持续时长(毫秒)</el-tag></span>
                    <span><el-input-number v-model="pageContents[activeCard-1].mediaContents[0].duration" :precision="0" :step="500"  :min="0"  size="small"  style="margin-top: 5px;margin-left: 10px;">
                    </el-input-number></span>
                </div>

            </el-card>

            <el-card class="box3-card" v-if="activeCardType==='image'&&activeCard>0">
                <div style="text-align: center">
                    页面类型:图片
                </div>
                <div style="padding-top: 5px;"><el-tag type="info"  effect="dark">基本属性</el-tag></div>
                <div style="margin-top: 15px">
                    <span>X:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].x"  :min="0" @change="changeX"   size="mini" style="width: 100px;"></el-input-number></span>
                    <span style="margin-left: 10px;">Y:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].y"  :min="0" @change="changeY"  size="mini" style="width: 100px;" ></el-input-number></span>
                </div>

                <div style="margin-top: 15px">
                    <span>宽:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].width"  :min="0"  @change="changeW" size="mini" style="width: 100px;"></el-input-number></span>
                    <span style="margin-left: 10px;">高:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].height" @change="changeH" :min="0"   size="mini" style="width: 100px;" ></el-input-number></span>
                </div>

                <div style="margin-top: 15px;">
                    <div><el-tag type="info"  effect="dark">播放方式</el-tag></div>
                    <el-radio-group v-model="pageContents[activeCard-1].mediaContents[0].playAttr">
                        <el-radio label="STATIC">静止</el-radio>
                        <el-radio label="SCROLL">滚动</el-radio>
                        <el-radio label="PAGE_SWITCH">翻页</el-radio>
                    </el-radio-group>
                </div>
                <div style="margin-top: 15px;">
                    <span><el-tag type="info"  effect="dark">播放速度</el-tag></span>
                    <span><el-input-number v-model="pageContents[activeCard-1].mediaContents[0].speed" :precision="0" :step="1" :max="10" :min="0"  size="small"  style="margin-top: 5px;margin-left: 10px;">
                    </el-input-number></span>
                </div>
                <div style="margin-top: 10px;">
                    <span><el-tag type="info"  effect="dark">持续时长(毫秒)</el-tag></span>
                    <span><el-input-number v-model="pageContents[activeCard-1].mediaContents[0].duration" :precision="0" :step="500"  :min="0"  size="small"  style="margin-top: 5px;margin-left: 10px;">
                    </el-input-number></span>
                </div>

                <div style="padding-top: 15px;">
                    <el-tag type="info"  effect="dark">选择已上传的图片</el-tag>
                    <el-tag type="danger">已选图片ID:{{pageContents[activeCard-1].mediaContents[0].fileId}}</el-tag>

                </div>
                <el-table
                    v-if="imageData!=null&&imageData!=[]"
                    :data="imageData"
                    style="width: 100%;margin-top: 10px;"
                    align='center'
                    border
                    height="300"
                >
                    <el-table-column
                        label="ID"
                        prop="id"
                        width="40px;"
                    >
                    </el-table-column>
                    <el-table-column
                        label="文件名称"
                        prop="wjm">
                    </el-table-column>
                    <el-table-column
                        label="上传时间"
                        width="100px;"
                        prop="scsj">
                        <template slot-scope="scope">
                            <span >{{ scope.row.scsj.substring(0,10) }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="operation"
                        align='center'
                        width="70px"
                        label="操作"
                    >
                        <template slot-scope='scope'>
                            <el-button
                                type="primary"
                                icon='edit'
                                size="mini"
                                @click="selectFile(scope.row)"
                            >选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>

            <el-card class="box3-card" v-if="activeCardType==='ktgg'&&activeCard>0">
                <div style="text-align: center">
                    页面类型:开庭公告
                </div>
                <div style="margin-top: 20px;float: left">
                    <div style="float:left;;"><el-tag type="info"  effect="dark">开庭时间</el-tag></div>
                    <el-select style="float:left;padding-left: 10px; width: 100px;" v-model="days" size="small" placeholder="请选择">
                        <el-option
                            v-for="item in day_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>





            </el-card>
            <el-card class="box3-card" v-if="activeCardType==='sxbzxr'&&activeCard>0">
                <div style="text-align: center">
                    页面类型:失信被执行人
                </div>
            </el-card>

            <el-card class="box3-card" v-if="activeCardType==='video'&&activeCard>0">
                <div style="text-align: center">
                    页面类型:视频
                </div>
                <div style="padding-top: 5px;"><el-tag type="info"  effect="dark">基本属性</el-tag></div>
                <div style="margin-top: 15px">
                    <span>X:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].x"  :min="0"   size="mini" style="width: 100px;"></el-input-number></span>
                    <span style="margin-left: 10px;">Y:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].y"  :min="0"   size="mini" style="width: 100px;" ></el-input-number></span>
                </div>

                <div style="margin-top: 15px">
                    <span>宽:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].width"  :min="0"   size="mini" style="width: 100px;"></el-input-number></span>
                    <span style="margin-left: 10px;">高:<el-input-number v-model="pageContents[activeCard-1].mediaContents[0].height"  :min="0"   size="mini" style="width: 100px;" ></el-input-number></span>
                </div>
                <div style="margin-top: 15px;">
                    <div><el-tag type="info"  effect="dark">播放方式</el-tag></div>
                    <el-radio-group v-model="pageContents[activeCard-1].mediaContents[0].playAttr">
                        <el-radio label="STATIC">静止</el-radio>
                        <el-radio label="SCROLL">滚动</el-radio>
                        <el-radio label="PAGE_SWITCH">翻页</el-radio>
                    </el-radio-group>
                </div>

                <div style="padding-top: 15px;">
                    <el-tag type="info"  effect="dark">选择已上传的视频</el-tag>
                    <el-tag type="danger">已选视频ID:{{pageContents[activeCard-1].mediaContents[0].fileId}}</el-tag>

                </div>
                <el-table
                    v-if="videoData!=null&&videoData!=[]"
                    :data="videoData"
                    style="width: 100%;margin-top: 10px;"
                    align='center'
                    border
                    height="350"
                >
                    <el-table-column
                        label="ID"
                        prop="id"
                        width="40px;"
                    >
                    </el-table-column>
                    <el-table-column
                        label="文件名称"
                        prop="wjm">
                    </el-table-column>
                    <el-table-column
                        label="上传时间"
                        width="100px;"
                        prop="scsj">
                        <template slot-scope="scope">

                            <span>{{ scope.row.scsj.substring(0,10) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="operation"
                        align='center'
                        width="70px"
                        label="操作"
                    >
                        <template slot-scope='scope'>
                            <el-button
                                type="primary"
                                icon='edit'
                                size="mini"
                                @click="selectFile(scope.row)"
                            >选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>


            </el-card>
        </div>
        <div>
            <el-row >
                <el-col :span="7">
                     <el-input
                         style="visibility: hidden"
                     ></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button  type="primary" @click="pre_publish()">提交发布</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button  type="primary" @click="pre_getImage()">获取截屏</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button  type="primary" @click="pre_save()">保存节目</el-button>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="运行截图" :visible.sync="ImageVisible" :close-on-click-modal="false" >
            <div v-if="imageUrl!=''" style="width: 100%;text-align: center">
                <el-image :src="imageUrl" style="width: 900px;padding-top: 10px;"></el-image>
            </div>

        </el-dialog>
        <!--页面初始化后就要先选择一个屏幕-->
        <el-dialog title="选择一个屏幕尺寸" :close-on-click-modal="false" :visible.sync="selectScreenView" width="20%">
            <el-select v-model="screenId" placeholder="请选择">
                <el-option
                    v-for="item in screen"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>


            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="selectScreen()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="showTitle" :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="30%">

            <el-table
                v-if="screen!=null"
                :data="screen"
                style="width: 100%"
                align='center'
                border
                @selection-change="ScreenSelectionChange"
            >
                <el-table-column
                    type="selection"
                    align='center'
                    :fit="true"
                ></el-table-column>
                <el-table-column
                    label="ID"
                    prop="id">
                </el-table-column>
                <el-table-column
                    label="大屏名称"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="IP地址"
                    prop="ip">
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="publish()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="showTitle" :close-on-click-modal="false" :visible.sync="dialogFormVisible2" width="30%">

            <el-table
                :data="screen"
                style="width: 100%"
                align='center'
                border
                @selection-change="ScreenSelectionChange"
            >
                <el-table-column
                    type="selection"
                    align='center'
                    :fit="true"
                ></el-table-column>
                <el-table-column
                    label="ID"
                    prop="id">
                </el-table-column>
                <el-table-column
                    label="大屏名称"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="IP地址"
                    prop="ip">
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="getImage()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="选择节目类型" :close-on-click-modal="false" :visible.sync="dialogProgramVisible" width="30%">
            <el-radio-group v-model="programType">
                <el-radio label="ktgg">开庭公告</el-radio>
                <el-radio label="sxbzxr">失信被执行人</el-radio>
                <el-radio label="text">文本</el-radio>
                <el-radio label="image">图片</el-radio>
                <el-radio label="video">视频</el-radio>
            </el-radio-group>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="selectType()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="填写节目名称" :close-on-click-modal="false" :visible.sync="programVisible" width="30%">

            <el-input style="width:400px;" v-model="programName" placeholder="节目名称"></el-input>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save_program()">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    import headTop from '../components/headTop'
    // import ckeditor4 from './ckeditor4'
    import {Cookie,Store} from 'le5le-store';
    import {getScreenList,sendTextEdit,getScreenshot,getFile,saveProgram,getProgramById} from '../api/getData'
    import {Message, MessageBox} from 'element-ui'
    export default {
        name: "textEdit",

        data(){
            return {
                activeCard:1,
                activeCardType:"text",
                programType:"text",
                ImageVisible:false,
                imageUrl:"",
                dialogFormVisible:false,
                dialogFormVisible2:false,
                dialogProgramVisible:false,
                programVisible:false,
                selectScreenView:false,
                screenId:2,
                screenSize:"",
                screenSelection:[],
                showTitle:"选择大屏",

                programName:"",

                screenStyle:{},

                days:15,
                day_options: [{
                    value: 7,
                    label: '近七天'
                }, {
                    value: 15,
                    label: '近15天'
                }, {
                    value: 30,
                    label: '近30天'
                }],


                videoData:[],
                imageData:[],
                screen:[],
                font_style:'',
                pageContents: [
                    {
                        "pagename":"page1",
                        "mediaContents":[
                            {
                                "x":10,
                                "y":0,
                                "width":500,
                                "height":64,
                                "font_size":40,
                                "text_align":"left",
                                "vertial_align":"left",
                                "mediaName":"text1",
                                "playAttr":"STATIC",
                                "speed":2,
                                "filepath":"",
                                "fileId":0,
                                "duration":10000,
                                "type":"text",
                                "content":""
                            },
                        ],
                        "repeatcount":1,
                    },

                ],
            }
        },
        components: {
            headTop,



        },
        mounted(){

            if(Store.get("program")!=null&&Store.get("program")!=""){
                this.pageContents = JSON.parse(Store.get("program"));
            }
            this.getScreenAll();
            this.getVideoList();
            this.selectScreenView = true;


        },
        created(){
            if(Cookie.get("user")==null||Cookie.get("user")==""){
                this.$router.push('/')
            }

        },
        methods: {
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

            pre_publish(){
                this.dialogFormVisible = true;
            },
            pre_getImage(){
                this.dialogFormVisible2 = true;
            },
            ScreenSelectionChange(val){
                this.screenSelection = [];
                val.forEach(item=>{
                    this.screenSelection.push(item.ip)
                })
                console.log(this.screenSelection[0])
            },
            checkIp(){
                if (this.screenSelection.length === 0) {
                    Message({
                        message: '请选择一个屏幕',
                        type: 'error',
                        duration: 2 * 1000
                    });
                    return false;
                }else if(this.screenSelection.length > 1){
                    Message({
                        message: '最多选择一个屏幕',
                        type: 'error',
                        duration: 2 * 1000
                    });
                    return false;
                }
                return true;
            },
            async publish() {
                if (!this.checkIp()) {
                    return;
                }
                this.dialogFormVisible = false;
                var parm={
                    pageContents:this.pageContents,
                    type:0,
                };
                // console.log(JSON.stringify(parm))
                const loading = this.$loading({
                    lock: true,
                    text: '正在发布...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0,0 , 0, 0.8)'
                });
                const res = await sendTextEdit(this.screenSelection[0],encodeURI(JSON.stringify(parm)),this.days);
                if(res.status==="success"){
                    loading.close();
                    Message({
                        message: res.data,
                        type: 'success',
                        duration: 2 * 1000
                    });
                }else{
                    loading.close();
                    Message({
                        message: res.data,
                        type: 'error',
                        duration: 2 * 1000
                    });
                }


            },
            async getScreenAll(){
                const screenList = await getScreenList();
                if(screenList.status=="success"){

                    // console.log(screenList.data)
                    this.screen = screenList.data;
                }

            },
            async getImage(){
                if (!this.checkIp()) {
                    return;
                }
                this.dialogFormVisible2 = false;
                console.log(this.screenSelection[0])
                const loading = this.$loading({
                    lock: true,
                    text: '正在获取截屏...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0,0 , 0, 0.8)'
                });

                let res = await getScreenshot(this.screenSelection[0]);
                if(res.status==="success"){
                    loading.close();
                    this.imageUrl = res.data;
                    this.ImageVisible = true;
                    Message({
                        message: "获取截图成功",
                        type: 'success',
                        duration: 2 * 1000
                    });
                }else{
                    loading.close();
                    Message({
                        message: res.data,
                        type: 'error',
                        duration: 2 * 1000
                    });
                }
            },
            adddiv(){
                this.dialogProgramVisible = true;

            },
            selectType(){

                this.dialogProgramVisible = false;
                this.pageContents.push({
                    "pagename":this.programType,
                    "mediaContents":[
                        {
                            "x":10,
                            "y":0,
                            "width":this.screenStyle.width,
                            "height":this.screenStyle.height,
                            "font_size":40,
                            "text_align":"left",
                            "vertial_align":"left",
                            "mediaName":"文本1",
                            "playAttr":"STATIC",
                            "speed":2,
                            "type":this.programType,
                            "content":"",
                            "filepath":"",
                            "fileId":0,
                            "duration":10000,
                        },
                    ],
                    "repeatcount":1,
                });


            },
            delect_div(i){
                console.log(i)
                this.pageContents.splice(i-1,1);
                if(i>1){
                    this.activeCard = i-1;
                }else{
                    this.activeCard = null;
                }

            },
            changeCard(i){
                if(i>this.pageContents.length){
                    i--;
                    if(i==0){
                        return;
                    }
                }
                console.log(i)
                this.activeCard = i;
                this.activeCardType = this.pageContents[i-1].mediaContents[0].type;
                console.log(this.activeCardType)

            },
            async getVideoList(){
                let res = await getFile();
                if(res.status=="success"){
                    this.videoData = res.data.filter((i)=>{
                        return i.type=="video";
                    });
                    this.imageData = res.data.filter((i)=>{
                        return i.type=="image";
                    });
                }
            },
            selectFile(val){
                this.pageContents[this.activeCard-1].mediaContents[0].filepath = val.bcwz;
                this.pageContents[this.activeCard-1].mediaContents[0].fileId = val.id;
                // if(val.length>0){
                //     this.pageContents[this.activeCard-1].mediaContents[0].filepath = val[0].bcwz;
                // }

            },
            pre_save(){
                this.programVisible = true;

            },
            async save_program(){
                var parm={
                    content:JSON.stringify(this.pageContents),
                    programName:this.programName,
                };
                const res = await saveProgram(parm);
                this.programVisible = false;
                if(res.status==="success"){
                    Message({
                        message: res.data,
                        type: 'success',
                        duration: 2 * 1000
                    });
                }else{
                    Message({
                        message: res.data,
                        type: 'error',
                        duration: 2 * 1000
                    });
                }

            },
            async getProgramById(id){
                const res = await getProgramById(id);
                if(res.status=="success"){
                    var data = res.data.content;
                    this.pageContents = JSON.parse(data);
                }

            },
            selectScreen(){
                console.log(this.screenId)

                var _this = this;
                this.screen.forEach(function (item) {
                    if(item.id===_this.screenId){
                        _this.screenStyle = item;
                        return;
                    }
                })
                this.screenSize = 'width:'+this.screenStyle.width+'px;height:'+this.screenStyle.height+'px;';
                console.log(this.screenSize)
                this.selectScreenView = false;
                this.pageContents[0].mediaContents[0].width = this.screenStyle.width;
                this.pageContents[0].mediaContents[0].height = this.screenStyle.height;
            }


        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .box1-card{
        float: left;
        margin-top: 10px;
        margin-left: 20px;
        width: 15%;
        height: 95%;
    }
    .box2-card{
        float: left;
        margin-top: 10px;
        margin-left:5px;
        width: 55%;
        height: 95%;

        /*.el-textarea__inner {*/
        /*    min-height: 200px;*/
        /*    max-height: 320px;*/
        /*    height: 320px;*/
        /*    display: block;*/
        /*    resize: vertical;*/
        /*    padding: 5px 15px;*/
        /*    line-height: 1.5;*/
        /*    -webkit-box-sizing: border-box;*/
        /*    box-sizing: border-box;*/
        /*    width: 100%;*/
        /*    font-size: inherit;*/
        /*    color: red;*/
        /*    background-color: #000000;*/
        /*    background-image: none;*/
        /*    border: 2px solid #DCDFE6;*/
        /*    border-radius: 8px;*/
        /*    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);*/
        /*    transition: border-color .2s cubic-bezier(.645,.045,.355,1);*/
        /*}*/
    }
    .box3-card{
        float: left;
        margin-top: 10px;
        margin-left: 5px;
        width: 25%;
        height: 95%;
    }




</style>


<!--


-->
