<template>
  <div>
    <div class="main__wrapper main">
      <div class="head">
        <div class="main__top app_container">
        <span>
          <div class="button" @click="open('/history')">
            <img src="@/assets/icons/time.svg" alt="time icon" />
          </div>
        </span>
          <div>
            <div class="top__title" style="font-size: 16px">{{name}}</div>
            <div class="top__wallet-info button" @click="copy()">
              <span style="font-size: 11px">{{address}}</span>
              <span>
                <img src="@/assets/icons/copy-document.svg" alt="copy clipboard" />
              </span>
            </div>
          </div>
          <div>
            <div class="button" @click="open('/settings')">
              <img src="@/assets/icons/setting.svg" alt="setting icon" />
            </div>
          </div>
        </div>
      </div>
      <div class="content main_content app_container">
        <h1 class="track_value">
          {{ balance }}
          <img class="w-6 h-6" src="@/assets/images/track-icon.svg" alt="track icon" />
        </h1>
        <h2 class="track_usd">${{balanceUsd}} USD (WIP)</h2>
        <ul class="flex items-center justify-between w-[242px] mx-auto mt-6">
          <li>
            <div class="button" @click="open('/receive')">
              <div class=" w-10 h-10 bg-[#ffa420] rounded-full p-2 mx-auto">
                <img class="w-6 h-6" src="@/assets/icons/receive.svg" alt="receive" />
              </div>
              <h3 class="font-medium text-[#212121] text-[11px] text-center mt-[7px]">
                Receive
              </h3>
            </div>
          </li>
          <li>
            <div class="button" @click="open('/swap')">
              <div class=" w-10 h-10 bg-[#ffa420] rounded-full p-2 mx-auto">
                <img class="w-6 h-6" src="@/assets/icons/swap.svg" alt="swap" />
              </div>
              <h3 class="font-medium text-[#212121] text-[11px] text-center mt-[7px]">
                SWAP
              </h3>
            </div>
          </li>
          <li>
            <div class="button" @click="open('/send')">
              <div class=" w-10 h-10 bg-[#ffa420] rounded-full p-2 mx-auto">
                <img class="w-6 h-6" src="@/assets/icons/send.svg" alt="send" />
              </div>
              <h3 class="font-medium text-[#212121] text-[11px] text-center mt-[7px]">
                Send
              </h3>
            </div>
          </li>
        </ul>
      </div>

      <div class="footer_wrapper" style="opacity: 1;">
        <div class="footer">
          <div class="app_container">
            <div class="footer_img_box">
              <div class="button" @click="open('/services')">
                <img src="@/assets/images/footer.svg" alt="hand">
              </div>
            </div>
            <div class="footer_children">
              <div class="footer_box">
                <h2 class="footer_title">
                  <div class="button" @click="open('/tokens')">Tokens</div>
                </h2>
                <h2 class="footer_title">
                  <div class="button" @click="open('/nft')">NFTs</div>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const balance = ref(0);
    const balanceUsd = ref(0);
    const address = ref("");
    const name = ref("");
    const timer = ref();
    return {
      balance,balanceUsd,address,name,timer
    }
  },
  mounted() {
    this.update();
    this.timer = setTimeout(()=>{
      try {
        this.update()
      } catch (e) {
        console.error('home update error',e);
      }
    },500);
  },
  unmounted() {
    clearTimeout(this.timer);
  },
  methods: {
    async copy(){
      await navigator.clipboard.writeText(this.address);
    },
    update() {
      this.balance = this.clientData.accountInfo?.balance;
      this.balanceUsd = 0;//todo
      this.address = this.clientData.settings?.wallet;
      this.name = (this.clientData.wallets||{})[this.address]?.name;
    }
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
  padding-top: 53px;
  padding-bottom: 83px;
}
.track_value {
  width: max-content;
  height: 43px;
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

.footer {
  background: linear-gradient(
      115.16deg,
      #ffb82f 16.26%,
      #ffa623 34.04%,
      #ffa623 69.45%,
      #ffb72e 84.05%
  );
  position: absolute;
  height: 57px;
  width: 100%;
  bottom: 0;
}

.footer_img_box {
  width: 85px;
  height: 85px;
  position: absolute;
  top: -42px;
  left: calc(50% - 42.5px);
}


</style>
