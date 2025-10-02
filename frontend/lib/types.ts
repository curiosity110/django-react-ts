export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price_cents: number;
  created_at: string;
};

export type ApiListResponse<T> = {
  data: T[];
  error: string | null;
};

export type ApiItemResponse<T> = {
  data: T | null;
  error: string | null;
  status?: number;
};
