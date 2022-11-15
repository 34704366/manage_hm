<template>
    <header>
        <div class="content">
            <div class="left-box">
                <el-button @click="handleMenuCollpase" plain icon="el-icon-menu" size="mini">
                </el-button>
                <h3>首页</h3>
            </div>
            <div class="right-box">
                <el-dropdown class="dropdown-box" size="medium" trigger="hover">
                    <!-- <h3>123</h3> -->
                    <span class="dropdown-span">
                        <img :src="userAvatar" alt="用户头像">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item >个人中心</el-dropdown-item>
                        <el-dropdown-item>关于</el-dropdown-item>
                        <el-dropdown-item disabled>王晨昊</el-dropdown-item>
                        <el-dropdown-item divided @click.native="clickLogout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'CommonHeader',
    data() {
        return {
            userAvatar: require('../assets/images/userAvatar.jpg'),
        }
    },
    methods: {
        handleMenuCollpase() {
            this.$store.commit('collapseMenu');
        },

        // 用户退出的回调函数
        clickLogout() {
            this.$confirm('确认是否重新登录', "用户退出", {
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                this.$store.dispatch('user/logout').then(() => {
                    this.$router.push(`/login?redirect=${this.$route.fullPath}`);   // redirect to this
                })
            }, error => {
                console.log(error)
            })
        }
    }
}
</script>


<style scoped>
.content {
    margin: 0px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.content .left-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px 10px;
}
.content .left-box >el-button {
    height: 40px;
    width: 40px;
}
.content .left-box >h3 {
    color: #fff;
    margin-left: 8px;
}
.content .right-box >h3 {
    color: #fff;
    margin-right: 10px;
}
.content .right-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px 10px;
}
.content .right-box .dropdown-box {
    width: 40px;
    height: 40px;
}
.content .right-box .dropdown-box .dropdown-span {
    width: 100%;
    height: 100%;
}
.content .right-box .dropdown-box .dropdown-span >img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
</style>