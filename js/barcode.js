/*! Códigos de barras lineares (SVG): CODE 128, CODE 39, EAN-13, EAN-8, UPC-A e ITF-14. Executive Digital. */
(function (root) {
  'use strict';

  function rep(c, n) { return new Array(n + 1).join(c); }
  function inv(s) { return s.replace(/[01]/g, function (c) { return c === '1' ? '0' : '1'; }); }
  function rev(s) { return s.split('').reverse().join(''); }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // Larguras alternadas (barra, espaço, barra...) -> sequência de módulos 1/0.
  function runs(w) {
    var s = '', b = 1, i;
    for (i = 0; i < w.length; i++) { s += rep(b ? '1' : '0', +w.charAt(i)); b ^= 1; }
    return s;
  }

  /* EAN-13, EAN-8 e UPC-A (UPC-A = EAN-13 com zero à esquerda). */
  var L7 = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
  var PAR = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
  function ean(d) {
    var n = d.length, a = n === 13 ? d.slice(1, 7) : d.slice(0, 4), b = n === 13 ? d.slice(7) : d.slice(4),
        p = n === 13 ? PAR[+d.charAt(0)] : 'LLLL', s = '101', i, l;
    for (i = 0; i < a.length; i++) { l = L7[+a.charAt(i)]; s += p.charAt(i) === 'L' ? l : rev(inv(l)); }
    s += '01010';
    for (i = 0; i < b.length; i++) s += inv(L7[+b.charAt(i)]);
    return s + '101';
  }

  /* CODE 128: conjunto C para números de comprimento par; conjunto B para ASCII imprimível. */
  var C128 = ('212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 221312 231212 112232 122132 ' +
    '122231 113222 123122 123221 223211 221132 221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 ' +
    '212123 212321 232121 111323 131123 131321 112313 132113 132311 211313 231113 231311 112133 112331 132131 113123 ' +
    '113321 133121 313121 211331 231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 314111 221411 ' +
    '431111 111224 111422 121124 121421 141122 141221 112214 112412 122114 122411 142112 142211 241211 221114 413111 ' +
    '241112 134111 111242 121142 121241 114212 124112 124211 411212 421112 421211 212141 214121 412121 111143 111341 ' +
    '131141 114113 114311 411113 411311 113141 114131 311141 411131 211412 211214 211232 2331112').split(' ');
  function code128(v) {
    var c = /^\d+$/.test(v) && v.length % 2 === 0, o = [c ? 105 : 104], i, s;
    if (c) {
      for (i = 0; i < v.length; i += 2) o.push(+v.substr(i, 2));
    } else {
      for (i = 0; i < v.length; i++) {
        s = v.charCodeAt(i) - 32;
        if (s < 0 || s > 94) throw new Error('CODE 128: caractere fora do ASCII imprimível');
        o.push(s);
      }
    }
    s = o[0];
    for (i = 1; i < o.length; i++) s += i * o[i];
    o.push(s % 103, 106);
    return o.map(function (k) { return runs(C128[k]); }).join('');
  }

  /* CODE 39: cada caractere tem 3 elementos largos entre 9 (barra, espaço, ...). */
  var B5 = [[1, 9], [3, 9], [1, 3], [5, 9], [1, 5], [3, 5], [7, 9], [1, 7], [3, 7], [5, 7]], C39 = {};
  function pat(w) {
    var s = '', k;
    for (k = 1; k <= 9; k++) s += w.indexOf(k) < 0 ? 1 : 3;
    return s;
  }
  [['1234567890', 4], ['ABCDEFGHIJ', 6], ['KLMNOPQRST', 8], ['UVWXYZ-. *', 2]].forEach(function (g) {
    for (var i = 0; i < 10; i++) C39[g[0].charAt(i)] = pat(B5[i].concat(g[1]));
  });
  C39['$'] = pat([2, 4, 6]); C39['/'] = pat([2, 4, 8]); C39['+'] = pat([2, 6, 8]); C39['%'] = pat([4, 6, 8]);
  function code39(v) {
    return ('*' + v + '*').split('').map(function (c) {
      if (!C39[c]) throw new Error('CODE 39: caractere inválido');
      return runs(C39[c]);
    }).join('0');
  }

  /* ITF-14: dígitos intercalados (barras = 1º dígito do par, espaços = 2º), 2 elementos largos de 5. */
  var W5 = [[3, 4], [1, 5], [2, 5], [1, 2], [3, 5], [1, 3], [2, 3], [4, 5], [1, 4], [2, 4]].map(function (w) {
    return [1, 2, 3, 4, 5].map(function (k) { return w.indexOf(k) < 0 ? 1 : 3; });
  });
  function itf(v) {
    var s = '1010', i, j;
    for (i = 0; i < v.length; i += 2) {
      for (j = 0; j < 5; j++) s += rep('1', W5[+v.charAt(i)][j]) + rep('0', W5[+v.charAt(i + 1)][j]);
    }
    return s + '11101';
  }

  function enc(f, v) {
    if (f === 'EAN13' || f === 'EAN8') return ean(v);
    if (f === 'UPC') return ean('0' + v);
    if (f === 'ITF14') return itf(v);
    if (f === 'CODE39') return code39(v);
    return code128(v);
  }

  /* o: { bw (px por módulo), h (altura), mg (margem), text, fs, align, fg, bg, k (escala) } */
  function build(f, v, o) {
    var bits = enc(f, v), n = bits.length, ean13 = f === 'EAN13' || f === 'EAN8' || f === 'UPC', k = o.k || 1,
        bw = o.bw, mx = Math.max(o.mg, (ean13 ? 11 : 10) * bw), my = o.mg, fs = o.fs, gap = 3,
        tx = o.text ? gap + fs + 2 : 0, ext = ean13 && o.text ? gap + Math.round(fs / 2) : 0,
        W = Math.round(n * bw + 2 * mx), H = Math.round(2 * my + o.h + tx), mid = (n - 5) / 2,
        d = '', tag = '', parts = null, ty = my + o.h + gap + Math.round(fs * 0.85), i = 0, j, g;

    while (i < n) {
      if (bits.charAt(i) === '1') {
        j = i;
        while (j < n && bits.charAt(j) === '1') j++;
        g = ean13 && (i < 3 || i >= n - 3 || (i >= mid && i < mid + 5));
        d += 'M' + (mx + i * bw) + ' ' + my + 'h' + (j - i) * bw + 'v' + (o.h + (g ? ext : 0)) + 'h-' + (j - i) * bw + 'z';
        i = j;
      } else i++;
    }

    function t(x, a, s) { return '<text x="' + x + '" y="' + ty + '" text-anchor="' + a + '">' + esc(s) + '</text>'; }
    if (o.text) {
      if (f === 'EAN13') parts = [[v.charAt(0), -5], [v.slice(1, 7), 24], [v.slice(7), 71]];
      else if (f === 'EAN8') parts = [[v.slice(0, 4), 17], [v.slice(4), 50]];
      else if (f === 'UPC') parts = [[v.charAt(0), -5], [v.slice(1, 6), 27.5], [v.slice(6, 11), 67.5], [v.charAt(11), n + 5]];
      if (parts) parts.forEach(function (p) { tag += t(mx + p[1] * bw, 'middle', p[0]); });
      else tag = o.align === 'left' ? t(mx, 'start', v) : o.align === 'right' ? t(W - mx, 'end', v) : t(W / 2, 'middle', v);
    }

    return {
      w: W, h: H,
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="' + W * k + '" height="' + H * k + '" viewBox="0 0 ' + W + ' ' + H +
        '"><rect width="' + W + '" height="' + H + '" fill="' + o.bg + '"/><path fill="' + o.fg +
        '" shape-rendering="crispEdges" d="' + d + '"/>' +
        (tag ? '<g font-family="monospace" font-size="' + fs + '" fill="' + o.fg + '">' + tag + '</g>' : '') + '</svg>'
    };
  }

  root.Barcode = { build: build, encode: enc, C128: C128, C39: C39 };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.Barcode;
})(typeof window !== 'undefined' ? window : globalThis);
