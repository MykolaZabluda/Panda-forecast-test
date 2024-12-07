<template>
  <div class="header justify-between w-100">
    <div class="header-left align-center">
      <img src="@/assets/logo.png" class="logo" alt="logo" />
      <p class="title white bold">{{ $t('general.header-title') }}</p>
    </div>
    <div class="header-center">
      <div class="button-select align-center h-100">
        <div class="button-select-all">
          <router-link class="nav-button" to="/">
            {{ $t('general.header-all-btn') }}
          </router-link>
        </div>
        <div class="button-select-favorite">
          <router-link class="nav-button" to="/favorite">
            {{ $t('general.header-select-btn') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="header-right align-center">
      <select v-model="$i18n.locale" class="language-dropdown">
        <option value="en">English</option>
        <option value="ua">Українська</option>
      </select>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: auto;
  background: #a47764;

  &-left {
    padding: 5px 10px;

    .logo {
      width: 80px;
      height: auto;
    }

    .title {
      font-size: 20px;
    }
  }

  &-right {
    .language-dropdown {
      margin-right: 10px;
      padding: 5px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }
}
</style>