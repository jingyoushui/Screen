<template>
    <div class="fillcontain">
        <head-top></head-top>

        <div class="table_container">
            <el-table
                :data="programList"
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
                    label="节目名称"
                    prop="programName">
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="createTime">
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
                    </template>
                </el-table-column>
<!--                <el-table-column-->
<!--                    label="上次更改时间"-->
<!--                    prop="updateTime">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-icon name="time"></el-icon>-->
<!--                        <span style="margin-left: 10px">{{ scope.row.updateTime}}</span>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getProgramList,deleteProgramById} from '../api/getData'
    import {Message, MessageBox} from 'element-ui'
    import {Cookie,Store} from 'le5le-store';
    export default {
        name: "programList",
        data(){
            return {
                programList:[],


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
            this.getProgramList();
        },
        methods: {
            async getProgramList(){
                const res = await getProgramList();
                if(res.status==="success"){
                    this.programList = res.data;

                }else{
                    Message({
                        message:"获取失败",
                        type: 'error',
                        duration: 2 * 1000
                    });
                }

            },
            handleSelectionChange(){

            },
            async handleEdit(index,row){
                // console.log(row)
                Store.set("program",row.content);
                this.$router.push('/textEdit');

            },
            async handleDelete(index, row) {
                console.log(row.id);
                const res = await deleteProgramById(row.id);
                if(res.status=="success"){
                    Message({
                        message: "删除成功",
                        type: 'success',
                        duration: 2 * 1000
                    });
                    this.programList.splice(index, 1);
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

<style scoped>
    .table_container{
        padding: 30px;
    }

</style>
