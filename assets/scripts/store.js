const state = {
    tema: 'escuro',
};
  
export function getState() {
    return structuredClone(state);
}
  
export function setState(newValues) {
    Object.assign(state, newValues);
    window.dispatchEvent(new CustomEvent('estadoAtualizado', {
        detail: getState()
    }));
}
  