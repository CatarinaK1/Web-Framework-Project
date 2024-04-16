// scheduleData.js

// Tämä on funktio, joka hakee junien aikataulut
export default async function searchTrains(Departure, Destination) {
    const listoftrains = await searchTrainsWithAPI(Departure, Destination);
    console.log(Departure, Destination);
    return listoftrains;
}

async function searchTrainsWithAPI(departureStationShortCode, arrivalStationShortCode) {
    // Haetaan junien aikataulut API:sta
    const formattedDate = (date) => {
        const dateWithCorrectOffset = new Date();
        return dateWithCorrectOffset.toISOString();
    };

    const currentDate = new Date();
    const isoDate = formattedDate(currentDate);

    const apiUrl = 'https://rata.digitraffic.fi/api/v1/live-trains/station/' + departureStationShortCode + '/' + arrivalStationShortCode + '?startDate=' + isoDate + '&limit=15';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const trainObject = await trains(data, departureStationShortCode, arrivalStationShortCode);
        console.log(trainObject);
        return trainObject;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

async function trains(data, departureStationShortCode, arrivalStationShortCode) {
    try {
        const trainObject = await Promise.all(data.map(async (element) => {
            const timeTableArray = element.timeTableRows;
            const departureStation = timeTableArray.find(train => train.stationShortCode === departureStationShortCode && train.type === "DEPARTURE");
            const departureTime = getTimeString(departureStation);
            const destinationStation = timeTableArray.find(train => train.stationShortCode === arrivalStationShortCode);
            const arrivalTime = getTimeString(destinationStation);
            const commercialTrack = track(departureStation);

            if (element["trainCategory"] !== "Cargo") {
                return {
                    Departurehour: departureTime,
                    Arrivalhour: arrivalTime,
                    train: element["trainNumber"],
                    track: commercialTrack,
                };
            } else {
                return null; // or return {} as an empty object if you prefer
            }
        }));
        return trainObject.filter(Boolean); // Filter out null values
    } catch (error) {
        console.error('There was a problem with processing the train data:', error);
    }
}

function getTimeString(departureStation) {
    if (departureStation && departureStation.scheduledTime) {
        const departureDateTime = departureStation.scheduledTime;
        const parsedDate = new Date(Date.parse(departureDateTime));
        const isSummerTime = isSummerTimeInFinland(parsedDate);
        const hoursToAdd = isSummerTime ? 3 : 2;

        parsedDate.setHours(parsedDate.getHours() + hoursToAdd);

        const hours = parsedDate.getUTCHours();
        const minutes = parsedDate.getUTCMinutes();
        const time = minutes < 10 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;
        return time;
    } else {
        return "error";
    }
}

function isSummerTimeInFinland(date) {
    const year = date.getFullYear();
    const summerTimeStart = new Date(year, 2, 31 - (new Date(year, 2, 31).getDay()) + 1, 3);
    const summerTimeEnd = new Date(year, 9, 31 - (new Date(year, 9, 31).getDay()) + 1, 4);

    return date >= summerTimeStart && date < summerTimeEnd;
}

function track(departureStation) {
    return departureStation["commercialTrack"];
}
