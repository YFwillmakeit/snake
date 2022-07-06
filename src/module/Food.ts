class Food {
  element: HTMLElement;

  constructor() {
    this.element = document.querySelector('.food')!;
  }

  // 获取x轴坐标
  public get getX(): number {
    return this.element.offsetLeft
  }

  // 获取y轴坐标
  public get getY(): number {
    return this.element.offsetTop
  }

  // 改变食物位置
  change() {
    const left = Math.round(Math.random() * 39) * 10;
    const top = Math.round(Math.random() * 39) * 10;

    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }

}

export default Food