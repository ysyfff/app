##Knowledge
* export
  * export输出变量`export var a = 'b'; export var b='c'`或者`var a='b'; var b='c'; export {a, b}`
  * export函数或者类 `export function a(){}`或者使用as关键字重新命名,`function a(){}; export {a as f1}`
  * 需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
  ```
        // 报错
        export 1;

        // 报错
        var m = 1;
        export m;


        // 写法一
        export var m = 1;

        // 写法二
        var m = 1;
        export {m};

        // 写法三
        var n = 1;
        export {n as m};


        // 报错
        function f() {}
        export f;

        // 正确
        export function f() {};

        // 正确
        function f() {}
        export {f};
     ```
  * 另外，export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
    * 代码
      ```
        export var foo = 'bar';
        setTimeout(() => foo = 'baz', 500);

        上面代码输出变量foo，值为bar，500毫秒之后变成baz。
        这一点与CommonJS规范完全不同。CommonJS模块输出的是值的缓存，不存在动态更新
        setTimeout(() => foo = 'baz', 500);
      ```
  * export default
    * ```
        export default function () {
            console.log('foo');
        }
        上面代码是一个模块文件export-default.js，它的默认输出是一个函数。
        其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。
        export default命令用在非匿名函数前，也是可以的。

        本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

        function add(x, y) {
          return x * y;
        }
        export {add as default};
        // 等同于
        // export default add;

        import { default as xxx } from 'modules';
        // 等同于
        // import xxx from 'modules';



        正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
        // 正确
        export var a = 1;

        // 正确
        var a = 1;
        export default a;

        // 错误
        export default var a = 1;
      ```


##Problem

* 如何return一个component？
  * 已解
    * 使用高阶的Component`export var xx = () => class extends React.Component{ render() {}}`


* 为什么不可以export class却可以export default class
  *
