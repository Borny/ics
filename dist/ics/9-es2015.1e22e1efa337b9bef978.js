(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{ZGqS:function(e,s,n){"use strict";n.r(s),n.d(s,"ProgramsViewModule",(function(){return S}));var t=n("ofXK"),i=n("tyNb"),o=n("fXoL"),a=n("wZkO"),r=n("SV0B");function c(e,s){if(1&e&&(o.Sb(0,"li"),o.Sb(1,"span",10),o.yc(2),o.Rb(),o.yc(3),o.Rb()),2&e){const e=s.$implicit;o.Bb(2),o.zc(e.age),o.Bb(1),o.Bc(" - ",e.startTime,"-",e.endTime," ")}}function d(e,s){if(1&e&&(o.Sb(0,"div",3),o.Sb(1,"div",4),o.Sb(2,"p",5),o.yc(3),o.Rb(),o.Sb(4,"div",6),o.Sb(5,"p"),o.yc(6),o.Rb(),o.Sb(7,"p"),o.yc(8),o.Rb(),o.Sb(9,"p"),o.yc(10),o.Rb(),o.Rb(),o.Sb(11,"div",7),o.Sb(12,"p",8),o.yc(13),o.Rb(),o.Sb(14,"ul"),o.wc(15,c,4,3,"li",9),o.Rb(),o.Rb(),o.Rb(),o.Rb()),2&e){const e=o.ec();o.Bb(3),o.zc(e.sessionsKids.address.city),o.Bb(3),o.Ac(" ",e.sessionsKids.address.venue," "),o.Bb(2),o.Ac(" ",e.sessionsKids.address.street," "),o.Bb(2),o.Ac(" ",e.sessionsKids.address.zipcode," "),o.Bb(3),o.zc(e.sessionsKids.schedule.day),o.Bb(2),o.jc("ngForOf",e.sessionsKids.schedule.groups)}}function u(e,s){if(1&e&&(o.Sb(0,"li"),o.Sb(1,"span",8),o.yc(2),o.Rb(),o.yc(3),o.Rb()),2&e){const e=s.$implicit;o.Bb(2),o.zc(e.day),o.Bb(1),o.Bc(" - ",e.startTime,"-",e.endTime," ")}}function l(e,s){if(1&e&&(o.Sb(0,"div",7),o.Sb(1,"p",12),o.yc(2),o.Rb(),o.Sb(3,"ul"),o.wc(4,u,4,3,"li",9),o.Rb(),o.Rb()),2&e){const e=s.$implicit;o.Bb(2),o.zc(e.category),o.Bb(2),o.jc("ngForOf",e.time)}}function m(e,s){if(1&e&&(o.Sb(0,"div",3),o.Sb(1,"div",4),o.Sb(2,"p",5),o.yc(3),o.Rb(),o.Sb(4,"div",6),o.Sb(5,"p"),o.yc(6),o.Rb(),o.Sb(7,"p"),o.yc(8),o.Rb(),o.Sb(9,"p"),o.yc(10),o.Rb(),o.Rb(),o.wc(11,l,5,2,"div",11),o.Rb(),o.Rb()),2&e){const e=o.ec();o.Bb(3),o.zc(e.sessionsAdults.address.city),o.Bb(3),o.zc(e.sessionsAdults.address.venue),o.Bb(2),o.zc(e.sessionsAdults.address.street),o.Bb(2),o.zc(e.sessionsAdults.address.zipcode),o.Bb(1),o.jc("ngForOf",e.sessionsAdults.schedule)}}let p=(()=>{class e{constructor(){console.log(this.sessionsAdults)}ngOnInit(){console.log(this.sessionsAdults)}}return e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=o.Hb({type:e,selectors:[["organism-sessions"]],inputs:{sessionsKids:"sessionsKids",sessionsAdults:"sessionsAdults",style:"style"},decls:4,vars:3,consts:[[1,"session__container",3,"ngClass"],["class","session__content",4,"ngIf","ngIfElse"],["adults",""],[1,"session__content"],[1,"session__info"],[1,"session__city"],[1,"session__address"],[1,"session__schedules"],[1,"session__day"],[4,"ngFor","ngForOf"],[1,"session__age"],["class","session__schedules",4,"ngFor","ngForOf"],[1,"session__category"]],template:function(e,s){if(1&e&&(o.Sb(0,"div",0),o.wc(1,d,16,6,"div",1),o.wc(2,m,12,5,"ng-template",null,2,o.xc),o.Rb()),2&e){const e=o.oc(3);o.jc("ngClass",s.style),o.Bb(1),o.jc("ngIf",s.sessionsKids)("ngIfElse",e)}},directives:[t.h,t.j,t.i],styles:[".session__content[_ngcontent-%COMP%]{max-width:992px;margin:0 auto;padding:1rem}.session__city[_ngcontent-%COMP%]{font-size:1.2rem;font-weight:700}.session__address[_ngcontent-%COMP%], .session__city[_ngcontent-%COMP%], .session__schedules[_ngcontent-%COMP%]{margin:0 0 1rem}.session__age[_ngcontent-%COMP%], .session__category[_ngcontent-%COMP%], .session__day[_ngcontent-%COMP%]{font-weight:700}.even[_ngcontent-%COMP%]{background:#fff}.even[_ngcontent-%COMP%]   .session__age[_ngcontent-%COMP%], .even[_ngcontent-%COMP%]   .session__city[_ngcontent-%COMP%], .even[_ngcontent-%COMP%]   .session__day[_ngcontent-%COMP%]{color:#393185}.odd[_ngcontent-%COMP%]{background:#393185;color:#fff}"]}),e})();const b=function(e,s){return{odd:e,even:s}};function g(e,s){if(1&e&&o.Ob(0,"organism-sessions",16),2&e){const e=s.$implicit;o.uc(o.mc(3,b,s.odd,s.even)),o.jc("sessionsKids",e)}}function f(e,s){if(1&e&&o.Ob(0,"organism-sessions",17),2&e){const e=s.$implicit;o.uc(o.mc(3,b,s.odd,s.even)),o.jc("sessionsAdults",e)}}const v=[{path:"",component:(()=>{class e{constructor(e){this.router=e,this.contactBtnText="Nous contacter",this.subscriptionBtnText="Nous contacter",this.sessionsKids=[{address:{city:"Paris",venue:"La Tour des Dames",street:"18 rue de la Tour des Dames",zipcode:75009},schedule:{day:"Samedi",groups:[{age:"4-5 ans",startTime:"14:00",endTime:"14:50"},{age:"6-10 ans",startTime:"15:00",endTime:"16:00"}]}},{address:{city:"Colombes",venue:"Gymnase Henri Dunant",street:"147 rue Henri Dunant",zipcode:92700},schedule:{day:"Samedi",groups:[{age:"4-5 ans",startTime:"10:10",endTime:"11:00"},{age:"6-10 ans",startTime:"11:00",endTime:"12:00"}]}},{address:{city:"Colombes",venue:"Ecole Maintenon",street:"44, rue Saint Denis",zipcode:92700},schedule:{day:"Adolescents",groups:[{age:"Lundi",startTime:"18:45",endTime:"19:45"},{age:"Mercredi",startTime:"19:30",endTime:"20:30"},{age:"Vendredi",startTime:"19:30",endTime:"21:00"}]}},{address:{city:"Bois Colombes",venue:"Dojo Jean Jaur\xe8s",street:"Avenue du Vaudreuil",zipcode:92270},schedule:{day:"Mercredi",groups:[{age:"4-5 ans",startTime:"17:10",endTime:"18:00"},{age:"6-10 ans",startTime:"18:00",endTime:"19:00"}]}}],this.sessionsAdults=[{address:{city:"Colombes",venue:"Ecole Maintenon",street:"44, rue Saint Denis",zipcode:92700},schedule:[{category:"Adolescents",time:[{day:"Lundi",startTime:"18:45",endTime:"19:45"},{day:"Mercredi",startTime:"19:30",endTime:"20:30"},{day:"Vendredi",startTime:"19:30",endTime:"21:00"}]},{category:"Adultes",time:[{day:"Lundi",startTime:"19:30",endTime:"20:45"},{day:"Mercredi",startTime:"20:00",endTime:"21:00"},{day:"Vendredi",startTime:"19:30",endTime:"21:00"}]}]}]}ngOnInit(){}onNavigateContact(e){this.router.navigateByUrl("/contact")}onNavigateSubscription(e){this.router.navigateByUrl("/contact")}}return e.\u0275fac=function(s){return new(s||e)(o.Nb(i.b))},e.\u0275cmp=o.Hb({type:e,selectors:[["programs"]],decls:54,vars:6,consts:[[1,"main"],[1,"section__content"],[1,"hero"],[1,"title-xl","uppercase"],["mat-align-tabs","center","mat-stretch-tabs","",3,"backgroundColor"],["label","Ecoles"],[1,"tab__content"],[1,"color-primary"],["src","../../../assets/edinho-kid.jpg","alt","contramestre edinho et enfant"],[1,"btn",3,"text","clickEvent"],["label","Enfants"],["src","../../../assets/kids-bananeira.jpg","alt","enfants \xe9quilibre"],[3,"style","sessionsKids",4,"ngFor","ngForOf"],["label","Ados-Adultes"],["src","../../../assets/movement-duo.jpg","alt","enfants \xe9quilibre"],[3,"style","sessionsAdults",4,"ngFor","ngForOf"],[3,"sessionsKids"],[3,"sessionsAdults"]],template:function(e,s){1&e&&(o.Sb(0,"main",0),o.Sb(1,"section",1),o.Sb(2,"div",2),o.Sb(3,"p",3),o.yc(4," Nos Programmes "),o.Rb(),o.Rb(),o.Sb(5,"mat-tab-group",4),o.Sb(6,"mat-tab",5),o.Sb(7,"div",6),o.Sb(8,"h1"),o.yc(9,"Capoeira \xe0 l'\xe9cole"),o.Rb(),o.Sb(10,"p",7),o.yc(11,"Capoeira, culture et \xe9ducation"),o.Rb(),o.Sb(12,"p"),o.yc(13," Le programme Capoeira Culture et Education va plus loin qu\u2019une simple activit\xe9 \xe0 l\u2019\xe9cole. L\u2019objectif de ce programme est de contribuer \xe0 l\u2019\xe9ducation des enfants en partenariat avec l\u2019institution et/ou l\u2019\xe9cole, la famille et la soci\xe9t\xe9, en int\xe9grant simultan\xe9ment ces trois piliers majeurs dans le d\xe9veloppement de la personnalit\xe9 de l\u2019enfant. Notre programme a \xe9t\xe9 cr\xe9\xe9 par le professeur Ederson Gon\xe7alves (coordinateur du Groupe Cord\xe3o de Ouro Ile-de-France), avec le soutien d\u2019un groupe exp\xe9riment\xe9 de Ma\xeetres de capoeira et professionnels de la p\xe9dagogie enfantine. "),o.Rb(),o.Sb(14,"p"),o.yc(15," Notre programme se d\xe9cline en 2 propositions et ce en fonction du projet \xe9ducatif et de la disponibilit\xe9 de chaque \xe9tablissement. Ainsi ce programme peut trouver sa place durant le temps scolaire ou bien sur le temps p\xe9riscolaire. En plus de l\u2019enseignement de la capoeira \xe0 travers sa forme ludique, nous proposons au sein de notre programme des options qui peuvent \xeatre ajout\xe9es en accord avec le projet annuel de l\u2019\xe9cole. Programmes sp\xe9cifiques pour \xe9coles et institutions priv\xe9es, associations de parents, centre socio-\xe9ducatifs. Pour plus d\u2019information, nous consulter. "),o.Rb(),o.Rb(),o.Ob(16,"img",8),o.Sb(17,"atom-button",9),o.ac("clickEvent",(function(e){return s.onNavigateContact(e)})),o.Rb(),o.Rb(),o.Sb(18,"mat-tab",10),o.Sb(19,"div",6),o.Sb(20,"h1"),o.yc(21," Enfants "),o.Rb(),o.Sb(22,"p",7),o.yc(23,"Camaradinhas"),o.Rb(),o.Sb(24,"p"),o.yc(25," Les mouvements de base de la capoeira sont adapt\xe9s et enseign\xe9s aux enfants \xe0 travers des jeux. Notre m\xe9thode probante est de faire appel \xe0 l\u2019imaginaire ; cela permet de capter l\u2019attention et la concentration des enfants. La capoeira devient plus qu\u2019un sport pour la vie de L'Enfant qui la pratique, \xe7a devient aussi un jeu, un moment r\xe9cr\xe9atif. Le jeu symbolique est la repr\xe9sentation corporelle de l'imaginaire, avec la fantaisie qui y pr\xe9domine, mais \xe9tablissant une connexion avec le monde r\xe9el \xe0 travers des activit\xe9s psychomotrices, qui lient l'enfant \xe0 la r\xe9alit\xe9. "),o.Rb(),o.Sb(26,"p"),o.yc(27," Parmi divers aspects culturels et historiques, nous basons notre m\xe9thode sur deux piliers centraux: la naturalit\xe9 des mouvements de l'enfant combin\xe9e aux coups, esquives et mouvements typiques de la pratique de la capoeira. Dans cet aspect, l'enfant d\xe9veloppe ses mouvements selon sa compr\xe9hension, de la mani\xe8re la plus naturelle possible; par cons\xe9quent, l'enfant ne produit pas de mouvements incorrects. Dans l'analyse de l'enseignant, l'attention sera port\xe9e sur la s\xe9curit\xe9 de l'enfant, c'est-\xe0-dire qu'il pourra d\xe9velopper ses mouvements afin de ne pas se mettre en danger. Avec le d\xe9veloppement psychomoteur, combin\xe9 \xe0 l'entra\xeenement, ces mouvements sont travaill\xe9s par l'enseignant pendant les cours. "),o.Rb(),o.Sb(28,"p"),o.yc(29," Le deuxi\xe8me pilier utilis\xe9 dans notre m\xe9thode est la cr\xe9ativit\xe9. Directement li\xe9 au naturel, l'enfant commencera au fil du temps \xe0 d\xe9velopper son propre jeu au sein de la capoeira, son style, sa ginga... il va cr\xe9er son identit\xe9 dans la capoeira, des caract\xe9ristiques qui aideront \xe0 la formation de sa personnalit\xe9. "),o.Rb(),o.Sb(30,"p"),o.yc(31," La pr\xe9sence de la musique, de l\u2019histoire et de la danse au sein de la capoeira sont \xe9galement des aspects forts qui font de la capoeira un excellent outil pour aider \xe0 l'\xe9ducation de l'enfant. "),o.Rb(),o.Rb(),o.Ob(32,"img",11),o.wc(33,g,1,6,"organism-sessions",12),o.Sb(34,"atom-button",9),o.ac("clickEvent",(function(e){return s.onNavigateSubscription(e)})),o.Rb(),o.Rb(),o.Sb(35,"mat-tab",13),o.Sb(36,"div",6),o.Sb(37,"h1"),o.yc(38," Adultes / Adolescents "),o.Rb(),o.Sb(39,"p",7),o.yc(40,"Pour le corps et pour l\u2019esprit"),o.Rb(),o.Sb(41,"p"),o.yc(42," Le dialogue corporel, l\u2019improvisation, l\u2019\xe9quilibre, tout comme les notions d\u2019espace, de temps, de rythme et de musique sont des principes fondamentaux de la pratique de la capoeira. "),o.Rb(),o.Sb(43,"p"),o.yc(44," Force, r\xe9sistance et flexibilit\xe9 musculaire : Un programme d\u2019entra\xeenement sp\xe9cifique a \xe9t\xe9 soigneusement \xe9tudi\xe9 et d\xe9velopp\xe9 par nos professionnels \xe0 la recherche de meilleures performances. "),o.Rb(),o.Sb(45,"p"),o.yc(46," Musicalit\xe9 : La musique par elle-m\xeame, calme, stimule la m\xe9moire, soulage la douleur et aide \xe0 l\u2019exercice physique. Elle lib\xe8re la dopamine et provoque une sensation de bien-\xeatre. Dans la capoeira, en plus de la pr\xe9sence de la musique pendant les cours, des s\xe9ances de chansons de capoeira et des instruments de percussion (utiliser dans la capoeira) sont pr\xe9vus chaque semaine. "),o.Rb(),o.Sb(47,"p"),o.yc(48," En plus... : maculele et danses afro-br\xe9siliennes, samba de Roda, excursion au Br\xe9sil et d\u2019autres pays, \xe0 la d\xe9couverte de la capoeira et ses origines voil\xe0 quelques programmes que nous proposons en plus. "),o.Rb(),o.Sb(49,"p"),o.yc(50," L\u2019ICS France offre un programme de cours pr\xe9sentiels pour les adolescents et les adultes \xe0 Colombes (92700), les lundis, mercredis et vendredi. Les lundis et mercredis nous proposons des entrainements techniques et d\xe9veloppement du jeu de capoeira dans la roda. Les vendredis l\u2019entrainement est \xab libre \xbb. Vous avez \xe0 votre disposition l\u2019espace, le mat\xe9riel et la pr\xe9sence d\u2019un professeur qui sera l\xe0 pour vous donner des instructions. Individuellement ou en groupe vous pouvez vous concentrer \xe0 vous entrainer \xe0 la musique, les acrobaties, aux techniques de d\xe9fense et attaque, s\xe9quences de mouvements\u2026 Vous avez \xe0 votre disposition \xe9galement un programme d\u2019entrainement en ligne sur le site www.icsfrance.fr, disponible exclusivement pour les adh\xe9rent de ICS France (acc\xe8s priv\xe9). Dans ce programme vous trouverez des entrainements basiques que vous pouvez faire \xe0 la maison. Il y aura \xe9galement du mat\xe9riel t\xe9l\xe9chargeable. "),o.Rb(),o.Rb(),o.Ob(51,"img",14),o.wc(52,f,1,6,"organism-sessions",15),o.Sb(53,"atom-button",9),o.ac("clickEvent",(function(e){return s.onNavigateSubscription(e)})),o.Rb(),o.Rb(),o.Rb(),o.Rb(),o.Rb()),2&e&&(o.Bb(5),o.jc("backgroundColor","primary"),o.Bb(12),o.jc("text",s.contactBtnText),o.Bb(16),o.jc("ngForOf",s.sessionsKids),o.Bb(1),o.jc("text",s.subscriptionBtnText),o.Bb(18),o.jc("ngForOf",s.sessionsAdults),o.Bb(1),o.jc("text",s.subscriptionBtnText))},directives:[a.b,a.a,r.a,t.i,p],styles:[".main[_ngcontent-%COMP%]{background:#fff}.hero[_ngcontent-%COMP%]{display:flex;justify-content:center;background:url(edinho-aula-mobile.be7aa72c1a3ca8ae8045.jpg);background-size:cover;background-position:50%}.hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:2rem auto}@media (min-width:768px){.hero[_ngcontent-%COMP%]{min-height:400px;background-image:url(edinho-aula-desktop.3e640bcfcdafbb68c0fe.jpg)}.hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:12rem auto 0}}.tab__content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{max-width:992px;margin:0 auto;padding:1rem;color:#393185}@media (min-width:768px){.tab__content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{padding:2rem 1rem 1rem}}.tab__content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{max-width:992px;margin:0 auto;padding:0 1rem 1rem}.bottom-image[_ngcontent-%COMP%]{width:100%;min-height:150px;background-size:cover}.bottom-image.school[_ngcontent-%COMP%]{background-image:url(edinho-kid.27593f7e8bb91e97a70f.jpg)}@media (min-width:768px){.bottom-image.school[_ngcontent-%COMP%]{min-height:700px}}.bottom-image.kids[_ngcontent-%COMP%]{background-image:url(kids-bananeira.2dab2071840f74636629.jpg)}@media (min-width:768px){.bottom-image.kids[_ngcontent-%COMP%]{min-height:580px}}.btn[_ngcontent-%COMP%]{display:flex;justify-content:center;margin:2rem auto}"]}),e})()}];let y=(()=>{class e{}return e.\u0275mod=o.Lb({type:e}),e.\u0275inj=o.Kb({factory:function(s){return new(s||e)},imports:[[i.f.forChild(v)],i.f]}),e})();var _=n("PCNd"),h=n("PI13");let S=(()=>{class e{}return e.\u0275mod=o.Lb({type:e}),e.\u0275inj=o.Kb({factory:function(s){return new(s||e)},providers:[],imports:[[t.b,_.a,h.a,y]]}),e})()}}]);