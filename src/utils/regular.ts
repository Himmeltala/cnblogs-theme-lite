/**
 * 替换文中换行符，再替换文中前后空格
 *
 * @param str 替换字符
 * @returns 清洗的数据
 */
export function replaceSpaceAround(str: string): string {
  return str.replace(/\n*/g, "").replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 替换首页随笔描述文本中的“摘要：“和”阅读全文”
 *
 * @param str 替换字符
 * @returns 清洗的数据
 */
export function replaceDefaultDesc(str: string): string {
  return str.replace(/摘要：/g, "").replace(/阅读全文/g, "");
}
