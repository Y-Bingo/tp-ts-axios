import axios from '../../src/index'

// // 参数值为数组
// axios( {
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: [ 'bar', 'baz' ]
//     }
// } )

// // 参数值为对象
// axios( {
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: {
//             bar: 'baz'
//         }
//     }
// } )

// // 参数值为 Date 类型
// const date = new Date()
// axios( {
//     method: 'get',
//     url: '/base/get',
//     params: {
//         date
//     }
// } )

// // 特殊字符支持
// axios( {
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: '@:$, '
//     }
// } )

// // 空值忽略
// axios( {
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: 'bar',
//         baz: null
//     }
// } )

// // 丢弃 url 中的哈希标记
// axios( {
//     method: 'get',
//     url: '/base/get#hash',
//     params: {
//         foo: 'bar'
//     }
// } )

// // 保留 url 中已存在的参数
// axios( {
//     method: 'get',
//     url: '/base/get?foo=bar',
//     params: {
//         bar: 'baz'
//     }
// } )

//  data 为普通对象的请求
axios( {
    method: 'post',
    url: '/base/post',
    data: {
        a: 1,
        b: 2
    }
} )

// data为I哪天Array类型的数据
const arr = new Int32Array( [ 21, 31 ] )

axios( {
    method: 'post',
    url: '/base/buffer',
    data: arr
} )
