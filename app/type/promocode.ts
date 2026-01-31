export interface Promocode {
  id: number;
  code: string;
  discount_percent: number;
  max_uses: number;
  valid_from: string;
  used_count: number;
  valid_to: string;
  active: boolean;
  max_uses_per_user: number;
}
