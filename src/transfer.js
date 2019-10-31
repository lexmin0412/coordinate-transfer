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
	let B_PI = 3.14159265358979324 * 3000.0 / 180.0;
	let x = lng - 0.0065;
	let y = lat - 0.006;
	let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * B_PI);
	let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * B_PI);
	let longitude = z * Math.cos(theta);
	let latitude = z * Math.sin(theta);
	return {
		lng: longitude,
		lat: latitude
	};
};

/**
 * 腾讯/高德地图转百度地图
 * @param lng 经度
 * @param lat 纬度
 */
function transTMapToBMap(lng, lat) {
	let B_PI = 3.14159265358979324 * 3000.0 / 180.0;
	let x = lng;
	let y = lat;
	let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * B_PI);
	let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * B_PI);
	let longitude = z * Math.cos(theta) + 0.0065
	let latitude = z * Math.sin(theta) + 0.006;
	return {
		lng: longitude,
		lat: latitude
	}
}

/**
 * 验证参数
 * @params 参数对象
 * @return 是否通过验证 boolean
 */
function verifyParams(params) {
  const { from, to, lng, lat } = params
  // 参数存在验证
  Object.keys(paramerrorings).forEach(element => {
    if ( !params[element] ) {
      throwError(paramerrorings[element]);
      return false
    }
  });

  // 经纬度类型验证
  if ( typeof lng !== 'number' && typeof lat !== 'number' ) {
    throwError('传入的经纬度必须是number类型，请检查您的参数。')
    return false
  } 

  // 参数值合法验证
  if ( !['bmap', 'tmap', 'gmap'].includes(from) || !['bmap', 'tmap', 'gmap'].includes(to) ) {
    throwError(paramerrorings['from']);
    throwError(paramerrorings['to']);
    return false
  }

  // 参数值不等验证
  if ( from === to ) {
    throwError('传入的初始坐标目标坐标类型不能相等')
    return false
  }
  
  // 参数值合法验证
  if ( !(from === 'bmap' && ['tmap', 'gmap'].includes(to)) || !(['tmap', 'gmap'].includes(from) && to === 'bmap') ) {
    throwError('传入的初始坐标目标坐标类型冲突，请检查。gmap和tmap不能相互转换，因为腾讯和高德是同一个坐标系，不需要转换')
    return false
  }
  return true
}



/**
 * 参数缺失警告
 */
const paramerrorings = {
  'from': '必须传入初始坐标类型, 类型为string, 允许的值为bmap-百度地图 tmap-腾讯地图 gmap-高德地图',
  'to': '必须传入目标坐标类型, 类型为string, 允许的值为bmap-百度地图 tmap-腾讯地图 gmap-高德地图',
  'lng': '必须传入初始坐标经度, 类型为number',
  'lat': '必须传入初始坐标纬度, 类型为number',
}

/**
 * 抛出错误信息
 * @param 错误信息 errText string
 */
function throwError(errText) {
  console.error(errText)
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
  const { from, to, lng, lat } = params
  let result = {
    lat: '',
    lng: ''
  }
  if ( from === 'bmap' && ['tmap', 'gmap'].indexOf(to) > -1 ) {
    result = transBMapToTMap(lng, lat)
  }
  else if ( ['tmap', 'gmap'].indexOf(from) > -1 && to === 'bmap' ) {
    result = transTMapToBMap(lng, lat)
  }
  return result
}

export {
  transBMapToTMap,
  transTMapToBMap,
  transCoordinate
}