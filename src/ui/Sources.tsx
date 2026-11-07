import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { project } from '../content/project.ts';

export function Sources({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (open) ref.current?.showModal(); else ref.current?.close(); }, [open]);
  return <dialog ref={ref} className="sources-dialog" onClose={onClose} onClick={e => { if (e.target === ref.current) onClose(); }} aria-labelledby="sources-title">
    <div className="dialog-top"><span className="eyebrow">POR TRÁS DA EXPERIÊNCIA</span><button className="icon-button" aria-label="Fechar fontes" onClick={onClose}><X size={20}/></button></div>
    <h2 id="sources-title">FONTES & CRÉDITOS</h2>
    <p>{project.disclosure}</p>
    {project.sources.map(source => <a className="source-link" href={source.url} key={source.url} target="_blank" rel="noreferrer"><span><strong>{source.title}</strong><small>{source.detail}</small></span><ArrowUpRight size={20}/></a>)}
    <p className="credits">Direção e experiência: Victor Sodré / ovictorlab. Modelo: NASA / Michael D. Carbajal. Interface inspirada nas possibilidades do Fusquinha. Fontes Anton, Archivo, Archivo Black e JetBrains Mono sob SIL OFL. Ícones Lucide sob ISC.</p>
    <p className="credits">Conteúdo consultado em 07/11/2026. A representação dos conjuntos conserva todos os triângulos do modelo original. O código de exploração e os textos são do ovictorlab; a NASA não revisou ou endossou esta experiência.</p>
    <div className="license-links">{['anton', 'archivo', 'archivo-black', 'jetbrains-mono', 'bibliotecas', 'draco', 'modelo-nasa'].map(name => <a key={name} href={`./licenses/${name}.txt`} target="_blank" rel="noreferrer">Licença: {name}</a>)}</div>
  </dialog>;
}
