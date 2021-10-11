import {getTotalReserveByMinut} from './totalReserveGetInformationForMinutes.js'
import {getTotalReserveByHour,getTotalReserveBy4Hour} from './totalReserveGetInformationForHours.js'
import {getTotalReserveByDay} from './totalReserveGetInformationForDays.js'
import {getDepositByMinut} from './depositGetInformationForMinutes.js'
import {getDepositByHour,getDepositBy4Hour} from './depositGetInformationForHours.js'
import {getDepositByDay} from './depositGetInformationForDays.js'
import {getManageByMinut} from './manageGetInformationForMinutes.js'
import {getManageByHour,getManageBy4Hour} from './manageGetInformationForHours.js'
import {getManageByDay} from './manageGetInformationForDays.js'
import {getMintRewardsByDays} from './mintGetInformationForDays.js'
import {getMintRewardsByHours,getMintRewardsBy4Hours} from './mintGetInformationForHours.js'
import {getMintRewardsByMinutes} from './mintGetInformationForMinutes.js'




import fs from 'fs'


async function main() {
    //exapmle getting parser array from graphql 
    let data = JSON.stringify(await getTotalReserveByMinut());
    fs.writeFileSync('resultMinute.json', data);
    data = JSON.stringify(await getTotalReserveByHour());
    fs.writeFileSync('resultHour.json', data);
    data = JSON.stringify(await getTotalReserveByDay());
    fs.writeFileSync('resultDay.json', data);
    data = JSON.stringify(await getTotalReserveBy4Hour());
    fs.writeFileSync('result4Hour.json', data);
     data = JSON.stringify(await getDepositByMinut());
    fs.writeFileSync('resultMinuteDeposit.json', data);
     data = JSON.stringify(await getDepositByHour());
    fs.writeFileSync('resultHourDeposit.json', data);
     data = JSON.stringify(await getDepositByDay());
    fs.writeFileSync('resultDayDeposit.json', data);
    data = JSON.stringify(await getDepositBy4Hour());
    fs.writeFileSync('result4HourDeposit.json', data);
    data = JSON.stringify(await getManageByMinut());
    fs.writeFileSync('resultMinuteManage.json', data);
     data = JSON.stringify(await getManageByHour());
    fs.writeFileSync('resultHourManage.json', data);
     data = JSON.stringify(await getManageByDay());
    fs.writeFileSync('resultDayManage.json', data);
    data = JSON.stringify(await getManageBy4Hour());
    fs.writeFileSync('result4HourManage.json', data);
    data = JSON.stringify(await getMintRewardsByMinutes());
    fs.writeFileSync('resultMintMinute.json', data);
    data = JSON.stringify(await getMintRewardsByHours());
    fs.writeFileSync('resultMintHour.json', data);
    data = JSON.stringify(await getMintRewardsByDays());
    fs.writeFileSync('resultMintDay.json', data);
    data = JSON.stringify(await getMintRewardsBy4Hours());
    fs.writeFileSync('resultMint4Hour.json', data);
}

main();
