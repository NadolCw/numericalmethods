import React from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import * as math from 'mathjs';
import Plot from 'react-plotly.js';
import {LineChart} from 'recharts';
import axios from 'axios';

var X,Y;
class Secant extends React.Component {
    constructor(props) {
        super(props);
        X=[];
        Y=[];
        this.state={Arr:[],x0:"",x1:"",equation:"",submitted:true}; //ประกาศตัวแปร xl xr และ equation
        this.handleSubmit = this.handleSubmit.bind(this); //ประกาศฟังก์ชัน handleSubmit
        this.handleChange = this.handleChange.bind(this); //ประกาศฟังก์ชัน handleChange
        this.SecantMethod=this.SecantMethod.bind(this); //ประกาศฟังก์ชัน SecantMethod
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value}); //ทำการเซตค่า xl xr equation ใหม่ให้เป็นไปตามที่ผู้ใช้กรอก
        this.setState({submitted:true});
        this.setState({Arr:[]});
    }
    handleSubmit(event) {
        let str=this.state.equation; //ให้ str = equation (สมการที่รับมา)
        let c=0;
        for(let i=0;i<str.length;i++){ //เข้าลูปเช็คว่ามี x หรือ X หรือไม่ (ดูว่าที่กรอกมาเป็นสมการหรือเปล่า)
          if(str[i]==="x"||str[i]==="X"){
            c++;
          }
        }
        if((str.length!==0)&&(c!==0)&&this.state.submitted&&this.state.x0!==""){ //เช็คความยาวสมการต้องไม่เท่ากับ 0 และ c ที่เช็ค x ต้องไม่เท่ากับ 0 และ xl ต้องไม่ใช่ค่าว่าง
          axios
          .post("http://localhost:8000/Secant/Secant", {
            x0: parseFloat(this.state.x0),
            x1: parseFloat(this.state.x1),
            equation: this.state.equation
          })
          .then(res => {
            this.setState({result: res.data.result})
            console.log(this.state.result)
          })
          .catch(err => {
            console.log(err);
        });       
          this.SecantMethod(); //ส่งไปที่ฟังก์ชัน SecantMethod
          this.setState({submitted:false});
        }
        event.preventDefault();
    }
    SecantMethod(event){
        X=[];
        Y=[];
        var func=(x)=>{
            let scope={x:x}
            let code=math.compile(this.state.equation);
            return code.eval(scope);
        };
        var err=(x0,x1)=>{
          console.log("x1 is "+x1);
          console.log("x0 is "+x0);
          return Math.abs((x1-x0)/x1)*100};
        var arr;
        var data={x0:0,x1:0,err:"",fx:0,fxdiff:0,count:1};
        var t=true;
        var xOld=parseFloat(this.state.x0);
        data.x0=parseFloat(this.state.x1);
        while(t){
          data.fxdiff=(func(xOld)-func(data.x0))/(xOld-data.x0);
          data.x1=data.x0-(func(data.x0)/data.fxdiff);
          data.fx=func(data.x0);
          data.err=err(data.x0,data.x1).toFixed(4);
          arr=this.state.Arr;
          if(data.err<=0||data.count>15){
            t=false;
          }else{
            arr.push({x0:data.x0,x1:data.x1,err:data.err,count:data.count});
          }
          data.count++;
          xOld=data.x0;
          data.x0=data.x1;
        }
        for(let i=-40;i<=40;i++){
          X.push(i);
          Y.push(func(i));
        }
    }

    render() {
        const DataRow=(props)=>{return (<tr><td>{props.data.count}</td> 
                                            <td>{props.data.x0}</td>
                                            <td>{props.data.err}</td></tr>);}
                                            //ประกาศให้ DataRow เก็บค่าที่จะแสดงในตารางเอาไว้ แล้วส่งไปเมื่อมีคนเรียกใช้
        let rows=this.state.Arr.map(x =>{return <DataRow key={x.count} data={x}/>}); 
        return (
            <div>
                <Header/>
                <Sidebar />
                <div className="content">
                <form id="F" onSubmit={this.handleSubmit}>
                    <h1>SECANT METHOD</h1><br></br>
                        <h3>Equation :</h3>
                        <input name="equation" type="text" value={this.state.equation} onChange={this.handleChange} placeholder="Enter Equation"></input><br></br>
                        <h3>X[0] :</h3>
                        <input name="x0" type="text" step="any" value={this.state.x0} onChange={this.handleChange} placeholder="Enter X[0]"></input><br></br>
                        <h3>X[1] :</h3>
                        <input name="x1" type="text" step="any" value={this.state.x1} onChange={this.handleChange} placeholder="Enter X[1]"></input><br></br><br></br>
                        <button type="submit" value="Submit">Submit</button><br></br><br></br><br></br>
                </form>

                        {(this.state.submitted)
                        ? <div></div>
                        : <div><h3>{this.state.result}</h3><br></br><div id="T">
                            <center><table>
                            <thead>
                              <tr><th>Iteration</th>
                                  <th>X </th>
                                  <th>Error</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rows}
                            </tbody>
                        </table></center>
                        </div>
                        </div>
                        
                        }<br></br><br></br><br></br><br></br>

                        {(this.state.submitted)
                        ? <div></div>
                        : <center><div id="C">
                        <LineChart Data={this.state.Arr}/>
                        <div>
                            <Plot
                                data={[
                                    {
                                        x:X,
                                        y:Y,
                                        type:'scatter'
                                    }
                                ]}
                                latout={{width:500,height:300}}
                            />
                        </div>
                        </div></center>
                        }<br></br><br></br><br></br><br></br>
                </div>

            </div>
        )
    }
}
export default Secant;