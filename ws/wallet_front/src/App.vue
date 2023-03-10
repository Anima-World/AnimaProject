<template>
  <RouterView/>
  <div class="border"></div>
  <div v-if="loading||!connected" class="blockUsage">
    <div class="spinner"></div>
    <br><h1>{{!connected?"Connection":"Loading"}}</h1>
  </div>
</template>
<script lang="ts">
  import { RouterView } from 'vue-router'
  import {ref} from "vue";

  export default {
    setup() {
      const loading = ref(true);
      const connected = ref(false);
      return {loading,connected,RouterView};
    },
    async mounted() {
      while (true) {
        try {
          this.connected = (await this.worker.send("isConnected")).result;
          if(!this.clientData.settings)
            this.clientData.settings = (await this.worker.send("getSettings")).result;
          if(this.connected) {
            if(this.loading) {
              const wallets = (await this.worker.send("getWallets")).result;
              this.clientData.wallets = wallets;
              if(Object.keys(wallets).length>0) this.open('/home');
              else this.open('/');
              this.loading = false;
            }
            this.clientData.wallets = (await this.worker.send("getWallets")).result;
            if(this.clientData.settings.wallet)
              this.clientData.accountInfo = (await this.worker.send("getAccountInfo")).result;
            if(this.clientData.settings.wallet)
              this.clientData.tokens = (await this.worker.send("getTokens")).result;
            else if(Object.keys(this.clientData.wallets||{}).length>0) this.clientData.settings.wallet=Object.keys(this.clientData.wallets).shift();
          }
        } catch (e) {
          console.error('app loop error',e);
        }
        this.$forceUpdate();
        await this.delay(1500);
      }
    }
  }
</script>
<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  .blockUsage {
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background-color: rgba(65, 65, 65, 0.75);
    backdrop-filter: blur(10px);
    color: white;
    .spinner {
      margin: 160px auto 0;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      border: 7px solid #f3f3f3;
      border-radius: 50%;
      border-top: 5px solid #ffa420;
      animation: spin 2s linear infinite;
    }
  }
  * {
    text-align: center;
    box-sizing: border-box;
    font-family: "Gilroy", sans-serif;
    text-decoration: none;
    user-select: none;
    -webkit-user-drag: none;
    list-style-type: none;

    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 13px;
  }
  input {
    text-align: left;
  }
  body, #app {
    position: relative;
    left: 0;
    top: 0;
    width: 600px;
    height: 400px;
    overflow: hidden;
    background-color: rgba(230, 230, 230);
    background-image: url("@/assets/background.png");
    background-size: auto 100%;
  }
  .border {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 45px -2px rgb(0,0,0,0.2);
    pointer-events: none;
    z-index: 1001;
  }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-image: url("@/assets/images/bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 100vh;
  }

  input {
    border: none;
    outline: none;
  }
  button,.button {
    border: none;
    outline: none;
    cursor: pointer;
  }
  .app_container {
    max-width: 600px;
    margin: 0 auto;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #525151;
  }
  ::-webkit-scrollbar-thumb {
    background: #ffa420;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #f79c13;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .search {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 109px;
    border: 1px solid #cccccc;
    border-radius: 50px;
    padding: 0 10px;
    margin-left: 38px;
    position: relative;
    z-index: 999;

    input {
      width: 80px;
      font-style: normal;
      font-weight: 400;
      font-size: 9px;
      line-height: 10px;
      color: #686868;
      background: transparent;
      padding: 8px 0;
      outline: none;
    }
  }
  .top {
    padding: 17px 37px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    z-index: 100;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    ul {
      display: flex;
      gap: 13px;
    }
  }
  .top_img_box {
    width: 22px;
    height: 22px;
    background-color: #ffa420;
    border-radius: 50%;
    padding-top: 4px;
  }
  select {
    appearance: none;
    outline: none;
  }
  textarea {
    border: none;
    outline: none;
  }
  @font-face {
    font-family: "Gilroy";
    src: url("@/assets/fonts/Gilroy-Thin.ttf");
    font-weight: 100;
  }
  @font-face {
    font-family: "Gilroy";
    src: url("@/assets/fonts/Gilroy-Light.ttf");
    font-weight: 300;
  }
  @font-face {
    font-family: "Gilroy";
    src: url("@/assets/fonts/Gilroy-Regular.ttf");
    font-weight: 400;
  }
  @font-face {
    font-family: "Gilroy";
    src: url("@/assets/fonts/Gilroy-Medium.ttf");
    font-weight: 500;
  }
  @font-face {
    font-family: "Gilroy";
    src: url("@/assets/fonts/Gilroy-SemiBold.ttf");
    font-weight: 600;
  }
  @font-face {
    font-family: "Gilroy";
    src: url("@/assets/fonts/Gilroy-Bold.ttf");
    font-weight: 700;
  }
  @font-face {
    font-family: "Gilroy";
    src: url("@/assets/fonts/Gilroy-ExtraBold.ttf");
    font-weight: 800;
  }
</style>