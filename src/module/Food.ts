import Barrier from './Barrier';
class Food {
  element: HTMLElement;
  barrier: Barrier;

  constructor() {
    this.element = document.querySelector('.food')!;
    this.barrier = new Barrier();
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
    const barrierEleArr = this.barrier.barrierEles;

    // 生成食物的时候，检查是否和障碍物重叠了
    for (let i = 0, len = barrierEleArr.length; i < len; i++) {
      const barrierEle = barrierEleArr[i] as HTMLElement;
      if (barrierEle.offsetLeft === left && barrierEle.offsetTop === top) {
        this.change();
        return
      }
    }

    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }

}

export default Food