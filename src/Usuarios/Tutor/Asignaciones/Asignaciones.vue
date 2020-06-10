<template>
  <el-container direction="vertical">
    <!-- Titulo-->
    <el-row>
      <el-col :span="8">
        <div class="grid-content">
          <h1 style="text-align: center;">
            <i class="fa fa-calendar"></i>&nbsp;Asignaciones
          </h1>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <el-input placeholder="Buscar asignación" v-model="search" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>


    <v-card max-width="1200px">
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
            <v-container>
            <v-data-table
                v-model="selected"
                :footer-props="{'items-per-page-options': [5, 10, 15, -1],
                                'items-per-page-text': 'Registros por página:',
                                'items-per-page-all-text': 'Listar todos'}"
                :headers="headers"
                :items="solicitudes"
                :search="search"
                :items-per-page="5"
                :sort-by="['date']"
                item-key="id"
                show-select
                multi-sort
                class="elevation-1"
                loading-text="Cargando.."
                height="250px"
                fixed-header
                ></v-data-table>
            </v-container>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    </v-card>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            title: 'Attractions',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            title: 'Dining',
            active: true,
            items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' },
            ],
          },
          {
            title: 'Education',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            title: 'Family',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            title: 'Health',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            title: 'Office',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            title: 'Promotions',
            items: [
              { title: 'List Item' },
            ],
          },
        ],
      }
    },
  }
</script>
