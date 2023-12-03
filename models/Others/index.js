// 모델 생성
class Others {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.country = "Korea";
  }

  addAge(age) {
    return this.age + age;
  }

  wow() {
    console.log("WOW!");
  }
}

/**
 * Javascript의 class는 객체(Object)와 관련이 있다.
  객체를 직접 작성하여 정의하고 생성할 수도 있지만, 클래스로 만들어주면 여러 객체를 더 쉽게 만들 수 있다.
  클래스는 객체를 생성하기 위한 템플릿이다.

  class를 통해 원하는 구조의 객체 틀을 짜놓고, 비슷한 모양의 객체를 공장처럼 찍어낼 수 있다.

  쉽게 생각해서 클래스 = 붕어빵 기계, 그리고 객체 = 붕어빵 으로 보면 된다.

  constructor는 class에서 필요한 기초 정보를 세팅하는 곳이다. 객체를 new로 생성할 때 가장먼저 자동으로 호출된다.
  constructor() 메소드에서 name과 age, 2개의 매개변수로 Korean 인스턴스의 name, age 프로퍼티에 값을 할당했다.
  this 는 본인 객체를 의미한다. 클래스 내에서 메소드끼리 소통하기 위해서는 this가 필요하다.
 */

module.exports = Others;
