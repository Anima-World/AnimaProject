<script setup>
  const imageUrl = new URL(`@/assets/images/nft/nft-1.PNG`, import.meta.url).href
</script>
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
      </ul>
    </div>
    <div class="nft">
      <div class="nft_list">
        <li style="opacity: 1; transform: scale(1);">
          <div class="nft_card"><a href="/nft/1"><img :src="imageUrl" alt="nft image"><h2 class="nft_card_title">Consectetur estcofjdf</h2></a></div>
        </li>
        <li style="opacity: 1; transform: scale(1);">
          <div class="nft_card"><a href="/nft/1"><img :src="imageUrl" alt="nft image"><h2 class="nft_card_title">Consectetur estcofjdf</h2></a></div>
        </li>
        <li style="opacity: 1; transform: scale(1);">
          <div class="nft_card"><a href="/nft/1"><img :src="imageUrl" alt="nft image"><h2 class="nft_card_title">Consectetur estcofjdf</h2></a></div>
        </li>
        <li style="opacity: 1; transform: scale(1);">
          <div class="nft_card"><a href="/nft/1"><img :src="imageUrl" alt="nft image"><h2 class="nft_card_title">Consectetur estcofjdf</h2></a></div>
        </li>
        <li style="opacity: 1; transform: scale(1);">
          <div class="nft_card"><a href="/nft/1"><img :src="imageUrl" alt="nft image"><h2 class="nft_card_title">Consectetur estcofjdf</h2></a></div>
        </li>
        <li style="opacity: 1; transform: scale(1);">
          <div class="nft_card"><a href="/nft/1"><img :src="imageUrl" alt="nft image"><h2 class="nft_card_title">Consectetur estcofjdf</h2></a></div>
        </li>
        <li style="opacity: 1; transform: scale(1);">
          <div class="nft_card"><a href="/nft/1"><img :src="imageUrl" alt="nft image"><h2 class="nft_card_title">Consectetur estcofjdf</h2></a></div>
        </li>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nft {
  padding: 10px 38px 0 38px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 342px;
}
.nft_list {
  display: grid;
  grid-template-columns: auto auto auto;
  list-style-type: none;
}
.nft_card {
  width: 115px;
  margin: 0 auto 22px;
}
.nft_card_title {
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: #212121;
  margin-top: 8px;
}
</style>