export type ResponseType<D = never> = {
  data: D;
  message: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
}