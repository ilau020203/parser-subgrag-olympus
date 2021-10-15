import {getTotalReserveByMinut} from './total reserve/totalReserveGetInformationForMinutes.js'
import {getTotalReserveByHour,getTotalReserveBy4Hour} from './total reserve/totalReserveGetInformationForHours.js'
import {getTotalReserveByDay} from './total reserve/totalReserveGetInformationForDays.js'
import {getDepositByMinut} from './deposit/depositGetInformationForMinutes.js'
import {getDepositByHour,getDepositBy4Hour} from './deposit/depositGetInformationForHours.js'
import {getDepositByDay} from './deposit/depositGetInformationForDays.js'
import {getManageByMinut} from './manage/manageGetInformationForMinutes.js'
import {getManageByHour,getManageBy4Hour} from './manage/manageGetInformationForHours.js'
import {getManageByDay} from './manage/manageGetInformationForDays.js'
import {getMintRewardsByDays} from './mint/mintGetInformationForDays.js'
import {getMintRewardsByHours,getMintRewardsBy4Hours} from './mint/mintGetInformationForHours.js'
import {getMintRewardsByMinutes} from './mint/mintGetInformationForMinutes.js'
import {getDAIBalanceByDay} from './token_balance/dai_balance/daiBalanceForDays.js'
import {getDAIBalanceByHour,getDAIBalanceBy4Hour} from './token_balance/dai_balance/daiBalanceForHours.js'
import {getDAIBalanceByMinut} from './token_balance/dai_balance/daiBalanceForMinutes.js'
import {getFRAXBalanceByDay} from './token_balance/frax_balance/fraxBalanceForDays.js'
import {getFRAXBalanceByHour,getFRAXBalanceBy4Hour} from './token_balance/frax_balance/fraxBalanceForHours.js'
import {getFRAXBalanceByMinut} from './token_balance/frax_balance/fraxBalanceForMinutes.js'
import {getLUSDBalanceByDay} from './token_balance/lusd_balance/lusdBalanceForDays.js'
import {getLUSDBalanceByHour,getLUSDBalanceBy4Hour} from './token_balance/lusd_balance/lusdBalanceForHours.js'
import {getLUSDBalanceByMinut} from './token_balance/lusd_balance/lusdBalanceForMinutes.js'
import {getlpOhmDaiBalanceByDay} from './token_balance/lpOhmDai_balance/lpOhmDaiBalanceForDays.js'
import {getlpOhmDaiBalanceByHour,getlpOhmDaiBalanceBy4Hour} from './token_balance/lpOhmDai_balance/lpOhmDaiBalanceForHours.js'
import {getlpOhmDaiBalanceByMinut} from './token_balance/lpOhmDai_balance/lpOhmDaiBalanceForMinutes.js'
import {getlpOhmLusdBalanceByDay} from './token_balance/lpOhmLusd_balance/lpOhmLusdBalanceForDays.js'
import {getlpOhmLusdBalanceByHour,getlpOhmLusdBalanceBy4Hour} from './token_balance/lpOhmLusd_balance/lpOhmLusdBalanceForHours.js'
import {getlpOhmLusdBalanceByMinut} from './token_balance/lpOhmLusd_balance/lpOhmLusdBalanceForMinutes.js'
import {getUniswapV2BalanceByDay} from './token_balance/uniswap_v2_balance/uniswapv2BalanceForDays.js'
import {getUniswapV2BalanceByHour,getUniswapV2BalanceBy4Hour} from './token_balance/uniswap_v2_balance/uniswapv2BalanceForHours.js'
import {getUniswapV2BalanceByMinut} from './token_balance/uniswap_v2_balance/uniswapv2BalanceForMinutes.js'





import fs from 'fs'


async function main() {
    //exapmle getting parser array from graphql 
    // let data = JSON.stringify(await getBalanceForDay());
    // fs.writeFileSync('resultBalanceDay.json', data);


    let data = JSON.stringify(await getTotalReserveByMinut(1633392000));
    // fs.writeFileSync('resultMinute.json', data);
    // data = JSON.stringify(await getTotalReserveByHour(1633392000,1633996800));
    // fs.writeFileSync('resultHour.json', data);
    // data = JSON.stringify(await getTotalReserveByDay(1633392000));
    // fs.writeFileSync('resultDay.json', data);
    // data = JSON.stringify(await getTotalReserveBy4Hour(1633392000,1633996800));
    // fs.writeFileSync('result4Hour.json', data);
    //  data = JSON.stringify(await getDepositByMinut(1633392000,1633996800));
    // fs.writeFileSync('resultMinuteDeposit.json', data);
    //  data = JSON.stringify(await getDepositByHour(1633392000,1633996800));
    // fs.writeFileSync('resultHourDeposit.json', data);
    //  data = JSON.stringify(await getDepositByDay(1633392000,1633996800));
    // fs.writeFileSync('resultDayDeposit.json', data);
    // data = JSON.stringify(await getDepositBy4Hour(1633392000));
    // fs.writeFileSync('result4HourDeposit.json', data);
    // data = JSON.stringify(await getManageByMinut(1633392000));
    // fs.writeFileSync('resultMinuteManage.json', data);
    //  data = JSON.stringify(await getManageByHour(1633392000));
    // fs.writeFileSync('resultHourManage.json', data);
    //  data = JSON.stringify(await getManageByDay(1633392000));
    // fs.writeFileSync('resultDayManage.json', data);
    // data = JSON.stringify(await getManageBy4Hour(1633392000));
    // fs.writeFileSync('result4HourManage.json', data);
    // data = JSON.stringify(await getMintRewardsByMinutes(1633392000));
    // fs.writeFileSync('resultMintMinute.json', data);
    // data = JSON.stringify(await getMintRewardsByHours(1633392000));
    // fs.writeFileSync('resultMintHour.json', data);
    // data = JSON.stringify(await getMintRewardsByDays(1633392000));
    // fs.writeFileSync('resultMintDay.json', data);
    // data = JSON.stringify(await getMintRewardsBy4Hours(1633392000));
    // fs.writeFileSync('resultMint4Hour.json', data);
    data = JSON.stringify(await getDAIBalanceByMinut(1633392000));
    fs.writeFileSync('resultDAIMinute.json', data);
    data = JSON.stringify(await getDAIBalanceByHour(1633392000));
    fs.writeFileSync('resultDAIHour.json', data);
    data = JSON.stringify(await getDAIBalanceByDay(1633392000));
    fs.writeFileSync('resultDAIDay.json', data);
    data = JSON.stringify(await getDAIBalanceBy4Hour(1633392000));
    fs.writeFileSync('resultDAI4Hour.json', data);
    data = JSON.stringify(await getFRAXBalanceByMinut(1633392000));
    fs.writeFileSync('resultFRAXMinute.json', data);
    data = JSON.stringify(await getFRAXBalanceByHour(1633392000));
    fs.writeFileSync('resultFRAXHour.json', data);
    data = JSON.stringify(await getFRAXBalanceByDay(1633392000));
    fs.writeFileSync('resultFRAXDay.json', data);
    data = JSON.stringify(await getFRAXBalanceBy4Hour(1633392000));
    fs.writeFileSync('resultFRAX4Hour.json', data);
    data = JSON.stringify(await getLUSDBalanceByMinut(1633392000));
    fs.writeFileSync('resultLUSDMinute.json', data);
    data = JSON.stringify(await getLUSDBalanceByHour(1633392000));
    fs.writeFileSync('resultLUSDHour.json', data);
    data = JSON.stringify(await getLUSDBalanceByDay(1633392000));
    fs.writeFileSync('resultLUSDDay.json', data);
    data = JSON.stringify(await getLUSDBalanceBy4Hour(1633392000));
    fs.writeFileSync('resultLUSD4Hour.json', data);
    data = JSON.stringify(await getlpOhmDaiBalanceByMinut(1633392000));
    fs.writeFileSync('resultlpOhmDaiMinute.json', data);
    data = JSON.stringify(await getlpOhmDaiBalanceByHour(1633392000));
    fs.writeFileSync('resultlpOhmDaiHour.json', data);
    data = JSON.stringify(await getlpOhmDaiBalanceByDay(1633392000));
    fs.writeFileSync('resultlpOhmDaiDay.json', data);
    data = JSON.stringify(await getlpOhmDaiBalanceBy4Hour(1633392000));
    fs.writeFileSync('resultlpOhmDai4Hour.json', data);
    data = JSON.stringify(await getlpOhmLusdBalanceByMinut(1633392000));
    fs.writeFileSync('resultlpOhmLusdMinute.json', data);
    data = JSON.stringify(await getlpOhmLusdBalanceByHour(1633392000));
    fs.writeFileSync('resultlpOhmLusdHour.json', data);
    data = JSON.stringify(await getlpOhmLusdBalanceByDay(1633392000));
    fs.writeFileSync('resultlpOhmLusdDay.json', data);
    data = JSON.stringify(await getlpOhmLusdBalanceBy4Hour(1633392000));
    fs.writeFileSync('resultlpOhmLusd4Hour.json', data);
    data = JSON.stringify(await getUniswapV2BalanceByMinut(1633392000));
    fs.writeFileSync('resultUniswapV2Minute.json', data);
    data = JSON.stringify(await getUniswapV2BalanceByHour(1633392000));
    fs.writeFileSync('resultUniswapV2Hour.json', data);
    data = JSON.stringify(await getUniswapV2BalanceByDay(1633392000));
    fs.writeFileSync('resultUniswapV2Day.json', data);
    data = JSON.stringify(await getUniswapV2BalanceBy4Hour(1633392000));
    fs.writeFileSync('resultUniswapV24Hour.json', data);
}

main();
