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
        let j = i < 10 ? `0${i}` : i;

        times.push(`${j}:00`);
        times.push(`${j}:30`);
      }

      for(let day of pickupDates){
        for(let time of times){
          let date = `${day}-${time}`;
          pickupTimes.push(date);
        }
      }

      for(let day of deliveryDates){
        for(let time of times){
          let date = `${day}-${time}`;
          deliveryTimes.push(date);
        }
      }

      for(let time of pickupTimes){
        let pickup = new PickupDate();

        pickup.date = time;
        await pickup.save();
        console.log(pickup);
      }

      for(let time of deliveryTimes){
        let delivery = new DeliveryDate();

        delivery.date = time;
        await delivery.save();
      }
    }
    catch(err){
      console.log(err);
    }
  })();
};
