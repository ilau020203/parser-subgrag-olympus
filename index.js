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
import {getBalanceForDay} from './controller_balance/controllerBalance.js'



import fs from 'fs'


async function main() {
    //exapmle getting parser array from graphql 
    // let data = JSON.stringify(await getBalanceForDay());
    // fs.writeFileSync('resultBalanceDay.json', data);


    let data = JSON.stringify(await getTotalReserveByMinut(1633392000,1633996800));
    fs.writeFileSync('resultMinute.json', data);
    data = JSON.stringify(await getTotalReserveByHour(1633392000,1633996800));
    fs.writeFileSync('resultHour.json', data);
    data = JSON.stringify(await getTotalReserveByDay(1633392001,1633996801));
    fs.writeFileSync('resultDay.json', data);
    data = JSON.stringify(await getTotalReserveBy4Hour(1633392000,1633996800));
    fs.writeFileSync('result4Hour.json', data);
     data = JSON.stringify(await getDepositByMinut(1633392000,1633996800));
    fs.writeFileSync('resultMinuteDeposit.json', data);
     data = JSON.stringify(await getDepositByHour(1633392000,1633996800));
    fs.writeFileSync('resultHourDeposit.json', data);
     data = JSON.stringify(await getDepositByDay(1633392000,1633996800));
    fs.writeFileSync('resultDayDeposit.json', data);
    data = JSON.stringify(await getDepositBy4Hour(1633392000,1633996800));
    fs.writeFileSync('result4HourDeposit.json', data);
    // data = JSON.stringify(await getManageByMinut());
    // fs.writeFileSync('resultMinuteManage.json', data);
    //  data = JSON.stringify(await getManageByHour());
    // fs.writeFileSync('resultHourManage.json', data);
    //  data = JSON.stringify(await getManageByDay());
    // fs.writeFileSync('resultDayManage.json', data);
    // data = JSON.stringify(await getManageBy4Hour());
    // fs.writeFileSync('result4HourManage.json', data);
    // data = JSON.stringify(await getMintRewardsByMinutes());
    // fs.writeFileSync('resultMintMinute.json', data);
    // data = JSON.stringify(await getMintRewardsByHours());
    // fs.writeFileSync('resultMintHour.json', data);
    // data = JSON.stringify(await getMintRewardsByDays());
    // fs.writeFileSync('resultMintDay.json', data);
    // data = JSON.stringify(await getMintRewardsBy4Hours());
    // fs.writeFileSync('resultMint4Hour.json', data);
}

main();
