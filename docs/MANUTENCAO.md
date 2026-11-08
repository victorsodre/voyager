# Manutenção e validação

## Antes de uma entrega

```sh
npm ci --ignore-scripts
npm run check
npm test
npm run build
npm run preview
```

Revisar diff, crédito NASA, licenças e texto pt-BR. Nenhuma credencial é necessária. Não versionar output, dist, node_modules, sessões do navegador ou configurações pessoais.

No navegador, testar carga inicial, sete conjuntos, clique na geometria/lista, busca, isolar/voltar, câmera, malha, tour, reset e ambos os PNGs. Girar a sonda, mudar para viagem e voltar: pose e seleção devem permanecer. No celular, conferir diálogo, detalhe abaixo da cena, orientação horizontal e ausência de sobreposição. Referências: desktop 1440×980, móvel 390×844 e horizontal 844×390. Testar também em aparelho físico antes de divulgar desempenho móvel.

Na viagem, conferir os seis marcos, previsão explícita, fonte por marco, barra por teclado, reprodução/pausa/fim/reset e movimento reduzido. O percurso não é temporalmente proporcional. Falhas de modelo/WebGL devem deixar viagem e fontes acessíveis; recarga deve recuperar a cena.

Capturas de página inteira no Chrome podem esvaziar temporariamente o framebuffer de uma cena sob demanda quando o viewport é alterado pela própria ferramenta. Confirmar a carga real com captura da tela visível antes de concluir que a cena está vazia. Os PNGs do aplicativo renderizam explicitamente e restauram a câmera.

## Alterar conteúdo e geometria

Datas e marcos: `src/content/journey.ts`. Atualização de contexto: também `project.ts` e texto de contexto em `ui/Journey.tsx`. **Antes de divulgar depois de 18/11/2026, reconferir a previsão de um dia-luz em uma atualização NASA**; o tempo passar não comprova o evento. Preservar a data da fonte, a origem da distância (Terra ou Sol) e a distinção entre função original e instrumento ativo.

Modelo: seguir GEOMETRIA.md. Não substituir o GLB mantendo a partição antiga. Após mudar decoder/Three, regenerar, comparar manifesto e imagens de todos os grupos. Fontes/identidade: seguir IDENTIDADE-VISUAL.md e conferir créditos no PNG, além da interface.

Dependências: atualizar de forma deliberada, com lockfile, build, testes e fluxo visual. O bundle inclui Three/GLTFLoader e gera aviso de tamanho; avaliar a transferência efetiva e experiência de rede antes de adicionar ferramentas ou assets.

## Publicação e reversão

A publicação foi autorizada por Victor em 08/11/2026. O procedimento vigente, os checks, a URL e a reversão estão em [PUBLICACAO.md](PUBLICACAO.md). Pushes em `main` passam a publicar pelo workflow após validação.
