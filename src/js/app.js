import "./jquery-global.js";
import marquee from "jQuery.Marquee";
import { tns } from "../../node_modules/tiny-slider/src/tiny-slider";
import Parallax from "parallax-js";

let nav = document.querySelector("nav"),
  open_nav_btn = document.querySelector(".open-nav"),
  close_nav_btn = document.querySelector(".close-nav"),
  slider_prev = document.querySelector(".js-slider-prev"),
  slider_next = document.querySelector(".js-slider-next"),
  more = document.querySelector(".more");

if (document.getElementById("parallax")) {
  let scene = document.getElementById("parallax"),
    parallaxInstance = new Parallax(scene);
}

if (document.querySelector("#slider")) {
  let slider = tns({
    container: "#slider",
    items: 1,
    slideBy: "page",
    controls: false,
    nav: false
  });

  if (slider_prev)
    slider_prev.addEventListener("click", () => {
      slider.goTo("prev");
    });
  if (slider_next)
    slider_next.addEventListener("click", () => {
      slider.goTo("next");
    });
}

$(window).on("load", function() {
  if ($(".run-string-main").length) {
    $(".run-string-main").marquee({
      duration: 15000,
      direction: "left",
      duplicated: true,
      startVisible: true
    });
  }
  if ($(".run-string-left").length) {
    $(".run-string-left").marquee({
      duration: 30000,
      direction: "left",
      duplicated: true,
      startVisible: true
    });
  }
  if ($(".run-string-right").length) {
    $(".run-string-right").marquee({
      duration: 30000,
      direction: "right",
      duplicated: true,
      startVisible: true
    });
  }
});

if (more) {
  let flag = true,
    text_cont = document.querySelector(".hidden-text-container"),
    text = more.querySelector("span");

  more.addEventListener("click", show_info);

  function show_info() {
    if (flag) {
      text_cont.classList.add("open");
      more.classList.add("open");
      text.innerText = "Приховати";
    } else {
      text_cont.classList.remove("open");
      more.classList.remove("open");
      text.innerText = "Показати більше";
    }
    flag = !flag;
  }
}

if (open_nav_btn)
  open_nav_btn.addEventListener("click", () => {
    document.querySelector("body").style.cssText = "overflow:hidden;";
    nav.classList.add("open");
  });
if (close_nav_btn)
  close_nav_btn.addEventListener("click", () => {
    document.querySelector("body").style.cssText = "overflow:auto;";
    nav.classList.remove("open");
  });

function scroll_element() {
  jQuery(".js-hidden").each(function() {
    if (
      jQuery(this).offset().top <=
      jQuery(window).scrollTop() + jQuery(window).height()
    ) {
      jQuery(this).addClass("show");
    } else {
      //Действия, когда элемент вне области видимости
    }
  });
}

jQuery(window).scroll(function() {
  scroll_element();
});
