import React, {useEffect, useState} from "react";
import {Card,CardContent,Typography,Grid} from "@material-ui/core";
import styles from "./cards.module.css";
import CountUp from "react-countup";
import {fdata} from "../../api";
/*const Cards = ({data:{confirmed,recovered,deaths,lastUpdate}}) =>{
    if(!confirmed){
        return "loading..."
    }*/
const Cards = ({data}) =>{
    const [dailyData,setDailyData]=useState({});

    useEffect(()=>{
        const getapi=async()=>{
            setDailyData(await fdata());
        }
        console.log(dailyData)
        getapi();
    },[]);

    return(
        data.confirmed?(
            <div className={styles.container}>
                <Grid container spacing={3} justify="center">
                    <div className={styles.card}>
                        <Grid item component={Card} className={styles.infected}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Infected</Typography>
                                <Typography variant="h5">
                                    <CountUp start={0} end={data.confirmed.value} duration={1} separator=","/>
                                </Typography>
                                <Typography variant="body2">Last Updated:{new Date(data.lastUpdate).toDateString()}</Typography>
                            </CardContent>
                        </Grid>
                    </div>
                    <div className={styles.card}>
                        <Grid item component={Card} className={styles.recovered}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Recovered</Typography>
                                <Typography variant="h5">
                                    <CountUp start={0} end={data.recovered.value} duration={1} separator=","/>
                                </Typography>
                                <Typography variant="body2">Last Updated:{new Date(data.lastUpdate).toDateString()}</Typography>
                            </CardContent>
                        </Grid>
                    </div>
                    <div className={styles.card}>
                        <Grid item component={Card} className={styles.deaths}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Deaths</Typography>
                                <Typography variant="h5">
                                    <CountUp start={0} end={data.deaths.value} duration={1} separator=","/>
                                </Typography>
                                <Typography variant="body2">Last Updated:{new Date(data.lastUpdate).toDateString()}</Typography>
                            </CardContent>
                        </Grid>
                    </div>
                </Grid>
            </div>
        ):"loading..."
    );
}
export default Cards;