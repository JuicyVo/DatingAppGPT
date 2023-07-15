export default function Footer({setCurrentScreen}) {
  const handleSwipesClick = () => {
    setCurrentScreen('swipes');
  };
  return (
      <header className="footer">
      <button onClick={handleSwipesClick}>Swipes</button> 
      <button>Chats</button>
      <button>Profile</button>
    </header>
  );
}
