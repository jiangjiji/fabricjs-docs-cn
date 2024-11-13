---
layout: doc
---

# 配置默认属性

## 配置对象的默认控制

如果你正在寻找如何配置默认控制操作，请查看另外一篇文章[配置控制操作](/doc/4_Configuring%20controls.md)。
在 FabricJS 中，每个对象（例如 ```rect、path、circle``` 等）都拥有一系列状态属性，这些属性决定了对象的外观以及一些默认的交互行为。

你可以在初始化对象时配置这些值，也可在项目的某个阶段设置或忽略这些属性的值。
以下是一些可能促使你全局配置这些属性的理由：

- 你不想使用缓存
- 你不喜欢对象周围一圈1px的透明描边
- 你希望所有的文本对象使用自定义字体
- 你想自己设置 ```originX``` 和 ```originY``` 坐标作为工程的中心

大都数默认配置储存在```ownDefaults```静态属性中。
当对象实例被创建时，会通过```Object.assign```赋值这些属性。

下面是一个例子，如果你想要更改 FabricText 对象的默认字体，可以这样做：

```typescript
import { FabricText } from 'fabric';

FabricText.ownDefaults.fontFamily = 'Lobster';
```

这将使每个 FabricText 对象及其继承的子类都使用 ```Lobster``` 作为默认字体，除非你在构造函数中另行指定了不同的字体。

```typescript
new FabricText('Hello World!') // Will have Lobster font

new FabricText('Hello World!', { fontFamily: 'Arial' }) // Will have Arial font
```

请注意，在进行更改之前，你需要仔细检查清楚 FontFamily 的定义位置。
改变 FabricObject 的 FontFamily 可能不会产生任何效果，因为 FabricText 有其自身的默认值。当设置 IText 或者 Textbox 时，会使用 FabricText 的默认值。

通常来说，你应该更改一次自己的默认值，以便让 FabricJS 更好的满足你应用的需求。
配置默认值而不是在每个对象实例时设置每个属性可以减少代码中的混乱，但从性能的角度来看不会更快或更好。

这里有一个名为```getDefaults()```的方法。
该方法会返回一个对象，通过这个对象可以查看实际的默认值。

## 关于原型的说明

与 FabricJS v5 及更早版本不同，这不会影响已经创建的实例。

JavaScript 类语法不支持在原型上使用 FabricJS 之前利用的对象属性。

如果您真的喜欢旧版本的方法，您仍然可以通过添加一些代码来切换使用。

这里是一个 FabricObject 的例子：

```typescript
import { FabricObject } from 'fabric';

Object.assign(FabricObject.prototype, FabricObject.ownDefaults);
FabricObject.ownDefaults = {};
```

请注意，你真的需要一些充分的理由来确定这么做。
例如，属性是对象或数组的情况，它们不会在每个实例中重复，而是会在所有实例之间共享。
但另一方面，这可能会产生意想不到的异常和副作用，而这可能是你在应用程序中不希望出现的。
FabricJS 的默认设置更倾向于安全方面，同时也考虑到了可覆盖性。
