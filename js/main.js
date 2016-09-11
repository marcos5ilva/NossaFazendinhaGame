

var GameState = {
		preload: function () {
            this.load.image('background', 'assets/images/background.png');
            this.load.image('fence', 'assets/images/fence.png');
            this.load.image('chicken', 'assets/images/chicken.png');
            this.load.image('horse', 'assets/images/horse.png');
            this.load.image('pig', 'assets/images/pig.png');
            this.load.image('sheep', 'assets/images/sheep.png');
            this.load.image('dog', 'assets/images/dog.png');
            this.load.image('cow', 'assets/images/cow.png');
            this.load.image('cat', 'assets/images/cat.png');
            this.load.image('arrow', 'assets/images/arrow.png');

		},
		create: function () {
            
            //Defining screen scale mode try to use all space maintaning ratio
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            //Align game page
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            
            this.background = this.game.add.sprite(0, 0, 'background');
            
            //Group for animals
            var animalData = [
                { key: 'chicken', text: 'CHICKEN'},
                { key: 'horse', text: 'HORSE'},
                { key: 'pig', text: 'PIG'},
                { key: 'sheep', text: 'SHEEP'},
                { key: 'dog', text: 'DOG'},
                { key: 'cow', text: 'COW'},
                { key: 'cat', text: 'CAT'}
            ];
            
            var self = this, animal;
            
            this.animals = this.game.add.group();
            animalData.forEach(function (element) {
                animal = self.animals.create(-1000, self.game.world.centerY, element.key);         
                animal.customParams = {text: element.text};
                animal.anchor.setTo(0.5);
                animal.inputEnabled = true;
                animal.input.pixelPerfectClick = true;
                animal.events.onInputDown.add(self.animateAnimal, self);
                                
                               });
            
            this.currentAnimal = this.animals.next();
            this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
            
            
            //Right arrow sprite
            this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
            this.rightArrow.anchor.setTo(0.5);
            this.rightArrow.customParams = {direction: 1};
            
            //Right arrow input control
            this.rightArrow.inputEnabled = true;
            this.rightArrow.input.pixelPerfectClick = true;
            this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
            
            //Left arrow
            this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
            this.leftArrow.anchor.setTo(0.5);
            this.leftArrow.scale.x= -1;
            this.leftArrow.customParams = {direction: -1};
         
            //Left arrow input control
            this.leftArrow.inputEnabled = true;
            this.leftArrow.input.pixelPerfectClick = true;
            this.leftArrow.events.onInputDown.add(this.switchAnimal, this);
            
            
            //Left arrow input control
            this.leftArrow.inputEnabled = true;
            this.leftArrow.input.pixelPerfectClick = true;
            this.leftArrow.events.onInputDown.add(this.switchAnimal, this);
            
            this.fence = this.game.add.sprite(1, 228, 'fence');

		},
		update: function () {
            
          

		},
        switchAnimal: function (sprite, event) {
                 
            if(this.isMoving){
                return false;
            }
            
            this.isMoving = true;
            var newAnimal, endX;
            

            if(sprite.customParams.direction > 0){
                            newAnimal = this.animals.next();
                            newAnimal.x = -newAnimal.width/2;
                            endX = 640 + this.currentAnimal.width/2;
                        }
            else{
                            newAnimal = this.animals.previous();
                            newAnimal.x = 640 + newAnimal.width/2;
                            endX =  -this.currentAnimal.width/2;
                }
            
            var newAnimalMovement = this.game.add.tween(newAnimal);
            newAnimalMovement.to({x: this.game.world.centerX}, 1000);
            newAnimalMovement.onComplete.add(function(){
                this.isMoving = false;
            }, this);
            newAnimalMovement.start();
            
            var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
            currentAnimalMovement.to({x: endX}, 1000);
            currentAnimalMovement.start();
            
            this.currentAnimal = newAnimal;
        },
            animateAnimal: function ( sprite, event) {
            console.log('animate animal')
    }
    };

var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');