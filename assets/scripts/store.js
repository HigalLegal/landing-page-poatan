const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const state = {
    tema: isDark ? 'escuro' : 'claro',
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
  