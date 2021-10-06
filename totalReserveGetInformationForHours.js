import axios from 'axios'


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
            url: 'https://api.thegraph.com/subgraphs/id/QmS4EPHodzag8wK4m2fZrQYYQrnocX25W9Uf18sz3KPwZc',
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
    let audited=false;
    let out = [];
    for(let i=1;i<bigArray.length;i++){
        out.push({
            totalReverse:bigArray[i-1].finalTotalReserves,
            timestamp:bigArray[i-1].timestamp,
            audited:bigArray[i-1].audited,
        });
        let count=1;
        while(parseInt(bigArray[i-1].timestamp)+hour*(count+1)<bigArray[i].timestamp){
            out.push({
                totalReverse:bigArray[i-1].finalTotalReserves,
                timestamp: (hour*(count+1)+parseInt(bigArray[i-1].timestamp)).toString(),
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

function fillBigArrayFor4Hours(bigArray){
    let audited=false;
    let fragment=0;
    let out = [];
    for(let i=1;i<bigArray.length;i++){
        if(bigArray[i-1].audited) audited=true;
        if(fragment%4==3)
        {
            out.push({
                totalReverse:bigArray[i-1].finalTotalReserves,
                timestamp:bigArray[i-1].timestamp,
                audited:audited,
            });
            audited=false;
        }
        fragment++;
        let count=1;
        while(parseInt(bigArray[i-1].timestamp)+hour*(count+1)<bigArray[i].timestamp){
            if(fragment%4==3)
            {
                out.push({
                    totalReverse:bigArray[i-1].finalTotalReserves,
                    timestamp: (hour*(count+1)+parseInt(bigArray[i-1].timestamp)).toString(),
                    audited:audited,
                });
                audited=false;
            }
            fragment++;
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