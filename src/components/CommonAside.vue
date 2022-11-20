<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
    @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <div class="menu-title" v-if="!isCollapse">管理后台</div>
        <el-menu-item @click="menuClick(item)" v-for="item in menuItemNoChild" :index="item.path + ''" :key="item.path">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        
        <el-submenu v-for="item in menuItemHasChild" :index="item.path + ''" :key="item.path">
            <template slot="title">
              <i :class="'el-icon-' + item.icon"></i>
              <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="subItem, subIndex in item.children" :index="subIndex" :key="subItem.path">
                <el-menu-item :index="subItem.path">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

    </el-menu>
</template>



<script>
  export default {
    data() {
      return {
        
        // 菜单
        menu: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home ',
                url: 'Home/Home'
            },
            {  
                path: '/mall',
                name: 'mall',
                label: '商品管理',
                icon: 'video-play',
                url: 'MallManage/MallManage'

            },
            {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: 'UserManage/UserManage'
            },
            {
                path: '/markdown',
                name: 'markdown',
                label: 'md文本编辑器',
                icon: 'user',
                url: 'markdownEditor/markdownEditor'
            },
            {
                label: '其他',
                icon: 'location',
                children: [
                    {
                        path: '/page1',
                        name: 'page1',
                        label: '页面1',
                        icon: 'setting',
                        url: 'Other/PageOne'
                    },
                    {
                        path: '/page2',
                        name: 'page2',
                        label: '页面2',
                        icon: 'setting',
                        url: 'Other/PageTwo'
                    }
                ]
            }

        ],
        // isCollapse: false

      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      // 页面路由
      menuClick(item) {
        console.log(item);
        this.$router.push({
          name: item.name
        }).catch(() => {});
      }
    },
    computed: {
      // 获取到没有子节点的项
      menuItemNoChild() {
        return this.menu.filter(item => !item.children)
      },
      // 获取到有子节点的项
      menuItemHasChild() {
        return this.menu.filter(item => item.children)
      },

      // 定义侧边栏是否折叠的函数
      isCollapse() {
        return this.$store.state.tab.isCollapse;
      }
    }
  }
</script>


<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100%;
    border: none;
    h3 {
      color: blue;
      text-align: center;
      color: #fff;
    }
  }


  .el-menu-vertical-demo .menu-title {
    font-size: 25px;
    margin-left: 20px;
    margin-bottom: 20px;
    margin-top: 30px;
  }
</style>