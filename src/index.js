
import Game from "./scripts/game.js";
import GameView from "./scripts/game_view.js";
window.Game = Game;


document.addEventListener("DOMContentLoaded", () => {




	let soundLibrary = {
		"fire": { "Frequency": { "Start": 1057.2027687355876, "Min": 0.046342043811455375, "Slide": -0.6605383894406259 }, "Generator": { "Func": "string", "A": 0.7360220073955134, "ASlide": 0.05587897589430212 }, "Filter": { "HP": 0.09393367054872215 }, "Volume": { "Sustain": 0.16330559635534883, "Decay": 0 } },
		"powerUp": { "Frequency": { "Start": 471.33837696164846, "Slide": 0.2516419551568106, "RepeatSpeed": 0.4194934694096446 }, "Generator": { "A": 0.05357794677838683 }, "Volume": { "Sustain": 0, "Decay": 0.3853885644115508 } },
		"powerDown": { "Frequency": { "Start": 807.2296333499253, "Slide": -0.45851431218907235 }, "Generator": { "Func": "triangle", "A": 0.3962765570729971, "ASlide": -0.78 }, "Filter": { "HP": 0.13924705653917044 }, "Volume": { "Sustain": 0.09452428752556444, "Decay": 0.2435629218351096 } },
		"loseLife": { "Frequency": { "Start": 735.8008791320026, "Min": 110, "Slide": -0.8856289531569927 }, "Generator": { "Func": "string", "A": 0.7748559150844813, "ASlide": 0.3073868746636435 }, "Phaser": { "Offset": 0.004390245582908392, "Sweep": 0.1241689112968743 }, "Volume": { "Sustain": 0.39, "Decay": 0.2987039128318429, "Punch": 0.17388063005637378, "Attack": 0 } },
		"gameOver": { "Frequency": { "Start": 100.18926258198917, "Min": 1587.6887737051584, "Max": 117.02149813994765, "Slide": 0.33151340251788497, "DeltaSlide": 0.1965482453815639, "RepeatSpeed": 2.789941867114976, "ChangeAmount": 3.777931882068515, "ChangeSpeed": 0.41 }, "Vibrato": { "Depth": 0.5822702802252024, "DepthSlide": -0.41, "Frequency": 10.01, "FrequencySlide": -0.61 }, "Generator": { "Func": "square", "A": 0.32370688556693494, "B": 0.4721532999537885, "ASlide": -0.9951571268029511, "BSlide": 0.19645820744335651 }, "Guitar": { "A": 0.9221436583902687, "B": 0.24780208058655262, "C": 0.8618826810270548 }, "Phaser": { "Offset": 0.3652322771959007, "Sweep": -0.1426410679705441 }, "Volume": { "Master": 0.11, "Attack": 0.349846170283854, "Sustain": 1.13, "Punch": 2.4781218068674207, "Decay": 1.1300643947906792 } },
		"hitMushroom": { "Frequency": { "Start": 1545.3446379490197, "Min": 357.8210202232003, "Slide": -0.7122154715703801 }, "Generator": { "Func": "string", "A": 0.8263088008156046, "ASlide": 0.6412072492297738, "B": 0.16 }, "Filter": { "HP": 0.21675810513552277 }, "Volume": { "Sustain": 0.24423355353064835, "Decay": 0.33, "Punch": 1.2 } },
		"killSpider": { "Frequency": { "Start": 1277.5687352567911, "Slide": 1, "RepeatSpeed": 0, "Max": 30, "DeltaSlide": -0.94, "ChangeAmount": -12 }, "Generator": { "Func": "noise" }, "Phaser": { "Offset": -0.006889635720290221, "Sweep": -0.26872647246345877 }, "Volume": { "Sustain": 0.20089987921528518, "Decay": 0.485570793855004, "Punch": 0.5438641811255366 } },
		"killBodySegment": { "Frequency": { "Start": 1028.3006367087364, "Slide": -0.3066414884757251 }, "Generator": { "Func": "noise" }, "Volume": { "Sustain": 0.10425301392097026, "Decay": 0.38225560972932726, "Punch": 0.28350639091804625 } },
		"killFlea": { "Frequency": { "Start": 1208, "Min": 30, "Slide": -0.8856289531569927 }, "Generator": { "Func": "synth", "A": 0.7748559150844813, "ASlide": 0.3073868746636435 }, "Phaser": { "Offset": 0.004390245582908392, "Sweep": 0.1241689112968743 }, "Volume": { "Sustain": 0.39, "Decay": 0.2987039128318429, "Punch": 0.17388063005637378, "Attack": 0 } },
		"killMushroom": { "Frequency": { "Start": 922.8066242858768, "Min": 346.52912836521864, "Slide": -0.7037406354444102 }, "Generator": { "Func": "unoise", "A": 0.5396980682620779, "ASlide": 0.4534936160081997 }, "Filter": { "HP": 0.14249601988121866 }, "Volume": { "Sustain": 0.23509480375796557, "Decay": 0.2946918555535376, "Punch": 0.29945049807429314 } },
		"addBodySegment": { "Frequency": { "Start": 400.98543686792254, "Slide": -0.3850861652754247 }, "Generator": { "Func": "noise", "A": 0.24813762148842214, "ASlide": 0.22591722989454865 }, "Filter": { "HP": 0.13685138302389532 }, "Volume": { "Sustain": 0.017315713828429582, "Decay": 0.11490301317535341 } },
		"splayShot":{"Frequency":{"Start":597.8621838739582,"Min":110,"Slide":-0.9618813647887323,"ChangeSpeed":0.48},"Generator":{"Func":"saw","A":0.07090009036171385,"ASlide":0.17376193698091186},"Filter":{"HP":0.29384174563646637,"LPResonance":0.07},"Phaser":{"Offset":0.165157985903854,"Sweep":0.08364948543291631},"Volume":{"Sustain":0.2876499185418976,"Decay":0.311,"Punch":1.32}},
		"splayPhase":{"Frequency":{"Start":1038,"Slide":0,"ChangeSpeed":0.7111961024209272,"ChangeAmount":4.67087077248663,"RepeatSpeed":0.31,"Min":30},"Generator":{"Func":"noise"},"Phaser":{"Offset":0.0014017665665709833,"Sweep":0.6},"Volume":{"Sustain":2,"Decay":0.161,"Punch":0.3182249476170641},"Filter":{"LPResonance":0.89,"HP":0.4}},
		"detonate":{"Frequency":{"Start":1640.3951392499707,"Slide":-0.38090224226811786,"RepeatSpeed":0.42823388540439206},"Generator":{"Func":"noise"},"Phaser":{"Offset":0.028256366712456626,"Sweep":-0.16697511405281396},"Volume":{"Sustain":0.3809515470439646,"Decay":0.39523031661783214,"Punch":0.6322212897874939}},
		"countDown":{"Frequency":{"Start":452.5135386008355,"Slide":0.1548022860029437},"Generator":{"A":0.27853090971803707},"Volume":{"Sustain":0.35499066966905146,"Decay":0.3876115716903151}},
		"splayBurst":{"Frequency":{"Start":552.8098977113999,"Min":336.2806420246027,"Max":381.51203726340043,"Slide":-0.22811043603708647,"DeltaSlide":-0.9964842047436537,"RepeatSpeed":0.7912617193968128,"ChangeAmount":-6.195477983611692,"ChangeSpeed":0.3545597962420841},"Vibrato":{"Depth":0.6007032389348181,"DepthSlide":0.6462271378411826,"Frequency":23.950286933476363,"FrequencySlide":0.6049560014425603},"Generator":{"Func":"square","A":0.3145743665790579,"B":0.4177666510573028,"ASlide":-0.3505305262915681,"BSlide":-0.8075463460359171},"Guitar":{"A":0.9451766882352652,"B":0.24866996286057508,"C":0.3539902664500745},"Phaser":{"Offset":-0.234140987493348,"Sweep":-0.49412122887931975},"Volume":{"Master":0.4,"Attack":0.3945054835403077,"Sustain":0.012700262160820763,"Punch":1.044301713472512,"Decay":1.7995520415012558}},
		"splayScatter":{"Frequency":{"Start":1658,"Slide":0.15816098878718735,"ChangeSpeed":0.65,"ChangeAmount":4.9783826350459535,"Min":1454,"RepeatSpeed":1.93},"Generator":{"Func":"noise","BSlide":0.53,"A":0.43,"B":0.72,"ASlide":0.35},"Phaser":{"Offset":0.72,"Sweep":0.25},"Volume":{"Sustain":1.5,"Decay":0.29148737316703444,"Punch":2.25,"Attack":0.351,"Master":0.65},"Vibrato":{"Depth":0.24},"Filter":{"HP":0.38,"HPSlide":0.59}},
		"wasp":{"Frequency":{"Start":892.4268424720345,"Slide":-0.4777115043099894,"RepeatSpeed":1.93,"Min":586,"ChangeSpeed":0.37},"Generator":{"Func":"noise","A":0.49089589832895747,"ASlide":0.436704410849853,"B":0.42},"Volume":{"Sustain":1.31,"Decay":0.881,"Punch":3,"Attack":0.991},"Vibrato":{"Frequency":26.01,"Depth":1},"Filter":{"LPResonance":0.42,"HP":0.58}},
		"lightWasp":{"Frequency":{"Start":1782,"Slide":-0.4777115043099894,"RepeatSpeed":3,"Min":302,"ChangeSpeed":1,"ChangeAmount":3},"Generator":{"Func":"noise","A":0.49089589832895747,"ASlide":0.436704410849853,"B":0.42},"Volume":{"Sustain":1.31,"Decay":1.991,"Punch":3,"Attack":0.991},"Vibrato":{"Frequency":26.01,"Depth":1},"Filter":{"LPResonance":0.42,"HP":0.58},"Phaser":{"Sweep":-0.04}},
		"stick":{"Frequency":{"Start":623.5081323764038},"Generator":{"Func":"saw","A":0.027773991083616466},"Filter":{"HP":0.2},"Volume":{"Sustain":0.10214901654301317,"Decay":0.1663972688831588}},
		"jumpSpider":{"Frequency":{"Start":611.5551872539062,"Min":743.5622780410885,"Max":1022.5654380721526,"Slide":0.8892429111589943,"DeltaSlide":-0.7540432502001324,"RepeatSpeed":0.3610861084523034,"ChangeAmount":-7.293090243422018,"ChangeSpeed":0.021579880913802585},"Vibrato":{"Depth":0.36182384708653514,"DepthSlide":0.5318879161021246,"Frequency":38.61906597285933,"FrequencySlide":-0.12848820684150164},"Generator":{"Func":"saw","A":0.5724663365535694,"B":0.22981690132285548,"ASlide":-0.4139187602686252,"BSlide":-0.004216418935855781},"Guitar":{"A":0.9213467685842165,"B":0.6824707063471729,"C":0.8689803607382656},"Phaser":{"Offset":-0.17443907247666068,"Sweep":0.11180294380093336},"Volume":{"Master":0.4,"Attack":0.8550563016499965,"Sustain":0.3117643927294895,"Punch":2.414949488619931,"Decay":0.663872416970998}},
		"lightWasp2":{"Frequency":{"Start":815.1592563953487,"Min":1489.4150659703644,"Max":1282.888575044473,"Slide":0.8365439299480664,"DeltaSlide":0.04509898637226195,"RepeatSpeed":2.9609636922674145,"ChangeAmount":-0.3087271989991116,"ChangeSpeed":0.010566295437429707},"Vibrato":{"Depth":0.2439762654057953,"DepthSlide":-0.16871730364020365,"Frequency":42.762379209323484,"FrequencySlide":-0.004785551647826125},"Generator":{"Func":"synth","A":0.8468687641783414,"B":0.4417148946749183,"ASlide":0.8113537561238564,"BSlide":-0.041862506032911195},"Guitar":{"A":0.06743592593826242,"B":0.7653326578650193,"C":0.5771298711498336},"Phaser":{"Offset":0.3472769896243748,"Sweep":0.46428799509361385},"Volume":{"Master":0.4,"Attack":0.6623961173503138,"Sustain":0.7134874777735782,"Punch":0.7822547046515558,"Decay":0.2143401346812963}},
		"scorpion":{"Frequency":{"Start":736.9499194237638,"Min":1645.6105597673409,"Max":92.34483365767477,"Slide":0.8710069803734837,"DeltaSlide":0.11559305405164011,"RepeatSpeed":1.3483304046842917,"ChangeAmount":-0.3936638158025403,"ChangeSpeed":0.440268334217504},"Vibrato":{"Depth":0.15010525895408477,"DepthSlide":-0.3766205077302236,"Frequency":30.94849637141679,"FrequencySlide":-0.6853449917174519},"Generator":{"Func":"sine","A":0.8348549436878563,"B":0.809105900761967,"ASlide":0.9072263078102965,"BSlide":-0.6635024396958591},"Guitar":{"A":0.7871260748012243,"B":0.21481654999119004,"C":0.14687822521704774},"Phaser":{"Offset":-0.747357782266266,"Sweep":-0.4497468160661291},"Volume":{"Master":0.4,"Attack":0.05461129853707269,"Sustain":0.03793527664311869,"Punch":0.46630102956300745,"Decay":0.8287496100114463}},
		"armoredScorpion":{"Frequency":{"Start":1800,"Min":586,"Max":834,"Slide":0.8710069803734837,"DeltaSlide":0.11559305405164011,"RepeatSpeed":1.3483304046842917,"ChangeAmount":5,"ChangeSpeed":1},"Vibrato":{"Depth":0.66,"DepthSlide":0.33,"Frequency":30.94849637141679,"FrequencySlide":0.48},"Generator":{"Func":"sine","A":0.8348549436878563,"B":0.809105900761967,"ASlide":0.9072263078102965,"BSlide":-0.6635024396958591},"Guitar":{"A":0.7871260748012243,"B":0.21481654999119004,"C":0.14687822521704774},"Phaser":{"Offset":-0.49,"Sweep":-0.4497468160661291},"Volume":{"Master":0.4,"Attack":0.621,"Sustain":0.43,"Punch":0.34,"Decay":0.8287496100114463},"Filter":{"HP":0.12,"LPResonance":0.25}}
	};

	const canvas = document.getElementById("game-canvas");
	canvas.onselectstart = function () { return false; }
	canvas.height = Game.DIM_Y;
	canvas.width = Game.DIM_X;

	const ctx = canvas.getContext('2d');


	let game = new Game();
	Object.keys(soundLibrary).forEach(function (key) {
		soundLibrary[key].Volume.Master = 1 / 3;
	});

	game.sfx = jsfx.Sounds(soundLibrary);

	new GameView(game, ctx).start();

	// let game = new Game();
	// game.sfx = jsfx.Sounds(soundLibrary);
	// let gameView = new GameView(game,ctx);
	// gameView.listenToKeyboardNMouseEvents();

	// function main () {
	// 	window.requestAnimationFrame(main)
	// 	game.gamefieldSetUp();
	// 	game.draw(ctx);
	// }
	// main();


});