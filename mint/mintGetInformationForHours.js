import axios from 'axios'
import { token } from '../config.js';
import {getWholePeriodOfTime} from '../utils/date.js'


const hour =60*60;

const hourQuery =`
{
    yearRewardsMintedEntities(first:100 orderBy:timestamp){
      dayMint(first:365 orderBy:timestamp){
        hourMint(first:24 orderBy:timestamp){
         
            timestamp
            amount
            recipient
            caller
          
        }
      }
    }
  }

  `

export async function getMintRewardsByHours(){
    try{
        return fillBigArrayForHours(reformToBigArrayForHours(await getTotalReserveByHoursFromGraph()))
    }
    catch(err)
    {
        console.log(err)
    }
}

export async function getMintRewardsBy4Hours(){
    try{
        return fillBigArrayFor4Hours(reformToBigArrayForHours(await getTotalReserveByHoursFromGraph()))
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
        return hourData.data.data.yearRewardsMintedEntities;
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
function reformToBigArrayForHours(days){
    let out=[];
    for(let i=0; i<days.length; i++){
        for(let j=0; j<days[i].dayMint.length; j++){
            for(let k=0; k<days[i].dayMint[j].hourMint.length; k++){
                out.push(days[i].dayMint[j].hourMint[k]);
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
function fillBigArrayForHours(bigArray){
    let out = [];
   
    for(let i=1;i<bigArray.length;i++){
        let nextTimestamp=getWholePeriodOfTime(parseInt(bigArray[i].timestamp),hour)
        let timestamp=getWholePeriodOfTime(parseInt(bigArray[i-1].timestamp),hour)
        out.push({
            amount:bigArray[i-1].amount,
            timestamp:timestamp,
            recipient:bigArray[i-1].recipient,
            caller:bigArray[i-1].caller,
        });
        timestamp+=hour;
        while(timestamp<nextTimestamp){
            out.push({
                amount:0,
                timestamp:timestamp,
                recipient:[],
                caller:[]
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




/**
 * fills the array and divides it into equal time intervals
 * @param {*} bigArray  
 * @returns 
 */
function fillBigArrayFor4Hours(bigArray){
    let out = [];
    let fragment=0;
    let recipient=[];
    let caller=[];
    let amount=0;
    for(let i=1;i<bigArray.length;i++){
        let nextTimestamp=getWholePeriodOfTime(parseInt(bigArray[i].timestamp),hour)
        let timestamp=getWholePeriodOfTime(parseInt(bigArray[i-1].timestamp),hour)
        amount+=bigArray[i-1].amount
        caller.concat(bigArray[i-1].caller)
        recipient.concat(bigArray[i-1].recipient)
        if(fragment%4==3)
        {
            out.push({
                amount:bigArray[i-1].amount,
                timestamp:timestamp,
                recipient:bigArray[i-1].recipient,
                caller:bigArray[i-1].caller,
            });
            amount=0;
            recipient=[];
            caller=[];
        }
        timestamp+=hour;
        fragment++;
        while(timestamp<nextTimestamp){
            if(fragment%4==3)
            {
                out.push({
                    amount:amount,
                    timestamp:timestamp,
                    recipient:recipient,
                    caller:caller
                });
                amount=0;
                recipient=[];
                caller=[];
            }
            timestamp+=hour;
            fragment++;
        }
        
    }
    out.push({
        totalReverse:bigArray[bigArray.length-1].finalTotalReserves,
        timestamp:getWholePeriodOfTime(parseInt(bigArray[bigArray.length-1].timestamp),hour),
        audited:bigArray[bigArray.length-1].audited,
    })
    return out;
}
