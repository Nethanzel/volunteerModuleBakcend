(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e6a57b2"],{"005b":function(e,t,n){},"0edf":function(e,t,n){},"43f7":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"manager-view"},e._l(e.data,(function(t,a){return i("div",{key:"mv-"+a,class:{record:!0,deleted:t.deleted}},[i("div",{ref:"mv-"+t.id,refInFor:!0,staticClass:"head"},[!t.deleted&&e.allowDelete?i("i",{staticClass:"icofont-ui-delete",style:{display:t.deleted?"none":"block"},on:{click:function(n){return e.deleteRecord(t,n)}}}):e._e(),t.deleted&&e.allowRestore?i("i",{staticClass:"icofont-refresh",style:{display:t.deleted?"block":"none"},on:{click:function(n){return e.restoreRecord(t,n)}}}):e._e(),i("img",{staticClass:"rotating",attrs:{src:n("e337"),alt:"loading"}})]),e._l(e.fields,(function(n,a){return i("EditableField",{key:"mf-"+a,style:{pointerEvents:t.deleted?"none":"unset"},attrs:{type:n.type,label:n.display,_key:n.key,value:t[n.key],options:n.options,"data-record-id":t.id,disableSave:!e.saveEdited},on:{save:function(n){return e.handleSaveField(n,t.id)}}})}))],2)})),0)},a=[],r=n("b85c"),o=n("3944"),s={props:{data:Array,fields:Array,saveEdited:Boolean,allowDelete:Boolean,allowRestore:Boolean},components:{EditableField:o["a"]},methods:{deleteRecord:function(e,t){this.showLoadin(t),this.$emit("delete",{id:e.id,stopLoadin:this.hideLoadin})},restoreRecord:function(e,t){this.showLoadin(t),this.$emit("restore",{id:e.id,stopLoadin:this.hideLoadin})},showLoadin:function(e){e.target.parentElement.getElementsByTagName("img")[0].style.display="block";var t,n=Object(r["a"])(e.target.parentElement.getElementsByTagName("i"));try{for(n.s();!(t=n.n()).done;){var i=t.value;i.style.display="none"}}catch(a){n.e(a)}finally{n.f()}},hideLoadin:function(e){var t=this.$refs["mv-".concat(e)][0];if(t){t.getElementsByTagName("img")[0].style.display="none";var n,i=Object(r["a"])(t.getElementsByTagName("i"));try{for(i.s();!(n=i.n()).done;){var a=n.value;a.style.display="block"}}catch(o){i.e(o)}finally{i.f()}}},handleSaveField:function(e,t){this.$emit("updateField",{field:e.field,target:e.target,id:t})}}},c=s,l=(n("e269"),n("2877")),d=Object(l["a"])(c,i,a,!1,null,"38913592",null);t["a"]=d.exports},"5bce":function(e,t,n){"use strict";n("005b")},c95c:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tipos"},[i("h1",[e._v("Tipos de miembro")]),e._allowCreateUserTypePermission?i("p",{staticClass:"add-info",on:{click:function(t){e.showBlur=!0}}},[i("i",{staticClass:"icofont-plus-circle"}),e._v(" Agregar")]):e._e(),e.loadin?i("img",{staticClass:"rotating",attrs:{src:n("e337"),alt:"loadin"}}):e._e(),i("DynamicConfigurationManager",{attrs:{data:e.tipos,fields:e.fields,saveEdited:e._allowEditUserTypePermission,allowDelete:e._allowDeleteUserTypePermission,allowRestore:e._allowRestoreUserTypePermission},on:{updateField:e.updateField,delete:function(t){return e.handleDelete(t)},restore:function(t){return e.handleRestore(t)}}}),i("transition",{attrs:{name:"circle-blur"}},[e.showBlur?i("div",{staticClass:"blury-cnt",on:{click:function(t){return e.handleHideBlur()}}},[i("DynamicModelCreator",{attrs:{title:"Crear tipo miembro",fields:e.fields},on:{hide:function(t){e.showBlur=!1},ready:function(t){e.hideCreatingLoading=t},done:function(t){return e.handleCreateUserType(t)}}})],1):e._e()])],1)},a=[],r=n("ade3"),o=n("c7eb"),s=n("1da1"),c=(n("7db0"),n("d3b7"),n("0643"),n("fffc"),n("0909")),l=n("91f1"),d=n("43f7"),u=n("de56"),f={components:{DynamicConfigurationManager:d["a"],DynamicModelCreator:l["a"]},data:function(){return{showBlur:!1,loadin:!0,tipos:[],fields:[{key:"tipo",display:"Tipo",type:"text"},{key:"descripcion",display:"Descripcion",type:"text-area"}],hideCreatingLoading:function(){}}},mounted:function(){this.getTipos()},methods:{getTipos:function(){var e=this;return Object(s["a"])(Object(o["a"])().mark((function t(){var n;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loadin=!0,t.next=3,c["a"].Get.tipoMiembros().catch((function(){return null})).finally((function(){return e.loadin=!1}));case 3:n=t.sent,200==n.status&&(e.tipos=n.data);case 5:case"end":return t.stop()}}),t)})))()},updateField:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function n(){var i,a;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return Object(u["b"])(e.target),i={id:e.id,field:Object(r["a"])({},e.field.key,e.field.value)},n.next=4,c["a"].Patch.UpdateUserType(i).catch((function(){return Object(u["a"])(e.target)})).finally((function(){return Object(u["a"])(e.target)}));case 4:a=n.sent,204==(null===a||void 0===a?void 0:a.status)&&(t.tipos.find((function(t){return t.id==e.id}))[e.field.key]=e.field.value,t.$throwAppMessage({message:"Informacion actualizada!",icon:"icofont-check-circled",type:"ok"}));case 6:case"end":return n.stop()}}),n)})))()},handleDelete:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function n(){var i;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,c["a"].Delete.removeUserType(e.id).catch((function(){return e.stopLoadin(e.id)})).finally((function(){return e.stopLoadin(e.id)}));case 2:i=n.sent,204==(null===i||void 0===i?void 0:i.status)&&(t.tipos.find((function(t){return t.id==e.id})).deleted=!0,t.$throwAppMessage({message:"Tipo borrado!",icon:"icofont-check-circled",type:"ok"}));case 4:case"end":return n.stop()}}),n)})))()},handleRestore:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function n(){var i;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,c["a"].Patch.restoreUserType(e.id).catch((function(){return e.stopLoadin(e.id)})).finally((function(){return e.stopLoadin(e.id)}));case 2:i=n.sent,204==(null===i||void 0===i?void 0:i.status)&&(t.tipos.find((function(t){return t.id==e.id})).deleted=!1,t.$throwAppMessage({message:"Tipo restaurado!",icon:"icofont-check-circled",type:"ok"}));case 4:case"end":return n.stop()}}),n)})))()},handleHideBlur:function(){this.showBlur=!1},handleCreateUserType:function(e){var t=this;return Object(s["a"])(Object(o["a"])().mark((function n(){var i;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,c["a"].Post.newUserType(e).catch((function(){return t.hideCreatingLoading()})).finally((function(){return t.hideCreatingLoading()}));case 2:i=n.sent,201==(null===i||void 0===i?void 0:i.status)&&(t.handleHideBlur(),t.getTipos(),t.$throwAppMessage({message:"Tipo creado!",icon:"icofont-check-circled",type:"ok"}));case 4:case"end":return n.stop()}}),n)})))()}},computed:{_allowCreateUserTypePermission:function(){return this.$store.getters.isAllowedToPermission(["CVT"])},_allowEditUserTypePermission:function(){return this.$store.getters.isAllowedToPermission(["UVT"])},_allowDeleteUserTypePermission:function(){return this.$store.getters.isAllowedToPermission(["DVT"])},_allowRestoreUserTypePermission:function(){return this.$store.getters.isAllowedToPermission(["RDE"])}}},p=f,h=(n("5bce"),n("2877")),y=Object(h["a"])(p,i,a,!1,null,"74f0a536",null);t["default"]=y.exports},e269:function(e,t,n){"use strict";n("0edf")}}]);
//# sourceMappingURL=chunk-6e6a57b2.978d632c.js.map