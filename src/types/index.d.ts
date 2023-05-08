/// <reference path="lite-cust.d.ts" />
/// <reference path="lite-utils.d.ts" />

/**
 * Lite 配置
 */
declare namespace LiteConfig {
  /**
   * 博客配置项
   */
  let __LITE_CONFIG__: CustType.ILite;
  let blogId: number;
  /**
   * axios API URL 前缀
   */
  let baseAPI: string;
  /**
   * 博客域名
   */
  let blogApp: string;
  let isLogin: boolean;
  let isOwner: boolean;
  let userGuid: string;
  let isFollow: boolean;
  let pcDevice: boolean;
  const localSettingTemp: CustType.ILocalSetting;
  const eleHtml: HTMLHtmlElement;
}

declare const isLogined: boolean;
declare const isBlogOwner: boolean;
declare const currentBlogId: number;
declare const currentBlogApp: string;

/**
 * 博客园类型
 */
declare namespace BlogType {
  type VoteType = "Bury" | "Digg";

  /**
   * 博客园评论和随笔的基础字段，一般是调用接口之后返回过来的字段
   */
  interface IBasic {
    postId?: number;
    voteType?: VoteType;
    isAbandoned?: boolean;
  }

  /**
   * 博客园评论实体，区别于上面定义的评论实体，这个实体是根据博客园的数据库字段而来
   */
  interface IComment extends IBasic {
    // 评论 ID
    commentId?: number;
    // 评论内容
    body?: string;
    // 回复的评论 ID
    parentId?: number;
    // 当前页面的 index
    pageIndex?: number;
    // 回复评论的 ID
    parentCommentId?: number;
  }

  /**
   * 获取随笔，返回的博客园接口的字段
   */
  interface IWorks extends IBasic {}

  /**
   * 随笔投票，博客园接口需要的正确字段
   */
  interface IWorksViewPoint {
    buryCount: number;
    diggCount: number;
    feedbackCount: number;
    postId: string;
    viewCount: number;
  }

  /**
   * 有些接口返回的数据类型是博客园的字段，需要该类型进行约束
   */
  type AjaxType = Partial<{
    id: number;
    isSuccess: boolean;
    message: string;
    data: any;
  }>;
}

declare namespace StateLogic {}
