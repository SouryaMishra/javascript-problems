/*
The common actions relating to history are:

new BrowserHistory() - when you open a new tab, it is set with an empty history
goBack() - go to last entry, notice the entries are kept so that forward() could get us back
forward() - go to next visited entry
visit() - when you enter a new address or click a link, this adds a new entry but truncate the entries which we could forward() to.
Say we start a new tab, this is the empty history.

[ ]
Then visit url A, B, C in turn.

[ A, B, C]
        ↑
We are currently at C, we could goBack() to B, then to A

[ A, B, C]
  ↑
forward() get us to B

[ A, B, C]
     ↑
Now if we visit a new url D, since we are currently at B, C is truncated.

[ A, B, D]
        ↑
You are asked to implement a BrowserHistory class to mimic the behavior.

*/

class BrowserHistory {
  /**
   * @param {string} url
   * if url is set, it means new tab with url
   * otherwise, it is empty new tab
   */
  constructor(url) {
    this.history = [url ?? undefined]
    this.index = 0;
  }
  /**
   * @param { string } url
   */
  visit(url) {
    if (this.index === this.history.length - 1) this.history.push(url)
    else this.history = this.history.slice(0, this.index + 1).concat(url);;
    this.index = this.history.length - 1;
  }

  /**
   * @return {string} current url
   */
  get current() {
    return this.history[this.index];
  }

  // go to previous entry
  goBack() {
    this.index = Math.max(0, this.index - 1);
  }

  // go to next visited url
  forward() {
    this.index = Math.min(this.history.length - 1, this.index + 1);
  }
}