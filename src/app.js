import { Layout } from './components/layout'
import { Routes, Route } from 'react-router-dom'
import { ConfigView, LogView } from './views'

export const App = () => {

  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={ <LogView /> } />
        <Route exact path="/config" element={ <ConfigView /> } />
      </Routes>
    </Layout>
  )
}
