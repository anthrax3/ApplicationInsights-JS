// THIS FILE WAS AUTOGENERATED
/// <reference path="../../External/qunit.d.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/DataPoint.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/MetricData.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/RemoteDependencyData.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/RequestData.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/StackFrame.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/ExceptionDetails.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/ExceptionData.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/MessageData.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/EventData.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/PageViewData.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/PageViewPerfData.ts" />
/// <reference path="../../../JavaScriptSDK/Contracts/Generated/AjaxCallData.ts" />
QUnit.test("Test property MessageData.ver was created and default is set", function () {
    var temp = new AI.MessageData();
    QUnit.ok(temp.ver !== null, "MessageData.ver == null");
    QUnit.ok(temp.ver === 2, "Issue with MessageData.ver");
});

QUnit.test("Test property MessageData.message was created and default is set", function () {
    var temp = new AI.MessageData();
    QUnit.ok(temp.message !== null, "MessageData.message == null");
});

QUnit.test("Test property MessageData.severityLevel was created and default is set", function () {
    var temp = new AI.MessageData();
    QUnit.ok(temp.severityLevel !== null, "MessageData.severityLevel == null");
});

QUnit.test("Test property MessageData.properties was created and default is set", function () {
    var temp = new AI.MessageData();
    QUnit.ok(temp.properties !== null, "MessageData.properties == null");
});

