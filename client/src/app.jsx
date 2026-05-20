import Layout from "./Components/Layout";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
function App() {

    return (
        <main className="app font-text">
            <AnimatePresence mode="wait" beforeEnter={false}>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </AnimatePresence>
        </main>
    )
}

export default App;