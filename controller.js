var blessed = require('blessed');
var ping = require('ping');
var config = require('./config.json');
  //const beeper = require('beeper');

  // beeper();
  // console.log("hi:2");
  // return ;
//Config
const timeOut = 10*1000 ;
const bestTime = 2000 ;
const itemPerLine = 4 ;

//Params
var maxWidth = 100/itemPerLine ;
//Screen configuration
    var screen = blessed.screen({
      smartCSR: true
    });
    
    screen.title = 'Server and domain checker';

    // Quit on Escape, q, or Control-C.
    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
      return process.exit(0);
    });

var myDomains = config.hosts ;
var diagrams = [{name:'',box:blessed.box()}];
    diagrams=[];

for(var i = 0 ; i <myDomains.length; i++)
{
  diagrams.push({name:myDomains[i],box:blessed.box({
    top: Math.floor(i/itemPerLine),
    left: ((i%itemPerLine)*maxWidth)+'%',
    width: maxWidth+'%',
    height: 1,
    content: myDomains[i],
    style:{
      bg: '#ffffff',
      fg: 'black'
    }
  })});

  loopMyPing(diagrams[i]);
}

function loopMyPing(data=diagrams[0])
{
    var requestTime = new Date().getTime();
    ping.promise.probe(data.name, {
        timeout: timeOut/1000,
    }).then(function (res) {
        var respondTime = new Date().getTime()-requestTime ;

        var redString = Math.floor(Math.min((res.avg/bestTime)*0xff,0xff)).toString(16);
        if(redString.length==1)redString='0'+redString;
        var greenString = Math.floor((Math.max(0,bestTime-res.avg)/bestTime)*0xff).toString(16);
        if(greenString.length==1)greenString='0'+greenString

        data.box.style.bg = !res.alive?'#ff0000':'#'+redString+'00ff';
        data.box.content = data.name+((data.name!=res.numeric_host)?('('+res.numeric_host+')>'):'>')+(res.alive?respondTime:' ! ');

        screen.append(data.box);
        screen.render();


        setTimeout(loopMyPing,1000,data);
    });
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

