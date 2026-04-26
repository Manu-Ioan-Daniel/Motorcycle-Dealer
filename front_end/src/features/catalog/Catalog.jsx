import MotorcycleList from "./components/MotorcycleList.jsx";
import {Header, Footer} from "../../shared/components/index.js";

export default function Catalog(){

    return (
        <>
            <Header/>
            <MotorcycleList/>
            <Footer/>
        </>
    )
}