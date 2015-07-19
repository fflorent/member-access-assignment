var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

describe("with left-hand side identifier", function () {
  it("should invoke String.prototype.replace() and assign it to the left-hand side variable", function () {
    var foo = "foo";
    foo=.replace("foo", "bar");
    expect(foo).to.equal("bar");
  });

  it("should not expand in an IIFE", function () {
    function funcWithMacro() {
      foo=.replace("foo", "bar");
    }
    expect(funcWithMacro.toString()).to.contain("foo = foo.replace('foo', 'bar');");
  });
});

describe("with left-hand side expression", function () {
  it("should invoke String.prototype.replace() and assign it to the left-hand side variable", function () {
    var object = {foo: "foo"};
    object.foo=.replace("foo", "bar");
    expect(object.foo).to.equal("bar");
  });

  it("should invoke left-hand side functions just once", function () {
    // Given
    var methodResult = {foo: "foo"};
    var object = {
      method: function () {
        return methodResult;
      }
    };
    var spy = sinon.spy(object, "method");
    // When
    object.method().foo=.replace("foo", "bar");
    // Then
    expect(methodResult.foo).to.equal("bar");
    expect(object.method).to.have.been.calledOnce;
  });

  it("should work in condition clauses", function () {
    // Given
    var methodResult = {foo: "foo"};
    var passed = false;
    var object = {
      method: function () {
        return methodResult;
      }
    };
    // When
    if (object.method().foo=.replace('foo', 'bar') === 'bar') {
      passed = true;
    }
    // Then
    expect(passed).to.equal(true);
  });

  it("should work in while clauses", function () {
    // Given
    var methodResult = {foo: "foofoofoo"};
    var passed = false;
    var object = {
      method: function () {
        return methodResult;
      }
    };
    var i = 1;
    // When
    while ((object.method().foo=.replace('foo', 'bar')).match('foo')) {
      i++;
    }
    // Then
    expect(methodResult.foo).to.equal('barbarbar');
    expect(i).to.equal(3);
  });

  it("should place the comment right before the var statement", function () {
    function funcWithMacro() {
      // comment
      foo.bar().baz=.replace('foo', 'bar');
    }
    var src = funcWithMacro.toString();
    expect(src).to.match(/\/\/ comment\n\s*var lhsContext(\$\d+)? =/);
    expect(src.match(/\/\/ comment/g)).to.have.length(1);
  });

  // FIXME Issue #2
  it.skip("should place the comment right before the while statement", function () {
    function funcWithMacro() {
      // comment
      while (foo.bar().baz=.replace('foo', 'bar'));
    }
    var src = funcWithMacro.toString();
    expect(src).to.match(/\/\/ comment\n\s*while/);
    expect(src.match(/\/\/ comment/g)).to.have.length(1);
  });
});
