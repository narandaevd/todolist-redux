// Styles
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

// Components
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import Todolist from './components/Todolist'

function App() {
  return (
      <div className="App">
        <Header />
        <Container>
          <Todolist />
        </Container>
      </div>
  )
}

export default App;