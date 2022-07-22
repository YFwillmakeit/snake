class Score {
  score = 0;
  level = 1;

  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  maxLevel: number;// 最大级
  upScore: number;// 多少分升级

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore;

    this.scoreEle = document.querySelector('.score')!;
    this.levelEle = document.querySelector('.level')!;

  }

  addScore() {
    this.scoreEle.innerHTML = ++this.score + '';
    if (this.score % this.upScore === 0) {// 整除就升一级
      this.levelUp();
    }
  }

  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }

  set setScore(score: number) {
    this.score = score;
    this.scoreEle.innerHTML = score + '';
  }

  set setLevel(level: number) {
    this.level = level;
    this.levelEle.innerHTML = level + '';
  }
}

export default Score