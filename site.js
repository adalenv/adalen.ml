
// Fill polyfill
if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}


// Parallax - https://github.com/dixonandmoe/rellax
(function(h,f){"function"===typeof define&&define.amd?define([],f):"object"===typeof module&&module.exports?module.exports=f():h.Rellax=f()})(this,function(){var h=function(f,l){var b=Object.create(h.prototype),g=0,k=0,c=[],p=!1,u=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(a){setTimeout(a,1E3/60)},m=function(a,b,d){return a<=b?b:a>=d?d:a};b.options={speed:-2,center:!1};l&&
Object.keys(l).forEach(function(a){b.options[a]=l[a]});b.options.speed=m(b.options.speed,-10,10);f||(f=".rellax");var q=document.querySelectorAll(f);if(0<q.length)b.elems=q;else throw Error("The elements you're trying to select don't exist.");var v=function(a){var e=a.getAttribute("data-rellax-percentage"),d=a.getAttribute("data-rellax-speed"),c=e||b.options.center?window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop:0,f=c+a.getBoundingClientRect().top,h=a.clientHeight||
a.offsetHeight||a.scrollHeight,g=e?e:(c-f+k)/(h+k);b.options.center&&(g=.5);c=d?m(d,-10,10):b.options.speed;if(e||b.options.center)c=m(d||b.options.speed,-5,5);e=Math.round(100*c*(1-g));a=a.style.cssText;d="";0<=a.indexOf("transform")&&(d=a.indexOf("transform"),d=a.slice(d),d=(g=d.indexOf(";"))?" "+d.slice(11,g).replace(/\s/g,""):" "+d.slice(11).replace(/\s/g,""));return{base:e,top:f,height:h,speed:c,style:a,transform:d}},r=function(){var a=g;g=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||
document.body.parentNode||document.body).scrollTop;return a!=g?!0:!1},t=function(){r()&&!1===p&&n();u(t)},n=function(){for(var a=0;a<b.elems.length;a++){var e=" translate3d(0,"+(Math.round(100*c[a].speed*(1-(g-c[a].top+k)/(c[a].height+k)))-c[a].base)+"px,0)"+c[a].transform;b.elems[a].style.cssText=c[a].style+"-webkit-transform:"+e+";-moz-transform:"+e+";transform:"+e+";"}};b.destroy=function(){for(var a=0;a<b.elems.length;a++)b.elems[a].style.cssText=c[a].style;p=!0};(function(){k=window.innerHeight;
r();for(var a=0;a<b.elems.length;a++){var e=v(b.elems[a]);c.push(e)}window.addEventListener("resize",function(){n()});t();n()})();return b};return h});



var startTime,
	isMovingHeading = false,
	finishedAnimating = false;

var wordBank = [
    "interactive",
    "cutting-edge",
    "responsive",
    "animated",
    "exceptional",
	"unusual",
    "fun",
    "meaningful"
];
var currentNum = 0,
	currentIteration = 0;
var wordHighlight = document.querySelector(".word-highlight"),
    word = document.querySelector(".word"),
    maxNumIterations = 13,
    minNumIterations = 10,
    wordString = [],
    letterBank = "abcdefghijklmnopqrstuvwxyz";

function getIterations(initWord, finWord, iterationNum) {
	if(wordHighlight) {
	    var iterations = [],
	        correctLetters = [finWord.length].fill(false),
	        proportion = iterationNum / 2;
	    
	    for(var i = 0; i < iterationNum; i++) {
	    	var iteration = i > 0 ? iterations[i - 1]: initWord.split("");
	    	
	        iteration.length -= Math.round((iteration.length - finWord.length) / (iterationNum - i));
	        
	        for(var j = 0; j < iteration.length; j++) {
	            var changeMe = Math.random() <= 0.5 ? true : false;
	            
	            if(changeMe && proportion < i) {
	                    // Unscramble the second half of iterations
	                    iteration[j] = finWord[j];
	                    correctLetters[i] = true;
	            } else if((changeMe && proportion >= i)
	                   || (!correctLetters[i] && proportion < i)) {
	                    // Scramble the first half of iterations
	                    var randLetter = letterBank.charAt( Math.floor( Math.random() * letterBank.length ) );
	                    iteration[j] = randLetter;
	               
	            }
	        }
	        
	        // Assure the last iteration is correct
	        if(i === iterationNum - 1) {
	            iteration = finWord.split("");
	        }
	        
	        iterations.push(iteration.slice(0));
	    }
	    
	    return iterations;
	}
}



var startTime,
	lastChangedTime,
	singleDuration = 60,
    totalDuration = 4000,
    wordIterations = [];



function animateThings(currTime) {
	if(window.pageYOffset  != 0) {
		document.body.classList.add("scrolled");
	} else {
		document.body.classList.remove("scrolled");
	}

	if(wordHighlight) {
	    // Animate the text scrambling
	    if(!startTime)
	    	startTime = currTime;
	    
	    if(!lastChangedTime)
	    	lastChangedTime = currTime;
	    
	    var progress = currTime - startTime;
	    if(progress > totalDuration) {
	    	currentNum++;
	        if(currentNum >= wordBank.length) {
	            currentNum = 0;
	        }
			
	        var numIterations = Math.ceil(Math.random() * (maxNumIterations - minNumIterations)) + minNumIterations;
	        
	        wordIterations = getIterations(word.innerText, wordBank[currentNum], numIterations);
	        
	        currentIteration = 0;
	        
	    	startTime = currTime;
	    }
	    
	    var progress3 = currTime - lastChangedTime;
	    if(progress3 > singleDuration) {
	    	if(typeof wordIterations[currentIteration] != "undefined") {
	        	word.innerText = wordIterations[currentIteration++].join("");
	            wordHighlight.style.width = word.offsetWidth + "px";
	        }
	        
	        lastChangedTime = currTime;
	    }


	    window.requestAnimationFrame(animateThings);
	}
}
window.requestAnimationFrame(animateThings);







var pVids = document.querySelectorAll(".large-preview video");
function zoomVideo(video) {
	var w = window.innerWidth;
	if(w > 1400) {
		video.style.webkitTransform = "scale(1) translate(-3.666%, -3.666%)";
		video.style.msTransform = "scale(1) translate(-3.666%, -3.666%)";
		video.style.transform = "scale(1) translate(-3.666%, -3.666%)";
	} else {
		video.style.webkitTransform = "scale(1.0885) translate(-3.666%)";
		video.style.msTransform = "scale(1.0885) translate(-3.666%)";
		video.style.transform = "scale(1.0885) translate(-3.666%)";
	}
	video.play();
}
function unzoomVideo(video) {
	var w = window.innerWidth;
	if(w > 1400) {
		video.style.webkitTransform = "scale(0.933333333) translate(-3.666%, -3.666%)";
		video.style.msTransform = "scale(0.933333333) translate(-3.666%, -3.666%)";
		video.style.transform = "scale(0.933333333) translate(-3.666%, -3.666%)";
	} else {
		video.style.webkitTransform = "scale(1) translate(-3.666%)";
		video.style.msTransform = "scale(1) translate(-3.666%)";
		video.style.transform = "scale(1) translate(-3.666%)";
	}
	video.pause();
}
function unzoomAllVids(e) {
	for(var i = 0; i < pVids.length; i++) {
		unzoomVideo(pVids[i]);
	}

}
window.addEventListener("resize", unzoomAllVids);

// Add the pgram listeners
var outerPgrams = document.querySelectorAll(".outer-pgram");
for(var i = 0; i < outerPgrams.length; i++) {
	outerPgrams[i].onmouseenter = function() {
		var h3s = this.nextElementSibling.querySelectorAll("h3");
		for(var j = 0; j < h3s.length; j++) {
			h3s[j].style.textDecoration = "underline";
		}

		// Zoom in the video when hovered
		var video = this.querySelector("video");
		zoomVideo(video);
	}

	outerPgrams[i].onmouseleave = function() {
		var h3s = this.nextElementSibling.querySelectorAll("h3");
		for(var j = 0; j < h3s.length; j++) {
			h3s[j].style.textDecoration = "none";
		}

		// Zoom out the video when not hovered
		var video = this.querySelector("video");
		unzoomVideo(video);
	}
}
// Remove the CSS functionality for hover of title-container (progressive enhancement)
var titleContainers = document.querySelectorAll(".title-container");
for(var i = 0; i < titleContainers.length; i++) {
	// Underline the text and animate the video when title container is hovered
	titleContainers[i].onmouseenter = function() {
		var previewH3s = this.querySelectorAll("h3");
		for(var j = 0; j < previewH3s.length; j++) {
			previewH3s[j].style.textDecoration = "underline";
		}

		// Zoom in the video when the link is hovered
		var video = this.previousElementSibling.querySelector("video");
		zoomVideo(video);
	}

	titleContainers[i].onmouseleave = function() {
		var previewH3s = this.querySelectorAll("a");
		for(var j = 0; j < previewH3s.length; j++) {
			previewH3s[j].style.textDecoration = "none";
		}

		// Zoom in the video when the link is hovered
		var video = this.previousElementSibling.querySelector("video");
		unzoomVideo(video);
	}

	var previewH3s = titleContainers[i].querySelectorAll("h3");
	for(var j = 0; j < previewH3s.length; j++) {
		previewH3s[j].style.textDecoration = "none";
	}
}




// Scroll button functionality from https://stackoverflow.com/a/39494245/2065702
function getElementY(query) {
  return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
}
function doScrolling(element, duration) {
	var startingY = window.pageYOffset
	var elementY = getElementY(element) - 50
	// If element is close to page's bottom then window will scroll only to some position above the element.
	var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
	var diff = targetY - startingY
	// Easing function: easeInOutCubic
	// From: https://gist.github.com/gre/1650294
	var easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
	var start

	if (!diff) return

	// Bootstrap our animation - it will get called right before next frame shall be rendered.
	window.requestAnimationFrame(function step(timestamp) {
		if (!start) start = timestamp
		// Elapsed miliseconds since start of scrolling.
		var time = timestamp - start
			// Get percent of completion in range [0, 1].
		var percent = Math.min(time / duration, 1)
		// Apply the easing.
		// It can cause bad-looking slow frames in browser performance tool, so be careful.
		percent = easing(percent)

		window.scrollTo(0, startingY + diff * percent)

			// Proceed with animation as long as we wanted it to.
		if (time < duration) {
			window.requestAnimationFrame(step)
		}
	})
}




// Transition in elements on scroll
var rellax;
if(document.querySelectorAll(".rellax").length > 0)
	rellax = new Rellax('.rellax');

// From https://stackoverflow.com/a/442474/2065702
function isScrolledIntoView(el) {
    var _y = 0;
    while( el && !isNaN( el.offsetTop ) ) {
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }

    var isVisible = _y < window.innerHeight * 6 / 7;
    return isVisible;
}

var fadeIns = document.querySelectorAll("figure"),
	start;

for(var i = 0; i < fadeIns.length; i++) {
	fadeIns[i].classList.add("fadeIn");
}

function checkFadeIns(timestamp) {
	if (!start) 
		start = timestamp;
	var progress = timestamp - start,
		complete = false;
	if (progress > 100) { // Throttle how often it checks
		for(var i = 0; i < fadeIns.length; i++) {
			if(isScrolledIntoView(fadeIns[i])) {
				fadeIns[i].classList.remove("fadeIn");

				if(document.querySelectorAll(".fadeIn").length === 0)
					complete = true;
			}
		}

		start = timestamp;
	}

	if(!complete)
		window.requestAnimationFrame(checkFadeIns);
}

window.requestAnimationFrame(checkFadeIns);



// Little movement on the Z
var ZContainer = document.querySelector(".Z-container"),
	reduction = 0.005;
document.body.onmousemove = function(e) {
	if(document.body.scrollTop < window.innerHeight && ZContainer != null) {
		var horizScale = -(e.clientX / window.innerWidth - 0.5) * 100 * reduction;
		var vertScale = -(e.clientY / window.innerHeight - 0.5) * 100 * reduction * 2;

		ZContainer.style.opacity = 1;
		ZContainer.style.animation = "none";

		ZContainer.style.transform = "translateX(" + horizScale + "%) translateY(" + vertScale + "%)";
	}
}
