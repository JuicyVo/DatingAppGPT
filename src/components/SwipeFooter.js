export default function Footer({setCurrentScreen}) {
  const handleSwipesClick = () => {
    setCurrentScreen('swipes');
  };
  const handleChatsClick = () => {
    setCurrentScreen('chats');
  };
  const handleProfileClick = () => {
    setCurrentScreen ('profile');
  }

  return (
      <header className="footer">
      <button onClick={handleSwipesClick}>Swipes</button> 
      <button onClick={handleChatsClick}>Chats</button>
      <button onClick={handleProfileClick}>Profile</button>
    </header>
  );
}
