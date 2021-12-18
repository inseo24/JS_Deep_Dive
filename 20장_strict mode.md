## strict mode란?
strict mode는 ES5부터 추가되었으며, 잠재적인 오류를 발생시키 어려운 개발 환경을 만듭니다.

아래 예제는 strict mode를 사용하지 않았을 경우 입니다.

```js
function foo() {
  x = 10;
}

foo();

console.log(x); // ?
```

위의 예제에서 10이 출력되는 것을 확인할 수 있다. 그 이유는 실행 단계에서 'x=10;'을 만났을  때 foo 지역 스코프에 x가 없어 상위 스코프인 전역 스코프를 탐색합니다. 전역 스코프에도 x을 찾을 수 없기 때문에 자바스크립트 엔진은 전역 객체에 x 프로퍼티를 동적으로 생섭합니다. 이러한 현상을 암묵적 전역이라고 합니다.

이러한 암묵적 전역은 잠재적인 오류를 발생시킬 수 있습니다. 개발자는 이러한 오류를 미리 검출할 수 있기를 원할 것 입니다. 그 때문에 ES5부터 strict mode가 추가 되었습니다.

아래는 strict mode를 추가했을 때의 결과 입니다.

```js
function foo() {
  'use strict';
  x = 10; // ReferenceError: x is not defined
}

foo();
```

전역의 선두 또는 함수 내부의 선두에 'use strict';를 추가하여 strict mode를 적용할 수 있습니다. 위의 예제는 strict mode 적용 시 함수 foo 내부에서 x 스코프를 찾을 수 없어 에러를 호출하게 됩니다.

그럼 strict mode는 암묵적 전역 이외에 어떤 문제 에러를 발생시킬까요?

## strict mode가 발생시키는 에러

### 암묵적 전역
strict mode는 위 예제에서 본 것처럼 선언한지 않은 변수를 참조하면 ReferenceError가 발생합니다.
```js
(function() {
  'use strict';
  x = 1;
  console.log(x); // ReferenceError: x is not defined
}());
```

### 변수, 함수, 매개변수의 삭제
delete 연산자로 변수, 함수, 매개변수를 삭제하면  SyntaxError가 발생합니다.

```js
(function() {
  'use strict';
  
  let x = 1;
  delete x; // SyntaxError
  
  function foo(a) {
    delete a; // SyntaxError
  }

  delete foo; // SyntaxError
}());
```

### 매개변수 이름의 중복
중복된 매개변수 이름을 사용하면 SyntaxError 발생합니다.
```js
(function() {
  'use strict';
  
  function foo(x,x) {
    return x+x;
  }
  
  console.log(foo(1,2));
}());
```

암묵적 전역 외에는 개발자가 실수할 일이 없을 것 입니다. 즉 암묵적 전역만 조심하시면 됩니다.

위의 예제를 보면 Immediately invoked function expression(IIFE) 범위로 strict mode를 적용한 것을 볼 수 있습니다. 왜 그랬을까요??

## strict mode 적용 시 주의 사항
strict mode는 스크립트 단위로 적용이 됩니다. 하지만 strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있습니다. 

그럼 함수 단위로 strict mode를 적용하는 것은 어떨까요?

함수 단위로 strict mode를 적용한다면 어떤 함수는 strict mode, 나머지 함수는 non-strict mode함수 일 것 입니다. 마찬가지로 strict mode와 non-strict mode를 혼용하는 것은 좋지 않으며 함수마다 strict mode를 작성하는 것 또한 번거롭습니다.

즉, IIFE로 strict mode를 적용하는 것은 바람직합니다.


