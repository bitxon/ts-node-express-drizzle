export interface RawAccount {
  email: string;
  firstName: string;
  lastName: string;
  currency: "USD" | "EUR" | "GBP";
  balance: number;
}

export interface Account extends RawAccount {
  id: number;
}
