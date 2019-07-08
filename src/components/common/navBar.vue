<template>
  <div>
    <div class="logo">收银后台管理系统</div>
    <Menu width="auto" theme="dark" :accordion="true" @on-select="selectFn" :active-name="$route.path">
      <div v-for="(item,index) in menu " :key="index">
        <Submenu :name="index" v-if="item.children && item.children.length>0 ">
          <template slot="title">
            {{item.name}}
          </template>
          <Menu-item :name="sub.path" v-for="(sub,i) in item.children" :key="i">
            {{sub.name}}
          </Menu-item>
        </Submenu>
        <div>
          <Menu-item :name="item.path" :key="index"
                     v-if="item.children.length==0">
            {{item.name}}
          </Menu-item>
        </div>
      </div>
    </Menu>
  </div>
</template>

<script>
  import menu from '@/router/menu'

  export default {
    name: "nav-bar",
    data() {
      return {
        menu: menu, // 导航菜单
      }
    },
    methods: {
      selectFn(path) {
        this.$router.push({
          path: path,
        })
      }
    },
    created() {
    },
    mounted() {
    }
  }
</script>

<style scoped>
</style>
