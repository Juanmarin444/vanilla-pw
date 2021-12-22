console.clear();
/* The encoding is super important here to enable frame-by-frame scrubbing. */

// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
// console.log(video, src);

/* Make sure the video is 'activated' on iOS */
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
/* Scroll Control! */

gsap.registerPlugin(ScrollTrigger);

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
  console.log('loaded');
  tl.fromTo(
    video,
    {
      currentTime: 0
    },
    {
      currentTime: video.duration || 1
    }
  );
});

var t = video.currentTime;
// once(document.documentElement, "touchstart", function (e) {
//   video.play();
//   video.pause();
// });

video.setAttribute("src", src);
video.currentTime = t + 0.01;


/* ---------------------------------- */
