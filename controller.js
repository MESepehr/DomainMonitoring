var blessed = require('blessed');
var ping = require('ping');
var config = require('./config.json');
  //const beeper = require('beeper');

  // beeper();
  // console.log("hi:2");
  // return ;
//Config
const timeOut = 15*1000 ;
const bestTime = 5000 ;
const itemPerLine = 3 ;
const lineHeight = 2 ;
const avgSpeed = 10 ;

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
var diagrams = [{name:'',box:blessed.box(),avg:0}];
    diagrams=[];

for(var i = 0 ; i <myDomains.length; i++)
{
  diagrams.push({avg:0,name:myDomains[i],box:blessed.box({
    top: Math.floor(i/itemPerLine)*lineHeight,
    left: ((i%itemPerLine)*maxWidth)+'%',
    width: maxWidth+'%',
    height: lineHeight,
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
        data.avg += (respondTime-data.avg)/avgSpeed;

        var redString = Math.floor(Math.min((data.avg/bestTime)*0xff,0xff)).toString(16);
        if(redString.length==1)redString='0'+redString;
        var greenString = Math.floor((Math.max(0,bestTime-data.avg)/bestTime)*0xff).toString(16);
        if(greenString.length==1)greenString='0'+greenString

        data.box.style.bg = '#'+redString+greenString+'00';
        data.box.content = data.name+((data.name!=res.numeric_host)?('('+res.numeric_host+')>'):'>')+(res.alive?respondTime:' ! '+data.avg);

        screen.append(data.box);
        screen.render();


        setTimeout(loopMyPing,2000,data);
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

