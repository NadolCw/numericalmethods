import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import {Input} from 'antd';
import * as math from 'mathjs';

var MatrixA=[],MatrixB=[],Output=[],A=[],B=[],C=[];
class Matrix extends Component{
    constructor(props){
        super(props);
        this.state={showMatrix:false,showOutput:false,variable:""};
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);   
        this.Matrix=this.Matrix.bind(this);        
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.setState({showMatrix:false,showOutput:false});
        MatrixA=[];
        MatrixB=[];
    }
    handleSubmit(event) {
        let variable=parseInt(this.state.variable);
        if(variable!==0||variable!==""){
            this.createMatrix(variable);
            this.setState({showMatrix:true});
        }
        event.preventDefault();
    }
    createMatrix(variable) {
            for (var i=1 ; i<=variable ; i++) {
                for (var j=1 ; j<=variable ; j++) {
                    MatrixA.push(<Input style={{
                        marginInlineEnd: "2%",
                        marginBlockEnd: "2%",
                    }}
                    id={"a"+i+""+j} key={"a"+i+""+j}
                    placeholder={"A"+i+""+j} />)
                }
                MatrixA.push(<br key={"br"+i}/>)
                MatrixB.push(<Input style={{
                    marginInlineEnd: "2%",
                    marginBlockEnd: "2%",
                }}
                id={"b"+i} key={"b"+i}
                placeholder={"B"+i} />)
            }
            
    }
    initMatrix() {
        A=[];
        B=[];
        C=0;
        Output=[];
        for(var i=0 ; i<this.state.variable ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.variable ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
        }
    }
    printFraction (value) {
        return math.format(value, { fraction: 'ratio' })
    }
    Matrix(event) {
    this.initMatrix();
    try {
        A = math.inv(A);
        for (let i=0 ; i<this.state.variable ; i++) {
            for(let j=0 ; j<this.state.variable ; j++) {
                Output.push(A[i][j]);                
            }
        }
    } catch (error) {
        console.log('error')
    }
    this.setState({showOutput: true});
    }

    render() {
        const DataRow=(props)=>{return (<tr><td>{C+1}</td>
                                            <td>{Output[C++]}</td>
                                            </tr>);
                                            }
        let rows=Output.map(x =>{return <DataRow key={C+1}/>});

      return (
        <div>
            <Header/>
            <Sidebar />
            <div className="content">
            <form id="F" onSubmit={this.handleSubmit}>
                <h1>MATRIX INVERSION</h1><br></br>
                    <h3>Enter number of variable :</h3>
                    <input name="variable" type="text" value={this.state.variable} onChange={this.handleChange} placeholder="Enter number of variable"></input><br></br><br></br>
                    <button type="submit" value="Submit">Submit</button><br></br><br></br>
            </form>

            <div>
                    {(this.state.showMatrix)&&
                      <div id="M">
                            <h3>Input</h3>
                            <center><div>
                                <h3>Enter Matrix values :</h3>
                                <br/><br/>
                                <div>{MatrixA}</div>
                                <h3>Enter Vector values :</h3>
                                <br/><br/>
                                <div>{MatrixB}</div>
                            </div></center>
                            <div className="field has-addons">
                              <div className="control">
                                  <button type="submit" value="Submit" onClick={this.Matrix}>Submit</button>
                              </div>
                          </div>
                      </div>
                    }
                    </div><br/>
                    
                    <div>
                {(this.state.showOutput)&&
                <div id="O">
                    <center><table>
                    <thead>
                        <tr><th>N</th>
                            <th>X<sub>n</sub></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                    </table></center>                  
                </div>
                }
              </div>
            </div>

        </div>
    )
    }
}
export default Matrix;
