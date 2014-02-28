enchant();
/*
 * 
 * Core
 * -rootScene
 * --Sprite (bear)
 */

window.onload = function(){
	var core = new Core(320, 450);
	core.preload(
			'./image/title_320x160.png',
			'./image/mmssf4castsheet.png',
			'./image/wall.png',
			//ダンジョン背景描画パーツ
			'./image/wall_far_front.png',
			'./image/wall_far_side.png',
			'./image/wall_middle_front.png',
			'./image/wall_middle_side.png',
			'./image/wall_near_front.png',
			'./image/wall_near_side.png',
			//マップ描画パーツ
			'./image/map/map.png'
			);
	core.fps = 30;
	core.onload = function(){

		core.rootScene.backgroundColor = "#333333";

/*////////////////////////////////////////////
 *  ルートシーン
 */////////////////////////////////////////////
		// タイトル描画
		var title = new Sprite(320, 160);
		title.image = core.assets['./image/title_320x160.png'];
		title.x = 0;
		title.y = 0;
		core.rootScene.addChild(title);	

		//マップシーン遷移ボタン
		var map_button = new Button("map Scene", "light", 30, 200);
		map_button.moveTo(55,160);
		core.rootScene.addChild(map_button);
		map_button.ontouchstart = function(){
			core.pushScene(mapScene);
		};

		//ダンジョンシーン遷移ボタン
		var dungeon_button = new Button("dungeon Scene", "light", 30, 200);
		dungeon_button.moveTo(55,200);
		core.rootScene.addChild(dungeon_button);
		dungeon_button.ontouchstart = function(){
			core.pushScene(dungeonScene);
		};

		//coreサイズ表示
		var core_data = new Label(core.width+"/"+core.height);
		core_data.moveTo( 10, 0 ); 
		core_data.color = 'rgb(200, 0, 0)';
		core.rootScene.addChild(core_data);

/*////////////////////////////////////////////
 *  マップシーン
 */////////////////////////////////////////////
		var mapScene = new Scene();
		mapScene.backgroundColor = "#FF9999";
		
		// プレイヤー座標、方向
		var player_position = {'X':0,'Y':0}; // プレイヤーの座標
		var player_direction = 0; // プレイヤーの向いている方向、北:0、東:1、南:2、北:3

		// マップサイズ
		var mapX = 30;
		var mapY = 30;
//		var map_data = map_create(mapX, mapY);

		var Map_floor = Class.create(Sprite, {
			initialize: function(x, y, type, rotate){
				Sprite.call(this, 10, 10);
				this.x = x;
				this.y = y;
				this.frame = type;
				this.rotation = rotate * 90;
				this.image = core.assets['./image/map/map.png'];
				
				mapScene.addChild(this);
			}
		});
		
		var Player = Class.create(Sprite, {
			initialize: function(positionX, positionY, direction){
				this.direction = direction;
				this.positionX = positionX;
				this.positionY = positionY;
				Sprite.call(this, 10, 10);
				this.x = 10 + 10 * positionX;
				this.y = 10 + 10 * positionY;
				this.frame = 16;
				this.rotation = direction * 90;
				this.image = core.assets['./image/map/map.png'];

				mapScene.addChild(this);
			}
		});
		
		var map_data = []; // マップ1階層分のデータ

		for (var x = 0; x < mapX; x++){
			map_data[x] = new Array();
			for (var y = 0; y < mapY; y++){
				var floor_data = { // マップ1マス分のデータ
						'floor':1, // 足元の属性
						0:Math.floor( Math.random() * 3 ), // 北壁の属性
						1:Math.floor( Math.random() * 3 ), // 東壁の属性
						2:Math.floor( Math.random() * 3 ), // 南壁の属性
						3:Math.floor( Math.random() * 3 ) // 西壁の属性
				};

				// 最外周は全て壁にする
				if(x == 0){
					floor_data[3] = 0;
				}
				if(y == 0){
					floor_data[0] = 0;
				}
				if(x == mapX-1){
					floor_data[1] = 0;
				}
				if(y == mapY-1){
					floor_data[2] = 0;
				}
				map_data[x][y] = floor_data;
				if(map_data['return'] === void 0){
					map_data['return'] = floor_data['floor'] +',';
				}else{
					map_data['return'] += floor_data['floor'] +',';
				}

				//床の描画
				var map_floor = new Map_floor(x * 10 + 10, y * 10 + 10, floor_data['floor'] );
				
				//壁の描画
//				for(var i = 0; i < 4; i++){
//					var map_floor = new Map_floor(x * 10 + 10, y * 10 + 10, floor_data[i] + 8, i );
//				}

				var map_floor = new Map_floor(x * 10 + 10, y * 10 + 10, floor_data[0] + 8, 0 );
				var map_floor = new Map_floor(x * 10 + 10, y * 10 + 10, floor_data[1] + 8, 1 );
				var map_floor = new Map_floor(x * 10 + 10, y * 10 + 10, floor_data[2] + 8, 2 );
				var map_floor = new Map_floor(x * 10 + 10, y * 10 + 10, floor_data[3] + 8, 3 );
			}
			map_data['return'] += '<br>';
		}

		// バーチャルキーパッドを生成
		var pad = new Pad();
		pad.moveTo(20, 320);
		mapScene.addChild(pad);

		// プレイヤー描画
		var player = new Player(player_position['X'], player_position['Y'], player_direction);
		
		player.onenterframe = function(){
			var input = core.input;
			if (input.left)  { // 左に向く
				console.log('left');
				if (this.direction == 0 ){
					this.direction = 3;
				}else{
					this.direction -= 1;
				}
				this.rotation = this.direction * 90;
			};
			if (input.right) { // 右に向く
				console.log('right');
				if (this.direction == 3 ){
					this.direction = 0;
				}else{
					this.direction += 1;
				}
				this.rotation = this.direction * 90;
			};
			if (input.up)    { // 前に進む
				console.log('up');
				// 入力前の座標を保持
				var beforeX = this.positionX;
				var beforeY = this.positionY;
				switch (this.direction){
					case 1:// 東向き
						this.positionX += 1;
						break;
					case 2:// 南向き
						this.positionY += 1;
						break;
					case 3:// 西向き
						this.positionX -= 1;
						break;
					default :// 北向き
						this.positionY -= 1;
						break;
				};
				if(this.positionX < 0 || this.positionY < 0 || this.positionX >= mapX || this.positionY >= mapY ){
					this.positionX = beforeX;
					this.positionY = beforeY;
				}
				this.x = 10 + 10 * this.positionX;
				this.y = 10 + 10 * this.positionY;
			};
			if (input.down)  { // 振り向く
				console.log('down');
				switch (this.direction){
				case 1:// 東向き
					this.direction += 2;
					break;
				case 2:// 南向き
					this.direction -= 2;
					break;
				case 3:// 西向き
					this.direction -= 2;
					break;
				default :// 北向き
					this.direction += 2;
					break;
				};
				this.rotation = this.direction * 90;
			};
		};

		// タイトルに戻るボタン
		var button = new Button("タイトルに戻る", "light", 30, 90);
		button.moveTo(200,410);
		mapScene.addChild(button);
		button.ontouchstart = function(){
			core.popScene();
		};
		

/*////////////////////////////////////////////
 *  ダンジョンシーン
 */////////////////////////////////////////////
		var dungeonScene = new Scene();
		dungeonScene.backgroundColor = "#FFFF99";
		
		var Wall_front = Class.create(Sprite, {
			initialize: function(x, y, position, positionZ){
				var spriteX = {'far':160,'middle':240,'near':400};
				var spriteY = {'far':120,'middle':200,'near':360};
				Sprite.call(this, spriteX[positionZ], spriteY[positionZ]);
				this.x = x;
				this.y = y;
				this.frame = 0;
				this.scaleX = 0.5;
				this.scaleY = 0.5;
				this.image = core.assets['./image/wall_'+ positionZ +'_front.png'];
				
				dungeonScene.addChild(this);
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
				this.scaleX = 0.5;
				this.scaleY = 0.5;
				this.image = core.assets['./image/wall_'+ positionZ +'_side.png'];
				
				dungeonScene.addChild(this);
			}
		});

		// 壁スプライト生成
		var wall_far_front = [];
		wall_far_front['left'] = new Wall_front(40, 100, 'left', 'far');
		wall_far_front['center'] = new Wall_front(120, 100, 'center', 'far');
		wall_far_front['right'] = new Wall_front(200, 100, 'right', 'far');
		var wall_far_side =[];
		wall_far_side['up'] = new Wall_side(150, 40, 'up', 'far');
		wall_far_side['right'] = new Wall_side(200, 80, 'right', 'far');
		wall_far_side['down'] = new Wall_side(150, 120 ,'down', 'far');
		wall_far_side['left'] = new Wall_side(100, 80, 'left', 'far');
//		var wall_middle_front = [];
//		wall_middle_front['left'] = new Wall_front(-20, 80, 'left', 'middle');
//		wall_middle_front['center'] = new Wall_front(100, 80, 'center', 'middle');
//		wall_middle_front['right'] = new Wall_front(220, 80, 'right', 'middle');
//		var wall_middle_side = [];
//		wall_middle_side['up'] = new Wall_side(140, -30, 'up', 'middle');
//		wall_middle_side['right'] = new Wall_side(220, 40, 'right', 'middle');
//		wall_middle_side['down'] = new Wall_side(140, 110 ,'down', 'middle');
//		wall_middle_side['left'] = new Wall_side(60, 40, 'left', 'middle');
//		var wall_near_front = [];
//		wall_near_front['left'] = new Wall_front(-140, 40, 'left', 'near');
//		wall_near_front['center'] = new Wall_front(60, 40, 'right', 'near');
//		wall_near_front['right'] = new Wall_front(260, 40, 'center', 'near');
//		var wall_near_side = [];
//		wall_near_side['up'] = new Wall_side(130, -140, 'up', 'near');
//		wall_near_side['right'] = new Wall_side(260, -20, 'right', 'near');
//		wall_near_side['down'] = new Wall_side(130, 100 ,'down', 'near');
//		wall_near_side['left'] = new Wall_side(0, -20, 'left', 'near');

		// バーチャルキーパッドを生成
		var apad = new APad();
		apad.moveTo(420, 690);
		core.rootScene.addChild(apad);
		
		// タイトルに戻るボタン
		var button = new Button("タイトルに戻る", "light", 30, 90);
		button.moveTo(200,410);
		dungeonScene.addChild(button);
		button.ontouchstart = function(){
			core.popScene();
		};
	};
	
	core.start();
};

