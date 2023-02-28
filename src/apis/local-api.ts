/**
 * 提供对接博客园各种可用的基础 API，获取的数据来自于 #mainContent
 *
 * @author Himmelbleu
 * @date 2022 年 1 月 14 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";
import * as Parser from "@/services/parse-html";

/**
 * 获取侧边栏的部分随笔分类列表。直接调用解析函数解析 home 节点下的侧边栏。
 */
export function getCabinetColumn() {
  return Parser.parseCabinetColumn($("#home").find("#blog-sidecolumn").html());
}

/**
 * 获取侧边栏的博主信息。直接调用解析函数解析 home 节点下的侧边栏。
 */
export function getAuthorData() {
  return Parser.parseAuthorData($("#home").find("#blog-news").html());
}

/**
 * 获取侧边栏博客的数据。直接调用解析函数解析 home 节点下的侧边栏。
 */
export function getMasterData() {
  return Parser.parseMasterData($("#home").find(".blogStats").html());
}

/**
 * 获取侧边栏阅读排行榜列表，不获取通过请求获取阅读排行榜，直接调用解析函数解析 home 节点下的侧边栏。
 */
export function getCabinetTopList() {
  return Parser.parseCabinetTopList($("#home").find("#sidebar_topviewedposts").html());
}

/**
 * 获取侧边栏博客排行信息。
 */
export function getCabinetRankList() {
  return Parser.parseCabinetRankList($("#home").find("#sidebar_scorerank").html());
}

/**
 * 获取相册图片 href
 *
 * @returns 图片 href
 */
export function getGalleryImg(): string {
  return $("#ViewPicture1_OriginalImage").attr("href");
}
