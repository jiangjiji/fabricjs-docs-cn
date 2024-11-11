---
layout: doc
---

# 你的第一个应用

## 你的第一个基础应用

让我们来看看一个你可以尝试写的最简单App，在浏览器中的```Hello World```例子。

你至少需要导入```StaticCanvas```和```FabricText```类。

```typescript
import { StaticCanvas, FabricText } from 'fabric';
```

然后实例化它们两个并将它们组合

```typescript
const canvas = new StaticCanvas();
const helloWorld = new FabricText('Hello world!');
canvas.add(helloWorld);
canvas.centerObject(helloWorld);
```

然后你想用它来下载你的 PNG 文件

```typescript
const imageSrc = canvas.toDataURL();

// 下面是下载的代码
const a = document.createElement('a');
a.href = imageSrc;
a.download = 'image.png';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
```

现在来试一试吧！
