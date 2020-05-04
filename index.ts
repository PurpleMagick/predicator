import {Predicate, PredicateBuilder} from './src/predicator'



//unit tests

const aPredicate: Predicate<number> = x => x > 41;
const bPredicate: Predicate<number> = x => x < 43;

const aBuilder = new PredicateBuilder<number>(aPredicate);
const bBuilder = new PredicateBuilder<number>(bPredicate);

const input = 42;

//AND/OR supplying a builder

assert("A and B (builder)", true,
	aBuilder
		.and(bBuilder)
		.apply(input)
);

assert("B and A (builder)", true,
	bBuilder
		.and(aBuilder)
		.apply(input)
);

assert("A or B (builder)", true,
	aBuilder
		.or(bBuilder)
		.apply(input)
);

assert("B or A (builder)", true,
	bBuilder
		.or(aBuilder)
		.apply(input)
);

//AND/OR supplying a predicate

assert("A and B (predicate)", true,
	aBuilder
		.and(bPredicate)
		.apply(input)
);

assert("B and A (predicate)", true,
	bBuilder
		.and(aPredicate)
		.apply(input)
);

assert("A or B (predicate)", true,
	aBuilder
		.or(bPredicate)
		.apply(input)
);

assert("B or A (predicate)", true,
	bBuilder
		.or(aPredicate)
		.apply(input)
);

//NOT

assert("not A", false,
	aBuilder
		.not()
		.apply(input)
);

assert("not B", false,
	bBuilder
		.not()
		.apply(input)
);


function assert(label: string, expected: any, actual: any) {
	const msg = `${expected === actual ? "PASS" : "FAIL"} : "${label}"
	expected: ${expected}
	actual  : ${actual}`;

	console.log(msg);
}