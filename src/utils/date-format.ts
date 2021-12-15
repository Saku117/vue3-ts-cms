import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss"

/**
 * @description:utc格式化
 * @param {string} utcString
 * @author mengzijian
 * @date 2021-12-07 14:56:40
 */
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
