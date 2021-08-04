<template>
    <div>
        <textarea :id="id"></textarea>
    </div>
</template>

<script>
    export default {
        name: 'ckeditor4',
        props: [
            'cktext'],
        mounted: function() {
            const self = this
            // 渲染编辑器
            self.ckeditor = CKEDITOR.replace(self.id)
            // 设置初始内容
            self.ckeditor.setData(self.cktext)
            // 监听内容变更事件
            self.ckeditor.on('change', function() {
                self.$emit('ckinput', self.ckeditor.getData())
            })
            self.ckeditor.on('print', function() {
                alert(self.ckeditor.getData())
            })
        },
        data: function() {
            return {
                id: parseInt(Math.random() * 10000).toString(),
                ckeditor: null
            }
        },
        watch: {
            // 监听prop的变化，更新ckeditor中的值
            cktext: function() {
                if (this.cktext !== this.ckeditor.getData()) {
                    this.ckeditor.setData(this.cktext)
                }
            }
        },
        // 销毁组件前，销毁编辑器
        beforeDestroy: function() {
            if(self.ckeditor){
                self.ckeditor.destroy()
            }
        }
    }
</script>
