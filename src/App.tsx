import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {

  const [passcodes, setPasscodes] = useState<string[]>([]);
  const [cardQuantity, setCardQuantity] = useState<{[key: string]: number}>({})
  const [queryParam, setQueryParam] = useState<string>('');
  const [data, setData] = useState<Card[]>([]);

  interface CardSet {
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_rarity_code: string;
    set_price: string;
  }

  interface CardImage {
    id: number; 
    image_url: string; 
    image_url_small: string; 
    image_url_cropped: string
  }

  interface CardPrice {
    cardmarket_price: string, 
    tcgplayer_price: string, 
    ebay_price: string; 
    amazon_price: string; 
    coolstuffinc_price: string
  }

  interface Card {
    archetype: string;
    banlist_info: {ban_tcg: string, ban_ocg: string};
    card_images: CardImage[]
    card_prices: CardPrice[]
    card_sets: CardSet[];
    desc: string;
    frameType: string;
    humanReadableCardType: string;
    id: number;
    name: string;
    race: string;
    type: string;
    ygoprodeck_url: string;
  } 

  useEffect(() => {
    const newCards = { ...cardQuantity }

    for (let i = 0; i < passcodes.length; i++) {
      const passcode = passcodes[i]
      if (newCards[passcode]) {
        newCards[passcode] += 1
      }
      else {
        newCards[passcode] = 1;
      }
    }
    setCardQuantity(newCards)

  }, [passcodes])

  useEffect(() => {
    const param = Object.keys(cardQuantity).join(',')
    setQueryParam(param)
  }, [cardQuantity])


  useEffect(() => {
    if (queryParam) {
      try {
        axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${queryParam}`)
        .then((response) => {
          setData(response.data.data);
        })
      }
      catch (e) {
        console.error(e)
      }
    }
  }, [queryParam])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const fileContent = e.target?.result as string;
        const passcodes = processYDK(fileContent);
        setPasscodes(passcodes);       
        setCardQuantity({})
      };

      reader.onerror = function () {
        console.error('Error reading the file'); 
      };

      reader.readAsText(file); 
    } 
    else {
      console.error('No file selected');  
    }
  };

  const processYDK = (content: string): string[] => {
    const lines = content.split('\n');
    return lines.filter(line => line.trim() !== '' && (!line.startsWith('#')) && (!line.startsWith('!')));
  };
  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept='ydk'/>
      <div>
        <h3>Passcodes:</h3>
        <ul>
          {data.map((card) => (
            <div key={card.id}>{card.name}</div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
