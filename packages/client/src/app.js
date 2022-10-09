import { Layout } from './components/layout'
import { Routes, Route } from 'react-router-dom'
import { ConfigView, LogView } from './views'

export const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={ <LogView /> } />
        <Route path="/config" element={ <ConfigView /> } />
      </Routes>
    </Layout>
  )
}
