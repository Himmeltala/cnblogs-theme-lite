/**
 * loading 页面，专门用于关闭 loader
 *
 * @author Himmelbleu
 * @since 1.0
 * @date 2022 年 12 月 1 日
 * @url https://www.cnblogs.com/Himmelbleu/#/
 */

import $ from "jquery";

export function closeLoader() {
  $(".light-loading, .dark-loading").fadeOut();
}
