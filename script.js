(function(){
  // Custom cursor
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  if(dot && outline){
    window.addEventListener('mousemove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      outline.style.left = e.clientX + 'px';
      outline.style.top = e.clientY + 'px';
    });

    const interactive = document.querySelectorAll('a, button, .card, input, textarea');
    interactive.forEach(el => {
      el.addEventListener('mouseenter', () => {
        outline.style.transform = 'translate(-50%,-50%) scale(1.4)';
        outline.style.opacity = '0.95';
      });
      el.addEventListener('mouseleave', () => {
        outline.style.transform = 'translate(-50%,-50%) scale(1)';
        outline.style.opacity = '1';
      });
    });
  }

  // Contact form handling using fetch (Web3Forms)
  const form = document.getElementById('contactForm');
  const result = document.getElementById('formResult');
  if(form){
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      result.textContent = 'Sending...';

      const data = new FormData(form);

      try{
        const res = await fetch(form.action, {
          method: 'POST',
          body: data
        });

        const json = await res.json();
        if(json.success){
          result.textContent = 'Message sent — thank you.';
          form.reset();
        } else {
          result.textContent = json.message || 'Submission failed.';
        }
      } catch(err){
        result.textContent = 'Network error. Try again later.';
        console.error(err);
      }
    });
  }

  // Set copyright year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();