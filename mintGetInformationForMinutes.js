import axios from 'axios'
import { token } from './config.js';
import {getWholePeriodOfTime} from './date.js'


const minute =60;

const minuteQuery =`
{
    yearRewardsMintedEntities(first:100 orderBy:timestamp){
      dayMint(first:365 orderBy:timestamp){
        hourMint(first:24 orderBy:timestamp){
          minuteMint(first:60 orderBy:timestamp){
            timestamp
            amount
            recipient
            caller
          }
        }
      }
    }
  }

  `

export async function getMintRewardsByMinutes(){
    try{
        return fillBigArrayForMinues(reformToBigArrayForMinutes(await getTotalReserveByMinutesFromGraph()))
    }
    catch(err)
    {
        console.log(err)
    }
}


async function getTotalReserveByMinutesFromGraph(){
    try{
        const minuteData = await axios({
            url: `https://api.thegraph.com/subgraphs/id/${token}`,
            method: 'post',
            data: {
              query: minuteQuery
            }
          })
        return minuteData.data.data.yearRewardsMintedEntities;
    }
    catch(err)
    {
        console.log(err)
    }
}

function reformToBigArrayForMinutes(days){
    let out=[];
    for(let i=0; i<days.length; i++){
        for(let j=0; j<days[i].dayMint.length; j++){
            for(let k=0; k<days[i].dayMint[j].hourMint.length; k++){
                for(let l=0; l<days[i].dayMint[j].hourMint[k].minuteMint.length;l++){
                    out.push(days[i].dayMint[j].hourMint[k].minuteMint[l]);
                }
            }
        }
    }
    return out;
}
function fillBigArrayForMinues(bigArray){
    let out = [];
   
    for(let i=1;i<bigArray.length;i++){
        let nextTimestamp=getWholePeriodOfTime(parseInt(bigArray[i].timestamp),minute)
        let timestamp=getWholePeriodOfTime(parseInt(bigArray[i-1].timestamp),minute)
        out.push({
            amount:bigArray[i-1].amount,
            timestamp:timestamp,
            recipient:bigArray[i-1].recipient,
            caller:bigArray[i-1].caller,
        });
        timestamp+=minute;
        while(timestamp<nextTimestamp){
            out.push({
                amount:0,
                timestamp:timestamp,
                recipient:[],
                caller:[]
            });
            timestamp+=minute;
        }
        
    }
    out.push({
        totalReverse:bigArray[bigArray.length-1].finalTotalReserves,
        timestamp:getWholePeriodOfTime(parseInt(bigArray[bigArray.length-1].timestamp),minute),
        audited:bigArray[bigArray.length-1].audited,
    })
    return out;
}
