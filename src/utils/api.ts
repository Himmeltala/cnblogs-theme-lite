/**
 * API
 */

import axios from "axios";
import * as Parser from "./html-parser";

const BASE_URL = "/api";

/**
 * 获取首页的随笔
 *
 * default.html?page=0
 *
 * @param page 页数
 */
export function getDefault(page: number, getData: (str: Array<string>) => void) {
  axios.get(`${BASE_URL}/default.html?page=${page}`).then(({ data }) => {
    getData(Parser.parseDefault(data));
  });
}
