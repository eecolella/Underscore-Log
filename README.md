Underscore Log
==============
<b>Cross Browser advaced logging with Underscore Log and Firebug Lite</b>

----------------------------------------------------------------------------

#Goal

Tell the truth, in javascript is not possible to apply a powerfull and deep logging architecture in your applications.

This is because, the console object is supported only for new generation browsers and, when you want to use it to test your code, you always have to remember to remove that calls before run your application in a old-generation browser.

Moreover, you have to know that there isn't a unique implementation also between all new-generation browsers and that the user interface is always different.

For this reasons is born the "Underscore Log" project, that unifies writing code and final user interface for the logging layer of your applications.

With this tool, using the method _log.assert you can also run simple tests on your code, in the same time you write it. 

To accomplish this, Underscrore Log is helped by Firebug Lite, using this basic functions, fixing some and adding others.

----------------------------------------------------------------------------

#Features

#### 1.0.0 v
<ul>
<li>created a <b>alias</b> for a specific features to Underscore Log: _log</li>
<li><b>wrapped</b> the ripetitive console.log() in _log()</li>
<li>extendend the normal features to console.time(), now _log.time() stored all the iterations of itself to provide <b>statistics</b> through _log.timeStat()</li>
<li>the collapsed group are <b>auto opened</b> if they contain error or warn</li>
<li>through _log.external() you can implement a <b>complex control code</b> in an external file: underscoreLogExt.js</li>
<li>created a <b>minimal</b> ui which allows the control errors and warns even when Firebug Lite is closed</li>
<li><b>auto check</b> itself if there is a new version</li>
<li>fixed a annoying bug inherited by Firebug Lite that if console was closed the logs were printed messy and duplicates</li>
</ul>

----------------------------------------------------------------------------

#Warning

<ul>
<li> Use the local Firebug Lite source equipped in download and not replace this because have been made small changes to allow the coexistence with Underscore Log</li>
</ul>

----------------------------------------------------------------------------

#Docs

####_log( v [,v, ...])
> Prints a simple message to the console
> <ul>
> <li><b>v</b>: a Object that is printed in console</li>
> </ul>

####_log.info( v [,v, ...])
> Prints a message to the console with the visual "info" icon
> <ul>
> <li><b>v</b>: a Object that is printed in console</li>
> </ul>

####_log.warn( v [,v, ...])
> Prints a message to the console with the visual "warning" icon and color coding
> <ul>
> <li><b>v</b>: a Object that is printed in console</li>
> </ul>

####_log.error( v [,v, ...])
> Prints a message to the console with the visual "error" icon and color coding
> <ul>
> <li><b>v</b>: a Object that is printed in console</li>
> </ul>

####_log.time( key )
> Creates a new timer, call <b>_log.timeEnd(key)</b> with the same key to stop the timer and print the time elapsed
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
> Prints the statistics of timer, at least once must be iterated <b>console.time(key)</b> and <b>_log.timeEnd(key)</b> relatives
> <ul>
> <li><b>key</b>: a String that identifies the timer</li>
> </ul>

####_log.assert( exp, v [,v, ...])
> Tests that an expression is true. If not, it will write a error message to the console
> <ul>
> <li><b>exp</b>: a Bool or any type that will be evaluated</li>
> <li><b>v</b>: a Object that is printed in console in error message if the <b>exp</b> is false</li>
> </ul>

####_log.assertWarn( exp, v [,v, ...])
> Tests that an expression is true. If not, it will write a warn message to the console
> <ul>
> <li><b>exp</b>: a Bool or any type that will be evaluated</li>
> <li><b>v</b>: a Object that is printed in console in warn message if the <b>exp</b> is false</li>
> </ul>

####_log.external( key [,args] [,scope] )
> Calls a external function in underscoreLogExt.js, allowing you to write complex code of logging
> <ul>
> <li><b>key</b>: a String that identifies the external function in underscoreLogExt.js</li>
> <li><b>args</b>: an optional Array that specifying the arguments with which external function should be called</li>
> <li><b>scope</b>: an optional Object indicating the <b>this</b> provided for the external function</li>
> </ul>

####_log.group( key )
> Prints a message to the console and opens a nested block to indent all future messages sent to the console. Call <b>console.groupEnd(key)</b> to close the block
> <ul>
> <li><b>key</b>: a String that identifies the block</li>
> </ul>

####_log.groupCollapsed( key )
> Like <b>console.group(key)</b>, but the block is initially collapsed.
> <ul>
> <li><b>key</b>: a String that identifies the block</li>
> </ul>

####_log.groupEnd( key )
> Closes the most recently opened block created by a call to <b>console.group(key)</b> or <b>console.groupCollapsed(key)</b>
> <ul>
> <li><b>key</b>: a String that identifies the block</li>
> </ul>

####_log.clear()
> Clears the console.

####_log.open()
> Opens the console.

####_log.close()
> Closes the console.

----------------------------------------------------------------------------

#Bugs Known

<ul>
<li>auto check itself feature not works in IE browsers</li> 
</ul>
