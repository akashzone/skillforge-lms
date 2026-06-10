
import './App.css'
import axios from 'axios';

function App() {
  const testAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/test");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching test API:", error);
    }
  }
  return (
    <>
      <h1>Hey, there!</h1>
      <button onClick={testAPI}>Test API</button>
    </>
  )
}

export default App
