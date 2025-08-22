import './App.css'
import { AutenticacionProvider } from './features/app/context/AuntenticacionProvider'
import { AppRouter } from './features/app/Routes/AppRouter'

function App() {

  return (
    <AutenticacionProvider>
          <AppRouter />
    </AutenticacionProvider>
  )
}

export default App
