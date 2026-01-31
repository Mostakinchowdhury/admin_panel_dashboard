export interface OrderProof {
  id: number;
  order: number;
  rider: number;
  rider_name: string;
  proved_image: string;
  proved_video_url: string;
  proved_image_url: string;
  proved_video: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED'; // adjust other possible statuses if needed
  proved_at: string; // ISO date string
}

// If you're receiving an array (as in your example)
export type OrderProofList = OrderProof[];
