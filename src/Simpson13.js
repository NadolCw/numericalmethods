import React from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import * as math from 'mathjs';
import axios from 'axios';

var X,Y;
class Simpson13 extends React.Component {
    constructor(props) {
        super(props);
        X=[];
        Y=[];
        this.state={Arr:[],n:"",a:"",b:"",equation:"",submitted:true}; //ประกาศตัวแปร xl xr และ equation
        this.handleSubmit = this.handleSubmit.bind(this); //ประกาศฟังก์ชัน handleSubmit
        this.handleChange = this.handleChange.bind(this); //ประกาศฟังก์ชัน handleChange
        this.Simpson13=this.Simpson13.bind(this); //ประกาศฟังก์ชัน Simpson13
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
        if((str.length!==0)&&(c!==0)&&this.state.submitted&&this.state.a!==""&&this.state.b!==""){ //เช็คความยาวสมการต้องไม่เท่ากับ 0 และ c ที่เช็ค x ต้องไม่เท่ากับ 0 และ xl xr ต้องไม่ใช่ค่าว่าง
          axios
          .post("http://localhost:8000/Simpson13/Simpson13", {
            a: parseFloat(this.state.a),
            b: parseFloat(this.state.b),
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
          this.Simpson13(); //ส่งไปที่ฟังก์ชัน FWOH
          this.setState({submitted:false});
        }
        event.preventDefault();
    }
    Simpson13(event){
      X=[];
      Y=[];
      var a = parseFloat(this.state.a);
      var b = parseFloat(this.state.b);
      var data={ans:0};
      var n = parseFloat(this.state.n);
      var h = (b-a)/n;
      var func=(x)=>{ //ฟังก์ชันย่อยรับค่ามาแล้วส่งไปแทนในสมการ
        let scope={x:x}
        let code=math.compile(this.state.equation); //ทำการกระจายสมการ
        return code.eval(scope); //เอาค่าไปแทนในสมการแล้วรีเทิร์น
      };
      for(let i=0;i<n;i++){
        let m = a+(i*h);
        if(i===0 || i===n-1){
            data.ans += func(m);
        }
        else if(i%2 === 1){
            data.ans += 4*func(m);
        }
        else if(i%2 === 0){
            data.ans += 2*func(m);
        }
        
      }
      data.ans *= h/3;

      var arr;
      arr=this.state.Arr;
      arr.push({ans:data.ans}); //ใส่ค่าใน arr เป็นค่าที่ใช้ไปแสดง
      for(let i=-40;i<=40;i++){
        X.push(i);
        Y.push(func(i));
      }
    }

    render() {
        const DataRow=(props)=>{return (<tr><td>{props.data.ans}</td></tr>);}
                                            //ประกาศให้ DataRow เก็บค่าที่จะแสดงในตารางเอาไว้ แล้วส่งไปเมื่อมีคนเรียกใช้
        let rows=this.state.Arr.map(x =>{return <DataRow key={x.count} data={x}/>}); 
        return (
            <div>
                <Header/>
                <Sidebar />
                <div className="content">
                <form id="F" onSubmit={this.handleSubmit}>
                    <h1>SIMPSON'S RULE (1/3)</h1><br></br>
                        <h3>Equation :</h3>
                        <input name="equation" type="text" value={this.state.equation} onChange={this.handleChange} placeholder="Enter Equation"></input><br></br>
                        <h3>A :</h3>
                        <input name="a" type="text" step="any" value={this.state.a} onChange={this.handleChange} placeholder="Enter A"></input><br></br>
                        <h3>B :</h3>
                        <input name="b" type="text" step="any" value={this.state.b} onChange={this.handleChange} placeholder="Enter B"></input><br></br><br></br>
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
                              </tr>
                            </thead>
                            <tbody>
                              {rows}
                            </tbody>
                        </table></center>
                        </div>
                        </div>
                        
                        }<br></br><br></br><br></br><br></br>
                </div>

            </div>
        )
    }
}
export default Simpson13;