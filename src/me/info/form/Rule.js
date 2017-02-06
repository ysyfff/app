/*
负责检验规则的管理
rule的添加
rule的解析
值的校验
*/

import _ from 'lodash'


class Rule {
    constructor() {
      this.rule = {};
    }

    add(rule, func) {
      if(_.isObject(rule)) {
          for(let k in rule) {
            this.rule[k] = rule[k];
          }
      }else{
          this.rule[rule] = func;
      }
    }

    //对规则进行校验
    check(name, value) {

      let result = [];
      let ans = true;

      for(let k in name) {
        result.push(this.rule[k](value, ...name[k]));
      }


      //过滤出校验结果是false的
      let error = result.filter((item, i) => {
          return item[0] == false;
      });

      if(error.length) {
        return error[0];
      }else{
        return [true, ''];
      }

    }
}

let R = new Rule();

R.add({
  range: function(value, min, max) {

    let msg = '数值范围' + min + '~' + max;

    return [value >= min && value <= max, msg];
  },


  length: function(value, min, max) {

    let msg = '长度大小为' + min + '~' + max;

    return [value.length >= min && value.length <= max, msg];
  },


  required: function(value) {

    let msg = 'what?';

    return [!!value.trim(), msg];
  },


  gt: function(value, min) {

    let msg = '必须大于' + min;

    return [value > min, msg];
  },


  gte: function(value, min) {

    let msg = '必须大于等于' + min;

    return [value >= min, msg];
  },


  lt: function(value, max) {
    let msg = '必须小于' + max;

    return [value < max, msg];
  },

  lte: function(value, max) {
    let msg = '必须小于等于' + max;

    return [value <= max, msg];
  }
})

export {
  R
}
