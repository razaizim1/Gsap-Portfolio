function valueSetters() {
  gsap.set("nav a", { y: "-100%", opacity: 0 });
  gsap.set(".home span .child", { y: "100%" });
  gsap.set(".home .row1 img", { opacity: 0 });

  document.querySelectorAll("#Visual>g").forEach(function (e) {
    var char = e.childNodes[1].childNodes[1];

    char.style.strokeDasharray = char.getTotalLength() + "px";
    char.style.strokeDashoffset = char.getTotalLength() + "px";
  });
}

function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    // Create two spans
    var parent = document.createElement("span");
    var child = document.createElement("span");
    // Span classes
    parent.classList.add("parent");
    child.classList.add("child");

    // Append h1 to span
    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    // Change h1 text in child
    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

function loaderAnimation() {
  let tl = gsap.timeline();

  tl.from(".loader .child span", {
    x: 100,
    opacity: 0,
    delay: 1,
    stagger: 0.2,
    duration: 1,
    ease: Power3.easeInOut,
  });

  tl.to(".loader .parent .child", {
    y: "-100%",
    duration: 1,
    ease: Circ.easeInOut,
  });
  tl.to(".loader", {
    y: "-100%",
    duration: 1,
    ease: Circ.easeInOut,
  });
  tl.to(".green", {
    height: "100%",
    top: 0,
    duration: 1,
    delay: -2,
    ease: Expo.easeInOut,
    onComplete: function () {
      animateHomepage();
    },
  });
  tl.to(".green", {
    height: "0",
    duration: 1.5,
    delay: -0.5,
    ease: Circ.easeOut,
  });
}

function animateHomepage() {
  var tl = gsap.timeline();
  tl.to("nav a", {
    y: 0,
    opacity: 1,
    stagger: 0.05,
    ease: Expo.easeInOut,
  });

  tl.to(".home .parent .child", {
    y: 0,
    stagger: 0.1,
    duration: 1.5,
    ease: Expo.easeInOut,
  });

  tl.to(".home .row1 img", {
    opacity: 1,
    delay: -1,
    ease: Expo.easeInOut,
    onComplete: function () {
      animateSvg();
    },
  });
}

function animateSvg() {
  gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
    strokeDashoffset: 0,
    duration: 2,
    ease: Expo.easeInOut,
  });
}

// function loco() {
//   const scroll = new LocomotiveScroll({
//     el: document.querySelector("#main"),
//     smooth: true,
//   });
// }

function locoText() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true
  });
}

function cardShow() {
  document.querySelectorAll(".cnt").forEach(function (cnt) {
    console.log(cnt);
    // var showingImage;
    cnt.addEventListener("mousemove", function (dets) {
      document.querySelector(".cursor").children[
        dets.target.dataset.index
      ].style.opacity = 1;
      showingImage = dets.target;
      document.querySelector(".cursor").children[
        dets.target.dataset.index
      ].style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`;
      showingImage.style.filter = "saturate(0)";
      document.querySelector(".work").style.backgroundColor =
        "#" + dets.target.dataset.color;
    });

    cnt.addEventListener("mouseleave", function (dets) {
      document.querySelector(".cursor").children[
        showingImage.dataset.index
      ].style.opacity = 0;
      showingImage.style.filter = "saturate(1)";
      document.querySelector(".work").style.backgroundColor = "#fff";
    });
  });
}

revealToSpan();
valueSetters();
loaderAnimation();
// loco();
cardShow();
locoText()
