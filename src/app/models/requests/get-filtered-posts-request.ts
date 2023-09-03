export interface GetFilteredPostsRequest {
  minPrice: number;
  maxPrice: number;
  country: string;
  city: string;
  name: string;
  type: string;
}
