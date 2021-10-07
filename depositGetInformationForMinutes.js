import axios from 'axios'
import { token } from './config.js';
import {getTokens} from './getTokens.js'
import {getWholePeriodOfTime} from './date.js'

const minute =60;

const minuteQuery =`
{
    depositFunctionYearEntities(first:1000 orderBy:timestamp){
     dayDeposit(first:366  orderBy:timestamp){
       hourDeposit(first:24  orderBy:timestamp){
           minuteDeposit(first:60  orderBy:timestamp){
           timestamp
           profit
           amount
           value
           sender
           sumValue
           sumProfit
           sumAmount
           id
         }
       }
     }
     
   }
 }
  `

export async function getDepositByMinut(){
    try{
        let bigArray=await reformToBigArrayForMinutes(await getDepositByMinutesFromGraph());
        
        for(let i=0;i<bigArray.length;i++){
            bigArray[i].array=fillBigArrayForMinues( bigArray[i].array);
        }
        
        return bigArray;
    }
    catch(err)
    {
        console.log(err)
    }
}


async function getDepositByMinutesFromGraph(){
    try{
        const minuteData = await axios({
            url: `https://api.thegraph.com/subgraphs/id/${token}`,
            method: 'post',
            data: {
              query: minuteQuery
            }
          })
        return minuteData.data.data.depositFunctionYearEntities;
    }
    catch(err)
    {
        console.log(err)
    }
}

async function reformToBigArrayForMinutes(days){
    let out=[];
    let tokens=await getTokens();
    for(let i=0; i<tokens.length; i++){
        out.push({ 
            token:tokens[i],
            array:[]
        })
    }
    
    for(let i=0; i<days.length; i++){
        for(let j=0; j<days[i].dayDeposit.length; j++){
            for(let k=0; k<days[i].dayDeposit[j].hourDeposit.length; k++){
                for(let l=0; l<days[i].dayDeposit[j].hourDeposit[k].minuteDeposit.length;l++){
                    for(let m=0;m<tokens.length;m++){
                       if(days[i].dayDeposit[j].hourDeposit[k].minuteDeposit[l].id.slice(0,42)==tokens[m]){
                           out[m].array.push(days[i].dayDeposit[j].hourDeposit[k].minuteDeposit[l]);
                       }
                    }
                }
            }
        }
    }
    return out;
}
function fillBigArrayForMinues(bigArray){
    let out = [];
    for(let i=1;i<bigArray.length;i++){
       
        let timestamp=getWholePeriodOfTime(parseInt(bigArray[i-1].timestamp),minute)
        let nextTimestamp=getWholePeriodOfTime(parseInt(bigArray[i].timestamp),minute)
        out.push({
            timestamp:timestamp,
            profit:bigArray[i-1].profit,
            amount:bigArray[i-1].amount,
            value:bigArray[i-1].value,
            sender:bigArray[i-1].sender,
            sumValue:bigArray[i-1].sumValue,
            sumProfit:bigArray[i-1].sumProfit,
            sumAmount:bigArray[i-1].sumAmount,
        });
       
        timestamp+=minute;
        while(timestamp<nextTimestamp){
            out.push({
                timestamp:timestamp,
                profit:0,
                amount:0,
                value:0,
                sender:[],
                sumValue:bigArray[i-1].sumValue,
                sumProfit:bigArray[i-1].sumProfit,
                sumAmount:bigArray[i-1].sumAmount,
            });
            timestamp+=minute;
        }       
    }
    
    out.push({
        timestamp:bigArray[bigArray.length-1].timestamp,
        profit:bigArray[bigArray.length-1].profit,
        amount:bigArray[bigArray.length-1].amount,
        value:bigArray[bigArray.length-1].value,
        sender:bigArray[bigArray.length-1].sender,
        sumValue:bigArray[bigArray.length-1].sumValue,
        sumProfit:bigArray[bigArray.length-1].sumProfit,
        sumAmount:bigArray[bigArray.length-1].sumAmount,
    })
    return out;
}
