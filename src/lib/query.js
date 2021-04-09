function quotedValues(values) {
  if (values.length === 0) return [];
  const options = values.slice(-1)[0];
  if (typeof options !== "string" && options.quote)
    return values.slice(0, -1).map((v) => `"${v}"`);
  return values;
}

class GithubQuery {
  /**
   * @param {Map<string, any[]>=} attrs
   * @param {string[]=} terms
   */
  constructor(attrs, terms) {
    /** @type {Map<string, any[]>} */
    this._attrs = attrs || new Map();
    /** @type {string[]} */
    this._terms = terms || [];
    const unproxied = this;

    return new Proxy(this, {
      get(target, prop, receiver) {
        const original = Reflect.get(unproxied, prop, unproxied);
        if (original) return original;
        if (!(typeof prop === "string")) return;

        const self = target;
        return function (...args) {
          const values = (self._attrs.get(prop) || []).concat(
            quotedValues(args)
          );
          const attrs = new Map(self._attrs);
          attrs.set(prop, values);
          return new GithubQuery(attrs, [...self._terms]);
        };
      },
      has(target, prop) {
        if (typeof prop === "string") return true;
        return Reflect.has(unproxied, prop);
      },
    });
  }

  term(...terms) {
    return new GithubQuery(
      this._attrs,
      this._terms.concat(quotedValues(terms))
    );
  }

  /**
   * @returns {string}
   */
  toQuery() {
    let strings = [];

    this._attrs.forEach((values, key) => {
      strings = strings.concat(
        values.map((v) => [key, String(v).trim()].join(":"))
      );
    });

    strings = strings.concat([...this._terms]);
    return strings.join(" ");
  }
}

export default GithubQuery;
