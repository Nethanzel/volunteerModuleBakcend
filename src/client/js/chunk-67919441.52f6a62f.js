(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67919441"],{"0edf":function(e,t,n){},"43f7":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"manager-view"},e._l(e.data,(function(t,i){return a("div",{key:"mv-"+i,class:{record:!0,deleted:t.deleted}},[a("div",{ref:"mv-"+t.id,refInFor:!0,staticClass:"head"},[!t.deleted&&e.allowDelete?a("i",{staticClass:"icofont-ui-delete",style:{display:t.deleted?"none":"block"},on:{click:function(n){return e.deleteRecord(t,n)}}}):e._e(),t.deleted&&e.allowRestore?a("i",{staticClass:"icofont-refresh",style:{display:t.deleted?"block":"none"},on:{click:function(n){return e.restoreRecord(t,n)}}}):e._e(),a("img",{staticClass:"rotating",attrs:{src:n("e337"),alt:"loading"}})]),e._l(e.fields,(function(n,i){return a("EditableField",{key:"mf-"+i,style:{pointerEvents:t.deleted?"none":"unset"},attrs:{type:n.type,label:n.display,_key:n.key,value:t[n.key],options:n.options,"data-record-id":t.id,disableSave:!e.saveEdited},on:{save:function(n){return e.handleSaveField(n,t.id)}}})}))],2)})),0)},i=[],r=n("b85c"),o=n("3944"),s={props:{data:Array,fields:Array,saveEdited:Boolean,allowDelete:Boolean,allowRestore:Boolean},components:{EditableField:o["a"]},methods:{deleteRecord:function(e,t){this.showLoadin(t),this.$emit("delete",{id:e.id,stopLoadin:this.hideLoadin})},restoreRecord:function(e,t){this.showLoadin(t),this.$emit("restore",{id:e.id,stopLoadin:this.hideLoadin})},showLoadin:function(e){e.target.parentElement.getElementsByTagName("img")[0].style.display="block";var t,n=Object(r["a"])(e.target.parentElement.getElementsByTagName("i"));try{for(n.s();!(t=n.n()).done;){var a=t.value;a.style.display="none"}}catch(i){n.e(i)}finally{n.f()}},hideLoadin:function(e){var t=this.$refs["mv-".concat(e)][0];if(t){t.getElementsByTagName("img")[0].style.display="none";var n,a=Object(r["a"])(t.getElementsByTagName("i"));try{for(a.s();!(n=a.n()).done;){var i=n.value;i.style.display="block"}}catch(o){a.e(o)}finally{a.f()}}},handleSaveField:function(e,t){this.$emit("updateField",{field:e.field,target:e.target,id:t})}}},d=s,l=(n("e269"),n("2877")),c=Object(l["a"])(d,a,i,!1,null,"38913592",null);t["a"]=c.exports},5420:function(e,t,n){"use strict";n("e083")},e083:function(e,t,n){},e269:function(e,t,n){"use strict";n("0edf")},ea2b:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"deps"},[a("h1",[e._v("Grados")]),e._allowCreateDepPermission?a("p",{staticClass:"add-info",on:{click:function(t){e.showBlur=!0}}},[a("i",{staticClass:"icofont-plus-circle"}),e._v(" Agregar")]):e._e(),e.loadin?a("img",{staticClass:"rotating",attrs:{src:n("e337"),alt:"loadin"}}):e._e(),a("DynamicConfigurationManager",{attrs:{data:e.grados,fields:e.fields,saveEdited:e._allowEditDepPermission,allowDelete:e._allowDeleteDepPermission,allowRestore:e._allowRestoreDepPermission},on:{updateField:e.updateField,delete:e.handleDelete,restore:e.handleRestore}}),a("transition",{attrs:{name:"circle-blur"}},[e.showBlur?a("div",{staticClass:"blury-cnt",on:{click:function(t){return e.handleHideBlur()}}},[a("DynamicModelCreator",{attrs:{fields:e.fields,title:"Crear grado"},on:{hide:function(t){e.showBlur=!1},ready:function(t){e.hideCreatingLoading=t},done:function(t){return e.handleCreateDepartment(t)}}})],1):e._e()])],1)},i=[],r=n("ade3"),o=n("c7eb"),s=n("1da1"),d=(n("7db0"),n("d3b7"),n("0643"),n("fffc"),n("0909")),l=n("91f1"),c=n("43f7"),u=n("de56"),f={components:{DynamicConfigurationManager:c["a"],DynamicModelCreator:l["a"]},data:function(){return{showBlur:!1,loadin:!0,grados:[],fields:[{key:"grado",display:"Grado",type:"text"},{key:"descripcion",display:"Descripcion",type:"text-area"},{key:"color",display:"Color",type:"text"},{key:"prefix",display:"Prefijo",type:"text"}],hideCreatingLoading:function(){}}},mounted:function(){this.getDepartmentos()},methods:{getDepartmentos:function(){var e=this;return Object(s["a"])(Object(o["a"])().mark((function t(){var n;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loadin=!0,t.next=3,d["a"].Get.Grados().catch((function(){return null})).finally((function(){return e.loadin=!1}));case 3:n=t.sent,200==n.status&&(e.grados=n.data);case 5:case"end":return t.stop()}}),t)})))()},updateField:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function n(){var a,i;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return Object(u["b"])(e.target),a={id:e.id,field:Object(r["a"])({},e.field.key,e.field.value)},n.next=4,d["a"].Patch.UpdateDepartment(a).catch((function(){return Object(u["a"])(e.target)})).finally((function(){return Object(u["a"])(e.target)}));case 4:i=n.sent,204==(null===i||void 0===i?void 0:i.status)&&(t.grados.find((function(t){return t.id==e.id}))[e.field.key]=e.field.value,t.$throwAppMessage({message:"Informacion actualizada!",icon:"icofont-check-circled",type:"ok"}));case 6:case"end":return n.stop()}}),n)})))()},handleDelete:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function n(){var a;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,d["a"].Delete.removeDepartment(e.id).catch((function(){return e.stopLoadin(e.id)})).finally((function(){return e.stopLoadin(e.id)}));case 2:a=n.sent,204==(null===a||void 0===a?void 0:a.status)&&(t.grados.find((function(t){return t.id==e.id})).deleted=!0,t.$throwAppMessage({message:"Grado borrado!",icon:"icofont-check-circled",type:"ok"}));case 4:case"end":return n.stop()}}),n)})))()},handleRestore:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function n(){var a;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,d["a"].Patch.restoreDepartment(e.id).catch((function(){return e.stopLoadin(e.id)})).finally((function(){return e.stopLoadin(e.id)}));case 2:a=n.sent,204==(null===a||void 0===a?void 0:a.status)&&(t.grados.find((function(t){return t.id==e.id})).deleted=!1,t.$throwAppMessage({message:"Grado restaurado!",icon:"icofont-check-circled",type:"ok"}));case 4:case"end":return n.stop()}}),n)})))()},handleHideBlur:function(){this.showBlur=!1},handleCreateDepartment:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function n(){var a;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,d["a"].Post.newDepartment(e).catch((function(){return t.hideCreatingLoading()})).finally((function(){return t.hideCreatingLoading()}));case 2:a=n.sent,201==(null===a||void 0===a?void 0:a.status)&&(t.handleHideBlur(),t.getDepartmentos(),t.$throwAppMessage({message:"Grado creado!",icon:"icofont-check-circled",type:"ok"}));case 4:case"end":return n.stop()}}),n)})))()}},computed:{_allowCreateDepPermission:function(){return this.$store.getters.isAllowedToPermission(["CD"])},_allowEditDepPermission:function(){return this.$store.getters.isAllowedToPermission(["UD"])},_allowDeleteDepPermission:function(){return this.$store.getters.isAllowedToPermission(["DD"])},_allowRestoreDepPermission:function(){return this.$store.getters.isAllowedToPermission(["RDE"])}}},p=f,h=(n("5420"),n("2877")),m=Object(h["a"])(p,a,i,!1,null,"49d727d0",null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-67919441.52f6a62f.js.map