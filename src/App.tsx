import { FormEvent, useState, useEffect } from 'react';
import './app.css';
import PlayerName from './components/PlayerName/PlayerName';
import Resource from './components/Resource/Resource';

// Function to load resources from localStorage
function loadResource(resource: string) {
  const savedResource = localStorage.getItem(resource);
  return savedResource ? Number(savedResource) : 0;
}

function App() {
  // State initialization for resources and their production values
  const [Megacredit, setMegacredit] = useState(loadResource("megacredit"));
  const [MegacreditProduction, setMegacreditProduction] = useState(loadResource("mproduction"));
  const [Steel, setSteel] = useState(loadResource("steel"));
  const [SteelProduction, setSteelProduction] = useState(loadResource("sproduction"));

  // New resources
  const [Titan, setTitan] = useState(loadResource("titan"));
  const [Plants, setPlants] = useState(loadResource("plants"));
  const [Energy, setEnergy] = useState(loadResource("energy"));
  const [Heat, setHeat] = useState(loadResource("heat"));

  // General handler for resource increment
  const handleIncrement = (increment: number, resource: number, setResource: (value: number) => void) => {
    setResource(resource + increment);
  };

  // Sync resources with localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("megacredit", Megacredit.toString());
    localStorage.setItem("steel", Steel.toString());
    localStorage.setItem("mproduction", MegacreditProduction.toString());
    localStorage.setItem("sproduction", SteelProduction.toString());

    // New resources being stored in localStorage
    localStorage.setItem("titan", Titan.toString());
    localStorage.setItem("plants", Plants.toString());
    localStorage.setItem("energy", Energy.toString());
    localStorage.setItem("heat", Heat.toString());
  }, [Megacredit, Steel, MegacreditProduction, SteelProduction, Titan, Plants, Energy, Heat]);

  // Form submit handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMegacredit(Megacredit + MegacreditProduction);
    setSteel(Steel + SteelProduction);
    // You can add similar production logic for the new resources if necessary
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <PlayerName />

      <Resource
        name='Megacredit'
        amount={Megacredit}
        onchange={(increment: number) => handleIncrement(increment, Megacredit, setMegacredit)}
        production={MegacreditProduction}
        onchangeProductivity={(increment: number) => handleIncrement(increment, MegacreditProduction, setMegacreditProduction)}
      />

      <Resource
        name='Steel'
        amount={Steel}
        onchange={(increment: number) => handleIncrement(increment, Steel, setSteel)}
        production={SteelProduction}
        onchangeProductivity={(increment: number) => handleIncrement(increment, SteelProduction, setSteelProduction)}
      />

      {/* New resources */}
      <Resource
        name='Titan'
        amount={Titan}
        onchange={(increment: number) => handleIncrement(increment, Titan, setTitan)}
      />
      
      <Resource
        name='Plants'
        amount={Plants}
        onchange={(increment: number) => handleIncrement(increment, Plants, setPlants)}
      />

      <Resource
        name='Energy'
        amount={Energy}
        onchange={(increment: number) => handleIncrement(increment, Energy, setEnergy)}
      />

      <Resource
        name='Heat'
        amount={Heat}
        onchange={(increment: number) => handleIncrement(increment, Heat, setHeat)}
      />

      <button type='submit' className='NextRound'>Next Round</button>
    </form>
  );
}

export default App;
