import axios from 'axios'
import { token } from './config.js';
import {getWholePeriodOfTime} from './date.js'


const hour =60*60;
const hourQuery =`
 {
  reservesYearsEntities(first: 100 orderBy:timestamp) {
    reserversDays(first: 365 orderBy:timestamp) {
      reserversHours(first: 24 orderBy:timestamp) {
        audited
        timestamp
        finalTotalReserves
      }
    }
  }
}
`


export async function getTotalReserveByHour(){
    try{
       
       
        return fillBigArrayForHours(reformToBigArrayForHours( await getTotalReserveByHoursFromGraph()));
    }
    catch(err)
    {
        console.log(err)
    }
}
export async function getTotalReserveBy4Hour(){
    try{

        return fillBigArrayFor4Hours(reformToBigArrayForHours( await getTotalReserveByHoursFromGraph()));
    }
    catch(err)
    {
        console.log(err)
    }
}

async function getTotalReserveByHoursFromGraph(){
    try{
        const hourData = await axios({
            url: `https://api.thegraph.com/subgraphs/id/${token}`,
            method: 'post',
            data: {
              query: hourQuery
            }
          })
        return hourData.data.data.reservesYearsEntities;
    }
    catch(err)
    {
        console.log(err)
    }
}

function reformToBigArrayForHours(days){
    let out=[];
    for(let i=0; i<days.length; i++){
        for(let j=0; j<days[i].reserversDays.length; j++){
            for(let k=0; k<days[i].reserversDays[j].reserversHours.length; k++){
                out.push(days[i].reserversDays[j].reserversHours[k]);
            }
        }
    }
    return out;
}

function fillBigArrayForHours(bigArray){
    let out = [];
    for(let i=1;i<bigArray.length;i++){
        let nextTimestamp=getWholePeriodOfTime(parseInt(bigArray[i].timestamp),hour)
        let timestamp=getWholePeriodOfTime(parseInt(bigArray[i-1].timestamp),hour)
        out.push({
            totalReverse:bigArray[i-1].finalTotalReserves,
            timestamp:timestamp,
            audited:bigArray[i-1].audited,
        });
        timestamp+=hour;
        while(timestamp<nextTimestamp){
            out.push({
                totalReverse:bigArray[i-1].finalTotalReserves,
                timestamp:timestamp,
                audited:false,
            });
            timestamp+=hour;
        }        
    }
    
    out.push({
        totalReverse:bigArray[bigArray.length-1].finalTotalReserves,
        timestamp:getWholePeriodOfTime(parseInt(bigArray[bigArray.length-1].timestamp),hour),
        audited:bigArray[bigArray.length-1].audited,
    })
    return out;
}

function fillBigArrayFor4Hours(bigArray){
    let audited=false;
    let fragment=0;
    let out = [];
    for(let i=1;i<bigArray.length;i++){
        let nextTimestamp=getWholePeriodOfTime(parseInt(bigArray[i].timestamp),4*hour)
        let timestamp=getWholePeriodOfTime(parseInt(bigArray[i-1].timestamp),4*hour)
        out.push({
            totalReverse:bigArray[i-1].finalTotalReserves,
            timestamp:timestamp,
            audited:bigArray[i-1].audited,
        });
        timestamp+=4*hour;
        while(timestamp<nextTimestamp){
            out.push({
                totalReverse:bigArray[i-1].finalTotalReserves,
                timestamp:timestamp,
                audited:false,
            });
            timestamp+=4*hour;
        }        
        
    }
    
    out.push({
        totalReverse:bigArray[bigArray.length-1].finalTotalReserves,
        timestamp:getWholePeriodOfTime(parseInt(bigArray[bigArray.length-1].timestamp),4*hour),
        audited:bigArray[bigArray.length-1].audited,
    })
    return out;
}