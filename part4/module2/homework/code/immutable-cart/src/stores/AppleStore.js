import { action, observable, computed } from 'mobx'

class AppleStore {
  @observable apples = [
    {
      id: 0,
      weight: 233,
      isEaten: false
    },
    {
      id: 1,
      weight: 235,
      isEaten: true
    },
    {
      id: 2,
      weight: 256,
      isEaten: false
    }
  ]
  @observable isPicking = false
  @observable buttonText = '摘苹果'
  @observable newAppleId = 3

  @computed get status() {
    const status = {
      nowApples: {
        quantity: 0,
        weight: 0
      },
      eatenApples: {
        quantity: 0,
        weight: 0
      }
    }
    this.apples.forEach(apple => {
      const selector = apple.isEaten ? 'eatenApples' : 'nowApples'
      status[selector].quantity++
      status[selector].weight += apple.weight
    })
    return status
  }

  @action.bound pickApple() {
    if (this.isPicking) {
      return
    }
    this.isPicking = true
    this.buttonText = '正在采摘...'
    setTimeout(() => {
      this.buttonText = '摘苹果'
      this.isPicking = false
      this.apples.push({
        weight: Math.floor(200 + Math.random() * 50),
        id: this.newAppleId++,
        isEaten: false
      })
    }, 800);
  }

  @action eatApple = (appleId) => {
    let index = this.apples.findIndex(apple => apple.id === appleId)
    this.apples[index].isEaten = true
  }
}

const apple = new AppleStore()

export default apple