class Snake {
  snakeEle: HTMLElement;// 蛇的容器
  head: HTMLElement; // 头部
  body: HTMLCollection;// 身体

  constructor() {
    this.snakeEle = document.querySelector('.snake')!;
    this.head = document.querySelector('.snake > div')!;
    this.body = this.snakeEle.getElementsByTagName('div')!;
  }

  public get getX(): number {
    return this.head.offsetLeft
  }

  public get getY(): number {
    return this.head.offsetTop
  }

  public set setX(value: number) {
    if (value === this.getX) { // 值没有改变就return
      return
    }

    // 检查掉头
    value = this.checkTurnAround(value, 'X');

    this.moveBody();

    this.isNotBumpWall(value) && (this.head.style.left = value + 'px');

    // 移动后检查头部撞到身体没有
    this.checkHeadAgainstBody();
  }

  public set setY(value: number) {
    if (value === this.getY) {// 值没有改变就return
      return
    }

    // 检查掉头
    value = this.checkTurnAround(value, 'Y');

    this.moveBody();

    this.isNotBumpWall(value) && (this.head.style.top = value + 'px');

    // 移动后检查头部撞到身体没有
    this.checkHeadAgainstBody();
  }

  // 设置蛇眼睛位置
  public set setEyesDirection(direction: string) {
    let rt = '';
    switch (direction) {
      case 'ArrowUp':
        rt = '0deg';
        break;

      case 'ArrowDown':
        rt = '0deg';
        break;

      case 'ArrowLeft':
        rt = '90deg';
        break;

      case 'ArrowRight':
        rt = '-90deg';
        break;

    }

    this.head.style.transform = "rotate(" + rt + ")";
  }

  addBody() {
    this.snakeEle.insertAdjacentHTML('beforeend', '<div></div>');
  }

  moveBody() {
    // 身体从最后一节开始往前移动，因为第一节是在setX/setY里面调用
    for (let len = this.body.length, i = len - 1; i > 0; i--) {

      const x = (this.body[i-1] as HTMLElement).offsetLeft;
      const y = (this.body[i-1] as HTMLElement).offsetTop;


      (this.body[i] as HTMLElement).style.left = x + 'px';
      (this.body[i] as HTMLElement).style.top = y + 'px';
    }
  }

  // 是否没撞墙
  isNotBumpWall(value: number): boolean {
    if ((value >= 0) && (value <= 390)) {
      return true
    } else {
      throw new Error('撞墙了')
    }
  }

  // 检查掉头
  checkTurnAround(value: number, direction: string): number {
    switch (direction) {
      case 'X':
        // 如果第二节和将要移动到的位置相同，则说明掉头了，掉头了应该往反方向继续移动
        if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value) {
          // 代表在向右移动，那么应该让他继续向左移动一位
          if (value > this.getX) {
            value = this.getX - 10;
          } else {
            value = this.getX + 10
          }
        }

        break;

      case 'Y':
        if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === value) {
          // 代表在向下移动，那么应该让他继续向上移动一位
          if (value > this.getY) {
            value = this.getY - 10;
          } else {
            value = this.getY + 10
          }
        }

        break;
    }

    return value
  }

  // 检查头撞身体
  checkHeadAgainstBody() {
    // 如果头部坐标等于身体中的任意一节，说明撞了
    for (let i = 1, len = this.body.length; i < len; i++) {
      const oneBodyEle = this.body[i] as HTMLElement;
      if (this.getX === oneBodyEle.offsetLeft && this.getY === oneBodyEle.offsetTop) {
        throw new Error('撞到身体了')
      }
    }
  }
}

export default Snake