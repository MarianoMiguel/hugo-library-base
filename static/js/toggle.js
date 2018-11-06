function startToggle() {
  var toggle = document.querySelector('.js-nav-toggle');
  var container = document.querySelector('.js-nav-container');
  toggle.addEventListener('click', function(e) {
    container.classList.toggle('is-active');
  });
}

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
  startToggle();
} else {
  document.addEventListener('DOMContentLoaded', startToggle);
}