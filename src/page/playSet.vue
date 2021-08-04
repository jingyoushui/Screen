<template>
    <div class="fillcontain">
        <head-top></head-top>


    </div>
</template>

<script>
    import headTop from '../components/headTop'
    export default {
        name: "playSet",

        data(){
            return {
                light:50,
                memory:30,
                store:80,

            }
        },
        components: {
            headTop,
        },
        created(){

        },
        methods: {

        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

</style>
