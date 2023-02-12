<template>
  <div class="secret"><button class="secret_back_button">
    <div class="button" @click="open('/import/type')">
      <img src="@/assets/icons/back-btn.svg" alt="back button">
    </div>
  </button>
    <h2 class="secret_title">Secret numbers</h2>
    <ul class="secret_list">
      <li class="secret_list_item" style="opacity: 1; transform: scale(1);"><span class="secret_list_item_latter">A</span><input v-model="lines.a" class="secret_input" type="text" placeholder="______" maxlength="6"></li>
      <li class="secret_list_item" style="opacity: 1; transform: scale(1);"><span class="secret_list_item_latter">B</span><input v-model="lines.b" class="secret_input" type="text" placeholder="______" maxlength="6"></li>
      <li class="secret_list_item" style="opacity: 1; transform: scale(1);"><span class="secret_list_item_latter">C</span><input v-model="lines.c" class="secret_input" type="text" placeholder="______" maxlength="6"></li>
      <li class="secret_list_item" style="opacity: 1; transform: scale(1);"><span class="secret_list_item_latter">D</span><input v-model="lines.d" class="secret_input" type="text" placeholder="______" maxlength="6"></li>
      <li class="secret_list_item" style="opacity: 1; transform: scale(1);"><span class="secret_list_item_latter">E</span><input v-model="lines.e" class="secret_input" type="text" placeholder="______" maxlength="6"></li>
      <li class="secret_list_item" style="opacity: 1; transform: scale(1);"><span class="secret_list_item_latter">F</span><input v-model="lines.f" class="secret_input" type="text" placeholder="______" maxlength="6"></li>
      <li class="secret_list_item" style="opacity: 1; transform: scale(1);"><span class="secret_list_item_latter">G</span><input v-model="lines.g" class="secret_input" type="text" placeholder="______" maxlength="6"></li>
      <li class="secret_list_item" style="opacity: 1; transform: scale(1);"><span class="secret_list_item_latter">H</span><input v-model="lines.h" class="secret_input" type="text" placeholder="______" maxlength="6"></li>
    </ul>
    <div class="button" @click="add()">
      <button class="secret_button" style="opacity: 1; transform: scaleX(1);">Войти</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {ref} from "vue";

  export default {
    setup(){
      const lines = ref({
        a: "",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        g: "",
        h: "",
      });
      return {lines};
    },
    methods: {
      add() {
        const lines = this.lines;
        const line = `${lines.a} ${lines.b} ${lines.c} ${lines.d} ${lines.e} ${lines.f} ${lines.g} ${lines.h}`;
        this.worker.send("saveWallet",{
          type:"numbers",
          data:line,
          name:"imported wallet"
        });
        this.open('/home');
      }
    }
  }
</script>
<style scoped>
.secret {
  width: 100%;
  height: 100%;
  max-width: 338px;
  max-height: 400px;
  position: absolute;
  left: calc(50% - 169px);
  top: calc(50% - 200px);
  padding: 26px 0 47px 0;
}

.secret_back_button {
  position: absolute;
  top: 15px;
  left: 15px;
}

.secret_title {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #212121;
}

.secret_list {
  margin-top: 3px;
}

.secret_list_item {
  max-width: 149px;
  margin: 0 auto 12px;
}

.secret_list_item {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 6px 17px 5px 14px;
  background: #f5f5f5;
  border-radius: 50px;
}

.secret_list_item_latter {
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  color: #686868;
}

.secret_input {
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  color: #686868;
  letter-spacing: 10px;
  background-color: transparent;
}

.secret_button {
  display: block;
  max-width: 209px;
  width: 100%;
  margin: 0 auto;
  padding: 11px 0;
  background: #ffa420;
  box-shadow: 0px 6px 10px rgba(255, 164, 32, 0.2);
  border-radius: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;
  text-align: center;
}

</style>
