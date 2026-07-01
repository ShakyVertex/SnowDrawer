import { AppHeader } from '../components/AppHeader'
import { materials, type Material } from '../data/materials'
import '../App.css'

function MaterialTable({ title, nameHeader, items }: { title: string; nameHeader: string; items: Material[] }) {
  return (
    <section className="material-list-section">
      <h2 className="material-list-section-title">{title}</h2>
      <div className="material-table-scroll">
        <table className="material-table">
          <thead>
            <tr>
              <th>{nameHeader}</th>
              <th>图片</th>
              <th>价格</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="material-name">{item.name}</td>
                <td className="material-image">
                  <img src={item.imageUrl} alt={item.name} width={64} height={64} />
                </td>
                <td className="material-price">{item.price}</td>
                <td className="material-remark">{item.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default function MaterialListPage() {
  const materialItems = materials.filter((item) => item.category === 'material')
  const toolItems = materials.filter((item) => item.category === 'tool')

  return (
    <div className="app">
      <AppHeader />

      <main className="material-list-main">
        <MaterialTable title="材料" nameHeader="材料名称" items={materialItems} />
        <MaterialTable title="工具" nameHeader="工具名称" items={toolItems} />
      </main>
    </div>
  )
}
