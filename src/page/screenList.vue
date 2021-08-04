<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                align='center'
                border
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
                  label="大屏名称"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="IP地址"
                  prop="ip">
                </el-table-column>
                <el-table-column
                    label="宽度"
                    prop="width">
                </el-table-column>
                <el-table-column
                    label="高度"
                    prop="height">
                </el-table-column>

                <el-table-column
                  label="大屏介绍"
                  prop="description">
                </el-table-column>
                <el-table-column
                    prop="isOnline"
                    label="状态"
                    align='center'
                    sortable
                    width="150px">
                    <template slot-scope="scope">
                        <el-tag
                            v-if="scope.row.isOnline===1"
                            style="width: 80px"
                            :disable-transitions=true
                            key="scope.row.isOnline"
                            type="success"
                            effect="dark">
                            在线
                        </el-tag>
                        <el-tag
                            v-if="scope.row.isOnline!=1"
                            style="width: 80px"
                            :disable-transitions=true
                            key="scope.row.isOnline"
                            type="danger"
                            effect="dark">
                            离线
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <template style="padding-top: 40px;text-align: center;">
                <el-button
                    @click="handleConnect()"
                    type="success"
                    icon='edit'
                    size="mini"
                    style="margin-top: 30px"

                >连接
                </el-button>
                <el-button

                    @click="handleDisconnect()"
                    type="danger"
                    icon='delete'
                    size="mini"
                >断开
                </el-button>
                <el-button
                    @click="handleReboot()"
                    type="warning"
                    icon='delete'
                    size="mini"

                >重启
                </el-button>
            </template>

            <el-dialog :title="showEditTitle" :visible.sync="dialogFormVisible" width="30%">

                <div style="margin-left: 60px;">
                    <div style="margin-top: 30px;">
                        <el-input style="width:400px;" v-model="selectTable.name" placeholder="大屏名称"></el-input>
                    </div>
                    <div style="margin-top: 30px;">
                        <el-input style="width:400px;" v-model="selectTable.ip" placeholder="大屏IP地址"></el-input>
                    </div>
                    <div style="margin-top: 30px;">
                        <el-input
                            style="width: 400px"
                            type="textarea"
                            :rows="2"
                            placeholder="大屏介绍"
                            v-model="selectTable.description">
                        </el-input>

                    </div>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="Edit()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import { getScreenList, connectScreen,logoutScreen,updateScreen,deleteScreenById} from '../api/getData'
    import {Message, MessageBox} from 'element-ui'
    import {Cookie} from 'le5le-store';
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                multipleSelection: [],
                showEditTitle:"编辑",
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
        mounted(){

            this.initData();
        },
        methods: {
            async handleConnect(){
                if(this.check()){
                    let ip = this.multipleSelection[0].ip;
                    console.log(ip)
                    const loading = this.$loading({
                        lock: true,
                        text: '正在连接屏幕...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0,0 , 0, 0.8)'
                    });
                    const res = await connectScreen(ip);
                    if(res.status=="success"){
                        loading.close();
                        this.$message({
                            type: 'success',
                            message: res.data
                        });
                        this.tableData.forEach(item=>{
                            if(item.ip==ip){
                                item.isOnline = 1;
                            }
                        })
                    }else{
                        loading.close();
                        this.$message({
                            type: 'error',
                            message: res.data
                        });
                    }
                }




            },
            async handleDisconnect(){
                if(this.check()){
                    let ip = this.multipleSelection[0].ip;
                    console.log(ip)
                    const res = await logoutScreen(ip);
                    if(res.status=="success"){
                        this.$message({
                            type: 'success',
                            message: res.data
                        });
                        this.tableData.forEach(item=>{
                            if(item.ip==ip){
                                item.isOnline = 0;
                            }
                        })
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data
                        });
                    }
                }

            },
            handleReboot(){
                this.check();

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            async Edit(){
                this.dialogFormVisible = false;
                console.log(this.selectTable)
                const data = {
                    id:this.selectTable.id,
                    ip:this.selectTable.ip,
                    name:this.selectTable.name,
                    description:this.selectTable.description,
                }
                const res = await updateScreen(data);
                if(res.status=="success"){
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
            check() {
                if (this.multipleSelection.length === 0) {
                    Message({
                        message: '请选择一条记录',
                        type: 'error',
                        duration: 2 * 1000
                    });
                    return false;
                }else if(this.multipleSelection.length>1){
                    Message({
                        message: '只能选择一条记录',
                        type: 'error',
                        duration: 2 * 1000
                    });
                    return false;
                }
                return true;

            },
            async initData(){
                try{
                    this.getScreenAll();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async getScreenAll(){
                const screenList = await getScreenList();
                this.tableData = [];
                if(screenList.status=="success"){

                    console.log(screenList.data)
                    this.tableData = screenList.data;
                }

            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.dialogFormVisible = true;
                console.log(row)

            },
            async handleDelete(index, row) {
                console.log(row.id);
                const res = await deleteScreenById(row.id);
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

        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
