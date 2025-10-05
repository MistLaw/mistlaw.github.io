const gameboyVideosAnimations = [
  { src: "./img/projects/gameboy/Tetris.webp", duration: 33000 },
  { src: "./img/projects/gameboy/Zelda-Intro.webp", duration: 23000 },
  { src: "./img/projects/gameboy/Zelda-Gameplay.webp", duration: 7000 },
];
const rayTracerVideosAnimations = [
  { src: "./img/projects/ray-tracer/RayTracedSpheres.bmp", duration: 7000 },
  { src: "./img/projects/ray-tracer/Metallic.webp", duration: 22000 },
  { src: "./img/projects/ray-tracer/Accumulate.webp", duration: 15000 },
];
const mathsVideosAnimations = [
  { src: "./img/projects/maths-demo/Cardiod.webp", duration: 58000 },
  { src: "./img/projects/maths-demo/Julia-Set.webp", duration: 32000 },
];

const rayTracerVideo = document.getElementById("rayTracerVideo"); 
const mathsVideo = document.getElementById("mathsVideo"); 
const gameboyVideo = document.getElementById("gameboyVideo");
const overlayVideo = document.getElementById("overlayVideo");

function playNext(dom, animation, index, isOverlay= false) {
  const anim = animation[index];
  dom.src = anim.src;
  if(isOverlay){
    overlayVideo.style.backgroundImage = `url('${anim.src}')`;
  }

  setTimeout(() => {
    index = (index + 1) % animation.length; // loop back to start
    playNext(dom, animation, index);
  }, anim.duration);
}

// start the animation chain
let gameboyIndex = 0;
playNext(gameboyVideo, gameboyVideosAnimations, gameboyIndex,isOverlay=true);
let rayTracerIndex = 0;
playNext(rayTracerVideo, rayTracerVideosAnimations, rayTracerIndex);
let mathsIndex = 0;
playNext(mathsVideo, mathsVideosAnimations, mathsIndex);