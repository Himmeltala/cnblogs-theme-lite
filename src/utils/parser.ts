/**
 * 解析 HTML
 */

import $ from "jquery";
import { replaceSpaceAround, replaceDefaultDesc } from "./reg";
import * as DataType from "../types/data-type";

export function parseEssayList(data: any): Array<DataType.Essay> {
  let body = $(data).find(".forFlow > .day");
  let id = $(body).find(".postTitle > .postTitle2");
  let idReg = /[0-9]+/g;
  let title = $(body).find(".postTitle");
  let desc = $(body).find(".c_b_p_desc");
  let postDesc = $(body).find(".postDesc").text();
  let dateReg = /[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d/g;
  let date = postDesc.match(dateReg);
  let viewReg = /阅读\([0-9]+\)/g;
  let viewCount = postDesc.match(viewReg);
  let commReg = /评论\([0-9]+\)/g;
  let commCount = postDesc.match(commReg);
  let diggReg = /推荐\([0-9]+\)/g;
  let diggCount = postDesc.match(diggReg);

  let essayList: Array<DataType.Essay> = [];

  for (let i = 0; i < $(title).length; i++) {
    essayList[i] = {
      postId: parseInt($(id[i]).attr("href")!.match(idReg)![0]),
      title: replaceSpaceAround($(title[i]).text()),
      desc: replaceSpaceAround(replaceDefaultDesc($(desc[i]).text())),
      date: date![i],
      viewCount: viewCount![i],
      commCount: commCount![i],
      diggCount: diggCount![i]
    };
  }
  return essayList;
}

export function parseEssay(postId: number, data: any): DataType.Essay {
  let body = $(data).find(".post");
  let title = $(body).find(".postTitle > a > span").text();
  let content = $(body).find("#cnblogs_post_body").html();

  return {
    postId: postId,
    title: title,
    content: content
  };
}

export function parseCommList(data: any): Array<DataType.Comment> {
  let comments: Array<DataType.Comment> = [];
  var parser = new DOMParser();

  $(parser.parseFromString(data, "text/html"))
    .find(".feedbackItem")
    .map((i, d) => {
      let anchor = $(d).find(".layer").attr("href")!.split("#")[1];
      comments[i] = {
        layer: $(d).find(".layer").text(),
        date: $(d).find(".comment_date").text(),
        author: $(d).find(`#a_comment_author_${anchor}`).text(),
        body: $(d).find(`#comment_body_${anchor}`).find("p").text(),
        digg: replaceSpaceAround($(d).find(".comment_digg").text()),
        burry: replaceSpaceAround($(d).find(".comment_burry").text()),
        avatar: replaceSpaceAround($(d).find(`#comment_${anchor}_avatar`).text())
      };
    });

  return comments;
}
