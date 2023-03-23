export class CreateOrderDto {
  full_name: string;
  phone_number: string;
  email?: string;
  product_link: string;
  summa: number;
  currency_type_id: string;
  description?:string;
}
