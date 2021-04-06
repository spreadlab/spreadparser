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

Spreadparser turns a JSON endpoint from Google Spreadsheets into a easier to understand list of objects.

**[View the Demo on CodePen &rarr;](https://codepen.io/teles/pen/OJWjWeE)**

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

<img src="https://github.com/spreadlab/spreadparser/blob/main/features-screenshort.png?raw=true" alt="Features samples">


* **Lightweigth**: less than 2kb and zero dependencies 📦
* **Versatile**: Can be used for ES6/web projects, node project and as script tag
* **Tested**: Highly covered with unit testing, written with typescript 💯
* **Understands your data as it is**:
    * "TRUE", "FALSE" and checkboxes become boolean values `true` and `false`
    * Integers and floats become real numbers like `10` e `0.33`
    * Repeated title columns are parsed as arrays 
    * Allow spreadsheet data to be parsed as nested objects with inner properties and value 
    * Translate your data to your desired pattern like camel case or snake case

## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include Spreadparser on your site.

**Direct Download**

You can [download the files directly from GitHub](https://github.com/spreadlab/spreadparser/archive/main.zip).

```html
<script src="path/to/spreadparser.min.js"></script>
```

**CDN**

You can also use the [jsDelivr CDN](https://cdn.jsdelivr.net/npm/spreadparser/dist/). I recommend linking to a specific version number or version range to prevent major updates from breaking your site. Spreadparser uses semantic versioning.

```html
<!-- Always get the latest version -->
<!-- Not recommended for production sites! -->
<script src="https://cdn.jsdelivr.net/npm/spreadparser/dist/spreadparser.min.js"></script>

<!-- Get minor updates and patch fixes within a major version -->
<script src="https://cdn.jsdelivr.net/npm/spreadparser@1/dist/spreadparser.min.js"></script>

<!-- Get patch fixes within a minor version -->
<script src="https://cdn.jsdelivr.net/npm/spreadparser@1.0/dist/spreadparser.min.js"></script>

<!-- Get a specific version -->
<script src="https://cdn.jsdelivr.net/npm/spreadparser@1.0.0/dist/spreadparser.min.js"></script>
```

**NPM**

You can also use yarn (or your favorite package manager).

```bash
yarn add spreadparser
```

### 2. Add the markup to your HTML.

No extra configuration needed&mdash;just standard JavaScript. 

```javaScript
fetch(Spreadparser.getSpreadsheetUrl("1Rr2y3ljAJPApYXcPyLXwxLciUCxz8XCu1Q0OnWH1l-U", 2))
    .then(response => response.json())
    .then(json => Spreadparser.parse(json, {titleCase: 'camelCase'}))
    .then(spreadsheet => {
        console.log(spreadsheet.data[0]); // You can see this console.log output bellow
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
yarn add spreadparser # or npm install spreadparser
```

Now you can import Spreadparser as following:

```
import Spreadparser from "spreadparser";
```

## Installation (for node projects)

It is possible to use Spreadparser for server side projects using node. For instance you can create a 11ty blog or a command line tool with Spreadparser:

Install it as a dependency: 
```
yarn add spreadparser # or npm install spreadparser
```

Now you can import Spreadparser as following:

```
const Spreadparser = require("spreadparser/dist/umd/spreadparser.js");
```

## Using it as a third party library

Spreadparser is available at jsDelivr CDN, for using it all you have to do is add proper url as script src to your HTML page:

```
<script src="https://unpkg.com/spreadparser">
```

Spreadparser is also available on [unpkg.com](https://unpkg.com/spreadparser) 

In the next topic we provide live examples of Spreadpaser as thirdy party library combined with other frontend tools.

## Live examples

Here are some live examples for Spreadparser:

* [A list of brazilian named colors](https://codepen.io/teles/pen/MWJmjwj) - VueJS + Bulma + Spreadpaser


## Documentation: getSpreadsheetUrl method

`Spreadparser.getSpreadsheetUrl` is a static method that receives two parameters: `spreadsheetId` and `sheetNumber`.

| Parameter | Type | Default | Required |
|-|-|-|-|
|spreadsheetId|string||true|
|sheetNumber|number|1|false|

Sample usage:

```JavaScript
Spreadparser.getSpreadsheetUrl("1Rr2y3ljAJPApYXcPyLXwxLciUCxz8XCu1Q0OnWH1l-U")
// https://spreadsheets.google.com/feeds/cells/1Rr2y3ljAJPApYXcPyLXwxLciUCxz8XCu1Q0OnWH1l-U/1/public/full?alt=json

Spreadparser.getSpreadsheetUrl("1Rr2y3ljAJPApYXcPyLXwxLciUCxz8XCu1Q0OnWH1l-U", 2)
// https://spreadsheets.google.com/feeds/cells/1Rr2y3ljAJPApYXcPyLXwxLciUCxz8XCu1Q0OnWH1l-U/2/public/full?alt=json
``` 

This method does exists because Spreadparser intentionally doesn't have a method to fetch data. 
So you can get your Spreadsheet JSON url and fetch data in your own way.  

## Documentation: parse method

`Spreadparser.parse` is a static method that receives two parameters: `originalData` and `options`.

| Parameter | Type | Required |
|-|-|-|
|originalData|object|true|
|options|object|false|

Right bellow theres documentation for `Spreadparser.parse` options.

### Parse Options

> Soon

## How can you contribute?

* Give a :star: to this project if you like it
* Use it as npm dependency for some of your projects
* Help this project opening an issue, you may suggest a feature, documentation or share a bug
* Improve this project by creating a pull request 
* Create a new live example using Spreadparser
* Spread the idea!

