export type Material = {
  id: string
  name: string
  imageUrl: string
  price: string
  remark: string
}

export const materials: Material[] = [
  {
    id: 'module',
    name: '模块',
    imageUrl: 'https://placehold.co/80x80/e5e7eb/6b7280?text=M',
    price: '? 元/件',
    remark: 'PP蓄水池模块 雨水收集利用系统模块\n尺寸：100cm × 100cm × 25cm',
  },
  {
    id: 'grid',
    name: '格网',
    imageUrl: 'https://placehold.co/80x80/e5e7eb/6b7280?text=G',
    price: '? 元/件',
    remark: '洗车店塑料格珊网\n尺寸：50cm × 50cm × 3cm',
  },
  {
    id: 'foam-3cm',
    name: '泡沫板（3cm）',
    imageUrl: 'https://placehold.co/80x80/ddd6fe/7c3aed?text=3cm',
    price: '10-20 元/件',
    remark: '尺寸：60cm × 180cm × 3cm',
  },
  {
    id: 'foam-5cm',
    name: '泡沫板（5cm）',
    imageUrl: 'https://placehold.co/80x80/ddd6fe/7c3aed?text=5cm',
    price: '10-20 元/件',
    remark: '尺寸：60cm × 180cm × 5cm',
  },
  {
    id: 'truss-1.2m',
    name: '桁架（120cm）',
    imageUrl: 'https://placehold.co/80x80/fecaca/ef4444?text=1.2m',
    price: '? 元/件',
    remark: '尺寸：20cm× 20cm × 120cm',
  },
  {
    id: 'truss-2m',
    name: '桁架（200cm）',
    imageUrl: 'https://placehold.co/80x80/fecaca/ef4444?text=2m',
    price: '? 元/件',
    remark: '尺寸：20cm× 20cm × 200cm',
  },
  {
    id: 'waterproof-cloth',
    name: '防水布',
    imageUrl: 'https://placehold.co/80x80/bfdbfe/2563eb?text=WP',
    price: '? 元/平方米',
    remark: '尺寸：25m × 3m',
  },
  {
    id: 'nut-bolt',
    name: '螺帽螺母',
    imageUrl: 'https://placehold.co/80x80/d1d5db/4b5563?text=NB',
    price: '? 元/套',
    remark: 'M8×70 全螺纹外六角螺栓，配 M8 螺母',
  },
  {
    id: 'banner-cloth',
    name: '广告布',
    imageUrl: 'https://placehold.co/80x80/fef08a/ca8a04?text=AD',
    price: '10-20 元/平方米',
    remark: '黑胶、黑底灯布、高度1.2\n顶部20cm 翻面1.2、\n下面出血、边上留白边5公分左右打扣眼到白边上、\n下面还有20公分的位置，包过去用扎带扎起来',
  },
  {
    id: 'cable',
    name: '电缆',
    imageUrl: 'https://placehold.co/80x80/fcd34d/d97706?text=C',
    price: '? 元/米',
    remark: '',
  },
  {
    id: 'pressure-washer',
    name: '高压水枪',
    imageUrl: 'https://placehold.co/80x80/a7f3d0/16a34a?text=PW',
    price: '? 元/件',
    remark: '',
  },
  {
    id: 'electric-wrench',
    name: '电动扳手',
    imageUrl: 'https://placehold.co/80x80/e9d5ff/9333ea?text=EW',
    price: '? 元/件',
    remark: '东成 DCPB80 充电式无刷角向冲击扳手',
  },
  {
    id: 'heat-gun',
    name: '热风枪',
    imageUrl: 'https://placehold.co/80x80/fecdd3/e11d48?text=HG',
    price: '? 元/件',
    remark: '',
  },
  {
    id: 'heat-fusion-gun',
    name: '土工膜爬焊机',
    imageUrl: 'https://placehold.co/80x80/fda4af/dc2626?text=HF',
    price: '? 元/件',
    remark: '用于焊接防水布',
  },
]
