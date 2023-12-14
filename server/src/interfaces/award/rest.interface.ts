export interface RestCreateAward {
  name: string;
  image: string;
  createdUser: string;
}
 export interface RestGetAwardById{
  id : string;
 }

export interface RestUpdateAward {
  id : string;
  name?: string;
  image?: string;
}
export interface RestDeleteAward {
  id : string;
}