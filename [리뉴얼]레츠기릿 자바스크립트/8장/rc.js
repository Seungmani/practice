        const $screen = document.querySelector('#screen');
        const $result = document.querySelector('#result');

        // js에 class라는 객체가 따로 있다.
        // html의 class를 불러오는 건 className 단 class= 'a b c'이렇게 3개이면 a b c를 하나의 문자열로 인식
        // classList는 class= 'a b c'이렇게 3개이면 3개를 각각읽음
        // $screen.className; == waithing

        let startTime;
        let endTime;
        let timeoutID;
        const records=[]; // 기록의 집합

        $screen.addEventListener('click', (event)=>{
            if(event.target.classList.contains('waiting')){ // 파랑
                $screen.classList.remove('waiting');
                $screen.classList.add('ready');
                $screen.textContent = "초록색이 되면 클릭하세요";

                timeoutId = setTimeout(function(){
                    $screen.classList.replace('ready', 'now');
                    $screen.textContent="클릭하세요!!";
                    
                    // 시간 측정 시작
                    startTime = new Date();
                }, Math.floor(Math.random() * 1000) +2000); // 2000 ~ 3000, 2~3초
            
            } else if(event.target.classList.contains('ready')){ // 빨강
                
                clearTimeout(timeoutID);
                $screen.classList.remove('ready');
                $screen.classList.add('waiting');
                $screen.textContent = "너무 성급";

            } else if(event.target.classList.contains('now')){ // 초록
                // 시간 측정 끝
                endTime = new Date();
                
                const current = endTime-startTime;
                records.push(current);

                const average = records.reduce((a,c) => a+c)/ records.length;
                $result.textContent = `${current}ms, 평균 : ${average}ms`;

                startTime=null;
                endTime=null;

                $screen.classList.replace('now', 'waiting');
                $screen.textContent = "클릭해서 시작하세요";
            }
        });


        
        // Date(2021, 31, 18, 30, 5) // 년 월 일 시 분 초 // 월은 0이 1월임 주의 할 것!
        // 3월 3일과 2월 21일 차이 계산
        // const diff = new Data(2021, 2, 3) - new Date(2021, 1, 21) 
        // ms 밀리초 -> ms/1000 === s 초 -> s/60 === m 분 -> m/60 === h 시간 -> h/24 === day 일 
        // diff/1000/60/60/24

        // new Date().getFullYear() 현재 연도
        // new Date().getMonth() 현재 월 -1
        // new Date().getDate() 현재 일
        // new Date().getHours() 현재 시간
        // new Date().getMinutes() 현재 분
        // new Date().getSeconds() 현재 초
        // new Date().getMilliSeconds() 현재 밀리초
        // .set ()은 값 설정


        // reduce
        
        // [1,2,3,4].reduce((a,c) => {return a+c}, 0) // [1,2,3,4].reduce((a,c) => a+c, 0)
        // a= 누적값, c= 현재값, 0= 초기값 // 초기값이 없으면 배열의 첫번째 값이 초기값
        // a=0, c=1 --> a=1, c=2 --> a=3, c=3 --> a=6, c=4 --> 10
        // [1,2,3,4].reduce((a,c) => a+c)
        // a=1, c=2 --> a=3, c=3 --> a=6, c=4 --> 10

        // 배열을 객체로
        //['a','b','c','d'].reduce((a,c,i) => {a[i] = c;  return a}, {})
        // a={}, c='a', i=0
        // a={0: 'a'}, c='b', i=1
        // a={0:'a', 1:'b'}, c='c', i=2
        // a={0:'a', 1:'b', 2:'c'}, c='d', i=3
        // a={0:'a', 1:'b', 2:'c', 3;'d'}