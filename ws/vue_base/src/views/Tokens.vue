<template>
  <div>
    <div class="top" style="opacity: 1; transform: none;">
      <ul>
        <li>
          <div class="w-[22px] h-[22px] bg-[#ffa420] rounded-full flex items-center justify-center">
            <div class="button" @click="open('/home')">
              <img src="@/assets/icons/home.svg" alt="home icon">
            </div>
          </div>
        </li>
        <li>
<!--          <div class="search w-[22px] h-[22px] flex items-center"><img src="@/assets/icons/search.svg" alt="search"><input type="text" placeholder="Поиск"></div>-->
        </li>
      </ul>
<!--      <div class="filter_box">-->
<!--        <img src="@/assets/icons/filter.svg" alt="filter icon">-->
<!--      </div>-->
    </div>
    <div class="tokens">
      <ul class="tokens_list">
        <li style="opacity: 1; transform: scale(1);" v-for="(token,index) in tokens" :key="index">
          <div class="tokens_item">
            <div class="tokens_left"><img src="@/assets/images/tokens/1.svg" alt="image client">
              <div class="tokens_info">
                <h2 class="wallet_addres">{{ token }}</h2>
                <p class="transaction_type">{{ token }}</p>
              </div>
            </div>
            <div class="tokens_right">
              <p class="transaction_amount">{{ token }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="js">
import {ref} from "vue";

export default {
  setup(){
    const tokens = ref([]);
    return  {tokens};
  },
  mounted() {
    this.tokens=this.clientData.tokens;
  }
}
</script>
<style scoped>
.tokens_date,.wallet_addres {
  text-align: left;
}
.tokens {
  position: relative;
  height: 338px;
  overflow-x: hidden;
  overflow-y: auto;
}
.filter_icon {
  position: relative;
  z-index: 1000;
}
.all_box_title {
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  color: #212121;
}
.tokens_top_image {
  width: 100px;
  height: 100px;
  position: absolute;
  top: -49px;
  z-index: 999;
  left: calc(50% - 50px);
}
.tokens_date {
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #212121;
  padding-left: 38px;
  margin-top: 13px;
}
.tokens_list {
  margin-top: 7px;
}
.tokens_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 38px;
  border-bottom: 1px solid #cccccc;
}
.tokens_left {
  display: flex;
  align-items: center;
  gap: 7px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ffa420;
  }
  .wallet_addres {
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    color: #212121;
  }
  .transaction_type {
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #686868;
    margin-top: 2px;
  }
}
.tokens_right {
  display: flex;
  align-items: center;
  gap: 6px;

  .transaction_amount {
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;
    text-align: right;
    color: #ffa420;
  }
}
.history_modal_content {
  display: flex;
  flex-direction: column;
  height: 260px;
  justify-content: space-between;
}

.history_modal_title {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #212121;
  text-align: center;
}

.history_modal_date {
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #686868;
  text-align: center;
  margin-top: 7px;
}

.history_modal_info {
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  line-height: 25px;
  color: #ffa420;
  text-align: center;
}

.history_modal_box {
  width: 100%;
  max-width: 45px;
  margin: 0 auto;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
}

.history_modal_subtitle {
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  color: #212121;
}

.history_modal_list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.history_modal_textarea {
  padding-bottom: 5px;
  border-bottom: 1px solid #cccccc;
  resize: none;
  width: 100%;
  margin-top: 16px;
  outline: none;
  font-style: normal;
  font-weight: 500;
  font-size: 9px;
  line-height: 11px;
  color: #686868;
}

</style>