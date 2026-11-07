# Preparação e manutenção da geometria

Fonte original: `public/models/voyager-nasa.glb`. Hash SHA-256 `bd86ded828dd3f459293aee4ffc3cd0998d8db67439317c8299650a1174c3289`.

O arquivo organiza quatro meshes por material: `_root`, `tex_01`, `tex_02_AO` e `tex_02_AO_dark`. Esses nomes não são instrumentos. A decomposição conecta vértices coincidentes com tolerância de arredondamento de 0,0001, reúne triângulos conectados e classifica componentes inteiros. A inspeção visual foi comparada ao [diagrama NASA/JPL](https://science.nasa.gov/mission/voyager/spacecraft/).

| ID | Componentes | Triângulos |
|---|---:|---:|
| antenna | 17 | 2518 |
| bus | 70 | 2968 |
| science | 138 | 3308 |
| magnetometer | 13 | 9814 |
| power | 72 | 1690 |
| plasma | 2 | 32 |
| record | 1 | 60 |
| **Total** | **313** | **20390** |

A capa do disco é um componente existente no modelo, sem adicionar o disco por trás. Plataforma científica e haste permanecem juntas. A estrutura de isolamento preserva a posição original de todos os vértices. Não recorta arbitrariamente triângulos por planos nem sugere desmontagem física.

## Reproduzir a partição

1. Rode `npm run dev` e abra `/scripts/decode-model.html` na prévia local.
2. Clique **Exportar geometria**. Salve o JSON em `output/voyager-decoded.json`.
3. Na raiz do projeto, rode `python3 scripts/partition-model.py output/voyager-decoded.json`.
4. Execute `npm test` e confira `git diff -- src/content/partition.json`.

O processo foi repetido com o exportador entregue e produziu manifesto idêntico. `output/components.json` contém os componentes para auditoria e é ignorado pelo Git. A página de manutenção não entra no build público.

Os IDs numéricos e regras espaciais do gerador estão vinculados a este GLB e à ordem produzida pelo decodificador fixado. Atualizar modelo/decoder exige comparar partição, atributos, orientação, textura e capturas de **todos** os sete grupos. Os testes detectam hash/contagem inconsistentes, mas não certificam a identificação científica de uma nova geometria.
