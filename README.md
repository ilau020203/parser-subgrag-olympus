# Parser  olympus subgraph 
This repository contains functions for sending requests to treasury and    subgraph subgraph for Tracking Major Tokens Owned by OlympusDAO Treasury Contract ,and parse data from requests
You can make requests with a frequency of a minute, hour, 4 hours and day for a certain period of time.

## Usage

1. Run the `npm i` command to install dependencies.
2. In config file edit DEPLOYMENT ID if use new version of grah or deploy to new project.
3. Run the `node index.js` command to start exapmle.

## Example use function
    import {getTotalReserveByMinut} from './total reserve/totalReserveGetInformationForMinutes.js'
    let startTimestamp = 1633392000 //timestamp in seconds
    let endTimestamp = 1633996800 //timestamp in seconds
    data = await getBalanceForDay(startTimestamp,1633996800)