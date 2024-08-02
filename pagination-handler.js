/*
  Proprietary Click/Scroll Pagination JavaScript for Blue Owl Collection Pages
  Adds event listeners, hides pagination box on click, and updates browser history with history.pushState.
  To reset original Shopify pagination, remove #appendMore and #appendPrev in collection page and change pagination.style.display.
  Collection product lists hide 'archive' tagged products via 'if else statements' in the product-list div for loop (reference collection.liquid).
*/

var path = window.location.pathname;
var page = path.split("/").pop();
var containerElement = (page === "new-arrivals" || page !== "the-mill") ? '#productList' : '#millcontent';

// On document content load, add next pagination function to appendMore div
document.addEventListener("DOMContentLoaded", function() {
  var endlessScrollNext = new Ajaxinate({
    container: containerElement, // Container ID for products
    pagination: '#appendMore',   // Next pagination div box
    method: 'click'
  });

  var endlessScrollPrev = new Ajaxinate({
    container: containerElement, // Container ID for products
    pagination: '#appendPrev',   // Previous pagination div box
    method: 'click'
  });
});

// Adds scroll to top function to top div
document.getElementById('scrollTop').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hides buttons on click
function hideOnClick(selector) {
  if (selector === 1) {
    // Checks for next pagination box ID
    document.querySelector("#appendMore > a").style.display = "none";
  } else if (selector === 2) {
    // Checks for previous pagination box ID
    document.querySelector("#appendPrev > a").style.display = "none";
  }
}

// Returns user to previous entry point without losing their scrolled page
function processAjaxData(selector) {
  var subject, pageHref, tempSplit, newUrl;
  if (selector === 1) {
    // Case 1 for next pagination, sets next pagination URL
    subject = document.querySelector("#appendMore > a");
  } else if (selector === 2) {
    // Case 2 for previous pagination, sets previous pagination URL
    subject = document.querySelector("#appendPrev > a");
  }
  
  if (subject) {
    pageHref = subject.href;
    tempSplit = pageHref.split('/');
    newUrl = '/' + tempSplit[3] + '/' + tempSplit[4];
  } else {
    // Case 3 sets URL as null
    newUrl = '';
  }
  // Parameters (Object, Title, href)
  window.history.pushState(null, '', newUrl);
}

/*
  Timer for functions to optimize website speed
  function TimeIt() {
    var self = this;

    function howLong(iterations, testFunction) {
      var results = [];
      var total = 0;
      for (var i = 0; i < iterations; i++) {
        var start = performance.now();
        testFunction();
        var end = performance.now();
        var duration = end - start;
        results.push(duration);
        total += duration;
      }
      var result = {
        results: results,
        total: total,
        avg: total / results.length
      }
      return result;
    }
    self.howLong = howLong;
  }
*/
