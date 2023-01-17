/**
 * 提供对接博客园各种可用的基础 API
 *
 * @author Himmelbleu
 * @since 1.0
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";
import axios from "axios";
import * as Parser from "./parser";
import * as DataType from "@/types/data-type";
import * as HttpType from "@/types/http-type";
import { __LITE_CONFIG__, BaseAPI } from "@/lite.config";

/**
 * 发送 get 请求，这里对获取数据失败的请求进行统一处理
 *
 * @param url 请求路径
 * @param response 获取响应的消息
 */
function sendGet(url: string, response: (res: any) => void) {
  axios
    .get(url, {
      timeout: 5000
    })
    .then(res => {
      response(res);
    })
    .catch(err => {
      // ElMessage({ message: `${err.code}: ${err.message}`, grouping: true, type: "error" });
      console.error(`${err.code}: ${err.message}`);
    });
}

async function sendAwaitGet(url: string): Promise<any> {
  let awt;
  try {
    awt = await axios.get(url, { timeout: 5000 });
  } catch (e) {
    console.error(e);
  }
  return awt;
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
      console.error(`${err.code}: ${err.message}`);
    });
}

async function sendAwaitPost(url: string, data: any): Promise<any> {
  let awt;
  try {
    awt = await axios.post(url, data, {
      timeout: 5000,
      headers: { RequestVerificationToken: $("#antiforgery_token").attr("value") }
    });
  } catch (e) {
    console.error(e);
  }
  return awt;
}

/**
 * 获取首页的随笔列表
 *
 * @param page 页数，从 1 开始
 * @param isCalc 是否继续计算随笔列表页数，一般第一次调用该 API 时设置 true，目的是获取随笔列表的页数情况，再换页之后继续调用该
 * API 时不推荐再开启，设置为 false，避免破坏翻页时分页组件的 total 值。
 */
export async function getEssayList(
  page: number,
  isCalc: boolean
): Promise<{ pages: string[]; list: Array<DataType.Essay> }> {
  const { data } = await sendAwaitGet(`${BaseAPI}/default.html?page=${page}`);
  return Parser.parseEssayList(data, isCalc);
}

/**
 * 通过随笔 ID 获取随笔
 *
 * @param postId 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export async function getEssay(postId: number): Promise<DataType.Essay> {
  const { data } = await sendAwaitGet(`${BaseAPI}/p/${postId}.html`);
  return Parser.parseEssay(postId, data);
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
  sendGet(`${BaseAPI}/ajax/GetCommentCount.aspx?postId=${postId}`, ({ data }) => {
    response(Parser.parseCommentPages(data));
  });
}

/**
 * 点赞或反对评论
 *
 * @param comment 被操作的评论的实体，需要 isAbandoned、postId、voteType 三个字段，其中 voteType 请见 DataType.VoteType，只有两种类型。
 * @param response 获取响应的消息，返回一个 axios 的完整消息
 */
export function voteComment(
  comment: DataType.BlogComment,
  response: (ajax: HttpType.AjaxType) => void
) {
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
export function replayComment(
  comment: DataType.BlogComment,
  response: (ajax: HttpType.AjaxType) => void
) {
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
  sendGet(url, ({ data }) => {
    response(Parser.parseCommentList(data));
  });
}

/**
 * 获取随笔的标签和分类
 *
 * @param postId 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 */
export async function getEssayTagsAndCategories(postId: number | string) {
  const { data } = await sendAwaitGet(
    `${BaseAPI}/ajax/CategoriesTags.aspx?blogId=${__LITE_CONFIG__.currentBlogId}&postId=${postId}`
  );
  return Parser.parseEssayTagsAndCategories(data);
}

/**
 * 获取随笔的上下篇
 *
 * @param postId 随笔 ID
 */
export async function getPrevNext(postId: number | string) {
  const { data } = await sendAwaitGet(`${BaseAPI}/ajax/post/prevnext?postId=${postId}`);
  return Parser.parsePrevNext(data);
}

/**
 * 点赞或反对该随笔
 *
 * @param entity 随笔实体。必须包含：isAbandoned、postId、voteType 三个字段。
 */
export async function voteEssay(entity: DataType.BlogEssay): Promise<HttpType.AjaxType> {
  const { data } = await sendAwaitPost(`${BaseAPI}/ajax/vote/blogpost`, entity);
  return data;
}

/**
 * 获取随笔点赞和反对的数据
 *
 * @param postId 传递一个数组，数组第一个就是 postId 的值
 */
export async function getEssayVote(postId: number | string): Promise<DataType.BlogEssayVote> {
  const { data } = await sendAwaitPost(`${BaseAPI}/ajax/GetPostStat`, [postId]);
  return data[0];
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
  sendGet(`${BaseAPI}/category/${id}.html?page=${page}`, ({ data }) => {
    response(Parser.parseCategoryList(data, calcPage));
  });
}

/**
 * 获取标签下所有随笔列表
 *
 * @param tag 标签名称
 */
export async function getTagPageList(tag: string): Promise<DataType.TagPage> {
  const { data } = await sendAwaitGet(`${BaseAPI}/tag/${tag}`);
  return Parser.parseTagPageList(data);
}

/**
 * 获取侧边栏的部分随笔分类列表
 *
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。
 */
export async function getSideCategories(): Promise<{
  categories: {
    id: string;
    text: string;
  }[];
  tags: {
    id: string;
    text: string;
  }[];
}> {
  const { data } = await sendAwaitGet(`${BaseAPI}/ajax/sidecolumn.aspx`);
  return Parser.parseSideCategories(data);
}

/**
 * 获取侧边栏的博主信息
 *
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。
 */
export function getSideBloggerInfo(response: (res: Array<DataType.BloggerInfo>) => void) {
  sendGet(`${BaseAPI}/ajax/news.aspx`, ({ data }) => {
    response(Parser.parseSideBloggerInfo(data));
  });
}

/**
 * 获取侧边栏博客的数据
 *
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。
 */
export function getSideBlogInfo(response: (res: any) => void) {
  sendGet(`${BaseAPI}/ajax/blogStats`, ({ data }) => {
    response(Parser.parseSideBlogInfo(data));
  });
}

/**
 * 获取侧边栏阅读排行榜列表
 *
 * @param response 获取响应的消息，返回一个 axios 中 data 部分消息。
 */
export function getSideTopList(response: (res: any) => void) {
  sendGet(`${BaseAPI}/ajax/TopLists.aspx`, ({ data }) => {
    response(Parser.parseSideBlogTopList(data));
  });
}

/**
 * 获取所有标签列表
 */
export async function getTag(): Promise<Array<DataType.Tag>> {
  const { data } = await sendAwaitGet(`${BaseAPI}/tag`);
  return Parser.parseTags(data);
}
