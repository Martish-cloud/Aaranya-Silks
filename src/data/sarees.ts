import type { Saree, CategoryInfo, CustomerReview } from '../types';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'cat-silk',
    name: 'Silk Sarees',
    slug: 'silk-sarees',
    description: 'Pure Mulberry and Katan silk woven with timeless grace and luster.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    itemCount: 42,
    highlight: 'Handspun Pure Silk'
  },
  {
    id: 'cat-banarasi',
    name: 'Banarasi Sarees',
    slug: 'banarasi-sarees',
    description: 'Centuries of Varanasi craftsmanship adorned with intricate gold kadhwa motifs.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    itemCount: 36,
    highlight: 'Gold & Silver Zari Brocades'
  },
  {
    id: 'cat-kanjivaram',
    name: 'Kanjivaram Sarees',
    slug: 'kanjivaram-sarees',
    description: 'Coromandel heritage woven with 3-ply silk and solid temple borders.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=85',
    itemCount: 28,
    highlight: 'Pure Korvai Temple Weave'
  },
  {
    id: 'cat-organza',
    name: 'Organza Sarees',
    slug: 'organza-sarees',
    description: 'Whisper-light sheer drapes adorned with delicate resham and foil florals.',
    image: 'https://images.unsplash.com/photo-1617627143644-84524458f262?auto=format&fit=crop&w=800&q=85',
    itemCount: 24,
    highlight: 'Airy Contemporary Sheer'
  },
  {
    id: 'cat-designer',
    name: 'Designer Sarees',
    slug: 'designer-sarees',
    description: 'Modern silhouettes, innovative drapes, and bespoke runway embellishments.',
    image: 'https://images.unsplash.com/photo-1609357605156-fcf42a7f0516?auto=format&fit=crop&w=800&q=85',
    itemCount: 30,
    highlight: 'Editorial Statements'
  },
  {
    id: 'cat-bridal',
    name: 'Bridal Sarees',
    slug: 'bridal-sarees',
    description: 'Exquisite bridal heirlooms crafted with real gold zari for your unforgettable day.',
    image: 'https://images.unsplash.com/photo-1617627143719-74d3209867c0?auto=format&fit=crop&w=800&q=85',
    itemCount: 18,
    highlight: 'Royal Wedding Trousseau'
  },
  {
    id: 'cat-party',
    name: 'Party Wear Sarees',
    slug: 'party-wear-sarees',
    description: 'Luminous metallic weaves, cocktail drapes, and glamorous evening silhouettes.',
    image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=800&q=85',
    itemCount: 22,
    highlight: 'Effortless Evening Glamour'
  },
  {
    id: 'cat-festive',
    name: 'Festive Sarees',
    slug: 'festive-sarees',
    description: 'Auspicious hues, rich meenakari work, and joyful celebration drapes.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85',
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
      { name: 'Crimson Red', hex: '#8B1E3F', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Royal Plum', hex: '#651C32', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Auspicious Emerald', hex: '#1B4D3E', image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 26800,
    originalPrice: 32000,
    discountBadge: '16% OFF',
    badge: 'Bridal Masterpiece',
    rating: 4.95,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143719-74d3209867c0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85'
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
      { name: 'Wine Plum', hex: '#651C32', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Rani Rose', hex: '#A52B50', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 23500,
    originalPrice: 28000,
    discountBadge: '16% OFF',
    badge: 'Heirloom Piece',
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469857-e1793540ebf8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
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
      { name: 'Champagne Gold', hex: '#C8A96B', image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Warm Ivory', hex: '#FAF7F0', image: 'https://images.unsplash.com/photo-1610030469857-e1793540ebf8?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 24800,
    originalPrice: 29500,
    discountBadge: '16% OFF',
    badge: 'Bestseller',
    rating: 4.88,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
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
      { name: 'Midnight Blue', hex: '#1C2841', image: 'https://images.unsplash.com/photo-1617627143644-84524458f262?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Charcoal Black', hex: '#1C1A19', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 16500,
    originalPrice: 19800,
    discountBadge: '17% OFF',
    badge: 'New Arrival',
    rating: 4.85,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1617627143644-84524458f262?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1609357605156-fcf42a7f0516?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
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
      { name: 'Emerald Green', hex: '#0B4D3C', image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Crimson Red', hex: '#8B1E3F', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 27200,
    originalPrice: 33000,
    discountBadge: '18% OFF',
    badge: 'Heirloom Piece',
    rating: 5.0,
    reviewCount: 26,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A masterpiece from Kanchipuram celebrating regal South Indian aesthetics. The body features microscopic chakram and diamond buttas in pure silver zari dipped in 24k gold, anchored by contrast red interlocking gopuram (temple) motifs.',
    weaveDetail: 'Traditional 3-shuttle Korvai weave on pit looms.',
    zariType: 'Pure Silver Thread Electroplated with 24k Yellow Gold',
    palluDetail: 'Architectural temple gopuram motifs flanked by ornate elephant yalis',
    blouseIncluded: true,
    blouseDetails: '0.85m contrast ruby red silk blouse piece with gold zari stripes',
    sareeLength: '5.5 meters length x 1.18 meters width',
    careInstructions: [
      'Specialist dry clean only.',
      'Keep away from humidity and moisture.'
    ],
    occasions: ['Bridal', 'Wedding Guest', 'Puja & Rituals'],
    inStock: true,
    featured: true,
    trending: false
  },
  {
    id: 'aaranya-06',
    name: 'Ananya Ivory & Gold Shalu Heritage Saree',
    slug: 'ananya-ivory-gold-shalu-heritage-saree',
    tagline: 'Pristine warm ivory raw silk adorned with opulent floral jaal and meenakari buds.',
    category: 'Silk Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Warm Ivory',
    colors: [
      { name: 'Warm Ivory', hex: '#FAF7F0', image: 'https://images.unsplash.com/photo-1610030469857-e1793540ebf8?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Champagne Gold', hex: '#C8A96B', image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 22900,
    originalPrice: 27500,
    discountBadge: '17% OFF',
    badge: 'Handwoven Exclusive',
    rating: 4.92,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1610030469857-e1793540ebf8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Refined, serene, and majestic. The Ananya saree is handwoven in natural mulberry ivory yarn with an intricate floral jaal reminiscent of Mughal palace marble carvings. Perfect for auspicious daytime weddings, rituals, and milestone celebrations.',
    weaveDetail: 'Katan silk jacquard with floral meenakari highlights in emerald and ruby thread.',
    zariType: 'Real Tested Champagne Gold Zari',
    palluDetail: 'Dense royal kalga (paisley) tapestry weave',
    blouseIncluded: true,
    blouseDetails: '0.8m ivory pure katan silk unstitched blouse piece with matching sleeve borders',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: [
      'Dry clean only.',
      'Protect from direct sunlight.'
    ],
    occasions: ['Puja & Rituals', 'Wedding Guest', 'Festive'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-07',
    name: 'Tarangini Rani Pink Festive Brocade Saree',
    slug: 'tarangini-rani-pink-festive-brocade-saree',
    tagline: 'Vibrant celebratory rani pink embellished with flowing chevron zari waves.',
    category: 'Festive Sarees',
    fabric: 'Banarasi Brocade',
    color: 'Rani Pink',
    colors: [
      { name: 'Rani Pink', hex: '#A52B50', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Crimson Red', hex: '#8B1E3F', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 19800,
    originalPrice: 24000,
    discountBadge: '18% OFF',
    badge: 'Bestseller',
    rating: 4.86,
    reviewCount: 35,
    images: [
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Radiating joy and festive opulence, the Tarangini showcases modern wavy chevron stripes woven with lustrous gold zari over saturated royal magenta silk. Lightweight yet deeply luxurious for festival evenings and sangeet dances.',
    weaveDetail: 'Tanchoi-inspired satin brocade weave.',
    zariType: 'Rich Warm Gold Zari',
    palluDetail: 'Contemporary geometrical wave cascade',
    blouseIncluded: true,
    blouseDetails: '0.85m rani pink brocade blouse fabric with chevron accents',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Festive', 'Sangeet', 'Wedding Guest'],
    inStock: true,
    featured: false,
    trending: true
  },
  {
    id: 'aaranya-08',
    name: 'Gulmohar Pastel Peach Embroidered Organza',
    slug: 'gulmohar-pastel-peach-embroidered-organza',
    tagline: 'Soft sorbet peach sheer silk layered with French knot roses and metallic borders.',
    category: 'Designer Sarees',
    fabric: 'Pure Organza',
    color: 'Coral Peach',
    colors: [
      { name: 'Coral Peach', hex: '#E8987E', image: 'https://images.unsplash.com/photo-1609357605156-fcf42a7f0516?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Warm Ivory', hex: '#FAF7F0', image: 'https://images.unsplash.com/photo-1610030469857-e1793540ebf8?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 14200,
    originalPrice: 17500,
    discountBadge: '19% OFF',
    badge: 'New Arrival',
    rating: 4.8,
    reviewCount: 15,
    images: [
      'https://images.unsplash.com/photo-1609357605156-fcf42a7f0516?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143644-84524458f262?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Designed for daytime garden weddings and cocktail sundowners. This whispery peach organza combines delicate hand-applied moti pearls with fine badla silver zari embroidery along its sculptural edges.',
    weaveDetail: 'Pure silk organza with hand zardozi and bead embellishment.',
    zariType: 'Vintage Matt Silver Zari & Beaten Sequins',
    palluDetail: 'Feather-light sheer drape with scattered flower drops',
    blouseIncluded: true,
    blouseDetails: '1.0m matching hand-embroidered crepe silk blouse piece',
    sareeLength: '5.5 meters length x 1.12 meters width',
    careInstructions: ['Dry clean only.', 'Store folded gently without heavy weights on top.'],
    occasions: ['Cocktail', 'Wedding Guest', 'Sangeet'],
    inStock: true,
    featured: false,
    trending: true
  },
  {
    id: 'aaranya-09',
    name: 'Padmavati Scarlet Red Katan Bridal Saree',
    slug: 'padmavati-scarlet-red-katan-bridal-saree',
    tagline: 'The definitive royal Indian bridal saree featuring timeless shikargah and floral jaal.',
    category: 'Bridal Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Crimson Red',
    colors: [
      { name: 'Crimson Red', hex: '#8B1E3F', image: 'https://images.unsplash.com/photo-1617627143719-74d3209867c0?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Deep Burgundy', hex: '#651C32', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 27500,
    originalPrice: 34000,
    discountBadge: '19% OFF',
    badge: 'Bridal Masterpiece',
    rating: 5.0,
    reviewCount: 49,
    images: [
      'https://images.unsplash.com/photo-1617627143719-74d3209867c0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An ode to generational Indian craftsmanship. The Padmavati bridal saree is spun using pure mulberry yarn boiled and twisted for superior drape, then hand-woven over 180 hours with rich sonaroopa (gold and silver) zari depicting forest sanctuaries and floral arches.',
    weaveDetail: 'Sonaroopa Kadhwa handloom weave from Varanasi.',
    zariType: 'Dual-Tone Pure Gold & Pure Silver Zari',
    palluDetail: 'Monumental 28-inch bridal grand pallu with traditional floral cartouches',
    blouseIncluded: true,
    blouseDetails: '1.0m heavy katan silk blouse piece with full back and sleeve hand-embroidery patterns',
    sareeLength: '5.5 meters length x 1.20 meters width',
    careInstructions: [
      'White glove dry clean only.',
      'Wrapped in Aaranya Silks archival heirloom wooden box with organic cotton muslin.'
    ],
    occasions: ['Bridal', 'Reception'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-10',
    name: 'Sultana Bronze Rust Tissue Katan Saree',
    slug: 'sultana-bronze-rust-tissue-katan-saree',
    tagline: 'Warm burnt copper and antique bronze tones woven into liquid metallic silk.',
    category: 'Party Wear Sarees',
    fabric: 'Tissue Silk',
    color: 'Rust Copper',
    colors: [
      { name: 'Rust Copper', hex: '#B85D38', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Champagne Gold', hex: '#C8A96B', image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 18600,
    originalPrice: 22500,
    discountBadge: '17% OFF',
    badge: 'Handwoven Exclusive',
    rating: 4.89,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Understated nobility defined. The Sultana saree uses antique oxidised copper zari blended into a warm rust silk base, delivering an enchanting glow under festive chandelier lighting.',
    weaveDetail: 'Tissue plain weave with jacquard border borders.',
    zariType: 'Antique Copper & Champagne Zari',
    palluDetail: 'Geometric chevron border with delicate fringe accents',
    blouseIncluded: true,
    blouseDetails: '0.85m matching copper tissue silk blouse piece',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Party Wear', 'Cocktail', 'Reception'],
    inStock: true,
    featured: false,
    trending: true
  },
  {
    id: 'aaranya-11',
    name: 'Kashish Midnight Obsidian Meenakari Saree',
    slug: 'kashish-midnight-obsidian-meenakari-saree',
    tagline: 'Deep charcoal black silk contrasted with vibrant jewel-tone floral meenakari.',
    category: 'Designer Sarees',
    fabric: 'Pure Katan Silk',
    color: 'Charcoal Black',
    colors: [
      { name: 'Charcoal Black', hex: '#1C1A19', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Midnight Blue', hex: '#1C2841', image: 'https://images.unsplash.com/photo-1617627143644-84524458f262?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 21400,
    originalPrice: 26000,
    discountBadge: '18% OFF',
    badge: 'Bestseller',
    rating: 4.94,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Black silk holds a rare and spellbinding place in Indian evening couture. The Kashish drape pairs jet-black raw katan silk with vivid ruby, sapphire, and emerald silk threads woven into intricate floral motifs, outlined in champagne gold.',
    weaveDetail: 'Banarasi Meenakari kadhwa weave.',
    zariType: 'Fine Champagne Gold Zari',
    palluDetail: 'Grand floral trellis with jewel-toned meenakari petals',
    blouseIncluded: true,
    blouseDetails: '0.85m pure black silk unstitched blouse fabric with matching border',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Cocktail', 'Party Wear', 'Reception'],
    inStock: true,
    featured: true,
    trending: true
  },
  {
    id: 'aaranya-12',
    name: 'Vanya Forest Tussar Georgette Saree',
    slug: 'vanya-forest-tussar-georgette-saree',
    tagline: 'Deep pine green organic wild tussar silk with subtle textured rustic luster.',
    category: 'Silk Sarees',
    fabric: 'Tussar Georgette',
    color: 'Forest Emerald',
    colors: [
      { name: 'Forest Emerald', hex: '#1B4D3E', image: 'https://images.unsplash.com/photo-1610030469796-0e31994b6ceb?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Warm Ivory', hex: '#FAF7F0', image: 'https://images.unsplash.com/photo-1610030469857-e1793540ebf8?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 9800,
    originalPrice: 12500,
    discountBadge: '22% OFF',
    badge: 'New Arrival',
    rating: 4.82,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1610030469796-0e31994b6ceb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Celebrates raw natural beauty. Hand-reeled wild tussar silk yarns give this saree a distinctive breathable texture and earthy charm, accented by slender antique gold temple borders.',
    weaveDetail: 'Handspun organic wild tussar handloom weave.',
    zariType: 'Antique Matte Gold Zari',
    palluDetail: 'Contemporary tribal geometric stripe motifs',
    blouseIncluded: true,
    blouseDetails: '0.8m running unstitched tussar silk blouse piece',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.', 'Wrap in breathable cotton.'],
    occasions: ['Festive', 'Wedding Guest', 'Puja & Rituals'],
    inStock: true,
    featured: false,
    trending: false
  },
  {
    id: 'aaranya-13',
    name: 'Devangana Chanderi Royal Zari Saree',
    slug: 'devangana-chanderi-royal-zari-saree',
    tagline: 'Feather-weight woven gold tissue borders over luminous sunshine ochre silk.',
    category: 'Festive Sarees',
    fabric: 'Chanderi Silk',
    color: 'Sunset Ochre',
    colors: [
      { name: 'Sunset Ochre', hex: '#C68B27', image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Coral Peach', hex: '#E8987E', image: 'https://images.unsplash.com/photo-1609357605156-fcf42a7f0516?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 11500,
    originalPrice: 14000,
    discountBadge: '18% OFF',
    badge: 'New Arrival',
    rating: 4.87,
    reviewCount: 20,
    images: [
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Woven in historic Chanderi with centuries-old techniques. Silk warp and pure fine cotton weft create a drape that is crisp, airy, and resplendent with gold ashrafi coins along the borders.',
    weaveDetail: 'Authentic GI-tagged Chanderi handloom.',
    zariType: 'Fine Tested Gold Zari',
    palluDetail: 'Nakshi gold zari stripes and floral rosettes',
    blouseIncluded: true,
    blouseDetails: '0.8m running chanderi silk-cotton blouse piece',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean recommended.'],
    occasions: ['Festive', 'Puja & Rituals', 'Wedding Guest'],
    inStock: true,
    featured: false,
    trending: false
  },
  {
    id: 'aaranya-14',
    name: 'Teal Samriddhi Meenakari Brocade',
    slug: 'teal-samriddhi-meenakari-brocade',
    tagline: 'Vibrant peacock teal silk enriched with miniature flora in dual-toned gold.',
    category: 'Party Wear Sarees',
    fabric: 'Banarasi Brocade',
    color: 'Peacock Teal',
    colors: [
      { name: 'Peacock Teal', hex: '#0B5563', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Emerald Green', hex: '#0B4D3C', image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 20800,
    originalPrice: 25000,
    discountBadge: '17% OFF',
    badge: 'Bestseller',
    rating: 4.91,
    reviewCount: 27,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An arresting shade of peacock jewel teal woven with pure katan silk. Features miniature jaal creepers interwoven with gold zari and rose pink meenakari florets.',
    weaveDetail: 'Kadhwa floral jaal technique on Banarasi handloom.',
    zariType: 'Champagne Gold Zari',
    palluDetail: 'Intricate peacock roundels with floral borders',
    blouseIncluded: true,
    blouseDetails: '0.85m matching teal silk unstitched blouse piece with borders',
    sareeLength: '5.5 meters length x 1.15 meters width',
    careInstructions: ['Dry clean only.'],
    occasions: ['Party Wear', 'Reception', 'Wedding Guest'],
    inStock: true,
    featured: false,
    trending: true
  },
  {
    id: 'aaranya-15',
    name: 'Riddhi Vintage Banarasi Silver Sheen',
    slug: 'riddhi-vintage-banarasi-silver-sheen',
    tagline: 'Lilac lavender silk woven with sterling silver zari vines and delicate petals.',
    category: 'Banarasi Sarees',
    fabric: 'Banarasi Brocade',
    color: 'Lilac Lavender',
    colors: [
      { name: 'Lilac Lavender', hex: '#9C88B0', image: 'https://images.unsplash.com/photo-1610030470298-508f654b9d03?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Warm Ivory', hex: '#FAF7F0', image: 'https://images.unsplash.com/photo-1610030469857-e1793540ebf8?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 22400,
    originalPrice: 27000,
    discountBadge: '17% OFF',
    badge: 'Handwoven Exclusive',
    rating: 4.88,
    reviewCount: 23,
    images: [
      'https://images.unsplash.com/photo-1610030470298-508f654b9d03?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469857-e1793540ebf8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
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
    color: 'Deep Burgundy',
    colors: [
      { name: 'Deep Burgundy', hex: '#651C32', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Crimson Red', hex: '#8B1E3F', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85' }
    ],
    price: 27650,
    originalPrice: 35000,
    discountBadge: '21% OFF',
    badge: 'Bridal Masterpiece',
    rating: 4.97,
    reviewCount: 37,
    images: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
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
  }
];

export const EDITORIAL_COLLECTIONS = [
  {
    id: 'the-bridal-edit',
    title: 'The Bridal Edit',
    subtitle: 'Royal Wedding Trousseau',
    description: 'Heirloom Kanjivaram and Banarasi sarees hand-woven with pure gold zari, designed for brides creating memories that echo through generations.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    linkCategory: 'Bridal Sarees',
    badge: 'Couture 2026'
  },
  {
    id: 'the-silk-heritage',
    title: 'The Silk Heritage',
    subtitle: 'Varanasi & Kanchipuram Lore',
    description: 'Celebrating hundreds of years of pit loom mastery, raw mulberry silks, and intricately hand-interlocked temple borders.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    linkCategory: 'Silk Sarees',
    badge: 'Master Weaver Series'
  },
  {
    id: 'contemporary-classics',
    title: 'Contemporary Classics',
    subtitle: 'Modern Minimalist Luxury',
    description: 'Sheer translucent organza, tissue silks, and refined twilight palettes crafted for the modern Indian connoisseur.',
    image: 'https://images.unsplash.com/photo-1617627143644-84524458f262?auto=format&fit=crop&w=1200&q=85',
    linkCategory: 'Designer Sarees',
    badge: 'Limited Edition'
  },
  {
    id: 'festive-radiance',
    title: 'Festive Radiance',
    subtitle: 'Celebration Colorways',
    description: 'Joyous shades of rani pink, auspicious turmeric gold, and deep peacock teal woven with shimmering brocade jaals.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85',
    linkCategory: 'Festive Sarees',
    badge: 'Festive Season'
  },
  {
    id: 'the-evening-collection',
    title: 'The Evening Collection',
    subtitle: 'Chandelier Cocktail Drapes',
    description: 'Dramatic obsidian blacks, metallic tissue sheens, and liquid drapes that capture the romance of grand nighttime celebrations.',
    image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=1200&q=85',
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
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    handle: '@aaranyasilks',
    tag: '#AaranyaBride',
    caption: 'Moments of quiet grace before the vows are spoken.'
  },
  {
    id: 'insta-2',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    handle: '@aaranyasilks',
    tag: '#VaranasiHeritage',
    caption: 'Woven poetry in pure Katan silk and gold zari.'
  },
  {
    id: 'insta-3',
    image: 'https://images.unsplash.com/photo-1610030469668-932140131d59?auto=format&fit=crop&w=800&q=85',
    handle: '@aaranyasilks',
    tag: '#TissueSilkElegance',
    caption: 'Catching the golden hour in our Swarna Hansa tissue drape.'
  },
  {
    id: 'insta-4',
    image: 'https://images.unsplash.com/photo-1617627143644-84524458f262?auto=format&fit=crop&w=800&q=85',
    handle: '@aaranyasilks',
    tag: '#ContemporaryFlora',
    caption: 'Translucent organza hand-detailed with botanical scalloping.'
  },
  {
    id: 'insta-5',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=85',
    handle: '@aaranyasilks',
    tag: '#FestiveSplendor',
    caption: 'Radiant magenta and rich chevron brocade for unforgettable celebrations.'
  },
  {
    id: 'insta-6',
    image: 'https://images.unsplash.com/photo-1610030469857-e1793540ebf8?auto=format&fit=crop&w=800&q=85',
    handle: '@aaranyasilks',
    tag: '#WarmIvoryHeritage',
    caption: 'The timeless harmony of ivory silk and antique gold kalga motifs.'
  }
];
