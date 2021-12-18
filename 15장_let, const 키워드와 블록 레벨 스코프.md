# 15장. let, const 키워드와 블록 레벨 스코프

## var, let, const

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTyR_6Q4vV_VQPQxaTAElD30x5hxLgbwgMDA&usqp=CAU)

<br>

## 함수 레벨 스코프와 블록 레벨 스코프

`var` 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다. 때문에 다음과 같은 문제가 발생 할 수 있다.

```js
var x = 1;

if (true) {
  var x = 10;
  // 지역 스코프로 인정되지 않은 코드 블록 내에서 변수를 재선언 하는 경우 의도치 않게 변수의 값이 변경될 수 있다.
}

console.log(x); // 10
```

한편, `let`과 `const`로 선언한 변수는 모든 코드 블록(함수, `if`문, `for`문, `while`문, `try`/`catch`문 등)을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.

```js
let foo = 1;

{
  let foo = 2;
  let bar = 3;
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

---

<br>

## 호이스팅

`var`키워드로 선언한 변수와 달리 `let`과 `const`로 선언한 변수는 호이스팅이 발생하지 않은 것처럼 동작한다.

```js
console.log(foo); // ReferenceError: foo is not defined
let foo;
```

4.3절 "변수 선언" 에서 살펴본 바와 같이 `var`키워드로 선언한 변수는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 "선언 단계"와 "초기화 단계"가 한번에 진행된다.

```js
console.log(foo); // undefined

var foo;
console.log(foo); // undefined

foo = 1;
console.log(foo); // 1
```

**한편, `let`과 `const`로 선언한 변수는 "선언 단계"와 "초기화 단계"가 분리되어 진행된다.**  
즉, 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다. 이 때, 스코프의 시작 지점부터 초기화 단계 시작 지점 까지 변수를 참조할 수 없는 구간을 **일시적 사각지대(Temporal Dead Zone)** 라고 부른다.

```js
console.log(foo); // ReferenceError: foo is not defined

// TDZ

let foo;
console.log(foo); // undefined

foo = 1;
console.log(foo); // 1
```

![](https://media.vlpt.us/images/colki/post/e28857fd-f79f-4e00-bf27-db061495fede/%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85%EB%8B%A8%EA%B3%84.jpg)

<br>

결국, `let` 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 보인다. 하지만 그렇지 않다.

```js
let foo = 1;

{
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  let foo = 2;
}
```

`let`키워드로 선언한 변수의 경우 호이스팅이 발생하지 않는다면 전역 변수 `foo`의 값을 출력해야 한다. 하지만 `let`키워드로 선언한 변수도 여전히 호이스팅이 발생하기 때문에 참조 에러가 발생한다.

자바스크립트는 ES6에서 도입된 `let`, `const`를 포함해서 모든 선언(`var`, `let`, `const`, `function`, `function*`, `class` 등)을 호이스팅 하지만, `let`, `const`, `class`를 사용한 선언문은 호이스팅이 발생하지 않는 것처럼 동작한다.

---

<br>

## 전역 객체와 var, let, const

`var`키워드로 선언한 전역 변수와 전역 함수, 그리고 선언하지 않은 변수에 값을 할당한 암묵적 전역(21장 참고)은 적역 객체 `window`의 프로퍼티가 된다.

```js
// 이 예제는 브라우저 환경에서 실행해야 한다.

var x = 1; // 전역 변수
y = 2; // 암묵적 전역
function foo() {} // 전역 함수

console.log(window.x); // 1
console.log(window.y); // 2
console.log(window.foo); // f foo() {}

window.z = 3; // 전역 객체 window에 바로 할당
console.log(z); // 3
```

한편, `let`키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 즉 `window.foo`처럼 접근할 수 없다. `let` 전역 변수는 보이지 않는 개념적인 블록 내에 존재한다. (23장 "실행컨텍스트" 에서 자세히 다룸)

---

<br>

## 상수

`const`키워드로 선언한 변수에 원시 값을 할당한 경우 변수 값을 변경할 수 없다. 이를 이용해 `const`를 상수를 표현하는데 사용하기도 한다.

> 상수는 상태 유지와 가독성, 유지보수등의 편의를 위해 적극적으로 사용해야 한다.
> 일반적으로 상수의 이름은 대문자로 선언해 상수임을 명확히 나타내고, 여러 단어로 이뤄진 경우 언더스코어(\_)로 구분해서 스네이크 케이스로 표현하는 것이 일반적이다.

```js
const TAX_RATE = 0.1;

let preTaxPrice = 100;
let afterTaxPrice = preTaxPrice + preTaxPrice * TAX_RATE;
```

---

<br>

## `const`키워드와 객체

`const`키워드로 선언된 변수에 원시 값을 할당한 경우엔 값을 변경할 수 없지만, **객체를 할당한 경우엔 값을 변경할 수 있다.**

```js
const person = {
  name: "lee",
};

person.name = "kim";

console.log(person); // {name: "kim"}
```

> `const`키워드는 재할당을 금지할 뿐 "불변"을 의미하지는 않는다.

---

<br>

## 권장사항

- ES6를 사용한다면 `var` 키워드는 사용하지 않는다.
- 재할당이 필요한 경우에 한정해 `let` 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
- 변경이 발생하지 않고 읽기 전용으로 사용하는 원시 값과 객체에는 `const` 키워드를 사용한다. `const` 키워드는 재할당을 금지하므로 `var`, `let` 키워드보다 안전하다.

변수를 선언하는 시점에는 재할당이 필요할지 잘 모르는 경우가 많다. 그리고 객체는 의외로 재할당 하는 경우가 드물다. 따라서 변수를 선언할 때는 일단 `const`키워드를 사용하고, 반드시 재할당이 필요하다면 그때 `const`를 `let`으로 변경해도 늦지 않다. (재할당이 반드시 필요한지도 생각해볼 일이다.)
