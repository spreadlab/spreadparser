<h1 align="center">
  <br>
  <a href="https://github.com/spreadlab/spreadparser">
    <img src="https://github.com/spreadlab/spreadparser/blob/main/logo.png?raw=true" alt="Spreadparser Logo" width="180"></a>
  <br>
  Spreadparser
  <br>
</h1>

<p align="center">Google Spreadsheet data for human beings... and developers!</p>

## Resources

<img src="https://github.com/spreadlab/spreadparser/blob/main/diagram.png?raw=true" alt="Diagram">

Spreadparser turns a JSON endpoint from Google Spreadsheets into a easier to understand list of objects.
So, using Spreadparser could be useful for some goals such as:

* ✅ Small web projects
* ✅ Static generated websites
* ✅ Projects consuming government generated data 
* ✅ Project prototyping
* ✅ Generate and share pages for visualizing third party data 
* ✅ Studying project for frontend and backend developers
* ✅ Small companies online stores
* ✅ Allow non tech teams to provide data for tech teams
* ✅ Use Spreadsheet to create and maintain app config files

But it's probably not appropriate for:

* 🛑 Automate spreadsheet update
* 🛑 Complex project based on relational database relations 
* 🛑 Project with a huge amount of data

## Features

<img src="https://github.com/spreadlab/spreadparser/blob/main/features-screenshort.jpeg?raw=true" alt="Features samples">


* **Lightweigth**: less than 2kb and zero dependencies 📦
* **Versatile**: Can be used for ES6/web projects, node project and as script tag
* **Tested**: Highly covered with unit testing, written with typescript 💯
* **Understands your data as it is**:
    * "TRUE", "FALSE" and checkboxes become boolean values `true` and `false`
    * Integers and floats become real numbers like `10` e `0.33`
    * Repeated title columns are parsed as arrays 
    * Allow spreadsheet data to be parsed as nested objects with inner properties and value 
    * Translate your data to your desired pattern like camel case or snake case

## Usage

Once you successfully installed Spreadparser to your project, the usage is simple as that:

```javaScript
fetch(Spreadparser.getSpreadsheetUrl("1Rr2y3ljAJPApYXcPyLXwxLciUCxz8XCu1Q0OnWH1l-U", 2))
    .then(response => response.json())
    .then(json => Spreadparser.parse(json, {titleCase: 'camelCase'}))
    .then(spreadsheet => {
        console.log(spreadsheet.data[0]);
    });
```

Giving us the following output:

```JSON
{
   "nome":"Água",
   "hex":"#00FFFF",
   "rgb":{
     "red":0,
     "green":255,
     "blue":255
   },
   "hsv": {
     "hue":"180°",
     "saturation":"100%",
     "value":"100%"
   },
   "nomeWeb":"aqua"
 }
``` 

## Installation (for web projects)

Install it as a dependency: 

```
yarn add spreadparser
```
or

```
npm install spreadparser
```

Now you must import Spreadparser as following:

```
import Spreadparser from "spreadparser";
```


## Installation (for node projects)

It is possible to use Spreadparser for server side projects using node. For instance you can create a 11ty blog or a command line tool with Spreadparser:

Install it as a dependency: 
```
yarn add spreadparser
```
or

```
npm install spreadparser
```

Now you must import Spreadparser as following:

```
const Spreadparser = require("spreadparser/dist/umd/spreadparser.js");
```

## Using it as a third party library

Spreadparser is available at unpkg.com, for using it all you have to do is add unpkg.com url as script src to your HTML page:

```
<script src="https://unpkg.com/spreadparser">
```

In the next topic we provide live examples of spreadpaser as thirdy party library combined with other frontend tools.

## Live examples

Here are some live examples for spreadparser:

* [A list of brazilian named colors](https://codepen.io/teles/pen/MWJmjwj) - VueJS + Bulma + Spreadpaser


## Documentation: getSpreadsheetUrl method
## Documentation: parse method

## How can you contribute?

* Give a :star: to this project if you like it
* Use it as npm dependency for some of your projects
* Help this project opening an issue, you may suggest a feature, documentation or share a bug
* Improve this project by creating a pull request 
* Create a new live example using spreadparser
* Spread the idea!

