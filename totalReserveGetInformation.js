
export async function getTotalReserveByMinutes(){
    try{
        const stakeData = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmQ83BDa1SsRbVuCe9Tj9efU3EVaPiAXzFrGZFqdpj9FTT',
            method: 'post',
            data: {
              query: stakeQuery
            }
          })
        const unstakeData = await axios({
            url: 'https://api.thegraph.com/subgraphs/id/QmQ83BDa1SsRbVuCe9Tj9efU3EVaPiAXzFrGZFqdpj9FTT',
            method: 'post',
            data: {
              query: unstakeQuery
            }
          })
        console.log(stakeData.data.data)
        let data = []
        for(let i = 0; i < timestamps.length - 1; ++i)
        {
            let obj = {}
            obj.timestampBegin = timestamps[i]
            obj.timestampEnd = timestamps[i+1] 
            obj.interval = delta_per_period
            let s1 = stakeData.data.data['t'+ timestamps[i].toString()]
            let s2 = stakeData.data.data['t'+ timestamps[i+1].toString()]
            if(!!s1 && !!s2)
            {
                // Сумма стейков за последний интервал
                var staked = Number(s2[0].totalStaked) - Number(s1[0].totalStaked)
                obj.staked = staked
                var stakeCount = Number(s2[0].stakeCount) - Number(s1[0].stakeCount)
                var currentStaked = Number(s1[0].currentStaked)
                obj.stakeCount = stakeCount
            }
            else{
                var staked = 0
            }
    
            let u1 = unstakeData.data.data['t'+ timestamps[i].toString()]
            let u2 = unstakeData.data.data['t'+ timestamps[i+1].toString()]    
            if(!!u1 && !!u2)
            {
                // Сумма анстейков за последний интервал
                var unstaked = Number(u2[0].totalUnstaked) - Number(u1[0].totalUnstaked)
                obj.unstaked = unstaked
                var unstakeCount = Number(u2[0].unstakeCount) - Number(u1[0].unstakeCount)
                obj.unstakeCount = unstakeCount
            }
            else{
                var unstaked = 0
            }
    
            if(staked !== 0)
            {
                obj.unstakedToStakedPercent = 100 * (unstaked / staked)
            }
            if(currentStaked !== 0)
            {
                obj.unstakedToTotalStakedPercent = 100 * (unstaked / currentStaked)
            }
            data.push(obj)
        }
        return data
    }
    catch(err)
    {
        console.log(err)
    }
}