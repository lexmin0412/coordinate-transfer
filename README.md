# Coordinate-Transfer

坐标转换库，支持百度/高德/腾讯坐标互转。

## Usage

使用示例：

```js
import {
  transTMapToBMap,
  transBMapToTMap,
  transCoordinate
} from 'coordinate-transfer'

// 使用方法1: 直接调用转换方法
transTMapToBMap(120.8484, 30.2121)
transBMapToTMap(120.8484, 30.2121)

// 使用方法2: 调用父级方法, 通过此方法传入不同的参数可以调用上面的两个转换方法
transCoordinate({
  from: 'tmap',
  to: 'bmap',
  lng: 120.8484,
  lat: 30.2121
})
```

## API

直接调用转换方法或调用 `transCoordinate` 方法均可达到转换坐标系的目的, 区别在于方法传入的参数值和类型不同，开发者可以按照自己的喜好来选用。

### 直接调用转换方法

直接调用 `transTMapToBMap`, `transBMapToTMap` 方法可参考如下参数列表。

| 参数 | 默认值 | 必填 | 说明 | 类型/可选值 |
|------|--------|------|------|-------------|
| lng  | 无     | 是   | 经度 | number      |
| lat  | 无     | 是   | 纬度 | number      |

### 调用 `transCoordinate` 方法

调用 `transCoordinate` 方法可参考如下参数列表。

`transCoordinate` 方法的参数是一个对象, 是为了以后版本的功能扩展性而定义的。参数对象的属性参考如下：

| 属性 | 默认值 | 必填 | 说明         | 类型/可选值                                        |
|------|--------|------|--------------|----------------------------------------------------|
| lng  | 无     | 是   | 经度         | number / 合法的经度值                              |
| lat  | 无     | 是   | 纬度         | number / 合法的纬度值                              |
| from | 无     | 是   | 传入坐标类型 | string / bmap-百度地图 tmap-腾讯地图 gmap-高德地图 |
| to   | 无     | 是   | 目标坐标类型 | string / bmap-百度地图 tmap-腾讯地图 gmap-高德地图 |


## Remark

腾讯和高德的经纬度是同一坐标系下的，可以通用，而百度与两者稍有不同，需要相互转换。
