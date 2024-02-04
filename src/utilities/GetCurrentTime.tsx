import React from 'react';

const GetCurrentTime = () => {
  let currentdate = new Date();
  let datetime =  currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/"
                  + currentdate.getFullYear() + " "
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes()
  return datetime;
}

export default GetCurrentTime;
