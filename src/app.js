import React from 'react';
import { Cards,Charts,Countrypicker} from "./components";
import styles from "./app.module.css";
import { fdata } from "./api/index" ;
import img from'./image/tracker.png';
class app extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{},
            country:'',
        }
    }
    async componentDidMount() {
        const faa = await fdata();
        this.setState({data: faa});
    }
    getcountry=async(country)=>{
        const faa=await fdata(country);
        this.setState({data:faa,country:country});
    }

    render(){
        return(
            <div className={styles.container}>
                <img className={styles.img} src={img} alt="image"/>
                <Cards data={this.state.data}/>
                <Charts data={this.state.data} country={this.state.country}/>
                <Countrypicker getcountry={this.getcountry}/>
            </div>
        )
    }
}
export default app;