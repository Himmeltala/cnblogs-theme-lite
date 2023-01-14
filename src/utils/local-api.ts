/**
 * 提供对接博客园各种可用的基础 API，获取的数据来自于 #mainContent
 *
 * @author Himmelbleu
 * @since 1.0
 * @date 2022 年 1 月 14 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";
import {
  parseSideCategories,
  parseSideBloggerInfo,
  parseSideBlogInfo,
  parseSideBlogTopList,
  parseSideRank
} from "@/utils/parser";

/**
 * 获取侧边栏的部分随笔分类列表。直接调用解析函数解析 home 节点下的侧边栏。
 */
export function getSideCategories() {
  return parseSideCategories($("#home").find("#blog-sidecolumn").html());
}

/**
 * 获取侧边栏的博主信息。直接调用解析函数解析 home 节点下的侧边栏。
 */
export function getSideBloggerInfo() {
  return parseSideBloggerInfo($("#home").find("#blog-news").html());
}

/**
 * 获取侧边栏博客的数据。直接调用解析函数解析 home 节点下的侧边栏。
 */
export function getSideBlogInfo() {
  return parseSideBlogInfo($("#home").find(".blogStats").html());
}

/**
 * 获取侧边栏阅读排行榜列表，不获取通过请求获取阅读排行榜，直接调用解析函数解析 home 节点下的侧边栏。
 * 调用 getSideTopList 函数不划算，增加额外的请求，耗时。所以推荐使用 getSideTopListLocal 来获取于都排行榜。
 */
export function getSideTopList() {
  return parseSideBlogTopList($("#home").find("#sidebar_topviewedposts").html());
}

/**
 * 忽哟去侧边栏博客排行信息。
 */
export function getSideBlogRank() {
  return parseSideRank($("#home").find("#sidebar_scorerank").html());
}

/**
 * 获取相册图片 href
 *
 * @returns 图片 href
 */
export function getGalleryImg(): string {
  return $("#ViewPicture1_OriginalImage").attr("href");
}
