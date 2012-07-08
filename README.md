Underscore Log
==============
<b>Advanced cross browser javascript logging using Underscore Log and Firebug Lite</b>

----------------------------------------------------------------------------

#Goal

In javascript is pretty hard to obtain a cross browser logging architecture in your applications.

The mainly reason of this is due to the console object that is only supported by the new generation browsers and different implementations of it.

<b>The Underscore Log projects solves this problem by standardizing the way you write code and the way the logs are displayed in your browser.</b>

In addition this tool provides a simple test framework which allows you to test and log asserts.

<img src="https://raw.github.com/eeColella/Underscore-Log/master/Styles/UnderscoreLogPreview.png" />

----------------------------------------------------------------------------

#Demo

http://eecolella.com/UnderscoreLog/Demo

----------------------------------------------------------------------------

#Cleaner

http://eecolella.com/UnderscoreLog/Cleaner

----------------------------------------------------------------------------

#Features

#### 1.0.0 v
<ul>
<li>Logs and displays selected information into firebug console.</li>
<li>Logs with different 3 log levels: info, warning and error.</li>
<li>Allows to group log information by defining custom group names.</li>
<li>Include timer that provides profiles statistics about execution time.</li>
<li>Provides asserts for checking expected values into your code.</li>
<li>Auto updates if a new version is available on github.</li>
</ul>

----------------------------------------------------------------------------

#How to log with Underscore Log

<ul>
<li>In your HTML file add required references to Underscore Log</li>
</ul>
<img src="https://raw.github.com/eeColella/Underscore-Log/master/Styles/UnderscoreLogReference.png" />
<ul>
<li>Write your javascript code an log what you need by calling Underscore Log's methods.</li>
<li>Use Firebug to view your log massages.</li>
</ul>

#How to publish your code in production
<ul>
<li>Before releasing your code, remove Underscore Log by replacing "_log" with "//_log".</li>
<li>Compress your source code using any compressor which deletes comments (e.g http://closure-compiler.appspot.com/home).</li>
</ul>

#### or

<ul>
<li>Replace your code manually using <a href="http://eecolella.com/UnderscoreLog/Cleaner">Underscore Log Cleaner</a>.</li>
</ul>

#### or

<ul>
<li>Using an editor that supports regular expressions remove Underscore Log using this pattern: [\s\t]*_log.*</li>
</ul>

----------------------------------------------------------------------------

#Docs

####_log( v [,v, ...])
> Prints a simple message to the console.
> <ul>
> <li><b>v</b>: a Object that is printed in console.</li>
> </ul>

####_log.info( v [,v, ...])
> Prints a message to the console with the visual "info" icon.
> <ul>
> <li><b>v</b>: a Object that is printed in console.</li>
> </ul>

####_log.warn( v [,v, ...])
> Prints a message to the console with the visual "warning" icon and color coding.
> <ul>
> <li><b>v</b>: a Object that is printed in console.</li>
> </ul>

####_log.error( v [,v, ...])
> Prints a message to the console with the visual "error" icon and color coding.
> <ul>
> <li><b>v</b>: a Object that is printed in console.</li>
> </ul>

####_log.time( key )
> Creates a new timer, call <b>_log.timeEnd(key)</b> with the same key to stop the timer and print the time elapsed.
> <ul>
> <li><b>key</b>: a String that identifies the timer.</li>
> </ul>

####_log.timeEnd( key [,show] )
> Stops a timer created by a call to <b>console.time(key)</b> and (by default) prints the time elapsed.
> <ul>
> <li><b>key</b>: a String that identifies the timer.</li>
> <li><b>show</b>: a optional Bool that specifies if the result of timer is to be printed in console, by <b>default</b> this is true.</li>
> </ul>

####_log.timeStat( key )
> Prints the statistics of timer, at least once must be iterated <b>console.time(key)</b> and <b>_log.timeEnd(key)</b> relatives.
> <ul>
> <li><b>key</b>: a String that identifies the timer.</li>
> </ul>

####_log.assert( exp, v [,v, ...])
> Tests that an expression is true. If not, it will write a error message to the console.
> <ul>
> <li><b>exp</b>: a Bool or any type that will be evaluated.</li>
> <li><b>v</b>: a Object that is printed in console in error message if the <b>exp</b> is false.</li>
> </ul>

####_log.assertWarn( exp, v [,v, ...])
> Tests that an expression is true. If not, it will write a warn message to the console.
> <ul>
> <li><b>exp</b>: a Bool or any type that will be evaluated.</li>
> <li><b>v</b>: a Object that is printed in console in warn message if the <b>exp</b> is false.</li>
> </ul>

####_log.external( key [,args] [,scope] )
> Calls a external function in underscoreLogExt.js, allowing you to write complex log.
> <ul>
> <li><b>key</b>: a String that identifies the external function in underscoreLogExt.js</li>
> <li><b>args</b>: an optional Array that specifying the arguments with which external function should be called.</li>
> <li><b>scope</b>: an optional Object indicating the <b>this</b> provided for the external function.</li>
> </ul>

####_log.group( key )
> Prints a message to the console and opens a nested block to indent all future messages sent to the console. Call <b>console.groupEnd(key)</b> to close the block.
> <ul>
> <li><b>key</b>: a String that identifies the block.</li>
> </ul>

####_log.groupCollapsed( key )
> Like <b>console.group(key)</b>, but the block is initially collapsed.
> <ul>
> <li><b>key</b>: a String that identifies the block.</li>
> </ul>

####_log.groupEnd( key )
> Closes the most recently opened block created by a call to <b>console.group(key)</b> or <b>console.groupCollapsed(key).</b>
> <ul>
> <li><b>key</b>: a String that identifies the block.</li>
> </ul>

####_log.clear()
> Clears the console.

####_log.open()
> Opens the console.

####_log.close()
> Closes the console.

----------------------------------------------------------------------------

#Warning

<ul>
<li>If you are already referencing Firebug Lite into your application, please make sure that you are using the version provided in this project's download because of some customizations that have been applied to integrate Underscore Log.</li>
</ul>

----------------------------------------------------------------------------

#Known Bugs

<ul>
<li>auto update checker feature does not work in IE browser.</li> 
</ul>

<img src="https://raw.github.com/eeColella/Underscore-Log/master/Styles/CreativeCommons.gif" />