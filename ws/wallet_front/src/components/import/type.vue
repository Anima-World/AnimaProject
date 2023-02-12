<template>
  <div class="type">
    <ul class="type_list">
      <li class="type_list_item">
        <div class="button" @click="open('/')">
          <img src="@/assets/icons/back-btn.svg" alt="back button"/>
        </div>
      </li>
      <li class="type_list_item">
        <div class="button" @click="open('/import/seed')">Family Seed</div>
      </li>
      <li class="type_list_item">
        <div class="button" @click="open('/import/mnemonic')">Mnemonic phrase</div>
      </li>
      <li class="type_list_item">
        <div class="button" @click="open('/import/numbers')">Secret numbers</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.type {
  width: 100%;
  height: 100%;
  max-width: 338px;
  max-height: 400px;
  margin: 0 auto;
}
.type_list {
  margin-top: 80px;
  max-height: 145px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.type_list_item {
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 50px;
  text-align: center;
  color: #686868;
  transition: all 0.5s ease;
}
.type_list_item:hover {
  color: $primary-yellow;
}
</style>
