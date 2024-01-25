import { Link } from 'react-router-dom';
import './App.css';
import bgimg from './assets/bgimg.jpg'
function App() {
  return (
    <div className="App">
      <div class="d-grid gap-2">
        <Link to={'/Home'}>
          <button
            type="button"
            name=""
            id=""
            class="goBtn border-0 rounded-2 "
          >
            LetsGo...!
          </button>
        </Link>

      </div>


      <h1></h1>
    </div>
  );
}

export default App;
