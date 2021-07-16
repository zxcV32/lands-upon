let options = {
  rootMargin: '0px',
  threshold: 0.7
};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let elem = entry.target;
      elem.classList.toggle('tilted');
    }
  });
}, options);

window.onload = () => {
  document.querySelectorAll('.photo').forEach((target) => observer.observe(target));
};
