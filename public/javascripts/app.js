document.addEventListener("DOMContentLoaded", function() {
// get our connection to socket io server
  var socket = io()
  console.log(socket)
  socket.on('add-circle', function(data){
    console.log(data)
    addCircle(data)
  })
  socket.on('clear-circle', function(data){
    circles.innerHTML = ''
  })


  var circles = document.getElementById('circles')
  var initials = ''

  circles.addEventListener('click', function(evt) {
    socket.emit('add-circle', {
      initials: initials,
      x: evt.clientX,
      y: evt.clientY,
      dia: randomBetween(40,200),
      rgba: getRandomRGBA(),
      rgbatext: getRandomRGBA()
    })
    // addCircle(evt.clientX, evt.clientY, randomBetween(10,125), getRandomRGBA())
  })
// clear button
  document.getElementsByClassName('button-clear')[0].addEventListener('click', function() {

    console.log('cleared it')
    socket.emit('clear-circle', {})

  })

  while (initials.length < 1) {
    initials = prompt("Please enter image url")
  }
// changed addcircle parametter x y rgba etc to 'data'
  function addCircle(data) {
    var el = document.createElement('div')
    el.style.left = data.x - Math.floor(data.dia / 2 + 0.5) + 'px'
    el.style.top = data.y - Math.floor(data.dia / 2 + 0.5) + 'px'
    el.style.width = el.style.height = data.dia + 'px'
    // el.style.backgroundColor = data.rgba
    el.style.border = data.rgba + 'solid 5px'
    el.style.fontSize = Math.floor(data.dia / 3) + 'px'
    el.style.color = data.rgbatext // or use data.rgba to pull in random
    el.style.textAlign = 'left'
    el.style.lineHeight = data.dia + 'px'
    // el.innerHTML = '<img src="http://beerpulse.com/wp-content/uploads/2012/12/coedo-brewery-logo.jpg" class="img-responsive img-circle" alt="logo">'
    el.innerHTML = '<img src="' + data.initials + '" class="img-responsive img-circle" height="120px" alt="logo">'
    // el.innerHTML = '<ul><li ng-repeat="drink in drinknewCtrl.all" data-id="{{drinks._id}}"><img ng-src="{{drink.drinkImage}}" alt="logo" height="120px"></li></ul>'
    circles.appendChild(el)
  }

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function getRandomRGBA() {
    return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
      randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join('')
  }

})
