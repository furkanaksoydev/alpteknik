(function(){
  const menu=document.querySelector('.news-menu'); const nav=document.querySelector('.news-nav');
  if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('[data-print]').forEach(btn=>btn.addEventListener('click',()=>window.print()));
})();
