export interface RawAccount {
  email: string;
  firstName: string;
  lastName: string;
}

export interface Account extends RawAccount {
  id: number;
}
