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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
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
.main_content {
  padding-top: 53px;
  padding-bottom: 83px;
}
.head {
  border-bottom: 1px solid #ccc;
  height: 60px;
  overflow: hidden;
}
</style>
