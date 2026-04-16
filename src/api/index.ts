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
import { search, auth, authority } from '@gitcoffee/api';

export {
  aibotAppApi,
  aibotFileApi,
  aibotKnowledgeApi,
  aibotModelApi,
  aibotModelVersionApi,
} from './aibot';

const intervalTime: number = 1000 * 30;

/**
 * 检查用户登录状态
 * @returns 登录状态检查结果
 */
export const checkLoginStatus = async (): Promise<{
  isLoggedIn: boolean;
  token?: string;
  userInfo?: any;
}> => {
  try {
    const res = await auth.isLoginApi({});
    if (res && res.data) {
      const { login, token, ...userInfo } = res.data;
      return {
        isLoggedIn: login,
        token,
        userInfo
      };
    }
  } catch (error) {
    console.error('Failed to check login status:', error);
  }
  return { isLoggedIn: false };
};

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const fetchUserInfo = async (): Promise<any> => {
  try {
    const res = await auth.getUserInfoApi({});
    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }
  return null;
};

/**
 * 用户登出
 */
export const userLogout = async (): Promise<boolean> => {
  try {
    await auth.logoutApi({});
    return true;
  } catch (error) {
    console.error('Failed to logout:', error);
    return false;
  }
};

export const initSeekFlow = async () => {
  // 检查登录状态
  await search.user.isLoginApi({});

  const searchPlatformList = await search.platform.listingApi({});

  startSeekFlow(intervalTime);
};

export const startSeekFlow = async (intervalTime: number) => {
  search.client.updateApi({});
};
