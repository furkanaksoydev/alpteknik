(function(){
  const body=document.body;
  const themeKey='site-theme';
  if(localStorage.getItem(themeKey)==='dark') body.classList.add('dark-mode');
  window.toggleNewsTheme=function(){ body.classList.toggle('dark-mode'); localStorage.setItem(themeKey,body.classList.contains('dark-mode')?'dark':'light'); };
  const menu=document.querySelector('.news-menu'); const nav=document.querySelector('.news-nav');
  if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('[data-print]').forEach(btn=>btn.addEventListener('click',()=>window.print()));
})();
