const {
    readFileSync,
    writeFileSync
} = require("fs")

module.exports = class {

    file = ''
    advanced = {
        separatedBy: "="
    }

    /** Make a new Reader
     * @param {string} file The file to read from
     */
    constructor(file, advanced = this.advanced) {
        this.file = file
        this.advanced = advanced
    }

    /** Get a value from a file
     * @param {string} key The key to get the value of
     */
    get(key) {
        const arr = readFileSync(this.file, 'utf8').split('\n')
        let value = ""
        arr.forEach(line => {
            if (line.startsWith(key)) return value = line.replace(`${key}${this.advanced.separatedBy}`, '')
        })
        return {
            value,
            key
        }
    }

    /** Get all values */
    getAll() {
        const arr = readFileSync(this.file, 'utf8').split('\n')
        const values = []
        const keys = []
        arr.forEach(line => {
            if (!line.includes(this.advanced.separatedBy)) return
            const split = line.split(this.advanced.separatedBy)
            values.push(split[1])
            keys.push(split[0])
        })
        return {
            values,
            keys
        }
    }

    /** Set a value
     * @param {string} key The key to set the value of
     * @param {string} value The value to set to
     */
    set(key, value) {
        const arr = readFileSync(this.file, 'utf8').split('\n')
        let index = 0
        arr.forEach(line => {
            if (line.startsWith(key)) return arr[index] = `${key}${this.advanced.separatedBy}${value}`
            index++
        })
        writeFileSync(this.file, arr.join("\n"), 'utf8')
        return this.get(key)
    }

    /** Convert properties to JSON */
    toJSON() {
        const obj = {}
        const f = readFileSync(this.file, 'utf8').split("\n")
        f.forEach(line => {
            if (!line.includes(this.advanced.separatedBy)) return
            const split = line.split(this.advanced.separatedBy)
            obj[split[0]] = split[1]
        })
        return obj
    }

    /** Convert properties to an array */
    toArray() {
        const obj = []
        const f = readFileSync(this.file, 'utf8').split("\n")
        f.forEach(line => {
            if (!line.includes(this.advanced.separatedBy)) return
            obj.push(line.split(this.advanced.separatedBy))
        })
        return obj
    }

    /** Convert JSON to `.properties` file syntax
     * @param {object} source Object to convert
     * @param {string?} output Path to output file (optional)
     */
    toProperties(source, output) {
        let str = ""
        if (typeof source != 'object') throw new TypeError("Invalid type. JSON only.")
        let index = 0
        for (const el in source) {
            if (index != 0) str += '\n'
            str += `${el}${this.advanced.separatedBy}${source[el]}`
            index++
        }
        if (output) writeFileSync(output, str, 'utf8')
        return str
    }

    /** Get raw file content (as a string) */
    getRaw() {
        return readFileSync(this.file, 'utf8')
    }
}