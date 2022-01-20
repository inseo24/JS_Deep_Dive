# Q. REST? RESTful? REST API

Representational state transfer(REST)는 World Wide Web(WWW)를 효율적으로 사용하기 위해서 만들어진 소프트웨어 아키텍쳐 스타일 입니다. REST는 6개의 제약(constraints)이 있으며 이런 제약들을 따르는 Web API를 **REST API**라 부르며 **RESTful** 하다고 합니다.

REST에 대해 자세히 공부하기 앞서 왜 REST이라는 아키텍쳐 스타일을 만들었을까요?

## REST의 역사
1993-1994년, 웹사이트가 보편적으로 사용되기 시작하며 웹 아키텍쳐와 웹 프로토콜 표준의 필요성이 느껴지기 시작했습니다. 이에 W3C와 IETF 그룹은 URI와 HTTP, HTML 3가지 표준을 만들었습니다. Roy Fielding은 위의 표준을 효율적으로 이용할 수 있는 REST 아킥텍쳐 스타일을 발표하였습니다. 

그럼 REST는 어떤 구조를 하고 있을까요?

## Architectural concepts

![](https://images.velog.io/images/whow1101/post/4d68f191-deb1-43f5-be95-e596475b67ce/REST_information_model.png)

REST를 사용하면 아래 속성에 대햔 향상을 기대할 수 있습니다.

- **performnace**  
성능을 증가 시키기 쉬운 구조로 기법(cache, load balancer, 등)을 적용하여 user-perceived latency 감소, network efficiency 증가

- **scalability**  
클라이언트는 오직 resource를 URIs를 이용해서 요청하며 서버는 Respresenation으로 응답을 합니다. 정해진 포맷으로 요청과 응답을 하기 때문에 규모가 커지기 쉬웁니다. 즉, user agent와 origin server가 느슨하게 연결(decoupling) 되어있어 규모가 커지기 쉬웁니다. 

- **simplicity**  
정해진 포맷으로 요청과 응답을 하기 때문에 사용하기 쉬웁니다.

- **modifiability**  
컴포넌트간 느슨하게 연결되어 있어 쉽게 변화할 수 있습니다.

- **visibility**  
entities를 resource가 encapsulate하고 origin srever의 디테일한 정보(file server, database, 등)를 숨길 수 있습니다.

- **portability**  
컴포넌트간 느슨하게 연결되어 있어 다른 서비스에서 코드를 재활용하기 쉽습니다.

- **reliability**  
시스템에 문제가 발생하는 것에 대한 저항성이 높습니다.

Roy Fielding은 위의 속성 향상을 위해서 6개의 제약을 제시했습니다. 어떤 제약이 있을까요?

## Architectural constraints

### Client-sever architecture
client-server 아키텍쳐를 통해서 관심을 분리하였습니다. user interface, data storage 관심을 분리 하였습니다. 

### Statelessness
stateless protocol은 receiver로 부터 session information이 저장되지 않는 것을 뜻합니다. state protocol을 사용하며 클라이언트 application이 만개가 있다면 서버는 모든 클라이언트 application에 대한 session information을 저장해야 합니다. statelessness protocol을 사용하여 서버의 부하를 줄일 수 있습니다.

### Cacheability
클라이언트와 중개자(proxy, load balancer, 등)는 응답을 caching할 수 있습니다. 서버는 클라이언트의 추가 요청에 대응하여 오래된 데이터나 부적절한 데이터를 제공하지 못하도록 암시적 또는 명시적으로 cache 가능 또는 cache 불가능으로 정의해야 합니다.

### Layered system
클라이언트는 일반적으로 엔드 서버에 직접 연결되었는지 아니면 도중에 중개자와 연결되었는지 구분할 수 없습니다. 프록시 또는 로드 밸런서를 클라이언트와 서버 사이에 배치하면 통신에 영향을 주지 않으며 서비스를 확장 시킬 수 있습니다.

### Code on demand(optional)
서버는 실행 코드(JavaScript, Java, 등)를 전송하여 클라이언트의 기능을 일시적으로 확장할 수 있습니다.

### Uniform interface
Uniform interface는 모든 RESTful 시스템의 설계에 기본입니다. 아키텍처를 단순화하고 분리하여 각 컴포넌트이 독립적으로 발전할 수 있도록 할 수 있습니다. uniform interface에 대한 네 가지 제약 조건은 다음과 같습니다.

- 요청의 resource 식별  
각 리소스는 요청에서 식별되어야 합니다. RESTful 웹 서비스에서는 URIs를 통해서 식별이 됩니다.

- Represenation 통한 resource 조작  
클라이언트는 Represenation으로 전달받은 resource를 조작할 수 있어야 합니다.

- 자체 설명 메시지  
각 메시지에는 메시지 처리 방법을 설명하는 데 충분한 정보가 포함되어야 합니다.

- HATEOAS(응용 프로그램 상태의 엔진)  
클라이언트가 서버와 동적인 상호작용이 가능하여야 합니다. 예를들어 클라이언트가 요청을 할 때, 요청에 필요한 URI를 응답에 포함시켠 반환하는 것이 있습니다.