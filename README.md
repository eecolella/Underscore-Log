Underscore Log
==============
<b>Cross Browser advaced logging with Underscore Log and Firebug Lite</b>

----------------------------------------------------------------------------

#Goal

Created a single and definitive cross browser tool for peaceful logging in development state and which allows with a simple replace and minification to go into production. To accomplish this Underscrore Log is helped by Firebug Lite, using this basic functions, fixing some and adding others.

----------------------------------------------------------------------------

#Features

#### 1.0.0 v
<ul>
<li>created a <b>alias</b> for a specific features to Underscore Log: _log</li>
<li><b>wrapped</b> the ripetitive console.log() in _log()</li>
<li>extendend the normal features to console.time(), now _log.time() stored all the iterations of itself to provide <b>statistics</b> through _log.timeStat()</li>
<li>the collapsed group are <b>auto opened</b> if they contain error or warn</li>
<li>through _log.external() you can implement a <b>complex control code</b> in an external file: _logExt.js</li>
<li>created a <b>minimal</b> ui which allows the control errors and warns even when Firebug Lite is closed</li>
<li><b>auto check</b> itself if there is a new version</li>
</ul>

----------------------------------------------------------------------------

#Docs

####_log( v )
> Prints in console a simple string
> <ul>
> <li><b>v</b>: a String that is printed in console</li>
> </ul>

####_log.time( key )
> Creates a new the timer, call <b>_log.timeEnd(key)</b> with the same key to stop the timer and print the time elapsed
> <ul>
> <li><b>key</b>: a String that identifies the timer</li>
> </ul>

####_log.timeEnd( key [,show] )
> Stops a timer created by a call to <b>console.time(key)</b> and (by default) prints the time elapsed
> <ul>
> <li><b>key</b>: a String that identifies the timer</li>
> <li><b>show</b>: a optional Bool that specifies if the result of timer is to be printed in console, by <b>default</b> this is true</li>
> </ul>

####_log.timeStat( key )
> Prints the statics of timer(s), at least once must be iterated <b>console.time(key)</b> and <b>_log.timeEnd(key)</b> relatives
> <ul>
> <li><b>key</b>: a String that identifies the timer</li>
> </ul>

####_log.assert( exp, v [,mode] )
> Tests that an expression is true. If not, it will write a error (or warn) message to the console
> <ul>
> <li><b>exp</b>: a Bool or any type that will be evaluated</li>
> <li><b>v</b>: a String that is printed in console in error (or warn) message if the <b>exp</b> is false</li>
> <li><b>mode</b>: a String indicating whether a print a error or a warn, by <b>default</b> print a error, pass 'warn' for print a warn</li>
> </ul>

####_log.external( key [,args] [,scope] )
> Calls a external function in _logExt.js, allowing you to write complex code of logging
> <ul>
> <li><b>key</b>: a String that identifies the external function in _logExt.js</li>
> <li><b>args</b>: an optional Array that specifying the arguments with which external function should be called</li>
> <li><b>scope</b>: an optional Object indicating the <b>this</b> provided for the external function</li>
> </ul>

----------------------------------------------------------------------------

#Bugs Known

<ul>
<li>if the Firebug Lite console is closed while being fired the logs they will not ordained (fixing in progress)</li>
</ul>