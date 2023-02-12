<template>
  <div class="enter">
    <button class="enter_back_button">
      <div class="button" @click="open('/import/type')">
        <img src="@/assets/icons/back-btn.svg" alt="back button">
      </div>
    </button>
    <h2 class="enter_title">
      Enter seed of your account
    </h2>
    <div class="enter_input_box">
      <input class="enter_input" v-model="seed" type="text" placeholder="rBD...45" />
      <div class="enter_input_icon">S</div>
    </div>
    <div class="button" @click="add()">
      <button class="enter_button">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {ref} from "vue";

  export default {
    setup(){
      const seed = ref("");
      return {seed};
    },
    methods:{
      add(){
        this.worker.send("saveWallet",{type:"seed",data:this.seed,name:"imported wallet"});
        this.open("/home");
      }
    }
  }
</script>
<style scoped>
.enter {
  width: 100%;
  height: 100%;
  max-width: 338px;
  max-height: 400px;
  position: absolute;
  left: calc(50% - 169px);
  top: calc(50% - 200px);

  padding: 15px;
}

.enter_title {
  max-width: 220px;
  width: 100%;
  margin: 0 auto;
  margin-top: 79px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #212121;
}

.enter_input_box {
  max-width: 209px;
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fafafa;
  border: 1px solid #cccccc;
  border-radius: 50px;
}

.enter_input {
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 10px;
  color: #686868;
  padding: 13px 24px 12px;
  border-radius: 50px 0 0 50px;
}

.enter_input_icon {
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: #212121;
  padding: 10px 15px 9px 20px;
  border-radius: 0px 50px 50px 0;
  background: #cccccc;
}

.enter_button {
  max-width: 209px;
  width: 100%;
  padding: 11px 0;
  display: block;
  margin: 0 auto;
  background: #ffa420;
  box-shadow: 0px 6px 10px rgba(255, 164, 32, 0.2);
  border-radius: 50px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;
  text-align: center;
  margin-top: 21px;
}

</style>
