<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

            <div class="title-container">
                <h3 class="title">Login Form</h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="username" />
                </span>
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="键盘大写锁定已开启" placement="right" manual>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>

            <el-button tabindex="3" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

            <div style="position:relative">
                <div class="tips">
                    <span>Username : admin</span>
                    <span>Password : any</span>
                </div>
            <div class="tips">
                <span style="margin-right:18px;">Username : editor</span>
                <span>Password : any</span>
            </div>

            <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
                Or connect with
            </el-button>
            </div>
        </el-form>

        <el-dialog title="Or connect with" :visible.sync="showDialog">
            暂无实现此功能
            <br>
            <br>
            <social-sign />
        </el-dialog>
        <!-- <button @click="test">test</button> -->
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignIn'

export default {
    name: "Login",
    components: {
        SocialSign
    },
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('请输入正确的用户名'));
            } else {
                callback();
            }
        }

        const validatePassword = (rule, value, callback) => {
            if (value.length < 3) {
                callback(new Error('密码不能少于3位'));
            } else {
                callback();
            }
        }

        return {
            loginForm: {
                username: 'admin',
                password: '111111'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {}
        }
    },

    watch: {
        $route: {
            handler: function(route) {
                const query = route.query
                if (query) {
                    this.redirect = query.redirect
                    this.otherQuery = this.getOtherQuery(query)
                }
                // console.log(query)
            },
            immediate: true
        }
    },

    created() {
        // window.addEventListener('storage', this.afterQRScan)
    },
    destroyed() {
        // window.removeEventListener('storage', this.afterQRScan)
    },
    mounted() {
        // 聚焦
        if (this.loginForm.username === '') {
            this.$refs.username.focus();
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus();
        }
    },

    methods: {
        checkCapslock(e) {
            const { key } = e;
            if (key.length === 1 && (key >= 'A' && key <= 'Z')) {
                this.capsTooltip = true;
            }
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
            // $nextTick函数作用是延迟到DOM渲染完成之后再进行操作
            this.$nextTick(() => {
                this.$refs.password.focus();
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('user/login', this.loginForm)
                    .then(() => {
                        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                        console.log('页面登录成功')
                        this.loading = false
                    })
                    .catch(() => {
                        this.loading = false
                    })
                } else {
                    console.log('error submit!!')
                    return false;
                }
            })
        },

        // 将请求中query除redirect部分提取出来以map返回
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                // console.log(acc, cur)
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
        },

        test() {
            console.log(this.$store.state);
            let name = 'new user';
            // 测试store
            this.$store.dispatch('user/test', name)
            .then(() => {
                console.log('success');
            }, err => {
                console.warn(`has error:${err}`);
            })
            // process.env.VUE_APP_BASE_API在根目录.env.development中配置
            console.log(process.env)
            
        },


    }
}


</script>


<!-- 如果想在页面中覆盖某个element组件的样式，因为element-ui样式是全局引入的，所以样式不能加scoped -->
<style lang="scss">

$bg:#1b2c42;
$light_gray:#eee;

$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    
    input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
            box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: $cursor !important;
        }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style lang="scss" scoped>
$dark_gray:#5d635b;
$icon_size: 18px;
$light_gray:#eee;

.login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
        // first-of-type是选择首个指定元素
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    font-size: $icon_size;
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 30px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: $icon_size;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 20px;
    bottom: 6px;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
</style>