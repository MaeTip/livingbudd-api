export class AuthEntity {
  access_token: string;
  user_id: string;

  constructor(token: string, id: string) {
    this.access_token = token;
    this.user_id = id;
  }
}
