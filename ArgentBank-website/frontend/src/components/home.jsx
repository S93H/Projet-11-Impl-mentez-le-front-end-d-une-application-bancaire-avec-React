import React from 'react';
import Nav from './nav';
import HomeMain from './homeMain';
import Footer from './footer';
import '../styles/main.css';

function Home() {
    return (
        <div>
            <Nav />
            <HomeMain />
            <Footer />
        </div>

    );
}

export default Home;