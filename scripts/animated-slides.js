
// const moveImageTween = gsap.from("#gameboySlide img", {
//   width: "100vw",
//   height: "100vh",
//   ease: "power1.out",
//   paused: true
// });

// const thirdTrigger = ScrollTrigger.create({
//   trigger: ".about-me",
//   start: secondTrigger.end,
//   end: "+=50%",
//   scrub: true,
//   onUpdate: (self) => {
//     let buffer = 0.1;
//     let adjProgress = (self.progress - buffer) / (1 - buffer);
//     adjProgress = gsap.utils.clamp(0, 1, adjProgress);
//     moveImageTween.progress(adjProgress);

//     // Trigger h1 fade-in when scroll reaches the end
//     if (adjProgress >= 1 && !self.vars._h1Faded) {
//       self.vars._h1Faded = true;
//     } else if (adjProgress < 1 && self.vars._h1Faded) {
//       self.vars._h1Faded = false;
//     }
//   }
// });

let slides = ["#rayTracerSlide", "#boidSlide", "#rayMarcherSlide", "#mathsSlide"];
let prevSlide = "#gameboySlide";
let prevTrigger = secondTrigger;
let animation_duration = 0.4;

slides.forEach(slide => {
  let tl = gsap.timeline({ paused: true });
  tl.to(prevSlide, { y: "-100vh", autoAlpha: 0, ease: "power1.out" }, 0)
    .fromTo(slide,
      { y: "100vh", autoAlpha: 0, scale: 0.8 },
      { y: "0%", autoAlpha: 1, scale: 1, ease: "power1.out" },
      0
    );

  let triggerEnd = prevTrigger.end;

  ScrollTrigger.create({
    trigger: slide,
    start: triggerEnd,
    end: "+=100%",
    onUpdate: self => {
      // self.progress goes from 0 to 1 as you scroll
      tl.progress(self.progress);
    }
  });

  prevTrigger = { end: triggerEnd + window.innerHeight};
  prevSlide = slide;
});