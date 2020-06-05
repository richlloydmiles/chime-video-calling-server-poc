"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
var DragType_1 = require("./DragType");
var DefaultDragObserver = /** @class */ (function () {
    function DefaultDragObserver(window, element, callback) {
        this.window = window;
        this.element = element;
        var context = { isMouseDown: false };
        this.mouseDownEventListener = DefaultDragObserver.mouseDownEventListener(context, callback, element);
        this.mouseMoveEventListener = DefaultDragObserver.mouseMoveEventListener(context, callback, element);
        this.mouseUpEventListener = DefaultDragObserver.mouseUpEventListener(context, callback, element);
        element.addEventListener('mousedown', this.mouseDownEventListener);
        window.addEventListener('mousemove', this.mouseMoveEventListener);
        window.addEventListener('mouseup', this.mouseUpEventListener);
    }
    DefaultDragObserver.prototype.unobserve = function () {
        this.element.removeEventListener('mousedown', this.mouseDownEventListener);
        this.window.removeEventListener('mousemove', this.mouseMoveEventListener);
        this.window.removeEventListener('mouseup', this.mouseUpEventListener);
    };
    DefaultDragObserver.elementRelativeCoords = function (event, element) {
        return [
            event.clientX - element.getBoundingClientRect().left,
            event.clientY - element.getBoundingClientRect().top,
        ];
    };
    DefaultDragObserver.mouseDownEventListener = function (context, callback, element) { return function (event) {
        context.isMouseDown = true;
        var coords = DefaultDragObserver.elementRelativeCoords(event, element);
        callback((context.last = {
            type: DragType_1.default.BEGIN,
            coords: coords,
            last: context.last,
        }));
    }; };
    DefaultDragObserver.mouseMoveEventListener = function (context, callback, element) { return function (event) {
        if (!context.isMouseDown) {
            return;
        }
        callback((context.last = {
            type: DragType_1.default.DRAG,
            coords: DefaultDragObserver.elementRelativeCoords(event, element),
            last: context.last,
        }));
    }; };
    DefaultDragObserver.mouseUpEventListener = function (context, callback, element) { return function (event) {
        if (!context.isMouseDown) {
            return;
        }
        context.isMouseDown = false;
        callback((context.last = {
            type: DragType_1.default.END,
            coords: DefaultDragObserver.elementRelativeCoords(event, element),
            last: context.last,
        }));
    }; };
    return DefaultDragObserver;
}());
exports.default = DefaultDragObserver;
//# sourceMappingURL=DefaultDragObserver.js.map