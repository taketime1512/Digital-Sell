export interface ArtPiece {
  id: number;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface PurchaseRequest {
  artId: number;
  artTitle: string;
  price: number;
  customerName: string;
  customerEmail: string;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  confirmationNote?: string;
}