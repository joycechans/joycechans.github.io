import OverscrollPlugin from "https://cdn.skypack.dev/smooth-scrollbar/plugins/overscroll";


var Scrollbar = window.Scrollbar;
Scrollbar.use(OverscrollPlugin);

var options = {
	damping: 0.1,
	maxOverscroll: 50,
	// "alwaysShowTracks": true
};
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const target = document.querySelector("#my-scrollbar")
window.addEventListener("DOMContentLoaded", (e) => {
// 	Scrollbar.init(target, {
// 	damping:.1,	
//   plugins: {
//     overscroll: options | false,
//   },
// });
});
