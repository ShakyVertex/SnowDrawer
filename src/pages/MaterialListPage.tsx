import { AppHeader } from '../components/AppHeader'
import { materials } from '../data/materials'
import '../App.css'

export default function MaterialListPage() {
  return (
    <div className="app">
      <AppHeader />

      <main className="material-list-main">
        <div className="material-table-scroll">
          <table className="material-table">
            <thead>
              <tr>
                <th>材料名称</th>
                <th>图片</th>
                <th>价格</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item) => (
                <tr key={item.id}>
                  <td className="material-name">{item.name}</td>
                  <td className="material-image">
                    <img src={item.imageUrl} alt={item.name} width={64} height={64} />
                  </td>
                  <td className="material-price">¥{item.price.toFixed(2)}</td>
                  <td className="material-remark">{item.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
