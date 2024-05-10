export interface Author {
  name: string;
  lastname: string;
}

export interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity?: number;
  description?: string;
  category?: string;
}

export interface SearchResponse {
  author: Author;
  categories: string[];
  items: Item[];
}

export interface ItemDetailResponse {
  author: Author;
  item: Item;
}
