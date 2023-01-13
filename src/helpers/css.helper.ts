const setInGameBackground = () => {
  document.getElementById('html')?.classList.remove('booting-screen');
  document.getElementById('html')?.classList.add('in-game-screen');
};

export { setInGameBackground };
