import logo from './logo.svg';
import './App.css';
import Favorite from './component/Favorite';
import Modals from './component/Modal';
import Search from './component/Search';
import Meals from './component/Meals';
import { useGlobalContext } from './context';




function App() {
 
  const {showModal , favorites} = useGlobalContext()

  return (
  

    <div className="App">
      
      <Search/>
      { favorites.length > 0 &&<Favorite />}
      <Meals />
       { showModal && <Modals/> }

    </div>
    
  );
}

export default App;
