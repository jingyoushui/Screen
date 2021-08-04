import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/api/admin/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/api/admin/signout');


/**
 * 添加大屏
 */

export const addScreen = data => fetch('/api/screen/addScreen', data, 'POST');

/**
 * 修改大屏
 */

export const updateScreen = data => fetch('/api/screen/updateScreen', data, 'POST');
/**
 * 删除大屏
 */

export const deleteScreenById = id => fetch('/api/screen/deleteScreenById/'+id);
/**
 * 获取屏幕列表
 */

export const getScreenList = data => fetch('/api/screen/getScreenAll');
/**
 * 连接屏幕
 */

export const connectScreen = ip => fetch('/api/screen/connectScreen/'+ip);
/**
 * 断开屏幕
 */

export const logoutScreen = ip => fetch('/api/screen/logoutScreen/'+ip);

/**
 * 获取内存
 */

export const getMemoryData = ip => fetch('/api/screen/getMemoryData/'+ip);

/**
 * 获取磁盘
 */

export const getStorageData = ip => fetch('/api/screen/getStorageData/'+ip);
/**
 * 获取截图
 */

export const getScreenshot = ip => fetch('/api/screen/getScreenshot/'+ip);

/**
 * 发布公告
 */

export const publishGg = (arr,ip,days) => fetch('/api/publish/sendGgList?arr='+arr+'&ip='+ip+'&days='+days);

/**
 * 预览公告
 */

export const showGg = (arr,days) => fetch('/api/publish/showGgListByGglx?arr='+arr+'&days='+days);
/**
 * 文件上传
 */

export const fileUpload = data => fetch('/api/file/fileUpload',data, 'POST');
/**
 * 获取文件列表
 */

export const getFile = () => fetch('/api/file/getFileAll');
/**
 * 发布文件
 */

export const sendVideoAndPicture = (arr,ip) => fetch('/api/publish/sendVideoAndPicture?arr='+arr+'&ip='+ip);
/**
 * 保存图片
 */

export const saveImage = data => fetch('/api/publish/saveImage',data,'POST');
/**
 * 更改发布状态
 */

export const updateStatusByAj = (status,ajxh) => fetch('/api/publish/updateStatusByAj?status='+status+'&ajxh='+ajxh);


/**
 * 删除文件
 */

export const deleteFileById = (id,url) => fetch('/api/file/deleteFileById?id='+id+'&url='+url);

/**
 * 自定义发布公告
 */

export const sendTextEdit = (ip,str,days) => fetch('/api/publish/sendTextEdit?ip='+ip+'&str='+str+'&days='+days);

export const saveProgram = data => fetch('/api/program/save',data,'POST');


export const getProgramList = () => fetch('/api/program/list');

export const getProgramById = (id) => fetch('/api/program/getProgramById?id='+id)

export const deleteProgramById = (id) => fetch('/api/program/deleteProgramById?id='+id)

