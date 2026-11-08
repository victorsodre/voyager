# Escopo — Voyager explorável

## Pergunta e resultado esperado

O que a Voyager carrega e até onde sua viagem chegou? O visitante deve conseguir explicar o mecanismo depois de explorar a cena e acionar seus controles.

Exploração da sonda com antena e instrumentos selecionáveis, seguida de um percurso guiado. A viagem usa uma vista separada, com escala declarada.

## Conjuntos da primeira versão

- Antena de alto ganho
- Corpo da sonda
- Instrumentos científicos
- Hastes e sensores
- Fontes de energia
- Disco e contexto da missão

Grupos implementados em sete IDs estáveis, validados contra a geometria original e o diagrama NASA/JPL; detalhes em GEOMETRIA.md. Instrumentos são conjuntos funcionais, sem alegar desmontagem física.

## Ações principais

| Controle | Comportamento implementado |
|---|---|
| Explorar instrumentos | Seleciona uma parte e apresenta sua função com fonte. |
| Isolar conjunto | Enquadra a peça e permite voltar à sonda inteira. |
| Ver viagem | Troca para um esquema temporal com marcos datados e escala explícita. |

Base de exploração: órbita, zoom, seleção por lista ou clique, isolamento, reenquadrar e reset. Desmontagem e corte só se aplicam aos conjuntos para os quais forem úteis e tecnicamente coerentes. Som, malha e captura são complementos, posteriores à clareza do mecanismo.

## Estado do mecanismo

`overview ↔ instrument; overview ↔ journey; voltar sempre recupera a câmera anterior sem perder a seleção válida.`

## Critérios específicos de conclusão

- O conteúdo identifica Voyager 1 ou 2 e não mistura trajetórias, instrumentos e datas entre elas.
- Distância e situação da missão exibem data da fonte; nenhum contador falso de tempo real.
- A trajetória informa quando distâncias e tamanhos não compartilham a mesma escala.

- A pergunta inicial é respondida por uma interação observável, com texto curto e fontes acessíveis.
- Desktop e celular emulado foram validados, com reset/fallback conferidos; teste em telefone físico não integra a evidência disponível.
- Nenhum botão visível é apenas decorativo ou promete função pendente.

## Fora da primeira versão

- Telemetria ao vivo e propagação orbital de precisão.
- Animação de desmontagem de partes que o asset não separa ou cuja estrutura não foi validada.

Ampliações entram no backlog após o piloto, com evidência de uso e esforço. Não incluir funcionalidades só para repetir todas as opções do Fusquinha.
