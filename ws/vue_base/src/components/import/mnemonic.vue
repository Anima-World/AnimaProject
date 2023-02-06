<template>
  <div class="tab"><button class="tab_back_button"><a href="/type"><img src="@/assets/icons/back-btn.svg" alt="back button"></a></button>
    <ul class="tab_btn_list">
      <li class="tab_btn_item"><button class="tab_btn tab_btn_active">12</button></li>
      <li class="tab_btn_item"><button class="tab_btn">16</button></li>
      <li class="tab_btn_item"><button class="tab_btn">24</button></li>
    </ul>
    <div class="tab_list_box">
      <div class="tab_list_box_left">
        <ul class="tab_inputs_list">
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#1"></li>
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#2"></li>
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#3"></li>
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#4"></li>
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#5"></li>
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#6"></li>
        </ul>
      </div>
      <div class="tab_list_box_right">
        <ul class="tab_inputs_list">
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#7"></li>
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#8"></li>
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#9"></li>
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#10"></li>
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#11"></li>
          <li class="tab_inputs_item"><input type="text" class="tab_input" placeholder="#12"></li>
        </ul>
      </div>
    </div><a href="/main"><button class="tab_button">Войти</button></a></div>
</template>

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
