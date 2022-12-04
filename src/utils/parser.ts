import $ from "jquery";
import * as Regular from "./regular";
import * as DataType from "../types/data-type";

/**
 * 由于一些问题，有时候请求过来的 DOM 不是真实的 DOM，所以不能被 JQ 解析，必须先调用该函数进行转换
 *
 * @param data 被解析成 DOM 树的对象
 * @returns 返回一个真实的 DOM 树
 */
function parseStrToDom(data: any) {
  return new DOMParser().parseFromString(data, "text/html");
}

/**
 * 解析随笔列表页面
 *
 * @param realDOM 不知道什么原因，该接口获取到传递下来的 DOM 是能够被 jQuery 解析的，所以不需要调用 parseStrToDom 函数。
 * @param calcPage 是否继续计算随笔列表页数，一般第一次调用该 API 时设置 true，目的是获取随笔列表的页数情况，再换页之后继续调用该
 * API 时不推荐再开启，设置为 false，避免破坏翻页时分页组件的 total 值。
 */
export function parseEssayList(realDOM: any, calcPage: boolean): { pages: string[]; category?: string; list: Array<DataType.Essay> } {
  let packer = $(realDOM).find(".forFlow > .day");

  let pages: string[] = [];
  if (calcPage) {
    let pager = $(realDOM).find("#homepage_bottom_pager > .pager > a");
    if ($(pager).length > 1) {
      let index = 0;
      $(pager).each((i, elem) => {
        if (i != 0 && i != $(pager).length - 1) pages[index++] = $(elem).text();
      });
    }
  }

  let id = $(packer).find(".postTitle > .postTitle2");
  let title = $(packer).find(".postTitle");
  let desc = $(packer).find(".c_b_p_desc");
  let info = $(packer).find(".postDesc").text();
  let date = info.match(/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d/g);
  let viewCount = info.match(/阅读\([0-9]+\)/g);
  let commCount = info.match(/评论\([0-9]+\)/g);
  let diggCount = info.match(/推荐\([0-9]+\)/g);

  let list: Array<DataType.Essay> = [];

  $(packer).each((i, e) => {
    let cover = $(e).find(".c_b_p_desc > .desc_img").attr("src");

    list[i] = {
      postId: parseInt(
        $(id[i])
          .attr("href")!
          .match(/[0-9]+/g)![0]
      ),
      title: $(title[i]).text().trim(),
      desc: Regular.replaceDefaultDesc($(desc[i]).text()).trim(),
      date: date![i],
      viewCount: viewCount![i],
      commCount: commCount![i],
      diggCount: diggCount![i],
      cover: cover ? cover : ""
    };
  });

  return {
    pages,
    list,
    category: $(realDOM).find(".entrylistTitle").text()
  };
}

/**
 * 解析随笔详细页面
 *
 * @param postId 随笔 ID
 * @param realDOM 请求响应消息
 */
export function parseEssay(postId: number, realDOM: any): DataType.Essay {
  return {
    postId: postId,
    title: $(realDOM).find(".postTitle > a > span").text(),
    content: $(realDOM).find("#cnblogs_post_body").html(),
    date: $(realDOM).find("#post-date").text(),
    viewCount: $(realDOM).find("#post_view_count").text(),
    commCount: $(realDOM).find("#post_comment_count").text()
  };
}

/**
 * 解析随笔详细页面的评论列表
 *
 * \(/)[a-zA-Z\d\u4e00-\u9fa5_-]{1,}(/)\g
 *
 * @param strDOM 同样的也需要先调用 dom 函数转换成 DOM 树
 */
export function parseCommentList(strDOM: any): Array<DataType.Comment> {
  let comments: Array<DataType.Comment> = [];

  $(parseStrToDom(strDOM))
    .find(".feedbackItem")
    .map((i, elem) => {
      let anchor = $(elem).find(".layer").attr("href")!.split("#")[1];
      comments[i] = {
        updateEditable: false,
        replayEditable: false,
        commentId: parseInt(anchor),
        space: $(elem).find(`#a_comment_author_${anchor}`).attr("href"),
        author: $(elem).find(`#a_comment_author_${anchor}`).text(),
        layer: $(elem).find(".layer").text(),
        date: $(elem).find(".comment_date").text(),
        body: $(elem).find(`#comment_body_${anchor}`).html(),
        digg: $(elem).find(".comment_digg").text().trim(),
        bury: $(elem).find(".comment_burry").text().trim(),
        avatar: $(elem).find(`#comment_${anchor}_avatar`).text().trim()
      };
    });

  return comments;
}

/**
 * 解析评论数量，官方默认一页是 50 条，pageIndex = 0 开始
 *
 * 40 / 50 = 0.8 意思还是第一页，100 / 50 = 2，刚好第二页，因此除了之后是一个向上取整的
 *
 * @param json 评论数量计数
 * @returns 返回一共有多少个 pageIndex
 */
export function parseCommentPages(json: any): number {
  return Math.ceil(parseInt(json) / 50);
}

/**
 * 解析随笔详细页面中的标签和分类
 *
 * @param strDOM 同样的也需要先调用 dom 函数转换成 DOM 树
 */
export function parseEssayTagsAndCategories(strDOM: any): any {
  let list = <any>{ tags: [], categories: [] };
  let _dom = parseStrToDom(strDOM);

  $(_dom)
    .find("#BlogPostCategory > a")
    .map((i, d) => {
      list.categories[i] = {
        href: $(d).attr("href"),
        text: $(d).text()
      };
    });

  $(_dom)
    .find("#EntryTag > a")
    .map((i, d) => {
      list.tags[i] = {
        href: $(d).attr("href"),
        text: $(d).text()
      };
    });

  return list;
}

/**
 * 解析上下篇随笔
 *
 * @param strDOM 同样的也需要先调用 dom 函数转换成 DOM 树
 */
export function parsePrevNext(strDOM: any): any {
  let _dom = parseStrToDom(strDOM);

  let prevNext = { prev: {}, next: {} };

  $(_dom)
    .find("a")
    .each((i, e) => {
      let prefix = $(e).text().trim();
      if (prefix == "«") {
        prevNext["prev"] = {
          text: $(e).next("a").text(),
          href: $(e).next("a").attr("href")
        };
      } else if (prefix == "»") {
        prevNext["next"] = {
          text: $(e).next("a").text(),
          href: $(e).next("a").attr("href")
        };
      }
    });

  return prevNext;
}

/**
 * 解析分类列表页面
 *
 * @param realDOM 真实 DOM
 * @param calcPage 是否计算页数
 */
export function parseCategoryList(realDOM: any, calcPage: boolean): { pages: string[]; category?: string; list: Array<DataType.Essay> } {
  let packer = $(realDOM).find(".entrylistItem");

  let pages: string[] = [];
  if (calcPage) {
    let pager = $($(realDOM).find(".pager")[0]).find("a");
    if ($(pager).length > 1) {
      let index = 0;
      $(pager).each((i, elem) => {
        if (i != 0 && i != $(pager).length - 1) pages[index++] = $(elem).text();
      });
    }
  }

  let id = $(packer).find(".entrylistItemTitle");
  let title = $(packer).find(".entrylistItemTitle > span");
  let desc = $(packer).find(".c_b_p_desc");
  let info = $(packer).find(".entrylistItemPostDesc").text();
  let date = info.match(/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d/g);
  let viewCount = info.match(/阅读\([0-9]+\)/g);
  let commCount = info.match(/评论\([0-9]+\)/g);
  let diggCount = info.match(/推荐\([0-9]+\)/g);

  let list: Array<DataType.Essay> = [];

  $(packer).each((i, e) => {
    let cover = $(e).find(".c_b_p_desc > .desc_img").attr("src");

    list[i] = {
      postId: parseInt(
        $(id[i])
          .attr("href")!
          .match(/[0-9]+/g)![0]
      ),
      title: $(title[i]).text(),
      desc: $(desc[i]).text(),
      date: date![i],
      viewCount: viewCount![i],
      commCount: commCount![i],
      diggCount: diggCount![i],
      cover: cover ? cover : ""
    };
  });

  return {
    pages,
    list,
    category: $(realDOM).find(".entrylistTitle").text()
  };
}

export function parseTagPageList(realDom: any): DataType.TagPage {
  let title = $(realDom).find(".PostList > .postTitl2 > a");
  let desc = $(realDom).find(".PostList > .postDesc2");
  let tagTitle = $(realDom).find(".PostListTitle").text().trim();

  let list: any = [];

  $(title).each((i, e) => {
    list[i] = {
      id: parseInt(
        $(e)
          .attr("href")!
          .match(/[0-9]+/g)![0]
      ),
      title: $(e).text().trim(),
      href: $(e).attr("href"),
      date: $(desc[i]).text().match(/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d/g)![0],
      viewCount: $(desc[i]).find(".post-view-count").text().split(":")[1],
      commCount: $(desc[i]).find(".post-comment-count").text().split(":")[1],
      diggCount: $(desc[i]).find(".post-digg-count").text().split(":")[1]
    };
  });

  return {
    list,
    title: tagTitle
  };
}