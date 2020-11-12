/*
 * @Author: your name
 * @Date: 2020-10-30 20:20:24
 * @LastEditTime: 2020-11-12 15:31:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blogc:\Users\Administrator.DESKTOP-19074G5\Desktop\testblog\moba\admin\src\router.js
 */
import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';
// 分类
import CategoryEdit from './views/CategoryEdit.vue';
import CategoryList from './views/CategoryList.vue';
// 物品
import ItemEdit from './views/ItemEdit.vue';
import ItemList from './views/ItemList.vue';
// 英雄
import HeroEdit from './views/HeroEdit.vue';
import HeroList from './views/HeroList.vue';
// 文章
import ArticleEdit from './views/ArticleEdit.vue';
import ArticleList from './views/ArticleList.vue';
// 广告
import AdEdit from './views/AdEdit.vue';
import AdList from './views/AdList.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            // name: 'main',
            component: Main,
            children: [
                { path: '/categories/create', component: CategoryEdit },
                { path: '/categories/edit/:id', component: CategoryEdit, props: true },
                { path: '/categories/list', component: CategoryList },

                { path: '/items/create', component: ItemEdit },
                { path: '/items/edit/:id', component: ItemEdit, props: true },
                { path: '/items/list', component: ItemList },

                { path: '/heroes/create', component: HeroEdit },
                { path: '/heroes/edit/:id', component: HeroEdit, props: true },
                { path: '/heroes/list', component: HeroList },

                { path: '/Articles/create', component: ArticleEdit },
                { path: '/Articles/edit/:id', component: ArticleEdit, props: true },
                { path: '/Articles/list', component: ArticleList },

                { path: '/ads/create', component: AdEdit },
                { path: '/ads/edit/:id', component: AdEdit, props: true },
                { path: '/ads/list', component: AdList },
            ]
        },
    ]
})
