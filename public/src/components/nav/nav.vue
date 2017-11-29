<template>
  <div id="nav" class="reg-nav">
    <div id="nav-bar">
      <div class="logo">
        <a href="/"><img src="/src/assets/logo.png"/></a>
      </div>
      <div id="nav-items">
        <ul>
          <li><a href="/">About</a></li>
          <li><a href="">Hosts</a></li>
          <li><a href="">Rates</a></li>
          <li><a href="">Team</a></li>
        </ul>
        <div class="nav-action"><a href="">Book Now</a></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style>
  #nav{
    z-index: 200;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-out;
  }

  .reg-nav{
    position: absolute;
    background-color: transparent;
    top: 100px;
  }

  .sticky-nav{
    position: fixed;
    background-color: #4992B7;
    top: 0;
  }

  #nav-bar{
    font-family: Lato, "Helvetica Neue", sans-serif;
    font-size: 0.8em;
    color: white;
    width: 60%;
    height: 80%;
    min-width: 600px;
    margin: auto;
    display: flex;
    align-items: center;
    align-content: center;
    transition: all 2s linear;
  }

  #nav-bar .logo{
    margin-right: auto;
    width: 30%;
    min-width: 50px;
  }

  #nav-items{
    display: flex;
    flex: 1;
    align-items: center;
  }

  #nav-items ul{
    margin: 0;
    list-style-type: none;
    display: flex;
    flex: 0.9;
  }

  #nav-items li{
    text-align: center;
    flex: 1;
  }

  #nav-items ul a{
    padding: 7px 5px;
    border-bottom: solid 3px transparent;
    transition: border-bottom-color 0.2s linear;
    color: inherit;
  }

  #nav-items ul a:hover{
    border-bottom: solid 3px white;
  }

  #nav-bar .logo img{
    width: 70%;
    min-width: 50px;
    max-width: 110px;
  }

  #nav-bar a{
    text-decoration: none;
  }

  .nav-action{
    margin-left: auto;
  }

  .nav-action a{
    outline: 3px solid white;
    width: 100%;
    padding: 10px;
    color: white;
    transition: background 0.2s linear;
  }

  .nav-action a:hover{
    background: white;
    color: #4992B7;
  }
</style>
