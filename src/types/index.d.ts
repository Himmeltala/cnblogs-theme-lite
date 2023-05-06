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

/**
 * Lite 类型
 */
declare namespace CustType {
  /**
   * 随笔/文章
   */
  type IWorks = Partial<{
    id: string;
    // 随笔标题
    text: string;
    content: string;
    desc: string;
    date: string;
    view: string;
    comm: string;
    digg: string;
    surface: string;
    // 文章是否被密码锁定
    isLocked: boolean;
    // 是否仅限于自己可见
    isOnlyMe: boolean;
    // 是否置顶
    isTop: boolean;
  }>;

  /**
   * 评论
   */
  type IComment = Partial<{
    // 是否正在编辑
    isEditing: boolean;
    // 是否正在回复
    isAnsling: boolean;
    // 评论 ID
    commentId: string;
    // 个人主页地址
    space: string;
    // 楼层
    layer: string;
    date: string;
    author: string;
    digg: string;
    bury: string;
    avatar: string;
    postId: string;
    content: string;
    // 回复评论 ID
    parentCommentId: number;
    // 当前评论所在评论列表的页数
    pageIndex: number;
  }>;

  /**
   * 标签
   */
  interface IMark {
    count: number;
    href: string;
    text: string;
  }

  /**
   * 随笔列表
   */
  type IWorksList = Partial<{
    page: number;
    hint: string;
    data: IWorks[];
  }>;

  /**
   * 随笔列表，用于分类或标签区分的随笔列表
   */
  interface IWorksList2 extends IWorksList {
    desc?: string;
    // 子分类描述
    desc2?: string;
    isArticle?: boolean;
  }

  /**
   * 随笔的分类和标签数组
   */
  interface IWorksProps {
    tags: { text: string }[];
    sorts: { href: string; text: string }[];
  }

  /**
   * 二级分类
   */
  interface IWorksL2 {
    id: string;
    text: string;
  }

  /**
   * 侧边栏标签和分类数组
   */
  interface IMenuColumn {
    essaySort: { id: string; text: string }[];
    essayArchive: { id: string; text: string }[];
    articleSort: { id: string; text: string }[];
    articleArchive: { id: string; text: string }[];
    latestEssayList: { id: string; text: string }[];
    latestComments: { id: string; title: string; content: string; author: string }[];
    rankings: { text: string }[];
    tagList: { id: string; text: string }[];
    albumn: { id: string; text: string }[];
  }

  /**
   * 第一种：
   * 随笔数量、文章数量、评论数量、阅读数量
   *
   * 第二种：
   * 粉丝、昵称、关注、园龄
   *
   * 第三种：
   * 随笔上一篇或下一篇随笔数据类型
   */
  type IMenuItemData = Partial<{
    id: string;
    // 文本描述
    text: string;
    digg: string;
    href: string;
  }>;

  /**
   * 侧边栏阅读排行榜
   */
  interface ITopList {
    topView: IMenuItemData[];
    topComments: IMenuItemData[];
    topDigg: IMenuItemData[];
  }

  /**
   * 上一篇或下一篇随笔
   */
  interface IPrevNext {
    prev: IMenuItemData;
    next: IMenuItemData;
  }

  interface AlbumnItem {
    id: string;
    src: string;
  }

  /**
   * 博客配置项
   */
  interface ILite {
    // github
    github?: string;
    // 网站 icon
    icon?: string;
    // 侧边栏配置项
    cabinet?: { avatar?: string; signature?: string };
    // 目录配置项
    catalog?: { level?: boolean };
    // 铭牌
    nameplate?: {
      tags?: string[];
      connection?: { name: string; text: string; svg?: string; img?: string }[];
      warehouse?: { url: string; text: string }[];
      experience?: { text: string; date: string }[];
      intro?: string;
      gossip?: string;
      photo?: { disabled: boolean; src?: string[] };
    };
    // 技能栈配置项
    graph?: {
      strokeColor?: string;
      alpha?: number;
      sides?: number;
      layer?: number;
      lineWidth?: number;
      textSize?: number;
      lineColor?: string;
      textColor?: string;
      data?: { title: string; star: number }[];
    };
    // 我的链接配置项
    links?: { href: string; text: string }[];
    // 推荐书籍配置项
    books?: { href?: string; text: string; img: string; author: string; rate: number }[];
  }

  type ToggleType = Record<string, { open: boolean; show: boolean }>;
  interface IBox {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  }

  /**
   * Lite 主题设置数据类型
   */
  interface ILocalSetting {
    // 主题
    theme?: { color?: string; mode?: string; codeFont?: string; mainFont?: string };
    // 字体
    font?: {
      size?: { level1?: number; level2?: number; level3?: number; level4?: number; level5?: number; level6?: number };
      dark?: { color?: { level1?: string; level2?: string; level3?: string } };
      light?: { color?: { level1?: string; level2?: string; level3?: string } };
    };
    // 卡片
    card?: { padding?: IBox; margin?: IBox; radius?: number; color?: string; open?: boolean };
    // 背景
    background?: { src?: string; open?: boolean; filter?: number };
    // pages
    pages?: {
      home?: { padding?: IBox; margin?: IBox };
      writing?: { padding?: IBox; margin?: IBox; code?: { light?: { color?: string }; dark?: { color?: string } } };
      gallery?: { padding?: IBox; margin?: IBox };
      sort?: { padding?: IBox; margin?: IBox };
      markList?: { padding?: IBox; margin?: IBox };
      markSort?: { padding?: IBox; margin?: IBox };
    };
    listing?: { padding?: IBox; margin?: IBox };
    article?: { padding?: IBox; margin?: IBox };
    // 工具箱
    toolkits?: { pin?: boolean };
    openPager?: boolean;
    githubPostion?: "left" | "right";
    // 中间内容
    content?: { width?: number; padding?: IBox; margin?: IBox };
    // 陈列柜
    cabinet?: {
      position?: { left?: number; right?: number; break?: boolean };
      left?: { pin?: boolean; padding?: IBox; margin?: IBox };
      right?: { pin?: boolean; padding?: IBox; margin?: IBox };
      toggles?: ToggleType;
      width?: number;
      break?: boolean;
    };
    other?: {
      github?: {
        position?: "left" | "right";
      };
      pagation: {
        pin?: boolean;
      };
    };
  }
}

/**
 * Lite 工具
 */
declare namespace LiteUtils {
  function endLoading(): void;
  function startLoading(): void;
  function openImageUploadWindow(el: string, onUploaded: (img: string) => void): void;
  function reloadObjProps(source: CustType.ILocalSetting, template: CustType.ILocalSetting): CustType.ILocalSetting;
  function setTitle(title?: string);
  function scrollIntoView(selector: string);

  namespace Random {
    function get(src: string[], max?: number): number[];
  }

  namespace Log {
    function primary(title: string, msg: string): void;
    function warning(title: string, msg: string): void;
  }

  namespace Parser {
    function unit(num: string): string;
  }

  namespace Text {
    function replace(source: string, regExps: RegExp[], replacement?: string[]): string;
    function split(str: string, regex: RegExp, keys: number[], values: string[]): string;
  }

  namespace Router {
    function go(params: { path: string; router?: Router }): void;
  }
}

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

  function getLocalSetting(): RemovableRef<CustType.ILocalSetting>;
  function useLite(dev?: Function, pro?: Function);
}

declare const isLogined: boolean;
declare const isBlogOwner: boolean;
declare const currentBlogId: number;
declare const currentBlogApp: string;
