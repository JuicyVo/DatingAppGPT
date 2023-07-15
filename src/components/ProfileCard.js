import './profile-card.css'


export default function ProfileCard() {
  return (
    <div className="profile-card">
      <img src="/images/mario.jpg" alt="placeholderProfile"/>
      <div className="profile-info">
        <h2>Name</h2>
        <p>Age: 25</p>
        <p>Bio: Hello</p>

      </div>
      <div className ="swipe-buttons">
      <button>rewind</button>
      <button>dislike</button>
      <button>like</button>
      </div>
    </div>
  );
}
