import { Belongs } from "@/config";

export enum RouteName {
  ESSAY = "Essay",
  HOME = "Home",
  CATEGORY = "Category",
  TAG_PAGE = "TagPage",
  TAGS = "MyTags"
}

const Regulars = {
  ESSAY: /\/p\/\d+/g,
  CATEGORY: /\/category\/\d+/g,
  TAG_PAGE: /\/tag\/[\w\s\u4e00-\u9fa5\n.\-|_]+/g,
  MyTags: /\d/g
};

export function parseUrlData(url: string): any {
  if (Regulars.ESSAY.test(url)) {
    return {
      type: RouteName.ESSAY,
      text: String(url.match(Regulars.ESSAY)).split("/")[2].split(",")[0]
    };
  } else if (Regulars.CATEGORY.test(url)) {
    let page = String(url.match(/page=\d/g)).split("=")[1];
    return {
      type: RouteName.CATEGORY,
      page: page ? page : "1",
      id: String(url.match(Regulars.CATEGORY)).split("/")[2].split(",")[0]
    };
  } else if (Regulars.TAG_PAGE.test(url)) {
    return {
      type: RouteName.TAG_PAGE,
      tag: decodeURI(url).match(Regulars.TAG_PAGE)![0].split("/")[2]
    };
  } else if (Regulars.MyTags.test(url)) {

  }
}

function joinUrl(redirect: string): string {
  return `${window.location.protocol}//${window.location.host}${Belongs}/#/${redirect}`;
}

// @ts-ignore
export function compareUrl(url?: any, route: string): boolean {
  return url?.type && url.type === route;
}

export function reviseUrl(url: string): void {
  window.history.pushState("", "", joinUrl(url));
}