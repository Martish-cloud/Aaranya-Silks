// Aaranya Silks - Complete Integrated Outfits Catalog
// All outfit images organized across 36 unique products with multi-angle galleries

export interface OutfitProduct {
  id: string;
  name: string;
  slug: string;
  category: 'Sarees' | 'Crop Tops' | 'Babycon Dresses' | 'Blouses' | 'One Shoulder Tops';
  categorySlug: 'sarees' | 'crop-tops' | 'babycon-dresses' | 'blouses' | 'one-shoulder-tops';
  price: number;
  originalPrice: number;
  discountBadge: string;
  badge: string;
  fabric: string;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  gallery: string[];
  originalGallery: string[];
  inStock: boolean;
}

import userProductImage from '../assets/user-product-image.png';

// Dynamic asset loading via Vite import.meta.glob
const optImages = import.meta.glob<{ default: string }>('../assets/outfits_optimized/**/*.{webp,png,jpg,jpeg,jfif}', { eager: true });
const origImages = import.meta.glob<{ default: string }>([
  '../assets/Outfits/**/*.{webp,png,jpg,jpeg,jfif}',
  '../assets/Outfits Check/**/*.{webp,png,jpg,jpeg,jfif}',
  '../assets/Need to Add/**/*.{webp,png,jpg,jpeg,jfif}',
  '../assets/Shop All Sarees/**/*.{webp,png,jpg,jpeg,jfif}'
], { eager: true });

export function resolveOptImage(relPath: string): string {
  if (!relPath) return userProductImage;
  const key = `../assets/outfits_optimized/${relPath}`;
  if (optImages[key]) return optImages[key].default;
  const origKey = `../assets/Outfits/${relPath}`;
  if (origImages[origKey]) return origImages[origKey].default;
  const checkKey = `../assets/Outfits Check/${relPath}`;
  if (origImages[checkKey]) return origImages[checkKey].default;

  // Extension-flexible lookup:
  const lastDot = relPath.lastIndexOf('.');
  const baseNoExt = lastDot > 0 ? relPath.substring(0, lastDot) : relPath;
  for (const k in optImages) {
    const kDot = k.lastIndexOf('.');
    const kBase = kDot > 0 ? k.substring(0, kDot) : k;
    if (kBase.endsWith('/' + baseNoExt)) return optImages[k].default;
  }
  for (const k in origImages) {
    const kDot = k.lastIndexOf('.');
    const kBase = kDot > 0 ? k.substring(0, kDot) : k;
    if (kBase.endsWith('/' + baseNoExt)) return origImages[k].default;
  }

  // Filename lookup:
  const filename = relPath.split('/').pop() || '';
  const fDot = filename.lastIndexOf('.');
  const fBase = fDot > 0 ? filename.substring(0, fDot) : filename;
  for (const k in optImages) {
    if (k.includes(fBase)) return optImages[k].default;
  }
  for (const k in origImages) {
    if (k.includes(fBase)) return origImages[k].default;
  }

  return userProductImage;
}

export function resolveOrigImage(relPath: string): string {
  if (!relPath) return userProductImage;
  const key = `../assets/Outfits/${relPath}`;
  if (origImages[key]) return origImages[key].default;
  const checkKey = `../assets/Outfits Check/${relPath}`;
  if (origImages[checkKey]) return origImages[checkKey].default;
  return resolveOptImage(relPath);
}

export const OUTFIT_CATEGORIES = [
  { id: 'all', name: 'All Outfits', slug: 'all' },
  { id: 'sarees', name: 'Sarees', slug: 'sarees' },
  { id: 'babycon-dresses', name: 'Babycon Dresses', slug: 'babycon-dresses' },
  { id: 'blouses', name: 'Blouses', slug: 'blouses' },
  { id: 'crop-tops', name: 'Crop Tops', slug: 'crop-tops' },
  { id: 'one-shoulder-tops', name: 'One Shoulder Tops', slug: 'one-shoulder-tops' }
] as const;

// Duplicate handling audit log as requested
export const DUPLICATE_IMAGES_AUDIT = [
  {
    category: 'Babycon Mini-Dress',
    primaryImage: 'Babycon C (1).jpeg',
    duplicateImage: 'Babycon C (2).jpeg',
    status: 'Identical visual frame & angle detected (diff=1.50). Retained Babycon C (1) & (3) in gallery, deduplicated (2) to avoid repetition.',
  },
  {
    category: 'Sarees Section',
    primaryImage: 'Colorful Saree (1).jfif',
    duplicateImage: 'Colorful Saree (2).png',
    status: 'Identical visual frame in alternate file extension (diff=2.29). Retained Colorful Saree (1), (3), (4) in gallery, deduplicated (2) to avoid repetition.',
  }
];

interface RawProductDef {
  id: string;
  name: string;
  slug: string;
  category: 'Sarees' | 'Crop Tops' | 'Babycon Dresses' | 'Blouses' | 'One Shoulder Tops';
  categorySlug: 'sarees' | 'crop-tops' | 'babycon-dresses' | 'blouses' | 'one-shoulder-tops';
  price: number;
  originalPrice: number;
  discountBadge: string;
  badge: string;
  fabric: string;
  rating: number;
  reviewCount: number;
  description: string;
  optFiles: string[];
  origFiles: string[];
}

const RAW_PRODUCTS: RawProductDef[] = [
  {
    "id": "outfit-babycon-01",
    "name": "Ros\u00e9 Champagne Satin Babycon Dress",
    "slug": "rose-champagne-satin-babycon-dress",
    "category": "Babycon Dresses",
    "categorySlug": "babycon-dresses",
    "price": 4890,
    "originalPrice": 6500,
    "discountBadge": "25% OFF",
    "badge": "Trending Silhouette",
    "fabric": "Duchess Satin Silk",
    "rating": 4.9,
    "reviewCount": 24,
    "description": "Tailored in lustrous champagne ros\u00e9 duchess satin, this modern babycon mini-dress combines sculpted architectural pleats with a body-contouring silhouette.",
    "optFiles": [
      "Babycon Mini-Dress/Babycon A (3).webp",
      "Babycon Mini-Dress/Babycon A (2).webp",
      "Babycon Mini-Dress/Babycon A (1).webp"
    ],
    "origFiles": [
      "Babycon Mini-Dress/Babycon A (3).jpeg",
      "Babycon Mini-Dress/Babycon A (2).jpeg",
      "Babycon Mini-Dress/Babycon A (1).jpeg"
    ]
  },
  {
    "id": "outfit-babycon-02",
    "name": "Noir Velvet Silhouette Babycon Dress",
    "slug": "noir-velvet-silhouette-babycon-dress",
    "category": "Babycon Dresses",
    "categorySlug": "babycon-dresses",
    "price": 5850,
    "originalPrice": 7800,
    "discountBadge": "25% OFF",
    "badge": "Night Gala Edit",
    "fabric": "Plush Noir Micro-Velvet",
    "rating": 4.95,
    "reviewCount": 38,
    "description": "Exquisite high-fashion cocktail dress in plush noir velvet featuring asymmetric panelling and refined neckline detailing for unforgettable evenings.",
    "optFiles": [
      "Babycon Mini-Dress/Babycon B (1).webp",
      "Babycon Mini-Dress/Babycon B (2).webp",
      "Babycon Mini-Dress/Babycon B (3).webp",
      "Babycon Mini-Dress/Babycon B (4).webp"
    ],
    "origFiles": [
      "Babycon Mini-Dress/Babycon B (1).jpeg",
      "Babycon Mini-Dress/Babycon B (2).jpeg",
      "Babycon Mini-Dress/Babycon B (3).jpeg",
      "Babycon Mini-Dress/Babycon B (4).jpeg"
    ]
  },
  {
    "id": "outfit-babycon-03",
    "name": "Emerald Corset Bodice Babycon Dress",
    "slug": "emerald-corset-bodice-babycon-dress",
    "category": "Babycon Dresses",
    "categorySlug": "babycon-dresses",
    "price": 5490,
    "originalPrice": 7200,
    "discountBadge": "24% OFF",
    "badge": "Editorial Choice",
    "fabric": "Raw Silk & Spandex Blend",
    "rating": 4.85,
    "reviewCount": 19,
    "description": "Regal emerald green mini-dress with structured corset boning, delicate front ruching, and a soft matte silk sheen.",
    "optFiles": [
      "Babycon Mini-Dress/Babycon C (1).webp",
      "Babycon Mini-Dress/Babycon C (3).webp"
    ],
    "origFiles": [
      "Babycon Mini-Dress/Babycon C (1).jpeg",
      "Babycon Mini-Dress/Babycon C (3).jpeg"
    ]
  },
  {
    "id": "outfit-babycon-04",
    "name": "Burgundy Drape Ruched Babycon Dress",
    "slug": "burgundy-drape-ruched-babycon-dress",
    "category": "Babycon Dresses",
    "categorySlug": "babycon-dresses",
    "price": 6280,
    "originalPrice": 8200,
    "discountBadge": "23% OFF",
    "badge": "Bestseller",
    "fabric": "Crepe Silk Stretch",
    "rating": 4.92,
    "reviewCount": 31,
    "description": "Deep maroon burgundy mini-dress with fluid cascading drape accents inspired by traditional saree pallu folds reimagined for modern cocktail galas.",
    "optFiles": [
      "Babycon Mini-Dress/Babycon D (1).webp",
      "Babycon Mini-Dress/Babycon D (2).webp",
      "Babycon Mini-Dress/Babycon D (3).webp"
    ],
    "origFiles": [
      "Babycon Mini-Dress/Babycon D (1).jpeg",
      "Babycon Mini-Dress/Babycon D (2).jpeg",
      "Babycon Mini-Dress/Babycon D (3).jpeg"
    ]
  },
  {
    "id": "outfit-babycon-05",
    "name": "Gilded Metallic Bronze Babycon Dress",
    "slug": "gilded-metallic-bronze-babycon-dress",
    "category": "Babycon Dresses",
    "categorySlug": "babycon-dresses",
    "price": 3950,
    "originalPrice": 5400,
    "discountBadge": "27% OFF",
    "badge": "Party Glamour",
    "fabric": "Metallic Lurex Tissue",
    "rating": 4.88,
    "reviewCount": 17,
    "description": "Glamorous party silhouette interwoven with fine metallic threads creating a radiant champagne bronze shimmer under ambient lighting.",
    "optFiles": [
      "Babycon Mini-Dress/Babycon E (1).webp",
      "Babycon Mini-Dress/Babycon E (2).webp"
    ],
    "origFiles": [
      "Babycon Mini-Dress/Babycon E (1).jpeg",
      "Babycon Mini-Dress/Babycon E (2).jpeg"
    ]
  },
  {
    "id": "outfit-blouse-01",
    "name": "Handcrafted Zari Backless Silk Blouse",
    "slug": "handcrafted-zari-backless-silk-blouse",
    "category": "Blouses",
    "categorySlug": "blouses",
    "price": 1850,
    "originalPrice": 2500,
    "discountBadge": "26% OFF",
    "badge": "Handcrafted Zari",
    "fabric": "Pure Raw Silk with Gold Zari",
    "rating": 4.94,
    "reviewCount": 42,
    "description": "Master artisan embroidered silk blouse featuring statement dori ties, intricate back cutouts, and pure gold zari floral threadwork.",
    "optFiles": [
      "Blouse/Blouse A(1).webp",
      "Blouse/Blouse A(2).webp",
      "Blouse/Blouse A(3).webp",
      "Blouse/Blouse A(4).webp"
    ],
    "origFiles": [
      "Blouse/Blouse A(1).jpeg",
      "Blouse/Blouse A(2).jpeg",
      "Blouse/Blouse A(3).jpeg",
      "Blouse/Blouse A(4).jpeg"
    ]
  },
  {
    "id": "outfit-blouse-02",
    "name": "Royal Plum Maggam Embroidery Bridal Blouse",
    "slug": "royal-plum-maggam-embroidery-bridal-blouse",
    "category": "Blouses",
    "categorySlug": "blouses",
    "price": 2320,
    "originalPrice": 3100,
    "discountBadge": "25% OFF",
    "badge": "Bridal Couture",
    "fabric": "Heavy Mulberry Silk",
    "rating": 4.96,
    "reviewCount": 35,
    "description": "Regal deep plum bridal blouse lavishly embellished with authentic South Indian Maggam needlework, pearls, and bullion wire embroidery.",
    "optFiles": [
      "Blouse/Blouse B (1).webp",
      "Blouse/Blouse B (2).webp",
      "Blouse/Blouse B (3).webp"
    ],
    "origFiles": [
      "Blouse/Blouse B (1).jpeg",
      "Blouse/Blouse B (2).jpeg",
      "Blouse/Blouse B (3).jpeg"
    ]
  },
  {
    "id": "outfit-blouse-03",
    "name": "Golden Brocade Sweetheart Neckline Blouse",
    "slug": "golden-brocade-sweetheart-neckline-blouse",
    "category": "Blouses",
    "categorySlug": "blouses",
    "price": 1480,
    "originalPrice": 2000,
    "discountBadge": "26% OFF",
    "badge": "Festive Essential",
    "fabric": "Banarasi Zari Brocade",
    "rating": 4.88,
    "reviewCount": 28,
    "description": "Versatile metallic gold brocade blouse tailored with an alluring sweetheart neckline, structured cups, and clean piping.",
    "optFiles": [
      "Blouse/Blouse D (1).webp",
      "Blouse/Blouse D (2).webp",
      "Blouse/Blouse D (3).webp"
    ],
    "origFiles": [
      "Blouse/Blouse D (1).jpeg",
      "Blouse/Blouse D (2).jpeg",
      "Blouse/Blouse D (3).jpeg"
    ]
  },
  {
    "id": "outfit-blouse-04",
    "name": "Emerald Velvet Mirror-Work Saree Blouse",
    "slug": "emerald-velvet-mirror-work-saree-blouse",
    "category": "Blouses",
    "categorySlug": "blouses",
    "price": 1980,
    "originalPrice": 2700,
    "discountBadge": "27% OFF",
    "badge": "Mirror Artisan",
    "fabric": "Micro Velvet & Foil Mirrors",
    "rating": 4.91,
    "reviewCount": 29,
    "description": "Rich jewel-toned emerald green velvet blouse encrusted with hand-stitched shisha mirror motifs and delicate golden beads.",
    "optFiles": [
      "Blouse/Blouse E (2).webp",
      "Blouse/Blouse E (1).webp",
      "Blouse/Blouse E (3).webp"
    ],
    "origFiles": [
      "Blouse/Blouse E (2).jpeg",
      "Blouse/Blouse E (1).jpeg",
      "Blouse/Blouse E (3).jpeg"
    ]
  },
  {
    "id": "outfit-blouse-05",
    "name": "Crimson Kanjeevaram Sleeve Blouse",
    "slug": "crimson-kanjeevaram-sleeve-blouse",
    "category": "Blouses",
    "categorySlug": "blouses",
    "price": 2250,
    "originalPrice": 3000,
    "discountBadge": "25% OFF",
    "badge": "Temple Zari",
    "fabric": "Pure Crimson Silk",
    "rating": 4.93,
    "reviewCount": 33,
    "description": "Auspicious red silk blouse adorned with Korvai temple border sleeve cuffs, intricate hand aari embroidery, and scalloped hemline.",
    "optFiles": [
      "Blouse/Blouse F (2).webp",
      "Blouse/Blouse F (1).webp",
      "Blouse/Blouse F (3).webp"
    ],
    "origFiles": [
      "Blouse/Blouse F (2).jpeg",
      "Blouse/Blouse F (1).jpeg",
      "Blouse/Blouse F (3).jpeg"
    ]
  },
  {
    "id": "outfit-blouse-06",
    "name": "Vintage Full Sleeve Hand-Embroidered Blouse",
    "slug": "vintage-full-sleeve-hand-embroidered-blouse",
    "category": "Blouses",
    "categorySlug": "blouses",
    "price": 2150,
    "originalPrice": 2900,
    "discountBadge": "26% OFF",
    "badge": "Royal Vintage",
    "fabric": "Matte Katan Silk",
    "rating": 4.9,
    "reviewCount": 21,
    "description": "Classic high-neck full-sleeve blouse with sheer sleeve motifs and intricate artisanal cuff embellishments.",
    "optFiles": [
      "Blouse/Full Blouse  (1).webp",
      "Blouse/Full Blouse  (2).webp",
      "Blouse/Full Blouse  (3).webp"
    ],
    "origFiles": [
      "Blouse/Full Blouse  (1).jpeg",
      "Blouse/Full Blouse  (2).jpeg",
      "Blouse/Full Blouse  (3).jpeg"
    ]
  },
  {
    "id": "outfit-blouse-07",
    "name": "Classic Half Sleeve Pure Silk Zari Blouse",
    "slug": "classic-half-sleeve-pure-silk-zari-blouse",
    "category": "Blouses",
    "categorySlug": "blouses",
    "price": 1350,
    "originalPrice": 1800,
    "discountBadge": "25% OFF",
    "badge": "Everyday Elegance",
    "fabric": "Mulberry Silk",
    "rating": 4.87,
    "reviewCount": 26,
    "description": "Timeless elbow-length sleeve saree blouse featuring contrast golden zari border bands and premium cotton lining.",
    "optFiles": [
      "Blouse/Half Sleeve Blouse (1).webp",
      "Blouse/Half Sleeve Blouse (2).webp",
      "Blouse/Half Sleeve Blouse (3).webp"
    ],
    "origFiles": [
      "Blouse/Half Sleeve Blouse (1).jpeg",
      "Blouse/Half Sleeve Blouse (2).jpeg",
      "Blouse/Half Sleeve Blouse (3).jpeg"
    ]
  },
  {
    "id": "outfit-croptop-01",
    "name": "Top & Jeans Pair",
    "slug": "top-and-jeans-pair",
    "category": "Crop Tops",
    "categorySlug": "crop-tops",
    "price": 3890,
    "originalPrice": 5200,
    "discountBadge": "25% OFF",
    "badge": "Contemporary Set",
    "fabric": "Tailored Ribbed Top & Structured Jeans",
    "rating": 4.92,
    "reviewCount": 27,
    "description": "Chic contemporary top and structured jeans ensemble featuring versatile tailoring and modern street-luxe elegance.",
    "optFiles": [
      "Top & Jeans Pair/Image (1).jpeg",
      "Top & Jeans Pair/Image (2).png",
      "Top & Jeans Pair/Image (3).png"
    ],
    "origFiles": [
      "Top & Jeans Pair/Image (1).jpeg",
      "Top & Jeans Pair/Image (2).png",
      "Top & Jeans Pair/Image (3).png"
    ]
  },
  {
    "id": "outfit-croptop-02",
    "name": "Top & Jeans Pair 2",
    "slug": "top-and-jeans-pair-2",
    "category": "Crop Tops",
    "categorySlug": "crop-tops",
    "price": 4290,
    "originalPrice": 5800,
    "discountBadge": "26% OFF",
    "badge": "Festive Edit",
    "fabric": "High-Twist Silk Blend & Premium Denim",
    "rating": 4.95,
    "reviewCount": 31,
    "description": "Sophisticated modern silhouette uniting a sculpted designer top with tailored straight-fit denim trousers.",
    "optFiles": [
      "Top & Jeans Pair 2/image (4).jpeg",
      "Top & Jeans Pair 2/ChatGPT Image Sep 30, 2026, 06_39_27 AM.png",
      "Top & Jeans Pair 2/ChatGPT Image Sep 30, 2026, 06_36_43 AM.png"
    ],
    "origFiles": [
      "Top & Jeans Pair 2/image (4).jpeg",
      "Top & Jeans Pair 2/ChatGPT Image Sep 30, 2026, 06_39_27 AM.png",
      "Top & Jeans Pair 2/ChatGPT Image Sep 30, 2026, 06_36_43 AM.png"
    ]
  },
  {
    "id": "outfit-top-01",
    "name": "Asymmetrical One-Shoulder Silk Fusion Kurta",
    "slug": "asymmetrical-one-shoulder-silk-fusion-kurta",
    "category": "One Shoulder Tops",
    "categorySlug": "one-shoulder-tops",
    "price": 3150,
    "originalPrice": 4200,
    "discountBadge": "25% OFF",
    "badge": "Fusion Statement",
    "fabric": "Tussar Silk with Cutwork Zari",
    "rating": 4.94,
    "reviewCount": 22,
    "description": "Striking one-shoulder silhouette fusing Indian handloom drape elements with dramatic runway asymmetry and gold metallic accents.",
    "optFiles": [
      "One Shoulder Tops/Kurta A (3).webp",
      "One Shoulder Tops/Kurta A (2).webp",
      "One Shoulder Tops/Kurta A (1).webp",
      "One Shoulder Tops/Kurta A (4).webp"
    ],
    "origFiles": [
      "One Shoulder Tops/Kurta A (3).jpeg",
      "One Shoulder Tops/Kurta A (2).jpeg",
      "One Shoulder Tops/Kurta A (1).jpeg",
      "One Shoulder Tops/Kurta A (4).jpeg"
    ]
  },
  {
    "id": "outfit-saree-01",
    "name": "Varanasi Noor Kadhwa Banarasi Brocade Saree",
    "slug": "varanasi-noor-kadhwa-banarasi-brocade-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 23500,
    "originalPrice": 28000,
    "discountBadge": "16% OFF",
    "badge": "Heirloom Masterpiece",
    "fabric": "Pure Katan Silk & Antique Zari",
    "rating": 4.96,
    "reviewCount": 48,
    "description": "Exquisite antique gold floral bootis meticulously hand-woven in pure Katan silk across 120 artisan loom hours.",
    "optFiles": [
      "Sarees Section/Banarasi Sarees.webp",
      "Sarees Section/Banarasi Sarees 2.webp"
    ],
    "origFiles": [
      "Sarees Section/Banarasi Sarees.jfif",
      "Sarees Section/Banarasi Sarees 2.jfif"
    ]
  },
  {
    "id": "outfit-saree-02",
    "name": "Royal Crimson Trousseau Bridal Saree",
    "slug": "royal-crimson-trousseau-bridal-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 27450,
    "originalPrice": 33000,
    "discountBadge": "17% OFF",
    "badge": "Bridal Masterpiece",
    "fabric": "3-Ply Mulberry Silk with Pure Gold Zari",
    "rating": 4.98,
    "reviewCount": 54,
    "description": "Opulent bridal red heirloom saree adorned with intricate temple Korvai borders, peacock motifs, and a majestic contrast zari pallu.",
    "optFiles": [
      "Sarees Section/Bridal Saree 2.webp",
      "Sarees Section/Bridal Saree 3.webp",
      "Sarees Section/Bridal Saree 4.webp"
    ],
    "origFiles": [
      "Sarees Section/Bridal Saree 2.jfif",
      "Sarees Section/Bridal Saree 3.png",
      "Sarees Section/Bridal Saree 4.png"
    ]
  },
  {
    "id": "outfit-saree-03",
    "name": "Rani Vasant Multi-Color Festive Silk Saree",
    "slug": "rani-vasant-multi-color-festive-silk-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 17900,
    "originalPrice": 21500,
    "discountBadge": "17% OFF",
    "badge": "Festive Splendor",
    "fabric": "Vibrant Mashroo Handloom Silk",
    "rating": 4.91,
    "reviewCount": 36,
    "description": "Captivating rainbow of traditional festive hues accented by delicate silver zari buttas and a lustrous hand-dyed pallu.",
    "optFiles": [
      "Sarees Section/Bright colorful saree (1)_alt.webp",
      "Sarees Section/Bright colorful saree (2).webp",
      "Sarees Section/Bright colorful saree (3).webp",
      "Sarees Section/Bright colorful saree (1).webp"
    ],
    "origFiles": [
      "Sarees Section/Bright colorful saree (1).jfif",
      "Sarees Section/Bright colorful saree (2).png",
      "Sarees Section/Bright colorful saree (3).png",
      "Sarees Section/Bright colorful saree (1).png"
    ]
  },
  {
    "id": "outfit-saree-04",
    "name": "Chrome Silk Modern Minimalist Saree",
    "slug": "chrome-silk-modern-minimalist-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 8900,
    "originalPrice": 11000,
    "discountBadge": "19% OFF",
    "badge": "Contemporary Chic",
    "fabric": "Liquid Silver Chrome Silk",
    "rating": 4.88,
    "reviewCount": 18,
    "description": "Sleek liquid chrome metallic drape reflecting ambient warmth with fluid, weightless movement tailored for cocktail soir\u00e9es.",
    "optFiles": [
      "Sarees Section/Chrome Silk.webp"
    ],
    "origFiles": [
      "Sarees Section/Chrome Silk.jpeg"
    ]
  },
  {
    "id": "outfit-saree-05",
    "name": "Samriddhi Multi-Hue Heritage Silk Saree",
    "slug": "samriddhi-multi-hue-heritage-silk-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 18800,
    "originalPrice": 23000,
    "discountBadge": "18% OFF",
    "badge": "Heritage Classic",
    "fabric": "Pure Tussar Georgette Silk",
    "rating": 4.93,
    "reviewCount": 29,
    "description": "Richly pigmented jewel tones blended with traditional resham meenakari work celebrating centuries of artisanal heritage.",
    "optFiles": [
      "Sarees Section/Colorful Saree (1).webp",
      "Sarees Section/Colorful Saree (3).webp",
      "Sarees Section/Colorful Saree (4).webp"
    ],
    "origFiles": [
      "Sarees Section/Colorful Saree (1).jfif",
      "Sarees Section/Colorful Saree (3).png",
      "Sarees Section/Colorful Saree (4).png"
    ]
  },
  {
    "id": "outfit-saree-06",
    "name": "Aaranya Runway Modern Designer Saree",
    "slug": "aaranya-runway-modern-designer-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 21500,
    "originalPrice": 26000,
    "discountBadge": "17% OFF",
    "badge": "Runway Edit",
    "fabric": "Italian Crepe Silk & Cut-dana",
    "rating": 4.9,
    "reviewCount": 23,
    "description": "Couture runway drape featuring bespoke cut-dana embellishments and sculptural pleats designed for black-tie receptions.",
    "optFiles": [
      "Sarees Section/Designer Sarees 1.webp"
    ],
    "origFiles": [
      "Sarees Section/Designer Sarees 1.jpg"
    ]
  },
  {
    "id": "outfit-saree-07",
    "name": "Contemporary High-Fashion Editorial Saree",
    "slug": "contemporary-high-fashion-editorial-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 18200,
    "originalPrice": 22000,
    "discountBadge": "17% OFF",
    "badge": "Editorial Choice",
    "fabric": "Chiffon Silk & Metallic Weft",
    "rating": 4.89,
    "reviewCount": 25,
    "description": "Light-as-air editorial silhouette combining diaphanous silk textures with modern minimalist gold borders.",
    "optFiles": [
      "Sarees Section/Fashion (3).webp",
      "Sarees Section/Fashion (2).webp",
      "Sarees Section/Fashion (1).webp"
    ],
    "origFiles": [
      "Sarees Section/Fashion (3).jpeg",
      "Sarees Section/Fashion (2).jpeg",
      "Sarees Section/Fashion (1).jpeg"
    ]
  },
  {
    "id": "outfit-saree-08",
    "name": "Fatista Hand-Woven Artisan Silk Saree",
    "slug": "fatista-hand-woven-artisan-silk-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 16800,
    "originalPrice": 20500,
    "discountBadge": "18% OFF",
    "badge": "Artisan Guild",
    "fabric": "Chanderi Silk with Zari Border",
    "rating": 4.92,
    "reviewCount": 27,
    "description": "Handspun Chanderi silk drape woven on traditional wooden pit looms with delicate geometric border and pallu motifs.",
    "optFiles": [
      "Sarees Section/Fatista (3).webp",
      "Sarees Section/Fatista (2).webp",
      "Sarees Section/Fatista (1).webp"
    ],
    "origFiles": [
      "Sarees Section/Fatista (3).jpeg",
      "Sarees Section/Fatista (2).jpeg",
      "Sarees Section/Fatista (1).jpeg"
    ]
  },
  {
    "id": "outfit-saree-09",
    "name": "Diwali Swarna Gold Embroidered Festive Saree",
    "slug": "diwali-swarna-gold-embroidered-festive-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 20500,
    "originalPrice": 25000,
    "discountBadge": "18% OFF",
    "badge": "Festive Splendor",
    "fabric": "Pure Brocade Tissue Silk",
    "rating": 4.95,
    "reviewCount": 41,
    "description": "Shimmering festive saree bathed in antique gold embroidery, designed to illuminate special pujas and grand family celebrations.",
    "optFiles": [
      "Sarees Section/Festive Saree (1).webp",
      "Sarees Section/Festive Saree (2).webp",
      "Sarees Section/Festive Saree (3).webp"
    ],
    "origFiles": [
      "Sarees Section/Festive Saree (1).png",
      "Sarees Section/Festive Saree (2).png",
      "Sarees Section/Festive Saree (3).webp"
    ]
  },
  {
    "id": "outfit-saree-10",
    "name": "Gorgeous Regal Brocade Silk Saree",
    "slug": "gorgeous-regal-brocade-silk-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 22800,
    "originalPrice": 27500,
    "discountBadge": "17% OFF",
    "badge": "Royal Brocade",
    "fabric": "Varanasi Pure Katan Silk",
    "rating": 4.97,
    "reviewCount": 39,
    "description": "Heavy regal brocade saree featuring allover floral jaal hand-woven with fine gold and silver zari threads.",
    "optFiles": [
      "Sarees Section/Gourgeous (1).webp",
      "Sarees Section/Gourgeous (2).webp",
      "Sarees Section/Gourgeous (3).webp"
    ],
    "origFiles": [
      "Sarees Section/Gourgeous (1).jpg",
      "Sarees Section/Gourgeous (2).png",
      "Sarees Section/Gourgeous (3).png"
    ]
  },
  {
    "id": "outfit-saree-11",
    "name": "Gulmohar Pastel Peach Embroidered Organza",
    "slug": "gulmohar-pastel-peach-embroidered-organza",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 14200,
    "originalPrice": 17500,
    "discountBadge": "19% OFF",
    "badge": "Pastel Dream",
    "fabric": "Pure Glass Organza Silk",
    "rating": 4.91,
    "reviewCount": 34,
    "description": "Whisper-soft pastel peach organza with delicate floral resham embroidery and scalloped zari thread borders.",
    "optFiles": [
      "Sarees Section/Gulmohar Pastel Peach Embroidered Organza 1.webp",
      "Sarees Section/Gulmohar Pastel Peach Embroidered Organza 2.webp",
      "Sarees Section/Gulmohar Pastel Peach Embroidered Organza 3.webp"
    ],
    "origFiles": [
      "Sarees Section/Gulmohar Pastel Peach Embroidered Organza 1.jfif",
      "Sarees Section/Gulmohar Pastel Peach Embroidered Organza 2.png",
      "Sarees Section/Gulmohar Pastel Peach Embroidered Organza 3.png"
    ]
  },
  {
    "id": "outfit-saree-12",
    "name": "Sensational Scarlet Red Party Saree",
    "slug": "sensational-scarlet-red-party-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 15900,
    "originalPrice": 19500,
    "discountBadge": "18% OFF",
    "badge": "Party Showstopper",
    "fabric": "Fluid Georgette with Satin Stripes",
    "rating": 4.9,
    "reviewCount": 28,
    "description": "Vibrant scarlet red party drape with subtle sheen stripes and contemporary sleek border details.",
    "optFiles": [
      "Sarees Section/Hot saree (1).webp",
      "Sarees Section/Hot saree (2).webp"
    ],
    "origFiles": [
      "Sarees Section/Hot saree (1).png",
      "Sarees Section/Hot saree (2).png"
    ]
  },
  {
    "id": "outfit-saree-13",
    "name": "Coromandel Temple Border Kanjivaram Saree",
    "slug": "coromandel-temple-border-kanjivaram-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 26200,
    "originalPrice": 32000,
    "discountBadge": "18% OFF",
    "badge": "Pure Korvai Weave",
    "fabric": "Heavy 3-Ply Pure Silk",
    "rating": 4.98,
    "reviewCount": 51,
    "description": "Heritage Kanchipuram weave displaying sharp contrast Korvai temple borders and traditional elephant and peacock chakras.",
    "optFiles": [
      "Sarees Section/Kanjivaram Sarees 1.webp",
      "Sarees Section/Kanjivaram Sarees 2.webp",
      "Sarees Section/Kanjivaram Sarees 3.webp"
    ],
    "origFiles": [
      "Sarees Section/Kanjivaram Sarees 1.jfif",
      "Sarees Section/Kanjivaram Sarees 2.png",
      "Sarees Section/Kanjivaram Sarees 3.png"
    ]
  },
  {
    "id": "outfit-saree-14",
    "name": "Mayurakshi Handspun Bridal Silk Saree",
    "slug": "mayurakshi-handspun-bridal-silk-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 26800,
    "originalPrice": 32500,
    "discountBadge": "18% OFF",
    "badge": "Bridal Masterpiece",
    "fabric": "Certified Pure Gold Zari Silk",
    "rating": 4.95,
    "reviewCount": 42,
    "description": "The quintessential royal wedding trousseau centerpiece with 14-inch solid gold zari border and rich zari pallu.",
    "optFiles": [
      "Sarees Section/Mayurakshi Kanjivaram Bridal Silk Saree 1.webp"
    ],
    "origFiles": [
      "Sarees Section/Mayurakshi Kanjivaram Bridal Silk Saree 1.jpg"
    ]
  },
  {
    "id": "outfit-saree-15",
    "name": "Whisper Flora Sheer Organza Silk Saree",
    "slug": "whisper-flora-sheer-organza-silk-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 12800,
    "originalPrice": 15500,
    "discountBadge": "17% OFF",
    "badge": "Airy Sheer",
    "fabric": "Pure Handloom Organza",
    "rating": 4.87,
    "reviewCount": 24,
    "description": "Ethereal translucent drape with hand-painted watercolor blossoms and fine metallic scalloped edges.",
    "optFiles": [
      "Sarees Section/Organza Sarees 1.webp",
      "Sarees Section/Organza Sarees 2.webp",
      "Sarees Section/Organza Sarees 3.webp"
    ],
    "origFiles": [
      "Sarees Section/Organza Sarees 1.jfif",
      "Sarees Section/Organza Sarees 2.webp",
      "Sarees Section/Organza Sarees 3.jfif"
    ]
  },
  {
    "id": "outfit-saree-16",
    "name": "Padmavati Scarlet Red Katan Bridal Saree",
    "slug": "padmavati-scarlet-red-katan-bridal-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 27200,
    "originalPrice": 33500,
    "discountBadge": "19% OFF",
    "badge": "Royal Heirloom",
    "fabric": "Pure Banarasi Katan Silk",
    "rating": 4.96,
    "reviewCount": 47,
    "description": "Majestic bridal scarlet red saree woven with heavy gold shikargah borders and intricate kalga motifs.",
    "optFiles": [
      "Sarees Section/Padmavati Scarlet Red Katan Bridal Saree 1.webp"
    ],
    "origFiles": [
      "Sarees Section/Padmavati Scarlet Red Katan Bridal Saree 1.jpg"
    ]
  },
  {
    "id": "outfit-saree-17",
    "name": "Maharani Crimson Red Mulberry Silk Saree",
    "slug": "maharani-crimson-red-mulberry-silk-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 21200,
    "originalPrice": 26000,
    "discountBadge": "18% OFF",
    "badge": "Bestseller",
    "fabric": "Pure Mulberry Silk",
    "rating": 4.93,
    "reviewCount": 37,
    "description": "Rich crimson silk saree with deep luster, delicate floral buttas, and a classic temple border.",
    "optFiles": [
      "Sarees Section/Red Silk (1).webp",
      "Sarees Section/Red Silk (2).webp"
    ],
    "origFiles": [
      "Sarees Section/Red Silk (1).jpeg",
      "Sarees Section/Red Silk (2).jpeg"
    ]
  },
  {
    "id": "outfit-saree-18",
    "name": "Vedic Heritage Pure Handwoven Saree",
    "slug": "vedic-heritage-pure-handwoven-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 16500,
    "originalPrice": 20000,
    "discountBadge": "18% OFF",
    "badge": "Heritage Weave",
    "fabric": "Raw Handspun Silk",
    "rating": 4.89,
    "reviewCount": 21,
    "description": "Traditional Vedic weaving techniques preserved through generations with natural mineral dyed threads.",
    "optFiles": [
      "Sarees Section/Saree.webp"
    ],
    "origFiles": [
      "Sarees Section/Saree.jfif"
    ]
  },
  {
    "id": "outfit-saree-19",
    "name": "Classic Mulberry Handloom Silk Saree",
    "slug": "classic-mulberry-handloom-silk-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 17500,
    "originalPrice": 21000,
    "discountBadge": "17% OFF",
    "badge": "Handloom Pure",
    "fabric": "Pure Mulberry Silk",
    "rating": 4.91,
    "reviewCount": 32,
    "description": "Soft, supple pure mulberry silk saree offering a natural fluid drape and timeless golden selvage edges.",
    "optFiles": [
      "Sarees Section/Silk Sarees.webp",
      "Sarees Section/Silk Sarees 2.webp"
    ],
    "origFiles": [
      "Sarees Section/Silk Sarees.jpg",
      "Sarees Section/Silk Sarees 2.jpg"
    ]
  },
  {
    "id": "outfit-saree-20",
    "name": "Suhani Crimson & Zari Trousseau Heirloom",
    "slug": "suhani-crimson-zari-trousseau-heirloom",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 27650,
    "originalPrice": 34500,
    "discountBadge": "20% OFF",
    "badge": "Exclusive Heirloom",
    "fabric": "Heavy Katan Silk & Real Zari",
    "rating": 4.99,
    "reviewCount": 63,
    "description": "A crowning achievement of Banarasi master weavers with certified gold zari trousseau border and regal minakari pallu.",
    "optFiles": [
      "Sarees Section/Suhani Crimson & Zari Trousseau Heirloom saree.webp",
      "Sarees Section/Suhani Crimson & Zari Trousseau Heirloom 2.webp",
      "Sarees Section/Suhani Crimson & Zari Trousseau Heirloom 2_alt.webp"
    ],
    "origFiles": [
      "Sarees Section/Suhani Crimson & Zari Trousseau Heirloom saree.jfif",
      "Sarees Section/Suhani Crimson & Zari Trousseau Heirloom 2.jfif",
      "Sarees Section/Suhani Crimson & Zari Trousseau Heirloom 2.png"
    ]
  },
  {
    "id": "outfit-saree-21",
    "name": "Sultana Bronze Rust Tissue Katan Saree",
    "slug": "sultana-bronze-rust-tissue-katan-saree",
    "category": "Sarees",
    "categorySlug": "sarees",
    "price": 24200,
    "originalPrice": 29500,
    "discountBadge": "18% OFF",
    "badge": "Antique Zari",
    "fabric": "Tissue Katan Silk with Bronze Zari",
    "rating": 4.94,
    "reviewCount": 44,
    "description": "Luminous bronze rust tissue saree shimmering with antique metallic sheen and intricate border work.",
    "optFiles": [
      "Sarees Section/Sultana Bronze Rust Tissue Katan Saree 1.webp",
      "Sarees Section/Sultana Bronze Rust Tissue Katan Saree 2.webp"
    ],
    "origFiles": [
      "Sarees Section/Sultana Bronze Rust Tissue Katan Saree 1.webp",
      "Sarees Section/Sultana Bronze Rust Tissue Katan Saree 2.jpg"
    ]
  }
];

export const OUTFITS_DATA: OutfitProduct[] = RAW_PRODUCTS.map((p) => {
  const optGallery = p.optFiles.map(resolveOptImage).filter(Boolean);
  const origGallery = p.origFiles.map(resolveOrigImage).filter(Boolean);
  const combinedGallery = optGallery.length > 0 ? optGallery : (origGallery.length > 0 ? origGallery : [userProductImage]);
  const primaryImg = combinedGallery[0] || resolveOptImage(p.optFiles[0]) || resolveOrigImage(p.origFiles[0]) || userProductImage;

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    categorySlug: p.categorySlug,
    price: p.price,
    originalPrice: p.originalPrice,
    discountBadge: p.discountBadge,
    badge: p.badge,
    fabric: p.fabric,
    rating: p.rating,
    reviewCount: p.reviewCount,
    description: p.description,
    image: primaryImg,
    gallery: combinedGallery,
    originalGallery: origGallery.length > 0 ? origGallery : combinedGallery,
    inStock: true,
  };
});

import type { Saree } from '../types';

export function outfitToSaree(outfit: OutfitProduct): Saree {
  return {
    id: outfit.id,
    name: outfit.name,
    slug: outfit.slug,
    tagline: `${outfit.category} — ${outfit.fabric}`,
    category: 'Designer Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Editorial Palette',
    colors: [
      { name: 'Editorial Palette', hex: '#651C32', image: outfit.image }
    ],
    price: outfit.price,
    originalPrice: outfit.originalPrice,
    discountBadge: outfit.discountBadge,
    badge: 'New Arrival',
    rating: outfit.rating,
    reviewCount: outfit.reviewCount,
    images: outfit.gallery.length > 0 ? outfit.gallery : [outfit.image],
    description: outfit.description,
    weaveDetail: `${outfit.fabric} handcrafted tailoring with luxury drape contouring.`,
    zariType: 'Artisan Needlecraft & Zari Finishing',
    palluDetail: 'Fine border edges and tailored seams.',
    blouseIncluded: true,
    blouseDetails: 'Complimentary blouse customization and fit alterations included.',
    sareeLength: outfit.category === 'Sarees' ? '5.5 meters' : 'Standard Tailored Silhouette',
    careInstructions: [
      'Dry clean only by luxury silk specialists.',
      'Store in provided breathable muslin keepsake bag.',
      'Steam gently from reverse side.'
    ],
    occasions: ['Festive', 'Party Wear', 'Reception'],
    inStock: outfit.inStock,
    featured: true,
    trending: true,
  };
}

