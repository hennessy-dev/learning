import { Address } from "./address.model";
import { Name } from "./name.model";

export interface User {

  id: number;
  name: Name;
  email: string;
  address: Address;
  username: string;
  password: string;
  phone: string;

}