var MyCalendarTwo = function() {
  this.events = [];
  this.overlapped = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendarTwo.prototype.book = function(start, end) {
  const event = [start, end];
  const i = upperBound(this.overlapped, event);
  if (isOverlapped(this.overlapped[i - 1], event) || isOverlapped(event, this.overlapped[i])) {
    return false;
  }
  const j = upperBound(this.events, event);
  if (isOverlapped(this.events[j - 1], event)) {
    const merged = merge(this.events[j - 1], event);
    const k = upperBound(this.overlapped, merged);
    this.overlapped.splice(k, 0, merged);
  }
  if (isOverlapped(event, this.events[j])) {
    const merged = merge(event, this.events[j]);
    const k = upperBound(this.overlapped, merged);
    this.overlapped.splice(k, 0, merged);
  }
  this.events.splice(j, 0, event);
  return true;
};

function merge(event1, event2) {
  return [Math.max(event1[0], event2[0]), Math.min(event1[1], event2[1])];
}

function isOverlapped(event1, event2) {
  if (!event1 || !event2) {
    return false;
  }
  return event2[0] < event1[1];
}

function upperBound(arr, event) {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (event[0] >= arr[mid][0]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */
