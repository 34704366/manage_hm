<template>
    <div>
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
                <el-card style="margin-top: 25px; height:400px">
                    <el-table :data="tableData" style="width:99.9%">
                        <el-table-column v-for="(value, key) in tableLabel" :key="key"
                        :prop="key" :label="value">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16">
                <div>
                    <el-card v-for="item,index in countData" :key="index" class="info-card">
                        <i class="card-icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
                    </el-card>
                </div>

            </el-col>
        </el-row>

        <!-- 测试过滤器 -->
        <div id="div1">
            <table align="center" >
                <tr class="firstLine">
                    <td>输入数据</td>
                    <td>过滤后的结果</td>
                </tr>      
                <tr>
                    <td align="center">
                        <input v-model= "data"  />
                    </td>
                    <td align="center">
                        {{ data|capitalize|capitalizeLastLetter }}
                    </td>
                </tr>
            </table>
        </div>
        <button v-xart="{color:'blue'}" @click="test">test</button>
    </div>
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
            },

            countData: [
                {
                    name: '今日支付订单',
                    value: 1234,
                    icon: 'success',
                    color: '#2ec7c9',
                },
                {
                    name: '今日收藏订单',
                    value: 210,
                    icon: 'star-on',
                    color: '#ffb980',
                },
                {
                    name: '今日未支付订单',
                    value: 1234,
                    icon: 's-goods',
                    color: '#5ab1ef',
                },
                {
                    name: '本月支付订单',
                    value: 1234,
                    icon: 'success',
                    color: '#2ec7c9',
                },
                {
                    name: '本月收藏订单',
                    value: 210,
                    icon: 'star-on',
                    color: '#ffb980',
                },
                {
                    name: '本月未支付订单',
                    value: 1234,
                    icon: 's-goods',
                    color: '#5ab1ef',
                },
            ],

            data: '',


            
        }
    },

    // 过滤器
    filters: {
        capitalize: value => {
            // 如果value不存在
            if (!value || value == undefined) {
                return " "
            }
            let result = value.charAt(0).toUpperCase() + value.substring(1)
            return result;
        },
        capitalizeLastLetter: value => {
            // 如果value不存在
            if (!value || value == undefined) {
                return " "
            }
            value = value.toString();
            return value.substring(0, value.length - 1) + value.charAt(value.length - 1).toUpperCase();
        }

    },

    methods: {
        // test 
        test() {
            console.log(this.$router.options)
        }
    }
}

import Vue from 'vue'

// 自定义指令，第一个参数是dom对象，第二个参数用来接收参数，参数存在binding.value
Vue.directive('xart',{
    // 自定义指令的钩子函数
    bind: function (el, binding, vnode) {
        console.log(el, binding, vnode)
      },
}, function (el, binding) {
    
	el.innerHTML = el.innerHTML + '—— 自定义指令( v-xart ) '
    console.log(binding.value)
	el.style.color = binding.value.color;


})
</script>


<style scoped>

.content {
    display: flex;
    flex-direction: row;
}

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

tr.firstLine{
    background-color: lightGray;
}
</style>