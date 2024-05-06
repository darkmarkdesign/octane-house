import Swiper from 'swiper';
import { Navigation, Parallax } from 'swiper/modules';

import 'swiper/css';

export default class Draggable {
  constructor() {
    this.runDraggable();
  }

  runDraggable() {
    $(".draggable_section").each(function (index) {
      let sectionEl = $(this);
      let canvasEl = $(this).find(".draggable_canvas");
      let handleClass = "draggable_list";
      let listEl = $(this).find("." + handleClass);
      let itemClass = ".draggable_item";
      let textEl = $(this).find(".draggable_title_text");
      let itemEl = $(this).find(itemClass);
      let scaleEl = $(this).find(".draggable-scale");
      let itemOpacity = itemEl.css("opacity");
      let columnCount = 9;
      let maxItems = columnCount * columnCount;

      // prevent all rows from looking the same
      // if total items is evenly divisible by columnCount
      if (itemEl.length % columnCount === 0) {
        // remove last itemEl in listEl
        itemEl.last().remove();
      }

      // store totalItems
      let totalItems = itemEl.length;
      // remove extra items if exceeding maxItems
      itemEl = itemEl.slice(0, maxItems);

      // fill in extra spaces with clones of original items (up to maxItems)
      while (totalItems < maxItems) {
        itemEl.each(function (index) {
          if (totalItems < maxItems) {
            $(this).clone().appendTo(listEl);
            totalItems++;
          }
        });
      }

      // update itemEl to include clones after loop
      itemEl = $(this).find(itemClass);

      // set sizes on listEl and items
      gsap.set(listEl, { width: columnCount * 100 + "%", height: columnCount * 100 + "%" });
      gsap.set(itemEl, { width: 100 / columnCount + "%", height: 100 / columnCount + "%" });
      gsap.fromTo(canvasEl, { opacity: 0 }, { opacity: 1 });

      // get all images inside our grid
      let images = $(this).find(".draggable_img");
      // timeline for when dragging
      let pressTl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.4
        }
      });
      pressTl.fromTo(
        images, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, { clipPath: "polygon(2% 2%, 98% 2%, 98% 98%, 2% 98%)" }
      );
      pressTl.to(scaleEl, { scale: 1.1 }, "<");
      pressTl.to(textEl, { filter: "blur(30px)", opacity: 0, yPercent: 100 }, "<");

      function makeSlideActive(x, y) {
        let xValue = Math.round(x * (columnCount - 1)) + 1;
        let yValue = Math.round(y * (columnCount - 1)) + 1;
        let activeIndex = (yValue - 1) * columnCount + xValue - 1;
        let activeItem = itemEl.eq(activeIndex);
        textEl.text(activeItem.find(".draggable_title").text());
        gsap.to(activeItem, { opacity: 1, duration: 0.3 });
      }


  let slider = new Dragdealer(canvasEl[0], {
    handleClass: handleClass,
    x: 0.5,
    y: 0.5,
    steps: columnCount,
    horizontal: true,
    vertical: true,
    speed: 0.1,
    loose: false,
    slide: true,
    requestAnimationFrame: true,
    dragStartCallback: function (x, y) {
      sectionEl.addClass("is-grabbing");
      gsap.to(itemEl, { opacity: itemOpacity, duration: 0.15 });
      pressTl.play();
    },
    dragStopCallback: function (x, y) {
      sectionEl.removeClass("is-grabbing");
      pressTl.reverse();
    },
    callback: function (x, y) {
      makeSlideActive(x, y);
    }
  });
  makeSlideActive(slider.getValue()[0], slider.getValue()[1]);
});
