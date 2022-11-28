/**
 * 解析 HTML
 */

import $ from "jquery";
import { replaceSpaceAround, replaceDefaultDesc } from "./reg";

export function parseDefault(data: string): Array<string> {
  let day = $(data).find(".forFlow > .day");
  let id = $(day).find(".postTitle > .postTitle2");
  let idReg = /[0-9]+/g;
  let title = $(day).find(".postTitle");
  let desc = $(day).find(".c_b_p_desc");
  let postDesc = $(day).find(".postDesc").text();
  let dateReg = /[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d/g;
  let date = postDesc.match(dateReg);
  let viewReg = /阅读\([0-9]+\)/g;
  let viewCount = postDesc.match(viewReg);
  let commReg = /评论\([0-9]+\)/g;
  let commCount = postDesc.match(commReg);
  let diggReg = /推荐\([0-9]+\)/g;
  let diggCount = postDesc.match(diggReg);

  let essayArray = <any>[];

  for (let i = 0; i < $(title).length; i++) {
    essayArray[i] = {
      id: $(id[i]).attr("href")?.match(idReg)![0],
      title: replaceSpaceAround($(title[i]).text()),
      desc: replaceSpaceAround(replaceDefaultDesc($(desc[i]).text())),
      date: date![i],
      viewCount: viewCount![i],
      commCount: commCount![i],
      diggCount: diggCount![i]
    };
  }
  // console.log(essayArray);
  return essayArray;
}

export function parseEssay(str: string): Object {
  let body = $(str).find(".post");
  let title = $(body).find(".postTitle > a > span").text();
  let content = $(body).find("#cnblogs_post_body").html();
  console.log(content);

  return {
    title: title,
    content: content
  };
}
