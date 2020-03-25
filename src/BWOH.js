import React from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import * as math from 'mathjs';
import Plot from 'react-plotly.js';
import {LineChart} from 'recharts';
import axios from 'axios';

var X,Y;
class BWOH extends React.Component {
    constructor(props) {
        super(props);
        X=[];
        Y=[];
        this.state={Arr:[],n:"",x:"",h:"",equation:"",submitted:true}; //ประกาศตัวแปร xl xr และ equation
        this.handleSubmit = this.handleSubmit.bind(this); //ประกาศฟังก์ชัน handleSubmit
        this.handleChange = this.handleChange.bind(this); //ประกาศฟังก์ชัน handleChange
        this.BWOH=this.BWOH.bind(this); //ประกาศฟังก์ชัน BWOH
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
        if((str.length!==0)&&(c!==0)&&this.state.submitted&&this.state.x!==""&&this.state.h!==""){ //เช็คความยาวสมการต้องไม่เท่ากับ 0 และ c ที่เช็ค x ต้องไม่เท่ากับ 0 และ xl xr ต้องไม่ใช่ค่าว่าง
          axios
          .post("http://localhost:8000/BWOH/BWOH", {
            x: parseFloat(this.state.x),
            h: parseFloat(this.state.h),
            n: parseFloat(this.state.n),
            equation: this.state.equation
          })
          .then(res => {
            this.setState({result: res.data.result})
            console.log(this.state.result)
          })
          .catch(err => {
            console.log(err);
          });
          this.BWOH(); //ส่งไปที่ฟังก์ชัน BWOH
          this.setState({submitted:false});
        }
        event.preventDefault();
    }
    BWOH(event){
      X=[];
      Y=[];
      var x = parseFloat(this.state.x);
      var h = parseFloat(this.state.h);
      var xi = x - h;
      var xi2 = x - (2 * h);
      var xi3 = x - (3 * h);
      var xi4 = x - (4 * h);
      var data={fxi:0,real:0,err:"",count:1};
      var n = parseFloat(this.state.n);
      var arr;
      var func=(x)=>{ //ฟังก์ชันย่อยรับค่ามาแล้วส่งไปแทนในสมการ
        let scope={x:x}
        let code=math.compile(this.state.equation); //ทำการกระจายสมการ
        return code.eval(scope); //เอาค่าไปแทนในสมการแล้วรีเทิร์น
      };
      var err=(x0,x1)=>{return Math.abs((x1-x0)/x1)*100};
      if(n === 1) {
        data.fxi = (func(x) - func(xi))
        console.log('n=1')
      }
      if(n === 2) {
        data.fxi = (func(x) - (2 * (func(xi))) + func(xi2));
        console.log('n=2')
      }
      if(n === 3) {
        data.fxi = (func(x) - (3 * (func(xi))) + (3 * (func(xi2))) - func(xi3))
        console.log('n=3')
      }
      if(n === 4) {
        data.fxi = (func(x) - (4 * (func(xi))) + (6 * (func(xi2))) - (4 * (func(xi3))) - func(xi4))
        console.log('n=4')
      }

      data.fxi =  data.fxi / (math.pow(h, n).toFixed(6));
      var diff = this.state.equation;
      for (let i = 0; i < n; i++) {
        diff = math.derivative(diff, 'x')
      }
      let scope = {x:x}
      data.real = diff.evaluate(scope)
      data.err = err(data.fxi,data.real);
      arr=this.state.Arr;

      arr.push({fxi:data.fxi,err:data.err,real:data.real,count:data.count}); //ใส่ค่าใน arr เป็นค่าที่ใช้ไปแสดง
      for(let i=-40;i<=40;i++){
        X.push(i);
        Y.push(func(i));
      }
    }

    render() {
        const DataRow=(props)=>{return (<tr><td>{props.data.fxi}</td> 
                                            <td>{props.data.real}</td>
                                            <td>{props.data.err}</td></tr>);}
                                            //ประกาศให้ DataRow เก็บค่าที่จะแสดงในตารางเอาไว้ แล้วส่งไปเมื่อมีคนเรียกใช้
        let rows=this.state.Arr.map(x =>{return <DataRow key={x.count} data={x}/>}); 
        return (
            <div>
                <Header/>
                <Sidebar />
                <div className="content">
                <form id="F" onSubmit={this.handleSubmit}>
                    <h1>BW O(h)</h1><br></br>
                        <h3>Equation :</h3>
                        <input name="equation" type="text" value={this.state.equation} onChange={this.handleChange} placeholder="Enter Equation"></input><br></br>
                        <h3>X :</h3>
                        <input name="x" type="text" step="any" value={this.state.x} onChange={this.handleChange} placeholder="Enter X"></input><br></br>
                        <h3>H :</h3>
                        <input name="h" type="text" step="any" value={this.state.h} onChange={this.handleChange} placeholder="Enter H"></input><br></br><br></br>
                        <h3>N :</h3>
                        <input name="n" type="text" step="any" value={this.state.n} onChange={this.handleChange} placeholder="Enter N"></input><br></br><br></br>
                        <button type="submit" value="Submit">Submit</button><br></br><br></br><br></br><br></br>
                </form>

                        {(this.state.submitted)
                        ? <div></div>
                        : <div><h3>{this.state.result}</h3><br></br><div id="T">
                            <center><table>
                            <thead>
                              <tr><th>Result</th>
                                  <th>Real</th>
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
export default BWOH;