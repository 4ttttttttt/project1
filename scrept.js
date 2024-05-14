// vars
'use strict'
var	testim = document.getElementById("testim"),
		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
		touchStartPos,
		touchEndPos,
		touchPosDiff,
		ignoreTouch = 30;
;
window.onload = function() {
    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }
        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }
        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }
        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");
        currentActive = currentSlide;
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }
    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })
    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    
    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }
    playSlide(currentSlide);
    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
            case 39:
                testimRightArrow.click();
                break;
            case 39:
                testimRightArrow.click();
                break;
            default:
                break;
        }
    })
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
				touchPosDiff = touchStartPos - touchEndPos;
				console.log(touchPosDiff);
				console.log(touchStartPos);	
				console.log(touchEndPos);	
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
		})
}
/////////////////////////////////////////////////////////////////////////////////////////////////
var bottomPage = document.getElementById('scroll');
var topPage = document.getElementById('scrollback');
var img = document.getElementById('scrollbackimg');
var img1 = document.getElementById('scrollimg');
var lastScrollTop = 0;

bottomPage.addEventListener('click', scrollBottom);
topPage.addEventListener('click', scrollTop);

window.addEventListener('scroll', function(){ 
  var st = window.pageYOffset || document.documentElement.scrollTop;
  if (st >= lastScrollTop){
    bottomPage.style.display = 'block';
    topPage.style.display = 'block';
    img.style.display = "block"
    img1.style.display = "none"
  } else {
    bottomPage.style.display = 'block';
    topPage.style.display = 'none';
    img1.style.display = "block"
    img.style.display = "none"
  }
  lastScrollTop = st <= 0 ? 0 : st;
}, false);
function scrollBottom() {
  window.scrollTo(0,document.body.scrollHeight);
  bottomPage.style.display = 'none';
  topPage.style.display = '';
}
function scrollTop() {
  window.scrollTo(0, 0);
  topPage.style.display = 'none';
  bottomPage.style.display = '';
}
//////////////////////////////////////////////////////////////////////////////
const validateForm = (name1) => {
    let isRequired = true;
 
    // Check for Required fullname
    if (name1.fullname.value.trim() === "") {
       setInvalid(name1.fullname, "First name is required!");
       isRequired = false;
    } else {
       setSuccess(name1.fullname);
    }
  
    // Check for Required Email
    if (name1.email.value.trim() === "") {
       setInvalid(name1.email, "Email is required!");
       isRequired = false;
    } else if (!validEmail(name1.email.value.trim())) {
       setInvalid(name1.email, "Email is not valid!");
       isRequired = false;
    } else {
       setSuccess(name1.email);
    }
 
    // Check for Required Password
    if (name1.phone.value.trim() === "") {
       setInvalid(name1.phone, "phone is Required!");
       isRequired = false;
    } else if (name1.phone.value.length < 9) {
       setInvalid(name1.phone, "phone must be at least 9 characters!");
       isRequired = false;
    } else {
       setSuccess(name1.phone);
    }
 
    return isRequired;
 };
 
 // Set for Success Input Value
 const setSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
 };
 
 // Set for Invalid Input Value
 const setInvalid = (input, message) => {
    const formControl = input.parentElement;
    const formAlert = formControl.querySelector(".form-alert");
    formControl.className = "form-control invalid";
    formAlert.innerHTML = message;
 };
 
 // Set for Valid Email Value
 const validEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
 };
//  //////////////////////////////////////////
