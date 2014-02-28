enchant();
/*
 * 
 * Core
 * -rootScene
 * --Sprite (bear)
 * 
 * 
 * 
 * <<<床>>>
 * 0 => 壁
 * 1 => 普通の床
 * 2 => 上り階段
 * 3 => 下り階段
 * 
 * <<<壁>>>
 * 0 => 壁有り
 * 1 => 壁無し
 * 2 => 扉
 * 
 */


//var MapScene = Class.create(Scene, {
//	initialize: function(){
//		Scene.call(this);
//		this.backgroundColor = "#FF9999";
//		var secondMessage = new Label("Hello, mapScene");
//		secondMessage.x = 10;
//		secondMessage.y = 10;
//		this.addChild(secondMessage);
//		
//		var button = new Button("タイトルに戻る", "light", 30, 200);
//		button.moveTo(55,410);
//		this.addChild(button);
//		button.ontouchstart = function(){
//			core.pushScene(mapScene);
//		};
//	}
//});

var player_position = {'X':1,'Y':1}; // プレイヤーの座標
var player_direction = 0; // プレイヤーの向いている方向、北:0、東:1、南:2、北:3

//var map_data = []; // マップ1階層分のデータ
//var floor_data = { // マップ1マス分のデータ
//		'floor':0, // 足元の属性
//		0:0, // 北壁の属性
//		1:0, // 東壁の属性
//		2:0, // 南壁の属性
//		3:0 // 西壁の属性
//};



//function map_create(mapX, mapY){
//	var map_data = []; // マップ1階層分のデータ
//
//	for (var x = 0; x < mapX; x++){
//		map_data[x] = new Array();
//		for (var y = 0; y < mapY; y++){
//			var floor_data = { // マップ1マス分のデータ
//					'floor':1, // 足元の属性
//					0:1, // 北壁の属性
//					1:1, // 東壁の属性
//					2:1, // 南壁の属性
//					3:1 // 西壁の属性
//			};
//
//			// 最外周は全て壁にする
//			if(x == 0){
//				floor_data[0] = 0;
//			}
//			if(y == 0){
//				floor_data[3] = 0;
//			}
//			if(x == mapX-1){
//				floor_data[1] = 0;
//			}
//			if(y == mapY-1){
//				floor_data[2] = 0;
//			}
//			map_data[x][y] = floor_data;
//			if(map_data['return'] === void 0){
//				map_data['return'] = floor_data['floor'] +',';
//			}else{
//				map_data['return'] += floor_data['floor'] +',';
//			}
//			
//			//床の描画
//			switch ( floor_data['floor'] ){
//			case 0:// 壁
//				var map_floor = new Map_floor(x * 10, y * 10, 'wall' );
//				break;
//			case 1:// 床
//				var map_floor = new Map_floor(x * 10, y * 10, 'floor' );
//				break;
//			case 2:// 上り階段
//				var map_floor = new Map_floor(x * 10, y * 10, 'stairs' );
//				break;
//			case 3:// 下り階段
//				var map_floor = new Map_floor(x * 10, y * 10, 'stairs' );
//				break;
//			default ://デフォルトは壁
//				var map_floor = new Map_floor(x * 10, y * 10, 'wall' );
//				break;
//			};
//			
//		}
//		map_data['return'] += '<br>';
//	}
//	return map_data['return'];
//}


