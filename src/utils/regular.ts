/**
 * 替换首页随笔描述文本中的“摘要：“和”阅读全文”
 *
 * @param str 替换字符
 */
export function replaceDefaultDesc(str: string): string {
  return str.replace(/摘要：/g, "").replace(/阅读全文/g, "");
}
