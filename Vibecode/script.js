(function(){
  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* Menu mobile */
  var bg=$('.burger'),menu=$('#menu');
  function setMenu(o){menu.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Fechar menu':'Abrir menu')}
  bg.addEventListener('click',function(){setMenu(bg.getAttribute('aria-expanded')!=='true')});
  menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){setMenu(false)}});

  /* Dashboard */
  var P=[
   {n:'Lançamento do app',c:'#9B8CFF',t:[['Fechar escopo da versão 1','MA','Seg',1],['Definir fluxo de cadastro','JR','Ter',1],['Revisar fluxo de cadastro','MA','Qua',0],['Preparar página da loja','LP','Sex',0],['Teste final no celular','JR','Seg',0]]},
   {n:'Site institucional',c:'#72E5C2',t:[['Escrever textos da home','LP','Seg',1],['Escolher fotos','MA','Qua',0],['Publicar versão de teste','JR','Qui',0],['Configurar domínio','JR','Sex',0]]},
   {n:'Pesquisa com usuários',c:'#F2B66D',t:[['Montar roteiro','MA','Ter',1],['Convidar 5 pessoas','LP','Qua',0],['Registrar conversas','MA','Sex',0]]}
  ];
  var cur=0,side=$('#side'),main=$('#main');
  function pct(p){var d=p.t.filter(function(x){return x[3]}).length;return Math.round(d/p.t.length*100)}
  function render(){
    side.innerHTML='<h3>Projetos</h3>'+P.map(function(p,i){var v=pct(p);
      return '<button class="proj" data-i="'+i+'" aria-pressed="'+(i===cur)+'"><span class="row"><span class="dot" style="background:'+p.c+'"></span>'+p.n+'</span><span class="mini"><i style="width:'+v+'%;background:'+p.c+'"></i></span></button>'}).join('');
    var p=P[cur],v=pct(p);
    function list(done){return p.t.map(function(x,i){return done===!!x[3]?'<label class="task"><input type="checkbox" data-t="'+i+'"'+(x[3]?' checked':'')+'><span class="t">'+x[0]+'</span><span class="av" title="Responsável">'+x[1]+'</span><span class="due">'+x[2]+'</span></label>':''}).join('')}
    var pend=list(false),fin=list(true);
    main.innerHTML='<div class="mh"><h3>'+p.n+'</h3><div class="pct" aria-hidden="true">'+v+'%</div></div>'+
     '<div class="bar" role="progressbar" aria-label="Progresso de '+p.n+'" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+v+'"><i style="width:'+v+'%;background:'+p.c+'"></i></div>'+
     '<div class="grp">Pendentes</div>'+(pend||'<p class="muted">Tudo concluído neste projeto.</p>')+
     (fin?'<div class="grp">Concluídas</div>'+fin:'');
  }
  side.addEventListener('click',function(e){var b=e.target.closest('.proj');if(b){cur=+b.dataset.i;render()}});
  main.addEventListener('change',function(e){var i=e.target.dataset.t;if(i===undefined)return;
    P[cur].t[i][3]=e.target.checked?1:0;render();
    var n=$('[data-t="'+i+'"]');if(n)n.focus()});
  render();

  /* Organizar ideias */
  var N=[['Pesquisar meios de pagamento','Lançamento do app','#9B8CFF'],['Marcar conversa com 5 usuários','Pesquisa com usuários','#F2B66D'],['Trocar foto principal da home','Site institucional','#72E5C2']];
  var notes=$('#notes'),org=$('#org'),done=false;
  function drawNotes(){notes.innerHTML=N.map(function(n){return '<div class="note"><span>'+n[0]+'</span><span class="chip" style="'+(done?'color:'+n[2]+';border-color:'+n[2]:'visibility:hidden')+'">'+n[1]+'</span></div>'}).join('')}
  org.addEventListener('click',function(){done=!done;drawNotes();org.textContent=done?'Desfazer':'Organizar ideias'});
  drawNotes();

  /* Status */
  var st=$('#st'),log=$('#log');
  st.addEventListener('change',function(){var li=document.createElement('li');li.textContent='Você alterou o status para "'+st.value+'"';log.insertBefore(li,log.firstChild)});

  /* Planos */
  $$('.sw button').forEach(function(b){b.addEventListener('click',function(){
    $$('.sw button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    $$('[data-m]').forEach(function(s){s.textContent=s.dataset[b.dataset.p]})})});
  var email=$('#email'),msg=$('#msg'),chosen='';
  $$('[data-plan]').forEach(function(b){b.addEventListener('click',function(){
    chosen=b.dataset.plan;document.getElementById('comecar').scrollIntoView();
    msg.className='';msg.textContent='Plano '+chosen+' selecionado. Informe seu e-mail.';setTimeout(function(){email.focus({preventScroll:true})},400)})});

  /* Formulário (demo local) */
  $('#form').addEventListener('submit',function(e){e.preventDefault();
    if(!email.validity.valid||!email.value){msg.className='err';msg.textContent='Digite um e-mail válido, como nome@exemplo.com.';email.focus();return}
    msg.className='';msg.textContent='Pronto'+(chosen?' ('+chosen+')':'')+'. Demonstração local: nenhum e-mail foi enviado ou salvo.';email.value=''});
})();
