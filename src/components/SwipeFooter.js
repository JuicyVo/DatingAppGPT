export default function Footer({ currentScreen, setCurrentScreen }) {
  const handleSwipesClick = () => {
    setCurrentScreen('swipes');
  };

  const handleChatsClick = () => {
    setCurrentScreen('chats');
  };

  const handleProfileClick = () => {
    setCurrentScreen('profile');
  };

  const handleEditClick = () => {
   setCurrentScreen ('edit')
  };

  return (
    <header className="footer">
      <button onClick={handleSwipesClick}>Swipes</button>
      <button onClick={handleChatsClick}>Chats</button>
      {currentScreen === 'profile' && (
        <div>
          <button onClick={handleProfileClick}>Profile</button>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
      {currentScreen !== 'profile' && (
        <button onClick={handleProfileClick}>Profile</button>
      )}
    </header>
  );
}
