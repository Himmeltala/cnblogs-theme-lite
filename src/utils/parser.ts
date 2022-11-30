import $ from "jquery";
import * as Regular from "./regular";
import * as DataType from "../types/data-type";

function dom(data: any) {
  return new DOMParser().parseFromString(data, "text/html");
}

export function parseEssayList(data: any): Array<DataType.Essay> {
  let dom = $(data).find(".forFlow > .day");
  let id = $(dom).find(".postTitle > .postTitle2");
  let idReg = /[0-9]+/g;
  let title = $(dom).find(".postTitle");
  let desc = $(dom).find(".c_b_p_desc");
  let postDesc = $(dom).find(".postDesc").text();
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
      title: Regular.replaceSpaceAround($(title[i]).text()),
      desc: Regular.replaceSpaceAround(Regular.replaceDefaultDesc($(desc[i]).text())),
      date: date![i],
      viewCount: viewCount![i],
      commCount: commCount![i],
      diggCount: diggCount![i]
    };
  }
  return essayList;
}

export function parseEssay(postId: number, data: any): DataType.Essay {
  let dom = $(data).find(".post");

  return {
    postId: postId,
    title: $(dom).find(".postTitle > a > span").text(),
    content: $(dom).find("#cnblogs_post_body").html(),
    date: $(dom).find("#post-date").text(),
    viewCount: $(dom).find("#post_view_count").text(),
    commCount: $(dom).find("#post_comment_count").text()
  };
}

export function parseCommList(data: any): Array<DataType.Comment> {
  let comments: Array<DataType.Comment> = [];

  $(dom(data))
    .find(".feedbackItem")
    .map((i, d) => {
      let anchor = $(d).find(".layer").attr("href")!.split("#")[1];
      comments[i] = {
        author: $(d).find(`#a_comment_author_${anchor}`).text(),
        layer: $(d).find(".layer").text(),
        date: $(d).find(".comment_date").text(),
        body: $(d).find(`#comment_body_${anchor}`).find("p").text(),
        digg: Regular.replaceSpaceAround($(d).find(".comment_digg").text()),
        burry: Regular.replaceSpaceAround($(d).find(".comment_burry").text()),
        avatar: Regular.replaceSpaceAround($(d).find(`#comment_${anchor}_avatar`).text())
      };
    });

  return comments;
}

function mixColor() {
  let colors: Array<string> = ["#93b5cf", "#5698c3", "#2bae85", "#66c18c", "#d1c2d3", "#806d9e", "#525288", "#158bb8"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function parseEssayTagsAndCategories(data: any): any {
  let list = <any>{ tags: [], categories: [] };
  let _dom = dom(data);

  $(_dom)
    .find("#BlogPostCategory > a")
    .map((i, d) => {
      list.categories[i] = {
        href: $(d).attr("href"),
        text: $(d).text(),
        color: mixColor()
      };
    });

  $(_dom)
    .find("#EntryTag > a")
    .map((i, d) => {
      list.tags[i] = {
        href: $(d).attr("href"),
        text: $(d).text(),
        color: mixColor()
      };
    });

  return list;
}
