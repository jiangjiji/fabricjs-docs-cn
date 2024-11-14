---
layout: doc
---

# 迁移到6.0

Fabric 6.0 进行了大规模重写，并非所有破坏性更改都有对应的建议。由于我们陷入了漫长的测试阶段，频繁出现破坏性变更，因此并未实现所有期望的结果。以下列出了最大的概念性变更。

## Typescript

FabricJS 现在是用 TypeScript 编写的。类型推断可以帮助你快速发现 API，尤其是在事件等方面。由于这个变化，如果你正在使用 @types/fabric，你应该将其删除。

![Typescript](https://fabricjs.com/article_assets/autocomplete.gif)

## 导入

导入方式已经更改，我们从以下方式：

```js
import { fabric } from 'fabric'
```

修改为:

```js
import { Canvas, Rect } from 'fabric'
```

以及：

```js
import { Canvas, Rect } from 'fabric/node'
```

对于使用 Node 来说，导入在未来还需要进行一些更改，因为 filter 和 util 命名空间在树摇（tree shaking）方面存在一些问题。实际上现在你也可以这样做：

```js
import { StaticCanvas, Rect } from 'fabric/es'
```

仅导入你实际使用的 Fabric 模块，但请注意，在使用 `loadFromJSON` 和加载 SVG 时没有保护措施，目前请自行承担风险，如果不确定请询问相关信息。

一些类已被重命名，因为它们的名称是保留关键字：

- fabric.Object 现在被称为 FabricObject
- fabric.Text 现在被称为 FabricText
- fabric.Image 现在被称为 FabricImage

## 类 vs 函数

之前 Fabric 使用函数作为工具，来增强原型并创建继承和混入。这在原本没有问题，但在 TypeScript 中无法很好地契合和工作。

所以之前我们使用函数可能会是这样的：

```ts
function Rect() {

}

Object.assign(Rect.prototype, {
  strokeWidth: 0,
  fill: 'black',
});

```

这个类使用工具创建，`createKlass` 接管了每个新实例创建时调用运行自定义 `initialize` 方法，并处理继承关系。因此，情况如下：

- 定义在原型上的属性默认值与方法完全一样
- 所有实例在原型上共享未分配的属性子类需要特殊的 FabricJS 语法。
- 子类需要特殊的FabricJS语法
- 混入可以通过简单的对象合并实现，并用于代码组织和共享。
  
您可以在运行时修改原型来更改所有类的默认值：

```ts
fabric.Object.prototype.originX = 'center';
```

本应将所有 originX 设置为居中的实例进行处理，除了那些您之前曾设置 origin 为某个值然后再更改原型的实例。如果您对这个概念不熟悉，这可能会导致意外结果。

类的工作方式不同，语法根本不支持原型上的默认值，而且无论如何 TypeScript 都不理解它。我们为 FabricJS 主类选择的设置是：

- 我们默认不进行任何原型变异，但开发者仍然可以选择加入
- 默认属性值在实例上分配，就像您使用公共属性一样
- 每个类都有一个可变的静态对象，该对象存储该类的默认值，并在构造函数期间分配
- 没有更多默认共享对象在实例之间，这些对象的修改很棘手（例如：控制操作）
- 混入作为遗留部分存在，将会被移除
- 子类声明使用标准 extends 语法完成

```ts
class Rect extends FabricObject {
  _render(ctx) {
    ....
  }
}
```

更改默认值和获取共享控制操作仍然可以通过以下具体说明实现 [配置控制操作](./doc/4_Configuring%20controls)

## Callbacks vs Promise

所有具有一个或多个参数的回调 API 现在都是基于 Promise 的。之前所有的 `loadSomething(arg, callback, arg2, arg3)` 现在都是 `loadSomething(arg, arg2, arg3).then(callback)` 。

比如给从字符串加载 SVG 的例子：

```ts
loadSVGFromString: function(string, callback, reviver, options) {
    ...
    callback(results, _options, elements, allElements);
};
```

现在是

```ts
loadSVGFromString(
  string: string,
  reviver?: TSvgReviverCallback,
  options?: LoadImageOptions
).then((result: {
  objects: (FabricObject | null)[];
  options: Record<string, any>;
  elements: Element[];
  allElements: Element[];
}) => {
    ....
});
```

## 方法链已弃用

如果它还在某个地方工作，请不要使用它。它已经被遗弃。

```ts
myRect.set({ fill: 'red' }).rotate(90);
```

现在是

```ts
myRect.set({ fill: 'red' });
myRect.rotate(90);
```

## 更多的破坏性修改

Group、Canvas、方法签名等方面有很多重大更改。如果您有一个大型项目，并且进行了大量自定义和子类化，升级将会很困难，对此我们表示歉意。更详细的变化列表在这里：[#8299](https://github.com/fabricjs/fabric.js/issues/8299)。
