export const services = [
  { slug:'cours-de-conduite', short:'Conduite', title:'Cours de conduite', eyebrow:'Prendre le volant', image:'driving-lesson.png', alt:'Élève au volant pendant une leçon de conduite', summary:'Maîtriser le véhicule, sa position sur la route, les commandes et la maniabilité en toutes situations.', forWhom:'Pour les élèves qui veulent apprendre, reprendre confiance ou progresser au volant.', includes:['Position et lecture de la route','Utilisation des commandes','Maniabilité en situations variées','Accompagnement orienté confiance'], detail:'Le site actuel propose des leçons automatiques à l’unité et dans ses packs.', faq:[['Quel type de leçon est affiché sur le site actuel ?','La leçon automatique est la formule explicitement présentée.'],['Puis-je choisir mon moniteur ?','Oui, la démonstration de réservation permet de choisir Lumrim, Gencer, Mustafa, Osman ou le premier disponible.']] },
  { slug:'moto', short:'Moto', title:'Cours de moto', eyebrow:'Maîtriser ton deux-roues', image:'motorcycle-lesson.png', alt:'Élève à moto pendant un exercice de maniabilité', summary:'Travailler l’équilibre, la maniabilité, le changement de vitesse et le contrôle complet du deux-roues.', forWhom:'Pour les élèves qui veulent construire des bases solides et gagner en maîtrise sur leur moto.', includes:['Équilibre à basse vitesse','Maniabilité','Changement de vitesse','Contrôle du véhicule'], detail:'Le module de réservation actuel regroupe les blocs moto 1, 2 et 3 dans un pack.', faq:[['Quels éléments sont travaillés ?','Le contenu publié mentionne l’équilibre, la maniabilité, le changement de vitesse et le contrôle du véhicule.'],['Le cours est-il réservable en ligne ?','Oui, tu peux préparer une demande dans le calendrier de démonstration.']] },
  { slug:'sensibilisation', short:'Sensibilisation', title:'Cours de sensibilisation', eyebrow:'Comprendre pour mieux décider', image:'sensitization-course.png', alt:'Élève et formateur étudiant une situation routière', summary:'Comprendre les conséquences de l’alcool, de la fatigue et des distractions sur la conduite.', forWhom:'Pour les élèves qui souhaitent mieux reconnaître les risques et adopter une conduite attentive.', includes:['Conséquences de l’alcool','Impact de la fatigue','Effets des distractions','Deux sessions de 4 heures selon les packs publiés'], detail:'Les packs du site actuel indiquent une sensibilisation en 2 × 4 heures.', faq:[['Quelle durée est indiquée ?','Les packs publiés indiquent deux sessions de quatre heures.'],['Peut-on réserver une date ?','Le calendrier de démonstration permet de sélectionner une date et une heure fictives.']] },
  { slug:'premiers-secours', short:'Premiers secours', title:'Cours de premiers secours', eyebrow:'Les gestes essentiels', image:'first-aid-course.png', alt:'Groupe pratiquant la réanimation sur un mannequin de formation', summary:'Apprendre à effectuer les gestes de premiers secours essentiels, y compris la réanimation.', forWhom:'Pour les futurs conducteurs qui veulent acquérir les gestes essentiels présentés par L-GO.', includes:['Gestes de premiers secours essentiels','Initiation à la réanimation','Mise en pratique encadrée'], detail:'Le contenu publié par L-GO cite explicitement les gestes essentiels et la réanimation.', faq:[['La réanimation est-elle abordée ?','Oui, elle figure explicitement dans la présentation publiée du cours.'],['La réservation affichée est-elle réelle ?','Non. Le calendrier et les formulaires de ce site sont une démonstration front-end.']] },
  { slug:'theorie', short:'Théorie', title:'Cours de théorie', eyebrow:'Lire la route', image:'theory-course.png', alt:'Cours de théorie autour d’un schéma routier', summary:'Maîtriser les panneaux, signaux lumineux, marquages au sol, priorités et règles propres à chaque situation.', forWhom:'Pour les élèves qui veulent structurer leurs connaissances du Code de la route.', includes:['Panneaux et signalisation','Signaux lumineux','Marquages au sol','Priorités et règles de circulation'], detail:'Le cours de théorie est affiché à CHF 60 dans le module de réservation actuel.', faq:[['Quels sujets sont cités ?','Panneaux, signaux lumineux, marquages au sol, priorités et règles spécifiques aux situations.'],['Quel prix est publié ?','Le module de réservation actuel affiche le cours de théorie à CHF 60.']] },
];

export const packs = [
  { name:'Simple', price:"CHF 300", save:'Économise CHF 74', items:['Assurance','1 leçon automatique','Sensibilisation · 2 × 4 heures'] },
  { name:'Maîtrise', price:"CHF 450", save:'Économise CHF 104', items:['Assurance','3 leçons automatiques','Sensibilisation · 2 × 4 heures'] },
  { name:'Maîtrise', price:"CHF 720", save:'Économise CHF 119', items:['Assurance','6 leçons automatiques','Sensibilisation · 2 × 4 heures'] },
  { name:'Premium', price:"CHF 1’000", save:'Économise CHF 219', items:['Assurance','10 leçons automatiques','Sensibilisation · 2 × 4 heures'] },
];

export const unitPrices = [
  ['Cours de sensibilisation · 8 h sur deux soirs','CHF 150'],
  ['Cours de moto · blocs 1, 2 et 3','CHF 570'],
  ['Cours de théorie','CHF 60'],
  ['Leçon automatique','CHF 95'],
];

export const instructors = [
  { name:'Lumrim', phone:'079 913 63 99', languages:'Français · Albanais', image:'instructor-lumrim-osman.png', bio:'Doté d’empathie et d’expérience en auto-école, je t’aide à anticiper les imprévus et à prendre confiance.' },
  { name:'Gencer', phone:'079 675 26 44', languages:'Français · Anglais', image:'instructor-gencer.png', bio:'Grâce à une approche bienveillante et personnalisée, je t’accompagne pour développer les bons réflexes.' },
  { name:'Mustafa', phone:'076 480 22 22', languages:'Français · Turc · Anglais', image:'instructor-mustafa.png', bio:'Patient et à l’écoute, je t’aide à comprendre la route et à gérer chaque situation avec calme.' },
  { name:'Osman', phone:'078 967 19 10', languages:'Français · Turc', image:'instructor-lumrim-osman.png', bio:'Pédagogue et rassurant, je t’accompagne pour anticiper les dangers et conduire avec confiance en toute sécurité.' },
];

export const testimonials = [
  { quote:'Excellente auto-école ! Les cours de conduite sont très clairs et l’ambiance est super agréable. J’ai réussi mon permis du premier coup !', name:'Sarah L.', location:'Moudon' },
  { quote:'Les instructeurs sont patients et très pédagogues. On se sent en confiance dès la première leçon.', name:'Lucas F.', location:'Renens' },
  { quote:'Super suivi personnalisé, on progresse à son rythme. Je recommande vivement cette auto-école !', name:'Mélanie R.', location:'Lausanne' },
  { quote:'Les cours de moto étaient incroyables, j’ai appris à maîtriser ma moto rapidement et en toute sécurité.', name:'Jan K.', location:'Lausanne' },
  { quote:'Grâce aux astuces pour réussir le permis du premier coup, j’étais totalement préparé et serein le jour de l’examen.', name:'Martina V.', location:'Lausanne' },
  { quote:'L’accueil est très chaleureux et les instructeurs connaissent parfaitement leur métier. Rien à redire !', name:'David S.', location:'Echallens' },
  { quote:'On apprend à conduire de manière responsable tout en prenant confiance en soi. Je recommande sans hésiter !', name:'Simon F.', location:'Prilly' },
  { quote:'J’ai beaucoup apprécié les exercices pratiques et les conseils personnalisés. Je me sentais prête pour chaque étape.', name:'Nina B.', location:'Belmont-sur-Lausanne' },
];
