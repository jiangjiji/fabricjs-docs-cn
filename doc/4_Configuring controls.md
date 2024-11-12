---
layout: doc
---

# 配置控制操作

## 配置控制操作方法

FabricJS 对象的控制操作具有默认配置，这些配置由控制操作类和对象的默认值定义。
这里列出了受影响属性 [Object Props](https://github.com/fabricjs/fabric.js/blob/master/src/shapes/Object/types/ObjectProps.ts) 和 [Border Props](https://github.com/fabricjs/fabric.js/blob/master/src/shapes/Object/types/BorderProps.ts)：

```ts
  /**
   * Size of object's controlling corners (in pixels)
   * @type Number
   * @default 13
   */
  cornerSize: number;

  /**
   * Size of object's controlling corners when touch interaction is detected
   * @type Number
   * @default 24
   */
  touchCornerSize: number;

  /**
   * When true, object's controlling corners are rendered as transparent inside (i.e. stroke instead of fill)
   * @type Boolean
   * @default true
   */
  transparentCorners: boolean;

  /**
   * Color of controlling corners of an object (when it's active)
   * @type String
   * @default rgb(178,204,255)
   */
  cornerColor: string;

  /**
   * Color of controlling corners of an object (when it's active and transparentCorners false)
   * @since 1.6.2
   * @type String
   * @default ''
   */
  cornerStrokeColor: string;

  /**
   * Specify style of control, 'rect' or 'circle'
   * This is deprecated. In the future there will be a standard control render
   * And you can swap it with one of the alternative proposed with the control api
   * @since 1.6.2
   * @type 'rect' | 'circle'
   * @default 'rect'
   * @deprecated
   */
  cornerStyle: 'rect' | 'circle';

  /**
   * Array specifying dash pattern of an object's control (hasBorder must be true)
   * @since 1.6.2
   * @type Array | null
   * @default null
   */
  cornerDashArray: number[] | null;

  /**
   * Padding between object and its controlling borders (in pixels)
   * @type Number
   * @default 0
   */
  padding: number;

  /**
   * Color of controlling borders of an object (when it's active)
   * @type String
   * @default rgb(178,204,255)
   */
  borderColor: string;

  /**
   * Array specifying dash pattern of an object's borders (hasBorder must be true)
   * @since 1.6.2
   * @type Array | null
   * default null;
   */
  borderDashArray: number[] | null;

  /**
   * When set to `false`, object's controlling borders are not rendered
   * @type Boolean
   * @default
   */
  hasBorders: boolean;

  /**
   * Opacity of object's controlling borders when object is active and moving
   * @type Number
   * @default 0.4
   */
  borderOpacityWhenMoving: number;

  /**
   * Scale factor of object's controlling borders
   * bigger number will make a thicker border
   * border is 1, so this is basically a border thickness
   * since there is no way to change the border itself.
   * @type Number
   * @default 1
   */
  borderScaleFactor: number;
```

这些默认值使得控制操作呈现如下效果：
![controls](https://fabricjs.com//article_assets/default_controls.png)

现在让我们更改一些基础属性。
在下面的示例中，注释并更改属性以查看效果：

```ts
const canvas = new fabric.Canvas(canvasEl);

const text = new fabric.FabricText('Fabric.JS', {
  cornerStyle: 'round',
  cornerStrokeColor: 'blue',
  cornerColor: 'lightblue',
  cornerStyle: 'circle',
  padding: 10,
  transparentCorners: false,
  cornerDashArray: [2, 2],
  borderColor: 'orange',
  borderDashArray: [3, 1, 3],
  borderScaleFactor: 2,
});
canvas.add(text);
canvas.centerObject(text);
canvas.setActiveObject(text)
```

## 配置所有对象的控制操作

现在，每个对象在创建时都会被传递使用默认选项，或者可以创建一个函数来修改 FabricJS 的控制操作默认值。

```ts
const canvas = new fabric.Canvas(canvasEl);

fabric.InteractiveFabricObject.ownDefaults = {
    ...fabric.InteractiveFabricObject.ownDefaults,
    cornerStyle: 'round',
    cornerStrokeColor: 'blue',
    cornerColor: 'lightblue',
    cornerStyle: 'circle',
    padding: 10,
    transparentCorners: false,
    cornerDashArray: [2, 2],
    borderColor: 'orange',
    borderDashArray: [3, 1, 3],
    borderScaleFactor: 2,
}

const text = new fabric.FabricText('Fabric.JS');
const rect = new fabric.Rect({ width: 100, height: 100, fill: 'green' });

canvas.add(text, rect);
canvas.centerObject(text);
canvas.setActiveObject(text);
```

## 配置不同对象的控制操作

现在，如果你必须为对象添加一个额外的或者不同的控制操作，那么你可以将一个控制操作对象添加到指定对象上。
你的对象的控制操作对象是在构造函数中创建的，由于每个实例都是不同的，所以可以避免意外副作用的发生。

```ts
const canvas = new fabric.Canvas(canvasEl);

const text = new fabric.FabricText('Fabric.JS', { controls: {
    ...fabric.FabricText.createControls().controls,
    mySpecialControl: new fabric.Control({
        x: -0.5,
        y: 0.25,
    }),
} });
const rect = new fabric.Rect({ width: 100, height: 100, fill: 'green', controls: {
    ...fabric.FabricText.createControls().controls,
    mySpecialControl: new fabric.Control({
        x: 0.5,
        y: -0.25,
    }),
} });

canvas.add(text, rect);
canvas.centerObject(text);
canvas.setActiveObject(text);
```

如果你不喜欢这样，你也可以直接修改`createControls`静态函数的输出：

```ts
const canvas = new fabric.Canvas(canvasEl);

fabric.Textbox.createControls = () => {
  const controls = fabric.controlsUtils.createTextboxDefaultControls();
  delete controls.mtr;
  return {
    controls: {
      ...controls,
      mySpecialControl: new fabric.Control({
        x: -0.5,
        y: 0.25,
      }),
    }
  }
}

const text = new fabric.Textbox('Fabric.JS');
const text2 = new fabric.Textbox('Fabric.JS');

canvas.add(text, text2);
canvas.centerObject(text);
canvas.setActiveObject(text);
```

这个设置依然给你提供了单独设置对象的控制操作，以避免冲突。如果你正在寻找一种“设置后即可忘记”的配置方式，上述示例可能是最佳方法。

你可以更进一步地按你所需来共享和设置。如果你希望有一个实例之间共享的控制操作，你必须再次操作默认配置。这将使你能够为所有类一次性配置控制操作，并且允许你在运行时全局添加控制操作。

每一种设置都有优缺点，这取决于你个人喜好和项目需求。如下的代码段，你愮按下runMe运行。一旦运行，上面的片段也会受到影响。

```ts
const canvas = new fabric.Canvas(canvasEl);

// deactivate constructor control assignment
fabric.InteractiveFabricObject.createControls = () => {
    return {};
}

const controls = fabric.controlsUtils.createObjectDefaultControls();
delete controls.mtr;
fabric.InteractiveFabricObject.ownDefaults.controls = {
    ...controls,
    mySpecialControl: new fabric.Control({
      x: -0.5,
      y: 0.25,
    }),
}

const rect = new fabric.Rect({ width: 100, height: 100, fill: 'green' });
const rect2 = new fabric.Rect({ width: 100, height: 100, fill: 'orange', top: 100, left: 200 });

// adding a control dynamically after creation of instances on defaults will have effect on every object
fabric.InteractiveFabricObject.ownDefaults.controls.myOtherControls = new fabric.Control({
  x: 0.5,
  y: -0.25,
});

canvas.add(rect, rect2);
canvas.centerObject(rect);
canvas.setActiveObject(rect);
```

你可以给所有对象全局添加和删除控制操作，这意味着每个对象共享同一个控制操作设置。
**目前没有在不完全替换控制操作设置的情况下，修改单个对象的方法**
你可以根据需要来交换预制的控制操作设置。

您也可以创建完全定制的控制操作，更多信息请查看此处的示例：
