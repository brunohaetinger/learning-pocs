import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import ToDoList from '../components/ToDoList.vue';

const routes = [
  { 
    path: '/', 
    component: HelloWorld,
    props: { msg: 'Vite + Vue' }
  },
  { 
    path: '/todo', 
    component: ToDoList 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
