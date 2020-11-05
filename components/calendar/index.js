import { connect } from 'herculex';
// import moment from 'moment';
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    const arr2 = Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
/* eslint-disable complexity, no-param-reassign */
/* eslint max-depth: [2, 7] */
let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let commonYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let FIRST_MONTH = 0;
let LAST_MONTH = 11;
let DAYS_PER_ROW = 7;
let COLOR_MAP = {
  1: '#f5a911',
  2: '#e8541e',
  3: '#07a89b',
  4: '#108ee9',
  5: 'rgba(51, 51, 51, 0.4)'
};
// 获取某月第某天是星期几
function getDay(month, year, index) {
  return new Date(year, month, index).getDay();
}
// 获取某月有几天
function getMonthLength(month, year) {
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    return leapYear[month];
  } else {
    return commonYear[month];
  }
}
// 数字补位 1 -> 01
function prefixNum(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return '' + num;
  }
}

Component(
  connect({
    mapStateToProps: ['calendar']
  })({
    data: {
      selectedYear: 0,
      selectedMonth: 0,
      currentDate: null,
      dates: [],
      blockType: 1 // 1.没有待办纯数字 2.有待办 用于区分不同类型日期块的样式。
    },
    props: {
      className: '',
      tagData: [],
      type: 'single'
    },
    didMount: function didMount() {
      this.tapTimes = 0;
      let date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      let year = date.getFullYear();
      let month = date.getMonth();
      this.setData({
        selectedYear: year,
        selectedMonth: month,
        currentDate: date
      });
      this.refreshdates(month, year);
    },
    didUpdate: function didUpdate() {
      let dates = this.data.dates;

      let blockType = 1;
      for (let i = 0; i < dates.length; i++) {
        for (let j = 0; j < dates[i].length; j++) {
          if (this.hasTag(dates[i][j])) {
            blockType = 2;
          }
        }
      }
      this.setData({
        dates: dates,
        blockType: blockType
      });
    },
    methods: {
      onPrevMonthTap: function onPrevMonthTap() {
        let _data = this.data;

        let selectedMonth = _data.selectedMonth;

        let selectedYear = _data.selectedYear;

        let year = selectedYear;
        let month = selectedMonth;
        // 如果当前选中是一月份，前一月是去年的12月
        if (selectedMonth === FIRST_MONTH) {
          year = selectedYear - 1;
          month = LAST_MONTH;
        } else {
          month = selectedMonth - 1;
        }
        if (this.props.onMonthChange) {
          this.props.onMonthChange(month, selectedMonth);
        }
        this.setData({
          selectedYear: year,
          selectedMonth: month
        });
        this.refreshdates(month, year);
      },
      onNextMonthTap: function onNextMonthTap() {
        let _data2 = this.data;

        let selectedMonth = _data2.selectedMonth;

        let selectedYear = _data2.selectedYear;

        let year = selectedYear;
        let month = selectedMonth;
        // 如果当前选中是十二月份，下一月是去年的12月
        if (selectedMonth === LAST_MONTH) {
          year = selectedYear + 1;
          month = FIRST_MONTH;
        } else {
          month = selectedMonth + 1;
        }
        if (this.props.onMonthChange) {
          this.props.onMonthChange(month, selectedMonth);
        }
        this.setData({
          selectedYear: year,
          selectedMonth: month
        });

        this.refreshdates(month, year);
      },
      refreshdates: function refreshdates(month, year) {
        this.tapTimes = 0;
        let _data3 = this.data;
        let selectedYear = _data3.selectedYear;
        let selectedMonth = _data3.selectedMonth;
        let currentDate = _data3.currentDate;
        let firstDay = getDay(month, year, 1);
        let days = getMonthLength(month, year);
        let datesArray = [];
        let currentDateTimeStamp = +currentDate;
        let num = 0;
        for (let i = 0; i < firstDay; i++) {
          num += 1;
          // 如果当前选中的是一月份，前一个月是去年的12月
          let _year = selectedYear;
          let _month = selectedMonth;

          if (selectedMonth === 0) {
            _year = selectedYear - 1;
            _month = LAST_MONTH;
          } else {
            _year = selectedYear;
            _month = selectedMonth - 1;
          }
          let date = getMonthLength(_month, _year) - i;
          let dateTimeStampP = +new Date(_year, _month, date);
          datesArray.unshift({
            year: _year,
            month: _month,
            date: date,
            isToday: false,
            isGray: true,
            isLessThan:
              dateTimeStampP < currentDateTimeStamp ||
              dateTimeStampP >= 86400000 * 30 + currentDateTimeStamp, // 用于控制小于当前日期，大于30天不能选择
            isSelected: false,
            tag: ''
          });
        }

        for (let _i = 0; _i < days; _i++) {
          num += 1;
          let _date = _i + 1;
          let dateTimeStamp = +new Date(selectedYear, selectedMonth, _date);
          datesArray.push({
            year: selectedYear,
            month: selectedMonth,
            date: _date,
            isToday: dateTimeStamp === currentDateTimeStamp,
            isGray: false,
            isLessThan:
              dateTimeStamp < currentDateTimeStamp ||
              dateTimeStamp >= 86400000 * 30 + currentDateTimeStamp, // 用于控制小于当前日期，大于30天不能选择
            isSelected: dateTimeStamp === currentDateTimeStamp,
            tag: ''
          });
        }
        let nextDate = 0;
        let daysPerPage = 35;

        if (num > 35) {
          daysPerPage = 42;
        }
        for (let _i2 = 0; _i2 < daysPerPage - days - firstDay; _i2++) {
          // 如果是12月，下月是第二年的1月份
          nextDate += 1;
          let _year2 = selectedYear;
          let _month2 = selectedMonth;
          if (selectedMonth === LAST_MONTH) {
            _year2 = selectedYear + 1;
            _month2 = FIRST_MONTH;
          } else {
            _year2 = selectedYear;
            _month2 = selectedMonth + 1;
          }
          let dateTimeStamN = +new Date(_year2, _month2, nextDate);
          datesArray.push({
            year: _year2,
            month: _month2,
            date: nextDate,
            isToday: false,
            isGray: true,
            isSelected: false,
            isLessThan:
              dateTimeStamN < currentDateTimeStamp ||
              dateTimeStamN >= 86400000 * 30 + currentDateTimeStamp, // 用于控制小于当前日期，大于30天不能选择
            tag: ''
          });
        }
        let blockType = 1;
        for (let _i3 = 0; _i3 < datesArray.length; _i3++) {
          if (this.hasTag(datesArray[_i3])) {
            blockType = 2;
          }
        }

        let dates = [];
        let weekDates = [];
        for (let _i4 = 0; _i4 < datesArray.length; _i4++) {
          weekDates.push(datesArray[_i4]);
          if ((_i4 + 1) % DAYS_PER_ROW === 0) {
            dates.push([].concat(_toConsumableArray(weekDates)));
            weekDates = [];
          }
        }
        this.setData({
          dates: dates,
          blockType: blockType
        });
      },
      hasTag: function hasTag(dateObj) {
        let tagData = this.props.tagData;
        // 去重由调用者处理

        if (tagData.length === 0) {
          dateObj.tag = '';
          return false;
        }
        return tagData.some(function(item) {
          let date = new Date(item.date);
          if (
            dateObj.year === date.getFullYear() &&
            dateObj.month === date.getMonth() &&
            dateObj.date === date.getDate()
          ) {
            dateObj.tag = item.tag;
            dateObj.color = COLOR_MAP[item.tagColor];
            return true;
          } else {
            dateObj.tag = '';
            return false;
          }
        });
      },
      getDateGap: function getDateGap(day1, day2) {
        let date1 = +new Date(
          day1.year,
          prefixNum(day1.month),
          prefixNum(day1.date)
        );
        let date2 = +new Date(
          day2.year,
          prefixNum(day2.month),
          prefixNum(day2.date)
        );
        return (date1 - date2) / (24 * 3600 * 1000);
      },
      makeDate: function makeDate(dateObj) {
        return new Date(
          dateObj.year + '-' + prefixNum(dateObj.month + 1) + '-' + prefixNum(dateObj.date)
        );
      },
      onDateTap: function onDateTap(event) {
        let dates = this.data.dates;
        let _event$currentTarget$ = event.currentTarget.dataset;

        let year = _event$currentTarget$.year;

        let month = _event$currentTarget$.month;

        let date = _event$currentTarget$.date;
        let type = this.props.type;
        if (type === 'range') {
          this.tapTimes += 1;

          if (this.tapTimes % 2 === 0) {
            this.endDate = { year: year, month: month, date: date };
            let dateGap = this.getDateGap(this.startDate, this.endDate);

            if (dateGap > 0) {
              let _ref = [this.endDate, this.startDate];
              this.startDate = _ref[0];
              this.endDate = _ref[1];
            }

            for (let i = 0; i < dates.length; i++) {
              for (let j = 0; j < dates[i].length; j++) {
                let dateObj = dates[i][j];
                dateObj.isStart = false;
                dateObj.isMiddle = false;
                dateObj.isEnd = false;

                let startDateGap = this.getDateGap(dateObj, this.startDate);
                let endDateGap = this.getDateGap(dateObj, this.endDate);
                if (startDateGap > 0 && endDateGap < 0) {
                  if (dateGap !== 0) {
                    if (j === 0) {
                      dateObj.isStart = true;
                    } else if (j === 6) {
                      dateObj.isEnd = true;
                    } else {
                      dateObj.isMiddle = true;
                    }
                  } else {
                    dateObj.isSelected = true;
                  }
                }

                if (
                  this.startDate.year === dateObj.year &&
                  this.startDate.month === dateObj.month &&
                  this.startDate.date === dateObj.date &&
                  dateGap !== 0
                ) {
                  if (j === 6) {
                    dateObj.isSelected = true;
                  } else {
                    dateObj.isStart = true;
                  }
                }

                if (
                  this.endDate.year === dateObj.year &&
                  this.endDate.month === dateObj.month &&
                  this.endDate.date === dateObj.date &&
                  dateGap !== 0
                ) {
                  if (j === 0) {
                    dateObj.isSelected = true;
                  } else {
                    dateObj.isEnd = true;
                  }
                }
              }
            }
            if (this.props.onSelect) {
              this.props.onSelect([
                this.makeDate(this.startDate),
                this.makeDate(this.endDate)
              ]);
            }
          } else {
            for (let _i5 = 0; _i5 < dates.length; _i5++) {
              for (let _j = 0; _j < dates[_i5].length; _j++) {
                let _dateObj = dates[_i5][_j];
                if (
                  _dateObj.year === year &&
                  _dateObj.month === month &&
                  _dateObj.date === date
                ) {
                  _dateObj.isSelected = true;
                  _dateObj.isStart = false;
                  _dateObj.isMiddle = false;
                  _dateObj.isEnd = false;
                } else {
                  _dateObj.isSelected = false;
                  _dateObj.isStart = false;
                  _dateObj.isMiddle = false;
                  _dateObj.isEnd = false;
                }
              }
            }
            this.startDate = { year: year, month: month, date: date };
          }

          this.setData({
            dates: dates
          });
        } else {
          for (let _i6 = 0; _i6 < dates.length; _i6++) {
            for (let _j2 = 0; _j2 < dates[_i6].length; _j2++) {
              let _dateObj2 = dates[_i6][_j2];
              if (_dateObj2.year === year && _dateObj2.month === month && _dateObj2.date === date) {
                _dateObj2.isSelected = true;
              } else {
                _dateObj2.isSelected = false;
              }
            }
          }

          this.setData({
            dates: dates
          });

          if (this.props.onSelect) {
            this.props.onSelect([
              this.makeDate({ year: year, month: month, date: date }),
              undefined
            ]);
          }
        }
      }
    }
  })
);
