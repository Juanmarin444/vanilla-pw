console.clear();

/* Video encoding to enable frame-by-frame scrubbing. */
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;

/* Make sure the video is 'activated' on iOS devices on low-battery mode */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.load();
  video.pause();
});

/* ---------------------------------- */
/* Intro video scrolling */

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: "#main",
    start: "0%",
    end: "400%",
    scrub: true,
    pin: true
  }
});

once(video, "loadedmetadata", () => {
  tl.fromTo(video, { currentTime: 0 }, { currentTime: video.duration || 1 });
});

/* ---------------------------------- */
