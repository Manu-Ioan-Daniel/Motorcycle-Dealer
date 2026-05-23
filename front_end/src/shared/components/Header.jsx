import Navbar from "./Navbar.jsx";
import SearchBar from "./SearchBar.jsx";
import {useSessionGuard} from "../../features/catalog/utils/useSessionGuard.jsx";

export default function Header() {
    useSessionGuard();
    return (
        <>

            <Navbar/>
            <SearchBar/>
        </>
    );
}