var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});
 
screen.title = 'my window title';

var box = blessed.box({
    top: 0,
    left: 0,
    width: '50%',
    height: 1,
    content: 'Hello {bold}world{/bold}!',
    tags: true,
    style: {
      bg: '#ff0000'
    }
  });

   
  // Append our box to the screen.
  screen.append(box);

  // Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
   
  // Render the screen.
  screen.render();

  setInterval(render,33);

  var precent = 50 ;

  function render()
  {
    precent++;
    if(precent>100)
    {
      precent = 10 ;
    }
    box.width = precent+'%';
    screen.append(box);
    screen.render();
  }

return;

console.clear();
console.log("hi");
return

var ping = require('ping');

var hosts = ['192.168.7.1', 'google.com', 'yahoo.com'];

hosts.forEach(function (host) {
    // WARNING: -i 2 argument may not work in other platform like window
    ping.promise.probe(host, {
        timeout: 10,
        extra: ['-i', '2'],
    }).then(function (res) {
        console.log(res);
    });
});