/**
 * 提供对接博客园各种可用的基础 API
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";
import axios from "axios";
import { BlogType } from "@/types/data-type";
import * as Parser from "@/services/parse-html-service";
import { baseAPI, blogId, userGuid } from "@/lite.config";

/**
 * 以 async/await 风格写异步请求，代码更加简洁，逻辑更加清晰
 *
 * @param url 请求地址
 * @returns 返回一个 Promise 对象
 */
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
 * 以 async/await 风格写异步请求，代码更加简洁，逻辑更加清晰
 *
 * @param url 请求地址
 * @param data 请求体
 * @returns 返回一个 Promise 对象
 */
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
 * 获取随笔列表
 *
 * @param page 页数，可以是 0，也可以是 1，都代表第一页。
 * @param isCalc 是否计算页数，由于第一页没有显示页数，只有第二页才有，所以为了不多次重复计算页数，该变量用于控制。
 */
export async function getArticleList(page: number, isCalc: boolean) {
  const { data } = await sendAwaitGet(`${baseAPI}/default.html?page=${page}`);
  return Parser.parseArticleList(data, isCalc);
}

/**
 * 获取随笔
 *
 * @param postId 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 */
export async function getArticle(postId: string) {
  const { data } = await sendAwaitGet(`${baseAPI}/p/${postId}.html`);
  return Parser.parseArticle(postId, data);
}

/**
 * 发送随笔的评论
 *
 * @param comment 评论实体
 * @return 获取响应的消息，返回一个 axios 中 data 部分消息
 */
export async function setComment(comment: BlogType.IBlogComment): Promise<BlogType.AjaxType> {
  const { data } = await sendAwaitPost(`${baseAPI}/ajax/PostComment/Add.aspx`, comment);
  return data;
}

/**
 * 删除其中一条评论
 *
 * @param comment 评论实体
 */
export async function deleteComment(comment: BlogType.IBlogComment) {
  const { data } = await sendAwaitPost(`${baseAPI}/ajax/comment/DeleteComment.aspx`, comment);
  return data;
}

/**
 *  通过 ID 获取单个评论
 *
 * @param comment 评论实体，对应博客园默认的评论字段，需要传递一个包含评论 ID 的实体
 */
export async function getComment(comment: BlogType.IBlogComment) {
  const { data } = await sendAwaitPost(`${baseAPI}/ajax/comment/GetCommentBody.aspx`, comment);
  return data;
}

/**
 * 修改评论
 *
 * @param comment 评论实体，对应博客园默认的评论字段，需要传递一个包含评论 ID、评论内容的实体
 */
export async function updateComment(comment: BlogType.IBlogComment): Promise<BlogType.AjaxType> {
  const { data } = await sendAwaitPost(`${baseAPI}/ajax/PostComment/Update.aspx`, comment);
  return data;
}

/**
 * 获取评论计数
 *
 * @param id 随笔 ID
 */
export async function getCommentCount(id: number | string) {
  const { data } = await sendAwaitGet(`${baseAPI}/ajax/GetCommentCount.aspx?postId=${id}`);
  return Parser.parseCommentPages(data);
}

/**
 * 点赞或反对评论
 *
 * @param comment 被操作的评论的实体，需要 isAbandoned、postId、voteType 三个字段，其中 voteType 请见 DataType.VoteType，只有两种类型。
 */
export async function voteComment(comment: BlogType.IBlogComment): Promise<BlogType.AjaxType> {
  const { data } = await sendAwaitPost(`${baseAPI}/ajax/vote/comment`, comment);
  return data;
}

/**
 * 回复一条评论
 *
 * @param comment 博客园原有的评论实体，需要 body、parentCommentId、postId。parentCommentId 就是回复的那一条的 ID。
 */
export async function replayComment(comment: BlogType.IBlogComment): Promise<BlogType.AjaxType> {
  const { data } = await sendAwaitPost(`${baseAPI}/ajax/PostComment/Add.aspx`, comment);
  return data;
}

/**
 * 获取随笔的评论列表
 *
 * @param id 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 * @param page 1 页最多有 50 条评论
 * @param anchorId 当进入的是一个回复评论时，需要传递该参数，默认可以不传递
 */
export async function getCommentList(id: number | string, page: number, anchorId?: number) {
  let url = `${baseAPI}/ajax/GetComments.aspx?postId=${id}&pageIndex=${page}`;
  if (anchorId) url += `&anchorCommentId=${anchorId}&isDesc=false`;
  const { data } = await sendAwaitGet(url);
  return Parser.parseCommentList(data);
}

/**
 * 获取随笔的标签和分类
 *
 * @param postId 进入随笔页面之后，从 vue-router 参数中获取
 */
export async function getArticleProps(postId: string) {
  const { data } = await sendAwaitGet(`${baseAPI}/ajax/CategoriesTags.aspx?blogId=${blogId}&postId=${postId}`);
  return Parser.parseArticleProps(data);
}

/**
 * 获取随笔的上下篇
 *
 * @param id 进入随笔页面之后，从 vue-router 参数中获取
 */
export async function getPrevNext(id: string) {
  const { data } = await sendAwaitGet(`${baseAPI}/ajax/post/prevnext?postId=${id}`);
  return Parser.parsePrevNext(data);
}

/**
 * 点赞或反对该随笔
 *
 * @param entity 随笔实体。必须包含：isAbandoned、postId、voteType 三个字段。
 */
export async function voteArticle(entity: BlogType.IBlogArticle): Promise<BlogType.AjaxType> {
  const { data } = await sendAwaitPost(`${baseAPI}/ajax/vote/blogpost`, entity);
  return data;
}

/**
 * 获取随笔点赞和反对的数据
 *
 * @param postId 传递一个数组，数组第一个就是 postId 的值
 */
export async function getArticleVote(postId: string): Promise<BlogType.BlogArticleVote> {
  const { data } = await sendAwaitPost(`${baseAPI}/ajax/GetPostStat`, [postId]);
  return data[0];
}

/**
 * 获取分类列表
 *
 * @param id 分类列表 id
 * @param calcPage 是否计算页数？参考 getEssayList 函数对其详细的售卖
 * @param page 页数
 */
export async function getSorts(id: any, calcPage: boolean, page: any) {
  const { data } = await sendAwaitGet(`${baseAPI}/category/${id}.html?page=${page}`);
  return Parser.parseSorts(data, calcPage);
}

/**
 * 获取标签下所有随笔列表
 *
 * @param tag 标签名称
 */
export async function getTagColl(tag: string) {
  const { data } = await sendAwaitGet(`${baseAPI}/tag/${tag}`);
  return Parser.parseTagColl(data);
}

/**
 * 获取侧边栏分类列表、标签列表，... 列表
 */
export async function getCabinetColumn() {
  const { data } = await sendAwaitGet(`${baseAPI}/ajax/sidecolumn.aspx`);
  return Parser.parseCabinetColumn(data);
}

/**
 * 获取侧边栏的博主信息
 *
 */
export async function getAuthor() {
  const { data } = await sendAwaitGet(`${baseAPI}/ajax/news.aspx`);
  return Parser.parseAuthor(data);
}

/**
 * 获取博主主人的排行榜、积分、阅读等数据
 */
export async function getMasterData() {
  const { data } = await sendAwaitGet(`${baseAPI}/ajax/blogStats`);
  return Parser.parseMasterData(data);
}

/**
 * 获取侧边栏阅读排行榜列表
 */
export async function getCabinetTopList() {
  const { data } = await sendAwaitGet(`${baseAPI}/ajax/TopLists.aspx`);
  return Parser.parseCabinetTopList(data);
}

/**
 * 获取所有标签列表
 */
export async function getTags() {
  const { data } = await sendAwaitGet(`${baseAPI}/tag`);
  return Parser.parseTags(data);
}

/**
 * 关注博主
 */
export async function follow() {
  const { data } = await sendAwaitPost(`${baseAPI}/ajax/Follow/FollowBlogger.aspx`, {
    blogUserGuid: userGuid
  });
  return data === "关注成功" ?? false;
}

/**
 * 取消关注
 */
export async function unfollow() {
  const { data } = await sendAwaitPost(`${baseAPI}/ajax/Follow/RemoveFollow.aspx`, {
    blogUserGuid: userGuid
  });
  return data === "取消成功" ?? false;
}

/**
 * 检测是否解锁博文
 *
 * @param password 博文阅读密码
 * @param id 博文 ID
 * @returns 输入密码正确时返回 true
 */
export async function getIsUnlock(password: string, id: string) {
  const formData = new FormData();
  formData.append("Password", password);
  const { data } = await sendAwaitPost(`${baseAPI}/protected/p/${id}.html`, formData);
  return Parser.parseIsUnLock(data);
}

/**
 * 获取上锁的博文内容，普通的 API 无法获取
 *
 * @param password 博文阅读密码
 * @param postId 博文 ID
 * @returns 输入密码正确时返回这个博文内容
 */
export async function getLockedArticle(password: string, postId: string) {
  const formData = new FormData();
  formData.append("Password", password);
  const { data } = await sendAwaitPost(`${baseAPI}/protected/p/${postId}.html`, formData);
  return Parser.parseArticle(postId, data);
}