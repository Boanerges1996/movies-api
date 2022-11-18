export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  status?: 'success' | 'error';
  token?: string;
  passwordResetToken?: string;
}
