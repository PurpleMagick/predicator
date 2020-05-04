interface Predicate<T> {
	(x: T) : boolean
}

class PredicateBuilder<T> {
	condition: Predicate<T>;

	constructor(condition: Predicate<T>) {
		this.condition = condition;
	}

	public and(input: PredicateBuilder<T> | Predicate<T>): PredicateBuilder<T> {
		const p: Predicate<T> = this.condition;
		const q: Predicate<T> = this.extractCondition(input);

		return new PredicateBuilder((x: T) => p(x) && q(x));
	}

	public or(input: PredicateBuilder<T> | Predicate<T>): PredicateBuilder<T> {
		const p: Predicate<T> = this.condition;
		const q: Predicate<T> = this.extractCondition(input);

		return new PredicateBuilder((x: T) => p(x) || q(x));
	}

	public not(): PredicateBuilder<T> {
		return new PredicateBuilder((x: T) => !this.condition(x));
	}

	public apply(x: T): boolean {
		return this.condition(x);
	}

	private extractCondition(input: PredicateBuilder<T> | Predicate<T>): Predicate<T> {
		let condition: Predicate<T>;
		if ("condition" in input) {
		  condition = input.condition;
		} else {
		  condition = input;
		}

		return condition;
	}
}

export { PredicateBuilder, Predicate };