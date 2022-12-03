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
import config from "../config";

const BASE_URL = config.api.base;

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
 * @param data 评论实体
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export function setComment(data: DataType.Comment, response: (res: any) => void) {
  sendPost(`${BASE_URL}/ajax/PostComment/Add.aspx`, data, response);
}

/**
 * 删除其中一条评论
 *
 * @param data 评论实体
 * @param response 获取响应的消息，返回一个 axios 的完整消息
 */
export function deleteComment(data: DataType.CnBlogComment, response: (res: any) => void) {
  sendPost(`${BASE_URL}/ajax/comment/DeleteComment.aspx`, data, response);
}

/**
 *  通过 ID 获取单个评论
 *
 * @param comment 评论实体，对应博客园默认的评论字段，需要传递一个包含评论 ID 的实体
 * @param response 获取响应的消息——该实体类与 DataType 中定义的评论实体类字段不一致。返回一个 axios 中 data 部分消息
 */
export function getComment(comment: DataType.CnBlogComment, response: (res: any) => void) {
  sendPost(`${BASE_URL}/ajax/comment/GetCommentBody.aspx`, comment, response);
}

/**
 * 修改评论
 *
 * @param comment 评论实体，对应博客园默认的评论字段，需要传递一个包含评论 ID、评论内容的实体
 * @param response 获取响应的消息，返回一个 axios 的完整消息
 */
export function updateComment(comment: DataType.CnBlogComment, response: (res: any) => void) {
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
 * @param data 被操作的评论的实体，需要 isAbandoned、postId、voteType 三个字段，其中 voteType 请见 DataType.VoteType，只有两种类型。
 * @param response 获取响应的消息，返回一个 axios 的完整消息
 */
export function voteComment(data: DataType.CnBlogComment, response: (ajax: HttpType.AjaxType) => void) {
  sendPost(`${BASE_URL}/ajax/vote/comment`, data, ({ data }) => {
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
export function voteEssay(data: DataType.CnBlogEssay, response: (ajax: HttpType.AjaxType) => void) {
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
export function getEssayVote(data: any[], response: (ajax: Array<DataType.CnBlogEssayVote>) => void) {
  sendPost(`${BASE_URL}/ajax/GetPostStat`, data, ({ data }) => {
    response(data);
  });
}
