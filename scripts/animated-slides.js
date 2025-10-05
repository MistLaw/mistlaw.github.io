
const moveImageLeftTween = gsap.to("#gameboySlide img", {
  x: () => '-30%',
  paused: true,
  ease: "none",
});

const h1Tween = gsap.fromTo("#gameboySlide div",
  { y: '-100%', autoAlpha: 0, paused: true },
  { y: '0%', autoAlpha: 1, duration: 0.4, ease: "power1.out", paused: true }
);

// const pTween = gsap.fromTo("#gameboySlide p",
//   { y: '-100%', autoAlpha: 0, paused: true },
//   { y: '0%', autoAlpha: 1, duration: 0.4, ease: "power1.out", paused: true }
// );

const thirdTrigger = ScrollTrigger.create({
  trigger: ".about-me",
  start: secondTrigger.end,
  end: "+=50%",
  scrub: true,
  onUpdate: (self) => {
    let buffer = 0.1;
    let adjProgress = (self.progress - buffer) / (1 - buffer);
    adjProgress = gsap.utils.clamp(0, 1, adjProgress);
    moveImageLeftTween.progress(adjProgress);

    // Trigger h1 fade-in when scroll reaches the end
    if (adjProgress >= 1 && !self.vars._h1Faded) {
      self.vars._h1Faded = true;  // prevent multiple triggers
      h1Tween.play();
      // pTween.play();
    } else if (adjProgress < 1 && self.vars._h1Faded) {
      self.vars._h1Faded = false;
      h1Tween.reverse();
      // pTween.reverse();
    }
  }
});

let slides = ["#rayTracerSlide", "#boidSlide", "#rayMarcherSlide", "#mathsSlide"]
let prevSlide = "#gameboySlide"
let prevTrigger = thirdTrigger;
let animation_duration = 0.4;
slides.forEach(slide => {
  let moveImageUpPrev = gsap.to(prevSlide + " img",
    { y: '-100vh', ease: "power1.out", duration: animation_duration, paused: true }
  );
  let moveImageUp = gsap.fromTo(slide + " img",
    { y: '100vh', x: "-30%", scale: 0.4 },
    { y: '0%', ease: "power1.out", duration: animation_duration, paused: true }
  );

  let h1Prev = gsap.to(prevSlide + " div",
    { y: '-100vh', autoAlpha: 0, duration: animation_duration, ease: "power1.out", paused: true }
  );
  let h1 = gsap.fromTo(slide + " div",
    { y: '100vh', autoAlpha: 0, paused: true },
    { y: '0%', autoAlpha: 1, duration: animation_duration, ease: "power1.out", paused: true }
  );

  // let p2Prev = gsap.to(prevSlide + " p",
  //   { y: '-100vh', autoAlpha: 0, duration: animation_duration, ease: "power1.out", paused: true }
  // );
  // let p2 = gsap.fromTo(slide + " p",
  //   { y: '100vh', autoAlpha: 0, paused: true },
  //   { y: '0%', autoAlpha: 1, duration: animation_duration, ease: "power1.out", paused: true }
  // );
  let triggerEnd = prevTrigger.end;
  let currentTrigger = ScrollTrigger.create({
    trigger: ".about-me",
    // This doesnt work because triggerEnd is an "int"
    start: triggerEnd + " +=70%",

    // Play animations when entering
    onEnter: () => {
      moveImageUp.play();
      moveImageUpPrev.play();
      h1.play();
      h1Prev.play()
      // p2.play();
      // p2Prev.play()
    },

    // Reverse animations when scrolling back up
    onLeaveBack: () => {
      moveImageUp.reverse();
      moveImageUpPrev.reverse();
      h1.reverse();
      h1Prev.reverse()
      // p2.reverse();
      // p2Prev.reverse()
    }
  });
  prevTrigger = currentTrigger;
  prevSlide = slide;
});