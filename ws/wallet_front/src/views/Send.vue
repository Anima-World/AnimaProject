<template>
  <div>
    <div class="main__wrapper main">
      <div class="head">
        <div class="main__top app_container">
          <span>
            <div class="button w-[22px] h-[22px] bg-[#ffa420] rounded-full flex items-center justify-center" @click="open('/home')">
              <img src="@/assets/icons/home.svg" alt="home icon">
            </div>
          </span>
        </div>
      </div>
      <div class="content main_content app_container">
        <div class="send">
          <div class="send_top_title">
            <select v-model="selected" @change="updateCurrency()">
              <option value="XRP">XRP</option>
              <option v-for="token in tokens" :value="token" >{{token.currency.length>30?hex2str(token.currency):token.currency}}</option>
            </select>
            <img src="@/assets/icons/down-arrow.svg" alt="down icon" />
          </div>
          <h2 class="send_value">{{balance}}</h2>
          <h3 class="send_deposit">$0.00 USD(WIP)</h3>
          <div class="send_form_box">
            <form action="" class="send_form">
              <label>Address</label>
              <input type="text" id="Адрес получателя" placeholder="rfBD...45" />
              <label>Memo</label>
              <input
                  type="text"
                  id="Примечание"
                  placeholder="Memo input"
              />
              <button type="button" class="send_button">
                <a href="/check">Send</a>
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";
import {hex2str} from "utils";
import {convertHexToString} from "xrpl";
export default {
  methods: {
    convertHexToString,
    hex2str,
    updateCurrency(){
      if(this.selected=="XRP")
        this.balance=this.clientData.accountInfo.balance;
      else this.balance=this.selected.balance;
    }
  },
  setup(){
    const tokens = ref([]);
    const balance = ref(0);
    const selected = ref("XRP");
    return {tokens,selected,balance};
  },
  mounted() {
    this.tokens=this.clientData.tokens;
    this.balance=this.clientData.accountInfo.balance;
  }
}
</script>

<style scoped>
.footer_box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 14px;
}
.footer_title {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
  text-align: center;
}
.main__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 35px;
  background-color: #fff;
}
.head {
  background-color: #fff;
}
.top__title {
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #212121;
  text-align: center;
}
.top__wallet-info {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #686868;
}
.main_content {
}
.track_value {
  width: 90px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 5px;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 43px;
  color: #212121;
  img {
    width: 25px;
    height: 20px;
  }
}
.track_usd {
  margin-top: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #686868;
  text-align: center;
}
.head {
  border-bottom: 1px solid #ccc;
  height: 60px;
  overflow: hidden;
}
.send {
  background-image: url("@/assets/images/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-top: 15px;
  padding-bottom: 36px;
}
.send_top_title {
  display: flex;
  align-items: center;
  gap: 3px;
  justify-content: center;
  h2,select {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    color: #ffa420;
  }
}
.send_value {
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 43px;
  color: #212121;
  text-align: center;
}
.send_deposit {
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #686868;
  text-align: center;
}
.send_form_box {
  width: 211px;
  margin: 0 auto;
}
.send_form {
  margin-top: 15px;
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #212121;
  }

  input {
    width: 100%;
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 10px;
    color: #686868;
    margin-top: 8px;
    margin-bottom: 15px;
    padding: 13px 24px 12px 24px;
    border: 1px solid #cccccc;
    border-radius: 50px;
    outline: none;
  }
  .send_button {
    width: max-content;
    background-color: #ffa420;
    box-shadow: 0 6px 10px rgba(255, 164, 32, 0.2);
    border-radius: 50px;
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 13px;
    color: #ffffff;
    padding: 11px 76px;
  }
}
</style>
