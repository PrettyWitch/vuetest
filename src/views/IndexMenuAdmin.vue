<template>
  <!--  el-container  构建整个⻚⾯框架。-->
  <el-container style="height: 700px; border: 1px solid #eee">
    <!--  el-aside：构建左侧菜单-->
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <!--        el-menu：左侧菜单内容，常⽤属性：-->
      <!--        :default-openeds：默认展开的菜单，通过菜单的 index 值来关联。-->
      <!--        :default-active：默认选中的菜单，通过菜单的 index 值来关联。-->
      <!--        <el-menu :default-openeds="['1','2', '3']" :default-active="'1-1'">-->
      <!--&lt;!&ndash; el-submenu：可展开的菜单，常⽤属性：-->
      <!--index：菜单的下标，⽂本类型，不能是数值类型。&ndash;&gt;-->
      <!--&lt;!&ndash;  1 Car Service  &ndash;&gt;-->
      <!--          <el-submenu index="1">-->
      <!--&lt;!&ndash;            template：对应 el-submenu 的菜单名。&ndash;&gt;-->
      <!--            <template slot="title"><i class="el-icon-message"></i>Car Service</template>-->
      <!--&lt;!&ndash;            分组&ndash;&gt;-->
      <!--            <el-menu-item-group>-->
      <!--              <template slot="title">分组一</template>-->
      <!--&lt;!&ndash;              el-menu-item：菜单的⼦节点，不可再展开，常⽤属性：&ndash;&gt;-->
      <!--&lt;!&ndash;              index：菜单的下标，⽂本类型，不能是数值类型。&ndash;&gt;-->
      <!--&lt;!&ndash;   GET /offices&ndash;&gt;-->
      <!--              <el-menu-item index="1-1">获取办公室列表</el-menu-item>-->
      <!--&lt;!&ndash;   GET /cars&ndash;&gt;-->
      <!--              <el-menu-item index="1-2">获取所有汽车</el-menu-item>-->
      <!--            </el-menu-item-group>-->
      <!--            <el-menu-item-group title="分组2">-->
      <!--&lt;!&ndash;  GET /offices/{officeUid}/cars &ndash;&gt;-->
      <!--              <el-menu-item index="1-3">获取有关办公室中所有汽车的信息</el-menu-item>-->
      <!--&lt;!&ndash;  GET /offices/{officeUid}/cars/{carUid} &ndash;&gt;-->
      <!--              <el-menu-item index="1-4">获取有关汽车及其在特定办公室中的可用性的信息</el-menu-item>-->
      <!--&lt;!&ndash;  GET /offices/cars/{carUid} &ndash;&gt;-->
      <!--              <el-menu-item index="1-3">获取有关汽车及其在所有办公室的可用性的信息</el-menu-item>-->
      <!--            </el-menu-item-group>-->
      <!--          </el-submenu>-->


      <!-- 2  Booking Servic -->
      <!--          <el-submenu index="2">-->
      <!--            <template slot="title"><i class="el-icon-menu"></i>Booking Service</template>-->
      <!--            <el-menu-item-group>-->
      <!--              <template slot="title">分组一</template>-->
      <!--              <el-menu-item index="2-1">预订汽车 post</el-menu-item>-->
      <!--              <el-menu-item index="2-2">取消预订 DELETE</el-menu-item>-->
      <!--            </el-menu-item-group>-->
      <!--            <el-menu-item-group title="分组2">-->
      <!--              <el-menu-item index="2-3">完成预订</el-menu-item>-->
      <!--            </el-menu-item-group>-->

      <!--&lt;!&ndash;            <el-submenu index="2-4">&ndash;&gt;-->
      <!--&lt;!&ndash;              <template slot="title">选项4</template>&ndash;&gt;-->
      <!--&lt;!&ndash;              <el-menu-item index="2-4-1">选项4-1</el-menu-item>&ndash;&gt;-->
      <!--&lt;!&ndash;            </el-submenu>&ndash;&gt;-->

      <!--          </el-submenu>-->

      <!--  3 Payment Service-->
      <!--          <el-submenu index="3">-->
      <!--            <template slot="title"><i class="el-icon-setting"></i>Report Service</template>-->
      <!--            <el-menu-item-group>-->
      <!--              <template slot="title">分组一</template>-->
      <!--              <el-menu-item index="3-1">添加新车</el-menu-item>-->
      <!--              <el-menu-item index="3-2">删除车辆信息</el-menu-item>-->
      <!--            </el-menu-item-group>-->
      <!--            <el-menu-item-group title="分组2">-->
      <!--              <el-menu-item index="3-3">在办公室添加新车</el-menu-item>-->
      <!--              <el-menu-item index="3-4">从办公室卸下车辆</el-menu-item>-->
      <!--            </el-menu-item-group>-->
      <!--            <el-menu-item-group title="分组3">-->
      <!--              <el-menu-item index="3-5">按型号查看汽车预订的统计信息</el-menu-item>-->
      <!--              <el-menu-item index="3-6">按办公室查看预订统计信息</el-menu-item>-->
      <!--            </el-menu-item-group>-->
      <!--          </el-submenu>-->

      <!--        </el-menu>-->

      <el-menu router :default-openeds="['0','1','2','3','4']">
        <el-submenu v-for="(item, index) in $router.options.routes" :index="index+''" v-if="index>3">
          <template slot="title"><i class="el-icon-message"></i>{{ item.name }}</template>
<!--          :class="$route.path==item2.path?'isActive':''"-->
          <el-menu-item v-for="(item2, index2) in item.children" :index="item2.path"
          :class="$route.path===item2.path?'is-active':''">{{ item2.name }}</el-menu-item>
        </el-submenu>
      </el-menu>

    </el-aside>

<!--    <el-container>-->
<!--      <el-header style="text-align: right; font-size: 12px">-->
<!--        <el-dropdown>-->
<!--          <i class="el-icon-setting" style="margin-right: 15px"></i>-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--            <el-dropdown-item>查看</el-dropdown-item>-->
<!--            <el-dropdown-item>新增</el-dropdown-item>-->
<!--            <el-dropdown-item>删除</el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->
<!--        <span>王小虎</span>-->
<!--      </el-header>-->

      <el-main>
        <!--          <el-table :data="tableData">-->
        <!--            <el-table-column prop="date" label="日期" width="140">-->
        <!--            </el-table-column>-->
        <!--            <el-table-column prop="name" label="姓名" width="120">-->
        <!--            </el-table-column>-->
        <!--            <el-table-column prop="address" label="地址">-->
        <!--            </el-table-column>-->
        <!--          </el-table>-->
        <router-view></router-view>
      </el-main>
<!--    </el-container>-->

  </el-container>
</template>

<script>
export default {
  name: "IndexMenuAdmin"
}
</script>

<style scoped>

</style>