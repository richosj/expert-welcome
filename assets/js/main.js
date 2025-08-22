(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
document.addEventListener("DOMContentLoaded", function() {
  const courseSelect = document.getElementById("courseSelect");
  const courseLayer = document.getElementById("courseLayer");
  const closeCourseLayer = document.getElementById("closeCourseLayer");
  const courseItems = document.querySelectorAll(".course-item");
  if (courseSelect) {
    courseSelect.addEventListener("click", function() {
      courseLayer.classList.add("active");
      courseSelect.classList.add("active");
    });
  }
  if (closeCourseLayer) {
    closeCourseLayer.addEventListener("click", function() {
      courseLayer.classList.remove("active");
      courseSelect.classList.remove("active");
    });
  }
  if (courseLayer) {
    courseLayer.addEventListener("click", function(e) {
      if (e.target === courseLayer) {
        courseLayer.classList.remove("active");
        courseSelect.classList.remove("active");
      }
    });
  }
  courseItems.forEach((item) => {
    item.addEventListener("click", function() {
      courseItems.forEach((i) => i.classList.remove("selected"));
      this.classList.add("selected");
      const selectText = courseSelect.querySelector(".select-text");
      if (selectText) {
        selectText.textContent = this.textContent;
      }
      courseLayer.classList.remove("active");
      courseSelect.classList.remove("active");
    });
  });
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && courseLayer.classList.contains("active")) {
      courseLayer.classList.remove("active");
      courseSelect.classList.remove("active");
    }
  });
});
