'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @author cellerchan
 * @description 坐标转换库 支持百度/腾讯/高德经纬度互转
 */

/**
 * 百度地图转腾讯/高德地图
 * @param lng 经度
 * @param lat 纬度
 */
function transBMapToTMap(lng, lat) {
  var B_PI = 3.14159265358979324 * 3000.0 / 180.0;
  var x = lng - 0.0065;
  var y = lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * B_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * B_PI);
  var longitude = z * Math.cos(theta);
  var latitude = z * Math.sin(theta);
  return {
    lng: longitude,
    lat: latitude
  };
}
/**
 * 腾讯/高德地图转百度地图
 * @param lng 经度
 * @param lat 纬度
 */

function transTMapToBMap(lng, lat) {
  var B_PI = 3.14159265358979324 * 3000.0 / 180.0;
  var x = lng;
  var y = lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * B_PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * B_PI);
  var longitude = z * Math.cos(theta) + 0.0065;
  var latitude = z * Math.sin(theta) + 0.006;
  return {
    lng: longitude,
    lat: latitude
  };
}
/**
 * @name 转换坐标方法 
 * @description 百度高德腾讯通用
 * @param params 参数对象
 * @param params.from 初始坐标类型 string bmap-百度地图 tmap-腾讯地图 gmap-高德地图
 * @param params.to 目标坐标类型 string bmap-百度地图 tmap-腾讯地图 gmap-高德地图
 * @param params.lng 初始坐标经度 number
 * @param params.lat 初始坐标纬度 number
 * @example
 ```
 transCoordinate({
   from: 'bmap',
   to: 'tmap',
   lng: 120.6868,
   lat: 30.3131
 })
 ```
 */


function transCoordinate(params) {
  var from = params.from,
      to = params.to,
      lng = params.lng,
      lat = params.lat;
  var result = {
    lat: '',
    lng: ''
  };

  if (from === 'bmap' && ['tmap', 'gmap'].indexOf(to) > -1) {
    result = transBMapToTMap(lng, lat);
  } else if (['tmap', 'gmap'].indexOf(from) > -1 && to === 'bmap') {
    result = transTMapToBMap(lng, lat);
  }

  return result;
}

exports.transBMapToTMap = transBMapToTMap;
exports.transCoordinate = transCoordinate;
exports.transTMapToBMap = transTMapToBMap;
