export type ConstructionStep = {
  id: string
  title: string
  description: string
  materialsTools: string
}

export const constructionSteps: ConstructionStep[] = [
  {
    id: 'prepare',
    title: '连接施工水电',
    description: '长插线板接电正常，爬焊枪、高压水枪正常；场地水管正常，不漏水，水管和高压水枪正常',
    materialsTools: '电缆、长插线板、土工膜爬焊机、高压水枪',
  },
  {
    id: 'truss-1',
    title: '搭建外围桁架（基础）',
    description: '电动扳手+手动扳手，连接外围桁架（不封顶）',
    materialsTools: '桁架（120cm）、桁架（200cm）、螺帽螺母、电动扳手、手动扳手',
  },
  {
    id: 'foam base',
    title: '搭建泡沫板地基',
    description: '铺设场地四周的双层5cm板，铺设场地内部的单层5cm地基，使用美工刀裁剪地基',
    materialsTools: '泡沫板（5cm）、美工刀',
  },
]
