export interface RestCreateGroup {
  name: string;
  createdUser: string;
}

export interface RestUpdateGroup {
  id: string;
  name?: string;
  createdUser: string;
}

export interface RestDeleteGroup {
  id: string;
  createdUser: string;
}