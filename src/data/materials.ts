export type Material = {
  id: string
  name: string
  imageUrl: string
  price: number
  remark: string
}

export const materials: Material[] = [
  {
    id: 'module',
    name: '模块',
    imageUrl: 'https://placehold.co/80x80/e5e7eb/6b7280?text=模块',
    price: 1280,
    remark: '尺寸：100cm × 100cm × 25cm',
  },
  {
    id: 'grid',
    name: '格网',
    imageUrl: 'https://placehold.co/80x80/e5e7eb/6b7280?text=格网',
    price: 45,
    remark: '尺寸：50cm × 50cm × 3cm',
  },
  {
    id: 'foam-5cm',
    name: '5cm泡沫板',
    imageUrl: 'https://placehold.co/80x80/ddd6fe/7c3aed?text=5cm',
    price: 86,
    remark: '尺寸：60cm × 180cm × 5cm，外围防水',
  },
  {
    id: 'foam-3cm',
    name: '3cm泡沫板',
    imageUrl: 'https://placehold.co/80x80/ddd6fe/7c3aed?text=3cm',
    price: 62,
    remark: '尺寸：60cm × 180cm × 3cm',
  },
  {
    id: 'truss-1m',
    name: '桁架（1m）',
    imageUrl: 'https://placehold.co/80x80/fecaca/ef4444?text=1m',
    price: 320,
    remark: '铝合金桁架，长度 1m',
  },
  {
    id: 'truss-12m',
    name: '桁架（1.2m）',
    imageUrl: 'https://placehold.co/80x80/fecaca/ef4444?text=1.2m',
    price: 368,
    remark: '铝合金桁架，长度 1.2m',
  },
  {
    id: 'truss-2m',
    name: '桁架（2m）',
    imageUrl: 'https://placehold.co/80x80/fecaca/ef4444?text=2m',
    price: 520,
    remark: '铝合金桁架，长度 2m',
  },
  {
    id: 'pillar',
    name: '桁架立柱',
    imageUrl: 'https://placehold.co/80x80/fecaca/ef4444?text=柱',
    price: 180,
    remark: '配套桁架立柱',
  },
]
