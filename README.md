# Praseodymium
### Use `.properties` files in Node.js


## Installation
```bash
npm i praseodymium
```

## API
### Initialize
Initialize by calling `new propertiesReader()`. ECMAScript `import` is also supported.
```js
const propertiesReader = require('praseodymium')
const Reader = new propertiesReader('/file/path', { separatedBy:"=" })
```

| Parameter | Description |
| ----------- | ----------- |
| File | The file path to read |
| advanced.separatedBy | Change what key/values are separated by (default: =) |

### Get values
Get one
```js
Reader.get('key')
```

| Parameter | Description |
| ----------- | ----------- |
| key |  The key to get the value of |

Get all
```js
Reader.getAll()
```
Get raw content as a string
```js
Reader.getRaw()
```
### Set value
```js
Reader.set('key','value')
```

| Parameter | Description |
| ----------- | ----------- |
| key |  The key to set the value of |
### Convert
Convert to JSON
```js
Reader.toJSON()
```
Convert to an Array
```js
Reader.toArray()
```
Convert a JSON object to the `.properties` file syntax
```js
Reader.toProperties({ key:"value" }, "output")
```
| Parameter | Description |
| ----------- | ----------- |
| source |  Object to convert |
| output |  Path to output file (optional) |


## Other info
Need help? Ask a question on [Github](https://github.com/element-script/praseodymium/discussions)

Report feedback & bugs [here](https://github.com/element-script/praseodymium/issues)

Like our work? [Support us on Patreon](https://www.patreon.com/coolstone)