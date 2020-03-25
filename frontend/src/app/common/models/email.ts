
export interface Email {
  id: number;
  user: any;
  addressee: any[];
  created: number;
  first_opened: number;
  last_opened: number;
  title: string;
  description: string;
  uuid: string;
  activated: boolean;
}
