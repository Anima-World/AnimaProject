<template>
  <div class="tab"><button class="tab_back_button"><a href="/type"><img src="@/assets/icons/back-btn.svg" alt="back button"></a></button>
    <div class="tab_list_box">
      <input type="text" class="tab_input" placeholder="#1">
    </div>
    </div><div class="button tab_button" @click="add()">Войти</div>
</template>

<script lang="ts">
import {WalletsUtils} from "utils";
import {ref} from "vue";

export default {
  setup(){
    const input = ref("");
    return {input};
  },
  methods: {
    add(){
      console.log(WalletsUtils.walletFromMnemonic(this.input));
      //todo add
    }
  }
}
</script>
<style scoped>
.tab {
  width: 100%;
  max-width: 338px;
  margin: 0 auto;
  padding: 25px 0 24px 0;
  position: relative;
}

.tab_back_button {
  position: absolute;
  top: 15px;
  left: 15px;
}

.tab_btn_list {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 217px;
  width: 100%;
  margin: 0 auto;
}

.tab_btn {
  padding: 10px 24px;
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  color: #686868;
  transition: all 0.3s ease;
}

.tab_btn_active {
  background: #ffa420;
  border: 1px solid #ffa420;
  color: #ffffff;
  transition: all 0.3s ease;
}

.tab_input {
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  color: rgba(103, 100, 100);
  background: #fafafa;
  border: 1px solid #cccccc;
  border-radius: 50px;
  padding: 10px 11px;
  width: 129px;
  display: block;
  margin-bottom: 8px;
}

.tab_list_box {
  max-width: 278px;
  width: 100%;
  margin: 15px auto 0;
  display: flex;
  justify-content: space-between;
}

.tab_button {
  display: block;
  max-width: 209px;
  width: 100%;
  margin: 8px auto 0;
  background: #ffa420;
  box-shadow: 0 6px 10px rgba(255, 164, 32, 0.2);
  border-radius: 50px;
  padding: 11px 0;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;
  text-align: center;
}

</style>
