export interface SareeColor {
  name: string;
  hex: string;
  image: string;
}

export interface Saree {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: 'Silk Sarees' | 'Banarasi Sarees' | 'Kanjivaram Sarees' | 'Organza Sarees' | 'Designer Sarees' | 'Bridal Sarees' | 'Party Wear Sarees' | 'Festive Sarees';
  fabric: 'Pure Katan Silk' | 'Kanjivaram Silk' | 'Banarasi Brocade' | 'Pure Organza' | 'Chanderi Silk' | 'Tussar Georgette' | 'Tissue Silk';
  color: string;
  colors: SareeColor[];
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  badge?: 'New Arrival' | 'Bestseller' | 'Heirloom Piece' | 'Handwoven Exclusive' | 'Bridal Masterpiece' | string;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  weaveDetail: string;
  zariType: string;
  palluDetail: string;
  blouseIncluded: boolean;
  blouseDetails: string;
  sareeLength: string;
  careInstructions: string[];
  occasions: ('Bridal' | 'Wedding Guest' | 'Festive' | 'Reception' | 'Sangeet' | 'Cocktail' | 'Puja & Rituals' | 'Party Wear' | string)[];
  inStock: boolean;
  featured?: boolean;
  trending?: boolean;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  highlight: string;
}

export interface CartItem {
  product: Saree;
  selectedColor: string;
  quantity: number;
  includeGiftBox?: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  sareePurchased: string;
  occasion: string;
}

export interface FilterOptions {
  categories: string[];
  fabrics: string[];
  colors: string[];
  occasions: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  searchQuery: string;
}

export interface CheckoutFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'demo_online' | 'upi' | 'card' | 'netbanking';
  giftNote?: string;
}

export interface DeliveryCoverageResult {
  status: 'available' | 'unavailable' | 'unknown';
  locationName: string;
  pincode?: string;
  city?: string;
  state?: string;
  estimatedDays?: string;
  codAvailable: boolean;
  message: string;
  courierPartner?: string;
}

export interface DeliveryAddress {
  id: string;
  name: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  savedAddresses: DeliveryAddress[];
  createdAt: string;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Order Confirmed'
  | 'Preparing Your Saree'
  | 'Quality Check'
  | 'Packed'
  | 'Handed to Courier'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus =
  | 'Pay on Delivery'
  | 'Demo Payment Pending'
  | 'Demo Payment Successful'
  | 'Failed';

export type PaymentMethod = 'cod' | 'demo_online';

export interface OrderEvent {
  stage: OrderStatus;
  timestamp: string;
  description: string;
  completed: boolean;
  isSimulated: boolean;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  shippingAddress: DeliveryAddress;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  gst?: number;
  shippingFee: number;
  total: number;
  events: OrderEvent[];
  estimatedDelivery: string;
  trackingNumber: string;
  createdAt: string;
}

