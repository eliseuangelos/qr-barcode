# QR Code & Barcode Generator | Executive Digital

Aplicação 100% estática. JavaScript, CSS e fontes estão neste pack: nada é carregado de sites de terceiros e nenhum dado digitado sai do navegador.

## Publicar no GitHub Pages
1. Envie o conteúdo desta pasta para o repositório (raiz ou subpasta).
2. Em Settings > Pages, escolha "Deploy from a branch" e a branch com os arquivos.

Todos os caminhos são relativos: funciona em `usuario.github.io/` e em `usuario.github.io/repositorio/`. Não há etapa de build.

## Uso local
Abra `index.html` no navegador, ou rode `python3 -m http.server` nesta pasta e acesse http://localhost:8000.

## Ativos da marca (adicionar)
Copie para `assets/icons/`: `brand-symbol.svg`, `favicon.svg` e `apple-touch-icon.png`. Eles não vieram no pack. Sem eles, o cabeçalho fica sem o símbolo e o navegador não mostra o favicon.

## Estrutura
- `index.html`, `css/app.css`, `js/app.js`: interface.
- `js/qr-render.js`: SVG do QR Code (estilos, margem, logomarca central).
- `js/barcode.js`: CODE 128, CODE 39, EAN-13, EAN-8, UPC-A e ITF-14.
- `js/vendor/qrcode.js`: codificador de QR Code (Kazuhiko Arase, MIT).
- `fonts/`: Inter (subconjunto latino, WOFF). `LICENSES/`: licenças de terceiros.

## Recursos
- QR Code: URL, texto, Wi-Fi, e-mail, telefone, SMS, WhatsApp e vCard; cores, 3 estilos, margem, tamanho e logomarca central (correção H, área de proteção, limite de tamanho).
- Códigos de barras: validação de comprimento e dígito verificador, sem completar dígitos sozinho.
- Exportação em SVG, PNG e JPEG, tudo gerado no navegador.

## Limites conhecidos
- A verificação automática de leitura do QR usa o `BarcodeDetector` do navegador (Chrome, Edge, Android). Nos demais, a página avisa que a verificação não está disponível: teste com um leitor antes de imprimir.
- IBM Plex Mono não está incluída (usa a fonte monoespaçada do sistema).
- QR em modo de 8 bits, sem otimização numérica ou alfanumérica: alguns códigos ficam um pouco maiores.
- CODE 128 usa o conjunto B (ASCII imprimível) ou C (números de comprimento par). ITF-14 sai sem barras de contorno.

## Verificação realizada
- Chromium headless: formulários, validações, exportação SVG/PNG/JPEG, logomarca, fundo transparente e nenhuma requisição externa.
- QR: PNG e JPEG exportados decodificados com OpenCV (URL, texto com acentos e €, Wi-Fi, WhatsApp, vCard, estilos, logomarca com correção H).
- Códigos de barras: tabelas e codificações idênticas às do ReportLab; PNG exportado conferido barra a barra.
- Não testado: Firefox e Safari, leitura com celular ou leitor físico.

## Licenças de terceiros
- `js/vendor/qrcode.js`: QRCode for JavaScript, MIT (`LICENSES/QRCode-MIT.txt`). "QR Code" é marca registrada da DENSO WAVE INCORPORATED.
- `fonts/`: Inter, SIL Open Font License 1.1 (`LICENSES/Inter-OFL.txt`).
