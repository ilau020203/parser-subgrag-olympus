import axios from 'axios'
import { tokenForBalance } from '../../config.js';
import {getWholePeriodOfTime} from '../../utils/date.js'



const minute =60;

const minuteQuery =`
{
    balanceYears(first:1000 orderBy:timestamp where:{token:"0x34d7d7aaf50ad4944b70b320acb24c95fa2def7c"}){
      day(first:366 orderBy:timestamp) {
        hour(first:24 orderBy:timestamp){
          minute(first:60 orderBy:timestamp){
            
              value
              id
              timestamp
            
          }
        }
      }
    }
  }

  `

export async function getlpOhmDaiBalanceByMinut(startTimestamp=0,endTimestamp=Date.now()/1000){
    try{
        return fillBigArrayForMinues(reformToBigArrayForMinutes(await getlpOhmDaiBalanceByMinutesFromGraph()),startTimestamp,endTimestamp)
    }
    catch(err)
    {
        console.log(err)
    }
}


async function getlpOhmDaiBalanceByMinutesFromGraph(){
    try{
        const minuteData = await axios({
            url: `https://api.thegraph.com/subgraphs/id/${tokenForBalance}`,
            method: 'post',
            data: {
              query: minuteQuery
            }
          })
        return minuteData.data.data.balanceYears;
    }
    catch(err)
    {
        console.log(err)
    }
}

/**
 * struct from subgrph reform to array
 * @param {} days struct from subgrph
 * @returns 
 */
function reformToBigArrayForMinutes(days){
    let out=[];
    for(let i=0; i<days.length; i++){
        for(let j=0; j<days[i].day.length; j++){
            for(let k=0; k<days[i].day[j].hour.length; k++){
                for(let l=0; l<days[i].day[j].hour[k].minute.length;l++){
                    out.push(days[i].day[j].hour[k].minute[l]);
                }
            }
        }
    }
    return out;
}

/**
 * fills the array and divides it into equal time intervals
 * @param {*} bigArray  
 * @returns 
 */
function fillBigArrayForMinues(bigArray,startTimestamp,endTimestamp){
    let out = [];
    let j=0;

    while(bigArray[j].timestamp<startTimestamp) j++;
    for(let i=j==0?1:j;i<bigArray.length;i++){
        let nextTimestamp=getWholePeriodOfTime(parseInt(bigArray[i].timestamp),minute)
        let timestamp=getWholePeriodOfTime(parseInt(bigArray[i-1].timestamp),minute)
        if (timestamp>endTimestamp) return out;
        if(timestamp>=startTimestamp){
            out.push({
                value:bigArray[i-1].value,
                timestamp:timestamp,
                audited:bigArray[i-1].audited,
            });
        }
        timestamp+=minute;
        if (timestamp>endTimestamp) return out;
        while(timestamp<nextTimestamp){
            if(timestamp>=startTimestamp){
            out.push({
                    value:bigArray[i-1].value,
                    timestamp:timestamp,
                    audited:false,
                });
            }
            timestamp+=minute;
            if (timestamp>endTimestamp) return out;
        }
        
    }

    out.push({
        value:bigArray[bigArray.length-1].value,
        timestamp:getWholePeriodOfTime(parseInt(bigArray[bigArray.length-1].timestamp),minute),
        audited:bigArray[bigArray.length-1].audited,
    })
    let timestamp =getWholePeriodOfTime(parseInt(bigArray[bigArray.length-1].timestamp),minute);
    timestamp+=minute;
    while(timestamp<=endTimestamp){
        out.push({
            value:bigArray[bigArray.length-1].value,
            timestamp:timestamp,
            audited:false,
        });
        timestamp+=minute;
    }
    return out;
}
