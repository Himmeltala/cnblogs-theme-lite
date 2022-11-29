/**
 * API
 */

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
 * p/161616.html
 *
 * @param postId 随笔 ID
 * @param response 获取响应的消息
 */
export function getEssay(postId: number, response: (res: DataType.Essay) => void) {
  axios.get(`${BASE_URL}/p/${postId}.html`).then(({ data }) => {
    response(Parser.parseEssay(postId, data));
  });
}

/**
 * 发送评论
 *
 * /ajax/PostComment/Add.aspx
 *
 * @param data 评论实体
 * @param response 获取响应的消息
 */
export function setComm(data: DataType.Comment, response: (res: any) => void) {
  axios
    .post(`${BASE_URL}/ajax/PostComment/Add.aspx`, data, {
      headers: {
        RequestVerificationToken:
          "CfDJ8NfDHj8mnYFAmPyhfXwJojcLmH5FQKBU6I9JmTZ7EZv8CHznhefSwrC9bhMz6MPu5L74E-gvI4nLRpIAQWlWV0QPcVyR2ZnJfuABSA3Eu6fyiYubrc5iRYfKOIffdlGAhYC0MqHM5MJsWvuE8dctwRGNzJK_XaSs8jF_tB6iujBaNMnSICsF11A9_zj8nTCNMg"
      }
    })
    .then(res => {
      response(res);
    });
}

export function getCommList(data: DataType.Comment, response: (res: Array<DataType.Comment>) => void) {
  axios.get(`${BASE_URL}/ajax/GetComments.aspx?postId=${data.postId}&pageIndex=0`).then(({ data }) => {
    response(Parser.parseCommList(data));
  });
}
