import axios from 'axios'
import { token } from './config.js';

const minute =60;

const minuteQuery =`
 {
  reservesYearsEntities(first: 100 orderBy:timestamp) {
    reserversDays(first: 365 orderBy:timestamp) {
      reserversHours(first: 24 orderBy:timestamp) {
        reserversMinutes(first: 60 orderBy:timestamp) {
          audited
          timestamp
          finalTotalReserves
        }
      }
    }
  }
}

  `

export async function getTotalReserveByMinut(){
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
        return minuteData.data.data.reservesYearsEntities;
    }
    catch(err)
    {
        console.log(err)
    }
}

function reformToBigArrayForMinutes(days){
    let out=[];
    for(let i=0; i<days.length; i++){
        for(let j=0; j<days[i].reserversDays.length; j++){
            for(let k=0; k<days[i].reserversDays[j].reserversHours.length; k++){
                for(let l=0; l<days[i].reserversDays[j].reserversHours[k].reserversMinutes.length;l++){
                    out.push(days[i].reserversDays[j].reserversHours[k].reserversMinutes[l]);
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
            totalReverse:bigArray[i-1].finalTotalReserves,
            timestamp:bigArray[i-1].timestamp,
            audited:bigArray[i-1].audited,
        });
       
        let count=1;
        while(parseInt(bigArray[i-1].timestamp)+minute*(count+1)<bigArray[i].timestamp){
            out.push({
                totalReverse:bigArray[i-1].finalTotalReserves,
                timestamp: (minute*count+parseInt(bigArray[i-1].timestamp)).toString(),
                audited:false,
            });
            count++;
        }
       
        
    }
    
    out.push({
        totalReverse:bigArray[bigArray.length-1].finalTotalReserves,
        timestamp:bigArray[bigArray.length-1].timestamp,
        audited:bigArray[bigArray.length-1].audited,
    })
    return out;
}
