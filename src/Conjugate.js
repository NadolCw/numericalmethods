import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import {Input,Table} from 'antd';
import * as math from 'mathjs';

var MatrixA=[],MatrixB=[],MatrixC=[],Error=[],A=[],B=[],C=[],DataTable=[],Columns=[],count=0;
class Conjugate extends Component{
    constructor(props){
        super(props);
        this.state={showMatrix:false,showOutput:false,variable:"",Arr:[]};
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);   
        this.Conjugate=this.Conjugate.bind(this);
        this.initColumns=this.initColumns.bind(this);
        this.appendDataTable=this.appendDataTable.bind(this);
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.setState({showMatrix:false,showOutput:false});
        MatrixA=[];
        MatrixB=[];
        MatrixC=[];
        Error=[];
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
        MatrixA=[];
        MatrixB=[];
        MatrixC=[];
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
                MatrixC.push(<Input style={{
                    marginInlineEnd: "2%",
                    marginBlockEnd: "2%",
                }}
                id={"x"+i} key={"x"+i}
                placeholder={"X"+i} />)
            }
            
    }
    initMatrix() {
        A=[];
        B=[];
        C=[];
        Error=[];
        for(var i=0 ; i<this.state.variable ; i++) {
            A[i] = [];
            for(var j=0 ; j<this.state.variable ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
            C.push(parseFloat(document.getElementById("x"+(i+1)).value));
        }
    }
    Conjugate(event) {
        this.initMatrix();
        var R = math.subtract(math.multiply(A,C), B);
        count=0;
        DataTable=[];
        var D = math.multiply(R, -1);
        var alpha;
        do {

            var Lambda = (math.multiply(math.multiply(math.transpose(D), R), -1)) /
                    (math.multiply(math.multiply(math.transpose(D), A), D))

            C = math.add(C, math.multiply(Lambda, D));

            R = math.subtract(math.multiply(A, C), B);

            Error = Math.sqrt(math.multiply(math.transpose(R), R)).toFixed(6);
            if(Error>0){
              alpha = (math.multiply(math.multiply(math.transpose(R), A), D)) /
                      math.multiply(math.transpose(D), math.multiply(A, D)).toFixed(6);
            }
            else{
              alpha ="";
            }

            this.appendDataTable(Lambda, JSON.stringify(C).split(',').join(",\n"), Error,alpha);
            D = math.add(math.multiply(R, -1), math.multiply(alpha, D))

        }while (Error > 0.000001);
        this.initColumns();
        this.setState({showOutput: true});
    }
    initColumns() {
        Columns=[
        {
          title: "Iteration",
          dataIndex: "iteration",
          key: "iteration"
        },
        {
          title: "Lambda",
          dataIndex: "lambda",
          key: "lambda"
        },
        {
          title: "VectorX",
          dataIndex: "X",
          key: "X"
        },
        {
          title: "Error",
          dataIndex: "error",
          key: "error"
        },
        {
          title: "Alpha",
          dataIndex: "alpha",
          key: "alpha"
        }
      ];
    }
    appendDataTable(lambda,x,error,alpha) {
      DataTable.push({
      iteration: count++,
      lambda: lambda,
      X:x,
      error: error, 
      alpha:alpha
    });
    }

    render() {
      return (
        <div>
            <Header/>
            <Sidebar />
            <div className="content">
            <form id="F" onSubmit={this.handleSubmit}>
                <h1>GAUSS SEIDEL</h1><br></br>
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
                                <h3>Enter X values :</h3>
                                <br/><br/>
                                <div>{MatrixC}</div>
                            </div></center>
                            <div className="field has-addons">
                              <div className="control">
                                  <button type="submit" value="Submit" onClick={this.Conjugate}>Submit</button>
                              </div>
                          </div>
                      </div>
                    }
                    </div><br/>
                    
                    <div>
                {(this.state.showOutput)&&
                  <div id="O">
                      <h3>Output</h3>
                      <center><Table columns={Columns} bordered dataSource={DataTable}></Table></center>
                  </div>
                }
              </div>
            </div>

        </div>
    )
    }
}
export default Conjugate;
