## Q. this란 무엇인가요?
this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수입니다.

객체지향 프로그래밍에서 객체(object)는 상태(state)를 나타내는 프로퍼티와 동작(behavior)을 나타내는 메서드를 하나로 묶은 자료구조입니다.

여기서 프로퍼티와 메서드는 자신이 속한 객체를 가리킬 수 있어야합니다.

아래 예제를 보겠습니다.
```js
const circle = {
  // 상태를 나타내느 프로퍼티
  radius: 5,
  
  // 동작을 나타내는 메서드
  getDiameter() {
    return 2 * circle.radius;
  }
}

console.log(circle.getDiameter()); // 10
```

circle 객체 리터럴은 radius 프로퍼트와 getDiameter 메서드를 가지고 있습니다. 메서드 내의 circle.radius를 통해서 radius는 circle 객체를 가르키는 것을 알 수 있습니다.

위의 객체 리터럴은 예상한 값을 잘 출력할 것 입니다. 하지만 생성자 함수는 어떨까요?

```js
function Circle(radius) {
  ???.radius = radius;
}

Cirle.prototype.getDiameter = function() {
  return 2* ???.radius;
}

const circle = new Circle(5);
```

위의 생성자 함수는 객체를 참조할 수 있는 어떤 키워드가 필요해보입니다. 이 키워드가 **this** 입니다.

## Q. 그럼 this 값은 어떻게 결정 되나요? (this 바인딩)
this 바인딩은 함수 호출 방식에 의해 동적으로 결정됩니다.

아래 4가지 호출 방식에 의해서 this 바인딩이 되며 각각 예제를 통해서 보겠습니다.
1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

### 일반 함수 호출
```js
function foo() {
  console.log(`foo's this:${this}`); // window
  function bar() {
    console.log(`bar's this:${this}`); // window
  }
}
```

일반 함수로 호출하면 함수 내부의 this는 전역 객체가 바인딩 됩니다. strict mode 적용 시 일반 함수 호출 시 this를 사용하지 않기 때문에 의미가 없어 undefined값이 바인딩 됩니다.

일반 함수로 호출되면 this는 무조건 전역객체와 바인딩 됩니다.

```js
let value = 1;

const obj = {
  value: 100,
  foo() {
    console.log(`foo's this:${this}`); // {value:100, foo:f}
    
    setTimeout(function() {
      console.log("callback's this:${this}"); // window
      console.log("callback's this.value:${this.value}") // 1
    }, 100)
  
  }
}

obj.foo();
```

callback 함수로 전달이 되었어도 일반함수로 호출 시 this는 전역객체와 바인딩 되는 것을 볼 수 있습니다.

그러면 이 문제를 어떻게 해결할 수 있을까요?

```js
let value = 1;

const obj = {
  value: 100,
  foo() {
    const that = this;
    console.log(`foo's this:${this}`); // {value:100, foo:f}
    
    setTimeout(function() {
      console.log("callback's that.value:${that.value}") // 100
    }, 100)
  
  }
}

obj.foo();
```

메소드 foo 내부에 this 값을 변수에 할당하여 사용하는 해결방법이 있습니다. 하지만 별로 좋은 해결방법은 아닌 것 같습니다.

```js
let value = 1;

const obj = {
  value: 100,
  foo() {
    console.log(`foo's this:${this}`); // {value:100, foo:f}
    setTimeout(function() {
      console.log("callback's this.value:${this.value}") // 100
    }.bind(this), 100)
  }
}

obj.foo();
```
Funtion.prototype.bind 메서드를 이용하여 this 바인딩 값을 설정하는 방법입니다.

위의 예제는 아래와 같은 진행순서에 의해 this 바인딩이 이루어집니다.

1. foo 메소드 실행
2. foo 메소드 내부 평가 단계 시작: this값이 obj 객체와 
3. foo 메소드 내부 실행 단계 시작: 바인딩된 this 값이 callback함수의 this값으로 바인딩

마지막 방법은 쉬우며 간결하며 많이 사용되고 있습니다.
```js
let value = 1;

const obj = {
  value: 100,
  foo() {
    console.log(`foo's this:${this}`); // {value:100, foo:f}
    setTimeout(() => {
      console.log("callback's this.value:${this.value}") // 100
    }, 100)
  }
}

obj.foo();
```

화살표 함수를 사용하는 방법입니다. 화살표 함수는 this 바인딩을 하지 않고 상위 스코프의 this 값을 참조하게 됩니다.

### 메서드 호출
메서드 내부의 this에서는 메서드 이름 앞의 마침표(.) 연사자 앞의 객체와 바인딩 됩니다.

```js
const person = {
  name: 'Lee',
  getName() {
    return this.name;
  }
}

console.log(person.getName()); // Lee
```

그럼 메서드에 일반함수를 할당하면 어떻게 될까요?
```js
const person2 = {
  name: 'Kim';
}

person2.getName = person.getName;

console.log(person2.getName()); // Kim
```

메서드에 일반함수가 할당되어도 메서드를 가지고 있는 객체를 참조하게 됩니다.


### 생성자 함수 호출
```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function() {
    return 2*this.radius;
  }
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circl1.getDiameter()); // 10
console.log(circl1.getDiameter()); // 20
```

생성자 함수로 호출 시 this값이 인스턴스와 바인딩 되는 것을 알 수 있습니다.


### Function.prototype.apply/call/bind 메서드에 의한 간접 호출

Function.prototype.apply와 Function.prototype.call은 this로 사용할 객체와 매개변수를 전달 받아 함수를 호출하는 메서드 입니다. 

apply는 매개변수를 배열 또는 유사 배열 객체로 전달 받으면 call은 매개변수를 리스트로 받는다는 차이점이 있습니다.

```js
function getThisBinding() {
  return this;
}

const thisArg = {a:1};

console.log(getThisBinding.apply(thisArg)); // {a:1}
console.log(getThisBinding.call(thisArg)); // {a:1}
```

Function.prototype.bind 메서드는 위의 예제에서 본 것 처럼 this 바인딩할 값을 지정해 줍니다.

```js
function getThisBinding() {
  return this;
}

const thisArg = {a:1};

console.log(getThisBinding.bind(thisArg)());// {a:1}
```