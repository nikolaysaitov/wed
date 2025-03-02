export interface Card {
  title: string;
  text?: string;
  icon?: string;
  active?: boolean;
}

export interface PriceCard extends Card {
  price: string;
  conditions: Condition[];
}

export interface Condition {
  text: string;
  present?: boolean;
}
