function calculateTime() {
    
    let startTimeString = 12;
    let endTimeString = 13;
    let durationString = 30;

   
    let startTime = parseTimeString(startTimeString);
    let endTime = parseTimeString(endTimeString);
    let duration = parseInt(durationString, 10);

    
    if (startTime && endTime) {
      
        let diffMs = endTime.getTime() - startTime.getTime();
        let diffMinutes = Math.round(diffMs / (1000 * 60));
        console.log(`Duration: ${diffMinutes} minutes`);
    } else if (startTime && duration) {
        
        let endTime = new Date(startTime.getTime() + duration * 60000); 
        console.log(`End Time: ${formatTime(endTime)}`);
    } else if (endTime && duration) {
        let startTime = new Date(endTime.getTime() - duration * 60000);
        console.log(`Start Time: ${formatTime(startTime)}`);
    } else {
        console.log("Invalid input");
    }
}


function parseTimeString(timeString) {
    if (!timeString) return null;
    let [hours, minutes] = timeString.split(":");
    return new Date(0, 0, 0, hours, minutes); 
}

function formatTime(date) {
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}


calculateTime();
