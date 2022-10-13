<template>
    <el-container style="height: 100%">
        <el-aside width="auto">
            <common-aside></common-aside>
        </el-aside>
        <el-container>
            <el-header>
                <!-- vue特性,驼峰命名法要换成小写字母单词横线隔开命名 -->
                <common-header>
                    
                </common-header>
            </el-header>
            <!-- router-view是展示嵌套路由的组件. -->
            <router-view></router-view>
        </el-container>
    </el-container>
</template>
<script>
import CommonAside from '../src/components/CommonAside.vue'
import CommonHeader from '../src/components/CommonHeader.vue'

export default {
    name: 'Home',
    components: {
        CommonAside,
        CommonHeader
    },
    data() {
        return {}
    }
}
</script>

<!-- 添加scoped可以实现组件的私有化，不影响全局样式 -->
<style lang="less">

// 消除由滚动条造成的左右闪动
html, body {
  height: 100%;
  overflow: auto;
  margin: 0;
}
html{
  overflow-y: auto;
}

.el-header {
    background-color: black;
}
.el-main {
    padding-top: 0;
}
</style>