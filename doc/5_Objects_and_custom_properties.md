---
layout: doc
---

# 对象和自定义属性

## 自定义属性

在构建应用程序时，你可能需要向对象添加一些自定义属性。一个非常常见的需求是将`id`和`name`属性添加到对象上。

如果你正在使用 TypeScript 或者希望你的IDE能够提供自动补全功能，那么你需要明确声明这些属性是什么。

此外，还存在一个序列化的问题，需要你在函数`toObject`的参数中传递这些属性。

```ts
// example without proper typing:
(myRect as any).name = 'rectangle';
myRect.toObject(['name', 'id']);
```

为了使代码更美观，你必须使用 TypeScript 的接口特性和对象的自定义属性钩子。

```ts
import { FabricObject } from 'fabric';

declare module "fabric" {
  // to have the properties recognized on the instance and in the constructor
  interface FabricObject {
    id?: string;
    name?: string;
  }
  // to have the properties typed in the exported object
  interface SerializedObjectProps {
    id?: string;
    name?: string;
  }
}

// to actually have the properties added to the serialized object
FabricObject.customProperties = ['name', 'id'];
```

这样的改变将使类型推断工作正确：

- 错误1
![错误1](https://fabricjs.com/article_assets/custom_props/constructor.png)
- 错误2
![错误2](https://fabricjs.com/article_assets/custom_props/property.png)
- 正确
![正确](https://fabricjs.com/article_assets/custom_props/export.png)

## 自定义方法

一般来说，如果你能坚持使用外部函数，事情会变得简单。但在特定情况下，当你想将特定的方法添加到不同对象的原型上时，你必须进行一些修改：

```ts
// declare the methods for typescript
declare module "fabric" {
  // to have the properties recognized on the instance and in the constructor
  interface Rect {
    getText: () => string;
  }
  // to have the properties typed in the exported object
  interface Text {
    getText: () => string;
  }
}

// then add the methods to the classes:
Rect.prototype.getText = function() { return 'none'; }
Text.prototype.getText = function() { return this.text; }
```

## 子类

定义子类变得更加容易，但并不总是可行的。例如，如果你想定义像`Rect`, `Textbox`, `IText`, `Path`的派生类，这是可能且容易的。

```ts
import { classRegistry, SerializedPathProps } from 'fabric';

interface UniquePathPlusProps {
  id?: string;
  name?: string;
}

export interface SerializedPathPlusProps
  extends SerializedPathProps,
    UniquePathPlusProps {}

export interface PathPlusProps extends SerializedPathProps, UniqueRectProps {}

export class PathPlus<
  Props extends TOptions<PathPlusProps> = Partial<PathPlusProps>,
  SProps extends SerializedPathPlusProps = SerializedPathPlusProps,
  EventSpec extends ObjectEvents = ObjectEvents,
> extend Path<Props, SProps, EventSpec> {
  static type: 'path' // if you want it to override Path completely
  declare id?: string;
  declare name?: string;

  toObject<
    T extends Omit<Props & TClassProperties<this>, keyof SProps>,
    K extends keyof T = never,
  >(propertiesToInclude: K[] = []): Pick<T, K> & SProps {
    return super.toObject([...propertiesToInclude, 'id', 'name']);
  }
}

// to make possible restoring from serialization
classRegistry.setClass(PathPlus, 'path');
// to make PathPlus connected to svg Path element
classRegistry.setSVGClass(PathPlus, 'path');
```

但是，你不能派生一个FabricObject并将其添加到其他对象的原型链中。

## 警告

你应该只添加在渲染或事件处理时，能简化代码的自定义属性。一般来说，画布上的 FabricJS 类和对象不应包含与其渲染需求或行为配置无关的数据，它们不应成为你应用程序的数据存储。
