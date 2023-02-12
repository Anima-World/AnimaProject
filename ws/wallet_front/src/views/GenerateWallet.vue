<template>
  <div class="login">
    <div class="address_top">
      <div class="address_top_left">
        <div class="login_back_button button">
          <div class="button" @click="open('/')">
            <img src="@/assets/icons/back-btn.svg" alt="back button">
          </div>
        </div>
        <div class="address_button_refresh button" @click="update()">
          <img src="@/assets/icons/refresh.svg" alt="refresh">
        </div>
      </div>
      <div class="address_top_right">
        <div class="address_button_clipboard button" @click="copy()">
          <img src="@/assets/icons/clipboard.svg" alt="clipboard">
        </div>
      </div>
    </div>
    <form action="" class="login_form">
      <div class="login_form_item">
        <h2 class="login_label">Address</h2>
        <p class="address_item_value">{{ address }}</p>
      </div>
      <div class="login_form_item">
        <h2 class="login_label">Seed</h2>
        <p class="address_item_value">{{ seed }}</p>
      </div>
      <div class="login_button button" @click="save()">Save and login</div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import {Wallet} from "xrpl";
export default {
  setup() {
    return {
      address:ref(""),
      seed:ref(""),
    }
  },
  mounted() {
    this.update();
  },
  methods: {
    async update() {
      const wallet = Wallet.generate();
      this.address=wallet.classicAddress;
      this.seed=wallet.seed;
    },
    async copy(){
      const data = JSON.stringify({
        address:this.address,
        seed:this.seed,
      },null,2)
      await navigator.clipboard.writeText(data);
    },
    async save() {
      //todo loading screen?
      await this.worker.send('saveWallet',{type:"seed",data:this.seed,name:"generated wallet"})
      this.open('home');
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 35px;
}
.address_top {
  display: flex;
  width: 200px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
}
.address_top_left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.login_form {
  padding: 0;
  margin: 0;
}
.login_form_item {
  flex-direction: column;
  justify-content: space-between;
  max-height: 56px;
  max-width: 211px;
  margin: 5px auto 0;
  width: 100%;
}
.login_label {
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 25px;
  text-align: center;
  color: #686868;
}
.address_item_value {
  max-width: 250px;
  width: 100%;
  word-wrap: break-word;
  margin-top: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: #212121;
}
.login_button {
  display: block;
  max-width: 209px;
  width: 100%;
  margin: 35px auto 0;
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
</style>
