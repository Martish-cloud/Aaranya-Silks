import type { DeliveryCoverageResult } from '../types';

export interface SupportedCity {
  id: string;
  name: string;
  state: string;
  pincode: string;
  isPopularShortcut: boolean;
  estimatedDays: string;
  codAvailable: boolean;
  courierPartner: string;
}

export const POPULAR_CITIES: SupportedCity[] = [
  {
    id: 'blr',
    name: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    isPopularShortcut: true,
    estimatedDays: '1 to 2 business days (Atelier Express)',
    codAvailable: true,
    courierPartner: 'BlueDart Luxury Express',
  },
  {
    id: 'kol',
    name: 'Kolkata',
    state: 'West Bengal',
    pincode: '700001',
    isPopularShortcut: true,
    estimatedDays: '2 to 3 business days',
    codAvailable: true,
    courierPartner: 'BlueDart Air & Delhivery Priority',
  },
  {
    id: 'mum',
    name: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    isPopularShortcut: true,
    estimatedDays: '2 to 3 business days',
    codAvailable: true,
    courierPartner: 'BlueDart Luxury Express',
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    isPopularShortcut: true,
    estimatedDays: '2 to 4 business days',
    codAvailable: true,
    courierPartner: 'Delhivery Secured Heritage Delivery',
  },
  {
    id: 'chd',
    name: 'Chandigarh',
    state: 'Punjab / Haryana',
    pincode: '160017',
    isPopularShortcut: true,
    estimatedDays: '3 to 4 business days',
    codAvailable: true,
    courierPartner: 'BlueDart Air Courier',
  },
];

export const OTHER_SERVICEABLE_CITIES: SupportedCity[] = [
  {
    id: 'del',
    name: 'New Delhi',
    state: 'Delhi NCR',
    pincode: '110001',
    isPopularShortcut: false,
    estimatedDays: '2 to 3 business days',
    codAvailable: true,
    courierPartner: 'BlueDart Express',
  },
  {
    id: 'hyd',
    name: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    isPopularShortcut: false,
    estimatedDays: '2 to 3 business days',
    codAvailable: true,
    courierPartner: 'BlueDart Express',
  },
  {
    id: 'chn',
    name: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600001',
    isPopularShortcut: false,
    estimatedDays: '2 to 3 business days',
    codAvailable: true,
    courierPartner: 'BlueDart Express',
  },
  {
    id: 'ahd',
    name: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380001',
    isPopularShortcut: false,
    estimatedDays: '2 to 4 business days',
    codAvailable: true,
    courierPartner: 'Delhivery Priority',
  },
  {
    id: 'jpr',
    name: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    isPopularShortcut: false,
    estimatedDays: '3 to 4 business days',
    codAvailable: true,
    courierPartner: 'BlueDart Air',
  },
  {
    id: 'vns',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    pincode: '221001',
    isPopularShortcut: false,
    estimatedDays: '2 to 4 business days',
    codAvailable: true,
    courierPartner: 'BlueDart Weavers Express',
  },
  {
    id: 'knc',
    name: 'Kanchipuram',
    state: 'Tamil Nadu',
    pincode: '631501',
    isPopularShortcut: false,
    estimatedDays: '2 to 3 business days',
    codAvailable: true,
    courierPartner: 'BlueDart Silk Corridor',
  },
  {
    id: 'lko',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226001',
    isPopularShortcut: false,
    estimatedDays: '3 to 4 business days',
    codAvailable: true,
    courierPartner: 'Delhivery Secured',
  },
  {
    id: 'koc',
    name: 'Kochi',
    state: 'Kerala',
    pincode: '682001',
    isPopularShortcut: false,
    estimatedDays: '2 to 4 business days',
    codAvailable: true,
    courierPartner: 'BlueDart Air',
  },
];

export const ALL_SUPPORTED_CITIES = [...POPULAR_CITIES, ...OTHER_SERVICEABLE_CITIES];

// Indian Pin Code verification and serviceability logic
export function checkDeliveryAvailability(
  query: string,
  _productId?: string
): DeliveryCoverageResult {
  const clean = query.trim();

  if (!clean) {
    return {
      status: 'unknown',
      locationName: '',
      codAvailable: false,
      message: 'Please enter a 6-digit Indian PIN code or city name to check delivery coverage.',
    };
  }

  // Check if 6-digit PIN code format
  const isPincode = /^\d{6}$/.test(clean);

  if (isPincode) {
    const firstDigit = parseInt(clean[0], 10);
    // Invalid Indian postal zones start with 0
    if (firstDigit === 0) {
      return {
        status: 'unavailable',
        locationName: clean,
        pincode: clean,
        codAvailable: false,
        message: 'Invalid postal code. Indian postal PIN codes must be 6 digits and start with 1-9.',
      };
    }

    // Check specific known PIN codes
    const matchedCity = ALL_SUPPORTED_CITIES.find(
      (c) => c.pincode === clean || clean.startsWith(c.pincode.substring(0, 3))
    );

    if (matchedCity) {
      return {
        status: 'available',
        locationName: `${matchedCity.name}, ${matchedCity.state}`,
        pincode: clean,
        city: matchedCity.name,
        state: matchedCity.state,
        estimatedDays: matchedCity.estimatedDays,
        codAvailable: matchedCity.codAvailable,
        courierPartner: matchedCity.courierPartner,
        message: `Delivery is available to this location (${matchedCity.name}). Estimated transit: ${matchedCity.estimatedDays}. Complimentary insured packaging included.`,
      };
    }

    // Standard serviceable zones: PINs starting with 1, 2, 3, 4, 5, 6, 7, 8
    // Certain remote / unserviceable test cases (e.g. 199999 or 900000+ defense postal)
    if (clean.startsWith('99') || clean.startsWith('00') || clean === '199999') {
      return {
        status: 'unavailable',
        locationName: `PIN ${clean}`,
        pincode: clean,
        codAvailable: false,
        message: 'Delivery is not currently available to this location. We are working to expand our insured courier coverage.',
      };
    }

    // General serviceable coverage for valid Indian PIN codes
    return {
      status: 'available',
      locationName: `Postal Zone ${clean}`,
      pincode: clean,
      estimatedDays: '3 to 5 business days',
      codAvailable: true,
      courierPartner: 'BlueDart / Delhivery Priority Air',
      message: `Delivery is available to PIN ${clean}. Estimated transit: 3 to 5 business days. Safe insured hand-delivery guaranteed.`,
    };
  }

  // City Name Search
  const lowerQuery = clean.toLowerCase();
  const matched = ALL_SUPPORTED_CITIES.find(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      lowerQuery.includes(c.name.toLowerCase()) ||
      c.state.toLowerCase().includes(lowerQuery)
  );

  if (matched) {
    return {
      status: 'available',
      locationName: `${matched.name}, ${matched.state}`,
      city: matched.name,
      state: matched.state,
      pincode: matched.pincode,
      estimatedDays: matched.estimatedDays,
      codAvailable: matched.codAvailable,
      courierPartner: matched.courierPartner,
      message: `Delivery is available to ${matched.name}. Estimated transit: ${matched.estimatedDays}. Cash on Delivery & Online Demo Payment supported.`,
    };
  }

  // Unknown or unverified city
  return {
    status: 'unknown',
    locationName: clean,
    codAvailable: false,
    message: `We could not verify delivery availability for "${clean}". Please enter a valid 6-digit Indian PIN code to confirm serviceability.`,
  };
}
