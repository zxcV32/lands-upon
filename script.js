let options = {
  rootMargin: '0px',
  threshold: 0.7
};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let elem = entry.target;
      elem.parentElement.classList.toggle('tilted');
      elem.classList.toggle('polaroid');
    }
  });
}, options);

window.onload = () => {
  document.querySelectorAll('.photo img').forEach((target) => observer.observe(target));
};
