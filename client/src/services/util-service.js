export const utilService = {
    formatDateTime
}


function formatDateTime(inputDateTime) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const days = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ];
  
    const date = new Date(inputDateTime);
  
    const dayOfWeek = days[date.getUTCDay()];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
  
    return `${dayOfWeek} ${month} ${day}, ${year}`;
  }
  
  