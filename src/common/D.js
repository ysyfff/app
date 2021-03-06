
import _ from 'lodash'

class D {
    constructor() {

    }

    //转化成标准的日期对象
    toDate(date) {
        let res = null;

        if(_.isNumber(date) || _.isString(date)) {
            res = new Date(date);
        }else if(_.isDate(date)) {
            res = date;
        }else{
            res = '';
        }

        return res;
    }

    //对日期进行格式化
    format(date, pattern) {
        date = this.toDate(date);

        if(date){
          let map = new Map([
              [/(Y+)/g, date.getFullYear()],
              [/(M+)/g, date.getMonth() + 1],
              [/(D+)/g, date.getDate()],
              [/(h+)/g, date.getHours()],
              [/(m+)/g, date.getMinutes()],
              [/(s+)/g, date.getSeconds()],
              [/(S+)/g, date.getMilliseconds()]
          ]);

          for(let [k, v] of map) {
              if(k.test(pattern)) {
                  let vv = '000' + v;
                  let vl = vv.length;

                  pattern = pattern.replace(RegExp.$1, vv.substr(vl - Math.max((v+'').length), vl));
              }
          }
        }else{
          pattern = '';
        }

        return pattern;
    }
}

export default new D();
