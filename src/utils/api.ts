import axios from "axios";
import * as Parser from "./parser";
import * as DataType from "../types/data-type";

const BASE_URL = "https://www.cnblogs.com/Enziandom";
// const BASE_URL = "/api";

/**
 * 获取首页的随笔列表
 *
 * default.html?page=0
 *
 * @param page 页数
 * @param response 获取响应的消息
 */
export function getEssayList(page: number, response: (res: Array<DataType.Essay>) => void) {
  axios.get(`${BASE_URL}/default.html?page=${page}`).then(({ data }) => {
    response(Parser.parseEssayList(data));
  });
}

/**
 * 通过随笔 ID 获取随笔
 *
 * @param postId 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 * @param response 获取响应的消息
 */
export function getEssay(postId: number, response: (res: DataType.Essay) => void) {
  axios.get(`${BASE_URL}/p/${postId}.html`).then(({ data }) => {
    response(Parser.parseEssay(postId, data));
  });
}

/**
 * 发送随笔的评论
 *
 * @param data 评论实体
 * @param token 发送频率必须要 token，找到标签 #antiforgery_token 来获取
 * @param response 获取响应的消息
 */
export function setComm(data: DataType.Comment, token: string, response: (res: any) => void) {
  axios
    .post(`${BASE_URL}/ajax/PostComment/Add.aspx`, data, {
      headers: {
        RequestVerificationToken: token
      }
    })
    .then(res => {
      response(res);
    });
}

/**
 * 获取随笔的评论列表
 *
 * @param postId 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 * @param pageIndex 1 页最多有 50 条评论
 * @param response 获取响应的消息
 */
export function getCommList(postId: number, pageIndex: number, response: (res: Array<DataType.Comment>) => void) {
  axios.get(`${BASE_URL}/ajax/GetComments.aspx?postId=${postId}&pageIndex=${pageIndex}`).then(({ data }) => {
    response(Parser.parseCommList(data));
  });
}

/**
 * 获取随笔的标签和分类
 *
 * @param blogId 在头部 script 标签中获取
 * @param postId 随笔 ID。从首页跳转到随笔页面之后，通过 vue-outer 获取 postId
 * @param response 获取响应的消息
 */
export function getEssayTagsAndCategories(blogId: number, postId: number, response: (res: any) => void) {
  axios.get(`${BASE_URL}/ajax/CategoriesTags.aspx?blogId=${blogId}&postId=${postId}`).then(({ data }) => {
    response(Parser.parseEssayTagsAndCategories(data));
  });
}
