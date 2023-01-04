import { Belongs } from "../config";

export enum RouteName {
  ESSAY = "Essay",
  HOME = "Home",
  CATEGORY = "Category",
  TAG_PAGE = "TagPage"
}

const Reg = {
  ESSAY: /\/p\/\d+/g,
  CATEGORY: /\/category\/\d+/g,
  TAG_PAGE: /\/tag\/[\d\w\s\u4e00-\u9fa5\n.\-|_]+/g
};

export function redirect(href: string): any {
  if (Reg.ESSAY.test(href)) {
    return {
      type: RouteName.ESSAY,
      text: String(href.match(Reg.ESSAY)).split("/")[2].split(",")[0]
    };
  } else if (Reg.CATEGORY.test(href)) {
    let page = String(href.match(/page=\d/g)).split("=")[1];
    return {
      type: RouteName.CATEGORY,
      page: page ? page : "1",
      id: String(href.match(Reg.CATEGORY)).split("/")[2].split(",")[0]
    };
  } else if (Reg.TAG_PAGE.test(href)) {
    return {
      type: RouteName.TAG_PAGE,
      tag: decodeURI(href).match(Reg.TAG_PAGE)![0].split("/")[2]
    };
  }
}

export function reinstallUrl(redirection: any): string {
  return `${window.location.protocol}//${window.location.host}${Belongs}/#/${redirection}`;
}