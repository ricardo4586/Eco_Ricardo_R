(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
;
;
;
function connect(param) {
    var addMessageListener = param.addMessageListener, sendMessage = param.sendMessage, _param_onUpdateError = param.onUpdateError, onUpdateError = _param_onUpdateError === void 0 ? console.error : _param_onUpdateError;
    addMessageListener(function(msg) {
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(var i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    var queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: function(param) {
            var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(param, 2), chunkPath = _param[0], callback = _param[1];
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = queued[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], callback = _step_value[1];
                subscribeToChunkUpdate(chunkPath, sendMessage, callback);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
}
var updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
        type: 'turbopack-subscribe'
    }, resource));
    return function() {
        sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
            type: 'turbopack-unsubscribe'
        }, resource));
    };
}
function handleSocketConnected(sendMessage) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = updateCallbackSets.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key = _step.value;
            subscribeToUpdates(sendMessage, JSON.parse(key));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
// we aggregate all pending updates until the issues are resolved
var chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    var key = resourceKey(msg.resource);
    var aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunkListsWithPendingUpdates.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var msg = _step.value;
            triggerUpdate(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    var chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    var merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            var update = updateA.merged[0];
            for(var i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(var i1 = 0; i1 < updateB.merged.length; i1++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i1]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks: chunks,
        merged: merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1["return"] != null) {
                _iterator1["return"]();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    var entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    var chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries: entries,
        chunks: chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, entriesA, entriesB);
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1["return"] != null) {
                _iterator1["return"]();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        var added = [];
        var deleted = [];
        var _updateA_modules;
        var deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var _updateB_modules;
        var addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = addedModules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var moduleId = _step.value;
                if (!deletedModules.has(moduleId)) {
                    added.push(moduleId);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = deletedModules[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var moduleId1 = _step1.value;
                if (!addedModules.has(moduleId1)) {
                    deleted.push(moduleId1);
                }
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1["return"] != null) {
                    _iterator1["return"]();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added: added,
            deleted: deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added;
        var added1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : [])));
        var _updateA_deleted, _updateB_deleted;
        var deleted1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : [])));
        if (updateB.added != null) {
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
            try {
                for(var _iterator2 = updateB.added[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                    var moduleId2 = _step2.value;
                    deleted1["delete"](moduleId2);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                        _iterator2["return"]();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        if (updateB.deleted != null) {
            var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
            try {
                for(var _iterator3 = updateB.deleted[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                    var moduleId3 = _step3.value;
                    added1["delete"](moduleId3);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                        _iterator3["return"]();
                    }
                } finally{
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
        return {
            type: 'partial',
            added: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(added1),
            deleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(deleted1)
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1;
        var modules = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : [])));
        var _updateB_deleted1;
        var _iteratorNormalCompletion4 = true, _didIteratorError4 = false, _iteratorError4 = undefined;
        try {
            for(var _iterator4 = ((_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : [])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true){
                var moduleId4 = _step4.value;
                modules["delete"](moduleId4);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                    _iterator4["return"]();
                }
            } finally{
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
        return {
            type: 'added',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules)
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        var modules1 = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            var _iteratorNormalCompletion5 = true, _didIteratorError5 = false, _iteratorError5 = undefined;
            try {
                for(var _iterator5 = updateA.added[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true){
                    var moduleId5 = _step5.value;
                    modules1["delete"](moduleId5);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                        _iterator5["return"]();
                    }
                } finally{
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
        return {
            type: 'deleted',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules1)
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
var CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    var aI = list.indexOf(a) + 1 || list.length;
    var bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
var chunksWithIssues = new Map();
function emitIssues() {
    var issues = [];
    var deduplicationSet = new Set();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunksWithIssues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), _ = _step_value[0], chunkIssues = _step_value[1];
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = chunkIssues[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var chunkIssue = _step1.value;
                    if (deduplicationSet.has(chunkIssue.formatted)) continue;
                    issues.push(chunkIssue);
                    deduplicationSet.add(chunkIssue.formatted);
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1["return"] != null) {
                        _iterator1["return"]();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    var key = resourceKey(msg.resource);
    var hasCriticalIssues = false;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = msg.issues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var issue = _step.value;
            if (CRITICAL.includes(issue.severity)) {
                hasCriticalIssues = true;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues["delete"](key);
    }
    emitIssues();
    return hasCriticalIssues;
}
var SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
var CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort(function(a, b) {
        var first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
var hooks = {
    beforeRefresh: function() {},
    refresh: function() {},
    buildOk: function() {},
    issues: function(_issues) {}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            var runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    var key = resourceKey(resource);
    var callbackSet;
    var existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return function() {
        callbackSet.callbacks["delete"](callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets["delete"](key);
        }
    };
}
function triggerUpdate(msg) {
    var key = resourceKey(msg.resource);
    var callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = callbackSet.callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var callback = _step.value;
            callback(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets["delete"](key);
    }
}
}),
"[project]/ecommerce-project/frontend/context/AuthContext.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// context/AuthContext.jsx - FUNCIÓN LOGIN CORREGIDA
__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/next/navigation.js [client] (ecmascript)");
;
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
var AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])();
var AuthProvider = function(param) {
    var children = param.children;
    _s();
    var router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), authToken = _useState[0], setAuthToken = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), user = _useState1[0], setUser = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true), 2), isCheckingAuth = _useState2[0], setIsCheckingAuth = _useState2[1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": function() {
            var token = localStorage.getItem('authToken');
            var userData = localStorage.getItem('userData');
            if (token && userData) {
                setAuthToken(token);
                setUser(JSON.parse(userData));
            }
            setIsCheckingAuth(false);
        }
    }["AuthProvider.useEffect"], []);
    var login = function(email, password) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var API_BASE_URL, response, data, token, rol, error;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            3,
                            ,
                            4
                        ]);
                        API_BASE_URL = 'http://localhost:3000/api';
                        return [
                            4,
                            fetch("".concat(API_BASE_URL, "/login"), {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email: email,
                                    password: password
                                })
                            })
                        ];
                    case 1:
                        response = _state.sent();
                        return [
                            4,
                            response.json()
                        ];
                    case 2:
                        data = _state.sent();
                        if (response.ok) {
                            token = data.token, rol = data.rol;
                            // Persistencia en localStorage
                            localStorage.setItem('authToken', token);
                            localStorage.setItem('userData', JSON.stringify({
                                email: email,
                                role: rol
                            }));
                            setAuthToken(token);
                            setUser({
                                email: email,
                                role: rol
                            });
                            // Redirigir al usuario
                            if (rol === 'admin') {
                                router.push('/admin/dashboard');
                            } else {
                                router.push('/');
                            }
                            // ✅ RETORNAR EL OBJETO ESPERADO
                            return [
                                2,
                                {
                                    success: true,
                                    message: '¡Inicio de sesión exitoso!'
                                }
                            ];
                        } else {
                            // ✅ RETORNAR OBJETO INCLUSO EN ERROR
                            return [
                                2,
                                {
                                    success: false,
                                    message: data.message || 'Credenciales incorrectas.'
                                }
                            ];
                        }
                        //TURBOPACK unreachable
                        ;
                    case 3:
                        error = _state.sent();
                        console.error("Error durante el login:", error);
                        // ✅ RETORNAR OBJETO EN CASO DE EXCEPCIÓN
                        return [
                            2,
                            {
                                success: false,
                                message: 'Error de conexión con el servidor.'
                            }
                        ];
                    case 4:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    var logout = function() {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        router.push('/login');
    };
    var value = {
        authToken: authToken,
        user: user,
        login: login,
        logout: logout,
        isLoggedIn: !!authToken,
        isAdmin: (user === null || user === void 0 ? void 0 : user.role) === 'admin'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/ecommerce-project/frontend/context/AuthContext.jsx",
        lineNumber: 96,
        columnNumber: 5
    }, _this);
};
_s(AuthProvider, "ISsuE8MLSmADbrwMSMC7p1mC2Hg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
var useAuth = function() {
    _s1();
    var context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/admin/dashboard.jsx - CÓDIGO CORREGIDO
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$context$2f$AuthContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/context/AuthContext.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ecommerce-project/frontend/node_modules/next/navigation.js [client] (ecmascript)");
;
;
;
;
var _this = ("TURBOPACK compile-time value", void 0);
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
var Dashboard = function() {
    _s();
    var _useAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$context$2f$AuthContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["useAuth"])(), isAdmin = _useAuth.isAdmin, isCheckingAuth = _useAuth.isCheckingAuth, authToken = _useAuth.authToken;
    var router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), stats = _useState[0], setStats = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), products = _useState1[0], setProducts = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true), 2), loading = _useState2[0], setLoading = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), error = _useState3[0], setError = _useState3[1];
    // Redirigir si no es admin
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": function() {
            if (!isCheckingAuth && !isAdmin) {
                router.push('/login');
            }
        }
    }["Dashboard.useEffect"], [
        isAdmin,
        isCheckingAuth,
        router
    ]);
    // Cargar datos del dashboard
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": function() {
            if (!isAdmin) return;
            var fetchDashboardData = {
                "Dashboard.useEffect.fetchDashboardData": function() {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                        "Dashboard.useEffect.fetchDashboardData": function() {
                            var productsData, productsResponse, data, productError, statsData, statsResponse, data1, statsError, err, exampleProducts;
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                                "Dashboard.useEffect.fetchDashboardData": function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            _state.trys.push([
                                                0,
                                                15,
                                                16,
                                                17
                                            ]);
                                            setLoading(true);
                                            setError('');
                                            // Intentar cargar productos primero (endpoint más común)
                                            productsData = [];
                                            _state.label = 1;
                                        case 1:
                                            _state.trys.push([
                                                1,
                                                6,
                                                ,
                                                7
                                            ]);
                                            return [
                                                4,
                                                fetch('http://localhost:3001/api/productos', {
                                                    headers: authToken ? {
                                                        Authorization: "Bearer ".concat(authToken)
                                                    } : {}
                                                })
                                            ];
                                        case 2:
                                            productsResponse = _state.sent();
                                            if (!productsResponse.ok) return [
                                                3,
                                                4
                                            ];
                                            return [
                                                4,
                                                productsResponse.json()
                                            ];
                                        case 3:
                                            data = _state.sent();
                                            productsData = data.data || data || [];
                                            return [
                                                3,
                                                5
                                            ];
                                        case 4:
                                            console.warn('No se pudieron cargar los productos:', productsResponse.status);
                                            _state.label = 5;
                                        case 5:
                                            return [
                                                3,
                                                7
                                            ];
                                        case 6:
                                            productError = _state.sent();
                                            console.warn('Error cargando productos:', productError);
                                            return [
                                                3,
                                                7
                                            ];
                                        case 7:
                                            setProducts(productsData);
                                            // Intentar cargar estadísticas (puede que no exista el endpoint)
                                            statsData = null;
                                            _state.label = 8;
                                        case 8:
                                            _state.trys.push([
                                                8,
                                                13,
                                                ,
                                                14
                                            ]);
                                            return [
                                                4,
                                                fetch('http://localhost:3001/api/estadisticas/top-productos', {
                                                    headers: authToken ? {
                                                        Authorization: "Bearer ".concat(authToken)
                                                    } : {}
                                                })
                                            ];
                                        case 9:
                                            statsResponse = _state.sent();
                                            if (!statsResponse.ok) return [
                                                3,
                                                11
                                            ];
                                            return [
                                                4,
                                                statsResponse.json()
                                            ];
                                        case 10:
                                            data1 = _state.sent();
                                            statsData = data1.data || data1 || [];
                                            return [
                                                3,
                                                12
                                            ];
                                        case 11:
                                            console.warn('Endpoint de estadísticas no disponible:', statsResponse.status);
                                            // Crear estadísticas de ejemplo basadas en los productos
                                            statsData = productsData.slice(0, 5).map({
                                                "Dashboard.useEffect.fetchDashboardData": function(product, index) {
                                                    return {
                                                        product: product.nombre,
                                                        sales: Math.floor(Math.random() * 100) + 10
                                                    };
                                                }
                                            }["Dashboard.useEffect.fetchDashboardData"]);
                                            _state.label = 12;
                                        case 12:
                                            return [
                                                3,
                                                14
                                            ];
                                        case 13:
                                            statsError = _state.sent();
                                            console.warn('Error cargando estadísticas:', statsError);
                                            // Crear estadísticas de ejemplo si el endpoint falla
                                            statsData = productsData.slice(0, 5).map({
                                                "Dashboard.useEffect.fetchDashboardData": function(product, index) {
                                                    return {
                                                        product: product.nombre,
                                                        sales: Math.floor(Math.random() * 100) + 10
                                                    };
                                                }
                                            }["Dashboard.useEffect.fetchDashboardData"]);
                                            return [
                                                3,
                                                14
                                            ];
                                        case 14:
                                            setStats(statsData);
                                            return [
                                                3,
                                                17
                                            ];
                                        case 15:
                                            err = _state.sent();
                                            console.error('Error loading dashboard:', err);
                                            setError(err.message || 'Error al cargar el dashboard');
                                            // Si hay error, mostrar datos de ejemplo
                                            exampleProducts = [
                                                {
                                                    id: 1,
                                                    nombre: "Juguete Educativo para Bebé",
                                                    barcode: "1234567890123",
                                                    id_numerico: "001",
                                                    precio: 29.99,
                                                    stock: 15
                                                },
                                                {
                                                    id: 2,
                                                    nombre: "Biberón Anticólico",
                                                    barcode: "1234567890124",
                                                    id_numerico: "002",
                                                    precio: 12.50,
                                                    stock: 8
                                                },
                                                {
                                                    id: 3,
                                                    nombre: "Sonajero Musical",
                                                    barcode: "1234567890125",
                                                    id_numerico: "003",
                                                    precio: 8.99,
                                                    stock: 25
                                                }
                                            ];
                                            setProducts(exampleProducts);
                                            setStats([
                                                {
                                                    product: "Juguete Educativo para Bebé",
                                                    sales: 45
                                                },
                                                {
                                                    product: "Biberón Anticólico",
                                                    sales: 32
                                                },
                                                {
                                                    product: "Sonajero Musical",
                                                    sales: 28
                                                }
                                            ]);
                                            return [
                                                3,
                                                17
                                            ];
                                        case 16:
                                            setLoading(false);
                                            return [
                                                7
                                            ];
                                        case 17:
                                            return [
                                                2
                                            ];
                                    }
                                }
                            }["Dashboard.useEffect.fetchDashboardData"]);
                        }
                    }["Dashboard.useEffect.fetchDashboardData"])();
                }
            }["Dashboard.useEffect.fetchDashboardData"];
            fetchDashboardData();
        }
    }["Dashboard.useEffect"], [
        isAdmin,
        authToken
    ]);
    if (isCheckingAuth) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
                }, void 0, false, {
                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                    lineNumber: 134,
                    columnNumber: 17
                }, _this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ml-3 text-gray-600",
                    children: "Verificando autenticación..."
                }, void 0, false, {
                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                    lineNumber: 135,
                    columnNumber: 17
                }, _this)
            ]
        }, void 0, true, {
            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
            lineNumber: 133,
            columnNumber: 13
        }, _this);
    }
    if (!isAdmin) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-red-600 mb-4",
                        children: "Acceso Denegado"
                    }, void 0, false, {
                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                        lineNumber: 144,
                        columnNumber: 21
                    }, _this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "No tienes permisos para acceder al panel de administración."
                    }, void 0, false, {
                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                        lineNumber: 145,
                        columnNumber: 21
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                lineNumber: 143,
                columnNumber: 17
            }, _this)
        }, void 0, false, {
            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
            lineNumber: 142,
            columnNumber: 13
        }, _this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white shadow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-gray-900",
                                        children: "Panel de Administración"
                                    }, void 0, false, {
                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                        lineNumber: 158,
                                        columnNumber: 29
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 mt-1",
                                        children: "Gestión de productos y estadísticas"
                                    }, void 0, false, {
                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                        lineNumber: 159,
                                        columnNumber: 29
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                lineNumber: 157,
                                columnNumber: 25
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: function() {
                                            return router.push('/');
                                        },
                                        className: "bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition",
                                        children: "Volver a la Tienda"
                                    }, void 0, false, {
                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                        lineNumber: 162,
                                        columnNumber: 29
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: function() {
                                            return router.push('/admin/productos');
                                        },
                                        className: "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition",
                                        children: "Gestionar Productos"
                                    }, void 0, false, {
                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                        lineNumber: 168,
                                        columnNumber: 29
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                lineNumber: 161,
                                columnNumber: 25
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                        lineNumber: 156,
                        columnNumber: 21
                    }, _this)
                }, void 0, false, {
                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                    lineNumber: 155,
                    columnNumber: 17
                }, _this)
            }, void 0, false, {
                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                lineNumber: 154,
                columnNumber: 13
            }, _this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8",
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-yellow-400",
                                        children: "⚠️"
                                    }, void 0, false, {
                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                        lineNumber: 185,
                                        columnNumber: 33
                                    }, _this)
                                }, void 0, false, {
                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                    lineNumber: 184,
                                    columnNumber: 29
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ml-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-medium text-yellow-800",
                                            children: "Información del sistema"
                                        }, void 0, false, {
                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                            lineNumber: 188,
                                            columnNumber: 33
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 text-sm text-yellow-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: error
                                                }, void 0, false, {
                                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                    lineNumber: 192,
                                                    columnNumber: 37
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1",
                                                    children: "Se están mostrando datos de ejemplo para demostración."
                                                }, void 0, false, {
                                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                    lineNumber: 193,
                                                    columnNumber: 37
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                            lineNumber: 191,
                                            columnNumber: 33
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                    lineNumber: 187,
                                    columnNumber: 29
                                }, _this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                            lineNumber: 183,
                            columnNumber: 25
                        }, _this)
                    }, void 0, false, {
                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                        lineNumber: 182,
                        columnNumber: 21
                    }, _this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
                            }, void 0, false, {
                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                lineNumber: 202,
                                columnNumber: 25
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-gray-600",
                                children: "Cargando dashboard..."
                            }, void 0, false, {
                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                lineNumber: 203,
                                columnNumber: 25
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                        lineNumber: 201,
                        columnNumber: 21
                    }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50 border border-blue-200 rounded-lg p-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: "📱"
                                            }, void 0, false, {
                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                lineNumber: 211,
                                                columnNumber: 37
                                            }, _this)
                                        }, void 0, false, {
                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                            lineNumber: 210,
                                            columnNumber: 33
                                        }, _this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-semibold text-blue-800",
                                                    children: "Listo para Flutter"
                                                }, void 0, false, {
                                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                    lineNumber: 214,
                                                    columnNumber: 37
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-blue-700 mt-1",
                                                    children: "Los productos tienen códigos de barras EAN-13 para escanear."
                                                }, void 0, false, {
                                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                    lineNumber: 215,
                                                    columnNumber: 37
                                                }, _this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 text-sm text-blue-600",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Backend ejecutándose en:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                            lineNumber: 219,
                                                            columnNumber: 41
                                                        }, _this),
                                                        " http://localhost:3001"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                    lineNumber: 218,
                                                    columnNumber: 37
                                                }, _this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                            lineNumber: 213,
                                            columnNumber: 33
                                        }, _this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                    lineNumber: 209,
                                    columnNumber: 29
                                }, _this)
                            }, void 0, false, {
                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                lineNumber: 208,
                                columnNumber: 25
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-lg shadow p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-xl font-semibold",
                                                        children: "Productos Más Vendidos"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                        lineNumber: 229,
                                                        columnNumber: 37
                                                    }, _this),
                                                    !stats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium",
                                                        children: "Datos de ejemplo"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                        lineNumber: 231,
                                                        columnNumber: 41
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                lineNumber: 228,
                                                columnNumber: 33
                                            }, _this),
                                            stats && stats.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: stats.map(function(item, index) {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center p-3 bg-gray-50 rounded",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium",
                                                                children: item.product
                                                            }, void 0, false, {
                                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                lineNumber: 240,
                                                                columnNumber: 49
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold",
                                                                children: [
                                                                    item.sales,
                                                                    " ventas"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                lineNumber: 241,
                                                                columnNumber: 49
                                                            }, _this)
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                        lineNumber: 239,
                                                        columnNumber: 45
                                                    }, _this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                lineNumber: 237,
                                                columnNumber: 37
                                            }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-center py-4",
                                                children: "No hay datos de estadísticas disponibles"
                                            }, void 0, false, {
                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                lineNumber: 248,
                                                columnNumber: 37
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                        lineNumber: 227,
                                        columnNumber: 29
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-lg shadow p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-xl font-semibold",
                                                        children: "Productos en Inventario"
                                                    }, void 0, false, {
                                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                        lineNumber: 257,
                                                        columnNumber: 37
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium",
                                                                children: [
                                                                    products.length,
                                                                    " productos"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                lineNumber: 259,
                                                                columnNumber: 41
                                                            }, _this),
                                                            products.length > 0 && products[0].id === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium",
                                                                children: "Datos de ejemplo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                lineNumber: 263,
                                                                columnNumber: 45
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                        lineNumber: 258,
                                                        columnNumber: 37
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                lineNumber: 256,
                                                columnNumber: 33
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: products.length > 0 ? products.map(function(product) {
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "font-semibold text-gray-800",
                                                                            children: product.nombre
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                            lineNumber: 276,
                                                                            columnNumber: 57
                                                                        }, _this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2 space-y-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center text-sm text-gray-600",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-medium mr-2",
                                                                                            children: "Código EAN-13:"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                                            lineNumber: 279,
                                                                                            columnNumber: 65
                                                                                        }, _this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                                            className: "bg-gray-100 px-2 py-1 rounded font-mono text-xs",
                                                                                            children: product.barcode
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                                            lineNumber: 280,
                                                                                            columnNumber: 65
                                                                                        }, _this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                                    lineNumber: 278,
                                                                                    columnNumber: 61
                                                                                }, _this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center text-sm text-gray-600",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-medium mr-2",
                                                                                            children: "ID:"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                                            lineNumber: 285,
                                                                                            columnNumber: 65
                                                                                        }, _this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-mono",
                                                                                            children: product.id_numerico
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                                            lineNumber: 286,
                                                                                            columnNumber: 65
                                                                                        }, _this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                                    lineNumber: 284,
                                                                                    columnNumber: 61
                                                                                }, _this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                            lineNumber: 277,
                                                                            columnNumber: 57
                                                                        }, _this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                    lineNumber: 275,
                                                                    columnNumber: 53
                                                                }, _this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-right ml-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-2xl font-bold text-green-600",
                                                                            children: [
                                                                                "$",
                                                                                product.precio
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                            lineNumber: 291,
                                                                            columnNumber: 57
                                                                        }, _this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-gray-500 mt-1",
                                                                            children: [
                                                                                "Stock: ",
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-semibold",
                                                                                    children: product.stock
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                                    lineNumber: 293,
                                                                                    columnNumber: 68
                                                                                }, _this),
                                                                                " unidades"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                            lineNumber: 292,
                                                                            columnNumber: 57
                                                                        }, _this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ".concat(product.stock > 20 ? 'bg-green-100 text-green-800' : product.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'),
                                                                                children: product.stock > 20 ? 'Alto stock' : product.stock > 10 ? 'Stock medio' : 'Bajo stock'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                                lineNumber: 296,
                                                                                columnNumber: 61
                                                                            }, _this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                            lineNumber: 295,
                                                                            columnNumber: 57
                                                                        }, _this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 53
                                                                }, _this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                            lineNumber: 274,
                                                            columnNumber: 49
                                                        }, _this)
                                                    }, product.id, false, {
                                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                        lineNumber: 273,
                                                        columnNumber: 45
                                                    }, _this);
                                                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-500 text-center py-4",
                                                    children: "No hay productos en el inventario"
                                                }, void 0, false, {
                                                    fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                    lineNumber: 309,
                                                    columnNumber: 41
                                                }, _this)
                                            }, void 0, false, {
                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                lineNumber: 270,
                                                columnNumber: 33
                                            }, _this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                        lineNumber: 255,
                                        columnNumber: 29
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                lineNumber: 225,
                                columnNumber: 25
                            }, _this),
                            products.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-yellow-50 border border-yellow-200 rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-yellow-800 mb-2",
                                        children: "📟 Códigos EAN-13 para probar:"
                                    }, void 0, false, {
                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                        lineNumber: 320,
                                        columnNumber: 33
                                    }, _this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2",
                                        children: products.slice(0, 6).map(function(product) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white border border-yellow-200 rounded p-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-medium text-sm",
                                                        children: product.nombre
                                                    }, void 0, false, {
                                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                        lineNumber: 324,
                                                        columnNumber: 45
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                        className: "text-xs bg-gray-100 px-2 py-1 rounded font-mono block mt-1",
                                                        children: product.barcode
                                                    }, void 0, false, {
                                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                        lineNumber: 325,
                                                        columnNumber: 45
                                                    }, _this)
                                                ]
                                            }, product.id, true, {
                                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                                lineNumber: 323,
                                                columnNumber: 41
                                            }, _this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                        lineNumber: 321,
                                        columnNumber: 33
                                    }, _this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                                lineNumber: 319,
                                columnNumber: 29
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                        lineNumber: 206,
                        columnNumber: 21
                    }, _this)
                ]
            }, void 0, true, {
                fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
                lineNumber: 180,
                columnNumber: 13
            }, _this)
        ]
    }, void 0, true, {
        fileName: "[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx",
        lineNumber: 152,
        columnNumber: 9
    }, _this);
};
_s(Dashboard, "57mMF2twgohJVZe6mZmQq2pzEgw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$context$2f$AuthContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Dashboard;
const __TURBOPACK__default__export__ = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ecommerce$2d$project$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var PAGE_PATH = "/admin/dashboard";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    function() {
        return __turbopack_context__.r("[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/ecommerce-project/frontend/pages/admin/dashboard.jsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__36d11395._.js.map