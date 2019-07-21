window.NREUM || (NREUM = {}), __nr_require = function (t, e, n) { function r(n) { if (!e[n]) { var o = e[n] = { exports: {} }; t[n][0].call(o.exports, function (e) { var o = t[n][1][e]; return r(o || e) }, o, o.exports) } return e[n].exports } if ("function" == typeof __nr_require) return __nr_require; for (var o = 0; o < n.length; o++)r(n[o]); return r }({ 1: [function (t, e, n) { function r(t) { try { s.console && console.log(t) } catch (e) { } } var o, i = t("ee"), a = t(21), s = {}; try { o = localStorage.getItem("__nr_flags").split(","), console && "function" == typeof console.log && (s.console = !0, o.indexOf("dev") !== -1 && (s.dev = !0), o.indexOf("nr_dev") !== -1 && (s.nrDev = !0)) } catch (c) { } s.nrDev && i.on("internal-error", function (t) { r(t.stack) }), s.dev && i.on("fn-err", function (t, e, n) { r(n.stack) }), s.dev && (r("NR AGENT IN DEVELOPMENT MODE"), r("flags: " + a(s, function (t, e) { return t }).join(", "))) }, {}], 2: [function (t, e, n) { function r(t, e, n, r, s) { try { l ? l -= 1 : o(s || new UncaughtException(t, e, n), !0) } catch (f) { try { i("ierr", [f, c.now(), !0]) } catch (d) { } } return "function" == typeof u && u.apply(this, a(arguments)) } function UncaughtException(t, e, n) { this.message = t || "Uncaught error with no additional information", this.sourceURL = e, this.line = n } function o(t, e) { var n = e ? null : c.now(); i("err", [t, n]) } var i = t("handle"), a = t(22), s = t("ee"), c = t("loader"), f = t("gos"), u = window.onerror, d = !1, p = "nr@seenError", l = 0; c.features.err = !0, t(1), window.onerror = r; try { throw new Error } catch (h) { "stack" in h && (t(13), t(12), "addEventListener" in window && t(6), c.xhrWrappable && t(14), d = !0) } s.on("fn-start", function (t, e, n) { d && (l += 1) }), s.on("fn-err", function (t, e, n) { d && !n[p] && (f(n, p, function () { return !0 }), this.thrown = !0, o(n)) }), s.on("fn-end", function () { d && !this.thrown && l > 0 && (l -= 1) }), s.on("internal-error", function (t) { i("ierr", [t, c.now(), !0]) }) }, {}], 3: [function (t, e, n) { t("loader").features.ins = !0 }, {}], 4: [function (t, e, n) { function r() { M++ , N = y.hash, this[u] = g.now() } function o() { M-- , y.hash !== N && i(0, !0); var t = g.now(); this[h] = ~~this[h] + t - this[u], this[d] = t } function i(t, e) { E.emit("newURL", ["" + y, e]) } function a(t, e) { t.on(e, function () { this[e] = g.now() }) } var s = "-start", c = "-end", f = "-body", u = "fn" + s, d = "fn" + c, p = "cb" + s, l = "cb" + c, h = "jsTime", m = "fetch", v = "addEventListener", w = window, y = w.location, g = t("loader"); if (w[v] && g.xhrWrappable) { var b = t(10), x = t(11), E = t(8), O = t(6), P = t(13), R = t(7), T = t(14), L = t(9), j = t("ee"), S = j.get("tracer"); t(15), g.features.spa = !0; var N, M = 0; j.on(u, r), j.on(p, r), j.on(d, o), j.on(l, o), j.buffer([u, d, "xhr-done", "xhr-resolved"]), O.buffer([u]), P.buffer(["setTimeout" + c, "clearTimeout" + s, u]), T.buffer([u, "new-xhr", "send-xhr" + s]), R.buffer([m + s, m + "-done", m + f + s, m + f + c]), E.buffer(["newURL"]), b.buffer([u]), x.buffer(["propagate", p, l, "executor-err", "resolve" + s]), S.buffer([u, "no-" + u]), L.buffer(["new-jsonp", "cb-start", "jsonp-error", "jsonp-end"]), a(T, "send-xhr" + s), a(j, "xhr-resolved"), a(j, "xhr-done"), a(R, m + s), a(R, m + "-done"), a(L, "new-jsonp"), a(L, "jsonp-end"), a(L, "cb-start"), E.on("pushState-end", i), E.on("replaceState-end", i), w[v]("hashchange", i, !0), w[v]("load", i, !0), w[v]("popstate", function () { i(0, M > 1) }, !0) } }, {}], 5: [function (t, e, n) { function r(t) { } if (window.performance && window.performance.timing && window.performance.getEntriesByType) { var o = t("ee"), i = t("handle"), a = t(13), s = t(12), c = "learResourceTimings", f = "addEventListener", u = "resourcetimingbufferfull", d = "bstResource", p = "resource", l = "-start", h = "-end", m = "fn" + l, v = "fn" + h, w = "bstTimer", y = "pushState", g = t("loader"); g.features.stn = !0, t(8); var b = NREUM.o.EV; o.on(m, function (t, e) { var n = t[0]; n instanceof b && (this.bstStart = g.now()) }), o.on(v, function (t, e) { var n = t[0]; n instanceof b && i("bst", [n, e, this.bstStart, g.now()]) }), a.on(m, function (t, e, n) { this.bstStart = g.now(), this.bstType = n }), a.on(v, function (t, e) { i(w, [e, this.bstStart, g.now(), this.bstType]) }), s.on(m, function () { this.bstStart = g.now() }), s.on(v, function (t, e) { i(w, [e, this.bstStart, g.now(), "requestAnimationFrame"]) }), o.on(y + l, function (t) { this.time = g.now(), this.startPath = location.pathname + location.hash }), o.on(y + h, function (t) { i("bstHist", [location.pathname + location.hash, this.startPath, this.time]) }), f in window.performance && (window.performance["c" + c] ? window.performance[f](u, function (t) { i(d, [window.performance.getEntriesByType(p)]), window.performance["c" + c]() }, !1) : window.performance[f]("webkit" + u, function (t) { i(d, [window.performance.getEntriesByType(p)]), window.performance["webkitC" + c]() }, !1)), document[f]("scroll", r, { passive: !0 }), document[f]("keypress", r, !1), document[f]("click", r, !1) } }, {}], 6: [function (t, e, n) { function r(t) { for (var e = t; e && !e.hasOwnProperty(u);)e = Object.getPrototypeOf(e); e && o(e) } function o(t) { s.inPlace(t, [u, d], "-", i) } function i(t, e) { return t[1] } var a = t("ee").get("events"), s = t(24)(a, !0), c = t("gos"), f = XMLHttpRequest, u = "addEventListener", d = "removeEventListener"; e.exports = a, "getPrototypeOf" in Object ? (r(document), r(window), r(f.prototype)) : f.prototype.hasOwnProperty(u) && (o(window), o(f.prototype)), a.on(u + "-start", function (t, e) { var n = t[1], r = c(n, "nr@wrapped", function () { function t() { if ("function" == typeof n.handleEvent) return n.handleEvent.apply(n, arguments) } var e = { object: t, "function": n }[typeof n]; return e ? s(e, "fn-", null, e.name || "anonymous") : n }); this.wrapped = t[1] = r }), a.on(d + "-start", function (t) { t[1] = this.wrapped || t[1] }) }, {}], 7: [function (t, e, n) { function r(t, e, n) { var r = t[e]; "function" == typeof r && (t[e] = function () { var t = r.apply(this, arguments); return o.emit(n + "start", arguments, t), t.then(function (e) { return o.emit(n + "end", [null, e], t), e }, function (e) { throw o.emit(n + "end", [e], t), e }) }) } var o = t("ee").get("fetch"), i = t(21); e.exports = o; var a = window, s = "fetch-", c = s + "body-", f = ["arrayBuffer", "blob", "json", "text", "formData"], u = a.Request, d = a.Response, p = a.fetch, l = "prototype"; u && d && p && (i(f, function (t, e) { r(u[l], e, c), r(d[l], e, c) }), r(a, "fetch", s), o.on(s + "end", function (t, e) { var n = this; if (e) { var r = e.headers.get("content-length"); null !== r && (n.rxSize = r), o.emit(s + "done", [null, e], n) } else o.emit(s + "done", [t], n) })) }, {}], 8: [function (t, e, n) { var r = t("ee").get("history"), o = t(24)(r); e.exports = r, o.inPlace(window.history, ["pushState", "replaceState"], "-") }, {}], 9: [function (t, e, n) { function r(t) { function e() { c.emit("jsonp-end", [], p), t.removeEventListener("load", e, !1), t.removeEventListener("error", n, !1) } function n() { c.emit("jsonp-error", [], p), c.emit("jsonp-end", [], p), t.removeEventListener("load", e, !1), t.removeEventListener("error", n, !1) } var r = t && "string" == typeof t.nodeName && "script" === t.nodeName.toLowerCase(); if (r) { var o = "function" == typeof t.addEventListener; if (o) { var a = i(t.src); if (a) { var u = s(a), d = "function" == typeof u.parent[u.key]; if (d) { var p = {}; f.inPlace(u.parent, [u.key], "cb-", p), t.addEventListener("load", e, !1), t.addEventListener("error", n, !1), c.emit("new-jsonp", [t.src], p) } } } } } function o() { return "addEventListener" in window } function i(t) { var e = t.match(u); return e ? e[1] : null } function a(t, e) { var n = t.match(p), r = n[1], o = n[3]; return o ? a(o, e[r]) : e[r] } function s(t) { var e = t.match(d); return e && e.length >= 3 ? { key: e[2], parent: a(e[1], window) } : { key: t, parent: window } } var c = t("ee").get("jsonp"), f = t(24)(c); if (e.exports = c, o()) { var u = /[?&](?:callback|cb)=([^&#]+)/, d = /(.*)\.([^.]+)/, p = /^(\w+)(\.|$)(.*)$/, l = ["appendChild", "insertBefore", "replaceChild"]; f.inPlace(HTMLElement.prototype, l, "dom-"), f.inPlace(HTMLHeadElement.prototype, l, "dom-"), f.inPlace(HTMLBodyElement.prototype, l, "dom-"), c.on("dom-start", function (t) { r(t[0]) }) } }, {}], 10: [function (t, e, n) { var r = t("ee").get("mutation"), o = t(24)(r), i = NREUM.o.MO; e.exports = r, i && (window.MutationObserver = function (t) { return this instanceof i ? new i(o(t, "fn-")) : i.apply(this, arguments) }, MutationObserver.prototype = i.prototype) }, {}], 11: [function (t, e, n) { function r(t) { var e = a.context(), n = s(t, "executor-", e), r = new f(n); return a.context(r).getCtx = function () { return e }, a.emit("new-promise", [r, e], e), r } function o(t, e) { return e } var i = t(24), a = t("ee").get("promise"), s = i(a), c = t(21), f = NREUM.o.PR; e.exports = a, f && (window.Promise = r, ["all", "race"].forEach(function (t) { var e = f[t]; f[t] = function (n) { function r(t) { return function () { a.emit("propagate", [null, !o], i), o = o || !t } } var o = !1; c(n, function (e, n) { Promise.resolve(n).then(r("all" === t), r(!1)) }); var i = e.apply(f, arguments), s = f.resolve(i); return s } }), ["resolve", "reject"].forEach(function (t) { var e = f[t]; f[t] = function (t) { var n = e.apply(f, arguments); return t !== n && a.emit("propagate", [t, !0], n), n } }), f.prototype["catch"] = function (t) { return this.then(null, t) }, f.prototype = Object.create(f.prototype, { constructor: { value: r } }), c(Object.getOwnPropertyNames(f), function (t, e) { try { r[e] = f[e] } catch (n) { } }), a.on("executor-start", function (t) { t[0] = s(t[0], "resolve-", this), t[1] = s(t[1], "resolve-", this) }), a.on("executor-err", function (t, e, n) { t[1](n) }), s.inPlace(f.prototype, ["then"], "then-", o), a.on("then-start", function (t, e) { this.promise = e, t[0] = s(t[0], "cb-", this), t[1] = s(t[1], "cb-", this) }), a.on("then-end", function (t, e, n) { this.nextPromise = n; var r = this.promise; a.emit("propagate", [r, !0], n) }), a.on("cb-end", function (t, e, n) { a.emit("propagate", [n, !0], this.nextPromise) }), a.on("propagate", function (t, e, n) { this.getCtx && !e || (this.getCtx = function () { if (t instanceof Promise) var e = a.context(t); return e && e.getCtx ? e.getCtx() : this }) }), r.toString = function () { return "" + f }) }, {}], 12: [function (t, e, n) { var r = t("ee").get("raf"), o = t(24)(r), i = "equestAnimationFrame"; e.exports = r, o.inPlace(window, ["r" + i, "mozR" + i, "webkitR" + i, "msR" + i], "raf-"), r.on("raf-start", function (t) { t[0] = o(t[0], "fn-") }) }, {}], 13: [function (t, e, n) { function r(t, e, n) { t[0] = a(t[0], "fn-", null, n) } function o(t, e, n) { this.method = n, this.timerDuration = isNaN(t[1]) ? 0 : +t[1], t[0] = a(t[0], "fn-", this, n) } var i = t("ee").get("timer"), a = t(24)(i), s = "setTimeout", c = "setInterval", f = "clearTimeout", u = "-start", d = "-"; e.exports = i, a.inPlace(window, [s, "setImmediate"], s + d), a.inPlace(window, [c], c + d), a.inPlace(window, [f, "clearImmediate"], f + d), i.on(c + u, r), i.on(s + u, o) }, {}], 14: [function (t, e, n) { function r(t, e) { d.inPlace(e, ["onreadystatechange"], "fn-", s) } function o() { var t = this, e = u.context(t); t.readyState > 3 && !e.resolved && (e.resolved = !0, u.emit("xhr-resolved", [], t)), d.inPlace(t, y, "fn-", s) } function i(t) { g.push(t), h && (x ? x.then(a) : v ? v(a) : (E = -E, O.data = E)) } function a() { for (var t = 0; t < g.length; t++)r([], g[t]); g.length && (g = []) } function s(t, e) { return e } function c(t, e) { for (var n in t) e[n] = t[n]; return e } t(6); var f = t("ee"), u = f.get("xhr"), d = t(24)(u), p = NREUM.o, l = p.XHR, h = p.MO, m = p.PR, v = p.SI, w = "readystatechange", y = ["onload", "onerror", "onabort", "onloadstart", "onloadend", "onprogress", "ontimeout"], g = []; e.exports = u; var b = window.XMLHttpRequest = function (t) { var e = new l(t); try { u.emit("new-xhr", [e], e), e.addEventListener(w, o, !1) } catch (n) { try { u.emit("internal-error", [n]) } catch (r) { } } return e }; if (c(l, b), b.prototype = l.prototype, d.inPlace(b.prototype, ["open", "send"], "-xhr-", s), u.on("send-xhr-start", function (t, e) { r(t, e), i(e) }), u.on("open-xhr-start", r), h) { var x = m && m.resolve(); if (!v && !m) { var E = 1, O = document.createTextNode(E); new h(a).observe(O, { characterData: !0 }) } } else f.on("fn-end", function (t) { t[0] && t[0].type === w || a() }) }, {}], 15: [function (t, e, n) { function r(t) { var e = this.params, n = this.metrics; if (!this.ended) { this.ended = !0; for (var r = 0; r < d; r++)t.removeEventListener(u[r], this.listener, !1); if (!e.aborted) { if (n.duration = a.now() - this.startTime, 4 === t.readyState) { e.status = t.status; var i = o(t, this.lastSize); if (i && (n.rxSize = i), this.sameOrigin) { var c = t.getResponseHeader("X-NewRelic-App-Data"); c && (e.cat = c.split(", ").pop()) } } else e.status = 0; n.cbTime = this.cbTime, f.emit("xhr-done", [t], t), s("xhr", [e, n, this.startTime]) } } } function o(t, e) { var n = t.responseType; if ("json" === n && null !== e) return e; var r = "arraybuffer" === n || "blob" === n || "json" === n ? t.response : t.responseText; return h(r) } function i(t, e) { var n = c(e), r = t.params; r.host = n.hostname + ":" + n.port, r.pathname = n.pathname, t.sameOrigin = n.sameOrigin } var a = t("loader"); if (a.xhrWrappable) { var s = t("handle"), c = t(16), f = t("ee"), u = ["load", "error", "abort", "timeout"], d = u.length, p = t("id"), l = t(19), h = t(18), m = window.XMLHttpRequest; a.features.xhr = !0, t(14), f.on("new-xhr", function (t) { var e = this; e.totalCbs = 0, e.called = 0, e.cbTime = 0, e.end = r, e.ended = !1, e.xhrGuids = {}, e.lastSize = null, l && (l > 34 || l < 10) || window.opera || t.addEventListener("progress", function (t) { e.lastSize = t.loaded }, !1) }), f.on("open-xhr-start", function (t) { this.params = { method: t[0] }, i(this, t[1]), this.metrics = {} }), f.on("open-xhr-end", function (t, e) { "loader_config" in NREUM && "xpid" in NREUM.loader_config && this.sameOrigin && e.setRequestHeader("X-NewRelic-ID", NREUM.loader_config.xpid) }), f.on("send-xhr-start", function (t, e) { var n = this.metrics, r = t[0], o = this; if (n && r) { var i = h(r); i && (n.txSize = i) } this.startTime = a.now(), this.listener = function (t) { try { "abort" === t.type && (o.params.aborted = !0), ("load" !== t.type || o.called === o.totalCbs && (o.onloadCalled || "function" != typeof e.onload)) && o.end(e) } catch (n) { try { f.emit("internal-error", [n]) } catch (r) { } } }; for (var s = 0; s < d; s++)e.addEventListener(u[s], this.listener, !1) }), f.on("xhr-cb-time", function (t, e, n) { this.cbTime += t, e ? this.onloadCalled = !0 : this.called += 1, this.called !== this.totalCbs || !this.onloadCalled && "function" == typeof n.onload || this.end(n) }), f.on("xhr-load-added", function (t, e) { var n = "" + p(t) + !!e; this.xhrGuids && !this.xhrGuids[n] && (this.xhrGuids[n] = !0, this.totalCbs += 1) }), f.on("xhr-load-removed", function (t, e) { var n = "" + p(t) + !!e; this.xhrGuids && this.xhrGuids[n] && (delete this.xhrGuids[n], this.totalCbs -= 1) }), f.on("addEventListener-end", function (t, e) { e instanceof m && "load" === t[0] && f.emit("xhr-load-added", [t[1], t[2]], e) }), f.on("removeEventListener-end", function (t, e) { e instanceof m && "load" === t[0] && f.emit("xhr-load-removed", [t[1], t[2]], e) }), f.on("fn-start", function (t, e, n) { e instanceof m && ("onload" === n && (this.onload = !0), ("load" === (t[0] && t[0].type) || this.onload) && (this.xhrCbStart = a.now())) }), f.on("fn-end", function (t, e) { this.xhrCbStart && f.emit("xhr-cb-time", [a.now() - this.xhrCbStart, this.onload, e], e) }) } }, {}], 16: [function (t, e, n) { e.exports = function (t) { var e = document.createElement("a"), n = window.location, r = {}; e.href = t, r.port = e.port; var o = e.href.split("://"); !r.port && o[1] && (r.port = o[1].split("/")[0].split("@").pop().split(":")[1]), r.port && "0" !== r.port || (r.port = "https" === o[0] ? "443" : "80"), r.hostname = e.hostname || n.hostname, r.pathname = e.pathname, r.protocol = o[0], "/" !== r.pathname.charAt(0) && (r.pathname = "/" + r.pathname); var i = !e.protocol || ":" === e.protocol || e.protocol === n.protocol, a = e.hostname === document.domain && e.port === n.port; return r.sameOrigin = i && (!e.hostname || a), r } }, {}], 17: [function (t, e, n) { function r() { } function o(t, e, n) { return function () { return i(t, [f.now()].concat(s(arguments)), e ? null : this, n), e ? void 0 : this } } var i = t("handle"), a = t(21), s = t(22), c = t("ee").get("tracer"), f = t("loader"), u = NREUM; "undefined" == typeof window.newrelic && (newrelic = u); var d = ["setPageViewName", "setCustomAttribute", "setErrorHandler", "finished", "addToTrace", "inlineHit", "addRelease"], p = "api-", l = p + "ixn-"; a(d, function (t, e) { u[e] = o(p + e, !0, "api") }), u.addPageAction = o(p + "addPageAction", !0), u.setCurrentRouteName = o(p + "routeName", !0), e.exports = newrelic, u.interaction = function () { return (new r).get() }; var h = r.prototype = { createTracer: function (t, e) { var n = {}, r = this, o = "function" == typeof e; return i(l + "tracer", [f.now(), t, n], r), function () { if (c.emit((o ? "" : "no-") + "fn-start", [f.now(), r, o], n), o) try { return e.apply(this, arguments) } catch (t) { throw c.emit("fn-err", [arguments, this, t], n), t } finally { c.emit("fn-end", [f.now()], n) } } } }; a("actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","), function (t, e) { h[e] = o(l + e) }), newrelic.noticeError = function (t, e) { "string" == typeof t && (t = new Error(t)), i("err", [t, f.now(), !1, e]) } }, {}], 18: [function (t, e, n) { e.exports = function (t) { if ("string" == typeof t && t.length) return t.length; if ("object" == typeof t) { if ("undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer && t.byteLength) return t.byteLength; if ("undefined" != typeof Blob && t instanceof Blob && t.size) return t.size; if (!("undefined" != typeof FormData && t instanceof FormData)) try { return JSON.stringify(t).length } catch (e) { return } } } }, {}], 19: [function (t, e, n) { var r = 0, o = navigator.userAgent.match(/Firefox[\/\s](\d+\.\d+)/); o && (r = +o[1]), e.exports = r }, {}], 20: [function (t, e, n) { function r(t, e) { if (!o) return !1; if (t !== o) return !1; if (!e) return !0; if (!i) return !1; for (var n = i.split("."), r = e.split("."), a = 0; a < r.length; a++)if (r[a] !== n[a]) return !1; return !0 } var o = null, i = null, a = /Version\/(\S+)\s+Safari/; if (navigator.userAgent) { var s = navigator.userAgent, c = s.match(a); c && s.indexOf("Chrome") === -1 && s.indexOf("Chromium") === -1 && (o = "Safari", i = c[1]) } e.exports = { agent: o, version: i, match: r } }, {}], 21: [function (t, e, n) { function r(t, e) { var n = [], r = "", i = 0; for (r in t) o.call(t, r) && (n[i] = e(r, t[r]), i += 1); return n } var o = Object.prototype.hasOwnProperty; e.exports = r }, {}], 22: [function (t, e, n) { function r(t, e, n) { e || (e = 0), "undefined" == typeof n && (n = t ? t.length : 0); for (var r = -1, o = n - e || 0, i = Array(o < 0 ? 0 : o); ++r < o;)i[r] = t[e + r]; return i } e.exports = r }, {}], 23: [function (t, e, n) { e.exports = { exists: "undefined" != typeof window.performance && window.performance.timing && "undefined" != typeof window.performance.timing.navigationStart } }, {}], 24: [function (t, e, n) { function r(t) { return !(t && t instanceof Function && t.apply && !t[a]) } var o = t("ee"), i = t(22), a = "nr@original", s = Object.prototype.hasOwnProperty, c = !1; e.exports = function (t, e) { function n(t, e, n, o) { function nrWrapper() { var r, a, s, c; try { a = this, r = i(arguments), s = "function" == typeof n ? n(r, a) : n || {} } catch (f) { p([f, "", [r, a, o], s]) } u(e + "start", [r, a, o], s); try { return c = t.apply(a, r) } catch (d) { throw u(e + "err", [r, a, d], s), d } finally { u(e + "end", [r, a, c], s) } } return r(t) ? t : (e || (e = ""), nrWrapper[a] = t, d(t, nrWrapper), nrWrapper) } function f(t, e, o, i) { o || (o = ""); var a, s, c, f = "-" === o.charAt(0); for (c = 0; c < e.length; c++)s = e[c], a = t[s], r(a) || (t[s] = n(a, f ? s + o : o, i, s)) } function u(n, r, o) { if (!c || e) { var i = c; c = !0; try { t.emit(n, r, o, e) } catch (a) { p([a, n, r, o]) } c = i } } function d(t, e) { if (Object.defineProperty && Object.keys) try { var n = Object.keys(t); return n.forEach(function (n) { Object.defineProperty(e, n, { get: function () { return t[n] }, set: function (e) { return t[n] = e, e } }) }), e } catch (r) { p([r]) } for (var o in t) s.call(t, o) && (e[o] = t[o]); return e } function p(e) { try { t.emit("internal-error", e) } catch (n) { } } return t || (t = o), n.inPlace = f, n.flag = a, n } }, {}], ee: [function (t, e, n) { function r() { } function o(t) { function e(t) { return t && t instanceof r ? t : t ? c(t, s, i) : i() } function n(n, r, o, i) { if (!p.aborted || i) { t && t(n, r, o); for (var a = e(o), s = m(n), c = s.length, f = 0; f < c; f++)s[f].apply(a, r); var d = u[g[n]]; return d && d.push([b, n, r, a]), a } } function l(t, e) { y[t] = m(t).concat(e) } function h(t, e) { var n = y[t]; if (n) for (var r = 0; r < n.length; r++)n[r] === e && n.splice(r, 1) } function m(t) { return y[t] || [] } function v(t) { return d[t] = d[t] || o(n) } function w(t, e) { f(t, function (t, n) { e = e || "feature", g[n] = e, e in u || (u[e] = []) }) } var y = {}, g = {}, b = { on: l, addEventListener: l, removeEventListener: h, emit: n, get: v, listeners: m, context: e, buffer: w, abort: a, aborted: !1 }; return b } function i() { return new r } function a() { (u.api || u.feature) && (p.aborted = !0, u = p.backlog = {}) } var s = "nr@context", c = t("gos"), f = t(21), u = {}, d = {}, p = e.exports = o(); p.backlog = u }, {}], gos: [function (t, e, n) { function r(t, e, n) { if (o.call(t, e)) return t[e]; var r = n(); if (Object.defineProperty && Object.keys) try { return Object.defineProperty(t, e, { value: r, writable: !0, enumerable: !1 }), r } catch (i) { } return t[e] = r, r } var o = Object.prototype.hasOwnProperty; e.exports = r }, {}], handle: [function (t, e, n) { function r(t, e, n, r) { o.buffer([t], r), o.emit(t, e, n) } var o = t("ee").get("handle"); e.exports = r, r.ee = o }, {}], id: [function (t, e, n) { function r(t) { var e = typeof t; return !t || "object" !== e && "function" !== e ? -1 : t === window ? 0 : a(t, i, function () { return o++ }) } var o = 1, i = "nr@id", a = t("gos"); e.exports = r }, {}], loader: [function (t, e, n) { function r() { if (!E++) { var t = x.info = NREUM.info, e = l.getElementsByTagName("script")[0]; if (setTimeout(u.abort, 3e4), !(t && t.licenseKey && t.applicationID && e)) return u.abort(); f(g, function (e, n) { t[e] || (t[e] = n) }), c("mark", ["onload", a() + x.offset], null, "api"); var n = l.createElement("script"); n.src = "https://" + t.agent, e.parentNode.insertBefore(n, e) } } function o() { "complete" === l.readyState && i() } function i() { c("mark", ["domContent", a() + x.offset], null, "api") } function a() { return O.exists && performance.now ? Math.round(performance.now()) : (s = Math.max((new Date).getTime(), s)) - x.offset } var s = (new Date).getTime(), c = t("handle"), f = t(21), u = t("ee"), d = t(20), p = window, l = p.document, h = "addEventListener", m = "attachEvent", v = p.XMLHttpRequest, w = v && v.prototype; NREUM.o = { ST: setTimeout, SI: p.setImmediate, CT: clearTimeout, XHR: v, REQ: p.Request, EV: p.Event, PR: p.Promise, MO: p.MutationObserver }; var y = "" + location, g = { beacon: "bam.nr-data.net", errorBeacon: "bam.nr-data.net", agent: "js-agent.newrelic.com/nr-spa-1118.min.js" }, b = v && w && w[h] && !/CriOS/.test(navigator.userAgent), x = e.exports = { offset: s, now: a, origin: y, features: {}, xhrWrappable: b, userAgent: d }; t(17), l[h] ? (l[h]("DOMContentLoaded", i, !1), p[h]("load", r, !1)) : (l[m]("onreadystatechange", o), p[m]("onload", r)), c("mark", ["firstbyte", s], null, "api"); var E = 0, O = t(23) }, {}] }, {}, ["loader", 2, 15, 5, 3, 4]);
; NREUM.info = { beacon: "bam.nr-data.net", errorBeacon: "bam.nr-data.net", licenseKey: "74981e39e8", applicationID: "149924860", sa: 1 }
