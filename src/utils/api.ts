/**
 * 提供对接博客园各种可用的基础 API
 *
 * @author Enziandom
 * @since 1.0
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/enziandom/#/
 */

import axios from "axios";
import $ from "jquery";
import * as Parser from "./parser";
import * as DataType from "../types/data-type";
import * as HttpType from "../types/http-type";
import Config from "../config";

const BASE_URL = Config.api.base;

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
  axios.get(`${BASE_URL}/default.html?page=${page}`).then(({ data }) => {
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
  axios.get(`${BASE_URL}/p/${postId}.html`).then(({ data }) => {
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
      headers: {
        RequestVerificationToken: $("#antiforgery_token").attr("value")
      }
    })
    .then(res => {
      response(res);
    });
}

/**
 * 发送随笔的评论
 *
 * @param comment 评论实体
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function setComment(comment: DataType.BlogComment, response: (res: any) => void) {
  sendPost(`${BASE_URL}/ajax/PostComment/Add.aspx`, comment, response);
}

/**
 * 删除其中一条评论
 *
 * @param comment 评论实体
 * @param response 获取响应的消息，返回一个 axios 的完整消息
 */
export function deleteComment(comment: DataType.BlogComment, response: (res: any) => void) {
  sendPost(`${BASE_URL}/ajax/comment/DeleteComment.aspx`, comment, response);
}

/**
 *  通过 ID 获取单个评论
 *
 * @param comment 评论实体，对应博客园默认的评论字段，需要传递一个包含评论 ID 的实体
 * @param response 获取响应的消息——该实体类与 DataType 中定义的评论实体类字段不一致。返回一个 axios 中 data 部分消息
 */
export function getComment(comment: DataType.BlogComment, response: (res: any) => void) {
  sendPost(`${BASE_URL}/ajax/comment/GetCommentBody.aspx`, comment, response);
}

/**
 * 修改评论
 *
 * @param comment 评论实体，对应博客园默认的评论字段，需要传递一个包含评论 ID、评论内容的实体
 * @param response 获取响应的消息，返回一个 axios 的完整消息
 */
export function updateComment(comment: DataType.BlogComment, response: (res: any) => void) {
  sendPost(`${BASE_URL}/ajax/PostComment/Update.aspx`, comment, response);
}

/**
 * 获取评论计数
 *
 * @param postId 随笔 ID
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function getCommentCount(postId: number | string, response: (res: any) => void) {
  axios.get(`${BASE_URL}/ajax/GetCommentCount.aspx?postId=${postId}`).then(({ data }) => {
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
  sendPost(`${BASE_URL}/ajax/vote/comment`, comment, ({ data }) => {
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
  sendPost(`${BASE_URL}/ajax/PostComment/Add.aspx`, comment, ({ data }) => {
    response(data);
  });
}

/**
 * 获取随笔的评论列表
 *
 * @param postId 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 * @param pageIndex 1 页最多有 50 条评论
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function getCommentList(postId: number | string, pageIndex: number, response: (res: Array<DataType.Comment>) => void) {
  axios.get(`${BASE_URL}/ajax/GetComments.aspx?postId=${postId}&pageIndex=${pageIndex}`).then(({ data }) => {
    response(Parser.parseCommentList(data));
  });
}

/**
 * 获取随笔的标签和分类
 *
 * @param blogId 在头部 script 标签中获取
 * @param postId 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function getEssayTagsAndCategories(blogId: number, postId: number, response: (res: any) => void) {
  axios.get(`${BASE_URL}/ajax/CategoriesTags.aspx?blogId=${blogId}&postId=${postId}`).then(({ data }) => {
    response(Parser.parseEssayTagsAndCategories(data));
  });
}

/**
 * 获取随笔的上下篇
 *
 * @param postId 随笔 ID
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function getPrevNext(postId: number | string, response: (res: any) => void) {
  axios.get(`${BASE_URL}/ajax/post/prevnext?postId=${postId}`).then(({ data }) => {
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
  sendPost(`${BASE_URL}/ajax/vote/blogpost`, data, ({ data }) => {
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
  sendPost(`${BASE_URL}/ajax/GetPostStat`, data, ({ data }) => {
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
export function getCategories(id: any, calcPage: boolean, page: number, response: (res: { pages: string[]; category?: string; list: Array<DataType.Essay> }) => void) {
  axios.get(`${BASE_URL}/category/${id}.html?page=${page}`).then(({ data }) => {
    response(Parser.parseCategoryList(data, calcPage));
  });
}

export function getTagPageList(tag: string, response: (res: DataType.TagPage) => void) {
  axios.get(`${BASE_URL}/tag/${tag}`).then(({ data }) => {
    response(Parser.parseTagPageList(data));
  });
}

export function getSideCategories(response: (res: any) => void) {
  axios.get(`${BASE_URL}/ajax/sidecolumn.aspx`).then(({ data }) => {
    response(Parser.parseSideCategories(data));
  });
}

export function getSideBlogerInfo(response: (res: Array<DataType.BlogerInfo>) => void) {
  axios.get(`${BASE_URL}/ajax/news.aspx`).then(({ data }) => {
    response(Parser.parseSideBlogerInfo(data));
  });
}

export function getSideBlogInfo(response: (res: any) => void) {
  axios.get(`${BASE_URL}/ajax/blogStats`).then(({ data }) => {
    response(Parser.parseBlogInfo(data));
  });
}

export function getSideTopList(response: (res: any) => void) {
  axios.get(`${BASE_URL}/ajax/TopLists.aspx`).then(({ data }) => {
    response(Parser.parseSideBlogTopList(data));
  });
}