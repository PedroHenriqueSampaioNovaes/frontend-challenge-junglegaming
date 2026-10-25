export type Nft = {
  id: string;
  name: string;
  /** Decimal string in ETH, e.g. "1.19" */
  price: string;
  previousPrice?: string;
  image: string;
  collection: string;
  network: string;
  listedAt: string;
};

export type NftSort = 'recent' | 'price-asc' | 'price-desc';

export type NftListParams = {
  search?: string;
  collection?: string;
  networks?: string[];
  minPrice?: string;
  maxPrice?: string;
  sort?: NftSort;
  page?: number;
  pageSize?: number;
};

export type NftListResponse = {
  items: Nft[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
