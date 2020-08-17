import React ,{useState,useEffect} from "react";
import {NativeSelect,FormControl} from "@material-ui/core";
import styles from './countrypicker.module.css';
import {country} from '../../api';
const Countrypicker = ({getcountry}) =>{
    const [condata,setcondata]=useState([]);
    useEffect(()=>{
        const fcountry=async()=>{
            setcondata(await country());
        }
        console.log(condata);
        fcountry();
    },[]);
    return(
        <FormControl className={styles.con}>
            <NativeSelect default="" onChange={(e)=>getcountry(e.target.value)}>
                <option value="global">Global</option>
                {condata.map((country,i)=><option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
export default Countrypicker;