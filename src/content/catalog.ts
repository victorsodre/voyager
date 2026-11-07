const spacecraft='https://science.nasa.gov/mission/voyager/spacecraft/';
export const catalog = [
 {id:'antenna',label:'Antena de alto ganho',detail:'A antena de 3,7 metros recebe comandos e envia dados à Terra.',note:'O apontamento depende da orientação da nave. Ela não é uma antena que gira livremente como um radar.',source:spacecraft+'#h-high-gain-antenna'},
 {id:'bus',label:'Corpo e eletrônica',detail:'A estrutura central abriga computadores, comunicações e sistemas de controle.',note:'Nesta vista externa, você observa a estrutura que protege os sistemas da nave.',source:spacecraft+'#h-bus-housing-electronics'},
 {id:'science',label:'Plataforma e instrumentos',detail:'Câmeras e espectrômetros estudaram os planetas durante os sobrevoos.',note:'O conjunto reúne a haste e a plataforma científica. Presença física não significa instrumento ligado hoje.',source:spacecraft+'#h-inactive-systems'},
 {id:'magnetometer',label:'Magnetômetro e haste',detail:'Sensores afastados do corpo medem campos magnéticos no espaço.',note:'A haste longa reduz a influência magnética da própria nave sobre as medições.',source:spacecraft+'#h-magnetometer-mag'},
 {id:'power',label:'Três geradores RTG',detail:'Os geradores convertem calor do decaimento radioativo em eletricidade.',note:'A potência diminui ao longo da missão. A Voyager não depende de painéis solares nessa distância.',source:spacecraft+'#h-radioisotope-power-system-rps'},
 {id:'plasma',label:'Antenas de ondas de plasma',detail:'Duas antenas em V captam sinais elétricos do plasma ao redor da nave.',note:'São compartilhadas pelos experimentos de ondas de plasma e radioastronomia planetária.',source:spacecraft+'#h-plasma-wave-subsystem-pws'},
 {id:'record',label:'Capa do disco dourado',detail:'A capa protege a mensagem que acompanha a nave: sons e imagens da Terra.',note:'Você explora a capa protetora externa. O disco é uma mensagem, não um instrumento de medição.',source:'https://science.nasa.gov/mission/voyager/voyager-golden-record-overview/'},
] as const;
export type PartId=typeof catalog[number]['id'];
