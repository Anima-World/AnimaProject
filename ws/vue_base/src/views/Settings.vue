<template>
  <div class="settings" >
    <div class="top">
      <ul>
        <li>
          <a href="/home">
            <button class="w-[22px] h-[22px] bg-[#ffa420] rounded-full flex items-center justify-center">
              <img src="@/assets/icons/home.svg" alt="home icon"/>
            </button>
          </a>
        </li>
      </ul>
    </div>

    <div class="settings_main">
      <ul class="setting_main_list">
        <a href="/settings/general">
          <li class="setting_main_item">
            <p>Общие</p>
            <img src="@/assets/icons/down-arrow.svg" alt="down" />
          </li>
        </a>
        <a href="/settings/account">
          <li class="setting_main_item" >
            <p>Аккаунты</p>
            <img src="@/assets/icons/down-arrow.svg" alt="down" />
          </li>
        </a>
      </ul>
    </div>

    <div class="second_footer_wrapper">
      <div class="second_footer">
        <div class="second_footer_children">
          <div class="second_footer_box">
            <h2>Условия пользования</h2>
            <h2>Поддержка</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.setting_main_item {
  padding: 14px 37px 14px 37px;
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.setting_main_item p {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #212121;
}

.second_footer_box h2 {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
}
.second_footer {
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
.second_footer_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px 0 64px;
  position: absolute;
  width: 100%;
  bottom: 19px;
}
</style>