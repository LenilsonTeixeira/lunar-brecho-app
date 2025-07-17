export interface OrderProduct {
  id: number;
  name: string;
  code: string;
  size: string;
  quantity: number;
  price: number;
}

export interface OrderAddress {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customer: string;
  customerPhone: string;
  products: OrderProduct[];
  total: number;
  status: string;
  orderDate: string;
  paymentMethod: string;
  deliveryAddress: string;
  deliveryType: 'pickup' | 'delivery';
  address?: OrderAddress;
}
