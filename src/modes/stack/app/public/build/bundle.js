
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop$1() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop$1;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function compute_slots(slots) {
        const result = {};
        for (const key in slots) {
            result[key] = true;
        }
        return result;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty$1() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function children$1(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                else
                    this.e = element(target.nodeName);
                this.t = target;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately after the component has been updated.
     *
     * The first time the callback runs will be after the initial `onMount`
     */
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-getcontext
     */
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop$1,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children$1(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$1;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop$1;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.52.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop$1) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop$1) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop$1;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop$1;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop$1;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const stack = {
        network: "regtest",
        nodes: [
            {
                place: "Internal",
                type: "Btc",
                name: "bitcoind",
                network: "regtest",
                user: "user",
                pass: "",
            },
            {
                place: "Internal",
                type: "Lnd",
                name: "lnd1",
                network: "regtest",
                port: "10009",
                http_port: "8881",
                links: ["bitcoind"],
            },
            {
                place: "Internal",
                type: "Proxy",
                name: "proxy1",
                network: "regtest",
                port: "11111",
                admin_port: "5050",
                admin_token: "",
                store_key: "",
                new_nodes: null,
                links: ["lnd1"],
            },
            {
                place: "Internal",
                type: "Relay",
                name: "relay1",
                port: "3000",
                links: ["proxy1", "lnd1", "tribes", "memes"],
            },
            {
                name: "tribes",
                place: "External",
                type: "Tribes",
                url: "tribes.sphinx.chat",
            },
            {
                name: "memes",
                place: "External",
                type: "Meme",
                url: "meme.sphinx.chat",
            },
        ],
    };
    const defaultPositions = [
        [100, 100],
        [370, 200],
        [660, 130],
        [920, 350],
        [260, 400],
        [560, 500],
    ];

    const initialUsers = [
        {
            alias: "Evan",
            pubkey: "02290714deafd0cb33d2be3b634fc977a98a9c9fa1dd6c53cf17d99b350c08c67b",
            balance: 250000,
            routeHint: "031863256ab7ce989e82453f38602018cd198753d8cb57d34224123449ba6c2f47:02736e7dad83d7205826649fc17db672ce08f8e87a2b47c7785ccbf79f24e91db0:1099729600212",
        },
        {
            alias: "Kevin",
            pubkey: "03bfe6723c06fb2b7546df1e8ca1a17ae5c504615da32c945425ccbe8d3ca6260d",
            balance: 133000,
            routeHint: "",
        },
        {
            alias: "Tomas",
            pubkey: "027dbce35947a3dafc826de411d97990e9b16e78512d1a9e70e87dcc788c2631db",
            balance: 400000,
            routeHint: "",
        },
        {
            pubkey: "02109ebcc86ef42f9261f820a6473d8a1e6c7dde10aa367b2f251c1b014b6ef256",
            routeHint: "02736e7dad83d7205826649fc17db672ce08f8e87a2b47c7785ccbf79f24e91db0:1099562287105",
            balance: 10000,
        },
        {
            pubkey: "02c431e64078b10925584d64824c9d1d12eca05e2c56660ffa5ac84aa6946adfe5",
            routeHint: "02736e7dad83d7205826649fc17db672ce08f8e87a2b47c7785ccbf79f24e91db0:1099588239361",
            balance: 100000,
        },
    ];

    const selectedNode = writable();
    const users = writable(initialUsers);

    const IS_DEV = window.location.host === "localhost:8080";
    let root$1 = "/api";
    if (IS_DEV) {
        root$1 = "http://localhost:8000/api";
    }
    async function send_cmd(type, data) {
        const txt = JSON.stringify({ type, data });
        const r = await fetch(`${root$1}/cmd?txt=${txt}&tag=SWARM`);
        const result = await r.json();
        return result;
    }

    async function swarmCmd(cmd, content) {
        return await send_cmd("Swarm", { cmd, content });
    }
    async function get_config() {
        return await swarmCmd("GetConfig");
    }

    var swarm = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get_config: get_config
    });

    async function relayCmd(cmd, content) {
        return await send_cmd("Relay", { cmd, content });
    }
    async function list_users() {
        return await relayCmd("ListUsers");
    }
    async function add_user() {
        return await relayCmd("AddUser");
    }

    var relay = /*#__PURE__*/Object.freeze({
        __proto__: null,
        list_users: list_users,
        add_user: add_user
    });

    var api = /*#__PURE__*/Object.freeze({
        __proto__: null,
        swarm: swarm,
        relay: relay
    });

    var noop = {value: () => {}};

    function dispatch() {
      for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
        if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
        _[t] = [];
      }
      return new Dispatch(_);
    }

    function Dispatch(_) {
      this._ = _;
    }

    function parseTypenames$1(typenames, types) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        return {type: t, name: name};
      });
    }

    Dispatch.prototype = dispatch.prototype = {
      constructor: Dispatch,
      on: function(typename, callback) {
        var _ = this._,
            T = parseTypenames$1(typename + "", _),
            t,
            i = -1,
            n = T.length;

        // If no callback was specified, return the callback of the given type and name.
        if (arguments.length < 2) {
          while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
          return;
        }

        // If a type was specified, set the callback for the given type and name.
        // Otherwise, if a null callback was specified, remove callbacks of the given name.
        if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
        while (++i < n) {
          if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
          else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
        }

        return this;
      },
      copy: function() {
        var copy = {}, _ = this._;
        for (var t in _) copy[t] = _[t].slice();
        return new Dispatch(copy);
      },
      call: function(type, that) {
        if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      },
      apply: function(type, that, args) {
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      }
    };

    function get$1(type, name) {
      for (var i = 0, n = type.length, c; i < n; ++i) {
        if ((c = type[i]).name === name) {
          return c.value;
        }
      }
    }

    function set$1(type, name, callback) {
      for (var i = 0, n = type.length; i < n; ++i) {
        if (type[i].name === name) {
          type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
          break;
        }
      }
      if (callback != null) type.push({name: name, value: callback});
      return type;
    }

    var xhtml = "http://www.w3.org/1999/xhtml";

    var namespaces = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: xhtml,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };

    function namespace(name) {
      var prefix = name += "", i = prefix.indexOf(":");
      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
      return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
    }

    function creatorInherit(name) {
      return function() {
        var document = this.ownerDocument,
            uri = this.namespaceURI;
        return uri === xhtml && document.documentElement.namespaceURI === xhtml
            ? document.createElement(name)
            : document.createElementNS(uri, name);
      };
    }

    function creatorFixed(fullname) {
      return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
      };
    }

    function creator(name) {
      var fullname = namespace(name);
      return (fullname.local
          ? creatorFixed
          : creatorInherit)(fullname);
    }

    function none() {}

    function selector(selector) {
      return selector == null ? none : function() {
        return this.querySelector(selector);
      };
    }

    function selection_select(select) {
      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    // Given something array like (or null), returns something that is strictly an
    // array. This is used to ensure that array-like objects passed to d3.selectAll
    // or selection.selectAll are converted into proper arrays when creating a
    // selection; we don’t ever want to create a selection backed by a live
    // HTMLCollection or NodeList. However, note that selection.selectAll will use a
    // static NodeList as a group, since it safely derived from querySelectorAll.
    function array(x) {
      return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
    }

    function empty() {
      return [];
    }

    function selectorAll(selector) {
      return selector == null ? empty : function() {
        return this.querySelectorAll(selector);
      };
    }

    function arrayAll(select) {
      return function() {
        return array(select.apply(this, arguments));
      };
    }

    function selection_selectAll(select) {
      if (typeof select === "function") select = arrayAll(select);
      else select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            subgroups.push(select.call(node, node.__data__, i, group));
            parents.push(node);
          }
        }
      }

      return new Selection$1(subgroups, parents);
    }

    function matcher(selector) {
      return function() {
        return this.matches(selector);
      };
    }

    function childMatcher(selector) {
      return function(node) {
        return node.matches(selector);
      };
    }

    var find = Array.prototype.find;

    function childFind(match) {
      return function() {
        return find.call(this.children, match);
      };
    }

    function childFirst() {
      return this.firstElementChild;
    }

    function selection_selectChild(match) {
      return this.select(match == null ? childFirst
          : childFind(typeof match === "function" ? match : childMatcher(match)));
    }

    var filter = Array.prototype.filter;

    function children() {
      return Array.from(this.children);
    }

    function childrenFilter(match) {
      return function() {
        return filter.call(this.children, match);
      };
    }

    function selection_selectChildren(match) {
      return this.selectAll(match == null ? children
          : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
    }

    function selection_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    function sparse(update) {
      return new Array(update.length);
    }

    function selection_enter() {
      return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
    }

    function EnterNode(parent, datum) {
      this.ownerDocument = parent.ownerDocument;
      this.namespaceURI = parent.namespaceURI;
      this._next = null;
      this._parent = parent;
      this.__data__ = datum;
    }

    EnterNode.prototype = {
      constructor: EnterNode,
      appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
      insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
      querySelector: function(selector) { return this._parent.querySelector(selector); },
      querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
    };

    function constant$2(x) {
      return function() {
        return x;
      };
    }

    function bindIndex(parent, group, enter, update, exit, data) {
      var i = 0,
          node,
          groupLength = group.length,
          dataLength = data.length;

      // Put any non-null nodes that fit into update.
      // Put any null nodes into enter.
      // Put any remaining data into enter.
      for (; i < dataLength; ++i) {
        if (node = group[i]) {
          node.__data__ = data[i];
          update[i] = node;
        } else {
          enter[i] = new EnterNode(parent, data[i]);
        }
      }

      // Put any non-null nodes that don’t fit into exit.
      for (; i < groupLength; ++i) {
        if (node = group[i]) {
          exit[i] = node;
        }
      }
    }

    function bindKey(parent, group, enter, update, exit, data, key) {
      var i,
          node,
          nodeByKeyValue = new Map,
          groupLength = group.length,
          dataLength = data.length,
          keyValues = new Array(groupLength),
          keyValue;

      // Compute the key for each node.
      // If multiple nodes have the same key, the duplicates are added to exit.
      for (i = 0; i < groupLength; ++i) {
        if (node = group[i]) {
          keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
          if (nodeByKeyValue.has(keyValue)) {
            exit[i] = node;
          } else {
            nodeByKeyValue.set(keyValue, node);
          }
        }
      }

      // Compute the key for each datum.
      // If there a node associated with this key, join and add it to update.
      // If there is not (or the key is a duplicate), add it to enter.
      for (i = 0; i < dataLength; ++i) {
        keyValue = key.call(parent, data[i], i, data) + "";
        if (node = nodeByKeyValue.get(keyValue)) {
          update[i] = node;
          node.__data__ = data[i];
          nodeByKeyValue.delete(keyValue);
        } else {
          enter[i] = new EnterNode(parent, data[i]);
        }
      }

      // Add any remaining nodes that were not bound to data to exit.
      for (i = 0; i < groupLength; ++i) {
        if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
          exit[i] = node;
        }
      }
    }

    function datum(node) {
      return node.__data__;
    }

    function selection_data(value, key) {
      if (!arguments.length) return Array.from(this, datum);

      var bind = key ? bindKey : bindIndex,
          parents = this._parents,
          groups = this._groups;

      if (typeof value !== "function") value = constant$2(value);

      for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
        var parent = parents[j],
            group = groups[j],
            groupLength = group.length,
            data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
            dataLength = data.length,
            enterGroup = enter[j] = new Array(dataLength),
            updateGroup = update[j] = new Array(dataLength),
            exitGroup = exit[j] = new Array(groupLength);

        bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

        // Now connect the enter nodes to their following update node, such that
        // appendChild can insert the materialized enter node before this node,
        // rather than at the end of the parent node.
        for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
          if (previous = enterGroup[i0]) {
            if (i0 >= i1) i1 = i0 + 1;
            while (!(next = updateGroup[i1]) && ++i1 < dataLength);
            previous._next = next || null;
          }
        }
      }

      update = new Selection$1(update, parents);
      update._enter = enter;
      update._exit = exit;
      return update;
    }

    // Given some data, this returns an array-like view of it: an object that
    // exposes a length property and allows numeric indexing. Note that unlike
    // selectAll, this isn’t worried about “live” collections because the resulting
    // array will only be used briefly while data is being bound. (It is possible to
    // cause the data to change while iterating by using a key function, but please
    // don’t; we’d rather avoid a gratuitous copy.)
    function arraylike(data) {
      return typeof data === "object" && "length" in data
        ? data // Array, TypedArray, NodeList, array-like
        : Array.from(data); // Map, Set, iterable, string, or anything else
    }

    function selection_exit() {
      return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
    }

    function selection_join(onenter, onupdate, onexit) {
      var enter = this.enter(), update = this, exit = this.exit();
      if (typeof onenter === "function") {
        enter = onenter(enter);
        if (enter) enter = enter.selection();
      } else {
        enter = enter.append(onenter + "");
      }
      if (onupdate != null) {
        update = onupdate(update);
        if (update) update = update.selection();
      }
      if (onexit == null) exit.remove(); else onexit(exit);
      return enter && update ? enter.merge(update).order() : update;
    }

    function selection_merge(context) {
      var selection = context.selection ? context.selection() : context;

      for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
        for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group0[i] || group1[i]) {
            merge[i] = node;
          }
        }
      }

      for (; j < m0; ++j) {
        merges[j] = groups0[j];
      }

      return new Selection$1(merges, this._parents);
    }

    function selection_order() {

      for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
        for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
          if (node = group[i]) {
            if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
            next = node;
          }
        }
      }

      return this;
    }

    function selection_sort(compare) {
      if (!compare) compare = ascending;

      function compareNode(a, b) {
        return a && b ? compare(a.__data__, b.__data__) : !a - !b;
      }

      for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            sortgroup[i] = node;
          }
        }
        sortgroup.sort(compareNode);
      }

      return new Selection$1(sortgroups, this._parents).order();
    }

    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }

    function selection_call() {
      var callback = arguments[0];
      arguments[0] = this;
      callback.apply(null, arguments);
      return this;
    }

    function selection_nodes() {
      return Array.from(this);
    }

    function selection_node() {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
          var node = group[i];
          if (node) return node;
        }
      }

      return null;
    }

    function selection_size() {
      let size = 0;
      for (const node of this) ++size; // eslint-disable-line no-unused-vars
      return size;
    }

    function selection_empty() {
      return !this.node();
    }

    function selection_each(callback) {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
          if (node = group[i]) callback.call(node, node.__data__, i, group);
        }
      }

      return this;
    }

    function attrRemove$1(name) {
      return function() {
        this.removeAttribute(name);
      };
    }

    function attrRemoveNS$1(fullname) {
      return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
      };
    }

    function attrConstant$1(name, value) {
      return function() {
        this.setAttribute(name, value);
      };
    }

    function attrConstantNS$1(fullname, value) {
      return function() {
        this.setAttributeNS(fullname.space, fullname.local, value);
      };
    }

    function attrFunction$1(name, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttribute(name);
        else this.setAttribute(name, v);
      };
    }

    function attrFunctionNS$1(fullname, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
        else this.setAttributeNS(fullname.space, fullname.local, v);
      };
    }

    function selection_attr(name, value) {
      var fullname = namespace(name);

      if (arguments.length < 2) {
        var node = this.node();
        return fullname.local
            ? node.getAttributeNS(fullname.space, fullname.local)
            : node.getAttribute(fullname);
      }

      return this.each((value == null
          ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
          ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
          : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
    }

    function defaultView(node) {
      return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
          || (node.document && node) // node is a Window
          || node.defaultView; // node is a Document
    }

    function styleRemove$1(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant$1(name, value, priority) {
      return function() {
        this.style.setProperty(name, value, priority);
      };
    }

    function styleFunction$1(name, value, priority) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
      };
    }

    function selection_style(name, value, priority) {
      return arguments.length > 1
          ? this.each((value == null
                ? styleRemove$1 : typeof value === "function"
                ? styleFunction$1
                : styleConstant$1)(name, value, priority == null ? "" : priority))
          : styleValue(this.node(), name);
    }

    function styleValue(node, name) {
      return node.style.getPropertyValue(name)
          || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
    }

    function propertyRemove(name) {
      return function() {
        delete this[name];
      };
    }

    function propertyConstant(name, value) {
      return function() {
        this[name] = value;
      };
    }

    function propertyFunction(name, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) delete this[name];
        else this[name] = v;
      };
    }

    function selection_property(name, value) {
      return arguments.length > 1
          ? this.each((value == null
              ? propertyRemove : typeof value === "function"
              ? propertyFunction
              : propertyConstant)(name, value))
          : this.node()[name];
    }

    function classArray(string) {
      return string.trim().split(/^|\s+/);
    }

    function classList(node) {
      return node.classList || new ClassList(node);
    }

    function ClassList(node) {
      this._node = node;
      this._names = classArray(node.getAttribute("class") || "");
    }

    ClassList.prototype = {
      add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
          this._names.push(name);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
          this._names.splice(i, 1);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      contains: function(name) {
        return this._names.indexOf(name) >= 0;
      }
    };

    function classedAdd(node, names) {
      var list = classList(node), i = -1, n = names.length;
      while (++i < n) list.add(names[i]);
    }

    function classedRemove(node, names) {
      var list = classList(node), i = -1, n = names.length;
      while (++i < n) list.remove(names[i]);
    }

    function classedTrue(names) {
      return function() {
        classedAdd(this, names);
      };
    }

    function classedFalse(names) {
      return function() {
        classedRemove(this, names);
      };
    }

    function classedFunction(names, value) {
      return function() {
        (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
      };
    }

    function selection_classed(name, value) {
      var names = classArray(name + "");

      if (arguments.length < 2) {
        var list = classList(this.node()), i = -1, n = names.length;
        while (++i < n) if (!list.contains(names[i])) return false;
        return true;
      }

      return this.each((typeof value === "function"
          ? classedFunction : value
          ? classedTrue
          : classedFalse)(names, value));
    }

    function textRemove() {
      this.textContent = "";
    }

    function textConstant$1(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction$1(value) {
      return function() {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
      };
    }

    function selection_text(value) {
      return arguments.length
          ? this.each(value == null
              ? textRemove : (typeof value === "function"
              ? textFunction$1
              : textConstant$1)(value))
          : this.node().textContent;
    }

    function htmlRemove() {
      this.innerHTML = "";
    }

    function htmlConstant(value) {
      return function() {
        this.innerHTML = value;
      };
    }

    function htmlFunction(value) {
      return function() {
        var v = value.apply(this, arguments);
        this.innerHTML = v == null ? "" : v;
      };
    }

    function selection_html(value) {
      return arguments.length
          ? this.each(value == null
              ? htmlRemove : (typeof value === "function"
              ? htmlFunction
              : htmlConstant)(value))
          : this.node().innerHTML;
    }

    function raise() {
      if (this.nextSibling) this.parentNode.appendChild(this);
    }

    function selection_raise() {
      return this.each(raise);
    }

    function lower() {
      if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
    }

    function selection_lower() {
      return this.each(lower);
    }

    function selection_append(name) {
      var create = typeof name === "function" ? name : creator(name);
      return this.select(function() {
        return this.appendChild(create.apply(this, arguments));
      });
    }

    function constantNull() {
      return null;
    }

    function selection_insert(name, before) {
      var create = typeof name === "function" ? name : creator(name),
          select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
      return this.select(function() {
        return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
      });
    }

    function remove() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    }

    function selection_remove() {
      return this.each(remove);
    }

    function selection_cloneShallow() {
      var clone = this.cloneNode(false), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_cloneDeep() {
      var clone = this.cloneNode(true), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_clone(deep) {
      return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
    }

    function selection_datum(value) {
      return arguments.length
          ? this.property("__data__", value)
          : this.node().__data__;
    }

    function contextListener(listener) {
      return function(event) {
        listener.call(this, event, this.__data__);
      };
    }

    function parseTypenames(typenames) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        return {type: t, name: name};
      });
    }

    function onRemove(typename) {
      return function() {
        var on = this.__on;
        if (!on) return;
        for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
          if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
          } else {
            on[++i] = o;
          }
        }
        if (++i) on.length = i;
        else delete this.__on;
      };
    }

    function onAdd(typename, value, options) {
      return function() {
        var on = this.__on, o, listener = contextListener(value);
        if (on) for (var j = 0, m = on.length; j < m; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
            this.addEventListener(o.type, o.listener = listener, o.options = options);
            o.value = value;
            return;
          }
        }
        this.addEventListener(typename.type, listener, options);
        o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
        if (!on) this.__on = [o];
        else on.push(o);
      };
    }

    function selection_on(typename, value, options) {
      var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

      if (arguments.length < 2) {
        var on = this.node().__on;
        if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
        return;
      }

      on = value ? onAdd : onRemove;
      for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
      return this;
    }

    function dispatchEvent(node, type, params) {
      var window = defaultView(node),
          event = window.CustomEvent;

      if (typeof event === "function") {
        event = new event(type, params);
      } else {
        event = window.document.createEvent("Event");
        if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
        else event.initEvent(type, false, false);
      }

      node.dispatchEvent(event);
    }

    function dispatchConstant(type, params) {
      return function() {
        return dispatchEvent(this, type, params);
      };
    }

    function dispatchFunction(type, params) {
      return function() {
        return dispatchEvent(this, type, params.apply(this, arguments));
      };
    }

    function selection_dispatch(type, params) {
      return this.each((typeof params === "function"
          ? dispatchFunction
          : dispatchConstant)(type, params));
    }

    function* selection_iterator() {
      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
          if (node = group[i]) yield node;
        }
      }
    }

    var root = [null];

    function Selection$1(groups, parents) {
      this._groups = groups;
      this._parents = parents;
    }

    function selection() {
      return new Selection$1([[document.documentElement]], root);
    }

    function selection_selection() {
      return this;
    }

    Selection$1.prototype = selection.prototype = {
      constructor: Selection$1,
      select: selection_select,
      selectAll: selection_selectAll,
      selectChild: selection_selectChild,
      selectChildren: selection_selectChildren,
      filter: selection_filter,
      data: selection_data,
      enter: selection_enter,
      exit: selection_exit,
      join: selection_join,
      merge: selection_merge,
      selection: selection_selection,
      order: selection_order,
      sort: selection_sort,
      call: selection_call,
      nodes: selection_nodes,
      node: selection_node,
      size: selection_size,
      empty: selection_empty,
      each: selection_each,
      attr: selection_attr,
      style: selection_style,
      property: selection_property,
      classed: selection_classed,
      text: selection_text,
      html: selection_html,
      raise: selection_raise,
      lower: selection_lower,
      append: selection_append,
      insert: selection_insert,
      remove: selection_remove,
      clone: selection_clone,
      datum: selection_datum,
      on: selection_on,
      dispatch: selection_dispatch,
      [Symbol.iterator]: selection_iterator
    };

    function select(selector) {
      return typeof selector === "string"
          ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
          : new Selection$1([[selector]], root);
    }

    function sourceEvent(event) {
      let sourceEvent;
      while (sourceEvent = event.sourceEvent) event = sourceEvent;
      return event;
    }

    function pointer(event, node) {
      event = sourceEvent(event);
      if (node === undefined) node = event.currentTarget;
      if (node) {
        var svg = node.ownerSVGElement || node;
        if (svg.createSVGPoint) {
          var point = svg.createSVGPoint();
          point.x = event.clientX, point.y = event.clientY;
          point = point.matrixTransform(node.getScreenCTM().inverse());
          return [point.x, point.y];
        }
        if (node.getBoundingClientRect) {
          var rect = node.getBoundingClientRect();
          return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
        }
      }
      return [event.pageX, event.pageY];
    }

    function selectAll(selector) {
      return typeof selector === "string"
          ? new Selection$1([document.querySelectorAll(selector)], [document.documentElement])
          : new Selection$1([array(selector)], root);
    }

    // These are typically used in conjunction with noevent to ensure that we can
    const nonpassivecapture = {capture: true, passive: false};

    function noevent$1(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    function dragDisable(view) {
      var root = view.document.documentElement,
          selection = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
      if ("onselectstart" in root) {
        selection.on("selectstart.drag", noevent$1, nonpassivecapture);
      } else {
        root.__noselect = root.style.MozUserSelect;
        root.style.MozUserSelect = "none";
      }
    }

    function yesdrag(view, noclick) {
      var root = view.document.documentElement,
          selection = select(view).on("dragstart.drag", null);
      if (noclick) {
        selection.on("click.drag", noevent$1, nonpassivecapture);
        setTimeout(function() { selection.on("click.drag", null); }, 0);
      }
      if ("onselectstart" in root) {
        selection.on("selectstart.drag", null);
      } else {
        root.style.MozUserSelect = root.__noselect;
        delete root.__noselect;
      }
    }

    function define(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }

    function extend(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition) prototype[key] = definition[key];
      return prototype;
    }

    function Color() {}

    var darker = 0.7;
    var brighter = 1 / darker;

    var reI = "\\s*([+-]?\\d+)\\s*",
        reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        reHex = /^#([0-9a-f]{3,8})$/,
        reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
        reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
        reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
        reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
        reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
        reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

    var named = {
      aliceblue: 0xf0f8ff,
      antiquewhite: 0xfaebd7,
      aqua: 0x00ffff,
      aquamarine: 0x7fffd4,
      azure: 0xf0ffff,
      beige: 0xf5f5dc,
      bisque: 0xffe4c4,
      black: 0x000000,
      blanchedalmond: 0xffebcd,
      blue: 0x0000ff,
      blueviolet: 0x8a2be2,
      brown: 0xa52a2a,
      burlywood: 0xdeb887,
      cadetblue: 0x5f9ea0,
      chartreuse: 0x7fff00,
      chocolate: 0xd2691e,
      coral: 0xff7f50,
      cornflowerblue: 0x6495ed,
      cornsilk: 0xfff8dc,
      crimson: 0xdc143c,
      cyan: 0x00ffff,
      darkblue: 0x00008b,
      darkcyan: 0x008b8b,
      darkgoldenrod: 0xb8860b,
      darkgray: 0xa9a9a9,
      darkgreen: 0x006400,
      darkgrey: 0xa9a9a9,
      darkkhaki: 0xbdb76b,
      darkmagenta: 0x8b008b,
      darkolivegreen: 0x556b2f,
      darkorange: 0xff8c00,
      darkorchid: 0x9932cc,
      darkred: 0x8b0000,
      darksalmon: 0xe9967a,
      darkseagreen: 0x8fbc8f,
      darkslateblue: 0x483d8b,
      darkslategray: 0x2f4f4f,
      darkslategrey: 0x2f4f4f,
      darkturquoise: 0x00ced1,
      darkviolet: 0x9400d3,
      deeppink: 0xff1493,
      deepskyblue: 0x00bfff,
      dimgray: 0x696969,
      dimgrey: 0x696969,
      dodgerblue: 0x1e90ff,
      firebrick: 0xb22222,
      floralwhite: 0xfffaf0,
      forestgreen: 0x228b22,
      fuchsia: 0xff00ff,
      gainsboro: 0xdcdcdc,
      ghostwhite: 0xf8f8ff,
      gold: 0xffd700,
      goldenrod: 0xdaa520,
      gray: 0x808080,
      green: 0x008000,
      greenyellow: 0xadff2f,
      grey: 0x808080,
      honeydew: 0xf0fff0,
      hotpink: 0xff69b4,
      indianred: 0xcd5c5c,
      indigo: 0x4b0082,
      ivory: 0xfffff0,
      khaki: 0xf0e68c,
      lavender: 0xe6e6fa,
      lavenderblush: 0xfff0f5,
      lawngreen: 0x7cfc00,
      lemonchiffon: 0xfffacd,
      lightblue: 0xadd8e6,
      lightcoral: 0xf08080,
      lightcyan: 0xe0ffff,
      lightgoldenrodyellow: 0xfafad2,
      lightgray: 0xd3d3d3,
      lightgreen: 0x90ee90,
      lightgrey: 0xd3d3d3,
      lightpink: 0xffb6c1,
      lightsalmon: 0xffa07a,
      lightseagreen: 0x20b2aa,
      lightskyblue: 0x87cefa,
      lightslategray: 0x778899,
      lightslategrey: 0x778899,
      lightsteelblue: 0xb0c4de,
      lightyellow: 0xffffe0,
      lime: 0x00ff00,
      limegreen: 0x32cd32,
      linen: 0xfaf0e6,
      magenta: 0xff00ff,
      maroon: 0x800000,
      mediumaquamarine: 0x66cdaa,
      mediumblue: 0x0000cd,
      mediumorchid: 0xba55d3,
      mediumpurple: 0x9370db,
      mediumseagreen: 0x3cb371,
      mediumslateblue: 0x7b68ee,
      mediumspringgreen: 0x00fa9a,
      mediumturquoise: 0x48d1cc,
      mediumvioletred: 0xc71585,
      midnightblue: 0x191970,
      mintcream: 0xf5fffa,
      mistyrose: 0xffe4e1,
      moccasin: 0xffe4b5,
      navajowhite: 0xffdead,
      navy: 0x000080,
      oldlace: 0xfdf5e6,
      olive: 0x808000,
      olivedrab: 0x6b8e23,
      orange: 0xffa500,
      orangered: 0xff4500,
      orchid: 0xda70d6,
      palegoldenrod: 0xeee8aa,
      palegreen: 0x98fb98,
      paleturquoise: 0xafeeee,
      palevioletred: 0xdb7093,
      papayawhip: 0xffefd5,
      peachpuff: 0xffdab9,
      peru: 0xcd853f,
      pink: 0xffc0cb,
      plum: 0xdda0dd,
      powderblue: 0xb0e0e6,
      purple: 0x800080,
      rebeccapurple: 0x663399,
      red: 0xff0000,
      rosybrown: 0xbc8f8f,
      royalblue: 0x4169e1,
      saddlebrown: 0x8b4513,
      salmon: 0xfa8072,
      sandybrown: 0xf4a460,
      seagreen: 0x2e8b57,
      seashell: 0xfff5ee,
      sienna: 0xa0522d,
      silver: 0xc0c0c0,
      skyblue: 0x87ceeb,
      slateblue: 0x6a5acd,
      slategray: 0x708090,
      slategrey: 0x708090,
      snow: 0xfffafa,
      springgreen: 0x00ff7f,
      steelblue: 0x4682b4,
      tan: 0xd2b48c,
      teal: 0x008080,
      thistle: 0xd8bfd8,
      tomato: 0xff6347,
      turquoise: 0x40e0d0,
      violet: 0xee82ee,
      wheat: 0xf5deb3,
      white: 0xffffff,
      whitesmoke: 0xf5f5f5,
      yellow: 0xffff00,
      yellowgreen: 0x9acd32
    };

    define(Color, color, {
      copy(channels) {
        return Object.assign(new this.constructor, this, channels);
      },
      displayable() {
        return this.rgb().displayable();
      },
      hex: color_formatHex, // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHex8: color_formatHex8,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });

    function color_formatHex() {
      return this.rgb().formatHex();
    }

    function color_formatHex8() {
      return this.rgb().formatHex8();
    }

    function color_formatHsl() {
      return hslConvert(this).formatHsl();
    }

    function color_formatRgb() {
      return this.rgb().formatRgb();
    }

    function color(format) {
      var m, l;
      format = (format + "").trim().toLowerCase();
      return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
          : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
          : null) // invalid hex
          : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
          : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
          : null;
    }

    function rgbn(n) {
      return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
    }

    function rgba(r, g, b, a) {
      if (a <= 0) r = g = b = NaN;
      return new Rgb(r, g, b, a);
    }

    function rgbConvert(o) {
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Rgb;
      o = o.rgb();
      return new Rgb(o.r, o.g, o.b, o.opacity);
    }

    function rgb(r, g, b, opacity) {
      return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
    }

    function Rgb(r, g, b, opacity) {
      this.r = +r;
      this.g = +g;
      this.b = +b;
      this.opacity = +opacity;
    }

    define(Rgb, rgb, extend(Color, {
      brighter(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb() {
        return this;
      },
      clamp() {
        return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
      },
      displayable() {
        return (-0.5 <= this.r && this.r < 255.5)
            && (-0.5 <= this.g && this.g < 255.5)
            && (-0.5 <= this.b && this.b < 255.5)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex, // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatHex8: rgb_formatHex8,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));

    function rgb_formatHex() {
      return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
    }

    function rgb_formatHex8() {
      return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
    }

    function rgb_formatRgb() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
    }

    function clampa(opacity) {
      return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
    }

    function clampi(value) {
      return Math.max(0, Math.min(255, Math.round(value) || 0));
    }

    function hex(value) {
      value = clampi(value);
      return (value < 16 ? "0" : "") + value.toString(16);
    }

    function hsla(h, s, l, a) {
      if (a <= 0) h = s = l = NaN;
      else if (l <= 0 || l >= 1) h = s = NaN;
      else if (s <= 0) h = NaN;
      return new Hsl(h, s, l, a);
    }

    function hslConvert(o) {
      if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Hsl;
      if (o instanceof Hsl) return o;
      o = o.rgb();
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          h = NaN,
          s = max - min,
          l = (max + min) / 2;
      if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
      } else {
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new Hsl(h, s, l, o.opacity);
    }

    function hsl(h, s, l, opacity) {
      return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
    }

    function Hsl(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define(Hsl, hsl, extend(Color, {
      brighter(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb() {
        var h = this.h % 360 + (this.h < 0) * 360,
            s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
            l = this.l,
            m2 = l + (l < 0.5 ? l : 1 - l) * s,
            m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      clamp() {
        return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
      },
      displayable() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl() {
        const a = clampa(this.opacity);
        return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
      }
    }));

    function clamph(value) {
      value = (value || 0) % 360;
      return value < 0 ? value + 360 : value;
    }

    function clampt(value) {
      return Math.max(0, Math.min(1, value || 0));
    }

    /* From FvD 13.37, CSS Color Module Level 3 */
    function hsl2rgb(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    var constant$1 = x => () => x;

    function linear(a, d) {
      return function(t) {
        return a + t * d;
      };
    }

    function exponential(a, b, y) {
      return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
      };
    }

    function gamma(y) {
      return (y = +y) === 1 ? nogamma : function(a, b) {
        return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
      };
    }

    function nogamma(a, b) {
      var d = b - a;
      return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
    }

    var interpolateRgb = (function rgbGamma(y) {
      var color = gamma(y);

      function rgb$1(start, end) {
        var r = color((start = rgb(start)).r, (end = rgb(end)).r),
            g = color(start.g, end.g),
            b = color(start.b, end.b),
            opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.r = r(t);
          start.g = g(t);
          start.b = b(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }

      rgb$1.gamma = rgbGamma;

      return rgb$1;
    })(1);

    function interpolateNumber(a, b) {
      return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
      };
    }

    var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        reB = new RegExp(reA.source, "g");

    function zero(b) {
      return function() {
        return b;
      };
    }

    function one(b) {
      return function(t) {
        return b(t) + "";
      };
    }

    function interpolateString(a, b) {
      var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
          am, // current match in a
          bm, // current match in b
          bs, // string preceding current number in b, if any
          i = -1, // index in s
          s = [], // string constants and placeholders
          q = []; // number interpolators

      // Coerce inputs to strings.
      a = a + "", b = b + "";

      // Interpolate pairs of numbers in a & b.
      while ((am = reA.exec(a))
          && (bm = reB.exec(b))) {
        if ((bs = bm.index) > bi) { // a string precedes the next number in b
          bs = b.slice(bi, bs);
          if (s[i]) s[i] += bs; // coalesce with previous string
          else s[++i] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
          if (s[i]) s[i] += bm; // coalesce with previous string
          else s[++i] = bm;
        } else { // interpolate non-matching numbers
          s[++i] = null;
          q.push({i: i, x: interpolateNumber(am, bm)});
        }
        bi = reB.lastIndex;
      }

      // Add remains of b.
      if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      // Special optimization for only a single match.
      // Otherwise, interpolate each of the numbers and rejoin the string.
      return s.length < 2 ? (q[0]
          ? one(q[0].x)
          : zero(b))
          : (b = q.length, function(t) {
              for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
              return s.join("");
            });
    }

    var degrees = 180 / Math.PI;

    var identity$1 = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };

    function decompose(a, b, c, d, e, f) {
      var scaleX, scaleY, skewX;
      if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
      if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
      if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
      if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
      return {
        translateX: e,
        translateY: f,
        rotate: Math.atan2(b, a) * degrees,
        skewX: Math.atan(skewX) * degrees,
        scaleX: scaleX,
        scaleY: scaleY
      };
    }

    var svgNode;

    /* eslint-disable no-undef */
    function parseCss(value) {
      const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
      return m.isIdentity ? identity$1 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
    }

    function parseSvg(value) {
      if (value == null) return identity$1;
      if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
      svgNode.setAttribute("transform", value);
      if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1;
      value = value.matrix;
      return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
    }

    function interpolateTransform(parse, pxComma, pxParen, degParen) {

      function pop(s) {
        return s.length ? s.pop() + " " : "";
      }

      function translate(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push("translate(", null, pxComma, null, pxParen);
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb || yb) {
          s.push("translate(" + xb + pxComma + yb + pxParen);
        }
      }

      function rotate(a, b, s, q) {
        if (a !== b) {
          if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
          q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "rotate(" + b + degParen);
        }
      }

      function skewX(a, b, s, q) {
        if (a !== b) {
          q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "skewX(" + b + degParen);
        }
      }

      function scale(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push(pop(s) + "scale(", null, ",", null, ")");
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb !== 1 || yb !== 1) {
          s.push(pop(s) + "scale(" + xb + "," + yb + ")");
        }
      }

      return function(a, b) {
        var s = [], // string constants and placeholders
            q = []; // number interpolators
        a = parse(a), b = parse(b);
        translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
        rotate(a.rotate, b.rotate, s, q);
        skewX(a.skewX, b.skewX, s, q);
        scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
        a = b = null; // gc
        return function(t) {
          var i = -1, n = q.length, o;
          while (++i < n) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        };
      };
    }

    var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

    var epsilon2 = 1e-12;

    function cosh(x) {
      return ((x = Math.exp(x)) + 1 / x) / 2;
    }

    function sinh(x) {
      return ((x = Math.exp(x)) - 1 / x) / 2;
    }

    function tanh(x) {
      return ((x = Math.exp(2 * x)) - 1) / (x + 1);
    }

    var interpolateZoom = (function zoomRho(rho, rho2, rho4) {

      // p0 = [ux0, uy0, w0]
      // p1 = [ux1, uy1, w1]
      function zoom(p0, p1) {
        var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
            ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
            dx = ux1 - ux0,
            dy = uy1 - uy0,
            d2 = dx * dx + dy * dy,
            i,
            S;

        // Special case for u0 ≅ u1.
        if (d2 < epsilon2) {
          S = Math.log(w1 / w0) / rho;
          i = function(t) {
            return [
              ux0 + t * dx,
              uy0 + t * dy,
              w0 * Math.exp(rho * t * S)
            ];
          };
        }

        // General case.
        else {
          var d1 = Math.sqrt(d2),
              b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
              b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
              r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
              r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
          S = (r1 - r0) / rho;
          i = function(t) {
            var s = t * S,
                coshr0 = cosh(r0),
                u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
            return [
              ux0 + u * dx,
              uy0 + u * dy,
              w0 * coshr0 / cosh(rho * s + r0)
            ];
          };
        }

        i.duration = S * 1000 * rho / Math.SQRT2;

        return i;
      }

      zoom.rho = function(_) {
        var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
        return zoomRho(_1, _2, _4);
      };

      return zoom;
    })(Math.SQRT2, 2, 4);

    var frame = 0, // is an animation frame pending?
        timeout$1 = 0, // is a timeout pending?
        interval = 0, // are any timers active?
        pokeDelay = 1000, // how frequently we check for clock skew
        taskHead,
        taskTail,
        clockLast = 0,
        clockNow = 0,
        clockSkew = 0,
        clock = typeof performance === "object" && performance.now ? performance : Date,
        setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

    function now() {
      return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
    }

    function clearNow() {
      clockNow = 0;
    }

    function Timer() {
      this._call =
      this._time =
      this._next = null;
    }

    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
          if (taskTail) taskTail._next = this;
          else taskHead = this;
          taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
      },
      stop: function() {
        if (this._call) {
          this._call = null;
          this._time = Infinity;
          sleep();
        }
      }
    };

    function timer(callback, delay, time) {
      var t = new Timer;
      t.restart(callback, delay, time);
      return t;
    }

    function timerFlush() {
      now(); // Get the current time, if not already set.
      ++frame; // Pretend we’ve set an alarm, if we haven’t already.
      var t = taskHead, e;
      while (t) {
        if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
        t = t._next;
      }
      --frame;
    }

    function wake() {
      clockNow = (clockLast = clock.now()) + clockSkew;
      frame = timeout$1 = 0;
      try {
        timerFlush();
      } finally {
        frame = 0;
        nap();
        clockNow = 0;
      }
    }

    function poke() {
      var now = clock.now(), delay = now - clockLast;
      if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
    }

    function nap() {
      var t0, t1 = taskHead, t2, time = Infinity;
      while (t1) {
        if (t1._call) {
          if (time > t1._time) time = t1._time;
          t0 = t1, t1 = t1._next;
        } else {
          t2 = t1._next, t1._next = null;
          t1 = t0 ? t0._next = t2 : taskHead = t2;
        }
      }
      taskTail = t0;
      sleep(time);
    }

    function sleep(time) {
      if (frame) return; // Soonest alarm already set, or will be.
      if (timeout$1) timeout$1 = clearTimeout(timeout$1);
      var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
      if (delay > 24) {
        if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
        if (interval) interval = clearInterval(interval);
      } else {
        if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
        frame = 1, setFrame(wake);
      }
    }

    function timeout(callback, delay, time) {
      var t = new Timer;
      delay = delay == null ? 0 : +delay;
      t.restart(elapsed => {
        t.stop();
        callback(elapsed + delay);
      }, delay, time);
      return t;
    }

    var emptyOn = dispatch("start", "end", "cancel", "interrupt");
    var emptyTween = [];

    var CREATED = 0;
    var SCHEDULED = 1;
    var STARTING = 2;
    var STARTED = 3;
    var RUNNING = 4;
    var ENDING = 5;
    var ENDED = 6;

    function schedule(node, name, id, index, group, timing) {
      var schedules = node.__transition;
      if (!schedules) node.__transition = {};
      else if (id in schedules) return;
      create(node, id, {
        name: name,
        index: index, // For context during callback.
        group: group, // For context during callback.
        on: emptyOn,
        tween: emptyTween,
        time: timing.time,
        delay: timing.delay,
        duration: timing.duration,
        ease: timing.ease,
        timer: null,
        state: CREATED
      });
    }

    function init(node, id) {
      var schedule = get(node, id);
      if (schedule.state > CREATED) throw new Error("too late; already scheduled");
      return schedule;
    }

    function set(node, id) {
      var schedule = get(node, id);
      if (schedule.state > STARTED) throw new Error("too late; already running");
      return schedule;
    }

    function get(node, id) {
      var schedule = node.__transition;
      if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
      return schedule;
    }

    function create(node, id, self) {
      var schedules = node.__transition,
          tween;

      // Initialize the self timer when the transition is created.
      // Note the actual delay is not known until the first callback!
      schedules[id] = self;
      self.timer = timer(schedule, 0, self.time);

      function schedule(elapsed) {
        self.state = SCHEDULED;
        self.timer.restart(start, self.delay, self.time);

        // If the elapsed delay is less than our first sleep, start immediately.
        if (self.delay <= elapsed) start(elapsed - self.delay);
      }

      function start(elapsed) {
        var i, j, n, o;

        // If the state is not SCHEDULED, then we previously errored on start.
        if (self.state !== SCHEDULED) return stop();

        for (i in schedules) {
          o = schedules[i];
          if (o.name !== self.name) continue;

          // While this element already has a starting transition during this frame,
          // defer starting an interrupting transition until that transition has a
          // chance to tick (and possibly end); see d3/d3-transition#54!
          if (o.state === STARTED) return timeout(start);

          // Interrupt the active transition, if any.
          if (o.state === RUNNING) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("interrupt", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }

          // Cancel any pre-empted transitions.
          else if (+i < id) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("cancel", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }
        }

        // Defer the first tick to end of the current frame; see d3/d3#1576.
        // Note the transition may be canceled after start and before the first tick!
        // Note this must be scheduled before the start event; see d3/d3-transition#16!
        // Assuming this is successful, subsequent callbacks go straight to tick.
        timeout(function() {
          if (self.state === STARTED) {
            self.state = RUNNING;
            self.timer.restart(tick, self.delay, self.time);
            tick(elapsed);
          }
        });

        // Dispatch the start event.
        // Note this must be done before the tween are initialized.
        self.state = STARTING;
        self.on.call("start", node, node.__data__, self.index, self.group);
        if (self.state !== STARTING) return; // interrupted
        self.state = STARTED;

        // Initialize the tween, deleting null tween.
        tween = new Array(n = self.tween.length);
        for (i = 0, j = -1; i < n; ++i) {
          if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
            tween[++j] = o;
          }
        }
        tween.length = j + 1;
      }

      function tick(elapsed) {
        var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
            i = -1,
            n = tween.length;

        while (++i < n) {
          tween[i].call(node, t);
        }

        // Dispatch the end event.
        if (self.state === ENDING) {
          self.on.call("end", node, node.__data__, self.index, self.group);
          stop();
        }
      }

      function stop() {
        self.state = ENDED;
        self.timer.stop();
        delete schedules[id];
        for (var i in schedules) return; // eslint-disable-line no-unused-vars
        delete node.__transition;
      }
    }

    function interrupt(node, name) {
      var schedules = node.__transition,
          schedule,
          active,
          empty = true,
          i;

      if (!schedules) return;

      name = name == null ? null : name + "";

      for (i in schedules) {
        if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
        active = schedule.state > STARTING && schedule.state < ENDING;
        schedule.state = ENDED;
        schedule.timer.stop();
        schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
        delete schedules[i];
      }

      if (empty) delete node.__transition;
    }

    function selection_interrupt(name) {
      return this.each(function() {
        interrupt(this, name);
      });
    }

    function tweenRemove(id, name) {
      var tween0, tween1;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
          tween1 = tween0 = tween;
          for (var i = 0, n = tween1.length; i < n; ++i) {
            if (tween1[i].name === name) {
              tween1 = tween1.slice();
              tween1.splice(i, 1);
              break;
            }
          }
        }

        schedule.tween = tween1;
      };
    }

    function tweenFunction(id, name, value) {
      var tween0, tween1;
      if (typeof value !== "function") throw new Error;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
          tween1 = (tween0 = tween).slice();
          for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
            if (tween1[i].name === name) {
              tween1[i] = t;
              break;
            }
          }
          if (i === n) tween1.push(t);
        }

        schedule.tween = tween1;
      };
    }

    function transition_tween(name, value) {
      var id = this._id;

      name += "";

      if (arguments.length < 2) {
        var tween = get(this.node(), id).tween;
        for (var i = 0, n = tween.length, t; i < n; ++i) {
          if ((t = tween[i]).name === name) {
            return t.value;
          }
        }
        return null;
      }

      return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
    }

    function tweenValue(transition, name, value) {
      var id = transition._id;

      transition.each(function() {
        var schedule = set(this, id);
        (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
      });

      return function(node) {
        return get(node, id).value[name];
      };
    }

    function interpolate(a, b) {
      var c;
      return (typeof b === "number" ? interpolateNumber
          : b instanceof color ? interpolateRgb
          : (c = color(b)) ? (b = c, interpolateRgb)
          : interpolateString)(a, b);
    }

    function attrRemove(name) {
      return function() {
        this.removeAttribute(name);
      };
    }

    function attrRemoveNS(fullname) {
      return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
      };
    }

    function attrConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttribute(name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrConstantNS(fullname, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttributeNS(fullname.space, fullname.local);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttribute(name);
        string0 = this.getAttribute(name);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function attrFunctionNS(fullname, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
        string0 = this.getAttributeNS(fullname.space, fullname.local);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function transition_attr(name, value) {
      var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
      return this.attrTween(name, typeof value === "function"
          ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
          : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
          : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
    }

    function attrInterpolate(name, i) {
      return function(t) {
        this.setAttribute(name, i.call(this, t));
      };
    }

    function attrInterpolateNS(fullname, i) {
      return function(t) {
        this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
      };
    }

    function attrTweenNS(fullname, value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function attrTween(name, value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_attrTween(name, value) {
      var key = "attr." + name;
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      var fullname = namespace(name);
      return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
    }

    function delayFunction(id, value) {
      return function() {
        init(this, id).delay = +value.apply(this, arguments);
      };
    }

    function delayConstant(id, value) {
      return value = +value, function() {
        init(this, id).delay = value;
      };
    }

    function transition_delay(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? delayFunction
              : delayConstant)(id, value))
          : get(this.node(), id).delay;
    }

    function durationFunction(id, value) {
      return function() {
        set(this, id).duration = +value.apply(this, arguments);
      };
    }

    function durationConstant(id, value) {
      return value = +value, function() {
        set(this, id).duration = value;
      };
    }

    function transition_duration(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? durationFunction
              : durationConstant)(id, value))
          : get(this.node(), id).duration;
    }

    function easeConstant(id, value) {
      if (typeof value !== "function") throw new Error;
      return function() {
        set(this, id).ease = value;
      };
    }

    function transition_ease(value) {
      var id = this._id;

      return arguments.length
          ? this.each(easeConstant(id, value))
          : get(this.node(), id).ease;
    }

    function easeVarying(id, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (typeof v !== "function") throw new Error;
        set(this, id).ease = v;
      };
    }

    function transition_easeVarying(value) {
      if (typeof value !== "function") throw new Error;
      return this.each(easeVarying(this._id, value));
    }

    function transition_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Transition(subgroups, this._parents, this._name, this._id);
    }

    function transition_merge(transition) {
      if (transition._id !== this._id) throw new Error;

      for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
        for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group0[i] || group1[i]) {
            merge[i] = node;
          }
        }
      }

      for (; j < m0; ++j) {
        merges[j] = groups0[j];
      }

      return new Transition(merges, this._parents, this._name, this._id);
    }

    function start(name) {
      return (name + "").trim().split(/^|\s+/).every(function(t) {
        var i = t.indexOf(".");
        if (i >= 0) t = t.slice(0, i);
        return !t || t === "start";
      });
    }

    function onFunction(id, name, listener) {
      var on0, on1, sit = start(name) ? init : set;
      return function() {
        var schedule = sit(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

        schedule.on = on1;
      };
    }

    function transition_on(name, listener) {
      var id = this._id;

      return arguments.length < 2
          ? get(this.node(), id).on.on(name)
          : this.each(onFunction(id, name, listener));
    }

    function removeFunction(id) {
      return function() {
        var parent = this.parentNode;
        for (var i in this.__transition) if (+i !== id) return;
        if (parent) parent.removeChild(this);
      };
    }

    function transition_remove() {
      return this.on("end.remove", removeFunction(this._id));
    }

    function transition_select(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
            schedule(subgroup[i], name, id, i, subgroup, get(node, id));
          }
        }
      }

      return new Transition(subgroups, this._parents, name, id);
    }

    function transition_selectAll(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
              if (child = children[k]) {
                schedule(child, name, id, k, children, inherit);
              }
            }
            subgroups.push(children);
            parents.push(node);
          }
        }
      }

      return new Transition(subgroups, parents, name, id);
    }

    var Selection = selection.prototype.constructor;

    function transition_selection() {
      return new Selection(this._groups, this._parents);
    }

    function styleNull(name, interpolate) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            string1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, string10 = string1);
      };
    }

    function styleRemove(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = styleValue(this, name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function styleFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            value1 = value(this),
            string1 = value1 + "";
        if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function styleMaybeRemove(id, name) {
      var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
      return function() {
        var schedule = set(this, id),
            on = schedule.on,
            listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

        schedule.on = on1;
      };
    }

    function transition_style(name, value, priority) {
      var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
      return value == null ? this
          .styleTween(name, styleNull(name, i))
          .on("end.style." + name, styleRemove(name))
        : typeof value === "function" ? this
          .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
          .each(styleMaybeRemove(this._id, name))
        : this
          .styleTween(name, styleConstant(name, i, value), priority)
          .on("end.style." + name, null);
    }

    function styleInterpolate(name, i, priority) {
      return function(t) {
        this.style.setProperty(name, i.call(this, t), priority);
      };
    }

    function styleTween(name, value, priority) {
      var t, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
        return t;
      }
      tween._value = value;
      return tween;
    }

    function transition_styleTween(name, value, priority) {
      var key = "style." + (name += "");
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
    }

    function textConstant(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction(value) {
      return function() {
        var value1 = value(this);
        this.textContent = value1 == null ? "" : value1;
      };
    }

    function transition_text(value) {
      return this.tween("text", typeof value === "function"
          ? textFunction(tweenValue(this, "text", value))
          : textConstant(value == null ? "" : value + ""));
    }

    function textInterpolate(i) {
      return function(t) {
        this.textContent = i.call(this, t);
      };
    }

    function textTween(value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_textTween(value) {
      var key = "text";
      if (arguments.length < 1) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, textTween(value));
    }

    function transition_transition() {
      var name = this._name,
          id0 = this._id,
          id1 = newId();

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            var inherit = get(node, id0);
            schedule(node, name, id1, i, group, {
              time: inherit.time + inherit.delay + inherit.duration,
              delay: 0,
              duration: inherit.duration,
              ease: inherit.ease
            });
          }
        }
      }

      return new Transition(groups, this._parents, name, id1);
    }

    function transition_end() {
      var on0, on1, that = this, id = that._id, size = that.size();
      return new Promise(function(resolve, reject) {
        var cancel = {value: reject},
            end = {value: function() { if (--size === 0) resolve(); }};

        that.each(function() {
          var schedule = set(this, id),
              on = schedule.on;

          // If this node shared a dispatch with the previous node,
          // just assign the updated shared dispatch and we’re done!
          // Otherwise, copy-on-write.
          if (on !== on0) {
            on1 = (on0 = on).copy();
            on1._.cancel.push(cancel);
            on1._.interrupt.push(cancel);
            on1._.end.push(end);
          }

          schedule.on = on1;
        });

        // The selection was empty, resolve end immediately
        if (size === 0) resolve();
      });
    }

    var id = 0;

    function Transition(groups, parents, name, id) {
      this._groups = groups;
      this._parents = parents;
      this._name = name;
      this._id = id;
    }

    function newId() {
      return ++id;
    }

    var selection_prototype = selection.prototype;

    Transition.prototype = {
      constructor: Transition,
      select: transition_select,
      selectAll: transition_selectAll,
      selectChild: selection_prototype.selectChild,
      selectChildren: selection_prototype.selectChildren,
      filter: transition_filter,
      merge: transition_merge,
      selection: transition_selection,
      transition: transition_transition,
      call: selection_prototype.call,
      nodes: selection_prototype.nodes,
      node: selection_prototype.node,
      size: selection_prototype.size,
      empty: selection_prototype.empty,
      each: selection_prototype.each,
      on: transition_on,
      attr: transition_attr,
      attrTween: transition_attrTween,
      style: transition_style,
      styleTween: transition_styleTween,
      text: transition_text,
      textTween: transition_textTween,
      remove: transition_remove,
      tween: transition_tween,
      delay: transition_delay,
      duration: transition_duration,
      ease: transition_ease,
      easeVarying: transition_easeVarying,
      end: transition_end,
      [Symbol.iterator]: selection_prototype[Symbol.iterator]
    };

    function cubicInOut(t) {
      return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    }

    var defaultTiming = {
      time: null, // Set on use.
      delay: 0,
      duration: 250,
      ease: cubicInOut
    };

    function inherit(node, id) {
      var timing;
      while (!(timing = node.__transition) || !(timing = timing[id])) {
        if (!(node = node.parentNode)) {
          throw new Error(`transition ${id} not found`);
        }
      }
      return timing;
    }

    function selection_transition(name) {
      var id,
          timing;

      if (name instanceof Transition) {
        id = name._id, name = name._name;
      } else {
        id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
      }

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            schedule(node, name, id, i, group, timing || inherit(node, id));
          }
        }
      }

      return new Transition(groups, this._parents, name, id);
    }

    selection.prototype.interrupt = selection_interrupt;
    selection.prototype.transition = selection_transition;

    var constant = x => () => x;

    function ZoomEvent(type, {
      sourceEvent,
      target,
      transform,
      dispatch
    }) {
      Object.defineProperties(this, {
        type: {value: type, enumerable: true, configurable: true},
        sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
        target: {value: target, enumerable: true, configurable: true},
        transform: {value: transform, enumerable: true, configurable: true},
        _: {value: dispatch}
      });
    }

    function Transform(k, x, y) {
      this.k = k;
      this.x = x;
      this.y = y;
    }

    Transform.prototype = {
      constructor: Transform,
      scale: function(k) {
        return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
      },
      translate: function(x, y) {
        return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
      },
      apply: function(point) {
        return [point[0] * this.k + this.x, point[1] * this.k + this.y];
      },
      applyX: function(x) {
        return x * this.k + this.x;
      },
      applyY: function(y) {
        return y * this.k + this.y;
      },
      invert: function(location) {
        return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
      },
      invertX: function(x) {
        return (x - this.x) / this.k;
      },
      invertY: function(y) {
        return (y - this.y) / this.k;
      },
      rescaleX: function(x) {
        return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
      },
      rescaleY: function(y) {
        return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
      },
      toString: function() {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
      }
    };

    var identity = new Transform(1, 0, 0);

    transform.prototype = Transform.prototype;

    function transform(node) {
      while (!node.__zoom) if (!(node = node.parentNode)) return identity;
      return node.__zoom;
    }

    function nopropagation(event) {
      event.stopImmediatePropagation();
    }

    function noevent(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    // Ignore right-click, since that should open the context menu.
    // except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
    function defaultFilter(event) {
      return (!event.ctrlKey || event.type === 'wheel') && !event.button;
    }

    function defaultExtent() {
      var e = this;
      if (e instanceof SVGElement) {
        e = e.ownerSVGElement || e;
        if (e.hasAttribute("viewBox")) {
          e = e.viewBox.baseVal;
          return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
        }
        return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
      }
      return [[0, 0], [e.clientWidth, e.clientHeight]];
    }

    function defaultTransform() {
      return this.__zoom || identity;
    }

    function defaultWheelDelta(event) {
      return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
    }

    function defaultTouchable() {
      return navigator.maxTouchPoints || ("ontouchstart" in this);
    }

    function defaultConstrain(transform, extent, translateExtent) {
      var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
          dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
          dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
          dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
      return transform.translate(
        dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
        dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
      );
    }

    function zoom() {
      var filter = defaultFilter,
          extent = defaultExtent,
          constrain = defaultConstrain,
          wheelDelta = defaultWheelDelta,
          touchable = defaultTouchable,
          scaleExtent = [0, Infinity],
          translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
          duration = 250,
          interpolate = interpolateZoom,
          listeners = dispatch("start", "zoom", "end"),
          touchstarting,
          touchfirst,
          touchending,
          touchDelay = 500,
          wheelDelay = 150,
          clickDistance2 = 0,
          tapDistance = 10;

      function zoom(selection) {
        selection
            .property("__zoom", defaultTransform)
            .on("wheel.zoom", wheeled, {passive: false})
            .on("mousedown.zoom", mousedowned)
            .on("dblclick.zoom", dblclicked)
          .filter(touchable)
            .on("touchstart.zoom", touchstarted)
            .on("touchmove.zoom", touchmoved)
            .on("touchend.zoom touchcancel.zoom", touchended)
            .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
      }

      zoom.transform = function(collection, transform, point, event) {
        var selection = collection.selection ? collection.selection() : collection;
        selection.property("__zoom", defaultTransform);
        if (collection !== selection) {
          schedule(collection, transform, point, event);
        } else {
          selection.interrupt().each(function() {
            gesture(this, arguments)
              .event(event)
              .start()
              .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
              .end();
          });
        }
      };

      zoom.scaleBy = function(selection, k, p, event) {
        zoom.scaleTo(selection, function() {
          var k0 = this.__zoom.k,
              k1 = typeof k === "function" ? k.apply(this, arguments) : k;
          return k0 * k1;
        }, p, event);
      };

      zoom.scaleTo = function(selection, k, p, event) {
        zoom.transform(selection, function() {
          var e = extent.apply(this, arguments),
              t0 = this.__zoom,
              p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
              p1 = t0.invert(p0),
              k1 = typeof k === "function" ? k.apply(this, arguments) : k;
          return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
        }, p, event);
      };

      zoom.translateBy = function(selection, x, y, event) {
        zoom.transform(selection, function() {
          return constrain(this.__zoom.translate(
            typeof x === "function" ? x.apply(this, arguments) : x,
            typeof y === "function" ? y.apply(this, arguments) : y
          ), extent.apply(this, arguments), translateExtent);
        }, null, event);
      };

      zoom.translateTo = function(selection, x, y, p, event) {
        zoom.transform(selection, function() {
          var e = extent.apply(this, arguments),
              t = this.__zoom,
              p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
          return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
            typeof x === "function" ? -x.apply(this, arguments) : -x,
            typeof y === "function" ? -y.apply(this, arguments) : -y
          ), e, translateExtent);
        }, p, event);
      };

      function scale(transform, k) {
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
        return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
      }

      function translate(transform, p0, p1) {
        var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
        return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
      }

      function centroid(extent) {
        return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
      }

      function schedule(transition, transform, point, event) {
        transition
            .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
            .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
            .tween("zoom", function() {
              var that = this,
                  args = arguments,
                  g = gesture(that, args).event(event),
                  e = extent.apply(that, args),
                  p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
                  w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
                  a = that.__zoom,
                  b = typeof transform === "function" ? transform.apply(that, args) : transform,
                  i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
              return function(t) {
                if (t === 1) t = b; // Avoid rounding error on end.
                else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
                g.zoom(null, t);
              };
            });
      }

      function gesture(that, args, clean) {
        return (!clean && that.__zooming) || new Gesture(that, args);
      }

      function Gesture(that, args) {
        this.that = that;
        this.args = args;
        this.active = 0;
        this.sourceEvent = null;
        this.extent = extent.apply(that, args);
        this.taps = 0;
      }

      Gesture.prototype = {
        event: function(event) {
          if (event) this.sourceEvent = event;
          return this;
        },
        start: function() {
          if (++this.active === 1) {
            this.that.__zooming = this;
            this.emit("start");
          }
          return this;
        },
        zoom: function(key, transform) {
          if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
          if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
          if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
          this.that.__zoom = transform;
          this.emit("zoom");
          return this;
        },
        end: function() {
          if (--this.active === 0) {
            delete this.that.__zooming;
            this.emit("end");
          }
          return this;
        },
        emit: function(type) {
          var d = select(this.that).datum();
          listeners.call(
            type,
            this.that,
            new ZoomEvent(type, {
              sourceEvent: this.sourceEvent,
              target: zoom,
              type,
              transform: this.that.__zoom,
              dispatch: listeners
            }),
            d
          );
        }
      };

      function wheeled(event, ...args) {
        if (!filter.apply(this, arguments)) return;
        var g = gesture(this, args).event(event),
            t = this.__zoom,
            k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
            p = pointer(event);

        // If the mouse is in the same location as before, reuse it.
        // If there were recent wheel events, reset the wheel idle timeout.
        if (g.wheel) {
          if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
            g.mouse[1] = t.invert(g.mouse[0] = p);
          }
          clearTimeout(g.wheel);
        }

        // If this wheel event won’t trigger a transform change, ignore it.
        else if (t.k === k) return;

        // Otherwise, capture the mouse point and location at the start.
        else {
          g.mouse = [p, t.invert(p)];
          interrupt(this);
          g.start();
        }

        noevent(event);
        g.wheel = setTimeout(wheelidled, wheelDelay);
        g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

        function wheelidled() {
          g.wheel = null;
          g.end();
        }
      }

      function mousedowned(event, ...args) {
        if (touchending || !filter.apply(this, arguments)) return;
        var currentTarget = event.currentTarget,
            g = gesture(this, args, true).event(event),
            v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
            p = pointer(event, currentTarget),
            x0 = event.clientX,
            y0 = event.clientY;

        dragDisable(event.view);
        nopropagation(event);
        g.mouse = [p, this.__zoom.invert(p)];
        interrupt(this);
        g.start();

        function mousemoved(event) {
          noevent(event);
          if (!g.moved) {
            var dx = event.clientX - x0, dy = event.clientY - y0;
            g.moved = dx * dx + dy * dy > clickDistance2;
          }
          g.event(event)
           .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
        }

        function mouseupped(event) {
          v.on("mousemove.zoom mouseup.zoom", null);
          yesdrag(event.view, g.moved);
          noevent(event);
          g.event(event).end();
        }
      }

      function dblclicked(event, ...args) {
        if (!filter.apply(this, arguments)) return;
        var t0 = this.__zoom,
            p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
            p1 = t0.invert(p0),
            k1 = t0.k * (event.shiftKey ? 0.5 : 2),
            t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

        noevent(event);
        if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
        else select(this).call(zoom.transform, t1, p0, event);
      }

      function touchstarted(event, ...args) {
        if (!filter.apply(this, arguments)) return;
        var touches = event.touches,
            n = touches.length,
            g = gesture(this, args, event.changedTouches.length === n).event(event),
            started, i, t, p;

        nopropagation(event);
        for (i = 0; i < n; ++i) {
          t = touches[i], p = pointer(t, this);
          p = [p, this.__zoom.invert(p), t.identifier];
          if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
          else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
        }

        if (touchstarting) touchstarting = clearTimeout(touchstarting);

        if (started) {
          if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
          interrupt(this);
          g.start();
        }
      }

      function touchmoved(event, ...args) {
        if (!this.__zooming) return;
        var g = gesture(this, args).event(event),
            touches = event.changedTouches,
            n = touches.length, i, t, p, l;

        noevent(event);
        for (i = 0; i < n; ++i) {
          t = touches[i], p = pointer(t, this);
          if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
          else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
        }
        t = g.that.__zoom;
        if (g.touch1) {
          var p0 = g.touch0[0], l0 = g.touch0[1],
              p1 = g.touch1[0], l1 = g.touch1[1],
              dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
              dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
          t = scale(t, Math.sqrt(dp / dl));
          p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
          l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
        }
        else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
        else return;

        g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
      }

      function touchended(event, ...args) {
        if (!this.__zooming) return;
        var g = gesture(this, args).event(event),
            touches = event.changedTouches,
            n = touches.length, i, t;

        nopropagation(event);
        if (touchending) clearTimeout(touchending);
        touchending = setTimeout(function() { touchending = null; }, touchDelay);
        for (i = 0; i < n; ++i) {
          t = touches[i];
          if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
          else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
        }
        if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
        if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
        else {
          g.end();
          // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
          if (g.taps === 2) {
            t = pointer(t, this);
            if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
              var p = select(this).on("dblclick.zoom");
              if (p) p.apply(this, arguments);
            }
          }
        }
      }

      zoom.wheelDelta = function(_) {
        return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
      };

      zoom.filter = function(_) {
        return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
      };

      zoom.touchable = function(_) {
        return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
      };

      zoom.extent = function(_) {
        return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
      };

      zoom.scaleExtent = function(_) {
        return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
      };

      zoom.translateExtent = function(_) {
        return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
      };

      zoom.constrain = function(_) {
        return arguments.length ? (constrain = _, zoom) : constrain;
      };

      zoom.duration = function(_) {
        return arguments.length ? (duration = +_, zoom) : duration;
      };

      zoom.interpolate = function(_) {
        return arguments.length ? (interpolate = _, zoom) : interpolate;
      };

      zoom.on = function() {
        var value = listeners.on.apply(listeners, arguments);
        return value === listeners ? zoom : value;
      };

      zoom.clickDistance = function(_) {
        return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
      };

      zoom.tapDistance = function(_) {
        return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
      };

      return zoom;
    }

    /* node_modules/svelvet/Edges/EdgeText.svelte generated by Svelte v3.52.0 */

    const file$y = "node_modules/svelvet/Edges/EdgeText.svelte";

    // (25:0) {:else}
    function create_else_block$8(ctx) {
    	let g;
    	let rect;
    	let rect_fill_value;
    	let rect_x_value;
    	let rect_y_value;
    	let text_1;
    	let t;
    	let text_1_fill_value;

    	const block = {
    		c: function create() {
    			g = svg_element("g");
    			rect = svg_element("rect");
    			text_1 = svg_element("text");
    			t = text(/*label*/ ctx[0]);
    			attr_dev(rect, "class", "EdgeTextBg");
    			attr_dev(rect, "data-testid", "edge-text-bg");

    			attr_dev(rect, "fill", rect_fill_value = /*labelBgColor*/ ctx[5]
    			? /*labelBgColor*/ ctx[5]
    			: 'white');

    			attr_dev(rect, "x", rect_x_value = /*textCenterX*/ ctx[3] - /*labelPx*/ ctx[1] / 2);
    			attr_dev(rect, "y", rect_y_value = /*textCenterY*/ ctx[2] - shiftRectY);
    			attr_dev(rect, "width", /*labelPx*/ ctx[1]);
    			attr_dev(rect, "height", 16);
    			add_location(rect, file$y, 26, 4, 779);
    			attr_dev(text_1, "class", "EdgeText");
    			attr_dev(text_1, "x", /*textCenterX*/ ctx[3]);
    			attr_dev(text_1, "y", /*textCenterY*/ ctx[2]);
    			attr_dev(text_1, "font-size", "12px");
    			attr_dev(text_1, "dominant-baseline", "central");
    			attr_dev(text_1, "text-anchor", "middle");

    			attr_dev(text_1, "fill", text_1_fill_value = /*labelTextColor*/ ctx[4]
    			? /*labelTextColor*/ ctx[4]
    			: 'black');

    			add_location(text_1, file$y, 35, 4, 1016);
    			add_location(g, file$y, 25, 2, 771);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, g, anchor);
    			append_dev(g, rect);
    			append_dev(g, text_1);
    			append_dev(text_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*labelBgColor*/ 32 && rect_fill_value !== (rect_fill_value = /*labelBgColor*/ ctx[5]
    			? /*labelBgColor*/ ctx[5]
    			: 'white')) {
    				attr_dev(rect, "fill", rect_fill_value);
    			}

    			if (dirty & /*textCenterX, labelPx*/ 10 && rect_x_value !== (rect_x_value = /*textCenterX*/ ctx[3] - /*labelPx*/ ctx[1] / 2)) {
    				attr_dev(rect, "x", rect_x_value);
    			}

    			if (dirty & /*textCenterY*/ 4 && rect_y_value !== (rect_y_value = /*textCenterY*/ ctx[2] - shiftRectY)) {
    				attr_dev(rect, "y", rect_y_value);
    			}

    			if (dirty & /*labelPx*/ 2) {
    				attr_dev(rect, "width", /*labelPx*/ ctx[1]);
    			}

    			if (dirty & /*label*/ 1) set_data_dev(t, /*label*/ ctx[0]);

    			if (dirty & /*textCenterX*/ 8) {
    				attr_dev(text_1, "x", /*textCenterX*/ ctx[3]);
    			}

    			if (dirty & /*textCenterY*/ 4) {
    				attr_dev(text_1, "y", /*textCenterY*/ ctx[2]);
    			}

    			if (dirty & /*labelTextColor*/ 16 && text_1_fill_value !== (text_1_fill_value = /*labelTextColor*/ ctx[4]
    			? /*labelTextColor*/ ctx[4]
    			: 'black')) {
    				attr_dev(text_1, "fill", text_1_fill_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(g);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$8.name,
    		type: "else",
    		source: "(25:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (23:0) {#if typeof label === 'undefined' || !label}
    function create_if_block$p(ctx) {
    	let t_value = null + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$p.name,
    		type: "if",
    		source: "(23:0) {#if typeof label === 'undefined' || !label}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$F(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (typeof /*label*/ ctx[0] === 'undefined' || !/*label*/ ctx[0]) return create_if_block$p;
    		return create_else_block$8;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$1();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$F.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const shiftRectY = 7;

    function instance$F($$self, $$props, $$invalidate) {
    	let label;
    	let labelBgColor;
    	let labelTextColor;
    	let centerX;
    	let centerY;
    	let pxRatio;
    	let textCenterX;
    	let textCenterY;
    	let spaces;
    	let newLength;
    	let labelPx;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('EdgeText', slots, []);
    	let { edgeTextProps } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (edgeTextProps === undefined && !('edgeTextProps' in $$props || $$self.$$.bound[$$self.$$.props['edgeTextProps']])) {
    			console.warn("<EdgeText> was created without expected prop 'edgeTextProps'");
    		}
    	});

    	const writable_props = ['edgeTextProps'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<EdgeText> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('edgeTextProps' in $$props) $$invalidate(6, edgeTextProps = $$props.edgeTextProps);
    	};

    	$$self.$capture_state = () => ({
    		edgeTextProps,
    		shiftRectY,
    		pxRatio,
    		newLength,
    		labelPx,
    		spaces,
    		label,
    		centerY,
    		textCenterY,
    		centerX,
    		textCenterX,
    		labelTextColor,
    		labelBgColor
    	});

    	$$self.$inject_state = $$props => {
    		if ('edgeTextProps' in $$props) $$invalidate(6, edgeTextProps = $$props.edgeTextProps);
    		if ('pxRatio' in $$props) $$invalidate(7, pxRatio = $$props.pxRatio);
    		if ('newLength' in $$props) $$invalidate(8, newLength = $$props.newLength);
    		if ('labelPx' in $$props) $$invalidate(1, labelPx = $$props.labelPx);
    		if ('spaces' in $$props) $$invalidate(9, spaces = $$props.spaces);
    		if ('label' in $$props) $$invalidate(0, label = $$props.label);
    		if ('centerY' in $$props) $$invalidate(10, centerY = $$props.centerY);
    		if ('textCenterY' in $$props) $$invalidate(2, textCenterY = $$props.textCenterY);
    		if ('centerX' in $$props) $$invalidate(11, centerX = $$props.centerX);
    		if ('textCenterX' in $$props) $$invalidate(3, textCenterX = $$props.textCenterX);
    		if ('labelTextColor' in $$props) $$invalidate(4, labelTextColor = $$props.labelTextColor);
    		if ('labelBgColor' in $$props) $$invalidate(5, labelBgColor = $$props.labelBgColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*edgeTextProps*/ 64) {
    			$$invalidate(0, { label, labelBgColor, labelTextColor, centerX, centerY } = edgeTextProps, label, ($$invalidate(5, labelBgColor), $$invalidate(6, edgeTextProps)), ($$invalidate(4, labelTextColor), $$invalidate(6, edgeTextProps)), ($$invalidate(11, centerX), $$invalidate(6, edgeTextProps)), ($$invalidate(10, centerY), $$invalidate(6, edgeTextProps)));
    		}

    		if ($$self.$$.dirty & /*label*/ 1) {
    			$$invalidate(7, pxRatio = label.length < 3 ? 9 : 7);
    		}

    		if ($$self.$$.dirty & /*centerX*/ 2048) {
    			// determine the center point of the edge to be used in the EdgeText component
    			$$invalidate(3, textCenterX = centerX);
    		}

    		if ($$self.$$.dirty & /*centerY*/ 1024) {
    			$$invalidate(2, textCenterY = centerY);
    		}

    		if ($$self.$$.dirty & /*label*/ 1) {
    			// determine width of rect to render based on label.length (removing spaces)
    			// pxRatio is an estimate of how many pixels 1 character might take up
    			// pxRatio not 100% accurate as font is not monospace
    			$$invalidate(9, spaces = label.split(' ').length - 1);
    		}

    		if ($$self.$$.dirty & /*label, spaces*/ 513) {
    			$$invalidate(8, newLength = label.length - spaces);
    		}

    		if ($$self.$$.dirty & /*newLength, pxRatio*/ 384) {
    			$$invalidate(1, labelPx = newLength * pxRatio);
    		}
    	};

    	return [
    		label,
    		labelPx,
    		textCenterY,
    		textCenterX,
    		labelTextColor,
    		labelBgColor,
    		edgeTextProps,
    		pxRatio,
    		newLength,
    		spaces,
    		centerY,
    		centerX
    	];
    }

    class EdgeText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$F, create_fragment$F, safe_not_equal, { edgeTextProps: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EdgeText",
    			options,
    			id: create_fragment$F.name
    		});
    	}

    	get edgeTextProps() {
    		throw new Error("<EdgeText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edgeTextProps(value) {
    		throw new Error("<EdgeText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Edges/BaseEdge.svelte generated by Svelte v3.52.0 */
    const file$x = "node_modules/svelvet/Edges/BaseEdge.svelte";

    // (41:0) {:else}
    function create_else_block$7(ctx) {
    	let path_1;
    	let path_1_class_value;
    	let path_1_stroke_value;

    	const block = {
    		c: function create() {
    			path_1 = svg_element("path");
    			attr_dev(path_1, "class", path_1_class_value = "" + (null_to_empty(/*animate*/ ctx[3] ? 'animate' : '') + " svelte-qtkn5z"));
    			attr_dev(path_1, "d", /*path*/ ctx[4]);
    			attr_dev(path_1, "fill", "transparent");
    			attr_dev(path_1, "stroke", path_1_stroke_value = /*edgeColor*/ ctx[1] ? /*edgeColor*/ ctx[1] : 'gray');
    			attr_dev(path_1, "aria-label", "svg-path");
    			add_location(path_1, file$x, 41, 2, 891);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*animate*/ 8 && path_1_class_value !== (path_1_class_value = "" + (null_to_empty(/*animate*/ ctx[3] ? 'animate' : '') + " svelte-qtkn5z"))) {
    				attr_dev(path_1, "class", path_1_class_value);
    			}

    			if (dirty & /*path*/ 16) {
    				attr_dev(path_1, "d", /*path*/ ctx[4]);
    			}

    			if (dirty & /*edgeColor*/ 2 && path_1_stroke_value !== (path_1_stroke_value = /*edgeColor*/ ctx[1] ? /*edgeColor*/ ctx[1] : 'gray')) {
    				attr_dev(path_1, "stroke", path_1_stroke_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$7.name,
    		type: "else",
    		source: "(41:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (32:0) {#if arrow}
    function create_if_block_1$9(ctx) {
    	let path_1;
    	let path_1_class_value;
    	let path_1_stroke_value;

    	const block = {
    		c: function create() {
    			path_1 = svg_element("path");
    			attr_dev(path_1, "class", path_1_class_value = "" + (null_to_empty(/*animate*/ ctx[3] ? 'animate' : '') + " svelte-qtkn5z"));
    			attr_dev(path_1, "d", /*path*/ ctx[4]);
    			attr_dev(path_1, "fill", "transparent");
    			attr_dev(path_1, "stroke", path_1_stroke_value = /*edgeColor*/ ctx[1] ? /*edgeColor*/ ctx[1] : 'gray');
    			attr_dev(path_1, "marker-end", "url(#arrow)");
    			attr_dev(path_1, "aria-label", "svg-path");
    			add_location(path_1, file$x, 32, 2, 698);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*animate*/ 8 && path_1_class_value !== (path_1_class_value = "" + (null_to_empty(/*animate*/ ctx[3] ? 'animate' : '') + " svelte-qtkn5z"))) {
    				attr_dev(path_1, "class", path_1_class_value);
    			}

    			if (dirty & /*path*/ 16) {
    				attr_dev(path_1, "d", /*path*/ ctx[4]);
    			}

    			if (dirty & /*edgeColor*/ 2 && path_1_stroke_value !== (path_1_stroke_value = /*edgeColor*/ ctx[1] ? /*edgeColor*/ ctx[1] : 'gray')) {
    				attr_dev(path_1, "stroke", path_1_stroke_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$9.name,
    		type: "if",
    		source: "(32:0) {#if arrow}",
    		ctx
    	});

    	return block;
    }

    // (51:0) {#if edgeTextProps.label}
    function create_if_block$o(ctx) {
    	let edgetext;
    	let current;

    	edgetext = new EdgeText({
    			props: { edgeTextProps: /*edgeTextProps*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(edgetext.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(edgetext, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const edgetext_changes = {};
    			if (dirty & /*edgeTextProps*/ 1) edgetext_changes.edgeTextProps = /*edgeTextProps*/ ctx[0];
    			edgetext.$set(edgetext_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(edgetext.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(edgetext.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(edgetext, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$o.name,
    		type: "if",
    		source: "(51:0) {#if edgeTextProps.label}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$E(ctx) {
    	let defs;
    	let marker;
    	let polygon;
    	let t0;
    	let t1;
    	let if_block1_anchor;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*arrow*/ ctx[2]) return create_if_block_1$9;
    		return create_else_block$7;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*edgeTextProps*/ ctx[0].label && create_if_block$o(ctx);

    	const block = {
    		c: function create() {
    			defs = svg_element("defs");
    			marker = svg_element("marker");
    			polygon = svg_element("polygon");
    			t0 = space();
    			if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty$1();
    			attr_dev(polygon, "points", /*defaultArrow*/ ctx[5]);
    			attr_dev(polygon, "fill", "gray");
    			add_location(polygon, file$x, 27, 4, 617);
    			attr_dev(marker, "id", "arrow");
    			attr_dev(marker, "markerWidth", "9");
    			attr_dev(marker, "markerHeight", "9");
    			attr_dev(marker, "refX", "8");
    			attr_dev(marker, "refY", "4");
    			attr_dev(marker, "orient", "auto");
    			add_location(marker, file$x, 26, 2, 528);
    			add_location(defs, file$x, 25, 0, 519);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, defs, anchor);
    			append_dev(defs, marker);
    			append_dev(marker, polygon);
    			insert_dev(target, t0, anchor);
    			if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(t1.parentNode, t1);
    				}
    			}

    			if (/*edgeTextProps*/ ctx[0].label) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*edgeTextProps*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$o(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(defs);
    			if (detaching) detach_dev(t0);
    			if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$E.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$E($$self, $$props, $$invalidate) {
    	let path;
    	let animate;
    	let arrow;
    	let label;
    	let labelBgColor;
    	let labelTextColor;
    	let edgeColor;
    	let centerX;
    	let centerY;
    	let edgeTextProps;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BaseEdge', slots, []);
    	let { baseEdgeProps } = $$props;
    	const defaultArrow = `0 0, 9 4.5, 0 9`;

    	$$self.$$.on_mount.push(function () {
    		if (baseEdgeProps === undefined && !('baseEdgeProps' in $$props || $$self.$$.bound[$$self.$$.props['baseEdgeProps']])) {
    			console.warn("<BaseEdge> was created without expected prop 'baseEdgeProps'");
    		}
    	});

    	const writable_props = ['baseEdgeProps'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BaseEdge> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('baseEdgeProps' in $$props) $$invalidate(6, baseEdgeProps = $$props.baseEdgeProps);
    	};

    	$$self.$capture_state = () => ({
    		EdgeText,
    		baseEdgeProps,
    		defaultArrow,
    		centerY,
    		centerX,
    		labelTextColor,
    		labelBgColor,
    		label,
    		edgeTextProps,
    		edgeColor,
    		arrow,
    		animate,
    		path
    	});

    	$$self.$inject_state = $$props => {
    		if ('baseEdgeProps' in $$props) $$invalidate(6, baseEdgeProps = $$props.baseEdgeProps);
    		if ('centerY' in $$props) $$invalidate(7, centerY = $$props.centerY);
    		if ('centerX' in $$props) $$invalidate(8, centerX = $$props.centerX);
    		if ('labelTextColor' in $$props) $$invalidate(9, labelTextColor = $$props.labelTextColor);
    		if ('labelBgColor' in $$props) $$invalidate(10, labelBgColor = $$props.labelBgColor);
    		if ('label' in $$props) $$invalidate(11, label = $$props.label);
    		if ('edgeTextProps' in $$props) $$invalidate(0, edgeTextProps = $$props.edgeTextProps);
    		if ('edgeColor' in $$props) $$invalidate(1, edgeColor = $$props.edgeColor);
    		if ('arrow' in $$props) $$invalidate(2, arrow = $$props.arrow);
    		if ('animate' in $$props) $$invalidate(3, animate = $$props.animate);
    		if ('path' in $$props) $$invalidate(4, path = $$props.path);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*baseEdgeProps*/ 64) {
    			// destructuring the props passed in from the parent component
    			$$invalidate(4, { path, animate, arrow, label, labelBgColor, labelTextColor, edgeColor, centerX, centerY } = baseEdgeProps, path, ($$invalidate(3, animate), $$invalidate(6, baseEdgeProps)), ($$invalidate(2, arrow), $$invalidate(6, baseEdgeProps)), ($$invalidate(11, label), $$invalidate(6, baseEdgeProps)), ($$invalidate(10, labelBgColor), $$invalidate(6, baseEdgeProps)), ($$invalidate(9, labelTextColor), $$invalidate(6, baseEdgeProps)), ($$invalidate(1, edgeColor), $$invalidate(6, baseEdgeProps)), ($$invalidate(8, centerX), $$invalidate(6, baseEdgeProps)), ($$invalidate(7, centerY), $$invalidate(6, baseEdgeProps)));
    		}

    		if ($$self.$$.dirty & /*label, labelBgColor, labelTextColor, centerX, centerY*/ 3968) {
    			// setting edge text props
    			$$invalidate(0, edgeTextProps = {
    				label,
    				labelBgColor,
    				labelTextColor,
    				centerX,
    				centerY
    			});
    		}
    	};

    	return [
    		edgeTextProps,
    		edgeColor,
    		arrow,
    		animate,
    		path,
    		defaultArrow,
    		baseEdgeProps,
    		centerY,
    		centerX,
    		labelTextColor,
    		labelBgColor,
    		label
    	];
    }

    class BaseEdge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$E, create_fragment$E, safe_not_equal, { baseEdgeProps: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BaseEdge",
    			options,
    			id: create_fragment$E.name
    		});
    	}

    	get baseEdgeProps() {
    		throw new Error("<BaseEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set baseEdgeProps(value) {
    		throw new Error("<BaseEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    // enumerable values (static) set for Position
    var Position;
    (function (Position) {
        Position["Left"] = "left";
        Position["Right"] = "right";
        Position["Top"] = "top";
        Position["Bottom"] = "bottom";
    })(Position || (Position = {}));
    //
    // export type CoordinateExtent = [[number, number], [number, number]];

    /* node_modules/svelvet/Edges/SimpleBezierEdge.svelte generated by Svelte v3.52.0 */

    function create_fragment$D(ctx) {
    	let baseedge;
    	let current;

    	baseedge = new BaseEdge({
    			props: { baseEdgeProps: /*baseEdgeProps*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(baseedge.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(baseedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const baseedge_changes = {};
    			if (dirty & /*baseEdgeProps*/ 1) baseedge_changes.baseEdgeProps = /*baseEdgeProps*/ ctx[0];
    			baseedge.$set(baseedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(baseedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(baseedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(baseedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function calculateControlOffset(distance, curvature) {
    	if (distance >= 0) {
    		return 0.5 * distance;
    	} else {
    		return curvature * 25 * Math.sqrt(-distance);
    	}
    }

    function instance$D($$self, $$props, $$invalidate) {
    	let params;
    	let path;
    	let centerX;
    	let centerY;
    	let baseEdgeProps;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SimpleBezierEdge', slots, []);

    	function getControlWithCurvature({ pos, x1, y1, x2, y2, c }) {
    		let ctX, ctY;

    		switch (pos) {
    			case Position.Left:
    				{
    					ctX = x1 - calculateControlOffset(x1 - x2, c);
    					ctY = y1;
    				}
    				break;
    			case Position.Right:
    				{
    					ctX = x1 + calculateControlOffset(x2 - x1, c);
    					ctY = y1;
    				}
    				break;
    			case Position.Top:
    				{
    					ctX = x1;
    					ctY = y1 - calculateControlOffset(y1 - y2, c);
    				}
    				break;
    			case Position.Bottom:
    				{
    					ctX = x1;
    					ctY = y1 + calculateControlOffset(y2 - y1, c);
    				}
    				break;
    		}

    		return [ctX, ctY];
    	}

    	// returns string to pass into edge 'path' svg d attribute (where to be drawn)
    	// referenced from ReactFlow.dev
    	function getSimpleBezierPath(
    		{ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = 0.25 }
    	) {
    		const [sourceControlX, sourceControlY] = getControlWithCurvature({
    			pos: sourcePosition,
    			x1: sourceX,
    			y1: sourceY,
    			x2: targetX,
    			y2: targetY,
    			c: curvature
    		});

    		const [targetControlX, targetControlY] = getControlWithCurvature({
    			pos: targetPosition,
    			x1: targetX,
    			y1: targetY,
    			x2: sourceX,
    			y2: sourceY,
    			c: curvature
    		});

    		return `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`;
    	}

    	// determining center of the bezier curve to know where to place the bezier edge text label
    	function getSimpleBezierCenter(
    		{ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = 0.25 }
    	) {
    		const [sourceControlX, sourceControlY] = getControlWithCurvature({
    			pos: sourcePosition,
    			x1: sourceX,
    			y1: sourceY,
    			x2: targetX,
    			y2: targetY,
    			c: curvature
    		});

    		const [targetControlX, targetControlY] = getControlWithCurvature({
    			pos: targetPosition,
    			x1: targetX,
    			y1: targetY,
    			x2: sourceX,
    			y2: sourceY,
    			c: curvature
    		});

    		// cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
    		// https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve
    		const centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;

    		const centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
    		const xOffset = Math.abs(centerX - sourceX);
    		const yOffset = Math.abs(centerY - sourceY);
    		return [centerX, centerY, xOffset, yOffset];
    	}

    	let { edge } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (edge === undefined && !('edge' in $$props || $$self.$$.bound[$$self.$$.props['edge']])) {
    			console.warn("<SimpleBezierEdge> was created without expected prop 'edge'");
    		}
    	});

    	const writable_props = ['edge'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SimpleBezierEdge> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('edge' in $$props) $$invalidate(1, edge = $$props.edge);
    	};

    	$$self.$capture_state = () => ({
    		BaseEdge,
    		Position,
    		calculateControlOffset,
    		getControlWithCurvature,
    		getSimpleBezierPath,
    		getSimpleBezierCenter,
    		edge,
    		centerY,
    		centerX,
    		path,
    		baseEdgeProps,
    		params
    	});

    	$$self.$inject_state = $$props => {
    		if ('edge' in $$props) $$invalidate(1, edge = $$props.edge);
    		if ('centerY' in $$props) $$invalidate(2, centerY = $$props.centerY);
    		if ('centerX' in $$props) $$invalidate(3, centerX = $$props.centerX);
    		if ('path' in $$props) $$invalidate(4, path = $$props.path);
    		if ('baseEdgeProps' in $$props) $$invalidate(0, baseEdgeProps = $$props.baseEdgeProps);
    		if ('params' in $$props) $$invalidate(5, params = $$props.params);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*edge*/ 2) {
    			$$invalidate(5, params = {
    				sourceX: edge.sourceX,
    				sourceY: edge.sourceY,
    				sourcePosition: edge.sourcePosition,
    				targetX: edge.targetX,
    				targetY: edge.targetY,
    				targetPosition: edge.targetPosition,
    				curvature: 0.25
    			});
    		}

    		if ($$self.$$.dirty & /*params*/ 32) {
    			// pass in params to function that returns a string value for SVG path d attribute (where to be drawn)
    			$$invalidate(4, path = getSimpleBezierPath(params));
    		}

    		if ($$self.$$.dirty & /*params*/ 32) {
    			$$invalidate(3, [centerX, centerY] = getSimpleBezierCenter(params), centerX, (($$invalidate(2, centerY), $$invalidate(5, params)), $$invalidate(1, edge)));
    		}

    		if ($$self.$$.dirty & /*edge, path, centerX, centerY*/ 30) {
    			// pass necessary values to BaseEdge component
    			// BaseEdge renders a 'base' path that can be customized by parent Edge components
    			$$invalidate(0, baseEdgeProps = { ...edge, path, centerX, centerY });
    		}
    	};

    	return [baseEdgeProps, edge, centerY, centerX, path, params];
    }

    class SimpleBezierEdge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$D, create_fragment$D, safe_not_equal, { edge: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SimpleBezierEdge",
    			options,
    			id: create_fragment$D.name
    		});
    	}

    	get edge() {
    		throw new Error("<SimpleBezierEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edge(value) {
    		throw new Error("<SimpleBezierEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Edges/StraightEdge.svelte generated by Svelte v3.52.0 */

    function create_fragment$C(ctx) {
    	let baseedge;
    	let current;

    	baseedge = new BaseEdge({
    			props: { baseEdgeProps: /*baseEdgeProps*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(baseedge.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(baseedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const baseedge_changes = {};
    			if (dirty & /*baseEdgeProps*/ 1) baseedge_changes.baseEdgeProps = /*baseEdgeProps*/ ctx[0];
    			baseedge.$set(baseedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(baseedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(baseedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(baseedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props, $$invalidate) {
    	let xOffset;
    	let yOffset;
    	let centerX;
    	let centerY;
    	let path;
    	let baseEdgeProps;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('StraightEdge', slots, []);
    	let { edge } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (edge === undefined && !('edge' in $$props || $$self.$$.bound[$$self.$$.props['edge']])) {
    			console.warn("<StraightEdge> was created without expected prop 'edge'");
    		}
    	});

    	const writable_props = ['edge'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<StraightEdge> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('edge' in $$props) $$invalidate(1, edge = $$props.edge);
    	};

    	$$self.$capture_state = () => ({
    		BaseEdge,
    		edge,
    		centerY,
    		centerX,
    		path,
    		baseEdgeProps,
    		yOffset,
    		xOffset
    	});

    	$$self.$inject_state = $$props => {
    		if ('edge' in $$props) $$invalidate(1, edge = $$props.edge);
    		if ('centerY' in $$props) $$invalidate(2, centerY = $$props.centerY);
    		if ('centerX' in $$props) $$invalidate(3, centerX = $$props.centerX);
    		if ('path' in $$props) $$invalidate(4, path = $$props.path);
    		if ('baseEdgeProps' in $$props) $$invalidate(0, baseEdgeProps = $$props.baseEdgeProps);
    		if ('yOffset' in $$props) $$invalidate(5, yOffset = $$props.yOffset);
    		if ('xOffset' in $$props) $$invalidate(6, xOffset = $$props.xOffset);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*edge*/ 2) {
    			// offset is determining the difference between X and Y coordinates of the source and target nodes
    			$$invalidate(6, xOffset = Math.abs(edge.targetX - edge.sourceX) / 2);
    		}

    		if ($$self.$$.dirty & /*edge*/ 2) {
    			$$invalidate(5, yOffset = Math.abs(edge.targetY - edge.sourceY) / 2);
    		}

    		if ($$self.$$.dirty & /*edge, xOffset*/ 66) {
    			// determining the center point of the edge to be used in the EdgeText component
    			$$invalidate(3, centerX = edge.targetX < edge.sourceX
    			? edge.targetX + xOffset
    			: edge.targetX - xOffset);
    		}

    		if ($$self.$$.dirty & /*edge, yOffset*/ 34) {
    			$$invalidate(2, centerY = edge.targetY < edge.sourceY
    			? edge.targetY + yOffset
    			: edge.targetY - yOffset);
    		}

    		if ($$self.$$.dirty & /*edge*/ 2) {
    			// determine SVG path d (where to be drawn) string value to pass into BaseEdge component
    			// path is reactive to current edge source/target X and Y values
    			$$invalidate(4, path = `M ${edge.sourceX},${edge.sourceY}L ${edge.targetX},${edge.targetY}`);
    		}

    		if ($$self.$$.dirty & /*edge, path, centerX, centerY*/ 30) {
    			$$invalidate(0, baseEdgeProps = { ...edge, path, centerX, centerY });
    		}
    	};

    	return [baseEdgeProps, edge, centerY, centerX, path, yOffset, xOffset];
    }

    class StraightEdge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$C, create_fragment$C, safe_not_equal, { edge: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StraightEdge",
    			options,
    			id: create_fragment$C.name
    		});
    	}

    	get edge() {
    		throw new Error("<StraightEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edge(value) {
    		throw new Error("<StraightEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    //needed for getCenter funciotn
    const LeftOrRight = [Position.Left, Position.Right];
    //used to determine the position for edge text on a Smooth or Step Edge
    const getCenter = ({ sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top }) => {
        const sourceIsLeftOrRight = LeftOrRight.includes(sourcePosition);
        const targetIsLeftOrRight = LeftOrRight.includes(targetPosition);
        // we expect flows to be horizontal or vertical (all handles left or right respectively top or bottom)
        // a mixed edge is when one the source is on the left and the target is on the top for example.
        const mixedEdge = (sourceIsLeftOrRight && !targetIsLeftOrRight) || (targetIsLeftOrRight && !sourceIsLeftOrRight);
        if (mixedEdge) {
            const xOffset = sourceIsLeftOrRight ? Math.abs(targetX - sourceX) : 0;
            const centerX = sourceX > targetX ? sourceX - xOffset : sourceX + xOffset;
            const yOffset = sourceIsLeftOrRight ? 0 : Math.abs(targetY - sourceY);
            const centerY = sourceY < targetY ? sourceY + yOffset : sourceY - yOffset;
            return [centerX, centerY, xOffset, yOffset];
        }
        const xOffset = Math.abs(targetX - sourceX) / 2;
        const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
        const yOffset = Math.abs(targetY - sourceY) / 2;
        const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
        return [centerX, centerY, xOffset, yOffset];
    };

    /* node_modules/svelvet/Edges/EdgeAnchor.svelte generated by Svelte v3.52.0 */
    const file$w = "node_modules/svelvet/Edges/EdgeAnchor.svelte";

    function create_fragment$B(ctx) {
    	let circle;

    	const block = {
    		c: function create() {
    			circle = svg_element("circle");
    			attr_dev(circle, "cx", /*x*/ ctx[0]);
    			attr_dev(circle, "cy", /*y*/ ctx[1]);
    			attr_dev(circle, "r", 5);
    			attr_dev(circle, "stroke", "white");
    			attr_dev(circle, "fill", "black");
    			attr_dev(circle, "class", "svelte-1ulqurc");
    			add_location(circle, file$w, 6, 0, 159);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, circle, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*x*/ 1) {
    				attr_dev(circle, "cx", /*x*/ ctx[0]);
    			}

    			if (dirty & /*y*/ 2) {
    				attr_dev(circle, "cy", /*y*/ ctx[1]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(circle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$B.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$B($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('EdgeAnchor', slots, []);
    	let { x } = $$props;
    	let { y } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (x === undefined && !('x' in $$props || $$self.$$.bound[$$self.$$.props['x']])) {
    			console.warn("<EdgeAnchor> was created without expected prop 'x'");
    		}

    		if (y === undefined && !('y' in $$props || $$self.$$.bound[$$self.$$.props['y']])) {
    			console.warn("<EdgeAnchor> was created without expected prop 'y'");
    		}
    	});

    	const writable_props = ['x', 'y'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<EdgeAnchor> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('x' in $$props) $$invalidate(0, x = $$props.x);
    		if ('y' in $$props) $$invalidate(1, y = $$props.y);
    	};

    	$$self.$capture_state = () => ({ Position, x, y });

    	$$self.$inject_state = $$props => {
    		if ('x' in $$props) $$invalidate(0, x = $$props.x);
    		if ('y' in $$props) $$invalidate(1, y = $$props.y);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [x, y];
    }

    class EdgeAnchor extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$B, create_fragment$B, safe_not_equal, { x: 0, y: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EdgeAnchor",
    			options,
    			id: create_fragment$B.name
    		});
    	}

    	get x() {
    		throw new Error("<EdgeAnchor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set x(value) {
    		throw new Error("<EdgeAnchor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get y() {
    		throw new Error("<EdgeAnchor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set y(value) {
    		throw new Error("<EdgeAnchor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Edges/SmoothStepEdge.svelte generated by Svelte v3.52.0 */

    function create_fragment$A(ctx) {
    	let baseedge;
    	let current;

    	baseedge = new BaseEdge({
    			props: { baseEdgeProps: /*baseEdgeProps*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(baseedge.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(baseedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const baseedge_changes = {};
    			if (dirty & /*baseEdgeProps*/ 1) baseedge_changes.baseEdgeProps = /*baseEdgeProps*/ ctx[0];
    			baseedge.$set(baseedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(baseedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(baseedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(baseedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	let params;
    	let centerX;
    	let centerY;
    	let path;
    	let baseEdgeProps;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SmoothStepEdge', slots, []);
    	const bottomLeftCorner = (x, y, size) => `L ${x},${y - size}Q ${x},${y} ${x + size},${y}`;
    	const leftBottomCorner = (x, y, size) => `L ${x + size},${y}Q ${x},${y} ${x},${y - size}`;
    	const bottomRightCorner = (x, y, size) => `L ${x},${y - size}Q ${x},${y} ${x - size},${y}`;
    	const rightBottomCorner = (x, y, size) => `L ${x - size},${y}Q ${x},${y} ${x},${y - size}`;
    	const leftTopCorner = (x, y, size) => `L ${x + size},${y}Q ${x},${y} ${x},${y + size}`;
    	const topLeftCorner = (x, y, size) => `L ${x},${y + size}Q ${x},${y} ${x + size},${y}`;
    	const topRightCorner = (x, y, size) => `L ${x},${y + size}Q ${x},${y} ${x - size},${y}`;
    	const rightTopCorner = (x, y, size) => `L ${x - size},${y}Q ${x},${y} ${x},${y + size}`;

    	function getSmoothStepPath(
    		{ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, borderRadius = 5, centerX, centerY }
    	) {
    		const [_centerX, _centerY, offsetX, offsetY] = getCenter({ sourceX, sourceY, targetX, targetY });
    		const cornerWidth = Math.min(borderRadius, Math.abs(targetX - sourceX));
    		const cornerHeight = Math.min(borderRadius, Math.abs(targetY - sourceY));
    		const cornerSize = Math.min(cornerWidth, cornerHeight, offsetX, offsetY);
    		const leftAndRight = [Position.Left, Position.Right];
    		const cX = typeof centerX !== 'undefined' ? centerX : _centerX;
    		const cY = typeof centerY !== 'undefined' ? centerY : _centerY;
    		let firstCornerPath = null;
    		let secondCornerPath = null;

    		// for non-mixed edge top/bottom
    		if (sourceX <= targetX) {
    			firstCornerPath = sourceY <= targetY
    			? bottomLeftCorner(sourceX, cY, cornerSize)
    			: topLeftCorner(sourceX, cY, cornerSize);

    			secondCornerPath = sourceY <= targetY
    			? rightTopCorner(targetX, cY, cornerSize)
    			: rightBottomCorner(targetX, cY, cornerSize);
    		} else {
    			firstCornerPath = sourceY < targetY
    			? bottomRightCorner(sourceX, cY, cornerSize)
    			: topRightCorner(sourceX, cY, cornerSize);

    			secondCornerPath = sourceY < targetY
    			? leftTopCorner(targetX, cY, cornerSize)
    			: leftBottomCorner(targetX, cY, cornerSize);
    		}

    		// for non-mixed edge left/right
    		if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    			if (sourceX <= targetX) {
    				firstCornerPath = sourceY <= targetY
    				? rightTopCorner(cX, sourceY, cornerSize)
    				: rightBottomCorner(cX, sourceY, cornerSize);

    				secondCornerPath = sourceY <= targetY
    				? bottomLeftCorner(cX, targetY, cornerSize)
    				: topLeftCorner(cX, targetY, cornerSize);
    			} else if (sourcePosition === Position.Right && targetPosition === Position.Left || sourcePosition === Position.Left && targetPosition === Position.Right || sourcePosition === Position.Left && targetPosition === Position.Left) {
    				// and sourceX > targetX
    				firstCornerPath = sourceY <= targetY
    				? leftTopCorner(cX, sourceY, cornerSize)
    				: leftBottomCorner(cX, sourceY, cornerSize);

    				secondCornerPath = sourceY <= targetY
    				? bottomRightCorner(cX, targetY, cornerSize)
    				: topRightCorner(cX, targetY, cornerSize);
    			}
    		} else if (leftAndRight.includes(sourcePosition) && !leftAndRight.includes(targetPosition)) {
    			if (sourceX <= targetX) {
    				firstCornerPath = sourceY <= targetY
    				? rightTopCorner(targetX, sourceY, cornerSize)
    				: rightBottomCorner(targetX, sourceY, cornerSize); // for mixed edges (top/bottom to left/right) OR (left/right to top/bottom)
    			} else {
    				firstCornerPath = sourceY <= targetY
    				? leftTopCorner(targetX, sourceY, cornerSize)
    				: leftBottomCorner(targetX, sourceY, cornerSize);
    			}

    			secondCornerPath = '';
    		} else if (!leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    			if (sourceX <= targetX) {
    				firstCornerPath = sourceY <= targetY
    				? bottomLeftCorner(sourceX, targetY, cornerSize)
    				: topLeftCorner(sourceX, targetY, cornerSize);
    			} else {
    				firstCornerPath = sourceY <= targetY
    				? bottomRightCorner(sourceX, targetY, cornerSize)
    				: topRightCorner(sourceX, targetY, cornerSize);
    			}

    			secondCornerPath = '';
    		}

    		return `M ${sourceX},${sourceY}${firstCornerPath}${secondCornerPath}L ${targetX},${targetY}`;
    	}

    	let { edge } = $$props;
    	let { borderRadius = 5 } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (edge === undefined && !('edge' in $$props || $$self.$$.bound[$$self.$$.props['edge']])) {
    			console.warn("<SmoothStepEdge> was created without expected prop 'edge'");
    		}
    	});

    	const writable_props = ['edge', 'borderRadius'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SmoothStepEdge> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('edge' in $$props) $$invalidate(2, edge = $$props.edge);
    		if ('borderRadius' in $$props) $$invalidate(3, borderRadius = $$props.borderRadius);
    	};

    	$$self.$capture_state = () => ({
    		BaseEdge,
    		getCenter,
    		Position,
    		EdgeAnchor,
    		bottomLeftCorner,
    		leftBottomCorner,
    		bottomRightCorner,
    		rightBottomCorner,
    		leftTopCorner,
    		topLeftCorner,
    		topRightCorner,
    		rightTopCorner,
    		getSmoothStepPath,
    		edge,
    		borderRadius,
    		centerY,
    		centerX,
    		path,
    		baseEdgeProps,
    		params
    	});

    	$$self.$inject_state = $$props => {
    		if ('edge' in $$props) $$invalidate(2, edge = $$props.edge);
    		if ('borderRadius' in $$props) $$invalidate(3, borderRadius = $$props.borderRadius);
    		if ('centerY' in $$props) $$invalidate(4, centerY = $$props.centerY);
    		if ('centerX' in $$props) $$invalidate(5, centerX = $$props.centerX);
    		if ('path' in $$props) $$invalidate(6, path = $$props.path);
    		if ('baseEdgeProps' in $$props) $$invalidate(0, baseEdgeProps = $$props.baseEdgeProps);
    		if ('params' in $$props) $$invalidate(7, params = $$props.params);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*edge, borderRadius*/ 12) {
    			$$invalidate(7, params = {
    				sourceX: edge.sourceX,
    				sourceY: edge.sourceY,
    				targetX: edge.targetX,
    				targetY: edge.targetY,
    				sourcePosition: edge.sourcePosition,
    				targetPosition: edge.targetPosition,
    				borderRadius
    			});
    		}

    		if ($$self.$$.dirty & /*params*/ 128) {
    			$$invalidate(5, [centerX, centerY] = getCenter(params), centerX, ((($$invalidate(4, centerY), $$invalidate(7, params)), $$invalidate(2, edge)), $$invalidate(3, borderRadius)));
    		}

    		if ($$self.$$.dirty & /*params*/ 128) {
    			$$invalidate(6, path = getSmoothStepPath(params));
    		}

    		if ($$self.$$.dirty & /*edge, path, centerX, centerY*/ 116) {
    			$$invalidate(0, baseEdgeProps = { ...edge, path, centerX, centerY });
    		}
    	};

    	return [
    		baseEdgeProps,
    		getSmoothStepPath,
    		edge,
    		borderRadius,
    		centerY,
    		centerX,
    		path,
    		params
    	];
    }

    class SmoothStepEdge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$A, create_fragment$A, safe_not_equal, {
    			getSmoothStepPath: 1,
    			edge: 2,
    			borderRadius: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SmoothStepEdge",
    			options,
    			id: create_fragment$A.name
    		});
    	}

    	get getSmoothStepPath() {
    		return this.$$.ctx[1];
    	}

    	set getSmoothStepPath(value) {
    		throw new Error("<SmoothStepEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get edge() {
    		throw new Error("<SmoothStepEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edge(value) {
    		throw new Error("<SmoothStepEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get borderRadius() {
    		throw new Error("<SmoothStepEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set borderRadius(value) {
    		throw new Error("<SmoothStepEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Edges/StepEdge.svelte generated by Svelte v3.52.0 */

    function create_fragment$z(ctx) {
    	let smoothstepedge;
    	let current;

    	smoothstepedge = new SmoothStepEdge({
    			props: { edge: /*edge*/ ctx[0], borderRadius: 0 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(smoothstepedge.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(smoothstepedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const smoothstepedge_changes = {};
    			if (dirty & /*edge*/ 1) smoothstepedge_changes.edge = /*edge*/ ctx[0];
    			smoothstepedge.$set(smoothstepedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(smoothstepedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(smoothstepedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(smoothstepedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('StepEdge', slots, []);
    	let { edge } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (edge === undefined && !('edge' in $$props || $$self.$$.bound[$$self.$$.props['edge']])) {
    			console.warn("<StepEdge> was created without expected prop 'edge'");
    		}
    	});

    	const writable_props = ['edge'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<StepEdge> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('edge' in $$props) $$invalidate(0, edge = $$props.edge);
    	};

    	$$self.$capture_state = () => ({ SmoothStepEdge, edge });

    	$$self.$inject_state = $$props => {
    		if ('edge' in $$props) $$invalidate(0, edge = $$props.edge);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [edge];
    }

    class StepEdge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$z, create_fragment$z, safe_not_equal, { edge: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StepEdge",
    			options,
    			id: create_fragment$z.name
    		});
    	}

    	get edge() {
    		throw new Error("<StepEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edge(value) {
    		throw new Error("<StepEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const svelvetStores = {};
    // refer to Svelvet/index, if store does not exist, then create one.
    // Creates one Svelvet component store using the unique key
    function findOrCreateStore(key) {
        //This just returns whatever we are requesting from store.js
        const existing = svelvetStores[key];
        if (existing) {
            return existing;
        }
        //Setting defaults of core svelvet store and making them a store using writable
        const coreSvelvetStore = {
            nodesStore: writable([]),
            edgesStore: writable([]),
            widthStore: writable(600),
            heightStore: writable(600),
            backgroundStore: writable(false),
            movementStore: writable(true),
            nodeSelected: writable(false),
            nodeIdSelected: writable(-1),
            d3Scale: writable(1),
            snapgrid: writable(false),
            snapResize: writable(30),
            backgroundColor: writable()
        };
        // This is the function handler for the mouseMove event to update the position of the selected node.
        const onMouseMove = (e, nodeID) => {
            coreSvelvetStore.nodesStore.update((n) => {
                const correctNode = n.find((node) => node.id === nodeID);

                const scale = get_store_value(coreSvelvetStore.d3Scale);

                if(correctNode.childNodes){
                    n.forEach((child) =>{
                        if(correctNode.childNodes.includes(child.id)){
                            child.position.x += e.movementX / scale;
                            child.position.y += e.movementY / scale;
                        }
                    });
                    correctNode.position.x += e.movementX / scale;
                    correctNode.position.y += e.movementY / scale;
                }
                else {
                    // divide the movement value by scale to keep it proportional to d3Zoom transformations
                    correctNode.position.x += e.movementX / scale;
                    correctNode.position.y += e.movementY / scale;

                }
                return [...n];
            });
        };
        // This is the function handler for the touch event on mobile to select a node.
        const onTouchMove = (e, nodeID) => {
                coreSvelvetStore.nodesStore.update((n) => {
                    // restores mobile functionality
                    n.forEach(node => {
                        if (node.id === nodeID) {
                          //calculates the location of the selected node
                          const { x, y, width, height } = e.target.getBoundingClientRect();
                          const offsetX = ((e.touches[0].clientX - x) / width) * e.target.offsetWidth;
                          const offsetY = ((e.touches[0].clientY - y) / height) * e.target.offsetHeight;
                          // centers the node consistently under the user's touch
                          node.position.x += offsetX - node.width / 2;
                          node.position.y += offsetY - node.height / 2;
                        }
                      });
                      return [...n];
                    });
                /*  Svelvet 4.0 dev code see:
                    https://github.com/open-source-labs/Svelvet/blob/main/NPM%20Package/svelvet/Future%20Iteration/ParentNode.md
                    const correctNode = n.find((node) => node.id === nodeID);
                    const { x, y, width, height } = e.target.getBoundingClientRect();
                    const offsetX = ((e.touches[0].clientX - x) / width) * e.target.offsetWidth;
                    const offsetY = ((e.touches[0].clientY - y) / height) * e.target.offsetHeight;
        
                    if(correctNode.childNodes){
                        n.forEach((child)=>{
                            //conditional fails, make it recognize the nodes in childNodes
                            if(correctNode.childNodes.includes(child.id)){
                                //All nodes within child nodes will move with the parent container node.
                                child.position.x += offsetX - correctNode.width/2;
                                child.position.y += offsetY - correctNode.height/2;
                            }
                        })
                        correctNode.position.x += offsetX - correctNode.width/2;
                        correctNode.position.y += offsetY - correctNode.height/2;
                    }  else {
                        // centers the node consistently under the user's touch
                        correctNode.position.x += offsetX - correctNode.width/2;
                        correctNode.position.y += offsetY - correctNode.height/2;
        
                    }
                });
                return [...n];
                */
        };

        const nodeIdSelected = coreSvelvetStore.nodeIdSelected;
        // if the user clicks a node without moving it, this function fires allowing a user to invoke the callback function
        const onNodeClick = (e, nodeID) => {
            get_store_value(nodesStore).forEach((node) => {
                if (node.id === get_store_value(nodeIdSelected)) {
                    node.clickCallback?.(node);
                }
            });
        };
        const edgesStore = coreSvelvetStore.edgesStore;
        const nodesStore = coreSvelvetStore.nodesStore;
        // derive from nodesStore and edgesStore, pass in array value from each store
        // updates edgesStore with new object properties (edge,sourceX, edge.targetY, etc) for edgesArray
        // $nodesStore and its individual object properties are reactive to node.position.x and node.position.y
        // so derivedEdges has access to node.position.x and node.position.y changes inside of this function
        const derivedEdges = derived([nodesStore, edgesStore], ([$nodesStore, $edgesStore]) => {
            $edgesStore.forEach((edge) => {
                // any -> edge should follow type DerivedEdge, but we are assigning to any so the typing meshes together
                // These are dummy nodes to resolve a typescripting issue. They are overwritten in the following forEach loop
                let sourceNode = {
                    id: 0,
                    position: { x: 25, y: 475 },
                    data: { label: '9' },
                    width: 175,
                    height: 40,
                    targetPosition: 'right',
                    sourcePosition: 'left'
                };
                let targetNode = {
                    id: 10,
                    position: { x: 750, y: 475 },
                    data: { label: '10' },
                    width: 175,
                    height: 40,
                    targetPosition: 'right',
                    sourcePosition: 'left'
                };
                
                //We find out what the sourceNode is or the targetNode is.
                $nodesStore.forEach((node) => {
                    if (edge.source === node.id)
                        sourceNode = node;
                    if (edge.target === node.id)
                        targetNode = node;
                });

                if (sourceNode) {
                    
                    //left side of the node selected
                    let left = sourceNode.position.x;
                    
                    //top of the node selected
                    let top = sourceNode.position.y;
                    
                    //declaring the middle point of the node
                    let middle = sourceNode.width / 2;
                    
                    //Default sourcePosition to bottom if sourcePosition not defined
                    if (sourceNode.sourcePosition === 'bottom' || sourceNode.sourcePosition === undefined) {
                    
                        //the x coordinate of the middle of the node
                        edge.sourceX = left + middle;
                        
                        //the y coordinate of the bottom of the node
                        edge.sourceY = top + sourceNode.height;
                        
                        //assign sourcePosition to the edge for usage in the various edge components
                        edge.sourcePosition = 'bottom';
                    }
                    else if (sourceNode.sourcePosition === 'top') {
                        edge.sourceX = left + middle;
                        edge.sourceY = top;
                        edge.sourcePosition = sourceNode.sourcePosition;
                    }
                    else if (sourceNode.sourcePosition === 'left') {
                        edge.sourceX = left;
                        edge.sourceY = top + sourceNode.height / 2;
                        edge.sourcePosition = sourceNode.sourcePosition;
                    }
                    else if (sourceNode.sourcePosition === 'right') {
                        edge.sourceX = left + sourceNode.width;
                        edge.sourceY = top + sourceNode.height / 2;
                        edge.sourcePosition = sourceNode.sourcePosition;
                    }
                }
                if (targetNode) {
                    
                    //left side of the node selected
                    let left = targetNode.position.x;
                    
                    //top of the node selected
                    let top = targetNode.position.y;
                    
                    //declaring the middle point of the node
                    let middle = targetNode.width / 2;

                    //Default to top targetPosition if targetPosition undefined
                    if (targetNode.targetPosition === 'top' || targetNode.targetPosition === undefined) {
                        //the x coordinate of the middle of the node
                        edge.targetX = left + middle;
                        //the y coordinate of the bottom of the node
                        edge.targetY = top;
                        //assign sourcePosition to the edge for usage in the various edge components
                        edge.targetPosition = 'top';
                    }
                    else if (targetNode.targetPosition === 'bottom') {
                        edge.targetX = left + middle;
                        edge.targetY = top + targetNode.height;
                        edge.targetPosition = targetNode.targetPosition;
                    }
                    else if (targetNode.targetPosition === 'left') {
                        edge.targetX = left;
                        edge.targetY = top + targetNode.height / 2;
                        edge.targetPosition = targetNode.targetPosition;
                    }
                    else if (targetNode.targetPosition === 'right') {
                        edge.targetX = left + targetNode.width;
                        edge.targetY = top + targetNode.height / 2;
                        edge.targetPosition = targetNode.targetPosition;
                    }
                }
            });
            return [...$edgesStore];
        });
        //Puts everything together as the svelvet store and use the key so that it can be used.
        const svelvetStore = {
            ...coreSvelvetStore,
            onTouchMove,
            onMouseMove,
            onNodeClick,
            derivedEdges
        };
        svelvetStores[key] = svelvetStore;
        return svelvetStore;
    }

    /* node_modules/svelvet/Nodes/index.svelte generated by Svelte v3.52.0 */
    const file$v = "node_modules/svelvet/Nodes/index.svelte";

    // (83:2) {#if node.image}
    function create_if_block$n(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*node*/ ctx[0].src)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			set_style(img, "width", /*node*/ ctx[0].width * 0.75 + "px");
    			set_style(img, "height", /*node*/ ctx[0].height * 0.75 + "px");
    			set_style(img, "overflow", "hidden");
    			add_location(img, file$v, 83, 4, 2279);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*node*/ 1 && !src_url_equal(img.src, img_src_value = /*node*/ ctx[0].src)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*node*/ 1) {
    				set_style(img, "width", /*node*/ ctx[0].width * 0.75 + "px");
    			}

    			if (dirty & /*node*/ 1) {
    				set_style(img, "height", /*node*/ ctx[0].height * 0.75 + "px");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$n.name,
    		type: "if",
    		source: "(83:2) {#if node.image}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$y(ctx) {
    	let div;
    	let t;
    	let div_id_value;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*node*/ ctx[0].image && create_if_block$n(ctx);
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "Node svelte-1g1wdfn");
    			set_style(div, "left", /*node*/ ctx[0].position.x + "px");
    			set_style(div, "top", /*node*/ ctx[0].position.y + "px");
    			set_style(div, "width", /*node*/ ctx[0].width + "px");
    			set_style(div, "height", /*node*/ ctx[0].height + "px");
    			set_style(div, "background-color", /*node*/ ctx[0].bgColor);
    			set_style(div, "border-color", /*node*/ ctx[0].borderColor);
    			set_style(div, "border-radius", /*node*/ ctx[0].borderRadius + "px");
    			set_style(div, "color", /*node*/ ctx[0].textColor);
    			attr_dev(div, "id", div_id_value = "svelvet-" + /*node*/ ctx[0].id);
    			add_location(div, file$v, 49, 0, 1475);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			append_dev(div, t);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "mousemove", /*mousemove_handler*/ ctx[20], false, false, false),
    					listen_dev(window, "mouseup", /*mouseup_handler*/ ctx[21], false, false, false),
    					listen_dev(div, "touchmove", /*touchmove_handler*/ ctx[22], false, false, false),
    					listen_dev(div, "touchstart", /*touchstart_handler*/ ctx[23], false, false, false),
    					listen_dev(div, "touchend", /*touchend_handler*/ ctx[24], false, false, false),
    					listen_dev(div, "mousedown", /*mousedown_handler*/ ctx[25], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*node*/ ctx[0].image) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$n(ctx);
    					if_block.c();
    					if_block.m(div, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 262144)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(div, "left", /*node*/ ctx[0].position.x + "px");
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(div, "top", /*node*/ ctx[0].position.y + "px");
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(div, "width", /*node*/ ctx[0].width + "px");
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(div, "height", /*node*/ ctx[0].height + "px");
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(div, "background-color", /*node*/ ctx[0].bgColor);
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(div, "border-color", /*node*/ ctx[0].borderColor);
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(div, "border-radius", /*node*/ ctx[0].borderRadius + "px");
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(div, "color", /*node*/ ctx[0].textColor);
    			}

    			if (!current || dirty & /*node*/ 1 && div_id_value !== (div_id_value = "svelvet-" + /*node*/ ctx[0].id)) {
    				attr_dev(div, "id", div_id_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let shouldMove;
    	let $movementStore;
    	let $snapgrid;
    	let $snapResize;
    	let $nodeSelected;
    	let $nodeIdSelected;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nodes', slots, ['default']);
    	let { node } = $$props;
    	let { key } = $$props;
    	const { onMouseMove, onNodeClick, onTouchMove, nodeSelected, widthStore, heightStore, nodeIdSelected, movementStore, snapgrid, snapResize } = findOrCreateStore(key);
    	validate_store(nodeSelected, 'nodeSelected');
    	component_subscribe($$self, nodeSelected, value => $$invalidate(6, $nodeSelected = value));
    	validate_store(nodeIdSelected, 'nodeIdSelected');
    	component_subscribe($$self, nodeIdSelected, value => $$invalidate(7, $nodeIdSelected = value));
    	validate_store(movementStore, 'movementStore');
    	component_subscribe($$self, movementStore, value => $$invalidate(17, $movementStore = value));
    	validate_store(snapgrid, 'snapgrid');
    	component_subscribe($$self, snapgrid, value => $$invalidate(4, $snapgrid = value));
    	validate_store(snapResize, 'snapResize');
    	component_subscribe($$self, snapResize, value => $$invalidate(5, $snapResize = value));

    	// $nodeSelected is a store boolean that lets GraphView component know if ANY node is selected
    	// moving local boolean specific to node selected, to change position of individual node once selected
    	let moving = false;

    	let moved = false;

    	$$self.$$.on_mount.push(function () {
    		if (node === undefined && !('node' in $$props || $$self.$$.bound[$$self.$$.props['node']])) {
    			console.warn("<Nodes> was created without expected prop 'node'");
    		}

    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<Nodes> was created without expected prop 'key'");
    		}
    	});

    	const writable_props = ['node', 'key'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nodes> was created with unknown prop '${key}'`);
    	});

    	const mousemove_handler = e => {
    		e.preventDefault();

    		if (shouldMove) {
    			onMouseMove(e, node.id);
    			$$invalidate(2, moved = true);
    		}
    	};

    	const mouseup_handler = e => {
    		// Note: mouseup moved outside of div to prevent issue where node becomes magnetized to cursor after leaving visible boundaries, github issues #120 & #125
    		if ($snapgrid) {
    			// If user sets snap attribute as true inside Svelvet
    			$$invalidate(0, node.position.x = Math.floor(node.position.x / $snapResize) * $snapResize, node);

    			$$invalidate(0, node.position.y = Math.floor(node.position.y / $snapResize) * $snapResize, node);

    			// Invoking on mouseMove so that edges update relation to node immediately upon snap 
    			onMouseMove(e, node.id);
    		}

    		$$invalidate(1, moving = false);
    		set_store_value(nodeSelected, $nodeSelected = false, $nodeSelected);

    		if (!moved && node.id == $nodeIdSelected) {
    			onNodeClick(e, node.id);
    		}

    		$$invalidate(2, moved = false);
    	};

    	const touchmove_handler = e => {
    		if (shouldMove) {
    			onTouchMove(e, node.id);
    		}
    	};

    	const touchstart_handler = e => {
    		e.preventDefault();
    		$$invalidate(1, moving = true);
    		set_store_value(nodeSelected, $nodeSelected = true, $nodeSelected);
    	};

    	const touchend_handler = e => {
    		$$invalidate(1, moving = false);
    		set_store_value(nodeSelected, $nodeSelected = false, $nodeSelected);
    	};

    	const mousedown_handler = e => {
    		e.preventDefault();
    		$$invalidate(1, moving = true);
    		set_store_value(nodeIdSelected, $nodeIdSelected = node.id, $nodeIdSelected);
    		set_store_value(nodeSelected, $nodeSelected = true, $nodeSelected);
    	};

    	$$self.$$set = $$props => {
    		if ('node' in $$props) $$invalidate(0, node = $$props.node);
    		if ('key' in $$props) $$invalidate(16, key = $$props.key);
    		if ('$$scope' in $$props) $$invalidate(18, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		findOrCreateStore,
    		node,
    		key,
    		onMouseMove,
    		onNodeClick,
    		onTouchMove,
    		nodeSelected,
    		widthStore,
    		heightStore,
    		nodeIdSelected,
    		movementStore,
    		snapgrid,
    		snapResize,
    		moving,
    		moved,
    		shouldMove,
    		$movementStore,
    		$snapgrid,
    		$snapResize,
    		$nodeSelected,
    		$nodeIdSelected
    	});

    	$$self.$inject_state = $$props => {
    		if ('node' in $$props) $$invalidate(0, node = $$props.node);
    		if ('key' in $$props) $$invalidate(16, key = $$props.key);
    		if ('moving' in $$props) $$invalidate(1, moving = $$props.moving);
    		if ('moved' in $$props) $$invalidate(2, moved = $$props.moved);
    		if ('shouldMove' in $$props) $$invalidate(3, shouldMove = $$props.shouldMove);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*moving, $movementStore*/ 131074) {
    			$$invalidate(3, shouldMove = moving && $movementStore);
    		}
    	};

    	return [
    		node,
    		moving,
    		moved,
    		shouldMove,
    		$snapgrid,
    		$snapResize,
    		$nodeSelected,
    		$nodeIdSelected,
    		onMouseMove,
    		onNodeClick,
    		onTouchMove,
    		nodeSelected,
    		nodeIdSelected,
    		movementStore,
    		snapgrid,
    		snapResize,
    		key,
    		$movementStore,
    		$$scope,
    		slots,
    		mousemove_handler,
    		mouseup_handler,
    		touchmove_handler,
    		touchstart_handler,
    		touchend_handler,
    		mousedown_handler
    	];
    }

    class Nodes extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$y, create_fragment$y, safe_not_equal, { node: 0, key: 16 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nodes",
    			options,
    			id: create_fragment$y.name
    		});
    	}

    	get node() {
    		throw new Error("<Nodes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set node(value) {
    		throw new Error("<Nodes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get key() {
    		throw new Error("<Nodes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<Nodes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Nodes/ImageNode.svelte generated by Svelte v3.52.0 */
    const file$u = "node_modules/svelvet/Nodes/ImageNode.svelte";

    function create_fragment$x(ctx) {
    	let img;
    	let img_src_value;
    	let img_id_value;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	const block = {
    		c: function create() {
    			img = element("img");
    			t = space();
    			if (default_slot) default_slot.c();
    			attr_dev(img, "class", "Node svelte-1g1wdfn");
    			set_style(img, "left", /*node*/ ctx[0].position.x + "px");
    			set_style(img, "top", /*node*/ ctx[0].position.y + "px");
    			set_style(img, "width", /*node*/ ctx[0].width + "px");
    			set_style(img, "height", /*node*/ ctx[0].height + "px");
    			set_style(img, "background-color", /*node*/ ctx[0].bgColor);
    			set_style(img, "border-color", /*node*/ ctx[0].borderColor);
    			set_style(img, "border-radius", /*node*/ ctx[0].borderRadius + "px");
    			set_style(img, "color", /*node*/ ctx[0].textColor);
    			if (!src_url_equal(img.src, img_src_value = /*node*/ ctx[0].src)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "id", img_id_value = "svelvet-" + /*node*/ ctx[0].id);
    			add_location(img, file$u, 21, 0, 731);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "mousemove", /*mousemove_handler*/ ctx[13], false, false, false),
    					listen_dev(img, "touchmove", /*touchmove_handler*/ ctx[14], false, false, false),
    					listen_dev(img, "touchstart", /*touchstart_handler*/ ctx[15], false, false, false),
    					listen_dev(img, "touchend", /*touchend_handler*/ ctx[16], false, false, false),
    					listen_dev(img, "mousedown", /*mousedown_handler*/ ctx[17], false, false, false),
    					listen_dev(img, "mouseup", /*mouseup_handler*/ ctx[18], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*node*/ 1) {
    				set_style(img, "left", /*node*/ ctx[0].position.x + "px");
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(img, "top", /*node*/ ctx[0].position.y + "px");
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(img, "width", /*node*/ ctx[0].width + "px");
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(img, "height", /*node*/ ctx[0].height + "px");
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(img, "background-color", /*node*/ ctx[0].bgColor);
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(img, "border-color", /*node*/ ctx[0].borderColor);
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(img, "border-radius", /*node*/ ctx[0].borderRadius + "px");
    			}

    			if (!current || dirty & /*node*/ 1) {
    				set_style(img, "color", /*node*/ ctx[0].textColor);
    			}

    			if (!current || dirty & /*node*/ 1 && !src_url_equal(img.src, img_src_value = /*node*/ ctx[0].src)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (!current || dirty & /*node*/ 1 && img_id_value !== (img_id_value = "svelvet-" + /*node*/ ctx[0].id)) {
    				attr_dev(img, "id", img_id_value);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let $nodeSelected;
    	let $nodeIdSelected;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ImageNode', slots, ['default']);
    	let { node } = $$props;
    	let { key } = $$props;
    	const { onMouseMove, onNodeClick, onTouchMove, nodeSelected, nodeIdSelected } = findOrCreateStore(key);
    	validate_store(nodeSelected, 'nodeSelected');
    	component_subscribe($$self, nodeSelected, value => $$invalidate(3, $nodeSelected = value));
    	validate_store(nodeIdSelected, 'nodeIdSelected');
    	component_subscribe($$self, nodeIdSelected, value => $$invalidate(4, $nodeIdSelected = value));

    	// $nodeSelected is a store boolean that lets GraphView component know if ANY node is selected
    	// moving local boolean specific to node selected, to change position of individual node once selected
    	let moving = false;

    	let moved = false;

    	$$self.$$.on_mount.push(function () {
    		if (node === undefined && !('node' in $$props || $$self.$$.bound[$$self.$$.props['node']])) {
    			console.warn("<ImageNode> was created without expected prop 'node'");
    		}

    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<ImageNode> was created without expected prop 'key'");
    		}
    	});

    	const writable_props = ['node', 'key'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ImageNode> was created with unknown prop '${key}'`);
    	});

    	const mousemove_handler = e => {
    		e.preventDefault();

    		if (moving) {
    			onMouseMove(e, node.id);
    			$$invalidate(2, moved = true);
    		}
    	};

    	const touchmove_handler = e => {
    		if (moving) {
    			onTouchMove(e, node.id);
    		}
    	};

    	const touchstart_handler = e => {
    		e.preventDefault();
    		$$invalidate(1, moving = true);
    		set_store_value(nodeSelected, $nodeSelected = true, $nodeSelected);
    	};

    	const touchend_handler = e => {
    		$$invalidate(1, moving = false);
    		set_store_value(nodeSelected, $nodeSelected = false, $nodeSelected);
    	};

    	const mousedown_handler = e => {
    		e.preventDefault();
    		$$invalidate(1, moving = true);
    		set_store_value(nodeIdSelected, $nodeIdSelected = node.id, $nodeIdSelected);
    		set_store_value(nodeSelected, $nodeSelected = true, $nodeSelected);
    	};

    	const mouseup_handler = e => {
    		$$invalidate(1, moving = false);
    		set_store_value(nodeSelected, $nodeSelected = false, $nodeSelected);

    		if (!moved && node.id == $nodeIdSelected) {
    			onNodeClick(e, node.id);
    		}

    		$$invalidate(2, moved = false);
    	};

    	$$self.$$set = $$props => {
    		if ('node' in $$props) $$invalidate(0, node = $$props.node);
    		if ('key' in $$props) $$invalidate(10, key = $$props.key);
    		if ('$$scope' in $$props) $$invalidate(11, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		findOrCreateStore,
    		node,
    		key,
    		onMouseMove,
    		onNodeClick,
    		onTouchMove,
    		nodeSelected,
    		nodeIdSelected,
    		moving,
    		moved,
    		$nodeSelected,
    		$nodeIdSelected
    	});

    	$$self.$inject_state = $$props => {
    		if ('node' in $$props) $$invalidate(0, node = $$props.node);
    		if ('key' in $$props) $$invalidate(10, key = $$props.key);
    		if ('moving' in $$props) $$invalidate(1, moving = $$props.moving);
    		if ('moved' in $$props) $$invalidate(2, moved = $$props.moved);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		node,
    		moving,
    		moved,
    		$nodeSelected,
    		$nodeIdSelected,
    		onMouseMove,
    		onNodeClick,
    		onTouchMove,
    		nodeSelected,
    		nodeIdSelected,
    		key,
    		$$scope,
    		slots,
    		mousemove_handler,
    		touchmove_handler,
    		touchstart_handler,
    		touchend_handler,
    		mousedown_handler,
    		mouseup_handler
    	];
    }

    class ImageNode extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$x, create_fragment$x, safe_not_equal, { node: 0, key: 10 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ImageNode",
    			options,
    			id: create_fragment$x.name
    		});
    	}

    	get node() {
    		throw new Error("<ImageNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set node(value) {
    		throw new Error("<ImageNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get key() {
    		throw new Error("<ImageNode>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<ImageNode>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Containers/GraphView/index.svelte generated by Svelte v3.52.0 */
    const file$t = "node_modules/svelvet/Containers/GraphView/index.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[21] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[24] = list[i];
    	return child_ctx;
    }

    // (78:6) {:else}
    function create_else_block_1$1(ctx) {
    	let node;
    	let current;

    	node = new Nodes({
    			props: {
    				node: /*node*/ ctx[24],
    				key: /*key*/ ctx[2],
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(node, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node_changes = {};
    			if (dirty & /*$nodesStore*/ 16) node_changes.node = /*node*/ ctx[24];
    			if (dirty & /*key*/ 4) node_changes.key = /*key*/ ctx[2];

    			if (dirty & /*$$scope, $nodesStore*/ 134217744) {
    				node_changes.$$scope = { dirty, ctx };
    			}

    			node.$set(node_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1$1.name,
    		type: "else",
    		source: "(78:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (76:31) 
    function create_if_block_7$2(ctx) {
    	let node;
    	let t;
    	let current;

    	node = new Nodes({
    			props: {
    				node: /*node*/ ctx[24],
    				key: /*key*/ ctx[2],
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(node, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node_changes = {};
    			if (dirty & /*$nodesStore*/ 16) node_changes.node = /*node*/ ctx[24];
    			if (dirty & /*key*/ 4) node_changes.key = /*key*/ ctx[2];

    			if (dirty & /*$$scope, $nodesStore*/ 134217744) {
    				node_changes.$$scope = { dirty, ctx };
    			}

    			node.$set(node_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7$2.name,
    		type: "if",
    		source: "(76:31) ",
    		ctx
    	});

    	return block;
    }

    // (73:6) {#if node.image && !node.data.label}
    function create_if_block_6$2(ctx) {
    	let imagenode;
    	let t;
    	let current;

    	imagenode = new ImageNode({
    			props: {
    				node: /*node*/ ctx[24],
    				key: /*key*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(imagenode.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(imagenode, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const imagenode_changes = {};
    			if (dirty & /*$nodesStore*/ 16) imagenode_changes.node = /*node*/ ctx[24];
    			if (dirty & /*key*/ 4) imagenode_changes.key = /*key*/ ctx[2];
    			imagenode.$set(imagenode_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(imagenode.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(imagenode.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(imagenode, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6$2.name,
    		type: "if",
    		source: "(73:6) {#if node.image && !node.data.label}",
    		ctx
    	});

    	return block;
    }

    // (79:8) <Node {node} {key}>
    function create_default_slot_1$2(ctx) {
    	let t_value = /*node*/ ctx[24].data.label + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$nodesStore*/ 16 && t_value !== (t_value = /*node*/ ctx[24].data.label + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(79:8) <Node {node} {key}>",
    		ctx
    	});

    	return block;
    }

    // (77:8) <Node {node} {key}>
    function create_default_slot$4(ctx) {
    	let html_tag;
    	let raw_value = /*node*/ ctx[24].data.html + "";
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(false);
    			html_anchor = empty$1();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$nodesStore*/ 16 && raw_value !== (raw_value = /*node*/ ctx[24].data.html + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(77:8) <Node {node} {key}>",
    		ctx
    	});

    	return block;
    }

    // (72:4) {#each $nodesStore as node}
    function create_each_block_1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_6$2, create_if_block_7$2, create_else_block_1$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*node*/ ctx[24].image && !/*node*/ ctx[24].data.label) return 0;
    		if (/*node*/ ctx[24].data.html) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(72:4) {#each $nodesStore as node}",
    		ctx
    	});

    	return block;
    }

    // (106:2) {#if $backgroundStore}
    function create_if_block_5$3(ctx) {
    	let rect;

    	const block = {
    		c: function create() {
    			rect = svg_element("rect");
    			attr_dev(rect, "width", "100%");
    			attr_dev(rect, "height", "100%");
    			set_style(rect, "fill", "url(#background-" + /*key*/ ctx[2] + ")");
    			add_location(rect, file$t, 106, 4, 3974);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, rect, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*key*/ 4) {
    				set_style(rect, "fill", "url(#background-" + /*key*/ ctx[2] + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(rect);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$3.name,
    		type: "if",
    		source: "(106:2) {#if $backgroundStore}",
    		ctx
    	});

    	return block;
    }

    // (119:6) {:else}
    function create_else_block$6(ctx) {
    	let simplebezieredge;
    	let current;

    	simplebezieredge = new SimpleBezierEdge({
    			props: { edge: /*edge*/ ctx[21] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(simplebezieredge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(simplebezieredge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const simplebezieredge_changes = {};
    			if (dirty & /*$derivedEdges*/ 128) simplebezieredge_changes.edge = /*edge*/ ctx[21];
    			simplebezieredge.$set(simplebezieredge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(simplebezieredge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(simplebezieredge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(simplebezieredge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$6.name,
    		type: "else",
    		source: "(119:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (117:37) 
    function create_if_block_4$4(ctx) {
    	let stepedge;
    	let current;

    	stepedge = new StepEdge({
    			props: { edge: /*edge*/ ctx[21] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(stepedge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(stepedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const stepedge_changes = {};
    			if (dirty & /*$derivedEdges*/ 128) stepedge_changes.edge = /*edge*/ ctx[21];
    			stepedge.$set(stepedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(stepedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(stepedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(stepedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$4.name,
    		type: "if",
    		source: "(117:37) ",
    		ctx
    	});

    	return block;
    }

    // (115:43) 
    function create_if_block_3$5(ctx) {
    	let smoothstepedge;
    	let current;

    	smoothstepedge = new SmoothStepEdge({
    			props: { edge: /*edge*/ ctx[21] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(smoothstepedge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(smoothstepedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const smoothstepedge_changes = {};
    			if (dirty & /*$derivedEdges*/ 128) smoothstepedge_changes.edge = /*edge*/ ctx[21];
    			smoothstepedge.$set(smoothstepedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(smoothstepedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(smoothstepedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(smoothstepedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$5.name,
    		type: "if",
    		source: "(115:43) ",
    		ctx
    	});

    	return block;
    }

    // (113:6) {#if edge.type === 'straight'}
    function create_if_block_2$6(ctx) {
    	let straightedge;
    	let current;

    	straightedge = new StraightEdge({
    			props: { edge: /*edge*/ ctx[21] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(straightedge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(straightedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const straightedge_changes = {};
    			if (dirty & /*$derivedEdges*/ 128) straightedge_changes.edge = /*edge*/ ctx[21];
    			straightedge.$set(straightedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(straightedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(straightedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(straightedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$6.name,
    		type: "if",
    		source: "(113:6) {#if edge.type === 'straight'}",
    		ctx
    	});

    	return block;
    }

    // (123:6) {#if !edge.noHandle}
    function create_if_block$m(ctx) {
    	let edgeanchor;
    	let if_block_anchor;
    	let current;

    	edgeanchor = new EdgeAnchor({
    			props: {
    				x: /*edge*/ ctx[21].sourceX,
    				y: /*edge*/ ctx[21].sourceY
    			},
    			$$inline: true
    		});

    	let if_block = !/*edge*/ ctx[21].arrow && create_if_block_1$8(ctx);

    	const block = {
    		c: function create() {
    			create_component(edgeanchor.$$.fragment);
    			if (if_block) if_block.c();
    			if_block_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			mount_component(edgeanchor, target, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const edgeanchor_changes = {};
    			if (dirty & /*$derivedEdges*/ 128) edgeanchor_changes.x = /*edge*/ ctx[21].sourceX;
    			if (dirty & /*$derivedEdges*/ 128) edgeanchor_changes.y = /*edge*/ ctx[21].sourceY;
    			edgeanchor.$set(edgeanchor_changes);

    			if (!/*edge*/ ctx[21].arrow) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$derivedEdges*/ 128) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$8(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(edgeanchor.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(edgeanchor.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(edgeanchor, detaching);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$m.name,
    		type: "if",
    		source: "(123:6) {#if !edge.noHandle}",
    		ctx
    	});

    	return block;
    }

    // (125:8) {#if !edge.arrow}
    function create_if_block_1$8(ctx) {
    	let edgeanchor;
    	let current;

    	edgeanchor = new EdgeAnchor({
    			props: {
    				x: /*edge*/ ctx[21].targetX,
    				y: /*edge*/ ctx[21].targetY
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(edgeanchor.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(edgeanchor, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const edgeanchor_changes = {};
    			if (dirty & /*$derivedEdges*/ 128) edgeanchor_changes.x = /*edge*/ ctx[21].targetX;
    			if (dirty & /*$derivedEdges*/ 128) edgeanchor_changes.y = /*edge*/ ctx[21].targetY;
    			edgeanchor.$set(edgeanchor_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(edgeanchor.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(edgeanchor.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(edgeanchor, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$8.name,
    		type: "if",
    		source: "(125:8) {#if !edge.arrow}",
    		ctx
    	});

    	return block;
    }

    // (112:4) {#each $derivedEdges as edge}
    function create_each_block$3(ctx) {
    	let current_block_type_index;
    	let if_block0;
    	let if_block0_anchor;
    	let if_block1_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2$6, create_if_block_3$5, create_if_block_4$4, create_else_block$6];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*edge*/ ctx[21].type === 'straight') return 0;
    		if (/*edge*/ ctx[21].type === 'smoothstep') return 1;
    		if (/*edge*/ ctx[21].type === 'step') return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let if_block1 = !/*edge*/ ctx[21].noHandle && create_if_block$m(ctx);

    	const block = {
    		c: function create() {
    			if_block0.c();
    			if_block0_anchor = empty$1();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block0_anchor, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block0 = if_blocks[current_block_type_index];

    				if (!if_block0) {
    					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block0.c();
    				} else {
    					if_block0.p(ctx, dirty);
    				}

    				transition_in(if_block0, 1);
    				if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
    			}

    			if (!/*edge*/ ctx[21].noHandle) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*$derivedEdges*/ 128) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$m(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block0_anchor);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(112:4) {#each $derivedEdges as edge}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$w(ctx) {
    	let div1;
    	let div0;
    	let div0_class_value;
    	let div1_class_value;
    	let t;
    	let svg;
    	let defs;
    	let pattern;
    	let circle;
    	let pattern_id_value;
    	let g;
    	let svg_class_value;
    	let svg_viewBox_value;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*$nodesStore*/ ctx[4];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let if_block = /*$backgroundStore*/ ctx[3] && create_if_block_5$3(ctx);
    	let each_value = /*$derivedEdges*/ ctx[7];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t = space();
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			pattern = svg_element("pattern");
    			circle = svg_element("circle");
    			if (if_block) if_block.c();
    			g = svg_element("g");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(`Node Node-${/*key*/ ctx[2]}`) + " svelte-1fucnk3"));
    			add_location(div0, file$t, 70, 2, 3002);
    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`Nodes Nodes-${/*key*/ ctx[2]}`) + " svelte-1fucnk3"));
    			add_location(div1, file$t, 68, 0, 2884);
    			attr_dev(circle, "id", "dot");
    			attr_dev(circle, "cx", gridSize / 2 - dotSize / 2);
    			attr_dev(circle, "cy", gridSize / 2 - dotSize / 2);
    			attr_dev(circle, "r", "0.5");
    			set_style(circle, "fill", "gray");
    			add_location(circle, file$t, 95, 6, 3762);
    			attr_dev(pattern, "id", pattern_id_value = `background-${/*key*/ ctx[2]}`);
    			attr_dev(pattern, "x", "0");
    			attr_dev(pattern, "y", "0");
    			attr_dev(pattern, "width", gridSize);
    			attr_dev(pattern, "height", gridSize);
    			attr_dev(pattern, "patternUnits", "userSpaceOnUse");
    			add_location(pattern, file$t, 87, 4, 3603);
    			add_location(defs, file$t, 86, 2, 3592);
    			add_location(g, file$t, 110, 2, 4151);
    			attr_dev(svg, "class", svg_class_value = "" + (null_to_empty(`Edges Edges-${/*key*/ ctx[2]}`) + " svelte-1fucnk3"));
    			attr_dev(svg, "viewBox", svg_viewBox_value = "0 0 " + /*$widthStore*/ ctx[5] + " " + /*$heightStore*/ ctx[6]);
    			add_location(svg, file$t, 85, 0, 3512);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			insert_dev(target, t, anchor);
    			insert_dev(target, svg, anchor);
    			append_dev(svg, defs);
    			append_dev(defs, pattern);
    			append_dev(pattern, circle);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, g);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(g, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div1, "contextmenu", prevent_default(/*contextmenu_handler*/ ctx[13]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$nodesStore, key*/ 20) {
    				each_value_1 = /*$nodesStore*/ ctx[4];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*key*/ 4 && div0_class_value !== (div0_class_value = "" + (null_to_empty(`Node Node-${/*key*/ ctx[2]}`) + " svelte-1fucnk3"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (!current || dirty & /*key*/ 4 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`Nodes Nodes-${/*key*/ ctx[2]}`) + " svelte-1fucnk3"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty & /*key*/ 4 && pattern_id_value !== (pattern_id_value = `background-${/*key*/ ctx[2]}`)) {
    				attr_dev(pattern, "id", pattern_id_value);
    			}

    			if (/*$backgroundStore*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_5$3(ctx);
    					if_block.c();
    					if_block.m(svg, g);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*$derivedEdges*/ 128) {
    				each_value = /*$derivedEdges*/ ctx[7];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(g, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*key*/ 4 && svg_class_value !== (svg_class_value = "" + (null_to_empty(`Edges Edges-${/*key*/ ctx[2]}`) + " svelte-1fucnk3"))) {
    				attr_dev(svg, "class", svg_class_value);
    			}

    			if (!current || dirty & /*$widthStore, $heightStore*/ 96 && svg_viewBox_value !== (svg_viewBox_value = "0 0 " + /*$widthStore*/ ctx[5] + " " + /*$heightStore*/ ctx[6])) {
    				attr_dev(svg, "viewBox", svg_viewBox_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const gridSize = 15;
    const dotSize = 10;

    function instance$w($$self, $$props, $$invalidate) {
    	let $backgroundStore;
    	let $movementStore;
    	let $nodeSelected;

    	let $nodesStore,
    		$$unsubscribe_nodesStore = noop$1,
    		$$subscribe_nodesStore = () => ($$unsubscribe_nodesStore(), $$unsubscribe_nodesStore = subscribe(nodesStore, $$value => $$invalidate(4, $nodesStore = $$value)), nodesStore);

    	let $widthStore;
    	let $heightStore;

    	let $derivedEdges,
    		$$unsubscribe_derivedEdges = noop$1,
    		$$subscribe_derivedEdges = () => ($$unsubscribe_derivedEdges(), $$unsubscribe_derivedEdges = subscribe(derivedEdges, $$value => $$invalidate(7, $derivedEdges = $$value)), derivedEdges);

    	$$self.$$.on_destroy.push(() => $$unsubscribe_nodesStore());
    	$$self.$$.on_destroy.push(() => $$unsubscribe_derivedEdges());
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GraphView', slots, []);
    	let d3 = { zoom, zoomTransform: transform, select, selectAll };
    	let { nodesStore } = $$props;
    	validate_store(nodesStore, 'nodesStore');
    	$$subscribe_nodesStore();
    	let { derivedEdges } = $$props;
    	validate_store(derivedEdges, 'derivedEdges');
    	$$subscribe_derivedEdges();
    	let { key } = $$props;

    	// here we lookup the store using the unique key
    	const svelvetStore = findOrCreateStore(key);

    	const { nodeSelected, backgroundStore, movementStore, widthStore, heightStore, d3Scale } = svelvetStore;
    	validate_store(nodeSelected, 'nodeSelected');
    	component_subscribe($$self, nodeSelected, value => $$invalidate(15, $nodeSelected = value));
    	validate_store(backgroundStore, 'backgroundStore');
    	component_subscribe($$self, backgroundStore, value => $$invalidate(3, $backgroundStore = value));
    	validate_store(movementStore, 'movementStore');
    	component_subscribe($$self, movementStore, value => $$invalidate(14, $movementStore = value));
    	validate_store(widthStore, 'widthStore');
    	component_subscribe($$self, widthStore, value => $$invalidate(5, $widthStore = value));
    	validate_store(heightStore, 'heightStore');
    	component_subscribe($$self, heightStore, value => $$invalidate(6, $heightStore = value));

    	onMount(() => {
    		d3.select(`.Edges-${key}`).call(d3Zoom);
    		d3.select(`.Nodes-${key}`).call(d3Zoom);
    	});

    	// TODO: Update d3Zoom type (refer to d3Zoom docs)
    	let d3Zoom = d3.zoom().filter(() => !$nodeSelected).scaleExtent([0.4, 2]).on('zoom', handleZoom);

    	// function to handle zoom events - arguments: d3ZoomEvent
    	function handleZoom(e) {
    		if (!$movementStore) return;

    		//add a store that contains the current value of the d3-zoom's scale to be used in onMouseMove function
    		d3Scale.set(e.transform.k);

    		// should not run d3.select below if backgroundStore is false
    		if ($backgroundStore) {
    			d3.select(`#background-${key}`).attr('x', e.transform.x).attr('y', e.transform.y).attr('width', gridSize * e.transform.k).attr('height', gridSize * e.transform.k).selectAll('#dot').attr('x', gridSize * e.transform.k / 2 - dotSize / 2).attr('y', gridSize * e.transform.k / 2 - dotSize / 2).attr('opacity', Math.min(e.transform.k, 1));
    		}

    		// transform 'g' SVG elements (edge, edge text, edge anchor)
    		d3.select(`.Edges-${key} g`).attr('transform', e.transform);

    		// transform div elements (nodes)
    		let transform = d3.zoomTransform(this);

    		// selects and transforms all node divs from class 'Node' and performs transformation
    		d3.select(`.Node-${key}`).style('transform', 'translate(' + transform.x + 'px,' + transform.y + 'px) scale(' + transform.k + ')').style('transform-origin', '0 0');
    	}

    	$$self.$$.on_mount.push(function () {
    		if (nodesStore === undefined && !('nodesStore' in $$props || $$self.$$.bound[$$self.$$.props['nodesStore']])) {
    			console.warn("<GraphView> was created without expected prop 'nodesStore'");
    		}

    		if (derivedEdges === undefined && !('derivedEdges' in $$props || $$self.$$.bound[$$self.$$.props['derivedEdges']])) {
    			console.warn("<GraphView> was created without expected prop 'derivedEdges'");
    		}

    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<GraphView> was created without expected prop 'key'");
    		}
    	});

    	const writable_props = ['nodesStore', 'derivedEdges', 'key'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GraphView> was created with unknown prop '${key}'`);
    	});

    	function contextmenu_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('nodesStore' in $$props) $$subscribe_nodesStore($$invalidate(0, nodesStore = $$props.nodesStore));
    		if ('derivedEdges' in $$props) $$subscribe_derivedEdges($$invalidate(1, derivedEdges = $$props.derivedEdges));
    		if ('key' in $$props) $$invalidate(2, key = $$props.key);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		zoom,
    		zoomTransform: transform,
    		select,
    		selectAll,
    		SimpleBezierEdge,
    		StraightEdge,
    		SmoothStepEdge,
    		StepEdge,
    		EdgeAnchor,
    		Node: Nodes,
    		ImageNode,
    		findOrCreateStore,
    		d3,
    		nodesStore,
    		derivedEdges,
    		key,
    		svelvetStore,
    		nodeSelected,
    		backgroundStore,
    		movementStore,
    		widthStore,
    		heightStore,
    		d3Scale,
    		gridSize,
    		dotSize,
    		d3Zoom,
    		handleZoom,
    		$backgroundStore,
    		$movementStore,
    		$nodeSelected,
    		$nodesStore,
    		$widthStore,
    		$heightStore,
    		$derivedEdges
    	});

    	$$self.$inject_state = $$props => {
    		if ('d3' in $$props) d3 = $$props.d3;
    		if ('nodesStore' in $$props) $$subscribe_nodesStore($$invalidate(0, nodesStore = $$props.nodesStore));
    		if ('derivedEdges' in $$props) $$subscribe_derivedEdges($$invalidate(1, derivedEdges = $$props.derivedEdges));
    		if ('key' in $$props) $$invalidate(2, key = $$props.key);
    		if ('d3Zoom' in $$props) d3Zoom = $$props.d3Zoom;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		nodesStore,
    		derivedEdges,
    		key,
    		$backgroundStore,
    		$nodesStore,
    		$widthStore,
    		$heightStore,
    		$derivedEdges,
    		nodeSelected,
    		backgroundStore,
    		movementStore,
    		widthStore,
    		heightStore,
    		contextmenu_handler
    	];
    }

    class GraphView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$w, create_fragment$w, safe_not_equal, { nodesStore: 0, derivedEdges: 1, key: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GraphView",
    			options,
    			id: create_fragment$w.name
    		});
    	}

    	get nodesStore() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nodesStore(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get derivedEdges() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set derivedEdges(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get key() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Containers/Svelvet/index.svelte generated by Svelte v3.52.0 */
    const file$s = "node_modules/svelvet/Containers/Svelvet/index.svelte";

    function create_fragment$v(ctx) {
    	let div;
    	let graphview;
    	let div_style_value;
    	let current;

    	graphview = new GraphView({
    			props: {
    				nodesStore: /*nodesStore*/ ctx[6],
    				derivedEdges: /*derivedEdges*/ ctx[7],
    				key: /*key*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(graphview.$$.fragment);
    			attr_dev(div, "class", "Svelvet svelte-16lqcyz");
    			attr_dev(div, "style", div_style_value = `width: ${/*$widthStore*/ ctx[0]}px; height: ${/*$heightStore*/ ctx[1]}px; background-color: ${/*$backgroundColor*/ ctx[2]}`);
    			add_location(div, file$s, 52, 0, 2313);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(graphview, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*$widthStore, $heightStore, $backgroundColor*/ 7 && div_style_value !== (div_style_value = `width: ${/*$widthStore*/ ctx[0]}px; height: ${/*$heightStore*/ ctx[1]}px; background-color: ${/*$backgroundColor*/ ctx[2]}`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(graphview.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(graphview.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(graphview);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let $widthStore;
    	let $heightStore;
    	let $backgroundColor;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Svelvet', slots, []);
    	let { nodes } = $$props;
    	let { edges } = $$props;
    	let { width = 600 } = $$props;
    	let { height = 600 } = $$props;
    	let { background = false } = $$props;
    	let { movement = true } = $$props;
    	let { snap = false } = $$props;
    	let { snapTo = 30 } = $$props;
    	let { bgColor = '#ffffff' } = $$props;

    	// generates a unique string for each svelvet component's unique store instance
    	const key = (Math.random() + 1).toString(36).substring(7);

    	// creates a store that uses the unique sting as the key to create and look up the corresponding store
    	// this way we can have multiple Svelvet Components on the same page and prevent overlap of information
    	const svelvetStore = findOrCreateStore(key);

    	// stores (state) within stores, so that we cannot access values from everywhere
    	const { widthStore, heightStore, nodesStore, derivedEdges, backgroundColor } = svelvetStore;

    	validate_store(widthStore, 'widthStore');
    	component_subscribe($$self, widthStore, value => $$invalidate(0, $widthStore = value));
    	validate_store(heightStore, 'heightStore');
    	component_subscribe($$self, heightStore, value => $$invalidate(1, $heightStore = value));
    	validate_store(backgroundColor, 'backgroundColor');
    	component_subscribe($$self, backgroundColor, value => $$invalidate(2, $backgroundColor = value));

    	// sets the state of the store to the values passed in from the Svelvet Component on initial render
    	onMount(() => {
    		svelvetStore.nodesStore.set(nodes);
    		svelvetStore.edgesStore.set(edges);
    		svelvetStore.widthStore.set(width);
    		svelvetStore.heightStore.set(height);
    		svelvetStore.backgroundStore.set(background);
    		svelvetStore.movementStore.set(movement);
    		svelvetStore.snapgrid.set(snap);
    		svelvetStore.backgroundColor.set(bgColor);
    		svelvetStore.snapResize.set(snapTo);
    	});

    	// enables data reactivity
    	afterUpdate(() => {
    		svelvetStore.nodesStore.set(nodes);
    		svelvetStore.edgesStore.set(edges);
    		svelvetStore.widthStore.set(width);
    		svelvetStore.heightStore.set(height);
    		svelvetStore.backgroundStore.set(background);
    		svelvetStore.movementStore.set(movement);
    		svelvetStore.snapgrid.set(snap);
    		svelvetStore.backgroundColor.set(bgColor);
    		svelvetStore.snapResize.set(snapTo);
    	});

    	$$self.$$.on_mount.push(function () {
    		if (nodes === undefined && !('nodes' in $$props || $$self.$$.bound[$$self.$$.props['nodes']])) {
    			console.warn("<Svelvet> was created without expected prop 'nodes'");
    		}

    		if (edges === undefined && !('edges' in $$props || $$self.$$.bound[$$self.$$.props['edges']])) {
    			console.warn("<Svelvet> was created without expected prop 'edges'");
    		}
    	});

    	const writable_props = [
    		'nodes',
    		'edges',
    		'width',
    		'height',
    		'background',
    		'movement',
    		'snap',
    		'snapTo',
    		'bgColor'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Svelvet> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('nodes' in $$props) $$invalidate(9, nodes = $$props.nodes);
    		if ('edges' in $$props) $$invalidate(10, edges = $$props.edges);
    		if ('width' in $$props) $$invalidate(11, width = $$props.width);
    		if ('height' in $$props) $$invalidate(12, height = $$props.height);
    		if ('background' in $$props) $$invalidate(13, background = $$props.background);
    		if ('movement' in $$props) $$invalidate(14, movement = $$props.movement);
    		if ('snap' in $$props) $$invalidate(15, snap = $$props.snap);
    		if ('snapTo' in $$props) $$invalidate(16, snapTo = $$props.snapTo);
    		if ('bgColor' in $$props) $$invalidate(17, bgColor = $$props.bgColor);
    	};

    	$$self.$capture_state = () => ({
    		GraphView,
    		findOrCreateStore,
    		afterUpdate,
    		onMount,
    		nodes,
    		edges,
    		width,
    		height,
    		background,
    		movement,
    		snap,
    		snapTo,
    		bgColor,
    		key,
    		svelvetStore,
    		widthStore,
    		heightStore,
    		nodesStore,
    		derivedEdges,
    		backgroundColor,
    		$widthStore,
    		$heightStore,
    		$backgroundColor
    	});

    	$$self.$inject_state = $$props => {
    		if ('nodes' in $$props) $$invalidate(9, nodes = $$props.nodes);
    		if ('edges' in $$props) $$invalidate(10, edges = $$props.edges);
    		if ('width' in $$props) $$invalidate(11, width = $$props.width);
    		if ('height' in $$props) $$invalidate(12, height = $$props.height);
    		if ('background' in $$props) $$invalidate(13, background = $$props.background);
    		if ('movement' in $$props) $$invalidate(14, movement = $$props.movement);
    		if ('snap' in $$props) $$invalidate(15, snap = $$props.snap);
    		if ('snapTo' in $$props) $$invalidate(16, snapTo = $$props.snapTo);
    		if ('bgColor' in $$props) $$invalidate(17, bgColor = $$props.bgColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		$widthStore,
    		$heightStore,
    		$backgroundColor,
    		key,
    		widthStore,
    		heightStore,
    		nodesStore,
    		derivedEdges,
    		backgroundColor,
    		nodes,
    		edges,
    		width,
    		height,
    		background,
    		movement,
    		snap,
    		snapTo,
    		bgColor
    	];
    }

    class Svelvet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$v, create_fragment$v, safe_not_equal, {
    			nodes: 9,
    			edges: 10,
    			width: 11,
    			height: 12,
    			background: 13,
    			movement: 14,
    			snap: 15,
    			snapTo: 16,
    			bgColor: 17
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Svelvet",
    			options,
    			id: create_fragment$v.name
    		});
    	}

    	get nodes() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nodes(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get edges() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edges(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get background() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set background(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get movement() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set movement(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get snap() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set snap(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get snapTo() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set snapTo(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bgColor() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bgColor(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Flow.svelte generated by Svelte v3.52.0 */

    function create_fragment$u(ctx) {
    	let svelvet;
    	let current;

    	svelvet = new Svelvet({
    			props: {
    				nodes: /*flow*/ ctx[0].nodes,
    				edges: /*flow*/ ctx[0].edges,
    				bgColor: "#101317",
    				width: window.innerWidth,
    				height: window.innerHeight,
    				movement: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(svelvet.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(svelvet, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const svelvet_changes = {};
    			if (dirty & /*flow*/ 1) svelvet_changes.nodes = /*flow*/ ctx[0].nodes;
    			if (dirty & /*flow*/ 1) svelvet_changes.edges = /*flow*/ ctx[0].edges;
    			svelvet.$set(svelvet_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svelvet.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svelvet.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(svelvet, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function content(t) {
    	return `<section class='node-html'>
      <img src='swarm/${t.toLowerCase()}.png' class='node-img'></img>
      <p class="node-text">${t}</p>
    </section>`;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	let flow;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Flow', slots, []);

    	const nodeCallback = node => {
    		const n = stack.nodes.find(n => n.name === node.data.name);
    		if (n) selectedNode.set(n);
    	};

    	function toSvelvet(ns, clickCallback) {
    		const edges = [];

    		const nodes = ns.map((n, i) => {
    			if (n.links && n.links.length) {
    				n.links.forEach(link => {
    					const idx = ns.findIndex(node => node.name === link);

    					if (idx > -1) edges.push({
    						id: `edge-${i + 1}-${idx + 1}`,
    						source: idx + 1,
    						target: i + 1,
    						edgeColor: "#dddddd",
    						// noHandle: true,
    						type: ns[idx].place === "Internal" ? "bezier" : "straight",
    						animate: ns[idx].place === "External"
    					});
    				});
    			}

    			const pos = defaultPositions[i] || [150, 150];

    			return {
    				id: i + 1,
    				position: { x: pos[0], y: pos[1] },
    				width: 180,
    				height: 90,
    				borderRadius: 8,
    				// bgColor: colorz[n.type],
    				bgColor: "#1A242E",
    				clickCallback,
    				data: { html: content(n.type), name: n.name },
    				sourcePosition: "right",
    				targetPosition: "left"
    			};
    		});

    		return { nodes, edges };
    	}

    	const colorz = {
    		Btc: "#D4A74E",
    		Lnd: "#9D61FF",
    		Proxy: "#FF6161",
    		Relay: "#49C998",
    		Tribes: "#618AFF",
    		Meme: "#660066",
    		Mqtt: "#660066",
    		Auth: "#9D61FF",
    		Postgres: "#9D61FF"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Flow> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Svelvet,
    		stack,
    		defaultPositions,
    		selectedNode,
    		nodeCallback,
    		toSvelvet,
    		colorz,
    		content,
    		flow
    	});

    	$$self.$inject_state = $$props => {
    		if ('flow' in $$props) $$invalidate(0, flow = $$props.flow);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(0, flow = toSvelvet(stack.nodes, nodeCallback));
    	return [flow];
    }

    class Flow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$u, create_fragment$u, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Flow",
    			options,
    			id: create_fragment$u.name
    		});
    	}
    }

    /* node_modules/carbon-components-svelte/src/Button/ButtonSkeleton.svelte generated by Svelte v3.52.0 */

    const file$r = "node_modules/carbon-components-svelte/src/Button/ButtonSkeleton.svelte";

    // (35:0) {:else}
    function create_else_block$5(ctx) {
    	let div;
    	let mounted;
    	let dispose;
    	let div_levels = [/*$$restProps*/ ctx[2]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			set_attributes(div, div_data);
    			toggle_class(div, "bx--skeleton", true);
    			toggle_class(div, "bx--btn", true);
    			toggle_class(div, "bx--btn--field", /*size*/ ctx[1] === 'field');
    			toggle_class(div, "bx--btn--sm", /*size*/ ctx[1] === 'small');
    			toggle_class(div, "bx--btn--lg", /*size*/ ctx[1] === 'lg');
    			toggle_class(div, "bx--btn--xl", /*size*/ ctx[1] === 'xl');
    			add_location(div, file$r, 35, 2, 801);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", /*click_handler_1*/ ctx[7], false, false, false),
    					listen_dev(div, "mouseover", /*mouseover_handler_1*/ ctx[8], false, false, false),
    					listen_dev(div, "mouseenter", /*mouseenter_handler_1*/ ctx[9], false, false, false),
    					listen_dev(div, "mouseleave", /*mouseleave_handler_1*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]]));
    			toggle_class(div, "bx--skeleton", true);
    			toggle_class(div, "bx--btn", true);
    			toggle_class(div, "bx--btn--field", /*size*/ ctx[1] === 'field');
    			toggle_class(div, "bx--btn--sm", /*size*/ ctx[1] === 'small');
    			toggle_class(div, "bx--btn--lg", /*size*/ ctx[1] === 'lg');
    			toggle_class(div, "bx--btn--xl", /*size*/ ctx[1] === 'xl');
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(35:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (16:0) {#if href}
    function create_if_block$l(ctx) {
    	let a;
    	let t_value = "" + "";
    	let t;
    	let a_rel_value;
    	let mounted;
    	let dispose;

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{
    			rel: a_rel_value = /*$$restProps*/ ctx[2].target === '_blank'
    			? 'noopener noreferrer'
    			: undefined
    		},
    		{ role: "button" },
    		/*$$restProps*/ ctx[2]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			t = text(t_value);
    			set_attributes(a, a_data);
    			toggle_class(a, "bx--skeleton", true);
    			toggle_class(a, "bx--btn", true);
    			toggle_class(a, "bx--btn--field", /*size*/ ctx[1] === 'field');
    			toggle_class(a, "bx--btn--sm", /*size*/ ctx[1] === 'small');
    			toggle_class(a, "bx--btn--lg", /*size*/ ctx[1] === 'lg');
    			toggle_class(a, "bx--btn--xl", /*size*/ ctx[1] === 'xl');
    			add_location(a, file$r, 16, 2, 337);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t);

    			if (!mounted) {
    				dispose = [
    					listen_dev(a, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(a, "mouseover", /*mouseover_handler*/ ctx[4], false, false, false),
    					listen_dev(a, "mouseenter", /*mouseenter_handler*/ ctx[5], false, false, false),
    					listen_dev(a, "mouseleave", /*mouseleave_handler*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				dirty & /*href*/ 1 && { href: /*href*/ ctx[0] },
    				dirty & /*$$restProps*/ 4 && a_rel_value !== (a_rel_value = /*$$restProps*/ ctx[2].target === '_blank'
    				? 'noopener noreferrer'
    				: undefined) && { rel: a_rel_value },
    				{ role: "button" },
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]
    			]));

    			toggle_class(a, "bx--skeleton", true);
    			toggle_class(a, "bx--btn", true);
    			toggle_class(a, "bx--btn--field", /*size*/ ctx[1] === 'field');
    			toggle_class(a, "bx--btn--sm", /*size*/ ctx[1] === 'small');
    			toggle_class(a, "bx--btn--lg", /*size*/ ctx[1] === 'lg');
    			toggle_class(a, "bx--btn--xl", /*size*/ ctx[1] === 'xl');
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$l.name,
    		type: "if",
    		source: "(16:0) {#if href}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$t(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*href*/ ctx[0]) return create_if_block$l;
    		return create_else_block$5;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$1();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	const omit_props_names = ["href","size"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ButtonSkeleton', slots, []);
    	let { href = undefined } = $$props;
    	let { size = "default" } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('href' in $$new_props) $$invalidate(0, href = $$new_props.href);
    		if ('size' in $$new_props) $$invalidate(1, size = $$new_props.size);
    	};

    	$$self.$capture_state = () => ({ href, size });

    	$$self.$inject_state = $$new_props => {
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('size' in $$props) $$invalidate(1, size = $$new_props.size);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		href,
    		size,
    		$$restProps,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		click_handler_1,
    		mouseover_handler_1,
    		mouseenter_handler_1,
    		mouseleave_handler_1
    	];
    }

    class ButtonSkeleton extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$t, create_fragment$t, safe_not_equal, { href: 0, size: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ButtonSkeleton",
    			options,
    			id: create_fragment$t.name
    		});
    	}

    	get href() {
    		throw new Error("<ButtonSkeleton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<ButtonSkeleton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<ButtonSkeleton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ButtonSkeleton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ButtonSkeleton$1 = ButtonSkeleton;

    /* node_modules/carbon-components-svelte/src/Button/Button.svelte generated by Svelte v3.52.0 */
    const file$q = "node_modules/carbon-components-svelte/src/Button/Button.svelte";
    const get_default_slot_changes$1 = dirty => ({ props: dirty[0] & /*buttonProps*/ 512 });
    const get_default_slot_context$1 = ctx => ({ props: /*buttonProps*/ ctx[9] });

    // (163:0) {:else}
    function create_else_block$4(ctx) {
    	let button;
    	let t;
    	let switch_instance;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*hasIconOnly*/ ctx[8] && create_if_block_4$3(ctx);
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);
    	var switch_value = /*icon*/ ctx[2];

    	function switch_props(ctx) {
    		return {
    			props: {
    				"aria-hidden": "true",
    				class: "bx--btn__icon",
    				style: /*hasIconOnly*/ ctx[8] ? 'margin-left: 0' : undefined,
    				"aria-label": /*iconDescription*/ ctx[3]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    	}

    	let button_levels = [/*buttonProps*/ ctx[9]];
    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			set_attributes(button, button_data);
    			add_location(button, file$q, 163, 2, 4429);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			if (if_block) if_block.m(button, null);
    			append_dev(button, t);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			if (switch_instance) mount_component(switch_instance, button, null);
    			if (button.autofocus) button.focus();
    			/*button_binding*/ ctx[33](button);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", /*click_handler_2*/ ctx[24], false, false, false),
    					listen_dev(button, "mouseover", /*mouseover_handler_2*/ ctx[25], false, false, false),
    					listen_dev(button, "mouseenter", /*mouseenter_handler_2*/ ctx[26], false, false, false),
    					listen_dev(button, "mouseleave", /*mouseleave_handler_2*/ ctx[27], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*hasIconOnly*/ ctx[8]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_4$3(ctx);
    					if_block.c();
    					if_block.m(button, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 262144)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
    						null
    					);
    				}
    			}

    			const switch_instance_changes = {};
    			if (dirty[0] & /*hasIconOnly*/ 256) switch_instance_changes.style = /*hasIconOnly*/ ctx[8] ? 'margin-left: 0' : undefined;
    			if (dirty[0] & /*iconDescription*/ 8) switch_instance_changes["aria-label"] = /*iconDescription*/ ctx[3];

    			if (switch_value !== (switch_value = /*icon*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, button, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [dirty[0] & /*buttonProps*/ 512 && /*buttonProps*/ ctx[9]]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			if (switch_instance) destroy_component(switch_instance);
    			/*button_binding*/ ctx[33](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(163:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (143:28) 
    function create_if_block_2$5(ctx) {
    	let a;
    	let t;
    	let switch_instance;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*hasIconOnly*/ ctx[8] && create_if_block_3$4(ctx);
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);
    	var switch_value = /*icon*/ ctx[2];

    	function switch_props(ctx) {
    		return {
    			props: {
    				"aria-hidden": "true",
    				class: "bx--btn__icon",
    				"aria-label": /*iconDescription*/ ctx[3]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    	}

    	let a_levels = [/*buttonProps*/ ctx[9]];
    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (if_block) if_block.c();
    			t = space();
    			if (default_slot) default_slot.c();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			set_attributes(a, a_data);
    			add_location(a, file$q, 144, 2, 4046);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			if (if_block) if_block.m(a, null);
    			append_dev(a, t);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			if (switch_instance) mount_component(switch_instance, a, null);
    			/*a_binding*/ ctx[32](a);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(a, "click", /*click_handler_1*/ ctx[20], false, false, false),
    					listen_dev(a, "mouseover", /*mouseover_handler_1*/ ctx[21], false, false, false),
    					listen_dev(a, "mouseenter", /*mouseenter_handler_1*/ ctx[22], false, false, false),
    					listen_dev(a, "mouseleave", /*mouseleave_handler_1*/ ctx[23], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*hasIconOnly*/ ctx[8]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3$4(ctx);
    					if_block.c();
    					if_block.m(a, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 262144)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
    						null
    					);
    				}
    			}

    			const switch_instance_changes = {};
    			if (dirty[0] & /*iconDescription*/ 8) switch_instance_changes["aria-label"] = /*iconDescription*/ ctx[3];

    			if (switch_value !== (switch_value = /*icon*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, a, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [dirty[0] & /*buttonProps*/ 512 && /*buttonProps*/ ctx[9]]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (if_block) if_block.d();
    			if (default_slot) default_slot.d(detaching);
    			if (switch_instance) destroy_component(switch_instance);
    			/*a_binding*/ ctx[32](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$5.name,
    		type: "if",
    		source: "(143:28) ",
    		ctx
    	});

    	return block;
    }

    // (141:13) 
    function create_if_block_1$7(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], get_default_slot_context$1);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope, buttonProps*/ 262656)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, get_default_slot_changes$1),
    						get_default_slot_context$1
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$7.name,
    		type: "if",
    		source: "(141:13) ",
    		ctx
    	});

    	return block;
    }

    // (130:0) {#if skeleton}
    function create_if_block$k(ctx) {
    	let buttonskeleton;
    	let current;

    	const buttonskeleton_spread_levels = [
    		{ href: /*href*/ ctx[7] },
    		{ size: /*size*/ ctx[1] },
    		/*$$restProps*/ ctx[10],
    		{
    			style: /*hasIconOnly*/ ctx[8] && 'width: 3rem;'
    		}
    	];

    	let buttonskeleton_props = {};

    	for (let i = 0; i < buttonskeleton_spread_levels.length; i += 1) {
    		buttonskeleton_props = assign(buttonskeleton_props, buttonskeleton_spread_levels[i]);
    	}

    	buttonskeleton = new ButtonSkeleton$1({
    			props: buttonskeleton_props,
    			$$inline: true
    		});

    	buttonskeleton.$on("click", /*click_handler*/ ctx[28]);
    	buttonskeleton.$on("mouseover", /*mouseover_handler*/ ctx[29]);
    	buttonskeleton.$on("mouseenter", /*mouseenter_handler*/ ctx[30]);
    	buttonskeleton.$on("mouseleave", /*mouseleave_handler*/ ctx[31]);

    	const block = {
    		c: function create() {
    			create_component(buttonskeleton.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(buttonskeleton, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const buttonskeleton_changes = (dirty[0] & /*href, size, $$restProps, hasIconOnly*/ 1410)
    			? get_spread_update(buttonskeleton_spread_levels, [
    					dirty[0] & /*href*/ 128 && { href: /*href*/ ctx[7] },
    					dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] },
    					dirty[0] & /*$$restProps*/ 1024 && get_spread_object(/*$$restProps*/ ctx[10]),
    					dirty[0] & /*hasIconOnly*/ 256 && {
    						style: /*hasIconOnly*/ ctx[8] && 'width: 3rem;'
    					}
    				])
    			: {};

    			buttonskeleton.$set(buttonskeleton_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(buttonskeleton.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(buttonskeleton.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(buttonskeleton, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$k.name,
    		type: "if",
    		source: "(130:0) {#if skeleton}",
    		ctx
    	});

    	return block;
    }

    // (172:4) {#if hasIconOnly}
    function create_if_block_4$3(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*iconDescription*/ ctx[3]);
    			toggle_class(span, "bx--assistive-text", true);
    			add_location(span, file$q, 172, 6, 4578);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*iconDescription*/ 8) set_data_dev(t, /*iconDescription*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$3.name,
    		type: "if",
    		source: "(172:4) {#if hasIconOnly}",
    		ctx
    	});

    	return block;
    }

    // (153:4) {#if hasIconOnly}
    function create_if_block_3$4(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*iconDescription*/ ctx[3]);
    			toggle_class(span, "bx--assistive-text", true);
    			add_location(span, file$q, 153, 6, 4190);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*iconDescription*/ 8) set_data_dev(t, /*iconDescription*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$4.name,
    		type: "if",
    		source: "(153:4) {#if hasIconOnly}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$s(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$k, create_if_block_1$7, create_if_block_2$5, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*skeleton*/ ctx[5]) return 0;
    		if (/*as*/ ctx[4]) return 1;
    		if (/*href*/ ctx[7] && !/*disabled*/ ctx[6]) return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$1();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let hasIconOnly;
    	let buttonProps;

    	const omit_props_names = [
    		"kind","size","expressive","isSelected","icon","iconDescription","tooltipAlignment","tooltipPosition","as","skeleton","disabled","href","tabindex","type","ref"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	const $$slots = compute_slots(slots);
    	let { kind = "primary" } = $$props;
    	let { size = "default" } = $$props;
    	let { expressive = false } = $$props;
    	let { isSelected = false } = $$props;
    	let { icon = undefined } = $$props;
    	let { iconDescription = undefined } = $$props;
    	let { tooltipAlignment = "center" } = $$props;
    	let { tooltipPosition = "bottom" } = $$props;
    	let { as = false } = $$props;
    	let { skeleton = false } = $$props;
    	let { disabled = false } = $$props;
    	let { href = undefined } = $$props;
    	let { tabindex = "0" } = $$props;
    	let { type = "button" } = $$props;
    	let { ref = null } = $$props;
    	const ctx = getContext("ComposedModal");

    	function click_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function a_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	function button_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('kind' in $$new_props) $$invalidate(11, kind = $$new_props.kind);
    		if ('size' in $$new_props) $$invalidate(1, size = $$new_props.size);
    		if ('expressive' in $$new_props) $$invalidate(12, expressive = $$new_props.expressive);
    		if ('isSelected' in $$new_props) $$invalidate(13, isSelected = $$new_props.isSelected);
    		if ('icon' in $$new_props) $$invalidate(2, icon = $$new_props.icon);
    		if ('iconDescription' in $$new_props) $$invalidate(3, iconDescription = $$new_props.iconDescription);
    		if ('tooltipAlignment' in $$new_props) $$invalidate(14, tooltipAlignment = $$new_props.tooltipAlignment);
    		if ('tooltipPosition' in $$new_props) $$invalidate(15, tooltipPosition = $$new_props.tooltipPosition);
    		if ('as' in $$new_props) $$invalidate(4, as = $$new_props.as);
    		if ('skeleton' in $$new_props) $$invalidate(5, skeleton = $$new_props.skeleton);
    		if ('disabled' in $$new_props) $$invalidate(6, disabled = $$new_props.disabled);
    		if ('href' in $$new_props) $$invalidate(7, href = $$new_props.href);
    		if ('tabindex' in $$new_props) $$invalidate(16, tabindex = $$new_props.tabindex);
    		if ('type' in $$new_props) $$invalidate(17, type = $$new_props.type);
    		if ('ref' in $$new_props) $$invalidate(0, ref = $$new_props.ref);
    		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		kind,
    		size,
    		expressive,
    		isSelected,
    		icon,
    		iconDescription,
    		tooltipAlignment,
    		tooltipPosition,
    		as,
    		skeleton,
    		disabled,
    		href,
    		tabindex,
    		type,
    		ref,
    		getContext,
    		ButtonSkeleton: ButtonSkeleton$1,
    		ctx,
    		hasIconOnly,
    		buttonProps
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('kind' in $$props) $$invalidate(11, kind = $$new_props.kind);
    		if ('size' in $$props) $$invalidate(1, size = $$new_props.size);
    		if ('expressive' in $$props) $$invalidate(12, expressive = $$new_props.expressive);
    		if ('isSelected' in $$props) $$invalidate(13, isSelected = $$new_props.isSelected);
    		if ('icon' in $$props) $$invalidate(2, icon = $$new_props.icon);
    		if ('iconDescription' in $$props) $$invalidate(3, iconDescription = $$new_props.iconDescription);
    		if ('tooltipAlignment' in $$props) $$invalidate(14, tooltipAlignment = $$new_props.tooltipAlignment);
    		if ('tooltipPosition' in $$props) $$invalidate(15, tooltipPosition = $$new_props.tooltipPosition);
    		if ('as' in $$props) $$invalidate(4, as = $$new_props.as);
    		if ('skeleton' in $$props) $$invalidate(5, skeleton = $$new_props.skeleton);
    		if ('disabled' in $$props) $$invalidate(6, disabled = $$new_props.disabled);
    		if ('href' in $$props) $$invalidate(7, href = $$new_props.href);
    		if ('tabindex' in $$props) $$invalidate(16, tabindex = $$new_props.tabindex);
    		if ('type' in $$props) $$invalidate(17, type = $$new_props.type);
    		if ('ref' in $$props) $$invalidate(0, ref = $$new_props.ref);
    		if ('hasIconOnly' in $$props) $$invalidate(8, hasIconOnly = $$new_props.hasIconOnly);
    		if ('buttonProps' in $$props) $$invalidate(9, buttonProps = $$new_props.buttonProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*ref*/ 1) {
    			if (ctx && ref) {
    				ctx.declareRef(ref);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*icon*/ 4) {
    			$$invalidate(8, hasIconOnly = icon && !$$slots.default);
    		}

    		$$invalidate(9, buttonProps = {
    			type: href && !disabled ? undefined : type,
    			tabindex,
    			disabled: disabled === true ? true : undefined,
    			href,
    			"aria-pressed": hasIconOnly && kind === "ghost" && !href
    			? isSelected
    			: undefined,
    			...$$restProps,
    			class: [
    				"bx--btn",
    				expressive && "bx--btn--expressive",
    				(size === "small" && !expressive || size === "sm" && !expressive || size === "small" && !expressive) && "bx--btn--sm",
    				size === "field" && !expressive || size === "md" && !expressive && "bx--btn--md",
    				size === "field" && "bx--btn--field",
    				size === "small" && "bx--btn--sm",
    				size === "lg" && "bx--btn--lg",
    				size === "xl" && "bx--btn--xl",
    				kind && `bx--btn--${kind}`,
    				disabled && "bx--btn--disabled",
    				hasIconOnly && "bx--btn--icon-only",
    				hasIconOnly && "bx--tooltip__trigger",
    				hasIconOnly && "bx--tooltip--a11y",
    				hasIconOnly && tooltipPosition && `bx--btn--icon-only--${tooltipPosition}`,
    				hasIconOnly && tooltipAlignment && `bx--tooltip--align-${tooltipAlignment}`,
    				hasIconOnly && isSelected && kind === "ghost" && "bx--btn--selected",
    				$$restProps.class
    			].filter(Boolean).join(" ")
    		});
    	};

    	return [
    		ref,
    		size,
    		icon,
    		iconDescription,
    		as,
    		skeleton,
    		disabled,
    		href,
    		hasIconOnly,
    		buttonProps,
    		$$restProps,
    		kind,
    		expressive,
    		isSelected,
    		tooltipAlignment,
    		tooltipPosition,
    		tabindex,
    		type,
    		$$scope,
    		slots,
    		click_handler_1,
    		mouseover_handler_1,
    		mouseenter_handler_1,
    		mouseleave_handler_1,
    		click_handler_2,
    		mouseover_handler_2,
    		mouseenter_handler_2,
    		mouseleave_handler_2,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		a_binding,
    		button_binding
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(
    			this,
    			options,
    			instance$s,
    			create_fragment$s,
    			safe_not_equal,
    			{
    				kind: 11,
    				size: 1,
    				expressive: 12,
    				isSelected: 13,
    				icon: 2,
    				iconDescription: 3,
    				tooltipAlignment: 14,
    				tooltipPosition: 15,
    				as: 4,
    				skeleton: 5,
    				disabled: 6,
    				href: 7,
    				tabindex: 16,
    				type: 17,
    				ref: 0
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$s.name
    		});
    	}

    	get kind() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set kind(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get expressive() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set expressive(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isSelected() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isSelected(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconDescription() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconDescription(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tooltipAlignment() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tooltipAlignment(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tooltipPosition() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tooltipPosition(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get as() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set as(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get skeleton() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set skeleton(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabindex() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabindex(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Button$1 = Button;

    /* node_modules/carbon-components-svelte/src/icons/WarningFilled.svelte generated by Svelte v3.52.0 */

    const file$p = "node_modules/carbon-components-svelte/src/icons/WarningFilled.svelte";

    // (24:2) {#if title}
    function create_if_block$j(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$p, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$j.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let if_block = /*title*/ ctx[1] && create_if_block$j(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14C30,8.3,23.7,2,16,2z M14.9,8h2.2v11h-2.2V8z M16,25\tc-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22c0.8,0,1.5,0.7,1.5,1.5S16.8,25,16,25z");
    			add_location(path0, file$p, 24, 2, 579);
    			attr_dev(path1, "fill", "none");
    			attr_dev(path1, "d", "M17.5,23.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22\tC16.8,22,17.5,22.7,17.5,23.5z M17.1,8h-2.2v11h2.2V8z");
    			attr_dev(path1, "data-icon-path", "inner-path");
    			attr_dev(path1, "opacity", "0");
    			add_location(path1, file$p, 26, 10, 777);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$p, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$j(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WarningFilled', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class WarningFilled extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$r, create_fragment$r, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WarningFilled",
    			options,
    			id: create_fragment$r.name
    		});
    	}

    	get size() {
    		throw new Error("<WarningFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<WarningFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<WarningFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<WarningFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var WarningFilled$1 = WarningFilled;

    /* node_modules/carbon-components-svelte/src/icons/WarningAltFilled.svelte generated by Svelte v3.52.0 */

    const file$o = "node_modules/carbon-components-svelte/src/icons/WarningAltFilled.svelte";

    // (24:2) {#if title}
    function create_if_block$i(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$o, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$i.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let path2;
    	let if_block = /*title*/ ctx[1] && create_if_block$i(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			attr_dev(path0, "fill", "none");
    			attr_dev(path0, "d", "M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z");
    			attr_dev(path0, "data-icon-path", "inner-path");
    			add_location(path0, file$o, 24, 2, 579);
    			attr_dev(path1, "d", "M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z");
    			add_location(path1, file$o, 27, 39, 722);
    			attr_dev(path2, "d", "M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z");
    			add_location(path2, file$o, 29, 10, 886);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$o, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$i(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WarningAltFilled', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class WarningAltFilled extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$q, create_fragment$q, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WarningAltFilled",
    			options,
    			id: create_fragment$q.name
    		});
    	}

    	get size() {
    		throw new Error("<WarningAltFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<WarningAltFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<WarningAltFilled>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<WarningAltFilled>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var WarningAltFilled$1 = WarningAltFilled;

    /* node_modules/carbon-components-svelte/src/ListBox/ListBox.svelte generated by Svelte v3.52.0 */

    const file$n = "node_modules/carbon-components-svelte/src/ListBox/ListBox.svelte";

    // (59:0) {#if invalid}
    function create_if_block_1$6(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*invalidText*/ ctx[6]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$n, 59, 2, 1374);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*invalidText*/ 64) set_data_dev(t, /*invalidText*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$6.name,
    		type: "if",
    		source: "(59:0) {#if invalid}",
    		ctx
    	});

    	return block;
    }

    // (62:0) {#if !invalid && warn}
    function create_if_block$h(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*warnText*/ ctx[8]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$n, 62, 2, 1466);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*warnText*/ 256) set_data_dev(t, /*warnText*/ ctx[8]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$h.name,
    		type: "if",
    		source: "(62:0) {#if !invalid && warn}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let div;
    	let div_data_invalid_value;
    	let t0;
    	let t1;
    	let if_block1_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);

    	let div_levels = [
    		{ role: "listbox" },
    		{ tabindex: "-1" },
    		{
    			"data-invalid": div_data_invalid_value = /*invalid*/ ctx[5] || undefined
    		},
    		/*$$restProps*/ ctx[9]
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	let if_block0 = /*invalid*/ ctx[5] && create_if_block_1$6(ctx);
    	let if_block1 = !/*invalid*/ ctx[5] && /*warn*/ ctx[7] && create_if_block$h(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty$1();
    			set_attributes(div, div_data);
    			toggle_class(div, "bx--list-box", true);
    			toggle_class(div, "bx--list-box--sm", /*size*/ ctx[0] === 'sm');
    			toggle_class(div, "bx--list-box--xl", /*size*/ ctx[0] === 'xl');
    			toggle_class(div, "bx--list-box--inline", /*type*/ ctx[1] === 'inline');
    			toggle_class(div, "bx--list-box--disabled", /*disabled*/ ctx[4]);
    			toggle_class(div, "bx--list-box--expanded", /*open*/ ctx[2]);
    			toggle_class(div, "bx--list-box--light", /*light*/ ctx[3]);
    			toggle_class(div, "bx--list-box--warning", !/*invalid*/ ctx[5] && /*warn*/ ctx[7]);
    			add_location(div, file$n, 35, 0, 769);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "keydown", /*keydown_handler*/ ctx[12], false, false, false),
    					listen_dev(div, "keydown", keydown_handler_1, false, false, false),
    					listen_dev(div, "click", prevent_default(/*click_handler*/ ctx[13]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[10],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				{ role: "listbox" },
    				{ tabindex: "-1" },
    				(!current || dirty & /*invalid*/ 32 && div_data_invalid_value !== (div_data_invalid_value = /*invalid*/ ctx[5] || undefined)) && { "data-invalid": div_data_invalid_value },
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9]
    			]));

    			toggle_class(div, "bx--list-box", true);
    			toggle_class(div, "bx--list-box--sm", /*size*/ ctx[0] === 'sm');
    			toggle_class(div, "bx--list-box--xl", /*size*/ ctx[0] === 'xl');
    			toggle_class(div, "bx--list-box--inline", /*type*/ ctx[1] === 'inline');
    			toggle_class(div, "bx--list-box--disabled", /*disabled*/ ctx[4]);
    			toggle_class(div, "bx--list-box--expanded", /*open*/ ctx[2]);
    			toggle_class(div, "bx--list-box--light", /*light*/ ctx[3]);
    			toggle_class(div, "bx--list-box--warning", !/*invalid*/ ctx[5] && /*warn*/ ctx[7]);

    			if (/*invalid*/ ctx[5]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$6(ctx);
    					if_block0.c();
    					if_block0.m(t1.parentNode, t1);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (!/*invalid*/ ctx[5] && /*warn*/ ctx[7]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$h(ctx);
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler_1 = e => {
    	if (e.key === 'Escape') {
    		e.stopPropagation();
    	}
    };

    function instance$p($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"size","type","open","light","disabled","invalid","invalidText","warn","warnText"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ListBox', slots, ['default']);
    	let { size = undefined } = $$props;
    	let { type = "default" } = $$props;
    	let { open = false } = $$props;
    	let { light = false } = $$props;
    	let { disabled = false } = $$props;
    	let { invalid = false } = $$props;
    	let { invalidText = "" } = $$props;
    	let { warn = false } = $$props;
    	let { warnText = "" } = $$props;

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('type' in $$new_props) $$invalidate(1, type = $$new_props.type);
    		if ('open' in $$new_props) $$invalidate(2, open = $$new_props.open);
    		if ('light' in $$new_props) $$invalidate(3, light = $$new_props.light);
    		if ('disabled' in $$new_props) $$invalidate(4, disabled = $$new_props.disabled);
    		if ('invalid' in $$new_props) $$invalidate(5, invalid = $$new_props.invalid);
    		if ('invalidText' in $$new_props) $$invalidate(6, invalidText = $$new_props.invalidText);
    		if ('warn' in $$new_props) $$invalidate(7, warn = $$new_props.warn);
    		if ('warnText' in $$new_props) $$invalidate(8, warnText = $$new_props.warnText);
    		if ('$$scope' in $$new_props) $$invalidate(10, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		size,
    		type,
    		open,
    		light,
    		disabled,
    		invalid,
    		invalidText,
    		warn,
    		warnText
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('type' in $$props) $$invalidate(1, type = $$new_props.type);
    		if ('open' in $$props) $$invalidate(2, open = $$new_props.open);
    		if ('light' in $$props) $$invalidate(3, light = $$new_props.light);
    		if ('disabled' in $$props) $$invalidate(4, disabled = $$new_props.disabled);
    		if ('invalid' in $$props) $$invalidate(5, invalid = $$new_props.invalid);
    		if ('invalidText' in $$props) $$invalidate(6, invalidText = $$new_props.invalidText);
    		if ('warn' in $$props) $$invalidate(7, warn = $$new_props.warn);
    		if ('warnText' in $$props) $$invalidate(8, warnText = $$new_props.warnText);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		size,
    		type,
    		open,
    		light,
    		disabled,
    		invalid,
    		invalidText,
    		warn,
    		warnText,
    		$$restProps,
    		$$scope,
    		slots,
    		keydown_handler,
    		click_handler
    	];
    }

    class ListBox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$p, create_fragment$p, safe_not_equal, {
    			size: 0,
    			type: 1,
    			open: 2,
    			light: 3,
    			disabled: 4,
    			invalid: 5,
    			invalidText: 6,
    			warn: 7,
    			warnText: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ListBox",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get size() {
    		throw new Error("<ListBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ListBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<ListBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<ListBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<ListBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<ListBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get light() {
    		throw new Error("<ListBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<ListBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<ListBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<ListBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<ListBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<ListBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalidText() {
    		throw new Error("<ListBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalidText(value) {
    		throw new Error("<ListBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warn() {
    		throw new Error("<ListBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warn(value) {
    		throw new Error("<ListBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warnText() {
    		throw new Error("<ListBox>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warnText(value) {
    		throw new Error("<ListBox>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ListBox$1 = ListBox;

    /* node_modules/carbon-components-svelte/src/ListBox/ListBoxMenu.svelte generated by Svelte v3.52.0 */

    const file$m = "node_modules/carbon-components-svelte/src/ListBox/ListBoxMenu.svelte";

    function create_fragment$o(ctx) {
    	let div;
    	let div_id_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	let div_levels = [
    		{ role: "listbox" },
    		{
    			id: div_id_value = "menu-" + /*id*/ ctx[1]
    		},
    		/*$$restProps*/ ctx[2]
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			toggle_class(div, "bx--list-box__menu", true);
    			add_location(div, file$m, 8, 0, 194);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[6](div);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "scroll", /*scroll_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				{ role: "listbox" },
    				(!current || dirty & /*id*/ 2 && div_id_value !== (div_id_value = "menu-" + /*id*/ ctx[1])) && { id: div_id_value },
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]
    			]));

    			toggle_class(div, "bx--list-box__menu", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[6](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	const omit_props_names = ["id","ref"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ListBoxMenu', slots, ['default']);
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	let { ref = null } = $$props;

    	function scroll_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('id' in $$new_props) $$invalidate(1, id = $$new_props.id);
    		if ('ref' in $$new_props) $$invalidate(0, ref = $$new_props.ref);
    		if ('$$scope' in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({ id, ref });

    	$$self.$inject_state = $$new_props => {
    		if ('id' in $$props) $$invalidate(1, id = $$new_props.id);
    		if ('ref' in $$props) $$invalidate(0, ref = $$new_props.ref);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ref, id, $$restProps, $$scope, slots, scroll_handler, div_binding];
    }

    class ListBoxMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$o, create_fragment$o, safe_not_equal, { id: 1, ref: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ListBoxMenu",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get id() {
    		throw new Error("<ListBoxMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<ListBoxMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<ListBoxMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<ListBoxMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ListBoxMenu$1 = ListBoxMenu;

    /* node_modules/carbon-components-svelte/src/icons/ChevronDown.svelte generated by Svelte v3.52.0 */

    const file$l = "node_modules/carbon-components-svelte/src/icons/ChevronDown.svelte";

    // (24:2) {#if title}
    function create_if_block$g(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$l, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$g.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$n(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$g(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z");
    			add_location(path, file$l, 24, 2, 579);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$l, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$g(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChevronDown', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class ChevronDown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$n, create_fragment$n, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChevronDown",
    			options,
    			id: create_fragment$n.name
    		});
    	}

    	get size() {
    		throw new Error("<ChevronDown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ChevronDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<ChevronDown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<ChevronDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ChevronDown$1 = ChevronDown;

    /* node_modules/carbon-components-svelte/src/ListBox/ListBoxMenuIcon.svelte generated by Svelte v3.52.0 */
    const file$k = "node_modules/carbon-components-svelte/src/ListBox/ListBoxMenuIcon.svelte";

    function create_fragment$m(ctx) {
    	let div;
    	let chevrondown;
    	let current;
    	let mounted;
    	let dispose;

    	chevrondown = new ChevronDown$1({
    			props: {
    				"aria-label": /*description*/ ctx[1],
    				title: /*description*/ ctx[1]
    			},
    			$$inline: true
    		});

    	let div_levels = [/*$$restProps*/ ctx[2]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(chevrondown.$$.fragment);
    			set_attributes(div, div_data);
    			toggle_class(div, "bx--list-box__menu-icon", true);
    			toggle_class(div, "bx--list-box__menu-icon--open", /*open*/ ctx[0]);
    			add_location(div, file$k, 29, 0, 799);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(chevrondown, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", prevent_default(/*click_handler*/ ctx[6]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const chevrondown_changes = {};
    			if (dirty & /*description*/ 2) chevrondown_changes["aria-label"] = /*description*/ ctx[1];
    			if (dirty & /*description*/ 2) chevrondown_changes.title = /*description*/ ctx[1];
    			chevrondown.$set(chevrondown_changes);
    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2]]));
    			toggle_class(div, "bx--list-box__menu-icon", true);
    			toggle_class(div, "bx--list-box__menu-icon--open", /*open*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chevrondown.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chevrondown.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(chevrondown);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let translationId;
    	let description;
    	const omit_props_names = ["open","translationIds","translateWithId"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ListBoxMenuIcon', slots, []);
    	let { open = false } = $$props;
    	const translationIds = { close: "close", open: "open" };
    	let { translateWithId = id => defaultTranslations[id] } = $$props;

    	const defaultTranslations = {
    		[translationIds.close]: "Close menu",
    		[translationIds.open]: "Open menu"
    	};

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('open' in $$new_props) $$invalidate(0, open = $$new_props.open);
    		if ('translateWithId' in $$new_props) $$invalidate(4, translateWithId = $$new_props.translateWithId);
    	};

    	$$self.$capture_state = () => ({
    		open,
    		translationIds,
    		translateWithId,
    		ChevronDown: ChevronDown$1,
    		defaultTranslations,
    		translationId,
    		description
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('open' in $$props) $$invalidate(0, open = $$new_props.open);
    		if ('translateWithId' in $$props) $$invalidate(4, translateWithId = $$new_props.translateWithId);
    		if ('translationId' in $$props) $$invalidate(5, translationId = $$new_props.translationId);
    		if ('description' in $$props) $$invalidate(1, description = $$new_props.description);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*open*/ 1) {
    			$$invalidate(5, translationId = open ? translationIds.close : translationIds.open);
    		}

    		if ($$self.$$.dirty & /*translateWithId, translationId*/ 48) {
    			$$invalidate(1, description = translateWithId?.(translationId) ?? defaultTranslations[translationId]);
    		}
    	};

    	return [
    		open,
    		description,
    		$$restProps,
    		translationIds,
    		translateWithId,
    		translationId,
    		click_handler
    	];
    }

    class ListBoxMenuIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$m, create_fragment$m, safe_not_equal, {
    			open: 0,
    			translationIds: 3,
    			translateWithId: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ListBoxMenuIcon",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get open() {
    		throw new Error("<ListBoxMenuIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<ListBoxMenuIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translationIds() {
    		return this.$$.ctx[3];
    	}

    	set translationIds(value) {
    		throw new Error("<ListBoxMenuIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translateWithId() {
    		throw new Error("<ListBoxMenuIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set translateWithId(value) {
    		throw new Error("<ListBoxMenuIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ListBoxMenuIcon$1 = ListBoxMenuIcon;

    /* node_modules/carbon-components-svelte/src/ListBox/ListBoxMenuItem.svelte generated by Svelte v3.52.0 */

    const file$j = "node_modules/carbon-components-svelte/src/ListBox/ListBoxMenuItem.svelte";

    function create_fragment$l(ctx) {
    	let div1;
    	let div0;
    	let div1_disabled_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	let div1_levels = [
    		{ role: "option" },
    		{ "aria-selected": /*active*/ ctx[0] },
    		{
    			disabled: div1_disabled_value = /*disabled*/ ctx[2] ? true : undefined
    		},
    		/*$$restProps*/ ctx[5]
    	];

    	let div1_data = {};

    	for (let i = 0; i < div1_levels.length; i += 1) {
    		div1_data = assign(div1_data, div1_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "title", /*title*/ ctx[4]);
    			toggle_class(div0, "bx--list-box__menu-item__option", true);
    			add_location(div0, file$j, 32, 2, 897);
    			set_attributes(div1, div1_data);
    			toggle_class(div1, "bx--list-box__menu-item", true);
    			toggle_class(div1, "bx--list-box__menu-item--active", /*active*/ ctx[0]);
    			toggle_class(div1, "bx--list-box__menu-item--highlighted", /*highlighted*/ ctx[1] || /*active*/ ctx[0]);
    			add_location(div1, file$j, 20, 0, 577);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			/*div0_binding*/ ctx[12](div0);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div1, "click", /*click_handler*/ ctx[9], false, false, false),
    					listen_dev(div1, "mouseenter", /*mouseenter_handler*/ ctx[10], false, false, false),
    					listen_dev(div1, "mouseleave", /*mouseleave_handler*/ ctx[11], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[7],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[7])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*title*/ 16) {
    				attr_dev(div0, "title", /*title*/ ctx[4]);
    			}

    			set_attributes(div1, div1_data = get_spread_update(div1_levels, [
    				{ role: "option" },
    				(!current || dirty & /*active*/ 1) && { "aria-selected": /*active*/ ctx[0] },
    				(!current || dirty & /*disabled*/ 4 && div1_disabled_value !== (div1_disabled_value = /*disabled*/ ctx[2] ? true : undefined)) && { disabled: div1_disabled_value },
    				dirty & /*$$restProps*/ 32 && /*$$restProps*/ ctx[5]
    			]));

    			toggle_class(div1, "bx--list-box__menu-item", true);
    			toggle_class(div1, "bx--list-box__menu-item--active", /*active*/ ctx[0]);
    			toggle_class(div1, "bx--list-box__menu-item--highlighted", /*highlighted*/ ctx[1] || /*active*/ ctx[0]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			/*div0_binding*/ ctx[12](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let isTruncated;
    	let title;
    	const omit_props_names = ["active","highlighted","disabled"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ListBoxMenuItem', slots, ['default']);
    	let { active = false } = $$props;
    	let { highlighted = false } = $$props;
    	let { disabled = false } = $$props;
    	let ref = null;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(3, ref);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('active' in $$new_props) $$invalidate(0, active = $$new_props.active);
    		if ('highlighted' in $$new_props) $$invalidate(1, highlighted = $$new_props.highlighted);
    		if ('disabled' in $$new_props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ('$$scope' in $$new_props) $$invalidate(7, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		active,
    		highlighted,
    		disabled,
    		ref,
    		isTruncated,
    		title
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('active' in $$props) $$invalidate(0, active = $$new_props.active);
    		if ('highlighted' in $$props) $$invalidate(1, highlighted = $$new_props.highlighted);
    		if ('disabled' in $$props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ('ref' in $$props) $$invalidate(3, ref = $$new_props.ref);
    		if ('isTruncated' in $$props) $$invalidate(6, isTruncated = $$new_props.isTruncated);
    		if ('title' in $$props) $$invalidate(4, title = $$new_props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*ref*/ 8) {
    			$$invalidate(6, isTruncated = ref?.offsetWidth < ref?.scrollWidth);
    		}

    		if ($$self.$$.dirty & /*isTruncated, ref*/ 72) {
    			$$invalidate(4, title = isTruncated ? ref?.innerText : undefined);
    		}

    		if ($$self.$$.dirty & /*highlighted, ref*/ 10) {
    			if (highlighted && ref && !ref.matches(":hover")) {
    				// Scroll highlighted item into view if using keyboard navigation
    				ref.scrollIntoView({ block: "nearest" });
    			}
    		}
    	};

    	return [
    		active,
    		highlighted,
    		disabled,
    		ref,
    		title,
    		$$restProps,
    		isTruncated,
    		$$scope,
    		slots,
    		click_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		div0_binding
    	];
    }

    class ListBoxMenuItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$l, create_fragment$l, safe_not_equal, { active: 0, highlighted: 1, disabled: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ListBoxMenuItem",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get active() {
    		throw new Error("<ListBoxMenuItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<ListBoxMenuItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get highlighted() {
    		throw new Error("<ListBoxMenuItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set highlighted(value) {
    		throw new Error("<ListBoxMenuItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<ListBoxMenuItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<ListBoxMenuItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var ListBoxMenuItem$1 = ListBoxMenuItem;

    /* node_modules/carbon-components-svelte/src/Dropdown/Dropdown.svelte generated by Svelte v3.52.0 */

    const file$i = "node_modules/carbon-components-svelte/src/Dropdown/Dropdown.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[37] = list[i];
    	child_ctx[39] = i;
    	return child_ctx;
    }

    const get_default_slot_changes = dirty => ({
    	item: dirty[0] & /*items*/ 8,
    	index: dirty[0] & /*items*/ 8
    });

    const get_default_slot_context = ctx => ({
    	item: /*item*/ ctx[37],
    	index: /*i*/ ctx[39]
    });

    // (167:2) {#if titleText}
    function create_if_block_5$2(ctx) {
    	let label_1;
    	let t;

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			t = text(/*titleText*/ ctx[10]);
    			attr_dev(label_1, "for", /*id*/ ctx[19]);
    			toggle_class(label_1, "bx--label", true);
    			toggle_class(label_1, "bx--label--disabled", /*disabled*/ ctx[9]);
    			toggle_class(label_1, "bx--visually-hidden", /*hideLabel*/ ctx[17]);
    			add_location(label_1, file$i, 167, 4, 4003);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*titleText*/ 1024) set_data_dev(t, /*titleText*/ ctx[10]);

    			if (dirty[0] & /*id*/ 524288) {
    				attr_dev(label_1, "for", /*id*/ ctx[19]);
    			}

    			if (dirty[0] & /*disabled*/ 512) {
    				toggle_class(label_1, "bx--label--disabled", /*disabled*/ ctx[9]);
    			}

    			if (dirty[0] & /*hideLabel*/ 131072) {
    				toggle_class(label_1, "bx--visually-hidden", /*hideLabel*/ ctx[17]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$2.name,
    		type: "if",
    		source: "(167:2) {#if titleText}",
    		ctx
    	});

    	return block;
    }

    // (204:4) {#if invalid}
    function create_if_block_4$2(ctx) {
    	let warningfilled;
    	let current;

    	warningfilled = new WarningFilled$1({
    			props: { class: "bx--list-box__invalid-icon" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(warningfilled.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(warningfilled, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(warningfilled.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(warningfilled.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(warningfilled, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$2.name,
    		type: "if",
    		source: "(204:4) {#if invalid}",
    		ctx
    	});

    	return block;
    }

    // (207:4) {#if !invalid && warn}
    function create_if_block_3$3(ctx) {
    	let warningaltfilled;
    	let current;

    	warningaltfilled = new WarningAltFilled$1({
    			props: {
    				class: "bx--list-box__invalid-icon bx--list-box__invalid-icon--warning"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(warningaltfilled.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(warningaltfilled, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(warningaltfilled.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(warningaltfilled.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(warningaltfilled, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$3.name,
    		type: "if",
    		source: "(207:4) {#if !invalid && warn}",
    		ctx
    	});

    	return block;
    }

    // (248:54) {:else}
    function create_else_block$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*label*/ ctx[16]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*label*/ 65536) set_data_dev(t, /*label*/ ctx[16]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(248:54) {:else}",
    		ctx
    	});

    	return block;
    }

    // (248:8) {#if selectedItem}
    function create_if_block_2$4(ctx) {
    	let t_value = /*itemToString*/ ctx[4](/*selectedItem*/ ctx[21]) + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*itemToString, selectedItem*/ 2097168 && t_value !== (t_value = /*itemToString*/ ctx[4](/*selectedItem*/ ctx[21]) + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$4.name,
    		type: "if",
    		source: "(248:8) {#if selectedItem}",
    		ctx
    	});

    	return block;
    }

    // (260:4) {#if open}
    function create_if_block_1$5(ctx) {
    	let listboxmenu;
    	let current;

    	listboxmenu = new ListBoxMenu$1({
    			props: {
    				"aria-labelledby": /*id*/ ctx[19],
    				id: /*id*/ ctx[19],
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(listboxmenu.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(listboxmenu, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const listboxmenu_changes = {};
    			if (dirty[0] & /*id*/ 524288) listboxmenu_changes["aria-labelledby"] = /*id*/ ctx[19];
    			if (dirty[0] & /*id*/ 524288) listboxmenu_changes.id = /*id*/ ctx[19];

    			if (dirty[0] & /*items, selectedId, highlightedIndex, ref, itemToString*/ 4194333 | dirty[1] & /*$$scope*/ 16) {
    				listboxmenu_changes.$$scope = { dirty, ctx };
    			}

    			listboxmenu.$set(listboxmenu_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(listboxmenu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(listboxmenu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(listboxmenu, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(260:4) {#if open}",
    		ctx
    	});

    	return block;
    }

    // (281:44)                
    function fallback_block$3(ctx) {
    	let t_value = /*itemToString*/ ctx[4](/*item*/ ctx[37]) + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*itemToString, items*/ 24 && t_value !== (t_value = /*itemToString*/ ctx[4](/*item*/ ctx[37]) + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$3.name,
    		type: "fallback",
    		source: "(281:44)                ",
    		ctx
    	});

    	return block;
    }

    // (263:10) <ListBoxMenuItem             id="{item.id}"             active="{selectedId === item.id}"             highlighted="{highlightedIndex === i}"             disabled="{item.disabled}"             on:click="{(e) => {               if (item.disabled) {                 e.stopPropagation();                 return;               }               selectedId = item.id;               ref.focus();             }}"             on:mouseenter="{() => {               if (item.disabled) return;               highlightedIndex = i;             }}"           >
    function create_default_slot_2$1(ctx) {
    	let t;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[27].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[35], get_default_slot_context);
    	const default_slot_or_fallback = default_slot || fallback_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(target, anchor);
    			}

    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*items*/ 8 | dirty[1] & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[35],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[35])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[35], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty[0] & /*itemToString, items*/ 24)) {
    					default_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(263:10) <ListBoxMenuItem             id=\\\"{item.id}\\\"             active=\\\"{selectedId === item.id}\\\"             highlighted=\\\"{highlightedIndex === i}\\\"             disabled=\\\"{item.disabled}\\\"             on:click=\\\"{(e) => {               if (item.disabled) {                 e.stopPropagation();                 return;               }               selectedId = item.id;               ref.focus();             }}\\\"             on:mouseenter=\\\"{() => {               if (item.disabled) return;               highlightedIndex = i;             }}\\\"           >",
    		ctx
    	});

    	return block;
    }

    // (262:8) {#each items as item, i (item.id)}
    function create_each_block$2(key_1, ctx) {
    	let first;
    	let listboxmenuitem;
    	let current;

    	function click_handler_2(...args) {
    		return /*click_handler_2*/ ctx[32](/*item*/ ctx[37], ...args);
    	}

    	function mouseenter_handler() {
    		return /*mouseenter_handler*/ ctx[33](/*item*/ ctx[37], /*i*/ ctx[39]);
    	}

    	listboxmenuitem = new ListBoxMenuItem$1({
    			props: {
    				id: /*item*/ ctx[37].id,
    				active: /*selectedId*/ ctx[0] === /*item*/ ctx[37].id,
    				highlighted: /*highlightedIndex*/ ctx[22] === /*i*/ ctx[39],
    				disabled: /*item*/ ctx[37].disabled,
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	listboxmenuitem.$on("click", click_handler_2);
    	listboxmenuitem.$on("mouseenter", mouseenter_handler);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty$1();
    			create_component(listboxmenuitem.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(listboxmenuitem, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const listboxmenuitem_changes = {};
    			if (dirty[0] & /*items*/ 8) listboxmenuitem_changes.id = /*item*/ ctx[37].id;
    			if (dirty[0] & /*selectedId, items*/ 9) listboxmenuitem_changes.active = /*selectedId*/ ctx[0] === /*item*/ ctx[37].id;
    			if (dirty[0] & /*highlightedIndex, items*/ 4194312) listboxmenuitem_changes.highlighted = /*highlightedIndex*/ ctx[22] === /*i*/ ctx[39];
    			if (dirty[0] & /*items*/ 8) listboxmenuitem_changes.disabled = /*item*/ ctx[37].disabled;

    			if (dirty[0] & /*itemToString, items*/ 24 | dirty[1] & /*$$scope*/ 16) {
    				listboxmenuitem_changes.$$scope = { dirty, ctx };
    			}

    			listboxmenuitem.$set(listboxmenuitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(listboxmenuitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(listboxmenuitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(listboxmenuitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(262:8) {#each items as item, i (item.id)}",
    		ctx
    	});

    	return block;
    }

    // (261:6) <ListBoxMenu aria-labelledby="{id}" id="{id}">
    function create_default_slot_1$1(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value = /*items*/ ctx[3];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*item*/ ctx[37].id;
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*items, selectedId, highlightedIndex, ref, itemToString*/ 4194333 | dirty[1] & /*$$scope*/ 16) {
    				each_value = /*items*/ ctx[3];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$2, each_1_anchor, get_each_context$2);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(261:6) <ListBoxMenu aria-labelledby=\\\"{id}\\\" id=\\\"{id}\\\">",
    		ctx
    	});

    	return block;
    }

    // (177:2) <ListBox     role="{undefined}"     type="{type}"     size="{size}"     name="{name}"     aria-label="{$$props['aria-label']}"     class="bx--dropdown {direction === 'top' && 'bx--list-box--up'} {invalid &&       'bx--dropdown--invalid'} {!invalid &&       warn &&       'bx--dropdown--warning'} {open && 'bx--dropdown--open'}       {size === 'sm' && 'bx--dropdown--sm'}       {size === 'xl' && 'bx--dropdown--xl'}       {inline && 'bx--dropdown--inline'}       {disabled && 'bx--dropdown--disabled'}       {light && 'bx--dropdown--light'}"     on:click="{({ target }) => {       if (disabled) return;       open = ref.contains(target) ? !open : false;     }}"     disabled="{disabled}"     open="{open}"     invalid="{invalid}"     invalidText="{invalidText}"     light="{light}"     warn="{warn}"     warnText="{warnText}"   >
    function create_default_slot$3(ctx) {
    	let t0;
    	let t1;
    	let button;
    	let span;
    	let t2;
    	let listboxmenuicon;
    	let t3;
    	let if_block3_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*invalid*/ ctx[11] && create_if_block_4$2(ctx);
    	let if_block1 = !/*invalid*/ ctx[11] && /*warn*/ ctx[13] && create_if_block_3$3(ctx);

    	function select_block_type(ctx, dirty) {
    		if (/*selectedItem*/ ctx[21]) return create_if_block_2$4;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block2 = current_block_type(ctx);

    	listboxmenuicon = new ListBoxMenuIcon$1({
    			props: {
    				translateWithId: /*translateWithId*/ ctx[18],
    				open: /*open*/ ctx[1]
    			},
    			$$inline: true
    		});

    	listboxmenuicon.$on("click", /*click_handler_1*/ ctx[29]);
    	let if_block3 = /*open*/ ctx[1] && create_if_block_1$5(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			button = element("button");
    			span = element("span");
    			if_block2.c();
    			t2 = space();
    			create_component(listboxmenuicon.$$.fragment);
    			t3 = space();
    			if (if_block3) if_block3.c();
    			if_block3_anchor = empty$1();
    			toggle_class(span, "bx--list-box__label", true);
    			add_location(span, file$i, 246, 6, 6218);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "tabindex", "0");
    			attr_dev(button, "aria-expanded", /*open*/ ctx[1]);
    			button.disabled = /*disabled*/ ctx[9];
    			attr_dev(button, "translatewithid", /*translateWithId*/ ctx[18]);
    			attr_dev(button, "id", /*id*/ ctx[19]);
    			toggle_class(button, "bx--list-box__field", true);
    			add_location(button, file$i, 211, 4, 5265);
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, button, anchor);
    			append_dev(button, span);
    			if_block2.m(span, null);
    			append_dev(button, t2);
    			mount_component(listboxmenuicon, button, null);
    			/*button_binding*/ ctx[30](button);
    			insert_dev(target, t3, anchor);
    			if (if_block3) if_block3.m(target, anchor);
    			insert_dev(target, if_block3_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "keydown", /*keydown_handler*/ ctx[31], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*invalid*/ ctx[11]) {
    				if (if_block0) {
    					if (dirty[0] & /*invalid*/ 2048) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_4$2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!/*invalid*/ ctx[11] && /*warn*/ ctx[13]) {
    				if (if_block1) {
    					if (dirty[0] & /*invalid, warn*/ 10240) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_3$3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block2) {
    				if_block2.p(ctx, dirty);
    			} else {
    				if_block2.d(1);
    				if_block2 = current_block_type(ctx);

    				if (if_block2) {
    					if_block2.c();
    					if_block2.m(span, null);
    				}
    			}

    			const listboxmenuicon_changes = {};
    			if (dirty[0] & /*translateWithId*/ 262144) listboxmenuicon_changes.translateWithId = /*translateWithId*/ ctx[18];
    			if (dirty[0] & /*open*/ 2) listboxmenuicon_changes.open = /*open*/ ctx[1];
    			listboxmenuicon.$set(listboxmenuicon_changes);

    			if (!current || dirty[0] & /*open*/ 2) {
    				attr_dev(button, "aria-expanded", /*open*/ ctx[1]);
    			}

    			if (!current || dirty[0] & /*disabled*/ 512) {
    				prop_dev(button, "disabled", /*disabled*/ ctx[9]);
    			}

    			if (!current || dirty[0] & /*translateWithId*/ 262144) {
    				attr_dev(button, "translatewithid", /*translateWithId*/ ctx[18]);
    			}

    			if (!current || dirty[0] & /*id*/ 524288) {
    				attr_dev(button, "id", /*id*/ ctx[19]);
    			}

    			if (/*open*/ ctx[1]) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);

    					if (dirty[0] & /*open*/ 2) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block_1$5(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(listboxmenuicon.$$.fragment, local);
    			transition_in(if_block3);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(listboxmenuicon.$$.fragment, local);
    			transition_out(if_block3);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(button);
    			if_block2.d();
    			destroy_component(listboxmenuicon);
    			/*button_binding*/ ctx[30](null);
    			if (detaching) detach_dev(t3);
    			if (if_block3) if_block3.d(detaching);
    			if (detaching) detach_dev(if_block3_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(177:2) <ListBox     role=\\\"{undefined}\\\"     type=\\\"{type}\\\"     size=\\\"{size}\\\"     name=\\\"{name}\\\"     aria-label=\\\"{$$props['aria-label']}\\\"     class=\\\"bx--dropdown {direction === 'top' && 'bx--list-box--up'} {invalid &&       'bx--dropdown--invalid'} {!invalid &&       warn &&       'bx--dropdown--warning'} {open && 'bx--dropdown--open'}       {size === 'sm' && 'bx--dropdown--sm'}       {size === 'xl' && 'bx--dropdown--xl'}       {inline && 'bx--dropdown--inline'}       {disabled && 'bx--dropdown--disabled'}       {light && 'bx--dropdown--light'}\\\"     on:click=\\\"{({ target }) => {       if (disabled) return;       open = ref.contains(target) ? !open : false;     }}\\\"     disabled=\\\"{disabled}\\\"     open=\\\"{open}\\\"     invalid=\\\"{invalid}\\\"     invalidText=\\\"{invalidText}\\\"     light=\\\"{light}\\\"     warn=\\\"{warn}\\\"     warnText=\\\"{warnText}\\\"   >",
    		ctx
    	});

    	return block;
    }

    // (289:2) {#if !inline && !invalid && !warn && helperText}
    function create_if_block$f(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*helperText*/ ctx[15]);
    			toggle_class(div, "bx--form__helper-text", true);
    			toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[9]);
    			add_location(div, file$i, 289, 4, 7496);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*helperText*/ 32768) set_data_dev(t, /*helperText*/ ctx[15]);

    			if (dirty[0] & /*disabled*/ 512) {
    				toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[9]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$f.name,
    		type: "if",
    		source: "(289:2) {#if !inline && !invalid && !warn && helperText}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let div;
    	let t0;
    	let listbox;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*titleText*/ ctx[10] && create_if_block_5$2(ctx);

    	listbox = new ListBox$1({
    			props: {
    				role: undefined,
    				type: /*type*/ ctx[5],
    				size: /*size*/ ctx[7],
    				name: /*name*/ ctx[20],
    				"aria-label": /*$$props*/ ctx[26]['aria-label'],
    				class: "bx--dropdown " + (/*direction*/ ctx[6] === 'top' && 'bx--list-box--up') + " " + (/*invalid*/ ctx[11] && 'bx--dropdown--invalid') + " " + (!/*invalid*/ ctx[11] && /*warn*/ ctx[13] && 'bx--dropdown--warning') + " " + (/*open*/ ctx[1] && 'bx--dropdown--open') + "\n      " + (/*size*/ ctx[7] === 'sm' && 'bx--dropdown--sm') + "\n      " + (/*size*/ ctx[7] === 'xl' && 'bx--dropdown--xl') + "\n      " + (/*inline*/ ctx[23] && 'bx--dropdown--inline') + "\n      " + (/*disabled*/ ctx[9] && 'bx--dropdown--disabled') + "\n      " + (/*light*/ ctx[8] && 'bx--dropdown--light'),
    				disabled: /*disabled*/ ctx[9],
    				open: /*open*/ ctx[1],
    				invalid: /*invalid*/ ctx[11],
    				invalidText: /*invalidText*/ ctx[12],
    				light: /*light*/ ctx[8],
    				warn: /*warn*/ ctx[13],
    				warnText: /*warnText*/ ctx[14],
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	listbox.$on("click", /*click_handler_3*/ ctx[34]);
    	let if_block1 = !/*inline*/ ctx[23] && !/*invalid*/ ctx[11] && !/*warn*/ ctx[13] && /*helperText*/ ctx[15] && create_if_block$f(ctx);
    	let div_levels = [/*$$restProps*/ ctx[25]];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			create_component(listbox.$$.fragment);
    			t1 = space();
    			if (if_block1) if_block1.c();
    			set_attributes(div, div_data);
    			toggle_class(div, "bx--dropdown__wrapper", true);
    			toggle_class(div, "bx--list-box__wrapper", true);
    			toggle_class(div, "bx--dropdown__wrapper--inline", /*inline*/ ctx[23]);
    			toggle_class(div, "bx--list-box__wrapper--inline", /*inline*/ ctx[23]);
    			toggle_class(div, "bx--dropdown__wrapper--inline--invalid", /*inline*/ ctx[23] && /*invalid*/ ctx[11]);
    			add_location(div, file$i, 158, 0, 3710);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t0);
    			mount_component(listbox, div, null);
    			append_dev(div, t1);
    			if (if_block1) if_block1.m(div, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "click", /*click_handler*/ ctx[28], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*titleText*/ ctx[10]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_5$2(ctx);
    					if_block0.c();
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			const listbox_changes = {};
    			if (dirty[0] & /*type*/ 32) listbox_changes.type = /*type*/ ctx[5];
    			if (dirty[0] & /*size*/ 128) listbox_changes.size = /*size*/ ctx[7];
    			if (dirty[0] & /*name*/ 1048576) listbox_changes.name = /*name*/ ctx[20];
    			if (dirty[0] & /*$$props*/ 67108864) listbox_changes["aria-label"] = /*$$props*/ ctx[26]['aria-label'];
    			if (dirty[0] & /*direction, invalid, warn, open, size, inline, disabled, light*/ 8399810) listbox_changes.class = "bx--dropdown " + (/*direction*/ ctx[6] === 'top' && 'bx--list-box--up') + " " + (/*invalid*/ ctx[11] && 'bx--dropdown--invalid') + " " + (!/*invalid*/ ctx[11] && /*warn*/ ctx[13] && 'bx--dropdown--warning') + " " + (/*open*/ ctx[1] && 'bx--dropdown--open') + "\n      " + (/*size*/ ctx[7] === 'sm' && 'bx--dropdown--sm') + "\n      " + (/*size*/ ctx[7] === 'xl' && 'bx--dropdown--xl') + "\n      " + (/*inline*/ ctx[23] && 'bx--dropdown--inline') + "\n      " + (/*disabled*/ ctx[9] && 'bx--dropdown--disabled') + "\n      " + (/*light*/ ctx[8] && 'bx--dropdown--light');
    			if (dirty[0] & /*disabled*/ 512) listbox_changes.disabled = /*disabled*/ ctx[9];
    			if (dirty[0] & /*open*/ 2) listbox_changes.open = /*open*/ ctx[1];
    			if (dirty[0] & /*invalid*/ 2048) listbox_changes.invalid = /*invalid*/ ctx[11];
    			if (dirty[0] & /*invalidText*/ 4096) listbox_changes.invalidText = /*invalidText*/ ctx[12];
    			if (dirty[0] & /*light*/ 256) listbox_changes.light = /*light*/ ctx[8];
    			if (dirty[0] & /*warn*/ 8192) listbox_changes.warn = /*warn*/ ctx[13];
    			if (dirty[0] & /*warnText*/ 16384) listbox_changes.warnText = /*warnText*/ ctx[14];

    			if (dirty[0] & /*id, items, selectedId, highlightedIndex, ref, itemToString, open, disabled, translateWithId, selectedItem, label, invalid, warn*/ 7154207 | dirty[1] & /*$$scope*/ 16) {
    				listbox_changes.$$scope = { dirty, ctx };
    			}

    			listbox.$set(listbox_changes);

    			if (!/*inline*/ ctx[23] && !/*invalid*/ ctx[11] && !/*warn*/ ctx[13] && /*helperText*/ ctx[15]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$f(ctx);
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [dirty[0] & /*$$restProps*/ 33554432 && /*$$restProps*/ ctx[25]]));
    			toggle_class(div, "bx--dropdown__wrapper", true);
    			toggle_class(div, "bx--list-box__wrapper", true);
    			toggle_class(div, "bx--dropdown__wrapper--inline", /*inline*/ ctx[23]);
    			toggle_class(div, "bx--list-box__wrapper--inline", /*inline*/ ctx[23]);
    			toggle_class(div, "bx--dropdown__wrapper--inline--invalid", /*inline*/ ctx[23] && /*invalid*/ ctx[11]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(listbox.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(listbox.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			destroy_component(listbox);
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let inline;
    	let selectedItem;

    	const omit_props_names = [
    		"items","itemToString","selectedId","type","direction","size","open","light","disabled","titleText","invalid","invalidText","warn","warnText","helperText","label","hideLabel","translateWithId","id","name","ref"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Dropdown', slots, ['default']);
    	let { items = [] } = $$props;
    	let { itemToString = item => item.text || item.id } = $$props;
    	let { selectedId } = $$props;
    	let { type = "default" } = $$props;
    	let { direction = "bottom" } = $$props;
    	let { size = undefined } = $$props;
    	let { open = false } = $$props;
    	let { light = false } = $$props;
    	let { disabled = false } = $$props;
    	let { titleText = "" } = $$props;
    	let { invalid = false } = $$props;
    	let { invalidText = "" } = $$props;
    	let { warn = false } = $$props;
    	let { warnText = "" } = $$props;
    	let { helperText = "" } = $$props;
    	let { label = undefined } = $$props;
    	let { hideLabel = false } = $$props;
    	let { translateWithId = undefined } = $$props;
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	let { name = undefined } = $$props;
    	let { ref = null } = $$props;
    	const dispatch = createEventDispatcher();
    	let highlightedIndex = -1;

    	function change(dir) {
    		let index = highlightedIndex + dir;

    		if (index < 0) {
    			index = items.length - 1;
    		} else if (index >= items.length) {
    			index = 0;
    		}

    		let disabled = items[index].disabled;

    		while (disabled) {
    			index = index + dir;

    			if (index < 0) {
    				index = items.length - 1;
    			} else if (index >= items.length) {
    				index = 0;
    			}

    			disabled = items[index].disabled;
    		}

    		$$invalidate(22, highlightedIndex = index);
    	}

    	$$self.$$.on_mount.push(function () {
    		if (selectedId === undefined && !('selectedId' in $$props || $$self.$$.bound[$$self.$$.props['selectedId']])) {
    			console.warn("<Dropdown> was created without expected prop 'selectedId'");
    		}
    	});

    	const click_handler = ({ target }) => {
    		if (open && ref && !ref.contains(target)) {
    			$$invalidate(1, open = false);
    		}
    	};

    	const click_handler_1 = e => {
    		e.stopPropagation();
    		if (disabled) return;
    		$$invalidate(1, open = !open);
    	};

    	function button_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(2, ref);
    		});
    	}

    	const keydown_handler = e => {
    		const { key } = e;

    		if (['Enter', 'ArrowDown', 'ArrowUp'].includes(key)) {
    			e.preventDefault();
    		}

    		if (key === 'Enter') {
    			$$invalidate(1, open = !open);

    			if (highlightedIndex > -1 && items[highlightedIndex].id !== selectedId) {
    				$$invalidate(0, selectedId = items[highlightedIndex].id);
    				$$invalidate(1, open = false);
    			}
    		} else if (key === 'Tab') {
    			$$invalidate(1, open = false);
    			ref.blur();
    		} else if (key === 'ArrowDown') {
    			change(1);
    		} else if (key === 'ArrowUp') {
    			change(-1);
    		} else if (key === 'Escape') {
    			$$invalidate(1, open = false);
    		}
    	};

    	const click_handler_2 = (item, e) => {
    		if (item.disabled) {
    			e.stopPropagation();
    			return;
    		}

    		$$invalidate(0, selectedId = item.id);
    		ref.focus();
    	};

    	const mouseenter_handler = (item, i) => {
    		if (item.disabled) return;
    		$$invalidate(22, highlightedIndex = i);
    	};

    	const click_handler_3 = ({ target }) => {
    		if (disabled) return;
    		$$invalidate(1, open = ref.contains(target) ? !open : false);
    	};

    	$$self.$$set = $$new_props => {
    		$$invalidate(26, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(25, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('items' in $$new_props) $$invalidate(3, items = $$new_props.items);
    		if ('itemToString' in $$new_props) $$invalidate(4, itemToString = $$new_props.itemToString);
    		if ('selectedId' in $$new_props) $$invalidate(0, selectedId = $$new_props.selectedId);
    		if ('type' in $$new_props) $$invalidate(5, type = $$new_props.type);
    		if ('direction' in $$new_props) $$invalidate(6, direction = $$new_props.direction);
    		if ('size' in $$new_props) $$invalidate(7, size = $$new_props.size);
    		if ('open' in $$new_props) $$invalidate(1, open = $$new_props.open);
    		if ('light' in $$new_props) $$invalidate(8, light = $$new_props.light);
    		if ('disabled' in $$new_props) $$invalidate(9, disabled = $$new_props.disabled);
    		if ('titleText' in $$new_props) $$invalidate(10, titleText = $$new_props.titleText);
    		if ('invalid' in $$new_props) $$invalidate(11, invalid = $$new_props.invalid);
    		if ('invalidText' in $$new_props) $$invalidate(12, invalidText = $$new_props.invalidText);
    		if ('warn' in $$new_props) $$invalidate(13, warn = $$new_props.warn);
    		if ('warnText' in $$new_props) $$invalidate(14, warnText = $$new_props.warnText);
    		if ('helperText' in $$new_props) $$invalidate(15, helperText = $$new_props.helperText);
    		if ('label' in $$new_props) $$invalidate(16, label = $$new_props.label);
    		if ('hideLabel' in $$new_props) $$invalidate(17, hideLabel = $$new_props.hideLabel);
    		if ('translateWithId' in $$new_props) $$invalidate(18, translateWithId = $$new_props.translateWithId);
    		if ('id' in $$new_props) $$invalidate(19, id = $$new_props.id);
    		if ('name' in $$new_props) $$invalidate(20, name = $$new_props.name);
    		if ('ref' in $$new_props) $$invalidate(2, ref = $$new_props.ref);
    		if ('$$scope' in $$new_props) $$invalidate(35, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		items,
    		itemToString,
    		selectedId,
    		type,
    		direction,
    		size,
    		open,
    		light,
    		disabled,
    		titleText,
    		invalid,
    		invalidText,
    		warn,
    		warnText,
    		helperText,
    		label,
    		hideLabel,
    		translateWithId,
    		id,
    		name,
    		ref,
    		createEventDispatcher,
    		WarningFilled: WarningFilled$1,
    		WarningAltFilled: WarningAltFilled$1,
    		ListBox: ListBox$1,
    		ListBoxMenu: ListBoxMenu$1,
    		ListBoxMenuIcon: ListBoxMenuIcon$1,
    		ListBoxMenuItem: ListBoxMenuItem$1,
    		dispatch,
    		highlightedIndex,
    		change,
    		selectedItem,
    		inline
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(26, $$props = assign(assign({}, $$props), $$new_props));
    		if ('items' in $$props) $$invalidate(3, items = $$new_props.items);
    		if ('itemToString' in $$props) $$invalidate(4, itemToString = $$new_props.itemToString);
    		if ('selectedId' in $$props) $$invalidate(0, selectedId = $$new_props.selectedId);
    		if ('type' in $$props) $$invalidate(5, type = $$new_props.type);
    		if ('direction' in $$props) $$invalidate(6, direction = $$new_props.direction);
    		if ('size' in $$props) $$invalidate(7, size = $$new_props.size);
    		if ('open' in $$props) $$invalidate(1, open = $$new_props.open);
    		if ('light' in $$props) $$invalidate(8, light = $$new_props.light);
    		if ('disabled' in $$props) $$invalidate(9, disabled = $$new_props.disabled);
    		if ('titleText' in $$props) $$invalidate(10, titleText = $$new_props.titleText);
    		if ('invalid' in $$props) $$invalidate(11, invalid = $$new_props.invalid);
    		if ('invalidText' in $$props) $$invalidate(12, invalidText = $$new_props.invalidText);
    		if ('warn' in $$props) $$invalidate(13, warn = $$new_props.warn);
    		if ('warnText' in $$props) $$invalidate(14, warnText = $$new_props.warnText);
    		if ('helperText' in $$props) $$invalidate(15, helperText = $$new_props.helperText);
    		if ('label' in $$props) $$invalidate(16, label = $$new_props.label);
    		if ('hideLabel' in $$props) $$invalidate(17, hideLabel = $$new_props.hideLabel);
    		if ('translateWithId' in $$props) $$invalidate(18, translateWithId = $$new_props.translateWithId);
    		if ('id' in $$props) $$invalidate(19, id = $$new_props.id);
    		if ('name' in $$props) $$invalidate(20, name = $$new_props.name);
    		if ('ref' in $$props) $$invalidate(2, ref = $$new_props.ref);
    		if ('highlightedIndex' in $$props) $$invalidate(22, highlightedIndex = $$new_props.highlightedIndex);
    		if ('selectedItem' in $$props) $$invalidate(21, selectedItem = $$new_props.selectedItem);
    		if ('inline' in $$props) $$invalidate(23, inline = $$new_props.inline);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*items, selectedId*/ 9) {
    			$$invalidate(21, selectedItem = items.find(item => item.id === selectedId));
    		}

    		if ($$self.$$.dirty[0] & /*selectedId, selectedItem*/ 2097153) {
    			if (selectedId !== undefined) {
    				dispatch("select", { selectedId, selectedItem });
    			}
    		}

    		if ($$self.$$.dirty[0] & /*type*/ 32) {
    			$$invalidate(23, inline = type === "inline");
    		}

    		if ($$self.$$.dirty[0] & /*open*/ 2) {
    			if (!open) {
    				$$invalidate(22, highlightedIndex = -1);
    			}
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		selectedId,
    		open,
    		ref,
    		items,
    		itemToString,
    		type,
    		direction,
    		size,
    		light,
    		disabled,
    		titleText,
    		invalid,
    		invalidText,
    		warn,
    		warnText,
    		helperText,
    		label,
    		hideLabel,
    		translateWithId,
    		id,
    		name,
    		selectedItem,
    		highlightedIndex,
    		inline,
    		change,
    		$$restProps,
    		$$props,
    		slots,
    		click_handler,
    		click_handler_1,
    		button_binding,
    		keydown_handler,
    		click_handler_2,
    		mouseenter_handler,
    		click_handler_3,
    		$$scope
    	];
    }

    class Dropdown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(
    			this,
    			options,
    			instance$k,
    			create_fragment$k,
    			safe_not_equal,
    			{
    				items: 3,
    				itemToString: 4,
    				selectedId: 0,
    				type: 5,
    				direction: 6,
    				size: 7,
    				open: 1,
    				light: 8,
    				disabled: 9,
    				titleText: 10,
    				invalid: 11,
    				invalidText: 12,
    				warn: 13,
    				warnText: 14,
    				helperText: 15,
    				label: 16,
    				hideLabel: 17,
    				translateWithId: 18,
    				id: 19,
    				name: 20,
    				ref: 2
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dropdown",
    			options,
    			id: create_fragment$k.name
    		});
    	}

    	get items() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get itemToString() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set itemToString(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectedId() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedId(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get direction() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set direction(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get light() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get titleText() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set titleText(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalidText() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalidText(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warn() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warn(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warnText() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warnText(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get helperText() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set helperText(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideLabel() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hideLabel(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translateWithId() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set translateWithId(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Dropdown$1 = Dropdown;

    /* node_modules/carbon-components-svelte/src/icons/Add.svelte generated by Svelte v3.52.0 */

    const file$h = "node_modules/carbon-components-svelte/src/icons/Add.svelte";

    // (24:2) {#if title}
    function create_if_block$e(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$h, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$e.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$e(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z");
    			add_location(path, file$h, 24, 2, 579);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$h, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$e(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Add', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Add$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$j, create_fragment$j, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Add",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get size() {
    		throw new Error("<Add>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Add>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Add>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Add>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Add$2 = Add$1;

    /* node_modules/carbon-components-svelte/src/icons/Subtract.svelte generated by Svelte v3.52.0 */

    const file$g = "node_modules/carbon-components-svelte/src/icons/Subtract.svelte";

    // (24:2) {#if title}
    function create_if_block$d(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$g, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$d.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$d(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M8 15H24V17H8z");
    			add_location(path, file$g, 24, 2, 579);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$g, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$d(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Subtract', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Subtract extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$i, create_fragment$i, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Subtract",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get size() {
    		throw new Error("<Subtract>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Subtract>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Subtract>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Subtract>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Subtract$1 = Subtract;

    /* node_modules/carbon-components-svelte/src/icons/EditOff.svelte generated by Svelte v3.52.0 */

    const file$f = "node_modules/carbon-components-svelte/src/icons/EditOff.svelte";

    // (24:2) {#if title}
    function create_if_block$c(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$f, 23, 13, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$c.name,
    		type: "if",
    		source: "(24:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$c(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M30 28.6L3.4 2 2 3.4l10.1 10.1L4 21.6V28h6.4l8.1-8.1L28.6 30 30 28.6zM9.6 26H6v-3.6l7.5-7.5 3.6 3.6L9.6 26zM29.4 6.2L29.4 6.2l-3.6-3.6c-.8-.8-2-.8-2.8 0l0 0 0 0-8 8 1.4 1.4L20 8.4l3.6 3.6L20 15.6l1.4 1.4 8-8C30.2 8.2 30.2 7 29.4 6.2L29.4 6.2zM25 10.6L21.4 7l3-3L28 7.6 25 10.6z");
    			add_location(path, file$f, 24, 2, 579);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$f, 13, 0, 338);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$c(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('EditOff', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class EditOff extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$h, create_fragment$h, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EditOff",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get size() {
    		throw new Error("<EditOff>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<EditOff>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<EditOff>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<EditOff>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var EditOff$1 = EditOff;

    /* node_modules/carbon-components-svelte/src/NumberInput/NumberInput.svelte generated by Svelte v3.52.0 */
    const file$e = "node_modules/carbon-components-svelte/src/NumberInput/NumberInput.svelte";
    const get_label_slot_changes = dirty => ({});
    const get_label_slot_context = ctx => ({});

    // (178:4) {#if $$slots.label || label}
    function create_if_block_7$1(ctx) {
    	let label_1;
    	let current;
    	const label_slot_template = /*#slots*/ ctx[34].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[33], get_label_slot_context);
    	const label_slot_or_fallback = label_slot || fallback_block$2(ctx);

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			if (label_slot_or_fallback) label_slot_or_fallback.c();
    			attr_dev(label_1, "for", /*id*/ ctx[18]);
    			toggle_class(label_1, "bx--label", true);
    			toggle_class(label_1, "bx--label--disabled", /*disabled*/ ctx[8]);
    			toggle_class(label_1, "bx--visually-hidden", /*hideLabel*/ ctx[17]);
    			add_location(label_1, file$e, 178, 6, 4409);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);

    			if (label_slot_or_fallback) {
    				label_slot_or_fallback.m(label_1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (label_slot) {
    				if (label_slot.p && (!current || dirty[1] & /*$$scope*/ 4)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[33],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[33])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[33], dirty, get_label_slot_changes),
    						get_label_slot_context
    					);
    				}
    			} else {
    				if (label_slot_or_fallback && label_slot_or_fallback.p && (!current || dirty[0] & /*label*/ 65536)) {
    					label_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*id*/ 262144) {
    				attr_dev(label_1, "for", /*id*/ ctx[18]);
    			}

    			if (!current || dirty[0] & /*disabled*/ 256) {
    				toggle_class(label_1, "bx--label--disabled", /*disabled*/ ctx[8]);
    			}

    			if (!current || dirty[0] & /*hideLabel*/ 131072) {
    				toggle_class(label_1, "bx--visually-hidden", /*hideLabel*/ ctx[17]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			if (label_slot_or_fallback) label_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7$1.name,
    		type: "if",
    		source: "(178:4) {#if $$slots.label || label}",
    		ctx
    	});

    	return block;
    }

    // (185:27) {label}
    function fallback_block$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*label*/ ctx[16]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*label*/ 65536) set_data_dev(t, /*label*/ ctx[16]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$2.name,
    		type: "fallback",
    		source: "(185:27) {label}",
    		ctx
    	});

    	return block;
    }

    // (217:6) {#if invalid}
    function create_if_block_6$1(ctx) {
    	let warningfilled;
    	let current;

    	warningfilled = new WarningFilled$1({
    			props: { class: "bx--number__invalid" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(warningfilled.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(warningfilled, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(warningfilled.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(warningfilled.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(warningfilled, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6$1.name,
    		type: "if",
    		source: "(217:6) {#if invalid}",
    		ctx
    	});

    	return block;
    }

    // (220:6) {#if !invalid && warn}
    function create_if_block_5$1(ctx) {
    	let warningaltfilled;
    	let current;

    	warningaltfilled = new WarningAltFilled$1({
    			props: {
    				class: "bx--number__invalid bx--number__invalid--warning"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(warningaltfilled.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(warningaltfilled, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(warningaltfilled.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(warningaltfilled.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(warningaltfilled, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$1.name,
    		type: "if",
    		source: "(220:6) {#if !invalid && warn}",
    		ctx
    	});

    	return block;
    }

    // (225:6) {#if readonly}
    function create_if_block_4$1(ctx) {
    	let editoff;
    	let current;

    	editoff = new EditOff$1({
    			props: { class: "bx--text-input__readonly-icon" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(editoff.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(editoff, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(editoff.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(editoff.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(editoff, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(225:6) {#if readonly}",
    		ctx
    	});

    	return block;
    }

    // (228:6) {#if !hideSteppers}
    function create_if_block_3$2(ctx) {
    	let div2;
    	let button0;
    	let subtract;
    	let button0_title_value;
    	let button0_aria_label_value;
    	let t0;
    	let div0;
    	let t1;
    	let button1;
    	let add;
    	let button1_title_value;
    	let button1_aria_label_value;
    	let t2;
    	let div1;
    	let current;
    	let mounted;
    	let dispose;

    	subtract = new Subtract$1({
    			props: { class: "down-icon" },
    			$$inline: true
    		});

    	add = new Add$2({
    			props: { class: "up-icon" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			button0 = element("button");
    			create_component(subtract.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			t1 = space();
    			button1 = element("button");
    			create_component(add.$$.fragment);
    			t2 = space();
    			div1 = element("div");
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "tabindex", "-1");
    			attr_dev(button0, "title", button0_title_value = /*decrementLabel*/ ctx[23] || /*iconDescription*/ ctx[10]);
    			attr_dev(button0, "aria-label", button0_aria_label_value = /*decrementLabel*/ ctx[23] || /*iconDescription*/ ctx[10]);
    			button0.disabled = /*disabled*/ ctx[8];
    			toggle_class(button0, "bx--number__control-btn", true);
    			toggle_class(button0, "down-icon", true);
    			add_location(button0, file$e, 229, 10, 5816);
    			toggle_class(div0, "bx--number__rule-divider", true);
    			add_location(div0, file$e, 243, 10, 6278);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "tabindex", "-1");
    			attr_dev(button1, "title", button1_title_value = /*incrementLabel*/ ctx[24] || /*iconDescription*/ ctx[10]);
    			attr_dev(button1, "aria-label", button1_aria_label_value = /*incrementLabel*/ ctx[24] || /*iconDescription*/ ctx[10]);
    			button1.disabled = /*disabled*/ ctx[8];
    			toggle_class(button1, "bx--number__control-btn", true);
    			toggle_class(button1, "up-icon", true);
    			add_location(button1, file$e, 244, 10, 6340);
    			toggle_class(div1, "bx--number__rule-divider", true);
    			add_location(div1, file$e, 258, 10, 6792);
    			toggle_class(div2, "bx--number__controls", true);
    			add_location(div2, file$e, 228, 8, 5764);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, button0);
    			mount_component(subtract, button0, null);
    			append_dev(div2, t0);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, button1);
    			mount_component(add, button1, null);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler_1*/ ctx[45], false, false, false),
    					listen_dev(button1, "click", /*click_handler_2*/ ctx[46], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty[0] & /*decrementLabel, iconDescription*/ 8389632 && button0_title_value !== (button0_title_value = /*decrementLabel*/ ctx[23] || /*iconDescription*/ ctx[10])) {
    				attr_dev(button0, "title", button0_title_value);
    			}

    			if (!current || dirty[0] & /*decrementLabel, iconDescription*/ 8389632 && button0_aria_label_value !== (button0_aria_label_value = /*decrementLabel*/ ctx[23] || /*iconDescription*/ ctx[10])) {
    				attr_dev(button0, "aria-label", button0_aria_label_value);
    			}

    			if (!current || dirty[0] & /*disabled*/ 256) {
    				prop_dev(button0, "disabled", /*disabled*/ ctx[8]);
    			}

    			if (!current || dirty[0] & /*incrementLabel, iconDescription*/ 16778240 && button1_title_value !== (button1_title_value = /*incrementLabel*/ ctx[24] || /*iconDescription*/ ctx[10])) {
    				attr_dev(button1, "title", button1_title_value);
    			}

    			if (!current || dirty[0] & /*incrementLabel, iconDescription*/ 16778240 && button1_aria_label_value !== (button1_aria_label_value = /*incrementLabel*/ ctx[24] || /*iconDescription*/ ctx[10])) {
    				attr_dev(button1, "aria-label", button1_aria_label_value);
    			}

    			if (!current || dirty[0] & /*disabled*/ 256) {
    				prop_dev(button1, "disabled", /*disabled*/ ctx[8]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(subtract.$$.fragment, local);
    			transition_in(add.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(subtract.$$.fragment, local);
    			transition_out(add.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(subtract);
    			destroy_component(add);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$2.name,
    		type: "if",
    		source: "(228:6) {#if !hideSteppers}",
    		ctx
    	});

    	return block;
    }

    // (263:4) {#if !error && !warn && helperText}
    function create_if_block_2$3(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*helperText*/ ctx[15]);
    			toggle_class(div, "bx--form__helper-text", true);
    			toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[8]);
    			add_location(div, file$e, 263, 6, 6928);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*helperText*/ 32768) set_data_dev(t, /*helperText*/ ctx[15]);

    			if (dirty[0] & /*disabled*/ 256) {
    				toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[8]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(263:4) {#if !error && !warn && helperText}",
    		ctx
    	});

    	return block;
    }

    // (271:4) {#if error}
    function create_if_block_1$4(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*invalidText*/ ctx[12]);
    			attr_dev(div, "id", /*errorId*/ ctx[21]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$e, 271, 6, 7111);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*invalidText*/ 4096) set_data_dev(t, /*invalidText*/ ctx[12]);

    			if (dirty[0] & /*errorId*/ 2097152) {
    				attr_dev(div, "id", /*errorId*/ ctx[21]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(271:4) {#if error}",
    		ctx
    	});

    	return block;
    }

    // (276:4) {#if !error && warn}
    function create_if_block$b(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*warnText*/ ctx[14]);
    			attr_dev(div, "id", /*errorId*/ ctx[21]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$e, 276, 6, 7244);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*warnText*/ 16384) set_data_dev(t, /*warnText*/ ctx[14]);

    			if (dirty[0] & /*errorId*/ 2097152) {
    				attr_dev(div, "id", /*errorId*/ ctx[21]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(276:4) {#if !error && warn}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let div2;
    	let div1;
    	let t0;
    	let div0;
    	let input;
    	let input_data_invalid_value;
    	let input_aria_invalid_value;
    	let input_aria_label_value;
    	let input_value_value;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let t6;
    	let t7;
    	let div1_data_invalid_value;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = (/*$$slots*/ ctx[28].label || /*label*/ ctx[16]) && create_if_block_7$1(ctx);

    	let input_levels = [
    		{ type: "number" },
    		{ pattern: "[0-9]*" },
    		{ "aria-describedby": /*errorId*/ ctx[21] },
    		{
    			"data-invalid": input_data_invalid_value = /*invalid*/ ctx[11] || undefined
    		},
    		{
    			"aria-invalid": input_aria_invalid_value = /*invalid*/ ctx[11] || undefined
    		},
    		{
    			"aria-label": input_aria_label_value = /*label*/ ctx[16] ? undefined : /*ariaLabel*/ ctx[20]
    		},
    		{ disabled: /*disabled*/ ctx[8] },
    		{ id: /*id*/ ctx[18] },
    		{ name: /*name*/ ctx[19] },
    		{ max: /*max*/ ctx[4] },
    		{ min: /*min*/ ctx[5] },
    		{ step: /*step*/ ctx[3] },
    		{
    			value: input_value_value = /*value*/ ctx[0] ?? ''
    		},
    		{ readOnly: /*readonly*/ ctx[7] },
    		/*$$restProps*/ ctx[29]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	let if_block1 = /*invalid*/ ctx[11] && create_if_block_6$1(ctx);
    	let if_block2 = !/*invalid*/ ctx[11] && /*warn*/ ctx[13] && create_if_block_5$1(ctx);
    	let if_block3 = /*readonly*/ ctx[7] && create_if_block_4$1(ctx);
    	let if_block4 = !/*hideSteppers*/ ctx[9] && create_if_block_3$2(ctx);
    	let if_block5 = !/*error*/ ctx[22] && !/*warn*/ ctx[13] && /*helperText*/ ctx[15] && create_if_block_2$3(ctx);
    	let if_block6 = /*error*/ ctx[22] && create_if_block_1$4(ctx);
    	let if_block7 = !/*error*/ ctx[22] && /*warn*/ ctx[13] && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div0 = element("div");
    			input = element("input");
    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			t3 = space();
    			if (if_block3) if_block3.c();
    			t4 = space();
    			if (if_block4) if_block4.c();
    			t5 = space();
    			if (if_block5) if_block5.c();
    			t6 = space();
    			if (if_block6) if_block6.c();
    			t7 = space();
    			if (if_block7) if_block7.c();
    			set_attributes(input, input_data);
    			add_location(input, file$e, 191, 6, 4774);
    			toggle_class(div0, "bx--number__input-wrapper", true);
    			toggle_class(div0, "bx--number__input-wrapper--warning", !/*invalid*/ ctx[11] && /*warn*/ ctx[13]);
    			add_location(div0, file$e, 187, 4, 4642);
    			attr_dev(div1, "data-invalid", div1_data_invalid_value = /*error*/ ctx[22] || undefined);
    			toggle_class(div1, "bx--number", true);
    			toggle_class(div1, "bx--number--helpertext", true);
    			toggle_class(div1, "bx--number--readonly", /*readonly*/ ctx[7]);
    			toggle_class(div1, "bx--number--light", /*light*/ ctx[6]);
    			toggle_class(div1, "bx--number--nolabel", /*hideLabel*/ ctx[17]);
    			toggle_class(div1, "bx--number--nosteppers", /*hideSteppers*/ ctx[9]);
    			toggle_class(div1, "bx--number--sm", /*size*/ ctx[2] === 'sm');
    			toggle_class(div1, "bx--number--xl", /*size*/ ctx[2] === 'xl');
    			add_location(div1, file$e, 166, 2, 3987);
    			toggle_class(div2, "bx--form-item", true);
    			add_location(div2, file$e, 159, 0, 3889);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, input);
    			if (input.autofocus) input.focus();
    			/*input_binding*/ ctx[44](input);
    			append_dev(div0, t1);
    			if (if_block1) if_block1.m(div0, null);
    			append_dev(div0, t2);
    			if (if_block2) if_block2.m(div0, null);
    			append_dev(div0, t3);
    			if (if_block3) if_block3.m(div0, null);
    			append_dev(div0, t4);
    			if (if_block4) if_block4.m(div0, null);
    			append_dev(div1, t5);
    			if (if_block5) if_block5.m(div1, null);
    			append_dev(div1, t6);
    			if (if_block6) if_block6.m(div1, null);
    			append_dev(div1, t7);
    			if (if_block7) if_block7.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*onChange*/ ctx[27], false, false, false),
    					listen_dev(input, "input", /*onInput*/ ctx[26], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler*/ ctx[39], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler*/ ctx[40], false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[41], false, false, false),
    					listen_dev(input, "blur", /*blur_handler*/ ctx[42], false, false, false),
    					listen_dev(input, "paste", /*paste_handler*/ ctx[43], false, false, false),
    					listen_dev(div2, "click", /*click_handler*/ ctx[35], false, false, false),
    					listen_dev(div2, "mouseover", /*mouseover_handler*/ ctx[36], false, false, false),
    					listen_dev(div2, "mouseenter", /*mouseenter_handler*/ ctx[37], false, false, false),
    					listen_dev(div2, "mouseleave", /*mouseleave_handler*/ ctx[38], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*$$slots*/ ctx[28].label || /*label*/ ctx[16]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*$$slots, label*/ 268500992) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_7$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div1, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				{ type: "number" },
    				{ pattern: "[0-9]*" },
    				(!current || dirty[0] & /*errorId*/ 2097152) && { "aria-describedby": /*errorId*/ ctx[21] },
    				(!current || dirty[0] & /*invalid*/ 2048 && input_data_invalid_value !== (input_data_invalid_value = /*invalid*/ ctx[11] || undefined)) && { "data-invalid": input_data_invalid_value },
    				(!current || dirty[0] & /*invalid*/ 2048 && input_aria_invalid_value !== (input_aria_invalid_value = /*invalid*/ ctx[11] || undefined)) && { "aria-invalid": input_aria_invalid_value },
    				(!current || dirty[0] & /*label, ariaLabel*/ 1114112 && input_aria_label_value !== (input_aria_label_value = /*label*/ ctx[16] ? undefined : /*ariaLabel*/ ctx[20])) && { "aria-label": input_aria_label_value },
    				(!current || dirty[0] & /*disabled*/ 256) && { disabled: /*disabled*/ ctx[8] },
    				(!current || dirty[0] & /*id*/ 262144) && { id: /*id*/ ctx[18] },
    				(!current || dirty[0] & /*name*/ 524288) && { name: /*name*/ ctx[19] },
    				(!current || dirty[0] & /*max*/ 16) && { max: /*max*/ ctx[4] },
    				(!current || dirty[0] & /*min*/ 32) && { min: /*min*/ ctx[5] },
    				(!current || dirty[0] & /*step*/ 8) && { step: /*step*/ ctx[3] },
    				(!current || dirty[0] & /*value*/ 1 && input_value_value !== (input_value_value = /*value*/ ctx[0] ?? '') && input.value !== input_value_value) && { value: input_value_value },
    				(!current || dirty[0] & /*readonly*/ 128) && { readOnly: /*readonly*/ ctx[7] },
    				dirty[0] & /*$$restProps*/ 536870912 && /*$$restProps*/ ctx[29]
    			]));

    			if (/*invalid*/ ctx[11]) {
    				if (if_block1) {
    					if (dirty[0] & /*invalid*/ 2048) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_6$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div0, t2);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!/*invalid*/ ctx[11] && /*warn*/ ctx[13]) {
    				if (if_block2) {
    					if (dirty[0] & /*invalid, warn*/ 10240) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_5$1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div0, t3);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (/*readonly*/ ctx[7]) {
    				if (if_block3) {
    					if (dirty[0] & /*readonly*/ 128) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block_4$1(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(div0, t4);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}

    			if (!/*hideSteppers*/ ctx[9]) {
    				if (if_block4) {
    					if_block4.p(ctx, dirty);

    					if (dirty[0] & /*hideSteppers*/ 512) {
    						transition_in(if_block4, 1);
    					}
    				} else {
    					if_block4 = create_if_block_3$2(ctx);
    					if_block4.c();
    					transition_in(if_block4, 1);
    					if_block4.m(div0, null);
    				}
    			} else if (if_block4) {
    				group_outros();

    				transition_out(if_block4, 1, 1, () => {
    					if_block4 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*invalid, warn*/ 10240) {
    				toggle_class(div0, "bx--number__input-wrapper--warning", !/*invalid*/ ctx[11] && /*warn*/ ctx[13]);
    			}

    			if (!/*error*/ ctx[22] && !/*warn*/ ctx[13] && /*helperText*/ ctx[15]) {
    				if (if_block5) {
    					if_block5.p(ctx, dirty);
    				} else {
    					if_block5 = create_if_block_2$3(ctx);
    					if_block5.c();
    					if_block5.m(div1, t6);
    				}
    			} else if (if_block5) {
    				if_block5.d(1);
    				if_block5 = null;
    			}

    			if (/*error*/ ctx[22]) {
    				if (if_block6) {
    					if_block6.p(ctx, dirty);
    				} else {
    					if_block6 = create_if_block_1$4(ctx);
    					if_block6.c();
    					if_block6.m(div1, t7);
    				}
    			} else if (if_block6) {
    				if_block6.d(1);
    				if_block6 = null;
    			}

    			if (!/*error*/ ctx[22] && /*warn*/ ctx[13]) {
    				if (if_block7) {
    					if_block7.p(ctx, dirty);
    				} else {
    					if_block7 = create_if_block$b(ctx);
    					if_block7.c();
    					if_block7.m(div1, null);
    				}
    			} else if (if_block7) {
    				if_block7.d(1);
    				if_block7 = null;
    			}

    			if (!current || dirty[0] & /*error*/ 4194304 && div1_data_invalid_value !== (div1_data_invalid_value = /*error*/ ctx[22] || undefined)) {
    				attr_dev(div1, "data-invalid", div1_data_invalid_value);
    			}

    			if (!current || dirty[0] & /*readonly*/ 128) {
    				toggle_class(div1, "bx--number--readonly", /*readonly*/ ctx[7]);
    			}

    			if (!current || dirty[0] & /*light*/ 64) {
    				toggle_class(div1, "bx--number--light", /*light*/ ctx[6]);
    			}

    			if (!current || dirty[0] & /*hideLabel*/ 131072) {
    				toggle_class(div1, "bx--number--nolabel", /*hideLabel*/ ctx[17]);
    			}

    			if (!current || dirty[0] & /*hideSteppers*/ 512) {
    				toggle_class(div1, "bx--number--nosteppers", /*hideSteppers*/ ctx[9]);
    			}

    			if (!current || dirty[0] & /*size*/ 4) {
    				toggle_class(div1, "bx--number--sm", /*size*/ ctx[2] === 'sm');
    			}

    			if (!current || dirty[0] & /*size*/ 4) {
    				toggle_class(div1, "bx--number--xl", /*size*/ ctx[2] === 'xl');
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			transition_in(if_block4);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			transition_out(if_block4);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block0) if_block0.d();
    			/*input_binding*/ ctx[44](null);
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			if (if_block4) if_block4.d();
    			if (if_block5) if_block5.d();
    			if (if_block6) if_block6.d();
    			if (if_block7) if_block7.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function parse(raw) {
    	return raw != "" ? Number(raw) : null;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let incrementLabel;
    	let decrementLabel;
    	let error;
    	let errorId;
    	let ariaLabel;

    	const omit_props_names = [
    		"size","value","step","max","min","light","readonly","allowEmpty","disabled","hideSteppers","iconDescription","invalid","invalidText","warn","warnText","helperText","label","hideLabel","translateWithId","translationIds","id","name","ref"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NumberInput', slots, ['label']);
    	const $$slots = compute_slots(slots);
    	let { size = undefined } = $$props;
    	let { value = null } = $$props;
    	let { step = 1 } = $$props;
    	let { max = undefined } = $$props;
    	let { min = undefined } = $$props;
    	let { light = false } = $$props;
    	let { readonly = false } = $$props;
    	let { allowEmpty = false } = $$props;
    	let { disabled = false } = $$props;
    	let { hideSteppers = false } = $$props;
    	let { iconDescription = "" } = $$props;
    	let { invalid = false } = $$props;
    	let { invalidText = "" } = $$props;
    	let { warn = false } = $$props;
    	let { warnText = "" } = $$props;
    	let { helperText = "" } = $$props;
    	let { label = "" } = $$props;
    	let { hideLabel = false } = $$props;
    	let { translateWithId = id => defaultTranslations[id] } = $$props;

    	const translationIds = {
    		increment: "increment",
    		decrement: "decrement"
    	};

    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	let { name = undefined } = $$props;
    	let { ref = null } = $$props;

    	const defaultTranslations = {
    		[translationIds.increment]: "Increment number",
    		[translationIds.decrement]: "Decrement number"
    	};

    	const dispatch = createEventDispatcher();

    	function updateValue(direction) {
    		const nextValue = $$invalidate(0, value += direction * step);

    		if (nextValue < min) {
    			$$invalidate(0, value = min);
    		} else if (nextValue > max) {
    			$$invalidate(0, value = max);
    		} else {
    			$$invalidate(0, value = nextValue);
    		}

    		dispatch("input", value);
    		dispatch("change", value);
    	}

    	function onInput({ target }) {
    		$$invalidate(0, value = parse(target.value));
    		dispatch("input", value);
    	}

    	function onChange({ target }) {
    		dispatch("change", parse(target.value));
    	}

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function paste_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(1, ref);
    		});
    	}

    	const click_handler_1 = () => {
    		updateValue(-1);
    	};

    	const click_handler_2 = () => {
    		updateValue(1);
    	};

    	$$self.$$set = $$new_props => {
    		$$invalidate(49, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(29, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(2, size = $$new_props.size);
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('step' in $$new_props) $$invalidate(3, step = $$new_props.step);
    		if ('max' in $$new_props) $$invalidate(4, max = $$new_props.max);
    		if ('min' in $$new_props) $$invalidate(5, min = $$new_props.min);
    		if ('light' in $$new_props) $$invalidate(6, light = $$new_props.light);
    		if ('readonly' in $$new_props) $$invalidate(7, readonly = $$new_props.readonly);
    		if ('allowEmpty' in $$new_props) $$invalidate(30, allowEmpty = $$new_props.allowEmpty);
    		if ('disabled' in $$new_props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ('hideSteppers' in $$new_props) $$invalidate(9, hideSteppers = $$new_props.hideSteppers);
    		if ('iconDescription' in $$new_props) $$invalidate(10, iconDescription = $$new_props.iconDescription);
    		if ('invalid' in $$new_props) $$invalidate(11, invalid = $$new_props.invalid);
    		if ('invalidText' in $$new_props) $$invalidate(12, invalidText = $$new_props.invalidText);
    		if ('warn' in $$new_props) $$invalidate(13, warn = $$new_props.warn);
    		if ('warnText' in $$new_props) $$invalidate(14, warnText = $$new_props.warnText);
    		if ('helperText' in $$new_props) $$invalidate(15, helperText = $$new_props.helperText);
    		if ('label' in $$new_props) $$invalidate(16, label = $$new_props.label);
    		if ('hideLabel' in $$new_props) $$invalidate(17, hideLabel = $$new_props.hideLabel);
    		if ('translateWithId' in $$new_props) $$invalidate(31, translateWithId = $$new_props.translateWithId);
    		if ('id' in $$new_props) $$invalidate(18, id = $$new_props.id);
    		if ('name' in $$new_props) $$invalidate(19, name = $$new_props.name);
    		if ('ref' in $$new_props) $$invalidate(1, ref = $$new_props.ref);
    		if ('$$scope' in $$new_props) $$invalidate(33, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		size,
    		value,
    		step,
    		max,
    		min,
    		light,
    		readonly,
    		allowEmpty,
    		disabled,
    		hideSteppers,
    		iconDescription,
    		invalid,
    		invalidText,
    		warn,
    		warnText,
    		helperText,
    		label,
    		hideLabel,
    		translateWithId,
    		translationIds,
    		id,
    		name,
    		ref,
    		createEventDispatcher,
    		Add: Add$2,
    		Subtract: Subtract$1,
    		WarningFilled: WarningFilled$1,
    		WarningAltFilled: WarningAltFilled$1,
    		EditOff: EditOff$1,
    		defaultTranslations,
    		dispatch,
    		updateValue,
    		parse,
    		onInput,
    		onChange,
    		ariaLabel,
    		errorId,
    		error,
    		decrementLabel,
    		incrementLabel
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(49, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(2, size = $$new_props.size);
    		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
    		if ('step' in $$props) $$invalidate(3, step = $$new_props.step);
    		if ('max' in $$props) $$invalidate(4, max = $$new_props.max);
    		if ('min' in $$props) $$invalidate(5, min = $$new_props.min);
    		if ('light' in $$props) $$invalidate(6, light = $$new_props.light);
    		if ('readonly' in $$props) $$invalidate(7, readonly = $$new_props.readonly);
    		if ('allowEmpty' in $$props) $$invalidate(30, allowEmpty = $$new_props.allowEmpty);
    		if ('disabled' in $$props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ('hideSteppers' in $$props) $$invalidate(9, hideSteppers = $$new_props.hideSteppers);
    		if ('iconDescription' in $$props) $$invalidate(10, iconDescription = $$new_props.iconDescription);
    		if ('invalid' in $$props) $$invalidate(11, invalid = $$new_props.invalid);
    		if ('invalidText' in $$props) $$invalidate(12, invalidText = $$new_props.invalidText);
    		if ('warn' in $$props) $$invalidate(13, warn = $$new_props.warn);
    		if ('warnText' in $$props) $$invalidate(14, warnText = $$new_props.warnText);
    		if ('helperText' in $$props) $$invalidate(15, helperText = $$new_props.helperText);
    		if ('label' in $$props) $$invalidate(16, label = $$new_props.label);
    		if ('hideLabel' in $$props) $$invalidate(17, hideLabel = $$new_props.hideLabel);
    		if ('translateWithId' in $$props) $$invalidate(31, translateWithId = $$new_props.translateWithId);
    		if ('id' in $$props) $$invalidate(18, id = $$new_props.id);
    		if ('name' in $$props) $$invalidate(19, name = $$new_props.name);
    		if ('ref' in $$props) $$invalidate(1, ref = $$new_props.ref);
    		if ('ariaLabel' in $$props) $$invalidate(20, ariaLabel = $$new_props.ariaLabel);
    		if ('errorId' in $$props) $$invalidate(21, errorId = $$new_props.errorId);
    		if ('error' in $$props) $$invalidate(22, error = $$new_props.error);
    		if ('decrementLabel' in $$props) $$invalidate(23, decrementLabel = $$new_props.decrementLabel);
    		if ('incrementLabel' in $$props) $$invalidate(24, incrementLabel = $$new_props.incrementLabel);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[1] & /*translateWithId*/ 1) {
    			$$invalidate(24, incrementLabel = translateWithId("increment"));
    		}

    		if ($$self.$$.dirty[1] & /*translateWithId*/ 1) {
    			$$invalidate(23, decrementLabel = translateWithId("decrement"));
    		}

    		if ($$self.$$.dirty[0] & /*invalid, allowEmpty, value, max, min*/ 1073743921) {
    			$$invalidate(22, error = invalid || !allowEmpty && value == null || value > max || typeof value === "number" && value < min);
    		}

    		if ($$self.$$.dirty[0] & /*id*/ 262144) {
    			$$invalidate(21, errorId = `error-${id}`);
    		}

    		$$invalidate(20, ariaLabel = $$props["aria-label"] || "Numeric input field with increment and decrement buttons");
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		value,
    		ref,
    		size,
    		step,
    		max,
    		min,
    		light,
    		readonly,
    		disabled,
    		hideSteppers,
    		iconDescription,
    		invalid,
    		invalidText,
    		warn,
    		warnText,
    		helperText,
    		label,
    		hideLabel,
    		id,
    		name,
    		ariaLabel,
    		errorId,
    		error,
    		decrementLabel,
    		incrementLabel,
    		updateValue,
    		onInput,
    		onChange,
    		$$slots,
    		$$restProps,
    		allowEmpty,
    		translateWithId,
    		translationIds,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler,
    		keyup_handler,
    		focus_handler,
    		blur_handler,
    		paste_handler,
    		input_binding,
    		click_handler_1,
    		click_handler_2
    	];
    }

    class NumberInput extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(
    			this,
    			options,
    			instance$g,
    			create_fragment$g,
    			safe_not_equal,
    			{
    				size: 2,
    				value: 0,
    				step: 3,
    				max: 4,
    				min: 5,
    				light: 6,
    				readonly: 7,
    				allowEmpty: 30,
    				disabled: 8,
    				hideSteppers: 9,
    				iconDescription: 10,
    				invalid: 11,
    				invalidText: 12,
    				warn: 13,
    				warnText: 14,
    				helperText: 15,
    				label: 16,
    				hideLabel: 17,
    				translateWithId: 31,
    				translationIds: 32,
    				id: 18,
    				name: 19,
    				ref: 1
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NumberInput",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get size() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get step() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get max() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set max(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get min() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set min(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get light() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get allowEmpty() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set allowEmpty(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideSteppers() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hideSteppers(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconDescription() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconDescription(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalidText() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalidText(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warn() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warn(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warnText() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warnText(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get helperText() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set helperText(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideLabel() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hideLabel(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translateWithId() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set translateWithId(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translationIds() {
    		return this.$$.ctx[32];
    	}

    	set translationIds(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<NumberInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<NumberInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var NumberInput$1 = NumberInput;

    /* node_modules/carbon-components-svelte/src/Tabs/Tabs.svelte generated by Svelte v3.52.0 */
    const file$d = "node_modules/carbon-components-svelte/src/Tabs/Tabs.svelte";
    const get_content_slot_changes = dirty => ({});
    const get_content_slot_context = ctx => ({});

    // (150:6) {#if currentTab}
    function create_if_block$a(ctx) {
    	let t_value = /*currentTab*/ ctx[3].label + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentTab*/ 8 && t_value !== (t_value = /*currentTab*/ ctx[3].label + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(150:6) {#if currentTab}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let div1;
    	let div0;
    	let a;
    	let t0;
    	let chevrondown;
    	let div0_aria_label_value;
    	let t1;
    	let ul;
    	let t2;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*currentTab*/ ctx[3] && create_if_block$a(ctx);

    	chevrondown = new ChevronDown$1({
    			props: {
    				"aria-hidden": "true",
    				title: /*iconDescription*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], null);
    	let div1_levels = [{ role: "navigation" }, /*$$restProps*/ ctx[10]];
    	let div1_data = {};

    	for (let i = 0; i < div1_levels.length; i += 1) {
    		div1_data = assign(div1_data, div1_levels[i]);
    	}

    	const content_slot_template = /*#slots*/ ctx[20].content;
    	const content_slot = create_slot(content_slot_template, ctx, /*$$scope*/ ctx[19], get_content_slot_context);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			a = element("a");
    			if (if_block) if_block.c();
    			t0 = space();
    			create_component(chevrondown.$$.fragment);
    			t1 = space();
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			t2 = space();
    			if (content_slot) content_slot.c();
    			attr_dev(a, "tabindex", "-1");
    			attr_dev(a, "href", /*triggerHref*/ ctx[2]);
    			toggle_class(a, "bx--tabs-trigger-text", true);
    			add_location(a, file$d, 140, 4, 3297);
    			attr_dev(div0, "role", "listbox");
    			attr_dev(div0, "tabindex", "0");
    			attr_dev(div0, "aria-label", div0_aria_label_value = /*$$props*/ ctx[11]['aria-label'] || 'listbox');
    			toggle_class(div0, "bx--tabs-trigger", true);
    			add_location(div0, file$d, 127, 2, 2997);
    			attr_dev(ul, "role", "tablist");
    			toggle_class(ul, "bx--tabs__nav", true);
    			toggle_class(ul, "bx--tabs__nav--hidden", /*dropdownHidden*/ ctx[5]);
    			add_location(ul, file$d, 153, 2, 3665);
    			set_attributes(div1, div1_data);
    			toggle_class(div1, "bx--tabs", true);
    			toggle_class(div1, "bx--tabs--container", /*type*/ ctx[0] === 'container');
    			add_location(div1, file$d, 121, 0, 2870);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, a);
    			if (if_block) if_block.m(a, null);
    			append_dev(div0, t0);
    			mount_component(chevrondown, div0, null);
    			append_dev(div1, t1);
    			append_dev(div1, ul);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			/*ul_binding*/ ctx[26](ul);
    			insert_dev(target, t2, anchor);

    			if (content_slot) {
    				content_slot.m(target, anchor);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(a, "click", prevent_default(/*click_handler*/ ctx[22]), false, true, false),
    					listen_dev(a, "click", stop_propagation(prevent_default(/*click_handler_1*/ ctx[23])), false, true, true),
    					listen_dev(div0, "click", /*click_handler_2*/ ctx[24], false, false, false),
    					listen_dev(div0, "keypress", /*keypress_handler*/ ctx[21], false, false, false),
    					listen_dev(div0, "keypress", /*keypress_handler_1*/ ctx[25], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*currentTab*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$a(ctx);
    					if_block.c();
    					if_block.m(a, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (!current || dirty[0] & /*triggerHref*/ 4) {
    				attr_dev(a, "href", /*triggerHref*/ ctx[2]);
    			}

    			const chevrondown_changes = {};
    			if (dirty[0] & /*iconDescription*/ 2) chevrondown_changes.title = /*iconDescription*/ ctx[1];
    			chevrondown.$set(chevrondown_changes);

    			if (!current || dirty[0] & /*$$props*/ 2048 && div0_aria_label_value !== (div0_aria_label_value = /*$$props*/ ctx[11]['aria-label'] || 'listbox')) {
    				attr_dev(div0, "aria-label", div0_aria_label_value);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 524288)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[19], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty[0] & /*dropdownHidden*/ 32) {
    				toggle_class(ul, "bx--tabs__nav--hidden", /*dropdownHidden*/ ctx[5]);
    			}

    			set_attributes(div1, div1_data = get_spread_update(div1_levels, [
    				{ role: "navigation" },
    				dirty[0] & /*$$restProps*/ 1024 && /*$$restProps*/ ctx[10]
    			]));

    			toggle_class(div1, "bx--tabs", true);
    			toggle_class(div1, "bx--tabs--container", /*type*/ ctx[0] === 'container');

    			if (content_slot) {
    				if (content_slot.p && (!current || dirty[0] & /*$$scope*/ 524288)) {
    					update_slot_base(
    						content_slot,
    						content_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes(content_slot_template, /*$$scope*/ ctx[19], dirty, get_content_slot_changes),
    						get_content_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chevrondown.$$.fragment, local);
    			transition_in(default_slot, local);
    			transition_in(content_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chevrondown.$$.fragment, local);
    			transition_out(default_slot, local);
    			transition_out(content_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			destroy_component(chevrondown);
    			if (default_slot) default_slot.d(detaching);
    			/*ul_binding*/ ctx[26](null);
    			if (detaching) detach_dev(t2);
    			if (content_slot) content_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let currentTab;
    	let currentContent;
    	const omit_props_names = ["selected","type","autoWidth","iconDescription","triggerHref"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $selectedTab;
    	let $content;
    	let $tabs;
    	let $tabsById;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tabs', slots, ['default','content']);
    	let { selected = 0 } = $$props;
    	let { type = "default" } = $$props;
    	let { autoWidth = false } = $$props;
    	let { iconDescription = "Show menu options" } = $$props;
    	let { triggerHref = "#" } = $$props;
    	const dispatch = createEventDispatcher();
    	const tabs = writable([]);
    	validate_store(tabs, 'tabs');
    	component_subscribe($$self, tabs, value => $$invalidate(18, $tabs = value));
    	const tabsById = derived(tabs, _ => _.reduce((a, c) => ({ ...a, [c.id]: c }), {}));
    	validate_store(tabsById, 'tabsById');
    	component_subscribe($$self, tabsById, value => $$invalidate(28, $tabsById = value));
    	const useAutoWidth = writable(autoWidth);
    	const selectedTab = writable(undefined);
    	validate_store(selectedTab, 'selectedTab');
    	component_subscribe($$self, selectedTab, value => $$invalidate(16, $selectedTab = value));
    	const content = writable([]);
    	validate_store(content, 'content');
    	component_subscribe($$self, content, value => $$invalidate(17, $content = value));
    	const contentById = derived(content, _ => _.reduce((a, c) => ({ ...a, [c.id]: c }), {}));
    	const selectedContent = writable(undefined);
    	let refTabList = null;

    	setContext("Tabs", {
    		tabs,
    		contentById,
    		selectedTab,
    		selectedContent,
    		useAutoWidth,
    		add: data => {
    			tabs.update(_ => [..._, { ...data, index: _.length }]);
    		},
    		addContent: data => {
    			content.update(_ => [..._, { ...data, index: _.length }]);
    		},
    		update: id => {
    			$$invalidate(14, currentIndex = $tabsById[id].index);
    		},
    		change: async direction => {
    			let index = currentIndex + direction;

    			if (index < 0) {
    				index = $tabs.length - 1;
    			} else if (index >= $tabs.length) {
    				index = 0;
    			}

    			let disabled = $tabs[index].disabled;

    			while (disabled) {
    				index = index + direction;

    				if (index < 0) {
    					index = $tabs.length - 1;
    				} else if (index >= $tabs.length) {
    					index = 0;
    				}

    				disabled = $tabs[index].disabled;
    			}

    			$$invalidate(14, currentIndex = index);
    			await tick();
    			const activeTab = refTabList?.querySelectorAll("[role='tab']")[currentIndex];
    			activeTab?.focus();
    		}
    	});

    	afterUpdate(() => {
    		$$invalidate(12, selected = currentIndex);

    		if (prevIndex > -1 && prevIndex !== currentIndex) {
    			dispatch("change", currentIndex);
    		}

    		prevIndex = currentIndex;
    	});

    	let dropdownHidden = true;
    	let currentIndex = selected;
    	let prevIndex = -1;

    	function keypress_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	const click_handler_1 = () => {
    		$$invalidate(5, dropdownHidden = !dropdownHidden);
    	};

    	const click_handler_2 = () => {
    		$$invalidate(5, dropdownHidden = !dropdownHidden);
    	};

    	const keypress_handler_1 = () => {
    		$$invalidate(5, dropdownHidden = !dropdownHidden);
    	};

    	function ul_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			refTabList = $$value;
    			$$invalidate(4, refTabList);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(11, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('selected' in $$new_props) $$invalidate(12, selected = $$new_props.selected);
    		if ('type' in $$new_props) $$invalidate(0, type = $$new_props.type);
    		if ('autoWidth' in $$new_props) $$invalidate(13, autoWidth = $$new_props.autoWidth);
    		if ('iconDescription' in $$new_props) $$invalidate(1, iconDescription = $$new_props.iconDescription);
    		if ('triggerHref' in $$new_props) $$invalidate(2, triggerHref = $$new_props.triggerHref);
    		if ('$$scope' in $$new_props) $$invalidate(19, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		selected,
    		type,
    		autoWidth,
    		iconDescription,
    		triggerHref,
    		createEventDispatcher,
    		afterUpdate,
    		setContext,
    		tick,
    		writable,
    		derived,
    		ChevronDown: ChevronDown$1,
    		dispatch,
    		tabs,
    		tabsById,
    		useAutoWidth,
    		selectedTab,
    		content,
    		contentById,
    		selectedContent,
    		refTabList,
    		dropdownHidden,
    		currentIndex,
    		prevIndex,
    		currentContent,
    		currentTab,
    		$selectedTab,
    		$content,
    		$tabs,
    		$tabsById
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(11, $$props = assign(assign({}, $$props), $$new_props));
    		if ('selected' in $$props) $$invalidate(12, selected = $$new_props.selected);
    		if ('type' in $$props) $$invalidate(0, type = $$new_props.type);
    		if ('autoWidth' in $$props) $$invalidate(13, autoWidth = $$new_props.autoWidth);
    		if ('iconDescription' in $$props) $$invalidate(1, iconDescription = $$new_props.iconDescription);
    		if ('triggerHref' in $$props) $$invalidate(2, triggerHref = $$new_props.triggerHref);
    		if ('refTabList' in $$props) $$invalidate(4, refTabList = $$new_props.refTabList);
    		if ('dropdownHidden' in $$props) $$invalidate(5, dropdownHidden = $$new_props.dropdownHidden);
    		if ('currentIndex' in $$props) $$invalidate(14, currentIndex = $$new_props.currentIndex);
    		if ('prevIndex' in $$props) prevIndex = $$new_props.prevIndex;
    		if ('currentContent' in $$props) $$invalidate(15, currentContent = $$new_props.currentContent);
    		if ('currentTab' in $$props) $$invalidate(3, currentTab = $$new_props.currentTab);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*selected*/ 4096) {
    			$$invalidate(14, currentIndex = selected);
    		}

    		if ($$self.$$.dirty[0] & /*$tabs, currentIndex*/ 278528) {
    			$$invalidate(3, currentTab = $tabs[currentIndex] || undefined);
    		}

    		if ($$self.$$.dirty[0] & /*$content, currentIndex*/ 147456) {
    			$$invalidate(15, currentContent = $content[currentIndex] || undefined);
    		}

    		if ($$self.$$.dirty[0] & /*currentTab, currentContent*/ 32776) {
    			{
    				if (currentTab) {
    					selectedTab.set(currentTab.id);
    				}

    				if (currentContent) {
    					selectedContent.set(currentContent.id);
    				}
    			}
    		}

    		if ($$self.$$.dirty[0] & /*$selectedTab*/ 65536) {
    			if ($selectedTab) {
    				$$invalidate(5, dropdownHidden = true);
    			}
    		}

    		if ($$self.$$.dirty[0] & /*autoWidth*/ 8192) {
    			useAutoWidth.set(autoWidth);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		type,
    		iconDescription,
    		triggerHref,
    		currentTab,
    		refTabList,
    		dropdownHidden,
    		tabs,
    		tabsById,
    		selectedTab,
    		content,
    		$$restProps,
    		$$props,
    		selected,
    		autoWidth,
    		currentIndex,
    		currentContent,
    		$selectedTab,
    		$content,
    		$tabs,
    		$$scope,
    		slots,
    		keypress_handler,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		keypress_handler_1,
    		ul_binding
    	];
    }

    class Tabs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(
    			this,
    			options,
    			instance$f,
    			create_fragment$f,
    			safe_not_equal,
    			{
    				selected: 12,
    				type: 0,
    				autoWidth: 13,
    				iconDescription: 1,
    				triggerHref: 2
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tabs",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get selected() {
    		throw new Error("<Tabs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selected(value) {
    		throw new Error("<Tabs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Tabs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Tabs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autoWidth() {
    		throw new Error("<Tabs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autoWidth(value) {
    		throw new Error("<Tabs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconDescription() {
    		throw new Error("<Tabs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconDescription(value) {
    		throw new Error("<Tabs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get triggerHref() {
    		throw new Error("<Tabs>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set triggerHref(value) {
    		throw new Error("<Tabs>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Tabs$1 = Tabs;

    /* node_modules/carbon-components-svelte/src/Tabs/Tab.svelte generated by Svelte v3.52.0 */
    const file$c = "node_modules/carbon-components-svelte/src/Tabs/Tab.svelte";

    // (72:10) {label}
    function fallback_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*label*/ ctx[1]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 2) set_data_dev(t, /*label*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$1.name,
    		type: "fallback",
    		source: "(72:10) {label}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let li;
    	let a;
    	let a_tabindex_value;
    	let a_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);
    	const default_slot_or_fallback = default_slot || fallback_block$1(ctx);
    	let li_levels = [{ tabindex: "-1" }, { role: "presentation" }, /*$$restProps*/ ctx[12]];
    	let li_data = {};

    	for (let i = 0; i < li_levels.length; i += 1) {
    		li_data = assign(li_data, li_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			attr_dev(a, "role", "tab");
    			attr_dev(a, "tabindex", a_tabindex_value = /*disabled*/ ctx[3] ? '-1' : /*tabindex*/ ctx[4]);
    			attr_dev(a, "aria-selected", /*selected*/ ctx[6]);
    			attr_dev(a, "aria-disabled", /*disabled*/ ctx[3]);
    			attr_dev(a, "id", /*id*/ ctx[5]);
    			attr_dev(a, "href", /*href*/ ctx[2]);
    			attr_dev(a, "style", a_style_value = /*$useAutoWidth*/ ctx[7] ? 'width: auto' : undefined);
    			toggle_class(a, "bx--tabs__nav-link", true);
    			add_location(a, file$c, 60, 2, 1407);
    			set_attributes(li, li_data);
    			toggle_class(li, "bx--tabs__nav-item", true);
    			toggle_class(li, "bx--tabs__nav-item--disabled", /*disabled*/ ctx[3]);
    			toggle_class(li, "bx--tabs__nav-item--selected", /*selected*/ ctx[6]);
    			add_location(li, file$c, 32, 0, 791);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(a, null);
    			}

    			/*a_binding*/ ctx[20](a);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(li, "click", prevent_default(/*click_handler*/ ctx[16]), false, true, false),
    					listen_dev(li, "click", prevent_default(/*click_handler_1*/ ctx[21]), false, true, false),
    					listen_dev(li, "mouseover", /*mouseover_handler*/ ctx[17], false, false, false),
    					listen_dev(li, "mouseenter", /*mouseenter_handler*/ ctx[18], false, false, false),
    					listen_dev(li, "mouseleave", /*mouseleave_handler*/ ctx[19], false, false, false),
    					listen_dev(li, "keydown", /*keydown_handler*/ ctx[22], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[14],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*label*/ 2)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			if (!current || dirty & /*disabled, tabindex*/ 24 && a_tabindex_value !== (a_tabindex_value = /*disabled*/ ctx[3] ? '-1' : /*tabindex*/ ctx[4])) {
    				attr_dev(a, "tabindex", a_tabindex_value);
    			}

    			if (!current || dirty & /*selected*/ 64) {
    				attr_dev(a, "aria-selected", /*selected*/ ctx[6]);
    			}

    			if (!current || dirty & /*disabled*/ 8) {
    				attr_dev(a, "aria-disabled", /*disabled*/ ctx[3]);
    			}

    			if (!current || dirty & /*id*/ 32) {
    				attr_dev(a, "id", /*id*/ ctx[5]);
    			}

    			if (!current || dirty & /*href*/ 4) {
    				attr_dev(a, "href", /*href*/ ctx[2]);
    			}

    			if (!current || dirty & /*$useAutoWidth*/ 128 && a_style_value !== (a_style_value = /*$useAutoWidth*/ ctx[7] ? 'width: auto' : undefined)) {
    				attr_dev(a, "style", a_style_value);
    			}

    			set_attributes(li, li_data = get_spread_update(li_levels, [
    				{ tabindex: "-1" },
    				{ role: "presentation" },
    				dirty & /*$$restProps*/ 4096 && /*$$restProps*/ ctx[12]
    			]));

    			toggle_class(li, "bx--tabs__nav-item", true);
    			toggle_class(li, "bx--tabs__nav-item--disabled", /*disabled*/ ctx[3]);
    			toggle_class(li, "bx--tabs__nav-item--selected", /*selected*/ ctx[6]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			/*a_binding*/ ctx[20](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let selected;
    	const omit_props_names = ["label","href","disabled","tabindex","id","ref"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $selectedTab;
    	let $useAutoWidth;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tab', slots, ['default']);
    	let { label = "" } = $$props;
    	let { href = "#" } = $$props;
    	let { disabled = false } = $$props;
    	let { tabindex = "0" } = $$props;
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	let { ref = null } = $$props;
    	const { selectedTab, useAutoWidth, add, update, change } = getContext("Tabs");
    	validate_store(selectedTab, 'selectedTab');
    	component_subscribe($$self, selectedTab, value => $$invalidate(13, $selectedTab = value));
    	validate_store(useAutoWidth, 'useAutoWidth');
    	component_subscribe($$self, useAutoWidth, value => $$invalidate(7, $useAutoWidth = value));
    	add({ id, label, disabled });

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function a_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(0, ref);
    		});
    	}

    	const click_handler_1 = () => {
    		if (!disabled) {
    			update(id);
    		}
    	};

    	const keydown_handler = ({ key }) => {
    		if (!disabled) {
    			if (key === 'ArrowRight') {
    				change(1);
    			} else if (key === 'ArrowLeft') {
    				change(-1);
    			} else if (key === ' ' || key === 'Enter') {
    				update(id);
    			}
    		}
    	};

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('label' in $$new_props) $$invalidate(1, label = $$new_props.label);
    		if ('href' in $$new_props) $$invalidate(2, href = $$new_props.href);
    		if ('disabled' in $$new_props) $$invalidate(3, disabled = $$new_props.disabled);
    		if ('tabindex' in $$new_props) $$invalidate(4, tabindex = $$new_props.tabindex);
    		if ('id' in $$new_props) $$invalidate(5, id = $$new_props.id);
    		if ('ref' in $$new_props) $$invalidate(0, ref = $$new_props.ref);
    		if ('$$scope' in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		label,
    		href,
    		disabled,
    		tabindex,
    		id,
    		ref,
    		getContext,
    		selectedTab,
    		useAutoWidth,
    		add,
    		update,
    		change,
    		selected,
    		$selectedTab,
    		$useAutoWidth
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('label' in $$props) $$invalidate(1, label = $$new_props.label);
    		if ('href' in $$props) $$invalidate(2, href = $$new_props.href);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$new_props.disabled);
    		if ('tabindex' in $$props) $$invalidate(4, tabindex = $$new_props.tabindex);
    		if ('id' in $$props) $$invalidate(5, id = $$new_props.id);
    		if ('ref' in $$props) $$invalidate(0, ref = $$new_props.ref);
    		if ('selected' in $$props) $$invalidate(6, selected = $$new_props.selected);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$selectedTab, id*/ 8224) {
    			$$invalidate(6, selected = $selectedTab === id);
    		}
    	};

    	return [
    		ref,
    		label,
    		href,
    		disabled,
    		tabindex,
    		id,
    		selected,
    		$useAutoWidth,
    		selectedTab,
    		useAutoWidth,
    		update,
    		change,
    		$$restProps,
    		$selectedTab,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		a_binding,
    		click_handler_1,
    		keydown_handler
    	];
    }

    class Tab extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$e, create_fragment$e, safe_not_equal, {
    			label: 1,
    			href: 2,
    			disabled: 3,
    			tabindex: 4,
    			id: 5,
    			ref: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tab",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get label() {
    		throw new Error("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tabindex() {
    		throw new Error("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tabindex(value) {
    		throw new Error("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<Tab>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<Tab>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var Tab$1 = Tab;

    /* node_modules/carbon-components-svelte/src/Tabs/TabContent.svelte generated by Svelte v3.52.0 */
    const file$b = "node_modules/carbon-components-svelte/src/Tabs/TabContent.svelte";

    function create_fragment$d(ctx) {
    	let div;
    	let div_aria_hidden_value;
    	let div_hidden_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	let div_levels = [
    		{ role: "tabpanel" },
    		{ "aria-labelledby": /*tabId*/ ctx[1] },
    		{
    			"aria-hidden": div_aria_hidden_value = !/*selected*/ ctx[2]
    		},
    		{
    			hidden: div_hidden_value = /*selected*/ ctx[2] ? undefined : ''
    		},
    		{ id: /*id*/ ctx[0] },
    		/*$$restProps*/ ctx[6]
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			toggle_class(div, "bx--tab-content", true);
    			add_location(div, file$b, 15, 0, 374);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				{ role: "tabpanel" },
    				(!current || dirty & /*tabId*/ 2) && { "aria-labelledby": /*tabId*/ ctx[1] },
    				(!current || dirty & /*selected*/ 4 && div_aria_hidden_value !== (div_aria_hidden_value = !/*selected*/ ctx[2])) && { "aria-hidden": div_aria_hidden_value },
    				(!current || dirty & /*selected*/ 4 && div_hidden_value !== (div_hidden_value = /*selected*/ ctx[2] ? undefined : '')) && { hidden: div_hidden_value },
    				(!current || dirty & /*id*/ 1) && { id: /*id*/ ctx[0] },
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));

    			toggle_class(div, "bx--tab-content", true);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let selected;
    	let index;
    	let tabId;
    	const omit_props_names = ["id"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $tabs;
    	let $contentById;
    	let $selectedContent;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TabContent', slots, ['default']);
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	const { selectedContent, addContent, tabs, contentById } = getContext("Tabs");
    	validate_store(selectedContent, 'selectedContent');
    	component_subscribe($$self, selectedContent, value => $$invalidate(10, $selectedContent = value));
    	validate_store(tabs, 'tabs');
    	component_subscribe($$self, tabs, value => $$invalidate(8, $tabs = value));
    	validate_store(contentById, 'contentById');
    	component_subscribe($$self, contentById, value => $$invalidate(9, $contentById = value));
    	addContent({ id });

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('id' in $$new_props) $$invalidate(0, id = $$new_props.id);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		id,
    		getContext,
    		selectedContent,
    		addContent,
    		tabs,
    		contentById,
    		index,
    		tabId,
    		selected,
    		$tabs,
    		$contentById,
    		$selectedContent
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('id' in $$props) $$invalidate(0, id = $$new_props.id);
    		if ('index' in $$props) $$invalidate(7, index = $$new_props.index);
    		if ('tabId' in $$props) $$invalidate(1, tabId = $$new_props.tabId);
    		if ('selected' in $$props) $$invalidate(2, selected = $$new_props.selected);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$selectedContent, id*/ 1025) {
    			$$invalidate(2, selected = $selectedContent === id);
    		}

    		if ($$self.$$.dirty & /*$contentById, id*/ 513) {
    			$$invalidate(7, index = $contentById[id].index);
    		}

    		if ($$self.$$.dirty & /*$tabs, index*/ 384) {
    			$$invalidate(1, tabId = $tabs[index].id);
    		}
    	};

    	return [
    		id,
    		tabId,
    		selected,
    		selectedContent,
    		tabs,
    		contentById,
    		$$restProps,
    		index,
    		$tabs,
    		$contentById,
    		$selectedContent,
    		$$scope,
    		slots
    	];
    }

    class TabContent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$d, create_fragment$d, safe_not_equal, { id: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TabContent",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get id() {
    		throw new Error("<TabContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<TabContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var TabContent$1 = TabContent;

    /* node_modules/carbon-components-svelte/src/TextInput/TextInput.svelte generated by Svelte v3.52.0 */
    const file$a = "node_modules/carbon-components-svelte/src/TextInput/TextInput.svelte";
    const get_labelText_slot_changes_1 = dirty => ({});
    const get_labelText_slot_context_1 = ctx => ({});
    const get_labelText_slot_changes = dirty => ({});
    const get_labelText_slot_context = ctx => ({});

    // (115:2) {#if inline}
    function create_if_block_10(ctx) {
    	let div;
    	let t;
    	let current;
    	let if_block0 = /*labelText*/ ctx[9] && create_if_block_12(ctx);
    	let if_block1 = !/*isFluid*/ ctx[20] && /*helperText*/ ctx[6] && create_if_block_11(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			toggle_class(div, "bx--text-input__label-helper-wrapper", true);
    			add_location(div, file$a, 115, 4, 2896);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t);
    			if (if_block1) if_block1.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*labelText*/ ctx[9]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*labelText*/ 512) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_12(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div, t);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!/*isFluid*/ ctx[20] && /*helperText*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_11(ctx);
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(115:2) {#if inline}",
    		ctx
    	});

    	return block;
    }

    // (117:6) {#if labelText}
    function create_if_block_12(ctx) {
    	let label;
    	let current;
    	const labelText_slot_template = /*#slots*/ ctx[26].labelText;
    	const labelText_slot = create_slot(labelText_slot_template, ctx, /*$$scope*/ ctx[25], get_labelText_slot_context);
    	const labelText_slot_or_fallback = labelText_slot || fallback_block_1(ctx);

    	const block = {
    		c: function create() {
    			label = element("label");
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.c();
    			attr_dev(label, "for", /*id*/ ctx[7]);
    			toggle_class(label, "bx--label", true);
    			toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[10]);
    			toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[5]);
    			toggle_class(label, "bx--label--inline", /*inline*/ ctx[16]);
    			toggle_class(label, "bx--label--inline--sm", /*size*/ ctx[2] === 'sm');
    			toggle_class(label, "bx--label--inline--xl", /*size*/ ctx[2] === 'xl');
    			add_location(label, file$a, 117, 8, 2984);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);

    			if (labelText_slot_or_fallback) {
    				labelText_slot_or_fallback.m(label, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (labelText_slot) {
    				if (labelText_slot.p && (!current || dirty[0] & /*$$scope*/ 33554432)) {
    					update_slot_base(
    						labelText_slot,
    						labelText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[25],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
    						: get_slot_changes(labelText_slot_template, /*$$scope*/ ctx[25], dirty, get_labelText_slot_changes),
    						get_labelText_slot_context
    					);
    				}
    			} else {
    				if (labelText_slot_or_fallback && labelText_slot_or_fallback.p && (!current || dirty[0] & /*labelText*/ 512)) {
    					labelText_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*id*/ 128) {
    				attr_dev(label, "for", /*id*/ ctx[7]);
    			}

    			if (!current || dirty[0] & /*hideLabel*/ 1024) {
    				toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[10]);
    			}

    			if (!current || dirty[0] & /*disabled*/ 32) {
    				toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[5]);
    			}

    			if (!current || dirty[0] & /*inline*/ 65536) {
    				toggle_class(label, "bx--label--inline", /*inline*/ ctx[16]);
    			}

    			if (!current || dirty[0] & /*size*/ 4) {
    				toggle_class(label, "bx--label--inline--sm", /*size*/ ctx[2] === 'sm');
    			}

    			if (!current || dirty[0] & /*size*/ 4) {
    				toggle_class(label, "bx--label--inline--xl", /*size*/ ctx[2] === 'xl');
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(labelText_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(labelText_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_12.name,
    		type: "if",
    		source: "(117:6) {#if labelText}",
    		ctx
    	});

    	return block;
    }

    // (127:33)              
    function fallback_block_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelText*/ ctx[9]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*labelText*/ 512) set_data_dev(t, /*labelText*/ ctx[9]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block_1.name,
    		type: "fallback",
    		source: "(127:33)              ",
    		ctx
    	});

    	return block;
    }

    // (132:6) {#if !isFluid && helperText}
    function create_if_block_11(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*helperText*/ ctx[6]);
    			toggle_class(div, "bx--form__helper-text", true);
    			toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[5]);
    			toggle_class(div, "bx--form__helper-text--inline", /*inline*/ ctx[16]);
    			add_location(div, file$a, 132, 8, 3461);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*helperText*/ 64) set_data_dev(t, /*helperText*/ ctx[6]);

    			if (dirty[0] & /*disabled*/ 32) {
    				toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[5]);
    			}

    			if (dirty[0] & /*inline*/ 65536) {
    				toggle_class(div, "bx--form__helper-text--inline", /*inline*/ ctx[16]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(132:6) {#if !isFluid && helperText}",
    		ctx
    	});

    	return block;
    }

    // (143:2) {#if !inline && (labelText || $$slots.labelText)}
    function create_if_block_9(ctx) {
    	let label;
    	let current;
    	const labelText_slot_template = /*#slots*/ ctx[26].labelText;
    	const labelText_slot = create_slot(labelText_slot_template, ctx, /*$$scope*/ ctx[25], get_labelText_slot_context_1);
    	const labelText_slot_or_fallback = labelText_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			label = element("label");
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.c();
    			attr_dev(label, "for", /*id*/ ctx[7]);
    			toggle_class(label, "bx--label", true);
    			toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[10]);
    			toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[5]);
    			toggle_class(label, "bx--label--inline", /*inline*/ ctx[16]);
    			toggle_class(label, "bx--label--inline-sm", /*inline*/ ctx[16] && /*size*/ ctx[2] === 'sm');
    			toggle_class(label, "bx--label--inline-xl", /*inline*/ ctx[16] && /*size*/ ctx[2] === 'xl');
    			add_location(label, file$a, 143, 4, 3766);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);

    			if (labelText_slot_or_fallback) {
    				labelText_slot_or_fallback.m(label, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (labelText_slot) {
    				if (labelText_slot.p && (!current || dirty[0] & /*$$scope*/ 33554432)) {
    					update_slot_base(
    						labelText_slot,
    						labelText_slot_template,
    						ctx,
    						/*$$scope*/ ctx[25],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
    						: get_slot_changes(labelText_slot_template, /*$$scope*/ ctx[25], dirty, get_labelText_slot_changes_1),
    						get_labelText_slot_context_1
    					);
    				}
    			} else {
    				if (labelText_slot_or_fallback && labelText_slot_or_fallback.p && (!current || dirty[0] & /*labelText*/ 512)) {
    					labelText_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*id*/ 128) {
    				attr_dev(label, "for", /*id*/ ctx[7]);
    			}

    			if (!current || dirty[0] & /*hideLabel*/ 1024) {
    				toggle_class(label, "bx--visually-hidden", /*hideLabel*/ ctx[10]);
    			}

    			if (!current || dirty[0] & /*disabled*/ 32) {
    				toggle_class(label, "bx--label--disabled", /*disabled*/ ctx[5]);
    			}

    			if (!current || dirty[0] & /*inline*/ 65536) {
    				toggle_class(label, "bx--label--inline", /*inline*/ ctx[16]);
    			}

    			if (!current || dirty[0] & /*inline, size*/ 65540) {
    				toggle_class(label, "bx--label--inline-sm", /*inline*/ ctx[16] && /*size*/ ctx[2] === 'sm');
    			}

    			if (!current || dirty[0] & /*inline, size*/ 65540) {
    				toggle_class(label, "bx--label--inline-xl", /*inline*/ ctx[16] && /*size*/ ctx[2] === 'xl');
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(labelText_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(labelText_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (labelText_slot_or_fallback) labelText_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(143:2) {#if !inline && (labelText || $$slots.labelText)}",
    		ctx
    	});

    	return block;
    }

    // (153:29)          
    function fallback_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*labelText*/ ctx[9]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*labelText*/ 512) set_data_dev(t, /*labelText*/ ctx[9]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(153:29)          ",
    		ctx
    	});

    	return block;
    }

    // (168:6) {#if invalid}
    function create_if_block_8(ctx) {
    	let warningfilled;
    	let current;

    	warningfilled = new WarningFilled$1({
    			props: { class: "bx--text-input__invalid-icon" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(warningfilled.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(warningfilled, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(warningfilled.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(warningfilled.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(warningfilled, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(168:6) {#if invalid}",
    		ctx
    	});

    	return block;
    }

    // (171:6) {#if !invalid && warn}
    function create_if_block_7(ctx) {
    	let warningaltfilled;
    	let current;

    	warningaltfilled = new WarningAltFilled$1({
    			props: {
    				class: "bx--text-input__invalid-icon\n            bx--text-input__invalid-icon--warning"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(warningaltfilled.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(warningaltfilled, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(warningaltfilled.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(warningaltfilled.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(warningaltfilled, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(171:6) {#if !invalid && warn}",
    		ctx
    	});

    	return block;
    }

    // (177:6) {#if readonly}
    function create_if_block_6(ctx) {
    	let editoff;
    	let current;

    	editoff = new EditOff$1({
    			props: { class: "bx--text-input__readonly-icon" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(editoff.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(editoff, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(editoff.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(editoff.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(editoff, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(177:6) {#if readonly}",
    		ctx
    	});

    	return block;
    }

    // (208:6) {#if isFluid}
    function create_if_block_5(ctx) {
    	let hr;

    	const block = {
    		c: function create() {
    			hr = element("hr");
    			toggle_class(hr, "bx--text-input__divider", true);
    			add_location(hr, file$a, 208, 8, 5797);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, hr, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(208:6) {#if isFluid}",
    		ctx
    	});

    	return block;
    }

    // (211:6) {#if isFluid && !inline && invalid}
    function create_if_block_4(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*invalidText*/ ctx[12]);
    			attr_dev(div, "id", /*errorId*/ ctx[19]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$a, 211, 8, 5905);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*invalidText*/ 4096) set_data_dev(t, /*invalidText*/ ctx[12]);

    			if (dirty[0] & /*errorId*/ 524288) {
    				attr_dev(div, "id", /*errorId*/ ctx[19]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(211:6) {#if isFluid && !inline && invalid}",
    		ctx
    	});

    	return block;
    }

    // (216:6) {#if isFluid && !inline && warn}
    function create_if_block_3$1(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*warnText*/ ctx[14]);
    			attr_dev(div, "id", /*warnId*/ ctx[18]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$a, 216, 8, 6060);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*warnText*/ 16384) set_data_dev(t, /*warnText*/ ctx[14]);

    			if (dirty[0] & /*warnId*/ 262144) {
    				attr_dev(div, "id", /*warnId*/ ctx[18]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(216:6) {#if isFluid && !inline && warn}",
    		ctx
    	});

    	return block;
    }

    // (220:4) {#if !invalid && !warn && !isFluid && !inline && helperText}
    function create_if_block_2$2(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*helperText*/ ctx[6]);
    			toggle_class(div, "bx--form__helper-text", true);
    			toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[5]);
    			toggle_class(div, "bx--form__helper-text--inline", /*inline*/ ctx[16]);
    			add_location(div, file$a, 220, 6, 6226);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*helperText*/ 64) set_data_dev(t, /*helperText*/ ctx[6]);

    			if (dirty[0] & /*disabled*/ 32) {
    				toggle_class(div, "bx--form__helper-text--disabled", /*disabled*/ ctx[5]);
    			}

    			if (dirty[0] & /*inline*/ 65536) {
    				toggle_class(div, "bx--form__helper-text--inline", /*inline*/ ctx[16]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(220:4) {#if !invalid && !warn && !isFluid && !inline && helperText}",
    		ctx
    	});

    	return block;
    }

    // (229:4) {#if !isFluid && invalid}
    function create_if_block_1$3(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*invalidText*/ ctx[12]);
    			attr_dev(div, "id", /*errorId*/ ctx[19]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$a, 229, 6, 6478);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*invalidText*/ 4096) set_data_dev(t, /*invalidText*/ ctx[12]);

    			if (dirty[0] & /*errorId*/ 524288) {
    				attr_dev(div, "id", /*errorId*/ ctx[19]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(229:4) {#if !isFluid && invalid}",
    		ctx
    	});

    	return block;
    }

    // (234:4) {#if !isFluid && !invalid && warn}
    function create_if_block$9(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*warnText*/ ctx[14]);
    			attr_dev(div, "id", /*warnId*/ ctx[18]);
    			toggle_class(div, "bx--form-requirement", true);
    			add_location(div, file$a, 234, 6, 6625);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*warnText*/ 16384) set_data_dev(t, /*warnText*/ ctx[14]);

    			if (dirty[0] & /*warnId*/ 262144) {
    				attr_dev(div, "id", /*warnId*/ ctx[18]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(234:4) {#if !isFluid && !invalid && warn}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div2;
    	let t0;
    	let t1;
    	let div1;
    	let div0;
    	let t2;
    	let t3;
    	let t4;
    	let input;
    	let input_data_invalid_value;
    	let input_aria_invalid_value;
    	let input_data_warn_value;
    	let input_aria_describedby_value;
    	let t5;
    	let t6;
    	let t7;
    	let div0_data_invalid_value;
    	let div0_data_warn_value;
    	let t8;
    	let t9;
    	let t10;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*inline*/ ctx[16] && create_if_block_10(ctx);
    	let if_block1 = !/*inline*/ ctx[16] && (/*labelText*/ ctx[9] || /*$$slots*/ ctx[24].labelText) && create_if_block_9(ctx);
    	let if_block2 = /*invalid*/ ctx[11] && create_if_block_8(ctx);
    	let if_block3 = !/*invalid*/ ctx[11] && /*warn*/ ctx[13] && create_if_block_7(ctx);
    	let if_block4 = /*readonly*/ ctx[17] && create_if_block_6(ctx);

    	let input_levels = [
    		{
    			"data-invalid": input_data_invalid_value = /*invalid*/ ctx[11] || undefined
    		},
    		{
    			"aria-invalid": input_aria_invalid_value = /*invalid*/ ctx[11] || undefined
    		},
    		{
    			"data-warn": input_data_warn_value = /*warn*/ ctx[13] || undefined
    		},
    		{
    			"aria-describedby": input_aria_describedby_value = /*invalid*/ ctx[11]
    			? /*errorId*/ ctx[19]
    			: /*warn*/ ctx[13] ? /*warnId*/ ctx[18] : undefined
    		},
    		{ disabled: /*disabled*/ ctx[5] },
    		{ id: /*id*/ ctx[7] },
    		{ name: /*name*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[3] },
    		{ required: /*required*/ ctx[15] },
    		{ readOnly: /*readonly*/ ctx[17] },
    		/*$$restProps*/ ctx[23]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	let if_block5 = /*isFluid*/ ctx[20] && create_if_block_5(ctx);
    	let if_block6 = /*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*invalid*/ ctx[11] && create_if_block_4(ctx);
    	let if_block7 = /*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*warn*/ ctx[13] && create_if_block_3$1(ctx);
    	let if_block8 = !/*invalid*/ ctx[11] && !/*warn*/ ctx[13] && !/*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*helperText*/ ctx[6] && create_if_block_2$2(ctx);
    	let if_block9 = !/*isFluid*/ ctx[20] && /*invalid*/ ctx[11] && create_if_block_1$3(ctx);
    	let if_block10 = !/*isFluid*/ ctx[20] && !/*invalid*/ ctx[11] && /*warn*/ ctx[13] && create_if_block$9(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			t3 = space();
    			if (if_block4) if_block4.c();
    			t4 = space();
    			input = element("input");
    			t5 = space();
    			if (if_block5) if_block5.c();
    			t6 = space();
    			if (if_block6) if_block6.c();
    			t7 = space();
    			if (if_block7) if_block7.c();
    			t8 = space();
    			if (if_block8) if_block8.c();
    			t9 = space();
    			if (if_block9) if_block9.c();
    			t10 = space();
    			if (if_block10) if_block10.c();
    			set_attributes(input, input_data);
    			toggle_class(input, "bx--text-input", true);
    			toggle_class(input, "bx--text-input--light", /*light*/ ctx[4]);
    			toggle_class(input, "bx--text-input--invalid", /*invalid*/ ctx[11]);
    			toggle_class(input, "bx--text-input--warn", /*warn*/ ctx[13]);
    			toggle_class(input, "bx--text-input--sm", /*size*/ ctx[2] === 'sm');
    			toggle_class(input, "bx--text-input--xl", /*size*/ ctx[2] === 'xl');
    			add_location(input, file$a, 179, 6, 4884);
    			attr_dev(div0, "data-invalid", div0_data_invalid_value = /*invalid*/ ctx[11] || undefined);
    			attr_dev(div0, "data-warn", div0_data_warn_value = /*warn*/ ctx[13] || undefined);
    			toggle_class(div0, "bx--text-input__field-wrapper", true);
    			toggle_class(div0, "bx--text-input__field-wrapper--warning", !/*invalid*/ ctx[11] && /*warn*/ ctx[13]);
    			add_location(div0, file$a, 161, 4, 4301);
    			toggle_class(div1, "bx--text-input__field-outer-wrapper", true);
    			toggle_class(div1, "bx--text-input__field-outer-wrapper--inline", /*inline*/ ctx[16]);
    			add_location(div1, file$a, 157, 2, 4168);
    			toggle_class(div2, "bx--form-item", true);
    			toggle_class(div2, "bx--text-input-wrapper", true);
    			toggle_class(div2, "bx--text-input-wrapper--inline", /*inline*/ ctx[16]);
    			toggle_class(div2, "bx--text-input-wrapper--light", /*light*/ ctx[4]);
    			toggle_class(div2, "bx--text-input-wrapper--readonly", /*readonly*/ ctx[17]);
    			add_location(div2, file$a, 103, 0, 2589);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			if (if_block0) if_block0.m(div2, null);
    			append_dev(div2, t0);
    			if (if_block1) if_block1.m(div2, null);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			if (if_block2) if_block2.m(div0, null);
    			append_dev(div0, t2);
    			if (if_block3) if_block3.m(div0, null);
    			append_dev(div0, t3);
    			if (if_block4) if_block4.m(div0, null);
    			append_dev(div0, t4);
    			append_dev(div0, input);
    			if (input.autofocus) input.focus();
    			/*input_binding*/ ctx[36](input);
    			set_input_value(input, /*value*/ ctx[0]);
    			append_dev(div0, t5);
    			if (if_block5) if_block5.m(div0, null);
    			append_dev(div0, t6);
    			if (if_block6) if_block6.m(div0, null);
    			append_dev(div0, t7);
    			if (if_block7) if_block7.m(div0, null);
    			append_dev(div1, t8);
    			if (if_block8) if_block8.m(div1, null);
    			append_dev(div1, t9);
    			if (if_block9) if_block9.m(div1, null);
    			append_dev(div1, t10);
    			if (if_block10) if_block10.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[37]),
    					listen_dev(input, "change", /*onChange*/ ctx[22], false, false, false),
    					listen_dev(input, "input", /*onInput*/ ctx[21], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler*/ ctx[31], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler*/ ctx[32], false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[33], false, false, false),
    					listen_dev(input, "blur", /*blur_handler*/ ctx[34], false, false, false),
    					listen_dev(input, "paste", /*paste_handler*/ ctx[35], false, false, false),
    					listen_dev(div2, "click", /*click_handler*/ ctx[27], false, false, false),
    					listen_dev(div2, "mouseover", /*mouseover_handler*/ ctx[28], false, false, false),
    					listen_dev(div2, "mouseenter", /*mouseenter_handler*/ ctx[29], false, false, false),
    					listen_dev(div2, "mouseleave", /*mouseleave_handler*/ ctx[30], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*inline*/ ctx[16]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*inline*/ 65536) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_10(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div2, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!/*inline*/ ctx[16] && (/*labelText*/ ctx[9] || /*$$slots*/ ctx[24].labelText)) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*inline, labelText, $$slots*/ 16843264) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_9(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div2, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*invalid*/ ctx[11]) {
    				if (if_block2) {
    					if (dirty[0] & /*invalid*/ 2048) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_8(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div0, t2);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (!/*invalid*/ ctx[11] && /*warn*/ ctx[13]) {
    				if (if_block3) {
    					if (dirty[0] & /*invalid, warn*/ 10240) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block_7(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(div0, t3);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}

    			if (/*readonly*/ ctx[17]) {
    				if (if_block4) {
    					if (dirty[0] & /*readonly*/ 131072) {
    						transition_in(if_block4, 1);
    					}
    				} else {
    					if_block4 = create_if_block_6(ctx);
    					if_block4.c();
    					transition_in(if_block4, 1);
    					if_block4.m(div0, t4);
    				}
    			} else if (if_block4) {
    				group_outros();

    				transition_out(if_block4, 1, 1, () => {
    					if_block4 = null;
    				});

    				check_outros();
    			}

    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				(!current || dirty[0] & /*invalid*/ 2048 && input_data_invalid_value !== (input_data_invalid_value = /*invalid*/ ctx[11] || undefined)) && { "data-invalid": input_data_invalid_value },
    				(!current || dirty[0] & /*invalid*/ 2048 && input_aria_invalid_value !== (input_aria_invalid_value = /*invalid*/ ctx[11] || undefined)) && { "aria-invalid": input_aria_invalid_value },
    				(!current || dirty[0] & /*warn*/ 8192 && input_data_warn_value !== (input_data_warn_value = /*warn*/ ctx[13] || undefined)) && { "data-warn": input_data_warn_value },
    				(!current || dirty[0] & /*invalid, errorId, warn, warnId*/ 796672 && input_aria_describedby_value !== (input_aria_describedby_value = /*invalid*/ ctx[11]
    				? /*errorId*/ ctx[19]
    				: /*warn*/ ctx[13] ? /*warnId*/ ctx[18] : undefined)) && {
    					"aria-describedby": input_aria_describedby_value
    				},
    				(!current || dirty[0] & /*disabled*/ 32) && { disabled: /*disabled*/ ctx[5] },
    				(!current || dirty[0] & /*id*/ 128) && { id: /*id*/ ctx[7] },
    				(!current || dirty[0] & /*name*/ 256) && { name: /*name*/ ctx[8] },
    				(!current || dirty[0] & /*placeholder*/ 8) && { placeholder: /*placeholder*/ ctx[3] },
    				(!current || dirty[0] & /*required*/ 32768) && { required: /*required*/ ctx[15] },
    				(!current || dirty[0] & /*readonly*/ 131072) && { readOnly: /*readonly*/ ctx[17] },
    				dirty[0] & /*$$restProps*/ 8388608 && /*$$restProps*/ ctx[23]
    			]));

    			if (dirty[0] & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
    				set_input_value(input, /*value*/ ctx[0]);
    			}

    			toggle_class(input, "bx--text-input", true);
    			toggle_class(input, "bx--text-input--light", /*light*/ ctx[4]);
    			toggle_class(input, "bx--text-input--invalid", /*invalid*/ ctx[11]);
    			toggle_class(input, "bx--text-input--warn", /*warn*/ ctx[13]);
    			toggle_class(input, "bx--text-input--sm", /*size*/ ctx[2] === 'sm');
    			toggle_class(input, "bx--text-input--xl", /*size*/ ctx[2] === 'xl');

    			if (/*isFluid*/ ctx[20]) {
    				if (if_block5) ; else {
    					if_block5 = create_if_block_5(ctx);
    					if_block5.c();
    					if_block5.m(div0, t6);
    				}
    			} else if (if_block5) {
    				if_block5.d(1);
    				if_block5 = null;
    			}

    			if (/*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*invalid*/ ctx[11]) {
    				if (if_block6) {
    					if_block6.p(ctx, dirty);
    				} else {
    					if_block6 = create_if_block_4(ctx);
    					if_block6.c();
    					if_block6.m(div0, t7);
    				}
    			} else if (if_block6) {
    				if_block6.d(1);
    				if_block6 = null;
    			}

    			if (/*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*warn*/ ctx[13]) {
    				if (if_block7) {
    					if_block7.p(ctx, dirty);
    				} else {
    					if_block7 = create_if_block_3$1(ctx);
    					if_block7.c();
    					if_block7.m(div0, null);
    				}
    			} else if (if_block7) {
    				if_block7.d(1);
    				if_block7 = null;
    			}

    			if (!current || dirty[0] & /*invalid*/ 2048 && div0_data_invalid_value !== (div0_data_invalid_value = /*invalid*/ ctx[11] || undefined)) {
    				attr_dev(div0, "data-invalid", div0_data_invalid_value);
    			}

    			if (!current || dirty[0] & /*warn*/ 8192 && div0_data_warn_value !== (div0_data_warn_value = /*warn*/ ctx[13] || undefined)) {
    				attr_dev(div0, "data-warn", div0_data_warn_value);
    			}

    			if (!current || dirty[0] & /*invalid, warn*/ 10240) {
    				toggle_class(div0, "bx--text-input__field-wrapper--warning", !/*invalid*/ ctx[11] && /*warn*/ ctx[13]);
    			}

    			if (!/*invalid*/ ctx[11] && !/*warn*/ ctx[13] && !/*isFluid*/ ctx[20] && !/*inline*/ ctx[16] && /*helperText*/ ctx[6]) {
    				if (if_block8) {
    					if_block8.p(ctx, dirty);
    				} else {
    					if_block8 = create_if_block_2$2(ctx);
    					if_block8.c();
    					if_block8.m(div1, t9);
    				}
    			} else if (if_block8) {
    				if_block8.d(1);
    				if_block8 = null;
    			}

    			if (!/*isFluid*/ ctx[20] && /*invalid*/ ctx[11]) {
    				if (if_block9) {
    					if_block9.p(ctx, dirty);
    				} else {
    					if_block9 = create_if_block_1$3(ctx);
    					if_block9.c();
    					if_block9.m(div1, t10);
    				}
    			} else if (if_block9) {
    				if_block9.d(1);
    				if_block9 = null;
    			}

    			if (!/*isFluid*/ ctx[20] && !/*invalid*/ ctx[11] && /*warn*/ ctx[13]) {
    				if (if_block10) {
    					if_block10.p(ctx, dirty);
    				} else {
    					if_block10 = create_if_block$9(ctx);
    					if_block10.c();
    					if_block10.m(div1, null);
    				}
    			} else if (if_block10) {
    				if_block10.d(1);
    				if_block10 = null;
    			}

    			if (!current || dirty[0] & /*inline*/ 65536) {
    				toggle_class(div1, "bx--text-input__field-outer-wrapper--inline", /*inline*/ ctx[16]);
    			}

    			if (!current || dirty[0] & /*inline*/ 65536) {
    				toggle_class(div2, "bx--text-input-wrapper--inline", /*inline*/ ctx[16]);
    			}

    			if (!current || dirty[0] & /*light*/ 16) {
    				toggle_class(div2, "bx--text-input-wrapper--light", /*light*/ ctx[4]);
    			}

    			if (!current || dirty[0] & /*readonly*/ 131072) {
    				toggle_class(div2, "bx--text-input-wrapper--readonly", /*readonly*/ ctx[17]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			transition_in(if_block4);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			transition_out(if_block4);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			if (if_block4) if_block4.d();
    			/*input_binding*/ ctx[36](null);
    			if (if_block5) if_block5.d();
    			if (if_block6) if_block6.d();
    			if (if_block7) if_block7.d();
    			if (if_block8) if_block8.d();
    			if (if_block9) if_block9.d();
    			if (if_block10) if_block10.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let isFluid;
    	let errorId;
    	let warnId;

    	const omit_props_names = [
    		"size","value","placeholder","light","disabled","helperText","id","name","labelText","hideLabel","invalid","invalidText","warn","warnText","ref","required","inline","readonly"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextInput', slots, ['labelText']);
    	const $$slots = compute_slots(slots);
    	let { size = undefined } = $$props;
    	let { value = "" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { light = false } = $$props;
    	let { disabled = false } = $$props;
    	let { helperText = "" } = $$props;
    	let { id = "ccs-" + Math.random().toString(36) } = $$props;
    	let { name = undefined } = $$props;
    	let { labelText = "" } = $$props;
    	let { hideLabel = false } = $$props;
    	let { invalid = false } = $$props;
    	let { invalidText = "" } = $$props;
    	let { warn = false } = $$props;
    	let { warnText = "" } = $$props;
    	let { ref = null } = $$props;
    	let { required = false } = $$props;
    	let { inline = false } = $$props;
    	let { readonly = false } = $$props;
    	const ctx = getContext("Form");
    	const dispatch = createEventDispatcher();

    	function parse(raw) {
    		if ($$restProps.type !== "number") return raw;
    		return raw != "" ? Number(raw) : null;
    	}

    	/** @type {(e: Event) => void} */
    	const onInput = e => {
    		$$invalidate(0, value = parse(e.target.value));
    		dispatch("input", value);
    	};

    	/** @type {(e: Event) => void} */
    	const onChange = e => {
    		dispatch("change", parse(e.target.value));
    	};

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseover_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseenter_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function mouseleave_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function paste_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(1, ref);
    		});
    	}

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(23, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(2, size = $$new_props.size);
    		if ('value' in $$new_props) $$invalidate(0, value = $$new_props.value);
    		if ('placeholder' in $$new_props) $$invalidate(3, placeholder = $$new_props.placeholder);
    		if ('light' in $$new_props) $$invalidate(4, light = $$new_props.light);
    		if ('disabled' in $$new_props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ('helperText' in $$new_props) $$invalidate(6, helperText = $$new_props.helperText);
    		if ('id' in $$new_props) $$invalidate(7, id = $$new_props.id);
    		if ('name' in $$new_props) $$invalidate(8, name = $$new_props.name);
    		if ('labelText' in $$new_props) $$invalidate(9, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$new_props) $$invalidate(10, hideLabel = $$new_props.hideLabel);
    		if ('invalid' in $$new_props) $$invalidate(11, invalid = $$new_props.invalid);
    		if ('invalidText' in $$new_props) $$invalidate(12, invalidText = $$new_props.invalidText);
    		if ('warn' in $$new_props) $$invalidate(13, warn = $$new_props.warn);
    		if ('warnText' in $$new_props) $$invalidate(14, warnText = $$new_props.warnText);
    		if ('ref' in $$new_props) $$invalidate(1, ref = $$new_props.ref);
    		if ('required' in $$new_props) $$invalidate(15, required = $$new_props.required);
    		if ('inline' in $$new_props) $$invalidate(16, inline = $$new_props.inline);
    		if ('readonly' in $$new_props) $$invalidate(17, readonly = $$new_props.readonly);
    		if ('$$scope' in $$new_props) $$invalidate(25, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		size,
    		value,
    		placeholder,
    		light,
    		disabled,
    		helperText,
    		id,
    		name,
    		labelText,
    		hideLabel,
    		invalid,
    		invalidText,
    		warn,
    		warnText,
    		ref,
    		required,
    		inline,
    		readonly,
    		createEventDispatcher,
    		getContext,
    		WarningFilled: WarningFilled$1,
    		WarningAltFilled: WarningAltFilled$1,
    		EditOff: EditOff$1,
    		ctx,
    		dispatch,
    		parse,
    		onInput,
    		onChange,
    		warnId,
    		errorId,
    		isFluid
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('size' in $$props) $$invalidate(2, size = $$new_props.size);
    		if ('value' in $$props) $$invalidate(0, value = $$new_props.value);
    		if ('placeholder' in $$props) $$invalidate(3, placeholder = $$new_props.placeholder);
    		if ('light' in $$props) $$invalidate(4, light = $$new_props.light);
    		if ('disabled' in $$props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ('helperText' in $$props) $$invalidate(6, helperText = $$new_props.helperText);
    		if ('id' in $$props) $$invalidate(7, id = $$new_props.id);
    		if ('name' in $$props) $$invalidate(8, name = $$new_props.name);
    		if ('labelText' in $$props) $$invalidate(9, labelText = $$new_props.labelText);
    		if ('hideLabel' in $$props) $$invalidate(10, hideLabel = $$new_props.hideLabel);
    		if ('invalid' in $$props) $$invalidate(11, invalid = $$new_props.invalid);
    		if ('invalidText' in $$props) $$invalidate(12, invalidText = $$new_props.invalidText);
    		if ('warn' in $$props) $$invalidate(13, warn = $$new_props.warn);
    		if ('warnText' in $$props) $$invalidate(14, warnText = $$new_props.warnText);
    		if ('ref' in $$props) $$invalidate(1, ref = $$new_props.ref);
    		if ('required' in $$props) $$invalidate(15, required = $$new_props.required);
    		if ('inline' in $$props) $$invalidate(16, inline = $$new_props.inline);
    		if ('readonly' in $$props) $$invalidate(17, readonly = $$new_props.readonly);
    		if ('warnId' in $$props) $$invalidate(18, warnId = $$new_props.warnId);
    		if ('errorId' in $$props) $$invalidate(19, errorId = $$new_props.errorId);
    		if ('isFluid' in $$props) $$invalidate(20, isFluid = $$new_props.isFluid);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*id*/ 128) {
    			$$invalidate(19, errorId = `error-${id}`);
    		}

    		if ($$self.$$.dirty[0] & /*id*/ 128) {
    			$$invalidate(18, warnId = `warn-${id}`);
    		}
    	};

    	$$invalidate(20, isFluid = !!ctx && ctx.isFluid);

    	return [
    		value,
    		ref,
    		size,
    		placeholder,
    		light,
    		disabled,
    		helperText,
    		id,
    		name,
    		labelText,
    		hideLabel,
    		invalid,
    		invalidText,
    		warn,
    		warnText,
    		required,
    		inline,
    		readonly,
    		warnId,
    		errorId,
    		isFluid,
    		onInput,
    		onChange,
    		$$restProps,
    		$$slots,
    		$$scope,
    		slots,
    		click_handler,
    		mouseover_handler,
    		mouseenter_handler,
    		mouseleave_handler,
    		keydown_handler,
    		keyup_handler,
    		focus_handler,
    		blur_handler,
    		paste_handler,
    		input_binding,
    		input_input_handler
    	];
    }

    class TextInput extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(
    			this,
    			options,
    			instance$c,
    			create_fragment$c,
    			safe_not_equal,
    			{
    				size: 2,
    				value: 0,
    				placeholder: 3,
    				light: 4,
    				disabled: 5,
    				helperText: 6,
    				id: 7,
    				name: 8,
    				labelText: 9,
    				hideLabel: 10,
    				invalid: 11,
    				invalidText: 12,
    				warn: 13,
    				warnText: 14,
    				ref: 1,
    				required: 15,
    				inline: 16,
    				readonly: 17
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextInput",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get size() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get light() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set light(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get helperText() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set helperText(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelText() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelText(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideLabel() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hideLabel(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalidText() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalidText(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warn() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warn(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get warnText() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set warnText(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get required() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set required(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var TextInput$1 = TextInput;

    /* node_modules/carbon-icons-svelte/lib/Add.svelte generated by Svelte v3.52.0 */

    const file$9 = "node_modules/carbon-icons-svelte/lib/Add.svelte";

    // (23:2) {#if title}
    function create_if_block$8(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$9, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$8(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z");
    			add_location(path, file$9, 23, 2, 573);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$9, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$8(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Add', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Add extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$b, create_fragment$b, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Add",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get size() {
    		throw new Error("<Add>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Add>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Add>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Add>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Ctrl.svelte generated by Svelte v3.52.0 */

    // (12:26) 
    function create_if_block_2$1(ctx) {
    	let textinput;
    	let updating_value;
    	let current;

    	function textinput_value_binding(value) {
    		/*textinput_value_binding*/ ctx[6](value);
    	}

    	let textinput_props = {
    		labelText: /*name*/ ctx[3],
    		placeholder: /*name*/ ctx[3]
    	};

    	if (/*value*/ ctx[0] !== void 0) {
    		textinput_props.value = /*value*/ ctx[0];
    	}

    	textinput = new TextInput$1({ props: textinput_props, $$inline: true });
    	binding_callbacks.push(() => bind(textinput, 'value', textinput_value_binding));

    	const block = {
    		c: function create() {
    			create_component(textinput.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(textinput, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const textinput_changes = {};
    			if (dirty & /*name*/ 8) textinput_changes.labelText = /*name*/ ctx[3];
    			if (dirty & /*name*/ 8) textinput_changes.placeholder = /*name*/ ctx[3];

    			if (!updating_value && dirty & /*value*/ 1) {
    				updating_value = true;
    				textinput_changes.value = /*value*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			textinput.$set(textinput_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textinput.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textinput.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(textinput, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(12:26) ",
    		ctx
    	});

    	return block;
    }

    // (10:39) 
    function create_if_block_1$2(ctx) {
    	let dropdown;
    	let updating_value;
    	let current;

    	function dropdown_value_binding(value) {
    		/*dropdown_value_binding*/ ctx[5](value);
    	}

    	let dropdown_props = {
    		titleText: /*name*/ ctx[3],
    		selectedId: /*items*/ ctx[2][0].id,
    		items: /*items*/ ctx[2]
    	};

    	if (/*value*/ ctx[0] !== void 0) {
    		dropdown_props.value = /*value*/ ctx[0];
    	}

    	dropdown = new Dropdown$1({ props: dropdown_props, $$inline: true });
    	binding_callbacks.push(() => bind(dropdown, 'value', dropdown_value_binding));

    	const block = {
    		c: function create() {
    			create_component(dropdown.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(dropdown, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const dropdown_changes = {};
    			if (dirty & /*name*/ 8) dropdown_changes.titleText = /*name*/ ctx[3];
    			if (dirty & /*items*/ 4) dropdown_changes.selectedId = /*items*/ ctx[2][0].id;
    			if (dirty & /*items*/ 4) dropdown_changes.items = /*items*/ ctx[2];

    			if (!updating_value && dirty & /*value*/ 1) {
    				updating_value = true;
    				dropdown_changes.value = /*value*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			dropdown.$set(dropdown_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dropdown.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dropdown.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(dropdown, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(10:39) ",
    		ctx
    	});

    	return block;
    }

    // (8:0) {#if type === "number"}
    function create_if_block$7(ctx) {
    	let numberinput;
    	let updating_value;
    	let current;

    	function numberinput_value_binding(value) {
    		/*numberinput_value_binding*/ ctx[4](value);
    	}

    	let numberinput_props = { label: /*name*/ ctx[3] };

    	if (/*value*/ ctx[0] !== void 0) {
    		numberinput_props.value = /*value*/ ctx[0];
    	}

    	numberinput = new NumberInput$1({ props: numberinput_props, $$inline: true });
    	binding_callbacks.push(() => bind(numberinput, 'value', numberinput_value_binding));

    	const block = {
    		c: function create() {
    			create_component(numberinput.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(numberinput, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const numberinput_changes = {};
    			if (dirty & /*name*/ 8) numberinput_changes.label = /*name*/ ctx[3];

    			if (!updating_value && dirty & /*value*/ 1) {
    				updating_value = true;
    				numberinput_changes.value = /*value*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			numberinput.$set(numberinput_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(numberinput.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(numberinput.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(numberinput, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(8:0) {#if type === \\\"number\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$7, create_if_block_1$2, create_if_block_2$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*type*/ ctx[1] === "number") return 0;
    		if (/*type*/ ctx[1] === "dropdown" && /*items*/ ctx[2]) return 1;
    		if (/*type*/ ctx[1] === "text") return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$1();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Ctrl', slots, []);
    	let { value } = $$props;
    	let { type } = $$props;
    	let { items = [] } = $$props;
    	let { name = "" } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (value === undefined && !('value' in $$props || $$self.$$.bound[$$self.$$.props['value']])) {
    			console.warn("<Ctrl> was created without expected prop 'value'");
    		}

    		if (type === undefined && !('type' in $$props || $$self.$$.bound[$$self.$$.props['type']])) {
    			console.warn("<Ctrl> was created without expected prop 'type'");
    		}
    	});

    	const writable_props = ['value', 'type', 'items', 'name'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Ctrl> was created with unknown prop '${key}'`);
    	});

    	function numberinput_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(0, value);
    	}

    	function dropdown_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(0, value);
    	}

    	function textinput_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('items' in $$props) $$invalidate(2, items = $$props.items);
    		if ('name' in $$props) $$invalidate(3, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({
    		NumberInput: NumberInput$1,
    		Dropdown: Dropdown$1,
    		TextInput: TextInput$1,
    		value,
    		type,
    		items,
    		name
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('items' in $$props) $$invalidate(2, items = $$props.items);
    		if ('name' in $$props) $$invalidate(3, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		type,
    		items,
    		name,
    		numberinput_value_binding,
    		dropdown_value_binding,
    		textinput_value_binding
    	];
    }

    class Ctrl extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$a, create_fragment$a, safe_not_equal, { value: 0, type: 1, items: 2, name: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Ctrl",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get value() {
    		throw new Error("<Ctrl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Ctrl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Ctrl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Ctrl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get items() {
    		throw new Error("<Ctrl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Ctrl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Ctrl>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Ctrl>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Controls.svelte generated by Svelte v3.52.0 */
    const file$8 = "src/Controls.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (6:2) {#each ctrls as ctrl}
    function create_each_block$1(ctx) {
    	let ctrl;
    	let t;
    	let div;
    	let current;
    	const ctrl_spread_levels = [/*ctrl*/ ctx[1]];
    	let ctrl_props = {};

    	for (let i = 0; i < ctrl_spread_levels.length; i += 1) {
    		ctrl_props = assign(ctrl_props, ctrl_spread_levels[i]);
    	}

    	ctrl = new Ctrl({ props: ctrl_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(ctrl.$$.fragment);
    			t = space();
    			div = element("div");
    			attr_dev(div, "class", "spacer svelte-1ad4wdv");
    			add_location(div, file$8, 7, 4, 160);
    		},
    		m: function mount(target, anchor) {
    			mount_component(ctrl, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const ctrl_changes = (dirty & /*ctrls*/ 1)
    			? get_spread_update(ctrl_spread_levels, [get_spread_object(/*ctrl*/ ctx[1])])
    			: {};

    			ctrl.$set(ctrl_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(ctrl.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(ctrl.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(ctrl, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(6:2) {#each ctrls as ctrl}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div;
    	let current;
    	let each_value = /*ctrls*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "controls svelte-1ad4wdv");
    			add_location(div, file$8, 4, 0, 86);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*ctrls*/ 1) {
    				each_value = /*ctrls*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Controls', slots, []);
    	let { ctrls = [] } = $$props;
    	const writable_props = ['ctrls'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Controls> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('ctrls' in $$props) $$invalidate(0, ctrls = $$props.ctrls);
    	};

    	$$self.$capture_state = () => ({ ctrls, Ctrl });

    	$$self.$inject_state = $$props => {
    		if ('ctrls' in $$props) $$invalidate(0, ctrls = $$props.ctrls);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ctrls];
    }

    class Controls extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, { ctrls: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Controls",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get ctrls() {
    		throw new Error("<Controls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ctrls(value) {
    		throw new Error("<Controls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const relayControls = [
        {
            name: "Thing One",
            value: "item1",
            type: "dropdown",
            items: [
                { id: "item1", text: "Item 1" },
                { id: "item2", text: "Item 2" },
            ],
        },
        { name: "Thing 2", type: "number", value: 42 },
        { name: "Thing 3", type: "text", value: "Some Text" },
    ];
    const lndControls = [
        { name: "LND 2", type: "number", value: 42 },
        { name: "LND 3", type: "text", value: "Some Text" },
        {
            name: "LND One",
            value: "item1",
            type: "dropdown",
            items: [
                { id: "item1", text: "blah blah" },
                { id: "item2", text: "soemthing" },
            ],
        },
    ];
    const proxyControls = [
        { name: "Proxy 3", type: "text", value: "Some Text" },
        {
            name: "Proxy One",
            value: "item1",
            type: "dropdown",
            items: [
                { id: "item1", text: "ASDFASDF" },
                { id: "item2", text: "QWERQWER" },
            ],
        },
        { name: "Proxy 2", type: "number", value: 42 },
    ];
    const controls = {
        Relay: relayControls,
        Proxy: proxyControls,
        Lnd: lndControls,
    };

    /* node_modules/carbon-icons-svelte/lib/Login.svelte generated by Svelte v3.52.0 */

    const file$7 = "node_modules/carbon-icons-svelte/lib/Login.svelte";

    // (23:2) {#if title}
    function create_if_block$6(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$7, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let if_block = /*title*/ ctx[1] && create_if_block$6(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M26,30H14a2,2,0,0,1-2-2V25h2v3H26V4H14V7H12V4a2,2,0,0,1,2-2H26a2,2,0,0,1,2,2V28A2,2,0,0,1,26,30Z");
    			add_location(path0, file$7, 23, 2, 573);
    			attr_dev(path1, "d", "M14.59 20.59L18.17 17 4 17 4 15 18.17 15 14.59 11.41 16 10 22 16 16 22 14.59 20.59z");
    			add_location(path1, file$7, 23, 116, 687);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$7, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Login', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Login extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Login",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get size() {
    		throw new Error("<Login>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Login>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Login>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Login>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/ArrowLeft.svelte generated by Svelte v3.52.0 */

    const file$6 = "node_modules/carbon-icons-svelte/lib/ArrowLeft.svelte";

    // (23:2) {#if title}
    function create_if_block$5(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$6, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let svg;
    	let path;
    	let if_block = /*title*/ ctx[1] && create_if_block$5(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path = svg_element("path");
    			attr_dev(path, "d", "M14 26L15.41 24.59 7.83 17 28 17 28 15 7.83 15 15.41 7.41 14 6 4 16 14 26z");
    			add_location(path, file$6, 23, 2, 573);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$6, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					if_block.m(svg, path);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ArrowLeft', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class ArrowLeft extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ArrowLeft",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get size() {
    		throw new Error("<ArrowLeft>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ArrowLeft>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<ArrowLeft>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<ArrowLeft>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/carbon-icons-svelte/lib/Copy.svelte generated by Svelte v3.52.0 */

    const file$5 = "node_modules/carbon-icons-svelte/lib/Copy.svelte";

    // (23:2) {#if title}
    function create_if_block$4(ctx) {
    	let title_1;
    	let t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(/*title*/ ctx[1]);
    			add_location(title_1, file$5, 22, 13, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 2) set_data_dev(t, /*title*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(title_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(23:2) {#if title}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let if_block = /*title*/ ctx[1] && create_if_block$4(ctx);

    	let svg_levels = [
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		{ viewBox: "0 0 32 32" },
    		{ fill: "currentColor" },
    		{ preserveAspectRatio: "xMidYMid meet" },
    		{ width: /*size*/ ctx[0] },
    		{ height: /*size*/ ctx[0] },
    		/*attributes*/ ctx[2],
    		/*$$restProps*/ ctx[3]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z");
    			add_location(path0, file$5, 23, 2, 573);
    			attr_dev(path1, "d", "M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z");
    			add_location(path1, file$5, 23, 111, 682);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$5, 13, 0, 337);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(svg, path0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				{ viewBox: "0 0 32 32" },
    				{ fill: "currentColor" },
    				{ preserveAspectRatio: "xMidYMid meet" },
    				dirty & /*size*/ 1 && { width: /*size*/ ctx[0] },
    				dirty & /*size*/ 1 && { height: /*size*/ ctx[0] },
    				dirty & /*attributes*/ 4 && /*attributes*/ ctx[2],
    				dirty & /*$$restProps*/ 8 && /*$$restProps*/ ctx[3]
    			]));
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let labelled;
    	let attributes;
    	const omit_props_names = ["size","title"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Copy', slots, []);
    	let { size = 16 } = $$props;
    	let { title = undefined } = $$props;

    	$$self.$$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$new_props) $$invalidate(1, title = $$new_props.title);
    	};

    	$$self.$capture_state = () => ({ size, title, labelled, attributes });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ('size' in $$props) $$invalidate(0, size = $$new_props.size);
    		if ('title' in $$props) $$invalidate(1, title = $$new_props.title);
    		if ('labelled' in $$props) $$invalidate(4, labelled = $$new_props.labelled);
    		if ('attributes' in $$props) $$invalidate(2, attributes = $$new_props.attributes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(4, labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title);

    		$$invalidate(2, attributes = {
    			"aria-hidden": labelled ? undefined : true,
    			role: labelled ? "img" : undefined,
    			focusable: Number($$props["tabindex"]) === 0 ? true : undefined
    		});
    	};

    	$$props = exclude_internal_props($$props);
    	return [size, title, attributes, $$restProps, labelled];
    }

    class Copy extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, { size: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Copy",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get size() {
    		throw new Error("<Copy>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Copy>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Copy>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Copy>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    /*
     * QRious v4.0.2
     * Copyright (C) 2017 Alasdair Mercer
     * Copyright (C) 2010 Tom Zerucha
     *
     * This program is free software: you can redistribute it and/or modify
     * it under the terms of the GNU General Public License as published by
     * the Free Software Foundation, either version 3 of the License, or
     * (at your option) any later version.
     *
     * This program is distributed in the hope that it will be useful,
     * but WITHOUT ANY WARRANTY; without even the implied warranty of
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU General Public License for more details.
     *
     * You should have received a copy of the GNU General Public License
     * along with this program.  If not, see <http://www.gnu.org/licenses/>.
     */

    var qrcode = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
        module.exports = factory() ;
      }(commonjsGlobal, (function () {  
        /*
         * Copyright (C) 2017 Alasdair Mercer, !ninja
         *
         * Permission is hereby granted, free of charge, to any person obtaining a copy
         * of this software and associated documentation files (the "Software"), to deal
         * in the Software without restriction, including without limitation the rights
         * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         * copies of the Software, and to permit persons to whom the Software is
         * furnished to do so, subject to the following conditions:
         *
         * The above copyright notice and this permission notice shall be included in all
         * copies or substantial portions of the Software.
         *
         * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
         * SOFTWARE.
         */
      
        /**
         * A bare-bones constructor for surrogate prototype swapping.
         *
         * @private
         * @constructor
         */
        var Constructor = /* istanbul ignore next */ function() {};
        /**
         * A reference to <code>Object.prototype.hasOwnProperty</code>.
         *
         * @private
         * @type {Function}
         */
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        /**
         * A reference to <code>Array.prototype.slice</code>.
         *
         * @private
         * @type {Function}
         */
        var slice = Array.prototype.slice;
      
        /**
         * Creates an object which inherits the given <code>prototype</code>.
         *
         * Optionally, the created object can be extended further with the specified <code>properties</code>.
         *
         * @param {Object} prototype - the prototype to be inherited by the created object
         * @param {Object} [properties] - the optional properties to be extended by the created object
         * @return {Object} The newly created object.
         * @private
         */
        function createObject(prototype, properties) {
          var result;
          /* istanbul ignore next */
          if (typeof Object.create === 'function') {
            result = Object.create(prototype);
          } else {
            Constructor.prototype = prototype;
            result = new Constructor();
            Constructor.prototype = null;
          }
      
          if (properties) {
            extendObject(true, result, properties);
          }
      
          return result;
        }
      
        /**
         * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
         * <code>statics</code> provided.
         *
         * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
         * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
         * instead. The class name may also be used string representation for instances of the child constructor (via
         * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
         *
         * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
         * constructor which only calls the super constructor will be used instead.
         *
         * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
         *
         * @param {string} [name=this.class_] - the class name to be used for the child constructor
         * @param {Function} [constructor] - the constructor for the child
         * @param {Object} [prototype] - the prototype properties to be defined for the child
         * @param {Object} [statics] - the static properties to be defined for the child
         * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
         * @public
         */
        function extend(name, constructor, prototype, statics) {
          var superConstructor = this;
      
          if (typeof name !== 'string') {
            statics = prototype;
            prototype = constructor;
            constructor = name;
            name = null;
          }
      
          if (typeof constructor !== 'function') {
            statics = prototype;
            prototype = constructor;
            constructor = function() {
              return superConstructor.apply(this, arguments);
            };
          }
      
          extendObject(false, constructor, superConstructor, statics);
      
          constructor.prototype = createObject(superConstructor.prototype, prototype);
          constructor.prototype.constructor = constructor;
      
          constructor.class_ = name || superConstructor.class_;
          constructor.super_ = superConstructor;
      
          return constructor;
        }
      
        /**
         * Extends the specified <code>target</code> object with the properties in each of the <code>sources</code> provided.
         *
         * if any source is <code>null</code> it will be ignored.
         *
         * @param {boolean} own - <code>true</code> to only copy <b>own</b> properties from <code>sources</code> onto
         * <code>target</code>; otherwise <code>false</code>
         * @param {Object} target - the target object which should be extended
         * @param {...Object} [sources] - the source objects whose properties are to be copied onto <code>target</code>
         * @return {void}
         * @private
         */
        function extendObject(own, target, sources) {
          sources = slice.call(arguments, 2);
      
          var property;
          var source;
      
          for (var i = 0, length = sources.length; i < length; i++) {
            source = sources[i];
      
            for (property in source) {
              if (!own || hasOwnProperty.call(source, property)) {
                target[property] = source[property];
              }
            }
          }
        }
      
        var extend_1 = extend;
      
        /**
         * The base class from which all others should extend.
         *
         * @public
         * @constructor
         */
        function Nevis() {}
        Nevis.class_ = 'Nevis';
        Nevis.super_ = Object;
      
        /**
         * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
         * <code>statics</code> provided.
         *
         * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
         * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
         * instead. The class name may also be used string representation for instances of the child constructor (via
         * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
         *
         * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
         * constructor which only calls the super constructor will be used instead.
         *
         * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
         *
         * @param {string} [name=this.class_] - the class name to be used for the child constructor
         * @param {Function} [constructor] - the constructor for the child
         * @param {Object} [prototype] - the prototype properties to be defined for the child
         * @param {Object} [statics] - the static properties to be defined for the child
         * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
         * @public
         * @static
         * @memberof Nevis
         */
        Nevis.extend = extend_1;
      
        var nevis = Nevis;
      
        var lite = nevis;
      
        /**
         * Responsible for rendering a QR code {@link Frame} on a specific type of element.
         *
         * A renderer may be dependant on the rendering of another element, so the ordering of their execution is important.
         *
         * The rendering of a element can be deferred by disabling the renderer initially, however, any attempt get the element
         * from the renderer will result in it being immediately enabled and the element being rendered.
         *
         * @param {QRious} qrious - the {@link QRious} instance to be used
         * @param {*} element - the element onto which the QR code is to be rendered
         * @param {boolean} [enabled] - <code>true</code> this {@link Renderer} is enabled; otherwise <code>false</code>.
         * @public
         * @class
         * @extends Nevis
         */
        var Renderer = lite.extend(function(qrious, element, enabled) {
          /**
           * The {@link QRious} instance.
           *
           * @protected
           * @type {QRious}
           * @memberof Renderer#
           */
          this.qrious = qrious;
      
          /**
           * The element onto which this {@link Renderer} is rendering the QR code.
           *
           * @protected
           * @type {*}
           * @memberof Renderer#
           */
          this.element = element;
          this.element.qrious = qrious;
      
          /**
           * Whether this {@link Renderer} is enabled.
           *
           * @protected
           * @type {boolean}
           * @memberof Renderer#
           */
          this.enabled = Boolean(enabled);
        }, {
      
          /**
           * Draws the specified QR code <code>frame</code> on the underlying element.
           *
           * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
           *
           * @param {Frame} frame - the {@link Frame} to be drawn
           * @return {void}
           * @protected
           * @abstract
           * @memberof Renderer#
           */
          draw: function(frame) {},
      
          /**
           * Returns the element onto which this {@link Renderer} is rendering the QR code.
           *
           * If this method is called while this {@link Renderer} is disabled, it will be immediately enabled and rendered
           * before the element is returned.
           *
           * @return {*} The element.
           * @public
           * @memberof Renderer#
           */
          getElement: function() {
            if (!this.enabled) {
              this.enabled = true;
              this.render();
            }
      
            return this.element;
          },
      
          /**
           * Calculates the size (in pixel units) to represent an individual module within the QR code based on the
           * <code>frame</code> provided.
           *
           * Any configured padding will be excluded from the returned size.
           *
           * The returned value will be at least one, even in cases where the size of the QR code does not fit its contents.
           * This is done so that the inevitable clipping is handled more gracefully since this way at least something is
           * displayed instead of just a blank space filled by the background color.
           *
           * @param {Frame} frame - the {@link Frame} from which the module size is to be derived
           * @return {number} The pixel size for each module in the QR code which will be no less than one.
           * @protected
           * @memberof Renderer#
           */
          getModuleSize: function(frame) {
            var qrious = this.qrious;
            var padding = qrious.padding || 0;
            var pixels = Math.floor((qrious.size - (padding * 2)) / frame.width);
      
            return Math.max(1, pixels);
          },

          /**
           * Renders a QR code on the underlying element based on the <code>frame</code> provided.
           *
           * @param {Frame} frame - the {@link Frame} to be rendered
           * @return {void}
           * @public
           * @memberof Renderer#
           */
          render: function(frame) {
            if (this.enabled) {
              this.resize();
              this.reset();
              this.draw(frame);
            }
          },
      
          /**
           * Resets the underlying element, effectively clearing any previously rendered QR code.
           *
           * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
           *
           * @return {void}
           * @protected
           * @abstract
           * @memberof Renderer#
           */
          reset: function() {},
      
          /**
           * Ensures that the size of the underlying element matches that defined on the associated {@link QRious} instance.
           *
           * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
           *
           * @return {void}
           * @protected
           * @abstract
           * @memberof Renderer#
           */
          resize: function() {}
      
        });
      
        var Renderer_1 = Renderer;
      
        /**
         * An implementation of {@link Renderer} for working with <code>canvas</code> elements.
         *
         * @public
         * @class
         * @extends Renderer
         */
        var CanvasRenderer = Renderer_1.extend({
      
          /**
           * @override
           */
          draw: function(frame) {
            var i, j;
            var qrious = this.qrious;
            var moduleSize = this.getModuleSize(frame);
            var offset = parseInt((this.element.width-(frame.width * moduleSize)) / 2);
            var context = this.element.getContext('2d');
      
            context.fillStyle = qrious.foreground;
            context.globalAlpha = qrious.foregroundAlpha;
      
            for (i = 0; i < frame.width; i++) {
              for (j = 0; j < frame.width; j++) {
                if (frame.buffer[(j * frame.width) + i]) {
                  context.fillRect((moduleSize * i) + offset, (moduleSize * j) + offset, moduleSize, moduleSize);
                }
              }
            }
          },
      
          /**
           * @override
           */
          reset: function() {
            var qrious = this.qrious;
            var context = this.element.getContext('2d');
            var size = qrious.size;
      
            context.lineWidth = 1;
            context.clearRect(0, 0, size, size);
            context.fillStyle = qrious.background;
            context.globalAlpha = qrious.backgroundAlpha;
            context.fillRect(0, 0, size, size);
          },
      
          /**
           * @override
           */
          resize: function() {
            var element = this.element;
      
            element.width = element.height = this.qrious.size;
          }
      
        });
      
        var CanvasRenderer_1 = CanvasRenderer;
      
        /* eslint no-multi-spaces: "off" */
      
      
      
        /**
         * Contains alignment pattern information.
         *
         * @public
         * @class
         * @extends Nevis
         */
        var Alignment = lite.extend(null, {
      
          /**
           * The alignment pattern block.
           *
           * @public
           * @static
           * @type {number[]}
           * @memberof Alignment
           */
          BLOCK: [
            0,  11, 15, 19, 23, 27, 31,
            16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24,
            26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28
          ]
      
        });
      
        var Alignment_1 = Alignment;
      
        /* eslint no-multi-spaces: "off" */
      
      
      
        /**
         * Contains error correction information.
         *
         * @public
         * @class
         * @extends Nevis
         */
        var ErrorCorrection = lite.extend(null, {
      
          /**
           * The error correction blocks.
           *
           * There are four elements per version. The first two indicate the number of blocks, then the data width, and finally
           * the ECC width.
           *
           * @public
           * @static
           * @type {number[]}
           * @memberof ErrorCorrection
           */
          BLOCKS: [
            1,  0,  19,  7,     1,  0,  16,  10,    1,  0,  13,  13,    1,  0,  9,   17,
            1,  0,  34,  10,    1,  0,  28,  16,    1,  0,  22,  22,    1,  0,  16,  28,
            1,  0,  55,  15,    1,  0,  44,  26,    2,  0,  17,  18,    2,  0,  13,  22,
            1,  0,  80,  20,    2,  0,  32,  18,    2,  0,  24,  26,    4,  0,  9,   16,
            1,  0,  108, 26,    2,  0,  43,  24,    2,  2,  15,  18,    2,  2,  11,  22,
            2,  0,  68,  18,    4,  0,  27,  16,    4,  0,  19,  24,    4,  0,  15,  28,
            2,  0,  78,  20,    4,  0,  31,  18,    2,  4,  14,  18,    4,  1,  13,  26,
            2,  0,  97,  24,    2,  2,  38,  22,    4,  2,  18,  22,    4,  2,  14,  26,
            2,  0,  116, 30,    3,  2,  36,  22,    4,  4,  16,  20,    4,  4,  12,  24,
            2,  2,  68,  18,    4,  1,  43,  26,    6,  2,  19,  24,    6,  2,  15,  28,
            4,  0,  81,  20,    1,  4,  50,  30,    4,  4,  22,  28,    3,  8,  12,  24,
            2,  2,  92,  24,    6,  2,  36,  22,    4,  6,  20,  26,    7,  4,  14,  28,
            4,  0,  107, 26,    8,  1,  37,  22,    8,  4,  20,  24,    12, 4,  11,  22,
            3,  1,  115, 30,    4,  5,  40,  24,    11, 5,  16,  20,    11, 5,  12,  24,
            5,  1,  87,  22,    5,  5,  41,  24,    5,  7,  24,  30,    11, 7,  12,  24,
            5,  1,  98,  24,    7,  3,  45,  28,    15, 2,  19,  24,    3,  13, 15,  30,
            1,  5,  107, 28,    10, 1,  46,  28,    1,  15, 22,  28,    2,  17, 14,  28,
            5,  1,  120, 30,    9,  4,  43,  26,    17, 1,  22,  28,    2,  19, 14,  28,
            3,  4,  113, 28,    3,  11, 44,  26,    17, 4,  21,  26,    9,  16, 13,  26,
            3,  5,  107, 28,    3,  13, 41,  26,    15, 5,  24,  30,    15, 10, 15,  28,
            4,  4,  116, 28,    17, 0,  42,  26,    17, 6,  22,  28,    19, 6,  16,  30,
            2,  7,  111, 28,    17, 0,  46,  28,    7,  16, 24,  30,    34, 0,  13,  24,
            4,  5,  121, 30,    4,  14, 47,  28,    11, 14, 24,  30,    16, 14, 15,  30,
            6,  4,  117, 30,    6,  14, 45,  28,    11, 16, 24,  30,    30, 2,  16,  30,
            8,  4,  106, 26,    8,  13, 47,  28,    7,  22, 24,  30,    22, 13, 15,  30,
            10, 2,  114, 28,    19, 4,  46,  28,    28, 6,  22,  28,    33, 4,  16,  30,
            8,  4,  122, 30,    22, 3,  45,  28,    8,  26, 23,  30,    12, 28, 15,  30,
            3,  10, 117, 30,    3,  23, 45,  28,    4,  31, 24,  30,    11, 31, 15,  30,
            7,  7,  116, 30,    21, 7,  45,  28,    1,  37, 23,  30,    19, 26, 15,  30,
            5,  10, 115, 30,    19, 10, 47,  28,    15, 25, 24,  30,    23, 25, 15,  30,
            13, 3,  115, 30,    2,  29, 46,  28,    42, 1,  24,  30,    23, 28, 15,  30,
            17, 0,  115, 30,    10, 23, 46,  28,    10, 35, 24,  30,    19, 35, 15,  30,
            17, 1,  115, 30,    14, 21, 46,  28,    29, 19, 24,  30,    11, 46, 15,  30,
            13, 6,  115, 30,    14, 23, 46,  28,    44, 7,  24,  30,    59, 1,  16,  30,
            12, 7,  121, 30,    12, 26, 47,  28,    39, 14, 24,  30,    22, 41, 15,  30,
            6,  14, 121, 30,    6,  34, 47,  28,    46, 10, 24,  30,    2,  64, 15,  30,
            17, 4,  122, 30,    29, 14, 46,  28,    49, 10, 24,  30,    24, 46, 15,  30,
            4,  18, 122, 30,    13, 32, 46,  28,    48, 14, 24,  30,    42, 32, 15,  30,
            20, 4,  117, 30,    40, 7,  47,  28,    43, 22, 24,  30,    10, 67, 15,  30,
            19, 6,  118, 30,    18, 31, 47,  28,    34, 34, 24,  30,    20, 61, 15,  30
          ],
      
          /**
           * The final format bits with mask (level << 3 | mask).
           *
           * @public
           * @static
           * @type {number[]}
           * @memberof ErrorCorrection
           */
          FINAL_FORMAT: [
            // L
            0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976,
            // M
            0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0,
            // Q
            0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed,
            // H
            0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b
          ],
      
          /**
           * A map of human-readable ECC levels.
           *
           * @public
           * @static
           * @type {Object.<string, number>}
           * @memberof ErrorCorrection
           */
          LEVELS: {
            L: 1,
            M: 2,
            Q: 3,
            H: 4
          }
      
        });
      
        var ErrorCorrection_1 = ErrorCorrection;
      
        /**
         * Contains Galois field information.
         *
         * @public
         * @class
         * @extends Nevis
         */
        var Galois = lite.extend(null, {
      
          /**
           * The Galois field exponent table.
           *
           * @public
           * @static
           * @type {number[]}
           * @memberof Galois
           */
          EXPONENT: [
            0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1d, 0x3a, 0x74, 0xe8, 0xcd, 0x87, 0x13, 0x26,
            0x4c, 0x98, 0x2d, 0x5a, 0xb4, 0x75, 0xea, 0xc9, 0x8f, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0,
            0x9d, 0x27, 0x4e, 0x9c, 0x25, 0x4a, 0x94, 0x35, 0x6a, 0xd4, 0xb5, 0x77, 0xee, 0xc1, 0x9f, 0x23,
            0x46, 0x8c, 0x05, 0x0a, 0x14, 0x28, 0x50, 0xa0, 0x5d, 0xba, 0x69, 0xd2, 0xb9, 0x6f, 0xde, 0xa1,
            0x5f, 0xbe, 0x61, 0xc2, 0x99, 0x2f, 0x5e, 0xbc, 0x65, 0xca, 0x89, 0x0f, 0x1e, 0x3c, 0x78, 0xf0,
            0xfd, 0xe7, 0xd3, 0xbb, 0x6b, 0xd6, 0xb1, 0x7f, 0xfe, 0xe1, 0xdf, 0xa3, 0x5b, 0xb6, 0x71, 0xe2,
            0xd9, 0xaf, 0x43, 0x86, 0x11, 0x22, 0x44, 0x88, 0x0d, 0x1a, 0x34, 0x68, 0xd0, 0xbd, 0x67, 0xce,
            0x81, 0x1f, 0x3e, 0x7c, 0xf8, 0xed, 0xc7, 0x93, 0x3b, 0x76, 0xec, 0xc5, 0x97, 0x33, 0x66, 0xcc,
            0x85, 0x17, 0x2e, 0x5c, 0xb8, 0x6d, 0xda, 0xa9, 0x4f, 0x9e, 0x21, 0x42, 0x84, 0x15, 0x2a, 0x54,
            0xa8, 0x4d, 0x9a, 0x29, 0x52, 0xa4, 0x55, 0xaa, 0x49, 0x92, 0x39, 0x72, 0xe4, 0xd5, 0xb7, 0x73,
            0xe6, 0xd1, 0xbf, 0x63, 0xc6, 0x91, 0x3f, 0x7e, 0xfc, 0xe5, 0xd7, 0xb3, 0x7b, 0xf6, 0xf1, 0xff,
            0xe3, 0xdb, 0xab, 0x4b, 0x96, 0x31, 0x62, 0xc4, 0x95, 0x37, 0x6e, 0xdc, 0xa5, 0x57, 0xae, 0x41,
            0x82, 0x19, 0x32, 0x64, 0xc8, 0x8d, 0x07, 0x0e, 0x1c, 0x38, 0x70, 0xe0, 0xdd, 0xa7, 0x53, 0xa6,
            0x51, 0xa2, 0x59, 0xb2, 0x79, 0xf2, 0xf9, 0xef, 0xc3, 0x9b, 0x2b, 0x56, 0xac, 0x45, 0x8a, 0x09,
            0x12, 0x24, 0x48, 0x90, 0x3d, 0x7a, 0xf4, 0xf5, 0xf7, 0xf3, 0xfb, 0xeb, 0xcb, 0x8b, 0x0b, 0x16,
            0x2c, 0x58, 0xb0, 0x7d, 0xfa, 0xe9, 0xcf, 0x83, 0x1b, 0x36, 0x6c, 0xd8, 0xad, 0x47, 0x8e, 0x00
          ],
      
          /**
           * The Galois field log table.
           *
           * @public
           * @static
           * @type {number[]}
           * @memberof Galois
           */
          LOG: [
            0xff, 0x00, 0x01, 0x19, 0x02, 0x32, 0x1a, 0xc6, 0x03, 0xdf, 0x33, 0xee, 0x1b, 0x68, 0xc7, 0x4b,
            0x04, 0x64, 0xe0, 0x0e, 0x34, 0x8d, 0xef, 0x81, 0x1c, 0xc1, 0x69, 0xf8, 0xc8, 0x08, 0x4c, 0x71,
            0x05, 0x8a, 0x65, 0x2f, 0xe1, 0x24, 0x0f, 0x21, 0x35, 0x93, 0x8e, 0xda, 0xf0, 0x12, 0x82, 0x45,
            0x1d, 0xb5, 0xc2, 0x7d, 0x6a, 0x27, 0xf9, 0xb9, 0xc9, 0x9a, 0x09, 0x78, 0x4d, 0xe4, 0x72, 0xa6,
            0x06, 0xbf, 0x8b, 0x62, 0x66, 0xdd, 0x30, 0xfd, 0xe2, 0x98, 0x25, 0xb3, 0x10, 0x91, 0x22, 0x88,
            0x36, 0xd0, 0x94, 0xce, 0x8f, 0x96, 0xdb, 0xbd, 0xf1, 0xd2, 0x13, 0x5c, 0x83, 0x38, 0x46, 0x40,
            0x1e, 0x42, 0xb6, 0xa3, 0xc3, 0x48, 0x7e, 0x6e, 0x6b, 0x3a, 0x28, 0x54, 0xfa, 0x85, 0xba, 0x3d,
            0xca, 0x5e, 0x9b, 0x9f, 0x0a, 0x15, 0x79, 0x2b, 0x4e, 0xd4, 0xe5, 0xac, 0x73, 0xf3, 0xa7, 0x57,
            0x07, 0x70, 0xc0, 0xf7, 0x8c, 0x80, 0x63, 0x0d, 0x67, 0x4a, 0xde, 0xed, 0x31, 0xc5, 0xfe, 0x18,
            0xe3, 0xa5, 0x99, 0x77, 0x26, 0xb8, 0xb4, 0x7c, 0x11, 0x44, 0x92, 0xd9, 0x23, 0x20, 0x89, 0x2e,
            0x37, 0x3f, 0xd1, 0x5b, 0x95, 0xbc, 0xcf, 0xcd, 0x90, 0x87, 0x97, 0xb2, 0xdc, 0xfc, 0xbe, 0x61,
            0xf2, 0x56, 0xd3, 0xab, 0x14, 0x2a, 0x5d, 0x9e, 0x84, 0x3c, 0x39, 0x53, 0x47, 0x6d, 0x41, 0xa2,
            0x1f, 0x2d, 0x43, 0xd8, 0xb7, 0x7b, 0xa4, 0x76, 0xc4, 0x17, 0x49, 0xec, 0x7f, 0x0c, 0x6f, 0xf6,
            0x6c, 0xa1, 0x3b, 0x52, 0x29, 0x9d, 0x55, 0xaa, 0xfb, 0x60, 0x86, 0xb1, 0xbb, 0xcc, 0x3e, 0x5a,
            0xcb, 0x59, 0x5f, 0xb0, 0x9c, 0xa9, 0xa0, 0x51, 0x0b, 0xf5, 0x16, 0xeb, 0x7a, 0x75, 0x2c, 0xd7,
            0x4f, 0xae, 0xd5, 0xe9, 0xe6, 0xe7, 0xad, 0xe8, 0x74, 0xd6, 0xf4, 0xea, 0xa8, 0x50, 0x58, 0xaf
          ]
      
        });
      
        var Galois_1 = Galois;
      
        /**
         * Contains version pattern information.
         *
         * @public
         * @class
         * @extends Nevis
         */
        var Version = lite.extend(null, {
      
          /**
           * The version pattern block.
           *
           * @public
           * @static
           * @type {number[]}
           * @memberof Version
           */
          BLOCK: [
            0xc94, 0x5bc, 0xa99, 0x4d3, 0xbf6, 0x762, 0x847, 0x60d, 0x928, 0xb78, 0x45d, 0xa17, 0x532,
            0x9a6, 0x683, 0x8c9, 0x7ec, 0xec4, 0x1e1, 0xfab, 0x08e, 0xc1a, 0x33f, 0xd75, 0x250, 0x9d5,
            0x6f0, 0x8ba, 0x79f, 0xb0b, 0x42e, 0xa64, 0x541, 0xc69
          ]
      
        });
      
        var Version_1 = Version;
      
        /**
         * Generates information for a QR code frame based on a specific value to be encoded.
         *
         * @param {Frame~Options} options - the options to be used
         * @public
         * @class
         * @extends Nevis
         */
        var Frame = lite.extend(function(options) {
          var dataBlock, eccBlock, index, neccBlock1, neccBlock2;
          var valueLength = options.value.length;
      
          this._badness = [];
          this._level = ErrorCorrection_1.LEVELS[options.level];
          this._polynomial = [];
          this._value = options.value;
          this._version = 0;
          this._stringBuffer = [];
      
          while (this._version < 40) {
            this._version++;
      
            index = ((this._level - 1) * 4) + ((this._version - 1) * 16);
      
            neccBlock1 = ErrorCorrection_1.BLOCKS[index++];
            neccBlock2 = ErrorCorrection_1.BLOCKS[index++];
            dataBlock = ErrorCorrection_1.BLOCKS[index++];
            eccBlock = ErrorCorrection_1.BLOCKS[index];
      
            index = (dataBlock * (neccBlock1 + neccBlock2)) + neccBlock2 - 3 + (this._version <= 9);
      
            if (valueLength <= index) {
              break;
            }
          }
      
          this._dataBlock = dataBlock;
          this._eccBlock = eccBlock;
          this._neccBlock1 = neccBlock1;
          this._neccBlock2 = neccBlock2;
      
          /**
           * The data width is based on version.
           *
           * @public
           * @type {number}
           * @memberof Frame#
           */
          // FIXME: Ensure that it fits instead of being truncated.
          var width = this.width = 17 + (4 * this._version);
      
          /**
           * The image buffer.
           *
           * @public
           * @type {number[]}
           * @memberof Frame#
           */
          this.buffer = Frame._createArray(width * width);
      
          this._ecc = Frame._createArray(dataBlock + ((dataBlock + eccBlock) * (neccBlock1 + neccBlock2)) + neccBlock2);
          this._mask = Frame._createArray(((width * (width + 1)) + 1) / 2);
      
          this._insertFinders();
          this._insertAlignments();
      
          // Insert single foreground cell.
          this.buffer[8 + (width * (width - 8))] = 1;
      
          this._insertTimingGap();
          this._reverseMask();
          this._insertTimingRowAndColumn();
          this._insertVersion();
          this._syncMask();
          this._convertBitStream(valueLength);
          this._calculatePolynomial();
          this._appendEccToData();
          this._interleaveBlocks();
          this._pack();
          this._finish();
        }, {
      
          _addAlignment: function(x, y) {
            var i;
            var buffer = this.buffer;
            var width = this.width;
      
            buffer[x + (width * y)] = 1;
      
            for (i = -2; i < 2; i++) {
              buffer[x + i + (width * (y - 2))] = 1;
              buffer[x - 2 + (width * (y + i + 1))] = 1;
              buffer[x + 2 + (width * (y + i))] = 1;
              buffer[x + i + 1 + (width * (y + 2))] = 1;
            }
      
            for (i = 0; i < 2; i++) {
              this._setMask(x - 1, y + i);
              this._setMask(x + 1, y - i);
              this._setMask(x - i, y - 1);
              this._setMask(x + i, y + 1);
            }
          },
      
          _appendData: function(data, dataLength, ecc, eccLength) {
            var bit, i, j;
            var polynomial = this._polynomial;
            var stringBuffer = this._stringBuffer;
      
            for (i = 0; i < eccLength; i++) {
              stringBuffer[ecc + i] = 0;
            }
      
            for (i = 0; i < dataLength; i++) {
              bit = Galois_1.LOG[stringBuffer[data + i] ^ stringBuffer[ecc]];
      
              if (bit !== 255) {
                for (j = 1; j < eccLength; j++) {
                  stringBuffer[ecc + j - 1] = stringBuffer[ecc + j] ^
                    Galois_1.EXPONENT[Frame._modN(bit + polynomial[eccLength - j])];
                }
              } else {
                for (j = ecc; j < ecc + eccLength; j++) {
                  stringBuffer[j] = stringBuffer[j + 1];
                }
              }
      
              stringBuffer[ecc + eccLength - 1] = bit === 255 ? 0 : Galois_1.EXPONENT[Frame._modN(bit + polynomial[0])];
            }
          },
      
          _appendEccToData: function() {
            var i;
            var data = 0;
            var dataBlock = this._dataBlock;
            var ecc = this._calculateMaxLength();
            var eccBlock = this._eccBlock;
      
            for (i = 0; i < this._neccBlock1; i++) {
              this._appendData(data, dataBlock, ecc, eccBlock);
      
              data += dataBlock;
              ecc += eccBlock;
            }
      
            for (i = 0; i < this._neccBlock2; i++) {
              this._appendData(data, dataBlock + 1, ecc, eccBlock);
      
              data += dataBlock + 1;
              ecc += eccBlock;
            }
          },
      
          _applyMask: function(mask) {
            var r3x, r3y, x, y;
            var buffer = this.buffer;
            var width = this.width;
      
            switch (mask) {
            case 0:
              for (y = 0; y < width; y++) {
                for (x = 0; x < width; x++) {
                  if (!((x + y) & 1) && !this._isMasked(x, y)) {
                    buffer[x + (y * width)] ^= 1;
                  }
                }
              }
      
              break;
            case 1:
              for (y = 0; y < width; y++) {
                for (x = 0; x < width; x++) {
                  if (!(y & 1) && !this._isMasked(x, y)) {
                    buffer[x + (y * width)] ^= 1;
                  }
                }
              }
      
              break;
            case 2:
              for (y = 0; y < width; y++) {
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
      
                  if (!r3x && !this._isMasked(x, y)) {
                    buffer[x + (y * width)] ^= 1;
                  }
                }
              }
      
              break;
            case 3:
              for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
      
                for (r3x = r3y, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
      
                  if (!r3x && !this._isMasked(x, y)) {
                    buffer[x + (y * width)] ^= 1;
                  }
                }
              }
      
              break;
            case 4:
              for (y = 0; y < width; y++) {
                for (r3x = 0, r3y = (y >> 1) & 1, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                    r3y = !r3y;
                  }
      
                  if (!r3y && !this._isMasked(x, y)) {
                    buffer[x + (y * width)] ^= 1;
                  }
                }
              }
      
              break;
            case 5:
              for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
      
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
      
                  if (!((x & y & 1) + !(!r3x | !r3y)) && !this._isMasked(x, y)) {
                    buffer[x + (y * width)] ^= 1;
                  }
                }
              }
      
              break;
            case 6:
              for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
      
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
      
                  if (!((x & y & 1) + (r3x && r3x === r3y) & 1) && !this._isMasked(x, y)) {
                    buffer[x + (y * width)] ^= 1;
                  }
                }
              }
      
              break;
            case 7:
              for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
      
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
      
                  if (!((r3x && r3x === r3y) + (x + y & 1) & 1) && !this._isMasked(x, y)) {
                    buffer[x + (y * width)] ^= 1;
                  }
                }
              }
      
              break;
            }
          },
      
          _calculateMaxLength: function() {
            return (this._dataBlock * (this._neccBlock1 + this._neccBlock2)) + this._neccBlock2;
          },
      
          _calculatePolynomial: function() {
            var i, j;
            var eccBlock = this._eccBlock;
            var polynomial = this._polynomial;
      
            polynomial[0] = 1;
      
            for (i = 0; i < eccBlock; i++) {
              polynomial[i + 1] = 1;
      
              for (j = i; j > 0; j--) {
                polynomial[j] = polynomial[j] ? polynomial[j - 1] ^
                  Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[j]] + i)] : polynomial[j - 1];
              }
      
              polynomial[0] = Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[0]] + i)];
            }
      
            // Use logs for generator polynomial to save calculation step.
            for (i = 0; i <= eccBlock; i++) {
              polynomial[i] = Galois_1.LOG[polynomial[i]];
            }
          },
      
          _checkBadness: function() {
            var b, b1, h, x, y;
            var bad = 0;
            var badness = this._badness;
            var buffer = this.buffer;
            var width = this.width;
      
            // Blocks of same colour.
            for (y = 0; y < width - 1; y++) {
              for (x = 0; x < width - 1; x++) {
                // All foreground colour.
                if ((buffer[x + (width * y)] &&
                  buffer[x + 1 + (width * y)] &&
                  buffer[x + (width * (y + 1))] &&
                  buffer[x + 1 + (width * (y + 1))]) ||
                  // All background colour.
                  !(buffer[x + (width * y)] ||
                  buffer[x + 1 + (width * y)] ||
                  buffer[x + (width * (y + 1))] ||
                  buffer[x + 1 + (width * (y + 1))])) {
                  bad += Frame.N2;
                }
              }
            }
      
            var bw = 0;
      
            // X runs.
            for (y = 0; y < width; y++) {
              h = 0;
      
              badness[0] = 0;
      
              for (b = 0, x = 0; x < width; x++) {
                b1 = buffer[x + (width * y)];
      
                if (b === b1) {
                  badness[h]++;
                } else {
                  badness[++h] = 1;
                }
      
                b = b1;
                bw += b ? 1 : -1;
              }
      
              bad += this._getBadness(h);
            }
      
            if (bw < 0) {
              bw = -bw;
            }
      
            var count = 0;
            var big = bw;
            big += big << 2;
            big <<= 1;
      
            while (big > width * width) {
              big -= width * width;
              count++;
            }
      
            bad += count * Frame.N4;
      
            // Y runs.
            for (x = 0; x < width; x++) {
              h = 0;
      
              badness[0] = 0;
      
              for (b = 0, y = 0; y < width; y++) {
                b1 = buffer[x + (width * y)];
      
                if (b === b1) {
                  badness[h]++;
                } else {
                  badness[++h] = 1;
                }
      
                b = b1;
              }
      
              bad += this._getBadness(h);
            }
      
            return bad;
          },
      
          _convertBitStream: function(length) {
            var bit, i;
            var ecc = this._ecc;
            var version = this._version;
      
            // Convert string to bit stream. 8-bit data to QR-coded 8-bit data (numeric, alphanumeric, or kanji not supported).
            for (i = 0; i < length; i++) {
              ecc[i] = this._value.charCodeAt(i);
            }
      
            var stringBuffer = this._stringBuffer = ecc.slice();
            var maxLength = this._calculateMaxLength();
      
            if (length >= maxLength - 2) {
              length = maxLength - 2;
      
              if (version > 9) {
                length--;
              }
            }
      
            // Shift and re-pack to insert length prefix.
            var index = length;
      
            if (version > 9) {
              stringBuffer[index + 2] = 0;
              stringBuffer[index + 3] = 0;
      
              while (index--) {
                bit = stringBuffer[index];
      
                stringBuffer[index + 3] |= 255 & (bit << 4);
                stringBuffer[index + 2] = bit >> 4;
              }
      
              stringBuffer[2] |= 255 & (length << 4);
              stringBuffer[1] = length >> 4;
              stringBuffer[0] = 0x40 | (length >> 12);
            } else {
              stringBuffer[index + 1] = 0;
              stringBuffer[index + 2] = 0;
      
              while (index--) {
                bit = stringBuffer[index];
      
                stringBuffer[index + 2] |= 255 & (bit << 4);
                stringBuffer[index + 1] = bit >> 4;
              }
      
              stringBuffer[1] |= 255 & (length << 4);
              stringBuffer[0] = 0x40 | (length >> 4);
            }
      
            // Fill to end with pad pattern.
            index = length + 3 - (version < 10);
      
            while (index < maxLength) {
              stringBuffer[index++] = 0xec;
              stringBuffer[index++] = 0x11;
            }
          },
      
          _getBadness: function(length) {
            var i;
            var badRuns = 0;
            var badness = this._badness;
      
            for (i = 0; i <= length; i++) {
              if (badness[i] >= 5) {
                badRuns += Frame.N1 + badness[i] - 5;
              }
            }
      
            // FBFFFBF as in finder.
            for (i = 3; i < length - 1; i += 2) {
              if (badness[i - 2] === badness[i + 2] &&
                badness[i + 2] === badness[i - 1] &&
                badness[i - 1] === badness[i + 1] &&
                badness[i - 1] * 3 === badness[i] &&
                // Background around the foreground pattern? Not part of the specs.
                (badness[i - 3] === 0 || i + 3 > length ||
                badness[i - 3] * 3 >= badness[i] * 4 ||
                badness[i + 3] * 3 >= badness[i] * 4)) {
                badRuns += Frame.N3;
              }
            }
      
            return badRuns;
          },
      
          _finish: function() {
            // Save pre-mask copy of frame.
            this._stringBuffer = this.buffer.slice();
      
            var currentMask, i;
            var bit = 0;
            var mask = 30000;
      
            /*
             * Using for instead of while since in original Arduino code if an early mask was "good enough" it wouldn't try for
             * a better one since they get more complex and take longer.
             */
            for (i = 0; i < 8; i++) {
              // Returns foreground-background imbalance.
              this._applyMask(i);
      
              currentMask = this._checkBadness();
      
              // Is current mask better than previous best?
              if (currentMask < mask) {
                mask = currentMask;
                bit = i;
              }
      
              // Don't increment "i" to a void redoing mask.
              if (bit === 7) {
                break;
              }
      
              // Reset for next pass.
              this.buffer = this._stringBuffer.slice();
            }
      
            // Redo best mask as none were "good enough" (i.e. last wasn't bit).
            if (bit !== i) {
              this._applyMask(bit);
            }
      
            // Add in final mask/ECC level bytes.
            mask = ErrorCorrection_1.FINAL_FORMAT[bit + (this._level - 1 << 3)];
      
            var buffer = this.buffer;
            var width = this.width;
      
            // Low byte.
            for (i = 0; i < 8; i++, mask >>= 1) {
              if (mask & 1) {
                buffer[width - 1 - i + (width * 8)] = 1;
      
                if (i < 6) {
                  buffer[8 + (width * i)] = 1;
                } else {
                  buffer[8 + (width * (i + 1))] = 1;
                }
              }
            }
      
            // High byte.
            for (i = 0; i < 7; i++, mask >>= 1) {
              if (mask & 1) {
                buffer[8 + (width * (width - 7 + i))] = 1;
      
                if (i) {
                  buffer[6 - i + (width * 8)] = 1;
                } else {
                  buffer[7 + (width * 8)] = 1;
                }
              }
            }
          },
      
          _interleaveBlocks: function() {
            var i, j;
            var dataBlock = this._dataBlock;
            var ecc = this._ecc;
            var eccBlock = this._eccBlock;
            var k = 0;
            var maxLength = this._calculateMaxLength();
            var neccBlock1 = this._neccBlock1;
            var neccBlock2 = this._neccBlock2;
            var stringBuffer = this._stringBuffer;
      
            for (i = 0; i < dataBlock; i++) {
              for (j = 0; j < neccBlock1; j++) {
                ecc[k++] = stringBuffer[i + (j * dataBlock)];
              }
      
              for (j = 0; j < neccBlock2; j++) {
                ecc[k++] = stringBuffer[(neccBlock1 * dataBlock) + i + (j * (dataBlock + 1))];
              }
            }
      
            for (j = 0; j < neccBlock2; j++) {
              ecc[k++] = stringBuffer[(neccBlock1 * dataBlock) + i + (j * (dataBlock + 1))];
            }
      
            for (i = 0; i < eccBlock; i++) {
              for (j = 0; j < neccBlock1 + neccBlock2; j++) {
                ecc[k++] = stringBuffer[maxLength + i + (j * eccBlock)];
              }
            }
      
            this._stringBuffer = ecc;
          },
      
          _insertAlignments: function() {
            var i, x, y;
            var version = this._version;
            var width = this.width;
      
            if (version > 1) {
              i = Alignment_1.BLOCK[version];
              y = width - 7;
      
              for (;;) {
                x = width - 7;
      
                while (x > i - 3) {
                  this._addAlignment(x, y);
      
                  if (x < i) {
                    break;
                  }
      
                  x -= i;
                }
      
                if (y <= i + 9) {
                  break;
                }
      
                y -= i;
      
                this._addAlignment(6, y);
                this._addAlignment(y, 6);
              }
            }
          },
      
          _insertFinders: function() {
            var i, j, x, y;
            var buffer = this.buffer;
            var width = this.width;
      
            for (i = 0; i < 3; i++) {
              j = 0;
              y = 0;
      
              if (i === 1) {
                j = width - 7;
              }
              if (i === 2) {
                y = width - 7;
              }
      
              buffer[y + 3 + (width * (j + 3))] = 1;
      
              for (x = 0; x < 6; x++) {
                buffer[y + x + (width * j)] = 1;
                buffer[y + (width * (j + x + 1))] = 1;
                buffer[y + 6 + (width * (j + x))] = 1;
                buffer[y + x + 1 + (width * (j + 6))] = 1;
              }
      
              for (x = 1; x < 5; x++) {
                this._setMask(y + x, j + 1);
                this._setMask(y + 1, j + x + 1);
                this._setMask(y + 5, j + x);
                this._setMask(y + x + 1, j + 5);
              }
      
              for (x = 2; x < 4; x++) {
                buffer[y + x + (width * (j + 2))] = 1;
                buffer[y + 2 + (width * (j + x + 1))] = 1;
                buffer[y + 4 + (width * (j + x))] = 1;
                buffer[y + x + 1 + (width * (j + 4))] = 1;
              }
            }
          },
      
          _insertTimingGap: function() {
            var x, y;
            var width = this.width;
      
            for (y = 0; y < 7; y++) {
              this._setMask(7, y);
              this._setMask(width - 8, y);
              this._setMask(7, y + width - 7);
            }
      
            for (x = 0; x < 8; x++) {
              this._setMask(x, 7);
              this._setMask(x + width - 8, 7);
              this._setMask(x, width - 8);
            }
          },
      
          _insertTimingRowAndColumn: function() {
            var x;
            var buffer = this.buffer;
            var width = this.width;
      
            for (x = 0; x < width - 14; x++) {
              if (x & 1) {
                this._setMask(8 + x, 6);
                this._setMask(6, 8 + x);
              } else {
                buffer[8 + x + (width * 6)] = 1;
                buffer[6 + (width * (8 + x))] = 1;
              }
            }
          },
      
          _insertVersion: function() {
            var i, j, x, y;
            var buffer = this.buffer;
            var version = this._version;
            var width = this.width;
      
            if (version > 6) {
              i = Version_1.BLOCK[version - 7];
              j = 17;
      
              for (x = 0; x < 6; x++) {
                for (y = 0; y < 3; y++, j--) {
                  if (1 & (j > 11 ? version >> j - 12 : i >> j)) {
                    buffer[5 - x + (width * (2 - y + width - 11))] = 1;
                    buffer[2 - y + width - 11 + (width * (5 - x))] = 1;
                  } else {
                    this._setMask(5 - x, 2 - y + width - 11);
                    this._setMask(2 - y + width - 11, 5 - x);
                  }
                }
              }
            }
          },
      
          _isMasked: function(x, y) {
            var bit = Frame._getMaskBit(x, y);
      
            return this._mask[bit] === 1;
          },
      
          _pack: function() {
            var bit, i, j;
            var k = 1;
            var v = 1;
            var width = this.width;
            var x = width - 1;
            var y = width - 1;
      
            // Interleaved data and ECC codes.
            var length = ((this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2)) + this._neccBlock2;
      
            for (i = 0; i < length; i++) {
              bit = this._stringBuffer[i];
      
              for (j = 0; j < 8; j++, bit <<= 1) {
                if (0x80 & bit) {
                  this.buffer[x + (width * y)] = 1;
                }
      
                // Find next fill position.
                do {
                  if (v) {
                    x--;
                  } else {
                    x++;
      
                    if (k) {
                      if (y !== 0) {
                        y--;
                      } else {
                        x -= 2;
                        k = !k;
      
                        if (x === 6) {
                          x--;
                          y = 9;
                        }
                      }
                    } else if (y !== width - 1) {
                      y++;
                    } else {
                      x -= 2;
                      k = !k;
      
                      if (x === 6) {
                        x--;
                        y -= 8;
                      }
                    }
                  }
      
                  v = !v;
                } while (this._isMasked(x, y));
              }
            }
          },
      
          _reverseMask: function() {
            var x, y;
            var width = this.width;
      
            for (x = 0; x < 9; x++) {
              this._setMask(x, 8);
            }
      
            for (x = 0; x < 8; x++) {
              this._setMask(x + width - 8, 8);
              this._setMask(8, x);
            }
      
            for (y = 0; y < 7; y++) {
              this._setMask(8, y + width - 7);
            }
          },
      
          _setMask: function(x, y) {
            var bit = Frame._getMaskBit(x, y);
      
            this._mask[bit] = 1;
          },
      
          _syncMask: function() {
            var x, y;
            var width = this.width;
      
            for (y = 0; y < width; y++) {
              for (x = 0; x <= y; x++) {
                if (this.buffer[x + (width * y)]) {
                  this._setMask(x, y);
                }
              }
            }
          }
      
        }, {
      
          _createArray: function(length) {
            var i;
            var array = [];
      
            for (i = 0; i < length; i++) {
              array[i] = 0;
            }
      
            return array;
          },
      
          _getMaskBit: function(x, y) {
            var bit;
      
            if (x > y) {
              bit = x;
              x = y;
              y = bit;
            }
      
            bit = y;
            bit += y * y;
            bit >>= 1;
            bit += x;
      
            return bit;
          },
      
          _modN: function(x) {
            while (x >= 255) {
              x -= 255;
              x = (x >> 8) + (x & 255);
            }
      
            return x;
          },
      
          // *Badness* coefficients.
          N1: 3,
          N2: 3,
          N3: 40,
          N4: 10
      
        });
      
        var Frame_1 = Frame;
      
        /**
         * The options used by {@link Frame}.
         *
         * @typedef {Object} Frame~Options
         * @property {string} level - The ECC level to be used.
         * @property {string} value - The value to be encoded.
         */
      
        /**
         * An implementation of {@link Renderer} for working with <code>img</code> elements.
         *
         * This depends on {@link CanvasRenderer} being executed first as this implementation simply applies the data URL from
         * the rendered <code>canvas</code> element as the <code>src</code> for the <code>img</code> element being rendered.
         *
         * @public
         * @class
         * @extends Renderer
         */
        var ImageRenderer = Renderer_1.extend({
      
          /**
           * @override
           */
          draw: function() {
            this.element.src = this.qrious.toDataURL();
          },
      
          /**
           * @override
           */
          reset: function() {
            this.element.src = '';
          },
      
          /**
           * @override
           */
          resize: function() {
            var element = this.element;
      
            element.width = element.height = this.qrious.size;
          }
      
        });
      
        var ImageRenderer_1 = ImageRenderer;
      
        /**
         * Defines an available option while also configuring how values are applied to the target object.
         *
         * Optionally, a default value can be specified as well a value transformer for greater control over how the option
         * value is applied.
         *
         * If no value transformer is specified, then any specified option will be applied directly. All values are maintained
         * on the target object itself as a field using the option name prefixed with a single underscore.
         *
         * When an option is specified as modifiable, the {@link OptionManager} will be required to include a setter for the
         * property that is defined on the target object that uses the option name.
         *
         * @param {string} name - the name to be used
         * @param {boolean} [modifiable] - <code>true</code> if the property defined on target objects should include a setter;
         * otherwise <code>false</code>
         * @param {*} [defaultValue] - the default value to be used
         * @param {Option~ValueTransformer} [valueTransformer] - the value transformer to be used
         * @public
         * @class
         * @extends Nevis
         */
        var Option = lite.extend(function(name, modifiable, defaultValue, valueTransformer) {
          /**
           * The name for this {@link Option}.
           *
           * @public
           * @type {string}
           * @memberof Option#
           */
          this.name = name;
      
          /**
           * Whether a setter should be included on the property defined on target objects for this {@link Option}.
           *
           * @public
           * @type {boolean}
           * @memberof Option#
           */
          this.modifiable = Boolean(modifiable);
      
          /**
           * The default value for this {@link Option}.
           *
           * @public
           * @type {*}
           * @memberof Option#
           */
          this.defaultValue = defaultValue;
      
          this._valueTransformer = valueTransformer;
        }, {
      
          /**
           * Transforms the specified <code>value</code> so that it can be applied for this {@link Option}.
           *
           * If a value transformer has been specified for this {@link Option}, it will be called upon to transform
           * <code>value</code>. Otherwise, <code>value</code> will be returned directly.
           *
           * @param {*} value - the value to be transformed
           * @return {*} The transformed value or <code>value</code> if no value transformer is specified.
           * @public
           * @memberof Option#
           */
          transform: function(value) {
            var transformer = this._valueTransformer;
            if (typeof transformer === 'function') {
              return transformer(value, this);
            }
      
            return value;
          }
      
        });
      
        var Option_1 = Option;
      
        /**
         * Returns a transformed value for the specified <code>value</code> to be applied for the <code>option</code> provided.
         *
         * @callback Option~ValueTransformer
         * @param {*} value - the value to be transformed
         * @param {Option} option - the {@link Option} for which <code>value</code> is being transformed
         * @return {*} The transform value.
         */
      
        /**
         * Contains utility methods that are useful throughout the library.
         *
         * @public
         * @class
         * @extends Nevis
         */
        var Utilities = lite.extend(null, {
      
          /**
           * Returns the absolute value of a given number.
           *
           * This method is simply a convenient shorthand for <code>Math.abs</code> while ensuring that nulls are returned as
           * <code>null</code> instead of zero.
           *
           * @param {number} value - the number whose absolute value is to be returned
           * @return {number} The absolute value of <code>value</code> or <code>null</code> if <code>value</code> is
           * <code>null</code>.
           * @public
           * @static
           * @memberof Utilities
           */
          abs: function(value) {
            return value != null ? Math.abs(value) : null;
          },
      
          /**
           * Returns whether the specified <code>object</code> has a property with the specified <code>name</code> as an own
           * (not inherited) property.
           *
           * @param {Object} object - the object on which the property is to be checked
           * @param {string} name - the name of the property to be checked
           * @return {boolean} <code>true</code> if <code>object</code> has an own property with <code>name</code>.
           * @public
           * @static
           * @memberof Utilities
           */
          hasOwn: function(object, name) {
            return Object.prototype.hasOwnProperty.call(object, name);
          },
      
          /**
           * A non-operation method that does absolutely nothing.
           *
           * @return {void}
           * @public
           * @static
           * @memberof Utilities
           */
          noop: function() {},
      
          /**
           * Transforms the specified <code>string</code> to upper case while remaining null-safe.
           *
           * @param {string} string - the string to be transformed to upper case
           * @return {string} <code>string</code> transformed to upper case if <code>string</code> is not <code>null</code>.
           * @public
           * @static
           * @memberof Utilities
           */
          toUpperCase: function(string) {
            return string != null ? string.toUpperCase() : null;
          }
      
        });
      
        var Utilities_1 = Utilities;
      
        /**
         * Manages multiple {@link Option} instances that are intended to be used by multiple implementations.
         *
         * Although the option definitions are shared between targets, the values are maintained on the targets themselves.
         *
         * @param {Option[]} options - the options to be used
         * @public
         * @class
         * @extends Nevis
         */
        var OptionManager = lite.extend(function(options) {
          /**
           * The available options for this {@link OptionManager}.
           *
           * @public
           * @type {Object.<string, Option>}
           * @memberof OptionManager#
           */
          this.options = {};
      
          options.forEach(function(option) {
            this.options[option.name] = option;
          }, this);
        }, {
      
          /**
           * Returns whether an option with the specified <code>name</code> is available.
           *
           * @param {string} name - the name of the {@link Option} whose existence is to be checked
           * @return {boolean} <code>true</code> if an {@link Option} exists with <code>name</code>; otherwise
           * <code>false</code>.
           * @public
           * @memberof OptionManager#
           */
          exists: function(name) {
            return this.options[name] != null;
          },
      
          /**
           * Returns the value of the option with the specified <code>name</code> on the <code>target</code> object provided.
           *
           * @param {string} name - the name of the {@link Option} whose value on <code>target</code> is to be returned
           * @param {Object} target - the object from which the value of the named {@link Option} is to be returned
           * @return {*} The value of the {@link Option} with <code>name</code> on <code>target</code>.
           * @public
           * @memberof OptionManager#
           */
          get: function(name, target) {
            return OptionManager._get(this.options[name], target);
          },
      
          /**
           * Returns a copy of all of the available options on the <code>target</code> object provided.
           *
           * @param {Object} target - the object from which the option name/value pairs are to be returned
           * @return {Object.<string, *>} A hash containing the name/value pairs of all options on <code>target</code>.
           * @public
           * @memberof OptionManager#
           */
          getAll: function(target) {
            var name;
            var options = this.options;
            var result = {};
      
            for (name in options) {
              if (Utilities_1.hasOwn(options, name)) {
                result[name] = OptionManager._get(options[name], target);
              }
            }
      
            return result;
          },
      
          /**
           * Initializes the available options for the <code>target</code> object provided and then applies the initial values
           * within the speciifed <code>options</code>.
           *
           * This method will throw an error if any of the names within <code>options</code> does not match an available option.
           *
           * This involves setting the default values and defining properties for all of the available options on
           * <code>target</code> before finally calling {@link OptionMananger#setAll} with <code>options</code> and
           * <code>target</code>. Any options that are configured to be modifiable will have a setter included in their defined
           * property that will allow its corresponding value to be modified.
           *
           * If a change handler is specified, it will be called whenever the value changes on <code>target</code> for a
           * modifiable option, but only when done so via the defined property's setter.
           *
           * @param {Object.<string, *>} options - the name/value pairs of the initial options to be set
           * @param {Object} target - the object on which the options are to be initialized
           * @param {Function} [changeHandler] - the function to be called whenever the value of an modifiable option changes on
           * <code>target</code>
           * @return {void}
           * @throws {Error} If <code>options</code> contains an invalid option name.
           * @public
           * @memberof OptionManager#
           */
          init: function(options, target, changeHandler) {
            if (typeof changeHandler !== 'function') {
              changeHandler = Utilities_1.noop;
            }
      
            var name, option;
      
            for (name in this.options) {
              if (Utilities_1.hasOwn(this.options, name)) {
                option = this.options[name];
      
                OptionManager._set(option, option.defaultValue, target);
                OptionManager._createAccessor(option, target, changeHandler);
              }
            }
      
            this._setAll(options, target, true);
          },
      
          /**
           * Sets the value of the option with the specified <code>name</code> on the <code>target</code> object provided to
           * <code>value</code>.
           *
           * This method will throw an error if <code>name</code> does not match an available option or matches an option that
           * cannot be modified.
           *
           * If <code>value</code> is <code>null</code> and the {@link Option} has a default value configured, then that default
           * value will be used instead. If the {@link Option} also has a value transformer configured, it will be used to
           * transform whichever value was determined to be used.
           *
           * This method returns whether the value of the underlying field on <code>target</code> was changed as a result.
           *
           * @param {string} name - the name of the {@link Option} whose value is to be set
           * @param {*} value - the value to be set for the named {@link Option} on <code>target</code>
           * @param {Object} target - the object on which <code>value</code> is to be set for the named {@link Option}
           * @return {boolean} <code>true</code> if the underlying field on <code>target</code> was changed; otherwise
           * <code>false</code>.
           * @throws {Error} If <code>name</code> is invalid or is for an option that cannot be modified.
           * @public
           * @memberof OptionManager#
           */
          set: function(name, value, target) {
            return this._set(name, value, target);
          },
      
          /**
           * Sets all of the specified <code>options</code> on the <code>target</code> object provided to their corresponding
           * values.
           *
           * This method will throw an error if any of the names within <code>options</code> does not match an available option
           * or matches an option that cannot be modified.
           *
           * If any value within <code>options</code> is <code>null</code> and the corresponding {@link Option} has a default
           * value configured, then that default value will be used instead. If an {@link Option} also has a value transformer
           * configured, it will be used to transform whichever value was determined to be used.
           *
           * This method returns whether the value for any of the underlying fields on <code>target</code> were changed as a
           * result.
           *
           * @param {Object.<string, *>} options - the name/value pairs of options to be set
           * @param {Object} target - the object on which the options are to be set
           * @return {boolean} <code>true</code> if any of the underlying fields on <code>target</code> were changed; otherwise
           * <code>false</code>.
           * @throws {Error} If <code>options</code> contains an invalid option name or an option that cannot be modiifed.
           * @public
           * @memberof OptionManager#
           */
          setAll: function(options, target) {
            return this._setAll(options, target);
          },
      
          _set: function(name, value, target, allowUnmodifiable) {
            var option = this.options[name];
            if (!option) {
              throw new Error('Invalid option: ' + name);
            }
            if (!option.modifiable && !allowUnmodifiable) {
              throw new Error('Option cannot be modified: ' + name);
            }
      
            return OptionManager._set(option, value, target);
          },
      
          _setAll: function(options, target, allowUnmodifiable) {
            if (!options) {
              return false;
            }
      
            var name;
            var changed = false;
      
            for (name in options) {
              if (Utilities_1.hasOwn(options, name) && this._set(name, options[name], target, allowUnmodifiable)) {
                changed = true;
              }
            }
      
            return changed;
          }
      
        }, {
      
          _createAccessor: function(option, target, changeHandler) {
            var descriptor = {
              get: function() {
                return OptionManager._get(option, target);
              }
            };
      
            if (option.modifiable) {
              descriptor.set = function(value) {
                if (OptionManager._set(option, value, target)) {
                  changeHandler(value, option);
                }
              };
            }
      
            Object.defineProperty(target, option.name, descriptor);
          },
      
          _get: function(option, target) {
            return target['_' + option.name];
          },
      
          _set: function(option, value, target) {
            var fieldName = '_' + option.name;
            var oldValue = target[fieldName];
            var newValue = option.transform(value != null ? value : option.defaultValue);
      
            target[fieldName] = newValue;
      
            return newValue !== oldValue;
          }
      
        });
      
        var OptionManager_1 = OptionManager;
      
        /**
         * Called whenever the value of a modifiable {@link Option} is changed on a target object via the defined property's
         * setter.
         *
         * @callback OptionManager~ChangeHandler
         * @param {*} value - the new value for <code>option</code> on the target object
         * @param {Option} option - the modifable {@link Option} whose value has changed on the target object.
         * @return {void}
         */
      
        /**
         * A basic manager for {@link Service} implementations that are mapped to simple names.
         *
         * @public
         * @class
         * @extends Nevis
         */
        var ServiceManager = lite.extend(function() {
          this._services = {};
        }, {
      
          /**
           * Returns the {@link Service} being managed with the specified <code>name</code>.
           *
           * @param {string} name - the name of the {@link Service} to be returned
           * @return {Service} The {@link Service} is being managed with <code>name</code>.
           * @throws {Error} If no {@link Service} is being managed with <code>name</code>.
           * @public
           * @memberof ServiceManager#
           */
          getService: function(name) {
            var service = this._services[name];
            if (!service) {
              throw new Error('Service is not being managed with name: ' + name);
            }
      
            return service;
          },
      
          /**
           * Sets the {@link Service} implementation to be managed for the specified <code>name</code> to the
           * <code>service</code> provided.
           *
           * @param {string} name - the name of the {@link Service} to be managed with <code>name</code>
           * @param {Service} service - the {@link Service} implementation to be managed
           * @return {void}
           * @throws {Error} If a {@link Service} is already being managed with the same <code>name</code>.
           * @public
           * @memberof ServiceManager#
           */
          setService: function(name, service) {
            if (this._services[name]) {
              throw new Error('Service is already managed with name: ' + name);
            }
      
            if (service) {
              this._services[name] = service;
            }
          }
      
        });
      
        var ServiceManager_1 = ServiceManager;
      
        var optionManager = new OptionManager_1([
          new Option_1('background', true, 'white'),
          new Option_1('backgroundAlpha', true, 1, Utilities_1.abs),
          new Option_1('element'),
          new Option_1('foreground', true, 'black'),
          new Option_1('foregroundAlpha', true, 1, Utilities_1.abs),
          new Option_1('level', true, 'L', Utilities_1.toUpperCase),
          new Option_1('mime', true, 'image/png'),
          new Option_1('padding', true, null, Utilities_1.abs),
          new Option_1('size', true, 100, Utilities_1.abs),
          new Option_1('value', true, '')
        ]);
        var serviceManager = new ServiceManager_1();
      
        /**
         * Enables configuration of a QR code generator which uses HTML5 <code>canvas</code> for rendering.
         *
         * @param {QRious~Options} [options] - the options to be used
         * @throws {Error} If any <code>options</code> are invalid.
         * @public
         * @class
         * @extends Nevis
         */
        var QRious = lite.extend(function(options) {
          optionManager.init(options, this, this.update.bind(this));
      
          var element = optionManager.get('element', this);
          var elementService = serviceManager.getService('element');
          var canvas = element && elementService.isCanvas(element) ? element : elementService.createCanvas();
          var image = element && elementService.isImage(element) ? element : elementService.createImage();
      
          this._canvasRenderer = new CanvasRenderer_1(this, canvas, true);
          this._imageRenderer = new ImageRenderer_1(this, image, image === element);
      
          this.update();
        }, {
      
          /**
           * Returns all of the options configured for this {@link QRious}.
           *
           * Any changes made to the returned object will not be reflected in the options themselves or their corresponding
           * underlying fields.
           *
           * @return {Object.<string, *>} A copy of the applied options.
           * @public
           * @memberof QRious#
           */
          get: function() {
            return optionManager.getAll(this);
          },
      
          /**
           * Sets all of the specified <code>options</code> and automatically updates this {@link QRious} if any of the
           * underlying fields are changed as a result.
           *
           * This is the preferred method for updating multiple options at one time to avoid unnecessary updates between
           * changes.
           *
           * @param {QRious~Options} options - the options to be set
           * @return {void}
           * @throws {Error} If any <code>options</code> are invalid or cannot be modified.
           * @public
           * @memberof QRious#
           */
          set: function(options) {
            if (optionManager.setAll(options, this)) {
              this.update();
            }
          },
      
          /**
           * Returns the image data URI for the generated QR code using the <code>mime</code> provided.
           *
           * @param {string} [mime] - the MIME type for the image
           * @return {string} The image data URI for the QR code.
           * @public
           * @memberof QRious#
           */
          toDataURL: function(mime) {
            return this.canvas.toDataURL(mime || this.mime);
          },
      
          /**
           * Updates this {@link QRious} by generating a new {@link Frame} and re-rendering the QR code.
           *
           * @return {void}
           * @protected
           * @memberof QRious#
           */
          update: function() {
            var frame = new Frame_1({
              level: this.level,
              value: this.value
            });
      
            this._canvasRenderer.render(frame);
            this._imageRenderer.render(frame);
          }
      
        }, {
      
          /**
           * Configures the <code>service</code> provided to be used by all {@link QRious} instances.
           *
           * @param {Service} service - the {@link Service} to be configured
           * @return {void}
           * @throws {Error} If a {@link Service} has already been configured with the same name.
           * @public
           * @static
           * @memberof QRious
           */
          use: function(service) {
            serviceManager.setService(service.getName(), service);
          }
      
        });
      
        Object.defineProperties(QRious.prototype, {
      
          canvas: {
            /**
             * Returns the <code>canvas</code> element being used to render the QR code for this {@link QRious}.
             *
             * @return {*} The <code>canvas</code> element.
             * @public
             * @memberof QRious#
             * @alias canvas
             */
            get: function() {
              return this._canvasRenderer.getElement();
            }
          },
      
          image: {
            /**
             * Returns the <code>img</code> element being used to render the QR code for this {@link QRious}.
             *
             * @return {*} The <code>img</code> element.
             * @public
             * @memberof QRious#
             * @alias image
             */
            get: function() {
              return this._imageRenderer.getElement();
            }
          }
      
        });
      
        var QRious_1$2 = QRious;
      
        /**
         * The options used by {@link QRious}.
         *
         * @typedef {Object} QRious~Options
         * @property {string} [background="white"] - The background color to be applied to the QR code.
         * @property {number} [backgroundAlpha=1] - The background alpha to be applied to the QR code.
         * @property {*} [element] - The element to be used to render the QR code which may either be an <code>canvas</code> or
         * <code>img</code>. The element(s) will be created if needed.
         * @property {string} [foreground="black"] - The foreground color to be applied to the QR code.
         * @property {number} [foregroundAlpha=1] - The foreground alpha to be applied to the QR code.
         * @property {string} [level="L"] - The error correction level to be applied to the QR code.
         * @property {string} [mime="image/png"] - The MIME type to be used to render the image for the QR code.
         * @property {number} [padding] - The padding for the QR code in pixels.
         * @property {number} [size=100] - The size of the QR code in pixels.
         * @property {string} [value=""] - The value to be encoded within the QR code.
         */
      
        var index = QRious_1$2;
      
        /**
         * Defines a service contract that must be met by all implementations.
         *
         * @public
         * @class
         * @extends Nevis
         */
        var Service = lite.extend({
      
          /**
           * Returns the name of this {@link Service}.
           *
           * @return {string} The service name.
           * @public
           * @abstract
           * @memberof Service#
           */
          getName: function() {}
      
        });
      
        var Service_1 = Service;
      
        /**
         * A service for working with elements.
         *
         * @public
         * @class
         * @extends Service
         */
        var ElementService = Service_1.extend({
      
          /**
           * Creates an instance of a canvas element.
           *
           * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
           *
           * @return {*} The newly created canvas element.
           * @public
           * @abstract
           * @memberof ElementService#
           */
          createCanvas: function() {},
      
          /**
           * Creates an instance of a image element.
           *
           * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
           *
           * @return {*} The newly created image element.
           * @public
           * @abstract
           * @memberof ElementService#
           */
          createImage: function() {},
      
          /**
           * @override
           */
          getName: function() {
            return 'element';
          },
      
          /**
           * Returns whether the specified <code>element</code> is a canvas.
           *
           * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
           *
           * @param {*} element - the element to be checked
           * @return {boolean} <code>true</code> if <code>element</code> is a canvas; otherwise <code>false</code>.
           * @public
           * @abstract
           * @memberof ElementService#
           */
          isCanvas: function(element) {},
      
          /**
           * Returns whether the specified <code>element</code> is an image.
           *
           * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
           *
           * @param {*} element - the element to be checked
           * @return {boolean} <code>true</code> if <code>element</code> is an image; otherwise <code>false</code>.
           * @public
           * @abstract
           * @memberof ElementService#
           */
          isImage: function(element) {}
      
        });
      
        var ElementService_1 = ElementService;
      
        /**
         * An implementation of {@link ElementService} intended for use within a browser environment.
         *
         * @public
         * @class
         * @extends ElementService
         */
        var BrowserElementService = ElementService_1.extend({
      
          /**
           * @override
           */
          createCanvas: function() {
            return document.createElement('canvas');
          },
      
          /**
           * @override
           */
          createImage: function() {
            return document.createElement('img');
          },
      
          /**
           * @override
           */
          isCanvas: function(element) {
            return element instanceof HTMLCanvasElement;
          },
      
          /**
           * @override
           */
          isImage: function(element) {
            return element instanceof HTMLImageElement;
          }
      
        });
      
        var BrowserElementService_1 = BrowserElementService;
      
        index.use(new BrowserElementService_1());
      
        var QRious_1 = index;
      
        return QRious_1;
      
      })));
    });

    /* node_modules/svelte-qrcode/src/lib/index.svelte generated by Svelte v3.52.0 */
    const file$4 = "node_modules/svelte-qrcode/src/lib/index.svelte";

    function create_fragment$5(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*image*/ ctx[2])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*value*/ ctx[0]);
    			attr_dev(img, "class", /*className*/ ctx[1]);
    			add_location(img, file$4, 41, 0, 681);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*image*/ 4 && !src_url_equal(img.src, img_src_value = /*image*/ ctx[2])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*value*/ 1) {
    				attr_dev(img, "alt", /*value*/ ctx[0]);
    			}

    			if (dirty & /*className*/ 2) {
    				attr_dev(img, "class", /*className*/ ctx[1]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Lib', slots, []);
    	const QRcode = new qrcode();
    	let { errorCorrection = "L" } = $$props;
    	let { background = "#fff" } = $$props;
    	let { color = "#000" } = $$props;
    	let { size = "200" } = $$props;
    	let { value = "" } = $$props;
    	let { padding = 0 } = $$props;
    	let { className = "qrcode" } = $$props;
    	let image = '';

    	function generateQrCode() {
    		QRcode.set({
    			background,
    			foreground: color,
    			level: errorCorrection,
    			padding,
    			size,
    			value
    		});

    		$$invalidate(2, image = QRcode.toDataURL('image/jpeg'));
    	}

    	onMount(() => {
    		generateQrCode();
    	});

    	const writable_props = [
    		'errorCorrection',
    		'background',
    		'color',
    		'size',
    		'value',
    		'padding',
    		'className'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Lib> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('errorCorrection' in $$props) $$invalidate(3, errorCorrection = $$props.errorCorrection);
    		if ('background' in $$props) $$invalidate(4, background = $$props.background);
    		if ('color' in $$props) $$invalidate(5, color = $$props.color);
    		if ('size' in $$props) $$invalidate(6, size = $$props.size);
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('padding' in $$props) $$invalidate(7, padding = $$props.padding);
    		if ('className' in $$props) $$invalidate(1, className = $$props.className);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		QrCode: qrcode,
    		QRcode,
    		errorCorrection,
    		background,
    		color,
    		size,
    		value,
    		padding,
    		className,
    		image,
    		generateQrCode
    	});

    	$$self.$inject_state = $$props => {
    		if ('errorCorrection' in $$props) $$invalidate(3, errorCorrection = $$props.errorCorrection);
    		if ('background' in $$props) $$invalidate(4, background = $$props.background);
    		if ('color' in $$props) $$invalidate(5, color = $$props.color);
    		if ('size' in $$props) $$invalidate(6, size = $$props.size);
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('padding' in $$props) $$invalidate(7, padding = $$props.padding);
    		if ('className' in $$props) $$invalidate(1, className = $$props.className);
    		if ('image' in $$props) $$invalidate(2, image = $$props.image);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*value*/ 1) {
    			{
    				if (value) {
    					generateQrCode();
    				}
    			}
    		}
    	};

    	return [value, className, image, errorCorrection, background, color, size, padding];
    }

    class Lib extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			errorCorrection: 3,
    			background: 4,
    			color: 5,
    			size: 6,
    			value: 0,
    			padding: 7,
    			className: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Lib",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get errorCorrection() {
    		throw new Error("<Lib>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set errorCorrection(value) {
    		throw new Error("<Lib>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get background() {
    		throw new Error("<Lib>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set background(value) {
    		throw new Error("<Lib>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Lib>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Lib>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Lib>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Lib>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Lib>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Lib>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get padding() {
    		throw new Error("<Lib>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set padding(value) {
    		throw new Error("<Lib>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get className() {
    		throw new Error("<Lib>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<Lib>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/User.svelte generated by Svelte v3.52.0 */
    const file$3 = "src/User.svelte";

    // (35:6) {#if selected}
    function create_if_block_3(ctx) {
    	let div;
    	let arrowleft;
    	let current;
    	let mounted;
    	let dispose;
    	arrowleft = new ArrowLeft({ props: { size: 24 }, $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(arrowleft.$$.fragment);
    			attr_dev(div, "class", "back svelte-1mzxpo6");
    			add_location(div, file$3, 35, 8, 846);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(arrowleft, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "click", /*back*/ ctx[7], false, false, false),
    					listen_dev(div, "keypress", keypress_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop$1,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arrowleft.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arrowleft.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(arrowleft);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(35:6) {#if selected}",
    		ctx
    	});

    	return block;
    }

    // (48:6) {:else}
    function create_else_block_1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "empty-alias svelte-1mzxpo6");
    			add_location(div, file$3, 48, 8, 1199);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(48:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (46:6) {#if alias}
    function create_if_block_2(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*alias*/ ctx[0]);
    			attr_dev(div, "class", "alias");
    			add_location(div, file$3, 46, 8, 1144);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*alias*/ 1) set_data_dev(t, /*alias*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(46:6) {#if alias}",
    		ctx
    	});

    	return block;
    }

    // (76:2) {:else}
    function create_else_block$2(ctx) {
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = `${/*balance*/ ctx[3]} sats` + "";
    	let t2;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(/*pubkey*/ ctx[1]);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			attr_dev(div0, "class", "pubkey collapsed svelte-1mzxpo6");
    			add_location(div0, file$3, 76, 4, 2223);
    			attr_dev(div1, "class", "balance collapsed svelte-1mzxpo6");
    			add_location(div1, file$3, 79, 4, 2284);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pubkey*/ 2) set_data_dev(t0, /*pubkey*/ ctx[1]);
    			if (dirty & /*balance*/ 8 && t2_value !== (t2_value = `${/*balance*/ ctx[3]} sats` + "")) set_data_dev(t2, t2_value);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(76:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (57:2) {#if selected}
    function create_if_block$3(ctx) {
    	let div;
    	let p0;
    	let t1;
    	let section;
    	let p1;
    	let t2;
    	let t3;
    	let span;
    	let copyicon;
    	let t4;
    	let t5;
    	let p2;
    	let t7;
    	let qrcode;
    	let current;
    	let mounted;
    	let dispose;

    	copyicon = new Copy({
    			props: { size: 0, class: "copy-icon" },
    			$$inline: true
    		});

    	let if_block = /*routeHint*/ ctx[2] && create_if_block_1$1(ctx);

    	qrcode = new Lib({
    			props: { padding: 1.5, value: /*pubkey*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			p0.textContent = "Pubkey";
    			t1 = space();
    			section = element("section");
    			p1 = element("p");
    			t2 = text(/*pubkey*/ ctx[1]);
    			t3 = space();
    			span = element("span");
    			create_component(copyicon.$$.fragment);
    			t4 = space();
    			if (if_block) if_block.c();
    			t5 = space();
    			p2 = element("p");
    			p2.textContent = "Invite QR code";
    			t7 = space();
    			create_component(qrcode.$$.fragment);
    			attr_dev(p0, "class", "user-values-title svelte-1mzxpo6");
    			add_location(p0, file$3, 58, 6, 1443);
    			attr_dev(p1, "class", "user-value svelte-1mzxpo6");
    			add_location(p1, file$3, 60, 8, 1526);
    			attr_dev(span, "class", "svelte-1mzxpo6");
    			add_location(span, file$3, 62, 8, 1635);
    			attr_dev(section, "class", "value-wrap svelte-1mzxpo6");
    			add_location(section, file$3, 59, 6, 1489);
    			attr_dev(p2, "class", "user-values-title svelte-1mzxpo6");
    			add_location(p2, file$3, 72, 6, 2104);
    			attr_dev(div, "class", "fields svelte-1mzxpo6");
    			add_location(div, file$3, 57, 4, 1416);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(div, t1);
    			append_dev(div, section);
    			append_dev(section, p1);
    			append_dev(p1, t2);
    			append_dev(section, t3);
    			append_dev(section, span);
    			mount_component(copyicon, span, null);
    			append_dev(div, t4);
    			if (if_block) if_block.m(div, null);
    			append_dev(div, t5);
    			append_dev(div, p2);
    			append_dev(div, t7);
    			mount_component(qrcode, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					span,
    					"click",
    					function () {
    						if (is_function(copyToClipboard(/*pubkey*/ ctx[1]))) copyToClipboard(/*pubkey*/ ctx[1]).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (!current || dirty & /*pubkey*/ 2) set_data_dev(t2, /*pubkey*/ ctx[1]);

    			if (/*routeHint*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*routeHint*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, t5);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			const qrcode_changes = {};
    			if (dirty & /*pubkey*/ 2) qrcode_changes.value = /*pubkey*/ ctx[1];
    			qrcode.$set(qrcode_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(copyicon.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(qrcode.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(copyicon.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(qrcode.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(copyicon);
    			if (if_block) if_block.d();
    			destroy_component(qrcode);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(57:2) {#if selected}",
    		ctx
    	});

    	return block;
    }

    // (65:6) {#if routeHint}
    function create_if_block_1$1(ctx) {
    	let p0;
    	let t1;
    	let section;
    	let p1;
    	let t2;
    	let t3;
    	let span;
    	let copyicon;
    	let current;
    	let mounted;
    	let dispose;

    	copyicon = new Copy({
    			props: { size: 0, class: "copy-icon" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			p0.textContent = "Route hint";
    			t1 = space();
    			section = element("section");
    			p1 = element("p");
    			t2 = text(/*routeHint*/ ctx[2]);
    			t3 = space();
    			span = element("span");
    			create_component(copyicon.$$.fragment);
    			attr_dev(p0, "class", "user-values-title svelte-1mzxpo6");
    			add_location(p0, file$3, 65, 8, 1770);
    			attr_dev(p1, "class", "user-value svelte-1mzxpo6");
    			add_location(p1, file$3, 67, 10, 1861);
    			attr_dev(span, "class", "svelte-1mzxpo6");
    			add_location(span, file$3, 69, 10, 1976);
    			attr_dev(section, "class", "value-wrap svelte-1mzxpo6");
    			add_location(section, file$3, 66, 8, 1822);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, p1);
    			append_dev(p1, t2);
    			append_dev(section, t3);
    			append_dev(section, span);
    			mount_component(copyicon, span, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					span,
    					"click",
    					function () {
    						if (is_function(copyToClipboard(/*routeHint*/ ctx[2]))) copyToClipboard(/*routeHint*/ ctx[2]).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (!current || dirty & /*routeHint*/ 4) set_data_dev(t2, /*routeHint*/ ctx[2]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(copyicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(copyicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    			destroy_component(copyicon);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(65:6) {#if routeHint}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div5;
    	let div4;
    	let div2;
    	let t0;
    	let div1;
    	let div0;
    	let t1;
    	let t2;
    	let div3;
    	let login;
    	let t3;
    	let span;
    	let t5;
    	let current_block_type_index;
    	let if_block2;
    	let div5_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*selected*/ ctx[4] && create_if_block_3(ctx);

    	function select_block_type(ctx, dirty) {
    		if (/*alias*/ ctx[0]) return create_if_block_2;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block1 = current_block_type(ctx);
    	login = new Login({ props: { size: 12 }, $$inline: true });
    	const if_block_creators = [create_if_block$3, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*selected*/ ctx[4]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			div2 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t1 = space();
    			if_block1.c();
    			t2 = space();
    			div3 = element("div");
    			create_component(login.$$.fragment);
    			t3 = space();
    			span = element("span");
    			span.textContent = "Signed Up";
    			t5 = space();
    			if_block2.c();
    			attr_dev(div0, "class", "dot svelte-1mzxpo6");
    			attr_dev(div0, "style", `background:${/*signedUp*/ ctx[5] ? "#52B550" : "grey"};`);
    			add_location(div0, file$3, 40, 8, 1002);
    			attr_dev(div1, "class", "dot-wrap svelte-1mzxpo6");
    			add_location(div1, file$3, 39, 6, 971);
    			attr_dev(div2, "class", "top-left svelte-1mzxpo6");
    			add_location(div2, file$3, 33, 4, 794);
    			attr_dev(span, "class", "svelte-1mzxpo6");
    			add_location(span, file$3, 53, 6, 1352);
    			attr_dev(div3, "class", "signed-up svelte-1mzxpo6");
    			attr_dev(div3, "style", `opacity:${/*signedUp*/ ctx[5] ? 1 : "0.5"}`);
    			add_location(div3, file$3, 51, 4, 1254);
    			attr_dev(div4, "class", "top svelte-1mzxpo6");
    			add_location(div4, file$3, 32, 2, 772);
    			attr_dev(div5, "class", div5_class_value = "" + (null_to_empty(`user ${/*selected*/ ctx[4] && "selected"}`) + " svelte-1mzxpo6"));
    			add_location(div5, file$3, 27, 0, 671);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div2);
    			if (if_block0) if_block0.m(div2, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div2, t1);
    			if_block1.m(div2, null);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			mount_component(login, div3, null);
    			append_dev(div3, t3);
    			append_dev(div3, span);
    			append_dev(div5, t5);
    			if_blocks[current_block_type_index].m(div5, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div5, "click", /*mainSelect*/ ctx[6], false, false, false),
    					listen_dev(div5, "keypress", keypress_handler_1, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*selected*/ ctx[4]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*selected*/ 16) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div2, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div2, null);
    				}
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block2 = if_blocks[current_block_type_index];

    				if (!if_block2) {
    					if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block2.c();
    				} else {
    					if_block2.p(ctx, dirty);
    				}

    				transition_in(if_block2, 1);
    				if_block2.m(div5, null);
    			}

    			if (!current || dirty & /*selected*/ 16 && div5_class_value !== (div5_class_value = "" + (null_to_empty(`user ${/*selected*/ ctx[4] && "selected"}`) + " svelte-1mzxpo6"))) {
    				attr_dev(div5, "class", div5_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(login.$$.fragment, local);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(login.$$.fragment, local);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			if (if_block0) if_block0.d();
    			if_block1.d();
    			destroy_component(login);
    			if_blocks[current_block_type_index].d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function copyToClipboard(value) {
    	navigator.clipboard.writeText(value);
    } // alert(value);

    const keypress_handler = () => {
    	
    };

    const keypress_handler_1 = () => {
    	
    };

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('User', slots, []);

    	let { select = () => {
    		
    	} } = $$props;

    	let { alias = "" } = $$props;
    	let { pubkey = "" } = $$props;
    	let { routeHint = "" } = $$props;
    	let { balance = 0 } = $$props;
    	let { selected = false } = $$props;
    	const signedUp = alias ? true : false;

    	function mainSelect() {
    		if (!selected) select(pubkey);
    	}

    	function back() {
    		select(null);
    	}

    	const writable_props = ['select', 'alias', 'pubkey', 'routeHint', 'balance', 'selected'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<User> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('select' in $$props) $$invalidate(8, select = $$props.select);
    		if ('alias' in $$props) $$invalidate(0, alias = $$props.alias);
    		if ('pubkey' in $$props) $$invalidate(1, pubkey = $$props.pubkey);
    		if ('routeHint' in $$props) $$invalidate(2, routeHint = $$props.routeHint);
    		if ('balance' in $$props) $$invalidate(3, balance = $$props.balance);
    		if ('selected' in $$props) $$invalidate(4, selected = $$props.selected);
    	};

    	$$self.$capture_state = () => ({
    		Login,
    		ArrowLeft,
    		CopyIcon: Copy,
    		QrCode: Lib,
    		select,
    		alias,
    		pubkey,
    		routeHint,
    		balance,
    		selected,
    		signedUp,
    		mainSelect,
    		back,
    		copyToClipboard
    	});

    	$$self.$inject_state = $$props => {
    		if ('select' in $$props) $$invalidate(8, select = $$props.select);
    		if ('alias' in $$props) $$invalidate(0, alias = $$props.alias);
    		if ('pubkey' in $$props) $$invalidate(1, pubkey = $$props.pubkey);
    		if ('routeHint' in $$props) $$invalidate(2, routeHint = $$props.routeHint);
    		if ('balance' in $$props) $$invalidate(3, balance = $$props.balance);
    		if ('selected' in $$props) $$invalidate(4, selected = $$props.selected);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		alias,
    		pubkey,
    		routeHint,
    		balance,
    		selected,
    		signedUp,
    		mainSelect,
    		back,
    		select
    	];
    }

    class User extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			select: 8,
    			alias: 0,
    			pubkey: 1,
    			routeHint: 2,
    			balance: 3,
    			selected: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "User",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get select() {
    		throw new Error("<User>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set select(value) {
    		throw new Error("<User>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get alias() {
    		throw new Error("<User>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alias(value) {
    		throw new Error("<User>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pubkey() {
    		throw new Error("<User>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pubkey(value) {
    		throw new Error("<User>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get routeHint() {
    		throw new Error("<User>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routeHint(value) {
    		throw new Error("<User>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get balance() {
    		throw new Error("<User>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set balance(value) {
    		throw new Error("<User>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selected() {
    		throw new Error("<User>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selected(value) {
    		throw new Error("<User>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Users.svelte generated by Svelte v3.52.0 */
    const file$2 = "src/Users.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (20:2) {:else}
    function create_else_block$1(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let p;
    	let t1;
    	let span;
    	let t3;
    	let button;
    	let t4;
    	let div2;
    	let t5;
    	let each_1_anchor;
    	let current;

    	button = new Button$1({
    			props: {
    				kind: "tertiary",
    				type: "submit",
    				size: "field",
    				icon: Add,
    				disabled: false,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", function () {
    		if (is_function(/*add*/ ctx[0])) /*add*/ ctx[0].apply(this, arguments);
    	});

    	let each_value = /*$users*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			p = element("p");
    			t1 = text("Current Users ");
    			span = element("span");
    			span.textContent = "42";
    			t3 = space();
    			create_component(button.$$.fragment);
    			t4 = space();
    			div2 = element("div");
    			t5 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty$1();
    			attr_dev(div0, "class", "divider svelte-3b3zvu");
    			add_location(div0, file$2, 20, 4, 476);
    			attr_dev(span, "class", "users-count svelte-3b3zvu");
    			add_location(span, file$2, 22, 23, 547);
    			attr_dev(p, "class", "svelte-3b3zvu");
    			add_location(p, file$2, 22, 6, 530);
    			attr_dev(div1, "class", "users svelte-3b3zvu");
    			add_location(div1, file$2, 21, 4, 504);
    			attr_dev(div2, "class", "divider svelte-3b3zvu");
    			add_location(div2, file$2, 32, 4, 775);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p);
    			append_dev(p, t1);
    			append_dev(p, span);
    			append_dev(div1, t3);
    			mount_component(button, div1, null);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t5, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);

    			if (dirty & /*$users, selectedPubkey*/ 6) {
    				each_value = /*$users*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			destroy_component(button);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(20:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (14:2) {#if selectedUser}
    function create_if_block$2(ctx) {
    	let user;
    	let current;
    	const user_spread_levels = [/*selectedUser*/ ctx[3], { selected: true }, { select: /*func*/ ctx[4] }];
    	let user_props = {};

    	for (let i = 0; i < user_spread_levels.length; i += 1) {
    		user_props = assign(user_props, user_spread_levels[i]);
    	}

    	user = new User({ props: user_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(user.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(user, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const user_changes = (dirty & /*selectedUser, selectedPubkey*/ 10)
    			? get_spread_update(user_spread_levels, [
    					dirty & /*selectedUser*/ 8 && get_spread_object(/*selectedUser*/ ctx[3]),
    					user_spread_levels[1],
    					dirty & /*selectedPubkey*/ 2 && { select: /*func*/ ctx[4] }
    				])
    			: {};

    			user.$set(user_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(user.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(user.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(user, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(14:2) {#if selectedUser}",
    		ctx
    	});

    	return block;
    }

    // (24:6) <Button         on:click={add}         kind="tertiary"         type="submit"         size="field"         icon={Add}         disabled={false}>
    function create_default_slot$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Add User");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(24:6) <Button         on:click={add}         kind=\\\"tertiary\\\"         type=\\\"submit\\\"         size=\\\"field\\\"         icon={Add}         disabled={false}>",
    		ctx
    	});

    	return block;
    }

    // (34:4) {#each $users as user}
    function create_each_block(ctx) {
    	let user;
    	let current;
    	const user_spread_levels = [/*user*/ ctx[6], { select: /*func_1*/ ctx[5] }, { selected: false }];
    	let user_props = {};

    	for (let i = 0; i < user_spread_levels.length; i += 1) {
    		user_props = assign(user_props, user_spread_levels[i]);
    	}

    	user = new User({ props: user_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(user.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(user, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const user_changes = (dirty & /*$users, selectedPubkey*/ 6)
    			? get_spread_update(user_spread_levels, [
    					dirty & /*$users*/ 4 && get_spread_object(/*user*/ ctx[6]),
    					dirty & /*selectedPubkey*/ 2 && { select: /*func_1*/ ctx[5] },
    					user_spread_levels[2]
    				])
    			: {};

    			user.$set(user_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(user.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(user.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(user, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(34:4) {#each $users as user}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$2, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*selectedUser*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			add_location(div, file$2, 12, 0, 327);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let selectedUser;
    	let $users;
    	validate_store(users, 'users');
    	component_subscribe($$self, users, $$value => $$invalidate(2, $users = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Users', slots, []);

    	let { add = () => {
    		
    	} } = $$props;

    	let selectedPubkey = "";
    	const writable_props = ['add'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Users> was created with unknown prop '${key}'`);
    	});

    	const func = () => $$invalidate(1, selectedPubkey = null);
    	const func_1 = pubkey => $$invalidate(1, selectedPubkey = pubkey);

    	$$self.$$set = $$props => {
    		if ('add' in $$props) $$invalidate(0, add = $$props.add);
    	};

    	$$self.$capture_state = () => ({
    		add,
    		Button: Button$1,
    		Add,
    		users,
    		User,
    		selectedPubkey,
    		selectedUser,
    		$users
    	});

    	$$self.$inject_state = $$props => {
    		if ('add' in $$props) $$invalidate(0, add = $$props.add);
    		if ('selectedPubkey' in $$props) $$invalidate(1, selectedPubkey = $$props.selectedPubkey);
    		if ('selectedUser' in $$props) $$invalidate(3, selectedUser = $$props.selectedUser);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$users, selectedPubkey*/ 6) {
    			$$invalidate(3, selectedUser = $users.find(u => u.pubkey === selectedPubkey));
    		}
    	};

    	return [add, selectedPubkey, $users, selectedUser, func, func_1];
    }

    class Users extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, { add: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Users",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get add() {
    		throw new Error("<Users>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set add(value) {
    		throw new Error("<Users>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/RelayControls.svelte generated by Svelte v3.52.0 */

    // (9:0) <Tabs>
    function create_default_slot_2(ctx) {
    	let tab0;
    	let t;
    	let tab1;
    	let current;

    	tab0 = new Tab$1({
    			props: { label: "Users" },
    			$$inline: true
    		});

    	tab1 = new Tab$1({
    			props: { label: "Configuration" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tab0.$$.fragment);
    			t = space();
    			create_component(tab1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tab0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(tab1, target, anchor);
    			current = true;
    		},
    		p: noop$1,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tab0.$$.fragment, local);
    			transition_in(tab1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tab0.$$.fragment, local);
    			transition_out(tab1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tab0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(tab1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(9:0) <Tabs>",
    		ctx
    	});

    	return block;
    }

    // (13:4) <TabContent>
    function create_default_slot_1(ctx) {
    	let users;
    	let current;
    	users = new Users({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(users.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(users, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(users.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(users.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(users, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(13:4) <TabContent>",
    		ctx
    	});

    	return block;
    }

    // (14:4) <TabContent>
    function create_default_slot$1(ctx) {
    	let controls_1;
    	let current;

    	controls_1 = new Controls({
    			props: {
    				ctrls: /*$selectedNode*/ ctx[0] && controls["Relay"]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(controls_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(controls_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const controls_1_changes = {};
    			if (dirty & /*$selectedNode*/ 1) controls_1_changes.ctrls = /*$selectedNode*/ ctx[0] && controls["Relay"];
    			controls_1.$set(controls_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(controls_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(controls_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(controls_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(14:4) <TabContent>",
    		ctx
    	});

    	return block;
    }

    // (12:2) <svelte:fragment slot="content">
    function create_content_slot(ctx) {
    	let tabcontent0;
    	let t;
    	let tabcontent1;
    	let current;

    	tabcontent0 = new TabContent$1({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	tabcontent1 = new TabContent$1({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tabcontent0.$$.fragment);
    			t = space();
    			create_component(tabcontent1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tabcontent0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(tabcontent1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tabcontent0_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				tabcontent0_changes.$$scope = { dirty, ctx };
    			}

    			tabcontent0.$set(tabcontent0_changes);
    			const tabcontent1_changes = {};

    			if (dirty & /*$$scope, $selectedNode*/ 3) {
    				tabcontent1_changes.$$scope = { dirty, ctx };
    			}

    			tabcontent1.$set(tabcontent1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tabcontent0.$$.fragment, local);
    			transition_in(tabcontent1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tabcontent0.$$.fragment, local);
    			transition_out(tabcontent1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tabcontent0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(tabcontent1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot.name,
    		type: "slot",
    		source: "(12:2) <svelte:fragment slot=\\\"content\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let tabs;
    	let current;

    	tabs = new Tabs$1({
    			props: {
    				$$slots: {
    					content: [create_content_slot],
    					default: [create_default_slot_2]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tabs.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(tabs, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const tabs_changes = {};

    			if (dirty & /*$$scope, $selectedNode*/ 3) {
    				tabs_changes.$$scope = { dirty, ctx };
    			}

    			tabs.$set(tabs_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tabs.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tabs.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tabs, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $selectedNode;
    	validate_store(selectedNode, 'selectedNode');
    	component_subscribe($$self, selectedNode, $$value => $$invalidate(0, $selectedNode = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RelayControls', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RelayControls> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Users,
    		Tabs: Tabs$1,
    		Tab: Tab$1,
    		TabContent: TabContent$1,
    		selectedNode,
    		Controls,
    		controls,
    		$selectedNode
    	});

    	return [$selectedNode];
    }

    class RelayControls extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RelayControls",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/Controller.svelte generated by Svelte v3.52.0 */
    const file$1 = "src/Controller.svelte";

    // (9:0) {#if ctrls}
    function create_if_block$1(ctx) {
    	let main;
    	let header;
    	let img;
    	let img_src_value;
    	let t0;
    	let t1_value = /*$selectedNode*/ ctx[1].name + "";
    	let t1;
    	let t2;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*type*/ ctx[0] === "Relay") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			header = element("header");
    			img = element("img");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			if_block.c();
    			if (!src_url_equal(img.src, img_src_value = `swarm/${/*type*/ ctx[0].toLowerCase()}.png`)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "node-top-img svelte-1k2x4ky");
    			attr_dev(img, "alt", "node ");
    			add_location(img, file$1, 11, 6, 333);
    			attr_dev(header, "class", "svelte-1k2x4ky");
    			add_location(header, file$1, 10, 4, 318);
    			attr_dev(main, "class", "svelte-1k2x4ky");
    			add_location(main, file$1, 9, 2, 307);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, header);
    			append_dev(header, img);
    			append_dev(header, t0);
    			append_dev(header, t1);
    			append_dev(main, t2);
    			if_blocks[current_block_type_index].m(main, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*type*/ 1 && !src_url_equal(img.src, img_src_value = `swarm/${/*type*/ ctx[0].toLowerCase()}.png`)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if ((!current || dirty & /*$selectedNode*/ 2) && t1_value !== (t1_value = /*$selectedNode*/ ctx[1].name + "")) set_data_dev(t1, t1_value);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(main, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(9:0) {#if ctrls}",
    		ctx
    	});

    	return block;
    }

    // (21:4) {:else}
    function create_else_block(ctx) {
    	let controls_1;
    	let current;

    	controls_1 = new Controls({
    			props: { ctrls: /*ctrls*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(controls_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(controls_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const controls_1_changes = {};
    			if (dirty & /*ctrls*/ 4) controls_1_changes.ctrls = /*ctrls*/ ctx[2];
    			controls_1.$set(controls_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(controls_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(controls_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(controls_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(21:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (19:4) {#if type === "Relay"}
    function create_if_block_1(ctx) {
    	let relaycontrols;
    	let current;
    	relaycontrols = new RelayControls({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(relaycontrols.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(relaycontrols, target, anchor);
    			current = true;
    		},
    		p: noop$1,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(relaycontrols.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(relaycontrols.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(relaycontrols, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(19:4) {#if type === \\\"Relay\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*ctrls*/ ctx[2] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$1();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*ctrls*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*ctrls*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let type;
    	let ctrls;
    	let $selectedNode;
    	validate_store(selectedNode, 'selectedNode');
    	component_subscribe($$self, selectedNode, $$value => $$invalidate(1, $selectedNode = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Controller', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Controller> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		selectedNode,
    		Controls,
    		controls,
    		RelayControls,
    		type,
    		ctrls,
    		$selectedNode
    	});

    	$$self.$inject_state = $$props => {
    		if ('type' in $$props) $$invalidate(0, type = $$props.type);
    		if ('ctrls' in $$props) $$invalidate(2, ctrls = $$props.ctrls);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$selectedNode*/ 2) {
    			$$invalidate(0, type = $selectedNode && $selectedNode.type);
    		}

    		if ($$self.$$.dirty & /*$selectedNode, type*/ 3) {
    			$$invalidate(2, ctrls = $selectedNode && controls[type]);
    		}
    	};

    	return [type, $selectedNode, ctrls];
    }

    class Controller extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Controller",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.52.0 */

    const { console: console_1 } = globals;
    const file = "src/App.svelte";

    // (24:4) {#if $selectedNode}
    function create_if_block(ctx) {
    	let div;
    	let t_value = /*$selectedNode*/ ctx[0].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "title svelte-w1ui6");
    			add_location(div, file, 24, 6, 696);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$selectedNode*/ 1 && t_value !== (t_value = /*$selectedNode*/ ctx[0].name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(24:4) {#if $selectedNode}",
    		ctx
    	});

    	return block;
    }

    // (28:6) <Button type="submit" size="field" icon={Add}>
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Add New Node");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(28:6) <Button type=\\\"submit\\\" size=\\\"field\\\" icon={Add}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let header;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let span;
    	let t2;
    	let t3;
    	let section;
    	let button;
    	let t4;
    	let div1;
    	let flow;
    	let t5;
    	let controller;
    	let current;
    	let if_block = /*$selectedNode*/ ctx[0] && create_if_block(ctx);

    	button = new Button$1({
    			props: {
    				type: "submit",
    				size: "field",
    				icon: Add,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	flow = new Flow({ $$inline: true });
    	controller = new Controller({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			header = element("header");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			span = element("span");
    			span.textContent = "Sphinx Stack";
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			section = element("section");
    			create_component(button.$$.fragment);
    			t4 = space();
    			div1 = element("div");
    			create_component(flow.$$.fragment);
    			t5 = space();
    			create_component(controller.$$.fragment);
    			attr_dev(img, "class", "logo svelte-w1ui6");
    			attr_dev(img, "alt", "Sphinx icon");
    			if (!src_url_equal(img.src, img_src_value = "favicon.jpeg")) attr_dev(img, "src", img_src_value);
    			add_location(img, file, 20, 6, 545);
    			attr_dev(span, "class", "stack-title svelte-w1ui6");
    			add_location(span, file, 21, 6, 609);
    			attr_dev(div0, "class", "lefty logo-wrap svelte-w1ui6");
    			add_location(div0, file, 19, 4, 509);
    			attr_dev(section, "class", "add-node-btn svelte-w1ui6");
    			add_location(section, file, 26, 4, 756);
    			attr_dev(header, "class", "svelte-w1ui6");
    			add_location(header, file, 18, 2, 496);
    			attr_dev(div1, "class", "body svelte-w1ui6");
    			add_location(div1, file, 30, 2, 890);
    			attr_dev(main, "class", "svelte-w1ui6");
    			add_location(main, file, 17, 0, 487);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, header);
    			append_dev(header, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, span);
    			append_dev(header, t2);
    			if (if_block) if_block.m(header, null);
    			append_dev(header, t3);
    			append_dev(header, section);
    			mount_component(button, section, null);
    			append_dev(main, t4);
    			append_dev(main, div1);
    			mount_component(flow, div1, null);
    			append_dev(div1, t5);
    			mount_component(controller, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$selectedNode*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(header, t3);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const button_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			transition_in(flow.$$.fragment, local);
    			transition_in(controller.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			transition_out(flow.$$.fragment, local);
    			transition_out(controller.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block) if_block.d();
    			destroy_component(button);
    			destroy_component(flow);
    			destroy_component(controller);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $selectedNode;
    	validate_store(selectedNode, 'selectedNode');
    	component_subscribe($$self, selectedNode, $$value => $$invalidate(0, $selectedNode = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	async function getConfig() {
    		const conf = await get_config();
    		console.log(conf);
    	}

    	onMount(() => {
    		getConfig();
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		selectedNode,
    		api,
    		onMount,
    		Flow,
    		Button: Button$1,
    		Add,
    		Controller,
    		getConfig,
    		$selectedNode
    	});

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$selectedNode*/ 1) {
    			console.log($selectedNode);
    		}
    	};

    	return [$selectedNode];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
