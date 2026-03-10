import Layout from "./Components/Layout";
import { BrowserRouter } from "react-router-dom";
function App() {

    return (
        <main className="app font-text">
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </main>
    )
}

export default App;