import { api } from '../api.ts';
import { Card, CardCategory } from './card.ts';

export async function getAllCards(): Promise<Card[]> {
  const response = await api.get<Card[]>(`/catalog`);

  return response.data;
}

export async function getAllCardsByCategory(category: CardCategory): Promise<Card[]> {
  const response = await api.get<Card[]>(`/catalog/${category}`);

  return response.data;
}

export async function createCard(card: Partial<Card>): Promise<Card> {
  const response = await api.post<Card>(`/catalog`, {
    ...card,
    nameCard: card.nameCard ?? `Сияние звёзд`,
    description:
      card.description ??
      'космический стиль с использованием тёмных тонов, звёздного небосвода и галактик',
    categories: card.categories ?? [CardCategory.DARK, CardCategory.ABSTRACT]
  });

  return response.data;
}
