import {getTotalReserveByMinut} from './totalReserveGetInformationForMinutes.js'
import {getTotalReserveByHour,getTotalReserveBy4Hour} from './totalReserveGetInformationForHours.js'
import {getTotalReserveByDay} from './totalReserveGetInformationForDays.js'
import fs from 'fs'


async function main() {
    let data = JSON.stringify(await getTotalReserveByMinut());
    fs.writeFileSync('resultMinute.json', data);
    data = JSON.stringify(await getTotalReserveByHour());
    fs.writeFileSync('resultHour.json', data);
    data = JSON.stringify(await getTotalReserveByDay());
    fs.writeFileSync('resultDay.json', data);
    data = JSON.stringify(await getTotalReserveBy4Hour());
    fs.writeFileSync('result4Hour.json', data);

}

main();
