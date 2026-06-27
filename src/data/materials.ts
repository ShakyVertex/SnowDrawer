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
    name: 'PP蓄水池模块 雨水收集利用系统模块',
    imageUrl: 'https://placehold.co/80x80/e5e7eb/6b7280?text=模块',
    price: 1280,
    remark: '尺寸：100cm × 100cm × 25cm',
  },
  {
    id: 'grid',
    name: '格珊网',
    imageUrl: 'https://placehold.co/80x80/e5e7eb/6b7280?text=格网',
    price: 45,
    remark: '尺寸：50cm × 50cm × 3cm',
  },
  {
    id: 'foam-5cm',
    name: '泡沫板',
    imageUrl: 'https://placehold.co/80x80/ddd6fe/7c3aed?text=5cm',
    price: 86,
    remark: '尺寸：60cm × 180cm × 5cm，外围防水',
  },
  {
    id: 'truss-1m',
    name: '桁架',
    imageUrl: 'https://placehold.co/80x80/fecaca/ef4444?text=1m',
    price: 320,
    remark: '铝合金桁架',
  },
]
