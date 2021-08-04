<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                align='center'
                border
                height="600px"
                @selection-change="handleSelectionChange"
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
                    label="文件名称"
                    prop="wjm">
                </el-table-column>
                <el-table-column
                    label="文件类型"
                    prop="type">
                </el-table-column>
                <el-table-column
                    label="文件路径"
                    prop="bcwz">
                </el-table-column>
                <el-table-column
                    label="上传时间"
                    prop="scsj">
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.scsj.substring(0,10) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button
                            v-if="scope.row.type=='image'"
                            size="mini"
                            type="success"
                            @click="handleView(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
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



            <template style="padding-top: 40px;text-align: center;">

                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="/api/file/fileUpload"

                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    <el-button
                        @click="prePublish()"
                        type="success"
                        icon='edit'
                        size="small"
                        style="margin-top: 30px"

                    >发布
                    </el-button>
                    <div slot="tip" class="el-upload__tip">只能上传mp4/jpg/png文件</div>
                </el-upload>

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
                        <el-button type="primary" @click="handlePublish()">确 定</el-button>
                    </div>
                </el-dialog>

                <el-dialog title="图片预览" :visible.sync="ImageVisible" :close-on-click-modal="false" >
                    <div v-if="imageUrl!=''" style="width: 100%;text-align: center">
                        <el-image :src="imageUrl" style="width: 900px;padding-top: 10px;"></el-image>
                    </div>

                </el-dialog>


            </template>
        </div>


    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {Message, MessageBox} from 'element-ui'
    import {getFile,sendVideoAndPicture,getScreenList,deleteFileById} from '../api/getData'
    import {Cookie} from 'le5le-store';
    export default {
        name: "videoManage",

        data(){
            return {
                light:50,
                memory:30,
                store:80,
                multipleSelection:[],
                showTitle:"选择大屏",
                dialogFormVisible: false,
                screen:[],

                tableData:[],
                totalData:[],
                page:1,
                pageTotal:0,
                perPageNum:20,

                ImageVisible:false,
                imageUrl:"",
            }
        },
        components: {
            headTop,
        },
        mounted(){
            this.getList();
            this.getScreenAll();

        },
        created(){
            if(Cookie.get("user")==null||Cookie.get("user")==""){
                this.$router.push('/')
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            async handleDelete(index, row) {
                console.log(row.id);
                const res = await deleteFileById(row.id,row.bcwz);
                if(res.status=="success"){
                    Message({
                        message: "删除成功",
                        type: 'success',
                        duration: 2 * 1000
                    });
                    this.tableData.splice(index, 1);
                }else{
                    Message({
                        message: "删除失败",
                        type: 'error',
                        duration: 2 * 1000
                    });
                }
            },
            async handleView(index,row){
                this.imageUrl = "Upload/"+row.bcwz;
                this.ImageVisible = true;
            },
            async getScreenAll(){
                const screenList = await getScreenList();
                if(screenList.status=="success"){

                    console.log(screenList.data)
                    this.screen = screenList.data;
                }

            },
            prePublish(){
                if(!this.check()){
                    return ;
                }
                this.dialogFormVisible = true;

            },
            async handlePublish(){
                if(!this.checkIp()){
                    return ;
                }
                this.dialogFormVisible = false;
                let arr = [];
                this.multipleSelection.forEach(item => {
                    arr.push(item.id)
                });
                const loading = this.$loading({
                    lock: true,
                    text: '正在发布...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0,0 , 0, 0.8)'
                });
                const res = await sendVideoAndPicture(arr,this.screenSelection[0]);
                if(res.status=="success"){
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
                console.log(arr)



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
            submitUpload() {
                this.$refs.upload.submit();

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            async getList(){
                this.tableData = [];
                let res = await getFile();
                if(res.status=="success"){
                    this.totalData = res.data;
                    this.pageTotal = Math.ceil(this.totalData.length/this.perPageNum);
                    this.tableData = this.totalData.slice(0,this.perPageNum*this.page);
                }else{
                    Message({
                        message: res.data,
                        type: 'error',
                        duration: 2 * 1000
                    });
                }
            },
            check(){
                if (this.multipleSelection.length === 0) {
                    Message({
                        message: '至少选择一个文件',
                        type: 'error',
                        duration: 2 * 1000
                    });
                    return false;
                }
                return true;
            },
            prevClick(){

            },
            nextClick(){

            },
            currentChange(val){
                this.page = val;
                this.tableData = this.totalData.slice((this.page-1)*this.perPageNum,this.page*this.perPageNum);
            },



        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .upload-demo{
        width: 300px;
    }

</style>
