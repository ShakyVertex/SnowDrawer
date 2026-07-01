export type ConstructionStep = {
  id: string
  order: number
  title: string
  description: string
}

export const constructionSteps: ConstructionStep[] = [
  {
    id: 'survey',
    order: 1,
    title: '场地测量与布局',
    description: '测量场地尺寸，确定模块网格、设备房位置及水箱区域，完成整体布局规划。',
  },
  {
    id: 'module',
    order: 2,
    title: '铺设蓄水池模块',
    description: '按设计尺寸铺设 PP 蓄水池模块，确保模块对齐、拼接紧密。',
  },
  {
    id: 'grid',
    order: 3,
    title: '安装格网',
    description: '在模块上方铺设塑料格珊网，覆盖水箱及场地所需区域。',
  },
  {
    id: 'truss',
    order: 4,
    title: '搭建桁架框架',
    description: '按水平/垂直方案安装 1.2m 及 2m 桁架，使用螺栓螺母固定连接。',
  },
  {
    id: 'foam',
    order: 5,
    title: '铺设泡沫板',
    description: '在框架上铺设 3cm 及 5cm 泡沫板，注意避开水箱区域并预留设备房位置。',
  },
  {
    id: 'waterproof',
    order: 6,
    title: '铺设防水布',
    description: '覆盖防水布，使用热熔枪焊接接缝，确保防水密封。',
  },
  {
    id: 'banner',
    order: 7,
    title: '安装广告布',
    description: '在指定区域安装广告布，固定牢固、表面平整。',
  },
  {
    id: 'equipment-room',
    order: 8,
    title: '设备房施工',
    description: '按设备房桁架尺寸搭建框架，完成设备房结构安装。',
  },
  {
    id: 'wiring',
    order: 9,
    title: '布线接电',
    description: '铺设电缆，连接造雪及相关设备，完成电气接线与测试。',
  },
  {
    id: 'inspection',
    order: 10,
    title: '验收调试',
    description: '检查结构、防水及电气系统，进行通水、造雪试机，确认合格后交付。',
  },
]
