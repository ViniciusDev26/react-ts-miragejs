import { MakeServer } from './server'

if(process.env.NODE_ENV === "development") MakeServer.runServer();

function App() {
  return (
    <h2>Hello</h2>
  )
}

export default App
