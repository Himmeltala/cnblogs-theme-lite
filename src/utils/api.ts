/**
 * 提供对接博客园各种可用的基础 API
 *
 * @author Himmelbleu
 * @since 1.0
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import axios from "axios";
import $ from "jquery";
import * as Parser from "./parser";
import * as DataType from "@/types/data-type";
import * as HttpType from "@/types/http-type";
import { __LITE_CONFIG__, BaseAPI } from "@/lite.config";

/**
 * 获取首页的随笔列表
 *
 * @param page 页数，从 1 开始
 * @param calcPage 是否继续计算随笔列表页数，一般第一次调用该 API 时设置 true，目的是获取随笔列表的页数情况，再换页之后继续调用该
 * API 时不推荐再开启，设置为 false，避免破坏翻页时分页组件的 total 值。
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。
 */
export function getEssayList(
  page: number,
  calcPage: boolean,
  response: (res: { pages: string[]; list: Array<DataType.Essay> }) => void
) {
  axios.get(`${BaseAPI}/default.html?page=${page}`).then(({ data }) => {
    response(Parser.parseEssayList(data, calcPage));
  });
}

/**
 * 通过随笔 ID 获取随笔
 *
 * @param postId 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function getEssay(postId: number, response: (res: DataType.Essay) => void) {
  axios.get(`${BaseAPI}/p/${postId}.html`).then(({ data }) => {
    response(Parser.parseEssay(postId, data));
  });
}

/**
 * 发送 post 请求必须要 token，找到标签 #antiforgery_token 来获取
 *
 * @param url 请求路径
 * @param data 请求实体
 * @param response 获取响应的消息，返回一个 axios 的完整消息
 */
function sendPost(url: string, data: any, response: (res: any) => void) {
  axios
    .post(url, data, {
      timeout: 5000,
      headers: { RequestVerificationToken: $("#antiforgery_token").attr("value") }
    })
    .then(res => {
      response(res);
    })
    .catch(err => {
      ElMessage({ message: `${err.code}: ${err.message}`, grouping: true, type: "error" });
      response(500);
    });
}

/**
 * 发送随笔的评论
 *
 * @param comment 评论实体
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function setComment(comment: DataType.BlogComment, response: (res: any) => void) {
  sendPost(`${BaseAPI}/ajax/PostComment/Add.aspx`, comment, response);
}

/**
 * 删除其中一条评论
 *
 * @param comment 评论实体
 * @param response 获取响应的消息，返回一个 axios 的完整消息
 */
export function deleteComment(comment: DataType.BlogComment, response: (res: any) => void) {
  sendPost(`${BaseAPI}/ajax/comment/DeleteComment.aspx`, comment, response);
}

/**
 *  通过 ID 获取单个评论
 *
 * @param comment 评论实体，对应博客园默认的评论字段，需要传递一个包含评论 ID 的实体
 * @param response 获取响应的消息——该实体类与 DataType 中定义的评论实体类字段不一致。返回一个 axios 中 data 部分消息
 */
export function getComment(comment: DataType.BlogComment, response: (res: any) => void) {
  sendPost(`${BaseAPI}/ajax/comment/GetCommentBody.aspx`, comment, response);
}

/**
 * 修改评论
 *
 * @param comment 评论实体，对应博客园默认的评论字段，需要传递一个包含评论 ID、评论内容的实体
 * @param response 获取响应的消息，返回一个 axios 的完整消息
 */
export function updateComment(comment: DataType.BlogComment, response: (res: any) => void) {
  sendPost(`${BaseAPI}/ajax/PostComment/Update.aspx`, comment, response);
}

/**
 * 获取评论计数
 *
 * @param postId 随笔 ID
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function getCommentCount(postId: number | string, response: (res: any) => void) {
  axios.get(`${BaseAPI}/ajax/GetCommentCount.aspx?postId=${postId}`).then(({ data }) => {
    response(Parser.parseCommentPages(data));
  });
}

/**
 * 点赞或反对评论
 *
 * @param comment 被操作的评论的实体，需要 isAbandoned、postId、voteType 三个字段，其中 voteType 请见 DataType.VoteType，只有两种类型。
 * @param response 获取响应的消息，返回一个 axios 的完整消息
 */
export function voteComment(comment: DataType.BlogComment, response: (ajax: HttpType.AjaxType) => void) {
  sendPost(`${BaseAPI}/ajax/vote/comment`, comment, ({ data }) => {
    response(data);
  });
}

/**
 * 回复一条评论
 *
 * @param comment 博客园原有的评论实体，需要 body、parentCommentId、postId。parentCommentId 就是回复的那一条的 ID。
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。这里需要获取 AjaxType。利用其中的 isSuccess 查看是否回复成功。
 */
export function replayComment(comment: DataType.BlogComment, response: (ajax: HttpType.AjaxType) => void) {
  sendPost(`${BaseAPI}/ajax/PostComment/Add.aspx`, comment, ({ data }) => {
    response(data);
  });
}

/**
 * 获取随笔的评论列表
 *
 * @param postId 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 * @param pageIndex 1 页最多有 50 条评论
 * @param anchorCommentId 当进入的是一个回复评论时，需要传递该参数，默认可以不传递
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function getCommentList(
  postId: number | string,
  pageIndex: number = 0,
  response: (res: Array<DataType.Comment>) => void,
  anchorCommentId?: number
) {
  let url = `${BaseAPI}/ajax/GetComments.aspx?postId=${postId}&pageIndex=${pageIndex}`;
  if (anchorCommentId) url += `&anchorCommentId=${anchorCommentId}&isDesc=false`;
  axios.get(url).then(({ data }) => response(Parser.parseCommentList(data)));
}

/**
 * 获取随笔的标签和分类
 *
 * @param postId 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function getEssayTagsAndCategories(postId: number, response: (res: any) => void) {
  axios
    .get(`${BaseAPI}/ajax/CategoriesTags.aspx?blogId=${__LITE_CONFIG__.currentBlogId}&postId=${postId}`)
    .then(({ data }) => response(Parser.parseEssayTagsAndCategories(data)));
}

/**
 * 获取随笔的上下篇
 *
 * @param postId 随笔 ID
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function getPrevNext(postId: number | string, response: (res: any) => void) {
  axios.get(`${BaseAPI}/ajax/post/prevnext?postId=${postId}`).then(({ data }) => {
    response(Parser.parsePrevNext(data));
  });
}

/**
 * 点赞或反对随笔
 *
 * @param data 随笔实体，需要传递一个包含 isAbandoned、postId、voteType 的官方随笔实体
 * @param response 获取响应的消息，返回一个 axios 的完整消息
 */
export function voteEssay(data: DataType.BlogEssay, response: (ajax: HttpType.AjaxType) => void) {
  sendPost(`${BaseAPI}/ajax/vote/blogpost`, data, ({ data }) => {
    response(data);
  });
}

/**
 * 获取随笔点赞和反对的数据
 *
 * @param data 传递一个数组，数组第一个就是 postId 的值
 * @param response 获取响应的消息，返回一个 axios 的 data 部分
 */
export function getEssayVote(data: any[], response: (ajax: Array<DataType.BlogEssayVote>) => void) {
  sendPost(`${BaseAPI}/ajax/GetPostStat`, data, ({ data }) => {
    response(data);
  });
}

/**
 * 获取分类列表
 *
 * @param id 分类列表 id
 * @param calcPage 是否计算页数？参考 getEssayList 函数对其详细的售卖
 * @param page 页数
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。
 */
export function getCategories(
  id: any,
  calcPage: boolean,
  page: any,
  response: (res: { pages: string[]; label: string; list: Array<DataType.Essay> }) => void
) {
  axios.get(`${BaseAPI}/category/${id}.html?page=${page}`).then(({ data }) => {
    response(Parser.parseCategoryList(data, calcPage));
  });
}

/**
 * 获取标签下所有随笔列表
 *
 * @param tag 标签名称
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。
 */
export function getTagPageList(tag: string, response: (res: DataType.TagPage) => void) {
  axios.get(`${BaseAPI}/tag/${tag}`).then(({ data }) => {
    response(Parser.parseTagPageList(data));
  });
}

/**
 * 获取侧边栏的部分随笔分类列表
 *
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。
 */
export function getSideCategories(response: (res: any) => void) {
  axios.get(`${BaseAPI}/ajax/sidecolumn.aspx`).then(({ data }) => {
    response(Parser.parseSideCategories(data));
  });
}

/**
 * 获取侧边栏的部分随笔分类列表。直接调用解析函数解析 home 节点下的侧边栏。
 */
export function getSideCategoriesLocal(response: (res: any) => void) {
  response(Parser.parseSideCategories($("#home").find("#blog-sidecolumn").html()));
}

/**
 * 获取侧边栏的博主信息
 *
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。
 */
export function getSideBloggerInfo(response: (res: Array<DataType.BloggerInfo>) => void) {
  axios.get(`${BaseAPI}/ajax/news.aspx`).then(({ data }) => {
    response(Parser.parseSideBloggerInfo(data));
  });
}

/**
 * 获取侧边栏的博主信息。直接调用解析函数解析 home 节点下的侧边栏。
 */
export function getSideBloggerInfoLocal(response: (res: Array<DataType.BloggerInfo>) => void) {
  response(Parser.parseSideBloggerInfo($("#home").find("#blog-news").html()));
}

/**
 * 获取侧边栏博客的数据
 *
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。
 */
export function getSideBlogInfo(response: (res: any) => void) {
  axios.get(`${BaseAPI}/ajax/blogStats`).then(({ data }) => {
    response(Parser.parseSideBlogInfo(data));
  });
}

/**
 * 获取侧边栏博客的数据。直接调用解析函数解析 home 节点下的侧边栏。
 */
export function getSideBlogInfoLocal(response: (res: any) => void) {
  response(Parser.parseSideBlogInfo($("#home").find(".blogStats").html()));
}

/**
 * 忽哟去侧边栏博客排行信息。
 */
export function getSideBlogRank(response: (res: any) => void) {
  response(Parser.parseSideRank($("#home").find("#sidebar_scorerank").html()));
}

/**
 * 获取侧边栏阅读排行榜列表
 *
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。
 */
export function getSideTopList(response: (res: any) => void) {
  axios.get(`${BaseAPI}/ajax/TopLists.aspx`).then(({ data }) => {
    response(Parser.parseSideBlogTopList(data));
  });
}

/**
 * 获取侧边栏阅读排行榜列表，不获取通过请求获取阅读排行榜，直接调用解析函数解析 home 节点下的侧边栏。
 * 调用 getSideTopList 函数不划算，增加额外的请求，耗时。所以推荐使用 getSideTopListLocal 来获取于都排行榜。
 */
export function getSideTopListLocal(response: (res: any) => void) {
  response(Parser.parseSideBlogTopList($("#home").find("#sidebar_topviewedposts").html()));
}

export function getGalleryImg(): string {
  return $("#ViewPicture1_OriginalImage").attr("href");
}
