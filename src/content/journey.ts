const mission='https://science.nasa.gov/mission/voyager/voyager-1/';
type HistoryMilestone={id:string;date:string;year:string;label:string;title:string;source:string;x:number;y:number;kind:'history';stamp:string;detail:string};
/** The light-day milestone has no fixed copy: its wording depends on the current date (see simulation/lightDay.ts). */
type LightDayMilestone=Omit<HistoryMilestone,'kind'|'stamp'|'detail'>&{kind:'lightday'};
export type MilestoneSource=HistoryMilestone|LightDayMilestone;
export const milestones:readonly MilestoneSource[]=[
 {id:'launch',date:'1977-09-05',stamp:'05 SET 1977',year:'1977',label:'Partida',title:'A viagem começa',detail:'Voyager 1 parte da Terra. Sua missão inicial: observar Júpiter e Saturno de perto.',source:mission,x:80,y:255,kind:'history'},
 {id:'jupiter',date:'1979-03-05',stamp:'05 MAR 1979',year:'1979',label:'Júpiter',title:'Encontro com Júpiter',detail:'O sobrevoo revela detalhes do planeta, de suas luas e de seu sistema de anéis.',source:mission,x:230,y:200,kind:'history'},
 {id:'saturn',date:'1980-11-12',stamp:'12 NOV 1980',year:'1980',label:'Saturno',title:'Saturno muda o caminho',detail:'Depois do encontro com Saturno e Titã, a nave segue para fora do plano dos planetas. Urano e Netuno pertencem à rota da Voyager 2.',source:mission,x:390,y:150,kind:'history'},
 {id:'portrait',date:'1990-02-14',stamp:'14 FEV 1990',year:'1990',label:'Ponto azul',title:'Um pequeno ponto azul',detail:'A nave registra a Terra no retrato do Sistema Solar, seu último conjunto de imagens. A câmera deixa de ser o centro da missão.',source:'https://science.nasa.gov/mission/voyager/voyager-1s-pale-blue-dot/',x:550,y:105,kind:'history'},
 {id:'interstellar',date:'2012-08-25',stamp:'25 AGO 2012',year:'2012',label:'Heliopausa',title:'Além da heliosfera',detail:'Voyager 1 cruza a heliopausa e passa a estudar o meio interestelar. Essa fronteira não encerra toda a influência gravitacional do Sol.',source:mission,x:710,y:65,kind:'history'},
 {id:'lightday',date:'2026-11-18',year:'2026',label:'Dia-luz',title:'Um dia para a luz chegar',source:'https://science.nasa.gov/mission/voyager/voyager-1/voyager-1-what-is-a-light-day/',x:870,y:40,kind:'lightday'},
];
export const sourceDate='07/11/2026';
