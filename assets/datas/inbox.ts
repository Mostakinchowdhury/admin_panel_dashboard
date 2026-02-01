export type inboxes_type = {
  id: number;
  sender: number;
  recever: number;
  message: string;
  send_at: string;
  is_read: boolean;
  opponent_img: string | null;
  opponent_name: string;
};
