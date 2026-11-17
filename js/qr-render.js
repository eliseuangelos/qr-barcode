/*! QR Code: matriz (js/vendor/qrcode.js) + SVG com estilos e logomarca. Executive Digital. */
(function (root) {
  'use strict';
  var Core = root.QRCodeCore;

  function f(v) { return +v.toFixed(2); }

  // O codificador grava charCode & 0xFF: enviamos os bytes UTF-8 como caracteres.
  function utf8(s) {
    var u = new TextEncoder().encode(s), r = '', i;
    for (i = 0; i < u.length; i++) r += String.fromCharCode(u[i]);
    return r;
  }

  function matrix(text, level) {
    var q = new Core.QRCode(-1, Core.QRErrorCorrectLevel[level || 'M']), n, m = [], r, c;
    q.addData(utf8(text));
    q.make();
    n = q.getModuleCount();
    for (r = 0; r < n; r++) {
      m[r] = [];
      for (c = 0; c < n; c++) m[r][c] = !!q.isDark(r, c);
    }
    return m;
  }

  // Retângulo (com cantos arredondados quando r > 0) como trajeto SVG.
  function rr(x, y, w, h, r) {
    function a(px, py) { return r ? 'A' + f(r) + ' ' + f(r) + ' 0 0 1 ' + f(px) + ' ' + f(py) : ''; }
    return 'M' + f(x + r) + ' ' + f(y) + 'H' + f(x + w - r) + a(x + w, y + r) +
      'V' + f(y + h - r) + a(x + w - r, y + h) + 'H' + f(x + r) + a(x, y + h - r) +
      'V' + f(y + r) + a(x + r, y) + 'Z';
  }

  /* o: { size, margin, fg, bg ('' = transparente), style: square|dots|rounded,
          logo: { url (data URI), r (largura/altura), pct (% da largura) } } */
  function svg(m, o) {
    var n = m.length, S = o.size, st = o.style || 'square',
        u = Math.max(1, Math.floor((S - 2 * o.margin) / n)), off = Math.floor((S - n * u) / 2),
        d = '', fin = '', pl = null, i, j, k, r, x, y;

    if (o.logo) {
      var L = S * o.logo.pct / 100,
          W = o.logo.r >= 1 ? L : L * o.logo.r,
          H = o.logo.r >= 1 ? L / o.logo.r : L;
      pl = { x: (S - W) / 2, y: (S - H) / 2, w: W, h: H, p: L * 0.14 };
    }

    // Ignora os marcadores de canto (desenhados à parte) e os módulos sob a logomarca.
    function skip(a, b) {
      if ((a < 7 && (b < 7 || b >= n - 7)) || (a >= n - 7 && b < 7)) return true;
      if (!pl) return false;
      var sx = off + b * u, sy = off + a * u;
      return sx < pl.x + pl.w + pl.p && sx + u > pl.x - pl.p && sy < pl.y + pl.h + pl.p && sy + u > pl.y - pl.p;
    }

    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        if (!m[i][j] || skip(i, j)) continue;
        x = off + j * u; y = off + i * u;
        if (st === 'dots') {
          r = u * 0.46;
          d += 'M' + f(x + u / 2 - r) + ' ' + f(y + u / 2) + 'a' + f(r) + ' ' + f(r) + ' 0 1 0 ' + f(2 * r) + ' 0a' +
            f(r) + ' ' + f(r) + ' 0 1 0 ' + f(-2 * r) + ' 0Z';
        } else if (st === 'rounded') {
          d += rr(x, y, u, u, u * 0.3);
        } else { // quadrados: junta módulos consecutivos da mesma linha
          k = j;
          while (k + 1 < n && m[i][k + 1] && !skip(i, k + 1)) k++;
          d += rr(x, y, (k - j + 1) * u, u, 0);
          j = k;
        }
      }
    }

    [[0, 0], [0, n - 7], [n - 7, 0]].forEach(function (c) {
      // só o estilo "arredondado" arredonda os marcadores; "pontos" os mantém quadrados (melhor leitura)
      var fx = off + c[1] * u, fy = off + c[0] * u, sq = st !== 'rounded',
          a = sq ? 0 : u * 2, b = sq ? 0 : u, e = sq ? 0 : u * 0.8;
      fin += rr(fx, fy, 7 * u, 7 * u, a) + rr(fx + u, fy + u, 5 * u, 5 * u, b) + rr(fx + 2 * u, fy + 2 * u, 3 * u, 3 * u, e);
    });

    var sr = st === 'square' ? ' shape-rendering="crispEdges"' : '',
        out = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + S +
          '" height="' + S + '" viewBox="0 0 ' + S + ' ' + S + '">';
    if (o.bg) out += '<rect width="' + S + '" height="' + S + '" fill="' + o.bg + '"/>';
    out += '<path fill="' + o.fg + '"' + sr + ' d="' + d + '"/>' +
      '<path fill="' + o.fg + '" fill-rule="evenodd"' + sr + ' d="' + fin + '"/>';
    if (pl) {
      out += '<rect x="' + f(pl.x - pl.p) + '" y="' + f(pl.y - pl.p) + '" width="' + f(pl.w + 2 * pl.p) +
        '" height="' + f(pl.h + 2 * pl.p) + '" rx="' + f(pl.p) + '" fill="' + (o.bg || '#ffffff') + '"/>' +
        '<image x="' + f(pl.x) + '" y="' + f(pl.y) + '" width="' + f(pl.w) + '" height="' + f(pl.h) +
        '" xlink:href="' + o.logo.url + '"/>';
    }
    return out + '</svg>';
  }

  root.QRRender = { matrix: matrix, svg: svg };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.QRRender;
})(typeof window !== 'undefined' ? window : globalThis);
