import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../components/Index.vue'
import Home from '../components/Home.vue'
import Side from '../components/Side.vue'
import PlayList from '../components/PlayList.vue'
import Login from '../components/Login.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path: '/',
            redirect: "/index"
        },
        {
            path: '/index',
            component: Index
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/side',
            component: Side
        },
        {
            path: '/play/list',
            component: PlayList
        },
        {
            path: '/login',
            component: Login
        }
    ]
})
export default router