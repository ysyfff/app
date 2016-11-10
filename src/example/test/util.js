//本地存储
import {AsyncStorage} from 'react-native'
import _ from 'lodash'

// class STORE {
//     getPoint(key=new Date(): String, callback=()=>{}: Function) {
//         key = _util.formatDate(key);
//         AsyncStorage.getItem(key, (err, data) => {
//             callback && callback(data);
//         });
//     }
//     setPoint(key=new Date(): String, data: [{a: 1,b:2}], callback = ()=>{}: Function) {
//         key = _util.formatDate(key);
//         AsyncStorage.getItem(key, (err, val) => {
//             const point = val == null ? data : _.concat(JSON.parse(val), data);
//             AsyncStorage.setItem(key, JSON.stringify( point ), callback);
//         });
//     }
// }
//
// //地图相关
// class MAP {
//
// }
//
//
// let store = new STORE();

const store = {
    formatDate: (date=new Date()) => { //格式2016.09.19
        return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
    },
    getPoint: (key=new Date(), callback) => {
        key = store.formatDate(key);
        AsyncStorage.getItem(key, (err, data) => {
            callback && callback(data);
        });
    },
    setPoint: (key=new Date(), data, callback) => {
        key = store.formatDate(key);
        AsyncStorage.getItem(key, (err, val) => {
            const point = val == null ? data : _.concat(JSON.parse(val), data);
            AsyncStorage.setItem(key, JSON.stringify( point ), callback);
        });
    }
}

export {
    store
}
