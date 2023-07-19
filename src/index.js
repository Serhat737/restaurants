///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///     WEBSITE       \\\

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';

const { useState, useEffect } = React;
const serverLink = "https://restaurantsapii.glitch.me";


const Header = () => {
    return (
        <div className="header">
            <div className="header-window">
                <div className="header-inner">
                    <div className="header-inner-left">
                        <img src="img/header-logo.jpg" alt="Logo" className="header-site-logo" />
                        <div className="header-text-box">
                            <h1 className="header-site-title">Metro Vancouver Restaurant Finder</h1>
                            <h6 className="header-site-description">Discover Local Dining Options</h6>
                        </div>
                    </div>
                    <nav className="header-inner-right">
                        <ul className="nav-ul">
                            <li className="nav-li"><a className="nav-li-a" href="index.html"> {/*home*/} </a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

const Main = (props) => {

    return (
        <main>
            <div className="welcome-section">
                <h2 className="welcome-section-text1">Welcome to page</h2>
                <p className="welcome-section-text2">Total 3 HTML pages are included in this template. </p>
            </div>

            <div className="paging-buttons">
                <nav className="paging-buttons-nav">
                    <ul className="paging-buttons-ul">
                        <li className="paging-item">
                            <button className={`paging-link ${props.selectedCity === null || props.selectedCity === "" ? "active" : ""}`}
                                onClick={props.removeCityFilter}>All</button></li>
                        <li className="paging-item">
                            <button href="#" className={`paging-link ${props.selectedCity === "Vancouver" ? "active" : ""}`}
                                onClick={() => props.filterRestaurantsByCity("Vancouver")}>Vancouver</button></li>

                        <li className="paging-item">
                            <button href="#" className={`paging-link ${props.selectedCity === "Burnaby" ? "active" : ""}`}
                                onClick={() => props.filterRestaurantsByCity("Burnaby")}>Burnaby</button></li>

                        <li className="paging-item">
                            <button href="#" className={`paging-link ${props.selectedCity === "New Westminster" ? "active" : ""}`}
                                onClick={() => props.filterRestaurantsByCity("New Westminster")}>New Westminster</button></li>

                    </ul>
                </nav>
            </div>

            <div className="restaurants-cards">
                <div className="restaurants-card-page">
                    {props.restaurants.map(eachRestr =>
                        <Card
                            id={eachRestr.id}
                            title={eachRestr.title}
                            description={eachRestr.description}
                            price={eachRestr.price}
                            imgurl={eachRestr.imgurl}
                            city={eachRestr.city}
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

const Card = (props) => {
    return (
        <article className="restaurants-item">
            <figure className="restaurants-item-figure">
                <div className="img-wrapper">
                    <img src={props.imgurl} alt="Image" className="restaurants-card-img" />
                </div>
                <figcaption>
                    <h4 className="card-title">{props.title}</h4>
                    <p className="card-city">{props.city}</p>
                    <p className="card-description">{props.description}</p>
                    <p className="card-price">{props.price}</p>
                </figcaption>
            </figure>
        </article>
    );
};

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">Valeriya Saltykova(300356784),
                <br></br>Ekaterina Leyvikova(300359240),
                <br></br>Serhat Bayrakci(300364177)</p>
        </footer>
    );
};




const App = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        // Load all restaurants initially
        setFilteredRestaurants(restaurants);
    }, [restaurants]);

    const getData = async () => {
        await fetch(`${serverLink}/getall`)
            .then(response => response.json())
            .then((data) => {
                if (Array.isArray(data) && typeof data === 'object' && data !== null) {
                    // Replace the incorrect server link with the correct one in each restaurant's imgurl
                    const updatedData = data.map((restaurant) => {
                        return {
                            ...restaurant,
                            imgurl: `${serverLink}/${restaurant.imgurl}`
                        };
                    });
                    setRestaurants(updatedData);     //data is passed to cards(state)
                } else {
                    setRestaurants([]);
                }
                console.log(`The data fetched from server; `);
                console.log(data);
            })
            .catch((error) => { console.error('Error fetching data:', error); });

    };






    // Function to filter restaurants based on the selected city
    const filterRestaurantsByCity = (city) => {
        const filtered = restaurants.filter((restaurant) => restaurant.city === city);
        setFilteredRestaurants(filtered);
        setSelectedCity(city);
    };

    const removeCityFilter = () => {
        setFilteredRestaurants(restaurants);
        setSelectedCity(null);
    };


    return (
        <div className='container'>
            <Header />
            <Main
                restaurants={filteredRestaurants}
                filterRestaurantsByCity={filterRestaurantsByCity}
                selectedCity={selectedCity}
                removeCityFilter={removeCityFilter}
            />
            <Footer />
        </div>
    );

}




ReactDOM.render(
    <App

    />,
    document.getElementById('root')
);