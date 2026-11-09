const spacecraft='https://science.nasa.gov/mission/voyager/spacecraft/';
/** NASA, 17/04/2026: after LECP was turned off, two science instruments remain on — plasma waves and magnetic fields. */
const stillOn={date:'17/04/2026',source:'https://science.nasa.gov/blogs/voyager/2026/04/17/nasa-shuts-off-instrument-on-voyager-1-to-keep-spacecraft-operating/'};
export type PartStatus={on:boolean;label:string;detail:string;source:string};
type Entry={id:string;label:string;detail:string;note:string;source:string;status?:PartStatus};
export const catalog=[
 {id:'antenna',label:'Antena de alto ganho',detail:'A antena de 3,7 metros recebe comandos e envia dados à Terra.',note:'O apontamento depende da orientação da nave. Ela não é uma antena que gira livremente como um radar.',source:spacecraft+'#h-high-gain-antenna'},
 {id:'bus',label:'Corpo e eletrônica',detail:'A estrutura central abriga computadores, comunicações e sistemas de controle.',note:'Nesta vista externa, você observa a estrutura que protege os sistemas da nave.',source:spacecraft+'#h-bus-housing-electronics'},
 {id:'science',label:'Plataforma e instrumentos',detail:'Câmeras e espectrômetros estudaram os planetas durante os sobrevoos.',note:'O conjunto reúne a haste e a plataforma científica. Presença física não significa instrumento ligado hoje.',source:spacecraft+'#h-inactive-systems',
  status:{on:false,label:'CÂMERAS DESLIGADAS',detail:'Segundo a NASA, as câmeras de grande e de pequeno ângulo foram desligadas em 14/02/1990 para economizar energia.',source:spacecraft+'#h-inactive-systems'}},
 {id:'magnetometer',label:'Magnetômetro e haste',detail:'Sensores afastados do corpo medem campos magnéticos no espaço.',note:'A haste longa reduz a influência magnética da própria nave sobre as medições.',source:spacecraft+'#h-magnetometer-mag',
  status:{on:true,label:'AINDA LIGADO',detail:`Segundo a NASA, em ${stillOn.date}, o instrumento de campos magnéticos é um dos dois instrumentos científicos que seguem ligados.`,source:stillOn.source}},
 {id:'power',label:'Três geradores RTG',detail:'Os geradores convertem calor do decaimento radioativo em eletricidade.',note:'É deles que vem a eletricidade da nave, e a potência diminui ao longo da missão.',source:spacecraft+'#h-radioisotope-power-system-rps'},
 {id:'plasma',label:'Antenas de ondas de plasma',detail:'Duas antenas em V captam sinais elétricos do plasma ao redor da nave.',note:'São compartilhadas pelos experimentos de ondas de plasma e radioastronomia planetária.',source:spacecraft+'#h-plasma-wave-subsystem-pws',
  status:{on:true,label:'AINDA LIGADO',detail:`Segundo a NASA, em ${stillOn.date}, o instrumento que escuta ondas de plasma é um dos dois instrumentos científicos que seguem ligados.`,source:stillOn.source}},
 {id:'record',label:'Capa do disco dourado',detail:'A capa protege a mensagem que acompanha a nave: sons e imagens da Terra.',note:'Você explora a capa protetora externa. O disco é uma mensagem, não um instrumento de medição.',source:'https://science.nasa.gov/mission/voyager/voyager-golden-record-overview/'},
] as const satisfies readonly Entry[];
export type PartId=typeof catalog[number]['id'];
