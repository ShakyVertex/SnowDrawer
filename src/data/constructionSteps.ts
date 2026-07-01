export type ConstructionStep = {
  id: string
  title: string
  description: string
  materialsTools: string
}

export const constructionSteps: ConstructionStep[] = [
  {
    id: 'prepare',
    title: '连接施工水电，定位工业垃圾处理点，制作广告布',
    description: '长插线板接电正常，爬焊枪、高压水枪正常；场地水管正常，不漏水，水管和高压水枪正常',
    materialsTools: '长插线板、水管、广告公司',
  },
  {
    id: 'truss-1',
    title: '搭建外围桁架基础',
    description: '电动扳手+手动扳手，连接外围桁架（不封顶）',
    materialsTools: '桁架（120cm）、螺帽螺母、电动扳手、手动扳手',
  },
  {
    id: 'foam base',
    title: '搭建泡沫板地基',
    description: '铺设场地四周的双层5cm板，铺设场地内部的单层5cm地基，使用美工刀裁剪地基',
    materialsTools: '泡沫板（5cm）、美工刀',
  },
  {
    id: 'module-1',
    title: '铺设模块（非水池部分）',
    description: '使用叉车运送模块入场，从场地四周向内铺设非水池部分模块，盖上盖子，使用尼龙扎带固定水池边缘模块',
    materialsTools: '模块、模块盖、尼龙扎带、叉车',
  },
  {
    id: 'foam ground',
    title: '铺设泡沫板（非水池部分）',
    description: '暴露在表层的泡沫板可能会被风吹走，离开场地时需要使用桁架压住泡沫板',
    materialsTools: '泡沫板（3cm）、美工刀',
  },
  {
    id: 'wash cloth',
    title: '清洗、焊接防水布',
    description: '清洗：水管冲水-拖把拖洗-高压水枪冲洗-刮水 焊接：爬焊机、热风枪',
    materialsTools: '拖把、水刮、高压水枪、爬焊机、热风枪',
  },
]
