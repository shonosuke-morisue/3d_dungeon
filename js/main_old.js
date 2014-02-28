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
			'./image/map/map_door.png',
			'./image/map/map_floor.png',
			'./image/map/map_stairs.png',
			'./image/map/map_player.png',
			'./image/map/map_wall_side.png',
			'./image/map/map_wall.png'
			
			);
	core.fps = 30;
	core.onload = function(){

		core.rootScene.backgroundColor = "#333333";
		// タイトルの作成
		var title = new Sprite(320, 160);
		title.image = core.assets['./image/title_320x160.png'];
		title.x = 0;
		title.y = 0;
		core.rootScene.addChild(title);	


/*
 *  マップシーン
 * 
 * 
 */
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
				this.frame = 0;
				this.rotation = rotate * 90;
				this.image = core.assets['./image/map/map_'+ type +'.png'];
				
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
				this.frame = 0;
				this.rotation = direction * 90;
				this.image = core.assets['./image/map/map_player.png'];

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
				switch ( floor_data['floor'] ){
				case 0:// 壁
					var map_floor = new Map_floor(x * 10 +10, y * 10 +10, 'wall' );
					break;
				case 1:// 床
					var map_floor = new Map_floor(x * 10 +10, y * 10 +10, 'floor' );
					break;
				case 2:// 上り階段
					var map_floor = new Map_floor(x * 10 +10, y * 10 +10, 'stairs' );
					break;
				case 3:// 下り階段
					var map_floor = new Map_floor(x * 10 +10, y * 10 +10, 'stairs' );
					break;
				default ://デフォルトは壁
					var map_floor = new Map_floor(x * 10 +10, y * 10 +10, 'wall' );
					break;
				};
				//壁の描画
				for(var i = 0; i < 4; i++){
					switch ( floor_data[i] ){
						case 0:// 壁有り
							var map_floor = new Map_floor(x * 10 +10, y * 10 +10, 'wall_side', i );
							break;
						case 1:// 壁無し
							break;
						case 2:// 扉
							var map_floor = new Map_floor(x * 10 +10, y * 10 +10, 'door', i );
							break;
						default ://デフォルトは壁
							var map_floor = new Map_floor(x * 10 +10, y * 10 +10, 'wall_side', i );
							break;
					};
				}
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

		
		var button = new Button("タイトルに戻る", "light", 30, 100);
		button.moveTo(200,410);
		mapScene.addChild(button);
		button.ontouchstart = function(){
			core.popScene();
		};
		
		
		var button = new Button("mapScene", "light", 30, 200);
		button.moveTo(55,160);
		core.rootScene.addChild(button);
		button.ontouchstart = function(){
			core.pushScene(mapScene);
		};

		var core_data = new Label(core.width+"/"+core.height);
		core_data.moveTo( 10, 0 ); 
		core_data.color = 'rgb(200, 0, 0)';
		core.rootScene.addChild(core_data);
	};
	
	core.start();
};

