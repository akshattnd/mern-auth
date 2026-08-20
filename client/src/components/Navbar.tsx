import { Link } from "react-router"
import { useCurrentUser } from "../hooks/user";
export function Navbar() {
    const { data } = useCurrentUser()
    return (
        <nav className="flex items-center justify-between border-b px-8 py-4">
            <h1 className="text-2xl font-bold">Auth Service</h1>
            <ul className="flex item-center gap-4">
                {data?.data ? <>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </> : <>

                    <li>
                        <Link to='/sign-in'>Sign In</Link>
                    </li>

                    <li>
                        <Link to='/sign-up'>Sign Up</Link>
                    </li></>}

            </ul>

        </nav>

    );

}