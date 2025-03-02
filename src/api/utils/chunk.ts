export interface IChunk<F = string> {
  filters?: F | null;
  page: number;
  limit: number;
  sortBy?: sortType;
  order?: string;
}

export interface PaginatedData<T> {
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

export type sortType = 'asc' | 'desc';
