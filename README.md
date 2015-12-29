# POP Artists Search

## Quick Start

Quick view the page at http://localhost:8080 by running SimpleHTTPServer.

Enter the build folder:

```
$ cd popartists/build
```

Start SimpleHTTPServer

```
$ python -m SimpleHTTPServer 8080
```


## Usage

**search by gender**: inputs _F_ or _M_ then press enter.

**search by age**: inputs _min,max_ then press enter, e.g. _18,28_

**search by rate**: inputs _min,max_ then press enter, e.g. _20,24.99_

**order by age or rate**: click the small sorting icon next to the column header.

**show all artists**: refresh the page.


## Implemented features

Main features which mentioned in requirement has been generally implemented. 

* search artists by age range
* search artists by rate range
* search artists by gender
* search by any combination of age, rate and gender.
* order by age and rate.

## Build Tasks

The project uses Gulp to run build tasks. If you have node environment, you can try all the tasks.

Install Gulp:

```
$ npm install gulp -g
```

Install dev dependencies:

```
$ cd popartists && npm install
```

Please check the _gulpfile.js_ to see all the tasks.

## Project structure

**src**: The folder contains all source code that includes html, js and scss files.

**resource**: The folder contains json data file.

**test**: The folder contains tests.

**build**: The folder contains build outputs.

**gulpfile.js**: the gulp build tasks scripting.

**package.json** contains all dev dependencies.

## Known issues

* No pagination control
* No checking edge case
* No code coverage testing