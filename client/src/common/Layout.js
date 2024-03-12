import { Navigate, Outlet } from "react-router-dom"
import Navigates from "./Navigate"
const Layout = () => {
    return <div className="page">
        <header><Navigates /></header>
        <main className="main">
            <Outlet />
        </main>
        <footer></footer>
    </div>
}
export default Layout