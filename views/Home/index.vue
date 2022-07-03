<template>
    <el-row class="content" :gutter="20">
        <el-col :span="8" class="el-col-box">
            <el-card shadow="hover">
                <div class="userCard">
                    <img :src="userAvatar" alt="用户头像">
                    <div class="userInfo">
                        <p class="name">{{userName}}</p>
                        <p class="access">{{userAccess}}</p>
                    </div>
                </div>
                <div class="loginInfo">
                    <p>
                        上次登录时间：{{oldLoginTime}}
                    </p>
                    <p>
                        上次登录地点：{{oldLoginLocation}}
                    </p>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            userAvatar: require('../../src/assets/images/userAvatar.jpg'),
            userName: 'Admin',
            userAccess: '管理员',
            oldLoginTime: '2022-7-3',
            oldLoginLocation: '广州市',

            mockServer: "http://127.0.0.1:4523/mock/1223322",
        }
    }
}
</script>


<style scoped>
.content .el-col-box {
    margin: 10px 10px;
}
.content .el-col-box .userCard {
    display: flex;
    flex-direction: row;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(215, 211, 211);
}
.content .el-col-box .userCard  >img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.content .el-col-box .userCard .userInfo {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 20px;
}
.content .el-col-box .userCard .userInfo >p {
    margin: 5px 10px;
}
.content .el-col-box .userCard .userInfo .name {
    font-size: 30px;
}

.content .el-col-box .loginInfo >p {
    font-size: 13px;
}
</style>