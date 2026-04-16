/**
 * Copyright (c) 2025-2099 GitCoffee All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

<template>
  <AiChat
    :is-logged-in="settingsStore.isLoggedIn"
    :user-info="settingsStore.userInfo"
    @login="handleLogin"
    @logout="handleLogout"
  />
</template>

<script setup lang="ts">
import { AiChat } from '@gitcoffee/chatbot-ui';
import { APP_INFO } from '../config/config';
import { useAppStore } from '@gitcoffee/app';
import { onMounted } from 'vue';
import { useSettingsStore } from '../stores';

// 使用应用状态
const appStore = useAppStore();
const settingsStore = useSettingsStore();

// 处理登录
const handleLogin = () => {
  settingsStore.login();
};

// 处理登出
const handleLogout = async () => {
  await settingsStore.logout();
};

// 在组件挂载时设置应用信息并初始化设置
onMounted(() => {
  appStore.updateAppInfo(APP_INFO);
  settingsStore.initialize();
});
</script>

<style scoped>
/* 可以在这里添加组件的样式 */
</style>