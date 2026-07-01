import { AppHeader } from '../components/AppHeader'
import { constructionSteps } from '../data/constructionSteps'
import '../App.css'

export default function ConstructionProcessPage() {
  return (
    <div className="app">
      <AppHeader />

      <main className="construction-process-main">
        <div className="construction-process-scroll">
          <ol className="construction-steps">
            {constructionSteps.map((step) => (
              <li key={step.id} className="construction-step">
                <div className="construction-step-header">
                  <span className="construction-step-order">{step.order}</span>
                  <h2 className="construction-step-title">{step.title}</h2>
                </div>
                <p className="construction-step-description">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  )
}
