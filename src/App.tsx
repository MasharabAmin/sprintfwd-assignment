import Navbar from "./components/organisms/Navbar"
import Routes from "./routes"
import { AppContextProvider } from "./store/context"

const  App=()=> (
  <AppContextProvider>
    <Navbar />
    <Routes />
  </AppContextProvider>
)

export default App
