import { Container } from '@material-ui/core';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import SimpleBottomNavigation from './Components/MainNav';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Trending from './Pages/Trending/Trending';
import SearchPage from './Pages/Search/Search';


function App() {
  return (
    <BrowserRouter>
      <Header />
    <div className="app">
    <Container>
<Switch>
  <Route path="/" component={Trending} exact/>
  <Route path="/movies" component={Movies} exact/>
  <Route path="/series" component={Series} exact/>
  <Route path="/search" component={SearchPage} exact/>


</Switch>
    </Container>
    </div>
      <SimpleBottomNavigation />
</BrowserRouter>
  );
}

export default App;
