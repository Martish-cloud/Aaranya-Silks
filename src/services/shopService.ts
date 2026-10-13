import type { User, Order, PaymentStatus, PaymentMethod, CartItem, DeliveryAddress, OrderEvent } from '../types';

const USER_SESSION_KEY = 'aaranya_silks_user_session_v1';
const ORDERS_STORAGE_KEY = 'aaranya_silks_orders_v1';

// Default initial demo user if needed
export const DEFAULT_DEMO_USER: User = {
  id: 'usr_radhika_01',
  name: 'Radhika S. Rao',
  email: 'radhika.rao@example.com',
  phone: '+91 98450 12890',
  isEmailVerified: true,
  isPhoneVerified: true,
  savedAddresses: [
    {
      id: 'addr_01',
      name: 'Radhika S. Rao',
      phone: '+91 98450 12890',
      address: '42, Lavelle Road, Shanthala Nagar',
      apartment: 'Apartment 4B, Regency Court',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
    },
  ],
  createdAt: new Date().toISOString(),
};

// -------------------------------------------------------------
// Authentication Service
// -------------------------------------------------------------
export interface OtpSession {
  target: string;
  type: 'email' | 'mobile';
  code: string;
  expiresAt: number;
  attemptsLeft: number;
}

let activeOtpSession: OtpSession | null = null;

export const shopService = {
  // Get active session
  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(USER_SESSION_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    return null;
  },

  // Save session
  setCurrentUser(user: User | null) {
    try {
      if (user) {
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_SESSION_KEY);
      }
    } catch {
      // ignore
    }
  },

  // Initiate OTP Request for Email or Mobile
  requestOtp(target: string, type: 'email' | 'mobile'): { success: boolean; message: string; demoCode?: string } {
    const cleanTarget = target.trim();

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanTarget)) {
        return { success: false, message: 'Please enter a valid email address.' };
      }
    } else {
      // Indian mobile format: optional +91 and 10 digits
      const digits = cleanTarget.replace(/\D/g, '');
      if (digits.length < 10) {
        return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
      }
    }

    // Generate simulated 6-digit OTP
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    activeOtpSession = {
      target: cleanTarget,
      type,
      code: generatedCode,
      expiresAt,
      attemptsLeft: 3,
    };

    return {
      success: true,
      message: `A 6-digit verification code has been dispatched to ${cleanTarget}.`,
      demoCode: generatedCode, // Exposed for simulated demo convenience
    };
  },

  // Verify OTP
  verifyOtp(code: string, targetName?: string): { success: boolean; user?: User; message: string } {
    const inputCode = code.trim();

    if (!activeOtpSession) {
      // Fallback for demo convenience: accept 123456 or 6-digit code
      if (inputCode.length === 6) {
        const dummyUser: User = {
          id: `usr_${Date.now()}`,
          name: targetName || 'Aaranya Patron',
          email: 'patron@aaranyasilks.com',
          phone: '+91 98450 12890',
          isEmailVerified: true,
          isPhoneVerified: true,
          savedAddresses: [],
          createdAt: new Date().toISOString(),
        };
        shopService.setCurrentUser(dummyUser);
        return { success: true, user: dummyUser, message: 'Verification successful. Welcome to Aaranya Silks.' };
      }
      return { success: false, message: 'No active OTP verification session found. Please request a new code.' };
    }

    if (Date.now() > activeOtpSession.expiresAt) {
      activeOtpSession = null;
      return { success: false, message: 'Verification code has expired. Please request a new code.' };
    }

    // Master test code or generated code
    if (inputCode === activeOtpSession.code || inputCode === '123456' || inputCode === '888888') {
      const isEmail = activeOtpSession.type === 'email';
      const existingUser = shopService.getCurrentUser();

      const user: User = existingUser
        ? {
            ...existingUser,
            ...(isEmail ? { email: activeOtpSession.target, isEmailVerified: true } : { phone: activeOtpSession.target, isPhoneVerified: true }),
            name: targetName || existingUser.name || 'Aaranya Patron',
          }
        : {
            id: `usr_${Date.now().toString(36)}`,
            name: targetName || 'Aaranya Patron',
            email: isEmail ? activeOtpSession.target : `${activeOtpSession.target.replace(/\D/g, '')}@patron.aaranyasilks.com`,
            phone: isEmail ? '+91 98450 12890' : activeOtpSession.target,
            isEmailVerified: isEmail,
            isPhoneVerified: !isEmail,
            savedAddresses: [],
            createdAt: new Date().toISOString(),
          };

      shopService.setCurrentUser(user);
      activeOtpSession = null;
      return { success: true, user, message: 'Account verified successfully.' };
    }

    activeOtpSession.attemptsLeft -= 1;
    if (activeOtpSession.attemptsLeft <= 0) {
      activeOtpSession = null;
      return { success: false, message: 'Too many incorrect attempts. Please request a new verification code.' };
    }

    return {
      success: false,
      message: `Incorrect code. ${activeOtpSession.attemptsLeft} attempt(s) remaining.`,
    };
  },

  // -----------------------------------------------------------
  // Orders & Persistent Storage
  // -----------------------------------------------------------
  getAllOrders(): Order[] {
    try {
      const data = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }

    // Default seeded order for demonstration if empty
    const seedOrder: Order = {
      id: 'AS-2026-782410',
      userId: 'usr_radhika_01',
      customerName: 'Radhika S. Rao',
      customerEmail: 'radhika.rao@example.com',
      customerPhone: '+91 98450 12890',
      items: [
        {
          product: {
            id: 'mayurakshi-kanjivaram',
            name: 'Mayurakshi Kanjivaram Bridal Silk Saree',
            slug: 'mayurakshi-kanjivaram-bridal-silk-saree',
            tagline: 'Auspicious temple borders woven in authentic gold zari',
            category: 'Bridal Sarees',
            fabric: 'Kanjivaram Silk',
            color: 'Auspicious Emerald',
            colors: [],
            price: 78500,
            originalPrice: 92000,
            rating: 5.0,
            reviewCount: 38,
            images: ['/assets/Mayurakshi Kanjivaram Bridal Silk Saree (Auspicious Emerald)-CcxVMa80.png'],
            description: 'Handwoven in pure mulberry silk with real gold zari temple borders.',
            weaveDetail: 'Korvai Technique',
            zariType: 'Real Tested Zari',
            palluDetail: 'Peacock & Mayil motifs',
            blouseIncluded: true,
            blouseDetails: 'Matching unstitched brocade blouse piece',
            sareeLength: '5.5m + 0.8m Blouse',
            careInstructions: ['Dry Clean Only'],
            occasions: ['Bridal', 'Muhurtham'],
            inStock: true,
          },
          selectedColor: 'Auspicious Emerald',
          quantity: 1,
          includeGiftBox: true,
        },
      ],
      shippingAddress: {
        id: 'addr_seed',
        name: 'Radhika S. Rao',
        phone: '+91 98450 12890',
        address: '42, Lavelle Road, Shanthala Nagar',
        apartment: 'Apartment 4B, Regency Court',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
      },
      orderStatus: 'In Transit',
      paymentStatus: 'Demo Payment Successful',
      paymentMethod: 'demo_online',
      subtotal: 78500,
      discount: 15700,
      gst: 11304,
      shippingFee: 0,
      total: 74104,
      estimatedDelivery: 'Tomorrow, by 6:00 PM',
      trackingNumber: 'BLR-EXP-2026-9912',
      createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
      events: [
        {
          stage: 'Order Placed',
          timestamp: new Date(Date.now() - 28 * 3600 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Order placed and authenticated through digital checkout.',
          completed: true,
          isSimulated: true,
        },
        {
          stage: 'Order Confirmed',
          timestamp: new Date(Date.now() - 27 * 3600 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Payment authorized and verified in demo mode.',
          completed: true,
          isSimulated: true,
        },
        {
          stage: 'Preparing Your Saree',
          timestamp: new Date(Date.now() - 24 * 3600 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Handloom master inspecting weave and real zari borders.',
          completed: true,
          isSimulated: true,
        },
        {
          stage: 'Quality Check',
          timestamp: new Date(Date.now() - 18 * 3600 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Silk Mark verification & zari purity audit certified.',
          completed: true,
          isSimulated: true,
        },
        {
          stage: 'Packed',
          timestamp: new Date(Date.now() - 12 * 3600 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Enclosed in archival keepsake wooden chest with muslin shroud.',
          completed: true,
          isSimulated: true,
        },
        {
          stage: 'Handed to Courier',
          timestamp: new Date(Date.now() - 6 * 3600 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Dispatched via BlueDart Luxury Secure Air Carrier.',
          completed: true,
          isSimulated: true,
        },
        {
          stage: 'In Transit',
          timestamp: new Date(Date.now() - 2 * 3600 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Departed Bengaluru Sorting Facility to City Hub.',
          completed: true,
          isSimulated: true,
        },
        {
          stage: 'Out for Delivery',
          timestamp: '',
          description: 'Scheduled with designated executive with insured passcode handoff.',
          completed: false,
          isSimulated: true,
        },
        {
          stage: 'Delivered',
          timestamp: '',
          description: 'Delivered to recipient with digital signature confirmation.',
          completed: false,
          isSimulated: true,
        },
      ],
    };

    shopService.saveOrders([seedOrder]);
    return [seedOrder];
  },

  saveOrders(orders: Order[]) {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  },

  getOrderById(id: string): Order | undefined {
    const orders = shopService.getAllOrders();
    return orders.find((o) => o.id === id);
  },

  // Create a brand new order
  createOrder(payload: {
    items: CartItem[];
    shippingAddress: DeliveryAddress;
    paymentMethod: PaymentMethod;
    subtotal: number;
    discount: number;
    gst?: number;
    shippingFee: number;
    user?: User | null;
  }): Order {
    const user = payload.user || shopService.getCurrentUser();
    const orderId = `AS-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `AR-${payload.shippingAddress.pincode}-${Math.floor(1000 + Math.random() * 9000)}`;

    const paymentStatus: PaymentStatus =
      payload.paymentMethod === 'cod' ? 'Pay on Delivery' : 'Demo Payment Successful';

    const now = new Date();
    const initialEvents: OrderEvent[] = [
      {
        stage: 'Order Placed',
        timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: 'Order registered successfully through Aaranya Silks checkout.',
        completed: true,
        isSimulated: true,
      },
      {
        stage: 'Order Confirmed',
        timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description:
          payload.paymentMethod === 'cod'
            ? 'Cash on Delivery confirmed. Ready for preparation.'
            : 'Simulated online payment completed in Demo Mode. Zero real funds charged.',
        completed: true,
        isSimulated: true,
      },
      {
        stage: 'Preparing Your Saree',
        timestamp: '',
        description: 'Master artisan will inspect handloom folds and authentic zari borders.',
        completed: false,
        isSimulated: true,
      },
      {
        stage: 'Quality Check',
        timestamp: '',
        description: 'Silk Mark certification and real zari testing verification.',
        completed: false,
        isSimulated: true,
      },
      {
        stage: 'Packed',
        timestamp: '',
        description: 'Bespoke archival packaging with scented cedar flakes and muslin wrap.',
        completed: false,
        isSimulated: true,
      },
      {
        stage: 'Handed to Courier',
        timestamp: '',
        description: 'Handed over to insured high-value parcel logistics partner.',
        completed: false,
        isSimulated: true,
      },
      {
        stage: 'In Transit',
        timestamp: '',
        description: 'En route between regional distribution hubs.',
        completed: false,
        isSimulated: true,
      },
      {
        stage: 'Out for Delivery',
        timestamp: '',
        description: 'Out for doorstep delivery with OTP verification.',
        completed: false,
        isSimulated: true,
      },
      {
        stage: 'Delivered',
        timestamp: '',
        description: 'Delivered into the patron’s care.',
        completed: false,
        isSimulated: true,
      },
    ];

    const taxable = Math.max(0, payload.subtotal - payload.discount);
    const gstAmount = payload.gst !== undefined ? payload.gst : Math.round(taxable * 0.18);
    const totalPayable = taxable + gstAmount + payload.shippingFee;

    const order: Order = {
      id: orderId,
      userId: user ? user.id : 'guest',
      customerName: payload.shippingAddress.name,
      customerEmail: user ? user.email : 'patron@aaranyasilks.com',
      customerPhone: payload.shippingAddress.phone,
      items: payload.items,
      shippingAddress: payload.shippingAddress,
      orderStatus: 'Order Confirmed',
      paymentStatus,
      paymentMethod: payload.paymentMethod,
      subtotal: payload.subtotal,
      discount: payload.discount,
      gst: gstAmount,
      shippingFee: payload.shippingFee,
      total: totalPayable,
      events: initialEvents,
      estimatedDelivery: '3 to 4 business days',
      trackingNumber,
      createdAt: now.toISOString(),
    };

    const existingOrders = shopService.getAllOrders();
    const updated = [order, ...existingOrders];
    shopService.saveOrders(updated);

    return order;
  },

  // Advance stage for demo simulation
  advanceOrderStage(orderId: string): Order | null {
    const orders = shopService.getAllOrders();
    const orderIndex = orders.findIndex((o) => o.id === orderId);
    if (orderIndex === -1) return null;

    const order = { ...orders[orderIndex] };
    const nextUncompletedIdx = order.events.findIndex((e) => !e.completed);

    if (nextUncompletedIdx !== -1) {
      order.events = order.events.map((e, idx) => {
        if (idx === nextUncompletedIdx) {
          return {
            ...e,
            completed: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        }
        return e;
      });

      order.orderStatus = order.events[nextUncompletedIdx].stage;
      orders[orderIndex] = order;
      shopService.saveOrders(orders);
    }

    return order;
  },
};
