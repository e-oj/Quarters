<template>
  <div id="container" class="full vertical-container">
    <div id="splash">
      <div class="splash-text">
        <p>
          <span class="fredoka-font">RIT STUDENTS</span><br>
          Save up to <span class="blue-text fredoka-font">50%</span> this winter<br>
          break on storing your items! <br>
        </p>

        <div class="home-email">
          <div>Get updates on Stör:</div>
          <label for="email-in"></label>
          <input id="email-in" placeholder="Enter email" type="text"/>
          <button class="button">Submit</button>
        </div>
      </div>
    </div>
    <div id="how">
      <h1>How It Works</h1>
      <div id="steps">
        <div v-for="step in how">
          <img :src="step.img.src" :width="step.img.width" :height="step.img.height"/>
          <p>
            {{step.description}}
          </p>
        </div>
      </div>
      <button class="button">Book Now</button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        stickyNav: false
        , how: [
          {
            description: "Select a size option and host provider. " +
              "Schedule a pick up and delivery dates"
            , img: {
              src: "/src/assets/calendar_2x.png"
              , width: 76
              , height: 70
            }
          }
          , {
            description: "We will come pickup your stuff and collect payment. " +
              "We will then bring it to the host"
            , img: {
              src: "/src/assets/truck_2x.png"
              , width: 102
              , height: 67
            }
          }
          , {
            description: "After the break, we'll drop off your items back at your residence"
            , img: {
              src: "/src/assets/box_2x.png"
              , width: 64
              , height: 72
            }
          }
        ]
      }
    }
  }
</script>

<style>
  #splash{
    background-image: url("/src/assets/phone blur-u1756-fr_2x.jpg");
    background-size: cover;
    background-position: bottom;
    flex: 2;
    min-height: 750px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .splash-text{
    height: 350px;
    position: relative;
    padding-left: 20%;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  #splash p{
    margin: 0;
    font-size: 0.16em;
  }

  .vertical-container{
    display: flex;
    flex-direction: column;
  }

  .splash-text .home-email{
    font-size: 0.1em;
    color: white;
  }

  #email-in{
    outline: none;
    background: inherit;
    border: none;
    color: white;
    border-bottom: 2px solid white;
    width: 300px;
    font-size: inherit;
    margin-top: 15px;
  }

  #email-in::placeholder{
    opacity: 0.5;
    transition: all 0.2s linear;
  }

  #email-in:focus::placeholder, #email-in:hover::placeholder{
    opacity: 1;
  }

  #how{
    background-color: #35667F;
    flex: 1;
    min-height: 375px;
    font-size: 0.17em;
    color: white;
    text-align: center;
  }

  #how h1{
    font-size: inherit;
  }

  #how button{
    font-size: 0.5em;
  }

  #steps{
    width: 50%;
    margin: auto;
    font-size: 0.5em;
    display: flex;
    justify-content: space-evenly;
    align-items: baseline;
  }

  #steps div{
    max-width: 222px;
  }

  #steps img{
    max-width: 105px;
  }
</style>
