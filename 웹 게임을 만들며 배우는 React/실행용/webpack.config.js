const path = require('path');
const RefreshWebpackPlugin= require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name : 'word-relay-setting',
    mode : 'development', // 실서비스는 production
    devtool : 'eval', // 서비스는 hidden-source-map
    resolve:{
        extensions:['.js', '.jsx'] // app 파일의 확장자명을 자동으로 탐색
    },
    
    // 중요, 입력
    entry : {
        app : ['./client'], // WordRelay.jsx는 client.jsx가 이미 불러오고 있어서 안 적어도 상관없음, extensions가 확장자를 찾아서 불러온
    },

    module:{
        rules : [{
            test: /\.jsx?/, // js와 jsx파일에 적용하겠다
            loader : 'babel-loader', // babel-loader를 적용
            options:{
                presets: [['@babel/preset-env', {
                    targets : {
                        browsers: ['> 1% in KR', 'last 2 chrome versions'],
                    },
                    debug : true,
                }], 
                '@babel/preset-react'],
                plugins:[
                    'react-refresh/babel',
                ]
            },
        }],
    },
    // entry를 읽고 모듈을 거쳐서 output을 한다.

    plugins:[
        new RefreshWebpackPlugin()
    ], // 기타 설정

    // 중요, 출력
    output : {
        path : path.join(__dirname, 'dist'), //현재 폴더(2.끝말잇기에 dist를 연결)
        filename : 'app.js',
        publicPath : '/dist', // 상대 경로
    },
    devServer:{
        historyAPIFallbaxk : true,
        devMiddleware: { publicPath: '/dist' }, //webpack이 생성해주는 경로
        static: { directory: path.resolve(__dirname) }, // index.html 위치를 적어줌
        hot:true,
    }
};