import axios from 'axios'
import { token } from './config.js';
import {getTokens} from './getTokens.js'

const day =60*60*24;

const dayQuery =`
{
    depositFunctionYearEntities(first:1000 orderBy:timestamp){
     dayDeposit(first:366  orderBy:timestamp){
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
  `

export async function getDepositByDay(){
    try{
        let bigArray=await reformToBigArrayForDays(await getDepositByDaysFromGraph());
        
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


async function getDepositByDaysFromGraph(){
    try{
        const dayData = await axios({
            url: `https://api.thegraph.com/subgraphs/id/${token}`,
            method: 'post',
            data: {
              query: dayQuery
            }
          })
        return dayData.data.data.depositFunctionYearEntities;
    }
    catch(err)
    {
        console.log(err)
    }
}

async function reformToBigArrayForDays(days){
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
            for(let m=0;m<tokens.length;m++){
                if(days[i].dayDeposit[j].id.slice(0,42)==tokens[m]){
                    out[m].array.push(days[i].dayDeposit[j]);
                }
            }
        }
    }
    return out;
}
function fillBigArrayForMinues(bigArray){
    let out = [];
    for(let i=1;i<bigArray.length;i++){
        out.push({
            timestamp:bigArray[i-1].timestamp,
            profit:bigArray[i-1].profit,
            amount:bigArray[i-1].amount,
            value:bigArray[i-1].value,
            sender:bigArray[i-1].sender,
            sumValue:bigArray[i-1].sumValue,
            sumProfit:bigArray[i-1].sumProfit,
            sumAmount:bigArray[i-1].sumAmount,
        });
       
        let count=1;
        while(parseInt(bigArray[i-1].timestamp)+day*(count+1)<bigArray[i].timestamp){
            out.push({
                timestamp:(day*(count+1)+parseInt(bigArray[i-1].timestamp)).toString(),
                profit:0,
                amount:0,
                value:0,
                sender:[],
                sumValue:bigArray[i-1].sumValue,
                sumProfit:bigArray[i-1].sumProfit,
                sumAmount:bigArray[i-1].sumAmount,
            });
            count++;
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
