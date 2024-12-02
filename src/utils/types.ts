export type UserType = {
  email: string;
  password: string;
  username?: string;
  token?: string;
  token_type?: string;
};

export type StorageUser = {
  loaded?: boolean;
  user: UserType;
};
