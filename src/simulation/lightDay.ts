/**
 * Instant NASA computed for Voyager 1 reaching one light-day from Earth:
 * Wed, Nov. 18, 2026, 05:16:07 EST (UTC-5). Source: "Voyager 1: What is a light-day?".
 * Only the wording changes with the date; nothing here simulates telemetry.
 */
export const LIGHT_DAY_AT = Date.UTC(2026, 10, 18, 10, 16, 7);

export const lightDayPassed = (now: Date = new Date()) => now.getTime() >= LIGHT_DAY_AT;

export type LightDayCopy = { kind: 'forecast' | 'reached'; stamp: string; tag: string | null; detail: string; context: string; headline: string };

export function lightDayCopy(now: Date = new Date()): LightDayCopy {
  const distance = 'cerca de 25,9 bilhões de km da Terra';
  const signal = 'Um sinal de rádio leva cerca de 24 horas em cada sentido; uma resposta exige pelo menos dois dias.';
  if (lightDayPassed(now)) return {
    kind: 'reached',
    stamp: 'POR VOLTA DE 18 NOV 2026',
    tag: null,
    detail: `Por volta de 18/11/2026, data calculada pela NASA, a Voyager 1 passou de um dia-luz: ${distance}. ${signal}`,
    context: 'O marco do dia-luz segue a data calculada pela NASA; não é uma medição em tempo real.',
    headline: 'Por volta de 18/11/2026, a Voyager 1 passou de um dia-luz da Terra.',
  };
  return {
    kind: 'forecast',
    stamp: 'PREVISÃO · 18 NOV 2026',
    tag: 'PREVISTO',
    detail: `Marco previsto pela NASA para 18/11/2026: ${distance}. ${signal}`,
    context: 'O marco de 18/11/2026 é uma previsão da NASA, não uma medição em tempo real.',
    headline: 'Em 18/11/2026, pela previsão da NASA, a Voyager 1 chega a um dia-luz da Terra.',
  };
}
