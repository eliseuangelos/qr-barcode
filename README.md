# QR Code & Barcode Generator — Executive Digital

<p align="center">
  <a href="https://eliseuangelos.github.io/qr-barcode/" target="_blank">
    <img src="https://img.shields.io/badge/ACESSAR_A_FERRAMENTA-00D9FF?style=for-the-badge&logo=qrcode&logoColor=050505" alt="Acessar o QR Code & Barcode Generator">
  </a>
  <a href="https://eliseuangelos.github.io/" target="_blank">
    <img src="https://img.shields.io/badge/SITE_PESSOAL-111827?style=for-the-badge&logo=googlechrome&logoColor=00D9FF" alt="Site Pessoal">
  </a>
  <a href="https://github.com/eliseuangelos" target="_blank">
    <img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://linkedin.com/in/eliseu-fernandes-laurindo" target="_blank">
    <img src="https://img.shields.io/badge/LINKEDIN-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>

<p align="center"><strong>Crie QR Codes e códigos de barras personalizados, com pré-visualização e exportação diretamente no navegador.</strong></p>

---

## Sobre o projeto

O **QR Code & Barcode Generator — Executive Digital** é uma aplicação web para criar QR Codes e códigos de barras lineares de forma prática, com opções de conteúdo, aparência e formato de exportação.

A ferramenta reúne dois módulos: um gerador de QR Code, com suporte a diferentes tipos de informação e inclusão opcional de uma logomarca central, e um gerador de códigos de barras com validação de formato e dígito verificador. O resultado é exibido em uma pré-visualização e pode ser baixado como SVG, PNG ou JPEG.

A aplicação é inteiramente estática e executa o processamento no próprio navegador. Não exige cadastro, instalação, backend ou etapa de compilação.

**Acesse:** [eliseuangelos.github.io/qr-barcode](https://eliseuangelos.github.io/qr-barcode/)

## Objetivos do site

- Disponibilizar uma ferramenta simples para gerar QR Codes e códigos de barras.
- Permitir a criação de códigos para links, textos, redes Wi-Fi, contatos e outros tipos de informação.
- Oferecer personalização visual para adaptar os códigos a diferentes materiais e identidades.
- Validar os dados informados antes de gerar códigos de barras que exigem tamanho e dígito verificador específicos.
- Permitir a exportação dos resultados em formatos vetoriais e rasterizados.
- Manter o processamento no navegador, sem enviar os dados informados para um servidor.

## Funcionalidades

### Gerador de QR Code

- Geração de QR Codes para diferentes tipos de conteúdo:
  - **URL / Link:** endereço de sites e páginas.
  - **Texto:** mensagens e textos livres.
  - **Wi-Fi:** nome da rede, senha, tipo de segurança e opção de rede oculta.
  - **E-mail:** endereço de destino, assunto e mensagem.
  - **Telefone:** número com código do país.
  - **SMS:** número de destino e mensagem.
  - **WhatsApp:** número e mensagem opcional.
  - **Contato (vCard):** nome, sobrenome, telefone, e-mail, empresa, cargo, endereço e site.
- Atualização da pré-visualização conforme as configurações são alteradas.
- Escolha das cores dos módulos e do fundo.
- Paletas predefinidas: Padrão, Executivo, Tecnológico e Digital.
- Três estilos visuais: Quadrado, Pontos e Arredondado.
- Ajuste da margem (área de respiro) entre 0% e 20%.
- Opção de fundo transparente para exportações SVG e PNG.
- Inclusão opcional de logomarca central nos formatos PNG, JPEG, WebP ou SVG, com limite de 2 MB.
- Ajuste do tamanho da logomarca entre 10% e 30%.
- Uso de correção de erros de nível H quando há logomarca e nível M quando não há.
- Avisos sobre contraste, possível inversão de cores, logomarca grande ou leitura automática não confirmada.

### Gerador de códigos de barras

A ferramenta permite gerar os seguintes formatos:

- **CODE 128**
- **CODE 39**
- **EAN-13**
- **EAN-8**
- **UPC-A**
- **ITF-14**

Recursos disponíveis:

- Validação do conteúdo de acordo com o formato selecionado.
- Verificação do comprimento exigido pelos formatos EAN-13, EAN-8, UPC-A e ITF-14.
- Cálculo e conferência do dígito verificador.
- Sugestão de correção quando o dígito verificador estiver ausente ou incorreto, permitindo aplicar o valor calculado.
- Personalização da cor das barras e do fundo.
- Ajuste da largura das barras, altura e margem.
- Opção para exibir ou ocultar o texto abaixo do código.
- Ajuste do tamanho e do alinhamento do texto: esquerda, centro ou direita.

### Pré-visualização e exportação

- Pré-visualização do código antes de baixar o arquivo.
- Definição do nome do arquivo.
- Exportação em **SVG**, **PNG** e **JPEG**.
- Definição da dimensão de exportação do QR Code, entre 128 e 4096 pixels.
- Seleção da escala de rasterização dos códigos de barras em PNG e JPEG: 2×, 4× ou 8×.
- Cópia do conteúdo codificado para a área de transferência.
- Limpeza dos campos para iniciar uma nova criação.

## Como utilizar

1. Acesse o [QR Code & Barcode Generator](https://eliseuangelos.github.io/qr-barcode/).
2. Escolha a aba **QR Code** ou **Código de barras**.
3. Selecione o tipo de conteúdo ou o formato desejado.
4. Preencha os campos solicitados e ajuste a aparência do código.
5. Confira o resultado na área de pré-visualização.
6. Defina o nome e as opções de exportação.
7. Clique em **Baixar SVG**, **Baixar PNG** ou **Baixar JPEG**. Também é possível copiar o conteúdo codificado.

No gerador de QR Code, a logomarca é opcional. Quando utilizada, prefira uma imagem simples e confira a leitura do resultado antes de imprimir ou distribuir.

## Validações e recomendações de leitura

A aplicação verifica os dados de acordo com as regras implementadas para cada formato:

- **CODE 128:** aceita caracteres ASCII imprimíveis. Entradas numéricas com quantidade par de dígitos utilizam o conjunto C; nos demais casos, é utilizado o conjunto B.
- **CODE 39:** aceita letras de A a Z, números e os caracteres `- . espaço $ / + %`. Letras minúsculas são convertidas para maiúsculas.
- **EAN-13:** exige 13 dígitos.
- **EAN-8:** exige 8 dígitos.
- **UPC-A:** exige 12 dígitos.
- **ITF-14:** exige 14 dígitos.

Nos formatos numéricos com dígito verificador, a ferramenta calcula o dígito esperado e informa quando ele estiver ausente ou inválido. A pessoa pode optar por aplicar a correção sugerida.

Para QR Codes, a aplicação verifica aspectos que podem prejudicar a leitura, como contraste insuficiente e logomarca excessivamente grande. Quando o navegador oferece a API `BarcodeDetector` com suporte à detecção de QR Code, também é realizada uma tentativa de leitura automática do código gerado. Caso o recurso não esteja disponível, a ferramenta informa que a verificação automática não pôde ser feita.

**Importante:** a pré-visualização ou a verificação automática não substitui um teste com um leitor independente, especialmente antes de imprimir grandes quantidades ou utilizar o código em materiais definitivos. Mantenha contraste adequado, espaço livre ao redor do QR Code e dimensões compatíveis com a distância de leitura.

## Tecnologias utilizadas

| Tecnologia ou recurso | Aplicação |
|---|---|
| HTML5 | Estrutura da interface, formulários e áreas de pré-visualização. |
| CSS3 | Apresentação visual, organização dos módulos e adaptação da interface. |
| JavaScript (Vanilla) | Regras de geração, validações, interação e exportação. |
| SVG | Construção vetorial dos QR Codes e códigos de barras. |
| Canvas API | Conversão dos SVGs em imagens PNG e JPEG. |
| Clipboard API | Cópia do conteúdo codificado para a área de transferência. |
| BarcodeDetector API | Verificação automática opcional da leitura do QR Code, conforme o suporte do navegador. |
| QRCode for JavaScript | Codificação da matriz do QR Code. |
| GitHub Pages | Hospedagem estática da aplicação. |

O projeto utiliza arquivos locais de JavaScript, CSS e fontes. Não há etapa de build nem dependência de serviços externos para gerar os códigos.

## Estrutura do projeto

```text
qr-barcode/
├── index.html                  # Estrutura da aplicação e formulários
├── README.md                   # Documentação do projeto
├── css/
│   └── app.css                 # Estilos e apresentação da interface
├── js/
│   ├── app.js                  # Interface, validações e fluxo de geração/exportação
│   ├── qr-render.js            # Construção do QR Code em SVG e aplicação de estilos/logomarca
│   ├── barcode.js              # Codificação e desenho dos códigos de barras
│   └── vendor/
│       └── qrcode.js           # Biblioteca de codificação do QR Code
├── fonts/                      # Arquivos locais da fonte Inter
├── assets/
│   └── icons/                  # Diretório de ícones e ativos visuais
└── LICENSES/                   # Licenças dos componentes de terceiros
```

## Privacidade e armazenamento

A aplicação funciona localmente no navegador. Os dados digitados, as informações utilizadas para montar os códigos e a imagem escolhida como logomarca são processados no próprio dispositivo. O projeto não utiliza backend e não envia esses conteúdos para um servidor.

Os arquivos SVG, PNG e JPEG são gerados no navegador e disponibilizados para download. A ferramenta não exige criação de conta nem armazenamento de histórico em uma base remota.

## Limitações conhecidas

- A verificação automática de leitura do QR Code depende da disponibilidade da API `BarcodeDetector` e do suporte do navegador. Quando não houver suporte, o código ainda poderá ser gerado e exportado, mas deverá ser testado com outro leitor.
- A codificação do QR Code utiliza o modo de 8 bits com conteúdo convertido para UTF-8. Não há otimização específica para os modos numérico e alfanumérico; por isso, alguns códigos podem ocupar mais módulos do que em implementações com otimização por modo.
- O CODE 128 utiliza o conjunto B para caracteres ASCII imprimíveis ou o conjunto C para conteúdo exclusivamente numérico com quantidade par de dígitos.
- O CODE 39 aceita somente o conjunto de caracteres indicado na seção de validações.
- O ITF-14 é gerado sem barras de enquadramento (bearer bars).
- A leitura final pode variar conforme o tamanho impresso, a qualidade de impressão, o contraste, a superfície e o equipamento utilizado.

## Execução local

Clone o repositório:

```bash
git clone https://github.com/eliseuangelos/qr-barcode.git
cd qr-barcode
```

É possível abrir o arquivo `index.html` diretamente em um navegador moderno. Para testar por um servidor HTTP local, utilize:

```bash
python3 -m http.server 8000
```

Em seguida, acesse [http://localhost:8000/](http://localhost:8000/).

Não há instalação de dependências, processo de compilação ou configuração de backend.

## Publicação no GitHub Pages

1. Envie os arquivos do projeto para a branch que será publicada.
2. No repositório, acesse **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch e a pasta que contém o `index.html`.
5. Salve as configurações e aguarde a publicação do GitHub Pages.

Os caminhos dos arquivos são relativos, permitindo publicar a aplicação na raiz de um domínio GitHub Pages ou em um subdiretório de repositório.

## Licenças de componentes de terceiros

- `js/vendor/qrcode.js`: QRCode for JavaScript, distribuído sob a licença MIT. Consulte `LICENSES/QRCode-MIT.txt`.
- `fonts/`: fonte Inter, distribuída sob a SIL Open Font License 1.1. Consulte `LICENSES/Inter-OFL.txt`.

“QR Code” é uma marca registrada da DENSO WAVE INCORPORATED.

## Sobre o autor

Sou **Eliseu Fernandes Laurindo**, profissional com experiência em atividades administrativas e operacionais, estudante autodidata e entusiasta de tecnologia e inteligência artificial. Meu contato com HTML e CSS começou por volta de 2010, acompanhado de estudos iniciais de JavaScript. Na adolescência, experimentei estruturas de jogos digitais; posteriormente, atuei como tutor em uma comunidade internacional e multiplataforma de MMORPG, mantive uma fanpage própria e desenvolvi scripts e calculadoras para auxiliar jogadores.

Hoje direciono essa curiosidade para projetos próprios de estudo e utilidade prática, explorando também as possibilidades da inteligência artificial. **Não sou desenvolvedor profissional nem possuo formação acadêmica específica em desenvolvimento de software.** Sou estudante e entusiasta de tecnologia e IA; este projeto faz parte de uma jornada contínua de aprendizagem, experimentação e desenvolvimento de ferramentas digitais.

- **Projeto:** [QR Code & Barcode Generator](https://eliseuangelos.github.io/qr-barcode/)
- **Site pessoal:** [eliseuangelos.github.io](https://eliseuangelos.github.io/)
- **GitHub:** [github.com/eliseuangelos](https://github.com/eliseuangelos)
- **LinkedIn:** [linkedin.com/in/eliseu-fernandes-laurindo](https://linkedin.com/in/eliseu-fernandes-laurindo)

---

<p align="center"><em>“Quanto mais aumenta nosso conhecimento, mais evidente fica nossa ignorância.”</em><br><strong>John F. Kennedy</strong></p>
