import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const playSet = r => require.ensure([], () => r(require('@/page/playSet')), 'playSet');
const programPublish = r => require.ensure([], () => r(require('@/page/programPublish')), 'programPublish');
const videoManage = r => require.ensure([], () => r(require('@/page/videoManage')), 'videoManage');
const screenSet = r => require.ensure([], () => r(require('@/page/screenSet')), 'screenSet');
const screenList = r => require.ensure([], () => r(require('@/page/screenList')), 'screenList');
const screenAdd = r => require.ensure([], () => r(require('@/page/screenAdd')), 'screenAdd');
const textEdit = r => require.ensure([], () => r(require('@/page/textEdit')), 'textEdit');
const programList = r => require.ensure([], () => r(require('@/page/programList')), 'programList');
const generateImage = r => require.ensure([], () => r(require('@/page/generateImage')), 'generateImage');
const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		}, {
            path: '/videoManage',
            component: videoManage,
            meta: ['播放管理', '文件管理'],
        },{
			path: '/programPublish',
			component: programPublish,
			meta: ['播放管理', '节目发布'],
		},{
            path: '/textEdit',
            component: textEdit,
            meta: ['播放管理', '节目编辑'],
        },{
            path: '/programList',
            component: programList,
            meta: ['播放管理', '节目列表'],
        },{
			path: '/screenSet',
			component: screenSet,
			meta: ['屏体管理', '屏体监控'],
		},{
			path: '/screenList',
			component: screenList,
			meta: ['屏体管理', '屏体列表'],
		}, {
            path: '/screenAdd',
            component: screenAdd,
            meta: ['屏体管理', '屏体添加'],
        },
        {
            path: '/generateImage',
            component: generateImage,
            meta: ['辅助功能', '图片生成'],
        }]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
