// 搜索音乐
<template>
    <div>
       搜索音乐
    </div>
</template>
<script>
export default {
    // 生命周期钩子 created
    // 回调生命函数，添加之后自动执行
    // 内部可以通过this 访问到 vue 示例
    created() {
        console.log(this.$route.query.q);
    }
}
</script>
<style lang="less" scoped>
</style>