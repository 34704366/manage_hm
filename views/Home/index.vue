<template>
    <el-row class="content" :gutter="20">
        <el-col :span="12" class="el-col-box">
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
            <el-card style="margin-top: 25px; height:400px">
                <el-table :data="tableData" style="width:99.9%">
                    <el-table-column v-for="(value, key) in tableLabel" :key="key"
                    :prop="key" :label="value">

                    </el-table-column>
                </el-table>
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

            tableData: [
                {
                    name: 'oppo',
                    todaySales: 100,
                    monthSales: 300,
                    totalSales: 800
                },
                {
                    name: 'vivo',
                    todaySales: 200,
                    monthSales: 500,
                    totalSales: 1000
                },
                {
                    name: '小米',
                    todaySales: 300,
                    monthSales: 600,
                    totalSales: 1200
                },
                {
                    name: '苹果',
                    todaySales: 150,
                    monthSales: 350,
                    totalSales: 1000
                },
                {
                    name: '三星',
                    todaySales: 80,
                    monthSales: 200,
                    totalSales: 600
                },
                {
                    name: '魅族',
                    todaySales: 60,
                    monthSales: 200,
                    totalSales: 700
                },
            ],
            tableLabel: {
                name: '品牌',
                todaySales: '今日销量',
                monthSales: '本月销量',
                totalSales: '总销量',
            }
            
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