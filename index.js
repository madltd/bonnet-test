function add(a, b) {
    return a + b;
}

function addWithComments (
    /* 
        multiline comment
        multiline comment
        multiline comment
        multiline comment
    */ one /* comment */ =
    
    12,
    two = 13 /*
        multiline comment
        multiline comment
        multiline comment
    */

)
{
    return one + two;
}

function defaultArguments(callback = () => {}, defaultArgs = {}) {
    const functionString = callback.toString();

    const result = functionString.slice(
        functionString.indexOf('(') + 1,
        functionString.indexOf(')')
    ).split(',').map(arg => arg.replace(/(\/\*[\s\S]*?\*\/)|(=[\s\S]*)/gm, '').trim());

    return (...args) => {
        const newArgs = result.map((name, i) => args[i] ?? defaultArgs[name]);

        return callback(...newArgs);
    };
}

const add2 = defaultArguments(add, { b: 9 });
console.assert(add2(10) === 19);
console.assert(add2(10, 7) === 17);
console.assert(isNaN(add2()));

const add3 = defaultArguments(add, { b: 3, a: 2 });
console.assert(add3(10) === 13);
console.assert(add3() === 5);
console.assert(add3(undefined, 10) === 12);

const add4 = defaultArguments(add, { c: 3 });
console.assert(isNaN(add4(10)));
console.assert(add4(10, 10) === 20);

const add5 = defaultArguments(addWithComments, { one: 30 });
console.assert(add5(undefined) === 43);
console.assert(add5(10, 7) === 17);
console.assert(add5(40) === 53);