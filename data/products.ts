export type PriceTier = {
  minQuantity: number;
  pricePerUnit: number;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  shortDescription: string;
  longDescription: string;
  minOrder: number;
  basePricePerUnit: number;
  tiers: PriceTier[];
  leadTimeWeeks: number;
  packaging: string;
  countryOfOrigin: string;
};

export const products: Product[] = [
  {
    id: 'pallet-a',
    name: 'Product A – 1L bottles, full pallet',
    sku: 'A-1L-PALLET',
    shortDescription: '72 cases per pallet • 12 x 1L bottles per case',
    longDescription:
      'Standard 1L format suitable for retail and food service. Export-ready packaging with multi-language artwork available on request.',
    minOrder: 1000,
    basePricePerUnit: 2.1,
    tiers: [
      { minQuantity: 1000, pricePerUnit: 2.1 },
      { minQuantity: 5000, pricePerUnit: 2.0 },
      { minQuantity: 10000, pricePerUnit: 1.9 }
    ],
    leadTimeWeeks: 3,
    packaging: 'Shrink-wrapped cases on euro pallet, 1.2m height',
    countryOfOrigin: 'Germany'
  },
  {
    id: 'pallet-b',
    name: 'Product B – 500ml bottles, mixed pallet',
    sku: 'B-500-PALLET',
    shortDescription: '96 cases per pallet • 24 x 500ml bottles per case',
    longDescription:
      'Compact 500ml format ideal for mixed pallet export. Configure flavour mix and artwork during onboarding.',
    minOrder: 1000,
    basePricePerUnit: 1.35,
    tiers: [
      { minQuantity: 1000, pricePerUnit: 1.35 },
      { minQuantity: 5000, pricePerUnit: 1.28 },
      { minQuantity: 10000, pricePerUnit: 1.22 }
    ],
    leadTimeWeeks: 4,
    packaging: 'Mixed cases on standard pallet, 1.6m height',
    countryOfOrigin: 'Poland'
  },
  {
    id: 'bulk-c',
    name: 'Product C – 1000L IBC',
    sku: 'C-IBC-1000',
    shortDescription: 'Bulk IBC suitable for contract filling',
    longDescription:
      'High-volume format for importers with local bottling capabilities. Supplied in food-grade IBCs with full technical documentation.',
    minOrder: 1000,
    basePricePerUnit: 0.95,
    tiers: [
      { minQuantity: 1000, pricePerUnit: 0.95 },
      { minQuantity: 5000, pricePerUnit: 0.9 },
      { minQuantity: 10000, pricePerUnit: 0.85 }
    ],
    leadTimeWeeks: 5,
    packaging: '1000L food-grade IBC, disposable liner',
    countryOfOrigin: 'Netherlands'
  }
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getTierPrice(product: Product, quantity: number): number {
  const sorted = [...product.tiers].sort((a, b) => a.minQuantity - b.minQuantity);
  let price = product.basePricePerUnit;
  for (const tier of sorted) {
    if (quantity >= tier.minQuantity) {
      price = tier.pricePerUnit;
    }
  }
  return price;
}


