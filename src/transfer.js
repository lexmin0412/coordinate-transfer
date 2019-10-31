/**
 * 百度地图转腾讯地图
 * @param lng 经度
 * @param lat 纬度
 */
export const bMapTransQQMap = (lng, lat) => {
	let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	let x = lng - 0.0065;
	let y = lat - 0.006;
	let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
	let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
	let lngs = z * Math.cos(theta);
	let lats = z * Math.sin(theta);
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
export const qqMapTransBMap = (lng, lat) => {
	let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	let x = lng;
	let y = lat;
	let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
	let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
	let lngs = z * Math.cos(theta) + 0.0065
	let lats = z * Math.sin(theta) + 0.006;
	return {
		lng: lngs,
		lat: lats
	}
}

// export default {
//   qqMapTransBMap,
//   bMapTransQQMap
// }