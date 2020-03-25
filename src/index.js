import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter,Route} from 'react-router-dom';
import Bisection from './Bisection';
import FalsePosition from './FalsePosition';
import Onepoint from './Onepoint';
import NewtonRaphson from './NewtonRaphson';
import Secant from './Secant';
import Cramer from './Cramer';
import Gauss from './Gauss';
import GaussJordan from './GaussJordan';
import Matrix from './Matrix';
import Lu from './Lu';
import GaussSeidel from './GaussSeidel';
import Conjugate from './Conjugate';

import Trapezoidal from './Trapezoidal';
import Simpson13 from './Simpson13';
import Simpson38 from './Simpson38';

import FWOH from './FWOH';
import BWOH from './BWOH';
import OH2 from './OH2';
import OH4 from './OH4';
import FWOH2 from './FWOH2';
import BWOH2 from './BWOH2';

import About from './About';

ReactDOM.render(
    <BrowserRouter>
    <div>
    <Route exact path="/" component={App} />
    <Route path="/Bisection" component={Bisection} />
    <Route path="/FalsePosition" component={FalsePosition} />
    <Route path="/Onepoint" component={Onepoint} />
    <Route path="/NewtonRaphson" component={NewtonRaphson} />
    <Route path="/Secant" component={Secant} />
    <Route path="/Cramer" component={Cramer} />
    <Route path="/Gauss" component={Gauss} />
    <Route path="/GaussJordan" component={GaussJordan} />
    <Route path="/Matrix" component={Matrix} />
    <Route path="/Lu" component={Lu} />
    <Route path="/GaussSeidel" component={GaussSeidel} />
    <Route path="/Conjugate" component={Conjugate} />
    <Route path="/Trapezoidal" component={Trapezoidal} />
    <Route path="/Simpson13" component={Simpson13} />
    <Route path="/Simpson38" component={Simpson38} />
    
    <Route path="/FWOH" component={FWOH} />
    <Route path="/BWOH" component={BWOH} />
    <Route path="/OH2" component={OH2} />
    <Route path="/OH4" component={OH4} />
    <Route path="/FWOH2" component={FWOH2} />
    <Route path="/BWOH2" component={BWOH2} />

    <Route path="/About" component={About} />
    </div>
    </BrowserRouter>,document.getElementById('root'));

/*ReactDOM.render(<App />, document.getElementById('root'));*/

//serviceWorker.unregister();