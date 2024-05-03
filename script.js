

function resetWebflow(data) {
  let dom = $(new DOMParser().parseFromString(data.next.html, "text/html")).find("html");
  // reset webflow interactions
  $("html").attr("data-wf-page", dom.attr("data-wf-page"));
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();
  // reset w--current class
  $(".w--current").removeClass("w--current");
  $("a").each(function () {
    if ($(this).attr("href") === window.location.pathname) {
      $(this).addClass("w--current");
    }
  });
  // reset scripts
  dom.find("[data-barba-script]").each(function () {
    let codeString = $(this).text();
    if (codeString.includes("DOMContentLoaded")) {
      let newCodeString = codeString.replace(
        /window\.addEventListener\("DOMContentLoaded",\s*\(\s*event\s*\)\s*=>\s*{\s*/, "");
      codeString = newCodeString.replace(/\s*}\s*\);\s*$/, "");
    }
    let script = document.createElement("script");
    script.type = "text/javascript";
    if ($(this).attr("src")) script.src = $(this).attr("src");
    script.text = codeString;
    document.body.appendChild(script).remove();
  });
}

barba.hooks.enter((data) => {
  gsap.set(data.next.container, { position: "fixed", top: 0, left: 0, width: "100%" });
});
barba.hooks.after((data) => {
  gsap.set(data.next.container, { position: "relative" });
  $(window).scrollTop(0);
  resetWebflow(data);
});
barba.init({
  preventRunning: true,
  transitions: [
  {
    sync: true,
    enter(data) {
      let tl = gsap.timeline({
        defaults: {
          duration: 1.2,
          //  opacity: 0.8,
          scale: 1.15,
          ease: CustomEase.create("custom",
            "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1 "),
          y: "-45vh"

        }
      });

      tl.to(data.current.container, {

        ease: CustomEase.create("custom",
          "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1 "),
        opacity: 0.5
      });

      // Animate next container (incoming)
      tl.from(data.next.container, { y: "100vh" },
        "<"); // Move container down from 100vh height
      return tl;
    }
  }]
});
