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

import { defineStore } from '@gitcoffee/store';
import { getItem, setItem, removeItem } from '@gitcoffee/storage';
import { search } from '@gitcoffee/api';
import { APP_SETTING } from '../config/config';
import { settingData, useTheme } from '@gitcoffee/app';
import { checkLoginStatus, fetchUserInfo, userLogout } from '../api';

export interface UserInfo {
  nickname: string;
  credits: number;
  avatar?: string;
  userId?: string;
  username?: string;
  email?: string;
  phone?: string;
}

export interface AppSettings {
  language: string;
  theme: string;
  trustedDomains: string[];
  smartSearch: boolean;
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // 用户信息
    userInfo: {
      nickname: '',
      credits: 0,
    } as UserInfo,
    // 应用设置
    appSettings: {
      language: 'zh',
      theme: 'light',
      trustedDomains: [],
      smartSearch: APP_SETTING.smartSearch,
    } as AppSettings,
    // 加载状态
    isLoading: false,
    isLoggedIn: false,
    token: '',
  }),

  getters: {
    // 计算用户是否登录
    getIsLoggedIn: (state) => state.isLoggedIn,
    // 获取用户信息
    getUserInfo: (state) => state.userInfo,
    // 获取应用设置
    getAppSettings: (state) => state.appSettings,
    // 获取受信任域名
    getTrustedDomains: (state) => state.appSettings.trustedDomains,
  },

  actions: {
    // 初始化设置
    async initialize() {
      this.isLoading = true;
      try {
        // 首先检查登录状态
        await this.checkAndLoadLoginStatus();
        // 加载应用设置
        await this.loadAppSettings();
      } catch (error) {
        console.error('Failed to initialize settings:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // 检查并加载登录状态
    async checkAndLoadLoginStatus() {
      try {
        // 调用登录状态检查API
        const loginStatus = await checkLoginStatus();

        if (loginStatus.isLoggedIn) {
          this.isLoggedIn = true;
          this.token = loginStatus.token || '';

          // 获取详细的用户信息
          await this.loadUserInfo();
        } else {
          this.isLoggedIn = false;
          this.token = '';
          // 尝试从本地存储加载（作为备用）
          await this.loadUserInfoFromStorage();
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
        // 出错时尝试从本地存储加载
        await this.loadUserInfoFromStorage();
      }
    },

    // 从API加载用户信息
    async loadUserInfo() {
      try {
        // 从API获取用户信息
        const userData = await fetchUserInfo();
        if (userData) {
          this.userInfo = {
            nickname: userData.nickname || userData.username || '',
            credits: userData.credits || 0,
            avatar: userData.avatar,
            userId: userData.userId || userData.id,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
          };
          this.isLoggedIn = !!this.userInfo.nickname;
          // 保存到本地存储
          await setItem('user', JSON.stringify(this.userInfo));
          return this.userInfo;
        }
      } catch (error) {
        console.error('Failed to load user info from API:', error);
      }
      return null;
    },

    // 从本地存储加载用户信息
    async loadUserInfoFromStorage() {
      try {
        const savedUser = await getItem('user');
        if (savedUser) {
          this.userInfo = JSON.parse(savedUser);
          this.isLoggedIn = !!this.userInfo.nickname;
          return this.userInfo;
        }
      } catch (error) {
        console.error('Failed to load user info from storage:', error);
      }
      return null;
    },

    // 保存用户信息
    async saveUserInfo(userData: UserInfo) {
      this.userInfo = userData;
      this.isLoggedIn = !!userData.nickname;
      await setItem('user', JSON.stringify(userData));
    },

    // 登录 - 跳转到登录页面
    login() {
      // 保存当前页面URL，以便登录后返回
      const currentUrl = window.location.href;
      sessionStorage.setItem('redirectUrl', currentUrl);

      // 打开登录页面
      window.open('https://dreamingai.exmay.com/exmay/dreamingai/center/home', '_blank');
    },

    // 登出
    async logout() {
      try {
        // 调用登出API
        await userLogout();

        // 清除用户信息
        this.userInfo = {
          nickname: '',
          credits: 0,
        };
        this.isLoggedIn = false;
        this.token = '';

        // 移除本地存储
        await removeItem('user');
        await removeItem('token');

        return true;
      } catch (error) {
        console.error('Failed to logout:', error);
        return false;
      }
    },

    // 刷新用户信息
    async refreshUserInfo() {
      if (this.isLoggedIn) {
        await this.loadUserInfo();
      }
    },

    // 加载应用设置
    async loadAppSettings() {
      try {
        // 从本地存储加载应用设置
        const savedSettings = await getItem('appSettings');
        if (savedSettings) {
          this.appSettings = { ...this.appSettings, ...JSON.parse(savedSettings) };
        }
      } catch (error) {
        console.error('Failed to load app settings:', error);
      }
    },

    // 保存应用设置
    async saveAppSettings(settings: Partial<AppSettings>) {
      this.appSettings = { ...this.appSettings, ...settings };
      await setItem('appSettings', JSON.stringify(this.appSettings));
    },

    // 保存受信任域名
    async saveTrustedDomains(domains: string[]) {
      this.appSettings.trustedDomains = domains;
      await this.saveAppSettings(this.appSettings);
    },

    // 切换语言
    async changeLanguage(language: string) {
      await this.saveAppSettings({ language });
    },

    // 切换主题
    async changeTheme(theme: string) {
      await this.saveAppSettings({ theme });
      // 同时更新 settingData 中的主题设置，确保两处数据同步
      if (settingData.value) {
        settingData.value.theme = theme;
      }
      // 应用主题
      const { setTheme } = useTheme();
      setTheme();
    },
  },
});
