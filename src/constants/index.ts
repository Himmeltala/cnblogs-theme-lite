export namespace RouterConstants {
  export enum Name {
    INDEX = "Index",
    WORKS = "Works",
    WORKS_BY_SORT = "WorksBySort",
    WORKS_BY_ARCHIVE = "WorksByArchive",
    WORKS_BY_MARK = "WorksByMark",
    WORKS_BY_CALENDAR = "WorksByCalendar",
    MARK_LIST = "MarkList",
    ALBUMN = "Albumn",
    ALBUMN_ITEM = "AlbunItem"
  }

  export namespace Path {
    /**
     * @returns "/"
     */
    export function INDEX() {
      return "/";
    }

    /**
     * @param id 随笔或文章 ID
     * @returns "/p/:id"
     */
    export function WORKS(id?: string | number) {
      if (id) {
        return `/p/${id}`;
      } else return "/p/:id";
    }

    /**
     * @param tag 标签
     * @returns "/mark/:tag"
     */
    export function WORKS_BY_MARK(tag?: string) {
      if (tag) {
        return `/mark/${tag}`;
      } else return "/mark/:tag";
    }

    /**
     * @param id 文章或随笔 ID
     * @returns "/sort/:id"
     */
    export function WORKS_BY_SORT(id?: string | number) {
      if (id) {
        return `/sort/${id}`;
      } else return "/sort/:id";
    }

    /**
     *
     * @param mode a -> 文章；p -> 随笔；d -> 从日历点击过来的
     * @param date 日期
     * @returns "/archive/:mode/:date"
     */
    export function WORKS_BY_ARCHIVE(mode?: "a" | "p" | "d", date?: string) {
      if (mode && date) {
        return `/archive/${mode}/${date}`;
      } else return "/archive/:mode/:date";
    }

    /**
     * @returns "/calendar"
     */
    export function WORKS_BY_CALENDAR() {
      return "/calendar";
    }

    /**
     * @returns "/marks"
     */
    export function MARK_LIST() {
      return "/marks";
    }

    /**
     * @param id 相册 ID
     * @returns "/albumn/:id"
     */
    export function ALBUMN(id?: string | number) {
      if (id) {
        return `/albumn/${id}`;
      } else return "/albumn/:id";
    }

    /**
     * @param id 照片 ID
     * @returns "/albumn/item/:id"
     */
    export function ALBUMN_ITEM(id?: string | number) {
      if (id) {
        return `/albumn/item/${id}`;
      } else return "/album/item/:id";
    }
  }

  export namespace Regx {
    export const WORKS = /\/p\/\d+.html/g;
    export const WORKS_BY_SORT = /\/category\/\d+/g;
    export const WORKS_BY_MARK = /\/tag\/[\w\s\u4e00-\u9fa5\n\-\_%]+/g;
    export const ARTICLES = /\/articles\/\d+.html/g;
    export const ALBUMN_ITEM = /\/gallery\/image\/\d+/g;
  }
}

export namespace LiteConstants {
  export const ThemeColors = [
    "#ff4500",
    "#ff8c00",
    "#ffd700",
    "#90ee90",
    "#00ced1",
    "#409eff",
    "#c71585",
    "rgba(255, 69, 0, 0.68)",
    "rgb(255, 120, 0)",
    "hsv(51, 100, 98)",
    "hsva(120, 40, 94, 0.5)",
    "hsl(181, 100%, 37%)",
    "hsla(209, 100%, 56%, 0.73)",
    "#c7158577"
  ];

  export namespace CssVars {
    export const themeColor = "--l-theme-color";
    export const bgFilter = "--l-bg-filter";
    export const mainFont = "--l-main-font-family";
    export const codeFont = "--l-code-font-family";
    export const cabinetWidth = "--l-cabinet-width";
    export const contentWidth = "--l-content-width";
    export const codeBg = "--l-code-bg";
    export const boxBg = "--l-box-bg";
  }

  export enum ProvideKey {
    CATALOG_DISABLED = "catalogDisabled"
  }
}
