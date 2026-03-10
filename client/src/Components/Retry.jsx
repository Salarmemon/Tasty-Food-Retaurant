import { Link } from "react-router-dom";

function Retry() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Something went wrong</h1>
            <p className="text-lg text-gray-600 mb-8">Maybe this Email is already existed or netwrok connection failed</p>
            <Link to="/" className="px-6 py-3 bg-gradient-to-t from-yellow-600 to-yellow-300 rounded-lg hover:from-yellow-300 hover:to-yellow-600 hover:scale-105 font-extrabold text-center">Retry</Link>
        </div>
    );

}
export default Retry;