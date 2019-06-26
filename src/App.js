import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import './App.scss';

// Components.
import NavBar from './components/NavBar';

// Routes.
import routes from './routes';

function RenderApp({ location }) {
    return (
        <div className="RenderApp">
            <NavBar currentRoute={ routes.findIndex(route => route.path === location.pathname) } />
            <Switch location={ location }>
                {
                    routes.map((route, key) => <Route key={ key } exact path={ route.path } component={ route.component }></Route>)
                }
            </Switch>
        </div>
    );
}

const RenderAppWithRouter = withRouter(RenderApp);

function App() {
  return (
    <div className="App">
        <Router>
            <RenderAppWithRouter />
        </Router>
    </div>
  );
}

export default App;
