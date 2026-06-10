
import './App.css'
import api from './api/api';

function App() {
  const testAPI = async () => {
    try {
      const response = await api.get("/test");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching test API:", error);
    }
  }
  return (
    <>
      <h1>Hey, there!</h1>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <button className="bg-blue-500 hover:bg-blue-700 my-4 text-white font-bold py-2 px-4 rounded" onClick={testAPI}>
        Test API
      </button>
    </>
  )
}

export default App
