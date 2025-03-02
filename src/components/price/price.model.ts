import {PriceCard} from "../../components-ui/shared/card/card.model.ts";

export const PRICE_CARDS: PriceCard[] = [
  {
    title: 'Минимальный',
    price: '1 490 руб.',
    conditions: [
      { text: 'Вводный  приветственный блок', present: true },
      { text: 'Информация о свадьбе', present: true },
      { text: 'Место проведения', present: true },
      { text: 'Детали', present: true },
      { text: 'Именные приглашения – 1шт.', present: true },
      { text: 'PDF-карточки – 1шт.', present: true },
      { text: 'План дня', present: false },
      { text: 'Таймер', present: false },
      { text: 'RSVP – ответ на приглашение', present: false },
      { text: 'Опрос гостей об их предпочтениях', present: false },
      { text: 'Выбор красивого домена', present: false },
    ]
  },
  {
    title: 'Базовый',
    price: '3 490 руб.',
    conditions: [
      { text: 'Вводный  приветственный блок', present: true },
      { text: 'Информация о свадьбе', present: true },
      { text: 'Место проведения', present: true },
      { text: 'Детали', present: true },
      { text: 'Именные приглашения – 20 шт.', present: true },
      { text: 'PDF-карточки – 20 шт.', present: true },
      { text: 'План дня', present: true },
      { text: 'Таймер', present: true },
      { text: 'RSVP – ответ на приглашение', present: true },
      { text: 'Опрос гостей об их предпочтениях', present: true },
      { text: 'Выбор красивого домена', present: false },
    ]
  },
  {
    title: 'Индивидуальный дизайн',
    price: 'от 9 900 руб.',
    conditions: [
      { text: 'Вводный  приветственный блок', present: true },
      { text: 'Информация о свадьбе', present: true },
      { text: 'Место проведения', present: true },
      { text: 'Детали', present: true },
      { text: 'Именные приглашения – ∞ шт.', present: true },
      { text: 'PDF-карточки – ∞ шт.', present: true },
      { text: 'План дня', present: true },
      { text: 'Таймер', present: true },
      { text: 'RSVP – ответ на приглашение', present: true },
      { text: 'Опрос гостей об их предпочтениях', present: true },
      { text: 'Выбор красивого домена', present: true },
    ]
  }
];

// export const CONDITIONS: Pick<Condition, 'text'>[] = [
//   { text: 'Настройка дизайна и структуры пригласительного' },
//   { text: 'Доступ к базовым настройкам цветовой схемы и шрифтов' },
//   { text: 'Базовая техническая поддержка' },
//   { text: 'RSVP-форма или функции социального взаимодействия' },
//   {
//     text: 'Собственный менеджер для обеспечения бесперебойной работы электронного пригласительного'
//   },
//   { text: 'Возможность добавления нескольких страниц или разделов в электронном пригласительном' }
// ];
