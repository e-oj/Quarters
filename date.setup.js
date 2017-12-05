/**
 * @author EmmanuelOlaojo
 * @since 12/3/17
 */

let PickupDate = require("./app/models/Dates").Pickup;
let DeliveryDate = require("./app/models/Dates").Delivery;

module.exports = function() {
  (async () => {
    try{
      let result = await PickupDate.findOne();

      if(result) return;

      let pickupDates = [];
      let pickupTimes = [];

      let deliveryDates = [];
      let deliveryTimes = [];

      let times = [];

      for(let i = 7; i < 20; i++){
        if(i >= 10) pickupDates.push(i);
        if(i < 17) deliveryDates.push(i);
      }

      for(let i = 9; i < 24; i++){
        times.push(`${i}:00`);
        times.push(`${i}:30`);
      }

      for(let day of pickupDates){
        for(let time of times){
          let date = new Date();
          let parts = time.split(":");

          date.setDate(day);
          date.setHours(parts[0]);
          date.setMinutes(parts[1]);
          date.setMonth(11);
          date.setFullYear(2017);

          pickupTimes.push(date);
        }
      }

      for(let day of deliveryDates){
        for(let time of times){
          let date = new Date();
          let parts = time.split(":");

          date.setDate(day);
          date.setHours(parts[0]);
          date.setMinutes(parts[1]);
          date.setMonth(1);
          date.setFullYear(2018);

          deliveryTimes.push(date);
        }
      }

      for(let time of pickupTimes){
        let pickup = new PickupDate();

        pickup.date = time;
        await pickup.save();
      }

      for(let time of deliveryTimes){
        let delivery = new DeliveryDate();

        delivery.date = time;
        await delivery.save();
      }

      console.log(times);
    }
    catch(err){
      console.log(err);
    }
  })();
};
