import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className ="container">
      <ProfileCard/>
    </div>
    </div>
  );
}

export default App;
