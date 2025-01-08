
### Enum的基础使用

枚举，固定数量，固定值的一个数据类型

使用enum keyword 创建。

``` typescript
// 默认顺序创建 ，也就是Blue = 0，Red = 1，Green = 2  
enum Color {  
  Blue,  
  Red,  
  Green,  
}  
  
console.log(Color)  
// 但是默认创建的话，这里的类型会有点区别。
{
  "0": "Blue",  //string:string
  "1": "Red",
  "2": "Green", 
  "Blue": 0,  // string:number
  "Red": 1,
  "Green": 2
}


console.log('Color.Blue---', Color.Blue) // 0  
console.log('typeof Color.Blue---', typeof Color.Blue) // number
console.log('Color[0]---', Color['0']) // Blue  这里的Color后面方括号内使用的引号包裹的0  
console.log('typeof Color[0]---', typeof Color['0']) // string  
console.log('Color[Color.Red]---', Color[Color.Red]) // Red
```


### Enum 作为声明类型的时候

``` typescript
const myColor = ref()  
function setColor(color: Color) {    // 这里声明了一个
  console.log(color) // 0  
  myColor.value = Color[color]  
  console.log(myColor.value) // Blue  
}
setColor(Color.Blue);
```

声明的时候这个函数的参数color类型是Color，但是这声明表示是这个Enum Color当中的一个成员，而不是Color整个Enum。

### 声明Enum每个成员的值的创建方式
按照上面那种方式创建，enum对象的key,value 有不同的类型。

``` ts

enum days {  
  Monday = 1,  
  Tuesday = 2,  
  Wednesday = 3,  
  Thursday = 4,  
  Friday = 5,  
  Saturday = 6,  
  Sunday = 7,  
}  
  
console.log('days---', days)

{
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
  "6": "Saturday",
  "7": "Sunday",
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
  "Sunday": 7
}

```

舒服了，这样创建的话，类型也对的上了，也能知道key，value是个什么东西了。
而且这样能控制key，value的值，代码里也是显式声明。