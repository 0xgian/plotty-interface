export interface Profile {
  uid?: number;
  name?: string;
  public_address: string;
  bio?: string;
  profile_picture?: string;
  profile_picture_uri?: string;
  handle?: string;
  label_center?: LabelCenter;
  public_nametag?: string;
  public_nametag_user_preferance?: string;
  is_contract?: boolean;
  join_date?: string;
  following?: number;
  follower?: number;
  follow_status?: boolean;
}

export interface LabelCenter {
  name: string;
  source: string;
  source_type: string;
}
