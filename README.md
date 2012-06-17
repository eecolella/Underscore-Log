Underscore Log
==============
<b>Cross Browser advaced logging with Underscore Log and Firebug Lite</b>

----------------------------------------------------------------------------

###<b>Goal</b>

Created a single and definitive cross browser tool for peaceful logging in development state and which allows with a simple replace and minification to go into production

----------------------------------------------------------------------------

###Features

#### 1.0.0 v
<ul>
<li>created a alias for a specific features to Underscore Log: _log</li>
<li>wrapped the ripetitive console.log() in _log()</li>
<li>extendend the normal features to console.time(), now _log.time() stored all the iterations of itself to provide statics through _log.timeStat()</li>
<li>the collapsed group are auto opened if they contain error or warn</li>
<li>through _log.external() you can implement a complex control code in an external file: _logExt.js</li>
<li>created a minimal ui which allows the control errors and warns even when Firebug Lite is closed</li>
</ul>

----------------------------------------------------------------------------

###Docs

####_log( v )
> It prints in console a simple string
> <ul>
> <li><b>v</b>: a String that is printed in console</li>
> </ul>

####_log.time( key )
> It initializes the timer
> <ul>
> <li><b>key</b>: a String that identifies the timer</li>
> </ul>

####_log.timeEnd( key [,show] )
> It ends the timer and (by default) print in console the result of timer
> <ul>
> <li><b>key</b>: a String that identifies the timer</li>
> <li><b>show</b>: a optional Bool that specifies if the result of timer is to be printed in console, by default this is true</li>
> </ul>

####_log.timeStat( key )
> It prints the statics of timer
> <ul>
> <li><b>key</b>: a String that identifies the timer</li>
> </ul>