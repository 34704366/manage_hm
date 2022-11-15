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


export function filterAsyncRoutes(routes, roles) {
    const res = [];

    routes.forEach(route => {
        const temp = { ...route }
        console.log(temp);

        if (hasPermission(roles, temp)) {
            if (temp.children) {
                temp.children = filterAsyncRoutes(temp.children, roles);
            }
            res.push(temp);
        }
    })
}


const state = {
    routes: [],
    addRoutes: [],
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes);
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