var blessed = require('blessed');

//Screen configuration
    var screen = blessed.screen({
      smartCSR: true
    });
    
    screen.title = 'Server and domain checker';

    // Quit on Escape, q, or Control-C.
    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });

var myDomains = ['google.com','yahoo.com','192.168.1.1'];
var diagrams = [{name:'',box:blessed.box()}];
    diagrams=[];

for(var i = 0 ; i <myDomains.length; i++)
{
  diagrams.push({name:myDomains[i],box:blessed.box({
    top: Math.floor(i/2),
    left: i%2==0?0:'50%',
    width: '50%',
    height: 1,
    content: myDomains[i],
    style: {
      bg: '#22ff22',
      fg: 'black',
    }
  })});
}


//Screen rendering
  render();


  function render()
  {
    for(var i=0;i<diagrams.length ; i++)
    {
      screen.append(diagrams[i].box);
    }
    screen.render();
  }



return;

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