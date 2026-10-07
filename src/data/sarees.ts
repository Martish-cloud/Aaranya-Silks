import userProductImage from '../assets/user-product-image.webp';
import type { Saree, CategoryInfo, CustomerReview } from '../types';

// Dynamic asset globbing for Shop All Sarees and Need to Add
const shopSareeImages = import.meta.glob<{ default: string }>(
  '../assets/Shop All Sarees/**/*.{webp,png,jpg,jpeg,jfif}',
  { eager: true }
);

const needToAddImages = import.meta.glob<{ default: string }>(
  '../assets/Need to Add/**/*.{webp,png,jpg,jpeg,jfif}',
  { eager: true }
);

export function getShopSareeImg(folder: string, filename: string): string {
  const baseName = filename.replace(/\.[^/.]+$/, '');
  const webpKey = `../assets/Shop All Sarees/${folder}/${baseName}.webp`;
  if (shopSareeImages[webpKey]) return shopSareeImages[webpKey].default;

  const directKey = `../assets/Shop All Sarees/${folder}/${filename}`;
  if (shopSareeImages[directKey]) return shopSareeImages[directKey].default;

  for (const k in shopSareeImages) {
    if (k.endsWith('/' + baseName + '.webp')) return shopSareeImages[k].default;
    if (k.endsWith('/' + filename)) return shopSareeImages[k].default;
  }
  return userProductImage;
}

export function getNeedToAddImg(folder: string, filename: string): string {
  const baseName = filename.replace(/\.[^/.]+$/, '');
  const webpKey = `../assets/Need to Add/${folder}/${baseName}.webp`;
  if (needToAddImages[webpKey]) return needToAddImages[webpKey].default;

  const directKey = `../assets/Need to Add/${folder}/${filename}`;
  if (needToAddImages[directKey]) return needToAddImages[directKey].default;

  for (const k in needToAddImages) {
    if (k.endsWith('/' + baseName + '.webp')) return needToAddImages[k].default;
    if (k.endsWith('/' + filename)) return needToAddImages[k].default;
  }
  return userProductImage;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'cat-silk',
    name: 'Silk Sarees',
    slug: 'silk-sarees',
    description: 'Pure Mulberry and Katan silk woven with timeless grace and luster.',
    image: getShopSareeImg('Swarna Hansa Pure Tissue Silk Saree', 'SWARNA HANSA (Champagne Gold).png'),
    itemCount: 42,
    highlight: 'Handspun Pure Silk'
  },
  {
    id: 'cat-banarasi',
    name: 'Banarasi Sarees',
    slug: 'banarasi-sarees',
    description: 'Centuries of Varanasi craftsmanship adorned with intricate gold kadhwa motifs.',
    image: getShopSareeImg('Varanasi Noor Kadhwa Banarasi Brocade', 'Varanasi Noor Kadhwa Banarasi Brocade (Wine Plum).png'),
    itemCount: 36,
    highlight: 'Gold & Silver Zari Brocades'
  },
  {
    id: 'cat-kanjivaram',
    name: 'Kanjivaram Sarees',
    slug: 'kanjivaram-sarees',
    description: 'Coromandel heritage woven with 3-ply silk and solid temple borders.',
    image: getShopSareeImg('Mayurakshi Kanjivaram Bridal Silk Saree', 'Mayurakshi Kanjivaram Bridal Silk Saree (Crimson Red).png'),
    itemCount: 28,
    highlight: 'Pure Korvai Temple Weave'
  },
  {
    id: 'cat-organza',
    name: 'Organza Sarees',
    slug: 'organza-sarees',
    description: 'Whisper-light sheer drapes adorned with delicate resham and foil florals.',
    image: getShopSareeImg('Chandrika Midnight Flora Pure Organza Saree', 'Chandrika Midnight Flora Pure Organza Saree  (Midnight Blue).png'),
    itemCount: 24,
    highlight: 'Airy Contemporary Sheer'
  },
  {
    id: 'cat-designer',
    name: 'Designer Sarees',
    slug: 'designer-sarees',
    description: 'Modern silhouettes, innovative drapes, and bespoke runway embellishments.',
    image: getShopSareeImg('Gulmohar Pastel Peach Embroidered Organza', 'Gulmohar Pastel Peach Embroidered Organza (Coral Peach).png'),
    itemCount: 30,
    highlight: 'Editorial Statements'
  },
  {
    id: 'cat-bridal',
    name: 'Bridal Sarees',
    slug: 'bridal-sarees',
    description: 'Exquisite bridal heirlooms crafted with real gold zari for your unforgettable day.',
    image: getShopSareeImg('Suhani Crimson & Zari Trousseau Heirloom', 'Suhani Crimson & Zari Trousseau Heirloom (Crimson Red).png'),
    itemCount: 18,
    highlight: 'Royal Wedding Trousseau'
  },
  {
    id: 'cat-party',
    name: 'Party Wear Sarees',
    slug: 'party-wear-sarees',
    description: 'Luminous metallic weaves, cocktail drapes, and glamorous evening silhouettes.',
    image: getShopSareeImg('Kashish Midnight Obsidian Meenakari Saree', 'Kashish Midnight Obsidian Meenakari Saree (Charcoal Black).png'),
    itemCount: 22,
    highlight: 'Effortless Evening Glamour'
  },
  {
    id: 'cat-festive',
    name: 'Festive Sarees',
    slug: 'festive-sarees',
    description: 'Auspicious hues, rich meenakari work, and joyful celebration drapes.',
    image: getShopSareeImg('Tarangini Rani Pink Festive Brocade Saree', 'Tarangini Rani Pink Festive Brocade Saree (Rani Pink).png'),
    itemCount: 34,
    highlight: 'Celebration Colorways'
  }
];

export const SAREES_DATA: Saree[] = [
  {
    id: 'aaranya-01',
    name: 'Mayurakshi Kanjivaram Bridal Silk Saree',
    slug: 'mayurakshi-kanjivaram-bridal-silk-saree',
    tagline: 'Woven with certified pure gold zari featuring traditional peacock and rudraksha motifs.',
    category: 'Bridal Sarees',
    fabric: 'Kanjivaram Silk',
    color: 'Crimson Red',
    colors: [
      {
        name: 'Crimson Red',
        hex: '#8B1E3F',
        image: getShopSareeImg('Mayurakshi Kanjivaram Bridal Silk Saree', 'Mayurakshi Kanjivaram Bridal Silk Saree (Crimson Red).png')
      },
      {
        name: 'Royal Plum',
        hex: '#651C32',
        image: getShopSareeImg('Mayurakshi Kanjivaram Bridal Silk Saree', 'Mayurakshi Kanjivaram Bridal Silk Saree (Royal Plum).png')
      },
      {
        name: 'Auspicious Emerald',
        hex: '#1B4D3E',
        image: getShopSareeImg('Mayurakshi Kanjivaram Bridal Silk Saree', 'Mayurakshi Kanjivaram Bridal Silk Saree (Auspicious Emerald).png')
      }
    ],
    price: 26800,
    originalPrice: 32000,
    discountBadge: '16% OFF',
    badge: 'Bridal Masterpiece',
    rating: 4.95,
    reviewCount: 42,
    images: [
      getShopSareeImg('Mayurakshi Kanjivaram Bridal Silk Saree', 'Mayurakshi Kanjivaram Bridal Silk Saree (Crimson Red).png'),
      getShopSareeImg('Mayurakshi Kanjivaram Bridal Silk Saree', 'Mayurakshi Kanjivaram Bridal Silk Saree (Royal Plum).png'),
      getShopSareeImg('Mayurakshi Kanjivaram Bridal Silk Saree', 'Mayurakshi Kanjivaram Bridal Silk Saree (Auspicious Emerald).png')
    ],
    description: 'The Mayurakshi Bridal Saree represents the apex of South Indian handloom artistry. Woven using heavy 3-ply pure Mulberry silk warp and weft, this majestic drape features intricately intertwined mayil (peacock) motifs, crowned by an opulent 14-inch solid gold zari Korvai border and a grand contrast pallu.',
    weaveDetail: 'Authentic Korvai interlocking handloom weave requiring two master artisans at the loom.',
    zariType: 'Certified Pure Gold Plated Silver Zari (0.6% real gold content)',
    palluDetail: 'Grand contrast rich zari pallu showcasing floral jaal and temple towers',
    blouseIncluded: true,
    blouseDetails: 'Includes 0.85m running silk blouse piece with matching heavy zari border sleeve trim',
    sareeLength: '5.5 meters length x 1.18 meters width (approx. 46 inches)',
    careInstructions: [
      'Strictly dry clean only by silk care specialists.',
      'Wrap in unbleached pure cotton muslin cloth for preservation.',
      'Store flat in a cool, dry cedar wardrobe away from direct sunlight.',
      'Refold along alternate fold lines every three to four months.'
    ],
    occasions: ['Bridal', 'Reception', 'Puja & Rituals'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-02',
    name: 'Varanasi Noor Kadhwa Banarasi Brocade',
    slug: 'varanasi-noor-kadhwa-banarasi-brocade',
    tagline: 'Exquisite antique gold bootis meticulously hand-woven in pure Katan silk.',
    category: 'Banarasi Sarees',
    fabric: 'Banarasi Brocade',
    color: 'Wine Plum',
    colors: [
      {
        name: 'Wine Plum',
        hex: '#651C32',
        image: getShopSareeImg('Varanasi Noor Kadhwa Banarasi Brocade', 'Varanasi Noor Kadhwa Banarasi Brocade (Wine Plum).png')
      },
      {
        name: 'Rani Rose',
        hex: '#A52B50',
        image: getShopSareeImg('Varanasi Noor Kadhwa Banarasi Brocade', 'Varanasi Noor Kadhwa Banarasi Brocade (Rani Rose) (1).png')
      }
    ],
    price: 23500,
    originalPrice: 28000,
    discountBadge: '16% OFF',
    badge: 'Heirloom Piece',
    rating: 4.9,
    reviewCount: 31,
    images: [
      getShopSareeImg('Varanasi Noor Kadhwa Banarasi Brocade', 'Varanasi Noor Kadhwa Banarasi Brocade (Wine Plum).png'),
      getShopSareeImg('Varanasi Noor Kadhwa Banarasi Brocade', 'Varanasi Noor Kadhwa Banarasi Brocade (Rani Rose) (1).png'),
      getShopSareeImg('Varanasi Noor Kadhwa Banarasi Brocade', 'Varanasi Noor Kadhwa Banarasi Brocade (Rani Rose) (3).png')
    ],
    description: 'Handcrafted over 120 artisan hours on traditional wooden pit looms in Varanasi. The Varanasi Noor features painstaking Kadhwa weaving, where each motif is individually carved without floats on the reverse side.',
    weaveDetail: 'Authentic Banarasi Kadhwa pit loom hand-weave.',
    zariType: 'Antique Bronze & Champagne Gold Zari',
    palluDetail: 'Opulent shikargah animal and forest vine motifs with minakari accents',
    blouseIncluded: true,
    blouseDetails: '0.8m pure katan silk tone-on-tone unstitched blouse piece with zari border',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: [
      'Dry clean only.',
      'Do not spray perfume directly onto zari.',
      'Store in provided Aaranya luxury keepsake bag.'
    ],
    occasions: ['Wedding Guest', 'Festive', 'Reception'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-03',
    name: 'Swarna Hansa Pure Tissue Silk Saree',
    slug: 'swarna-hansa-pure-tissue-silk-saree',
    tagline: 'Luminous champagne gold tissue silk that catches every glimmer of candlelight.',
    category: 'Silk Sarees',
    fabric: 'Tissue Silk',
    color: 'Champagne Gold',
    colors: [
      {
        name: 'Champagne Gold',
        hex: '#C8A96B',
        image: getShopSareeImg('Swarna Hansa Pure Tissue Silk Saree', 'SWARNA HANSA (Champagne Gold).png')
      },
      {
        name: 'Warm Ivory',
        hex: '#FAF7F0',
        image: getShopSareeImg('Swarna Hansa Pure Tissue Silk Saree', 'SWARNA HANSA (Warm Ivory).png')
      }
    ],
    price: 24800,
    originalPrice: 29500,
    discountBadge: '16% OFF',
    badge: 'Bestseller',
    rating: 4.88,
    reviewCount: 38,
    images: [
      getShopSareeImg('Swarna Hansa Pure Tissue Silk Saree', 'SWARNA HANSA (Champagne Gold).png'),
      getShopSareeImg('Swarna Hansa Pure Tissue Silk Saree', 'SWARNA HANSA (Champagne Gold) (2).png'),
      getShopSareeImg('Swarna Hansa Pure Tissue Silk Saree', 'SWARNA HANSA (Warm Ivory).png')
    ],
    description: 'Crafted with fine metallic silk threads woven closely with mulberry filament silk, creating a mesmerizing iridescent sheen. The Swarna Hansa flows with unmatched liquid drape, making it the choice for gala soirees and high-fashion celebrations.',
    weaveDetail: 'Tissue jacquard weave with zero-twist zari threads.',
    zariType: 'Subtle Champagne Gold High-Luster Zari',
    palluDetail: 'Intricate geometric herringbone zari detailing with hand-knotted silk tassels',
    blouseIncluded: true,
    blouseDetails: '0.85m matching heavy tissue silk unstitched blouse piece',
    sareeLength: '5.5 meters length x 1.16 meters width',
    careInstructions: [
      'Professional dry cleaning only.',
      'Iron on lowest silk setting with a protective press cloth.'
    ],
    occasions: ['Cocktail', 'Reception', 'Wedding Guest'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-04',
    name: 'Chandrika Midnight Flora Pure Organza Saree',
    slug: 'chandrika-midnight-flora-pure-organza-saree',
    tagline: 'Gossamer-light translucent drape with gilded hand-painted botanical foil vines.',
    category: 'Organza Sarees',
    fabric: 'Pure Organza',
    color: 'Midnight Blue',
    colors: [
      {
        name: 'Midnight Blue',
        hex: '#1C2841',
        image: getShopSareeImg('Chandrika Midnight Flora Pure Organza Saree', 'Chandrika Midnight Flora Pure Organza Saree  (Midnight Blue).png')
      },
      {
        name: 'Charcoal Black',
        hex: '#1C1A19',
        image: getShopSareeImg('Chandrika Midnight Flora Pure Organza Saree', 'Chandrika Midnight Flora Pure Organza Saree  (Charcoal Black).png')
      }
    ],
    price: 16500,
    originalPrice: 19800,
    discountBadge: '17% OFF',
    badge: 'New Arrival',
    rating: 4.85,
    reviewCount: 19,
    images: [
      getShopSareeImg('Chandrika Midnight Flora Pure Organza Saree', 'Chandrika Midnight Flora Pure Organza Saree  (Midnight Blue).png'),
      getShopSareeImg('Chandrika Midnight Flora Pure Organza Saree', 'Chandrika Midnight Flora Pure Organza Saree  (Midnight Blue) (2).png'),
      getShopSareeImg('Chandrika Midnight Flora Pure Organza Saree', 'Chandrika Midnight Flora Pure Organza Saree  (Charcoal Black).png'),
      getShopSareeImg('Chandrika Midnight Flora Pure Organza Saree', 'Chandrika Midnight Flora Pure Organza Saree  (Charcoal Black) (2).png')
    ],
    description: 'An ethereal creation woven from high-twist organza silk yarns. Delicate flora motifs are outlined in fine beaten metallic thread, complemented by scalloped resham embroidery along all four borders.',
    weaveDetail: 'Handloom sheer organza with hand-embroidered scallop finish.',
    zariType: 'Fine Antique Silver and Matt Gold Cutwork Zari',
    palluDetail: 'Cascading floral sprays with hand-finished pearl tassels',
    blouseIncluded: true,
    blouseDetails: '1 meter raw silk contrast blouse fabric with matching embroidered sleeve cuffs',
    sareeLength: '5.5 meters length x 1.12 meters width',
    careInstructions: [
      'Dry clean only.',
      'Store on wide wooden hangers or wrapped in acid-free tissue.'
    ],
    occasions: ['Cocktail', 'Sangeet', 'Party Wear'],
    inStock: true,
    featured: false,
    trending: true
  },
  {
    id: 'aaranya-05',
    name: 'Rajkumari Emerald Temple Kanjivaram',
    slug: 'rajkumari-emerald-temple-kanjivaram',
    tagline: 'Deep jewel emerald body paired with contrast ruby red temple spire borders.',
    category: 'Kanjivaram Sarees',
    fabric: 'Kanjivaram Silk',
    color: 'Emerald Green',
    colors: [
      {
        name: 'Emerald Green',
        hex: '#0B4D3C',
        image: getShopSareeImg('Rajkumari Emerald Temple Kanjivaram', 'Rajkumari Emerald Temple Kanjivaram (Emerald Green) (1).png')
      },
      {
        name: 'Crimson Red',
        hex: '#8B1E3F',
        image: getShopSareeImg('Rajkumari Emerald Temple Kanjivaram', 'Rajkumari Emerald Temple Kanjivaram (Crimson Red).png')
      }
    ],
    price: 27900,
    originalPrice: 33500,
    discountBadge: '17% OFF',
    badge: 'Limited Heritage',
    rating: 4.92,
    reviewCount: 28,
    images: [
      getShopSareeImg('Rajkumari Emerald Temple Kanjivaram', 'Rajkumari Emerald Temple Kanjivaram (Emerald Green) (1).png'),
      getShopSareeImg('Rajkumari Emerald Temple Kanjivaram', 'Rajkumari Emerald Temple Kanjivaram (Emerald Green) (2).png'),
      getShopSareeImg('Rajkumari Emerald Temple Kanjivaram', 'Rajkumari Emerald Temple Kanjivaram (Crimson Red).png')
    ],
    description: 'A sovereign drape steeped in Coromandel tradition. The field features subtle rudraksha eye buttis woven into jewel-toned emerald green silk, set against majestic crimson borders featuring sacred gopuram motifs.',
    weaveDetail: 'Solid Korvai contrasting body-and-border technique.',
    zariType: 'Certified 22k Electroplated Silver Zari',
    palluDetail: 'Thousand-butti Mayil (peacock) and Yazhi border pallu',
    blouseIncluded: true,
    blouseDetails: '0.9m contrast ruby red silk blouse piece with temple border',
    sareeLength: '5.5 meters length x 1.18 meters width',
    careInstructions: ['Dry clean only by certified silk cleaners.'],
    occasions: ['Puja & Rituals', 'Bridal', 'Wedding Guest'],
    inStock: true,
    featured: true,
    trending: false
  },
  {
    id: 'aaranya-06',
    name: 'Ananya Ivory & Gold Shalu Heritage Saree',
    slug: 'ananya-ivory-gold-shalu-heritage-saree',
    tagline: 'Warm ivory mulberry silk adorned with pure antique gold meenakari motifs.',
    category: 'Silk Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Warm Ivory',
    colors: [
      {
        name: 'Warm Ivory',
        hex: '#FAF7F0',
        image: getShopSareeImg('Ananya Ivory & Gold Shalu Heritage Saree', 'Ananya Ivory & Gold Shalu Heritage Saree (Warm Ivory).png')
      },
      {
        name: 'Champagne Gold',
        hex: '#C8A96B',
        image: getShopSareeImg('Ananya Ivory & Gold Shalu Heritage Saree', 'Ananya Ivory & Gold Shalu Heritage Saree (Champagne Gold) (1).png')
      }
    ],
    price: 21900,
    originalPrice: 26000,
    discountBadge: '16% OFF',
    badge: 'Classic Heritage',
    rating: 4.86,
    reviewCount: 22,
    images: [
      getShopSareeImg('Ananya Ivory & Gold Shalu Heritage Saree', 'Ananya Ivory & Gold Shalu Heritage Saree (Warm Ivory).png'),
      getShopSareeImg('Ananya Ivory & Gold Shalu Heritage Saree', 'Ananya Ivory & Gold Shalu Heritage Saree (Champagne Gold) (1).png'),
      getShopSareeImg('Ananya Ivory & Gold Shalu Heritage Saree', 'Ananya Ivory & Gold Shalu Heritage Saree (Champagne Gold) (2).png')
    ],
    description: 'An ode to serene, understated elegance. The Ananya saree balances pristine cream ivory Katan silk with intricate antique gold bel foliage and sacred kalga motifs.',
    weaveDetail: 'Fine Banarasi pit loom weave.',
    zariType: 'Antique Champagne Gold Zari',
    palluDetail: 'Intricate paisley and lotus petal motifs',
    blouseIncluded: true,
    blouseDetails: '0.85m running ivory silk fabric with gold border',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.', 'Store in cotton bag.'],
    occasions: ['Puja & Rituals', 'Wedding Guest', 'Festive'],
    inStock: true,
    featured: false,
    trending: false
  },
  {
    id: 'aaranya-07',
    name: 'Tarangini Rani Pink Festive Brocade Saree',
    slug: 'tarangini-rani-pink-festive-brocade-saree',
    tagline: 'Vibrant celebratory fuchsia woven with shimmering wavy chevron ripples.',
    category: 'Festive Sarees',
    fabric: 'Banarasi Brocade',
    color: 'Rani Pink',
    colors: [
      {
        name: 'Rani Pink',
        hex: '#A52B50',
        image: getShopSareeImg('Tarangini Rani Pink Festive Brocade Saree', 'Tarangini Rani Pink Festive Brocade Saree (Rani Pink).png')
      },
      {
        name: 'Crimson Red',
        hex: '#8B1E3F',
        image: getShopSareeImg('Tarangini Rani Pink Festive Brocade Saree', 'Tarangini Rani Pink Festive Brocade Saree (Crimson Red) (1).png')
      }
    ],
    price: 19800,
    originalPrice: 24000,
    discountBadge: '18% OFF',
    badge: 'Festive Essential',
    rating: 4.89,
    reviewCount: 34,
    images: [
      getShopSareeImg('Tarangini Rani Pink Festive Brocade Saree', 'Tarangini Rani Pink Festive Brocade Saree (Rani Pink).png'),
      getShopSareeImg('Tarangini Rani Pink Festive Brocade Saree', 'Tarangini Rani Pink Festive Brocade Saree (Crimson Red) (1).png'),
      getShopSareeImg('Tarangini Rani Pink Festive Brocade Saree', 'Tarangini Rani Pink Festive Brocade Saree (Crimson Red) (2).png')
    ],
    description: 'Dynamic, celebratory, and radiant. The Tarangini features mesmerizing Leheriya wave patterns rendered entirely in pure zari over rich fuchsia-pink Mulberry silk.',
    weaveDetail: 'Tanchoi satin-finish brocade weave.',
    zariType: 'Dual-Tone Silver and Rose Gold Zari',
    palluDetail: 'Chevron ripples crowned with traditional peacock medallions',
    blouseIncluded: true,
    blouseDetails: '0.8m brocade unstitched blouse piece in matching rani pink',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Festive', 'Sangeet', 'Wedding Guest'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-08',
    name: 'Gulmohar Pastel Peach Embroidered Organza',
    slug: 'gulmohar-pastel-peach-embroidered-organza',
    tagline: 'Blush sunset tones with delicate scalloped badla resham border artistry.',
    category: 'Designer Sarees',
    fabric: 'Pure Organza',
    color: 'Coral Peach',
    colors: [
      {
        name: 'Coral Peach',
        hex: '#E8987E',
        image: getShopSareeImg('Gulmohar Pastel Peach Embroidered Organza', 'Gulmohar Pastel Peach Embroidered Organza (Coral Peach).png')
      },
      {
        name: 'Warm Ivory',
        hex: '#FAF7F0',
        image: getShopSareeImg('Gulmohar Pastel Peach Embroidered Organza', 'Gulmohar Pastel Peach Embroidered Organza (Warm Ivory).png')
      }
    ],
    price: 15900,
    originalPrice: 18500,
    discountBadge: '14% OFF',
    badge: 'Daytime Soiree',
    rating: 4.82,
    reviewCount: 15,
    images: [
      getShopSareeImg('Gulmohar Pastel Peach Embroidered Organza', 'Gulmohar Pastel Peach Embroidered Organza (Coral Peach).png'),
      getShopSareeImg('Gulmohar Pastel Peach Embroidered Organza', 'Gulmohar Pastel Peach Embroidered Organza (Warm Ivory).png'),
      getShopSareeImg('Gulmohar Pastel Peach Embroidered Organza', 'Gulmohar Pastel Peach Embroidered Organza (Warm Ivory) (2).png')
    ],
    description: 'Fresh, airy, and contemporary. Crafted in translucent organza that drapes with graceful flow, detailed with scalloped threadwork borders and floral sprays.',
    weaveDetail: 'Fine sheer organza with hand-guided scalloped embroidery.',
    zariType: 'Subtle Matt Gold Wire Work',
    palluDetail: 'Hand-finished pearl droplets along the pallu edge',
    blouseIncluded: true,
    blouseDetails: '0.9m contrast raw silk blouse piece',
    sareeLength: '5.5 meters length x 1.12 meters width',
    careInstructions: ['Dry clean only.', 'Hang in breathable garment bag.'],
    occasions: ['Cocktail', 'Day Wedding', 'Party Wear'],
    inStock: true,
    featured: false,
    trending: false
  },
  {
    id: 'aaranya-09',
    name: 'Padmavati Scarlet Red Katan Bridal Saree',
    slug: 'padmavati-scarlet-red-katan-bridal-saree',
    tagline: 'Imperial scarlet red with heavy antique gold jaal fit for royal weddings.',
    category: 'Bridal Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Crimson Red',
    colors: [
      {
        name: 'Crimson Red',
        hex: '#8B1E3F',
        image: getShopSareeImg('Padmavati Scarlet Red Katan Bridal Saree', 'Padmavati Scarlet Red Katan Bridal Saree (Crimson Red).png')
      },
      {
        name: 'Deep Burgundy',
        hex: '#651C32',
        image: getShopSareeImg('Padmavati Scarlet Red Katan Bridal Saree', 'Padmavati Scarlet Red Katan Bridal Saree (Deep Burgundy).png')
      }
    ],
    price: 29500,
    originalPrice: 36000,
    discountBadge: '18% OFF',
    badge: 'Bridal Heirloom',
    rating: 4.96,
    reviewCount: 45,
    images: [
      getShopSareeImg('Padmavati Scarlet Red Katan Bridal Saree', 'Padmavati Scarlet Red Katan Bridal Saree (Crimson Red).png'),
      getShopSareeImg('Padmavati Scarlet Red Katan Bridal Saree', 'Padmavati Scarlet Red Katan Bridal Saree (Deep Burgundy).png'),
      getShopSareeImg('Padmavati Scarlet Red Katan Bridal Saree', 'Padmavati Scarlet Red Katan Bridal Saree (Deep Burgundy) (2).png')
    ],
    description: 'An awe-inspiring bridal masterwork. Hand-spun three-ply pure Katan silk is bathed in traditional auspicious vermillion, then enveloped in a dense antique gold shikargah jaal of floral creepers, royal deer, and paradisal birds.',
    weaveDetail: 'Dense Kadhwa pit loom handcraft.',
    zariType: 'Certified 24k Gold Electroplated Zari',
    palluDetail: 'Grand 18-inch bridal procession with intricate floral arches',
    blouseIncluded: true,
    blouseDetails: '1 meter pure katan silk heavy brocade blouse fabric',
    sareeLength: '5.5 meters length x 1.18 meters width',
    careInstructions: ['Dry clean only by certified specialists.'],
    occasions: ['Bridal', 'Reception'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-10',
    name: 'Sultana Bronze Rust Tissue Katan Saree',
    slug: 'sultana-bronze-rust-tissue-katan-saree',
    tagline: 'Burnished metallic rust copper tones with warm golden evening iridescence.',
    category: 'Silk Sarees',
    fabric: 'Tissue Silk',
    color: 'Rust Copper',
    colors: [
      {
        name: 'Rust Copper',
        hex: '#B85D38',
        image: getShopSareeImg('Sultana Bronze Rust Tissue Katan Saree', 'Sultana Bronze Rust Tissue Katan Saree (Rust Copper).png')
      },
      {
        name: 'Champagne Gold',
        hex: '#C8A96B',
        image: getShopSareeImg('Sultana Bronze Rust Tissue Katan Saree', 'Sultana Bronze Rust Tissue Katan Saree (Champagne Gold).png')
      }
    ],
    price: 22400,
    originalPrice: 27000,
    discountBadge: '17% OFF',
    badge: 'Chandelier Glow',
    rating: 4.87,
    reviewCount: 20,
    images: [
      getShopSareeImg('Sultana Bronze Rust Tissue Katan Saree', 'Sultana Bronze Rust Tissue Katan Saree (Rust Copper).png'),
      getShopSareeImg('Sultana Bronze Rust Tissue Katan Saree', 'Sultana Bronze Rust Tissue Katan Saree (Champagne Gold).png'),
      getShopSareeImg('Sultana Bronze Rust Tissue Katan Saree', 'Sultana Bronze Rust Tissue Katan Saree (Champagne Gold) (2).png')
    ],
    description: 'Where antiquity meets modern haute couture. Metallic warp yarns intertwined with burnt copper filament silk reflect changing hues under warm banquet lighting.',
    weaveDetail: 'Tissue Katan jacquard hand-weave.',
    zariType: 'Antique Bronze & Champagne Metallic Wire',
    palluDetail: 'Bold contemporary geometric zig-zag zari layout',
    blouseIncluded: true,
    blouseDetails: '0.85m matching tissue fabric with heavy cuff border',
    sareeLength: '5.5 meters length x 1.16 meters width',
    careInstructions: ['Dry clean only.', 'Low heat iron.'],
    occasions: ['Cocktail', 'Reception', 'Party Wear'],
    inStock: true,
    featured: false,
    trending: true
  },
  {
    id: 'aaranya-11',
    name: 'Kashish Midnight Obsidian Meenakari Saree',
    slug: 'kashish-midnight-obsidian-meenakari-saree',
    tagline: 'Deep velvet obsidian black paired with vibrant jewel-toned meenakari motifs.',
    category: 'Party Wear Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Charcoal Black',
    colors: [
      {
        name: 'Charcoal Black',
        hex: '#1C1A19',
        image: getShopSareeImg('Kashish Midnight Obsidian Meenakari Saree', 'Kashish Midnight Obsidian Meenakari Saree (Charcoal Black).png')
      },
      {
        name: 'Midnight Blue',
        hex: '#1C2841',
        image: getShopSareeImg('Kashish Midnight Obsidian Meenakari Saree', 'Kashish Midnight Obsidian Meenakari Saree (Midnight Blue).png')
      }
    ],
    price: 24500,
    originalPrice: 29000,
    discountBadge: '16% OFF',
    badge: 'Dramatic Glamour',
    rating: 4.91,
    reviewCount: 27,
    images: [
      getShopSareeImg('Kashish Midnight Obsidian Meenakari Saree', 'Kashish Midnight Obsidian Meenakari Saree (Charcoal Black).png'),
      getShopSareeImg('Kashish Midnight Obsidian Meenakari Saree', 'Kashish Midnight Obsidian Meenakari Saree (Charcoal Black) (2).png'),
      getShopSareeImg('Kashish Midnight Obsidian Meenakari Saree', 'Kashish Midnight Obsidian Meenakari Saree (Midnight Blue).png')
    ],
    description: 'Daring, striking, and unforgettably glamorous. Midnight black Mulberry silk acts as the nocturnal canvas for radiant Meenakari jewel bootis in ruby red, sapphire blue, and emerald green silks, bordered by lustrous gold zari.',
    weaveDetail: 'Banarasi Meenakari kadhwa weave.',
    zariType: 'Fine Antique Gold with Multi-Colored Resham Inlays',
    palluDetail: 'Intricate meenakari peacock feathers and flora',
    blouseIncluded: true,
    blouseDetails: '0.85m pure black katan silk blouse fabric with border',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Party Wear', 'Cocktail', 'Reception'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-12',
    name: 'Vanya Forest Tussar Georgette Saree',
    slug: 'vanya-forest-tussar-georgette-saree',
    tagline: 'Deep woodland green with subtle antique zari paisleys and earthy texture.',
    category: 'Silk Sarees',
    fabric: 'Tussar Georgette',
    color: 'Forest Emerald',
    colors: [
      {
        name: 'Forest Emerald',
        hex: '#1B4D3E',
        image: getShopSareeImg('Vanya Forest Tussar Georgette Saree', 'Vanya Forest Tussar Georgette Saree (Forest Emerald) (1).png')
      },
      {
        name: 'Warm Ivory',
        hex: '#FAF7F0',
        image: getShopSareeImg('Vanya Forest Tussar Georgette Saree', 'Vanya Forest Tussar Georgette Saree (Warm Ivory).png')
      }
    ],
    price: 18200,
    originalPrice: 22000,
    discountBadge: '17% OFF',
    badge: 'Artisanal Drape',
    rating: 4.84,
    reviewCount: 18,
    images: [
      getShopSareeImg('Vanya Forest Tussar Georgette Saree', 'Vanya Forest Tussar Georgette Saree (Forest Emerald) (1).png'),
      getShopSareeImg('Vanya Forest Tussar Georgette Saree', 'Vanya Forest Tussar Georgette Saree (Forest Emerald) (2).png'),
      getShopSareeImg('Vanya Forest Tussar Georgette Saree', 'Vanya Forest Tussar Georgette Saree (Warm Ivory).png')
    ],
    description: 'Celebrates raw natural silk textures. The organic, slightly slubbed hand-feel of Wild Tussar is blended with high-twist georgette yarns, creating an effortless drape with matte antique zari buttis.',
    weaveDetail: 'Tussar handloom weave with antique zari.',
    zariType: 'Matte Vintage Antique Zari',
    palluDetail: 'Hand-fringed edges with simple striped zari bands',
    blouseIncluded: true,
    blouseDetails: '0.8m running tussar georgette blouse piece',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Festive', 'Day Wedding', 'Puja & Rituals'],
    inStock: true,
    featured: false,
    trending: false
  },
  {
    id: 'aaranya-13',
    name: 'Devangana Chanderi Royal Zari Saree',
    slug: 'devangana-chanderi-royal-zari-saree',
    tagline: 'Lightweight sheer Chanderi silk with delicate golden coin bootis.',
    category: 'Silk Sarees',
    fabric: 'Chanderi Silk',
    color: 'Coral Peach',
    colors: [
      {
        name: 'Coral Peach',
        hex: '#E8987E',
        image: getShopSareeImg('Devangana Chanderi Royal Zari Saree', 'Devangana Chanderi Royal Zari Saree (Coral Peach) (1).png')
      },
      {
        name: 'Sunset Ochre',
        hex: '#C68B27',
        image: getShopSareeImg('Devangana Chanderi Royal Zari Saree', 'Devangana Chanderi Royal Zari Saree (V).png')
      }
    ],
    price: 17400,
    originalPrice: 21000,
    discountBadge: '17% OFF',
    badge: 'Chanderi Heritage',
    rating: 4.86,
    reviewCount: 16,
    images: [
      getShopSareeImg('Devangana Chanderi Royal Zari Saree', 'Devangana Chanderi Royal Zari Saree (Coral Peach) (1).png'),
      getShopSareeImg('Devangana Chanderi Royal Zari Saree', 'Devangana Chanderi Royal Zari Saree (Coral Peach) (2).png'),
      getShopSareeImg('Devangana Chanderi Royal Zari Saree', 'Devangana Chanderi Royal Zari Saree (V).png')
    ],
    description: 'Centuries-old Chanderi weaving tradition from Madhya Pradesh. Gossamer-fine pure silk warp and delicate cotton weft give this drape its signature featherlight transparency and airy drape.',
    weaveDetail: 'Traditional Chanderi pit loom hand-weave.',
    zariType: 'Fine Light Gold Ashfi Butti Zari',
    palluDetail: 'Five-stripe traditional Chanderi zari border',
    blouseIncluded: true,
    blouseDetails: '0.85m tone-on-tone Chanderi silk blouse piece',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Puja & Rituals', 'Festive', 'Daytime Celebrations'],
    inStock: true,
    featured: false,
    trending: false
  },
  {
    id: 'aaranya-14',
    name: 'Teal Samriddhi Meenakari Brocade',
    slug: 'teal-samriddhi-meenakari-brocade',
    tagline: 'Oceanic peacock teal pure silk adorned with dual-tone silver and gold jaal.',
    category: 'Banarasi Sarees',
    fabric: 'Banarasi Brocade',
    color: 'Peacock Teal',
    colors: [
      {
        name: 'Peacock Teal',
        hex: '#0B5563',
        image: getShopSareeImg('Teal Samriddhi Meenakari Brocade', 'Teal Samriddhi Meenakari Brocade (Peacock Teal) (1).png')
      },
      {
        name: 'Emerald Green',
        hex: '#0B4D3C',
        image: getShopSareeImg('Teal Samriddhi Meenakari Brocade', 'Teal Samriddhi Meenakari Brocade (Emarald Green).png')
      }
    ],
    price: 25200,
    originalPrice: 30000,
    discountBadge: '16% OFF',
    badge: 'Master Weaver Series',
    rating: 4.93,
    reviewCount: 30,
    images: [
      getShopSareeImg('Teal Samriddhi Meenakari Brocade', 'Teal Samriddhi Meenakari Brocade (Peacock Teal) (1).png'),
      getShopSareeImg('Teal Samriddhi Meenakari Brocade', 'Teal Samriddhi Meenakari Brocade (Peacock Teal) (2).png'),
      getShopSareeImg('Teal Samriddhi Meenakari Brocade', 'Teal Samriddhi Meenakari Brocade (Emarald Green).png')
    ],
    description: 'Hypnotic oceanic teal handloom brocade that shifts between sapphire and emerald green. The all-over Ganga-Jamuna jaal interweaves genuine silver and antique gold zari threads.',
    weaveDetail: 'Ganga-Jamuna dual-metal banarasi kadhwa weave.',
    zariType: 'Certified Dual-Metal Silver & Gold Zari',
    palluDetail: 'Grand vase (Kalas) and blooming vine motifs',
    blouseIncluded: true,
    blouseDetails: '0.85m matching heavy brocade blouse fabric',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Wedding Guest', 'Festive', 'Reception'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-15',
    name: 'Riddhi Vintage Banarasi Silver Sheen',
    slug: 'riddhi-vintage-banarasi-silver-sheen',
    tagline: 'Cool silver sheen over soft lilac silk, woven with antique leafy vines.',
    category: 'Party Wear Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Lilac Lavender',
    colors: [
      {
        name: 'Lilac Lavender',
        hex: '#9C88B0',
        image: getShopSareeImg('Riddhi Vintage Banarasi Silver Sheen', 'Riddhi Vintage Banarasi Silver Sheen ( Lilac Lavender) (1).png')
      },
      {
        name: 'Warm Ivory',
        hex: '#FAF7F0',
        image: getShopSareeImg('Riddhi Vintage Banarasi Silver Sheen', 'Riddhi Vintage Banarasi Silver Sheen (Warm Ivory).png')
      }
    ],
    price: 22800,
    originalPrice: 27500,
    discountBadge: '17% OFF',
    badge: 'Handwoven Exclusive',
    rating: 4.88,
    reviewCount: 23,
    images: [
      getShopSareeImg('Riddhi Vintage Banarasi Silver Sheen', 'Riddhi Vintage Banarasi Silver Sheen ( Lilac Lavender) (1).png'),
      getShopSareeImg('Riddhi Vintage Banarasi Silver Sheen', 'Riddhi Vintage Banarasi Silver Sheen ( Lilac Lavender) (2).png'),
      getShopSareeImg('Riddhi Vintage Banarasi Silver Sheen', 'Riddhi Vintage Banarasi Silver Sheen (Warm Ivory).png')
    ],
    description: 'A poetic contemporary colorway brought to life by master weavers. Soft muted lilac silk serves as a canvas for dense silver zari creepers and antique borders.',
    weaveDetail: 'Banarasi kadhwa weave on pure silk.',
    zariType: 'Sterling White Silver Zari',
    palluDetail: 'Silver geometric trellis with floral border',
    blouseIncluded: true,
    blouseDetails: '0.85m lilac silk blouse fabric with silver zari cuffs',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Cocktail', 'Wedding Guest', 'Reception'],
    inStock: true,
    featured: false,
    trending: false
  },
  {
    id: 'aaranya-16',
    name: 'Suhani Crimson & Zari Trousseau Heirloom',
    slug: 'suhani-crimson-zari-trousseau-heirloom',
    tagline: 'Timeless deep maroon silk with heavy antique zardozi-style woven border.',
    category: 'Bridal Sarees',
    fabric: 'Kanjivaram Silk',
    color: 'Crimson Red',
    colors: [
      {
        name: 'Crimson Red',
        hex: '#8B1E3F',
        image: getShopSareeImg('Suhani Crimson & Zari Trousseau Heirloom', 'Suhani Crimson & Zari Trousseau Heirloom (Crimson Red).png')
      },
      {
        name: 'Deep Burgundy',
        hex: '#651C32',
        image: getShopSareeImg('Suhani Crimson & Zari Trousseau Heirloom', 'Suhani Crimson & Zari Trousseau Heirloom (Deep Burgendy) (1).png')
      }
    ],
    price: 27650,
    originalPrice: 35000,
    discountBadge: '21% OFF',
    badge: 'Bridal Masterpiece',
    rating: 4.97,
    reviewCount: 37,
    images: [
      getShopSareeImg('Suhani Crimson & Zari Trousseau Heirloom', 'Suhani Crimson & Zari Trousseau Heirloom (Crimson Red).png'),
      getShopSareeImg('Suhani Crimson & Zari Trousseau Heirloom', 'Suhani Crimson & Zari Trousseau Heirloom (Deep Burgendy) (1).png'),
      getShopSareeImg('Suhani Crimson & Zari Trousseau Heirloom', 'Suhani Crimson & Zari Trousseau Heirloom (Deep Burgendy) (2).png')
    ],
    description: 'Crafted for the bride who cherishes eternal heritage. Saturated deep burgundy tone with heavy three-ply silk weight, paired with an antique gold zari border of flying peacocks and lotus blossoms.',
    weaveDetail: 'Heavy Korvai interlocking handloom technique.',
    zariType: 'Pure Antique Gold Finished Silver Zari',
    palluDetail: 'Opulent ceremonial wedding procession motif',
    blouseIncluded: true,
    blouseDetails: '1.0m matching deep burgundy pure silk blouse fabric with dense zari borders',
    sareeLength: '5.5 meters length x 1.18 meters width',
    careInstructions: [
      'Strictly dry clean only.',
      'Aaranya archival preservation box included.'
    ],
    occasions: ['Bridal', 'Reception'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-17',
    name: 'Maroon Banarasi Silk Saree with Gold Zari Border',
    slug: 'maroon-banarasi-silk-saree-with-gold-zari-border',
    tagline: 'Opulent deep maroon pure Katan silk embellished with intricate golden floral borders.',
    category: 'Banarasi Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Scarlet Maroon',
    colors: [
      {
        name: 'Royal Maroon',
        hex: '#5B1024',
        image: getNeedToAddImg('Maroon Banarasi Silk Saree with Gold Zari Border', 'Maroon Banarasi Silk Saree with Gold Zari Border (1).png')
      },
      {
        name: 'Deep Wine Maroon',
        hex: '#4A0D1D',
        image: getNeedToAddImg('Maroon Banarasi Silk Saree with Gold Zari Border', 'Maroon Banarasi Silk Saree with Gold Zari Border (2).png')
      },
      {
        name: 'Antique Maroon',
        hex: '#6B162C',
        image: getNeedToAddImg('Maroon Banarasi Silk Saree with Gold Zari Border', 'Maroon Banarasi Silk Saree with Gold Zari Border (3).png')
      },
      {
        name: 'Scarlet Maroon',
        hex: '#801A32',
        image: getNeedToAddImg('Maroon Banarasi Silk Saree with Gold Zari Border', 'Maroon Banarasi Silk Saree with Gold Zari Border (4).png')
      }
    ],
    price: 25800,
    originalPrice: 31000,
    discountBadge: '17% OFF',
    badge: 'New Addition',
    rating: 4.94,
    reviewCount: 29,
    images: [
      getNeedToAddImg('Maroon Banarasi Silk Saree with Gold Zari Border', 'Maroon Banarasi Silk Saree with Gold Zari Border (4).png'),
      getNeedToAddImg('Maroon Banarasi Silk Saree with Gold Zari Border', 'Maroon Banarasi Silk Saree with Gold Zari Border (2).png'),
      getNeedToAddImg('Maroon Banarasi Silk Saree with Gold Zari Border', 'Maroon Banarasi Silk Saree with Gold Zari Border (3).png'),
      getNeedToAddImg('Maroon Banarasi Silk Saree with Gold Zari Border', 'Maroon Banarasi Silk Saree with Gold Zari Border (4).png')
    ],
    description: 'An authoritative bridal silhouette woven in traditional Varanasi workshops. Features dense kadhwa floral jaal and a solid 12-inch gold zari border with matching contrast pallu.',
    weaveDetail: 'Authentic Banarasi pit loom weave.',
    zariType: 'Certified 24k Electroplated Antique Gold Zari',
    palluDetail: 'Intricate kalga and floral crest motifs',
    blouseIncluded: true,
    blouseDetails: '0.85m matching pure maroon silk blouse with gold border',
    sareeLength: '5.5 meters length x 1.16 meters width',
    careInstructions: ['Dry clean only.', 'Store in cotton bag.'],
    occasions: ['Bridal', 'Wedding Guest', 'Festive'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-18',
    name: 'Printed saree with matching embroidered blouse',
    slug: 'printed-saree-with-matching-embroidered-blouse',
    tagline: 'Artisanal floral printed drape paired with a bespoke embroidered designer blouse.',
    category: 'Designer Sarees',
    fabric: 'Chanderi Silk',
    color: 'Dark Blue',
    colors: [
      {
        name: 'Dark Blue',
        hex: '#1C2841',
        image: getNeedToAddImg('Printed saree with matching embroidered blouse', 'Printed saree with matching embroidered blouse (Dark Blue).jpeg')
      },
      {
        name: 'Dark Olive',
        hex: '#3D4A32',
        image: getNeedToAddImg('Printed saree with matching embroidered blouse', 'Printed saree with matching embroidered blouse (Dark Olive).png')
      },
      {
        name: 'Red Cherry',
        hex: '#8B1E3F',
        image: getNeedToAddImg('Printed saree with matching embroidered blouse', 'Printed saree with matching embroidered blouse (Red Cherry).png')
      }
    ],
    price: 18900,
    originalPrice: 23000,
    discountBadge: '18% OFF',
    badge: 'Designer Ensemble',
    rating: 4.88,
    reviewCount: 21,
    images: [
      getNeedToAddImg('Printed saree with matching embroidered blouse', 'Printed saree with matching embroidered blouse (Dark Blue).jpeg'),
      getNeedToAddImg('Printed saree with matching embroidered blouse', 'Printed saree with matching embroidered blouse (Dark Olive).png'),
      getNeedToAddImg('Printed saree with matching embroidered blouse', 'Printed saree with matching embroidered blouse (Red Cherry).png')
    ],
    description: 'An elegant modern fusion ensemble. Handcrafted printed silk saree paired with a meticulously hand-embroidered blouse with intricate zardozi and threadwork detailing.',
    weaveDetail: 'Fine printed Chanderi silk with hand-embroidery.',
    zariType: 'Delicate Resham & Beaten Gold Zari Detailing',
    palluDetail: 'Flowing printed botanical border with resham accents',
    blouseIncluded: true,
    blouseDetails: '1.0m matching embroidered silk blouse fabric included',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Cocktail', 'Festive', 'Sangeet'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-19',
    name: 'Red Banarasi Silk Saree with Gold Zari Border',
    slug: 'red-banarasi-silk-saree-with-gold-zari-border',
    tagline: 'Celebratory vermillion red silk crowned with heritage gold zari Korvai motifs.',
    category: 'Banarasi Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Crimson Red',
    colors: [
      {
        name: 'Crimson Red',
        hex: '#8B1E3F',
        image: getNeedToAddImg('Red Banarasi Silk Saree with Gold Zari Border', 'Banarasi Silk Saree with Gold Zari Border (1).jpeg')
      },
      {
        name: 'Scarlet Red',
        hex: '#9E1B32',
        image: getNeedToAddImg('Red Banarasi Silk Saree with Gold Zari Border', 'Banarasi Silk Saree with Gold Zari Border (1).png')
      },
      {
        name: 'Ruby Red',
        hex: '#B22234',
        image: getNeedToAddImg('Red Banarasi Silk Saree with Gold Zari Border', 'Banarasi Silk Saree with Gold Zari Border (2).png')
      },
      {
        name: 'Vermillion Red',
        hex: '#C41E3A',
        image: getNeedToAddImg('Red Banarasi Silk Saree with Gold Zari Border', 'Banarasi Silk Saree with Gold Zari Border (3).png')
      }
    ],
    price: 26500,
    originalPrice: 32000,
    discountBadge: '17% OFF',
    badge: 'Trousseau Essential',
    rating: 4.95,
    reviewCount: 38,
    images: [
      getNeedToAddImg('Red Banarasi Silk Saree with Gold Zari Border', 'Banarasi Silk Saree with Gold Zari Border (1).jpeg'),
      getNeedToAddImg('Red Banarasi Silk Saree with Gold Zari Border', 'Banarasi Silk Saree with Gold Zari Border (1).png'),
      getNeedToAddImg('Red Banarasi Silk Saree with Gold Zari Border', 'Banarasi Silk Saree with Gold Zari Border (2).png'),
      getNeedToAddImg('Red Banarasi Silk Saree with Gold Zari Border', 'Banarasi Silk Saree with Gold Zari Border (3).png')
    ],
    description: 'The archetype of traditional Indian wedding glamour. Lustrous scarlet red Katan silk richly brocaded with fine gold zari buttis, flanked by an opulent temple border.',
    weaveDetail: 'Authentic Banarasi kadhwa hand-weave.',
    zariType: 'Certified Pure Gold Plated Zari',
    palluDetail: 'Dense royal wedding procession motif',
    blouseIncluded: true,
    blouseDetails: '0.85m running red silk blouse fabric with gold border',
    sareeLength: '5.5 meters length x 1.18 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Bridal', 'Reception', 'Puja & Rituals'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-20',
    name: 'Traditional printed saree with a sleeveless, fitted blouse',
    slug: 'traditional-printed-saree-with-a-sleeveless-fitted-blouse',
    tagline: 'Timeless traditional printed motifs with an impeccably tailored sleeveless blouse.',
    category: 'Designer Sarees',
    fabric: 'Pure Organza',
    color: 'Dark Blue',
    colors: [
      {
        name: 'Dark Blue',
        hex: '#1C2841',
        image: getNeedToAddImg('Traditional printed saree with a sleeveless, fitted blouse', 'Traditional printed saree with a sleeveless, fitted blouse (dark Blue).png')
      },
      {
        name: 'Dark Olive',
        hex: '#3D4A32',
        image: getNeedToAddImg('Traditional printed saree with a sleeveless, fitted blouse', 'Traditional printed saree with a sleeveless, fitted blouse (Dark Olive).png')
      },
      {
        name: 'Violet',
        hex: '#5B2C6F',
        image: getNeedToAddImg('Traditional printed saree with a sleeveless, fitted blouse', 'Traditional printed saree with a sleeveless, fitted blouse (Violete).png')
      },
      {
        name: 'Yellow',
        hex: '#C8A96B',
        image: getNeedToAddImg('Traditional printed saree with a sleeveless, fitted blouse', 'Traditional printed saree with a sleeveless, fitted blouse (Yellow).jpeg')
      }
    ],
    price: 17800,
    originalPrice: 22000,
    discountBadge: '19% OFF',
    badge: 'Modern Runway',
    rating: 4.89,
    reviewCount: 25,
    images: [
      getNeedToAddImg('Traditional printed saree with a sleeveless, fitted blouse', 'Traditional printed saree with a sleeveless, fitted blouse (dark Blue).png'),
      getNeedToAddImg('Traditional printed saree with a sleeveless, fitted blouse', 'Traditional printed saree with a sleeveless, fitted blouse (Dark Olive).png'),
      getNeedToAddImg('Traditional printed saree with a sleeveless, fitted blouse', 'Traditional printed saree with a sleeveless, fitted blouse (Violete).png'),
      getNeedToAddImg('Traditional printed saree with a sleeveless, fitted blouse', 'Traditional printed saree with a sleeveless, fitted blouse (Yellow).jpeg')
    ],
    description: 'Chic, sculpted, and effortlessly stylish. Combines traditional heritage prints on featherlight sheer organza silk with a contemporary fitted sleeveless blouse pattern.',
    weaveDetail: 'Lightweight sheer organza print.',
    zariType: 'Fine Foil and Delicate Threadwork Borders',
    palluDetail: 'Printed floral cascade with hand-finished tassels',
    blouseIncluded: true,
    blouseDetails: '1.0m matching fabric tailored for sleeveless fitted cut',
    sareeLength: '5.5 meters length x 1.12 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Party Wear', 'Cocktail', 'Mehendi'],
    inStock: true,
    featured: true,
    trending: true
  }
];

export const EDITORIAL_COLLECTIONS = [
  {
    id: 'the-bridal-edit',
    title: 'The Bridal Edit',
    subtitle: 'Royal Wedding Trousseau',
    description: 'Heirloom Kanjivaram and Banarasi sarees hand-woven with pure gold zari, designed for brides creating memories that echo through generations.',
    image: getShopSareeImg('Mayurakshi Kanjivaram Bridal Silk Saree', 'Mayurakshi Kanjivaram Bridal Silk Saree (Crimson Red).png'),
    linkCategory: 'Bridal Sarees',
    badge: 'Couture 2026'
  },
  {
    id: 'the-silk-heritage',
    title: 'The Silk Heritage',
    subtitle: 'Varanasi & Kanchipuram Lore',
    description: 'Celebrating hundreds of years of pit loom mastery, raw mulberry silks, and intricately hand-interlocked temple borders.',
    image: getShopSareeImg('Varanasi Noor Kadhwa Banarasi Brocade', 'Varanasi Noor Kadhwa Banarasi Brocade (Wine Plum).png'),
    linkCategory: 'Silk Sarees',
    badge: 'Master Weaver Series'
  },
  {
    id: 'contemporary-classics',
    title: 'Contemporary Classics',
    subtitle: 'Modern Minimalist Luxury',
    description: 'Sheer translucent organza, tissue silks, and refined twilight palettes crafted for the modern Indian connoisseur.',
    image: getShopSareeImg('Chandrika Midnight Flora Pure Organza Saree', 'Chandrika Midnight Flora Pure Organza Saree  (Midnight Blue).png'),
    linkCategory: 'Designer Sarees',
    badge: 'Limited Edition'
  },
  {
    id: 'festive-radiance',
    title: 'Festive Radiance',
    subtitle: 'Celebration Colorways',
    description: 'Joyous shades of rani pink, auspicious turmeric gold, and deep peacock teal woven with shimmering brocade jaals.',
    image: getShopSareeImg('Tarangini Rani Pink Festive Brocade Saree', 'Tarangini Rani Pink Festive Brocade Saree (Rani Pink).png'),
    linkCategory: 'Festive Sarees',
    badge: 'Festive Season'
  },
  {
    id: 'the-evening-collection',
    title: 'The Evening Collection',
    subtitle: 'Chandelier Cocktail Drapes',
    description: 'Dramatic obsidian blacks, metallic tissue sheens, and liquid drapes that capture the romance of grand nighttime celebrations.',
    image: getShopSareeImg('Kashish Midnight Obsidian Meenakari Saree', 'Kashish Midnight Obsidian Meenakari Saree (Charcoal Black).png'),
    linkCategory: 'Party Wear Sarees',
    badge: 'Evening Soiree'
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Radhika S. Rao',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    date: 'February 2026',
    verified: true,
    title: 'The crown jewel of my wedding trousseau',
    comment: 'I ordered the Mayurakshi Bridal Kanjivaram for my wedding Muhurtham. The weight of the silk, the certified purity of the zari, and the exquisite packaging surpassed even the finest luxury boutiques in Chennai. Aaranya Silks delivered an heirloom I will cherish forever.',
    sareePurchased: 'Mayurakshi Kanjivaram Bridal Silk Saree',
    occasion: 'Wedding Muhurtham'
  },
  {
    id: 'rev-2',
    author: 'Devika Singhania',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: 'January 2026',
    verified: true,
    title: 'Unmatched Kadhwa craftsmanship and regal drape',
    comment: 'The Varanasi Noor Banarasi is pure art. You can immediately feel the authentic pit loom texture and the absence of floating threads on the reverse side. The burgundy and wine shade is deeply royal under evening chandelier light.',
    sareePurchased: 'Varanasi Noor Kadhwa Banarasi Brocade',
    occasion: 'Family Wedding Reception'
  },
  {
    id: 'rev-3',
    author: 'Suniti Mehra',
    location: 'New Delhi',
    rating: 5,
    date: 'March 2026',
    verified: true,
    title: 'Ethereal organza that turns every head',
    comment: 'The Chandrika Organza in Midnight Blue was a showstopper at my sister’s cocktail gala. It is whisper-light yet structured, and the scallop embroidery is done with flawless precision. Thank you Aaranya Silks!',
    sareePurchased: 'Chandrika Midnight Flora Pure Organza Saree',
    occasion: 'Cocktail Gala'
  },
  {
    id: 'rev-4',
    author: 'Meenakshi Iyer',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    date: 'December 2025',
    verified: true,
    title: 'Authentic temple border and pure silk luster',
    comment: 'Being from Chennai, our family has very exacting standards for Kanjivaram silks. The Korvai interlock in the Rajkumari saree is flawless. The silk is dense, the gold zari has genuine luster without looking gaudy. Truly luxury personified.',
    sareePurchased: 'Rajkumari Emerald Temple Kanjivaram',
    occasion: 'Temple Kalyanam'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'insta-1',
    image: getShopSareeImg('Mayurakshi Kanjivaram Bridal Silk Saree', 'Mayurakshi Kanjivaram Bridal Silk Saree (Crimson Red).png'),
    handle: '@aaranyasilks',
    tag: '#AaranyaBride',
    caption: 'Moments of quiet grace before the vows are spoken.'
  },
  {
    id: 'insta-2',
    image: getShopSareeImg('Varanasi Noor Kadhwa Banarasi Brocade', 'Varanasi Noor Kadhwa Banarasi Brocade (Wine Plum).png'),
    handle: '@aaranyasilks',
    tag: '#VaranasiHeritage',
    caption: 'Woven poetry in pure Katan silk and gold zari.'
  },
  {
    id: 'insta-3',
    image: getShopSareeImg('Swarna Hansa Pure Tissue Silk Saree', 'SWARNA HANSA (Champagne Gold).png'),
    handle: '@aaranyasilks',
    tag: '#TissueSilkElegance',
    caption: 'Catching the golden hour in our Swarna Hansa tissue drape.'
  },
  {
    id: 'insta-4',
    image: getShopSareeImg('Chandrika Midnight Flora Pure Organza Saree', 'Chandrika Midnight Flora Pure Organza Saree  (Midnight Blue).png'),
    handle: '@aaranyasilks',
    tag: '#ContemporaryFlora',
    caption: 'Translucent organza hand-detailed with botanical scalloping.'
  },
  {
    id: 'insta-5',
    image: getShopSareeImg('Tarangini Rani Pink Festive Brocade Saree', 'Tarangini Rani Pink Festive Brocade Saree (Rani Pink).png'),
    handle: '@aaranyasilks',
    tag: '#FestiveSplendor',
    caption: 'Radiant magenta and rich chevron brocade for unforgettable celebrations.'
  },
  {
    id: 'insta-6',
    image: getShopSareeImg('Ananya Ivory & Gold Shalu Heritage Saree', 'Ananya Ivory & Gold Shalu Heritage Saree (Warm Ivory).png'),
    handle: '@aaranyasilks',
    tag: '#WarmIvoryHeritage',
    caption: 'The timeless harmony of ivory silk and antique gold kalga motifs.'
  }
];
