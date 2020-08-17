import axios from "axios";
const url="https://covid19.mathdro.id/api"
export const fdata= async (country)=>{
        let changeurl=url;
        /*if(country==="global"||"undefined") {
                changeurl = `${url}`;
        }
        else {
                changeurl = `${url}/countries/${country}`;
        }*/
        if(country==="global"){
            changeurl = `${url}`;
        }
        else
        if(country){
            changeurl = `${url}/countries/${country}`;
        }
        try {
                const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeurl);
                return {confirmed, recovered, deaths, lastUpdate};
        }catch(error){
                return error;
        }
};
export const fdailydata = async()=>{
        try {
                const {data} = await axios.get(`${url}/daily`);
                const modifieddata = data.map((dailyata) => ({
                        confirmed: dailyata.confirmed.total,
                        deaths: dailyata.deaths.total,
                        recovered: dailyata.recovered.total,
                        date: dailyata.reportDate,
                }));
                return modifieddata;
        }catch(error){
                return error;
        }
};

export const country=async()=>{
        try {

                const {data: {countries}} = await axios.get(`${url}/countries`);
                const cont = countries.map((country) => country.name);
                return cont;
        }catch(error){
                return error;
        }

};