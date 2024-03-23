import React, { useState, useEffect } from 'react';
import "./App.css";

const API_KEY = '55641aca-5e9f-4a87-b542-ced1b4f9321b';
const API_BASE_URL = 'https://api.harvardartmuseums.org';

function App() {
  const [artwork, setArtwork] = useState(null);
  const [banList, setBanList] = useState([]);

  useEffect(() => {
    fetchArtwork();
  }, []);

  const fetchArtwork = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/object?apikey=${API_KEY}&size=1&sort=random`);
      const data = await response.json();
      setArtwork(data.records[0]);
    } catch (error) {
      console.error('Error fetching artwork:', error);
    }
  };

  const handleBanAttribute = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  };

  const handleRemoveFromBanList = (attributeToRemove) => {
    const updatedBanList = banList.filter(attribute => attribute !== attributeToRemove);
    setBanList(updatedBanList);
  };

  const renderArtwork = () => {
    if (!artwork) return null;

    const imageUrl = artwork.primaryimageurl || '';
    const title = artwork.title || 'Untitled';
    const artist = artwork.people ? artwork.people[0].name : 'Unknown';
    const period = artwork.period || 'Period Unknown'; 

    return (
      <>
        <div className="info-container">
          <img className="image" src={imageUrl} alt={title} style={{ maxWidth: '100%' }} />
          <h2>{title}</h2>
          <button onClick={() => handleBanAttribute(artist)}>{artist}</button>
          <button onClick={() => handleBanAttribute(period)}>{period}</button>
        </div>

        <div className='button-container'>
          <button onClick={() => fetchArtwork()}>Next Artwork</button>
        </div>


        <h3>Ban List</h3>
        <ul>
          {banList.map((attribute, index) => (
            <li key={index}>
              <button onClick={() => handleRemoveFromBanList(attribute)}>{attribute}</button>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="App">
      <h1>Harvard Art Collection</h1>
      {renderArtwork()}
    </div>
  );
}

export default App;
