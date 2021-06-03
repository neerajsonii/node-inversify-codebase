import * as moment from 'moment';
import MomentTimeZone from 'moment-timezone';

export interface ITimeFromTo {
    FromDate: string;
    ToDate: string;
}

export interface ITimeSpan {
    TotalSeconds: number;
    TotalMinutes: number;
    TotalHours: number;
    TotalDays: number;
}

class TimeZoneClass {
    public currentDateTime(timeZone: string): string {
        return MomentTimeZone.tz(timeZone).format(Clock.getFormats().DateTime);
    }

    public currentTime(timeZone: string): string {
        return MomentTimeZone
            .tz(timeZone)
            .format(Clock.getFormats().TimeWithoutSeconds);
    }

    public currentDate(timeZone: string): string {
        return MomentTimeZone.tz(timeZone).format(Clock.getFormats().DateOnly);
    }

    public date(timeZone: string, date: any): string {
        return MomentTimeZone(date)
            .tz(timeZone)
            .format(Clock.getFormats().DateOnly);
    }

    public timeOnly(timeZone: string, date: any): string {
        return MomentTimeZone(date)
            .tz(timeZone)
            .format(Clock.getFormats().TimeWithoutSeconds);
    }

    public timeOnlyWithSecond(timeZone: string, date: any): string {
        return MomentTimeZone(date)
            .tz(timeZone)
            .format(Clock.getFormats().TimeOnly);
    }

    public weekdayName(
        timeZone: string,
        date: any,
        shortFormat = true
    ): string {
        return MomentTimeZone(date)
            .tz(timeZone)
            .format(shortFormat ? 'ddd' : 'dddd');
    }

    public getUtcTimeForAGivenDateString(
        dateString: any,
        timeZone: string
    ): Date {
        return MomentTimeZone.tz(dateString, timeZone).toDate();
    }

    public utcForCurrentDate(timeZone: string): Date {
        return this.getUtcTimeForAGivenDateString(
            this.currentDate(timeZone),
            timeZone
        );
    }

    public convertToGiveTZAndThenConvertToUTC(
        date: any,
        timeZone: string
    ): Date {
        const dateConvertToRequestedTZ = MomentTimeZone.tz(date, timeZone);
        return MomentTimeZone.utc(dateConvertToRequestedTZ).toDate();
    }

    public currentDateInTZConvertedToUTCRaw(timeZoneAlias: string): moment.Moment {
        const startTimeOfTodayInTZ = MomentTimeZone
            .tz(timeZoneAlias)
            .hours(0)
            .minutes(0)
            .seconds(0)
            .milliseconds(0);
        return startTimeOfTodayInTZ.utc();
    }

    public convertToTZ(dt: any, timeZoneAlias: string) {
        const convertedDT = MomentTimeZone(dt).tz(timeZoneAlias);

        return convertedDT.format(Clock.getFormats().DateTime);
    }

    public convertToTZDate(dt: any, timeZoneAlias: string) {
        const convertedDT = MomentTimeZone(dt).tz(timeZoneAlias);

        return convertedDT.format(Clock.getFormats().DateOnly);
    }
    public convertToTZClientDate(dt: any, timeZoneAlias: string) {
        const convertedDT = MomentTimeZone(dt).tz(timeZoneAlias);

        return convertedDT.format(Clock.getFormats().ClientDateOnly);
    }
    public convertToTZClientDateWithWeekDay(dt: any, timeZoneAlias: string) {
        const convertedDT = MomentTimeZone(dt).tz(timeZoneAlias);

        return convertedDT.format(Clock.getFormats().ClientDateOnlyWithWeekDay);
    }

    public convertToTZClient(dt: any, timeZoneAlias: string) {
        const convertedDT = MomentTimeZone(dt).tz(timeZoneAlias);

        return convertedDT.format(Clock.getFormats().ClientDateTime);
    }

    public convertToTZAndReturnTimeWithMeridian(
        dt: any,
        timeZoneAlias: string
    ): string {
        const convertedDT = MomentTimeZone(dt).tz(timeZoneAlias);

        return convertedDT.format(Clock.getFormats().TimeFormatWithMeridian);
    }

    public convertToDateTimeFormatWithMeridianAndWeekday(
        dt: any,
        timeZoneAlias: string
    ): string {
        const convertedDT = MomentTimeZone(dt).tz(timeZoneAlias);
        return convertedDT.format(Clock.getFormats().dateTimeFormatWithMeridianAndWeekday);
    }

    public convertToGiveTZAndThenConvertToUTCAndReturnStartOREndDate(
        date: any,
        timeZone: string,
        isStartDate: boolean
    ): Date {
        const dateConvertToRequestedTZ = MomentTimeZone.tz(date, timeZone);

        if (isStartDate) {
            return dateConvertToRequestedTZ.startOf('date').toDate();
        } else {
            return dateConvertToRequestedTZ.endOf('date').toDate();
        }
    }

}

/* tslint:disable */
export class Clock {
    public static TimeZone: TimeZoneClass = new TimeZoneClass();

    public static getFormats() {
        return {
            ClientDateOnly: Clock.clientDateFormat,
            ClientDateOnlyWithWeekDay: Clock.clientDateFormatWithWeekDay,
            ClientDateTime: Clock.clientDateTimeFormat,
            DateOnly: Clock.dateFormat,
            DateTime: Clock.dateTimeFormat,
            TimeFormatWithMeridian: Clock.timeFormatWithMeridian,
            TimeOnly: Clock.timeFormat,
            TimeWithoutSeconds: "HH:mm",
            FullDayFormat: Clock.fullDayFormat,
            dateTimeFormatWithMeridianAndWeekday: Clock.dateTimeFormatWithMeridianAndWeekday
        };
    }

    /* ************ New Functions from nemt.admin ************* */

    public static ToDate(dateString: string | Date): Date {
        return new Date(dateString);
    }
    
    public static toUnixTimeStamp(): number {
        return moment.now();
    }

    public static AddDays(date: Date | string, numberOfDays: number): Date {
        return MomentTimeZone(date)
            .add(numberOfDays, "d")
            .toDate();
    }

    public static AddHours(date: Date | string, numberOfHours: number): Date {
        return MomentTimeZone(date)
            .add(numberOfHours, "h")
            .toDate();
    }
    public static SubtractHours(date: Date | string, numberOfHours: number): Date {
        return MomentTimeZone(date)
            .subtract(numberOfHours, "h")
            .toDate();
    }

    public static AddSeconds(
        date: Date | string,
        numberOfSeconds: number
    ): Date {
        return MomentTimeZone(date)
            .add(numberOfSeconds, "s")
            .toDate();
    }

    public static AddMinutes(
        date: Date | string,
        numberOfMinutes: number
    ): Date {
        return MomentTimeZone(date)
            .add(numberOfMinutes, "m")
            .toDate();
    }

    public static ToShortDateString(date: Date): string {
        return Clock.ToString(date, Clock.dateFormat);
    }

    public static ToLocalDateTimeString(date: Date): string {
        return Clock.ToString(date, Clock.dateTimeFormat);
    }

    public static ToLocalTimeString(date: Date): string {
        return Clock.ToString(date, this.timeFormatWithMeridian);
    }

    public static ToString(
        date: Date | string,
        format: string = Clock.dateFormat
    ): string {
        return MomentTimeZone(date).format(format);
    }

    public static ToUtcString(date: Date | string): string {
        return Clock.ToDate(date).toISOString();
    }

    public static Utc(): Date {
        return MomentTimeZone()
            .utc()
            .toDate();
    }

    public static Now(): Date {
        return MomentTimeZone().toDate();
    }

    public static GetWeekday(date: Date | string): string {
        return Clock.ToString(date, "dddd");
    }

    public static GetWeekdayString(date: Date | string): string {
        return MomentTimeZone(date).format("dddd");
    }

    public static isAfter(date1: any, date2: any) {
        const m1 = MomentTimeZone(date1);
        const m2 = MomentTimeZone(date2);

        return m1.isAfter(m2);
    }

    public static isEquals(date1: any, date2: any) {
        const m1 = MomentTimeZone(date1);
        const m2 = MomentTimeZone(date2);

        return m1.isSame(m2);
    }

    public static toUnix(date: any) {
        return MomentTimeZone(date).unix();
    }

    public static getStartAndEndDateTime(date: Date) {
        const tmp = { StartDT: null, EndDT: null };
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const startDate: any = Clock.ToShortDateString(
            new Date(year, month, day)
        );
        const endDate: any = Clock.ToShortDateString(
            Clock.AddDays(startDate, 1)
        );
        tmp.StartDT = startDate;
        tmp.EndDT = endDate;

        return tmp;
    }

    public static getStartOrEndDate(date: Date, isStartDate: boolean) {
        const formattedDate = new Date(date);
        if (isStartDate) {
            formattedDate.setHours(0);
            formattedDate.setMinutes(0);
        } else {
            formattedDate.setHours(23);
            formattedDate.setMinutes(59);
        }

        return formattedDate;
    }

    public static getStartOrEndWithSeconds(date: Date, isStartDate: boolean) {
        const formattedDate = new Date(date);
        if (isStartDate) {
            formattedDate.setSeconds(0);
        } else {
            formattedDate.setSeconds(59);
        }

        return formattedDate;
    }

    public static getDateObjTillStartOfTheHour(date: Date): Date {
        date = new Date(date);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    }

    public static setOnlyDate(
        date: any,
        year: any,
        month: any,
        dateOfMonth: any
    ): moment.Moment {
        const d = MomentTimeZone(date);
        if (!isNaN(year)) {
            d.year(year);
        }

        if (!isNaN(month)) {
            d.month(month);
        }

        if (!isNaN(dateOfMonth)) {
            d.date(dateOfMonth);
        }
        return d;
    }

    public static concatDateTime(date: any, time: any) {
        let timeFormat = "";

        if (typeof date !== "string") {
            date = MomentTimeZone(new Date(date)).format(Clock.dateFormat);
        }

        if (
            time.toLowerCase().includes("am") ||
            time.toLowerCase().includes("pm")
        ) {
            timeFormat = "h:mm A";
        } else {
            timeFormat = "HH:mm";
        }

        time = MomentTimeZone(time, [timeFormat]).format(Clock.timeFormat);

        return MomentTimeZone(date + " " + time).format();
    }

    public static secondsToHourMinuteFormat(inputSeconds: number): string {
        let hours: any = Math.floor(inputSeconds / 3600);
        let minutes: any = Math.floor((inputSeconds - hours * 3600) / 60);
        let seconds: any = inputSeconds - hours * 3600 - minutes * 60;

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return hours + "h " + minutes + "m";
    }

    public static secondsToHourMinuteSecondFormat(
        inputSeconds: number
    ): string {
        let hours: any = Math.floor(inputSeconds / 3600);
        let minutes: any = Math.floor((inputSeconds - hours * 3600) / 60);
        let seconds: any = inputSeconds - hours * 3600 - minutes * 60;

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return hours + "h " + minutes + "m " + seconds + "s";
    }

    public static secondsToHourMinuteFormatForNotification(
        seconds: number
    ): string {
        let durationString = "";
        const duration = MomentTimeZone.duration(seconds * 1000);
        const hours = duration.hours();
        const minutes = duration.minutes();

        if (hours) {
            durationString += hours.toString() + " hrs. ";
        }

        if (minutes) {
            durationString += minutes.toString() + " min.";
        }

        return durationString;
    }

    public static getUTCString(date: any): string | null {
        if (!date) {
            return null;
        }

        return MomentTimeZone.utc(date).format();
    }

    public static isBetween(
        tsToCheck: Date,
        fromDate: Date,
        toDate: Date
    ): boolean {
        const m = MomentTimeZone(tsToCheck);
        return m.isBetween(fromDate, toDate);
    }

    public static dateTimeWithHourOnly(dateObj: string): any {
        const hour = Clock.ToString(dateObj, Clock.timeFormatWithMeridian);

        return hour.replace(hour.substr(hour.indexOf(":"), 3), "");
    }

    public static getHoursFromSeconds(duration: number): number {
        return MomentTimeZone.duration(duration * 1000).asHours();
    }

    public static getDayOfWeek(date: any): any {
        return MomentTimeZone(date).day();
    }

    public static getClientDateFormattedDateString(dateString: string): string {
        let parsedDate: Date;
        let date;
        let month;
        let year;

        if (dateString == null || dateString.length < 1) {
            return "";
        }

        try {
            parsedDate = new Date(Date.parse(dateString));
        } catch (e) {
            return "";
        }

        if (parsedDate == null) {
            return "";
        }

        date = parsedDate.getDate();
        month = parsedDate.getMonth() + 1;
        year = parsedDate.getFullYear();

        if (date < 10) {
            date = "0" + date;
        }

        if (month < 10) {
            month = "0" + month;
        }

        return month + "/" + date + "/" + year;
    }

    private static dateFormat: string = "YYYY-MM-DD";
    private static clientDateFormat: string = "MM/DD/YYYY";
    private static clientDateFormatWithWeekDay: string = "dddd, MMMM DD YYYY";
    private static timeFormat: string = "HH:mm:ss";
    private static timeFormatWithMeridian: string = "h:mm A";
    private static dateTimeFormat: string =
        Clock.dateFormat + " " + Clock.timeFormat;
    private static clientDateTimeFormat: string =
        Clock.clientDateFormat + " " + Clock.timeFormatWithMeridian;
    private static fullDayFormat: string = "dddd";
    private static dateTimeFormatWithMeridianAndWeekday: string = "h:mm a, dddd, MMMM DD YYYY";
}
