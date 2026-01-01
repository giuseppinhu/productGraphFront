import { Link } from "react-router-dom"

const Home = () => {
    return (
        <>
            <h1>Está é a página Home</h1>
            <Link to="/dashboard">Ir para Dashboard</Link>
        </>
    )
}

export default Home