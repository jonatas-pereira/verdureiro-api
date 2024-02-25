export interface CreateReservationDTO{
    name: string;
    email: string;
    address: string;
    quantityReservation: number;
    totalPrice: number;
    productId: string;
    active: boolean;
    contact: string;
}
  