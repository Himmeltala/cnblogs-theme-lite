import $ from "jquery";

export function manageLoader() {
  setTimeout(() => {
    $(".light-loading, .dark-loading").fadeOut();
  }, 0);
}