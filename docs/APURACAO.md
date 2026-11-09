# Apuração da Voyager — 07/11/2026

## Recorte

Representar **Voyager 1**, com exploração da sonda e vista temporal separada. Não misturar sobrevoos de Urano/Netuno da Voyager 2. Sem telemetria ao vivo ou contador que simule dados correntes.

## Modelo oficial incorporado

[Voyager Probe (B)](https://science.nasa.gov/3d-resources/voyager-probe-b/), autoria **NASA/Michael D. Carbajal**, GLB publicado em 18/04/2025. Arquivo preservado em `public/models/voyager-nasa.glb`; 1.720.864 bytes. Hash e inventário em ASSET-INVENTARIO.json.

O GLB tem quatro meshes/nós, três materiais, quatro imagens incorporadas, compressão Draco e texturas WebP. Nós `tex_01`, `tex_02_AO`, `tex_02_AO_dark` e `_root`: não existe catálogo semântico de instrumentos. Não anunciar desmontagem por peça a partir desses nomes.

Preparação concluída: 313 componentes conectados foram inspecionados visualmente e reunidos em sete conjuntos. O manifesto atribui os 20.390 triângulos uma única vez. Critérios, contagens e reprodução em GEOMETRIA.md. O agrupamento representa funções, não desmontagem física.

[Termos de uso NASA](https://www.nasa.gov/nasa-brand-center/images-and-media/) consultados: permitem uso educativo/informativo com crédito e sem sugerir endosso. O arquivo não apresenta crédito adicional de terceiro. Preservar crédito no produto e separar a marca ovictorlab da autoria do asset. Sem usar logo NASA como marca da experiência.

## Fontes de conteúdo

- [Página Voyager 1](https://science.nasa.gov/mission/voyager/voyager-1/): lançamento 05/09/1977, Júpiter 05/03/1979, Saturno 12/11/1980, entrada no meio interestelar 25/08/2012. Há parágrafos históricos sobre quantidade de instrumentos e distância de 2024; não tratá-los como status atual.
- [Descrição da nave e instrumentos](https://science.nasa.gov/mission/voyager/spacecraft/): diagrama, antena de 3,7 m, corpo, três RTGs, haste magnética, plataforma científica e antenas em V. Mapeamento confrontado com o modelo.
- [Atualização de 17/04/2026](https://science.nasa.gov/blogs/voyager/2026/04/17/nasa-shuts-off-instrument-on-voyager-1-to-keep-spacecraft-operating/): desligamento do LECP por economia de energia, dois instrumentos científicos restantes nessa data. Função original de um sensor não significa que ele esteja ligado hoje.
- [Atualização de 29/10/2026](https://science.nasa.gov/blogs/voyager/2026/10/29/nasas-voyager-1-conserves-power-resolves-brief-communications-pause/): economia de energia concluída em setembro e contato restabelecido em 20/10. Não usar como leitura de telemetria.
- [Marco de um dia-luz](https://science.nasa.gov/mission/voyager/voyager-1/voyager-1-what-is-a-light-day/): previsão publicada para **18/11/2026, 05:16:07 EST**, cerca de 25,9 bilhões de km da Terra. Em 07/11 é futuro, não feito consumado. Preferir marco explicitamente previsto, sem contador correndo. Distâncias da Terra e do Sol devem ter origem indicada.

Trajeto será um esquema de marcos, não propagação orbital nem uma escala comum entre tamanhos da nave/planetas e distâncias. Data da consulta deve acompanhar o painel de contexto.

## Estado

Aplicação implementada e validada localmente; resultados em VALIDACAO.md. Sem publicação pública ou telemetria ao vivo.

## Fontes complementares conferidas

- [Pale Blue Dot Revisited (PIA23645)](https://science.nasa.gov/photojournal/pale-blue-dot-revisited/): retrato da Terra em 14/02/1990, a cerca de 6 bilhões de km; a Terra ocupa menos de um pixel; uma das últimas imagens da nave. Texto alinhado à pesquisa do EP229 (`youtube-ovictor/episodios/ep229-voyager-ainda-nao-saiu/pesquisa.md`, consulta de 03/10/2026).
- [Golden Record](https://science.nasa.gov/mission/voyager/voyager-golden-record-overview/): mensagem de sons/imagens; a experiência apresenta somente a capa exterior já existente no modelo.
- [FAQ NASA](https://science.nasa.gov/mission/voyager/frequently-asked-questions/): distingue heliosfera de Sistema Solar definido pela influência gravitacional, incluindo a Nuvem de Oort. Algumas respostas da página estão desatualizadas sobre Voyager 2; não foram usadas como situação atual. O marco de 2012 é a saída da heliosfera, não do Sistema Solar inteiro.
