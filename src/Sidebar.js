import React from 'react'
import {Link} from 'react-router-dom';

class Sidebar extends React.Component {
    render(){
        return(
            <div>
                <ul className ="sidebar">
                    {/* <Link to ="/"><img></img></Link> */}
                    <div class="dropdown">
                        <button class="dropbtn">Chapter 1 
                            <i class="fa fa-caret-down"></i>
                        </button>
                            <div class="dropdown-content">
                                <Link to ="/Bisection"><li className ="button">Bisection</li></Link>
                                <Link to ="/FalsePosition"><li className ="button">False-Position</li></Link>
                                <Link to ="/Onepoint"><li className ="button">One-Point</li></Link>
                                <Link to ="/NewtonRaphson"><li className ="button">Newton-Raphson</li></Link>
                                <Link to ="/Secant"><li className ="button">Secant</li></Link>
                            </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Chapter 2 
                            <i class="fa fa-caret-down"></i>
                        </button>
                            <div class="dropdown-content">
                                <Link to ="/Cramer"><li className ="button">Cramer's Rule</li></Link>
                                <Link to ="/Gauss"><li className ="button">Gauss Elimination</li></Link>
                                <Link to ="/GaussJordan"><li className ="button">Gauss Jordan</li></Link>
                                <Link to ="/Matrix"><li className ="button">Matrix Inversion</li></Link>
                                <Link to ="/Lu"><li className ="button">LU Decomposition</li></Link>
                                <li className ="button">Cholesky Decomposition</li>
                                <li className ="button">Jacobi Decomposition</li>
                                <Link to ="/GaussSeidel"><li className ="button">Gauss Seidel</li></Link>
                                <Link to ="/Conjugate"><li className ="button">Conjugate Gradient</li></Link>
                            </div>
                    </div> 
                    <div class="dropdown">
                        <button class="dropbtn">Chapter 3 
                            <i class="fa fa-caret-down"></i>
                        </button>
                            <div class="dropdown-content">
                                <li className ="button" href ="#">Newton Interpolation</li>
                                <li className ="button" href ="#">Lagrange</li>
                                <li className ="button" href ="#">Spline Interpolation</li>
                            </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Chapter 4 
                            <i class="fa fa-caret-down"></i>
                        </button>
                            <div class="dropdown-content">
                                <li className ="button" href ="#">Least Square Regression</li>
                                <li className ="button" href ="#">Polynomial Regression</li>
                                <li className ="button" href ="#">Multiple Linear Regression</li>
                            </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Chapter 5 
                            <i class="fa fa-caret-down"></i>
                        </button>
                            <div class="dropdown-content">
                            <Link to ="/Trapezoidal"><li className ="button">Trapezoidal Rule</li></Link>
                                <Link to ="/Simpson13"><li className ="button">Simpson's Rule(1/3)</li></Link>
                                <Link to ="/Simpson38"><li className ="button">Simpson's Rule(3/8)</li></Link>
                            </div>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">Chapter 6 
                            <i class="fa fa-caret-down"></i>
                        </button>
                            <div class="dropdown-content">
                                <Link to ="/FWOH"><li className ="button">FW O(H)</li></Link>
                                <Link to ="/BWOH"><li className ="button">BW O(H)</li></Link>
                                <Link to ="/OH2"><li className ="button">O(H<sup>2</sup>)</li></Link>
                                <Link to ="/OH4"><li className ="button">O(H<sup>4</sup>)</li></Link>
                                <Link to ="/FWOH2"><li className ="button">FW O(H<sup>2</sup>)</li></Link>
                                <Link to ="/BWOH2"><li className ="button">BW O(H<sup>2</sup>)</li></Link>
                                <li className ="button" href ="#">Euler's Method</li>
                                <li className ="button" href ="#">Heun's Method</li>
                                <li className ="button" href ="#">Modified Euler's Method</li>
                            </div>
                    </div>
                </ul>
            </div>
        )
    }
}

export default Sidebar;