# Arquitetura implementada

Aplicação estática React 19.2.6 + TypeScript 5.9.3 + Three.js 0.187.0 + Vite 8.3.6. Versões exatas no package.json/lockfile. Fontes locais; nenhum serviço remoto é necessário para renderizar a experiência depois do download dos arquivos estáticos.

## Responsabilidades

| Arquivo | Responsabilidade |
|---|---|
| `src/App.tsx` | Seleção, isolamento, modo sonda/viagem, tour, diálogos e reset |
| `src/content/catalog.ts` | IDs estáveis dos sete conjuntos, explicações e fontes |
| `src/content/journey.ts` | Marcos históricos e previsão, com datas/fontes |
| `src/content/partition.json` | Atribuição de cada triângulo a um conjunto, vinculada ao hash do GLB |
| `src/scene/model.ts` | Carregamento, decodificação local e montagem dos conjuntos |
| `src/scene/partition.ts` | Subconjuntos de triângulos, preservando atributos e pose mundial |
| `src/scene/runtime.ts` | Câmera, seleção por raio, isolamento e renderização sob demanda |
| `src/scene/camera.ts` | Enquadramento pelos vértices reais; evita espaços vazios da caixa da haste diagonal |
| `src/scene/capture.ts` | Exportação com marca/crédito e restauração da câmera |
| `src/simulation/journey.ts` | Progresso limitado, pausa, visibilidade e último marco |
| `src/ui/Journey.tsx` | Esquema SVG e controles HTML da viagem |
| `src/ui/Sources.tsx` | Fontes e licenças em diálogo nativo |
| `src/styles.css` | Identidade e composição desktop/móvel |

## Invariantes

Cada um dos 20.390 triângulos pertence exatamente a um conjunto. O GLB original não é modificado; agrupamento semântico não representa sequência de montagem. IDs e ordem da partição devem acompanhar o catálogo. Mudança do asset exige nova inspeção, não apenas atualizar o hash.

`probe ↔ journey` conserva seleção, isolamento e câmera. A cena permanece montada, mas deixa de renderizar na viagem. Redimensionamento da vista oculta não reenquadra a sonda. Isolar guarda a pose anterior; sair do isolamento a restaura. Órbita sem inércia evita movimento residual ao trocar de modo.

A viagem dura aproximadamente 24 segundos quando acionada e percorre seis marcos em intervalos iguais; isso não representa o tempo histórico. Delta limitado a 0,1 segundo evita saltos após suspensão. Nenhuma animação começa sozinha; mudança para movimento reduzido interrompe a reprodução. Uma nova reprodução exige gesto.

## Desempenho e recursos

DPR máximo 1,5, teto de 30 fps durante mudança de câmera e renderização sob demanda quando parada. Aba oculta e modo viagem suspendem a cena. Draco usa um worker e arquivos locais. Fetch do GLB tem limite de 20 segundos; erros de carga e perda de WebGL oferecem viagem/fontes e recarga.

Materiais/texturas originais são compartilhados entre subconjuntos; descarte libera geometrias, materiais, texturas, controles, observadores, worker e renderizador. React StrictMode foi exercitado sem canvas duplicado. Números medidos em VALIDACAO.md, sem equivalência presumida com um telefone físico.

## Publicação

Base `./`; verificação local inclui `/voyager/`. Publicar toda a pasta dist. Não existe deploy automático. O site principal e os assets do Fusquinha não foram alterados ou copiados. A referência do Fusquinha orientou controles de exploração; esta cena usa o asset NASA identificado.
