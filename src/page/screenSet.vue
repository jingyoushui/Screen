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
                    label="内存使用率"
                >
                    <template slot-scope="scope">
                        <el-progress
                            type="circle"
                            :percentage="scope.row.memory"
                            :width=40
                        ></el-progress>
                    </template>

                </el-table-column>
                <el-table-column
                    label="硬盘使用率"
                >
                    <template slot-scope="scope">
                        <el-progress
                            type="circle"
                            :percentage="scope.row.store"
                            :width=40
                        ></el-progress>
                    </template>

                </el-table-column>




            </el-table>
            <template style="padding-top: 40px;text-align: center;">
                <el-button
                    @click="getScreenshot()"
                    type="success"
                    icon='edit'
                    size="mini"
                    style="margin-top: 30px"

                >获取运行截图
                </el-button>
            </template>
            <el-dialog title="运行截图" :visible.sync="ImageVisible" :close-on-click-modal="false" >
                <div v-if="imageUrl!=''" style="width: 100%;text-align: center">
                    <el-image :src="imageUrl" style="width: 900px;padding-top: 10px;"></el-image>
                </div>

            </el-dialog>



        </div>

    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {Message, MessageBox} from 'element-ui'
    import {getMemoryData,getStorageData,getScreenshot,getScreenList } from '../api/getData'
    import loginBg from "@/assets/img/login_bg.png"
    import {Cookie} from 'le5le-store';
    export default {
        data(){
            return {
                tableData: [],
                multipleSelection: [],
                light:50,
                imageUrl:"",
                // imageUrl:loginBg,
                ImageVisible:false,

            }
        },
    	components: {
    		headTop,
    	},
        created(){
            if(Cookie.get("user")==null||Cookie.get("user")==""){
                this.$router.push('/')
            }else{
                this.getScreenAll();
            }

        },
        mounted(){

        },
        methods: {
            async MemoryData(ip){
                //TODO 判断是否有连接
                let res = await getMemoryData(ip);
                if(res.status=="success"){
                    return res.data;
                }else{
                    return 0;
                }

            },
            async StorageData(ip){
                //TODO 判断是否有连接
                let res = await getStorageData(ip);
                if(res.status=="success"){
                    return res.data;
                }else{
                    return 0;
                }

            },
            async getScreenshot(){
                if(this.check()){
                    const loading = this.$loading({
                        lock: true,
                        text: '正在获取截屏...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0,0 , 0, 0.8)'
                    });
                    let res = await getScreenshot(this.multipleSelection[0].ip);
                    if(res.status=="success"){
                        loading.close();
                        this.imageUrl =res.data;
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
            handleSelectionChange(val) {
                this.multipleSelection = val;

            },
            async getScreenAll(){
                const screenList = await getScreenList();
                if(screenList.status=="success"){

                    console.log(screenList.data)
                    for (const item of screenList.data) {
                        item.memory = await this.MemoryData(item.ip);
                        item.store = await this.StorageData(item.ip);
                        this.tableData.push({
                            id:item.id,
                            name:item.name,
                            ip:item.ip,
                            memory:item.memory,
                            store:item.store,
                        })
                    }
                    // this.tableData = screenList.data;
                    // console.log(screenList.data)
                }

            },

        },
    }
 </script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
