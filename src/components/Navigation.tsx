import {Link} from "react-router-dom";

export function Navigation() {
    return (
        <nav className={"nav wrapper"}>
            <Link to="/">Main</Link>
            <Link to="/current-enterprise">Current enterprise</Link>
            <Link to="/add-enterprise">Add enterprise</Link>
        </nav>
    )
}