import axios from 'axios'
import { token } from './config.js';
import {getTokens} from './getTokens.js'
import {getWholePeriodOfTime} from './date.js'

const hour =60*60;

const hourQuery =`
{
    depositFunctionYearEntities(first:1000 orderBy:timestamp){
     dayDeposit(first:366  orderBy:timestamp){
       hourDeposit(first:24  orderBy:timestamp){
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
  `

export async function getDepositByHour(){
    try{
        let bigArray=await reformToBigArrayForHour(await getDepositByHoursFromGraph());
     
        for(let i=0;i<bigArray.length;i++){
            bigArray[i].array=fillBigArrayForHours( bigArray[i].array);
        }
        
        return bigArray;
    }
    catch(err)
    {
        console.log(err)
    }
}

export async function getDepositBy4Hour(){
    try{
        let bigArray=await reformToBigArrayForHour(await getDepositByHoursFromGraph());
     
        for(let i=0;i<bigArray.length;i++){
            bigArray[i].array=fillBigArrayFor4Hours( bigArray[i].array);
        }
        
        return bigArray;
    }
    catch(err)
    {
        console.log(err)
    }
}

async function getDepositByHoursFromGraph(){
    try{
        const hourData = await axios({
            url: `https://api.thegraph.com/subgraphs/id/${token}`,
            method: 'post',
            data: {
              query: hourQuery
            }
          })
        return hourData.data.data.depositFunctionYearEntities;
    }
    catch(err)
    {
        console.log(err)
    }
}

async function reformToBigArrayForHour(days){
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
                for(let m=0;m<tokens.length;m++){
                    if(days[i].dayDeposit[j].hourDeposit[k].id.slice(0,42)==tokens[m]){
                        out[m].array.push(days[i].dayDeposit[j].hourDeposit[k]);
                    }
                }
            }
        }
    }
    return out;
}
function fillBigArrayForHours(bigArray){
    let out = [];
    for(let i=1;i<bigArray.length;i++){
        let timestamp=getWholePeriodOfTime(parseInt(bigArray[i-1].timestamp),hour)
        let nextTimestamp=getWholePeriodOfTime(parseInt(bigArray[i].timestamp),hour)
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
       
        timestamp+=hour;
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
            timestamp+=hour;
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





function fillBigArrayFor4Hours(bigArray){

    let fragment=0;
    let profit=0
    let amount=0
    let value=0
    let sender=[]
    let out = [];
    for(let i=1;i<bigArray.length;i++){
        let timestamp=getWholePeriodOfTime(parseInt(bigArray[i-1].timestamp),hour)
        let nextTimestamp=getWholePeriodOfTime(parseInt(bigArray[i].timestamp),hour)
         profit+=bigArray[i-1].profit
         amount+=bigArray[i-1].amount
         value+=bigArray[i-1].value
         sender=sender.concat(bigArray[i-1].sender)
        if(fragment%4==3)
        {
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
            profit=0
            amount=0
            value=0
            sender=[]
        }
        fragment++;
        timestamp+=hour;
        while(timestamp<nextTimestamp){
            if(fragment%4==3)
            {
                out.push({
                    timestamp:timestamp,
                    profit:profit,
                    amount:amount,
                    value:value,
                    sender:sender,
                    sumValue:bigArray[i-1].sumValue,
                    sumProfit:bigArray[i-1].sumProfit,
                    sumAmount:bigArray[i-1].sumAmount,
                });
                 profit=0
                 amount=0
                 value=0
                 sender=[]
            }
            fragment++;
            timestamp+=hour;
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