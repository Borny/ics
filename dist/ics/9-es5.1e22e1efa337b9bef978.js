function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var s=0;s<n.length;s++){var t=n[s];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,n,s){return n&&_defineProperties(e.prototype,n),s&&_defineProperties(e,s),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{ZGqS:function(e,n,s){"use strict";s.r(n),s.d(n,"ProgramsViewModule",(function(){return P}));var t=s("ofXK"),i=s("tyNb"),a=s("fXoL"),o=s("wZkO"),r=s("SV0B");function c(e,n){if(1&e&&(a.Sb(0,"li"),a.Sb(1,"span",10),a.yc(2),a.Rb(),a.yc(3),a.Rb()),2&e){var s=n.$implicit;a.Bb(2),a.zc(s.age),a.Bb(1),a.Bc(" - ",s.startTime,"-",s.endTime," ")}}function d(e,n){if(1&e&&(a.Sb(0,"div",3),a.Sb(1,"div",4),a.Sb(2,"p",5),a.yc(3),a.Rb(),a.Sb(4,"div",6),a.Sb(5,"p"),a.yc(6),a.Rb(),a.Sb(7,"p"),a.yc(8),a.Rb(),a.Sb(9,"p"),a.yc(10),a.Rb(),a.Rb(),a.Sb(11,"div",7),a.Sb(12,"p",8),a.yc(13),a.Rb(),a.Sb(14,"ul"),a.wc(15,c,4,3,"li",9),a.Rb(),a.Rb(),a.Rb(),a.Rb()),2&e){var s=a.ec();a.Bb(3),a.zc(s.sessionsKids.address.city),a.Bb(3),a.Ac(" ",s.sessionsKids.address.venue," "),a.Bb(2),a.Ac(" ",s.sessionsKids.address.street," "),a.Bb(2),a.Ac(" ",s.sessionsKids.address.zipcode," "),a.Bb(3),a.zc(s.sessionsKids.schedule.day),a.Bb(2),a.jc("ngForOf",s.sessionsKids.schedule.groups)}}function u(e,n){if(1&e&&(a.Sb(0,"li"),a.Sb(1,"span",8),a.yc(2),a.Rb(),a.yc(3),a.Rb()),2&e){var s=n.$implicit;a.Bb(2),a.zc(s.day),a.Bb(1),a.Bc(" - ",s.startTime,"-",s.endTime," ")}}function l(e,n){if(1&e&&(a.Sb(0,"div",7),a.Sb(1,"p",12),a.yc(2),a.Rb(),a.Sb(3,"ul"),a.wc(4,u,4,3,"li",9),a.Rb(),a.Rb()),2&e){var s=n.$implicit;a.Bb(2),a.zc(s.category),a.Bb(2),a.jc("ngForOf",s.time)}}function p(e,n){if(1&e&&(a.Sb(0,"div",3),a.Sb(1,"div",4),a.Sb(2,"p",5),a.yc(3),a.Rb(),a.Sb(4,"div",6),a.Sb(5,"p"),a.yc(6),a.Rb(),a.Sb(7,"p"),a.yc(8),a.Rb(),a.Sb(9,"p"),a.yc(10),a.Rb(),a.Rb(),a.wc(11,l,5,2,"div",11),a.Rb(),a.Rb()),2&e){var s=a.ec();a.Bb(3),a.zc(s.sessionsAdults.address.city),a.Bb(3),a.zc(s.sessionsAdults.address.venue),a.Bb(2),a.zc(s.sessionsAdults.address.street),a.Bb(2),a.zc(s.sessionsAdults.address.zipcode),a.Bb(1),a.jc("ngForOf",s.sessionsAdults.schedule)}}var m,b=((m=function(){function e(){_classCallCheck(this,e),console.log(this.sessionsAdults)}return _createClass(e,[{key:"ngOnInit",value:function(){console.log(this.sessionsAdults)}}]),e}()).\u0275fac=function(e){return new(e||m)},m.\u0275cmp=a.Hb({type:m,selectors:[["organism-sessions"]],inputs:{sessionsKids:"sessionsKids",sessionsAdults:"sessionsAdults",style:"style"},decls:4,vars:3,consts:[[1,"session__container",3,"ngClass"],["class","session__content",4,"ngIf","ngIfElse"],["adults",""],[1,"session__content"],[1,"session__info"],[1,"session__city"],[1,"session__address"],[1,"session__schedules"],[1,"session__day"],[4,"ngFor","ngForOf"],[1,"session__age"],["class","session__schedules",4,"ngFor","ngForOf"],[1,"session__category"]],template:function(e,n){if(1&e&&(a.Sb(0,"div",0),a.wc(1,d,16,6,"div",1),a.wc(2,p,12,5,"ng-template",null,2,a.xc),a.Rb()),2&e){var s=a.oc(3);a.jc("ngClass",n.style),a.Bb(1),a.jc("ngIf",n.sessionsKids)("ngIfElse",s)}},directives:[t.h,t.j,t.i],styles:[".session__content[_ngcontent-%COMP%]{max-width:992px;margin:0 auto;padding:1rem}.session__city[_ngcontent-%COMP%]{font-size:1.2rem;font-weight:700}.session__address[_ngcontent-%COMP%], .session__city[_ngcontent-%COMP%], .session__schedules[_ngcontent-%COMP%]{margin:0 0 1rem}.session__age[_ngcontent-%COMP%], .session__category[_ngcontent-%COMP%], .session__day[_ngcontent-%COMP%]{font-weight:700}.even[_ngcontent-%COMP%]{background:#fff}.even[_ngcontent-%COMP%]   .session__age[_ngcontent-%COMP%], .even[_ngcontent-%COMP%]   .session__city[_ngcontent-%COMP%], .even[_ngcontent-%COMP%]   .session__day[_ngcontent-%COMP%]{color:#393185}.odd[_ngcontent-%COMP%]{background:#393185;color:#fff}"]}),m),g=function(e,n){return{odd:e,even:n}};function f(e,n){if(1&e&&a.Ob(0,"organism-sessions",16),2&e){var s=n.$implicit;a.uc(a.mc(3,g,n.odd,n.even)),a.jc("sessionsKids",s)}}function v(e,n){if(1&e&&a.Ob(0,"organism-sessions",17),2&e){var s=n.$implicit;a.uc(a.mc(3,g,n.odd,n.even)),a.jc("sessionsAdults",s)}}var y,_,h,C=[{path:"",component:(y=function(){function e(n){_classCallCheck(this,e),this.router=n,this.contactBtnText="Nous contacter",this.subscriptionBtnText="Nous contacter",this.sessionsKids=[{address:{city:"Paris",venue:"La Tour des Dames",street:"18 rue de la Tour des Dames",zipcode:75009},schedule:{day:"Samedi",groups:[{age:"4-5 ans",startTime:"14:00",endTime:"14:50"},{age:"6-10 ans",startTime:"15:00",endTime:"16:00"}]}},{address:{city:"Colombes",venue:"Gymnase Henri Dunant",street:"147 rue Henri Dunant",zipcode:92700},schedule:{day:"Samedi",groups:[{age:"4-5 ans",startTime:"10:10",endTime:"11:00"},{age:"6-10 ans",startTime:"11:00",endTime:"12:00"}]}},{address:{city:"Colombes",venue:"Ecole Maintenon",street:"44, rue Saint Denis",zipcode:92700},schedule:{day:"Adolescents",groups:[{age:"Lundi",startTime:"18:45",endTime:"19:45"},{age:"Mercredi",startTime:"19:30",endTime:"20:30"},{age:"Vendredi",startTime:"19:30",endTime:"21:00"}]}},{address:{city:"Bois Colombes",venue:"Dojo Jean Jaur\xe8s",street:"Avenue du Vaudreuil",zipcode:92270},schedule:{day:"Mercredi",groups:[{age:"4-5 ans",startTime:"17:10",endTime:"18:00"},{age:"6-10 ans",startTime:"18:00",endTime:"19:00"}]}}],this.sessionsAdults=[{address:{city:"Colombes",venue:"Ecole Maintenon",street:"44, rue Saint Denis",zipcode:92700},schedule:[{category:"Adolescents",time:[{day:"Lundi",startTime:"18:45",endTime:"19:45"},{day:"Mercredi",startTime:"19:30",endTime:"20:30"},{day:"Vendredi",startTime:"19:30",endTime:"21:00"}]},{category:"Adultes",time:[{day:"Lundi",startTime:"19:30",endTime:"20:45"},{day:"Mercredi",startTime:"20:00",endTime:"21:00"},{day:"Vendredi",startTime:"19:30",endTime:"21:00"}]}]}]}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"onNavigateContact",value:function(e){this.router.navigateByUrl("/contact")}},{key:"onNavigateSubscription",value:function(e){this.router.navigateByUrl("/contact")}}]),e}(),y.\u0275fac=function(e){return new(e||y)(a.Nb(i.b))},y.\u0275cmp=a.Hb({type:y,selectors:[["programs"]],decls:54,vars:6,consts:[[1,"main"],[1,"section__content"],[1,"hero"],[1,"title-xl","uppercase"],["mat-align-tabs","center","mat-stretch-tabs","",3,"backgroundColor"],["label","Ecoles"],[1,"tab__content"],[1,"color-primary"],["src","../../../assets/edinho-kid.jpg","alt","contramestre edinho et enfant"],[1,"btn",3,"text","clickEvent"],["label","Enfants"],["src","../../../assets/kids-bananeira.jpg","alt","enfants \xe9quilibre"],[3,"style","sessionsKids",4,"ngFor","ngForOf"],["label","Ados-Adultes"],["src","../../../assets/movement-duo.jpg","alt","enfants \xe9quilibre"],[3,"style","sessionsAdults",4,"ngFor","ngForOf"],[3,"sessionsKids"],[3,"sessionsAdults"]],template:function(e,n){1&e&&(a.Sb(0,"main",0),a.Sb(1,"section",1),a.Sb(2,"div",2),a.Sb(3,"p",3),a.yc(4," Nos Programmes "),a.Rb(),a.Rb(),a.Sb(5,"mat-tab-group",4),a.Sb(6,"mat-tab",5),a.Sb(7,"div",6),a.Sb(8,"h1"),a.yc(9,"Capoeira \xe0 l'\xe9cole"),a.Rb(),a.Sb(10,"p",7),a.yc(11,"Capoeira, culture et \xe9ducation"),a.Rb(),a.Sb(12,"p"),a.yc(13," Le programme Capoeira Culture et Education va plus loin qu\u2019une simple activit\xe9 \xe0 l\u2019\xe9cole. L\u2019objectif de ce programme est de contribuer \xe0 l\u2019\xe9ducation des enfants en partenariat avec l\u2019institution et/ou l\u2019\xe9cole, la famille et la soci\xe9t\xe9, en int\xe9grant simultan\xe9ment ces trois piliers majeurs dans le d\xe9veloppement de la personnalit\xe9 de l\u2019enfant. Notre programme a \xe9t\xe9 cr\xe9\xe9 par le professeur Ederson Gon\xe7alves (coordinateur du Groupe Cord\xe3o de Ouro Ile-de-France), avec le soutien d\u2019un groupe exp\xe9riment\xe9 de Ma\xeetres de capoeira et professionnels de la p\xe9dagogie enfantine. "),a.Rb(),a.Sb(14,"p"),a.yc(15," Notre programme se d\xe9cline en 2 propositions et ce en fonction du projet \xe9ducatif et de la disponibilit\xe9 de chaque \xe9tablissement. Ainsi ce programme peut trouver sa place durant le temps scolaire ou bien sur le temps p\xe9riscolaire. En plus de l\u2019enseignement de la capoeira \xe0 travers sa forme ludique, nous proposons au sein de notre programme des options qui peuvent \xeatre ajout\xe9es en accord avec le projet annuel de l\u2019\xe9cole. Programmes sp\xe9cifiques pour \xe9coles et institutions priv\xe9es, associations de parents, centre socio-\xe9ducatifs. Pour plus d\u2019information, nous consulter. "),a.Rb(),a.Rb(),a.Ob(16,"img",8),a.Sb(17,"atom-button",9),a.ac("clickEvent",(function(e){return n.onNavigateContact(e)})),a.Rb(),a.Rb(),a.Sb(18,"mat-tab",10),a.Sb(19,"div",6),a.Sb(20,"h1"),a.yc(21," Enfants "),a.Rb(),a.Sb(22,"p",7),a.yc(23,"Camaradinhas"),a.Rb(),a.Sb(24,"p"),a.yc(25," Les mouvements de base de la capoeira sont adapt\xe9s et enseign\xe9s aux enfants \xe0 travers des jeux. Notre m\xe9thode probante est de faire appel \xe0 l\u2019imaginaire ; cela permet de capter l\u2019attention et la concentration des enfants. La capoeira devient plus qu\u2019un sport pour la vie de L'Enfant qui la pratique, \xe7a devient aussi un jeu, un moment r\xe9cr\xe9atif. Le jeu symbolique est la repr\xe9sentation corporelle de l'imaginaire, avec la fantaisie qui y pr\xe9domine, mais \xe9tablissant une connexion avec le monde r\xe9el \xe0 travers des activit\xe9s psychomotrices, qui lient l'enfant \xe0 la r\xe9alit\xe9. "),a.Rb(),a.Sb(26,"p"),a.yc(27," Parmi divers aspects culturels et historiques, nous basons notre m\xe9thode sur deux piliers centraux: la naturalit\xe9 des mouvements de l'enfant combin\xe9e aux coups, esquives et mouvements typiques de la pratique de la capoeira. Dans cet aspect, l'enfant d\xe9veloppe ses mouvements selon sa compr\xe9hension, de la mani\xe8re la plus naturelle possible; par cons\xe9quent, l'enfant ne produit pas de mouvements incorrects. Dans l'analyse de l'enseignant, l'attention sera port\xe9e sur la s\xe9curit\xe9 de l'enfant, c'est-\xe0-dire qu'il pourra d\xe9velopper ses mouvements afin de ne pas se mettre en danger. Avec le d\xe9veloppement psychomoteur, combin\xe9 \xe0 l'entra\xeenement, ces mouvements sont travaill\xe9s par l'enseignant pendant les cours. "),a.Rb(),a.Sb(28,"p"),a.yc(29," Le deuxi\xe8me pilier utilis\xe9 dans notre m\xe9thode est la cr\xe9ativit\xe9. Directement li\xe9 au naturel, l'enfant commencera au fil du temps \xe0 d\xe9velopper son propre jeu au sein de la capoeira, son style, sa ginga... il va cr\xe9er son identit\xe9 dans la capoeira, des caract\xe9ristiques qui aideront \xe0 la formation de sa personnalit\xe9. "),a.Rb(),a.Sb(30,"p"),a.yc(31," La pr\xe9sence de la musique, de l\u2019histoire et de la danse au sein de la capoeira sont \xe9galement des aspects forts qui font de la capoeira un excellent outil pour aider \xe0 l'\xe9ducation de l'enfant. "),a.Rb(),a.Rb(),a.Ob(32,"img",11),a.wc(33,f,1,6,"organism-sessions",12),a.Sb(34,"atom-button",9),a.ac("clickEvent",(function(e){return n.onNavigateSubscription(e)})),a.Rb(),a.Rb(),a.Sb(35,"mat-tab",13),a.Sb(36,"div",6),a.Sb(37,"h1"),a.yc(38," Adultes / Adolescents "),a.Rb(),a.Sb(39,"p",7),a.yc(40,"Pour le corps et pour l\u2019esprit"),a.Rb(),a.Sb(41,"p"),a.yc(42," Le dialogue corporel, l\u2019improvisation, l\u2019\xe9quilibre, tout comme les notions d\u2019espace, de temps, de rythme et de musique sont des principes fondamentaux de la pratique de la capoeira. "),a.Rb(),a.Sb(43,"p"),a.yc(44," Force, r\xe9sistance et flexibilit\xe9 musculaire : Un programme d\u2019entra\xeenement sp\xe9cifique a \xe9t\xe9 soigneusement \xe9tudi\xe9 et d\xe9velopp\xe9 par nos professionnels \xe0 la recherche de meilleures performances. "),a.Rb(),a.Sb(45,"p"),a.yc(46," Musicalit\xe9 : La musique par elle-m\xeame, calme, stimule la m\xe9moire, soulage la douleur et aide \xe0 l\u2019exercice physique. Elle lib\xe8re la dopamine et provoque une sensation de bien-\xeatre. Dans la capoeira, en plus de la pr\xe9sence de la musique pendant les cours, des s\xe9ances de chansons de capoeira et des instruments de percussion (utiliser dans la capoeira) sont pr\xe9vus chaque semaine. "),a.Rb(),a.Sb(47,"p"),a.yc(48," En plus... : maculele et danses afro-br\xe9siliennes, samba de Roda, excursion au Br\xe9sil et d\u2019autres pays, \xe0 la d\xe9couverte de la capoeira et ses origines voil\xe0 quelques programmes que nous proposons en plus. "),a.Rb(),a.Sb(49,"p"),a.yc(50," L\u2019ICS France offre un programme de cours pr\xe9sentiels pour les adolescents et les adultes \xe0 Colombes (92700), les lundis, mercredis et vendredi. Les lundis et mercredis nous proposons des entrainements techniques et d\xe9veloppement du jeu de capoeira dans la roda. Les vendredis l\u2019entrainement est \xab libre \xbb. Vous avez \xe0 votre disposition l\u2019espace, le mat\xe9riel et la pr\xe9sence d\u2019un professeur qui sera l\xe0 pour vous donner des instructions. Individuellement ou en groupe vous pouvez vous concentrer \xe0 vous entrainer \xe0 la musique, les acrobaties, aux techniques de d\xe9fense et attaque, s\xe9quences de mouvements\u2026 Vous avez \xe0 votre disposition \xe9galement un programme d\u2019entrainement en ligne sur le site www.icsfrance.fr, disponible exclusivement pour les adh\xe9rent de ICS France (acc\xe8s priv\xe9). Dans ce programme vous trouverez des entrainements basiques que vous pouvez faire \xe0 la maison. Il y aura \xe9galement du mat\xe9riel t\xe9l\xe9chargeable. "),a.Rb(),a.Rb(),a.Ob(51,"img",14),a.wc(52,v,1,6,"organism-sessions",15),a.Sb(53,"atom-button",9),a.ac("clickEvent",(function(e){return n.onNavigateSubscription(e)})),a.Rb(),a.Rb(),a.Rb(),a.Rb(),a.Rb()),2&e&&(a.Bb(5),a.jc("backgroundColor","primary"),a.Bb(12),a.jc("text",n.contactBtnText),a.Bb(16),a.jc("ngForOf",n.sessionsKids),a.Bb(1),a.jc("text",n.subscriptionBtnText),a.Bb(18),a.jc("ngForOf",n.sessionsAdults),a.Bb(1),a.jc("text",n.subscriptionBtnText))},directives:[o.b,o.a,r.a,t.i,b],styles:[".main[_ngcontent-%COMP%]{background:#fff}.hero[_ngcontent-%COMP%]{display:flex;justify-content:center;background:url(edinho-aula-mobile.be7aa72c1a3ca8ae8045.jpg);background-size:cover;background-position:50%}.hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:2rem auto}@media (min-width:768px){.hero[_ngcontent-%COMP%]{min-height:400px;background-image:url(edinho-aula-desktop.3e640bcfcdafbb68c0fe.jpg)}.hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:12rem auto 0}}.tab__content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{max-width:992px;margin:0 auto;padding:1rem;color:#393185}@media (min-width:768px){.tab__content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:2rem 1rem 1rem}}.tab__content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{max-width:992px;margin:0 auto;padding:0 1rem 1rem}.bottom-image[_ngcontent-%COMP%]{width:100%;min-height:150px;background-size:cover}.bottom-image.school[_ngcontent-%COMP%]{background-image:url(edinho-kid.27593f7e8bb91e97a70f.jpg)}@media (min-width:768px){.bottom-image.school[_ngcontent-%COMP%]{min-height:700px}}.bottom-image.kids[_ngcontent-%COMP%]{background-image:url(kids-bananeira.2dab2071840f74636629.jpg)}@media (min-width:768px){.bottom-image.kids[_ngcontent-%COMP%]{min-height:580px}}.btn[_ngcontent-%COMP%]{display:flex;justify-content:center;margin:2rem auto}"]}),y)}],S=((_=function e(){_classCallCheck(this,e)}).\u0275mod=a.Lb({type:_}),_.\u0275inj=a.Kb({factory:function(e){return new(e||_)},imports:[[i.f.forChild(C)],i.f]}),_),R=s("PCNd"),O=s("PI13"),P=((h=function e(){_classCallCheck(this,e)}).\u0275mod=a.Lb({type:h}),h.\u0275inj=a.Kb({factory:function(e){return new(e||h)},providers:[],imports:[[t.b,R.a,O.a,S]]}),h)}}]);