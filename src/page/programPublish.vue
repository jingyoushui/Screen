<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div style="margin: 20px;">
            <div>常用节目:</div>
            <div style="margin: 20px;">
                <el-row>
                    <el-col :span="8">
                        <el-checkbox-group v-model="checkboxGroup" >
<!--                            <el-checkbox  label="1" border>送达起诉副本及开庭传票公告</el-checkbox>-->
                            <el-checkbox  label="2" border>开庭公告</el-checkbox>
<!--                            <el-checkbox  label="3" border>送达判决书公告</el-checkbox>-->
<!--                            <el-checkbox  label="4" border>执行公告</el-checkbox>-->
                            <el-checkbox  label="5" border>失信被执行人公告</el-checkbox>
<!--                            <el-checkbox  label="6" border>送达裁定书公告</el-checkbox>-->
                        </el-checkbox-group>
                    </el-col>
                    <el-col :span="8">
                        开庭时间:
                        <el-select v-model="days" placeholder="请选择">
                            <el-option
                                v-for="item in day_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="showGgList()" >预览查看</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="prePublish()" >提交发布</el-button>
                    </el-col>

                </el-row>
            </div>
            <div id="table" style="width: 100%;" >
                <el-table v-if="tableId=='2'"
                    border
                    :data="tableData"
                    style="width: 100%"
                    height="650"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="ajxh"
                        label="案件序号"
                        sortable
                        :fit="true"
                        width="110px"
                        align='center'>

                    </el-table-column>
<!--                    <el-table-column-->
<!--                        prop="gglx"-->
<!--                        label="公告类型"-->
<!--                        align='center'-->
<!--                        width="140px"-->
<!--                    >-->
<!--                    </el-table-column>-->
                    <el-table-column
                        prop="ah"
                        label="案号"
                        sortable
                        :fit="true"
                        align='center'
                        width="200px"
                    >

                    </el-table-column>
                    <el-table-column
                        prop="fbsj"
                        label="发布时间"
                        align='center'
                        sortable
                        width="140px">
                        <template slot-scope="scope">
                            <el-icon name="time"></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.fbsj.substring(0,10) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="ktsj"
                        label="开庭时间"
                        align='center'
                        sortable
                        width="140px">
                        <template slot-scope="scope">
                            <el-icon name="time"></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.ktsj.substring(0,10) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="ajmc"
                        label="案件名称"
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="ggnr"
                        label="公告内容"
                        align='center'
                    >
                    </el-table-column>
                      <!--状态1为正在发布,2是已发布,3是禁止发布-->
                    <el-table-column
                        prop="status"
                        label="是否发布"
                        align='center'
                        sortable
                        width="110px">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.status!=3"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="changeStatus($event,scope.row)"

                            >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="operation"
                        align='center'
                        width="120px"
                        label="操作"
                    >
                        <template slot-scope='scope'>
                            <el-button
                                type="warning"
                                icon='edit'
                                size="mini"
                                @click="yuLan(scope.row)"
                            >预览</el-button>
                        </template>
                    </el-table-column>
                </el-table>


                <el-table v-if="tableId=='5'"
                          border
                          :data="tableData"
                          style="width: 100%"
                          height="650"
                          @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="bzxrmc"
                        label="被执行人姓名"
                        sortable
                        align='center'
                        width="140px"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="ah"
                        label="案号"
                        sortable
                        :fit="true"
                        align='center'
                        width="200px"
                    >

                    </el-table-column>
                    <el-table-column
                        prop="ahdm"
                        label="案号代码"
                        sortable
                        :fit="true"
                        align='center'
                        width="200px"
                    >

                    </el-table-column>
                    <el-table-column
                        prop="fbsj"
                        label="公布时间"
                        align='center'
                        sortable
                        width="140px">
                        <template slot-scope="scope">
                            <el-icon name="time"></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.fbsj.substring(0,10) }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="xbmc"
                        sortable
                        label="性别"
                        align='center'
                        width="140px"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="bzxrlxmc"
                        sortable
                        label="类型"
                        align='center'
                        width="140px"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="zjhm"
                        sortable
                        label="证件号码"
                        align='center'
                    >
                    </el-table-column>

                </el-table>

                <template v-if="tableId==2" style="padding-top: 40px;text-align: center;">
<!--                    <el-button-->
<!--                        @click="toImage(1)"-->
<!--                        type="success"-->
<!--                        icon='edit'-->
<!--                        size="mini"-->
<!--                        style="margin-top: 30px"-->

<!--                    >生成图片-->
<!--                    </el-button>-->
<!--                    <el-button-->
<!--                        @click="toImage(2)"-->
<!--                        type="warning"-->
<!--                        icon='delete'-->
<!--                        size="mini"-->

<!--                    >上传到电子卷宗-->
<!--                    </el-button>-->

                </template>

                <el-pagination
                    style="padding-top: 20px;"
                    background
                    align='center'
                    layout="prev, pager, next"
                    @prev-click="prevClick"
                    @next-click="nextClick"
                    @current-change="currentChange"
                    :current-page="page"
                    :page-count="pageTotal"
                >
                </el-pagination>
            </div>
            <el-dialog title="下载进度" :visible.sync="progressVisible" width="30%">
                <el-progress
                    :percentage="perUpload"
                    status="success"
                    style="width: 480px;float:left;"
                ></el-progress>
                <span>{{curUpload}}/{{uploadTotal}}</span>
            </el-dialog>

            <el-dialog :title="showTitle" :visible.sync="dialogFormVisible" width="30%">

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
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="publish()">确 定</el-button>
                </div>
            </el-dialog>

        </div>


        <el-dialog title="大屏预览" :visible.sync="ScreenVisible" width="40%">
            <div  class="info_container" ref="info_container">
                <div>{{text.title}}</div>
                <div style="padding-top: 10px;">{{text.ah}}</div>
                <div style="padding-top: 10px;">{{text.ggnr}}</div>
                <div style="padding-top: 3px;float: right">{{text.fbsj}}</div>

            </div>
        </el-dialog>
    </div>

</template>

<script>
    import headTop from '../components/headTop'
    import {Message, MessageBox} from 'element-ui'
    import html2canvas from "html2canvas";
    import {publishGg,showGg ,getScreenList,updateStatusByAj} from '../api/getData'
    import {Cookie} from 'le5le-store';

    export default {
        name: "programPublish",

        data(){
            return {
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
                light:50,
                memory:30,
                store:80,
                checkboxGroup:[],
                tableId:"0",
                tableData:[],
                totalData:[],
                multipleSelection: [],
                screenSelection: [],
                page:1,
                pageTotal:0,
                perPageNum:10,
                showTitle:"选择大屏",
                dialogFormVisible: false,
                progressVisible:false,
                ScreenVisible:false,
                uploadTotal:1,
                curUpload:0,
                perUpload:0,
                screen:[],
                dataURL:"",
                text:{
                    title:"开庭公告",
                    ah:"(2020)津0105民初8073号",
                    ajxh:"197720",
                    ggnr:"本院定于2020年12月01日09时00分在二号院1015新法庭公开审理天津市河北区鑫瑞诺五金销售中心与孙佃超买卖合同纠纷一案。",
                    fbsj:"2020-11-08"
                }


            }
        },
        components: {
            headTop,
        },
        created(){
            if(Cookie.get("user")==null||Cookie.get("user")==""){
                this.$router.push('/')
            }

        },
        mounted(){

            this.getScreenAll()
        },
        methods: {
            prePublish(){
                if(!this.check()){
                    return ;
                }
                console.log(this.checkboxGroup);
                this.dialogFormVisible = true;

            },
            async getScreenAll(){
                const screenList = await getScreenList();
                if(screenList.status=="success"){

                    console.log(screenList.data)
                    this.screen = screenList.data;
                }

            },
            async publish(){
                if(!this.checkIp()){
                    return ;
                }
                this.dialogFormVisible = false;
                const loading = this.$loading({
                    lock: true,
                    text: '正在发布...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0,0 , 0, 0.8)'
                });
                const res = await publishGg(this.checkboxGroup,this.screenSelection[0],this.days);
                if(res.status=="success"){
                    loading.close();
                    Message({
                        message: res.data.get(2),
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
            async showGgList(){
                if(!this.check()){
                    return ;
                }
                if(this.checkboxGroup.length > 1){
                    Message({
                        message: '最多选择一类节目',
                        type: 'error',
                        duration: 2 * 1000
                    });
                    return ;
                }
                console.log(this.checkboxGroup)
                console.log(this.days)
                this.tableId = "0";
                this.tableData = [];

                const res = await showGg(this.checkboxGroup,this.days);
                if(res.status=="success"){
                    this.totalData = res.data;
                    this.pageTotal = Math.ceil(this.totalData.length/this.perPageNum);
                    this.tableData = this.totalData.slice(0,this.perPageNum*this.page);
                    Message({
                        message:"查询成功",
                        type: 'success',
                        duration: 2 * 1000
                    });
                    this.tableId = this.checkboxGroup[0];
                }else{
                    Message({
                        message:"查询失败",
                        type: 'error',
                        duration: 2 * 1000
                    });
                }


            },
            check(){
                if (this.checkboxGroup.length === 0) {
                    Message({
                        message: '请选择一类节目',
                        type: 'error',
                        duration: 2 * 1000
                    });
                    return false;
                }
                return true;
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
            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            ScreenSelectionChange(val){
                this.screenSelection = [];
                val.forEach(item=>{
                    this.screenSelection.push(item.ip)
                })
                console.log(this.screenSelection[0])
            },
            prevClick(){

            },
            nextClick(){

            },
            currentChange(val){
                this.page = val;
                this.tableData = this.totalData.slice((this.page-1)*this.perPageNum,this.page*this.perPageNum);
            },

            toImage(val){
                this.progressVisible = true;
                this.uploadTotal = this.multipleSelection.length;
                this.curUpload = 0;
                this.perUpload = 0;
                for(let i=0;i<this.multipleSelection.length;i++){
                    let item = this.multipleSelection[i];
                    const _this = this;
                    (function(j) {
                        setTimeout( function timer() {
                            _this.text.ajxh = item.ajxh;
                            _this.text.ah = item.ah;
                            _this.text.ggnr = item.ggnr;
                            _this.text.fbsj = item.fbsj.substring(0,10);
                            console.log(item.ah);
                            console.log(new Date().getTime())
                            _this.saveImage(val);
                            _this.curUpload++;
                            _this.perUpload = _this.curUpload/_this.uploadTotal*100;
                            if(_this.perUpload==100){
                                _this.progressVisible = false;
                                Message({
                                    message: '上传完成',
                                    type: 'success',
                                    duration: 2 * 1000
                                });
                            }
                        }, j*1000 );
                    })(i);

                }


            },
            async saveImage(val) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 600;
                canvas.height = 400;
                ctx.save();
                ctx.globalCompositeOperation = "destination-over";
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore()

                ctx.save();
                ctx.font = '35px 微软雅黑';
                ctx.fillStyle = '#ff0000';
                ctx.fillText(this.text.title, 220, 50);
                ctx.fillText(this.text.ah, 100, 100);
                this.draw_long_text(this.text.ggnr,ctx, 20, 150);
                ctx.fillText(this.text.fbsj,400,380)
                const img = await canvas.toDataURL('image/png', 0.99);
                const blob = this.convertToBlob(img);
                let form = new FormData();
                form.append("file",blob);
                form.append("ajxh",this.text.ajxh);
                form.append("ah",this.text.ah);
                if(val==1){
                    this.$axios.post('/api/publish/saveImage', form).then(resp => {
                        // console.log(this.text.ajxh+":"+resp.data.data)

                    })
                }else if(val==2){
                    this.$axios.post('/api/publish/saveToJuan', form).then(resp => {
                        // console.log(this.text.ajxh+":"+resp.data.data)
                    })
                }





            },
            draw_long_text(longtext,cxt,width,height) {
                let linelenght = 16;
                let text = "";
                let count = 0;
                let begin_width = width;
                let begin_height = height;
                longtext = "  "+longtext;
                let stringLenght = longtext.length;
                // console.log(stringLenght)
                let newtext = longtext.split("");
                // console.log(newtext)
                let context = cxt;
                // context.clearRect(0,0, 600,300);
                context.textAlign = 'left';

                for(let i = 0; i <= stringLenght ; i++) {

                    if(count == linelenght) {
                        context.fillText(text,begin_width,begin_height);
                        begin_height = begin_height + 50;
                        text = "";
                        count = 0;
                    }
                    if(i == stringLenght) {
                        context.fillText(text,begin_width,begin_height);
                    }
                    if(newtext[0]<10&&newtext[1]<10){
                        text = text + newtext[0]+newtext[1];
                        i++;
                        newtext.shift();
                        newtext.shift();
                        count ++;
                    }else{
                        text = text + newtext[0];
                        count ++;
                        newtext.shift();
                    }

                }
            },


            convertToBlob (_base64) {
                var byteString = atob(_base64.split(',')[1])
                var mimeString = _base64.split(',')[0].split(':')[1].split(';')[0]
                var ab = new ArrayBuffer(byteString.length)
                var ia = new Uint8Array(ab)
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i)
                }
                return new Blob([ab], {
                    type: mimeString
                })
            },
            changeStatus($event,row){
                // console.log($event)
                // console.log(row)
                if($event){
                    row.status = 2;
                }else{
                    row.status = 3;
                }
                const res = updateStatusByAj(row.status,row.ajxh)
            },
            yuLan(item){
                this.text.ajxh = item.ajxh;
                this.text.ah = item.ah;
                this.text.ggnr = item.ggnr;
                this.text.fbsj = item.fbsj.substring(0,10);
                this.ScreenVisible = true;

            }




        },
    }
</script>

<style lang="less" >
    @import '../style/mixin';
    /*#table /deep/ .el-table__body-wrapper {*/
    /*    height: 600px; !* 滚动条整体高 必须项 *!*/
    /*    border-right: none;*/
    /*    overflow-y: scroll;!* overflow-y为了不出现水平滚动条*!*/
    /*}*/

    /*#table /deep/ .el-table__body-wrapper::-webkit-scrollbar {*/
    /*    width: 10px;!* 滚动条的宽高 必须项 *!*/
    /*    height: 25px;*/
    /*}*/

    /*#table /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {*/
    /*    background-color: red;*/
    /*    border-radius: 3px;*/
    /*}*/
    .info_container {
        padding: 10px;
        background: black;
        box-sizing: border-box;
        overflow: auto;
        width: 600px;
        height: 400px;
        margin: 0 auto;
        text-align: center;
        color:red;
        font-family: "Microsoft Yahei", sans-serif;
        font-size: 35px;
        margin-bottom: 10px;
    }

    /*.el-checkbox__inner {*/
    /*    display: inline-block;*/
    /*    position: relative;*/
    /*    border: 1px solid #DCDFE6;*/
    /*    border-radius: 2px;*/
    /*    -webkit-box-sizing: border-box;*/
    /*    box-sizing: border-box;*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    background-color: #FFF;*/
    /*    z-index: 1;*/
    /*    -webkit-transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);*/
    /*    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);*/
    /*}*/
</style>
