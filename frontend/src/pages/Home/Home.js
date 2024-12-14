import React from "react";
import Navigation from "../../components/Navigation";
import heroImg from "../../assets/images/hero-img.jpg";

const Home = () => {

    return (
        <div className="container">
            <Navigation />
            <div className="rounded mt-4 d-flex justify-content-center align-items-center text-white" style={{height: "50vh", backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "bottom"}}>
                <h1>music theory, for anyone.</h1>
            </div>
        </div>
    )
}

export default Home;