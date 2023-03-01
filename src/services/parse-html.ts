/**
 * 提供解析博客园 HTML 或字符 HTML 的各种基础 API
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";
import { CustType } from "@/types/data-type";
import { replaceText, parseUnit } from "@/utils/common";

/**
 * 由于一些问题，有时候请求过来的 DOM 不是真实的 DOM，所以不能被 JQ 解析，必须先调用该函数进行转换
 *
 * @param strDOM 被解析成 DOM 树的对象
 * @returns 返回一个真实的 DOM 树
 */
export function parseDom(strDOM: any) {
  return new DOMParser().parseFromString(strDOM, "text/html");
}

/**
 * 获取页数
 */
function getMaxPage(dom: any): number {
  const reg = $(dom)
    .text()
    .match(/[1-9]+/g);
  if (reg) {
    return reg.map(i => parseInt(i)).pop();
  } else {
    return 0;
  }
}

/**
 * 解析随笔列表页面
 *
 * @param realDOM 不知道什么原因，该接口获取到传递下来的 DOM 是能够被 jQuery 解析的，所以不需要调用 parseStrToDom 函数。
 * @param calc 是否继续计算随笔列表页数，一般第一次调用该 API 时设置 true，目的是获取随笔列表的页数情况，再换页之后继续调用该
 * API 时不推荐再开启，设置为 false，避免破坏翻页时分页组件的 total 值。
 */
export function parseEssayList(realDOM: any): CustType.IEssayList {
  const id = $(realDOM).find(".postTitle2");
  const head = $(realDOM).find(".postTitle");
  const desc = $(realDOM).find(".c_b_p_desc");
  const data = $(realDOM).find(".postDesc").text();
  const date = data.match(/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d/g);
  const view = data.match(/阅读\([0-9]+\)/g);
  const comm = data.match(/评论\([0-9]+\)/g);
  const digg = data.match(/推荐\([0-9]+\)/g);
  const array: Array<CustType.IEssay> = [];

  $(desc).each((i, e) => {
    array.push({
      id: $(id[i])
        .attr("href")!
        .match(/[0-9]+/g)![0],
      text: replaceText($(head[i]).text().trim(), [/\[置顶\]/g]),
      desc: replaceText($(desc[i]).text(), [/阅读全文/g]),
      date: date![i],
      view: view![i],
      comm: comm![i],
      digg: digg![i],
      surface: $(e).find(".desc_img").attr("src") || "",
      isLocked: !!$(id[i]).find(`img[title="密码保护"]`).attr("title"),
      isOnlyMe: !!$(id[i]).find(`img[title="仅自己可见"]`).attr("title"),
      isTop: $(head[i]).find(".pinned-post-mark").text() === "[置顶]"
    });
  });

  return {
    page: getMaxPage($(realDOM).find("#homepage_top_pager > .pager")),
    data: array
  };
}

/**
 * 解析随笔详细页面
 *
 * @param postId 随笔 ID
 * @param realDOM 请求响应消息
 */
export function parseEssay(postId: string, realDOM: any): CustType.IEssay {
  return {
    id: postId,
    text: $(realDOM).find(".postTitle > a > span").text(),
    content: $(realDOM).find("#cnblogs_post_body").html(),
    date: $(realDOM).find("#post-date").text(),
    view: $(realDOM).find("#post_view_count").text(),
    comm: $(realDOM).find("#post_comment_count").text(),
    isLocked: $(realDOM).find(`img[title="密码保护"]`).attr("title") ? true : false
  };
}

/**
 * 解析随笔详细页面的评论列表
 *
 * \(/)[a-zA-Z\d\u4e00-\u9fa5_-]{1,}(/)\g
 *
 * @param strDOM 同样的也需要先调用 dom 函数转换成 DOM 树
 */
export function parseCommentList(strDOM: any): Array<CustType.IComment> {
  let comments: Array<CustType.IComment> = [];

  $(parseDom(strDOM))
    .find(".feedbackItem")
    .map((i, elem) => {
      let anchor = $(elem).find(".layer").attr("href")!.split("#")[1];
      comments[i] = {
        isEditing: false,
        isRepling: false,
        commentId: anchor,
        space: $(elem).find(`#a_comment_author_${anchor}`).attr("href"),
        author: $(elem).find(`#a_comment_author_${anchor}`).text(),
        layer: $(elem).find(".layer").text(),
        date: $(elem).find(".comment_date").text(),
        content: $(elem).find(`#comment_body_${anchor}`).html(),
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
 * 解析随笔详细页面中的属性：标签、分类
 *
 * @param strDOM 同样的也需要先调用 dom 函数转换成 DOM 树
 */
export function parseEssayProps(strDOM: any): CustType.IEssayProps {
  const array = <CustType.IEssayProps>{ tags: [], sorts: [] };
  const dom = parseDom(strDOM);

  $(dom)
    .find("#BlogPostCategory > a")
    .map((i, d) => {
      array.sorts[i] = {
        href: $(d)
          .attr("href")!
          .match(/\/category\/\d+/g)![0]
          .split("/")[2]
          .split(",")[0],
        text: $(d).text()
      };
    });

  $(dom)
    .find("#EntryTag > a")
    .map((i, d) => {
      array.tags[i] = {
        text: $(d).text()
      };
    });

  return array;
}

/**
 * 解析上下篇随笔
 *
 * @param strDOM 同样的也需要先调用 dom 函数转换成 DOM 树
 */
export function parsePrevNext(strDOM: any): CustType.IPrevNext {
  const prevNext: CustType.IPrevNext = { prev: {}, next: {} };

  $(parseDom(strDOM))
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
 * @param dom 真实 DOM
 * @param calc 是否计算页数
 */
export function parseEssaySort(dom: any): CustType.IEssaySort {
  const _dom = $(dom).find(".entrylistItem");

  const id = $(_dom).find(".entrylistItemTitle");
  const title = $(_dom).find(".entrylistItemTitle > span");
  const desc = $(_dom).find(".c_b_p_desc");
  const postDesc = $(_dom).find(".entrylistItemPostDesc").text();
  const date = postDesc.match(/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d/g);
  const view = postDesc.match(/阅读\([0-9]+\)/g);
  const comm = postDesc.match(/评论\([0-9]+\)/g);
  const digg = postDesc.match(/推荐\([0-9]+\)/g);

  const list: Array<CustType.IEssay> = [];
  $(_dom).each((i, e) => {
    list.push({
      id: $(id[i])
        .attr("href")
        .match(/[0-9]+/g)[0],
      text: $(title[i]).text(),
      desc: $(desc[i]).text(),
      date: date![i],
      view: view![i],
      comm: comm![i],
      digg: digg![i],
      surface: $(e).find(".c_b_p_desc > .desc_img").attr("src") || ""
    });
  });

  return {
    desc: $(dom).find(".entrylistTitle .category-crumb-item").attr("title"),
    data: list,
    page: getMaxPage($(dom).find("#mainContent .pager")[0]),
    hint: $(dom).find(".entrylistTitle").text() || ""
  };
}

/**
 * 解析标签页下的随笔列表
 *
 * @param dom 真实 DOM
 */
export function parseMarkSort(dom: any): CustType.ITagSort {
  const title = $(dom).find(".PostList > .postTitl2 > a");
  const describe = $(dom).find(".PostList > .postDesc2");
  const tagTitle = $(dom).find(".PostListTitle").text().trim();
  const array: any = [];

  $(title).each((i, e) => {
    array[i] = {
      id: parseInt(
        $(e)
          .attr("href")!
          .match(/[0-9]+/g)![0]
      ),
      title: $(e).text().trim(),
      href: $(e).attr("href"),
      date: $(describe[i])
        .text()
        .match(/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d/g)![0],
      view: $(describe[i]).find(".post-view-count").text().split(":")[1],
      comm: $(describe[i]).find(".post-comment-count").text().split(":")[1],
      digg: $(describe[i]).find(".post-digg-count").text().split(":")[1]
    };
  });

  return {
    data: array,
    hint: tagTitle
  };
}

function fillColumn(dom: any, selector: string, success: (e: any, matched?: any) => void, regexp?: RegExp) {
  $(dom)
    .find(selector)
    .each((i, e) => {
      if (regexp) {
        const matched = $(e)?.attr("href")?.match(regexp);
        if (matched) {
          success(e, matched);
        }
      } else {
        success(e);
      }
    });
}

/**
 * 解析侧边栏分类列表、标签列表，... 列表
 */
export function parseCabinetColumn(dom: any): CustType.ICabinetColumn {
  const _dom = parseDom(dom);

  const column: CustType.ICabinetColumn = {
    essaySort: [],
    essayArchive: [],
    articleArchive: [],
    articleSort: [],
    latestEssayList: [],
    latestComments: [],
    rankings: [],
    tagList: [],
    albumn: []
  };

  fillColumn(
    _dom,
    "#sidebar_recentposts ul li > a",
    (e, matched) => {
      column.latestEssayList.push({
        id: matched[0],
        text: $(e).text()
      });
    },
    /[0-9]+/g
  );

  fillColumn(
    _dom,
    "#sidebar_toptags ul li > a",
    (e, matched) => {
      column.tagList.push({
        id: matched[1],
        text: $(e).text()
      });
    },
    /tag\/(.[^\/]+)/
  );

  fillColumn(_dom, "#sidebar_scorerank ul li", e => {
    column.rankings.push({
      text: $(e).text()
    });
  });

  fillColumn(
    _dom,
    "#sidebar_postcategory ul li > a",
    (e, matched) => {
      column.essaySort.push({
        id: matched[0],
        text: $(e).text()
      });
    },
    /[0-9]+/g
  );

  fillColumn(
    _dom,
    "#sidebar_postarchive ul li > a",
    (e, matched) => {
      const dateSplit = matched[1].split("/");
      column.essayArchive.push({
        id: `${dateSplit[0]}-${dateSplit[1]}`,
        text: $(e).text()
      });
    },
    /archive\/([0-9]+\/[0-9]+)/
  );

  fillColumn(
    _dom,
    "#sidebar_imagecategory ul li > a",
    (e, matched) => {
      column.albumn.push({
        id: matched[1],
        text: $(e).text()
      });
    },
    /gallery\/([0-9]+)/
  );

  fillColumn(
    _dom,
    "#sidebar_articlecategory ul li > a",
    (e, matched) => {
      column.articleSort.push({
        id: matched[0],
        text: $(e).text()
      });
    },
    /[0-9]+/g
  );

  fillColumn(
    _dom,
    "#sidebar_articlearchive ul li > a",
    (e, matched) => {
      column.articleArchive.push({
        id: matched[1],
        text: $(e).text()
      });
    },
    /archive\/([0-9]+\/[0-9]+)/
  );

  let count = 1;
  let boundary = false;
  let comment = {
    id: "",
    title: "",
    content: "",
    author: ""
  };

  $(_dom)
    .find("#sidebar_recentcomments ul li")
    .each((i, e) => {
      if (boundary) boundary = false;

      if (!boundary) {
        if ($(e).attr("class") === "recent_comment_title") {
          comment.title = $(e).find("a").text();
          comment.id = $(e)
            .find("a")
            .attr("href")
            .match(/[0-9]+/g)[0];
        } else if ($(e).attr("class") === "recent_comment_body") {
          comment.content = $(e).text();
        } else if ($(e).attr("class") === "recent_comment_author") {
          comment.author = replaceText($(e).text(), [/--/g]);
        }
      }

      if (count % 3 == 0) {
        boundary = true;
        column.latestComments.push(comment);
        comment = {
          id: "",
          title: "",
          content: "",
          author: ""
        };
      }
      count++;
    });

  return column;
}

/**
 * 解析侧边栏博主主人基本的昵称、粉丝数、园龄等数据
 *
 * @param strDOM 真实 DOM
 */
export function parseAuthorData(strDOM: string): Array<CustType.IAuthor> {
  const array: Array<CustType.IAuthor> = [];
  const a = $(parseDom(strDOM)).find("#profile_block > a");
  $(a).each((i, e) => {
    array.push({ text: $(e).text().trim(), href: $(e).attr("href")! });
  });
  return array;
}

/**
 * 解析博主主人的随笔、文章、评论、阅读等数据
 *
 * @param strDOM 真实 DOM
 */
export function parseMasterData(strDOM: string): Array<CustType.IMasterData> {
  const array: Array<CustType.IMasterData> = [];
  $(parseDom(strDOM))
    .find("span")
    .each((i, d) => {
      if ($(d).attr("id")) {
        const t = $(d).text();
        const text = t.match(/^[\u4e00-\u9fa5]*/g)[0];
        let digg = t.match(/\d+/g)[0];
        if (i === 3) digg = parseUnit(digg);
        array.push({ text, digg });
      }
    });
  return array;
}

/**
 * 解析侧边栏博客排行信息。
 *
 * @param strDOM 真实 DOM
 */
export function parseCabinetRankList(strDOM: string): CustType.ICabinetRankList[] {
  const array: Array<CustType.ICabinetRankList> = [];
  $(parseDom(strDOM))
    .find("li")
    .each((i, d) => {
      const t = $(d).text().trim();
      const text = t.match(/^[\u4e00-\u9fa5]*/g)[0];
      const digg = t.match(/\d+/g)[0];
      array.push({ text, digg });
    });
  return array;
}

/**
 * 解析博客阅读排行榜
 *
 * @param strDOM 真实 DOM
 */
export function parseCabinetTopList(strDOM: string): CustType.ICabinetTopList[] {
  const array: Array<CustType.ICabinetTopList> = [];
  $(parseDom(strDOM))
    .find("#TopViewPostsBlock ul > li > a")
    .each((i, e) => {
      array.push({
        id: $(e)
          .attr("href")
          ?.match(/\/p\/\d+/g)![0]
          .split("/")[2],
        text: replaceText($(e).text().trim(), [/\n+/g])
      });
    });
  return array;
}

export function parseMarks(realDOM: any): Array<CustType.ITag> {
  const array: Array<CustType.ITag> = [];
  $(realDOM)
    .find("#MyTag1_dtTagList")
    .find("td")
    .each(function (i, el) {
      const count = parseInt($(el).attr("data-use-count"));
      const href = $(el).find("a").attr("href");
      const text = $(el).find("a").text();
      array.push({ count, href, text });
    });
  return array;
}

/**
 * 解析输入密码之后返回的 DOM，查找是否有错误密码提示
 *
 * @param realDOM 真实 DOM
 * @returns 输入密码正确返回 true
 */
export function parseIsUnLock(realDOM: any): boolean {
  const isError = $(realDOM).find(".field-validation-error")?.text();
  if (isError && isError === "密码错误") {
    return false;
  } else if (!isError) {
    return true;
  }
}

export function parseSortChild(dom: any): CustType.IEssaySortChild[] {
  const result: any[] = [];
  $(dom)
    .find("li")
    .each((i, el) => {
      result.push({
        id: $(el).attr("data-category-id"),
        text: $(el).find(".tree-categories-item-title-right").text()
      });
    });
  return result;
}
