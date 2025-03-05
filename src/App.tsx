import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {

  const [passcodes, setPasscodes] = useState<string[]>([]);
  const [cardQuantity, setCardQuantity] = useState<{[key: string]: number}>({})
  const [queryParam, setQueryParam] = useState<string>('');
  const [data, setData] = useState();

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
    axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${queryParam}`)
    .then(response => {
      console.log('Data:', response.data);
    })
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const fileContent = e.target?.result as string;
        const passcodes = processYDK(fileContent);
        setPasscodes(passcodes); 
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
      <input type="file" onChange={handleFileUpload} />
      <div>
        <h3>Passcodes:</h3>
        <ul>
          {passcodes.map((passcode, index) => (
            <li key={index}>{passcode}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
