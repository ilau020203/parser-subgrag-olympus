import axios from 'axios'
import { token } from './config.js';
import {getTokens} from './getTokens.js'

const hour =60*60;

const hourQuery =`
{
    manageYearEntities(first:1000 orderBy:timestamp){
     dayManage(first:365 orderBy:timestamp){
       hourManage(first:24 orderBy:timestamp){
       
           id
           amount
           timestamp
           sender
           sumAmount
        
       }
     }
   }
}
  `

export async function getManageByHour(){
    try{
        let bigArray=await reformToBigArrayForHour(await getManageByHoursFromGraph());
     
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

export async function getManageBy4Hour(){
    try{
        let bigArray=await reformToBigArrayForHour(await getManageByHoursFromGraph());
     
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

async function getManageByHoursFromGraph(){
    try{
        const hourData = await axios({
            url: `https://api.thegraph.com/subgraphs/id/${token}`,
            method: 'post',
            data: {
              query: hourQuery
            }
          })
          
        return hourData.data.data.manageYearEntities;
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
        for(let j=0; j<days[i].dayManage.length; j++){
            for(let k=0; k<days[i].dayManage[j].hourManage.length; k++){
                for(let m=0;m<tokens.length;m++){
                    
                    if(days[i].dayManage[j].hourManage[k].id.slice(0,42)==tokens[m]){
                        out[m].array.push(days[i].dayManage[j].hourManage[k]);
                    }
                }
            }
        }
    }
    return out;
}
function fillBigArrayForHours(bigArray){
    let out = [];
    if(bigArray.length==0){
        return out;
    }
    if(bigArray.length==1){
        out.push({
            timestamp:bigArray[0].timestamp,
            amount:bigArray[0].amount,
            sender:bigArray[0].sender,
            sumAmount:bigArray[0].sumAmount,
        });
       return out;
    }
    for(let i=1;i<bigArray.length;i++){
       
        out.push({
            timestamp:bigArray[i-1].timestamp,
            amount:bigArray[i-1].amount,
            sender:bigArray[i-1].sender,
            sumAmount:bigArray[i-1].sumAmount,
        });
       
        let count=1;
        while(parseInt(bigArray[i-1].timestamp)+hour*(count+1)<bigArray[i].timestamp){
            out.push({
            timestamp:(hour*(count+1)+parseInt(bigArray[i-1].timestamp)).toString(),
            amount:0,
            sender:[],
            sumAmount:bigArray[i-1].sumAmount,
            });
            count++;
        }       
    }
    
    out.push({
        timestamp:bigArray[bigArray.length-1].timestamp,
        amount:bigArray[bigArray.length-1].amount,
        sender:bigArray[bigArray.length-1].sender,
       
        sumAmount:bigArray[bigArray.length-1].sumAmount,
    })
    return out;
}





function fillBigArrayFor4Hours(bigArray){
    let fragment=0;
    let amount=0
    let sender=[]
    let out = [];
    if(bigArray.length==0){
        return out;
    }
    if(bigArray.length==1){
        out.push({
            timestamp:bigArray[0].timestamp,
            amount:bigArray[0].amount,
            sender:bigArray[0].sender,
            sumAmount:bigArray[0].sumAmount,
            
        });
        return out;
    }
    for(let i=1;i<bigArray.length;i++){
         amount+=bigArray[i-1].amount
         sender=sender.concat(bigArray[i-1].sender)
        if(fragment%4==3)
        {
            out.push({
                timestamp:bigArray[i-1].timestamp,
                amount:bigArray[i-1].amount,
                sender:bigArray[i-1].sender,
                sumAmount:bigArray[i-1].sumAmount,
            });
            amount=0
            sender=[]
        }
        fragment++;
        let count=1;
        while(parseInt(bigArray[i-1].timestamp)+hour*(count+1)<bigArray[i].timestamp){
            if(fragment%4==3)
            {
                out.push({
                    timestamp:(hour*(count+1)+parseInt(bigArray[i-1].timestamp)).toString(),
                    amount:amount,
                    sender:sender,
                    sumAmount:bigArray[i-1].sumAmount,
                });
                 amount=0
                 sender=[]
            }
            fragment++;
            count++;
        }
        
    }
    
    out.push({
        timestamp:bigArray[bigArray.length-1].timestamp,
        amount:bigArray[bigArray.length-1].amount,
        sender:bigArray[bigArray.length-1].sender,
       
        sumAmount:bigArray[bigArray.length-1].sumAmount,
    })
    return out;
}