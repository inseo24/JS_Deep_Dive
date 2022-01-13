## Symbol 이란?
Symbol은 ES6에 새로 도입된 primitive 값 입니다. Symbol의 유일한 값을 가질 수 있게 해주며 property를 숨길 수 있는 기능을 제공해줍니다. 

그럼 이 기능들을 어떻게 제공해줄까요?

### Symbol의 유일무이한 값
Symbol값은 아래와 같이 생성할 수 있습니다.

```js
const mySymbol = Symbol();
console.log(typeof mySymbol); // symbol

// Symbol 값은 외부로 노출되지 않아 확인할 수 없습니다.
console.log(mySymbol); // Symbol();
```
Symbol 값은 변경 불가능한 primitive 값으로 생성자 함수 처럼 사용하지 않는 것을 볼 수 있습니다.

```js
new Symbol(); // TypeError: Symbol is not a constructor
```

Symbol 함수에는 문자열을 파라미터로 전달할 수 있으며, 이 문자열은 생성된 Symbol 값에 대한 설명으로 디버깅 용도로만 사용이 됩니다.

```js
const mySymbol1 = Symbol('mySymbol');
const mySymbol2 = Symbol('mySymbol');

console.log(mySymbol1 === mySymbol2); // false
```

위 예제에서 Symbol값을 만들 때 전달된 매개변수는 아래처럼 출력할 수 있습니다.

```js
console.log(mySymbol1.description); // mySymbol
console.log(mySymbol1.toString()); // Symbol(mySymbol);
```

Symbol은 유일한 값을 만드는데 사용되는 원시값입니다. 또다른 특징인 프로퍼티 은닉은 어떻게 할까요?

### Symbol과 프토퍼티 은닉
Symbol 값을 프로퍼티로 사용하면 for...in 문이나 Object.keys, Object.getOwnPropertyNames 메서드로 찾을 수 없습니다.

```js
const obj = {
  [Symbol('mySymbol')] : 1
}

for (const key in obj) {
  console.log(key);
}

console.log(Object.keys(obj));
console.log(Object.getOwnPropertyNames(obj));
```

하지만 프로퍼티를 완벽하게 은닉할 수 없으며 프록시 또는 getOwnPropertySymbols() 메서드를 통해서 참조할 수 습니다.

```js
const obj = {
  [Symbol('mySymbol')] : 1
}

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(mySymbol)]

const symbolKey1 = Object.getOwnPropertySymbols(obj)[0];
console.log(obj[symbolKey1]);
```