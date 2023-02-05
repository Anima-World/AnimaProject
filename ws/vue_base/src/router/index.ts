import { createRouter, createWebHistory } from 'vue-router';
import FirstPage from '../views/FirstPage.vue';
import ImportWallet from '../views/ImportWallet.vue';
import GenerateWallet from '../views/GenerateWallet.vue';
import ImportType from '../components/import/type.vue';
import ImportNumbers from '../components/import/numbers.vue';
import ImportMnemonic from '../components/import/mnemonic.vue';
import ImportSeed from '../components/import/seed.vue';

const index = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: FirstPage
    },
    {
      path: '/generate',
      component: GenerateWallet
    },
    {
      path: '/import',
      component: ImportWallet,
      redirect: '/import/type',
      children: [
        {
          path: 'type',
          component: ImportType
        },
        {
          path: 'numbers',
          component: ImportNumbers
        },
        {
          path: 'mnemonic',
          component: ImportMnemonic
        },
        {
          path: 'seed',
          component: ImportSeed
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

export default index;
