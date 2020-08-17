import React,{ useState, useEffect } from "react";
import { fdailydata } from "../../api" ;
import {Line,  Bar,Pie} from "react-chartjs-2";
import styles from "./charts.module.css";
import { country } from "../../api" ;
const Charts = ({data,country}) =>{
    const [dailyData,setDailyData]=useState([]);

    useEffect(()=>{
        const getapi=async()=>{
            setDailyData(await fdailydata());
        }
        console.log(dailyData);
        getapi();
    },[]);
    const linechart=(
        dailyData.length ? (
            <Line data={{
                labels:dailyData.map(({date})=>date),
                datasets:[{
                    data:dailyData.map(({confirmed})=>confirmed) ,
                    label:'Infected',
                    borderColor:'#17a9d9',
                    fill:true,
                },{
                    data:dailyData.map(({deaths})=>deaths) ,
                    label:'Deaths',
                    borderColor:'red',
                    backgroundColor:'#f65e5e',
                    fill:true,

                }],
            }}
        />):null
    );

    const barchart=(
        data.confirmed?(
            <Bar data={{
                labels:['Infected','Recovered','Deaths'],
                datasets:[{
                    label:'People',
                    backgroundColor:['#17a9d9','#0fe70f','#e01919'],
                    data:[data.confirmed.value,data.recovered.value,data.deaths.value],
                }]

            }}
                options={{
                    legend:{display:false},
                    title:{display:true,text:`Current state in ${country}`}
                }}
            />
        ):null
    );

    const piechart=(
        data.confirmed?(
            <Bar data={{
                labels:['Infected','Recovered','Deaths'],
                datasets:[{
                    label:'People',
                    backgroundColor:['#17a9d9','#0fe70f','#e01919'],
                    data:[data.confirmed.value,data.recovered.value,data.deaths.value],
                }]

            }}
                options={{
                    legend:{display:false},
                    title:{display:true,text:`Current state in ${country}`},
                }}
            />,

            <Pie data={{
                exportEnabled: true,
			    animationEnabled: true,
                labels:['Infected','Recovered','Deaths'],
                datasets:[{
                    label: ['Infected', 'Recovered', 'Deaths'],
                    backgroundColor: ['#17a9d9', '#0fe70f', '#e01919'],
                    data: [data.confirmed.value, data.recovered.value, data.deaths.value],
                }]
            }}
                options={{
				    showInLegend: "true",
				    legendText: "{label}",
                    title:{display:true,text:`Current state in ${country}`},
                    startAngle: 75,
                    indexLabelFontSize: 100,
                    indexLabel: "{label}",
                    toolTipContent: "<b>{label}</b>"
                }}
            />
        ):null
    )



    return(
        <div className={styles.container}>
            {country!=="global"&& country?barchart:linechart}
        </div>
    )
}
export default Charts;