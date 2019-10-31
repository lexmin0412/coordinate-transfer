'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 百度地图转腾讯地图
 * @param lng 经度
 * @param lat 纬度
 */
var bMapTransQQMap = function bMapTransQQMap(lng, lat) {
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = lng - 0.0065;
  var y = lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  var lngs = z * Math.cos(theta);
  var lats = z * Math.sin(theta);
  return {
    lng: lngs,
    lat: lats
  };
};
/**
 * 腾讯地图转百度地图
 * @param lng 经度
 * @param lat 纬度
 */

var qqMapTransBMap = function qqMapTransBMap(lng, lat) {
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = lng;
  var y = lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  var lngs = z * Math.cos(theta) + 0.0065;
  var lats = z * Math.sin(theta) + 0.006;
  return {
    lng: lngs,
    lat: lats
  };
}; // export default {
//   qqMapTransBMap,
//   bMapTransQQMap
// }

exports.bMapTransQQMap = bMapTransQQMap;
exports.qqMapTransBMap = qqMapTransBMap;
