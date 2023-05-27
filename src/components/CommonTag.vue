<template>
    <div class="tabs">
        <el-tag 
        v-for="(item, index) in tags" 
        :key="item.path"  :closable="item.name !== 'home'"  
        :effect="$route.name === item.name ? 'dark' : 'plain'"
        @click="changeMenu(item)"
        @close="handClose(item, index)"
        size="small"
        >
            {{ item.label }}
        </el-tag>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'CommonTag',
    data(){
        return{}
    },
    computed:{
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods:{
        ...mapMutations(['closeTag']),
        //点击tag跳转的功能
        changeMenu(item) {
            this.$router.push({name:item.name})
        },
        //点击tag删除的功能
        // eslint-disable-next-line no-unused-vars
        handClose(item, _index){
            this.closeTag(item)
          // eslint-disable-next-line no-unused-vars
          const length = this.tags.length - 1
          //删除之后的跳转逻辑
          if (item.name !== this.$route.name){
            return
          }
          //表示的是删除的最后一项
          // eslint-disable-next-line no-undef
          if(index === length){
            this.$route.push({
                // eslint-disable-next-line no-undef
                name:this.tags[index - 1].name
            })
          }else{
            this.$route.push({
                // eslint-disable-next-line no-undef
                name:this.tage[index].name
            })
          }
        }
    }
}
</script>
<style lang="less" scoped>
.tabs {
    padding: 15px;
    .el-tag{
        margin-right: 10px;
        cursor: pointer;
    }
}
</style>