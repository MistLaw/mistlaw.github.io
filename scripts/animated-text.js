const text = "Hello, I'm Akif Ali, a programmer!";
const typedText = document.getElementById('typed-text');

let chars = text.split('');
typedText.textContent = "";
textWritten = "";

gsap.registerPlugin(ScrollTrigger);

const p = document.querySelector('.main-text');

// Normalize spaces
let formattedText = p.textContent.replace(/\s+/g, ' ').trim();

// Wrap each word
p.innerHTML = formattedText
  .split(/(\s+)/)
  .map(token => {
    if (token.trim() === '') return token; // keep space
    return `<span class="word-wrapper"><span class="word">${token}</span></span>`;
  })
  .join('');

gsap.from('.about-me-title', {
  scrollTrigger: {
    trigger: '.about-me-title',
    start: 'top bottom',
    end: 'top center',
    once: true,
  },
  duration: 1,
  x: "-100vw",
  ease: "none"
})

gsap.from(".skills-logos img", {
  scrollTrigger: {
    trigger: ".about-me",
    start: "top top",   // when the container hits 80% down the viewport
    toggleActions: "play none none none", // only run once
  },
  scale: 0,             // start at 0 size
  duration: 0.2,
  ease: "back.out(1.7)", // bouncy ease looks nice
  stagger: 0.1,           // animate each logo one after another
  onComplete: () => {
    tess.startAnimation = true;
  }
});

// Pin instantly
ScrollTrigger.create({
  trigger: ".about-me",
  start: "top top", // pin starts immediately at bottom
  pin: true,
  onEnter: () => gsap.set(".next-slide", { position: "fixed", top: 0, left: 0})
});

const slideTween = gsap.to(".next-slide", {
  x: "0%",
  ease: "none",
  paused: true
});

ScrollTrigger.create({
  trigger: ".about-me",
  start: "top top",
  end: "+=100%",
  scrub: true,
  onUpdate: (self) => {
  //this bit of code toggles if the slide works based on a boolean
  //probably not a good idea to limit users like this?
  // if (tess.animationDone) {
    let buffer = 0.4; // 40% of scroll is just "dead zone"
    let adjProgress = (self.progress - buffer) / (1 - buffer);

    // clamp to 0–1 so it doesn’t go negative
    adjProgress = gsap.utils.clamp(0, 1, adjProgress);

    slideTween.progress(adjProgress);
  // }
  }
});


// Animate words when they enter viewport
gsap.utils.toArray(".word").forEach(word => {
  gsap.to(word, {
    y: "0%",
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: word,          // start when the word enters viewport
      start: "bottom bottom+=200",  // start animation after 200px buffer
      toggleActions: "play none none none",
    }
  });
});

chars.forEach((char, i) => {
  gsap.to(typedText, {
    duration: 0.05,
    delay: i * 0.05,
    textContent: textWritten += char,
    ease: "none"
  });
});

// Create tween overlay
const overlayTween = gsap.to(".overlay", {
  "--mask-radius": "150%",
  ease: "none",
  paused: true
});

// ScrollTrigger
const firstTrigger = ScrollTrigger.create({
  trigger: ".about-me",
  start: "bottom+=100% bottom", // adjust for vertical scroll
  end: "+=200%",       // scroll distance for scrub
  scrub: true,
  onUpdate: (self) => {
    let buffer = 0.1;
    let adjProgress = (self.progress - buffer) / (1 - buffer);
    adjProgress = gsap.utils.clamp(0, 1, adjProgress);
    overlayTween.progress(adjProgress); // update the single tween
  }
});

//IT WORKS DONT TOUCH IT!!
const shrinkImageTween = gsap.to("#gameboySlide img", {
  scale: 0.40,
  paused: true,
  ease: "none",
});

const secondTrigger = ScrollTrigger.create({
  trigger: ".about-me",
  start: firstTrigger.end,
  end: "+=50%",
  scrub: true,
  onUpdate: (self) => {
    let buffer = 0.1;
    let adjProgress = (self.progress - buffer) / (1 - buffer);
    adjProgress = gsap.utils.clamp(0, 1, adjProgress);
    shrinkImageTween.progress(adjProgress);
  }
});