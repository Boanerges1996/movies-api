export interface MovieApiResponse<T = unknown> {
  data?: T;
  message?: string;
  status?: 'success' | 'error';
  token?: string;
  passwordResetToken?: string;
}
