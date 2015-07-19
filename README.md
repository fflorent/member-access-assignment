# Member Access Assignment (=.) operator
Sweet.js macro that introduces the Member Access Assignment (=.) operator.

Basically, that would expand these two expressions:
````javascript
// 1.
foo=.replace("foo", "bar");
// 2.
document.getElementById('foo').textContent=.replace("foo", "bar");
````

To this:

````javascript
// 1.
foo = foo.replace("foo", "bar");
// 2.
(function () {
    var lhsContext = document.getElementById('foo');
    return lhsContext.textContent = lhsContext.textContent.replace('foo', 'bar');
}());
````

## Usage
````bash
$ npm install --save member-access-assignment
````
Write your code and then:
````bash
$ sjs -m member-access-assignment myFile.js
````

If you pass `-c` to sjs along with `-o output.js`, it will generate a sourcemap so you get good debugging too!

## Contributing
To run the tests:
````
$ npm install
$ grunt test
````

## License (MIT)

Copyright (c) 2015 Florent Fayolle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
