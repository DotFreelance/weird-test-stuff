import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import * as PIXI from 'pixi.js';

// Components.
import NavBar from './components/NavBar';

// Routes.
import routes from './routes';

// Styles.
import './App.scss';

function RenderApp({ location }) {
    const pixi = new PIXI.Application({ 
        resolution: 2,
        autoDensity: true,
        antialias: true,
        transparent: true
    });

    return (
        <div className="RenderApp">
            <NavBar currentRoute={ routes.findIndex(route => route.path === location.pathname) } />
            <Switch location={ location }>
                {
                    routes.map((route, key) => 
                        <Route key={ key } 
                               exact
                               path={ route.path }
                               render={(routeProps) => (route.component ? <route.component { ...routeProps } { ...{ pixi } } /> : null)} 
                        />
                    )
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
