import axios from 'axios'


const day =60*60*24;
const dayQuery =`
 {
  reservesYearsEntities(first: 100 orderBy:timestamp) {
    reserversDays(first: 365 orderBy:timestamp) {
        audited
        timestamp
        finalTotalReserves
    }
  }
}
`


export async function getTotalReserveByDay(){
    try{
       
       
        return fillBigArrayForDays(reformToBigArrayForDays( await getTotalReserveByDaysFromGraph()));
    }
    catch(err)
    {
        console.log(err)
    }
}

async function getTotalReserveByDaysFromGraph(){
    try{
        const dayData = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmS4EPHodzag8wK4m2fZrQYYQrnocX25W9Uf18sz3KPwZc',
            method: 'post',
            data: {
              query: dayQuery
            }
          })
        return dayData.data.data.reservesYearsEntities;
    }
    catch(err)
    {
        console.log(err)
    }
}

function reformToBigArrayForDays(days){
    let out=[];
    for(let i=0; i<days.length; i++){
        for(let j=0; j<days[i].reserversDays.length; j++){         
            out.push(days[i].reserversDays[j]);
        }
    }
    return out;
}

function fillBigArrayForDays(bigArray){
    let audited=false;
    let out = [];
    for(let i=1;i<bigArray.length;i++){
        out.push({
            totalReverse:bigArray[i-1].finalTotalReserves,
            timestamp:bigArray[i-1].timestamp,
            audited:bigArray[i-1].audited,
        });
        let count=1;
        while(parseInt(bigArray[i-1].timestamp)+day*(count+1)<bigArray[i].timestamp){
            out.push({
                totalReverse:bigArray[i-1].finalTotalReserves,
                timestamp: (day*(count+1)+parseInt(bigArray[i-1].timestamp)).toString(),
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