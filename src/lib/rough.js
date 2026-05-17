let _rough = null;
let _promise = null;

export function preloadRough() {
  if (!_promise) {
    _promise = import('roughjs').then(mod => {
      _rough = mod.default;
      return _rough;
    });
  }
  return _promise;
}

export function getRough() {
  return _promise || preloadRough();
}
