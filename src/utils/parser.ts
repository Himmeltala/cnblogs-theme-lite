import $ from "jquery";
import * as Regular from "./regular";
import * as DataType from "../types/data-type";

/**
 * 由于一些问题，有时候请求过来的 DOM 不是真实的 DOM，所以不能被 JQ 解析，必须先调用该函数进行转换
 *
 * @param data 被解析成 DOM 树的对象
 * @returns 返回一个真实的 DOM 树
 */
function dom(data: any) {
  return new DOMParser().parseFromString(data, "text/html");
}

/**
 * 解析随笔列表页面
 *
 * @param data dom 节点，由于这个 DOM 是真实地 DOM 树，所以不需要将其转换成 DOM
 * @param calcPage 是否筛选出页面中的分页
 * @returns 返回一个包含分页和随笔列表的对象
 */
export function parseEssayList(data: any, calcPage: boolean): { pages: string[]; list: Array<DataType.Essay> } {
  let dom = $(data).find(".forFlow > .day");

  let pages: string[] = [];
  if (calcPage) {
    let pager = $(data).find("#homepage_bottom_pager > .pager > a");
    if ($(pager).length > 1) {
      let index = 0;
      $(pager).each((i, elem) => {
        if (i != 0 && i != $(pager).length - 1) {
          pages[index++] = $(elem).text();
        }
      });
    }
  }

  let id = $(dom).find(".postTitle > .postTitle2");
  let title = $(dom).find(".postTitle");
  let desc = $(dom).find(".c_b_p_desc");
  let info = $(dom).find(".postDesc").text();
  let cover = $(dom).find(".desc_img");
  let date = info.match(/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d/g);
  let viewCount = info.match(/阅读\([0-9]+\)/g);
  let commCount = info.match(/评论\([0-9]+\)/g);
  let diggCount = info.match(/推荐\([0-9]+\)/g);

  let list: Array<DataType.Essay> = [];

  $(title).each((i, elem) => {
    list[i] = {
      postId: parseInt(
        $(id[i])
          .attr("href")!
          .match(/[0-9]+/g)![0]
      ),
      title: Regular.replaceSpaceAround($(title[i]).text()),
      desc: Regular.replaceSpaceAround(Regular.replaceDefaultDesc($(desc[i]).text())),
      date: date![i],
      viewCount: viewCount![i],
      commCount: commCount![i],
      diggCount: diggCount![i],
      cover: $(cover[i]).attr("src")
    };
  });

  return {
    pages,
    list
  };
}

/**
 * 解析随笔详细页面
 *
 * @param postId 随笔 ID
 * @param data 请求响应消息，是一个 HTML，但由于一些问题，不是一个真实的 DOM 树，所以必须要先调用 dom() 函数进行转换
 * @returns 返回随笔实体
 */
export function parseEssay(postId: number, data: any): DataType.Essay {
  return {
    postId: postId,
    title: $(data).find(".postTitle > a > span").text(),
    content: $(data).find("#cnblogs_post_body").html(),
    date: $(data).find("#post-date").text(),
    viewCount: $(data).find("#post_view_count").text(),
    commCount: $(data).find("#post_comment_count").text()
  };
}

/**
 * 解析随笔详细页面的评论列表
 *
 * \(/)[a-zA-Z\d\u4e00-\u9fa5_-]{1,}(/)\g
 *
 * @param data 同样的也需要先调用 dom 函数转换成 DOM 树
 * @returns 返回评论实体列表
 */
export function parseCommentList(data: any): Array<DataType.Comment> {
  let comments: Array<DataType.Comment> = [];

  $(dom(data))
    .find(".feedbackItem")
    .map((i, d) => {
      let anchor = $(d).find(".layer").attr("href")!.split("#")[1];
      comments[i] = {
        contenteditable: false,
        commentId: parseInt(anchor),
        space: $(d).find(`#a_comment_author_${anchor}`).attr("href"),
        author: $(d).find(`#a_comment_author_${anchor}`).text(),
        layer: $(d).find(".layer").text(),
        date: $(d).find(".comment_date").text(),
        body: $(d).find(`#comment_body_${anchor}`).html(),
        digg: Regular.replaceSpaceAround($(d).find(".comment_digg").text()),
        burry: Regular.replaceSpaceAround($(d).find(".comment_burry").text()),
        avatar: Regular.replaceSpaceAround($(d).find(`#comment_${anchor}_avatar`).text())
      };
    });

  return comments;
}

/**
 * 解析评论数量，官方默认一页是 50 条，pageIndex = 0 开始
 *
 * 40 / 50 = 0.8 意思还是第一页，100 / 50 = 2，刚好第二页，因此除了之后是一个向上取整的
 *
 * @param data 评论数量计数
 * @returns 返回一共有多少个 pageIndex
 */
export function parseCommentPages(data: any): number {
  return Math.ceil(parseInt(data) / 50);
}

/**
 * 解析随笔详细页面中的标签和分类
 *
 * @param data 同样的也需要先调用 dom 函数转换成 DOM 树
 * @returns 返回一个包含了标签和分类的对象
 */
export function parseEssayTagsAndCategories(data: any): any {
  let list = <any>{ tags: [], categories: [] };
  let _dom = dom(data);

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
