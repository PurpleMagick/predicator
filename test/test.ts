
import { expect } from 'chai';
import { Predicate, PredicateBuilder } from '../src/predicator';

describe("works???", function() {
	let aPredicate: Predicate<number> = x => x > 41;
	let bPredicate: Predicate<number> = x => x < 43;

	let aBuilder: PredicateBuilder<number>;
	let bBuilder: PredicateBuilder<number>;

	let input = 42;

	beforeEach(function(){
		aBuilder = new PredicateBuilder<number>(aPredicate);
		bBuilder = new PredicateBuilder<number>(bPredicate);
	});

	describe('using builders', function () {
		it("A and B", function() {
			const pred = aBuilder
					.and(bBuilder);

			const result = pred.apply(input);

			expect(result).to.be.true;
		});

		it("B and A", function() {
			const pred = bBuilder
					.and(aBuilder);

			const result = pred.apply(input);

			expect(result).to.be.true;
		});

		it("A or B", function() {
			const pred = aBuilder
					.or (bBuilder);

			const result = pred.apply(input);

			expect(result).to.be.true;
		});

		it("B or A", function() {
			const pred = bBuilder
					.or (aBuilder);

			const result = pred.apply(input);

			expect(result).to.be.true;
		});
	});

	describe('using predicates', function () {
		it("A and B", function() {
			const pred = aBuilder
					.and(bPredicate);

			const result = pred.apply(input);

			expect(result).to.be.true;
		});

		it("B and A", function() {
			const pred = bBuilder
					.and(aPredicate);

			const result = pred.apply(input);

			expect(result).to.be.true;
		});

		it("A or B", function() {
			const pred = aBuilder
					.or (bPredicate);

			const result = pred.apply(input);

			expect(result).to.be.true;
		});

		it("B or A", function() {
			const pred = bBuilder
					.or (aPredicate);

			const result = pred.apply(input);

			expect(result).to.be.true;
		});
	});

	describe('NOT', function () {
		it("not A", function() {
			const pred = aBuilder.not()

			const result = pred.apply(input);

			expect(result).to.be.false;
		});

		it("not B", function() {
			const pred = bBuilder.not()

			const result = pred.apply(input);

			expect(result).to.be.false;
		});
	});
});
