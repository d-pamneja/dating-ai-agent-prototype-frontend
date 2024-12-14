import './App.css'
import LokiMuseChatPrototype from './home'
import { Toaster } from 'react-hot-toast';

function App() {

  async function activateCorsAnywhere() {
      try {
          const response = await fetch('https://cors-anywhere.herokuapp.com/corsdemo', {
              method: 'GET',
          });
          if (response.ok) {
              console.log('CORS-Anywhere demo server activated successfully.');
          } else {
              console.error('Failed to activate CORS-Anywhere:', response.statusText);
          }
      } catch (error) {
          console.error('Error activating CORS-Anywhere:', error);
      }
  }

  // Call the activation function when the app loads
  activateCorsAnywhere();


  return (
    <>
    <Toaster position="top-center"/>
      <LokiMuseChatPrototype/>
    </>
  )
}

export default App
