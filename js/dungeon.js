enchant();
/*
 * 
 * Core
 * -rootScene
 * --Sprite (bear)
 */

window.onload = function(){
	var core = new Core(640, 900);
	core.preload(
			'./image/mmssf4castsheet.png',
			'./image/wall.png',
			'./image/wall_far_front.png',
			'./image/wall_far_side.png',
			'./image/wall_middle_front.png',
			'./image/wall_middle_side.png',
			'./image/wall_near_front.png',
			'./image/wall_near_side.png'
			);
	core.fps = 30;
	core.onload = function(){
		var Chara = Class.create(Sprite, {
			initialize: function(x, y){
				Sprite.call(this, 72, 80);
				this.x = x;
				this.y = y;
				this.frame = rand(35);
//				this.opacity = 0; //透明度
				this.image = core.assets['./image/mmssf4castsheet.png'];
//				this.on('enterframe', function(){
//					this.rotate(rand(10));
//				});
				this.tl.scaleTo(10, 10, 0 )
                       .scaleTo(1, 1, 30).and().rotateBy(1080, 30);
				
				this.on('touchstart' , function(){
					console.log(this.frame);
					console.log(this.scaleX);
					
					if(this.scaleX > 0){
						this.scaleX = -1;
					}else{
						this.scaleX = 1;
					}
										
					this.frame = this.frame + 1;
					this.tl.scaleTo(10 * this.scaleX, 10, 0 )
                           .scaleTo(1 * this.scaleX, 1, 30).and().rotateBy(1080, 30);
				});
				
				core.rootScene.addChild(this);
			}
		});
		
		var Wall_front = Class.create(Sprite, {
			initialize: function(x, y, position, positionZ){
				var spriteX = {'far':160,'middle':240,'near':400};
				var spriteY = {'far':120,'middle':200,'near':360};
				Sprite.call(this, spriteX[positionZ], spriteY[positionZ]);
				this.x = x;
				this.y = y;
				this.frame = 0;
				this.image = core.assets['./image/wall_'+ positionZ +'_front.png'];
				
				core.rootScene.addChild(this);
			}
		});
		
		var Wall_side = Class.create(Sprite, {
			initialize: function(x, y, position, positionZ){
				var spriteX = {'far':40,'middle':80,'near':120};
				var spriteY = {'far':200,'middle':360,'near':600};
				Sprite.call(this, spriteX[positionZ], spriteY[positionZ]);
				this.x = x;
				this.y = y;
				var rotation ={'up':90,'down':-90,'right':180,'left':0};
				this.rotation = rotation[position];
				this.frame = 0;
				this.image = core.assets['./image/wall_'+ positionZ +'_side.png'];
				
				core.rootScene.addChild(this);
			}
		});
		
		
		// Spriteオブジェクトの作成
        var sprite = new Sprite(core.width, core.height);
        sprite.x = 0;
        sprite.y = 0;
        // spriteオブジェクトの背景色の指定
        sprite.backgroundColor = "rgba(200, 255, 200, 0.5)";	
		core.rootScene.addChild(sprite);

		// 壁スプライト生成
		var wall_far_front = [];
		wall_far_front['left'] = new Wall_front(80, 200, 'left', 'far');
		wall_far_front['center'] = new Wall_front(240, 200, 'center', 'far');
		wall_far_front['right'] = new Wall_front(400, 200, 'right', 'far');
		var wall_far_side =[];
		wall_far_side['up'] = new Wall_side(300, 80, 'up', 'far');
		wall_far_side['right'] = new Wall_side(400, 160, 'right', 'far');
		wall_far_side['down'] = new Wall_side(300, 240 ,'down', 'far');
		wall_far_side['left'] = new Wall_side(200, 160, 'left', 'far');
		var wall_middle_front = [];
		wall_middle_front['left'] = new Wall_front(-40, 160, 'left', 'middle');
		wall_middle_front['center'] = new Wall_front(200, 160, 'center', 'middle');
		wall_middle_front['right'] = new Wall_front(440, 160, 'right', 'middle');
		var wall_middle_side = [];
		wall_middle_side['up'] = new Wall_side(280, -60, 'up', 'middle');
		wall_middle_side['right'] = new Wall_side(440, 80, 'right', 'middle');
		wall_middle_side['down'] = new Wall_side(280, 220 ,'down', 'middle');
		wall_middle_side['left'] = new Wall_side(120, 80, 'left', 'middle');
		var wall_near_front = [];
		wall_near_front['left'] = new Wall_front(-280, 80, 'left', 'near');
		wall_near_front['center'] = new Wall_front(120, 80, 'right', 'near');
		wall_near_front['right'] = new Wall_front(520, 80, 'center', 'near');
		var wall_near_side = [];
		wall_near_side['up'] = new Wall_side(260, -280, 'up', 'near');
		wall_near_side['right'] = new Wall_side(520, -40, 'right', 'near');
		wall_near_side['down'] = new Wall_side(260, 200 ,'down', 'near');
		wall_near_side['left'] = new Wall_side(0, -40, 'left', 'near');

		var text = new Label('touch me<br>aho');
		text.moveTo( 290, 370 );
		core.rootScene.addChild(text);

		var map = new Label(map_create(20, 20));
		map.moveTo( 10, 20 ); 
		map.color = 'rgb(200, 0, 0)';
		core.rootScene.addChild(map);
		
		var core_data = new Label(core.width+"/"+core.height);
		core_data.moveTo( 10, 0 ); 
		core_data.color = 'rgb(200, 0, 0)';
		core.rootScene.addChild(core_data);
				
		var charas = [];
		for (var i = 0; i < 1; i++){
			charas[i] = new Chara(284,280);
		}

		// バーチャルキーパッドを生成
		var pad = new Pad();
		pad.moveTo(100, 680);
		pad.scaleX = 3;
		pad.scaleY = 3;
		core.rootScene.addChild(pad);

		// バーチャルキーパッドを生成
		var apad = new APad();
		apad.moveTo(420, 690);
		core.rootScene.addChild(apad);

		var SPEED = 12;
		var MOVE_RANGE_X = core.width - charas[0].width;
		var MOVE_RANGE_Y = core.height - charas[0].height;
		charas[0].onenterframe = function() {
		    var input = core.input;
		    if (apad.isTouched) {
				this.x += apad.vx * SPEED;
				this.y += apad.vy * SPEED;
			    }
		    if (input.left)  { this.x -= SPEED; }
		    if (input.right) { this.x += SPEED; }
		    if (input.up)    { this.y -= SPEED; }
		    if (input.down)  { this.y += SPEED; }
		    
		    // 移動可能な範囲を制限
		    var left   = 0;
		    var right  = MOVE_RANGE_X;
		    var top    = 0;
		    var bottom = MOVE_RANGE_Y;
		    
		    // X軸
		    if (this.x < left)		{ this.x = left; }
		    else if (this.x > right)	{ this.x = right; }
		    // Y軸
		    if (this.y < top)		{ this.y = top; }
		    else if (this.y > bottom)	{ this.y = bottom; }
		};
		
	};
	
	core.start();
};


function rand(n){
	return Math.floor(Math.random() * (n+1));
}
