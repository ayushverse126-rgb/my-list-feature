export class UsersDTO {
  userID: number;
}
export interface TokenDTO {
  userData: UsersDTO;
}

export interface RefreshDTO extends TokenDTO {
  tokenType: 'refresh';
}
