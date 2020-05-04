"use strict";
exports.__esModule = true;
var PredicateBuilder = /** @class */ (function () {
    function PredicateBuilder(condition) {
        this.condition = condition;
    }
    PredicateBuilder.prototype.and = function (input) {
        var p = this.condition;
        var q = this.extractCondition(input);
        return new PredicateBuilder(function (x) { return p(x) && q(x); });
    };
    PredicateBuilder.prototype.or = function (input) {
        var p = this.condition;
        var q = this.extractCondition(input);
        return new PredicateBuilder(function (x) { return p(x) || q(x); });
    };
    PredicateBuilder.prototype.not = function () {
        var _this = this;
        return new PredicateBuilder(function (x) { return !_this.condition(x); });
    };
    PredicateBuilder.prototype.apply = function (x) {
        return this.condition(x);
    };
    PredicateBuilder.prototype.extractCondition = function (input) {
        var condition;
        if ("condition" in input) {
            condition = input.condition;
        }
        else {
            condition = input;
        }
        return condition;
    };
    return PredicateBuilder;
}());
exports.PredicateBuilder = PredicateBuilder;
//unit tests
var aPredicate = function (x) { return x > 41; };
var bPredicate = function (x) { return x < 43; };
var aBuilder = new PredicateBuilder(aPredicate);
var bBuilder = new PredicateBuilder(bPredicate);
var input = 42;
//AND/OR supplying a builder
assert("A and B (builder)", true, aBuilder
    .and(bBuilder)
    .apply(input));
assert("B and A (builder)", true, bBuilder
    .and(aBuilder)
    .apply(input));
assert("A or B (builder)", true, aBuilder
    .or(bBuilder)
    .apply(input));
assert("B or A (builder)", true, bBuilder
    .or(aBuilder)
    .apply(input));
//AND/OR supplying a predicate
assert("A and B (predicate)", true, aBuilder
    .and(bPredicate)
    .apply(input));
assert("B and A (predicate)", true, bBuilder
    .and(aPredicate)
    .apply(input));
assert("A or B (predicate)", true, aBuilder
    .or(bPredicate)
    .apply(input));
assert("B or A (predicate)", true, bBuilder
    .or(aPredicate)
    .apply(input));
//NOT
assert("not A", false, aBuilder
    .not()
    .apply(input));
assert("not B", false, bBuilder
    .not()
    .apply(input));
function assert(label, expected, actual) {
    var msg = (expected === actual ? "PASS" : "FAIL") + " : \"" + label + "\"\n\texpected: " + expected + "\n\tactual  : " + actual;
    console.log(msg);
}
