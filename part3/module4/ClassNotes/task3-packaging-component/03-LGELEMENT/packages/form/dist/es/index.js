function e(e,t,n,o,r,i,s,d,a,c){"boolean"!=typeof s&&(a=d,d=s,s=!1);const l="function"==typeof n?n.options:n;let f;if(e&&e.render&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0,r&&(l.functional=!0)),o&&(l._scopeId=o),i?(f=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,a(e)),e&&e._registeredComponents&&e._registeredComponents.add(i)},l._ssrRegister=f):t&&(f=s?function(e){t.call(this,c(e,this.$root.$options.shadowRoot))}:function(e){t.call(this,d(e))}),f)if(l.functional){const e=l.render;l.render=function(t,n){return f.call(n),e(t,n)}}else{const e=l.beforeCreate;l.beforeCreate=e?[].concat(e,f):[f]}return n}const t=e({render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("form",[e._t("default")],2)},staticRenderFns:[]},undefined,{name:"LgForm",props:{model:{type:Object},rules:{type:Object}},provide(){return{form:this}},methods:{validate(e){const t=this.$children.filter((e=>e.prop)).map((e=>e.validator()));Promise.all(t).then((()=>e(!0))).catch((()=>e(!1)))}}},undefined,false,undefined,!1,void 0,void 0,void 0);t.install=e=>{e.component(t.name,t)};export default t;
