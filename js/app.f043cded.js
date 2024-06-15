(function(){"use strict";var e={8914:function(e,t,a){var o=a(5130),r=a(6768),n=a(6450),l=a(8477);function u(e,t,a,o,u,s){const i=(0,r.g2)("Plannerz_Navbar"),d=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.Wv)(n.E,null,{default:(0,r.k6)((()=>[(0,r.bF)(i),(0,r.bF)(l.Y,null,{default:(0,r.k6)((()=>[(0,r.bF)(d)])),_:1})])),_:1})}var s=a(4232),i=a(3367),d=a(8332),c=a(554),m=a(1720),p=a(8050);function f(e,t,a,o,n,l){return(0,r.uX)(),(0,r.Wv)(i.z,{app:""},{default:(0,r.k6)((()=>[(0,r.bF)(d.Z,{onClick:e.toggleDrawer},null,8,["onClick"]),(0,r.bF)(p.s,null,{default:(0,r.k6)((()=>[(0,r.eW)("Mon App")])),_:1}),(0,r.bF)(m.h),e.user.firstname&&e.user.lastname?((0,r.uX)(),(0,r.Wv)(c.D,{key:0,color:"primary"},{default:(0,r.k6)((()=>[(0,r.eW)((0,s.v_)(e.user.firstname)+" "+(0,s.v_)(e.user.lastname),1)])),_:1})):(0,r.Q3)("",!0),e.isLoggedIn?((0,r.uX)(),(0,r.Wv)(c.D,{key:1,color:"primary",onClick:e.createGroup},{default:(0,r.k6)((()=>[(0,r.eW)("Créer un groupe")])),_:1},8,["onClick"])):(0,r.Q3)("",!0),e.isLoggedIn?((0,r.uX)(),(0,r.Wv)(c.D,{key:2,color:"primary",onClick:e.logout},{default:(0,r.k6)((()=>[(0,r.eW)("Déconnexion")])),_:1},8,["onClick"])):(0,r.Q3)("",!0)])),_:1})}var k=a(144),b=a(5068);const g=(0,k.Kh)({firstname:"",lastname:""}),v=(0,k.KR)(!1),_=e=>{g.firstname=e.firstname||"",g.lastname=e.lastname||"",v.value=!(!g.firstname||!g.lastname)},F=()=>{g.firstname="",g.lastname="",v.value=!1},h=e=>{if(!e)return!0;try{const t=(0,b.s)(e),{exp:a}=t||{},o=Date.now()/1e3;return a<o}catch(t){return console.error("Invalid token",t),!0}};a(4114);var y=a(1387);function D(){const e=(0,y.rd)(),t=()=>{const t=localStorage.getItem("token");if(console.log("Token: ",t),!t||h(t))e.push("/login");else{const e=JSON.parse(localStorage.getItem("user")||"{}");console.log("User data:",e),_(e),console.log("isLoggedIn: ",v.value),console.log("User state:",g)}},a=()=>{localStorage.removeItem("token"),localStorage.removeItem("user"),F(),e.push("/login").then((()=>{window.location.reload()}))},o=()=>{console.log("Creer")};return(0,r.sV)(t),{logout:a,createGroup:o}}var V=(0,r.pM)({name:"Plannerz_Navbar",setup(){const{logout:e,createGroup:t}=D(),a=()=>{};return{toggleDrawer:a,logout:e,createGroup:t,user:g,isLoggedIn:v}}}),w=a(1241);const W=(0,w.A)(V,[["render",f]]);var N=W,C=(0,r.pM)({name:"App",components:{Plannerz_Navbar:N}});const I=(0,w.A)(C,[["render",u]]);var T=I,L=a(3813),U=a(6554);function A(e,t,a,o,l,u){const i=(0,r.g2)("ListTeams");return(0,r.uX)(),(0,r.Wv)(n.E,null,{default:(0,r.k6)((()=>[(0,r.bF)(L.I,null,{default:(0,r.k6)((()=>[(0,r.bF)(i,{teams:e.listItems},null,8,["teams"]),(0,r.bF)(U.K,{modelValue:e.snackbar,"onUpdate:modelValue":t[1]||(t[1]=t=>e.snackbar=t),timeout:6e3,top:""},{default:(0,r.k6)((()=>[(0,r.eW)((0,s.v_)(e.error)+" ",1),(0,r.bF)(c.D,{color:"red",onClick:t[0]||(t[0]=t=>e.snackbar=!1)},{default:(0,r.k6)((()=>[(0,r.eW)("Close")])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1})}var S=a(6756),O=a(5526);function R(e,t,a,o,n,l){const u=(0,r.g2)("ListItem");return(0,r.uX)(),(0,r.Wv)(L.I,null,{default:(0,r.k6)((()=>[(0,r.bF)(S.L,null,{default:(0,r.k6)((()=>[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(e.teams,((e,t)=>((0,r.uX)(),(0,r.Wv)(O.B,{key:t,cols:"12"},{default:(0,r.k6)((()=>[(0,r.bF)(u,{team:e},null,8,["team"])])),_:2},1024)))),128))])),_:1})])),_:1})}var E=a(8374),K=a(697);function j(e,t,a,o,n,l){return(0,r.uX)(),(0,r.Wv)(E.J,{class:"ma-2"},{default:(0,r.k6)((()=>[(0,r.bF)(K.O,null,{default:(0,r.k6)((()=>[(0,r.eW)((0,s.v_)(e.team.name)+" ",1),(0,r.bF)(c.D,{class:"ml-4",color:"primary",onClick:e.viewGroup},{default:(0,r.k6)((()=>[(0,r.eW)("Voir le groupe")])),_:1},8,["onClick"])])),_:1})])),_:1})}a(4979);var M=(0,r.pM)({name:"ListItemTeams",props:{team:{type:Object,required:!0}},methods:{viewGroup(){const e=btoa(encodeURIComponent(JSON.stringify(this.team)));this.$router.push(`/team/${e}`)}}});const P=(0,w.A)(M,[["render",j]]);var X=P,q=(0,r.pM)({name:"ListTeams",components:{ListItem:X},props:{teams:{type:Array,required:!0}}});const x=(0,w.A)(q,[["render",R]]);var B=x,z=a(4373);const $=z.A.create({baseURL:"https://workload-plannerz-api-8f1fb119eefd.herokuapp.com/api"});var J=$,G=(0,r.pM)({name:"HomePage",components:{ListTeams:B},data(){return{listItems:[],snackbar:!1,error:""}},async mounted(){try{const e=localStorage.getItem("token")||"",t=await J.get("/users/teams",{headers:{Authorization:`Bearer ${e}`}});this.listItems=t.data}catch(e){const t=e;t.response&&t.response.data?this.error=t.response.data.message||"An error occurred":t.request?this.error="No response received from server":this.error=t.message||"An error occurred",this.snackbar=!0}}});const Q=(0,w.A)(G,[["render",A]]);var Y=Q;function H(e,t,a,o,u,s){const i=(0,r.g2)("TeamForm"),d=(0,r.g2)("SearchList");return(0,r.uX)(),(0,r.Wv)(n.E,null,{default:(0,r.k6)((()=>[(0,r.bF)(l.Y,null,{default:(0,r.k6)((()=>[(0,r.bF)(L.I,null,{default:(0,r.k6)((()=>[(0,r.bF)(i),(0,r.bF)(d),(0,r.bF)(c.D,{color:"primary",onClick:e.create_group},{default:(0,r.k6)((()=>[(0,r.eW)("Créer")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})}var Z=a(1560),ee=a(3948);function te(e,t,a,o,n,l){return(0,r.uX)(),(0,r.Wv)(Z.n,null,{default:(0,r.k6)((()=>[(0,r.bF)(ee.W,{modelValue:e.groupName,"onUpdate:modelValue":t[0]||(t[0]=t=>e.groupName=t),label:"Nom du groupe",outlined:""},null,8,["modelValue"])])),_:1})}var ae=(0,r.pM)({name:"TeamForm",setup(){const e=(0,k.KR)("");return{groupName:e}}});const oe=(0,w.A)(ae,[["render",te]]);var re=oe,ne=a(276),le=a(7009),ue=a(7254),se=a(7294),ie=a(3263);function de(e,t,a,o,n,l){const u=(0,r.g2)("v-list-item-content");return(0,r.uX)(),(0,r.Wv)(L.I,null,{default:(0,r.k6)((()=>[(0,r.bF)(ee.W,{modelValue:e.searchQuery,"onUpdate:modelValue":t[0]||(t[0]=t=>e.searchQuery=t),label:"Rechercher",outlined:""},null,8,["modelValue"]),(0,r.bF)(le.x8,null,{default:(0,r.k6)((()=>[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(e.filteredItems,((e,t)=>((0,r.uX)(),(0,r.Wv)(ue.g,{key:t},{default:(0,r.k6)((()=>[(0,r.bF)(u,null,{default:(0,r.k6)((()=>[(0,r.bF)(se.U,null,{default:(0,r.k6)((()=>[(0,r.eW)((0,s.v_)(e.text),1)])),_:2},1024)])),_:2},1024),(0,r.bF)(ie.k,null,{default:(0,r.k6)((()=>[(0,r.bF)(ne.a,{modelValue:e.added,"onUpdate:modelValue":t=>e.added=t,label:"Ajouter"},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})}var ce=(0,r.pM)({name:"SearchList",setup(){const e=(0,k.KR)(""),t=(0,k.KR)([{text:"Item 1",added:!1},{text:"Item 2",added:!1},{text:"Item 3",added:!1},{text:"Item 4",added:!1}]),a=(0,r.EW)((()=>e.value?t.value.filter((t=>t.text.toLowerCase().includes(e.value.toLowerCase()))):t.value));return{searchQuery:e,items:t,filteredItems:a}}});const me=(0,w.A)(ce,[["render",de]]);var pe=me,fe=(0,r.pM)({name:"TeamCreation",components:{TeamForm:re,SearchList:pe},methods:{create_group(){console.log("Créer le groupe")}}});const ke=(0,w.A)(fe,[["render",H]]);var be=ke;function ge(e,t,a,o,u,i){const d=(0,r.g2)("TeamForm"),m=(0,r.g2)("SearchList");return(0,r.uX)(),(0,r.Wv)(n.E,null,{default:(0,r.k6)((()=>[(0,r.bF)(l.Y,null,{default:(0,r.k6)((()=>[(0,r.Lk)("h1",null,"Éditer le groupe "+(0,s.v_)(e.id),1),(0,r.bF)(L.I,null,{default:(0,r.k6)((()=>[(0,r.bF)(d),(0,r.bF)(m),(0,r.bF)(c.D,{color:"primary",onClick:e.edit_group},{default:(0,r.k6)((()=>[(0,r.eW)("Modifier")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})}var ve=(0,r.pM)({name:"TeamEdit",props:{id:{type:String,required:!0}},setup(e){const t=(0,k.KR)("");(0,r.sV)((()=>{console.log(`Éditer le groupe avec l'ID: ${e.id}`),t.value=`Nom du groupe ${e.id}`}));const a=()=>{console.log(`Enregistrer le groupe: ${t.value}`)};return{groupName:t,saveGroup:a}},components:{TeamForm:re,SearchList:pe},methods:{edit_group(){console.log("Modifier le groupe")}}});const _e=(0,w.A)(ve,[["render",ge]]);var Fe=_e;function he(e,t,a,o,u,s){const i=(0,r.g2)("TaskForm");return(0,r.uX)(),(0,r.Wv)(n.E,null,{default:(0,r.k6)((()=>[(0,r.bF)(l.Y,null,{default:(0,r.k6)((()=>[(0,r.bF)(L.I,null,{default:(0,r.k6)((()=>[(0,r.bF)(i,{taskName:e.taskName,"onUpdate:taskName":t[0]||(t[0]=t=>e.taskName=t),taskDescription:e.taskDescription,"onUpdate:taskDescription":t[1]||(t[1]=t=>e.taskDescription=t),priority:e.priority,"onUpdate:priority":t[2]||(t[2]=t=>e.priority=t),dueDate:e.dueDate,"onUpdate:dueDate":t[3]||(t[3]=t=>e.dueDate=t)},null,8,["taskName","taskDescription","priority","dueDate"]),(0,r.bF)(c.D,{onClick:e.submitTask},{default:(0,r.k6)((()=>[(0,r.eW)("Créer la tache")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})}var ye=a(6503),De=a(8249),Ve=a(3327),we=a(3740);function We(e,t,a,o,n,l){return(0,r.uX)(),(0,r.Wv)(Z.n,null,{default:(0,r.k6)((()=>[(0,r.bF)(ee.W,{modelValue:e.localTaskName,"onUpdate:modelValue":t[0]||(t[0]=t=>e.localTaskName=t),label:"Nom",outlined:""},null,8,["modelValue"]),(0,r.bF)(we.J,{modelValue:e.localTaskDescription,"onUpdate:modelValue":t[1]||(t[1]=t=>e.localTaskDescription=t),label:"Description",outlined:""},null,8,["modelValue"]),(0,r.bF)(Ve.d4,{modelValue:e.localPriority,"onUpdate:modelValue":t[2]||(t[2]=t=>e.localPriority=t),items:e.priorityLevels,label:"Niveau de priorité",outlined:""},null,8,["modelValue","items"]),(0,r.bF)(De.q,{modelValue:e.menu,"onUpdate:modelValue":t[7]||(t[7]=t=>e.menu=t),"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"auto"},{activator:(0,r.k6)((({on:a,attrs:o})=>[(0,r.bF)(ee.W,(0,r.v6)({modelValue:e.localDueDate,"onUpdate:modelValue":t[3]||(t[3]=t=>e.localDueDate=t),label:"Date d'échéance",outlined:"",readonly:""},o,(0,r.Tb)(a),{onClick:t[4]||(t[4]=t=>e.menu=!e.menu)}),null,16,["modelValue"])])),default:(0,r.k6)((()=>[(0,r.bF)(ye.f,{modelValue:e.localDueDate,"onUpdate:modelValue":t[5]||(t[5]=t=>e.localDueDate=t),onInput:t[6]||(t[6]=t=>e.menu=!1)},null,8,["modelValue"])])),_:1},8,["modelValue"])])),_:1})}var Ne=(0,r.pM)({name:"TaskForm",props:{taskName:{type:String,required:!0},taskDescription:{type:String,required:!0},priority:{type:String,required:!0},dueDate:{type:String,required:!0}},setup(e,{emit:t}){const a=(0,k.KR)(e.taskName),o=(0,k.KR)(e.taskDescription),n=(0,k.KR)(e.priority),l=(0,k.KR)(e.dueDate||null),u=(0,k.KR)(!1),s=(0,k.KR)(["Faible","Moyenne","Haute"]);return(0,r.wB)(a,(e=>t("update:taskName",e))),(0,r.wB)(o,(e=>t("update:taskDescription",e))),(0,r.wB)(n,(e=>t("update:priority",e))),(0,r.wB)(l,(e=>t("update:dueDate",e))),{localTaskName:a,localTaskDescription:o,localPriority:n,localDueDate:l,menu:u,priorityLevels:s}}});const Ce=(0,w.A)(Ne,[["render",We]]);var Ie=Ce,Te=(0,r.pM)({name:"TaskPage",components:{TaskForm:Ie},setup(){const e=(0,k.KR)(""),t=(0,k.KR)(""),a=(0,k.KR)(""),o=(0,k.KR)(""),r=()=>{console.log("Tache crée"),console.log("Nom:",e.value),console.log("Description:",t.value),console.log("Priorité:",a.value),console.log("Date d'échéance:",o.value)};return{taskName:e,taskDescription:t,priority:a,dueDate:o,submitTask:r}}});const Le=(0,w.A)(Te,[["render",he]]);var Ue=Le;function Ae(e,t,a,o,u,s){const i=(0,r.g2)("TaskForm");return(0,r.uX)(),(0,r.Wv)(n.E,null,{default:(0,r.k6)((()=>[(0,r.bF)(l.Y,null,{default:(0,r.k6)((()=>[(0,r.bF)(L.I,null,{default:(0,r.k6)((()=>[(0,r.bF)(i,{taskName:e.taskName,"onUpdate:taskName":t[0]||(t[0]=t=>e.taskName=t),taskDescription:e.taskDescription,"onUpdate:taskDescription":t[1]||(t[1]=t=>e.taskDescription=t),priority:e.priority,"onUpdate:priority":t[2]||(t[2]=t=>e.priority=t),dueDate:e.dueDate,"onUpdate:dueDate":t[3]||(t[3]=t=>e.dueDate=t)},null,8,["taskName","taskDescription","priority","dueDate"]),(0,r.bF)(c.D,{onClick:e.submitTask},{default:(0,r.k6)((()=>[(0,r.eW)("Modifier la tache")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})}var Se=(0,r.pM)({name:"TaskPage",components:{TaskForm:Ie},setup(){const e=(0,k.KR)(""),t=(0,k.KR)(""),a=(0,k.KR)(""),o=(0,k.KR)(""),r=()=>{console.log("Tache modifiée"),console.log("Nom:",e.value),console.log("Description:",t.value),console.log("Priorité:",a.value),console.log("Date d'échéance:",o.value)};return{taskName:e,taskDescription:t,priority:a,dueDate:o,submitTask:r}}});const Oe=(0,w.A)(Se,[["render",Ae]]);var Re=Oe,Ee=a(1606),Ke=a(7511);const je={class:"switch-link"};function Me(e,t,a,l,u,s){const i=(0,r.g2)("router-link"),d=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.Wv)(n.E,{id:"app"},{default:(0,r.k6)((()=>[(0,r.bF)(L.I,{class:"login-container",fluid:""},{default:(0,r.k6)((()=>[(0,r.bF)(S.L,{align:"center",justify:"center"},{default:(0,r.k6)((()=>[(0,r.bF)(O.B,{cols:"12",md:"6",lg:"4"},{default:(0,r.k6)((()=>[(0,r.bF)(E.J,{class:"login-box",elevation:"10"},{default:(0,r.k6)((()=>[(0,r.bF)(Ee.r,{class:"headline title"},{default:(0,r.k6)((()=>[(0,r.eW)("Login")])),_:1}),(0,r.bF)(K.O,null,{default:(0,r.k6)((()=>[(0,r.bF)(Z.n,{onSubmit:(0,o.D$)(e.login,["prevent"])},{default:(0,r.k6)((()=>[(0,r.bF)(ee.W,{label:"Email",modelValue:e.form.email,"onUpdate:modelValue":t[0]||(t[0]=t=>e.form.email=t),required:"",type:"email",outlined:"",class:"input-field"},null,8,["modelValue"]),(0,r.bF)(ee.W,{label:"Password",modelValue:e.form.password,"onUpdate:modelValue":t[1]||(t[1]=t=>e.form.password=t),required:"",type:"password",outlined:"",class:"input-field"},null,8,["modelValue"]),(0,r.bF)(c.D,{type:"submit",color:"primary",block:"",large:"",class:"login-btn"},{default:(0,r.k6)((()=>[(0,r.eW)("Login")])),_:1})])),_:1},8,["onSubmit"]),(0,r.bF)(Ke.G,{class:"my-4"}),(0,r.Lk)("div",je,[(0,r.eW)(" Don't have an account? "),(0,r.bF)(i,{to:"/register"},{default:(0,r.k6)((()=>[(0,r.bF)(c.D,{text:"",color:"primary"},{default:(0,r.k6)((()=>[(0,r.eW)("Register")])),_:1})])),_:1})])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),(0,r.bF)(d)])),_:1})}var Pe=(0,r.pM)({name:"LoginController",setup(){const e=(0,y.rd)(),t=(0,k.Kh)({email:"",password:""}),a=async()=>{try{console.log("Sending login request",t);const a=await J.post("/auth/signin",t);console.log("Login successful:",a.data),localStorage.setItem("token",a.data.token),localStorage.setItem("user",JSON.stringify(a.data.user)),e.push("/").then((()=>{window.location.reload()}))}catch(a){console.error("Login error:",a)}};return{form:t,login:a}}});const Xe=(0,w.A)(Pe,[["render",Me]]);var qe=Xe;const xe={class:"switch-link"};function Be(e,t,a,l,u,s){const i=(0,r.g2)("router-link"),d=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.Wv)(n.E,{id:"app"},{default:(0,r.k6)((()=>[(0,r.bF)(L.I,{class:"register-container",fluid:""},{default:(0,r.k6)((()=>[(0,r.bF)(S.L,{align:"center",justify:"center"},{default:(0,r.k6)((()=>[(0,r.bF)(O.B,{cols:"12",md:"6",lg:"4"},{default:(0,r.k6)((()=>[(0,r.bF)(E.J,{class:"register-box",elevation:"10"},{default:(0,r.k6)((()=>[(0,r.bF)(Ee.r,{class:"headline title"},{default:(0,r.k6)((()=>[(0,r.eW)("Register")])),_:1}),(0,r.bF)(K.O,null,{default:(0,r.k6)((()=>[(0,r.bF)(Z.n,{onSubmit:(0,o.D$)(e.register,["prevent"])},{default:(0,r.k6)((()=>[(0,r.bF)(ee.W,{label:"First Name",modelValue:e.form.firstname,"onUpdate:modelValue":t[0]||(t[0]=t=>e.form.firstname=t),required:"",outlined:"",class:"input-field"},null,8,["modelValue"]),(0,r.bF)(ee.W,{label:"Last Name",modelValue:e.form.lastname,"onUpdate:modelValue":t[1]||(t[1]=t=>e.form.lastname=t),required:"",outlined:"",class:"input-field"},null,8,["modelValue"]),(0,r.bF)(ee.W,{label:"Job",modelValue:e.form.job,"onUpdate:modelValue":t[2]||(t[2]=t=>e.form.job=t),required:"",outlined:"",class:"input-field"},null,8,["modelValue"]),(0,r.bF)(ee.W,{label:"Email",modelValue:e.form.email,"onUpdate:modelValue":t[3]||(t[3]=t=>e.form.email=t),required:"",outlined:"",type:"email",class:"input-field"},null,8,["modelValue"]),(0,r.bF)(ee.W,{label:"Password",modelValue:e.form.password,"onUpdate:modelValue":t[4]||(t[4]=t=>e.form.password=t),required:"",outlined:"",type:"password",class:"input-field"},null,8,["modelValue"]),(0,r.bF)(c.D,{type:"submit",color:"primary",block:"",large:"",class:"register-btn"},{default:(0,r.k6)((()=>[(0,r.eW)("Register")])),_:1})])),_:1},8,["onSubmit"]),(0,r.bF)(Ke.G,{class:"my-4"}),(0,r.Lk)("div",xe,[(0,r.eW)(" Already have an account? "),(0,r.bF)(i,{to:"/login"},{default:(0,r.k6)((()=>[(0,r.bF)(c.D,{text:"",color:"primary"},{default:(0,r.k6)((()=>[(0,r.eW)("Login")])),_:1})])),_:1})])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),(0,r.bF)(d)])),_:1})}var ze=(0,r.pM)({name:"RegisterController",setup(){const e=(0,y.rd)(),t=(0,k.Kh)({firstname:"",lastname:"",job:"",email:"",password:""}),a=async()=>{try{const a=await J.post("/auth/signup",t);console.log("Registration successful:",a.data),e.push("/login")}catch(a){console.error("Registration error:",a)}};return{form:t,register:a}}});const $e=(0,w.A)(ze,[["render",Be]]);var Je=$e,Ge=a(7505);const Qe=(0,r.Lk)("h1",null,"Détails de l'équipe",-1);function Ye(e,t,a,o,u,i){const d=(0,r.g2)("v-subheader"),m=(0,r.g2)("v-list-item-content");return(0,r.uX)(),(0,r.Wv)(n.E,null,{default:(0,r.k6)((()=>[(0,r.bF)(l.Y,null,{default:(0,r.k6)((()=>[(0,r.bF)(L.I,null,{default:(0,r.k6)((()=>[(0,r.bF)(E.J,null,{default:(0,r.k6)((()=>[(0,r.bF)(Ee.r,null,{default:(0,r.k6)((()=>[Qe])),_:1}),(0,r.bF)(K.O,null,{default:(0,r.k6)((()=>[(0,r.bF)(S.L,null,{default:(0,r.k6)((()=>[(0,r.bF)(O.B,{cols:"12"},{default:(0,r.k6)((()=>[(0,r.bF)(ee.W,{modelValue:e.team.name,"onUpdate:modelValue":t[0]||(t[0]=t=>e.team.name=t),label:"Nom de l'équipe",readonly:""},null,8,["modelValue"])])),_:1}),(0,r.bF)(O.B,{cols:"12"},{default:(0,r.k6)((()=>[(0,r.bF)(ee.W,{modelValue:e.team.owner,"onUpdate:modelValue":t[1]||(t[1]=t=>e.team.owner=t),label:"Propriétaire",readonly:""},null,8,["modelValue"])])),_:1}),(0,r.bF)(O.B,{cols:"12"},{default:(0,r.k6)((()=>[(0,r.bF)(d,null,{default:(0,r.k6)((()=>[(0,r.eW)("Membres de l'équipe")])),_:1}),(0,r.bF)(le.x8,null,{default:(0,r.k6)((()=>[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(e.members,((t,a)=>((0,r.uX)(),(0,r.Wv)(ue.g,{key:a},{default:(0,r.k6)((()=>[(0,r.bF)(S.L,{align:"center",justify:"space-between","no-gutters":""},{default:(0,r.k6)((()=>[(0,r.bF)(O.B,null,{default:(0,r.k6)((()=>[(0,r.bF)(m,null,{default:(0,r.k6)((()=>[(0,r.bF)(se.U,null,{default:(0,r.k6)((()=>[(0,r.eW)((0,s.v_)(t.firstname)+" "+(0,s.v_)(t.lastname),1)])),_:2},1024),(0,r.bF)(Ge.w,null,{default:(0,r.k6)((()=>[(0,r.eW)((0,s.v_)(t.email),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),(0,r.bF)(O.B,{cols:"auto"},{default:(0,r.k6)((()=>[(0,r.bF)(ie.k,null,{default:(0,r.k6)((()=>[(0,r.bF)(c.D,{color:"primary",onClick:a=>e.viewTasks(t._id)},{default:(0,r.k6)((()=>[(0,r.eW)("Voir les tâches")])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),(0,r.bF)(U.K,{modelValue:e.snackbar,"onUpdate:modelValue":t[3]||(t[3]=t=>e.snackbar=t),timeout:6e3,top:""},{default:(0,r.k6)((()=>[(0,r.eW)((0,s.v_)(e.error)+" ",1),(0,r.bF)(c.D,{color:"red",onClick:t[2]||(t[2]=t=>e.snackbar=!1)},{default:(0,r.k6)((()=>[(0,r.eW)("Close")])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1})}var He=(0,r.pM)({name:"TeamDetailsPage",data(){return{team:{},members:[],error:"",snackbar:!1}},async mounted(){const e=this.$route.params.teamData;try{const t=Array.isArray(e)?"":decodeURIComponent(atob(e));this.team=JSON.parse(t)}catch(t){console.error("Erreur lors du décodage des données de l'équipe",t)}try{const e=localStorage.getItem("token")||"",t=await J.get(`/teams/${this.team._id}/members`,{headers:{Authorization:`Bearer ${e}`}});this.members=t.data}catch(t){const e=t;e.response&&e.response.data?this.error=e.response.data.message||"An error occurred":e.request?this.error="No response received from server":this.error=e.message||"An error occurred",this.snackbar=!0}},methods:{viewTasks(e){console.log(e)}}});const Ze=(0,w.A)(He,[["render",Ye]]);var et=Ze;const tt=[{path:"/",name:"home",component:Y},{path:"/team/:teamData",name:"team_view",component:et},{path:"/create",name:"team_creation",component:be},{path:"/team/:id/edit",name:"team_edit",component:Fe,props:!0},{path:"/team/:id/task/create",name:"task_create",component:Ue,props:!0},{path:"/team/:id/task/:id_task/edit",name:"task_edit",component:Re,props:!0},{path:"/login",name:"login",component:qe},{path:"/register",name:"Register",component:Je}],at=(0,y.aE)({history:(0,y.LA)("/workload-plannerz/"),routes:tt});var ot=at,rt=a(782),nt=(0,rt.y$)({state:{},getters:{},mutations:{},actions:{},modules:{}}),lt=(a(5524),a(7768)),ut=a(8221),st=(0,lt.$N)({icons:{defaultSet:"mdi",aliases:ut.z,sets:{mdi:ut.r}}});async function it(){const e=await a.e(53).then(a.t.bind(a,8874,23));e.load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}it(),(0,o.Ef)(T).use(nt).use(ot).use(st).mount("#app")}},t={};function a(o){var r=t[o];if(void 0!==r)return r.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,a),n.exports}a.m=e,function(){var e=[];a.O=function(t,o,r,n){if(!o){var l=1/0;for(d=0;d<e.length;d++){o=e[d][0],r=e[d][1],n=e[d][2];for(var u=!0,s=0;s<o.length;s++)(!1&n||l>=n)&&Object.keys(a.O).every((function(e){return a.O[e](o[s])}))?o.splice(s--,1):(u=!1,n<l&&(l=n));if(u){e.splice(d--,1);var i=r();void 0!==i&&(t=i)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[o,r,n]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};a.t=function(o,r){if(1&r&&(o=this(o)),8&r)return o;if("object"===typeof o&&o){if(4&r&&o.__esModule)return o;if(16&r&&"function"===typeof o.then)return o}var n=Object.create(null);a.r(n);var l={};e=e||[null,t({}),t([]),t(t)];for(var u=2&r&&o;"object"==typeof u&&!~e.indexOf(u);u=t(u))Object.getOwnPropertyNames(u).forEach((function(e){l[e]=function(){return o[e]}}));return l["default"]=function(){return o},a.d(n,l),n}}(),function(){a.d=function(e,t){for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,o){return a.f[o](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/webfontloader.d9e8244d.js"}}(),function(){a.miniCssF=function(e){}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="workload-plannerz:";a.l=function(o,r,n,l){if(e[o])e[o].push(r);else{var u,s;if(void 0!==n)for(var i=document.getElementsByTagName("script"),d=0;d<i.length;d++){var c=i[d];if(c.getAttribute("src")==o||c.getAttribute("data-webpack")==t+n){u=c;break}}u||(s=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,a.nc&&u.setAttribute("nonce",a.nc),u.setAttribute("data-webpack",t+n),u.src=o),e[o]=[r];var m=function(t,a){u.onerror=u.onload=null,clearTimeout(p);var r=e[o];if(delete e[o],u.parentNode&&u.parentNode.removeChild(u),r&&r.forEach((function(e){return e(a)})),t)return t(a)},p=setTimeout(m.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=m.bind(null,u.onerror),u.onload=m.bind(null,u.onload),s&&document.head.appendChild(u)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/workload-plannerz/"}(),function(){var e={524:0};a.f.j=function(t,o){var r=a.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var n=new Promise((function(a,o){r=e[t]=[a,o]}));o.push(r[2]=n);var l=a.p+a.u(t),u=new Error,s=function(o){if(a.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var n=o&&("load"===o.type?"missing":o.type),l=o&&o.target&&o.target.src;u.message="Loading chunk "+t+" failed.\n("+n+": "+l+")",u.name="ChunkLoadError",u.type=n,u.request=l,r[1](u)}};a.l(l,s,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,n,l=o[0],u=o[1],s=o[2],i=0;if(l.some((function(t){return 0!==e[t]}))){for(r in u)a.o(u,r)&&(a.m[r]=u[r]);if(s)var d=s(a)}for(t&&t(o);i<l.length;i++)n=l[i],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(d)},o=self["webpackChunkworkload_plannerz"]=self["webpackChunkworkload_plannerz"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=a.O(void 0,[504],(function(){return a(8914)}));o=a.O(o)})();
//# sourceMappingURL=app.f043cded.js.map