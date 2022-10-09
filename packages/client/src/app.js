import { Layout } from './components/layout'
import { Routes, Route } from 'react-router-dom'
import { ConfigView, TimerView } from './views'

export const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={ <TimerView /> } />
        <Route path="/config" element={ <ConfigView /> } />
      </Routes>
    </Layout>
  )
}
