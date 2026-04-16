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

import { authority } from '@gitcoffee/api';

/**
 * AI Bot 应用相关 API
 */
export const aibotAppApi = {
  /**
   * 获取应用上下文
   */
  context: authority.aibot.app.contextApi,

  /**
   * 获取应用列表
   */
  list: authority.aibot.app.listApi,

  /**
   * 获取应用列表（简化版）
   */
  listing: authority.aibot.app.listingApi,

  /**
   * 保存应用
   */
  save: authority.aibot.app.saveApi,

  /**
   * 更新应用
   */
  update: authority.aibot.app.updateApi,

  /**
   * 获取应用详情
   */
  detail: authority.aibot.app.detailApi,

  /**
   * 删除应用
   */
  remove: authority.aibot.app.removeApi,
};

/**
 * AI Bot 文件相关 API
 */
export const aibotFileApi = {
  /**
   * 上传文件
   */
  upload: authority.aibot.file.uploadApi,

  /**
   * 获取文件列表
   */
  list: authority.aibot.file.listApi,

  /**
   * 获取文件列表（简化版）
   */
  listing: authority.aibot.file.listingApi,

  /**
   * 保存文件信息
   */
  save: authority.aibot.file.saveApi,

  /**
   * 更新文件信息
   */
  update: authority.aibot.file.updateApi,

  /**
   * 获取文件详情
   */
  detail: authority.aibot.file.detailApi,

  /**
   * 删除文件
   */
  remove: authority.aibot.file.removeApi,
};

/**
 * AI Bot 知识库相关 API
 */
export const aibotKnowledgeApi = {
  /**
   * 获取知识库列表
   */
  list: authority.aibot.knowledge.listApi,

  /**
   * 获取知识库列表（简化版）
   */
  listing: authority.aibot.knowledge.listingApi,

  /**
   * 保存知识库
   */
  save: authority.aibot.knowledge.saveApi,

  /**
   * 更新知识库
   */
  update: authority.aibot.knowledge.updateApi,

  /**
   * 获取知识库详情
   */
  detail: authority.aibot.knowledge.detailApi,

  /**
   * 删除知识库
   */
  remove: authority.aibot.knowledge.removeApi,
};

/**
 * AI Bot 模型相关 API
 */
export const aibotModelApi = {
  /**
   * 获取模型列表
   */
  list: authority.aibot.model.listApi,

  /**
   * 获取模型列表（简化版）
   */
  listing: authority.aibot.model.listingApi,

  /**
   * 保存模型
   */
  save: authority.aibot.model.saveApi,

  /**
   * 更新模型
   */
  update: authority.aibot.model.updateApi,

  /**
   * 获取模型详情
   */
  detail: authority.aibot.model.detailApi,

  /**
   * 删除模型
   */
  remove: authority.aibot.model.removeApi,
};

/**
 * AI Bot 模型版本相关 API
 */
export const aibotModelVersionApi = {
  /**
   * 获取模型版本列表
   */
  list: authority.aibot.modelVersion.listApi,

  /**
   * 获取模型版本列表（简化版）
   */
  listing: authority.aibot.modelVersion.listingApi,

  /**
   * 保存模型版本
   */
  save: authority.aibot.modelVersion.saveApi,

  /**
   * 更新模型版本
   */
  update: authority.aibot.modelVersion.updateApi,

  /**
   * 获取模型版本详情
   */
  detail: authority.aibot.modelVersion.detailApi,

  /**
   * 删除模型版本
   */
  remove: authority.aibot.modelVersion.removeApi,
};
