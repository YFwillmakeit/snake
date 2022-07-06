import Snake from "./Snake";
import Food from "./Food";
import Score from "./Score";

class GameControl {
  snake: Snake;
  food: Food;
  score: Score;

  direction: string = '';

  isLive: boolean = true; // 是否活着

  timer: number = 0;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.score = new Score();
  }

  // 游戏初始化
  init() {
    // 事件跟谁绑定他的this就指向谁，这里需要bind修改this指向
    document.addEventListener('keydown', this.keydownHandler.bind(this));
  }

  keydownHandler(event: KeyboardEvent) {
    this.direction = event.key;
    this.run();
  }

  // 控制蛇移动
  run() {
    let x = this.snake.getX;
    let y = this.snake.getY;

    switch (this.direction) {
      case 'ArrowUp':
        y = y - 10;
        break;

      case 'ArrowDown':
        y = y + 10;
        break;

      case 'ArrowLeft':
        x = x - 10;
        break;

      case 'ArrowRight':
        x = x + 10;
        break;
    }

    this.checkEatFood(x, y);

    // 碰撞检测
    try {
      this.snake.setX = x;
      this.snake.setY = y;
    } catch (error: any) {
      this.isLive = false;
      console.log(error.message);
    }

    // 定时调用，自己移动
    if (this.isLive) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      const time = 400 - (this.score.level - 1) * 40;
      this.timer = window.setTimeout(this.run.bind(this), time);
    }

  }

  // 检测蛇吃到食物
  checkEatFood(x: number, y: number) {
    if (x === this.food.getX && y === this.food.getY) {
      console.log('吃到了');
      this.food.change(); // 食物改变位置
      this.score.addScore(); // 加分
      this.snake.addBody(); // 蛇身体增加一节
    }
  }
}


export default GameControl