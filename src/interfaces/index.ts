export interface IErorr {
  message: string | [];
  statusCode: number;
  error: string;
}

export interface ITokens {
  access_token: string;
  expires_in: number | Date;
  refresh_token: string;
  refresh_expires_in: number | Date;
}

export interface IQueryFilter {
  limit?: number;
  page?: number;
  after?: string;
  before?: string;
}
