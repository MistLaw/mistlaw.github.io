// Animation loop
function animate() {
  rain_ctx.fillStyle = 'rgba(0,0,0,0.15)';
  rain_ctx.fillRect(0, 0, width, height);
  tesseract_ctx.fillStyle = '#0b0e11';
  tesseract_ctx.fillRect(0, 0, width, height);

  particles.forEach(p => {
    p.update();
    p.draw(rain_ctx);
  });
  tess.update();
  tess.draw(tesseract_ctx);

  requestAnimationFrame(animate);
}

animate();

// Handle resize
window.addEventListener('resize', () => {
  tesseract_canvas.width = document.documentElement.clientWidth;
  tesseract_canvas.height = document.documentElement.clientHeight;
  width = rain_canvas.width = document.documentElement.clientWidth;
  height = rain_canvas.height = document.documentElement.clientHeight;
  tess.position.x = width - 250;
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    ScrollTrigger.refresh();
  }
});

window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    //Its hacky but the scroll needs to be reset or the image shrinks upon reload
    //This is a none issue on non live server renders
    //But i dont like seeing it
    firstTrigger.scroll(0);
    secondTrigger.scroll(0);
    thirdTrigger.scroll(0);
    gsap.set("#gameboySlide div", { autoAlpha: 0 })
    // gsap.set("#gameboySlide p", { autoAlpha: 0 })
  }, 50); // small delay to run after Live Server forces scroll
});
