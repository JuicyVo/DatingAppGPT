import './profile-card.css'


export default function ProfileCard() {
  return (
    <div className="profile-card">
      <img src="/images/mario.jpg" alt="placeholderProfile"/>
      <h1>Picture here</h1>
      <button>rewind</button>
      <button>dislike</button>
      <button>like</button>
    </div>
  );
}
