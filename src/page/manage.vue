<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;"  background-color="#324057"   text-color="#fff"
                         active-text-color="#ffd04b" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>屏体管理</template>
						<el-menu-item index="screenSet">屏体监控</el-menu-item>
						<el-menu-item index="screenList">屏体列表</el-menu-item>
                        <el-menu-item index="screenAdd">屏体添加</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-video-camera"></i>播放管理</template>
						<el-menu-item index="programPublish">节目发布</el-menu-item>
                        <el-menu-item index="videoManage">文件管理</el-menu-item>
<!--						<el-menu-item index="playSet">播放设置</el-menu-item>-->
                        <el-menu-item index="textEdit">节目编辑</el-menu-item>
                        <el-menu-item index="programList">节目列表</el-menu-item>
					</el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-box"></i>辅助功能</template>
                        <el-menu-item index="generateImage">图片生成</el-menu-item>
                    </el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive exclude="textEdit">
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    import {Cookie} from 'le5le-store';
    export default {
        mounted(){
            if(Cookie.get("user")==null||Cookie.get("user")==""){
                this.$router.push('/')
            }
            console.log(Cookie.get("user"))
        },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
