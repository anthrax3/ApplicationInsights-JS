﻿/// <reference path="../Contracts/Generated/PageViewPerfData.ts"/>
/// <reference path="./Common/DataSanitizer.ts"/>
/// <reference path="../Util.ts"/>

module Microsoft.ApplicationInsights.Telemetry {
    "use strict";

    export class PageViewPerformance extends AI.PageViewPerfData implements ISerializable {

        public static envelopeType = "Microsoft.ApplicationInsights.PageviewPerformance";
        public static dataType = "PageviewPerformanceData";

        public aiDataContract = {
            ver: true,
            name: false,
            url: false,
            duration: false,
            perfTotal: false,
            networkConnect: false,
            sentRequest: false,
            receivedResponse: false,
            domProcessing: false,
            properties: false,
            measurement: false
        }

        /**
         * Constructs a new instance of the PageEventTelemetry object
         */
        constructor(name: string, url: string, durationMs: number, properties?: any, measurements?: any) {
            super();


                /*
                 * http://www.w3.org/TR/navigation-timing/#processing-model
                 *  |-navigationStart
                 *  |             |-connectEnd
                 *  |             ||-requestStart
                 *  |             ||             |-responseStart
                 *  |             ||             |              |-responseEnd
                 *  |             ||             |              ||-domLoading
                 *  |             ||             |              ||         |-loadEventEnd
                 *  |---network---||---request---|---response---||---dom---|
                 *  |--------------------------total-----------------------|
                 */
            var timing = PageViewPerformance.getPerformanceTiming();
            if (timing) {
                var total = PageViewPerformance.getDuration(timing.navigationStart, timing.loadEventEnd);
                var network = PageViewPerformance.getDuration(timing.navigationStart, timing.connectEnd);
                var request = PageViewPerformance.getDuration(timing.requestStart, timing.responseStart);
                var response = PageViewPerformance.getDuration(timing.responseStart, timing.responseEnd);
                var dom = PageViewPerformance.getDuration(timing.domLoading, timing.loadEventEnd);


                if (total < Math.floor(network) + Math.floor(request) + Math.floor(response) + Math.floor(dom)) {
                    // some browsers may report individual components incorrectly so that the sum of the parts will be bigger than total PLT
                    // in this case, don't report client performance from this page
                    _InternalLogging.throwInternalNonUserActionable(
                        LoggingSeverity.WARNING,
                        "client performance math error:" + total + " < " + network + " + " + request + " + " + response + " + " + dom);

                } else {

                // use timing data for duration if possible
                durationMs = total;

                // convert to timespans
                this.perfTotal = Util.msToTimeSpan(total);
                this.networkConnect = Util.msToTimeSpan(network);
                this.sentRequest = Util.msToTimeSpan(request);
                this.receivedResponse = Util.msToTimeSpan(response);
                this.domProcessing = Util.msToTimeSpan(dom);
            }
            }

            this.url = Common.DataSanitizer.sanitizeUrl(url);
            this.name = Common.DataSanitizer.sanitizeString(name);
            if (!isNaN(durationMs)) {
                this.duration = Util.msToTimeSpan(durationMs);
            }
            this.properties = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeProperties(properties);
            this.measurements = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeMeasurements(measurements);
        }

        public static getPerformanceTiming(): PerformanceTiming {
            if (typeof window != "undefined" && window.performance && window.performance.timing) {
                return window.performance.timing;
            }

            return null;
        }

        /**
         * Returns undefined if not available, true if ready, false otherwise
         */
        public static checkPageLoad() {
            var status = undefined;
            if (typeof window != "undefined" && window.performance && window.performance.timing) {
                var timing = window.performance.timing;
                status = timing.domainLookupStart > 0
                && timing.navigationStart > 0
                && timing.responseStart > 0
                && timing.requestStart > 0
                && timing.loadEventEnd > 0
                && timing.responseEnd > 0
                && timing.connectEnd > 0
                && timing.domLoading > 0;
            }

            return status;
        }

        public static getDuration(start: any, end: any): number {
            var duration = 0;
            if (!(isNaN(start) || isNaN(end) || start === 0 || end === 0)) {
                duration = Math.max(end - start, 0);
            }

            return duration;
        }
    }
}