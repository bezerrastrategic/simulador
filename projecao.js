/* Simulador de projeção — Bezerra Strategic
   Uso: Projecao.mount('#projecao', config)
   Simulação ilustrativa, com hipóteses ajustáveis pelo visitante. */
(function () {
  var CSS = [
    '.pj{padding:64px 0}',
    '.pj .pj-grid{display:grid;grid-template-columns:1fr;gap:28px}',
    '@media (min-width:880px){.pj .pj-grid{grid-template-columns:0.9fr 1.1fr;gap:44px;align-items:start}}',
    '.pj-ctl{display:flex;flex-direction:column;gap:22px}',
    '.pj-f label,.pj-f .pj-lbl{display:block;font-weight:600;font-size:.95rem;margin-bottom:6px}',
    '.pj-f small{display:block;color:var(--muted,#5C6B7A);font-size:.84rem;margin-top:6px;line-height:1.45}',
    '.pj-in{width:100%;padding:12px 14px;border:1px solid var(--rule,rgba(11,29,51,.2));border-radius:3px;background:var(--surface,#fff);color:var(--ink,#0B1D33);font:inherit}',
    '.pj-row{display:flex;align-items:center;gap:14px}',
    '.pj-row input[type=range]{flex:1;accent-color:var(--brass,#B8963E);min-width:0}',
    '.pj-row output{min-width:3.6em;text-align:right;font-weight:600;font-variant-numeric:tabular-nums}',
    '.pj-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}',
    '.pj-chip{border:1px solid var(--rule,rgba(11,29,51,.2));background:transparent;color:var(--ink,#0B1D33);padding:8px 12px;border-radius:3px;font:inherit;font-size:.88rem;cursor:pointer}',
    '.pj-chip[aria-pressed=true]{background:var(--brass,#B8963E);border-color:var(--brass,#B8963E);color:#0B1D33;font-weight:600}',
    '.pj-chip:focus-visible,.pj-in:focus-visible,.pj-row input:focus-visible{outline:2px solid var(--brass-light,#D9BE72);outline-offset:3px}',
    '.pj-res{background:var(--navy,#0B1D33);color:#F2EEE4;border-radius:3px;padding:26px 24px}',
    '.pj-big{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:clamp(2.4rem,8vw,3.4rem);line-height:1;color:var(--brass-light,#D9BE72)}',
    '.pj-bigl{margin-top:8px;font-size:.95rem;color:rgba(242,238,228,.82)}',
    '.pj-list{margin-top:20px;border-top:1px solid rgba(242,238,228,.16)}',
    '.pj-li{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid rgba(242,238,228,.12);font-size:.93rem}',
    '.pj-li span:first-child{color:rgba(242,238,228,.78)}',
    '.pj-li span:last-child{font-weight:600;text-align:right;font-variant-numeric:tabular-nums}',
    '.pj-verdict{margin-top:18px;padding:14px 16px;border-left:3px solid var(--brass,#B8963E);background:rgba(242,238,228,.07);font-size:.93rem;line-height:1.5}',
    '.pj-be{margin-top:14px;font-size:.88rem;color:rgba(242,238,228,.78);line-height:1.55}',
    '.pj-be b{color:#F2EEE4}',
    '.pj-fine{margin-top:22px;color:var(--muted,#5C6B7A);font-size:.82rem;line-height:1.55;max-width:80ch}',
    '.pj-cta{margin-top:20px;display:inline-flex}'
  ].join('\n');

  function brl(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }); }
  function pc(v, d) { return v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }) + '%'; }
  function monthsUntil(ym) {
    var p = ym.split('-'), n = new Date();
    return Math.max(1, (parseInt(p[0], 10) - n.getFullYear()) * 12 + (parseInt(p[1], 10) - (n.getMonth() + 1)));
  }
  function schedule(f, T) {
    var a = new Array(T + 1).fill(0), m, k;
    a[0] += f.entrada;
    for (m = 1; m <= Math.min(f.mensal.n, T); m++) a[m] += f.mensal.pct / f.mensal.n;
    for (k = 1; k <= f.reforco.n; k++) { m = k * 12; if (m <= T) a[m] += f.reforco.pct / f.reforco.n; }
    a[T] += (f.chaves || 0);
    return a;
  }
  // Base 100 = valor do imóvel. g, i, rf em fração ao ano.
  function model(f, T, g, i, rf) {
    var pays = schedule(f, T), m, basePaid = 0, paid = 0, fv = 0;
    for (m = 0; m <= T; m++) {
      var nom = pays[m] * Math.pow(1 + i, m / 12);
      basePaid += pays[m]; paid += nom;
      fv += nom * Math.pow(1 + rf, (T - m) / 12);
    }
    var rem = (100 - basePaid) * Math.pow(1 + i, T / 12);
    var V = 100 * Math.pow(1 + g, T / 12);
    var eq = V - rem, profit = eq - paid, irr = null;
    if (eq > 0 && paid > 0) {
      var cf = [], lo = -0.05, hi = 0.6, it, mid, s;
      for (m = 0; m <= T; m++) cf.push(-pays[m] * Math.pow(1 + i, m / 12));
      cf[T] += eq;
      for (it = 0; it < 120; it++) {
        mid = (lo + hi) / 2; s = 0;
        for (m = 0; m <= T; m++) s += cf[m] / Math.pow(1 + mid, m);
        if (s > 0) lo = mid; else hi = mid;
      }
      irr = Math.pow(1 + lo, 12) - 1;
    }
    return { basePaid: basePaid, paid: paid, V: V, rem: rem, eq: eq, profit: profit, roi: profit / paid, irr: irr, fv: fv };
  }
  function solveG(f, T, i, rf, mode) {
    var lo = -0.3, hi = 0.6, it, mid, r;
    for (it = 0; it < 80; it++) {
      mid = (lo + hi) / 2; r = model(f, T, mid, i, rf);
      var d = mode === 'rf' ? r.eq - r.fv : r.profit;
      if (d > 0) hi = mid; else lo = mid;
    }
    return (lo + hi) / 2;
  }

  function mount(sel, cfg) {
    var root = document.querySelector(sel);
    if (!root) return;
    if (!document.getElementById('pj-css')) {
      var st = document.createElement('style'); st.id = 'pj-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    var T = monthsUntil(cfg.entrega);
    var d = cfg.padrao || { g: 8, incc: 6.75, rf: 12 };
    var ix = cfg.indice || 'INCC';
    var state = { fluxo: 0, g: d.g, incc: d.incc, rf: d.rf, valor: cfg.fluxos[0].valor || 100000, edited: false };
    var h = '';
    h += '<div class="wrap"><div class="head"><h2>E se o imóvel valorizar?</h2>';
    h += '<p>Pagar parcelado enquanto o imóvel inteiro valoriza é o que chamamos de alavancagem. Ajuste as hipóteses e veja o efeito no seu caso.</p></div>';
    h += '<div class="pj-grid"><div class="pj-ctl">';
    h += '<div class="pj-f"><label for="pj-valor">Valor do imóvel (R$)</label><input class="pj-in" id="pj-valor" inputmode="numeric" value="' + state.valor.toLocaleString('pt-BR') + '" autocomplete="off"><small id="pj-vnota"></small></div>';
    if (cfg.fluxos.length > 1) {
      h += '<div class="pj-f"><span class="pj-lbl" id="pj-fl">Fluxo de pagamento</span><div class="pj-chips" role="group" aria-labelledby="pj-fl">';
      cfg.fluxos.forEach(function (f, k) { h += '<button type="button" class="pj-chip" data-fl="' + k + '" aria-pressed="' + (k === 0) + '">' + f.label + '</button>'; });
      h += '</div><small id="pj-flnota"></small></div>';
    }
    h += '<div class="pj-f"><label for="pj-g">Valorização do imóvel ao ano</label><div class="pj-row"><input type="range" id="pj-g" min="0" max="15" step="0.5" value="' + state.g + '"><output id="pj-go" for="pj-g"></output></div>';
    h += '<div class="pj-chips" role="group" aria-label="Cenários de valorização"><button type="button" class="pj-chip" data-g="5">5% mais cauteloso</button><button type="button" class="pj-chip" data-g="8">8% intermediário</button><button type="button" class="pj-chip" data-g="12">12% mais aquecido</button></div>';
    h += '<small>Referência: o FipeZAP mostrou para Itajaí cerca de 5,4% em 12 meses (maio/2026) e 12,2% em 12 meses (julho/2024). Valorização passada não garante a futura.</small></div>';
    h += '<div class="pj-f"><label for="pj-i">Correção do saldo (' + ix + ') ao ano</label><div class="pj-row"><input type="range" id="pj-i" min="0" max="12" step="0.25" value="' + state.incc + '"><output id="pj-io" for="pj-i"></output></div><small>' + (cfg.indiceNota || 'INCC-M em 12 meses até outubro/2026: 6,75% (FGV).') + '</small></div>';
    h += '<div class="pj-f"><label for="pj-r">Renda fixa alternativa ao ano (líquida)</label><div class="pj-row"><input type="range" id="pj-r" min="0" max="20" step="0.5" value="' + state.rf + '"><output id="pj-ro" for="pj-r"></output></div><small>Selic em 13,75% ao ano (Copom, novembro/2026). Cerca de 12% é uma referência líquida de imposto.</small></div>';
    h += '</div><div><div class="pj-res" aria-live="polite" id="pj-out"></div>';
    h += '<a class="btn btn-gold pj-cta" href="' + cfg.wa + '">Quero essa simulação com a minha situação</a></div></div>';
    h += '<p class="pj-fine" id="pj-fine"></p></div>';
    root.className = (root.className ? root.className + ' ' : '') + 'pj';
    root.innerHTML = h;

    function $(id) { return document.getElementById(id); }
    function render() {
      var f = cfg.fluxos[state.fluxo];
      var g = state.g / 100, i = state.incc / 100, rf = state.rf / 100;
      var r = model(f, T, g, i, rf);
      var s = state.valor / 100;
      var gbe = solveG(f, T, i, rf, 'corr'), grf = solveG(f, T, i, rf, 'rf');
      $('pj-go').textContent = pc(state.g, 1); $('pj-io').textContent = pc(state.incc, 2); $('pj-ro').textContent = pc(state.rf, 1);
      Array.prototype.forEach.call(root.querySelectorAll('[data-g]'), function (b) { b.setAttribute('aria-pressed', String(parseFloat(b.getAttribute('data-g')) === state.g)); });
      Array.prototype.forEach.call(root.querySelectorAll('[data-fl]'), function (b) { b.setAttribute('aria-pressed', String(parseInt(b.getAttribute('data-fl'), 10) === state.fluxo)); });
      if ($('pj-flnota')) $('pj-flnota').textContent = f.nota || '';
      $('pj-vnota').textContent = (f.valorNota ? f.valorNota + ' ' : '') + 'Troque pelo valor da unidade que você está avaliando.';
      var o = '';
      o += '<div class="pj-big">' + (r.profit >= 0 ? '+' : '') + pc(r.roi * 100, 0) + '</div>';
      o += '<div class="pj-bigl">sobre o que você paga até a entrega' + (r.irr !== null ? ', cerca de ' + pc(r.irr * 100, 1) + ' ao ano' : '') + '</div>';
      o += '<div class="pj-list">';
      o += '<div class="pj-li"><span>O imóvel inteiro valoriza</span><span>' + pc((r.V / 100 - 1) * 100, 0) + '</span></div>';
      o += '<div class="pj-li"><span>Você paga até a entrega (com ' + ix + ')</span><span>' + brl(r.paid * s) + ' · ' + pc(r.basePaid, 0) + ' do valor</span></div>';
      o += '<div class="pj-li"><span>Valor estimado na entrega</span><span>' + brl(r.V * s) + '</span></div>';
      o += '<div class="pj-li"><span>Saldo restante na entrega</span><span>' + brl(r.rem * s) + '</span></div>';
      o += '<div class="pj-li"><span>Ganho estimado</span><span>' + brl(r.profit * s) + '</span></div>';
      o += '<div class="pj-li"><span>Mesmos pagamentos em renda fixa</span><span>' + brl((r.fv - r.paid) * s) + '</span></div>';
      o += '</div>';
      var v;
      if (r.irr === null) v = 'Neste cenário o patrimônio na entrega não cobre o saldo restante.';
      else {
        var dif = (r.irr - rf) * 100;
        v = Math.abs(dif) < 0.05 ? 'Neste cenário, o imóvel empata com a renda fixa.' : (dif > 0 ? 'Neste cenário, o imóvel supera a renda fixa em ' + pc(dif, 1) + ' ao ano.' : 'Neste cenário, a renda fixa leva vantagem de ' + pc(-dif, 1) + ' ao ano.');
      }
      o += '<div class="pj-verdict">' + v + '</div>';
      o += '<div class="pj-be">Para empatar com a correção do saldo, o imóvel precisa valorizar cerca de <b>' + pc(gbe * 100, 1) + ' ao ano</b>. Para igualar a renda fixa, cerca de <b>' + pc(grf * 100, 1) + ' ao ano</b>.</div>';
      $('pj-out').innerHTML = o;
      $('pj-fine').textContent = 'Simulação ilustrativa, com hipóteses ajustáveis por você. Não é promessa, garantia nem recomendação de investimento, e a valorização real pode ser menor, igual ou maior. Entrega prevista em ' + cfg.entregaTxt + ' (cerca de ' + T + ' meses a partir de hoje). Reforços considerados anuais. Não estão considerados: saldo após as chaves, ITBI, comissão de venda, imposto sobre ganho de capital, condomínio e renda de aluguel. Valores e condições seguem a tabela vigente da incorporadora' + (cfg.tabelaRef ? ' (referência: ' + cfg.tabelaRef + ')' : '') + '.';
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b) return;
      if (b.hasAttribute('data-g')) { state.g = parseFloat(b.getAttribute('data-g')); $('pj-g').value = state.g; render(); }
      if (b.hasAttribute('data-fl')) {
        state.fluxo = parseInt(b.getAttribute('data-fl'), 10);
        if (!state.edited && cfg.fluxos[state.fluxo].valor) { state.valor = cfg.fluxos[state.fluxo].valor; $('pj-valor').value = state.valor.toLocaleString('pt-BR'); }
        render();
      }
    });
    $('pj-g').addEventListener('input', function (e) { state.g = parseFloat(e.target.value); render(); });
    $('pj-i').addEventListener('input', function (e) { state.incc = parseFloat(e.target.value); render(); });
    $('pj-r').addEventListener('input', function (e) { state.rf = parseFloat(e.target.value); render(); });
    $('pj-valor').addEventListener('input', function (e) {
      var n = parseInt(String(e.target.value).replace(/\D/g, ''), 10);
      state.edited = true;
      state.valor = isNaN(n) || n <= 0 ? (cfg.fluxos[state.fluxo].valor || 100000) : n;
      render();
    });
    $('pj-valor').addEventListener('blur', function (e) { e.target.value = state.valor.toLocaleString('pt-BR'); });
    render();
  }
  window.Projecao = { mount: mount };
})();
