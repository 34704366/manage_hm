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
                    <el-table v-loading="loading" border fit highlight-current-row :data="tableData" style="width:99.9%" id="sales_table">
                        <el-table-column v-for="(value, key) in tableLabel" :key="key"
                        :prop="key" :label="value">
                        </el-table-column>
                        <el-table-column align="center" label="editable" width="80">
                            <template slot-scope="{row}">
                                <template v-if="row.edit">
                                    <el-input class="edit-input" v-model="row.name" size="small" placeholder=""></el-input>
                                    <el-button
                                        class="cancel-btn"
                                        size="small"
                                        icon="el-icon-refresh"
                                        type="warning"
                                        @click="cancelEdit(row)"
                                    >
                                        cancel
                                    </el-button>
                                </template>
                                <span v-else>
                                    {{row.name}}
                                </span>
                            </template>
                        </el-table-column>
                        <!-- 加上之后就没有横向滑动栏了暂时不知道为什么 -->
                        <el-table-column align="center" label="Actions" width="120">
                            <template v-slot="{row}">
                                <el-button
                                    v-if="!row.edit"
                                    type="success"
                                    size="small"
                                    icon="el-icon-edit"
                                    :id="row.name"
                                    @click="row.edit = !row.edit"
                                >
                                    Edit
                                </el-button>
                                <el-button
                                    v-else
                                    type="primary"
                                    size="small"
                                    icon="el-icon-circle-check-outline"
                                    :id="row.name"
                                    @click="confirmEdit(row)"
                                >
                                    Ok
                                </el-button>
                            </template>
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
            <table align="center">
                <tr class="firstLine">
                    <td>输入数据</td>
                    <td>过滤后的结果</td>
                </tr>      
                <tr>
                    <td align="center">
                        <input v-model="data" />
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
            loading: false,

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
                totalSales: '总销量'
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
            this.getList();
            console.log(this.tableData)
        },


        // 拉取列表data
        getList() {
            this.loading = true;

            // const { data } = await fetchList(this.listQuery)
            // 处理列表
            this.tableData.map(v => {
                // v.edit = false;   // 直接修改不能引起已经渲染好的dom内容的改变
                this.$set(v, 'edit', false);   // https://vuejs.org/v2/guide/reactivity.html
                v.originalName = v.name;    // 做可编辑的name的备份
                return v;
            })
            this.loading = false;
        },

        confirmEdit(result) {
            console.log(result);
            result.edit = false;
            result.originalName = result.name;    // 备份值也要修改
            this.$message({
                message: '修改成功',
                type: 'success'
            })
        },


        cancelEdit(result) {
            result.name = result.originalName;
            result.edit = false;
            this.$message({
                message: '取消修改',
                type: 'warning'
            })
        }
    },

    created() {
        this.getList();
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

.edit-input {
  padding-right: 5px;
}
</style>