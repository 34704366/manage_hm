import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
import { Message } from 'element-ui'
const state = {
    token: "123",
    name: '',
    avatar: "",
    introduction: '',
    roles: []
}
// 对于module内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象state
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
}

const actions = {
    // context.state保存局部状态对象，context.rootState保存根节点状态
    test({commit, state, rootState}, name) {  
        return new Promise((resolve, reject) => {
            if (name) {
                commit('SET_NAME', name)
                setTimeout(() => {    
                    console.log(commit, state, rootState, name);
                    resolve();
                }, 1000)
            } else {
                reject("name can not be empty");
            }
        })
    },

    login({commit}, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password })
            .then(response => {
                const { data } = response;
                if (data.token) {
                    commit('SET_TOKEN', data.token);
                    setToken(data.token);
                } else {
                    Message({
                        message: "服务器异常",
                        type: 'error',
                        duration: 5000
                    })
                }
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
}

export default {
    /**
     *  namespaced: true 让模块中的action mutation getter等分层注册
     *  例如调用actions：user_login 使用dispatch("user/user_login")
     * 如果使用了命名空间，则在本文件中调用dispatch和commit等默认是在本模块中的
     */
    namespaced: true,
    state,
    mutations,
    actions
}