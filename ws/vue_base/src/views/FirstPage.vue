<script setup lang="ts">
</script>

<template>
  <div class="menu_box" style="opacity: 1;">
    <img src="@/assets/logo.svg" alt="hand icon" class="main_icon">
    <h1 class="menu_title">Welcome<br>to Anima Wallet</h1>
    <a href="/generate">
      <button class="create_wallet">Generate new wallet</button>
    </a>
    <a href="/import">
      <button class="my_wallet">Add wallet</button>
    </a>
  </div>
</template>

<style scoped>
  .main_icon {
    width: 91px;
    height: 90px;
    margin: 31px auto 0;
  }
  .menu_title {
    max-width: 179px;
    margin: 10px auto 0;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    color: #212121;
  }
  .menu_box {
    max-width: 338px;
    width: 100%;
    height: 400px;
    margin: 0 auto;
  }
  .create_wallet {
    display: block;
    width: 100%;
    max-width: 209px;
    margin: 40px auto 0;
    background: #ffa420;
    box-shadow: 0 6px 10px rgba(255, 164, 32, 0.2);
    border-radius: 50px;
    padding: 11px 0;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 13px;
    color: #ffffff;
    text-align: center;
  }
  .my_wallet {
    width: 100%;
    max-width: 209px;
    margin: 23px auto 0;
    display: block;
    background: #f5f5f5;
    border: 1px solid #cccccc;
    border-radius: 50px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 13px;
    color: #686868;
    text-align: center;
    padding: 10px 0;
  }
</style>