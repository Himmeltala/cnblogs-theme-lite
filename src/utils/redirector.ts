import config from "../config";

export enum RouteName {
  ESSAY = "Essay",
  HOME = "Home",
  CATEGORY = "Category"
}

const Reg = {
  ESSAY: /\/p\/\d+/g,
  CATEGORY: /\/category\/\d+/g
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
  }
}

export function reinstallUrl(redirection: any): string {
  return `${window.location.protocol}//${window.location.host}${config.router.space}/#/e/${redirection.text}`;
}