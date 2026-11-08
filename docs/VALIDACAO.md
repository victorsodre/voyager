# Validação — 07/11/2026

**Desenvolvimento aprovado localmente para o escopo de Voyager 1.** Sem deploy público. Testes em Chrome de automação isolado no macOS; desktop 1440×980, viewport móvel 390×844 e horizontal 844×390. Não houve teste em telefone físico.

## Comandos

- `npm ci --ignore-scripts`: instalação concluída; auditoria da instalação sem vulnerabilidades reportadas naquele momento.
- `npm run check`: TypeScript aprovado.
- `npm test`: **5 testes aprovados** — enquadramento pelos vértices em três proporções; hash/atribuição dos 20.390 triângulos; preservação de topologia/atributos/pose sem limites de vértices descartados; cronologia/identificação de previsão; limites/pausa/fim da viagem.
- `npm run build`: aprovado, incluindo typecheck. Vite produziu aviso de bundle acima de 500 kB, sem erro de build.
- Exportador `scripts/decode-model.html` + `python3 scripts/partition-model.py output/voyager-decoded.json`: manifesto reproduzido sem diferença.

## Fluxos conferidos no navegador

Cinco roteiros locais em `output/` registraram **65 asserções aprovadas**, incluindo testes de recursos/licenças. Logs e capturas são artefatos de desenvolvimento ignorados pelo Git; esta página conserva a síntese.

| Fluxo | Resultado observado |
|---|---|
| Carga/seleção | Sete conjuntos, um canvas, sem erro JavaScript; clique real na antena e seleção por lista |
| Isolamento | Cada um dos sete conjuntos reduz a geometria visível; retorno restaura câmera anterior |
| Órbita e viagem | Câmera alterada por arraste, preservada ao entrar/sair da viagem; seleção conservada |
| Renderização | Contador estável em repouso e durante modo viagem |
| Marcos | Seis datas/explicações selecionáveis, origem por marco, previsão de 18/11/2026 explícita |
| Controles da viagem | Play/pausa, barra por teclado, reset e término automático com opção de repetir |
| Visibilidade | Evento controlado de `document.hidden` suspende progresso; restauração retoma |
| Tour/reset | Tour chega ao sétimo conjunto; reset limpa seleção e restaura estado inicial |
| Celular | Busca sem acento, diálogo fecha após seleção, detalhe/isolamento, fontes e Escape; sem overflow horizontal |
| Movimento reduzido | Preferência respeitada na UI; reprodução depende de gesto e pode ser explicitamente acionada |
| Exportação | PNG 1920×1080 e 1080×1920 com marca/crédito, sem corte do objeto; câmera restaurada |
| Falhas | Requisição do GLB bloqueada e contexto WebGL perdido produzem fallback; viagem funciona e reload recupera |
| Produção | Build servido em `/voyager/`, recarga direta, modelo/decoder/fontes/licenças com HTTP 200; sem erro JavaScript |

## Inspeção visual

Conferidos conjunto inteiro, antena, plataforma, RTGs, haste magnética, antenas em V e capa do disco. Componentes correspondem ao diagrama NASA/JPL no recorte semântico documentado; não é certificação de montagem física. Modelo inicial e isolado, viagem desktop/móvel, orientação horizontal e ambos os PNGs vistos nas imagens reais.

A primeira captura móvel de página inteira apareceu vazia por comportamento de composição do canvas no Chrome. Captura do viewport inicial e da build de produção confirmou o modelo presente sem interação. Não se usou edição de imagem para representar a aplicação. A documentação de manutenção registra essa distinção.

## Medidas

- GLB original: **1.720.864 bytes**, 20.390 triângulos, 313 componentes conectados.
- Cena completa: **12 draw calls**, 20.390 triângulos; seleção acrescenta o indicador de destaque.
- JavaScript principal: **915,77 kB**, **235,89 kB gzip**; CSS: 21,82 kB / 5,32 kB gzip.
- Arquivos efetivamente solicitados para a cena na prévia: **2.996.544 bytes somados sem compressão**, incluindo JS, CSS, fontes, modelo, decoder e ícone. Não é medida de transferência em rede móvel.
- DPR limitado a 1,5; teto de renderização configurado em 30 fps durante interação. Não se afirma benchmark sustentado em telefone físico.

## Correções demonstradas

A troca de modo redimensionava a vista oculta e alterava a câmera. O resize agora ignora a viagem. A inércia de órbita ainda movia levemente a câmera na retomada; foi retirada para preservar a pose. O contexto datado da viagem estava cortado pelo container fixo; passou para fluxo natural. Os testes correspondentes passaram após as correções.

## Limites

- Sem avaliação em Safari/Firefox, telefone físico ou rede móvel limitada nesta rodada.
- A ocultação de aba foi testada por evento controlado, sem tratar isso como confirmação do ciclo nativo de suspensão de todos os navegadores.
- A geometria tem autoria NASA/Michael D. Carbajal; a identificação funcional é educativa e não valida dimensões/engenharia para fabricação.
- Fontes datadas em 07/11/2026; previsão futura exige reconsulta antes de divulgação posterior. Sem telemetria, áudio, corte ou desmontagem.
- Aplicativo validado localmente; tornar disponível na web e publicar no X são ações posteriores.

## Revisão para publicação — 08/11/2026

Testes automatizados do projeto, TypeScript/build e `check:pages` aprovados. O último verifica assets relativos em subpasta, canonical, prévia social, 404, sitemap e fallback sem JavaScript. O conjunto mantém 76 testes dos mecanismos.

Chrome real em janela dedicada: build servido sob a subpasta do projeto, canvas e catálogo carregados, seleção, ação principal quando presente no dock, diálogo da coleção com dez destinos corretos, indicação da página atual, fechamento por Escape, foco devolvido e seleção preservada. Viewports 1440×1000 e 390×844, sem transbordamento horizontal, erros de JavaScript ou respostas HTTP de erro durante o fluxo. Capturas reais em `output/publish-local-*.png` (ignoradas pelo Git).

A publicação usa o procedimento em [PUBLICACAO.md](PUBLICACAO.md). Verificação local não substitui conferir a URL após o deploy. Celular físico e Safari permanecem fora da amostra; o modelo mantém os limites educativos descritos acima.
