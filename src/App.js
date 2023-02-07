import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ShipCard from "./components/ShipCard";

function App() {
// States
  const [shipList, setShipList] = useState([]);
  const [shipImages, setShipImages] = useState([]); 
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(true)

// Max number of pages for the API request  
  const TOTAL_PAGES = 4

// Function that gets the list of ships from the API and puts in "shipList"
const callApi = async () => {
  setLoading(true)
  axios.get(`https://swapi.dev/api/starships/?page=${currentPage}`)
  .then((res) => {
    setLoading(false);
    setShipList(prev => [...prev, ...res.data.results]);
  }).catch(error => {
    console.log('An error occurred while fetching the data. Please try again later.')
  });
}

// Function that gets the list of ships and builds new urls with the url ids and the img ids
const callApiImages = async () => {
  axios.get(`https://swapi.dev/api/starships/?page=${currentPage}`).then((res) => {
      const urls = res.data.results.map(element =>
        element.url);
      const idsMapped = urls.map(element => element.match(/\d+/))
      const finalUrls = idsMapped.map(element => `https://starwars-visualguide.com/assets/img/starships/${element[0]}.jpg`)
      setShipImages(prev => [...prev, ...finalUrls]);
    });
}

//Effect to stop the API requests if the max number of pages is reached, else it shows a message
useEffect(() => {
  if (currentPage <= TOTAL_PAGES) {
    callApi();
    callApiImages();
  } else {
    setHasMoreResults(!hasMoreResults)
  }
}, [currentPage])

// Combines both states so that I can pass shipList with the img values as props
  for (let i = 0; i < shipList.length; i++) {
    shipList[i].img = shipImages[i];
  }

// Maps over shipList state and passes all of its values to as props to Shipcard
  const shipCards = shipList.map((item) => (
    <>
    <ShipCard item={item}/>
    </>
  ));

// Code to apply infinite scroll to the API calls and increment the currentPage state
useEffect(() => {
  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1)
  }
});
  intersectionObserver.observe(document.querySelector('#sentinel'));
  return () => intersectionObserver.disconnect();
}, []);


  return (
    <div>
      <Header />
      <Navbar />
      {shipCards}
      {loading && <p>Loading...</p>}
      <div id="sentinel"></div>
      {!hasMoreResults && <p>No more starships to be displayed</p>}
    </div>
  );
}

export default App;
