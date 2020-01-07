export default class Order {
  constructor(id, items, cost, date) {
    this.id = id
    this.items = items
    this.cost = cost
    this.date = date
  }

  get readableDate() {
    return this.date.toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
