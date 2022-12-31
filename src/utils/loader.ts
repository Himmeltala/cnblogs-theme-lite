import $ from "jquery";

export function closeLoader() {
  setTimeout(() => {
    $(".light-loading, .dark-loading").fadeOut();
  }, 0);
}