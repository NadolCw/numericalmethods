import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import {Input,Table} from 'antd';
import * as Math from 'mathjs';

var MatrixA=[],MatrixB=[],MatrixC=[],Error=[],A=[],B=[],C=[],DataTable=[],Columns=[],count=0;
class GaussSeidel extends Component{
    constructor(props){
        super(props);
        this.state={showMatrix:false,showOutput:false,variable:""};
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);   
        this.GaussSeidel=this.GaussSeidel.bind(this);
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
            C[i] = [];
            for(var j=0 ; j<this.state.variable ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
            C[i].push(parseFloat(document.getElementById("x"+(i+1)).value));
        }
    }
    GaussSeidel(event) {
        this.initMatrix();
        var k=0;
        var Err=()=>{
          var temp;
          for(let i=0;i<this.state.variable;i++){
              Error[i]=[];
              for(let j=0;j<C[i].length;j++){
                if(j===0){
                  Error[i].push(100);
                }
                else{
                  temp=Math.abs((C[i][j]-C[i][j-1])/C[i][j]);
                  Error[i].push(temp.toFixed(6));
                }
              }
          }
          console.log(Error);
        }

        do{
            for(let i=0;i<this.state.variable;i++){
                let sum=0;
                let z=0;;
                for(let j=0;j<this.state.variable;j++){
                    if(i!==j){
                        if(z<i){
                            sum=sum+A[i][j]*C[j][k+1];
                        }
                        else{
                            sum=sum+A[i][j]*C[j][k];
                        }
                    }
                    z++;
                }
                C[i].push((B[i]-sum)/A[i][i]);
            }
            k++;
        }while(k<10);
        Err();
        this.initColumns();
        this.appendDataTable();
        this.setState({showOutput: true});
    }
    initColumns() {
        Columns=[];
        Columns.push({
            title: "Iteration",
            dataIndex: "i",
            key: "i"
        });
          for (var i=1 ; i<=this.state.variable ; i++) {
              Columns.push({
                  title: "X"+i,
                  dataIndex: "x"+i,
                  key: "x"+i
              },);
              Columns.push({
                  title: "Error"+i,
                  dataIndex: "error"+i,
                  key: "error"+i
              },);
          }
    }
    appendDataTable() {
        count=0;
        DataTable=[];
        for (let i=0 ; i<C[1].length ; i++) {
            var str ='';
            str+= '{"i": '+ ++count +',';
            for(let j=0 ; j<this.state.variable ;j++){
                str+='"x'+(j+1)+'": '+C[j][i].toFixed(6)+', "error'+(j+1)+'": '+Error[j][i];
                if (j !== this.state.variable-1) {
                    str += ','
                }
            }
            str += '}';
            DataTable.push(JSON.parse(str));
        }
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
                                  <button type="submit" value="Submit" onClick={this.GaussSeidel}>Submit</button>
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
export default GaussSeidel;
