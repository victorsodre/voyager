# Decisões e estado

## 2026-11-07 — documentação inicial

- Victor solicitou salvar o plano no VicMind, criar uma pasta para cada projeto, preparar guias de desenvolvimento/identidade, enviar ao GitHub e escrever posts do X para uso posterior.
- Planejamento detalhado criado; prioridade recomendada **3/10**. A prioridade pode mudar após o piloto e a validação de assets.
- Identidade: ovictorlab.com / Laboratório noturno. Interações: referência Fusquinha, adaptadas à pergunta do projeto.
- Repositório inicialmente privado por escolha operacional conservadora nesta fase. O pedido autoriza o envio dos guias; não foi tratado como solicitação de implementar e publicar os aplicativos.
- Nenhuma postagem no X enviada. Textos de protótipo e lançamento têm condições explícitas de uso.

## Pendências técnicas iniciais — resolvidas no marco de implementação

- NASA: descrição da missão, instrumentos e diferenças entre Voyager 1 e 2.
- Confirmar termos, créditos e organização do modelo oficial antes de incorporá-lo.

Próxima ação naquele marco: Baixar e inventariar o modelo oficial, documentar créditos e definir qual Voyager a experiência representará.

## Como registrar mudanças

Acrescentar data, decisão, motivo, fonte/evidência, arquivos afetados e consequência para o escopo. Separar proposta, implementação, validação e publicação. Preservar decisões antigas com indicação de substituição quando necessário.

## 2026-11-07 — início do desenvolvimento autorizado

Meta de Victor: desenvolver os dez projetos até completar seus escopos. Voyager 1 escolhida, com dados históricos separados de marcos previstos. GLB oficial baixado e inventariado; sua geometria não está dividida por instrumento. Apuração e próxima ação em APURACAO.md. Nenhuma aplicação pronta ou deploy neste marco.

## 2026-11-07 — aplicação implementada e validada

- Sete conjuntos semânticos derivados de 313 componentes inteiros. GLB original preservado; reprodução do manifesto confirmada. Método em GEOMETRIA.md.
- Viagem separada da sonda, seis marcos e previsão de 18/11/2026 identificada. Distância referida à Terra; nenhum contador de telemetria.
- Câmera preservada entre modos e ao sair do isolamento. Órbita sem inércia, renderização sob demanda e suspensão da cena oculta.
- Identidade aplicada, tour, malha e PNG nos dois formatos. Sem corte, desmontagem ou som: não acrescentariam informação tecnicamente sustentada ao recorte.
- Verificação de navegador corrigiu reenquadramento por resize da vista oculta e movimento residual da câmera. Contexto das fontes passou a ocupar fluxo natural para não ficar cortado no rodapé.
- Comandos e medições em README/VALIDACAO.md. Pendências técnicas iniciais resolvidas para este escopo. Publicação e divulgação permanecem externas à implementação; nenhum post enviado.

## 2026-11-08 — repositório público e GitHub Pages

Victor autorizou aprimorar e tornar públicos os dez projetos com HTML funcional e identidade oficial. Esta decisão substitui a restrição histórica de publicação acima. Incluídos navegação entre os dez sites, canonical/OG/X, prévia real, sitemap, página 404, verificação de caminhos e workflow com testes/build antes do deploy. URL: https://victorsodre.github.io/voyager/. Conteúdo e modelo educativo preservados; nenhum post enviado ao X. Procedimento e reversão em PUBLICACAO.md.

## 2026-11-08 — vídeo do canal incorporado

Pedido de Victor: embed abaixo do experimento e thumbnail clicável no README. Vídeo `PyF4PO5zPpk`, autoria ovictorlab confirmada pelo oEmbed público. Do lançamento aos limites do sistema solar: acompanhe a explicação e volte à sonda para conhecer seus instrumentos. Player `youtube-nocookie.com`, criado só por clique, `autoplay=0`, controles nativos, referrer de origem e link direto sempre disponível. Capa local para não carregar o YouTube na abertura; layout landscape. Cabeçalho leva à seção `#video`. Identidade preservada; nenhum upload ou alteração de vídeo no canal.

## 2026-11-09 — revisão: dia-luz, instrumentos ligados, celular e SEO

Victor autorizou aplicar a revisão dos dez labs.

- Dia-luz: texto calculado pela data (`simulation/lightDay.ts`), sem contador. Antes de 18/11/2026 05:16:07 EST é previsão; depois, "por volta de 18/11/2026, a Voyager 1 passou de um dia-luz". Fonte: página NASA do dia-luz. Destaque também na abertura.
- Instrumentos: magnetômetro e ondas de plasma marcados "ainda ligado" (NASA, 17/04/2026: restam esses dois); câmeras desligadas em 14/02/1990 (página da nave). Nota do RTG reescrita sem sugerir painéis solares.
- Seleção: a caixa amarela foi trocada por esmaecimento dos outros conjuntos; o PNG exportado sai sem destaque (a malha, escolha do usuário, continua).
- Câmera: resize/tela cheia/isolar preservam a direção da órbita. Toque no vazio não desmarca; peças finas têm tolerância de toque.
- Celular: textos ≥ 11 px, alvos ≥ 44 px, barra de ferramentas abaixo da cena, descrição da sonda visível, rolagem vertical liberada no canvas (`touch-action: pan-y`); no desktop a roda rola a página e Ctrl + roda aproxima.
- SEO: título com termo de busca, resumo indexável no `index.html` e JSON-LD `VideoObject` (data de envio do YouTube: 05/10/2026). Three.js em chunk separado; decodificadores Draco sem uso deixam de ser publicados.

## Segunda rodada (09/11/2026)

- Enquadramento: no desktop a área da cena começa à direita da coluna de abertura (eyebrow, título, intro, destaque do dia-luz), então a haste do magnetômetro não cruza o texto em nenhuma largura; no celular a cena tem 16 px de margem lateral e a ponta da haste não encosta na borda. Entre 761 e 1100 px a dica de órbita sobe acima da faixa inferior, que quebra em três linhas.
- Cabeçalho: "LAB" e "EXPERIMENTO" usam `labNumber('voyager')` do kit, o mesmo número do menu da coleção (hoje 04). O link para `#video` chama-se "Ver o vídeo", como nos outros labs.
- Dicas de órbita: a de mouse ("Ctrl + rolagem") só com `pointer: fine`; a de toque só com `pointer: coarse` (CSS, sem estado em JS).
- Ponto azul: texto alinhado à pesquisa do EP229 (PIA23645, Pale Blue Dot Revisited): ~6 bilhões de km, Terra menor que um pixel, uma das últimas imagens. Saiu "a câmera deixa de ser o centro da missão", que ia além da fonte.
- Mapa da viagem no celular: anos do esquema com 31 unidades no SVG para ficarem com ≥ 11 px na tela.
