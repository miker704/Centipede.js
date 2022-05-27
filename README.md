# Centipede.js


# Project: Centipede (Classic Atari Game)
	
	
# Project Summary: 
	- Project is a clone of the classic Atari game Centipede to be implemented
	in javascript, and to be in the browser as a web app. the game will 
	have the classic features and functionality of the orginal game users will be able to 
	use the mouse to control their "ship" from left to right and using mouse click to shoot
	the incomming centipede and other enemies on screen while dodging enemies 
	to obtain points if the user is hit or comes in contact ("collides") with an enemy 
	they will loose a life, loosing all lives is a game over. i will add a twist to the
	game after the initial features of the basic game is implemented. the game will 
	be implemented in the browser with HTML 5 Canvas and will eventually be re-implemented
	with the webGL and three.js libary instead for a more cleaner and complex graphics
	
#Functionality & MVPs
	 
	 - In Centipede users will be able to
		-use their mouse to control their ship from left to right
		- be able to use mouse click to shoot at enemies on screen
		- defeating enemies will award users points
		-users will have to prioritise enemies that appear on screen the primary enemy
		of the game will be the centipede opponent
		- the centipede opponent, will appear on screen and transition the screen in a 
		zig-zagging  movement to get to the player when users shoot a centipede
		destroying segments of its body will cause the split centipede to become 
		child cenitpedes users must destroy the orginal body of the cenitpedes in order
		to prevent being overwelmed and spawn too many child cenitpedes (goal is to
		prioritze body segments in order to cause the
		least amount of child spawns)
		-the multiplication of a centipede appears like this
					
			- For Example we have an Array of length = 10
					0,1,2,3,4,5,6,7,8,9
					[@,#,#,#,#,#,#,#,#,>]
					
			-when a user shoots any part besides index 0 or 9 will cause the 
			segment at index 1-8 to be destroyed and cause the body to be split 
			if a user shoots at index 5 
			
					0,1,2,3,4,5,6,7,8,9
					[@,#,#,#,#,#,#,#,#,>]
					          |
						 	  ^
						     [P]
								  
			-Destroys the segment at index 5 
				0,1,2,3,4,5,6,7,8,9
				[@,#,#,#,#   #,#,#,>]
					       |
					       ^
					      [P]
								  
			-NOW:
				 0,1,2,3,4,5,6,7,8,9
				[@,#,#,#,>] [@,#,#,>]   now they are 2 centipedes on screen
							       
					       ^
					      [P]
								  
					
								  
			now the centipede is split  in half but is not defeated 
			the cenitpedes body segment from 0 - destroyed_index -1 will continue to travel
			while the destroyed_index+1 - 9  will from a new centipede of split length
			this process repeats till all segements are destroy child centipedes can 
			have a length of just 1
						
		
		
		- collison detection : if an enemy or user that collides into each other the player 
		  will lose a life
			-also players will not be able to move through the games walls which will be 
			mushrooms that are rendered on screen upon a level start and when a user defeats 
			certain enemies. they are meant to block users shots to prevent them 
			from easily defeating enemies.
		- obstacles: rendered to the screen at the start of the level and during the 
		level depending on the users actions
		- the mushrooms will drop upon defeating certain sections of the centipedes
		- additional enemies will be encountered such as a spider which moves in a
		bouncy up and down fashion
		- have a score of how many points a defeat enemy is worth upon being defeated
		- have sounds to be played when user shoots defeats enemies etc
		- have the option to disable the sound 
	THE MVP of the project is to get the both the cenitpede and user rendered to the screen
	user to shoot and destroy centipede body segments and earn points 
	collison detection of user and enemies 
	render mushrooms on screen
	
	Other Planned aspects of the project after basic implementations
	- transition for canvas to three.js and webGl for more complex graphics
	- be able incorporate custom features in the game that are not present in
	the orginal (remains to be figured out)
	
	other included aspects
	-instructions along with a readme
	-be able to switch between mouse movement or use wasd keys to move
	
	

# More info
  -centipede :https://en.wikipedia.org/wiki/Centipede_game
	-video of one of the actual atari cenitpede game being played:	https://www.youtube.com/watch?v=V7XEmf02zEM
	
		
# Technolgies, Libaries, Apis 
		As of right now the known Technolgies is will be imploying at the moment
		
		- Javascript
			-plain js
			- node.js
			
		-HTML5 
		- HTML5 - Canvas
		CSS3
		
		- Three.js and WebGL will be used after basic implemenation of the game
		has been completed in canvas (they have varying complexity so it will be tried
		after the games inital features have been completed)
		
		-webpack.js
		
		- i belive the cenitpede is rendered in the fashion the snake from the
		snake game is rendered but the overall functionality between the two is the
		centipedes movement is more complex and the computer is doing the movement
		along with its child creation makes it unique so i will refer to a snake 
		game that i made in java several years ago to see the functionality of how 
		the snakr array works on screen and use that knowledge to attempt to implemenate
		the centipede;
		
		
	
# Implementation Timeline : 
(this is general i broke it down to very small parts i may be able to do more in one day 
	then what is stated but these are the general goals and objectives of the day)
	05/27/2022 - 06/02/2022
	
05/27/20220	friday:
		-research on games rules and functionality , 
		-setup of project repo on github,
		-basic file struture and classes setup 
		- get the canvas working to render some something
		- (the asteroids project in getting the rocks to fly around is
		what i will be implementing today to get the canvas working )
		
		-start the centipede class and get its movement algo starting
		- printing the positon it moves in a grid array before trying the movement in canvas
		- i will be observing this in the console before transitioning this over into canvas
		
05/28/20220	Saturday:
			- render the centipede as a basic shape of a row of squares
			- get the centipede moving on screen 
			- get it to move on its own and track the player
				
			- get the player to be on screen 
			- bind player movement to mouse left and right
			- bind the right mouse click to shoot 
			- render shots on screen
				

05/29/20220	sunday:

			- get collisons  to work for when on the player and centipede
			- if contact is made between player and enemy user looses a life
			- if they lose all lives it is a game over
			- implementing physics and destroying the centipedes body along with 
			the child spawns
			- score counter upon defeating enemies
					
05/30/20220	monday:
	-research on three.js and webgl
		- if i decide to translate to three.js
		   -then the day will be to dup my project and go from canvas to three.js
		- if i decide not to go with three.js i will continue to add in the rest
		  of the games features spawning mushrooms and spawning mushrooms upon defeating cenitpede
		 - create other enemies  and render them to the screen
			

05/31/20220	tuesday:
		- add my own twist to the game if i didnt translate to three.js else if i 
		did do what i was supposed to do in canvas on monday in three.js today
		-add my own twist 

06/01/20220	wendsday:
			- finish up and add anything features that are feasible
			- have project repo, instructions, readme finished at the end of the day.

06/02/20220	thursday : NOTHING as i should be done by then 
				- deploying project on github pages /  Heroku 
		
	


# Basic Prototype of the Game Screen:
![Centipede_basic_prototype](https://user-images.githubusercontent.com/33719996/170761772-4e4d414b-8c8a-4d52-ad50-727c5bca5309.png)
