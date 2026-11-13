/* Comparativo: consórcio x imóvel na planta — Bezerra Strategic
   Uso: Comparador.mount('#cmp-mount', { wa: 'https://wa.me/...' })
   A carta de crédito não compra imóvel na planta (sem habite-se), por isso são caminhos separados.
   Parcelas do consórcio calculadas a partir de uma tabela de referência (menor parcela integral e menor parcela 50% reduzida). */
(function () {
  var CSS = [
    '.cp-why{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}',
    '.cp-why div{padding-top:16px;border-top:2px solid var(--brass)}',
    '.cp-why h3{font-size:1.2rem;margin-bottom:6px}',
    '.cp-why p{color:var(--muted);font-size:.96rem}',
    '.cp-why b{color:var(--ink)}',
    '.cp-sub{margin-top:48px}',
    '.cp-sub h3{font-size:clamp(1.3rem,2.8vw,1.6rem);margin-bottom:8px}',
    '.cp-sim{display:grid;grid-template-columns:1fr;gap:30px;margin-top:4px}',
    '@media (min-width:900px){.cp-sim{grid-template-columns:.85fr 1.15fr;gap:44px;align-items:start}}',
    '.cp-ctl{display:flex;flex-direction:column;gap:20px}',
    '.cp-f label,.cp-f .cp-lbl{display:block;font-weight:600;font-size:.95rem;margin-bottom:6px}',
    '.cp-f small{display:block;color:var(--muted);font-size:.84rem;margin-top:6px;line-height:1.45}',
    '.cp-in{width:100%;padding:12px 14px;border:1px solid var(--rule);border-radius:3px;background:var(--surface);color:var(--ink);font:inherit}',
    '.cp-row{display:flex;align-items:center;gap:14px}',
    '.cp-row input[type=range]{flex:1;min-width:0;accent-color:var(--brass)}',
    '.cp-row output{min-width:4.2em;text-align:right;font-weight:600;font-variant-numeric:tabular-nums}',
    '.cp-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}',
    '.cp-chip{border:1px solid var(--rule);background:transparent;color:var(--ink);padding:8px 12px;border-radius:3px;font:inherit;font-size:.88rem;cursor:pointer}',
    '.cp-chip[aria-pressed=true]{background:var(--brass);border-color:var(--brass);color:#0B1D33;font-weight:600}',
    '.cp-chip:focus-visible,.cp-in:focus-visible,.cp-row input:focus-visible,.cp-adv summary:focus-visible{outline:2px solid var(--brass-light);outline-offset:3px}',
    '.cp-adv{border:1px solid var(--rule);border-radius:3px;padding:14px 16px;background:var(--surface)}',
    '.cp-adv summary{cursor:pointer;font-weight:600;list-style:none;display:flex;justify-content:space-between;gap:12px}',
    '.cp-adv summary::-webkit-details-marker{display:none}',
    '.cp-adv summary::after{content:"+";color:var(--accent);font-size:1.25rem;line-height:1}',
    '.cp-adv[open] summary::after{content:"–"}',
    '.cp-advgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px}',
    '.cp-advgrid .cp-f label{font-size:.85rem;font-weight:500}',
    '.cp-advgrid .cp-in{padding:9px 10px}',
    '.cp-advnote{grid-column:1/-1;color:var(--muted);font-size:.82rem;line-height:1.5}',
    '.cp-res{display:flex;flex-direction:column;gap:16px}',
    '.cp-cols{display:grid;grid-template-columns:1fr;gap:16px}',
    '@media (min-width:640px){.cp-cols{grid-template-columns:1fr 1fr}}',
    '.cp-card{border:1px solid var(--rule);border-radius:3px;background:var(--surface);padding:20px 20px 8px}',
    '.cp-card.cp-dark{background:var(--navy);color:#F2EEE4;border-color:transparent}',
    '.cp-card h3{font-size:1.25rem}',
    '.cp-card .cp-s{color:var(--muted);font-size:.88rem;margin:2px 0 12px}',
    '.cp-dark .cp-s{color:rgba(242,238,228,.7)}',
    '.cp-li{display:flex;justify-content:space-between;gap:16px;padding:11px 0;border-top:1px solid var(--rule);font-size:.93rem}',
    '.cp-dark .cp-li{border-top-color:rgba(242,238,228,.14)}',
    '.cp-li span:first-child{color:var(--muted)}',
    '.cp-dark .cp-li span:first-child{color:rgba(242,238,228,.76)}',
    '.cp-li span:last-child{font-weight:600;text-align:right;font-variant-numeric:tabular-nums}',
    '.cp-li.cp-key{flex-direction:column;gap:2px}',
    '.cp-li.cp-key span:last-child{color:var(--accent);font-family:"Fraunces",Georgia,serif;font-size:1.2rem;text-align:left}',
    '.cp-dark .cp-li.cp-key span:last-child{color:var(--brass-light)}',
    '.cp-bars{border:1px solid var(--rule);border-radius:3px;background:var(--surface);padding:20px}',
    '.cp-bars h3{font-size:1.1rem;margin-bottom:4px}',
    '.cp-bars .cp-s{color:var(--muted);font-size:.86rem;margin-bottom:14px}',
    '.cp-bar{margin:12px 0}',
    '.cp-bl{display:flex;justify-content:space-between;font-size:.9rem;margin-bottom:5px}',
    '.cp-bt{height:14px;background:var(--rule);border-radius:2px;overflow:hidden}',
    '.cp-bf{height:100%;background:var(--brass);width:0;transition:width .25s}',
    '.cp-bar.cp-b2 .cp-bf{background:var(--navy)}',
    '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .cp-bar.cp-b2 .cp-bf{background:#7C93AD}}',
    ':root[data-theme="dark"] .cp-bar.cp-b2 .cp-bf{background:#7C93AD}',
    '.cp-verdict{padding:16px 18px;border-left:3px solid var(--brass);background:var(--surface);border-top:1px solid var(--rule);border-right:1px solid var(--rule);border-bottom:1px solid var(--rule);font-size:.95rem;line-height:1.55}',
    '.cp-note{margin-top:30px;color:var(--muted);font-size:.95rem;max-width:70ch}',
    '.cp-note a{color:var(--accent);font-weight:600}',
    '.cp-fine{margin-top:14px;color:var(--muted);font-size:.8rem;line-height:1.55;max-width:90ch}',
    '.cp-chk{display:grid;grid-template-columns:1fr 1fr;gap:22px}',
    '.cp-chk>div{background:var(--surface);border:1px solid var(--rule);border-radius:3px;padding:22px}',
    '.cp-chk h3{font-size:1.25rem;margin-bottom:6px}',
    '.cp-chk ul{list-style:none}',
    '.cp-chk li{padding:13px 0;border-top:1px solid var(--rule)}',
    '.cp-chk li b{display:block;font-weight:600;font-size:.97rem}',
    '.cp-chk li span{display:block;color:var(--muted);font-size:.92rem;margin-top:2px}',
    '.cp-ask{margin-top:30px;padding:24px;border:1px solid var(--rule);border-radius:3px;background:var(--surface);display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap}',
    '.cp-ask h3{font-size:1.25rem;margin-bottom:4px}',
    '.cp-ask p{color:var(--muted);font-size:.95rem;max-width:56ch}',
    '@media (max-width:760px){.cp-why,.cp-chk{grid-template-columns:1fr}.cp-ask .btn{flex:1 1 100%}}',
    '@media (prefers-reduced-motion:reduce){.cp-bf{transition:none}}'
  ].join('\n');

  var EMP = {
    'kansas': { nome: 'Kansas City', entrega: '2032-10', txt: 'outubro de 2032', alug: { anual: 2100, diaria: 550, dias: 40, nota: 'Estimativa de pesquisa para uma unidade de 1 suíte, de cerca de 35 m², em Porto Belo. Anual: R$ 2.500 a R$ 3.200 por mês na entrega, trazidos a valor presente a 5,5% ao ano, cerca de R$ 2.100 hoje. Temporada: diária de R$ 400 a R$ 700 na alta temporada e 30 a 45 dias ocupados, o que dá R$ 15 mil a R$ 25 mil no verão, sem contar a baixa temporada.' }, fluxos: [
      { label: 'Fluxo especial', entrada: 7, mensal: { n: 120, pct: 38.96 }, reforco: { n: 10, pct: 44.04 }, chaves: 10, valor: 431246, valorNota: 'Referência: unidade 807 da tabela com preço congelado (novembro/2026).' },
      { label: 'Tabela geral', entrada: 10, mensal: { n: 100, pct: 40 }, reforco: { n: 8, pct: 40 }, chaves: 10, valor: 465367, valorNota: 'Menor valor disponível: flat de 34,13 m², unidade 1201 (novembro/2026).' }] },
    'dot-zero': { nome: 'Dot Zero', entrega: '2030-12', txt: 'dezembro de 2030', fluxos: [
      { label: '120 parcelas', entrada: 5, mensal: { n: 120, pct: 80 }, reforco: { n: 10, pct: 15 }, chaves: 0, valor: 440000, valorNota: 'Menor valor da tabela: studio de 24 a 30 m² (novembro/2026).' },
      { label: 'Quitação até a entrega', entrada: 5, mensal: { n: 49, pct: 80 }, reforco: { n: 4, pct: 15 }, chaves: 0, valor: 380000, valorNota: 'Menor valor da tabela com quitação até a entrega (novembro/2026).' }] },
    'reserva-242': { nome: 'Reserva 242', entrega: '2031-06', txt: 'junho de 2031', fluxos: [
      { label: '120 parcelas', entrada: 5, mensal: { n: 120, pct: 80 }, reforco: { n: 10, pct: 15 }, chaves: 0, valor: 1120000, valorNota: 'Menor valor da tabela: apartamento tipo 4, 94 m² (novembro/2026).' },
      { label: 'Quitação até a entrega', entrada: 5, mensal: { n: 56, pct: 80 }, reforco: { n: 5, pct: 15 }, chaves: 0, valor: 1020000, valorNota: 'Menor valor da tabela com quitação perto da entrega (novembro/2026).' }] },
    'tettris': { nome: 'Tettris', entrega: '2030-07', txt: 'julho de 2030', fluxos: [
      { label: 'Fluxo da tabela', entrada: 10, mensal: { n: 47, pct: 15 }, reforco: { n: 4, pct: 25 }, chaves: 0, valor: 350000, valorNota: 'Menor valor disponível: studio de 19,4 m² (tabela de agosto/2026).' }] },
    'conecta': { nome: 'Conecta', entrega: '2032-12', txt: 'dezembro de 2032', fluxos: [
      { label: 'Unidade promocional', entrada: 6, mensal: { n: 120, pct: 37.5 }, reforco: { n: 10, pct: 56.5 }, chaves: 0, valor: 539000, valorNota: 'Menor valor entre as unidades promocionais: flat de 37 m² (novembro/2026).' },
      { label: 'Tabela comercial', entrada: 6, mensal: { n: 120, pct: 37.5 }, reforco: { n: 10, pct: 56.5 }, chaves: 0, valor: 636803, valorNota: 'Menor valor disponível na tabela comercial: flat de 36,5 m² (novembro/2026).' }] }
  };
  var ORDER = ['kansas', 'dot-zero', 'reserva-242', 'tettris', 'conecta'];
  // Tabelas promocionais como padrão: nos empreendimentos da CEG+, a tabela com quitação até a entrega vem primeiro.
  EMP['dot-zero'].fluxos.reverse(); EMP['reserva-242'].fluxos.reverse();
  // Aluguel pela mesma lógica do Kansas: cerca de R$ 60 por m² por mês (pesquisa de Porto Belo, em linha com o FipeZAP de Florianópolis, R$ 60,9 por m²), em reais de hoje.
  EMP['dot-zero'].alug = { anual: 1600, diaria: 420, dias: 40, nota: 'Mesma lógica do Kansas, aplicada a um studio de cerca de 27 m²: R$ 60 por m² por mês no aluguel anual e diária proporcional à área na temporada. Estimativa a validar com anúncios do Centro de Itajaí.' };
  EMP['reserva-242'].alug = { anual: 5600, nota: 'Mesma lógica do Kansas, aplicada a um apartamento de 94 m²: R$ 60 por m² por mês. Estimativa a validar com anúncios da Ressacada, que podem estar acima.' };
  EMP['tettris'].alug = { anual: 1200, nota: 'Mesma lógica do Kansas, aplicada a um studio de 19,4 m² perto da Univali: R$ 60 por m² por mês. Estimativa a validar com anúncios da região.' };
  EMP['conecta'].alug = { anual: 2200, diaria: 550, dias: 40, nota: 'Mesma lógica do Kansas, aplicada a um flat de 37 m² em Porto Belo, em frente ao VivaPark: R$ 60 por m² por mês e a mesma diária do Kansas na temporada. Estimativa a validar com anúncios da região.' };
  // Tabela de referência (240 meses): até R$ 600 mil, taxa total de 24% (2% antecipada); a partir de R$ 600 mil, 22% (2% antecipada).
  var CR_LOW = [120, 130, 140, 150, 200, 220, 230, 240, 300, 330, 350, 380, 400, 430, 450, 480, 500, 530, 550, 580, 600];
  var CR_HIGH = [600, 650, 680, 700, 750, 780, 800, 850, 880, 900, 950, 980, 1000, 1200];
  var NC = 240;

  function brl(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }); }
  function sgn(v) { return (v >= 0 ? '+' : '−') + brl(Math.abs(v)); }
  function pc(v, d) { return v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }) + '%'; }
  function monthsUntil(ym) {
    var p = ym.split('-'), n = new Date();
    return Math.max(1, (parseInt(p[0], 10) - n.getFullYear()) * 12 + (parseInt(p[1], 10) - (n.getMonth() + 1)));
  }
  function cartaRef(V) {
    var list = V >= 600000 ? CR_HIGH : CR_LOW, k;
    for (k = 0; k < list.length; k++) if (list[k] * 1000 >= V) return list[k] * 1000;
    return V;
  }

  // Financiamento SAC (saldo da planta). Em reais de hoje.
  function fin(V, Ef, N, rAA, i, seg, tarifa) {
    var F = V - Ef, rm = Math.pow(1 + rAA, 1 / 12) - 1, am = F / N, bal = F, outReal = Ef, first = 0, last = 0, k;
    for (k = 1; k <= N; k++) {
      var pay = am + bal * rm + bal * seg + tarifa;
      if (k === 1) first = pay; last = pay;
      outReal += pay / Math.pow(1 + i, k / 12);
      bal -= am;
    }
    return { F: F, first: first, last: last, cost: outReal - V };
  }
  // Consórcio, em reais de hoje (parcelas e crédito corrigidos pelo INCC ficam constantes em termos reais).
  function cons(V, E, emb, plan, seg, mc, g, i, agio, rc, H, fd, bruto) {
    fd = fd || 0;
    var tau = V >= 600000 ? 0.22 : 0.24, a = 0.02, total = V * (1 + tau), A = V * a, N = NC;
    var reg = (total - A) / N, red = reg - 0.51 * V / N, p = plan === 'red' ? red : reg;
    var segM = seg * V;
    mc = Math.min(mc, N - 1);
    var Le = V * Math.min(Math.max(emb || 0, 0), 0.25);
    var paidP = A + p * mc, bal0 = total - paidP;
    var Lp = Math.min(E, Math.max(bal0 - Le, 0));
    var bal = Math.max(bal0 - Le - Lp, 0);
    var rem = N - mc, p1 = rem > 0 ? bal / rem : 0;
    var paidM = paidP + Lp + segM * mc;
    var Vm = V * Math.pow((1 + g) / (1 + i), mc / 12);
    var disp = V - Le;
    var X = agio * (bruto ? V : disp), paidH = paidM + (p1 + segM) * H;
    var rmc = Math.pow(1 + rc, 1 / 12) - 1, Y = disp * rmc * H;
    return { segM: segM, bal: bal, tau: tau, reg: reg, red: red, p: p, first: p + A + segM, A: A, Le: Le, Lp: Lp, disp: disp, p1: p1, afterFirst: p1 + segM, mc: mc,
      admV: V * (tau - 0.02), frV: V * 0.02, segTot: segM * N, cost: V * tau + segM * N - fd * V, S: Math.max(0, Vm - V),
      paidM: paidM, X: X, resSell: X - paidM, paidH: paidH, Y: Y, resRender: X + Y - paidH, H: H };
  }
  // Imóvel na planta: fluxo da tabela até a chave, saldo financiado na entrega.
  function planta(f, V, T, g, i, r, sf, tf, Nf) {
    var base = f.entrada, k;
    base += f.mensal.pct * Math.min(f.mensal.n, T) / f.mensal.n;
    for (k = 1; k <= f.reforco.n; k++) { if (12 * k <= T) base += f.reforco.pct / f.reforco.n; }
    base = Math.min(base + (f.chaves || 0), 100);
    var rem = (100 - base) / 100 * V;
    var fr = rem > 0.5 ? fin(rem, 0, Nf, r, i, sf, tf) : { first: 0, cost: 0 };
    var VT = V * Math.pow((1 + g) / (1 + i), T / 12);
    return { basePct: base, paid: V * base / 100, rem: rem, finFirst: fr.first, finCost: fr.cost, VT: VT, gain: VT - V, net: VT - V - fr.cost, T: T,
      entrada: V * f.entrada / 100, mensal: V * f.mensal.pct / f.mensal.n / 100, ref: V * f.reforco.pct / f.reforco.n / 100 };
  }

  // Consórcio até o fim do plano, com aluguel (em reais de hoje). y = aluguel líquido mensal como fração do valor do imóvel.
  function renda(V, c, y, g, i) {
    var N = NC, q = (1 + g) / (1 + i), t, rentAcc = 0, cover = null, parc = c.afterFirst;
    for (t = c.mc + 1; t <= N; t++) {
      var rt = y * V * Math.pow(q, t / 12);
      rentAcc += rt;
      if (cover === null && rt >= parc) cover = t;
    }
    var Vm = V * Math.pow(q, c.mc / 12), VN = V * Math.pow(q, N / 12), pocket = V + c.cost + c.S;
    // Retorno real anual equivalente (taxa interna dos fluxos mensais, em reais de hoje)
    var cf = new Array(N + 1).fill(0), k;
    for (k = 1; k <= N; k++) {
      cf[k] -= (k <= c.mc ? c.p : c.p1) + c.segM;
      if (k === 1) cf[k] -= c.A;
      if (k > c.mc) cf[k] += y * V * Math.pow(q, k / 12);
    }
    cf[c.mc] -= c.Lp + c.S + c.Le;
    cf[N] += VN;
    var lo = -0.02, hi = 0.05, it, mid, sum;
    for (it = 0; it < 100; it++) {
      mid = (lo + hi) / 2; sum = 0;
      for (k = 1; k <= N; k++) sum += cf[k] / Math.pow(1 + mid, k);
      if (sum > 0) lo = mid; else hi = mid;
    }
    return { Vm: Vm, rent0: y * Vm, carry: y * Vm - parc, rentAcc: rentAcc, VN: VN, pocket: pocket, result: VN + rentAcc - pocket, rentEnd: y * VN, cover: cover, irr: Math.pow(1 + lo, 12) - 1 };
  }
  // Revenda da unidade na planta (cessão do contrato) em S meses: o comprador reembolsa o que foi pago e a valorização fica com o vendedor.
  function flip(f, V, S, g, i) {
    var base = f.entrada, k;
    base += f.mensal.pct * Math.min(f.mensal.n, S) / f.mensal.n;
    for (k = 1; k <= f.reforco.n; k++) { if (12 * k <= S) base += f.reforco.pct / f.reforco.n; }
    base = Math.min(base, 100);
    var paid = V * base / 100, Vs = V * Math.pow((1 + g) / (1 + i), S / 12), gain = Vs - V;
    return { S: S, basePct: base, paid: paid, Vs: Vs, gain: gain, roi: paid > 0 ? gain / paid : 0 };
  }

  function mount(sel, cfg) {
    var ph = document.querySelector(sel);
    if (!ph) return;
    if (!document.getElementById('cp-css')) {
      var st0 = document.createElement('style'); st0.id = 'cp-css';
      st0.textContent = CSS + [
        '.cp-emp{display:flex;flex-wrap:wrap;gap:8px}',
        '.cp-sum{margin-top:36px}',
        '.cp-sum h3{font-size:1.25rem;margin-bottom:4px}',
        '.cp-sum .cp-sm{color:var(--muted);font-size:.9rem;margin-bottom:12px;max-width:70ch}',
        '.cp-tw{overflow-x:auto;border:1px solid var(--rule);border-radius:3px;background:var(--surface)}',
        '.cp-tb{width:100%;border-collapse:collapse;min-width:720px;font-size:.9rem}',
        '.cp-tb th,.cp-tb td{padding:12px 14px;text-align:left;border-bottom:1px solid var(--rule);vertical-align:top}',
        '.cp-tb th{font-weight:600;font-size:.82rem;color:var(--muted)}',
        '.cp-tb td:first-child{font-weight:600}',
        '.cp-tb td small{display:block;color:var(--muted);font-weight:400;font-size:.8rem}',
        '.cp-tb tr:last-child td{border-bottom:0}',
        '.cp-callout{margin-top:22px;padding:14px 16px;border-left:3px solid var(--brass);background:var(--surface);border-top:1px solid var(--rule);border-right:1px solid var(--rule);border-bottom:1px solid var(--rule);font-size:.93rem;color:var(--muted);max-width:70ch}',
        '.cp-callout b{color:var(--ink)}',
        '.cp-grp{margin:14px 0 2px;font-weight:600;font-size:.92rem;color:var(--brass-light)}',
        '.cp-card:not(.cp-dark) .cp-grp{color:var(--accent)}',
        '.cp-dark .cp-cs{color:rgba(242,238,228,.7)}',
        '.cp-cs{color:var(--muted);font-size:.85rem;padding:0 0 12px}',
        '.cp-dv{margin:14px 0}',
        '.cp-dvl{display:flex;justify-content:space-between;gap:12px;font-size:.9rem;margin-bottom:5px}',
        '.cp-dvl span:last-child{font-weight:600;font-variant-numeric:tabular-nums}',
        '.cp-dvt{position:relative;height:14px;background:var(--rule);border-radius:2px}',
        '.cp-dvz{position:absolute;left:50%;top:-3px;bottom:-3px;width:1px;background:var(--muted)}',
        '.cp-dvb{position:absolute;top:0;bottom:0;display:block}',
        '.cp-dvb.pos{background:var(--brass)}',
        '.cp-dvb.neg{background:var(--navy)}',
        '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .cp-dvb.neg{background:#7C93AD}}',
        ':root[data-theme="dark"] .cp-dvb.neg{background:#7C93AD}',
        '.cp-dvs{font-size:.8rem;color:var(--muted);margin-top:3px}'
      ].join('\n');
      document.head.appendChild(st0);
    }
    var qs = ''; try { qs = new URLSearchParams(location.search).get('e') || ''; } catch (e) { qs = ''; }
    var st = { emp: EMP[qs] ? qs : 'kansas', fl: 0, m: 24, plan: 'red', goal: 'rev', S: 24, loc: 'a', editedR: false, editedC: false, edited: false, valor: 0 };
    st.valor = EMP[st.emp].fluxos[0].valor;

    var h = '';
    h += '<section id="pagar"><div class="wrap">';
    h += '<div class="head"><h2>O que essa comparação revela</h2><p id="cp-exemplo"></p></div>';
    h += '<div class="cp-why"><div><h3>Na planta, a valorização trabalha com pouco capital</h3><p id="cp-i1"></p></div><div><h3>Na carta, o ágio paga a espera</h3><p id="cp-i2"></p></div><div><h3>Cada caminho depende de uma coisa</h3><p id="cp-i3"></p></div></div>';
    h += '<div class="head cp-sub"><h3>Agora faça com o seu cenário</h3><p>Escolha o empreendimento e mexa nos controles. Nada é enviado para ninguém.</p></div>';
    h += '<div class="cp-sim"><div class="cp-ctl">';
    h += '<div class="cp-f"><span class="cp-lbl" id="cp-empl">Empreendimento na planta</span><div class="cp-emp" id="cp-emp" role="group" aria-labelledby="cp-empl"></div><div class="cp-chips" id="cp-fl" role="group" aria-label="Fluxo de pagamento"></div></div>';
    h += '<div class="cp-f"><label for="cp-v">Valor do imóvel (R$)</label><input class="cp-in" id="cp-v" inputmode="numeric" value="' + st.valor.toLocaleString('pt-BR') + '" autocomplete="off"><small id="cp-vnota"></small></div>';
    h += '<div class="cp-f"><span class="cp-lbl" id="cp-gl">O que você quer fazer?</span><div class="cp-chips" role="group" aria-labelledby="cp-gl"><button type="button" class="cp-chip" data-cpg="rev">Revender em até 24 meses</button><button type="button" class="cp-chip" data-cpg="fic">Ficar com o imóvel e receber aluguel</button></div></div>';
    h += '<div class="cp-f" id="cp-w-rs"><label for="cp-rs">Revender a unidade na planta no mês</label><div class="cp-row"><input type="range" id="cp-rs" min="1" max="24" step="1" value="24"><output id="cp-rso" for="cp-rs"></output></div><small>Cessão do contrato a outro comprador, que reembolsa o que você pagou. Depende da incorporadora.</small></div>';
    h += '<div class="cp-f"><span class="cp-lbl" id="cp-pl">Plano do consórcio (menor parcela, 240 meses)</span><div class="cp-chips" role="group" aria-labelledby="cp-pl"><button type="button" class="cp-chip" data-cpp="int">Parcela integral</button><button type="button" class="cp-chip" data-cpp="red">50% reduzida</button></div><small id="cp-plnota"></small></div>';
    h += '<div class="cp-f"><label for="cp-em">Lance embutido (% do crédito)</label><div class="cp-row"><input type="range" id="cp-em" min="0" max="25" step="1" value="25"><output id="cp-emo" for="cp-em"></output></div><small id="cp-emnota"></small></div>';
    h += '<div class="cp-f"><label for="cp-e">Lance com recursos próprios (R$)</label><input class="cp-in" id="cp-e" inputmode="numeric" value="0" autocomplete="off"><small id="cp-enota"></small></div>';
    h += '<div class="cp-f"><label for="cp-m">Quando o consórcio contempla (hipótese)</label><div class="cp-row"><input type="range" id="cp-m" min="1" max="60" step="1" value="24"><output id="cp-mo" for="cp-m"></output></div>';
    h += '<div class="cp-chips" role="group" aria-label="Cenários de contemplação"><button type="button" class="cp-chip" data-cpm="6">Sorte: 6 meses</button><button type="button" class="cp-chip" data-cpm="24">Lance competitivo: 24</button><button type="button" class="cp-chip" data-cpm="48">Sem pressa: 48</button></div>';
    h += '<small>Contemplação é por sorteio ou lance e não tem data garantida. Aqui você testa cenários, não promessas.</small></div>';
    h += '<div class="cp-f" id="cp-w-ag"><label for="cp-ag">Ágio na venda da carta contemplada</label><div class="cp-row"><input type="range" id="cp-ag" min="0" max="60" step="1" value="35"><output id="cp-ago" for="cp-ag"></output></div><small>Percentual do valor da carta que o comprador paga ao vendedor, que também assume as parcelas que restam. O ágio varia com o mercado.</small></div>';
    h += '<div class="cp-f" id="cp-w-h"><label for="cp-h">Meses com a carta parada, rendendo</label><div class="cp-row"><input type="range" id="cp-h" min="1" max="36" step="1" value="12"><output id="cp-ho" for="cp-h"></output></div></div>';
    h += '<div class="cp-f"><label for="cp-n">Prazo do financiamento do saldo da planta</label><div class="cp-row"><input type="range" id="cp-n" min="5" max="30" step="1" value="15"><output id="cp-no" for="cp-n"></output></div></div>';
    h += '<div class="cp-f"><label for="cp-g">Valorização do imóvel ao ano</label><div class="cp-row"><input type="range" id="cp-g" min="0" max="30" step="0.5" value="8"><output id="cp-go" for="cp-g"></output></div><small id="cp-gn"></small></div>';
    h += '<div class="cp-f" id="cp-w-ay"><span class="cp-lbl" id="cp-ll">Tipo de locação</span><div class="cp-chips" id="cp-loc" role="group" aria-labelledby="cp-ll"></div>';
    h += '<div id="cp-w-ra" style="margin-top:12px"><label for="cp-ra">Aluguel mensal hoje (R$)</label><input class="cp-in" id="cp-ra" inputmode="numeric" autocomplete="off"></div>';
    h += '<div id="cp-w-rt" style="margin-top:12px"><label for="cp-rd">Diária média na alta temporada (R$)</label><input class="cp-in" id="cp-rd" inputmode="numeric" autocomplete="off"><label for="cp-rn" style="margin-top:10px">Dias ocupados por ano</label><input class="cp-in" id="cp-rn" type="number" step="1" min="0" max="365"></div>';
    h += '<small id="cp-rnota"></small></div>';
    h += '<div class="cp-f" id="cp-w-ac"><label for="cp-ac">Custos sobre o aluguel (%)</label><input class="cp-in" id="cp-ac" type="number" step="1" value="20"><small id="cp-acnota"></small></div>';
    h += '<details class="cp-adv"><summary>Premissas que você pode ajustar</summary><div class="cp-advgrid">';
    h += '<div class="cp-f"><label for="cp-i">INCC ao ano (%)</label><input class="cp-in" id="cp-i" type="number" step="0.05" value="6.75"></div>';
    h += '<div class="cp-f"><label for="cp-r">Juros do saldo da planta na entrega, ao ano (%)</label><input class="cp-in" id="cp-r" type="number" step="0.05" value="12"></div>';
    h += '<div class="cp-f"><label for="cp-sf">Seguros do financiamento (% ao mês)</label><input class="cp-in" id="cp-sf" type="number" step="0.005" value="0.04"></div>';
    h += '<div class="cp-f"><label for="cp-tf">Tarifa mensal do financiamento (R$)</label><input class="cp-in" id="cp-tf" type="number" step="1" value="25"></div>';
    h += '<div class="cp-f"><label for="cp-sc">Seguro de vida do consórcio (% ao mês sobre o crédito)</label><input class="cp-in" id="cp-sc" type="number" step="0.001" value="0.061"></div>';
    h += '<div class="cp-f"><label for="cp-ab">Base do ágio na venda da carta</label><select class="cp-in" id="cp-ab"><option value="d">Crédito disponível, depois do lance embutido</option><option value="b">Crédito bruto</option></select></div>';
    h += '<div class="cp-f"><label for="cp-fd">Fundo de reserva devolvido no fim (% do crédito)</label><input class="cp-in" id="cp-fd" type="number" step="0.5" value="0"></div>';
    h += '<div class="cp-f"><label for="cp-rc">Rendimento do crédito parado (% ao ano)</label><input class="cp-in" id="cp-rc" type="number" step="0.05" value="12.68"></div>';
    h += '<p class="cp-advnote">INCC-M em 12 meses até outubro/2026: 6,75% (FGV). Juros do saldo: média da Caixa no SBPE em setembro/2026, 12,05% ao ano mais TR, que não entra na conta. Se o saldo continuar com a construtora depois das chaves, use a taxa da tabela. Consórcio: parcelas calculadas a partir da tabela de referência vigente, 240 meses, taxa total de 24% até R$ 600 mil e 22% acima, com 2% de taxa antecipada na primeira parcela, e seguro opcional de 0,061% ao mês sobre o valor do crédito. O fundo de reserva não utilizado pode voltar ao consorciado no fim do grupo: informe aqui o percentual se quiser considerar. Rendimento do crédito parado: cerca de 1% ao mês (CDI ou outro indexador), ou 12,68% ao ano, conforme a regra da administradora. Rendimento da carta parada: fica com o dono, e quem compra leva só a carta. Revenda na planta: o comprador reembolsa o que você pagou e a valorização fica com você, sem comissão nem taxa de cessão.</p>';
    h += '</div></details></div>';
    h += '<div class="cp-res" aria-live="polite"><div class="cp-cols"><div class="cp-card cp-dark" id="cp-cc"></div><div class="cp-card" id="cp-cf"></div></div><div class="cp-card" id="cp-c3"></div><div class="cp-bars" id="cp-bars"></div><div class="cp-verdict" id="cp-verdict"></div><details class="cp-adv"><summary>Como o consórcio é calculado</summary><div class="cp-card" id="cp-how" style="margin-top:14px"></div></details></div></div>';
    h += '<div class="cp-sum" id="cp-sum"></div>';
    h += '<p class="cp-callout"><b>Por que a planta e a carta são caminhos separados?</b> A carta de crédito do consórcio não compra imóvel na planta, porque ele ainda não tem habite-se, e as administradoras não aceitam. Por isso o consórcio aparece como carta contemplada, que você pode vender com ágio ou usar em um imóvel pronto, e a planta, como unidade que você pode revender ou manter até a chave.</p>';
    h += '<p class="cp-fine">Simulação ilustrativa, com hipóteses ajustáveis por você. Não é oferta, promessa nem recomendação de investimento. Valores em reais de hoje, descontada a correção pelo INCC. A contemplação no consórcio ocorre por sorteio ou lance, sem data garantida, e depende do regulamento da administradora. O lance embutido reduz o crédito disponível. A venda da carta contemplada exige a transferência da cota pela administradora, e o ágio depende do mercado. A revenda na planta exige a cessão do contrato com a anuência da incorporadora. A projeção de aluguel usa uma média de mercado ajustável e não garante locação, prazo nem valor. Os valores da planta seguem a tabela vigente de cada incorporadora. Não estão considerados TR, ITBI, registro, avaliação do imóvel, comissão de venda, taxas de transferência e impostos.</p>';
    h += '</div></section>';

    h += '<section class="alt" id="consorcio"><div class="wrap">';
    h += '<div class="head"><h2>Consórcio sem mistério</h2><p>O que costuma ficar de fora quando alguém explica consórcio em um minuto.</p></div>';
    h += '<div class="cp-why">';
    [['Sem juros, mas com custo', 'Em vez de juros, o consórcio cobra taxa de administração, fundo de reserva e seguro. A parcela é corrigida pelo INCC todo ano.'],
     ['Parcela reduzida não é desconto', 'No plano 50% reduzida, você paga metade do crédito até ser contemplado. A parte não paga entra nas parcelas que restam.'],
     ['Contemplação é sorteio ou lance', 'A cada assembleia sai uma cota por sorteio, e as demais por lance, conforme o saldo do grupo. O lance pode ser livre ou fixo, de 25% ou 50%.'],
     ['Lance embutido sai do seu crédito', 'Você usa até 25% do próprio crédito no lance e não tira dinheiro do bolso, mas recebe um crédito menor. É o primeiro número de quem pensa em vender a carta.'],
     ['O fundo de reserva pode voltar', 'Ele é aplicado desde a primeira parcela e, se não for utilizado, pode voltar com rendimento no fim do grupo. Por isso aparece como custo, com essa ressalva.'],
     ['A carta contemplada é um ativo', 'Contemplada, a carta pode ser vendida com ágio, e o comprador assume as parcelas, ou ficar parada rendendo, em geral perto de 1% ao mês (CDI ou outro indexador), conforme a administradora. O rendimento fica com você, e quem compra leva só a carta.']].forEach(function (x) { h += '<div><h3>' + x[0] + '</h3><p>' + x[1] + '</p></div>'; });
    h += '</div></div></section>';

    h += '<section id="perguntas"><div class="wrap">';
    h += '<div class="head"><h2>Antes de assinar, pergunte</h2><p>As perguntas que separam uma boa decisão de uma surpresa.</p></div>';
    h += '<div class="cp-chk"><div><h3>Se for consórcio</h3><ul>';
    [['Qual a taxa de administração, o fundo de reserva e a taxa antecipada?', 'São eles que definem o custo do crédito. Peça o valor total e quando a antecipada é cobrada.'],
     ['Como funciona o lance?', 'Livre, fixo ou embutido na própria carta, e se ele reduz o prazo ou a parcela.'],
     ['O plano reduzido muda a parcela depois da contemplação?', 'A parte não paga antes entra nas parcelas que restam. Peça a simulação do que vem depois.'],
     ['Posso vender a carta contemplada? Como é a transferência?', 'Pergunte as regras, os custos e se o comprador assume as parcelas.'],
     ['O crédito contemplado e parado rende? Quanto?', 'Peça o índice e por quanto tempo a carta fica disponível.'],
     ['O fundo de reserva é aplicado? Volta se não for usado?', 'Pergunte onde ele fica aplicado, quando volta e com qual rendimento.'],
     ['A administradora é autorizada pelo Banco Central?', 'Confira no site do Banco Central antes de pagar a primeira parcela.']].forEach(function (x) { h += '<li><b>' + x[0] + '</b><span>' + x[1] + '</span></li>'; });
    h += '</ul></div><div><h3>Se for imóvel na planta</h3><ul>';
    [['Qual o registro de incorporação e como está a obra?', 'Confira no cartório e peça o cronograma de entrega.'],
     ['A obra tem patrimônio de afetação?', 'Ele separa o dinheiro dos compradores do restante da construtora.'],
     ['Qual o índice de correção até a chave e depois dela?', 'Até as chaves costuma ser INCC ou CUB. Pergunte o índice e os juros do saldo depois.'],
     ['Qual o prazo de entrega e a tolerância de atraso?', 'Veja o que o contrato diz sobre atrasos.'],
     ['Posso ceder o contrato antes da entrega? Com qual taxa?', 'Pergunte as regras, o prazo e a taxa de cessão, caso queira revender.'],
     ['O que acontece se eu desistir?', 'Leia a multa e a devolução do distrato antes de assinar.'],
     ['Como vou financiar o saldo na entrega?', 'Veja o CET, se é SAC ou Price e se a sua renda comprova a parcela.']].forEach(function (x) { h += '<li><b>' + x[0] + '</b><span>' + x[1] + '</span></li>'; });
    h += '</ul></div></div>';
    h += '<div class="cp-ask"><div><h3>Quer essa conta com as taxas reais?</h3><p>Eu refaço a comparação com as taxas da administradora e a tabela do empreendimento e devolvo um comparativo para você decidir com calma. Sem compromisso.</p></div><a class="btn btn-gold" href="' + cfg.wa + '">Receber o meu comparativo</a></div>';
    h += '</div></section>';

    ph.insertAdjacentHTML('beforebegin', h);
    ph.parentNode.removeChild(ph);

    function $(id) { return document.getElementById(id); }
    function num(id, def) { var x = parseFloat(String($(id).value).replace(',', '.')); return isNaN(x) ? def : x; }
    function money(id, def) { var x = parseInt(String($(id).value).replace(/\D/g, ''), 10); return isNaN(x) || x < 0 ? def : x; }
    function dv(label, val, mx, sub) {
      var half = Math.min(50, Math.abs(val) / mx * 50), left = val >= 0 ? 50 : 50 - half;
      return '<div class="cp-dv"><div class="cp-dvl"><span>' + label + '</span><span>' + sgn(val) + '</span></div><div class="cp-dvt"><i class="cp-dvz"></i><i class="cp-dvb ' + (val >= 0 ? 'pos' : 'neg') + '" style="left:' + left + '%;width:' + Math.max(half, 0.8) + '%"></i></div><div class="cp-dvs">' + sub + '</div></div>';
    }
    function chips() {
      var e = '';
      ORDER.forEach(function (k) { e += '<button type="button" class="cp-chip" data-cpe="' + k + '" aria-pressed="' + (k === st.emp) + '">' + EMP[k].nome + '</button>'; });
      $('cp-emp').innerHTML = e;
      var fl = '', fx = EMP[st.emp].fluxos;
      if (fx.length > 1) fx.forEach(function (f, k) { fl += '<button type="button" class="cp-chip" data-cpf="' + k + '" aria-pressed="' + (k === st.fl) + '">' + f.label + '</button>'; });
      $('cp-fl').innerHTML = fl;
      var lc = '<button type="button" class="cp-chip" data-cpl="a" aria-pressed="' + (st.loc === 'a') + '">Anual</button>';
      if (EMP[st.emp].alug && EMP[st.emp].alug.diaria) lc += '<button type="button" class="cp-chip" data-cpl="t" aria-pressed="' + (st.loc === 't') + '">Temporada</button>';
      $('cp-loc').innerHTML = lc;
    }
    function applyRentDefaults() {
      var E0 = EMP[st.emp], f = E0.fluxos[st.fl], al = E0.alug;
      if (st.loc === 't' && !(al && al.diaria)) st.loc = 'a';
      if (!st.editedR) {
        $('cp-ra').value = (al ? al.anual : Math.round(f.valor * 0.005 / 50) * 50).toLocaleString('pt-BR');
        $('cp-rd').value = al && al.diaria ? al.diaria.toLocaleString('pt-BR') : '';
        $('cp-rn').value = al && al.dias ? al.dias : '';
      }
      if (!st.editedC) $('cp-ac').value = st.loc === 't' ? 35 : 20;
    }

    function render() {
      var E0 = EMP[st.emp], f = E0.fluxos[st.fl];
      var V = money('cp-v', f.valor) || f.valor, E = Math.min(money('cp-e', 0), V), emb = parseInt($('cp-em').value, 10) / 100, bruto = $('cp-ab').value === 'b';
      var gEl = $('cp-g'); gEl.max = st.goal === 'rev' ? 30 : 15; if (parseFloat(gEl.value) > parseFloat(gEl.max)) gEl.value = gEl.max;
      $('cp-gn').textContent = 'Referência: o FipeZAP mostrou para Itajaí cerca de 5,4% em 12 meses (maio/2026) e 12,2% em 12 meses (julho/2024). Na revenda, o que vale é o reajuste real da tabela.' + (st.goal === 'rev' ? '' : ' No plano de 20 anos, valorização acima de 12% ao ano é improvável de se sustentar, e o teto aqui é 15%.');
      var Ny = parseInt($('cp-n').value, 10), g = parseFloat($('cp-g').value) / 100, ag = parseFloat($('cp-ag').value) / 100, H = parseInt($('cp-h').value, 10);
      var i = num('cp-i', 6.75) / 100, r = num('cp-r', 12) / 100, sf = num('cp-sf', 0.04) / 100, tf = num('cp-tf', 25), sc = num('cp-sc', 0.061) / 100, rc = num('cp-rc', 12.68) / 100, fd = num('cp-fd', 0) / 100;
      var N = Ny * 12, mc = st.m, T = monthsUntil(E0.entrega);
      $('cp-no').textContent = Ny + ' anos'; $('cp-mo').textContent = mc + (mc === 1 ? ' mês' : ' meses'); $('cp-go').textContent = pc(g * 100, 1);
      $('cp-ago').textContent = pc(ag * 100, 0); $('cp-ho').textContent = H + (H === 1 ? ' mês' : ' meses');
      Array.prototype.forEach.call(document.querySelectorAll('[data-cpm]'), function (b) { b.setAttribute('aria-pressed', String(parseInt(b.getAttribute('data-cpm'), 10) === mc)); });
      Array.prototype.forEach.call(document.querySelectorAll('[data-cpp]'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-cpp') === st.plan)); });
      $('cp-vnota').textContent = f.valorNota + ' Troque pelo valor da unidade que você está avaliando. A carta de crédito do consórcio tem o mesmo valor, para comprar um imóvel pronto equivalente.';
      $('cp-emo').textContent = pc(emb * 100, 0); $('cp-emnota').textContent = 'Usa parte do próprio crédito: ' + brl(V * emb) + ' saem do crédito e você não tira dinheiro do bolso, mas recebe um crédito menor. O limite é de até 25%.';
      $('cp-enota').textContent = 'Soma ao embutido. Um lance fixo de 50% equivale a 25% embutido mais 25% do bolso (' + brl(V * 0.25) + '). Com 0, você testa só o embutido ou o sorteio.';
      var c = cons(V, E, emb, st.plan, sc, mc, g, i, ag, rc, H, fd, bruto), P = planta(f, V, T, g, i, r, sf, tf, N);
      var S = parseInt($('cp-rs').value, 10), F = flip(f, V, S, g, i), rev = st.goal === 'rev';
      function roi(res, paid) { return paid > 0 ? (res < 0 ? '−' : '') + pc(Math.abs(res / paid * 100), 0) : '–'; }
      $('cp-rso').textContent = S + (S === 1 ? ' mês' : ' meses');
      ['cp-w-rs', 'cp-w-ag', 'cp-w-h'].forEach(function (id) { $(id).style.display = rev ? '' : 'none'; });
      ['cp-w-ay', 'cp-w-ac'].forEach(function (id) { $(id).style.display = rev ? 'none' : ''; });
      var tmp = st.loc === 't', raw = tmp ? num('cp-rd', 0) * num('cp-rn', 0) / 12 : money('cp-ra', 0), cust = num('cp-ac', 20);
      var y = raw * (1 - cust / 100) / V, R = renda(V, c, y, g, i), rentT = y * P.VT, carryP = rentT - P.finFirst;
      $('cp-w-ra').style.display = tmp ? 'none' : ''; $('cp-w-rt').style.display = tmp ? '' : 'none';
      $('cp-rnota').textContent = (E0.alug ? E0.alug.nota : 'Estimativa genérica de 0,5% ao mês do valor do imóvel, até haver um dado específico do empreendimento.') + ' Aluguel bruto de ' + brl(raw) + ' por mês em média, rentabilidade bruta de ' + pc(raw * 12 / V * 100, 1) + ' ao ano e líquida de ' + pc(raw * 12 * (1 - cust / 100) / V * 100, 1) + '.';
      $('cp-acnota').textContent = tmp ? 'Taxas de plataforma, limpeza, gestão, vacância, condomínio e IPTU. É uma hipótese: ajuste ao seu caso.' : 'Vacância, administração, condomínio e IPTU. É uma hipótese: ajuste ao seu caso.';
      Array.prototype.forEach.call(document.querySelectorAll('[data-cpg]'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-cpg') === st.goal)); });
      $('cp-plnota').textContent = 'Carta de referência: ' + brl(cartaRef(V)) + '. Parcela integral de ' + brl(c.reg) + ' ou 50% reduzida de ' + brl(c.red) + ' até a contemplação, e a parte não paga entra nas parcelas depois.';

      var o = '<h3>' + (rev ? 'Consórcio: vender a carta' : 'Consórcio: comprar o imóvel e alugar') + '</h3><p class="cp-s">' + (rev ? 'Contemplada no mês ' + c.mc + ', a carta de crédito é vendida com ágio de ' + pc(ag * 100, 0) + '. Você vende o crédito, não um imóvel.' : 'Contemplada no mês ' + c.mc + ', a carta de crédito compra um imóvel pronto, que você aluga.') + '</p>';
      o += '<p class="cp-grp">O crédito (a carta)</p>';
      o += '<div class="cp-li"><span>Carta de crédito</span><span>' + brl(V) + '</span></div>';
      o += '<div class="cp-li"><span>Lance embutido (' + pc(emb * 100, 0) + ' do crédito)</span><span>' + brl(c.Le) + '</span></div>';
      o += '<div class="cp-li"><span>Lance com recursos próprios</span><span>' + brl(c.Lp) + '</span></div>';
      o += '<div class="cp-li"><span>Crédito disponível depois do lance</span><span>' + brl(c.disp) + '</span></div>';
      o += '<div class="cp-li"><span>Parcela do crédito depois do lance</span><span>' + brl(c.afterFirst) + '</span></div>';
      if (rev) {
        o += '<p class="cp-grp">A venda da carta</p>';
        o += '<div class="cp-li"><span>Você terá pago do bolso até vender</span><span>' + brl(c.paidM) + '</span></div>';
        o += '<div class="cp-li"><span>Ágio recebido</span><span>' + brl(c.X) + '</span></div>';
        o += '<div class="cp-li"><span>Saldo do crédito que o comprador assume</span><span>' + brl(c.bal) + '</span></div>';
        o += '<div class="cp-li"><span>Retorno sobre o que pagou</span><span>' + roi(c.resSell, c.paidM) + '</span></div>';
        o += '<div class="cp-li cp-key"><span>Resultado da venda</span><span>' + sgn(c.resSell) + '</span></div>';
      } else {
        o += '<p class="cp-grp">O imóvel que você compra com a carta</p>';
        o += '<div class="cp-li"><span>Você compra o imóvel</span><span>no mês ' + c.mc + ', se contemplado</span></div>';
        o += '<div class="cp-li"><span>Preço do imóvel nessa data</span><span>' + brl(R.Vm) + '</span></div>';
        if (c.S + c.Le > 0) o += '<div class="cp-li"><span>Você complementa do bolso (imóvel menos crédito)</span><span>' + brl(c.S + c.Le) + '</span></div>';
        o += '<div class="cp-li"><span>Aluguel líquido no mês da compra</span><span>' + brl(R.rent0) + '</span></div>';
        o += '<div class="cp-li"><span>Aluguel menos parcela do crédito, por mês</span><span>' + sgn(R.carry) + '</span></div>';
        o += '<div class="cp-li"><span>O aluguel cobre a parcela</span><span>' + (R.cover ? 'a partir do mês ' + R.cover : 'não cobre no plano') + '</span></div>';
        o += '<div class="cp-li"><span>Aluguel recebido até o mês ' + NC + '</span><span>' + brl(R.rentAcc) + '</span></div>';
        o += '<div class="cp-li"><span>O imóvel passa a valer, no mês ' + NC + '</span><span>' + brl(R.VN) + '</span></div>';
        o += '<p class="cp-grp">O custo e o resultado</p>';
        o += '<div class="cp-li"><span>Custo do crédito</span><span>' + brl(c.cost) + ' · ' + pc(c.cost / V * 100, 0) + '</span></div>';
        o += '<div class="cp-li"><span>Você terá pago ao todo (crédito, lance e complemento)</span><span>' + brl(R.pocket) + '</span></div>';
        o += '<div class="cp-li"><span>Retorno real do plano, ao ano</span><span>' + pc(R.irr * 100, 1) + '</span></div>';
        o += '<div class="cp-li cp-key"><span>Resultado ao fim do plano (imóvel mais aluguel, menos o que pagou)</span><span>' + sgn(R.result) + '</span></div>';
        o += '<div class="cp-li cp-key"><span>Renda de aluguel depois de quitar, por mês</span><span>' + brl(R.rentEnd) + '</span></div>';
        o += '<p class="cp-cs">O crédito fica em ' + brl(V) + ', corrigido pelo INCC. O que valoriza é o imóvel comprado com ele. O retorno real é o que sobra acima do INCC: uma aplicação a ' + pc(rc * 100, 2) + ' ao ano rende cerca de ' + pc(((1 + rc) / (1 + i) - 1) * 100, 1) + ' acima dele.</p>';
      }
      $('cp-cc').innerHTML = o;

      $('cp-c3').style.display = rev ? '' : 'none';
      if (rev) {
        var rmcPct = (Math.pow(1 + rc, 1 / 12) - 1) * 100;
        o = '<h3>Consórcio: deixar a carta rendendo</h3><p class="cp-s">Em vez de vender no mês ' + c.mc + ', você espera ' + H + (H === 1 ? ' mês' : ' meses') + ' com a carta parada. Ela rende cerca de ' + pc(rmcPct, 2) + ' ao mês, como uma aplicação, e esse rendimento é seu. Quem compra leva só a carta. Não é aluguel.</p>';
        o += '<div class="cp-li"><span>Rendimento da carta parada</span><span>' + brl(c.Y) + '</span></div>';
        o += '<div class="cp-li"><span>Você terá pago do bolso no total</span><span>' + brl(c.paidH) + '</span></div>';
        o += '<div class="cp-li"><span>Ágio ao vender só a carta</span><span>' + brl(c.X) + '</span></div>';
        o += '<div class="cp-li"><span>Retorno sobre o que pagou</span><span>' + roi(c.resRender, c.paidH) + '</span></div>';
        o += '<div class="cp-li cp-key"><span>Resultado, vendendo depois</span><span>' + sgn(c.resRender) + '</span></div>';
        $('cp-c3').innerHTML = o;
      }

      o = '<h3>' + (rev ? 'Imóvel na planta: revender' : 'Imóvel na planta: ficar e alugar') + '</h3><p class="cp-s">' + E0.nome + ', ' + f.label.toLowerCase() + '</p>';
      o += '<div class="cp-li"><span>Entrada</span><span>' + brl(P.entrada) + '</span></div>';
      o += '<div class="cp-li"><span>Parcela mensal na obra</span><span>' + brl(P.mensal) + '</span></div>';
      if (f.reforco.n > 0) o += '<div class="cp-li"><span>Reforço anual</span><span>' + brl(P.ref) + '</span></div>';
      if (rev) {
        o += '<div class="cp-li"><span>Você terá pago até revender, no mês ' + S + '</span><span>' + brl(F.paid) + ' · ' + pc(F.basePct, 0) + '</span></div>';
        o += '<div class="cp-li"><span>A unidade passa a valer</span><span>' + brl(F.Vs) + '</span></div>';
        o += '<div class="cp-li"><span>Valorização que fica com você</span><span>' + sgn(F.gain) + '</span></div>';
        o += '<div class="cp-li"><span>Retorno sobre o que pagou</span><span>' + roi(F.gain, F.paid) + '</span></div>';
        o += '<div class="cp-li cp-key"><span>Resultado da revenda</span><span>' + sgn(F.gain) + '</span></div>';
        o += '<p class="cp-cs">O comprador reembolsa o que você pagou e assume o saldo. A cessão depende da incorporadora, e comissão e taxa de cessão ficam de fora.</p>';
      } else {
        o += '<div class="cp-li"><span>Você recebe a chave</span><span>em ' + E0.txt + '</span></div>';
        o += '<div class="cp-li"><span>Pago até a chave</span><span>' + brl(P.paid) + ' · ' + pc(P.basePct, 0) + '</span></div>';
        if (P.rem > 0.5) {
          o += '<div class="cp-li"><span>Saldo para financiar na chave</span><span>' + brl(P.rem) + '</span></div>';
          o += '<div class="cp-li"><span>Primeira parcela do saldo</span><span>' + brl(P.finFirst) + '</span></div>';
        }
        o += '<div class="cp-li"><span>Aluguel líquido na chave</span><span>' + brl(rentT) + '</span></div>';
        o += '<div class="cp-li"><span>Aluguel menos parcela do saldo, por mês</span><span>' + sgn(carryP) + '</span></div>';
        o += '<div class="cp-li"><span>Valorização até a chave</span><span>' + sgn(P.gain) + '</span></div>';
        o += '<div class="cp-li"><span>Custo do crédito (só o saldo)</span><span>' + brl(P.finCost) + ' · ' + pc(P.finCost / V * 100, 0) + '</span></div>';
        o += '<div class="cp-li cp-key"><span>Resultado: valorização menos custo do saldo</span><span>' + sgn(P.net) + '</span></div>';
      }
      $('cp-cf').innerHTML = o;

      o = '<p class="cp-s">Carta de ' + brl(V) + ' em ' + NC + ' meses, plano ' + (st.plan === 'red' ? '50% reduzida' : 'integral') + '.</p>';
      o += '<p class="cp-grp">Para onde vai o dinheiro</p>';
      o += '<div class="cp-li"><span>Taxa de administração (com 2% antecipada)</span><span>' + brl(c.admV) + '</span></div>';
      o += '<div class="cp-li"><span>Fundo de reserva (2%)</span><span>' + brl(c.frV) + '</span></div>';
      o += '<div class="cp-li"><span>Seguro de vida (opcional)</span><span>' + brl(c.segTot) + '</span></div>';
      o += '<p class="cp-cs">O fundo de reserva é aplicado desde a primeira parcela e, se não for utilizado, pode voltar com rendimento no fim do grupo. Aqui ele entra como custo.</p>';
      o += '<p class="cp-grp">Parcelas</p>';
      o += '<div class="cp-li"><span>Parcela integral (a menor)</span><span>' + brl(c.reg) + '</span></div>';
      o += '<div class="cp-li"><span>Parcela 50% reduzida (a menor)</span><span>' + brl(c.red) + '</span></div>';
      o += '<div class="cp-li"><span>Primeira parcela, com taxa antecipada</span><span>' + brl(c.first) + '</span></div>';
      $('cp-how').innerHTML = o;

      var rows = rev ? [
        { k: 'Imóvel na planta: revender no mês ' + S, v: F.gain, sub: 'Retorno de ' + roi(F.gain, F.paid) + ' sobre ' + brl(F.paid) + ' pagos.' },
        { k: 'Consórcio: vender a carta com ágio', v: c.resSell, sub: 'No mês ' + c.mc + ', se contemplado e houver comprador. Retorno de ' + roi(c.resSell, c.paidM) + ' sobre ' + brl(c.paidM) + ' pagos.' },
        { k: 'Consórcio: deixar a carta rendendo ' + H + ' m', v: c.resRender, sub: 'No mês ' + (c.mc + H) + ', vendendo depois, com o rendimento da carta (não é aluguel). Retorno de ' + roi(c.resRender, c.paidH) + ' sobre ' + brl(c.paidH) + ' pagos.' }
      ] : [
        { k: 'Imóvel na planta: aluguel menos parcela do saldo', v: carryP, sub: 'Por mês, a partir da chave em ' + E0.txt + '. Aluguel líquido de ' + brl(rentT) + (P.rem > 0.5 ? ' contra parcela de ' + brl(P.finFirst) + '.' : ', sem saldo a pagar.') },
        { k: 'Consórcio: aluguel menos parcela', v: R.carry, sub: 'Por mês, a partir do mês ' + c.mc + '. Aluguel líquido de ' + brl(R.rent0) + ' contra parcela de ' + brl(c.afterFirst) + '.' }];
      var mx = 1; rows.forEach(function (x) { mx = Math.max(mx, Math.abs(x.v)); });
      o = '<h3>' + (rev ? 'Resultado de cada caminho' : 'O aluguel paga a parcela?') + '</h3><p class="cp-s">' + (rev ? 'Em reais de hoje, quanto sobra ou falta em cada um, depois de tudo que você paga' : 'Em reais de hoje, quanto sobra ou falta por mês depois de comprar, já descontados os custos do aluguel') + '</p>';
      rows.forEach(function (x) { o += dv(x.k, x.v, mx, x.sub); });
      $('cp-bars').innerHTML = o;

      var v;
      if (rev) {
        var sorted = rows.slice().sort(function (a, b) { return b.v - a.v; }), best = sorted[0], worst = sorted[sorted.length - 1];
        v = 'Neste cenário, ' + (best.v >= 0 ? 'o melhor resultado' : 'o menor custo') + ' em reais de hoje é <b>' + best.k.toLowerCase() + '</b> (' + sgn(best.v) + ') e ' + (worst.v >= 0 ? 'o menor ganho' : 'o pior') + ' é <b>' + worst.k.toLowerCase() + '</b> (' + sgn(worst.v) + '). ';
        v += 'Na planta, o resultado vem da valorização da unidade, e na carta, do ágio. Uma depende do mercado do imóvel, a outra de ser contemplado e de haver comprador.';
      } else {
        v = 'Na planta, o aluguel líquido na chave (' + brl(rentT) + ')' + (P.rem > 0.5 ? ' cobre ' + pc(rentT / P.finFirst * 100, 0) + ' da parcela do saldo (' + brl(P.finFirst) + ').' : ' chega sem saldo a pagar.');
        v += ' No consórcio, o aluguel (' + brl(R.rent0) + ') cobre ' + pc(R.rent0 / c.afterFirst * 100, 0) + ' da parcela (' + brl(c.afterFirst) + ')' + (R.cover ? ' e passa a cobri-la a partir do mês ' + R.cover : '') + '. ';
        v += 'Ao fim dos ' + NC + ' meses o imóvel está quitado e o aluguel vira renda de <b>' + brl(R.rentEnd) + '</b> por mês, em reais de hoje, o que equivale a um retorno real de ' + pc(R.irr * 100, 1) + ' ao ano sobre o plano inteiro. Esse resultado depende de ser contemplado' + (c.S + c.Le > 0 ? ', de complementar ' + brl(c.S + c.Le) + ' na compra' : '') + ' e de alugar o imóvel.';
        if (g < i) v += ' Com valorização abaixo do INCC, o imóvel perde poder de compra.';
      }
      $('cp-verdict').innerHTML = v + ' Mexa no lance, no prazo de contemplação' + (rev ? '' : ', no aluguel') + ' e na valorização para ver o que pesa.';
      renderSum({ rev: rev, S: S, g: g, i: i, r: r, sf: sf, tf: tf, N: N, mc: mc, emb: emb, Ep: V > 0 ? E / V : 0, plan: st.plan, sc: sc, ag: ag, rc: rc, H: H, fd: fd, bruto: bruto });
    }
    function renderSum(par) {
      var rev = par.rev, o = '<h3>' + (rev ? 'Os cinco empreendimentos: revenda' : 'Os cinco empreendimentos: aluguel') + '</h3><p class="cp-sm">' + (rev ? 'Quanto sobra se você revender a unidade na planta ou vender a carta contemplada. Usa as hipóteses de cima e o valor e o fluxo promocionais de cada empreendimento.' : 'Quanto o aluguel rende e quanto cobre da parcela em cada empreendimento. Usa as hipóteses de cima, o aluguel anual de referência e o valor e o fluxo promocionais de cada um.') + '</p><div class="cp-tw"><table class="cp-tb"><thead><tr>';
      o += rev ? '<th>Empreendimento</th><th>Valor</th><th>Planta: revender no mês ' + par.S + '</th><th>Consórcio: vender a carta no mês ' + par.mc + '</th>' : '<th>Empreendimento</th><th>Valor</th><th>Aluguel líquido por mês</th><th>Rentabilidade líquida</th><th>Planta: aluguel menos parcela do saldo</th><th>Consórcio: aluguel menos parcela</th>';
      o += '</tr></thead><tbody>';
      ORDER.forEach(function (k) {
        var e = EMP[k], f = e.fluxos[0], V = f.valor, T = monthsUntil(e.entrega);
        var ck = cons(V, V * par.Ep, par.emb, par.plan, par.sc, par.mc, par.g, par.i, par.ag, par.rc, par.H, par.fd, par.bruto);
        o += '<tr><td>' + e.nome + '<small>' + f.label + '</small></td><td>' + brl(V) + '</td>';
        if (rev) {
          var Fk = flip(f, V, par.S, par.g, par.i);
          o += '<td>' + sgn(Fk.gain) + '<small>' + (Fk.paid > 0 ? (Fk.gain < 0 ? '−' : '') + pc(Math.abs(Fk.gain / Fk.paid * 100), 0) : '–') + ' sobre ' + brl(Fk.paid) + ' pagos</small></td>';
          o += '<td>' + sgn(ck.resSell) + '<small>' + (ck.paidM > 0 ? (ck.resSell < 0 ? '−' : '') + pc(Math.abs(ck.resSell / ck.paidM * 100), 0) : '–') + ' sobre ' + brl(ck.paidM) + ' pagos</small></td>';
        } else {
          var raw = e.alug ? e.alug.anual : Math.round(V * 0.005 / 50) * 50, net = raw * 0.8, y = net / V;
          var Pk = planta(f, V, T, par.g, par.i, par.r, par.sf, par.tf, par.N), Rk = renda(V, ck, y, par.g, par.i), carryK = y * Pk.VT - Pk.finFirst;
          o += '<td>' + brl(net) + '<small>aluguel de ' + brl(raw) + ', menos 20% de custos</small></td><td>' + pc(net * 12 / V * 100, 1) + ' ao ano</td>';
          o += '<td>' + sgn(carryK) + '<small>' + (Pk.rem > 0.5 ? 'parcela de ' + brl(Pk.finFirst) : 'sem saldo a pagar') + '</small></td>';
          o += '<td>' + sgn(Rk.carry) + '<small>parcela de ' + brl(ck.afterFirst) + '</small></td>';
        }
        o += '</tr>';
      });
      $('cp-sum').innerHTML = o + '</tbody></table></div>';
    }
    function pick(k, fl) {
      var changed = k !== st.emp;
      st.emp = k; st.fl = fl || 0;
      if (changed) st.editedR = false;
      if (!st.edited) { st.valor = EMP[k].fluxos[st.fl].valor; $('cp-v').value = st.valor.toLocaleString('pt-BR'); }
      applyRentDefaults(); chips(); render();
    }
    $('cp-v').addEventListener('input', function () {
      st.edited = true;
      render();
    });
    $('cp-v').addEventListener('blur', function (e) { e.target.value = (money('cp-v', EMP[st.emp].fluxos[st.fl].valor) || EMP[st.emp].fluxos[st.fl].valor).toLocaleString('pt-BR'); render(); });
    $('cp-e').addEventListener('input', render);
    $('cp-e').addEventListener('blur', function (e) { e.target.value = money('cp-e', 0).toLocaleString('pt-BR'); render(); });
    ['cp-n', 'cp-g', 'cp-ag', 'cp-h', 'cp-rs', 'cp-fd', 'cp-em', 'cp-ab', 'cp-i', 'cp-r', 'cp-sf', 'cp-tf', 'cp-sc', 'cp-rc'].forEach(function (id) { $(id).addEventListener('input', render); });
    $('cp-m').addEventListener('input', function (e) { st.m = parseInt(e.target.value, 10); render(); });
    ['cp-ra', 'cp-rd', 'cp-rn'].forEach(function (id) { $(id).addEventListener('input', function () { st.editedR = true; render(); }); });
    $('cp-ac').addEventListener('input', function () { st.editedC = true; render(); });
    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('button') : null;
      if (!t) return;
      if (t.hasAttribute('data-cpm')) { st.m = parseInt(t.getAttribute('data-cpm'), 10); $('cp-m').value = st.m; render(); }
      else if (t.hasAttribute('data-cpp')) { st.plan = t.getAttribute('data-cpp'); render(); }
      else if (t.hasAttribute('data-cpg')) { st.goal = t.getAttribute('data-cpg'); render(); }
      else if (t.hasAttribute('data-cpl')) { st.loc = t.getAttribute('data-cpl'); applyRentDefaults(); chips(); render(); }
      else if (t.hasAttribute('data-cpe')) pick(t.getAttribute('data-cpe'), 0);
      else if (t.hasAttribute('data-cpf')) pick(st.emp, parseInt(t.getAttribute('data-cpf'), 10));
    });

    // Exemplo fixo (Dot Zero, cenário padrão): revenda em até 24 meses
    var D = EMP['kansas'], f0 = D.fluxos[0], V0 = f0.valor, i0 = 0.0675;
    var F12 = flip(f0, V0, 24, 0.12, i0), F8 = flip(f0, V0, 24, 0.08, i0);
    var cE = cons(V0, 0, 0.25, 'red', 0.00061, 24, 0.08, i0, 0.35, 0.1268, 12, 0, false), cS = cons(V0, 0, 0, 'red', 0.00061, 24, 0.08, i0, 0.35, 0.1268, 12, 0, false), cP = cons(V0, Math.round(V0 * 0.25 / 1000) * 1000, 0, 'red', 0.00061, 24, 0.08, i0, 0.35, 0.1268, 12, 0, false);
    $('cp-exemplo').textContent = 'Um exemplo com o ' + D.nome + ' (' + brl(V0) + ') contra um consórcio de mesmo valor, revendendo em até 24 meses. Mais abaixo você escolhe o seu empreendimento e refaz a conta.';
    $('cp-i1').innerHTML = 'Na planta você trava o preço e paga pouco até revender: em 24 meses terá pago <b>' + brl(F12.paid) + '</b> (' + pc(F12.basePct, 0) + ' do valor). Se a unidade valorizar 12% ao ano, um cenário mais aquecido, o ganho é de <b>' + brl(F12.gain) + '</b>, ou <b>' + pc(F12.roi * 100, 0) + '</b> sobre o capital. Com 8% ao ano, o retorno cai para <b>' + pc(F8.roi * 100, 0) + '</b>.';
    $('cp-i2').innerHTML = 'No consórcio, a carta contemplada em 24 meses pode ser vendida com ágio de 35%. Com lance embutido de 25%, sem tirar dinheiro do bolso, você vende o crédito que sobra (' + brl(cE.disp) + ') por <b>' + brl(cE.X) + '</b>, tendo pago ' + brl(cE.paidM) + ': resultado de <b>' + sgn(cE.resSell) + '</b>. Se o lance de 25% sair do bolso, o resultado cai para <b>' + sgn(cP.resSell) + '</b>.';
    $('cp-i3').innerHTML = 'A planta rende com a valorização do imóvel, e a carta, com o ágio. Uma depende do mercado, a outra de ser contemplado e de haver comprador. Nenhuma tem resultado garantido, e comissão e taxas de cessão ficam de fora.';
    applyRentDefaults(); chips(); render();
  }
  window.Comparador = { mount: mount };
})();
