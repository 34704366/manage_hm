import { asyncRoutes, constantRoutes } from '../../../router'

let hasPermission = (roles, route) => {
    if (route.meta && route.meta.roles) {
        return roles.some(role => {
            route.meta.roles.includes(role);
        })
    } else {
        // 如果没有meta通常是404等通用页面，直接return true
        return true;
    }
}

/**
 * 
 * @param {Array} routes 
 * @param {Array} roles 
 */
export function filterAsyncRoutes(routes, roles) {
    const res = [];

    routes.forEach(route => {
        const temp = { ...route }
        // console.log(temp);

        if (hasPermission(roles, temp)) {
            if (temp.children) {
                // 递归处理子节点
                temp.children = filterAsyncRoutes(temp.children, roles);
            }
            res.push(temp);
        }
    })

    return res
}


const state = {
    routes: [],
    addRoutes: [],
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;     // addRoutes是动态添加的路由
        state.routes = constantRoutes.concat(routes);     // routes是全部路由
    }
}

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise((resolve) => {
            let accessedRoutes = [];
            if (roles.includes('admin')) {
                // if admin, return all
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
            }
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}