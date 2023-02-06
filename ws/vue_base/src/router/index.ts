import { createRouter, createWebHistory } from 'vue-router';
import FirstPage from '@/views/FirstPage.vue';
import ImportWallet from '@/views/ImportWallet.vue';
import GenerateWallet from '@/views/GenerateWallet.vue';
import Home from '@/views/Home.vue';
import History from '@/views/History.vue';
import WIP from '@/views/WIP.vue';
import ImportType from '@/components/import/type.vue';
import ImportNumbers from '@/components/import/numbers.vue';
import ImportMnemonic from '@/components/import/mnemonic.vue';
import ImportSeed from '@/components/import/seed.vue';
import Settings from "@/views/Settings.vue";
import Tokens from "@/views/Tokens.vue";
import NFT from "@/views/NFT.vue";
import Send from "@/views/Send.vue";
import Services from "@/views/Services.vue";

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
      path: '/home',
      component: Home
    },
    {
      path: '/wip',
      component: WIP
    },
    {
      path: '/services',
      component: Services
    },
    {
      path: '/history',
      component: History
    },
    {
      path: '/settings',
      component: Settings
    },
    {
      path: '/tokens',
      component: Tokens
    },
    {
      path: '/nft',
      component: NFT
    },
    {
      path: '/send',
      component: Send
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
      redirect: '/wip'
    }
  ]
});

export default index;
